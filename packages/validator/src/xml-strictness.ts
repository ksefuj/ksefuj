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

/** Discouraged code point ranges, exactly as listed by MF (inclusive). */
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

function sanitizeSnippet(text: string): string {
  return text.replace(/[\r\n\t]+/g, " ");
}

export function checkStrictXml(xml: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // Offsets of line starts. XML treats \r\n, \r and \n as one line break.
  const lineStarts = [0];
  for (let i = 0; i < xml.length; i++) {
    const c = xml.charCodeAt(i);
    if (c === 0x0a) {
      lineStarts.push(i + 1);
    } else if (c === 0x0d) {
      if (xml.charCodeAt(i + 1) === 0x0a) {
        i++;
      }
      lineStarts.push(i + 1);
    }
  }

  const position = (offset: number): { line: number; column: number } => {
    let lo = 0;
    let hi = lineStarts.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (lineStarts[mid]! <= offset) {
        lo = mid;
      } else {
        hi = mid - 1;
      }
    }
    // Column counts code points, not UTF-16 units
    const column = Array.from(xml.slice(lineStarts[lo]!, offset)).length + 1;
    return { line: lo + 1, column };
  };

  // --- BOM ---
  const hasBom = xml.charCodeAt(0) === 0xfeff;
  if (hasBom) {
    const errorDef = ERROR_CODES.XML_BOM_PRESENT;
    issues.push({
      code: errorDef.code,
      context: {
        location: { lineNumber: 1, columnNumber: 1 },
        metadata: { source: KSEF_XML_RULES_URL, enforcedFrom: KSEF_STRICT_XML_ENFORCEMENT_DATE },
      },
      message: `The file starts with a UTF-8 byte order mark (BOM). KSeF requires UTF-8 without BOM and rejects such invoices from ${KSEF_STRICT_XML_ENFORCEMENT_DATE}.`,
      fixSuggestions: [],
    });
  }

  // --- Discouraged characters ---
  for (let i = 0; i < xml.length; ) {
    const cp = xml.codePointAt(i)!;
    const width = cp > 0xffff ? 2 : 1;
    if (isDiscouraged(cp)) {
      const { line, column } = position(i);
      const label = formatCodePoint(cp);
      const before = sanitizeSnippet(xml.slice(Math.max(0, i - SNIPPET_RADIUS), i));
      const after = sanitizeSnippet(xml.slice(i + width, i + width + SNIPPET_RADIUS));
      const errorDef = ERROR_CODES.XML_DISCOURAGED_CHARACTER;
      issues.push({
        code: errorDef.code,
        context: {
          location: { lineNumber: line, columnNumber: column },
          actualValue: label,
          metadata: {
            codePoint: label,
            snippet: `${before}[${label}]${after}`,
            source: KSEF_XML_RULES_URL,
            enforcedFrom: KSEF_STRICT_XML_ENFORCEMENT_DATE,
          },
        },
        message: `Character ${label} (discouraged by the W3C XML spec) at line ${line}, column ${column}: "${before}[${label}]${after}". KSeF rejects invoices containing it from ${KSEF_STRICT_XML_ENFORCEMENT_DATE}.`,
        fixSuggestions: [],
      });
    }
    i += width;
  }

  // --- Processing instructions and XML declaration encoding ---
  // The XML declaration is only legal at the very start (after an optional BOM).
  const declarationOffset = hasBom ? 1 : 0;
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

    if (lt === declarationOffset && target === "xml") {
      const encoding = /\bencoding\s*=\s*(["'])(.*?)\1/s.exec(body);
      if (encoding && !/^utf-8$/i.test(encoding[2]!)) {
        const { line, column } = position(lt);
        const errorDef = ERROR_CODES.XML_ENCODING_NOT_UTF8;
        issues.push({
          code: errorDef.code,
          context: {
            location: { lineNumber: line, columnNumber: column },
            actualValue: encoding[2]!,
            metadata: {
              encoding: encoding[2]!,
              source: KSEF_XML_RULES_URL,
              enforcedFrom: KSEF_STRICT_XML_ENFORCEMENT_DATE,
            },
          },
          message: `The XML declaration names encoding "${encoding[2]!}". KSeF requires UTF-8; invoices declaring another encoding are rejected from ${KSEF_STRICT_XML_ENFORCEMENT_DATE}.`,
          fixSuggestions: [],
        });
      }
      continue;
    }

    const { line, column } = position(lt);
    const errorDef = ERROR_CODES.XML_PROCESSING_INSTRUCTION;
    issues.push({
      code: errorDef.code,
      context: {
        location: { lineNumber: line, columnNumber: column },
        actualValue: target,
        metadata: {
          target,
          source: KSEF_XML_RULES_URL,
          enforcedFrom: KSEF_STRICT_XML_ENFORCEMENT_DATE,
        },
      },
      message: `XML processing instruction <?${target} …?> at line ${line}, column ${column}. KSeF rejects invoices containing processing instructions from ${KSEF_STRICT_XML_ENFORCEMENT_DATE}.`,
      fixSuggestions: [],
    });
  }

  return issues;
}
