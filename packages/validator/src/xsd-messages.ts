/**
 * @ksefuj/validator - libxml2 XSD message parser
 *
 * Pure, dependency-free classifier for the raw error messages libxml2 emits during XSD
 * validation. Matching is explicit and case-insensitive; anything unrecognised falls back to
 * SCHEMA_VALIDATION_FAILED.
 */

export type XsdMessageCode =
  | "UNEXPECTED_ELEMENT"
  | "REQUIRED_ELEMENT_MISSING"
  | "INVALID_ELEMENT_VALUE"
  | "WRONG_NAMESPACE"
  | "ELEMENT_NOT_ALLOWED"
  | "SCHEMA_VALIDATION_FAILED";

export interface ParsedXsdMessage {
  readonly code: XsdMessageCode;
  /** Local name of the element the message refers to (namespace stripped) */
  readonly element?: string;
  readonly attribute?: string;
  /** Local names of elements (or enumeration members) the schema expected */
  readonly expected?: readonly string[];
  readonly actualValue?: string;
  /** XSD facet ('pattern', 'enumeration', 'maxLength', ...), 'type' or 'content' */
  readonly facet?: string;
  /** Local name of the XSD type, when libxml2 reports a named one */
  readonly typeName?: string;
}

/** The FA(3) root element; used to tell a wrong namespace from any other unknown root. */
const ROOT_ELEMENT = "Faktura";

const NAMESPACE_URI = /\{[^}]*\}/g;

/** Strip `{namespace-uri}` prefixes, leaving local names. */
function stripNamespaces(text: string): string {
  return text.replace(NAMESPACE_URI, "");
}

function parseExpected(message: string): string[] | undefined {
  const match = /expected is (?:one of )?\(\s*(.*?)\s*\)/i.exec(message);
  if (!match) {
    return undefined;
  }
  const items = stripNamespaces(match[1])
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item && item !== "#PCDATA");
  return items.length > 0 ? items : undefined;
}

function parseEnumerationMembers(message: string): string[] | undefined {
  const match = /is not an element of the set \{(.*)\}/is.exec(message);
  if (!match) {
    return undefined;
  }
  const items = [...match[1].matchAll(/'([^']*)'/g)].map((m) => m[1]);
  return items.length > 0 ? items : undefined;
}

/** Facets libxml2 reports as `[facet 'name']`, in their canonical camelCase spelling. */
const FACETS = [
  "pattern",
  "enumeration",
  "maxLength",
  "minLength",
  "length",
  "fractionDigits",
  "totalDigits",
  "minInclusive",
  "maxInclusive",
  "minExclusive",
  "maxExclusive",
  "whiteSpace",
];

function canonicalFacet(raw: string): string {
  return FACETS.find((f) => f.toLowerCase() === raw.toLowerCase()) ?? raw;
}

export function parseXsdMessage(message: string): ParsedXsdMessage {
  const elementMatch = /^\s*element '([^']*)'/i.exec(message);
  const rawElement = elementMatch?.[1];
  const element = rawElement ? stripNamespaces(rawElement) : undefined;
  const attribute = /,\s*attribute '([^']*)'/i.exec(message)?.[1];
  const base = { element, ...(attribute !== undefined ? { attribute } : {}) };
  // Message text after the "Element '...'[, attribute '...']: " prefix
  const body = message.replace(/^\s*element '[^']*'(?:,\s*attribute '[^']*')?:\s*/i, "");

  // (f) Root element has no matching global declaration: no namespace or a wrong one.
  if (/no matching global declaration available for the validation root/i.test(message)) {
    if (element === ROOT_ELEMENT) {
      return { code: "WRONG_NAMESPACE", ...base };
    }
    return { code: "SCHEMA_VALIDATION_FAILED", ...base };
  }

  // (g) Attribute not allowed
  if (/the attribute '[^']*' is not allowed/i.test(message)) {
    const attr = attribute ?? /the attribute '([^']*)'/i.exec(message)?.[1];
    return { code: "ELEMENT_NOT_ALLOWED", element, attribute: attr };
  }

  // Required attribute missing
  if (/the attribute '[^']*' is required but missing/i.test(message)) {
    const attr = attribute ?? /the attribute '([^']*)'/i.exec(message)?.[1];
    return { code: "REQUIRED_ELEMENT_MISSING", element, attribute: attr };
  }

  // (b) Missing child element(s)
  if (/missing child element\(s\)/i.test(message)) {
    return { code: "REQUIRED_ELEMENT_MISSING", ...base, expected: parseExpected(message) };
  }

  // (a) Unexpected element: wrong order or typo
  if (/this element is not expected/i.test(message)) {
    return { code: "UNEXPECTED_ELEMENT", ...base, expected: parseExpected(message) };
  }

  // Facet violations (c), (e)
  const facetMatch = /\[facet '([^']*)'\]/i.exec(message);
  if (facetMatch) {
    const facet = canonicalFacet(facetMatch[1]);
    const actualValue = /the value '(.*?)' (?:is|has|does|must|not)\b/is.exec(message)?.[1];
    const expected = facet === "enumeration" ? parseEnumerationMembers(message) : undefined;
    return {
      code: "INVALID_ELEMENT_VALUE",
      ...base,
      facet,
      ...(actualValue !== undefined ? { actualValue } : {}),
      ...(expected ? { expected } : {}),
    };
  }

  // (d) Atomic / union / list type violations
  const typeMatch =
    /^'(.*)' is not a valid value of the (?:local )?(?:atomic|union|list) type(?: '([^']*)')?/is.exec(
      body,
    );
  if (typeMatch) {
    const typeName = typeMatch[2] ? stripNamespaces(typeMatch[2]) : undefined;
    return {
      code: "INVALID_ELEMENT_VALUE",
      ...base,
      facet: "type",
      actualValue: typeMatch[1],
      ...(typeName ? { typeName } : {}),
    };
  }

  // Text where only child elements are allowed
  if (/character content other than whitespace is not allowed/i.test(message)) {
    return { code: "INVALID_ELEMENT_VALUE", ...base, facet: "content" };
  }

  return { code: "SCHEMA_VALIDATION_FAILED", ...base };
}
