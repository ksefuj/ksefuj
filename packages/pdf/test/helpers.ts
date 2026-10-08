import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import type { TDocumentDefinitions } from "pdfmake/interfaces";
import { renderInvoicePdf, type RenderOptions, type RenderResult } from "../src";
import { observeDocDefinitions } from "../src/testing";

export const EXAMPLES_DIR = fileURLToPath(
  new URL("../../../test-fixtures/official-examples/", import.meta.url),
);
export const LOCAL_FIXTURES_DIR = fileURLToPath(new URL("./fixtures/", import.meta.url));

export function exampleFiles(): string[] {
  return readdirSync(EXAMPLES_DIR)
    .filter((name) => name.endsWith(".xml"))
    .sort();
}

export function readExample(name: string): Uint8Array {
  return new Uint8Array(readFileSync(`${EXAMPLES_DIR}${name}`));
}

export function readLocalFixture(name: string): Uint8Array {
  return new Uint8Array(readFileSync(`${LOCAL_FIXTURES_DIR}${name}`));
}

export function xmlText(bytes: Uint8Array): string {
  return new TextDecoder().decode(bytes);
}

export function decodeEntities(value: string): string {
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

/** All values of a simple element, in document order (no namespaces/attributes handling needed). */
export function elementValues(xml: string, name: string): string[] {
  const re = new RegExp(`<${name}(?:\\s[^>]*)?>([^<]*)</${name}>`, "g");
  return [...xml.matchAll(re)].map((m) => decodeEntities(m[1].trim()));
}

/** Removes all whitespace (incl. nbsp) so wrapped or thousand-separated text can be compared. */
export function squash(value: string): string {
  return value.replace(/\s+/g, "");
}

function walk(value: unknown, out: string[]): void {
  if (typeof value === "string") {
    out.push(value);
  } else if (Array.isArray(value)) {
    for (const item of value) {
      walk(item, out);
    }
  } else if (value && typeof value === "object") {
    // Only user-visible strings: skip style names, alignment, colours and similar attributes.
    for (const [key, item] of Object.entries(value)) {
      if (key === "style" || key === "formatTyp") {
        continue;
      }
      if (typeof item !== "string" || key === "text" || key === "qr" || key === "link") {
        walk(item, out);
      }
    }
  }
}

/** Every string in the document definition (content, footer on page 1 of 1, watermark). */
export function docText(doc: TDocumentDefinitions): string {
  const out: string[] = [];
  walk(doc.content, out);
  walk(doc.watermark, out);
  if (typeof doc.footer === "function") {
    walk(doc.footer(1, 1, { width: 595, height: 842, orientation: "portrait" }), out);
  } else {
    walk(doc.footer, out);
  }
  return squash(out.join(" "));
}

export interface Rendered extends RenderResult {
  doc: TDocumentDefinitions;
  text: string;
}

export async function render(xml: Uint8Array, options?: RenderOptions): Promise<Rendered> {
  let doc: TDocumentDefinitions | undefined;
  await observeDocDefinitions((captured) => {
    doc = captured;
  });
  try {
    const result = await renderInvoicePdf(xml, options);
    if (!doc) {
      throw new Error("no document definition captured");
    }
    return { ...result, doc, text: docText(doc) };
  } finally {
    await observeDocDefinitions(undefined);
  }
}
