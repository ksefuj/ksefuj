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
  CurrencyRate,
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
// Complete semantic validation with 38 rules based on FA(3) information sheet
export { checkSemantics, semanticRules } from "./semantic.js";
export type { SemanticRule, XmlDocument } from "./types.js";

// --- Currency conversion date selection (Art. 31a ustawy o VAT) ---
export { resolveRateReference, rateReferenceCandidates } from "./currency-date.js";
export type { RateReference, RateReferenceRule } from "./currency-date.js";

// --- XSD validation ---
export { validateXsd, disposeValidator, isValidatorDisposed } from "./xsd.js";

// --- Strict XML checks (KSeF API 2.4.0, enforced from 2026-10-19) ---
export {
  checkStrictXml,
  KSEF_XML_RULES_URL,
  KSEF_STRICT_XML_ENFORCEMENT_DATE,
} from "./xml-strictness.js";

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
