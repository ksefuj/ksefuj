/**
 * @ksefuj/validator - Semantic validation tests
 *
 * Comprehensive test suite for all 38 semantic validation rules
 * based on the official FA(3) information sheet (March 2026).
 */

import { describe, expect, it } from "vitest";
import { XmlDocument } from "libxml2-wasm";
import { checkSemantics, semanticRules } from "../semantic.js";
import { ERROR_CODES } from "../error-codes.js";
import type { CurrencyRate } from "../types.js";

// Helper to create a minimal valid FA(3) document for testing
function wrapInFaktura(partialXml: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/">
  <Naglowek>
    <KodFormularza kodSystemowy="FA (3)" wersjaSchemy="1-0E">FA</KodFormularza>
    <WariantFormularza>3</WariantFormularza>
    <DataWytworzeniaFa>2026-09-15T10:00:00Z</DataWytworzeniaFa>
  </Naglowek>
  ${partialXml}
</Faktura>`;
}

// Helper to validate a document and return issues
function validateXml(xml: string, currencyRates?: Record<string, CurrencyRate[] | null>) {
  const doc = XmlDocument.fromString(xml);
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return checkSemantics(doc as unknown as any, false, currencyRates);
  } finally {
    doc.dispose();
  }
}

describe("Semantic Validation", () => {
  describe("Group 1: Podmiot Rules", () => {
    it("should detect missing JST in Podmiot2", () => {
      const xml = wrapInFaktura(`
        <Podmiot1>
          <DaneIdentyfikacyjne><NIP>1234567890</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
        </Podmiot1>
        <Podmiot2>
          <DaneIdentyfikacyjne><NIP>9876543210</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
          <GV>2</GV>
        </Podmiot2>
        <Fa>
          <KodWaluty>PLN</KodWaluty>
          <P_1>2026-09-15</P_1>
          <P_2>FV/001/09/2026</P_2>
          <P_15>123.00</P_15>
          <Adnotacje>
            <P_16>2</P_16><P_17>2</P_17><P_18>2</P_18><P_18A>2</P_18A>
            <Zwolnienie><P_19N>1</P_19N></Zwolnienie>
            <NoweSrodkiTransportu><P_22N>1</P_22N></NoweSrodkiTransportu>
            <P_23>2</P_23>
            <PMarzy><P_PMarzyN>1</P_PMarzyN></PMarzy>
          </Adnotacje>
          <RodzajFaktury>VAT</RodzajFaktury>
        </Fa>
      `);

      const result = validateXml(xml);
      expect(result.issues).toHaveLength(1);
      expect(result.issues[0].code.code).toBe("PODMIOT2_JST_MISSING");
    });

    it("should detect missing GV in Podmiot2", () => {
      const xml = wrapInFaktura(`
        <Podmiot1>
          <DaneIdentyfikacyjne><NIP>1234567890</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
        </Podmiot1>
        <Podmiot2>
          <DaneIdentyfikacyjne><NIP>9876543210</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
          <JST>2</JST>
        </Podmiot2>
        <Fa>
          <KodWaluty>PLN</KodWaluty>
          <P_1>2026-09-15</P_1>
          <P_2>FV/001/09/2026</P_2>
          <P_15>123.00</P_15>
          <Adnotacje>
            <P_16>2</P_16><P_17>2</P_17><P_18>2</P_18><P_18A>2</P_18A>
            <Zwolnienie><P_19N>1</P_19N></Zwolnienie>
            <NoweSrodkiTransportu><P_22N>1</P_22N></NoweSrodkiTransportu>
            <P_23>2</P_23>
            <PMarzy><P_PMarzyN>1</P_PMarzyN></PMarzy>
          </Adnotacje>
          <RodzajFaktury>VAT</RodzajFaktury>
        </Fa>
      `);

      const result = validateXml(xml);
      expect(result.issues).toHaveLength(1);
      expect(result.issues[0].code.code).toBe("PODMIOT2_GV_MISSING");
    });

    it("should detect JST=1 without Podmiot3 Rola=8", () => {
      const xml = wrapInFaktura(`
        <Podmiot1>
          <DaneIdentyfikacyjne><NIP>1234567890</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
        </Podmiot1>
        <Podmiot2>
          <DaneIdentyfikacyjne><NIP>9876543210</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
          <JST>1</JST>
          <GV>2</GV>
        </Podmiot2>
        <Fa>
          <KodWaluty>PLN</KodWaluty>
          <P_1>2026-09-15</P_1>
          <P_2>FV/001/09/2026</P_2>
          <P_15>123.00</P_15>
          <Adnotacje>
            <P_16>2</P_16><P_17>2</P_17><P_18>2</P_18><P_18A>2</P_18A>
            <Zwolnienie><P_19N>1</P_19N></Zwolnienie>
            <NoweSrodkiTransportu><P_22N>1</P_22N></NoweSrodkiTransportu>
            <P_23>2</P_23>
            <PMarzy><P_PMarzyN>1</P_PMarzyN></PMarzy>
          </Adnotacje>
          <RodzajFaktury>VAT</RodzajFaktury>
        </Fa>
      `);

      const result = validateXml(xml);
      expect(result.issues.some((i) => i.code.code === "JST_REQUIRES_PODMIOT3")).toBe(true);
    });

    it("should detect Polish NIP in wrong field", () => {
      const xml = wrapInFaktura(`
        <Podmiot1>
          <DaneIdentyfikacyjne><NIP>1234567890</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
        </Podmiot1>
        <Podmiot2>
          <DaneIdentyfikacyjne>
            <NrVatUE>1234567890</NrVatUE>
            <Nazwa>Test</Nazwa>
          </DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
          <JST>2</JST>
          <GV>2</GV>
        </Podmiot2>
        <Fa>
          <KodWaluty>PLN</KodWaluty>
          <P_1>2026-09-15</P_1>
          <P_2>FV/001/09/2026</P_2>
          <P_15>123.00</P_15>
          <Adnotacje>
            <P_16>2</P_16><P_17>2</P_17><P_18>2</P_18><P_18A>2</P_18A>
            <Zwolnienie><P_19N>1</P_19N></Zwolnienie>
            <NoweSrodkiTransportu><P_22N>1</P_22N></NoweSrodkiTransportu>
            <P_23>2</P_23>
            <PMarzy><P_PMarzyN>1</P_PMarzyN></PMarzy>
          </Adnotacje>
          <RodzajFaktury>VAT</RodzajFaktury>
        </Fa>
      `);

      const result = validateXml(xml);
      expect(result.issues.some((i) => i.code.code === "NIP_IN_WRONG_FIELD")).toBe(true);
    });
  });

  describe("Group 2: Fa Core Rules", () => {
    it("should detect missing P_15", () => {
      const xml = wrapInFaktura(`
        <Podmiot1>
          <DaneIdentyfikacyjne><NIP>1234567890</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
        </Podmiot1>
        <Podmiot2>
          <DaneIdentyfikacyjne><NIP>9876543210</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
          <JST>2</JST>
          <GV>2</GV>
        </Podmiot2>
        <Fa>
          <KodWaluty>PLN</KodWaluty>
          <P_1>2026-09-15</P_1>
          <P_2>FV/001/09/2026</P_2>
          <Adnotacje>
            <P_16>2</P_16><P_17>2</P_17><P_18>2</P_18><P_18A>2</P_18A>
            <Zwolnienie><P_19N>1</P_19N></Zwolnienie>
            <NoweSrodkiTransportu><P_22N>1</P_22N></NoweSrodkiTransportu>
            <P_23>2</P_23>
            <PMarzy><P_PMarzyN>1</P_PMarzyN></PMarzy>
          </Adnotacje>
          <RodzajFaktury>VAT</RodzajFaktury>
        </Fa>
      `);

      const result = validateXml(xml);
      expect(result.issues.some((i) => i.code.code === "P15_MISSING")).toBe(true);
    });

    it("should detect P_6 and P_6A mutual exclusion", () => {
      const xml = wrapInFaktura(`
        <Podmiot1>
          <DaneIdentyfikacyjne><NIP>1234567890</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
        </Podmiot1>
        <Podmiot2>
          <DaneIdentyfikacyjne><NIP>9876543210</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
          <JST>2</JST>
          <GV>2</GV>
        </Podmiot2>
        <Fa>
          <KodWaluty>PLN</KodWaluty>
          <P_1>2026-09-15</P_1>
          <P_2>FV/001/09/2026</P_2>
          <P_6>2026-09-15</P_6>
          <P_15>123.00</P_15>
          <Adnotacje>
            <P_16>2</P_16><P_17>2</P_17><P_18>2</P_18><P_18A>2</P_18A>
            <Zwolnienie><P_19N>1</P_19N></Zwolnienie>
            <NoweSrodkiTransportu><P_22N>1</P_22N></NoweSrodkiTransportu>
            <P_23>2</P_23>
            <PMarzy><P_PMarzyN>1</P_PMarzyN></PMarzy>
          </Adnotacje>
          <RodzajFaktury>VAT</RodzajFaktury>
        </Fa>
        <FaWiersz>
          <NrWierszaFa>1</NrWierszaFa>
          <P_6A>2026-09-14</P_6A>
          <P_7>Test item</P_7>
          <P_8B>1</P_8B>
          <P_9A>100.00</P_9A>
          <P_11>100.00</P_11>
          <P_12>23</P_12>
        </FaWiersz>
      `);

      const result = validateXml(xml);
      expect(result.issues.some((i) => i.code.code === "P6_P6A_MUTUAL_EXCLUSION")).toBe(true);
    });

    it("should detect corrective invoice without DaneFaKorygowanej", () => {
      const xml = wrapInFaktura(`
        <Podmiot1>
          <DaneIdentyfikacyjne><NIP>1234567890</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
        </Podmiot1>
        <Podmiot2>
          <DaneIdentyfikacyjne><NIP>9876543210</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
          <JST>2</JST>
          <GV>2</GV>
        </Podmiot2>
        <Fa>
          <KodWaluty>PLN</KodWaluty>
          <P_1>2026-09-15</P_1>
          <P_2>FV/001/09/2026</P_2>
          <P_15>123.00</P_15>
          <Adnotacje>
            <P_16>2</P_16><P_17>2</P_17><P_18>2</P_18><P_18A>2</P_18A>
            <Zwolnienie><P_19N>1</P_19N></Zwolnienie>
            <NoweSrodkiTransportu><P_22N>1</P_22N></NoweSrodkiTransportu>
            <P_23>2</P_23>
            <PMarzy><P_PMarzyN>1</P_PMarzyN></PMarzy>
          </Adnotacje>
          <RodzajFaktury>KOR</RodzajFaktury>
        </Fa>
      `);

      const result = validateXml(xml);
      expect(result.issues.some((i) => i.code.code === "RODZAJ_FAKTURY_SECTIONS")).toBe(true);
    });
  });

  describe("Group 3: Adnotacje Rules", () => {
    it("should detect missing mandatory Adnotacje fields", () => {
      const xml = wrapInFaktura(`
        <Podmiot1>
          <DaneIdentyfikacyjne><NIP>1234567890</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
        </Podmiot1>
        <Podmiot2>
          <DaneIdentyfikacyjne><NIP>9876543210</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
          <JST>2</JST>
          <GV>2</GV>
        </Podmiot2>
        <Fa>
          <KodWaluty>PLN</KodWaluty>
          <P_1>2026-09-15</P_1>
          <P_2>FV/001/09/2026</P_2>
          <P_15>123.00</P_15>
          <Adnotacje>
            <P_16>2</P_16>
            <P_17>2</P_17>
            <P_18>2</P_18>
            <!-- Missing P_18A and other required fields -->
          </Adnotacje>
          <RodzajFaktury>VAT</RodzajFaktury>
        </Fa>
      `);

      const result = validateXml(xml);
      const missingFields = result.issues.filter(
        (i) => i.code.code.startsWith("ADNOTACJE_") && i.code.code.endsWith("_MISSING"),
      );
      expect(missingFields.length).toBeGreaterThan(0);
    });

    it("should detect invalid Zwolnienie logic", () => {
      const xml = wrapInFaktura(`
        <Podmiot1>
          <DaneIdentyfikacyjne><NIP>1234567890</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
        </Podmiot1>
        <Podmiot2>
          <DaneIdentyfikacyjne><NIP>9876543210</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
          <JST>2</JST>
          <GV>2</GV>
        </Podmiot2>
        <Fa>
          <KodWaluty>PLN</KodWaluty>
          <P_1>2026-09-15</P_1>
          <P_2>FV/001/09/2026</P_2>
          <P_15>123.00</P_15>
          <Adnotacje>
            <P_16>2</P_16><P_17>2</P_17><P_18>2</P_18><P_18A>2</P_18A>
            <Zwolnienie>
              <P_19>1</P_19>
              <P_19N>1</P_19N>
            </Zwolnienie>
            <NoweSrodkiTransportu><P_22N>1</P_22N></NoweSrodkiTransportu>
            <P_23>2</P_23>
            <PMarzy><P_PMarzyN>1</P_PMarzyN></PMarzy>
          </Adnotacje>
          <RodzajFaktury>VAT</RodzajFaktury>
        </Fa>
      `);

      const result = validateXml(xml);
      expect(result.issues.some((i) => i.code.code === "ZWOLNIENIE_LOGIC")).toBe(true);
    });
  });

  describe("Group 4: FaWiersz Rules", () => {
    it("should detect invalid P_12 tax rate code", () => {
      const xml = wrapInFaktura(`
        <Podmiot1>
          <DaneIdentyfikacyjne><NIP>1234567890</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
        </Podmiot1>
        <Podmiot2>
          <DaneIdentyfikacyjne><NIP>9876543210</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
          <JST>2</JST>
          <GV>2</GV>
        </Podmiot2>
        <Fa>
          <KodWaluty>PLN</KodWaluty>
          <P_1>2026-09-15</P_1>
          <P_2>FV/001/09/2026</P_2>
          <P_15>123.00</P_15>
          <Adnotacje>
            <P_16>2</P_16><P_17>2</P_17><P_18>2</P_18><P_18A>2</P_18A>
            <Zwolnienie><P_19N>1</P_19N></Zwolnienie>
            <NoweSrodkiTransportu><P_22N>1</P_22N></NoweSrodkiTransportu>
            <P_23>2</P_23>
            <PMarzy><P_PMarzyN>1</P_PMarzyN></PMarzy>
          </Adnotacje>
          <RodzajFaktury>VAT</RodzajFaktury>
        </Fa>
        <FaWiersz>
          <NrWierszaFa>1</NrWierszaFa>
          <P_7>Test item</P_7>
          <P_8B>1</P_8B>
          <P_9A>100.00</P_9A>
          <P_11>100.00</P_11>
          <P_12>25</P_12> <!-- Invalid rate -->
        </FaWiersz>
      `);

      const result = validateXml(xml);
      expect(result.issues.some((i) => i.code.code === "P12_ENUMERATION")).toBe(true);
    });

    it("should detect wrong GTU format", () => {
      const xml = wrapInFaktura(`
        <Podmiot1>
          <DaneIdentyfikacyjne><NIP>1234567890</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
        </Podmiot1>
        <Podmiot2>
          <DaneIdentyfikacyjne><NIP>9876543210</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
          <JST>2</JST>
          <GV>2</GV>
        </Podmiot2>
        <Fa>
          <KodWaluty>PLN</KodWaluty>
          <P_1>2026-09-15</P_1>
          <P_2>FV/001/09/2026</P_2>
          <P_15>123.00</P_15>
          <Adnotacje>
            <P_16>2</P_16><P_17>2</P_17><P_18>2</P_18><P_18A>2</P_18A>
            <Zwolnienie><P_19N>1</P_19N></Zwolnienie>
            <NoweSrodkiTransportu><P_22N>1</P_22N></NoweSrodkiTransportu>
            <P_23>2</P_23>
            <PMarzy><P_PMarzyN>1</P_PMarzyN></PMarzy>
          </Adnotacje>
          <RodzajFaktury>VAT</RodzajFaktury>
        </Fa>
        <FaWiersz>
          <NrWierszaFa>1</NrWierszaFa>
          <P_7>Test item</P_7>
          <P_8B>1</P_8B>
          <P_9A>100.00</P_9A>
          <P_11>100.00</P_11>
          <P_12>23</P_12>
          <GTU>GTU12</GTU> <!-- Wrong format, should be GTU_12 -->
        </FaWiersz>
      `);

      const result = validateXml(xml);
      expect(result.issues.some((i) => i.code.code === "GTU_FORMAT")).toBe(true);
    });
  });

  describe("Decimal Precision Validation", () => {
    it("should detect excessive decimal places in general amounts (2 max)", () => {
      const xml = wrapInFaktura(`
        <Podmiot1>
          <DaneIdentyfikacyjne><NIP>1234567890</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
        </Podmiot1>
        <Podmiot2>
          <DaneIdentyfikacyjne><NIP>9876543210</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
          <JST>2</JST><GV>2</GV>
        </Podmiot2>
        <Fa>
          <KodWaluty>PLN</KodWaluty>
          <P_1>2026-09-15</P_1>
          <P_2>FV/001/09/2026</P_2>
          <P_15>123.123</P_15> <!-- 3 decimal places, max is 2 -->
          <Adnotacje>
            <P_16>2</P_16><P_17>2</P_17><P_18>2</P_18><P_18A>2</P_18A>
            <Zwolnienie><P_19N>1</P_19N></Zwolnienie>
            <NoweSrodkiTransportu><P_22N>1</P_22N></NoweSrodkiTransportu>
            <P_23>2</P_23>
            <PMarzy><P_PMarzyN>1</P_PMarzyN></PMarzy>
          </Adnotacje>
          <RodzajFaktury>VAT</RodzajFaktury>
        </Fa>
      `);

      const result = validateXml(xml);
      expect(result.issues.some((i) => i.code.code === "DECIMAL_PRECISION")).toBe(true);
      const precisionIssues = result.issues.filter((i) => i.code.code === "DECIMAL_PRECISION");
      expect(precisionIssues[0].message).toContain(
        "P_15 has 3 decimal places, maximum allowed is 2",
      );
    });

    it("should detect excessive decimal places in unit prices (8 max)", () => {
      const xml = wrapInFaktura(`
        <Podmiot1>
          <DaneIdentyfikacyjne><NIP>1234567890</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
        </Podmiot1>
        <Podmiot2>
          <DaneIdentyfikacyjne><NIP>9876543210</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
          <JST>2</JST><GV>2</GV>
        </Podmiot2>
        <Fa>
          <KodWaluty>PLN</KodWaluty>
          <P_1>2026-09-15</P_1>
          <P_2>FV/001/09/2026</P_2>
          <Adnotacje>
            <P_16>2</P_16><P_17>2</P_17><P_18>2</P_18><P_18A>2</P_18A>
            <Zwolnienie><P_19N>1</P_19N></Zwolnienie>
            <NoweSrodkiTransportu><P_22N>1</P_22N></NoweSrodkiTransportu>
            <P_23>2</P_23>
            <PMarzy><P_PMarzyN>1</P_PMarzyN></PMarzy>
          </Adnotacje>
          <RodzajFaktury>VAT</RodzajFaktury>
        </Fa>
        <FaWiersz>
          <NrWierszaFa>1</NrWierszaFa>
          <P_7>Test item</P_7>
          <P_9A>123.123456789</P_9A> <!-- 9 decimal places, max is 8 -->
          <P_8B>1.0</P_8B>
          <P_11>123.00</P_11>
          <P_12>23</P_12>
        </FaWiersz>
      `);

      const result = validateXml(xml);
      expect(result.issues.some((i) => i.code.code === "DECIMAL_PRECISION")).toBe(true);
      const precisionIssues = result.issues.filter((i) => i.code.code === "DECIMAL_PRECISION");
      expect(precisionIssues[0].message).toContain(
        "P_9A has 9 decimal places, maximum allowed is 8",
      );
    });

    it("should detect excessive decimal places in quantities (6 max)", () => {
      const xml = wrapInFaktura(`
        <Podmiot1>
          <DaneIdentyfikacyjne><NIP>1234567890</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
        </Podmiot1>
        <Podmiot2>
          <DaneIdentyfikacyjne><NIP>9876543210</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
          <JST>2</JST><GV>2</GV>
        </Podmiot2>
        <Fa>
          <KodWaluty>PLN</KodWaluty>
          <P_1>2026-09-15</P_1>
          <P_2>FV/001/09/2026</P_2>
          <Adnotacje>
            <P_16>2</P_16><P_17>2</P_17><P_18>2</P_18><P_18A>2</P_18A>
            <Zwolnienie><P_19N>1</P_19N></Zwolnienie>
            <NoweSrodkiTransportu><P_22N>1</P_22N></NoweSrodkiTransportu>
            <P_23>2</P_23>
            <PMarzy><P_PMarzyN>1</P_PMarzyN></PMarzy>
          </Adnotacje>
          <RodzajFaktury>VAT</RodzajFaktury>
        </Fa>
        <FaWiersz>
          <NrWierszaFa>1</NrWierszaFa>
          <P_7>Test item</P_7>
          <P_9A>123.00</P_9A>
          <P_8B>1.1234567</P_8B> <!-- 7 decimal places, max is 6 -->
          <P_11>123.00</P_11>
          <P_12>23</P_12>
        </FaWiersz>
      `);

      const result = validateXml(xml);
      expect(result.issues.some((i) => i.code.code === "DECIMAL_PRECISION")).toBe(true);
      const precisionIssues = result.issues.filter((i) => i.code.code === "DECIMAL_PRECISION");
      expect(precisionIssues[0].message).toContain(
        "P_8B has 7 decimal places, maximum allowed is 6",
      );
    });

    it("should accept valid decimal precision", () => {
      const xml = wrapInFaktura(`
        <Podmiot1>
          <DaneIdentyfikacyjne><NIP>1234567890</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
        </Podmiot1>
        <Podmiot2>
          <DaneIdentyfikacyjne><NIP>9876543210</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
          <JST>2</JST><GV>2</GV>
        </Podmiot2>
        <Fa>
          <KodWaluty>PLN</KodWaluty>
          <P_1>2026-09-15</P_1>
          <P_2>FV/001/09/2026</P_2>
          <P_15>123.12</P_15> <!-- 2 decimal places, max is 2 -->
          <KursWalutyZ>4.123456</KursWalutyZ> <!-- 6 decimal places, max is 6 -->
          <Adnotacje>
            <P_16>2</P_16><P_17>2</P_17><P_18>2</P_18><P_18A>2</P_18A>
            <Zwolnienie><P_19N>1</P_19N></Zwolnienie>
            <NoweSrodkiTransportu><P_22N>1</P_22N></NoweSrodkiTransportu>
            <P_23>2</P_23>
            <PMarzy><P_PMarzyN>1</P_PMarzyN></PMarzy>
          </Adnotacje>
          <RodzajFaktury>VAT</RodzajFaktury>
        </Fa>
        <FaWiersz>
          <NrWierszaFa>1</NrWierszaFa>
          <P_7>Test item</P_7>
          <P_9A>123.12345678</P_9A> <!-- 8 decimal places, max is 8 -->
          <P_8B>1.123456</P_8B> <!-- 6 decimal places, max is 6 -->
          <P_11>123.12</P_11> <!-- 2 decimal places, max is 2 -->
          <P_12>23</P_12>
        </FaWiersz>
      `);

      const result = validateXml(xml);
      expect(result.issues.filter((i) => i.code.code === "DECIMAL_PRECISION")).toHaveLength(0);
    });

    it("should ignore non-numeric values", () => {
      const xml = wrapInFaktura(`
        <Podmiot1>
          <DaneIdentyfikacyjne><NIP>1234567890</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
        </Podmiot1>
        <Podmiot2>
          <DaneIdentyfikacyjne><NIP>9876543210</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
          <JST>2</JST><GV>2</GV>
        </Podmiot2>
        <Fa>
          <KodWaluty>PLN</KodWaluty>
          <P_1>2026-09-15</P_1>
          <P_2>FV/001/09/2026</P_2>
          <P_15>invalid.value</P_15> <!-- Non-numeric, should be ignored -->
          <Adnotacje>
            <P_16>2</P_16><P_17>2</P_17><P_18>2</P_18><P_18A>2</P_18A>
            <Zwolnienie><P_19N>1</P_19N></Zwolnienie>
            <NoweSrodkiTransportu><P_22N>1</P_22N></NoweSrodkiTransportu>
            <P_23>2</P_23>
            <PMarzy><P_PMarzyN>1</P_PMarzyN></PMarzy>
          </Adnotacje>
          <RodzajFaktury>VAT</RodzajFaktury>
        </Fa>
      `);

      const result = validateXml(xml);
      expect(result.issues.filter((i) => i.code.code === "DECIMAL_PRECISION")).toHaveLength(0);
    });
  });

  describe("Group 5: Corrective Invoice Rules", () => {
    it("should detect incorrect NrKSeF/NrKSeFN logic", () => {
      const xml = wrapInFaktura(`
        <Podmiot1>
          <DaneIdentyfikacyjne><NIP>1234567890</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
        </Podmiot1>
        <Podmiot2>
          <DaneIdentyfikacyjne><NIP>9876543210</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
          <JST>2</JST>
          <GV>2</GV>
        </Podmiot2>
        <Fa>
          <KodWaluty>PLN</KodWaluty>
          <P_1>2026-09-15</P_1>
          <P_2>FV/001/09/2026</P_2>
          <P_15>123.00</P_15>
          <Adnotacje>
            <P_16>2</P_16><P_17>2</P_17><P_18>2</P_18><P_18A>2</P_18A>
            <Zwolnienie><P_19N>1</P_19N></Zwolnienie>
            <NoweSrodkiTransportu><P_22N>1</P_22N></NoweSrodkiTransportu>
            <P_23>2</P_23>
            <PMarzy><P_PMarzyN>1</P_PMarzyN></PMarzy>
          </Adnotacje>
          <RodzajFaktury>KOR</RodzajFaktury>
          <DaneFaKorygowanej>
            <DataWystFaKorygowanej>2026-08-15</DataWystFaKorygowanej>
            <NrFaKorygowanej>FV/100/08/2026</NrFaKorygowanej>
            <NrKSeF>1</NrKSeF>
            <NrKSeFN>1</NrKSeFN> <!-- Both cannot be 1 -->
          </DaneFaKorygowanej>
        </Fa>
      `);

      const result = validateXml(xml);
      expect(result.issues.some((i) => i.code.code === "KOR_NRKSEF_CONSISTENCY")).toBe(true);
    });
  });

  describe("Group 6: Payment & Transaction Rules", () => {
    it("should detect missing payment date when Zaplacono=1", () => {
      const xml = wrapInFaktura(`
        <Podmiot1>
          <DaneIdentyfikacyjne><NIP>1234567890</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
        </Podmiot1>
        <Podmiot2>
          <DaneIdentyfikacyjne><NIP>9876543210</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
          <JST>2</JST>
          <GV>2</GV>
        </Podmiot2>
        <Fa>
          <KodWaluty>PLN</KodWaluty>
          <P_1>2026-09-15</P_1>
          <P_2>FV/001/09/2026</P_2>
          <P_15>123.00</P_15>
          <Adnotacje>
            <P_16>2</P_16><P_17>2</P_17><P_18>2</P_18><P_18A>2</P_18A>
            <Zwolnienie><P_19N>1</P_19N></Zwolnienie>
            <NoweSrodkiTransportu><P_22N>1</P_22N></NoweSrodkiTransportu>
            <P_23>2</P_23>
            <PMarzy><P_PMarzyN>1</P_PMarzyN></PMarzy>
          </Adnotacje>
          <RodzajFaktury>VAT</RodzajFaktury>
          <Platnosc>
            <Zaplacono>1</Zaplacono>
            <!-- Missing DataZaplaty -->
          </Platnosc>
        </Fa>
      `);

      const result = validateXml(xml);
      expect(result.issues.some((i) => i.code.code === "PAYMENT_ZAPLACONO_DATE")).toBe(true);
    });

    it("should detect PLN in WalutaUmowna", () => {
      const xml = wrapInFaktura(`
        <Podmiot1>
          <DaneIdentyfikacyjne><NIP>1234567890</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
        </Podmiot1>
        <Podmiot2>
          <DaneIdentyfikacyjne><NIP>9876543210</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
          <JST>2</JST>
          <GV>2</GV>
        </Podmiot2>
        <Fa>
          <KodWaluty>EUR</KodWaluty>
          <P_1>2026-09-15</P_1>
          <P_2>FV/001/09/2026</P_2>
          <P_15>123.00</P_15>
          <Adnotacje>
            <P_16>2</P_16><P_17>2</P_17><P_18>2</P_18><P_18A>2</P_18A>
            <Zwolnienie><P_19N>1</P_19N></Zwolnienie>
            <NoweSrodkiTransportu><P_22N>1</P_22N></NoweSrodkiTransportu>
            <P_23>2</P_23>
            <PMarzy><P_PMarzyN>1</P_PMarzyN></PMarzy>
          </Adnotacje>
          <RodzajFaktury>VAT</RodzajFaktury>
          <WarunkiTransakcji>
            <WalutaUmowna>PLN</WalutaUmowna> <!-- Not allowed -->
            <KursUmowny>4.50</KursUmowny>
          </WarunkiTransakcji>
        </Fa>
      `);

      const result = validateXml(xml);
      expect(result.issues.some((i) => i.code.code === "WALUTA_UMOWNA_PLN")).toBe(true);
    });
  });

  describe("Group 8: Additional Business Logic Rules", () => {
    const withBankAccount = (nrRB: string) =>
      wrapInFaktura(`
        <Podmiot1>
          <DaneIdentyfikacyjne><NIP>1234567890</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
        </Podmiot1>
        <Podmiot2>
          <DaneIdentyfikacyjne><NIP>9876543210</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
          <JST>2</JST><GV>2</GV>
        </Podmiot2>
        <Fa>
          <KodWaluty>PLN</KodWaluty>
          <P_1>2026-09-15</P_1>
          <P_2>FV/001/09/2026</P_2>
          <P_15>123.00</P_15>
          <Adnotacje>
            <P_16>2</P_16><P_17>2</P_17><P_18>2</P_18><P_18A>2</P_18A>
            <Zwolnienie><P_19N>1</P_19N></Zwolnienie>
            <NoweSrodkiTransportu><P_22N>1</P_22N></NoweSrodkiTransportu>
            <P_23>2</P_23>
            <PMarzy><P_PMarzyN>1</P_PMarzyN></PMarzy>
          </Adnotacje>
          <RodzajFaktury>VAT</RodzajFaktury>
          <Platnosc>
            <FormaPlatnosci>6</FormaPlatnosci>
            <RachunekBankowy>
              <NrRB>${nrRB}</NrRB>
              <NazwaBanku>Test Bank</NazwaBanku>
            </RachunekBankowy>
          </Platnosc>
        </Fa>
      `);

    it("should accept valid Polish IBAN (PL + 26 digits = 28 chars)", () => {
      // PL49114020040000311207405865 — real Polish IBAN, 28 chars
      const result = validateXml(withBankAccount("PL49114020040000311207405865"));
      expect(result.issues.some((i) => i.code.code === "INVALID_BANK_ACCOUNT_FORMAT")).toBe(false);
    });

    it("should accept valid Polish NRB without prefix (26 digits)", () => {
      // 49114020040000311207405865 — NRB without PL prefix, 26 digits
      const result = validateXml(withBankAccount("49114020040000311207405865"));
      expect(result.issues.some((i) => i.code.code === "INVALID_BANK_ACCOUNT_FORMAT")).toBe(false);
    });

    it("should reject PL-prefixed account with wrong length (not 28 chars)", () => {
      // PL + 24 digits = 26 chars — wrong, IBAN must be PL + 26 digits = 28 total
      const result = validateXml(withBankAccount("PL491140200400003112074058"));
      expect(result.issues.some((i) => i.code.code === "INVALID_BANK_ACCOUNT_FORMAT")).toBe(true);
    });

    it("should reject all-digit NRB with wrong length (not 26 digits)", () => {
      // 24 digits — wrong, NRB must be 26 digits
      const result = validateXml(withBankAccount("491140200400003112074058"));
      expect(result.issues.some((i) => i.code.code === "INVALID_BANK_ACCOUNT_FORMAT")).toBe(true);
    });
  });

  describe("Group 7: Format Rules", () => {
    it("should detect thousand separators in amount fields", () => {
      const xml = wrapInFaktura(`
        <Podmiot1>
          <DaneIdentyfikacyjne><NIP>1234567890</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
        </Podmiot1>
        <Podmiot2>
          <DaneIdentyfikacyjne><NIP>9876543210</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
          <JST>2</JST>
          <GV>2</GV>
        </Podmiot2>
        <Fa>
          <KodWaluty>PLN</KodWaluty>
          <P_1>2026-09-15</P_1>
          <P_2>FV/001/09/2026</P_2>
          <P_15>1 234.56</P_15> <!-- Space separator -->
          <Adnotacje>
            <P_16>2</P_16><P_17>2</P_17><P_18>2</P_18><P_18A>2</P_18A>
            <Zwolnienie><P_19N>1</P_19N></Zwolnienie>
            <NoweSrodkiTransportu><P_22N>1</P_22N></NoweSrodkiTransportu>
            <P_23>2</P_23>
            <PMarzy><P_PMarzyN>1</P_PMarzyN></PMarzy>
          </Adnotacje>
          <RodzajFaktury>VAT</RodzajFaktury>
        </Fa>
      `);

      const result = validateXml(xml);
      expect(result.issues.some((i) => i.code.code === "AMOUNT_NO_SEPARATORS")).toBe(true);
    });
  });

  describe("Valid Document Tests", () => {
    it("should pass validation for a complete valid document", () => {
      const xml = wrapInFaktura(`
        <Podmiot1>
          <DaneIdentyfikacyjne><NIP>1234567890</NIP><Nazwa>Test Seller</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>ul. Testowa 1, 00-001 Warszawa</AdresL1></Adres>
        </Podmiot1>
        <Podmiot2>
          <DaneIdentyfikacyjne><NIP>9876543210</NIP><Nazwa>Test Buyer</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>ul. Przykładowa 2, 00-002 Kraków</AdresL1></Adres>
          <JST>2</JST>
          <GV>2</GV>
        </Podmiot2>
        <Fa>
          <KodWaluty>PLN</KodWaluty>
          <P_1>2026-09-15</P_1>
          <P_2>FV/001/09/2026</P_2>
          <P_13_1>100.00</P_13_1>
          <P_14_1>23.00</P_14_1>
          <P_15>123.00</P_15>
          <Adnotacje>
            <P_16>2</P_16>
            <P_17>2</P_17>
            <P_18>2</P_18>
            <P_18A>2</P_18A>
            <Zwolnienie><P_19N>1</P_19N></Zwolnienie>
            <NoweSrodkiTransportu><P_22N>1</P_22N></NoweSrodkiTransportu>
            <P_23>2</P_23>
            <PMarzy><P_PMarzyN>1</P_PMarzyN></PMarzy>
          </Adnotacje>
          <RodzajFaktury>VAT</RodzajFaktury>
        </Fa>
        <FaWiersz>
          <NrWierszaFa>1</NrWierszaFa>
          <P_7>Test product</P_7>
          <P_8B>1</P_8B>
          <P_9A>100.00</P_9A>
          <P_11>100.00</P_11>
          <P_12>23</P_12>
        </FaWiersz>
      `);

      const result = validateXml(xml);
      expect(result.issues).toHaveLength(0);
    });
  });

  describe("Edge Cases", () => {
    it("should handle documents with multiple FaWiersz elements", () => {
      const xml = wrapInFaktura(`
        <Podmiot1>
          <DaneIdentyfikacyjne><NIP>1234567890</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
        </Podmiot1>
        <Podmiot2>
          <DaneIdentyfikacyjne><NIP>9876543210</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
          <JST>2</JST>
          <GV>2</GV>
        </Podmiot2>
        <Fa>
          <KodWaluty>PLN</KodWaluty>
          <P_1>2026-09-15</P_1>
          <P_2>FV/001/09/2026</P_2>
          <P_15>246.00</P_15>
          <Adnotacje>
            <P_16>2</P_16><P_17>2</P_17><P_18>2</P_18><P_18A>2</P_18A>
            <Zwolnienie><P_19N>1</P_19N></Zwolnienie>
            <NoweSrodkiTransportu><P_22N>1</P_22N></NoweSrodkiTransportu>
            <P_23>2</P_23>
            <PMarzy><P_PMarzyN>1</P_PMarzyN></PMarzy>
          </Adnotacje>
          <RodzajFaktury>VAT</RodzajFaktury>
        </Fa>
        <FaWiersz>
          <NrWierszaFa>1</NrWierszaFa>
          <P_7>Item 1</P_7>
          <P_8B>1</P_8B>
          <P_9A>100.00</P_9A>
          <P_11>100.00</P_11>
          <P_12>23</P_12>
        </FaWiersz>
        <FaWiersz>
          <NrWierszaFa>2</NrWierszaFa>
          <P_7>Item 2</P_7>
          <P_8B>1</P_8B>
          <P_9A>100.00</P_9A>
          <P_11>100.00</P_11>
          <P_12>invalid</P_12> <!-- Invalid rate in second line -->
        </FaWiersz>
      `);

      const result = validateXml(xml);
      const p12Errors = result.issues.filter((i) => i.code.code === "P12_ENUMERATION");
      expect(p12Errors).toHaveLength(1);
      expect(p12Errors[0].context.location.lineNumber).toBe(2);
    });

    it("should collect assertions when requested", () => {
      const xml = wrapInFaktura(`
        <Podmiot1>
          <DaneIdentyfikacyjne><NIP>1234567890</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
        </Podmiot1>
        <Podmiot2>
          <DaneIdentyfikacyjne><NIP>9876543210</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
          <JST>2</JST>
          <GV>2</GV>
        </Podmiot2>
        <Fa>
          <KodWaluty>PLN</KodWaluty>
          <P_1>2026-09-15</P_1>
          <P_2>FV/001/09/2026</P_2>
          <P_15>123.00</P_15>
          <Adnotacje>
            <P_16>2</P_16><P_17>2</P_17><P_18>2</P_18><P_18A>2</P_18A>
            <Zwolnienie><P_19N>1</P_19N></Zwolnienie>
            <NoweSrodkiTransportu><P_22N>1</P_22N></NoweSrodkiTransportu>
            <P_23>2</P_23>
            <PMarzy><P_PMarzyN>1</P_PMarzyN></PMarzy>
          </Adnotacje>
          <RodzajFaktury>VAT</RodzajFaktury>
        </Fa>
      `);

      const doc = XmlDocument.fromString(xml);
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = checkSemantics(doc as unknown as any, true);
        expect(result.assertions.length).toBeGreaterThan(0);
        expect(result.assertions[0].domain).toBe("semantic");
        expect(result.assertions[0].confidence).toBe(1.0);
      } finally {
        doc.dispose();
      }
    });
  });

  describe("Currency Rate Validation", () => {
    // KursWaluty belongs in FaWiersz per FA(3) §10.2, not directly in Fa
    const foreignCurrencyInvoice = (kursWaluty: string) =>
      wrapInFaktura(`
        <Podmiot1>
          <DaneIdentyfikacyjne><NIP>1234567890</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
        </Podmiot1>
        <Podmiot2>
          <DaneIdentyfikacyjne><NIP>9876543210</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
          <JST>2</JST>
          <GV>2</GV>
        </Podmiot2>
        <Fa>
          <KodWaluty>EUR</KodWaluty>
          <P_1>2026-09-15</P_1>
          <P_2>FV/001/09/2026</P_2>
          <P_15>123.00</P_15>
          <Adnotacje>
            <P_16>2</P_16><P_17>2</P_17><P_18>2</P_18><P_18A>2</P_18A>
            <Zwolnienie><P_19N>1</P_19N></Zwolnienie>
            <NoweSrodkiTransportu><P_22N>1</P_22N></NoweSrodkiTransportu>
            <P_23>2</P_23>
            <PMarzy><P_PMarzyN>1</P_PMarzyN></PMarzy>
          </Adnotacje>
          <RodzajFaktury>VAT</RodzajFaktury>
          <FaWiersz>
            <NrWierszaFa>1</NrWierszaFa>
            <P_7>Test service</P_7>
            <P_8A>szt</P_8A>
            <P_8B>1</P_8B>
            <P_9A>123.00</P_9A>
            <P_11>123.00</P_11>
            <P_12>np I</P_12>
            <KursWaluty>${kursWaluty}</KursWaluty>
          </FaWiersz>
        </Fa>
      `);

    // Invoice date is 2026-09-15 (Monday); correct NBP rate is from 2026-09-12 (Friday)
    const eurRate: CurrencyRate = { currency: "EUR", date: "2026-09-12", mid: 4.2856 };

    it("should not emit warning when KursWaluty matches NBP rate exactly", () => {
      const xml = foreignCurrencyInvoice("4.2856");
      const result = validateXml(xml, { EUR: [eurRate] });
      expect(result.issues.some((i) => i.code.code === "CURRENCY_RATE_MISMATCH")).toBe(false);
    });

    it("should emit warning when KursWaluty differs from NBP rate", () => {
      const xml = foreignCurrencyInvoice("4.29");
      const result = validateXml(xml, { EUR: [eurRate] });
      const issue = result.issues.find((i) => i.code.code === "CURRENCY_RATE_MISMATCH");
      expect(issue).toBeDefined();
      expect(issue!.code.severity).toBe("warning");
      expect(issue!.context.location.xpath).toBe(
        "/Faktura/Fa/FaWiersz[NrWierszaFa='1']/KursWaluty",
      );
      expect(issue!.context.actualValue).toBe("4.29");
      expect(issue!.context.expectedValues).toEqual(["4.2856"]);
    });

    it("should emit warning when KursWaluty differs at 4th decimal place", () => {
      const xml = foreignCurrencyInvoice("4.2857");
      const result = validateXml(xml, { EUR: [eurRate] });
      expect(result.issues.some((i) => i.code.code === "CURRENCY_RATE_MISMATCH")).toBe(true);
    });

    it("should include correct fix suggestion with NBP rate", () => {
      const xml = foreignCurrencyInvoice("4.30");
      const result = validateXml(xml, { EUR: [eurRate] });
      const issue = result.issues.find((i) => i.code.code === "CURRENCY_RATE_MISMATCH");
      expect(issue).toBeDefined();
      expect(issue!.fixSuggestions).toHaveLength(1);
      expect(issue!.fixSuggestions[0].content).toBe("4.2856");
      expect(issue!.fixSuggestions[0].description).toContain("4.2856");
      expect(issue!.fixSuggestions[0].description).toContain("EUR");
      expect(issue!.fixSuggestions[0].description).toContain("2026-09-12");
    });

    it("should skip when currencyRates is not provided", () => {
      const xml = foreignCurrencyInvoice("4.30");
      const result = validateXml(xml);
      expect(result.issues.some((i) => i.code.code === "CURRENCY_RATE_MISMATCH")).toBe(false);
      expect(result.issues.some((i) => i.code.code === "CURRENCY_RATE_UNVERIFIABLE")).toBe(false);
    });

    it("should skip when currency key is absent from currencyRates", () => {
      const xml = foreignCurrencyInvoice("4.30");
      const result = validateXml(xml, {
        USD: [{ currency: "USD", date: "2026-09-12", mid: 3.7257 }],
      });
      expect(result.issues.some((i) => i.code.code === "CURRENCY_RATE_MISMATCH")).toBe(false);
      expect(result.issues.some((i) => i.code.code === "CURRENCY_RATE_UNVERIFIABLE")).toBe(false);
    });

    it("should emit CURRENCY_RATE_UNVERIFIABLE when rate table is null (fetch failed)", () => {
      const xml = foreignCurrencyInvoice("4.30");
      const result = validateXml(xml, { EUR: null });
      const issue = result.issues.find((i) => i.code.code === "CURRENCY_RATE_UNVERIFIABLE");
      expect(issue).toBeDefined();
      expect(issue!.code.severity).toBe("warning");
      expect(issue!.context.metadata?.currency).toBe("EUR");
    });

    it("should emit CURRENCY_RATE_UNVERIFIABLE when rate table is empty", () => {
      const xml = foreignCurrencyInvoice("4.30");
      const result = validateXml(xml, { EUR: [] });
      expect(result.issues.some((i) => i.code.code === "CURRENCY_RATE_UNVERIFIABLE")).toBe(true);
    });

    it("should emit CURRENCY_RATE_UNVERIFIABLE when no rate is within the 10-day window", () => {
      const xml = foreignCurrencyInvoice("4.30");
      // Rate is 11 days before invoice date 2026-09-15 → outside stale window
      const staleRate: CurrencyRate = { currency: "EUR", date: "2026-09-04", mid: 4.2856 };
      const result = validateXml(xml, { EUR: [staleRate] });
      expect(result.issues.some((i) => i.code.code === "CURRENCY_RATE_UNVERIFIABLE")).toBe(true);
      expect(result.issues.some((i) => i.code.code === "CURRENCY_RATE_MISMATCH")).toBe(false);
    });

    it("should emit CURRENCY_RATE_UNVERIFIABLE when rate date equals invoice date", () => {
      const xml = foreignCurrencyInvoice("4.2856");
      // Same-day rate is invalid — must be strictly before P_1
      const sameDayRate: CurrencyRate = { currency: "EUR", date: "2026-09-15", mid: 4.2856 };
      const result = validateXml(xml, { EUR: [sameDayRate] });
      expect(result.issues.some((i) => i.code.code === "CURRENCY_RATE_UNVERIFIABLE")).toBe(true);
    });

    it("should pick the most recent valid rate when multiple rates are in the table", () => {
      const xml = foreignCurrencyInvoice("4.2856");
      const rates: CurrencyRate[] = [
        { currency: "EUR", date: "2026-09-10", mid: 4.3 },
        { currency: "EUR", date: "2026-09-12", mid: 4.2856 }, // correct one
        { currency: "EUR", date: "2026-09-08", mid: 4.25 },
      ];
      const result = validateXml(xml, { EUR: rates });
      expect(result.issues.some((i) => i.code.code === "CURRENCY_RATE_MISMATCH")).toBe(false);
    });

    it("should skip for PLN invoices", () => {
      const xml = wrapInFaktura(`
        <Podmiot1>
          <DaneIdentyfikacyjne><NIP>1234567890</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
        </Podmiot1>
        <Podmiot2>
          <DaneIdentyfikacyjne><NIP>9876543210</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
          <JST>2</JST>
          <GV>2</GV>
        </Podmiot2>
        <Fa>
          <KodWaluty>PLN</KodWaluty>
          <P_1>2026-09-15</P_1>
          <P_2>FV/001/09/2026</P_2>
          <P_15>123.00</P_15>
          <Adnotacje>
            <P_16>2</P_16><P_17>2</P_17><P_18>2</P_18><P_18A>2</P_18A>
            <Zwolnienie><P_19N>1</P_19N></Zwolnienie>
            <NoweSrodkiTransportu><P_22N>1</P_22N></NoweSrodkiTransportu>
            <P_23>2</P_23>
            <PMarzy><P_PMarzyN>1</P_PMarzyN></PMarzy>
          </Adnotacje>
          <RodzajFaktury>VAT</RodzajFaktury>
        </Fa>
      `);
      const result = validateXml(xml, { EUR: [eurRate] });
      expect(result.issues.some((i) => i.code.code === "CURRENCY_RATE_MISMATCH")).toBe(false);
    });

    it("should use integer comparison to avoid floating-point issues", () => {
      // 0.1 + 0.2 !== 0.3 in floating point, but 1000 + 2000 === 3000 in integer
      const xml = foreignCurrencyInvoice("4.2856");
      const rate: CurrencyRate = { currency: "EUR", date: "2026-09-12", mid: 4.2856 };
      const result = validateXml(xml, { EUR: [rate] });
      expect(result.issues.some((i) => i.code.code === "CURRENCY_RATE_MISMATCH")).toBe(false);
    });

    it("should show NBP publication date in message when it differs from invoice date", () => {
      const xml = foreignCurrencyInvoice("4.30");
      // NBP date is Friday 2026-09-12, invoice date is Monday 2026-09-15
      const result = validateXml(xml, { EUR: [eurRate] });
      const issue = result.issues.find((i) => i.code.code === "CURRENCY_RATE_MISMATCH");
      expect(issue).toBeDefined();
      expect(issue!.message).toContain("2026-09-12");
      expect(issue!.context.metadata?.nbpDate).toBe("2026-09-12");
    });
  });

  describe("Currency Rate Reference Date (Art. 31a ust. 1 vs ust. 2)", () => {
    /**
     * Monthly service for July 2026, invoiced on 5 Aug 2026 in USD.
     * Tax point (Art. 19a ust. 3) = 2026-07-31, so the general rule (Art. 31a
     * ust. 1) takes the rate from Thursday 2026-07-30 — not from before P_1.
     */
    const periodicInvoice = (opts: {
      p1: string;
      dates?: string;
      kursWaluty?: string;
      lines?: { nr: number; p6a?: string; kursWaluty: string }[];
    }) => {
      const lines = opts.lines ?? [{ nr: 1, kursWaluty: opts.kursWaluty ?? "3.7644" }];
      return wrapInFaktura(`
        <Podmiot1>
          <DaneIdentyfikacyjne><NIP>1234567890</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
        </Podmiot1>
        <Podmiot2>
          <DaneIdentyfikacyjne><NIP>9876543210</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
          <JST>2</JST>
          <GV>2</GV>
        </Podmiot2>
        <Fa>
          <KodWaluty>USD</KodWaluty>
          <P_1>${opts.p1}</P_1>
          <P_2>FV/001/08/2026</P_2>
          ${opts.dates ?? "<OkresFa><P_6_Od>2026-07-01</P_6_Od><P_6_Do>2026-07-31</P_6_Do></OkresFa>"}
          <P_15>123.00</P_15>
          <Adnotacje>
            <P_16>2</P_16><P_17>2</P_17><P_18>2</P_18><P_18A>2</P_18A>
            <Zwolnienie><P_19N>1</P_19N></Zwolnienie>
            <NoweSrodkiTransportu><P_22N>1</P_22N></NoweSrodkiTransportu>
            <P_23>2</P_23>
            <PMarzy><P_PMarzyN>1</P_PMarzyN></PMarzy>
          </Adnotacje>
          <RodzajFaktury>VAT</RodzajFaktury>
          ${lines
            .map(
              (l) => `
          <FaWiersz>
            <NrWierszaFa>${l.nr}</NrWierszaFa>
            <P_7>Software development</P_7>
            <P_8A>szt</P_8A>
            <P_8B>1</P_8B>
            <P_9A>123.00</P_9A>
            <P_11>123.00</P_11>
            <P_12>np I</P_12>
            ${l.p6a ? `<P_6A>${l.p6a}</P_6A>` : ""}
            <KursWaluty>${l.kursWaluty}</KursWaluty>
          </FaWiersz>`,
            )
            .join("")}
        </Fa>
      `);
    };

    // Table 146/A/NBP/2026 of 2026-07-30 — the last business day before the tax point
    const usdRates: CurrencyRate[] = [
      { currency: "USD", date: "2026-07-29", mid: 3.7501 },
      { currency: "USD", date: "2026-07-30", mid: 3.7644 },
      { currency: "USD", date: "2026-07-31", mid: 3.771 },
      { currency: "USD", date: "2026-08-03", mid: 3.7802 },
      { currency: "USD", date: "2026-08-04", mid: 3.7911 },
    ];

    it("should use the OkresFa period end as the tax point when the invoice is issued later", () => {
      // Art. 31a ust. 1: tax point 2026-07-31 → rate from 2026-07-30
      const xml = periodicInvoice({ p1: "2026-08-05", kursWaluty: "3.7644" });
      const result = validateXml(xml, { USD: usdRates });
      expect(result.issues.some((i) => i.code.code === "CURRENCY_RATE_MISMATCH")).toBe(false);
    });

    it("should still accept the issue-date rate on a period invoice (Art. 19a ust. 5 pkt 4)", () => {
      // Media/rental/leasing put the tax point on the issue date; the XML cannot
      // distinguish those from ust. 3 services, so both readings are accepted.
      const xml = periodicInvoice({ p1: "2026-08-05", kursWaluty: "3.7911" });
      const result = validateXml(xml, { USD: usdRates });
      expect(result.issues.some((i) => i.code.code === "CURRENCY_RATE_MISMATCH")).toBe(false);
    });

    it("should flag a rate matching neither the tax point nor the issue date", () => {
      const xml = periodicInvoice({ p1: "2026-08-05", kursWaluty: "3.7802" });
      const result = validateXml(xml, { USD: usdRates });
      const issue = result.issues.find((i) => i.code.code === "CURRENCY_RATE_MISMATCH");
      expect(issue).toBeDefined();
      // Primary reading (general rule) first, issue-date alternative second
      expect(issue!.context.expectedValues).toEqual(["3.7644", "3.7911"]);
      expect(issue!.context.metadata?.nbpDate).toBe("2026-07-30");
      expect(issue!.fixSuggestions[0].content).toBe("3.7644");
    });

    it("should use the issue date when the invoice precedes the period end (Art. 31a ust. 2)", () => {
      // Issued 2026-07-20, period ends 2026-07-31 → only the ust. 2 reading applies
      const xml = periodicInvoice({ p1: "2026-07-20", kursWaluty: "3.7501" });
      const result = validateXml(xml, {
        USD: [{ currency: "USD", date: "2026-07-17", mid: 3.74 }, ...usdRates],
      });
      const issue = result.issues.find((i) => i.code.code === "CURRENCY_RATE_MISMATCH");
      expect(issue).toBeDefined();
      expect(issue!.context.expectedValues).toEqual(["3.7400"]);
    });

    it("should use P_6 as the tax point when present", () => {
      const xml = periodicInvoice({
        p1: "2026-08-05",
        dates: "<P_6>2026-07-31</P_6>",
        kursWaluty: "3.7644",
      });
      const result = validateXml(xml, { USD: usdRates });
      expect(result.issues.some((i) => i.code.code === "CURRENCY_RATE_MISMATCH")).toBe(false);
    });

    it("should use the per-line P_6A date when lines have different delivery dates", () => {
      const xml = periodicInvoice({
        p1: "2026-08-05",
        dates: "",
        lines: [
          { nr: 1, p6a: "2026-07-31", kursWaluty: "3.7644" },
          { nr: 2, p6a: "2026-08-04", kursWaluty: "3.7802" },
        ],
      });
      const result = validateXml(xml, { USD: usdRates });
      expect(result.issues.some((i) => i.code.code === "CURRENCY_RATE_MISMATCH")).toBe(false);
    });

    it("should fall back to P_1 when the invoice carries no delivery date", () => {
      const xml = periodicInvoice({ p1: "2026-08-05", dates: "", kursWaluty: "3.7911" });
      const result = validateXml(xml, { USD: usdRates });
      expect(result.issues.some((i) => i.code.code === "CURRENCY_RATE_MISMATCH")).toBe(false);
    });

    it("should flag a stale rate even when a tax point is present", () => {
      const xml = periodicInvoice({ p1: "2026-08-05", kursWaluty: "3.7501" });
      const result = validateXml(xml, { USD: usdRates });
      expect(result.issues.some((i) => i.code.code === "CURRENCY_RATE_MISMATCH")).toBe(true);
    });

    it("should skip corrective invoices — Art. 31b ust. 1 keeps the original invoice's rate", () => {
      const xml = periodicInvoice({ p1: "2026-08-05", kursWaluty: "1.0000" }).replace(
        "<RodzajFaktury>VAT</RodzajFaktury>",
        "<RodzajFaktury>KOR</RodzajFaktury>",
      );
      const result = validateXml(xml, { USD: usdRates });
      expect(result.issues.some((i) => i.code.code === "CURRENCY_RATE_MISMATCH")).toBe(false);
      expect(result.issues.some((i) => i.code.code === "CURRENCY_RATE_UNVERIFIABLE")).toBe(false);
    });

    it("should check collective corrective invoices against their own issue date (Art. 31b ust. 2)", () => {
      // OkresFaKorygowanej present → the corrected periods contribute no tax point
      const xml = periodicInvoice({ p1: "2026-08-05", kursWaluty: "3.7911" })
        .replace("<RodzajFaktury>VAT</RodzajFaktury>", "<RodzajFaktury>KOR</RodzajFaktury>")
        .replace(
          "<P_15>123.00</P_15>",
          "<OkresFaKorygowanej><P_6_Od>2026-07-01</P_6_Od><P_6_Do>2026-07-31</P_6_Do></OkresFaKorygowanej><P_15>123.00</P_15>",
        );
      const result = validateXml(xml, { USD: usdRates });
      // 3.7911 is the rate before P_1 — correct under Art. 31b ust. 2
      expect(result.issues.some((i) => i.code.code === "CURRENCY_RATE_MISMATCH")).toBe(false);
    });

    it("should skip cash-accounting invoices — Art. 21 keys the tax point to payment", () => {
      const xml = periodicInvoice({ p1: "2026-08-05", kursWaluty: "1.0000" }).replace(
        "<P_16>2</P_16>",
        "<P_16>1</P_16>",
      );
      const result = validateXml(xml, { USD: usdRates });
      expect(result.issues.some((i) => i.code.code === "CURRENCY_RATE_MISMATCH")).toBe(false);
    });

    it("should accept a rate keyed to a documented advance payment date", () => {
      const xml = periodicInvoice({ p1: "2026-08-05", dates: "", kursWaluty: "3.7644" }).replace(
        "<P_15>123.00</P_15>",
        "<P_15>123.00</P_15><ZaliczkaCzesciowa><P_6Z>2026-07-31</P_6Z><P_15Z>123.00</P_15Z></ZaliczkaCzesciowa>",
      );
      const result = validateXml(xml, { USD: usdRates });
      expect(result.issues.some((i) => i.code.code === "CURRENCY_RATE_MISMATCH")).toBe(false);
    });

    it("should name the reference date, not the invoice date, when unverifiable", () => {
      const xml = periodicInvoice({ p1: "2026-08-05", kursWaluty: "3.7644" });
      const result = validateXml(xml, { USD: null });
      const issue = result.issues.find((i) => i.code.code === "CURRENCY_RATE_UNVERIFIABLE");
      expect(issue).toBeDefined();
      // Tax point 2026-07-31 governs the lookup — calling it the invoice date would mislead
      expect(issue!.context.metadata?.referenceDate).toBe("2026-07-31");
      expect(issue!.message).toContain("2026-07-31");
      expect(issue!.message).not.toContain("invoice date");
    });

    it("should never render a null date in the unverifiable message", () => {
      const xml = periodicInvoice({ p1: "2026-08-05", dates: "", kursWaluty: "3.7644" }).replace(
        "<P_1>2026-08-05</P_1>",
        "",
      );
      const result = validateXml(xml, { USD: null });
      const issue = result.issues.find((i) => i.code.code === "CURRENCY_RATE_UNVERIFIABLE");
      expect(issue).toBeDefined();
      expect(issue!.message).not.toContain("null");
      expect(issue!.context.metadata?.referenceDate).toBeUndefined();
    });

    it("should stay silent on an invoice that carries no KursWaluty at all", () => {
      // Advance invoices have no FaWiersz — their rate lives in KursWalutyZ, which this
      // rule does not check, so claiming KursWaluty is unverifiable would be false.
      const xml = periodicInvoice({ p1: "2026-08-05", kursWaluty: "3.7644" }).replace(
        "<KursWaluty>3.7644</KursWaluty>",
        "",
      );
      const result = validateXml(xml, { USD: null });
      expect(result.issues.some((i) => i.code.code === "CURRENCY_RATE_UNVERIFIABLE")).toBe(false);
      expect(result.issues.some((i) => i.code.code === "CURRENCY_RATE_MISMATCH")).toBe(false);
    });

    it("should report UNVERIFIABLE when no rate covers the tax point", () => {
      // Only rates around P_1 available; the tax point is a month earlier
      const xml = periodicInvoice({ p1: "2026-08-05", kursWaluty: "3.7644" });
      const result = validateXml(xml, {
        USD: [{ currency: "USD", date: "2026-06-30", mid: 3.7 }],
      });
      expect(result.issues.some((i) => i.code.code === "CURRENCY_RATE_UNVERIFIABLE")).toBe(true);
    });
  });

  describe("Advance Invoice Currency Rates (Art. 19a ust. 8)", () => {
    /**
     * Advance invoices carry no FaWiersz — the rate lives in Fa/KursWalutyZ, and in
     * ZaliczkaCzesciowa/KursWalutyZW when several payments are documented (§9.5, §9.8).
     */
    const advanceInvoice = (body: string) =>
      wrapInFaktura(`
        <Podmiot1>
          <DaneIdentyfikacyjne><NIP>1234567890</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
        </Podmiot1>
        <Podmiot2>
          <DaneIdentyfikacyjne><NIP>9876543210</NIP><Nazwa>Test</Nazwa></DaneIdentyfikacyjne>
          <Adres><KodKraju>PL</KodKraju><AdresL1>Test</AdresL1></Adres>
          <JST>2</JST>
          <GV>2</GV>
        </Podmiot2>
        <Fa>
          <KodWaluty>USD</KodWaluty>
          <P_1>2026-08-05</P_1>
          <P_2>ZAL/001/08/2026</P_2>
          ${body}
          <Adnotacje>
            <P_16>2</P_16><P_17>2</P_17><P_18>2</P_18><P_18A>2</P_18A>
            <Zwolnienie><P_19N>1</P_19N></Zwolnienie>
            <NoweSrodkiTransportu><P_22N>1</P_22N></NoweSrodkiTransportu>
            <P_23>2</P_23>
            <PMarzy><P_PMarzyN>1</P_PMarzyN></PMarzy>
          </Adnotacje>
          <RodzajFaktury>ZAL</RodzajFaktury>
        </Fa>
      `);

    const usdRates: CurrencyRate[] = [
      { currency: "USD", date: "2026-07-17", mid: 3.74 },
      { currency: "USD", date: "2026-07-20", mid: 3.7455 },
      { currency: "USD", date: "2026-07-30", mid: 3.7644 },
      { currency: "USD", date: "2026-08-04", mid: 3.7911 },
    ];

    it("should accept KursWalutyZ keyed to the payment receipt date in P_6", () => {
      // Payment received 2026-07-31 → rate from the last business day before it
      const xml = advanceInvoice(
        "<P_6>2026-07-31</P_6><P_15>123.00</P_15><KursWalutyZ>3.7644</KursWalutyZ>",
      );
      const result = validateXml(xml, { USD: usdRates });
      expect(result.issues.some((i) => i.code.code === "CURRENCY_RATE_MISMATCH")).toBe(false);
    });

    it("should flag KursWalutyZ keyed to the issue date instead of the payment", () => {
      // Art. 19a ust. 8 fixes the tax point at receipt of payment, so unlike
      // FaWiersz/KursWaluty the issue-date rate is not an accepted alternative here
      const xml = advanceInvoice(
        "<P_6>2026-07-31</P_6><P_15>123.00</P_15><KursWalutyZ>3.7911</KursWalutyZ>",
      );
      const result = validateXml(xml, { USD: usdRates });
      const issue = result.issues.find((i) => i.code.code === "CURRENCY_RATE_MISMATCH");
      expect(issue).toBeDefined();
      expect(issue!.context.location.element).toBe("KursWalutyZ");
      expect(issue!.context.location.xpath).toBe("/Faktura/Fa/KursWalutyZ");
      expect(issue!.context.expectedValues).toEqual(["3.7644"]);
      expect(issue!.fixSuggestions[0].content).toBe("3.7644");
    });

    it("should key each KursWalutyZW to its own payment date", () => {
      const xml = advanceInvoice(`<P_15>246.00</P_15>
        <ZaliczkaCzesciowa>
          <P_6Z>2026-07-20</P_6Z><P_15Z>123.00</P_15Z><KursWalutyZW>3.7400</KursWalutyZW>
        </ZaliczkaCzesciowa>
        <ZaliczkaCzesciowa>
          <P_6Z>2026-07-31</P_6Z><P_15Z>123.00</P_15Z><KursWalutyZW>3.7644</KursWalutyZW>
        </ZaliczkaCzesciowa>`);
      const result = validateXml(xml, { USD: usdRates });
      expect(result.issues.some((i) => i.code.code === "CURRENCY_RATE_MISMATCH")).toBe(false);
    });

    it("should flag the payment whose rate is wrong and name its date", () => {
      const xml = advanceInvoice(`<P_15>246.00</P_15>
        <ZaliczkaCzesciowa>
          <P_6Z>2026-07-20</P_6Z><P_15Z>123.00</P_15Z><KursWalutyZW>3.7400</KursWalutyZW>
        </ZaliczkaCzesciowa>
        <ZaliczkaCzesciowa>
          <P_6Z>2026-07-31</P_6Z><P_15Z>123.00</P_15Z><KursWalutyZW>3.7911</KursWalutyZW>
        </ZaliczkaCzesciowa>`);
      const result = validateXml(xml, { USD: usdRates });
      const found = result.issues.filter((i) => i.code.code === "CURRENCY_RATE_MISMATCH");
      expect(found).toHaveLength(1);
      expect(found[0].context.location.xpath).toBe(
        "/Faktura/Fa/ZaliczkaCzesciowa[P_6Z='2026-07-31']/KursWalutyZW",
      );
      expect(found[0].message).toContain("2026-07-31");
      expect(found[0].context.expectedValues).toEqual(["3.7644"]);
    });

    it("should use the single documented payment as the tax point for KursWalutyZ", () => {
      const xml = advanceInvoice(`<P_15>123.00</P_15><KursWalutyZ>3.7644</KursWalutyZ>
        <ZaliczkaCzesciowa>
          <P_6Z>2026-07-31</P_6Z><P_15Z>123.00</P_15Z>
        </ZaliczkaCzesciowa>`);
      const result = validateXml(xml, { USD: usdRates });
      expect(result.issues.some((i) => i.code.code === "CURRENCY_RATE_MISMATCH")).toBe(false);
    });

    it("should leave KursWalutyZ alone when several payments have different dates", () => {
      // Without P_6 the invoice-level rate has no single tax point to check against
      const xml = advanceInvoice(`<P_15>246.00</P_15><KursWalutyZ>1.0000</KursWalutyZ>
        <ZaliczkaCzesciowa>
          <P_6Z>2026-07-20</P_6Z><P_15Z>123.00</P_15Z>
        </ZaliczkaCzesciowa>
        <ZaliczkaCzesciowa>
          <P_6Z>2026-07-31</P_6Z><P_15Z>123.00</P_15Z>
        </ZaliczkaCzesciowa>`);
      const result = validateXml(xml, { USD: usdRates });
      expect(result.issues.some((i) => i.code.code === "CURRENCY_RATE_MISMATCH")).toBe(false);
    });

    it("should fall back to P_1 when the advance invoice records no payment date", () => {
      const xml = advanceInvoice("<P_15>123.00</P_15><KursWalutyZ>3.7911</KursWalutyZ>");
      const result = validateXml(xml, { USD: usdRates });
      expect(result.issues.some((i) => i.code.code === "CURRENCY_RATE_MISMATCH")).toBe(false);
    });

    it("should report UNVERIFIABLE once when the rate table cannot answer", () => {
      const xml = advanceInvoice(`<P_15>246.00</P_15><KursWalutyZ>3.7644</KursWalutyZ>
        <ZaliczkaCzesciowa>
          <P_6Z>2026-07-31</P_6Z><P_15Z>123.00</P_15Z><KursWalutyZW>3.7644</KursWalutyZW>
        </ZaliczkaCzesciowa>`);
      const result = validateXml(xml, { USD: null });
      expect(
        result.issues.filter((i) => i.code.code === "CURRENCY_RATE_UNVERIFIABLE"),
      ).toHaveLength(1);
    });

    it("should not check KursWalutyZK — Art. 31b ust. 1 keeps the original rate", () => {
      // KOR_ZAL is skipped wholesale, but the pre-correction rate is never a target anyway
      const xml = advanceInvoice(
        "<P_6>2026-07-31</P_6><P_15>123.00</P_15><P_15ZK>100.00</P_15ZK><KursWalutyZK>1.0000</KursWalutyZK><KursWalutyZ>3.7644</KursWalutyZ>",
      );
      const result = validateXml(xml, { USD: usdRates });
      const found = result.issues.filter((i) => i.code.code === "CURRENCY_RATE_MISMATCH");
      expect(found.every((i) => i.context.location.element !== "KursWalutyZK")).toBe(true);
      expect(found).toHaveLength(0);
    });
  });

  describe("Rule Coverage", () => {
    it("should have all 43 rules implemented", () => {
      expect(semanticRules).toHaveLength(35); // Some rules are grouped (ADNOTACJE_MANDATORY_FIELDS covers 8 rules)
      const uniqueRuleCodes = new Set([
        "PODMIOT2_JST_MISSING",
        "PODMIOT2_GV_MISSING",
        "JST_REQUIRES_PODMIOT3",
        "GV_REQUIRES_PODMIOT3",
        "NIP_IN_WRONG_FIELD",
        "PODMIOT3_UDZIAL_REQUIRES_ROLE_4",
        "PODMIOT3_ROLE_MISSING",
        "SELF_BILLING_PODMIOT3_CONFLICT",
        "P15_MISSING",
        "P6_P6A_MUTUAL_EXCLUSION",
        "RODZAJ_FAKTURY_SECTIONS",
        "KURS_WALUTY_Z_PLACEMENT",
        "FOREIGN_CURRENCY_TAX_PLN",
        "ADNOTACJE_P16_MISSING",
        "ADNOTACJE_P17_MISSING",
        "ADNOTACJE_P18_MISSING",
        "ADNOTACJE_P18A_MISSING",
        "ADNOTACJE_ZWOLNIENIE_MISSING",
        "ADNOTACJE_NST_MISSING",
        "ADNOTACJE_P23_MISSING",
        "ADNOTACJE_PMARZY_MISSING",
        "ZWOLNIENIE_LOGIC",
        "NST_LOGIC",
        "PMARZY_LOGIC",
        "P12_ENUMERATION",
        "OO_RATE_FOREIGN_BUYER",
        "GTU_FORMAT",
        "DECIMAL_PRECISION",
        "KOR_NRKSEF_CONSISTENCY",
        "REVERSE_CHARGE_CONSISTENCY",
        "PAYMENT_ZAPLACONO_DATE",
        "RACHUNEKBANKOWY_NRRB",
        "NRRB_LENGTH",
        "IPKSEF_FORMAT",
        "WALUTA_UMOWNA_PLN",
        "KURS_WALUTA_PAIR",
        "TRANSPORT_MINIMUM_DATA",
        "AMOUNT_NO_SEPARATORS",
        "TAX_CALCULATION_MISMATCH",
        "INVALID_BANK_ACCOUNT_FORMAT",
        "DUPLICATE_LINE_NUMBERS",
        "NEGATIVE_QUANTITY_NOT_ALLOWED",
        "CURRENCY_RATE_MISMATCH",
        "CURRENCY_RATE_UNVERIFIABLE",
      ]);

      // Check that all error codes are defined
      for (const code of uniqueRuleCodes) {
        expect(ERROR_CODES[code as keyof typeof ERROR_CODES]).toBeDefined();
      }
    });
  });
});
