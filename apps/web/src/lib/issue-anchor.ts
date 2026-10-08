/**
 * Deep links into validator reference pages. One issue code can cover very different problems
 * (INVALID_ELEMENT_VALUE: a bad amount, a bad date, a too-long text, ...), so its page has one
 * section per kind and the issue links straight to the matching one.
 */

import type { ValidationIssue } from "@ksefuj/validator";
import { hintFor } from "./xsd-issue-text";

/** Anchor keys a page may declare for INVALID_ELEMENT_VALUE. */
export const INVALID_ELEMENT_VALUE_ANCHOR_KEYS = [
  "amount",
  "date",
  "nip",
  "countryCode",
  "length",
  "fractionDigits",
  "enumeration",
  "other",
] as const;

/** Allowed `anchors` keys per issue code. Codes not listed here take no anchors. */
export const ISSUE_ANCHOR_KEYS: Readonly<Record<string, readonly string[]>> = {
  INVALID_ELEMENT_VALUE: INVALID_ELEMENT_VALUE_ANCHOR_KEYS,
};

/** Format hints (see `hintFor`) that have their own section; the rest fall through to the facet. */
const HINT_ANCHORS: Record<string, string> = {
  amount: "amount",
  unitPrice: "amount",
  date: "date",
  dateTime: "date",
  nip: "nip",
  countryCode: "countryCode",
};

function str(value: unknown): string | undefined {
  return typeof value === "string" && value !== "" ? value : undefined;
}

/** The kind of problem an issue is, as an anchor key, or undefined when the code has no kinds. */
export function issueAnchorKey(issue: ValidationIssue): string | undefined {
  if (issue.code.domain !== "xsd" || issue.code.code !== "INVALID_ELEMENT_VALUE") {
    return undefined;
  }
  const metadata = issue.context.metadata;
  const hint = hintFor(
    str(metadata?.typeName),
    issue.context.location.element,
    str(metadata?.originalMessage),
  );
  const fromHint = hint ? HINT_ANCHORS[hint] : undefined;
  if (fromHint) {
    return fromHint;
  }
  switch (str(metadata?.facet)) {
    case "maxLength":
    case "minLength":
    case "length":
      return "length";
    case "fractionDigits":
    case "totalDigits":
      return "fractionDigits";
    case "enumeration":
      return "enumeration";
    default:
      return "other";
  }
}

/**
 * Href of the reference page for an issue, with `#<heading id>` appended when the page declares
 * an anchor for the issue's kind. Undefined when no page covers the code.
 */
export function resolveIssueHelpHref(
  issue: ValidationIssue,
  links: Readonly<Record<string, string>> | undefined,
  anchors: Readonly<Record<string, Readonly<Record<string, string>>>> | undefined,
): string | undefined {
  const href = links?.[issue.code.code];
  if (!href) {
    return undefined;
  }
  const key = issueAnchorKey(issue);
  const id = key ? anchors?.[issue.code.code]?.[key] : undefined;
  return id ? `${href}#${id}` : href;
}

/**
 * Problems with a page's declared `anchors`: unknown keys, and ids that match no heading.
 * `headingIds` are the ids the page renders (same slug function as the table of contents).
 */
export function checkIssueAnchors(
  anchors: unknown,
  codes: readonly string[],
  headingIds: readonly string[],
): string[] {
  if (anchors === undefined) {
    return [];
  }
  if (typeof anchors !== "object" || anchors === null || Array.isArray(anchors)) {
    return ["anchors must be a map of issue kind to heading id"];
  }
  const allowed = new Set(codes.flatMap((code) => ISSUE_ANCHOR_KEYS[code] ?? []));
  const problems: string[] = [];
  for (const [key, id] of Object.entries(anchors)) {
    if (!allowed.has(key)) {
      problems.push(`anchors.${key} is not a known issue kind for this page's codes`);
    } else if (typeof id !== "string" || !headingIds.includes(id)) {
      problems.push(`anchors.${key} points at "${String(id)}", which matches no heading`);
    }
  }
  return problems;
}
