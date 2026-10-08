import { UnsupportedInvoiceError } from "./errors";
import { issueDate, parseInvoice, sellerNip } from "./parse";
import type { QrEnvironment } from "./types";

// Hosts per environment, from the official KSeF documentation "Kody weryfikujące QR" (kody-qr.md,
// section "Środowiska"): https://github.com/CIRFMF/ksef-docs/blob/main/kody-qr.md
const QR_HOSTS: Record<QrEnvironment, string> = {
  prod: "https://qr.ksef.mf.gov.pl",
  test: "https://qr-test.ksef.mf.gov.pl",
  demo: "https://qr-demo.ksef.mf.gov.pl",
};

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/** SHA-256 of the exact bytes, Base64URL without padding (the "wyróżnik pliku faktury"). */
export async function invoiceHashBase64Url(xml: Uint8Array): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", xml as Uint8Array<ArrayBuffer>);
  return toBase64Url(new Uint8Array(digest));
}

/** `https://{host}/invoice/{NIP}/{DD-MM-YYYY}/{hash}` for already extracted parts. */
export async function composeKodIUrl(
  xml: Uint8Array,
  nip: string,
  isoDate: string,
  env: QrEnvironment,
): Promise<string> {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(isoDate);
  if (!match) {
    throw new UnsupportedInvoiceError("not-fa3");
  }
  const date = `${match[3]}-${match[2]}-${match[1]}`;
  return `${QR_HOSTS[env]}/invoice/${nip}/${date}/${await invoiceHashBase64Url(xml)}`;
}

/**
 * KOD I link (invoice verification), built locally from the invoice bytes.
 *
 * Format per CIRFMF/ksef-docs `kody-qr.md`, section "1. KOD I - Weryfikacja i pobieranie faktury":
 * `{host}/invoice/{seller NIP}/{P_1 as DD-MM-YYYY}/{SHA-256 of the invoice file, Base64URL}`.
 * The hash is computed over the exact bytes passed in, so pass the same bytes that are (or will
 * be) sent to KSeF. Throws UnsupportedInvoiceError when the XML is not an FA(3) invoice or has no
 * seller NIP / issue date.
 */
export async function buildKodIUrl(xml: Uint8Array, env: QrEnvironment = "prod"): Promise<string> {
  const invoice = parseInvoice(xml);
  const nip = sellerNip(invoice);
  const date = issueDate(invoice);
  if (!nip || !date) {
    throw new UnsupportedInvoiceError("not-fa3");
  }
  return composeKodIUrl(xml, nip, date, env);
}
