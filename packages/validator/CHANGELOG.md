# Changelog

All notable changes to `@ksefuj/validator` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- A `Faktura` root in no or a wrong namespace (`WRONG_NAMESPACE`), or a root element other than
  `Faktura`, no longer also runs the semantic layer. It found no FA(3) elements and reported false
  `PODMIOT2_JST_MISSING`, `PODMIOT2_GV_MISSING`, `P15_MISSING` and similar issues on top of the one
  real problem. Strict-XML checks still run
- `metadata.attribute` on XSD issues is now a readable name: `xml:lang` for the XML namespace,
  otherwise the local name, instead of `{http://www.w3.org/XML/1998/namespace}lang`

## [0.4.0] — 2026-10-08

### Added

- XSD issues are now built from the structured `XmlValidateError.details` instead of regex-splitting
  the message text, and a new pure parser (`src/xsd-messages.ts`, `parseXsdMessage`) classifies each
  libxml2 message. New codes `UNEXPECTED_ELEMENT` (wrong order or typo in an element name) and
  `WRONG_NAMESPACE` (`Faktura` without, or with a wrong, FA(3) namespace). `location.lineNumber` and
  `columnNumber` are now populated for XSD issues; `location.element` and `expectedValues` hold
  local names without namespace URIs; `actualValue` and `metadata.facet` / `typeName` / `attribute`
  are set where libxml2 reports them

- Exchange rate validation for advance invoices, which previously had none. `Fa/KursWalutyZ` and
  `ZaliczkaCzesciowa/KursWalutyZW` are now checked against the NBP Table A mid-rate, keyed to the
  date the payment was received (Art. 19a ust. 8) — `ZaliczkaCzesciowa/P_6Z` for a per-payment rate,
  `Fa/P_6` for the invoice-level one. Art. 31a ust. 2 still applies: an advance invoice may be
  issued up to 60 days before the payment arrives (Art. 106i ust. 7), and the reference date is then
  `P_1`. A foreign-currency `ZAL` carries no `FaWiersz`, so no rate on it was reachable by any check
  before
- Unlike `FaWiersz/KursWaluty`, exactly one rate is accepted here: an advance has a determinate tax
  point, so there is no Art. 19a ust. 5 ambiguity to widen for, and Art. 31a ust. 1a is keyed to
  that same invoice-issuance effect. `Fa/KursWalutyZ` is skipped when several payments carry
  different dates and no `Fa/P_6` fixes one, and `KursWalutyZK` is never checked — it records the
  rate adopted for the invoice being corrected (Art. 31b ust. 1), not a fresh conversion
- `resolveRateReference` and `rateReferenceCandidates`, exported from the package root and from the
  dependency-free `@ksefuj/validator/currency-date` subpath, so rate-fetching clients can select the
  same reference date the validator checks against

### Fixed

- `REVERSE_CHARGE_CONSISTENCY` no longer reports "no line uses np I/np II/oo" on advance invoices
  (`ZAL`, `KOR_ZAL`) with `P_18 = 1`: their lines live in `Fa/Zamowienie/ZamowienieWiersz/P_12Z`,
  which is now read alongside `FaWiersz/P_12`. An invoice with no lines at all is not cross-checked
- `TAX_CALCULATION_MISMATCH` accepts `P_14_1`..`P_14_3` that match the per-line tax method (Art.
  106e ust. 10): the sum over `FaWiersz` of the same rate group of `P_11Vat`, else
  `round(P_11 × rate)`, else `P_11A − round(P_11A / (1 + rate))`, in addition to the invoice-level
  `P_13_x × rate`. Each method has a 1 grosz tolerance; a line without any usable amount disables
  the per-line alternative for that group

- `TAX_CALCULATION_MISMATCH` (P_15 sum) and `AMOUNT_NO_SEPARATORS` read a non-existent `P_13_6`
  field; FA(3) has `P_13_6_1`, `P_13_6_2` and `P_13_6_3`, which were never read. Invoices with 0%
  sales alongside taxed sales got a false P_15 mismatch, and thousand separators in those fields
  went unnoticed. The non-existent `P_14_5W` was dropped from the field lists too (§9.3, §9.4)
- `TAX_CALCULATION_MISMATCH` accepts the 22% and 7% rates the information sheet allows in
  `P_13_1`/`P_14_1` (23% or 22%) and `P_13_2`/`P_14_2` (8% or 7%), within the existing 1 grosz
  tolerance (§9.3)
- `TAX_CALCULATION_MISMATCH` no longer fires on an invalid `FaWiersz/P_12`; that case is reported
  only as `P12_ENUMERATION`

- XSD errors are no longer almost all reported as `SCHEMA_VALIDATION_FAILED`: invalid values now map
  to `INVALID_ELEMENT_VALUE` and missing children to `REQUIRED_ELEMENT_MISSING` (previously "not
  expected" was misreported as `REQUIRED_ELEMENT_MISSING`)
- `CURRENCY_RATE_MISMATCH` no longer keys the NBP rate to `P_1` alone. Art. 31a ust. 1 keys it to
  the last business day before the **tax obligation date**; the issue date only governs when the
  invoice is issued _before_ the tax obligation arises (ust. 2). The tax point is taken from
  `FaWiersz/P_6A`, `Fa/P_6`, `Fa/OkresFa/P_6_Do` or the earliest `ZaliczkaCzesciowa/P_6Z`, falling
  back to `P_1` when the XML carries none. This removes false positives on the most common B2B case
  — a monthly service invoiced in the following month
- When the inferred tax point precedes the issue date, the rate from before the issue date is also
  accepted: Art. 19a ust. 5 moves the tax point onto the issue date for several categories
  (construction, media, rental, leasing) that the XML cannot be distinguished from, and Art. 31a
  ust. 1a lets those taxpayers elect it outright. Both readings are reported in `expectedValues`,
  general rule first
- Corrective invoices (`KOR`, `KOR_ZAL`, `KOR_ROZ`) are no longer checked against a current NBP
  table. Art. 31b ust. 1 keeps the rate adopted for the invoice being corrected, which the
  correction does not carry. Collective corrections (`OkresFaKorygowanej`) are still checked,
  against their own issue date per Art. 31b ust. 2
- Cash-accounting invoices (`P_16` = `1`) are skipped — Art. 21 keys the tax obligation to the day
  payment is received, which no FA(3) field records
- `CURRENCY_RATE_MISMATCH` now says "NBP Table A mid-rate" rather than implying the invoice is
  simply wrong: a taxpayer may lawfully have elected ECB rates (Art. 31a ust. 1) or income-tax
  conversion rules (Art. 31a ust. 2a), neither of which FA(3) records

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

## [0.2.1] — 2026-03-31

### Fixed

- XSD errors are no longer almost all reported as `SCHEMA_VALIDATION_FAILED`: invalid values now map
  to `INVALID_ELEMENT_VALUE` and missing children to `REQUIRED_ELEMENT_MISSING` (previously "not
  expected" was misreported as `REQUIRED_ELEMENT_MISSING`)

- Corrected Polish IBAN length check (Rule 40): `NrRB` in IBAN format must be **28** characters
  (`PL` + 26 digits), not 26; bare NRB format (26 digits without prefix) remains valid

### Changed

- Excluded test files from the npm publish bundle

## [0.2.0] — 2026-03-01

### Added

- Initial release with 42 semantic validation rules
- XSD schema validation via libxml2-wasm
- CLI tool (`ksef-validate`)
- Browser and Node.js support
