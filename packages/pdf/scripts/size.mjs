// Bundles scripts/size-entry.ts with vite (production, minified) and prints raw and gzipped sizes.
// The entry only holds a dynamic import, so the output shows what a page pays for on first use:
// the code chunk (adapter + generator + pdfmake + xml-js + i18next) and the separate font chunk.
import { mkdtempSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";
import { build } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const outDir = mkdtempSync(join(tmpdir(), "ksefuj-pdf-size-"));

try {
  await build({
    root,
    configFile: false,
    logLevel: "silent",
    resolve: {
      alias: { "@shared": join(root, "vendor/ksef-pdf-generator/src/shared") },
    },
    build: {
      outDir,
      emptyOutDir: true,
      minify: "esbuild",
      target: "es2022",
      sourcemap: false,
      // App mode with an explicit input: unlike vite's lib mode, it fully minifies ES output.
      rollupOptions: { input: join(root, "scripts/size-entry.ts") },
    },
  });

  const kb = (bytes) => `${(bytes / 1024).toFixed(1)} kB`;
  const rows = readdirSync(outDir, { recursive: true })
    .filter((name) => name.endsWith(".js"))
    .map((name) => {
      const code = readFileSync(join(outDir, name));
      const text = code.toString("utf8");
      // Base64 TrueType header ("\0\1\0\0 ...") only occurs in the generated font module.
      const kind = text.includes("AAEAAAARAQAABAAQ")
        ? "fonts"
        : text.length > 100_000
          ? "code"
          : "entry";
      return { kind, name, raw: code.length, gzip: gzipSync(code).length };
    })
    .sort((a, b) => b.raw - a.raw);

  for (const row of rows) {
    console.log(
      `${row.kind.padEnd(6)} ${row.name.padEnd(36)} ${kb(row.raw).padStart(10)} raw ${kb(row.gzip).padStart(10)} gzip`,
    );
  }
  const total = rows.reduce((sum, row) => sum + row.gzip, 0);
  console.log(`total gzip (all chunks): ${kb(total)}`);
} finally {
  rmSync(outDir, { recursive: true, force: true });
}
