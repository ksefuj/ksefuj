/**
 * @ksefuj/validator - Error code registry
 *
 * Comprehensive catalog of all validation errors, warnings, and issues
 * that can be detected in KSeF FA(3) XML documents.
 *
 * IMPORTANT: Semantic validation error codes have been removed.
 * They will be reimplemented from scratch based on the official
 * FA(3) information sheet documentation.
 */

import type { ErrorCodeDefinition, FixSuggestion } from "./types.js";

// --- XSD Errors ---

export const XSD_ERRORS = {
  SCHEMA_VALIDATION_FAILED: {
    code: {
      domain: "xsd",
      category: "schema",
      code: "SCHEMA_VALIDATION_FAILED",
      severity: "error",
    },
    description: "XML does not conform to FA(3) XSD schema",
    commonCauses: [
      "Invalid element order",
      "Missing required elements",
      "Invalid element values",
      "Wrong namespace",
    ],
    fixTemplates: [],
  },

  ELEMENT_NOT_ALLOWED: {
    code: {
      domain: "xsd",
      category: "schema",
      code: "ELEMENT_NOT_ALLOWED",
      severity: "error",
    },
    description: "Element not allowed at this location",
    commonCauses: ["Element in wrong parent", "Typo in element name", "Wrong element order"],
    fixTemplates: [],
  },

  REQUIRED_ELEMENT_MISSING: {
    code: {
      domain: "xsd",
      category: "schema",
      code: "REQUIRED_ELEMENT_MISSING",
      severity: "error",
    },
    description: "Required element missing according to schema",
    commonCauses: ["Mandatory element not provided", "Incomplete structure"],
    fixTemplates: [],
  },

  INVALID_ELEMENT_VALUE: {
    code: {
      domain: "xsd",
      category: "schema",
      code: "INVALID_ELEMENT_VALUE",
      severity: "error",
    },
    description: "Element value does not match schema constraints",
    commonCauses: ["Value outside allowed range", "Wrong data type", "Pattern mismatch"],
    fixTemplates: [],
  },
} as const satisfies Record<string, ErrorCodeDefinition>;

// --- Parse Errors ---

export const PARSE_ERRORS = {
  MALFORMED_XML: {
    code: {
      domain: "parse",
      category: "syntax",
      code: "MALFORMED_XML",
      severity: "error",
    },
    description: "XML is not well-formed",
    commonCauses: [
      "Missing closing tags",
      "Invalid characters",
      "Mismatched tags",
      "Invalid XML declaration",
    ],
    fixTemplates: [],
  },

  ENCODING_ERROR: {
    code: {
      domain: "parse",
      category: "encoding",
      code: "ENCODING_ERROR",
      severity: "error",
    },
    description: "Character encoding error",
    commonCauses: ["Invalid UTF-8 sequences", "Wrong encoding declaration"],
    fixTemplates: [],
  },
} as const satisfies Record<string, ErrorCodeDefinition>;

// --- Infrastructure Errors ---

export const INFRASTRUCTURE_ERRORS = {
  VALIDATOR_INITIALIZATION_FAILED: {
    code: {
      domain: "infrastructure",
      category: "system",
      code: "VALIDATOR_INITIALIZATION_FAILED",
      severity: "error",
    },
    description: "Failed to initialize validation system",
    commonCauses: [
      "Schema loading failed",
      "Memory allocation error",
      "System resource unavailable",
    ],
    fixTemplates: [],
  },

  VALIDATION_TIMEOUT: {
    code: {
      domain: "infrastructure",
      category: "system",
      code: "VALIDATION_TIMEOUT",
      severity: "error",
    },
    description: "Validation exceeded time limit",
    commonCauses: ["Very large document", "Complex validation rules", "System overload"],
    fixTemplates: [],
  },

  EXECUTION_ERROR: {
    code: {
      domain: "infrastructure",
      category: "system",
      code: "EXECUTION_ERROR",
      severity: "error",
    },
    description: "Unexpected error during validation execution",
    commonCauses: [
      "Runtime environment issue",
      "Unhandled exception in validation logic",
      "System resource exhaustion",
    ],
    fixTemplates: [],
  },
} as const satisfies Record<string, ErrorCodeDefinition>;

// --- Combined Registry ---

export const ERROR_CODES = {
  ...XSD_ERRORS,
  ...PARSE_ERRORS,
  ...INFRASTRUCTURE_ERRORS,
} as const;

export type ErrorCode = keyof typeof ERROR_CODES;

// --- Helper Functions ---

export function getErrorDefinition(code: string): ErrorCodeDefinition | undefined {
  return ERROR_CODES[code as ErrorCode];
}

export function getFixSuggestions(code: string): readonly FixSuggestion[] {
  const definition = getErrorDefinition(code);
  return definition?.fixTemplates ?? [];
}

export function isKnownErrorCode(code: string): code is ErrorCode {
  return code in ERROR_CODES;
}
