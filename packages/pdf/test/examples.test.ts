import { describe, expect, it } from "vitest";
import { elementValues, exampleFiles, readExample, render, squash, xmlText } from "./helpers";

const TITLES: Record<string, string> = {
  VAT: "Faktura podstawowa",
  ZAL: "Faktura zaliczkowa",
  ROZ: "Faktura rozliczeniowa",
  UPR: "Faktura uproszczona",
  KOR: "Faktura korygująca",
  KOR_ZAL: "Faktura korygująca zaliczkową",
  KOR_ROZ: "Faktura korygująca rozliczeniową",
};

const files = exampleFiles();

describe("official MF examples", () => {
  it("covers all 26 examples", () => {
    expect(files).toHaveLength(26);
  });

  it.each(files)("renders %s", async (name) => {
    const bytes = readExample(name);
    const xml = xmlText(bytes);
    const result = await render(bytes);

    // Real PDF output.
    const head = new Uint8Array(await result.blob.slice(0, 5).arrayBuffer());
    expect(new TextDecoder().decode(head)).toBe("%PDF-");
    expect(result.blob.size).toBeGreaterThan(5_000);

    // Invoice type and title.
    const type = elementValues(xml, "RodzajFaktury")[0];
    expect(result.invoiceType).toBe(type);
    expect(result.text).toContain(squash(TITLES[type]));

    // Identity of the document.
    expect(result.text).toContain(squash(elementValues(xml, "P_2")[0]));
    for (const nip of elementValues(xml, "NIP")) {
      expect(result.text).toContain(nip);
    }
    for (const name of elementValues(xml, "Nazwa")) {
      expect(result.text).toContain(squash(name));
    }

    // Our branding patches: no KSeF header, disclaimer footer, watermark (no KSeF number given).
    expect(result.text).toContain("Wizualizacjafaktury");
    expect(result.text).not.toContain("KrajowySystem");
    expect(result.text).toContain(
      squash(
        "Wizualizacja wygenerowana w ksefuj.to na podstawie pliku XML. Nie jest dokumentem wystawionym w KSeF.",
      ),
    );
    expect(result.doc.watermark).toMatchObject({ text: "WIZUALIZACJA" });
    expect(result.hasQr).toBe(false);
  });
});
