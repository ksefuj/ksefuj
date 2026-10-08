const FALLBACK_FILE_NAME = "faktura.pdf";
const MAX_NUMBER_LENGTH = 80;

/**
 * Builds the download name of the PDF from the invoice number (P_2), e.g. `FV/2026/10/014` becomes
 * `faktura-FV-2026-10-014.pdf`. Everything outside `[A-Za-z0-9._-]` (slashes, spaces, Polish
 * letters after transliteration, control characters) is replaced so the name is safe on every file
 * system; an empty result falls back to `faktura.pdf`.
 */
export function pdfFileNameFromInvoiceNumber(invoiceNumber: string | null | undefined): string {
  const sanitized = (invoiceNumber ?? "")
    .normalize("NFKD")
    // Combining marks left over from NFKD (Polish diacritics except the stroke letters below)
    .replace(/[̀-ͯ]/g, "")
    .replace(/ł/g, "l")
    .replace(/Ł/g, "L")
    .replace(/[^A-Za-z0-9._-]+/g, "-")
    .replace(/-{2,}/g, "-")
    // No leading dots (hidden files) and no leading or trailing separators
    .replace(/^[-.]+|[-.]+$/g, "")
    .slice(0, MAX_NUMBER_LENGTH)
    .replace(/[-.]+$/g, "");

  return sanitized ? `faktura-${sanitized}.pdf` : FALLBACK_FILE_NAME;
}
