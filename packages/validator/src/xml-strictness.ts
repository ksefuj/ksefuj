/**
 * @ksefuj/validator - Strict XML checks (raw text)
 *
 * KSeF API 2.4.0 tightened XML verification. Per the MF page "Weryfikacja faktury" an invoice
 * is rejected when it:
 *   - contains XML processing instructions,
 *   - contains Unicode characters discouraged by the W3C XML spec (ranges listed below),
 *   - starts with a UTF-8 BOM,
 *   - has an XML declaration that names an encoding other than UTF-8.
 * Production enforcement starts on 2026-10-19; until then KSeF only returns X-System-Warning.
 *
 * These constructs can be dropped or normalised by XML parsers, so the checks run on the raw
 * input string rather than on a parsed document.
 *
 * Sources:
 *   https://github.com/CIRFMF/ksef-api/blob/main/faktury/weryfikacja-faktury.md
 *   https://github.com/CIRFMF/ksef-api/blob/main/api-changelog.md (version 2.4.0)
 *   https://github.com/CIRFMF/ksef-api/issues/718 (enforcement date moved to 2026-10-19)
 */

import { ERROR_CODES } from "./error-codes.js";
import type { ValidationIssue } from "./types.js";

export const KSEF_XML_RULES_URL =
  "https://github.com/CIRFMF/ksef-api/blob/main/faktury/weryfikacja-faktury.md";

/** Date from which KSeF PROD rejects these constructs (issue #718). */
export const KSEF_STRICT_XML_ENFORCEMENT_DATE = "2026-10-19";

/**
 * Discouraged code point ranges, exactly as listed by MF (inclusive).
 * Note: plane-0 U+FFFE/U+FFFF are not in MF's list (XML parsers reject them anyway), and
 * U+0085 is deliberately excluded by the W3C ranges.
 */
function isDiscouraged(cp: number): boolean {
  if (cp >= 0x7f && cp <= 0x84) {
    return true;
  }
  if (cp >= 0x86 && cp <= 0x9f) {
    return true;
  }
  if (cp >= 0xfdd0 && cp <= 0xfdef) {
    return true;
  }
  // [#xNFFFE-#xNFFFF] for planes 1..16
  return cp >= 0x1fffe && cp <= 0x10ffff && (cp & 0xfffe) === 0xfffe;
}

function formatCodePoint(cp: number): string {
  return `U+${cp.toString(16).toUpperCase().padStart(4, "0")}`;
}

const SNIPPET_RADIUS = 15;

/** Individually reported findings per code; the rest are summarised in one issue. */
export const MAX_REPORTED_FINDINGS = 20;

function sanitizeSnippet(text: string): string {
  return text.replace(/[\r\n\t]+/g, " ");
}

/**
 * Forward-only line/column cursor. Offsets must be requested in non-decreasing order, so the
 * whole scan stays linear. Lines break on \r\n, \r or \n; columns count code points and a
 * leading BOM does not occupy a column.
 */
function createCursor(xml: string) {
  let offset = xml.charCodeAt(0) === 0xfeff ? 1 : 0;
  let line = 1;
  let column = 1;
  return (target: number): { line: number; column: number } => {
    while (offset < target) {
      const c = xml.charCodeAt(offset);
      if (c === 0x0a) {
        line++;
        column = 1;
        offset++;
      } else if (c === 0x0d) {
        line++;
        column = 1;
        offset += xml.charCodeAt(offset + 1) === 0x0a ? 2 : 1;
      } else if (c >= 0xd800 && c <= 0xdbff && offset + 1 < xml.length) {
        column++;
        offset += 2;
      } else {
        column++;
        offset++;
      }
    }
    return { line, column };
  };
}

