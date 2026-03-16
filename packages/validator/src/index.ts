/**
 * @ksefuj/validator - KSeF FA(3) XML validation library
 *
 * Main exports for the validator package.
 * Version 2.0.0 - Complete redesign with structured error API
 */

// --- Core validation function ---
export { validate } from "./validate.js";

// --- Core types ---
export type {
  ValidationResult,
  ValidationIssue,
  ValidationAssertion,
  ValidateOptions,
  ValidationMetadata,
} from "./types.js";

// --- Issue types ---
export type {
  IssueCode,
  IssueDomain,
  IssueSeverity,
  IssueContext,
  IssueLocation,
  FixSuggestion,
  FixType,
} from "./types.js";

// --- Semantic validation ---
export { checkSemantics, semanticRules } from "./semantic.js";
export type { SemanticRule, XmlDocument } from "./types.js";

// --- XSD validation ---
export { validateXsd, disposeValidator, isValidatorDisposed } from "./xsd.js";

// --- Error code registry ---
export {
  ERROR_CODES,
  getErrorDefinition,
  getFixSuggestions,
  isKnownErrorCode,
  type ErrorCode,
} from "./error-codes.js";

// --- Utility functions ---
export { hasErrors, hasWarnings, isValidationIssue } from "./types.js";

// --- Type guards and utilities from validate.ts ---
export {
  getErrorDefinition as getIssueDefinition,
  getFixSuggestions as getIssueFixes,
} from "./validate.js";
