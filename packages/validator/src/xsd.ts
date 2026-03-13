/**
 * XSD Schema validation using libxml2-wasm
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
import type { ValidationError } from "./validate.js";

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
        `Failed to fetch schemas from URLs: ${error instanceof Error ? error.message : String(error)}`,
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
 * Validate XML against FA(3) XSD schema
 *
 * @param xml - The XML string to validate
 * @returns Array of validation errors (empty if valid)
 */
export async function validateXsd(xml: string): Promise<ValidationError[]> {
  const errors: ValidationError[] = [];
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
    return [];
  } catch (error) {
    if (error instanceof XmlValidateError) {
      // Parse structured validation error
      const errorMessage = error.message || "XSD validation failed";

      // Extract line number from error message if available
      const lineMatch = errorMessage.match(/line (\d+)/i);
      const line = lineMatch ? parseInt(lineMatch[1], 10) : undefined;

      errors.push({
        level: "error",
        source: "xsd",
        message: errorMessage,
        line,
      });
    } else {
      // Handle other errors (likely parse errors from XmlDocument.fromString)
      const message = error instanceof Error ? error.message : String(error);
      errors.push({
        level: "error",
        source: "parse",
        message,
        line: undefined,
      });
    }
  } finally {
    // Always clean up the document
    if (doc) {
      doc.dispose();
    }
  }

  return errors;
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
