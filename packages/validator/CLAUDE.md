# @ksefuj/validator — Claude Code Context

## Source of Truth

The file `docs/fa3-information-sheet.md` is the **constitutional reference** for all semantic
validation rules. It is a structured conversion of the official Ministry of Finance "Information
sheet on the FA(3) logical structure" (March 2026 edition, 174 pages).

**Before implementing, modifying, or reviewing any semantic validation rule, read
`docs/fa3-information-sheet.md`.** This is non-negotiable — the information sheet is the authority
on field obligations, allowed values, selection-type constraints, cascading requirements, and
business logic. Do not rely on memory or assumptions about FA(3) structure.

Key sections you'll reference most often:

- §2 (Field formats) — max lengths, decimal precision, date formats
- §9.3–9.4 (Tax summary fields) — P*13*_/P*14*_ sequences
- §9.6 (Adnotacje) — Zwolnienie, NoweSrodkiTransportu, PMarzy selection logic
- §10.3 (P_12 rate values) — the canonical rate dictionary
- §10.4–10.5 (GTU and Procedura codes)
- Appendix D (Validator-Critical Rules Summary) — 20 rules extracted for implementation

## Test Fixtures

The file `docs/fa3-test-fixtures.md` contains all 32 official examples from the MF information
sheet, converted into XML fragments with positive and negative test cases. When building or
extending the test suite, read this file first and follow its structure.

## Architecture

- **XSD validation**: libxml2-wasm, schemas bundled in `src/schemas/`
- **Semantic validation**: `src/semantic.ts` — interface blueprint (implementation pending)
- **Error codes**: `src/error-codes.ts` — error definitions (semantic codes to be added)
- **Types**: `src/types.ts` — `ValidationIssue`, `SemanticRule`, `XmlDocument`, etc.
- **Tests**: vitest, run with `pnpm test` from this directory

## Conventions

- Semantic rule IDs: `SCREAMING_SNAKE_CASE` (to be defined during implementation)
- Error codes: defined in `error-codes.ts`
- Namespace: `http://crd.gov.pl/wzor/2025/06/25/13775/`
- XML element names stay Polish as-is (Podmiot1, FaWiersz, Adnotacje, NrWierszaFa, etc.)
- All other code (variables, functions, comments) in English
- Test names should reference the MF example number when applicable

## Common Tasks

### Adding a new semantic rule (when implementation resumes)

1. Read the relevant section in `docs/fa3-information-sheet.md`
2. Add error code to `src/error-codes.ts`
3. Add rule object to `semanticRules` array in `src/semantic.ts`
4. Add tests (see `docs/fa3-test-fixtures.md` for XML fragments)
5. Add i18n message keys if needed

### Running tests

```bash
pnpm test           # run once
pnpm test:watch     # watch mode
pnpm test:coverage  # with coverage
```
