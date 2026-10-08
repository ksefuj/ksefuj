# Vendored: ksef-pdf-generator

- Source: https://github.com/CIRFMF/ksef-pdf-generator
- Commit: `f59fc4e2addcf42c74b1674e7c1d534085bc3a84` (merge of PR #151, 2026-09-17)
- Release: 1.1.40 (upstream package `@akmf/ksef-fe-invoice-converter`)
- Vendored on: 2026-10-08
- Licence: MIT, Copyright (c) 2025 CIRF (`LICENSE` in this directory, copied verbatim; the upstream
  `package.json` says ISC, the LICENSE file is the authoritative text). Runtime dependency licences
  are listed in `/THIRD_PARTY_NOTICES.md`.

## What is vendored

Only the FA(3) path, under `src/` with upstream's paths (`@shared/*` resolves to `src/shared/*`
through `paths` in `packages/pdf/tsconfig.json` and an alias in `vitest.config.ts`):

- `src/lib-public/FA3-generator.ts`, `generators/FA3/*`, `generators/common/*`, `enums/`, `i18n/`
  (PL only), `types/` (FA(3) types plus the FA(1)/FA(2)/FA_RR types the FA(3) code imports),
  `configure-fonts.ts`
- `src/shared/*` (PDF helpers, constants, enums, types, `XML-parser.ts` for `stripPrefix`)
- Four `generators/FA2/*` files that FA(3) imports (`Adres`, `Podmiot2Podmiot2k`,
  `PodmiotDaneIdentyfikacyjneTPodmiot2Dto`, `PodmiotDaneKontaktowe`)

Dropped (cleanly separable, never imported by the FA(3) path): FA(1), FA(2), FA_RR, PEF and UPO
generators and their types, `generate-invoice.ts` (the `File`/`FileReader` entry point, replaced by
`packages/pdf/src/parse.ts`), the EN i18n stub, all `*.spec.ts`, mocks, `app-public`, build config.

The vendored code is excluded from ESLint and Prettier (root `eslint.config.js`, `.prettierignore`)
but is type-checked together with the package (`pnpm --filter @ksefuj/pdf typecheck`, strict mode).

## Local patches

Every patch is marked `// ksefuj patch:` in the code. Keep this list in sync.

