#!/usr/bin/env tsx

/**
 * Content Style Check
 *
 * Mechanical checks for the prose rules in apps/web/content/STYLE.md:
 * - Em-dash budget: at most ceil(words / 150) per file
 * - Banned phrases per locale (pl/en/uk)
 * - No "Podsumowanie" / "Summary" / "Підсумок" heading
 * - Warnings for title > 60 and description > 160 characters
 *
 * Run: pnpm check:style [file.mdx ...]
 * With no arguments, checks apps/web/content/{pl,en,uk}/blog/*.mdx
 */

/* eslint-disable no-console */
import { existsSync, readdirSync, readFileSync } from "fs";
import { join } from "path";

type Locale = "pl" | "en" | "uk";

const CONTENT_DIR = "apps/web/content";
const WORDS_PER_DASH = 150;

// Entries ending in "*" match as a prefix (e.g. "kluczow*" matches "kluczowy", "kluczowe").
const BANNED: Record<Locale, string[]> = {
  pl: [
    "w dzisiejszych czasach",
    "wielu przedsiębiorców zastanawia się",
    "nie od dziś wiadomo",
    "w tym artykule",
    "w następnej sekcji",
    "przyjrzyjmy się",
    "dobra wiadomość",
    "zła wiadomość",
    "problem w tym, że",
    "haczyk?",
    "to brzmi jak",
    "brzmi skomplikowanie",
    "kluczow*",
    "warto pamiętać",
    "pamiętaj",
    "co ważne",
    "należy podkreślić",
    "innymi słowy",
    "mówiąc prościej",
    "podsumowując",
    "krótko mówiąc",
    "kompleksow*",
    "holistyczn*",
    "rewolucj*",
    "nowa era",
    "omówię",
  ],
  en: [
    "in today's",
    "let's dive in",
    "it's worth noting",
    "it is worth noting",
    "simply put",
    "in conclusion",
    "here's the thing",
    "game-changer",
    "game changer",
    "navigate the complexities",
    "not x. not y. this one.",
  ],
  uk: ["варто зазначити", "підсумовуючи", "іншими словами", "ключов*"],
};

const SUMMARY_HEADING = /^#{1,6}\s+(podsumowanie|summary|підсумок)\s*$/i;

interface FileReport {
  file: string;
  words: number;
  dashes: number;
  limit: number;
  hits: { line: number; phrase: string }[];
  warnings: string[];
  failed: boolean;
}

function getBlogFiles(): string[] {
  const files: string[] = [];
  for (const locale of ["pl", "en", "uk"]) {
    const dir = join(CONTENT_DIR, locale, "blog");
    if (!existsSync(dir)) {
      continue;
    }
    for (const entry of readdirSync(dir).sort()) {
      if (entry.endsWith(".mdx")) {
        files.push(join(dir, entry));
      }
    }
  }
  return files;
}

function detectLocale(file: string): Locale {
  const segments = file.split(/[\\/]/);
  for (const locale of ["pl", "en", "uk"] as const) {
    if (segments.includes(locale)) {
      return locale;
    }
  }
  return "pl";
}

function frontmatterValue(frontmatter: string, key: string): string | undefined {
  // Handles `key: "value"`, `key: value` and folded values on following indented lines.
  const lines = frontmatter.split("\n");
  const idx = lines.findIndex((l) => l.startsWith(`${key}:`));
  if (idx === -1) {
    return undefined;
  }
  let value = lines[idx].slice(key.length + 1).trim();
  for (let i = idx + 1; i < lines.length && /^\s+\S/.test(lines[i]); i++) {
    value += ` ${lines[i].trim()}`;
  }
  value = value.trim();
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }
  return value;
}

/** Returns prose lines as [originalLineNumber, text] pairs, plus the raw frontmatter. */
function extractProse(content: string): {
  frontmatter: string;
  prose: [number, string][];
  headings: [number, string][];
} {
  const lines = content.split("\n");
  let start = 0;
  let frontmatter = "";

  if (lines[0]?.trim() === "---") {
    const end = lines.findIndex((l, i) => i > 0 && l.trim() === "---");
    if (end !== -1) {
      frontmatter = lines.slice(1, end).join("\n");
      start = end + 1;
    }
  }

  const prose: [number, string][] = [];
  const headings: [number, string][] = [];
  let inFence = false;

  for (let i = start; i < lines.length; i++) {
    const line = lines[i];
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) {
      continue;
    }
    if (/^#{1,6}\s/.test(line)) {
      headings.push([i + 1, line]);
      continue;
    }
    if (line.trimStart().startsWith("|")) {
      continue;
    }
    // Drop JSX tags (and their attributes) but keep the text between them.
    const text = line.replace(/<\/?[A-Za-z][A-Za-z0-9]*(?:\s[^>]*)?\/?>/g, " ");
    prose.push([i + 1, text]);
  }

  return { frontmatter, prose, headings };
}

