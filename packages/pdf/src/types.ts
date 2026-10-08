export type QrEnvironment = "prod" | "test" | "demo";

export interface RenderOptions {
  /**
   * KSeF number of an invoice that is already in KSeF. When valid (TNumerKSeF) and matching the
   * seller NIP, it is printed in the header and a KOD I QR code is added.
   */
  ksefNumber?: string;
  /** KSeF environment the KOD I link points to. Default "prod". */
  qrEnvironment?: QrEnvironment;
  /** Diagonal "WIZUALIZACJA" watermark. Default: on without a (valid) ksefNumber, off with one. */
  watermark?: boolean;
}

export interface RenderResult {
  blob: Blob;
  /** RodzajFaktury of the invoice (VAT, ZAL, ROZ, UPR, KOR, KOR_ZAL, KOR_ROZ). */
  invoiceType: string;
  hasQr: boolean;
}
