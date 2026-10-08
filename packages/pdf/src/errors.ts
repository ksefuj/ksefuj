export type UnsupportedInvoiceReason = "not-xml" | "not-fa3";

/** The input is not a well-formed XML document, or not an FA(3) invoice. */
export class UnsupportedInvoiceError extends Error {
  readonly reason: UnsupportedInvoiceReason;

  constructor(reason: UnsupportedInvoiceReason) {
    super(
      reason === "not-xml"
        ? "The input is not a well-formed XML document."
        : "The input is not an FA(3) invoice (namespace http://crd.gov.pl/wzor/2025/06/25/13775/).",
    );
    this.name = "UnsupportedInvoiceError";
    this.reason = reason;
  }
}

/**
 * The KSeF number does not belong to the seller of the invoice (its NIP prefix differs from
 * Podmiot1/DaneIdentyfikacyjne/NIP, or the invoice has no seller NIP). Thrown instead of printing
 * a QR code that would point to the wrong document.
 */
export class KsefNumberMismatchError extends Error {
  constructor() {
    super("The KSeF number does not match the seller NIP (Podmiot1/DaneIdentyfikacyjne/NIP).");
    this.name = "KsefNumberMismatchError";
  }
}
