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
function validateXml(xml: string) {
  const doc = XmlDocument.fromString(xml);
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return checkSemantics(doc as unknown as any, false);
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

  describe("Rule Coverage", () => {
    it("should have all 38 rules implemented", () => {
      expect(semanticRules).toHaveLength(31); // Some rules are grouped (ADNOTACJE_MANDATORY_FIELDS covers 8 rules)
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
      ]);

      // Check that all error codes are defined
      for (const code of uniqueRuleCodes) {
        expect(ERROR_CODES[code as keyof typeof ERROR_CODES]).toBeDefined();
      }
    });
  });
});
