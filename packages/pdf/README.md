# @ksefuj/pdf

Private workspace package (`"private": true`, not published). Renders a KSeF FA(3) invoice (XML) to
a PDF visualisation, entirely in the browser (and in Node 20+ for tests). It is an adapter around a
vendored copy of [CIRFMF/ksef-pdf-generator](https://github.com/CIRFMF/ksef-pdf-generator) (MIT),
the engine behind the Ministry of Finance visualisation.

The output is a **visualisation, not a KSeF document**: every page says so in the footer, the title
is "Wizualizacja faktury", and a diagonal "WIZUALIZACJA" watermark is printed unless the invoice has
a KSeF number.

## API

```ts
import {
  renderInvoicePdf,
  buildKodIUrl,
  isValidKsefNumber,
  UnsupportedInvoiceError,
  KsefNumberMismatchError,
} from "@ksefuj/pdf";

export type QrEnvironment = "prod" | "test" | "demo";
export interface RenderOptions {
  ksefNumber?: string;
  qrEnvironment?: QrEnvironment;
  watermark?: boolean;
}
export interface RenderResult {
  blob: Blob;
  invoiceType: string; // RodzajFaktury
  hasQr: boolean;
  ksefNumberIgnored: boolean; // a ksefNumber was passed but failed isValidKsefNumber
}
export class UnsupportedInvoiceError extends Error {
  readonly reason: "not-xml" | "not-fa3" | "missing-data";
}
export async function renderInvoicePdf(
  xml: Uint8Array | ArrayBuffer,
  options?: RenderOptions,
): Promise<RenderResult>;
export function isValidKsefNumber(value: string): boolean;
export function buildKodIUrl(xml: Uint8Array, env?: QrEnvironment): Promise<string>;
```

Also exported: `KsefNumberMismatchError` (typed error, no fields).

- **FA(3) detection**: the root element must be `Faktura` in the namespace
  `http://crd.gov.pl/wzor/2025/06/25/13775/`. Anything else throws
  `UnsupportedInvoiceError("not-fa3")`, unparsable input `("not-xml")`. An FA(3) invoice without
  `Podmiot1/DaneIdentyfikacyjne/NIP` or `Fa/P_1` throws `("missing-data")` from `buildKodIUrl` and
  from `renderInvoicePdf` when a valid `ksefNumber` asks for a QR. The generator does not validate
  (no XSD, no semantic rules): validate with `@ksefuj/validator` first.
- **KSeF number and KOD I**: when `ksefNumber` is given and valid, it is printed in the header and a
  KOD I QR code is added
  (`https://qr.ksef.mf.gov.pl/invoice/{NIP}/{DD-MM-YYYY}/{SHA-256 Base64URL}`; hosts
  `qr-test.ksef.mf.gov.pl` and `qr-demo.ksef.mf.gov.pl` for `test` and `demo`; format from
  CIRFMF/ksef-docs `kody-qr.md`). The hash covers the exact bytes passed in. If the NIP prefix of
  the number differs from `Podmiot1/DaneIdentyfikacyjne/NIP`, `KsefNumberMismatchError` is thrown
  rather than rendering a wrong QR. An invalid `ksefNumber` (pattern or checksum) is ignored: no
  number, no QR, watermark on by default, and the result has `ksefNumberIgnored: true` so the UI can
  tell the user. KOD II (offline certificate) is never generated.
- **`isValidKsefNumber`**: the `TNumerKSeF` pattern of the FA(3) schema plus the CRC-8 checksum
  (polynomial 0x07, initial value 0x00, over the first 32 characters) from CIRFMF/ksef-api
  `faktury/numer-ksef.md`. Only the 35-character layout the document defines is accepted; the
  36-character form the XSD pattern also allows (hyphen inside the technical part) is rejected
  because the document does not say how its checksum is computed.
- **Watermark**: default on without a valid `ksefNumber`, off with one; `watermark` overrides.
- **Language**: fixed to Polish in v1. i18next is global state, so renders are serialised.

## Privacy guarantees

- No network access at runtime: all code, fonts and strings are bundled; nothing is fetched. (The
  KOD I link only points to KSeF; the package never requests it.)
- Nothing is logged and nothing is stored; the invoice bytes stay in memory and the result is a
  local `Blob`.
- The package contains no analytics. Anything the app tracks must follow the rules in the root
  `CLAUDE.md` (no invoice content, no file names).
- The SHA-256 is computed with `crypto.subtle` (browsers, Node 20+).

## Lazy loading and bundle size

`src/index.ts` is tiny and imports everything heavy dynamically: the engine chunk (adapter,
generator, pdfmake, xml-js, i18next) and, from it, a separate font chunk (Roboto Regular + Medium,
no italics, generated file `src/fonts/roboto-vfs.ts`). Fonts are not subset (Roboto covers Latin
Extended-A and Cyrillic, so Polish and Ukrainian work; subsetting would need an extra build
dependency and was skipped).

`pnpm --filter @ksefuj/pdf size` bundles a tiny entry with vite and prints raw and gzipped sizes
(measured 2026-10-08, vite 7, esbuild minify):

| Chunk                            | Raw       | Gzip     |
| -------------------------------- | --------- | -------- |
| engine (code)                    | 1134.7 kB | 394.3 kB |
| fonts (Roboto Regular + Medium)  | 409.7 kB  | 221.6 kB |
| `kod-i` (xml-js parse + QR link) | 36.5 kB   | 12.0 kB  |
| `index`                          | 1.8 kB    | 1.0 kB   |
| total, all chunks                |           | 629.6 kB |

Load it only behind a user action (a "Podgląd PDF" click), never on the landing page.

## Vendored generator

`vendor/ksef-pdf-generator/` holds the FA(3) path of upstream at a pinned commit with a small list
of local patches (header, footer, QR caption, `P_15ZK`, font split). See
`vendor/ksef-pdf-generator/VENDORED.md` for the source, the patch list and the upgrade procedure.
Vendored code is excluded from ESLint and Prettier but type-checked. Licences of everything that
ships are in `/THIRD_PARTY_NOTICES.md` (repo root; regenerate with `pnpm gen:notices`). The web app
must expose that file (for example from `apps/web/public`) when it ships this package.

## Development

```bash
pnpm --filter @ksefuj/pdf test        # 26 MF examples, patches, QR rules, pdf.js text extraction;
                                      # then the date tests again under TZ=America/New_York and
                                      # TZ=Pacific/Auckland
pnpm --filter @ksefuj/pdf typecheck
pnpm --filter @ksefuj/pdf size
pnpm --filter @ksefuj/pdf gen:fonts   # regenerate src/fonts/roboto-vfs.ts from pdfmake
pnpm --filter @ksefuj/pdf gen:notices # regenerate /THIRD_PARTY_NOTICES.md
pnpm --filter @ksefuj/pdf exec tsx scripts/dump-pdf.mjs in.xml out.pdf [ksefNumber]
```

Tests assert on the pdfmake document definition (through the test-only `src/testing.ts` hook) and
read three real PDFs back with pdfjs-dist.
