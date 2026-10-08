import { describe, expect, it } from "vitest";
import {
  buildKodIUrl,
  KsefNumberMismatchError,
  renderInvoicePdf,
  UnsupportedInvoiceError,
} from "../src";
import { generateFA3DocDefinition } from "../vendor/ksef-pdf-generator/src/lib-public/FA3-generator";
import { i18nReady } from "../vendor/ksef-pdf-generator/src/lib-public/i18n/i18n-init";
import { parseInvoice } from "../src/parse";
import { docText, readExample, render, squash } from "./helpers";

// Seller NIP of example 1 is 9999999999. Checksums computed with the CRC-8 of
// CIRFMF/ksef-api faktury/numer-ksef.md (poly 0x07, init 0x00).
const KSEF_NUMBER = "9999999999-20260216-0100001AF629-8D";
const OTHER_SELLER_KSEF_NUMBER = "5265877635-20260216-0100001AF629-1D";
const example1 = (): Uint8Array => readExample("FA_3_Przykład_1.xml");

const encode = (text: string): Uint8Array => new TextEncoder().encode(text);

describe("buildKodIUrl", () => {
  // Hand-computed: shasum -a 256 of the bytes below, converted with
  // `openssl base64 -A | tr '+/' '-_' | tr -d '='`.
  const MINI =
    '<?xml version="1.0" encoding="UTF-8"?><Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/"><Podmiot1><DaneIdentyfikacyjne><NIP>1111111111</NIP></DaneIdentyfikacyjne></Podmiot1><Fa><P_1>2026-02-01</P_1></Fa></Faktura>';
  const HASH = "As3FZezTI4n0Q_0Dw3yv06EMtjQaKZTnScSw67Op9mo";

  it("builds the production link", async () => {
    expect(await buildKodIUrl(encode(MINI))).toBe(
      `https://qr.ksef.mf.gov.pl/invoice/1111111111/01-02-2026/${HASH}`,
    );
  });

  it("uses the test and demo hosts", async () => {
    expect(await buildKodIUrl(encode(MINI), "test")).toBe(
      `https://qr-test.ksef.mf.gov.pl/invoice/1111111111/01-02-2026/${HASH}`,
    );
    expect(await buildKodIUrl(encode(MINI), "demo")).toBe(
      `https://qr-demo.ksef.mf.gov.pl/invoice/1111111111/01-02-2026/${HASH}`,
    );
  });

  it("hashes the exact bytes", async () => {
    const other = await buildKodIUrl(encode(`${MINI}\n`));
    expect(other).not.toContain(HASH);
  });

  it("rejects non-FA(3) input", async () => {
    await expect(buildKodIUrl(encode("<a/>"))).rejects.toMatchObject({ reason: "not-fa3" });
  });
});

describe("renderInvoicePdf: errors", () => {
  it.each(["", "hello", "<Faktura><Fa></Faktura>"])("not-xml: %j", async (input) => {
    const error = await renderInvoicePdf(encode(input)).catch((e: unknown) => e);
    expect(error).toBeInstanceOf(UnsupportedInvoiceError);
    expect((error as UnsupportedInvoiceError).reason).toBe("not-xml");
  });

  it.each([
    "<Faktura xmlns='http://crd.gov.pl/wzor/2023/06/29/12648/'><Fa/></Faktura>",
    "<Faktura><Fa/></Faktura>",
    "<root xmlns='http://crd.gov.pl/wzor/2025/06/25/13775/'/>",
  ])("not-fa3: %s", async (input) => {
    const error = await renderInvoicePdf(encode(input)).catch((e: unknown) => e);
    expect(error).toBeInstanceOf(UnsupportedInvoiceError);
    expect((error as UnsupportedInvoiceError).reason).toBe("not-fa3");
  });

  it("accepts a prefixed root in the FA(3) namespace", () => {
    const xml = encode(
      "<fa:Faktura xmlns:fa='http://crd.gov.pl/wzor/2025/06/25/13775/'><fa:Fa/></fa:Faktura>",
    );
    expect(() => parseInvoice(xml)).not.toThrow();
  });

  it("accepts an ArrayBuffer", async () => {
    const bytes = example1();
    const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
    const result = await renderInvoicePdf(buffer as ArrayBuffer);
    expect(result.invoiceType).toBe("VAT");
  });
});

