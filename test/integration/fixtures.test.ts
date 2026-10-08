/**
 * Integration tests for validator using real-world fixtures
 *
 * This test must be run from the monorepo root using:
 * pnpm test:integration
 */

import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// Import from built package
import { validate } from "../../packages/validator/dist/index.js";

const currentDir = dirname(fileURLToPath(import.meta.url));
const fixturesPath = join(currentDir, "../../test-fixtures");

describe("Validator Integration Tests", () => {
  describe("Official Ministry Examples", () => {
    const officialPath = join(fixturesPath, "official-examples");
    const officialFiles = readdirSync(officialPath).filter((f) => f.endsWith(".xml"));

    it.each(officialFiles)("validates %s as valid", async (filename) => {
      const xmlContent = readFileSync(join(officialPath, filename), "utf-8");
      const result = await validate(xmlContent);

      // Official examples should be valid or have only warnings
      expect(result.valid || result.issues.every((i) => i.code.severity === "warning")).toBe(true);

      if (!result.valid) {
        // eslint-disable-next-line no-console
        console.log(`⚠️ ${filename} has issues:`, result.issues);
      }
    });
  });

  describe("Advance (ZAL) and settlement (ROZ) examples", () => {
    // ZAL: P_15 is the payment received, with P_13/P_14 derived from it (KP = ZB x SP / (100 + SP)).
    // ROZ (art. 106f ust. 3): P_13/P_14 and P_15 all refer to the amount left to pay, so
    // P_15 = sum(P_13_x + P_14_x) holds on both types (Podrecznik KSeF 2.0 part II, 2.7 and 2.14).
    const officialPath = join(fixturesPath, "official-examples");
    const advanceFiles = readdirSync(officialPath)
      .filter((f) => f.endsWith(".xml"))
      .filter((f) =>
        /<RodzajFaktury>(ZAL|ROZ)<\/RodzajFaktury>/.test(
          readFileSync(join(officialPath, f), "utf-8"),
        ),
      );

    it("finds the MF ZAL and ROZ examples", () => {
      expect(advanceFiles.length).toBeGreaterThanOrEqual(3);
    });

    it.each(advanceFiles)("reports no TAX_CALCULATION_MISMATCH for %s", async (filename) => {
      const result = await validate(readFileSync(join(officialPath, filename), "utf-8"));
      expect(result.issues.map((i) => i.code.code)).not.toContain("TAX_CALCULATION_MISMATCH");
    });
  });

  describe("Error Detection Cases", () => {
    const errorPath = join(fixturesPath, "error-cases");
    const errorFiles = readdirSync(errorPath).filter((f) => f.endsWith(".xml"));

    it.each(errorFiles)("detects errors in %s", async (filename) => {
      const xmlContent = readFileSync(join(errorPath, filename), "utf-8");
      const result = await validate(xmlContent);

      // Error cases should NOT be valid
      expect(result.valid).toBe(false);
      expect(result.issues.length).toBeGreaterThan(0);
    });
  });
});
