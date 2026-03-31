# Changelog

All notable changes to `@ksefuj/validator` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] — 2026-03-31

### Added
- Optional `currencyRates` option in `ValidateOptions` for NBP exchange rate validation
- New `CurrencyRate` interface exported from the public API
- New semantic rule `CURRENCY_RATE_MISMATCH` (warning) — checks `KursWaluty` against the NBP mid-rate to 4 decimal places; fix suggestion includes the exact correct value

### Notes
- Fully backwards-compatible: omitting `currencyRates` produces identical output to `0.2.0`
- Rate fetching is intentionally out of scope for the package — see `apps/web/src/lib/nbp.ts` for the reference client implementation including weekend/holiday fallback logic

## [0.2.0] — 2026-03-01

### Added
- Initial release with 42 semantic validation rules
- XSD schema validation via libxml2-wasm
- CLI tool (`ksef-validate`)
- Browser and Node.js support
