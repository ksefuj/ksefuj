import { describe, expect, it } from "vitest";
import { readExample, readLocalFixture, render } from "./helpers";

describe("invoice types and content", () => {
  it("VAT: no correction labels", async () => {
    const r = await render(readExample("FA_3_Przykład_1.xml"));
    expect(r.invoiceType).toBe("VAT");
    expect(r.text).toContain("Kwotanależnościogółem:");
    expect(r.text).not.toContain("przedkorektą");
  });

  it("ZAL: advance payment amount", async () => {
    const r = await render(readExample("FA_3_Przykład_10.xml"));
    expect(r.invoiceType).toBe("ZAL");
    expect(r.text).toContain("Kwotazapłaty(zaliczki)dokumentowanafakturą:");
  });

  it("ROZ: remaining amount", async () => {
    const r = await render(readExample("Fa_3_Przykład_14.xml"));
    expect(r.invoiceType).toBe("ROZ");
    expect(r.text).toContain("Kwotapozostaładozapłaty:");
  });

  it("KOR: correction totals", async () => {
    const r = await render(readExample("FA_3_Przykład_2.xml"));
    expect(r.invoiceType).toBe("KOR");
    expect(r.text).toContain("Korektakwotynależnościogółem:");
  });

  it.each([
    ["FA_3_Przykład_11.xml", "20000,00"],
    ["FA_3_Przykład_12.xml", "20000,00"],
    ["FA_3_Przykład_13.xml", "30000,00"],
  ])("KOR_ZAL %s: P_15ZK is rendered above the corrected amount", async (name, amount) => {
    const r = await render(readExample(name));
    expect(r.invoiceType).toBe("KOR_ZAL");
    const before = r.text.indexOf(`Kwotazapłatyprzedkorektą:${amount}PLN`);
    const after = r.text.indexOf("Korektakwotyzapłaty(zaliczki)dokumentowanafakturą:");
    expect(before).toBeGreaterThan(-1);
    expect(after).toBeGreaterThan(before);
  });

  it("KOR_ROZ: P_15ZK is rendered above the remaining amount", async () => {
    const r = await render(readExample("Fa_3_Przykład_18.xml"));
    expect(r.invoiceType).toBe("KOR_ROZ");
    const before = r.text.indexOf("Kwotapozostaładozapłatyprzedkorektą:300000,00PLN");
    const after = r.text.indexOf("Korektakwotypozostałejdozapłaty:7635,00PLN");
    expect(before).toBeGreaterThan(-1);
    expect(after).toBeGreaterThan(before);
  });

  it.each(["FA_3_Przykład_8.xml", "Fa_3_Przykład_19.xml"])("margin procedure %s", async (name) => {
    const r = await render(readExample(name));
    expect(r.text).toContain("marż");
  });

  it("foreign currency: currency code and exchange rate", async () => {
    const r = await render(readExample("FA_3_Przykład_21.xml"));
    expect(r.text).toContain("EUR");
    expect(r.text).toContain("Kurswaluty");
    expect(r.text).toContain("4,4080");
  });

  it("Podmiot3 is listed", async () => {
    const r = await render(readExample("FA_3_Przykład_4.xml"));
    expect(r.text).toContain("Podmiotinny");
  });

  it("diacritics and Cyrillic survive in the document", async () => {
    const r = await render(readLocalFixture("diacritics-cyrillic.xml"));
    for (const s of [
      "Zażółć Gęślą Jaźń ĄĆĘŁŃÓŚŹŻ",
      "ФОП Шевченко Тарас Григорович Їжак Єнот ґанок",
    ]) {
      expect(r.text).toContain(s.replace(/\s/g, ""));
    }
  });
});
