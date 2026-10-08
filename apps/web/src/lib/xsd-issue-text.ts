/**
 * Plain-language text for structured XSD issues.
 *
 * Pure function: builds a short message (and an optional "how to fix" hint) from the structured
 * issue context and the `validator.xsd.*` translations. Returns null for issues it cannot explain
 * (SCHEMA_VALIDATION_FAILED and unknown codes) so callers can fall back to the raw-text path.
 */

import type { ValidationIssue } from "@ksefuj/validator";

export type Translate = (key: string, params?: Record<string, string | number>) => string;

export interface XsdIssueText {
  message: string;
  fix?: string;
}

/** Namespace the FA(3) root element has to declare. */
export const FA3_NAMESPACE = "http://crd.gov.pl/wzor/2025/06/25/13775/";

const MAX_EXPECTED_ELEMENTS = 6;
const MAX_ENUM_VALUES = 8;
const MAX_SUGGESTION_DISTANCE = 2;
const MIN_SUGGESTION_LENGTH = 4;

/** Facets whose libxml2 message ends with the limit, e.g. "... maximum length of '10'." */
const LIMIT_FACETS = new Set([
  "maxLength",
  "minLength",
  "length",
  "fractionDigits",
  "totalDigits",
  "minInclusive",
  "maxInclusive",
  "minExclusive",
  "maxExclusive",
]);

/** Fix hints keyed by XSD type name. */
const TYPE_HINTS: Record<string, string> = {
  TKwotowy: "amount",
  TKwotowy2: "unitPrice",
  TDataT: "date",
  TData: "date",
  TNrNIP: "nip",
  TIlosci: "quantity",
  TKodKraju: "countryCode",
  KodKraju: "countryCode",
};

/** Fix hints keyed by element name, for values libxml2 reports without a named type. */
const ELEMENT_HINTS: Record<string, string> = {
  NIP: "nip",
  KodKraju: "countryCode",
  DataWytworzeniaFa: "dateTime",
};

/**
 * XSD type by its pattern, for pattern-facet messages: libxml2 reports the failing pattern but not
 * the type name when the pattern sits directly on the element's type. Keep in sync with the
 * `xsd:pattern` values in the bundled schemat.xsd.
 */
const TYPE_BY_PATTERN: Record<string, string> = {
  "-?([1-9]\\d{0,15}|0)(\\.\\d{1,2})?": "TKwotowy",
  "-?([1-9]\\d{0,13}|0)(\\.\\d{1,8})?": "TKwotowy2",
  "-?([1-9]\\d{0,15}|0)(\\.\\d{1,6})?": "TIlosci",
  "[1-9]((\\d[1-9])|([1-9]\\d))\\d{7}": "TNrNIP",
  "((\\d{4})-(\\d{2})-(\\d{2}))": "TData",
};

function typeFromPattern(originalMessage: string | undefined): string | undefined {
  const pattern = originalMessage
    ? /accepted by the pattern '(.*)'\./s.exec(originalMessage)?.[1]
    : undefined;
  return pattern ? TYPE_BY_PATTERN[pattern] : undefined;
}

/** Values come from the user's file and end up inside inline-code markdown. */
function code(value: unknown): string {
  return `\`${String(value).replace(/`/g, "'")}\``;
}

function codeList(values: readonly string[], max: number, t: Translate): string {
  const shown = values.slice(0, max).map(code).join(", ");
  const rest = values.length - max;
  return rest > 0 ? t("xsd.listMore", { list: shown, count: rest }) : shown;
}

export function editDistance(a: string, b: string): number {
  const left = a.toLowerCase();
  const right = b.toLowerCase();
  let previous = Array.from({ length: right.length + 1 }, (_, i) => i);
  for (let i = 1; i <= left.length; i++) {
    const current = [i];
    for (let j = 1; j <= right.length; j++) {
      const cost = left[i - 1] === right[j - 1] ? 0 : 1;
      current[j] = Math.min(previous[j] + 1, current[j - 1] + 1, previous[j - 1] + cost);
    }
    previous = current;
  }
  return previous[right.length];
}