function matchPhrase(text: string, phrase: string): boolean {
  // Phrases match at word boundaries; a trailing "*" makes the last word a prefix.
  const isPrefix = phrase.endsWith("*");
  const body = escapeRegExp(isPrefix ? phrase.slice(0, -1) : phrase).replace(/ /g, "\\s+");
  const end = isPrefix ? "" : "(?![\\p{L}])";
  return new RegExp(`(?<![\\p{L}])${body}${end}`, "iu").test(text);
}

/** Joins wrapped lines into paragraphs so multi-word phrases split across lines still match. */
function toParagraphs(prose: [number, string][]): [number, string][] {
  const paragraphs: [number, string][] = [];
  let current: [number, string] | null = null;
  let prevLine = -1;
  for (const [lineNo, text] of prose) {
    const blank = text.trim() === "";
    if (blank || lineNo !== prevLine + 1) {
      if (current) {
        paragraphs.push(current);
      }
      current = null;
    }
    if (!blank) {
      current = current ? [current[0], `${current[1]} ${text.trim()}`] : [lineNo, text.trim()];
    }
    prevLine = lineNo;
  }
  if (current) {
    paragraphs.push(current);
  }
  return paragraphs;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function checkFile(file: string): FileReport {
  const content = readFileSync(file, "utf-8");
  const locale = detectLocale(file);
  const { frontmatter, prose, headings } = extractProse(content);

  const proseText = prose.map(([, t]) => t).join("\n");
  const words = proseText.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
  const dashes = (proseText.match(/—/g) ?? []).length;
  const limit = Math.ceil(words / WORDS_PER_DASH);

  const hits: { line: number; phrase: string }[] = [];
  const headingText: [number, string][] = headings.map(([n, h]) => [n, h.replace(/^#+\s+/, "")]);
  for (const [lineNo, text] of [...toParagraphs(prose), ...headingText]) {
    for (const phrase of BANNED[locale]) {
      if (matchPhrase(text, phrase)) {
        hits.push({ line: lineNo, phrase: phrase.replace(/\*$/, "…") });
      }
    }
  }
  for (const [lineNo, heading] of headings) {
    if (SUMMARY_HEADING.test(heading.trim())) {
      hits.push({ line: lineNo, phrase: `heading "${heading.replace(/^#+\s+/, "").trim()}"` });
    }
  }
  hits.sort((a, b) => a.line - b.line);

  const warnings: string[] = [];
  const title = frontmatterValue(frontmatter, "title");
  const description = frontmatterValue(frontmatter, "description");
  // The page template appends " — ksefuj.to" (11 chars); Google truncates at ~60.
  if (title && title.length > 49) {
    warnings.push(`title is ${title.length} chars (limit 49)`);
  }
  if (description && description.length > 160) {
    warnings.push(`description is ${description.length} chars (limit 160)`);
  }

  return {
    file,
    words,
    dashes,
    limit,
    hits,
    warnings,
    failed: dashes > limit || hits.length > 0,
  };
}

function main() {
  const args = process.argv.slice(2);
  const files = args.length > 0 ? args : getBlogFiles();

  if (files.length === 0) {
    console.log("No MDX files to check.");
    process.exit(0);
  }

  console.log("🔍 Checking content style (apps/web/content/STYLE.md)...\n");

  const reports: FileReport[] = [];
  for (const file of files) {
    if (!existsSync(file)) {
      console.log(`❌ ${file}: file not found`);
      process.exit(1);
    }
    reports.push(checkFile(file));
  }

  for (const r of reports) {
    const icon = r.failed ? "❌" : "✅";
    console.log(`${icon} ${r.file}`);
    console.log(`   words: ${r.words}, em-dashes: ${r.dashes}/${r.limit}`);
    if (r.dashes > r.limit) {
      console.log(`   ⚠️  too many em-dashes (${r.dashes} > ${r.limit})`);
    }
    for (const hit of r.hits) {
      console.log(`   ⚠️  line ${hit.line}: ${hit.phrase}`);
    }
    for (const warning of r.warnings) {
      console.log(`   ℹ️  warning: ${warning}`);
    }
  }

  const failed = reports.filter((r) => r.failed);
  console.log(`\n${"=".repeat(60)}`);
  console.log(
    `\n${reports.length} file(s) checked, ${failed.length} failed, ${reports.reduce(
      (n, r) => n + r.hits.length,
      0,
    )} banned hit(s).\n`,
  );

  process.exit(failed.length > 0 ? 1 : 0);
}

main();
