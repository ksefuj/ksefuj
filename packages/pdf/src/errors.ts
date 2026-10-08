/**
 * - "not-xml": the bytes are not a well-formed XML document.
 * - "not-fa3": well-formed XML, but not an FA(3) `Faktura`.
 * - "missing-data": an FA(3) invoice that lacks Podmiot1/DaneIdentyfikacyjne/NIP or Fa/P_1, which
 *   the KOD I link needs (thrown by buildKodIUrl and by renderInvoicePdf when a QR is requested).
 */
export type UnsupportedInvoiceReason = "not-xml" | "not-fa3" | "missing-data";

const MESSAGES: Record<UnsupportedInvoiceReason, string> = {
  "not-xml": "The input is not a well-formed XML document.",
  "not-fa3":
    "The input is not an FA(3) invoice (namespace http://crd.gov.pl/wzor/2025/06/25/13775/).",
  "missing-data": "The invoice has no seller NIP or issue date (P_1), needed for the KOD I link.",
};

/** The input is not a well-formed XML document, not an FA(3) invoice, or lacks KOD I data. */
export class UnsupportedInvoiceError extends Error {
  readonly reason: UnsupportedInvoiceReason;

  constructor(reason: UnsupportedInvoiceReason) {
    super(MESSAGES[reason]);
    this.name = "UnsupportedInvoiceError";
    this.reason = reason;
  }
}

/**
 * The KSeF number does not belong to the seller of the invoice (its NIP prefix differs from
 * Podmiot1/DaneIdentyfikacyjne/NIP). Thrown instead of printing a QR code that would point to the
 * wrong document.
 */
export class KsefNumberMismatchError extends Error {
  constructor() {
    super("The KSeF number does not match the seller NIP (Podmiot1/DaneIdentyfikacyjne/NIP).");
    this.name = "KsefNumberMismatchError";
  }
}
