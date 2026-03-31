/**
 * @ksefuj/validator — KSeF FA(3) XML validation
 *
 * Two-layer validation architecture:
 * 1. XSD schema validation (via libxml2-wasm)
 * 2. Semantic rules that XSD can't express
 */

import { checkSemantics } from "./semantic.js";
import { validateXsd } from "./xsd.js";
import { ERROR_CODES } from "./error-codes.js";
import type {
  CurrencyRate,
  XmlDocument as IXmlDocument,
  ValidateOptions,
  ValidationAssertion,
  ValidationIssue,
  ValidationMetadata,
  ValidationResult,
} from "./types.js";

// Lazy-loaded libxml2-wasm module for Node.js validation
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let libxml2Module: any = null;

async function getLibxml2Module() {
  if (!libxml2Module) {
    libxml2Module = await import("libxml2-wasm");
  }
  return libxml2Module;
}

const VALIDATOR_VERSION = "0.3.0";
const SCHEMA_VERSION = "FA(3) 2025-06-25";

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
   * Parse XML string for well-formedness check.
   * Uses DOMParser in browser, libxml2-wasm in Node.js.
   */
  static async checkWellFormed(xml: string): Promise<ValidationIssue | null> {
    if (EnvironmentDetector.isBrowser()) {
      return XmlParser.checkBrowser(xml);
    } else {
      return await XmlParser.checkNode(xml);
    }
  }

  private static checkBrowser(xml: string): ValidationIssue | null {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, "application/xml");

      // Check for parser errors
      const parseError = doc.querySelector("parsererror");
      if (parseError) {
        const errorText = parseError.textContent || "XML parsing failed";
        const errorDef = ERROR_CODES.MALFORMED_XML;

        return {
          code: errorDef.code,
          context: {
            location: {},
            metadata: {
              originalMessage: errorText.slice(0, 200),
            },
          },
          message: `XML is not well-formed: ${errorText.slice(0, 200)}`,
          fixSuggestions: [],
        };
      }

      return null;
    } catch (error) {
      const errorDef = ERROR_CODES.MALFORMED_XML;
      return {
        code: errorDef.code,
        context: {
          location: {},
          metadata: {
            originalMessage: error instanceof Error ? error.message : String(error),
          },
        },
        message: `Failed to parse XML: ${error instanceof Error ? error.message : String(error)}`,
        fixSuggestions: [],
      };
    }
  }

  private static async checkNode(xml: string): Promise<ValidationIssue | null> {
    // In Node.js, validate well-formedness using libxml2-wasm
    try {
      const libxml2 = await getLibxml2Module();
      const { XmlDocument } = libxml2;
      const xmlDoc = XmlDocument.fromString(xml);
      xmlDoc.dispose();
      return null;
    } catch (error) {
      const errorDef = ERROR_CODES.MALFORMED_XML;
      return {
        code: errorDef.code,
        context: {
          location: {},
          metadata: {
            originalMessage: error instanceof Error ? error.message : String(error),
          },
        },
        message: `XML is not well-formed: ${error instanceof Error ? error.message : String(error)}`,
        fixSuggestions: [],
      };
    }
  }
}

// Main validation orchestrator
class ValidationOrchestrator {
  private readonly startTime: number;
  private rulesExecuted = 0;
  private elementsValidated = 0;

  constructor(
    private readonly enableXsd: boolean,
    private readonly enableSemantic: boolean,
    private readonly collectAssertions: boolean,
    private readonly maxIssues: number,
    private readonly currencyRates?: Record<string, CurrencyRate[] | null>,
  ) {
    this.startTime = Date.now();
  }

