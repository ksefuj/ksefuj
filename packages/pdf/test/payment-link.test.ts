import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import { describe, expect, it } from "vitest";
import { readExample, render, xmlText } from "./helpers";

const URL_TEXT = "https://pay.example.com/p?id=42&lang=pl";

function withLink(): Uint8Array {
  const xml = xmlText(readExample("FA_3_Przykład_1.xml")).replace(
    "</Platnosc>",
    `<LinkDoPlatnosci>${URL_TEXT.replace("&", "&amp;")}</LinkDoPlatnosci></Platnosc>`,
  );
  return new TextEncoder().encode(xml);
}

function links(value: unknown, out: unknown[] = []): unknown[] {
  if (Array.isArray(value)) {
    value.forEach((item) => links(item, out));
  } else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      if (key === "link") {
        out.push(item);
      } else {
        links(item, out);
      }
    }
  }
  return out;
}

describe("LinkDoPlatnosci", () => {
  it("is a plain URL string in the document definition", async () => {
    const r = await render(withLink());
    expect(links(r.doc.content)).toContain(URL_TEXT);
    expect(links(r.doc.content).every((link) => typeof link === "string")).toBe(true);
  });

  it("is a real URI annotation in the PDF (not [object Object])", async () => {
    const r = await render(withLink());
    const data = new Uint8Array(await r.blob.arrayBuffer());
    const pdf = await getDocument({ data, verbosity: 0, isEvalSupported: false }).promise;
    const urls: string[] = [];
    for (let n = 1; n <= pdf.numPages; n++) {
      const annotations = await (await pdf.getPage(n)).getAnnotations();
      for (const annotation of annotations) {
        if (annotation.url) {
          urls.push(annotation.url);
        }
      }
    }
    await pdf.destroy();
    expect(urls).toContain(URL_TEXT);
    expect(urls.some((url) => url.includes("object"))).toBe(false);
  });
});
