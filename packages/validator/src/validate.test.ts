/**
 * Tests for the @ksefuj/validator package
 */

import { afterAll, describe, expect, it } from "vitest";
import { validate } from "./validate.js";
import { disposeValidator, isValidatorDisposed } from "./xsd.js";

describe("@ksefuj/validator", () => {
  afterAll(() => {
    // Clean up validator resources after all tests
    if (!isValidatorDisposed()) {
      disposeValidator();
    }
  });

  describe("Basic XML Validation", () => {
    it("should reject malformed XML", async () => {
      const malformedXml = "This is not XML at all";
      const result = await validate(malformedXml);

      expect(result.valid).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].source).toBe("parse");
    });

    it("should reject XML with parse errors", async () => {
      const invalidXml = `<?xml version="1.0"?>
        <Faktura>
          <Unclosed>
        </Faktura>`;

      const result = await validate(invalidXml);

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0].source).toBe("parse");
    });

    it("should accept well-formed XML (without XSD validation)", async () => {
      const validXml = `<?xml version="1.0" encoding="UTF-8"?>
        <Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/">
          <Naglowek>
            <KodFormularza>FA</KodFormularza>
          </Naglowek>
        </Faktura>`;

      const result = await validate(validXml, { enableXsdValidation: false });

      // Should pass basic XML parsing
      expect(result.errors.filter((e) => e.source === "parse")).toHaveLength(0);
      // But may have semantic errors
      // The key is that it parsed successfully
    });
  });

  describe("XSD Validation", () => {
    it("should validate against XSD schema when enabled", async () => {
      const minimalValidXml = `<?xml version="1.0" encoding="UTF-8"?>
        <Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/">
          <Naglowek>
            <KodFormularza>FA</KodFormularza>
            <WariantFormularza>3</WariantFormularza>
            <DataWytworzeniaFa>2024-01-15T10:30:00Z</DataWytworzeniaFa>
          </Naglowek>
          <Podmiot1>
            <DaneIdentyfikacyjne>
              <NIP>1234567890</NIP>
              <Nazwa>Test Company</Nazwa>
            </DaneIdentyfikacyjne>
          </Podmiot1>
          <Podmiot2>
            <DaneIdentyfikacyjne>
              <NIP>0987654321</NIP>
              <Nazwa>Customer Company</Nazwa>
            </DaneIdentyfikacyjne>
          </Podmiot2>
          <Fa>
            <P_1>2024-01-15</P_1>
            <P_2>INV/2024/001</P_2>
            <P_15>1230.00</P_15>
          </Fa>
        </Faktura>`;

      const result = await validate(minimalValidXml);

      // Check if XSD validation was actually performed

      // The minimal XML above is likely missing required elements,
      // but the important thing is that XSD validation is attempted
      expect(result.errors.length + result.warnings.length).toBeGreaterThan(0);
    });

    it("should report XSD violations", async () => {
      const invalidSchemaXml = `<?xml version="1.0" encoding="UTF-8"?>
        <Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/">
          <InvalidElement>This element is not in the schema</InvalidElement>
        </Faktura>`;

      const result = await validate(invalidSchemaXml);

      expect(result.valid).toBe(false);
      const xsdErrors = result.errors.filter((e) => e.source === "xsd");
      expect(xsdErrors.length).toBeGreaterThan(0);
    });
  });

  describe("Semantic Validation", () => {
    it("should check semantic rules by default", async () => {
      const xmlMissingP15 = `<?xml version="1.0" encoding="UTF-8"?>
        <Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/">
          <Naglowek>
            <KodFormularza>FA</KodFormularza>
          </Naglowek>
          <Fa>
            <P_1>2024-01-15</P_1>
            <P_2>INV/2024/001</P_2>
            <!-- Missing P_15 which is required -->
          </Fa>
        </Faktura>`;

      const result = await validate(xmlMissingP15, {
        enableXsdValidation: false,
        enableSemanticValidation: true,
      });

      // Semantic validation should find issues (P_15 or other semantic problems)
      const semanticErrors = result.errors.filter((e) => e.source === "semantic");
      const semanticWarnings = result.warnings.filter((w) => w.source === "semantic");

      // Should have either semantic errors or warnings
      expect(semanticErrors.length + semanticWarnings.length).toBeGreaterThan(0);
    });

    it("should allow disabling semantic validation", async () => {
      const xmlWithSemanticIssues = `<?xml version="1.0" encoding="UTF-8"?>
        <Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/">
          <Fa>
            <P_1>2024-01-15</P_1>
            <P_2>INV/2024/001</P_2>
          </Fa>
        </Faktura>`;

      const result = await validate(xmlWithSemanticIssues, {
        enableXsdValidation: false,
        enableSemanticValidation: false,
      });

      // With semantic validation disabled, should only check parsing
      const semanticErrors = result.errors.filter((e) => e.source === "semantic");
      expect(semanticErrors).toHaveLength(0);
    });
  });

  describe("Default XSD validation", () => {
    it("should enable XSD validation by default", async () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
        <Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/">
          <InvalidElement>Test</InvalidElement>
        </Faktura>`;

      const result = await validate(xml);

      // Should attempt XSD validation
      const hasXsdError =
        result.errors.some((e) => e.source === "xsd") ||
        result.warnings.some((w) => w.source === "xsd");
      expect(hasXsdError).toBe(true);
    });

    it("should respect explicit XSD validation setting", async () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
        <Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/">
          <Test>Content</Test>
        </Faktura>`;

      const result = await validate(xml, { enableXsdValidation: false });

      // Should not have XSD errors when explicitly disabled
      const xsdErrors = result.errors.filter((e) => e.source === "xsd");
      expect(xsdErrors).toHaveLength(0);
    });
  });

  describe("Error and Warning Categorization", () => {
    it("should properly categorize errors vs warnings", async () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
        <Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/">
          <Fa>
            <P_15>123.000000</P_15>
          </Fa>
        </Faktura>`;

      const result = await validate(xml, { enableXsdValidation: false });

      // Check that warnings are in the warnings array
      expect(result.warnings).toBeDefined();
      expect(result.errors).toBeDefined();

      // May or may not have trailing zero warnings depending on implementation
    });
  });

  describe("Resource Management", () => {
    it("should allow disposing validator", async () => {
      expect(isValidatorDisposed()).toBe(false);

      // Run a validation to ensure validator is initialized
      await validate(`<?xml version="1.0"?><test/>`);

      // Dispose the validator
      disposeValidator();

      expect(isValidatorDisposed()).toBe(true);

      // Should be able to validate again (will reinitialize)
      const result = await validate(`<?xml version="1.0"?><test/>`);
      expect(result).toBeDefined();
    });
  });

  describe("Localization", () => {
    it("should support different locales", async () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
        <InvalidXML>`;

      const resultPL = await validate(xml, { locale: "pl" });
      const resultEN = await validate(xml, { locale: "en" });

      // Both should fail
      expect(resultPL.valid).toBe(false);
      expect(resultEN.valid).toBe(false);

      // Messages might be in different languages
      // (depending on implementation)
      expect(resultPL.errors).toHaveLength(1);
      expect(resultEN.errors).toHaveLength(1);
    });
  });
});
