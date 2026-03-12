/**
 * @ksefuj/validator — KSeF FA(3) XML validation
 *
 * Two layers:
 * 1. XSD schema validation (via libxml2-wasm)
 * 2. Semantic rules that XSD can't express (see semantic.ts)
 */

import { checkSemantics } from "./semantic.js";
import type { Locale } from "./messages.js";

export interface ValidationError {
  level: "error" | "warning";
  source: "xsd" | "semantic";
  message: string;
  line?: number;
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
 * XSD validation temporarily disabled due to schema dependency resolution issues.
 */
export async function validate(
  xml: string,
  options: ValidateOptions = {},
): Promise<ValidationResult> {
  const locale = options.locale ?? "pl";
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

  // 2. XSD validation temporarily disabled
  warnings.push({
    level: "warning",
    source: "xsd",
    message: "XSD validation temporarily disabled - schema dependency resolution needed.",
  });

  // 3. Semantic rules
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
