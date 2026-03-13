import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import { validate } from "../src/index.js";

const FIXTURES_DIR = join(__dirname, "fixtures/official-examples");

describe("Official KSeF FA(3) Examples", () => {
  // Get all XML files from official examples directory
  const xmlFiles = readdirSync(FIXTURES_DIR)
    .filter((file) => file.endsWith(".xml"))
    .sort();

  // Map of examples to their expected characteristics
  const exampleExpectations: Record<
    string,
    { description: string; expectValid: boolean; knownIssues?: string[] }
  > = {
    "FA_3_Przykład_1.xml": {
      description: "Standard VAT invoice with payment",
      expectValid: true,
    },
    "FA_3_Przykład_2.xml": {
      description: "Correction invoice (universal method with StanPrzed)",
      expectValid: true,
    },
    "FA_3_Przykład_3.xml": {
      description: "Correction invoice (difference method)",
      expectValid: true,
    },
    "FA_3_Przykład_4.xml": {
      description: "Wholesale invoice with factor and carrier",
      expectValid: true,
    },
    "FA_3_Przykład_5.xml": {
      description: "Correction of buyer data",
      expectValid: true,
    },
    "FA_3_Przykład_6.xml": {
      description: "Collective correction invoice with discount",
      expectValid: true,
    },
    "FA_3_Przykład_7.xml": {
      description: "Collective correction for partial deliveries",
      expectValid: true,
    },
    "FA_3_Przykład_8.xml": {
      description: "VAT margin invoice for used goods",
      expectValid: true,
    },
    "FA_3_Przykład_9.xml": {
      description: "Operating lease services invoice",
      expectValid: true,
    },
    "FA_3_Przykład_10.xml": {
      description: "Advance invoice with additional buyer",
      expectValid: true,
    },
    "FA_3_Przykład_11.xml": {
      description: "Correction of advance invoice (wrong tax rate)",
      expectValid: true,
    },
    "FA_3_Przykład_12.xml": {
      description: "Correction of advance invoice (payment amount)",
      expectValid: true,
    },
    "FA_3_Przykład_13.xml": {
      description: "Correction of advance invoice (order value change)",
      expectValid: true,
    },
    "Fa_3_Przykład_14.xml": {
      description: "Settlement invoice for advance payment",
      expectValid: true,
    },
    "FA_3_Przykład_15.xml": {
      description: "Simplified invoice (≤450 PLN)",
      expectValid: true,
    },
    "FA_3_Przykład_16.xml": {
      description: "Simplified invoice (alternative format)",
      expectValid: true,
    },
    "Fa_3_Przykład_17.xml": {
      description: "Incorrectly issued settlement invoice",
      expectValid: true, // Schema-valid but semantically incorrect
    },
    "Fa_3_Przykład_18.xml": {
      description: "Correction of settlement invoice",
      expectValid: true,
    },
    "Fa_3_Przykład_19.xml": {
      description: "VAT margin for tourism services",
      expectValid: true,
    },
    "Fa_3_Przykład_20.xml": {
      description: "Domestic invoice in foreign currency (single rate)",
      expectValid: true,
    },
    "FA_3_Przykład_21.xml": {
      description: "Domestic invoice in foreign currency (multiple rates)",
      expectValid: true,
    },
    "FA_3_Przykład_22.xml": {
      description: "WDT (intra-community supply) invoice",
      expectValid: true,
    },
    "FA_3_Przykład_23.xml": {
      description: "Export invoice",
      expectValid: true,
    },
    "FA_3_Przykład_24.xml": {
      description: "Invoice with attachment (energy details)",
      expectValid: true,
    },
    "FA_3_Przykład_25.xml": {
      description: "Invoice with attachment (empty elements)",
      expectValid: true,
    },
    "FA_3_Przykład_26.xml": {
      description: "Invoice with deposit system info",
      expectValid: true,
    },
  };

  describe.each(xmlFiles)("%s", (filename) => {
    const expectation = exampleExpectations[filename] || {
      description: "Unknown example",
      expectValid: true,
    };

    it(expectation.description, async () => {
      const xmlPath = join(FIXTURES_DIR, filename);
      const xml = readFileSync(xmlPath, "utf-8");

      const result = await validate(xml, {
        enableXsdValidation: true,
        enableSemanticValidation: true,
      });

      // Basic validation - should be valid according to XSD
      if (expectation.expectValid) {
        const xsdErrors = result.errors.filter((e) => e.source === "xsd");
        if (xsdErrors.length > 0) {
          console.error(`XSD errors in ${filename}:`, xsdErrors);
        }
        expect(xsdErrors).toHaveLength(0);
      }

      // Log any semantic warnings/errors for review
      const semanticIssues = [
        ...result.errors.filter((e) => e.source === "semantic"),
        ...result.warnings.filter((w) => w.source === "semantic"),
      ];

      if (semanticIssues.length > 0 && !expectation.knownIssues) {
        console.warn(`Semantic issues in ${filename}:`, semanticIssues);
      }

      // Check for known issues
      if (expectation.knownIssues) {
        for (const issue of expectation.knownIssues) {
          const found = semanticIssues.some((i) => i.message.includes(issue));
          expect(found).toBe(true);
        }
      }

      // Overall validity check
      expect(result.valid).toBe(expectation.expectValid);
    });
  });

  describe("Specific validation scenarios", () => {
    it("should validate correction invoices with negative amounts", async () => {
      const xml = readFileSync(join(FIXTURES_DIR, "FA_3_Przykład_2.xml"), "utf-8");
      const result = await validate(xml);

      // Should be valid despite negative amounts
      expect(result.valid).toBe(true);

      // Check for KOR type
      expect(xml).toContain("<RodzajFaktury>KOR</RodzajFaktury>");
      expect(xml).toContain("<P_13_1>-162.60</P_13_1>");
    });

    it("should validate advance invoices with KursWalutyZ", async () => {
      const xml = readFileSync(join(FIXTURES_DIR, "FA_3_Przykład_10.xml"), "utf-8");
      const result = await validate(xml);

      expect(result.valid).toBe(true);
      expect(xml).toContain("<RodzajFaktury>ZAL</RodzajFaktury>");
    });

    it("should validate simplified invoices", async () => {
      const xml = readFileSync(join(FIXTURES_DIR, "FA_3_Przykład_15.xml"), "utf-8");
      const result = await validate(xml);

      expect(result.valid).toBe(true);
      // P_15 should be ≤ 450 PLN for simplified invoice
      const match = xml.match(/<P_15>([^<]+)<\/P_15>/);
      if (match) {
        const amount = parseFloat(match[1]);
        expect(amount).toBeLessThanOrEqual(450);
      }
    });

    it("should validate WDT invoices with proper tax rate", async () => {
      const xml = readFileSync(join(FIXTURES_DIR, "FA_3_Przykład_22.xml"), "utf-8");
      const result = await validate(xml);

      expect(result.valid).toBe(true);
      expect(xml).toContain("<P_12>0 WDT</P_12>");
      // P_23 can be 1 or 2 for WDT invoices
      const hasP23 = xml.includes("<P_23>1</P_23>") || xml.includes("<P_23>2</P_23>");
      expect(hasP23).toBe(true);
    });

    it("should validate export invoices", async () => {
      const xml = readFileSync(join(FIXTURES_DIR, "FA_3_Przykład_23.xml"), "utf-8");
      const result = await validate(xml);

      expect(result.valid).toBe(true);
      expect(xml).toContain("<P_12>0 EX</P_12>");
      // P_23 can be 1 or 2 for export invoices
      const hasP23 = xml.includes("<P_23>1</P_23>") || xml.includes("<P_23>2</P_23>");
      expect(hasP23).toBe(true);
    });

    it("should validate VAT margin invoices", async () => {
      const xml19 = readFileSync(join(FIXTURES_DIR, "Fa_3_Przykład_19.xml"), "utf-8");
      const result19 = await validate(xml19);

      expect(result19.valid).toBe(true);

      // Check for margin procedure markers
      const hasMarginMarker = xml19.includes("PMarzy") || xml19.includes("marża");
      expect(hasMarginMarker).toBe(true);
    });

    it("should validate invoices with attachments", async () => {
      const xml24 = readFileSync(join(FIXTURES_DIR, "FA_3_Przykład_24.xml"), "utf-8");
      const result24 = await validate(xml24);

      expect(result24.valid).toBe(true);
      expect(xml24).toContain("<Zalacznik>");
    });

    it("should validate invoices in foreign currency", async () => {
      const xml20 = readFileSync(join(FIXTURES_DIR, "Fa_3_Przykład_20.xml"), "utf-8");
      const result20 = await validate(xml20);

      expect(result20.valid).toBe(true);

      // Should have currency code other than PLN
      const hasForeignCurrency =
        xml20.includes("<KodWaluty>") && !xml20.includes("<KodWaluty>PLN</KodWaluty>");
      expect(hasForeignCurrency).toBe(true);
    });
  });

  describe("Validation statistics", () => {
    it("should successfully validate all official examples", async () => {
      const results = await Promise.all(
        xmlFiles.map(async (filename) => {
          const xmlPath = join(FIXTURES_DIR, filename);
          const xml = readFileSync(xmlPath, "utf-8");
          const result = await validate(xml);
          return { filename, valid: result.valid, errors: result.errors.length };
        }),
      );

      const validCount = results.filter((r) => r.valid).length;
      const totalCount = results.length;

      console.warn(`Validation summary: ${validCount}/${totalCount} valid`);

      const invalid = results.filter((r) => !r.valid);
      if (invalid.length > 0) {
        console.warn("Invalid files:", invalid);
      }

      // All official examples should be valid
      expect(validCount).toBe(totalCount);
    });
  });
});