  async validate(xml: string): Promise<ValidationResult> {
    const issues: ValidationIssue[] = [];
    const assertions: ValidationAssertion[] = [];

    // Step 1: Well-formed XML check
    const parseError = await XmlParser.checkWellFormed(xml);
    if (parseError) {
      issues.push(parseError);
      return this.buildResult(issues, assertions, false);
    }

    // Add assertion for well-formed XML
    if (this.collectAssertions) {
      assertions.push({
        domain: "xsd",
        aspect: "well_formed",
        description: "XML document is well-formed",
        elements: ["Document structure"],
        confidence: 1.0,
      });
    }

    // Step 2: XSD validation (if enabled)
    if (this.enableXsd) {
      try {
        const xsdResult = await validateXsd(xml, this.collectAssertions);
        issues.push(...xsdResult.issues);
        assertions.push(...xsdResult.assertions);
        this.rulesExecuted++;
      } catch (error) {
        // XSD validation infrastructure failure
        const errorDef = ERROR_CODES.VALIDATOR_INITIALIZATION_FAILED;
        issues.push({
          code: errorDef.code,
          context: {
            location: {},
            metadata: {
              reason: error instanceof Error ? error.message : String(error),
            },
          },
          message: `XSD validation unavailable: ${error instanceof Error ? error.message : String(error)}`,
          fixSuggestions: [],
        });
      }
    }

    // Step 3: Semantic validation (if enabled)
    if (this.enableSemantic && (!this.maxIssues || issues.length < this.maxIssues)) {
      try {
        // Lazy load libxml2-wasm for semantic validation
        const libxml2 = await getLibxml2Module();
        const { XmlDocument } = libxml2;
        const xmlDoc = XmlDocument.fromString(xml);

        try {
          const semanticResult = checkSemantics(
            xmlDoc as unknown as IXmlDocument,
            this.collectAssertions,
            this.currencyRates,
          );
          issues.push(...semanticResult.issues);
          assertions.push(...semanticResult.assertions);
          this.rulesExecuted += semanticResult.issues.length + semanticResult.assertions.length;
        } finally {
          xmlDoc.dispose();
        }
      } catch (error) {
        // Semantic validation failure
        const errorDef = ERROR_CODES.VALIDATOR_INITIALIZATION_FAILED;
        issues.push({
          code: errorDef.code,
          context: {
            location: {},
            metadata: {
              reason: error instanceof Error ? error.message : String(error),
              phase: "semantic",
            },
          },
          message: `Semantic validation failed: ${error instanceof Error ? error.message : String(error)}`,
          fixSuggestions: [],
        });
      }
    }

    // Limit issues if maxIssues is set
    const limitedIssues =
      this.maxIssues && issues.length > this.maxIssues ? issues.slice(0, this.maxIssues) : issues;

    // Determine if valid (no errors, warnings are ok)
    const hasErrors = limitedIssues.some((issue) => issue.code.severity === "error");

    return this.buildResult(limitedIssues, assertions, !hasErrors);
  }

  private buildResult(
    issues: ValidationIssue[],
    assertions: ValidationAssertion[],
    valid: boolean,
  ): ValidationResult {
    const metadata: ValidationMetadata = {
      validationTimeMs: Date.now() - this.startTime,
      rulesExecuted: this.rulesExecuted,
      elementsValidated: this.elementsValidated,
      schemaVersion: SCHEMA_VERSION,
      validatorVersion: VALIDATOR_VERSION,
    };

    return {
      valid,
      issues,
      assertions,
      metadata,
    };
  }
}

/**
 * Validate a KSeF FA(3) XML string.
 * Returns structured validation result with issues and assertions.
 * NEVER throws - all errors are returned as ValidationResult.
 *
 * @param xml - The XML string to validate
 * @param options - Validation options
 * @returns Comprehensive validation result
 */
export async function validate(
  xml: string,
  options: ValidateOptions = {},
): Promise<ValidationResult> {
  try {
    const {
      enableXsdValidation = true,
      enableSemanticValidation = true,
      collectAssertions = false,
      maxIssues = undefined,
      currencyRates = undefined,
    } = options;

    const orchestrator = new ValidationOrchestrator(
      enableXsdValidation,
      enableSemanticValidation,
      collectAssertions,
      maxIssues ?? Number.MAX_SAFE_INTEGER,
      currencyRates,
    );

    return await orchestrator.validate(xml);
  } catch (error) {
    // Catch any unexpected errors and return structured result
    const errorDef = ERROR_CODES.EXECUTION_ERROR;
    const metadata: ValidationMetadata = {
      validationTimeMs: 0,
      rulesExecuted: 0,
      elementsValidated: 0,
      schemaVersion: SCHEMA_VERSION,
      validatorVersion: VALIDATOR_VERSION,
    };

    return {
      valid: false,
      issues: [
        {
          code: errorDef.code,
          context: {
            location: {},
            metadata: {
              originalError: error instanceof Error ? error.message : String(error),
              stackTrace: error instanceof Error ? error.stack : undefined,
            },
          },
          message: `Validation failed: ${error instanceof Error ? error.message : String(error)}`,
          fixSuggestions: [],
        },
      ],
      assertions: [],
      metadata,
    };
  }
}

/**
 * Backward compatibility exports (deprecated)
 */
export type { ValidationResult, ValidationIssue, ValidateOptions };

// Re-export new types for convenience
export type {
  ValidationAssertion,
  ValidationMetadata,
  IssueCode,
  IssueDomain,
  IssueSeverity,
  IssueContext,
  IssueLocation,
  FixSuggestion,
  FixType,
} from "./types.js";

// Re-export utility functions
export { hasErrors, hasWarnings } from "./types.js";
export { getErrorDefinition, getFixSuggestions, isKnownErrorCode } from "./error-codes.js";