/**
 * The single expected element name that `element` most likely is a typo of, if any. Numbered
 * fields (P_1 vs P_2, P_13_1 vs P_13_2) are different fields, not typos, so names that differ only
 * in digits are never suggested.
 */
export function suggestElementName(element: string, expected: readonly string[]): string | null {
  if (expected.includes(element) || element.length < MIN_SUGGESTION_LENGTH) {
    return null;
  }
  const withoutDigits = (name: string) => name.replace(/\d+/g, "").toLowerCase();
  let best: string | null = null;
  let bestDistance = Infinity;
  let tie = false;
  for (const candidate of expected) {
    if (withoutDigits(candidate) === withoutDigits(element) && /\d/.test(element + candidate)) {
      continue;
    }
    const distance = editDistance(element, candidate);
    if (distance > MAX_SUGGESTION_DISTANCE) {
      continue;
    }
    if (distance < bestDistance) {
      best = candidate;
      bestDistance = distance;
      tie = false;
    } else if (distance === bestDistance) {
      tie = true;
    }
  }
  return tie ? null : best;
}

/** The limit libxml2 quotes last in a facet message (a number), if there is one. */
function facetLimit(originalMessage: string | undefined): string | undefined {
  if (!originalMessage) {
    return undefined;
  }
  const quoted = [...originalMessage.matchAll(/'([^']*)'/g)].map((m) => m[1]);
  const last = quoted[quoted.length - 1];
  return last !== undefined && /^-?\d+(?:\.\d+)?$/.test(last) ? last : undefined;
}

function str(value: unknown): string | undefined {
  return typeof value === "string" && value !== "" ? value : undefined;
}

function withLine(message: string, issue: ValidationIssue, t: Translate): string {
  const line = issue.context.location.lineNumber;
  return line ? `${message} ${t("xsd.atLine", { line })}` : message;
}

function unexpectedElement(issue: ValidationIssue, t: Translate): XsdIssueText {
  const element = issue.context.location.element;
  const expected = issue.context.expectedValues ?? [];
  const parts = [
    element ? t("xsd.unexpected", { element: code(element) }) : t("xsd.unexpectedUnnamed"),
  ];
  if (expected.length > 0) {
    parts.push(t("xsd.expectedHere", { expected: codeList(expected, MAX_EXPECTED_ELEMENTS, t) }));
  }
  const suggestion = element ? suggestElementName(element, expected) : null;
  if (suggestion) {
    parts.push(t("xsd.didYouMean", { suggestion: code(suggestion) }));
  }
  return {
    message: withLine(parts.join(" "), issue, t),
    fix: t(suggestion ? "xsd.fix.rename" : "xsd.fix.order"),
  };
}

function requiredMissing(issue: ValidationIssue, t: Translate): XsdIssueText {
  const element = issue.context.location.element;
  const attribute = str(issue.context.metadata?.attribute);
  const expected = issue.context.expectedValues ?? [];
  const where = element ? code(element) : t("xsd.thisElement");
  let message: string;
  if (attribute) {
    message = t("xsd.missingAttribute", { element: where, attribute: code(attribute) });
  } else if (expected.length > 0) {
    message = t("xsd.missing", {
      element: where,
      expected: codeList(expected, MAX_EXPECTED_ELEMENTS, t),
    });
  } else {
    message = t("xsd.missingNoExpected", { element: where });
  }
  return { message: withLine(message, issue, t), fix: t("xsd.fix.add") };
}

/** Format hint (amount, date, nip, ...) for an invalid value, from its XSD type or element name. */
export function hintFor(
  typeName: string | undefined,
  element: string | undefined,
  originalMessage?: string,
): string | undefined {
  return (
    (typeName ? TYPE_HINTS[typeName] : undefined) ??
    (element ? ELEMENT_HINTS[element] : undefined) ??
    TYPE_HINTS[typeFromPattern(originalMessage) ?? ""]
  );
}