| # | File | Patch | Reason |
| --- | --- | --- | --- |
| 1 | `src/lib-public/i18n/lang/pl.ts` | Replaced keys `invoice.header.ksefPart1-3` with `visualisationTitle: "Wizualizacja faktury"`. Added `invoice.footer.ksefujDisclaimer` ("Wizualizacja wygenerowana w ksefuj.to na podstawie pliku XML. Nie jest dokumentem wystawionym w KSeF."), `invoice.order.advancePaymentAmountBeforeCorrection` ("Kwota zapłaty przed korektą: ") and `invoice.rows.remainingAmountBeforeCorrection` ("Kwota pozostała do zapłaty przed korektą: "). | Strings come from the i18n resource, not code. Labels follow the XSD documentation of `P_15ZK`. |
| 2 | `src/lib-public/generators/common/Naglowek.ts` | Title is the single text `visualisationTitle` instead of "Krajowy System e-Faktur" (red "e"). The invoice-type title is unchanged. | A preview of a file that may not be in KSeF must not look like an official KSeF document. |
| 3 | `src/lib-public/FA3-generator.ts` (footer) | Page footer is a two-column line: the disclaimer (7 pt, grey) on the left, the page counter on the right. | Disclaimer on every page. |
| 4 | `src/lib-public/FA3-generator.ts` (fonts) | Removed `import pdfFonts from 'pdfmake/build/vfs_fonts'` and `pdfMake.addVirtualFileSystem(pdfFonts)`. | The font VFS (about 470 kB gzip for four fonts) was inlined in the same module as the code. The adapter registers Roboto Regular + Medium after a dynamic import (`src/fonts`). |
| 5 | `src/lib-public/FA3-generator.ts` (structure) | The body of `generateFA3` moved to a new exported `generateFA3DocDefinition()`; `generateFA3` calls it and `pdfMake.createPdf`. | Adapter and tests need the pdfmake document definition without rendering. |
| 6 | `src/lib-public/FA3-generator.ts` (P_15ZK) | Passes `invoice.Fa?.P_15ZK?._text` as a new last argument to `generateZamowienie`. | See patch 8. |
| 7 | `src/lib-public/generators/common/Stopka.ts` | QR caption under KOD I is the KSeF number (as before) but the caption element is omitted when it would be empty (KOD I without KOD II and without a number). | Upstream printed an empty caption. |
| 8 | `src/lib-public/generators/FA3/Zamowienie.ts` | New optional last parameter `p_15ZK`; for KOR_ZAL a paragraph "Kwota zapłaty przed korektą: {P_15ZK}" is rendered above the corrected amount. | Upstream defines `P_15ZK` in its types but never renders it. |
| 9 | `src/lib-public/generators/FA3/Wiersze.ts` | For KOR_ROZ a paragraph "Kwota pozostała do zapłaty przed korektą: {P_15ZK}" is rendered above the corrected remaining amount. | Same as 8. |
| 10 | `src/lib-public/i18n/i18n-init.ts` | Only the PL resource is registered; `en.ts` is not vendored. | The upstream EN resource is a placeholder (1 of 997 keys translated); the adapter fixes the language to PL. |
| 11 | `src/shared/generators/common/functions.ts` | `import packageInfo from '../../../../package.json'` replaced by a constant `{ version: '1.1.40' }`. | We do not vendor upstream's `package.json`. Update the constant on upgrade. |
| 12 | `src/lib-public/generators/FA3/Platnosc.ts` | `link` of `LinkDoPlatnosci` is the raw URL string. | Upstream passed `formatText()`'s object, which pdfmake wrote as the annotation `/URI ([object Object])`. |
| 13 | `src/shared/generators/common/functions.ts` | `formatDateTime` (used for `OkresFa` P_6_Od/P_6_Do) and `formatDateTimePl` format date-only values (`YYYY-MM-DD`) from their components; `formatDateTime` and `formatTime` read date-times in Europe/Warsaw (as `formatDateTimePl` already did) instead of the local zone. | `new Date("2026-02-01")` is UTC midnight and the local getters showed 31.01.2026 west of UTC; output depended on the viewer's time zone. Covered by `test/dates.test.ts`, run under three zones. |

Known gaps (not patched): KOR_ZAL without a `Zamowienie` element shows neither `P_15` nor
`P_15ZK` (upstream behaviour; all three KOR_ZAL MF examples have one). Cosmetic
upstream issues (word-breaking in narrow table columns, raw totals in `Zalacznik` tables) are
untouched.

## How to upgrade

1. Clone the new upstream tag/commit into an empty directory outside the repository.
2. Compute the FA(3) file set (the imports of `src/lib-public/FA3-generator.ts`,
   `configure-fonts.ts`, `i18n/i18n-init.ts` and `shared/XML-parser.ts`, for example with
   `tsc --listFiles`) and copy those files over `src/`, plus the new `LICENSE`. Remove files that
   upstream dropped.
3. Re-apply every patch from the table (search for `ksefuj patch` in the old copy, and diff old
   copy against the previous upstream commit if in doubt). Check that upstream has not fixed one
   of them itself (`P_15ZK`, QR caption, font import) and drop the patch if so.
4. Update the commit, release and date at the top of this file, the version constant (patch 11) and
   `/THIRD_PARTY_NOTICES.md` (`pnpm --filter @ksefuj/pdf gen:notices`). Check new runtime
   dependencies in upstream's `package.json` and mirror them (exact versions) in
   `packages/pdf/package.json`.
5. Run the regression: `pnpm --filter @ksefuj/pdf typecheck && pnpm --filter @ksefuj/pdf test`
   (26 MF examples, patches, QR rules, pdf.js text extraction), then `pnpm --filter @ksefuj/pdf size`
   and update the numbers in `packages/pdf/README.md`.
