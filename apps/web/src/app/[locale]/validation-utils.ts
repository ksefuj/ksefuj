/**
 * Utility functions for translating ValidationIssue objects
 */

import type { ValidationIssue } from "@ksefuj/validator";

/**
 * Translates a ValidationIssue to a localized message
 */
export function translateValidationIssue(
  issue: ValidationIssue,
  t: (key: string, params?: Record<string, string | number | Date>) => string,
): string {
  const translationKey = `issues.${issue.code.code}`;

  // Check if we have a translation for this specific error code
  try {
    // Extract context variables for interpolation
    const context: Record<string, string | number | Date> = {};

    // Map common context properties
    if (issue.context.location.element) {
      context.element = String(issue.context.location.element);
    }

    if (issue.context.actualValue) {
      context.actual = String(issue.context.actualValue);
    }

    if (issue.context.expectedValues && issue.context.expectedValues.length > 0) {
      if (issue.code.code === "P12_INVALID") {
        context.allowedValues = issue.context.expectedValues.join(", ");
      } else {
        context.expected = String(issue.context.expectedValues[0]);
      }
    }

    // Special handling for TRAILING_ZEROS which has expected value in metadata
    if (issue.code.code === "TRAILING_ZEROS" && issue.context.metadata) {
      const metadata = issue.context.metadata as Record<string, unknown>;
      if (metadata.cleanValue) {
        context.expected = String(metadata.cleanValue);
      }
      if (metadata.element) {
        context.element = String(metadata.element);
      }
    }

    // Try to get translated message
    const translatedMessage = t(translationKey, context);

    // If translation key is returned unchanged, it means no translation exists
    // Fall back to the original English message
    if (translatedMessage === translationKey) {
      return issue.message;
    }

    return translatedMessage;
  } catch {
    // If anything goes wrong, fall back to the original message
    return issue.message;
  }
}