function invalidValue(issue: ValidationIssue, t: Translate): XsdIssueText {
  const element = issue.context.location.element;
  const metadata = issue.context.metadata;
  const facet = str(metadata?.facet) ?? "type";
  const typeName = str(metadata?.typeName);
  const actual = issue.context.actualValue;
  const hasValue = actual !== undefined && String(actual) !== "";
  const field = element ? code(element) : t("xsd.thisElement");
  const value = hasValue ? code(actual) : "";
  const rawLength = metadata?.actualLength;
  const actualLength = typeof rawLength === "number" ? rawLength : undefined;
  const limit = facetLimit(str(metadata?.originalMessage));
  const hint = hintFor(typeName, element, str(metadata?.originalMessage));
  const fixFor = (fallback: string) =>
    hint ? t(`xsd.fix.${hint}`) : t(`xsd.fix.generic.${fallback}`);

  let message: string;
  let fix: string | undefined;

  if (facet === "content") {
    message = t("xsd.value.content", { element: field });
    fix = t("xsd.fix.generic.content");
  } else if (
    (facet === "maxLength" || facet === "minLength" || facet === "length") &&
    !hasValue &&
    actualLength !== undefined &&
    actualLength > 0 &&
    limit !== undefined
  ) {
    // libxml2 does not quote the value for length facets, only its length
    const key = { maxLength: "tooLong", minLength: "tooShort", length: "wrongLength" }[facet];
    message = t(`xsd.value.${key}`, { element: field, actual: actualLength, limit });
    fix = fixFor(facet);
  } else if (!hasValue) {
    message = t("xsd.value.empty", { element: field });
    fix = hint ? t(`xsd.fix.${hint}`) : t("xsd.fix.generic.empty");
  } else if (facet === "enumeration") {
    const allowed = issue.context.expectedValues ?? [];
    message =
      allowed.length > 0
        ? t("xsd.value.enumeration", {
            element: field,
            value,
            allowed: codeList(allowed, MAX_ENUM_VALUES, t),
          })
        : t("xsd.value.invalid", { element: field, value });
    fix = fixFor("enumeration");
  } else if (LIMIT_FACETS.has(facet) && limit !== undefined) {
    message = t(`xsd.value.${facet}`, { element: field, value, limit });
    fix = fixFor(facet);
  } else if (facet === "pattern" || facet === "type") {
    // A known hint means the format is the problem; otherwise the plain "not valid here" wording
    const wording = facet === "type" && !hint ? "type" : "pattern";
    message = t(`xsd.value.${wording}`, { element: field, value });
    fix = fixFor(facet);
  } else {
    message = t("xsd.value.invalid", { element: field, value });
    fix = fixFor("other");
  }

  return { message: withLine(message, issue, t), fix };
}

function wrongNamespace(issue: ValidationIssue, t: Translate): XsdIssueText {
  return {
    message: withLine(
      t("xsd.wrongNamespace", { example: `\`<Faktura xmlns="${FA3_NAMESPACE}">\`` }),
      issue,
      t,
    ),
    fix: t("xsd.fix.namespace"),
  };
}

function notAllowed(issue: ValidationIssue, t: Translate): XsdIssueText {
  const element = issue.context.location.element;
  const attribute = str(issue.context.metadata?.attribute);
  const where = element ? code(element) : t("xsd.thisElement");
  const message = attribute
    ? t("xsd.attributeNotAllowed", { attribute: code(attribute), element: where })
    : t("xsd.elementNotAllowed", { element: where });
  return { message: withLine(message, issue, t), fix: t("xsd.fix.remove") };
}

/**
 * Build the plain-language text for an XSD issue, or null when the issue should fall back to the
 * raw-message simplifier.
 */
export function buildXsdIssueText(issue: ValidationIssue, t: Translate): XsdIssueText | null {
  if (issue.code.domain !== "xsd") {
    return null;
  }
  switch (issue.code.code) {
    case "UNEXPECTED_ELEMENT":
      return unexpectedElement(issue, t);
    case "REQUIRED_ELEMENT_MISSING":
      return requiredMissing(issue, t);
    case "INVALID_ELEMENT_VALUE":
      return invalidValue(issue, t);
    case "WRONG_NAMESPACE":
      return wrongNamespace(issue, t);
    case "ELEMENT_NOT_ALLOWED":
      return notAllowed(issue, t);
    default:
      return null;
  }
}
