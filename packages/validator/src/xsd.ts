/**
 * @ksefuj/validator - XSD Schema validation
 *
 * Provides lazy-loaded XSD validation with proper resource management.
 * Uses bundled schemas for offline validation and to avoid CORS issues.
 */

import type { ValidationAssertion, ValidationIssue } from "./types.js";
import { ERROR_CODES } from "./error-codes.js";
import { parseXsdMessage } from "./xsd-messages.js";

// Lazy-loaded libxml2-wasm module
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let libxml2Module: any = null;

// Type imports for internal use (these don't trigger module loading)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type XmlBufferInputProvider = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type XmlDocument = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type XsdValidator = any;

/**
 * Lazily load libxml2-wasm module on first use
 */
async function getLibxml2Module() {
  if (!libxml2Module) {
    // Dynamic import - only executed when validation is actually needed
    libxml2Module = await import("libxml2-wasm");
  }
  return libxml2Module;
}

// Validator management with proper lazy loading and cleanup
class XsdValidatorManager {
  private static instance: XsdValidatorManager | null = null;
  private validator: XsdValidator | null = null;
  private initializationPromise: Promise<XsdValidator> | null = null;
  private disposed = false;

  private constructor() {}

  static getInstance(): XsdValidatorManager {
    if (!XsdValidatorManager.instance) {
      XsdValidatorManager.instance = new XsdValidatorManager();
    }
    return XsdValidatorManager.instance;
  }

  async getValidator(): Promise<XsdValidator> {
    if (this.disposed) {
      throw new Error("Validator has been disposed");
    }

    if (this.validator) {
      return this.validator;
    }

    // If already initializing, return the same promise
    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    // Start initialization
    this.initializationPromise = this.initializeValidator();

    try {
      this.validator = await this.initializationPromise;
      return this.validator;
    } finally {
      this.initializationPromise = null;
    }
  }

  private async initializeValidator(): Promise<XsdValidator> {
    // Use bundled schemas for offline validation and to avoid CORS issues
    return this.initializeBrowserValidatorFromBundledSchemas();
  }

  private async initializeBrowserValidatorFromBundledSchemas(): Promise<XsdValidator> {
    let doc: XmlDocument | null = null;
    let validator: XsdValidator | null = null;
    let bufferProvider: XmlBufferInputProvider | null = null;

    try {
      // Lazy load libxml2-wasm
      const libxml2 = await getLibxml2Module();
      const { XmlBufferInputProvider, XmlDocument, xmlRegisterInputProvider, XsdValidator } =
        libxml2;

      // Use bundled schemas to avoid CORS issues
      const { getBundledSchemas, SCHEMA_URLS } = await import("./schemas/bundle.js");
      const schemas = await getBundledSchemas();

      // Map URLs to content for compatibility with existing code
      const schemasByUrl: Record<string, string> = {};
      Object.keys(schemas).forEach((key) => {
        const url = SCHEMA_URLS[key as keyof typeof SCHEMA_URLS];
        schemasByUrl[url] = schemas[key];
      });

      // Prepare schema buffers for import resolution
      const encoder = new TextEncoder();
      const schemaBuffers: Record<string, Uint8Array> = {};

      for (const [url, content] of Object.entries(schemasByUrl)) {
        // Register by URL (for absolute imports)
        schemaBuffers[url] = encoder.encode(content);
        // Register by filename (for relative imports)
        const filename = url.split("/").pop()!;
        schemaBuffers[filename] = encoder.encode(content);
      }

      // Register buffer input provider
      bufferProvider = new XmlBufferInputProvider(schemaBuffers);
      xmlRegisterInputProvider(bufferProvider);

      // Parse main schema and create validator
      doc = XmlDocument.fromString(schemas.main);
      validator = XsdValidator.fromDoc(doc);

      // Transfer ownership - don't dispose if successful
      const result = validator;
      validator = null;
      return result;
    } catch (error) {
      // Clean up on error
      if (validator) {
        validator.dispose();
      }

      throw new Error(
        `Failed to initialize XSD validator: ${error instanceof Error ? error.message : String(error)}`,
      );
    } finally {
      // Always clean up resources
      if (doc) {
        doc.dispose();
      }
      // Note: Don't cleanup input provider as validator needs it
    }
  }

  dispose(): void {
    if (this.validator && !this.disposed) {
      this.validator.dispose();
      this.validator = null;
    }
    this.disposed = true;
    XsdValidatorManager.instance = null;
  }

  isDisposed(): boolean {
    return this.disposed;
  }

  static isInstanceDisposed(): boolean {
    return (
      XsdValidatorManager.instance === null ||
      (XsdValidatorManager.instance !== null && XsdValidatorManager.instance.disposed)
    );
  }
}

