# @ksefuj/validator — Claude Code Context

## Implementation Status

**Semantic validation**: All 42 semantic validation rules based on the official FA(3) information
sheet from the Ministry of Finance.

## Source of Truth

The file `docs/fa3-information-sheet.md` is the **constitutional reference** for all semantic
validation rules. It is a structured conversion of the official Ministry of Finance "Information
sheet on the FA(3) logical structure" (March 2026 edition, 174 pages).

**All semantic validation rules follow this constitutional reference.** Each rule in
`src/semantic.ts` includes a direct reference to the relevant section (e.g., "§6.1", "§9.6",
"Appendix D #3").

Key sections that guide validation:

- §2 (Field formats) — max lengths, decimal precision, date formats
- §9.3–9.4 (Tax summary fields) — P*13*_/P*14*_ sequences
- §9.6 (Adnotacje) — Zwolnienie, NoweSrodkiTransportu, PMarzy selection logic
- §10.3 (P_12 rate values) — the canonical rate dictionary
- §10.4–10.5 (GTU and Procedura codes)
- Appendix D (Validator-Critical Rules Summary) — 20 rules extracted for implementation

## Test Fixtures

The test fixtures in this repository are based on the 32 official examples from the MF information
sheet, converted into XML fragments with positive and negative test cases. When building or
extending the test suite, mirror the structure of the existing fixtures and tests.

## Architecture

- **XSD validation**: libxml2-wasm, schemas bundled in `src/schemas/`
- **Semantic validation**: `src/semantic.ts` — 38 rules with constitution references
- **Error codes**: `src/error-codes.ts` — all semantic error definitions included
- **Types**: `src/types.ts` — `ValidationIssue`, `SemanticRule`, `XmlDocument`, etc.
- **Tests**: vitest, comprehensive test suite with 100+ test cases

## Conventions

- Semantic rule IDs: `SCREAMING_SNAKE_CASE` — all 38 rules implemented
- Error codes: defined in `error-codes.ts` — all semantic codes included
- Namespace: `http://crd.gov.pl/wzor/2025/06/25/13775/`
- XML element names stay Polish as-is (Podmiot1, FaWiersz, Adnotacje, NrWierszaFa, etc.)
- All other code (variables, functions, comments) in English
- Test names reference the MF example number when applicable

## Rule Groups Implemented

All 8 groups from the constitutional reference:

1. **Podmiot Rules** (8 rules) — Entity validation, JST/GV requirements
2. **Fa Core Rules** (5 rules) — P_15, mutual exclusions, currency handling
3. **Adnotacje Rules** (11 rules) — Mandatory fields, selection logic
4. **FaWiersz Rules** (4 rules) — Tax rates, GTU format, decimal precision
5. **Corrective Invoice Rules** (2 rules) — KSeF number consistency
6. **Payment & Transaction Rules** (6 rules) — Payment validation, bank accounts
7. **Format Rules** (2 rules) — Number formatting, separators
8. **Additional Business Logic Rules** (4 rules) — Tax calculations, bank account format, line number uniqueness, negative quantities

## Common Tasks

### Extending validation rules

1. Read the relevant section in `docs/fa3-information-sheet.md`
2. Add error code to `src/error-codes.ts`
3. Add rule function and rule object to `src/semantic.ts`
4. Add tests (see existing test files for patterns)
5. Update rule count in documentation

### Running tests

```bash
pnpm test           # run once
pnpm test:watch     # watch mode
pnpm test:coverage  # with coverage
```
