/**
 * Utility functions for translating ValidationIssue objects
 */

import type { ValidationIssue } from "@ksefuj/validator";

/** Values from the file are interpolated into inline-code markdown; drop backticks. */
function stripBackticks(value: unknown): string {
  return String(value).replace(/`/g, "'");
}

/**
 * Translates a ValidationIssue to a localized message
 */
export function translateValidationIssue(
  issue: ValidationIssue,
  t: (key: string, params?: Record<string, string | number | Date>) => string,
): string {
  const errorCode = issue.code.code || issue.code;
  const translationKey = `issues.${errorCode}`;

  // Check if we have a translation for this specific error code
  try {
    // Extract context variables for interpolation
    const context: Record<string, string | number | Date> = {};

    // Map common context properties with markdown formatting
    if (issue.context.location.element) {
      context.element = `\`${String(issue.context.location.element)}\``;
    }

    if (issue.context.actualValue) {
      context.actual = `\`${String(issue.context.actualValue)}\``;
    }

    if (issue.context.expectedValues && issue.context.expectedValues.length > 0) {
      if (errorCode === "P12_INVALID" || errorCode === "P12_ENUMERATION") {
        context.allowedValues = issue.context.expectedValues.map((v) => `\`${v}\``).join(", ");
      } else {
        context.expected = `\`${String(issue.context.expectedValues[0])}\``;
      }
    }

    if (issue.context.metadata?.nbpDate) {
      context.date = String(issue.context.metadata.nbpDate);
    }

    if (issue.context.metadata?.currency) {
      context.currency = String(issue.context.metadata.currency);
    }

    if (issue.context.metadata?.invoiceDate) {
      context.invoiceDate = String(issue.context.metadata.invoiceDate);
    }

    // Strict-XML checks (KSeF API 2.4.0): raw-text position and offending construct
    if (issue.context.location.lineNumber !== undefined) {
      context.line = issue.context.location.lineNumber;
    }
    if (issue.context.location.columnNumber !== undefined) {
      context.column = issue.context.location.columnNumber;
    }
    if (issue.context.metadata?.codePoint) {
      context.codePoint = String(issue.context.metadata.codePoint);
    }
    if (issue.context.metadata?.snippet) {
      context.snippet = `\`${stripBackticks(issue.context.metadata.snippet)}\``;
    }
    if (issue.context.metadata?.target !== undefined) {
      context.target = stripBackticks(issue.context.metadata.target);
    }
    if (issue.context.metadata?.count !== undefined) {
      context.count = String(issue.context.metadata.count);
    }
    if (issue.context.metadata?.total !== undefined) {
      context.total = String(issue.context.metadata.total);
    }
    if (issue.context.metadata?.encoding) {
      context.encoding = stripBackticks(issue.context.metadata.encoding);
    }

    // Debug logging in development
    if (process.env.NODE_ENV === "development") {
      console.warn("Translating error code:", errorCode, "with key:", translationKey);
    }

    // Try to get translated message
    const translatedMessage = t(translationKey, context);

    // If translation key is returned unchanged, it means no translation exists
    // Fall back to the original English message
    if (translatedMessage === translationKey) {
      console.warn(`Missing translation for error code: ${errorCode}`);
      return issue.message;
    }

    return translatedMessage;
  } catch (error) {
    // If anything goes wrong, fall back to the original message
    console.error("Translation error for", errorCode, error);
    return issue.message;
  }
}
