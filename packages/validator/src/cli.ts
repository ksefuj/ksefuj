#!/usr/bin/env node

/* eslint-disable no-console */

/**
 * CLI for @ksefuj/validator
 *
 * Usage:
 *   npx @ksefuj/validator faktura.xml
 *   npx @ksefuj/validator --batch ./faktury/
 */

import { readdirSync, readFileSync } from "node:fs";
import { extname, resolve } from "node:path";
import { validate } from "./validate.js";

const args = process.argv.slice(2);

if (args.length === 0 || args.includes("--help")) {
  console.log(`
  @ksefuj/validator — KSeF FA(3) XML validator

  Usage:
    ksef-validate <file.xml>           Validate single file
    ksef-validate --batch <directory>  Validate all XML files in directory

  Options:
    --help         Show help
    --json         Output in JSON format
    --assertions   Include successful validations
    --verbose      Show detailed issue information
  `);
  process.exit(0);
}

const jsonOutput = args.includes("--json");
const showAssertions = args.includes("--assertions");
const verbose = args.includes("--verbose");
const batchIndex = args.indexOf("--batch");

async function validateFile(path: string) {
  const xml = readFileSync(path, "utf-8");
  const result = await validate(xml, {
    collectAssertions: showAssertions,
  });

  if (jsonOutput) {
    console.log(JSON.stringify({ file: path, ...result }, null, 2));
    return result.valid;
  }

  const icon = result.valid ? "✅" : "❌";
  console.log(`\n${icon} ${path}`);

  // Show errors
  const errors = result.issues.filter((i) => i.code.severity === "error");
  for (const issue of errors) {
    const loc = issue.context.location.xpath ? ` (${issue.context.location.xpath})` : "";
    const line = issue.context.location.lineNumber
      ? ` line ${issue.context.location.lineNumber}`
      : "";
    console.log(`  ❌ ${issue.message}${loc}${line}`);

    if (verbose) {
      console.log(`     Code: ${issue.code.code}`);
      if (issue.fixSuggestions.length > 0) {
        console.log(`     Fixes: ${issue.fixSuggestions.map((f) => f.description).join(", ")}`);
      }
    }
  }

  // Show warnings
  const warnings = result.issues.filter((i) => i.code.severity === "warning");
  for (const issue of warnings) {
    const loc = issue.context.location.xpath ? ` (${issue.context.location.xpath})` : "";
    console.log(`  ⚠️  ${issue.message}${loc}`);
  }

  // Show assertions if requested
  if (showAssertions && result.assertions.length > 0) {
    console.log(`  ✓ ${result.assertions.length} validations passed`);
    if (verbose) {
      for (const assertion of result.assertions) {
        console.log(`    • ${assertion.description}`);
      }
    }
  }

  if (result.valid && result.issues.length === 0) {
    console.log("  No errors or warnings");
  }

  // Show metadata in verbose mode
  if (verbose) {
    console.log(`  ⏱  Validation time: ${result.metadata.validationTimeMs}ms`);
  }

  return result.valid;
}

async function main() {
  let allValid = true;

  const positionalArgs = args.filter((a) => !a.startsWith("--"));

  if (batchIndex !== -1) {
    const dir = resolve(args[batchIndex + 1] || ".");
    const files = readdirSync(dir)
      .filter((f) => extname(f).toLowerCase() === ".xml")
      .map((f) => resolve(dir, f));

    console.log(`Validating ${files.length} files in ${dir}\n`);

    for (const file of files) {
      if (!(await validateFile(file))) {
        allValid = false;
      }
    }

    console.log(`\n${allValid ? "✅ All files valid" : "❌ Errors found"}`);
  } else {
    if (positionalArgs.length === 0) {
      console.error("Error: missing <file.xml> argument.");
      console.error("Usage: ksef-validate <file.xml>  or  ksef-validate --batch <directory>");
      process.exit(1);
    }

    const file = resolve(positionalArgs[0]);
    allValid = await validateFile(file);
  }

  process.exit(allValid ? 0 : 1);
}

main().catch((error) => {
  console.error("Error:", error.message);
  process.exit(1);
});
