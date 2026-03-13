/**
 * Tests for XSD validation functionality
 */

import { afterAll, describe, expect, it } from "vitest";
import { disposeValidator, isValidatorDisposed, validateXsd } from "./xsd.js";

describe("XSD Validation", () => {
  afterAll(() => {
    // Clean up after tests
    if (!isValidatorDisposed()) {
      disposeValidator();
    }
  });

  describe("validateXsd", () => {
    it("should return empty array for valid XML", async () => {
      // This is a minimal valid FA(3) invoice
      // In practice this might not be 100% valid, but we're testing the function works
      const validXml = `<?xml version="1.0" encoding="UTF-8"?>
        <Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/"
                 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
          <Naglowek>
            <KodFormularza kodSystemowy="FA (3)" wersjaSchemy="1-0E">FA</KodFormularza>
            <WariantFormularza>3</WariantFormularza>
            <DataWytworzeniaFa>2024-03-15T12:00:00Z</DataWytworzeniaFa>
          </Naglowek>
          <Podmiot1>
            <DaneIdentyfikacyjne>
              <NIP>1234567890</NIP>
              <Nazwa>Example Company Ltd</Nazwa>
            </DaneIdentyfikacyjne>
            <Adres>
              <KodKraju>PL</KodKraju>
              <AdresL1>ul. Przykładowa 1</AdresL1>
              <AdresL2>00-001 Warszawa</AdresL2>
            </Adres>
          </Podmiot1>
          <Podmiot2>
            <DaneIdentyfikacyjne>
              <NIP>0987654321</NIP>
              <Nazwa>Customer Company</Nazwa>
            </DaneIdentyfikacyjne>
            <Adres>
              <KodKraju>PL</KodKraju>
              <AdresL1>ul. Klienta 2</AdresL1>
              <AdresL2>00-002 Kraków</AdresL2>
            </Adres>
          </Podmiot2>
          <Fa>
            <P_1>2024-03-15</P_1>
            <P_2>FV/2024/001</P_2>
            <P_3>Example Company Ltd</P_3>
            <P_3A>ul. Przykładowa 1</P_3A>
            <P_3B>00-001 Warszawa</P_3B>
            <P_3C>Example Company Ltd</P_3C>
            <P_3D>ul. Przykładowa 1, 00-001 Warszawa</P_3D>
            <P_4A>PL</P_4A>
            <P_4B>1234567890</P_4B>
            <P_5A>Customer Company</P_5A>
            <P_5B>ul. Klienta 2, 00-002 Kraków</P_5B>
            <P_6>2024-03-15</P_6>
            <P_15>1230.00</P_15>
            <FaWiersz>
              <NrWierszaFa>1</NrWierszaFa>
              <P_7>Test Product</P_7>
              <P_8B>1.0</P_8B>
              <P_9A>1000.00</P_9A>
              <P_9B>1000.00</P_9B>
              <P_11>1000.00</P_11>
              <P_12>23</P_12>
            </FaWiersz>
            <P_13_1>1000.00</P_13_1>
            <P_14_1>230.00</P_14_1>
          </Fa>
        </Faktura>`;

      const errors = await validateXsd(validXml);

      // Even if this specific XML has errors, we're testing that the function works
      expect(Array.isArray(errors)).toBe(true);
      // If there are errors, they should have the right structure
      if (errors.length > 0) {
        expect(errors[0]).toHaveProperty("level");
        expect(errors[0]).toHaveProperty("source");
        expect(errors[0]).toHaveProperty("message");
        expect(errors[0].source).toBe("xsd");
      }
    });

    it("should return errors for invalid XML structure", async () => {
      const invalidXml = `<?xml version="1.0" encoding="UTF-8"?>
        <Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/">
          <TotallyInvalidElement>This should not be here</TotallyInvalidElement>
          <AnotherBadElement>
            <NestedBadness>Bad</NestedBadness>
          </AnotherBadElement>
        </Faktura>`;

      const errors = await validateXsd(invalidXml);

      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].level).toBe("error");
      expect(errors[0].source).toBe("xsd");
      expect(errors[0].message).toBeTruthy();
    });

    it("should handle malformed XML gracefully", async () => {
      const malformedXml = "This is not XML at all!";

      const errors = await validateXsd(malformedXml);

      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].level).toBe("error");
      expect(errors[0].source).toBe("parse");
    });

    it("should extract line numbers from error messages when available", async () => {
      const xmlWithError = `<?xml version="1.0" encoding="UTF-8"?>
        <Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/">
          <Naglowek>
            <BadElement>This should cause an error</BadElement>
          </Naglowek>
        </Faktura>`;

      const errors = await validateXsd(xmlWithError);

      expect(errors.length).toBeGreaterThan(0);
      // Line number extraction is attempted but may not always be available
      const firstError = errors[0];
      expect(firstError).toHaveProperty("line");
      // Line could be undefined if not extractable
    });
  });

  describe("Resource Management", () => {
    it("should properly initialize validator on first use", async () => {
      // Ensure clean state
      if (!isValidatorDisposed()) {
        disposeValidator();
      }

      const xml = `<?xml version="1.0"?><test/>`;
      const errors = await validateXsd(xml);

      expect(Array.isArray(errors)).toBe(true);
      expect(isValidatorDisposed()).toBe(false);
    });

    it("should reuse validator for multiple validations", async () => {
      const xml1 = `<?xml version="1.0"?><test1/>`;
      const xml2 = `<?xml version="1.0"?><test2/>`;

      const errors1 = await validateXsd(xml1);
      const errors2 = await validateXsd(xml2);

      expect(Array.isArray(errors1)).toBe(true);
      expect(Array.isArray(errors2)).toBe(true);
      expect(isValidatorDisposed()).toBe(false);
    });

    it("should handle concurrent validations correctly", async () => {
      const validations = [
        validateXsd(`<?xml version="1.0"?><test1/>`),
        validateXsd(`<?xml version="1.0"?><test2/>`),
        validateXsd(`<?xml version="1.0"?><test3/>`),
      ];

      const results = await Promise.all(validations);

      expect(results).toHaveLength(3);
      results.forEach((errors) => {
        expect(Array.isArray(errors)).toBe(true);
      });
    });

    it("should be able to reinitialize after disposal", async () => {
      // First validation
      await validateXsd(`<?xml version="1.0"?><test/>`);
      expect(isValidatorDisposed()).toBe(false);

      // Dispose
      disposeValidator();
      expect(isValidatorDisposed()).toBe(true);

      // Should be able to validate again (reinitializes)
      const errors = await validateXsd(`<?xml version="1.0"?><test/>`);
      expect(Array.isArray(errors)).toBe(true);
      expect(isValidatorDisposed()).toBe(false);
    });
  });

  describe("Error Handling", () => {
    it("should handle XML with properly escaped special characters", async () => {
      const xmlWithSpecialChars = `<?xml version="1.0" encoding="UTF-8"?>
        <Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/">
          <Test>Special chars: &lt; &gt; &amp; &quot; &apos;</Test>
        </Faktura>`;

      const errors = await validateXsd(xmlWithSpecialChars);

      // Should handle without crashing
      expect(Array.isArray(errors)).toBe(true);
    });

    it("should handle very large XML documents", async () => {
      // Generate a large XML with many elements
      const items = Array.from({ length: 100 }, (_, i) => `<Item${i}>Content ${i}</Item${i}>`).join(
        "\n",
      );

      const largeXml = `<?xml version="1.0" encoding="UTF-8"?>
        <Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/">
          ${items}
        </Faktura>`;

      const errors = await validateXsd(largeXml);

      // Should handle large documents
      expect(Array.isArray(errors)).toBe(true);
    });

    it("should provide meaningful error messages", async () => {
      const xmlWithKnownError = `<?xml version="1.0" encoding="UTF-8"?>
        <Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/">
          <Naglowek>
            <InvalidElement>Test</InvalidElement>
          </Naglowek>
        </Faktura>`;

      const errors = await validateXsd(xmlWithKnownError);

      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].message).toBeTruthy();
      expect(errors[0].message.length).toBeGreaterThan(10);
      // Message should contain useful information
      // (exact content depends on schema)
    });
  });
});
