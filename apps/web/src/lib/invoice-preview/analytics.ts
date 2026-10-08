const KNOWN_INVOICE_TYPES = new Set(["VAT", "KOR", "ZAL", "ROZ", "UPR", "KOR_ZAL", "KOR_ROZ"]);

/**
 * RodzajFaktury is read from the file, and invalid files are accepted, so it can be arbitrary text.
 * Only the schema's values may reach analytics; anything else is reported as "other".
 */
export function analyticsInvoiceType(raw: string | null | undefined): string {
  return raw && KNOWN_INVOICE_TYPES.has(raw) ? raw : "other";
}
