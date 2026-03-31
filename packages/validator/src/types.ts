/**
 * @ksefuj/validator - Structured validation types
 *
 * Core type definitions for the KSeF FA(3) validation system.
 * Provides rich, structured error/warning/assertion information
 * that enables programmatic handling and auto-fix capabilities.
 */

// --- Core Issue Identification ---

export type IssueDomain = "parse" | "xsd" | "semantic" | "infrastructure";
export type IssueSeverity = "error" | "warning" | "info";

export interface IssueCode {
  readonly domain: IssueDomain;
  readonly category: string;
  readonly code: string;
  readonly severity: IssueSeverity;
}

// --- Issue Context & Location ---

export interface IssueLocation {
  readonly xpath?: string;
  readonly element?: string;
  readonly lineNumber?: number;
  readonly columnNumber?: number;
}

export interface IssueContext {
  readonly location: IssueLocation;
  readonly actualValue?: string | number | boolean;
  readonly expectedValues?: readonly string[];
  readonly relatedElements?: readonly string[];
  readonly metadata?: Record<string, unknown>;
}

// --- Fix Suggestions ---

export type FixType = "add" | "remove" | "replace" | "move" | "reorder";

export interface FixSuggestion {
  readonly type: FixType;
  readonly targetXPath: string;
  readonly content?: string;
  readonly description: string;
  readonly confidence: number;
  readonly dependencies?: readonly string[];
}

// --- Main Validation Issue ---

export interface ValidationIssue {
  readonly code: IssueCode;
  readonly context: IssueContext;
  readonly message: string;
  readonly fixSuggestions: readonly FixSuggestion[];
}

// --- Positive Assertions ---

export type AssertionDomain = "xsd" | "semantic";

export interface ValidationAssertion {
  readonly domain: AssertionDomain;
  readonly aspect: string;
  readonly description: string;
  readonly elements: readonly string[];
  readonly confidence: number;
}

// --- Validation Result ---

export interface ValidationMetadata {
  readonly validationTimeMs: number;
  readonly rulesExecuted: number;
  readonly elementsValidated: number;
  readonly schemaVersion: string;
  readonly validatorVersion: string;
}

export interface ValidationResult {
  readonly valid: boolean;
  readonly issues: readonly ValidationIssue[];
  readonly assertions: readonly ValidationAssertion[];
  readonly metadata: ValidationMetadata;
}

// --- Currency Rate ---

export interface CurrencyRate {
  /** ISO 4217 currency code, e.g. "EUR" */
  readonly currency: string;
  /** YYYY-MM-DD — the effective NBP publication date of this rate (may differ from invoice date on weekends/holidays) */
  readonly date: string;
  /** NBP mid-rate (Table A), 4 decimal places e.g. 3.7257 */
  readonly mid: number;
}

// --- Validation Options ---

export interface ValidateOptions {
  readonly enableXsdValidation?: boolean;
  readonly enableSemanticValidation?: boolean;
  readonly collectAssertions?: boolean;
  readonly maxIssues?: number;

  /**
   * Optional map of currency → NBP rate for the invoice date.
   * When provided, enables KursWaluty accuracy validation.
   * Key is ISO 4217 code ("EUR", "USD", …).
   * Omit to skip currency rate checks entirely.
   */
  readonly currencyRates?: Record<string, CurrencyRate>;
}

// --- Semantic Rule Definition ---

export interface SemanticRule {
  readonly id: string;
  readonly description: string;
  readonly category: string;
  readonly severity: IssueSeverity;
  readonly check: (doc: XmlDocument) => ValidationIssue[];
  readonly getAssertions?: (doc: XmlDocument) => ValidationAssertion[];
}

// --- XML Document Abstraction ---

export interface XmlDocument {
  find(xpath: string, namespaces?: Record<string, string>): unknown[];
  eval(xpath: string, namespaces?: Record<string, string>): unknown;
}

// --- Error Code Definition ---

export interface ErrorCodeDefinition {
  readonly code: IssueCode;
  readonly description: string;
  readonly commonCauses: readonly string[];
  readonly fixTemplates: readonly FixSuggestion[];
  readonly documentationUrl?: string;
}

// --- Type Guards ---

export function isValidationIssue(value: unknown): value is ValidationIssue {
  return (
    typeof value === "object" &&
    value !== null &&
    "code" in value &&
    "context" in value &&
    "fixSuggestions" in value
  );
}

export function hasErrors(result: ValidationResult): boolean {
  return result.issues.some((issue) => issue.code.severity === "error");
}

export function hasWarnings(result: ValidationResult): boolean {
  return result.issues.some((issue) => issue.code.severity === "warning");
}

// --- Utility Types ---

export type IssuesByDomain = {
  [K in IssueDomain]: ValidationIssue[];
};

export type IssuesBySeverity = {
  [K in IssueSeverity]: ValidationIssue[];
};

export interface GroupedIssues {
  readonly byDomain: IssuesByDomain;
  readonly bySeverity: IssuesBySeverity;
  readonly byElement: Record<string, ValidationIssue[]>;
}