export function checkStrictXml(xml: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const common = {
    source: KSEF_XML_RULES_URL,
    enforcedFrom: KSEF_STRICT_XML_ENFORCEMENT_DATE,
  };

  // --- BOM ---
  const hasBom = xml.charCodeAt(0) === 0xfeff;
  if (hasBom) {
    const errorDef = ERROR_CODES.XML_BOM_PRESENT;
    issues.push({
      code: errorDef.code,
      context: { location: { lineNumber: 1, columnNumber: 1 }, metadata: { ...common } },
      message: `The file starts with a UTF-8 byte order mark (BOM). KSeF requires UTF-8 without BOM and rejects such invoices from ${KSEF_STRICT_XML_ENFORCEMENT_DATE}.`,
      fixSuggestions: [],
    });
  }

  // --- Discouraged characters ---
  const charCursor = createCursor(xml);
  let charCount = 0;
  for (let i = 0; i < xml.length; ) {
    const cp = xml.codePointAt(i)!;
    const width = cp > 0xffff ? 2 : 1;
    if (isDiscouraged(cp)) {
      charCount++;
      if (charCount <= MAX_REPORTED_FINDINGS) {
        const { line, column } = charCursor(i);
        const label = formatCodePoint(cp);
        const before = sanitizeSnippet(xml.slice(Math.max(0, i - SNIPPET_RADIUS), i));
        const after = sanitizeSnippet(xml.slice(i + width, i + width + SNIPPET_RADIUS));
        const errorDef = ERROR_CODES.XML_DISCOURAGED_CHARACTER;
        issues.push({
          code: errorDef.code,
          context: {
            location: { lineNumber: line, columnNumber: column },
            actualValue: label,
            metadata: { codePoint: label, snippet: `${before}[${label}]${after}`, ...common },
          },
          message: `Character ${label} (discouraged by the W3C XML spec) at line ${line}, column ${column}: "${before}[${label}]${after}". KSeF rejects invoices containing it from ${KSEF_STRICT_XML_ENFORCEMENT_DATE}.`,
          fixSuggestions: [],
        });
      }
    }
    i += width;
  }
  if (charCount > MAX_REPORTED_FINDINGS) {
    const errorDef = ERROR_CODES.XML_DISCOURAGED_CHARACTER_MORE;
    const more = charCount - MAX_REPORTED_FINDINGS;
    issues.push({
      code: errorDef.code,
      context: {
        location: {},
        actualValue: charCount,
        metadata: { count: more, total: charCount, ...common },
      },
      message: `${more} more discouraged characters not listed individually (${charCount} in total).`,
      fixSuggestions: [],
    });
  }

  // --- Processing instructions and XML declaration encoding ---
  // The XML declaration is only legal at the very start (after an optional BOM). A `<?xml` that
  // is preceded only by whitespace is still treated as the declaration (the parser rejects the
  // whitespace itself), so it is not mislabelled as a processing instruction.
  const prologStart = hasBom ? 1 : 0;
  const piCursor = createCursor(xml);
  let piCount = 0;
  let i = 0;
  for (;;) {
    const lt = xml.indexOf("<", i);
    if (lt < 0) {
      break;
    }

    if (xml.startsWith("<!--", lt)) {
      const end = xml.indexOf("-->", lt + 4);
      if (end < 0) {
        break;
      }
      i = end + 3;
      continue;
    }
    if (xml.startsWith("<![CDATA[", lt)) {
      const end = xml.indexOf("]]>", lt + 9);
      if (end < 0) {
        break;
      }
      i = end + 3;
      continue;
    }
    if (!xml.startsWith("<?", lt)) {
      i = lt + 1;
      continue;
    }

    const end = xml.indexOf("?>", lt + 2);
    const body = xml.slice(lt + 2, end < 0 ? xml.length : end);
    const target = /^[^\s?>]*/.exec(body)![0];
    i = end < 0 ? xml.length : end + 2;

    if (target === "xml" && /^\s*$/.test(xml.slice(prologStart, lt))) {
      const encoding = /\bencoding\s*=\s*(["'])(.*?)\1/s.exec(body);
      if (encoding && !/^utf-8$/i.test(encoding[2]!)) {
        const { line, column } = piCursor(lt);
        const errorDef = ERROR_CODES.XML_ENCODING_NOT_UTF8;
        issues.push({
          code: errorDef.code,
          context: {
            location: { lineNumber: line, columnNumber: column },
            actualValue: encoding[2]!,
            metadata: { encoding: encoding[2]!, ...common },
          },
          message: `The XML declaration names encoding "${encoding[2]!}". KSeF requires UTF-8; invoices declaring another encoding are rejected from ${KSEF_STRICT_XML_ENFORCEMENT_DATE}.`,
          fixSuggestions: [],
        });
      }
      continue;
    }

    piCount++;
    if (piCount > MAX_REPORTED_FINDINGS) {
      continue;
    }
    const { line, column } = piCursor(lt);
    const errorDef = ERROR_CODES.XML_PROCESSING_INSTRUCTION;
    issues.push({
      code: errorDef.code,
      context: {
        location: { lineNumber: line, columnNumber: column },
        actualValue: target,
        metadata: { target, ...common },
      },
      message: `XML processing instruction <?${target} …?> at line ${line}, column ${column}. KSeF rejects invoices containing processing instructions from ${KSEF_STRICT_XML_ENFORCEMENT_DATE}.`,
      fixSuggestions: [],
    });
  }
  if (piCount > MAX_REPORTED_FINDINGS) {
    const errorDef = ERROR_CODES.XML_PROCESSING_INSTRUCTION_MORE;
    const more = piCount - MAX_REPORTED_FINDINGS;
    issues.push({
      code: errorDef.code,
      context: {
        location: {},
        actualValue: piCount,
        metadata: { count: more, total: piCount, ...common },
      },
      message: `${more} more processing instructions not listed individually (${piCount} in total).`,
      fixSuggestions: [],
    });
  }

  return issues;
}
