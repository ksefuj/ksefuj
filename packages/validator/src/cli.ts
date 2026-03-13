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
    --help    Show help
    --json    Output in JSON format
  `);
  process.exit(0);
}

const jsonOutput = args.includes("--json");
const batchIndex = args.indexOf("--batch");

async function validateFile(path: string) {
  const xml = readFileSync(path, "utf-8");
  const result = await validate(xml);

  if (jsonOutput) {
    console.log(JSON.stringify({ file: path, ...result }, null, 2));
    return result.valid;
  }

  const icon = result.valid ? "✅" : "❌";
  console.log(`\n${icon} ${path}`);

  for (const err of result.errors) {
    const loc = err.path ? ` (${err.path})` : "";
    const line = err.line ? ` line ${err.line}` : "";
    console.log(`  ❌ ${err.message}${loc}${line}`);
  }

  for (const warn of result.warnings) {
    const loc = warn.path ? ` (${warn.path})` : "";
    console.log(`  ⚠️  ${warn.message}${loc}`);
  }

  if (result.valid && result.warnings.length === 0) {
    console.log("  No errors or warnings");
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
