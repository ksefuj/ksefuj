/**
 * @ksefuj/validator - XSD Schema validation
 *
 * Provides lazy-loaded XSD validation with proper resource management.
 * Uses bundled schemas for offline validation and to avoid CORS issues.
 */

import {
  XmlBufferInputProvider,
  XmlDocument,
  xmlRegisterInputProvider,
  XmlValidateError,
  XsdValidator,
} from "libxml2-wasm";
import type { ValidationAssertion, ValidationIssue } from "./types.js";
import { ERROR_CODES } from "./error-codes.js";

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
 * Parse XSD validation error message to extract details
 */
function parseXsdError(errorMessage: string): {
  elementName?: string;
  lineNumber?: number;
  columnNumber?: number;
  expectedElements?: string[];
} {
  const result: {
    elementName?: string;
    lineNumber?: number;
    columnNumber?: number;
    expectedElements?: string[];
  } = {};

  // Extract line number
  const lineMatch = errorMessage.match(/line (\d+)/i);
  if (lineMatch) {
    result.lineNumber = parseInt(lineMatch[1], 10);
  }

  // Extract column number if available
  const colMatch = errorMessage.match(/column (\d+)/i);
  if (colMatch) {
    result.columnNumber = parseInt(colMatch[1], 10);
  }

  // Extract element name
  const elementMatch = errorMessage.match(/element ['"]?(\w+)['"]?/i);
  if (elementMatch) {
    result.elementName = elementMatch[1];
  }

  // Extract expected elements for "Element not allowed" errors
  const expectedMatch = errorMessage.match(/Expected is \((.*?)\)/);
  if (expectedMatch) {
    result.expectedElements = expectedMatch[1]
      .split(/[,|]/)
      .map((s) => s.trim())
      .filter((s) => s && s !== "#PCDATA");
  }

  return result;
}

/**
 * Map XSD error message to structured issue
 */
function mapXsdErrorToIssue(errorMessage: string): ValidationIssue {
  const parsed = parseXsdError(errorMessage);

  // Determine error type from message patterns
  let errorDef;

  if (errorMessage.includes("not allowed")) {
    errorDef = ERROR_CODES.ELEMENT_NOT_ALLOWED;
  } else if (errorMessage.includes("missing") || errorMessage.includes("expected")) {
    errorDef = ERROR_CODES.REQUIRED_ELEMENT_MISSING;
  } else if (errorMessage.includes("invalid") || errorMessage.includes("does not match")) {
    errorDef = ERROR_CODES.INVALID_ELEMENT_VALUE;
  } else {
    errorDef = ERROR_CODES.SCHEMA_VALIDATION_FAILED;
  }

  return {
    code: errorDef.code,
    context: {
      location: {
        element: parsed.elementName,
        lineNumber: parsed.lineNumber,
        columnNumber: parsed.columnNumber,
      },
      expectedValues: parsed.expectedElements,
      metadata: {
        originalMessage: errorMessage,
      },
    },
    message: errorMessage,
    fixSuggestions: errorDef.fixTemplates,
  };
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
    if (error instanceof XmlValidateError) {
      // Parse structured validation error
      const errorMessage = error.message || "XSD validation failed";
      issues.push(mapXsdErrorToIssue(errorMessage));
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
