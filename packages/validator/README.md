# @ksefuj/validator

[![npm version](https://img.shields.io/npm/v/@ksefuj/validator)](https://www.npmjs.com/package/@ksefuj/validator)

Validates KSeF FA(3) invoice XML before you submit it: the official XSD schema, the Ministry of
Finance business rules, and extra checks KSeF does not do. It runs in Node.js and in the browser,
with no network requests (the schemas are bundled). This is the engine behind
[ksefuj.to](https://ksefuj.to).

## Install

```bash
npm install @ksefuj/validator
# or: pnpm add @ksefuj/validator
```

## CLI

```bash
npx @ksefuj/validator invoice.xml
npx @ksefuj/validator --batch ./invoices/   # every *.xml in the directory
```

| Option         | Effect                                                    |
| -------------- | --------------------------------------------------------- |
| `--json`       | print each result as JSON                                 |
| `--verbose`    | show error codes, fix suggestions and timing              |
| `--assertions` | count the checks that passed (list them with `--verbose`) |

The exit code is `0` when every file is valid and `1` otherwise. Installed as a dependency, the same
CLI is available as `ksef-validate`.

## API

```typescript
import { validate } from "@ksefuj/validator";

const result = await validate(xmlString);

if (!result.valid) {
  for (const issue of result.issues) {
    const { severity, code, domain } = issue.code;
    const { xpath, lineNumber } = issue.context.location;
    console.log(`${severity} ${code} [${domain}] ${xpath ?? ""}:${lineNumber ?? ""}`);
    console.log(issue.message);
  }
}
```

`validate()` never throws. Problems with the input (not XML, wrong namespace) come back as issues
too.

- `result.valid` is `false` when there is at least one issue with severity `error`. Warnings and
  info do not make an invoice invalid.
- Each issue has a stable `code.code` (e.g. `CURRENCY_RATE_MISMATCH`), a `code.domain` (`parse`,
  `xsd`, `semantic` or `infrastructure`), a location (`xpath`, `element`, `lineNumber`,
  `columnNumber`), an English `message` and `fixSuggestions`. Use the code to show your own
  translated messages; ksefuj.to does this in Polish, English and Ukrainian.
- `result.metadata` holds the schema and validator version and timings.

Options:

| Option                     | Default | Effect                                                  |
| -------------------------- | ------- | ------------------------------------------------------- |
| `enableXsdValidation`      | `true`  | run the XSD layer                                       |
| `enableSemanticValidation` | `true`  | run the business rules                                  |
| `collectAssertions`        | `false` | fill `result.assertions` with the checks that passed    |
| `maxIssues`                | none    | stop collecting after this many issues                  |
| `currencyRates`            | none    | NBP rate tables for the exchange-rate check (see below) |

Lower-level exports (`validateXsd`, `checkSemantics`, `semanticRules`, `checkStrictXml`,
`ERROR_CODES`, `getErrorDefinition`) are available for tools that need one layer only. In long-lived
processes, `disposeValidator()` frees the WebAssembly XSD validator.

## What it checks

1. **XSD schema**: the official FA(3) schemas from `crd.gov.pl`, run through libxml2-wasm. Errors
   carry the line number and element.
2. **Ministry of Finance rules**: what the XSD cannot express, each rule citing its section of the
   official FA(3) information sheet
   ([`docs/fa3-information-sheet.md`](docs/fa3-information-sheet.md)). Examples: mandatory
   `Adnotacje` fields and their single-choice groups (`Zwolnienie`, `NoweSrodkiTransportu`,
   `PMarzy`), `Podmiot3` roles required by `JST` and `GV`, a Polish NIP put in `NrVatUE`,
   `np I`/`np II` for foreign buyers, GTU format, decimal precision, currency fields, corrective
   invoice references.
3. **Extra checks**: things KSeF accepts but that cause trouble later: tax arithmetic (`P_14_x`
   against `P_13_x` and the rate, `P_15` against the totals), Polish bank account format, duplicate
   `NrWierszaFa`, negative quantities outside corrective invoices, and the NBP rate check below.
4. **Strict XML (KSeF API 2.4.0)**: raw-text checks for XML processing instructions
   (`XML_PROCESSING_INSTRUCTION`), Unicode characters the W3C XML spec discourages
   (`XML_DISCOURAGED_CHARACTER`: `[#x7F-#x84]`, `[#x86-#x9F]`, `[#xFDD0-#xFDEF]`,
   `[#xNFFFE-#xNFFFF]`), a leading BOM (`XML_BOM_PRESENT`) and a non-UTF-8 encoding declaration
   (`XML_ENCODING_NOT_UTF8`). The KSeF API team announced that production would reject these from
   2026-10-19; for now production still answers with an `X-System-Warning` header. Source:
   [Weryfikacja faktury](https://github.com/CIRFMF/ksef-api/blob/main/faktury/weryfikacja-faktury.md).

## NBP exchange rates

Optionally validate that the invoice's exchange rates match the official NBP Table A mid-rate (Art.
31a VAT Act). Pass a rate table per currency — the validator picks the correct date itself.
`FaWiersz/KursWaluty` is checked per line; advance invoices are covered too, through
`Fa/KursWalutyZ` and `ZaliczkaCzesciowa/KursWalutyZW`.

The reference date is **not** simply `P_1`. Art. 31a ust. 1 takes the rate from the last business
day before the day the tax obligation arises; the issue date governs only when the invoice is issued
_before_ that (ust. 2). The validator infers the tax point from `FaWiersz/P_6A`, `Fa/P_6`,
`Fa/OkresFa/P_6_Do` or `ZaliczkaCzesciowa/P_6Z`, and falls back to `P_1` when the invoice carries
none. On an advance invoice the tax point is the day the payment was received (Art. 19a ust. 8), so
each `KursWalutyZW` is checked against its own `P_6Z` — unless the invoice was issued first, which
Art. 106i ust. 7 permits up to 60 days ahead, in which case ust. 2 puts the reference date back on
`P_1` like everywhere else.

```typescript
import { validate, type CurrencyRate } from "@ksefuj/validator";

// Pass an array of rates for each currency (e.g. fetched from the NBP range API).
// A July service invoiced on 2026-08-05 takes the rate from before 2026-07-31,
// so the table has to reach back to the tax point, not just to P_1.
const currencyRates: Record<string, CurrencyRate[] | null> = {
  EUR: [
    { currency: "EUR", date: "2026-07-29", mid: 4.21 },
    { currency: "EUR", date: "2026-07-30", mid: 4.2856 }, // picked for a July settlement period
  ],
  USD: null, // looked up but unavailable → emits CURRENCY_RATE_UNVERIFIABLE
};

const result = await validate(xmlString, { currencyRates });
// → CURRENCY_RATE_MISMATCH  if KursWaluty ≠ the selected NBP rate
// → CURRENCY_RATE_UNVERIFIABLE  if the rate table is null or has no rate within 10 days
```

Use `rateReferenceCandidates(p1, taxPointDate)` from `@ksefuj/validator/currency-date` (a
dependency-free subpath, safe in any bundle) to work out which dates a rate table has to cover
before fetching it.

| `currencyRates[currency]` | behaviour                                                                               |
| ------------------------- | --------------------------------------------------------------------------------------- |
| key absent                | skipped silently — currency was never looked up                                         |
| `null`                    | `CURRENCY_RATE_UNVERIFIABLE` — lookup was attempted but failed                          |
| `CurrencyRate[]`          | validator picks the most recent rate strictly before the reference date, within 10 days |

If `currencyRates` is omitted entirely, all currency checks are skipped (backwards-compatible with
`0.2.0`).

## Bundled schemas

The XSD files in `src/schemas/` are downloaded from `crd.gov.pl` and compiled into
`schemas-data.ts`; only the compiled bundle ships in the npm package. To refresh them, run
`pnpm update-schemas` from the repository root and review the diff.

## Development

```bash
pnpm --filter @ksefuj/validator build
pnpm --filter @ksefuj/validator test
```

Tests run each rule against valid and invalid cases and against the official MF example invoices in
[`test-fixtures/`](../../test-fixtures). Changes are logged in [CHANGELOG.md](CHANGELOG.md).

## License

[Apache 2.0](../../LICENSE). Part of [ksefuj](https://github.com/ksefuj/ksefuj).
