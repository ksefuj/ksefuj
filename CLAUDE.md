# CLAUDE.md

## Project Overview

**ksefuj** — open source toolkit for Polish KSeF (Krajowy System e-Faktur) e-invoicing.

- **Web app**: ksefuj.to (primary), ksefuj.pl (redirect)
- **npm package**: @ksefuj/validator
- **GitHub**: github.com/ksefuj/ksefuj
- **License**: Apache 2.0 — permissive open source

## What is KSeF

KSeF is Poland's mandatory e-invoicing system. All VAT taxpayers must issue structured XML invoices
(schema FA(3)) through KSeF starting April 1, 2026 (large companies since Feb 1, 2026). The XML
schema is published by the Ministry of Finance.

## Architecture

Monorepo with pnpm workspaces:

```
ksefuj/
├── packages/validator/     ← @ksefuj/validator (npm + CLI)
│   ├── src/validate.ts     ← main validate() function
│   ├── src/semantic.ts     ← business rule checks
│   ├── src/cli.ts          ← CLI entry point
│   └── src/schemas/fa3.xsd ← official MF schema
├── apps/web/               ← Next.js app (ksefuj.to)
│   ├── src/app/
│   │   └── [locale]/       ← i18n routing (PL/EN/UK)
│   │       ├── page.tsx    ← localized landing page
│   │       └── validator.tsx ← drag & drop validator
│   └── src/i18n/           ← translations and config
└── skills/ksef-fa3/        ← Claude skill for invoice generation
```

## Package Manager

This project uses **pnpm**. Do not use npm or yarn.

```bash
pnpm install          # install deps
pnpm dev              # run dev server
pnpm build            # build all packages
pnpm --filter @ksefuj/validator build   # build single package
```

## License

**Apache 2.0** — A permissive open source license that allows commercial use, modification,
distribution, and private use. Contributors grant patent rights. The only requirements are
preserving copyright/license notices and stating changes. This maximizes adoption while maintaining
attribution.

## Core Principles

### Privacy-first

Everything runs client-side in the browser. No XML data is sent to any server. This is a key
differentiator and selling point — invoice data is sensitive. Use DOMParser (native browser API) for
XML parsing.

### Free forever

All features are free with no usage limits, no signup walls, no freemium tiers. KSeF is already a
mandatory burden on small businesses — the tools to deal with it shouldn't cost extra. This is the
core competitive advantage. Monetization comes from tasteful, non-intrusive sponsorships (Daring
Fireball / Carbon Ads style) once the tool has meaningful traffic. No user tracking, no data
selling, no annoying popups.

### Freelancer-first, developer-friendly

The primary audience is Polish freelancers, JDG (sole traders), small businesses, and developers who
issue 1-5 invoices/month and don't want to buy Symfonia or Comarch. The tool should feel simple and
approachable for a non-technical freelancer, while also offering CLI, npm package, and API for
developers who want programmatic access.

### Multilingual (PL + EN + UK)

- **UI**: Polish is the default language. English and Ukrainian must be fully supported. Use i18n
  from the start — do not hardcode Polish strings in components. Ukrainian support reflects the
  large Ukrainian community in Poland, many of whom run sole proprietorships (JDG) and need KSeF
  tools.
- **Error messages from validator**: Available in PL, EN, UK. Polish is default.
- **Blog/SEO content**: Polish-first (this is the SEO target), English and Ukrainian versions are
  nice-to-have.
- **Code**: Always in English. Variable names, function names, comments, commit messages — all
  English. The only exceptions are direct references to FA(3) XML element names that are inherently
  Polish (e.g., `Podmiot1`, `FaWiersz`, `Adnotacje`, `NrWierszaFa`). These should be used as-is
  since they match the XML schema.

## Design System

**Read `DESIGN_SYSTEM.md` before writing ANY UI code.** No exceptions — every component, page, style
change, or new feature must follow the design system.

Quick reference (the full doc has all tokens, classes, and component specs):