describe("watermark", () => {
  it("is on by default without a KSeF number", async () => {
    const r = await render(example1());
    expect(r.doc.watermark).toMatchObject({ text: "WIZUALIZACJA" });
  });

  it("is off by default with a KSeF number", async () => {
    const r = await render(example1(), { ksefNumber: KSEF_NUMBER });
    expect(r.doc.watermark).toBeUndefined();
  });

  it("can be overridden both ways", async () => {
    expect((await render(example1(), { watermark: false })).doc.watermark).toBeUndefined();
    const on = await render(example1(), { ksefNumber: KSEF_NUMBER, watermark: true });
    expect(on.doc.watermark).toMatchObject({ text: "WIZUALIZACJA" });
  });
});

describe("KSeF number and KOD I", () => {
  it("adds the number and exactly one QR (KOD I) for a valid matching number", async () => {
    const bytes = example1();
    const r = await render(bytes, { ksefNumber: KSEF_NUMBER });
    expect(r.hasQr).toBe(true);
    expect(r.text).toContain(`NumerKSeF:${KSEF_NUMBER}`);

    const url = await buildKodIUrl(bytes);
    expect(r.text).toContain(squash(url));
    const qrs = JSON.stringify(r.doc.content).match(/"qr":/g) ?? [];
    expect(qrs).toHaveLength(1);

    // Caption under KOD I is the KSeF number; KOD II never appears.
    expect(r.text.split(KSEF_NUMBER).length - 1).toBeGreaterThanOrEqual(2);
    expect(r.text).not.toContain("CERTYFIKAT");
    expect(r.text).not.toContain("OFFLINE");
    expect(r.text).not.toContain("Zweryfikujdostawcęfaktury");
  });

  it("uses the requested environment", async () => {
    const r = await render(example1(), { ksefNumber: KSEF_NUMBER, qrEnvironment: "test" });
    expect(r.text).toContain("https://qr-test.ksef.mf.gov.pl/invoice/9999999999/15-02-2026/");
  });

  it("has no QR and no number without ksefNumber", async () => {
    const r = await render(example1());
    expect(r.hasQr).toBe(false);
    expect(JSON.stringify(r.doc.content)).not.toContain('"qr":');
    expect(r.text).not.toContain("NumerKSeF");
  });

  it("ignores an invalid KSeF number (bad checksum): no QR, watermark stays on", async () => {
    const r = await render(example1(), { ksefNumber: "9999999999-20260216-0100001AF629-00" });
    expect(r.hasQr).toBe(false);
    expect(r.text).not.toContain("NumerKSeF");
    expect(r.doc.watermark).toMatchObject({ text: "WIZUALIZACJA" });
  });

  it("throws KsefNumberMismatchError when the NIP prefix differs from the seller", async () => {
    await expect(
      renderInvoicePdf(example1(), { ksefNumber: OTHER_SELLER_KSEF_NUMBER }),
    ).rejects.toBeInstanceOf(KsefNumberMismatchError);
  });

  it("QR caption is never empty (vendored Stopka patch)", async () => {
    await i18nReady;
    const doc = generateFA3DocDefinition(parseInvoice(example1()), {
      nrKSeF: "",
      qrCode: "https://qr.ksef.mf.gov.pl/invoice/1/01-01-2026/x",
    });
    const texts = JSON.stringify(doc.content);
    expect(texts).toContain('"qr":');
    expect(texts).not.toMatch(/"text":"","alignment":"center"/);
    expect(texts).not.toContain('"text":undefined');
    expect(docText(doc)).not.toContain("OFFLINE");
  });
});

describe("serialised renders", () => {
  it("parallel renders do not interfere", async () => {
    const results = await Promise.all(
      [
        "FA_3_Przykład_1.xml",
        "FA_3_Przykład_2.xml",
        "FA_3_Przykład_10.xml",
        "FA_3_Przykład_11.xml",
      ].map((name) => renderInvoicePdf(readExample(name))),
    );
    expect(results.map((r) => r.invoiceType)).toEqual(["VAT", "KOR", "ZAL", "KOR_ZAL"]);
  });
});
