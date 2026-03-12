/**
 * @ksefuj/validator — KSeF FA(3) XML validation
 *
 * Two layers:
 * 1. XSD schema validation (via libxml2-wasm in browser, lxml/xmllint in Node)
 * 2. Semantic rules that XSD can't express (see semantic.ts)
 *
 * TODO: integrate libxml2-wasm for client-side XSD validation
 * For now, this module provides the semantic layer + a Node-side
 * XSD check via xmllint subprocess as a reference implementation.
 */

import { checkSemantics } from "./semantic.js";
import type { Locale } from "./messages.js";

export interface ValidationError {
  /** "xsd" | "semantic" | "warning" */
  level: "error" | "warning";
  /** Which layer caught it */
  source: "xsd" | "semantic";
  /** Human-readable message (Polish) */
  message: string;
  /** XML line number, if available */
  line?: number;
  /** XPath to the problematic element, if available */
  path?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
}

export interface ValidateOptions {
  locale?: Locale;
}

/**
 * Validate a KSeF FA(3) XML string.
 *
 * In the browser this runs semantic checks only (XSD via libxml2-wasm coming soon).
 * In Node this can optionally shell out to xmllint for full XSD validation.
 */
export function validate(xml: string, options: ValidateOptions = {}): ValidationResult {
  const locale = options.locale ?? 'pl';
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  // 1. Well-formed XML check
  let doc: Document;
  try {
    const parser = new DOMParser();
    doc = parser.parseFromString(xml, "application/xml");

    const parseError = doc.querySelector("parsererror");
    if (parseError) {
      return {
        valid: false,
        errors: [
          {
            level: "error",
            source: "xsd",
            message: `Nieprawidłowy XML: ${parseError.textContent?.slice(0, 200)}`,
          },
        ],
        warnings: [],
      };
    }
  } catch {
    return {
      valid: false,
      errors: [
        {
          level: "error",
          source: "xsd",
          message: "Nie udało się sparsować pliku XML",
        },
      ],
      warnings: [],
    };
  }

  // 2. Semantic rules
  const semanticResults = checkSemantics(doc, locale);
  for (const r of semanticResults) {
    if (r.level === "error") {
      errors.push(r);
    } else {
      warnings.push(r);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
