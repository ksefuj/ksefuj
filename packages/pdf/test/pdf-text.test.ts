// End-to-end: render real PDF bytes and read them back with pdf.js (text layer + embedded fonts).
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import { describe, expect, it } from "vitest";
import { readExample, readLocalFixture, render, squash } from "./helpers";

async function pdfText(blob: Blob): Promise<string> {
  const data = new Uint8Array(await blob.arrayBuffer());
  const pdf = await getDocument({ data, verbosity: 0, isEvalSupported: false }).promise;
  const parts: string[] = [];
  for (let n = 1; n <= pdf.numPages; n++) {
    const page = await pdf.getPage(n);
    const content = await page.getTextContent();
    for (const item of content.items) {
      if ("str" in item) {
        parts.push(item.str);
      }
    }
  }
  await pdf.destroy();
  return squash(parts.join(" "));
}

describe("text extracted from real PDFs", () => {
  it("VAT invoice with a KSeF number: header, disclaimer, number, link, no watermark", async () => {
    const r = await render(readExample("FA_3_Przykład_1.xml"), {
      ksefNumber: "9999999999-20260216-0100001AF629-8D",
    });
    const text = await pdfText(r.blob);
    expect(text).toContain("Wizualizacjafaktury");
    expect(text).toContain("FV2026/02/150");
    expect(text).toContain("Fakturapodstawowa");
    expect(text).toContain("9999999999-20260216-0100001AF629-8D");
    expect(text).toContain("https://qr.ksef.mf.gov.pl/invoice/9999999999/15-02-2026/");
    expect(text).toContain(
      squash(
        "Wizualizacja wygenerowana w ksefuj.to na podstawie pliku XML. Nie jest dokumentem wystawionym w KSeF.",
      ),
    );
    expect(text).not.toContain("KrajowySystem");
    expect(text).not.toContain("WIZUALIZACJA");
  });

  it("KOR_ZAL: P_15ZK and the watermark", async () => {
    const r = await render(readExample("FA_3_Przykład_11.xml"));
    const text = await pdfText(r.blob);
    expect(text).toContain("Kwotazapłatyprzedkorektą:20000,00PLN");
    expect(text).toContain("WIZUALIZACJA");
  });

  it("diacritics and Cyrillic come out as the same characters", async () => {
    const r = await render(readLocalFixture("diacritics-cyrillic.xml"));
    const text = await pdfText(r.blob);
    expect(text).toContain("ZażółćGęśląJaźńĄĆĘŁŃÓŚŹŻ");
    expect(text).toContain("ФОПШевченкоТарасГригоровичЇжакЄнотґанок");
    expect(text).toContain("вул.Хрещатик1");
  });
});
