// Heavy part of the package (pdfmake, the vendored generator, xml-js). index.ts only reaches this
// module through a dynamic import, so it lives in its own chunk; the fonts are a further chunk.
import i18next from "i18next";
import pdfMake from "pdfmake/build/pdfmake";
import type { TDocumentDefinitions } from "pdfmake/interfaces";
import { KsefNumberMismatchError, UnsupportedInvoiceError } from "./errors";
import { loadRobotoVfs, ROBOTO_FONTS } from "./fonts";
import { composeKodIUrl } from "./kod-i";
import { isValidKsefNumber, ksefNumberPrefix } from "./ksef-number";
import { issueDate, parseInvoice, sellerNip } from "./parse";
import type { RenderOptions, RenderResult } from "./types";
import { generateFA3DocDefinition } from "../vendor/ksef-pdf-generator/src/lib-public/FA3-generator";
import { i18nReady } from "../vendor/ksef-pdf-generator/src/lib-public/i18n/i18n-init";

const WATERMARK_TEXT = "WIZUALIZACJA";

let docDefinitionObserver: ((doc: TDocumentDefinitions) => void) | undefined;

/** Test hook (see src/testing.ts): called with every document definition before rendering. */
export function setDocDefinitionObserver(
  observer: ((doc: TDocumentDefinitions) => void) | undefined,
): void {
  docDefinitionObserver = observer;
}

let fontsReady: Promise<void> | undefined;

function ensureFonts(): Promise<void> {
  fontsReady ??= loadRobotoVfs().then(
    (vfs) => {
      pdfMake.addVirtualFileSystem(vfs);
      pdfMake.addFonts(ROBOTO_FONTS);
    },
    (error: unknown) => {
      // Do not cache a failed load (e.g. a dropped chunk request): the next render retries.
      fontsReady = undefined;
      throw error;
    },
  );
  return fontsReady;
}

// i18next is global state and the vendored generator reads it while building the document, so
// renders run strictly one after another.
let queue: Promise<unknown> = Promise.resolve();

export function renderInvoicePdf(
  xml: Uint8Array,
  options: RenderOptions = {},
): Promise<RenderResult> {
  const run = queue.then(() => render(xml, options));
  queue = run.catch(() => undefined);
  return run;
}

async function render(xml: Uint8Array, options: RenderOptions): Promise<RenderResult> {
  const invoice = parseInvoice(xml);

  const candidate = options.ksefNumber?.trim();
  const ksefNumber = candidate && isValidKsefNumber(candidate) ? candidate : undefined;
  const ksefNumberIgnored = Boolean(candidate) && ksefNumber === undefined;

  let qrCode: string | undefined;
  if (ksefNumber) {
    const nip = sellerNip(invoice);
    const date = issueDate(invoice);
    if (!nip || !date) {
      // Same error as buildKodIUrl for an invoice without the data KOD I needs.
      throw new UnsupportedInvoiceError("missing-data");
    }
    if (ksefNumberPrefix(ksefNumber) !== nip) {
      throw new KsefNumberMismatchError();
    }
    // Only KOD I. KOD II needs the issuer's offline certificate, which we never ask for.
    qrCode = await composeKodIUrl(xml, nip, date, options.qrEnvironment ?? "prod");
  }

  await i18nReady;
  await i18next.changeLanguage("pl");
  await ensureFonts();

  const watermark = options.watermark ?? !ksefNumber;
  const docDefinition = generateFA3DocDefinition(invoice, {
    nrKSeF: ksefNumber ?? "",
    qrCode,
    watermark: watermark ? WATERMARK_TEXT : undefined,
  });
  docDefinitionObserver?.(docDefinition);

  const blob = await pdfMake.createPdf(docDefinition).getBlob();

  return {
    blob,
    invoiceType: invoice.Fa?.RodzajFaktury?._text ?? "",
    hasQr: qrCode !== undefined,
    ksefNumberIgnored,
  };
}
