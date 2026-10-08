/** The slice of a validation issue needed to tell an FA(3) document from anything else. */
interface IssueLike {
  code: { code: string };
  context?: { metadata?: Record<string, unknown> };
}

/**
 * Whether a validated file can be turned into a PDF visualisation: it must be well-formed XML with
 * an FA(3) `Faktura` root. Files that only have validation issues stay previewable (the PDF shows
 * the invoice as it is); malformed XML, a wrong namespace and roots the schema does not know do
 * not.
 */
export function isPreviewableResult(
  result: { issues: readonly IssueLike[] } | null | undefined,
): boolean {
  if (!result) {
    return false;
  }
  return !result.issues.some((issue) => {
    const code = issue.code.code;
    if (code === "MALFORMED_XML" || code === "WRONG_NAMESPACE") {
      return true;
    }
    const original = issue.context?.metadata?.originalMessage;
    return (
      code === "SCHEMA_VALIDATION_FAILED" &&
      typeof original === "string" &&
      /no matching global declaration available for the validation root/i.test(original)
    );
  });
}
