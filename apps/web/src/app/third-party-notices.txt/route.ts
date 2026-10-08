import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const dynamic = "force-static";

/**
 * Licence notices of the third-party code that ships in the PDF preview (vendored MF generator,
 * pdfmake, fonts, ...). The file lives in the repo root and is regenerated with
 * `pnpm --filter @ksefuj/pdf gen:notices`; it is read at build time and served as plain text.
 */
export async function GET() {
  // `next build` runs with apps/web as the working directory
  const notices = await readFile(join(process.cwd(), "../../THIRD_PARTY_NOTICES.md"), "utf8");
  return new Response(notices, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
