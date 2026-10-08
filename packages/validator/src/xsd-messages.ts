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
  /** Length libxml2 reports for length facets, which do not quote the value itself */
  readonly actualLength?: number;
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

const XML_NAMESPACE_PREFIX = "{http://www.w3.org/XML/1998/namespace}";

/** Readable attribute name: `xml:lang` for the XML namespace, otherwise the local name. */
function readableAttribute(name: string): string {
  return name.startsWith(XML_NAMESPACE_PREFIX)
    ? `xml:${name.slice(XML_NAMESPACE_PREFIX.length)}`
    : stripNamespaces(name);
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

/**
 * What libxml2 prints right after the quoted value, per facet. The value comes from the user's
 * file and may itself contain quotes or text like "' is ", so the value is cut at the LAST
 * occurrence of the facet's own tail rather than at the first thing that looks like one.
 */
const VALUE_TAILS: Record<string, readonly string[]> = {
  pattern: ["' is not accepted by the pattern '"],
  enumeration: ["' is not an element of the set {"],
  maxLength: ["' has a length of '"],
  minLength: ["' has a length of '"],
  length: ["' has a length of '"],
  fractionDigits: ["' has more fractional digits than are allowed ('"],
  totalDigits: ["' has more digits than are allowed ('"],
  minInclusive: ["' is less than the minimum value allowed ('"],
  maxInclusive: ["' is greater than the maximum value allowed ('"],
  minExclusive: ["' must be greater than '"],
  maxExclusive: ["' must be less than '"],
};

const VALUE_PREFIX = /the value '/i;

/** The value libxml2 quoted in a facet message, or undefined when it quotes none. */
function parseFacetValue(message: string, facet: string): string | undefined {
  const start = VALUE_PREFIX.exec(message);
  if (!start) {
    return undefined;
  }
  const from = start.index + start[0].length;
  const lower = message.toLowerCase();
  const tails = VALUE_TAILS[facet];
  if (tails) {
    const end = Math.max(...tails.map((tail) => lower.lastIndexOf(tail, message.length)));
    return end >= from ? message.slice(from, end) : undefined;
  }
  // Facets without a known tail (e.g. whiteSpace): first plausible tail
  return /^(.*?)' (?:is|has|does|must|not)\b/is.exec(message.slice(from))?.[1];
}

export function parseXsdMessage(message: string): ParsedXsdMessage {
  const elementMatch = /^\s*element '([^']*)'/i.exec(message);
  const rawElement = elementMatch?.[1];
  const element = rawElement ? stripNamespaces(rawElement) : undefined;
  const rawAttribute = /,\s*attribute '([^']*)'/i.exec(message)?.[1];
  const attribute = rawAttribute !== undefined ? readableAttribute(rawAttribute) : undefined;
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
    const rawAttr = /the attribute '([^']*)'/i.exec(message)?.[1];
    const attr = attribute ?? (rawAttr !== undefined ? readableAttribute(rawAttr) : undefined);
    return { code: "ELEMENT_NOT_ALLOWED", element, attribute: attr };
  }

  // Required attribute missing
  if (/the attribute '[^']*' is required but missing/i.test(message)) {
    const rawAttr = /the attribute '([^']*)'/i.exec(message)?.[1];
    const attr = attribute ?? (rawAttr !== undefined ? readableAttribute(rawAttr) : undefined);
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
    const actualValue = parseFacetValue(message, facet);
    const lengthText = /has a length of '(\d+)'/i.exec(message)?.[1];
    const actualLength = lengthText !== undefined ? Number(lengthText) : undefined;
    const expected = facet === "enumeration" ? parseEnumerationMembers(message) : undefined;
    return {
      code: "INVALID_ELEMENT_VALUE",
      ...base,
      facet,
      ...(actualValue !== undefined ? { actualValue } : {}),
      ...(actualLength !== undefined ? { actualLength } : {}),
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
