import type { QrEnvironment, RenderOptions, RenderResult } from "./types";

export { KsefNumberMismatchError, UnsupportedInvoiceError } from "./errors";
export { isValidKsefNumber } from "./ksef-number";
export type { QrEnvironment, RenderOptions, RenderResult } from "./types";

/**
 * Renders an FA(3) invoice (XML bytes) to a PDF visualisation, entirely in the caller's runtime.
 * No network access. The generator and the fonts are loaded lazily on the first call.
 *
 * Throws UnsupportedInvoiceError ("not-xml" | "not-fa3") for input that is not an FA(3) invoice and
 * KsefNumberMismatchError when `ksefNumber` is valid but belongs to a different seller NIP.
 * An invalid `ksefNumber` is ignored (no number, no QR, watermark on by default).
 */
export async function renderInvoicePdf(
  xml: Uint8Array | ArrayBuffer,
  options?: RenderOptions,
): Promise<RenderResult> {
  const { renderInvoicePdf: render } = await import("./engine");
  return render(xml instanceof Uint8Array ? xml : new Uint8Array(xml), options);
}

/**
 * KOD I link: `https://qr.ksef.mf.gov.pl/invoice/{NIP}/{DD-MM-YYYY}/{SHA-256, Base64URL}` (test and
 * demo hosts: qr-test.ksef.mf.gov.pl, qr-demo.ksef.mf.gov.pl). The hash covers the exact bytes.
 * Format: CIRFMF/ksef-docs kody-qr.md, section "KOD I". Throws UnsupportedInvoiceError.
 */
export async function buildKodIUrl(xml: Uint8Array, env?: QrEnvironment): Promise<string> {
  const { buildKodIUrl: build } = await import("./kod-i");
  return build(xml, env);
}
