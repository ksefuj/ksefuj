/**
 * @ksefuj/validator - Semantic validation interface
 *
 * Business logic validation for KSeF FA(3) invoices that cannot
 * be expressed through XSD schema validation alone.
 *
 * IMPORTANT: This is a blueprint interface only.
 * The actual semantic validation implementation has been removed
 * and will be reimplemented from scratch based on the official
 * FA(3) information sheet documentation.
 */

import type { SemanticRule, ValidationAssertion, ValidationIssue, XmlDocument } from "./types.js";

/**
 * Semantic validation rules array.
 * Currently empty - to be reimplemented.
 */
export const semanticRules: SemanticRule[] = [];

/**
 * Run all semantic validation checks on an XML document.
 * Returns both issues (errors/warnings) and assertions (what passed).
 *
 * @param doc - The XML document to validate
 * @param collectAssertions - Whether to collect positive assertions about what passed validation
 * @returns Object containing validation issues and assertions
 */
export function checkSemantics(
  // eslint-disable-next-line no-unused-vars
  _doc: XmlDocument,
  // eslint-disable-next-line no-unused-vars
  _collectAssertions: boolean = false,
): {
  issues: ValidationIssue[];
  assertions: ValidationAssertion[];
} {
  // Placeholder implementation - returns empty results
  return {
    issues: [],
    assertions: [],
  };
}
