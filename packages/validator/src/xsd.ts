/**
 * XSD Schema validation using libxml2-wasm
 *
 * Provides lazy-loaded XSD validation with proper resource management.
 * Uses URL-based schema fetching for always-fresh schemas from official government sources.
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
    // Use URL-based approach for better performance and always-fresh schemas
    return this.initializeBrowserValidatorFromUrls();
  }

  private async initializeBrowserValidatorFromUrls(): Promise<XsdValidator> {
    // Official schema URLs from Polish Ministry of Finance
    const SCHEMA_URLS = {
      main: "http://crd.gov.pl/wzor/2025/06/25/13775/schemat.xsd",
      struktury:
        "http://crd.gov.pl/xml/schematy/dziedzinowe/mf/2022/01/05/eD/DefinicjeTypy/StrukturyDanych_v10-0E.xsd",
      elementarne:
        "http://crd.gov.pl/xml/schematy/dziedzinowe/mf/2022/01/05/eD/DefinicjeTypy/ElementarneTypyDanych_v10-0E.xsd",
      kody: "http://crd.gov.pl/xml/schematy/dziedzinowe/mf/2022/01/05/eD/DefinicjeTypy/KodyKrajow_v10-0E.xsd",
    };

    let doc: XmlDocument | null = null;
    let validator: XsdValidator | null = null;
    let bufferProvider: XmlBufferInputProvider | null = null;

    try {
      // Fetch all schemas in parallel
      const urls = Object.values(SCHEMA_URLS);
      const responses = await Promise.all(
        urls.map(async (url) => {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: HTTP ${response.status}`);
          }
          return response.text();
        }),
      );

      // Map URLs to content
      const schemas: Record<string, string> = {};
      urls.forEach((url, index) => {
        schemas[url] = responses[index];
      });

      // Prepare schema buffers for import resolution
      const encoder = new TextEncoder();
      const schemaBuffers: Record<string, Uint8Array> = {};

      for (const [url, content] of Object.entries(schemas)) {
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
      doc = XmlDocument.fromString(schemas[SCHEMA_URLS.main]);
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
      // Handle other errors
      const message = error instanceof Error ? error.message : String(error);
      errors.push({
        level: "error",
        source: "xsd",
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
  // Check if singleton instance exists and is disposed
  const instance = XsdValidatorManager["instance"];
  return !instance || instance.isDisposed();
}
