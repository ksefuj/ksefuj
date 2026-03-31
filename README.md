# ksefuj

[![CI](https://github.com/ksefuj/ksefuj/actions/workflows/ci.yml/badge.svg)](https://github.com/ksefuj/ksefuj/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@ksefuj/validator)](https://www.npmjs.com/package/@ksefuj/validator)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue)](LICENSE)

Open source toolkit for Polish KSeF FA(3) e-invoicing.

- **100% free forever** — no limits, no signup, no hidden costs
- **Privacy-first** — everything runs locally in your browser
- **Official compliance** — full XSD validation against Ministry of Finance schemas
- **Multilingual** — Polish, English, Ukrainian

🌐 **[ksefuj.to](https://ksefuj.to)** — free online validator 📦
**[@ksefuj/validator](https://www.npmjs.com/package/@ksefuj/validator)** — npm package + CLI

## What is KSeF?

KSeF (Krajowy System e-Faktur) is Poland's mandatory e-invoicing system. Starting April 1, 2026
(February 1, 2026 for large companies), all VAT taxpayers must issue structured XML invoices through
KSeF using the FA(3) schema.

## Features

### Two-Layer Validation

- **XSD Schema Validation** — full compliance with official Ministry of Finance schemas
- **Semantic Business Rules** — catches errors that XSD can't express
- **Visual Validation Badges** — instant feedback on XSD and semantic compliance

### Privacy & Performance

- **100% client-side** — your invoice data never leaves your browser
- **Offline capable** — bundled schemas, no network requests needed
- **Fast validation** — WebAssembly-powered, optimized for multiple validations

### Developer Tools

- **npm package** — `@ksefuj/validator` with TypeScript support
- **CLI tool** — `npx @ksefuj/validator invoice.xml`
- **Claude Skills** — ready-made skills for generating e-invoices in Claude Projects
- **Minimal dependencies** — only libxml2-wasm for XSD validation, TypeScript, ESM modules

## Quick Start

### Web

Visit [ksefuj.to](https://ksefuj.to), drop your XML file, done.

### CLI

```bash
npx @ksefuj/validator invoice.xml
```

### As a dependency

```bash
pnpm add @ksefuj/validator
# or npm install @ksefuj/validator
# or yarn add @ksefuj/validator
```

```typescript
import { validate } from "@ksefuj/validator";

// Full validation with XSD + semantic rules (default)
const result = await validate(xmlString);

// With options
const result = await validate(xmlString, {
  locale: "en", // 'pl' (default) | 'en' | 'uk'
  enableXsdValidation: true, // default: true
  enableSemanticValidation: true, // default: true
});

if (!result.valid) {
  // Check XSD errors
  const xsdErrors = result.errors.filter((e) => e.source === "xsd");

  // Check semantic errors
  const semanticErrors = result.errors.filter((e) => e.source === "semantic");

  for (const error of result.errors) {
    console.error(`${error.source}: ${error.message}`, error.path);
  }
}
```

## Repository Structure

```
ksefuj/
├── packages/
│   └── validator/       ← @ksefuj/validator (npm + CLI)
│       └── src/schemas/ ← Bundled XSD schemas from Ministry of Finance
├── apps/
│   └── web/             ← ksefuj.to (Next.js app)
├── scripts/
│   └── update-schemas.ts ← Schema maintenance tool
└── skills/
    └── ksef-fa3/        ← Claude skill for invoice generation
```

## What the Validator Checks

### XSD Schema Validation

Full validation against official Ministry of Finance FA(3) XSD schemas:

- **libxml2-wasm** — WebAssembly-powered validation in the browser
- **Bundled schemas** — no network requests, CORS-free, offline capable
- **Official compliance** — uses exact schemas from crd.gov.pl
- **Detailed error reporting** — line numbers, element paths, specific violations

### Semantic Business Rules

**42 comprehensive validation rules** based on the official FA(3) information sheet from the
Ministry of Finance:

#### Rule Categories

1. **Podmiot Rules** (8 rules) — Entity validation, JST/GV requirements, NIP placement
2. **Fa Core Rules** (5 rules) — P_15 requirement, mutual exclusions, currency handling
3. **Adnotacje Rules** (11 rules) — All mandatory fields, selection logic for exemptions/margin
   procedures
4. **FaWiersz Rules** (4 rules) — Tax rate validation, GTU format, decimal precision
5. **Corrective Invoice Rules** (2 rules) — KSeF number consistency, reverse charge validation
6. **Payment & Transaction Rules** (6 rules) — Payment dates, bank accounts, currency pairs
7. **Format Rules** (2 rules) — Number formatting, separator validation
8. **Additional Business Logic Rules** (4 rules) — Tax calculations, bank account format, line
   number uniqueness, negative quantities

#### Common Issues Caught

- Missing mandatory Adnotacje fields (P_16, P_17, P_18, P_18A, Zwolnienie, etc.)
- Incorrect JST/GV setup requiring specific Podmiot3 roles
- Polish NIP in wrong field (should be in NIP field, not NrVatUE)
- Wrong tax rates for foreign buyers ('np I'/'np II' vs 'oo')
- GTU format errors (`<GTU>GTU_12</GTU>` not `<GTU_12>1</GTU_12>`)
- Decimal precision violations (amounts >2, prices >8, quantities >6 decimals)
- Selection logic violations in Zwolnienie, NoweSrodkiTransportu, PMarzy
- Currency inconsistencies (foreign currency needs PLN conversions)
- Number formatting issues (thousand separators, wrong decimal separator)
- Tax calculation errors (incorrect VAT amounts, wrong totals)
- Invalid Polish bank account format (IBAN must be 28 chars: PL + 26 digits; NRB must be 26 digits)
- Duplicate invoice line numbers
- Negative quantities in non-corrective invoices

## Claude Skills

The `skills/` directory contains skills for Claude Projects:

- **ksef-fa3** — generates FA(3) XML invoices from input data (PDF, text, form)

Installation: download the `.skill` file from [Releases](https://github.com/ksefuj/ksefuj/releases)
and add to your Claude Project.

## Development

Requires Node.js 18+ and pnpm:

```bash
git clone https://github.com/ksefuj/ksefuj.git
cd ksefuj
pnpm install
pnpm dev              # runs web app on localhost:3000
pnpm build            # builds all packages
pnpm test             # runs tests in all packages
pnpm update-schemas   # updates XSD schemas from government sources
```

### Schema Maintenance

The validator uses bundled XSD schemas to avoid CORS issues. To update them:

```bash
pnpm update-schemas
```

This downloads the latest schemas from `crd.gov.pl`, compares with existing files, and updates the
bundle if changes are detected. Run this:

- Monthly to check for updates
- Before releases
- After Ministry of Finance announces schema changes

## Roadmap

### Phase 1: Validator ✅

- [x] Full XSD schema validation (libxml2-wasm)
- [x] Semantic business rules engine
- [x] Bundled schemas (CORS-free, offline capable)
- [x] Visual validation badges (XSD + semantic)
- [x] CLI tool
- [x] Web app with drag & drop
- [x] npm package
- [x] Schema update tool
- [x] i18n setup (PL + EN + UK)
- [x] Deploy to production

### Phase 1.5: Launch Sprint (in progress)

- [x] Validator UI improvements (multi-file upload, better error output)
- [x] Human-readable error messages with fix instructions
- [x] Landing page with trust signals and feature sections
- [x] MDX content pipeline (docs, guides, blog)
- [x] FAQ page (full MDX content, PL/EN/UK, JSON-LD FAQPage schema)
- [x] Blog (first article live: KSeF od 1 kwietnia 2026)
- [x] Sitemap, OG images, hreflang, Twitter cards across all content
- [x] Behavioral analytics
- [x] RSS feed
- [ ] Global validation counter (Vercel KV)
- [x] Publish @ksefuj/validator to npm registry

### Phase 2: Preview

- [ ] XML → HTML invoice visualization
- [ ] Autofix suggestions (one-click error fixes)
- [ ] PDF export (client-side via browser print / jsPDF)
- [ ] QR code generation (required for invoices sent outside KSeF)

### Phase 3: Generator

- [ ] Form-based XML generation
- [ ] Auto NBP exchange rates
- [ ] Auto NIP lookup (GUS/VIES)

## License

Apache 2.0

A permissive open source license that allows commercial use, modification, and distribution.
Requires preservation of copyright and license notices.
