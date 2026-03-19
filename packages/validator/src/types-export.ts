/**
 * @ksefuj/validator - Type-only exports
 *
 * This file provides type-only exports for the validator package.
 * It ensures that importing types doesn't trigger loading of runtime dependencies
 * like libxml2-wasm, which improves initial page load performance.
 *
 * For the actual validation function, import from '@ksefuj/validator/validate'
 */

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

// --- Semantic validation types ---
// Complete semantic validation types for 38 constitution-based rules
export type { SemanticRule, XmlDocument } from "./types.js";

// --- Error code types ---
export type { ErrorCode } from "./error-codes.js";

// --- Assertion types ---
export type { AssertionDomain } from "./types.js";
