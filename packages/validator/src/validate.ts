/**
 * @ksefuj/validator — KSeF FA(3) XML validation
 *
 * Two-layer validation architecture:
 * 1. XSD schema validation (via libxml2-wasm)
 * 2. Semantic rules that XSD can't express (see semantic.ts)
 */

import { checkSemantics } from "./semantic.js";
import { validateXsd } from "./xsd.js";
import { XmlDocument } from "libxml2-wasm";
import type { Locale } from "./messages.js";

export interface ValidationError {
  level: "error" | "warning";
  source: "xsd" | "semantic" | "parse";
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
  enableXsdValidation?: boolean;
  enableSemanticValidation?: boolean;
}

// Environment detection utility
class EnvironmentDetector {
  private static _isNode: boolean | null = null;

  static isNode(): boolean {
    if (EnvironmentDetector._isNode === null) {
      EnvironmentDetector._isNode =
        typeof process !== "undefined" &&
        !!process.versions &&
        !!process.versions.node &&
        typeof window === "undefined";
    }
    return EnvironmentDetector._isNode;
  }

  static isBrowser(): boolean {
    return !EnvironmentDetector.isNode();
  }
}

// XML Parser abstraction
class XmlParser {
  /**
   * Parse XML string into a Document.
   * Uses DOMParser in browser, libxml2-wasm in Node.js.
   */
  static parse(xml: string): { doc: Document | null; error: ValidationError | null } {
    if (EnvironmentDetector.isBrowser()) {
      return XmlParser.parseBrowser(xml);
    } else {
      return XmlParser.parseNode(xml);
    }
  }

  private static parseBrowser(xml: string): {
    doc: Document | null;
    error: ValidationError | null;
  } {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, "application/xml");

      // Check for parser errors
      const parseError = doc.querySelector("parsererror");
      if (parseError) {
        const errorText = parseError.textContent || "XML parsing failed";
        return {
          doc: null,
          error: {
            level: "error",
            source: "parse",
            message: errorText.slice(0, 200),
          },
        };
      }

      return { doc, error: null };
    } catch (error) {
      return {
        doc: null,
        error: {
          level: "error",
          source: "parse",
          message: error instanceof Error ? error.message : "Failed to parse XML",
        },
      };
    }
  }

  private static parseNode(xml: string): { doc: Document | null; error: ValidationError | null } {
    // In Node.js, we validate well-formedness using libxml2-wasm
    // but don't return a Document (since it's not compatible with browser Document)
    try {
      const xmlDoc = XmlDocument.fromString(xml);
      xmlDoc.dispose();
      return { doc: null, error: null };
    } catch (error) {
      return {
        doc: null,
        error: {
          level: "error",
          source: "parse",
          message: error instanceof Error ? error.message : "Failed to parse XML",
        },
      };
    }
  }
}

// Main validation orchestrator
class ValidationOrchestrator {
  constructor(
    private readonly locale: Locale,
    private readonly enableXsd: boolean,
    private readonly enableSemantic: boolean,
  ) {}

  async validate(xml: string): Promise<ValidationResult> {
    const errors: ValidationError[] = [];
    const warnings: ValidationError[] = [];

    // Step 1: Well-formed XML check
    const { error: parseError } = XmlParser.parse(xml);
    if (parseError) {
      errors.push(parseError);
      return { valid: false, errors, warnings };
    }

    // Step 2: XSD validation (if enabled)
    if (this.enableXsd) {
      try {
        const xsdErrors = await validateXsd(xml);
        errors.push(...xsdErrors);
      } catch (error) {
        // XSD validation infrastructure failure - add as warning
        warnings.push({
          level: "warning",
          source: "xsd",
          message: `XSD validation unavailable: ${error instanceof Error ? error.message : String(error)}`,
        });
      }
    }

    // Step 3: Semantic validation
    if (this.enableSemantic) {
      try {
        const { XmlDocument } = await import("libxml2-wasm");
        const xmlDoc = XmlDocument.fromString(xml);

        try {
          const semanticResults = checkSemantics(
            xmlDoc as unknown as {
              find: (xpath: string, ns?: Record<string, string>) => unknown[];
              eval: (xpath: string, ns?: Record<string, string>) => unknown;
            },
            this.locale,
          );
          for (const result of semanticResults) {
            if (result.level === "error") {
              errors.push(result);
            } else {
              warnings.push(result);
            }
          }
        } finally {
          xmlDoc.dispose();
        }
      } catch (error) {
        warnings.push({
          level: "warning",
          source: "semantic",
          message: `Semantic validation failed: ${error instanceof Error ? error.message : String(error)}`,
        });
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }
}

/**
 * Validate a KSeF FA(3) XML string.
 * Includes both XSD schema validation and semantic rules checking.
 *
 * @param xml - The XML string to validate
 * @param options - Validation options
 * @returns Validation result with errors and warnings
 */
export async function validate(
  xml: string,
  options: ValidateOptions = {},
): Promise<ValidationResult> {
  const { locale = "pl", enableXsdValidation = true, enableSemanticValidation = true } = options;

  const orchestrator = new ValidationOrchestrator(
    locale,
    enableXsdValidation,
    enableSemanticValidation,
  );

  return orchestrator.validate(xml);
}
