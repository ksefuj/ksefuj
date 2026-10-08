// Dev helper: renders an XML file to a PDF using the package sources (run through tsx).
// Usage: pnpm --filter @ksefuj/pdf exec tsx scripts/dump-pdf.mjs <in.xml> <out.pdf> [ksefNumber]
import { readFileSync, writeFileSync } from "node:fs";
import { renderInvoicePdf } from "../src/index.ts";

const [input, output, ksefNumber] = process.argv.slice(2);
const result = await renderInvoicePdf(new Uint8Array(readFileSync(input)), { ksefNumber });
writeFileSync(output, Buffer.from(await result.blob.arrayBuffer()));
console.log(`${output}: ${result.invoiceType}, qr=${result.hasQr}, ${result.blob.size} bytes`);
