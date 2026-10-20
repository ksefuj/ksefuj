#!/usr/bin/env tsx
/* eslint-disable no-console */
/**
 * Syncs the newsletter settings, the subscriber tags and the transactional emails
 * (docs/newsletter/emails.<locale>.md) to Buttondown, in that order. Dry run by default; pass
 * --apply to perform API requests.
 *
 * With --draft <path> (relative to the repo root) the script ONLY creates a draft email from a file
 * ("Subject: ...", a blank line, then the Markdown body) and skips settings, tags and emails. The
 * draft is never scheduled or sent by this script: review and send it from the Buttondown dashboard.
 *
 * Usage:
 *   pnpm newsletter:sync [--apply] [--localized-subjects] [--username <name>]
 *   pnpm newsletter:sync -- --draft docs/newsletter/issues/<file>.md [--apply]
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const API = "https://api.buttondown.com/v1";
const LOCALES = ["pl", "en", "uk"]; // PL first: it is the fallback
const EMAILS = ["confirmation", "welcome"];
const TAGS = {
  "lang-pl": "Subscriber language: Polish",
  "lang-en": "Subscriber language: English",
  "lang-uk": "Subscriber language: Ukrainian",
  "from-homepage": "Signed up on the homepage",
  "from-article": "Signed up from an article",
  "from-calendar": "Signed up from the KSeF calendar",
};

// Newsletter settings (PATCH /newsletters/{id}). Buttondown may gate individual fields by plan;
// remove the offending field here if the sync reports a 403 for it.
const SETTINGS = {
  name: "Newsletter o KSeF",
  description: "Krótki e-mail, gdy zmieniają się przepisy albo terminy KSeF. Od ksefuj.to.",
  locale: "pl-PL", // the API enum has "pl-PL", not "pl"
  reply_to_address: "hej@ksefuj.to",
  timezone: "Europe/Warsaw",
  subscription_confirmation_redirect_url: "https://ksefuj.to/#calendar",
};
// Always sent explicitly: the API default for new emails is "about_to_send", which would send them.
const DRAFT_STATUS = "draft";

const args = process.argv.slice(2);
const apply = args.includes("--apply");
const localizedSubjects = args.includes("--localized-subjects");
const usernameIdx = args.indexOf("--username");
const username = usernameIdx >= 0 ? args[usernameIdx + 1] : "ksefuj";

const draftIdx = args.indexOf("--draft");
const draftPath = draftIdx >= 0 ? args[draftIdx + 1] : undefined;
if (draftIdx >= 0 && (!draftPath || draftPath.startsWith("--"))) {
  console.error("Error: --draft needs a path relative to the repo root");
  process.exit(1);
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "docs", "newsletter");

function fail(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

/**
 * Joins hard-wrapped lines (Prettier wraps Markdown at 100 chars) back into single lines, so email
 * renderers that treat newlines as line breaks don't show ragged paragraphs. Blank lines, headings
 * and new list items still start a new line; indented continuation lines join their list item.
 */
function unwrap(markdown) {
  const out = [];
  for (const line of markdown.split("\n")) {
    const prev = out.at(-1);
    const startsBlock = /^\s*$|^#{1,6}\s|^\s*([-*+]|\d+\.)\s|^\s*>/.test(line);
    const prevEndsBlock = prev === undefined || /^\s*$|^#{1,6}\s/.test(prev);
    if (!startsBlock && !prevEndsBlock) {
      out[out.length - 1] = `${prev} ${line.trim()}`;
    } else {
      out.push(line);
    }
  }
  return out.join("\n");
}

