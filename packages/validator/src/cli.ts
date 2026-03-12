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
    ksef-validate <file.xml>           Waliduj pojedynczy plik
    ksef-validate --batch <directory>  Waliduj wszystkie XML w katalogu

  Options:
    --help    Pokaż pomoc
    --json    Wynik w formacie JSON
  `);
  process.exit(0);
}

const jsonOutput = args.includes("--json");
const batchIndex = args.indexOf("--batch");

function validateFile(path: string) {
  const xml = readFileSync(path, "utf-8");
  const result = validate(xml);

  if (jsonOutput) {
    console.log(JSON.stringify({ file: path, ...result }, null, 2));
    return result.valid;
  }

  const icon = result.valid ? "✅" : "❌";
  console.log(`\n${icon} ${path}`);

  for (const err of result.errors) {
    const loc = err.path ? ` (${err.path})` : "";
    const line = err.line ? ` linia ${err.line}` : "";
    console.log(`  ❌ ${err.message}${loc}${line}`);
  }

  for (const warn of result.warnings) {
    const loc = warn.path ? ` (${warn.path})` : "";
    console.log(`  ⚠️  ${warn.message}${loc}`);
  }

  if (result.valid && result.warnings.length === 0) {
    console.log("  Brak błędów i ostrzeżeń");
  }

  return result.valid;
}

let allValid = true;

if (batchIndex !== -1) {
  const dir = resolve(args[batchIndex + 1] || ".");
  const files = readdirSync(dir)
    .filter((f) => extname(f).toLowerCase() === ".xml")
    .map((f) => resolve(dir, f));

  console.log(`Walidacja ${files.length} plików w ${dir}\n`);

  for (const file of files) {
    if (!validateFile(file)) {
      allValid = false;
    }
  }

  console.log(`\n${allValid ? "✅ Wszystkie pliki prawidłowe" : "❌ Znaleziono błędy"}`);
} else {
  const file = resolve(args.filter((a) => !a.startsWith("--"))[0]);
  allValid = validateFile(file);
}

process.exit(allValid ? 0 : 1);