// Singleton instance getter
const getValidatorManager = () => XsdValidatorManager.getInstance();

/**
 * Map one raw libxml2 XSD message (plus optional position) to a structured issue
 */
function mapXsdMessageToIssue(
  message: string,
  position?: { line?: number; col?: number },
): ValidationIssue {
  const parsed = parseXsdMessage(message);
  const errorDef = ERROR_CODES[parsed.code];

  const metadata: Record<string, unknown> = { originalMessage: message };
  if (parsed.facet !== undefined) {
    metadata.facet = parsed.facet;
  }
  if (parsed.actualLength !== undefined) {
    metadata.actualLength = parsed.actualLength;
  }
  if (parsed.typeName !== undefined) {
    metadata.typeName = parsed.typeName;
  }
  if (parsed.attribute !== undefined) {
    metadata.attribute = parsed.attribute;
  }

  const line = position?.line;
  const col = position?.col;

  return {
    code: errorDef.code,
    context: {
      location: {
        element: parsed.element,
        lineNumber: typeof line === "number" && line > 0 ? line : undefined,
        columnNumber: typeof col === "number" && col > 0 ? col : undefined,
      },
      ...(parsed.actualValue !== undefined ? { actualValue: parsed.actualValue } : {}),
      expectedValues: parsed.expected,
      metadata,
    },
    message,
    fixSuggestions: errorDef.fixTemplates,
  };
}

/**
 * Fallback for errors that carry no per-error details: split multi-error message text
 * on sentence boundaries that start a new "Element ..." message.
 */
function splitMessage(message: string): string[] {
  const parts = message.split(/(?<=\.)\s*(?=Element ')/).filter((s) => s.trim());
  return parts.length > 0 ? parts.map((s) => s.trim()) : [message];
}

/**
 * Map a libxml2 XmlValidateError to structured issues, one per reported detail
 */
function mapXsdErrorToIssues(error: {
  message?: string;
  details?: ReadonlyArray<{ message: string; line?: number; col?: number }>;
}): ValidationIssue[] {
  if (error.details && error.details.length > 0) {
    return error.details.map((d) =>
      mapXsdMessageToIssue(d.message.trim(), { line: d.line, col: d.col }),
    );
  }
  const message = error.message || "XSD validation failed";
  return splitMessage(message).map((m) => mapXsdMessageToIssue(m));
}

/**
 * Validate XML against FA(3) XSD schema
 * Returns structured validation issues
 */
export async function validateXsd(
  xml: string,
  collectAssertions: boolean = false,
): Promise<{
  issues: ValidationIssue[];
  assertions: ValidationAssertion[];
}> {
  const issues: ValidationIssue[] = [];
  const assertions: ValidationAssertion[] = [];
  const manager = getValidatorManager();

  let doc: XmlDocument | null = null;

  try {
    // Lazy load libxml2-wasm
    const libxml2 = await getLibxml2Module();
    const { XmlDocument } = libxml2;

    // Get or create validator
    const validator = await manager.getValidator();

    // Parse the XML document
    doc = XmlDocument.fromString(xml);

    // Validate
    validator.validate(doc);

    // If we get here, validation passed
    if (collectAssertions) {
      assertions.push({
        domain: "xsd",
        aspect: "schema_conformance",
        description: "Document conforms to FA(3) XSD schema",
        elements: ["Full document validated successfully"],
        confidence: 1.0,
      });
    }

    return { issues: [], assertions };
  } catch (error) {
    // Need to check error type using the loaded module
    const libxml2 = await getLibxml2Module();

    if (error instanceof libxml2.XmlValidateError) {
      // Parse structured validation error
      issues.push(...mapXsdErrorToIssues(error as Parameters<typeof mapXsdErrorToIssues>[0]));
    } else {
      // Handle parse errors
      const message = error instanceof Error ? error.message : String(error);
      const errorDef = ERROR_CODES.MALFORMED_XML;

      issues.push({
        code: errorDef.code,
        context: {
          location: {},
          metadata: {
            originalMessage: message,
          },
        },
        message: `XML parsing failed: ${message}`,
        fixSuggestions: [],
      });
    }
  } finally {
    // Always clean up the document
    if (doc) {
      doc.dispose();
    }
  }

  return { issues, assertions };
}

/**
 * Dispose of the XSD validator and clean up resources.
 * Call this when done with validation to free memory.
 */
export function disposeValidator(): void {
  const manager = getValidatorManager();
  manager.dispose();
}

/**
 * Check if the validator has been disposed
 */
export function isValidatorDisposed(): boolean {
  return XsdValidatorManager.isInstanceDisposed();
}