- **Theme**: Light, airy, Notion-inspired. Warm white backgrounds, pastel accents.
- **Colors**: Primary violet-500, success emerald-500, warning amber-500, error rose-500. Page bg is
  warm white (#FAFAF8), not pure white. Text is slate-900, not pure black.
- **Fonts**: Display font (Plus Jakarta Sans or chosen alternative) for headings. Inter/Geist for
  body. JetBrains Mono for logo + code ONLY. Never monospace on headings.
- **Logo**: `ksefuj●to` — unified word, violet dot, light ".to". Use `logo.tsx`, never recreate.
- **Components**: Use shared components from `src/components/` (logo, header, footer, section
  container, badge). Never re-implement these.
- **Copy**: Write for Ania (non-technical freelancer). No jargon above the fold. See the translation
  table in DESIGN_SYSTEM.md for exact rewrites.
- **No dark theme** except footer and code blocks.

## Tech Stack

- **Package manager**: pnpm (workspaces)
- **Web**: Next.js 15 (App Router) + Tailwind CSS v4 + TypeScript
- **Validator**: Pure TypeScript, zero runtime dependencies for browser use
- **Deployment**: Vercel (free tier)

### Validator Reference Documents

The `packages/validator/CLAUDE.md` contains package-specific instructions. The canonical reference
for all FA(3) semantic rules is `packages/validator/docs/fa3-information-sheet.md` — a structured
conversion of the official 174-page MF information sheet. Always consult it before touching semantic
validation logic.

## Validation Architecture

Two layers:

### 1. XSD Schema Validation

Full XML validation against the official FA(3) XSD schema from Ministry of Finance.

- **Client-side validation**: `libxml2-wasm` for XSD validation in the browser
- **Bundled schemas**: All schemas downloaded and bundled locally to avoid CORS issues
- **Offline capable**: No network requests needed - schemas embedded in package
- **Official compliance**: Uses exact schemas from `crd.gov.pl` (downloaded at build time)
- **High performance**: Singleton validator pattern with efficient resource reuse

### 2. Semantic Rules

Business logic checks that XSD cannot express.

**42 comprehensive validation rules** based on the official FA(3) information sheet from the
Ministry of Finance.

**Key features:**

- **Constitution-based**: Rules trace directly to specific sections in the official FA(3)
  information sheet
- **Comprehensive coverage**: All 8 rule groups (Podmiot, Fa Core, Adnotacje, FaWiersz, Corrective,
  Payment & Transaction, Format, Additional Business Logic)
- **Precise error reporting**: Each issue includes exact XPath location, error context, and fix
  suggestions
- **Test coverage**: 100+ test cases based on official MF examples

**Rule categories:**

1. **Podmiot Rules** (8 rules) - Entity validation, JST/GV requirements, NIP placement
2. **Fa Core Rules** (5 rules) - P_15 requirement, mutual exclusions, currency handling
3. **Adnotacje Rules** (11 rules) - All mandatory fields, selection logic for exemptions/margin
   procedures
4. **FaWiersz Rules** (4 rules) - Tax rate validation, GTU format, decimal precision
5. **Corrective Invoice Rules** (2 rules) - KSeF number consistency, reverse charge validation
6. **Payment & Transaction Rules** (6 rules) - Payment dates, bank accounts, currency pairs
7. **Format Rules** (2 rules) - Number formatting, separator validation
8. **Additional Business Logic Rules** (4 rules) - Tax calculations, bank account format, line
   number uniqueness, negative quantities

## KSeF FA(3) Key Gotchas

Common validation errors now automatically detected by our validator:

### XSD Schema Issues (detected by libxml2-wasm)

1. **Wrong field order** - XSD uses xs:sequence, order is strict
2. **Typos in element names** - `NazwaBank` instead of `NazwaBanku`
3. **Missing required elements** - Each element has specific mandatory children

### Semantic Issues (detected by our 38 rules)

1. **Missing mandatory Adnotacje fields** - P_16, P_17, P_18, P_18A, Zwolnienie,
   NoweSrodkiTransportu, P_23, PMarzy
2. **Incorrect JST/GV setup** - JST=1 requires Podmiot3 with Rola=8, GV=1 requires Podmiot3 with
   Rola=10
3. **Polish NIP in wrong field** - Should be in NIP field, not NrVatUE for proper KSeF access
4. **Wrong tax rates for foreign buyers** - Use 'np I'/'np II' for foreign entities, not 'oo'
5. **GTU format errors** - Should be `<GTU>GTU_12</GTU>`, not `<GTU_12>1</GTU_12>`
6. **Decimal precision violations** - Amounts >2 decimals, prices >8 decimals, quantities >6
   decimals
7. **Selection logic violations** - Zwolnienie, NoweSrodkiTransportu, PMarzy require exactly one
   selection
8. **Currency inconsistencies** - Foreign currency needs PLN tax conversions, WalutaUmowna cannot be
   PLN
9. **Number formatting** - No thousand separators, only dot as decimal separator

All these issues are now caught automatically with precise error locations and fix suggestions.

## Decimal Precision Requirements

Follow official FA(3) specification (§2.6) decimal precision limits:

- **General amounts** (P_11, P_13_x, P_15): up to 2 decimal places → `6000.00`, `1230.50`
- **Unit prices** (P_9A, P_9B): up to 8 decimal places → `75.12345678`
- **Quantities** (P_8B): up to 6 decimal places → `80.123456`
- **Exchange rates** (KursWaluty): up to 6 decimal places → `3.707500` (NBP precision)

## KSeF 2.0 Resources

- KSeF 1.0 (ksef.mf.gov.pl) is DEAD since Feb 1, 2026
- Aplikacja Podatnika KSeF 2.0 (production): https://ap.ksef.mf.gov.pl/
- Test environment (fake data, no legal effect): https://web2te-ksef.mf.gov.pl/
- Documentation portal: https://ksef.podatki.gov.pl/
- Schema namespace: `http://crd.gov.pl/wzor/2025/06/25/13775/`
- XSD URL: `https://crd.gov.pl/wzor/2025/06/25/13775/schemat.xsd`
- There is NO standalone XML validator in KSeF 2.0 — validation happens only on invoice submission.
  This is the gap we fill.

## Roadmap

See [README.md](./README.md#roadmap) for the current project roadmap.

### Architecture Principles

Everything should be client-side wherever possible:

- **Validation**: 100% client-side (DOMParser + semantic rules, libxml2-wasm for XSD)
- **Preview**: 100% client-side (XML parsing + HTML template rendering in browser)
- **PDF export**: client-side via browser print-to-PDF or jsPDF, NOT server-side Puppeteer
- **NBP rates**: client-side fetch to public api.nbp.pl (CORS-friendly, no proxy needed)
- **NIP lookup**: may need a thin proxy to GUS/VIES API (rate-limited, cacheable)
- **Static hosting**: Vercel free tier handles static/SSG pages well
- **No database**: localStorage for saved data, no user accounts unless absolutely needed
- **No auth**: no Clerk, no login walls. If accounts are ever added, they're optional convenience

## Claude Skills

The `skills/ksef-fa3/` directory contains a Claude Project skill for generating KSeF FA(3) XML from
invoice data (PDF, text, etc.). It covers all transaction scenarios: domestic, reverse charge
(EU/non-EU), WDT, export, VAT exemption, margin procedure.

Skill files are also packaged as `.skill` files for distribution via GitHub Releases and MCP
marketplace.

## Development

```bash
pnpm install
pnpm dev              # Next.js dev server on localhost:3000
pnpm build            # Build validator + web app
pnpm update-schemas   # Update XSD schemas from government sources (manual)
```

## Schema Maintenance

The validator uses bundled XSD schemas from the Polish Ministry of Finance to ensure offline
functionality and avoid CORS issues.

### Updating Schemas

```bash
pnpm update-schemas   # Downloads latest schemas from crd.gov.pl
```

**When to run:**

- Monthly schema checks
- Before releases
- After official KSeF specification updates

**The script will:**

- Download all 4 XSD schemas from government servers
- Compare with existing schemas and show differences
- Update bundled `schemas-data.ts` file if changes detected
- Provide summary and next steps

**Always review changes before committing** - schema updates can affect validation behavior.

## Code Style

- TypeScript strict mode
- ESM (type: "module")
- All code in English (variables, functions, comments, commits)
- Exception: FA(3) XML element names stay as-is (Podmiot1, FaWiersz, etc.)
- User-facing strings via i18n (Polish default, English and Ukrainian supported)
