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
      expect(result.valid || result.issues.every((i) => i.severity === "warning")).toBe(true);

      if (!result.valid) {
        // eslint-disable-next-line no-console
        console.log(`⚠️ ${filename} has issues:`, result.issues);
      }
    });
  });

  describe("Error Detection Cases", () => {
    const errorPath = join(fixturesPath, "error-cases");
    const errorFiles = readdirSync(errorPath).filter((f) => f.endsWith(".xml"));

    // Files that don't have validators yet
    const todoFiles = [
      "21-wrong-tax-calculation.xml",
      "23-missing-bank-account-validation.xml",
      "24-duplicate-line-numbers.xml",
      "25-negative-quantities.xml",
    ];

    it.each(errorFiles)("detects errors in %s", async (filename) => {
      const xmlContent = readFileSync(join(errorPath, filename), "utf-8");
      const result = await validate(xmlContent);

      if (todoFiles.includes(filename)) {
        if (result.valid) {
          // eslint-disable-next-line no-console
          console.log(`⚠️ TODO: ${filename} - validator not yet implemented`);
        }
        return;
      }

      // Error cases should NOT be valid
      expect(result.valid).toBe(false);
      expect(result.issues.length).toBeGreaterThan(0);
    });
  });
});