/** Parses "## name" sections with a "Subject: ..." line followed by a Markdown body. */
function parseEmails(text) {
  const result = {};
  for (const section of text.split(/^## /m).slice(1)) {
    const [name, ...rest] = section.split("\n");
    const lines = rest.join("\n").trim().split("\n");
    const match = /^Subject:\s*(.+)$/.exec(lines[0] ?? "");
    if (!match) {
      fail(`section "${name.trim()}" has no "Subject:" line`);
    }
    result[name.trim()] = {
      subject: match[1].trim(),
      body: unwrap(lines.slice(1).join("\n").trim()),
    };
  }
  return result;
}

// Missing locale files fall back to PL.
const byLocale = {};
for (const locale of LOCALES) {
  const file = join(dir, `emails.${locale}.md`);
  if (existsSync(file)) {
    byLocale[locale] = parseEmails(readFileSync(file, "utf8"));
  } else if (locale === "pl") {
    fail(`missing ${file}`);
  } else {
    console.warn(`Warning: emails.${locale}.md not found, falling back to PL`);
  }
}

/** Picks the per-locale value by subscriber tag, using Buttondown's Django template syntax. */
function localize(email, field) {
  const pick = (locale) => (byLocale[locale] ?? byLocale.pl)[email]?.[field];
  for (const locale of LOCALES) {
    if (pick(locale) === undefined) {
      fail(`email "${email}" is missing for locale ${locale}`);
    }
  }
  return (
    `{% if 'lang-en' in subscriber.tags %}${pick("en")}` +
    `{% elif 'lang-uk' in subscriber.tags %}${pick("uk")}` +
    `{% else %}${pick("pl")}{% endif %}`
  );
}

const composed = {};
for (const email of EMAILS) {
  composed[email] = {
    subject: localizedSubjects ? localize(email, "subject") : byLocale.pl[email]?.subject,
    body: localize(email, "body"),
  };
  if (!composed[email].subject) {
    fail(`email "${email}" not found in emails.pl.md`);
  }
}

// The confirmation link must be present in every language branch.
for (const locale of LOCALES) {
  const body = (byLocale[locale] ?? byLocale.pl).confirmation.body;
  if (!body.includes("{{ confirmation_url }}")) {
    fail(`confirmation body (${locale}) must contain {{ confirmation_url }}`);
  }
}

const patch = {
  custom_subscription_confirmation_email_subject: composed.confirmation.subject,
  custom_subscription_confirmation_email_text: composed.confirmation.body,
  custom_subscription_confirmed_email_subject: composed.welcome.subject,
  custom_subscription_confirmed_email_text: composed.welcome.body,
};

async function request(method, path, body) {
  const response = await fetch(`${API}${path}`, {
    method,
    headers: {
      Authorization: `Token ${(process.env.BUTTONDOWN_API_KEY ?? "").trim()}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await response.text();
  let data = text;
  try {
    data = JSON.parse(text);
  } catch {
    // Keep the raw text for error output.
  }
  return { status: response.status, ok: response.ok, data };
}

function check(res, what) {
  if (!res.ok) {
    fail(`${what} failed: ${res.status} ${JSON.stringify(res.data)}`);
  }
  return res.data;
}

async function listAll(path) {
  const items = [];
  let next = `${API}${path}`.replace(API, "");
  while (next) {
    const data = check(await request("GET", next), `GET ${next}`);
    items.push(...(data.results ?? []));
    next = data.next ? data.next.replace(API, "") : null;
  }
  return items;
}

if (draftPath) {
  const file = join(root, draftPath);
  if (!existsSync(file)) {
    fail(`missing ${file}`);
  }
  const [first = "", blank, ...rest] = readFileSync(file, "utf8")
    .replace(/\r\n/g, "\n")
    .split("\n");
  const match = /^Subject:\s*(.+)$/.exec(first);
  if (!match || blank?.trim() !== "") {
    fail(`${draftPath} must start with "Subject: ...", then a blank line, then the body`);
  }
  const draft = {
    subject: match[1].trim(),
    body: unwrap(rest.join("\n").trim()),
    status: DRAFT_STATUS,
  };
  if (!draft.body) {
    fail(`${draftPath} has an empty body`);
  }
  if (!apply) {
    console.log("Dry run (no network calls). Would POST /emails (draft only, never sent) with:");
    console.log(JSON.stringify(draft, null, 2));
    console.log("Re-run with --apply and BUTTONDOWN_API_KEY set to create the draft.");
    process.exit(0);
  }
  if (!process.env.BUTTONDOWN_API_KEY) {
    fail("BUTTONDOWN_API_KEY is required with --apply");
  }
  const created = check(await request("POST", "/emails", draft), "POST /emails");
  console.log(`Created draft email ${created.id} ("${draft.subject}")`);
  console.log("Review and send it from the Buttondown dashboard (Emails > Drafts)");
  process.exit(0);
}

if (!apply) {
  console.log(
    `Dry run (no network calls). Subjects: ${localizedSubjects ? "localized" : "PL only"}`,
  );
  console.log(`Would PATCH /newsletters/{id} (newsletter username "${username}") settings:`);
  console.log(JSON.stringify(SETTINGS, null, 2));
  console.log(`Would ensure tags exist (POST /tags if missing): ${Object.keys(TAGS).join(", ")}`);
  console.log(`Would PATCH /newsletters/{id} (newsletter username "${username}") with:`);
  console.log(JSON.stringify(patch, null, 2));
  console.log("Re-run with --apply and BUTTONDOWN_API_KEY set to perform the sync.");
  process.exit(0);
}

if (!process.env.BUTTONDOWN_API_KEY) {
  fail("BUTTONDOWN_API_KEY is required with --apply");
}

const newsletters = await listAll("/newsletters");
const newsletter = newsletters.find((n) => n.username === username);
if (!newsletter) {
  fail(`no newsletter with username "${username}"`);
}

const settingsRes = await request("PATCH", `/newsletters/${newsletter.id}`, SETTINGS);
if (settingsRes.status === 403) {
  console.warn(`Skipped settings: 403 ${JSON.stringify(settingsRes.data)}`);
  console.warn(
    "Buttondown may gate individual fields by plan: remove the offending field from SETTINGS and retry.",
  );
} else {
  check(settingsRes, "PATCH newsletter settings");
  console.log(`Updated settings for newsletter "${username}" (${newsletter.id})`);
}

const existing = new Set((await listAll("/tags")).map((t) => t.name));
for (const [name, description] of Object.entries(TAGS)) {
  if (existing.has(name)) {
    continue;
  }
  // Buttondown requires a colour: violet for language tags, slate for signup source.
  const color = name.startsWith("lang-") ? "#8b5cf6" : "#64748b";
  const res = await request("POST", "/tags", { name, description, color });
  if (res.status === 400 && JSON.stringify(res.data).includes("name_already_exists")) {
    continue;
  }
  if (res.status === 403 && JSON.stringify(res.data).includes("feature_disabled")) {
    console.warn("Skipped tags: they require the Buttondown Basic plan or higher.");
    break;
  }
  check(res, `POST /tags (${name})`);
  console.log(`Created tag ${name}`);
}
console.log("Tags step finished.");

// Custom transactional emails are a paid Buttondown feature (Standard plan); on the free plan
// the tags above are still created and the emails stay at Buttondown's defaults.
const patched = await request("PATCH", `/newsletters/${newsletter.id}`, patch);
if (
  patched.status === 403 &&
  JSON.stringify(patched.data).includes("custom_transactional_emails")
) {
  console.warn(
    "Skipped transactional emails: they require the Buttondown Standard plan. Tags were synced.",
  );
} else {
  check(patched, "PATCH newsletter");
  console.log(`Updated transactional emails for newsletter "${username}" (${newsletter.id})`);
}
