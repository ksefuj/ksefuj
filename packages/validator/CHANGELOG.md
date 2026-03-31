# Changelog

All notable changes to `@ksefuj/validator` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] — 2026-03-31

### Added

- Optional `currencyRates` option in `ValidateOptions` for NBP exchange rate validation
- New `CurrencyRate` interface exported from the public API
- New semantic rule `CURRENCY_RATE_MISMATCH` (warning) — checks `KursWaluty` against the NBP Table A
  mid-rate for the last business day before `P_1` (Art. 31a VAT Act); fix suggestion includes the
  exact correct value to 4 decimal places
- New semantic rule `CURRENCY_RATE_UNVERIFIABLE` (warning) — emitted when the rate table for a
  currency is `null` (fetch failed) or contains no rate within 10 days of the invoice date
- `currencyRates` accepts `Record<string, CurrencyRate[] | null>` — a full rate table per currency;
  the validator selects the correct date automatically based on each invoice's `P_1`
- `KursWaluty` validation now covers batch invoices: all line items across all dates in a batch can
  be verified with a single pre-fetched rate table

### Notes

- Fully backwards-compatible: omitting `currencyRates` produces identical output to `0.2.0`
- Rate fetching is intentionally out of scope for the package — see `apps/web/src/lib/nbp.ts` for
  the reference client (one NBP range request per unique currency covers an entire batch)

## [0.2.1] — 2026-03-15

### Changed

- Internal patch release; no public API changes

## [0.2.0] — 2026-03-01

### Added

- Initial release with 42 semantic validation rules
- XSD schema validation via libxml2-wasm
- CLI tool (`ksef-validate`)
- Browser and Node.js support
