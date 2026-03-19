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

- **✅ IMPLEMENTED**: `libxml2-wasm` for client-side XSD validation in the browser
- **✅ BUNDLED SCHEMAS**: All schemas downloaded and bundled locally to avoid CORS issues
- **✅ OFFLINE CAPABLE**: No network requests needed - schemas embedded in package
- **✅ OFFICIAL COMPLIANCE**: Uses exact schemas from `crd.gov.pl` (downloaded at build time)
- **✅ PERFORMANCE**: Singleton validator pattern with efficient resource reuse

### 2. Semantic Rules

Business logic checks that XSD cannot express.

**IMPORTANT: Semantic validation is being reimplemented from scratch based on the official FA(3)
information sheet. The previous implementation has been removed. See
`packages/validator/docs/fa3-information-sheet.md` for the canonical reference that will guide the
new implementation.**

## KSeF FA(3) Key Gotchas

Common validation errors to be aware of:

1. Wrong field order in elements (XSD is xs:sequence — order is strict)
2. `NazwaBank` instead of `NazwaBanku`
3. Fields with value 0 — often should be omitted entirely instead

**Note: A comprehensive list of semantic validation rules will be documented once the new
implementation is complete based on the official FA(3) information sheet.**

## Number Formatting Convention

Never add unnecessary trailing zeros:

- Amounts (P_11, P_13_x, P_15): 2 decimal places → `6000.00`
- Unit price (P_9A): as many as needed → `75.00` not `75.00000000`
- Quantity (P_8B): as many as needed → `80` not `80.000000`
- Exchange rate (KursWaluty): as many as NBP provides → `3.7075` not `3.707500`

## KSeF 2.0 Resources

- KSeF 1.0 (ksef.mf.gov.pl) is DEAD since Feb 1, 2026
- Aplikacja Podatnika KSeF 2.0 (production): https://ap.ksef.mf.gov.pl/
- Test environment (fake data, no legal effect): https://web2te-ksef.mf.gov.pl/
- Documentation portal: https://ksef.podatki.gov.pl/
- Schema namespace: `http://crd.gov.pl/wzor/2025/06/25/13775/`
- XSD URL: `https://crd.gov.pl/wzor/2025/06/25/13775/schemat.xsd`
- There is NO standalone XML validator in KSeF 2.0 — validation happens only on invoice submission.
  This is the gap we fill.

## Competitor Landscape

### Sorgera (services.sorgera.com/ksef)

Turkish SAP consultancy based in Istanbul. Enterprise-focused, English-only, credit-based pricing
(€35/1000 invoices). Targets large companies with SAP/ERP integrations. Has XML validator (currently
free, will be paid), XML→PDF converter, API, AI error assistant. Does NOT have: generator, CLI, npm
package. Does NOT serve freelancer/JDG market.

### ksefwalidator.pl

Polish, visually polished freemium validator. Appears to be vibe-coded — nice landing page but
questionable depth of validation and reliability. Client-side. Free basic validation, building
towards paid features. Targets the same "quick validator" niche we're entering. Our advantage: truly
free (no limits, no tiers), open source, CLI, npm package, deeper semantic rules, part of a bigger
toolkit (not just a validator).

### naprawksef.pl

Polish, free validator with "auto-fix" suggestions. Similar vibe-coded feel. Shows errors + repair
instructions. No registration required. Narrow scope (validator only).

### ksefu.pl

"KSeF Assistant" — offline validator. Minimal information available. Appears early-stage.

### General pattern

A wave of small, quickly-built KSeF validator sites is appearing as the April 2026 deadline
approaches. Most are single-purpose validators with limited depth, and virtually all are building
towards a paywall (freemium, credits, paid tiers). Our advantage: completely free with no limits,
open source toolkit approach (validator + preview + generator + CLI + API + skills), privacy-first
client-side processing, and near-zero server costs that make "free forever" sustainable.

## Roadmap

See [README.md](./README.md#roadmap) for the current project roadmap.

### Cost Minimization Strategy

Everything should be client-side wherever possible to keep server costs near zero:

- **Validation**: 100% client-side (DOMParser + semantic rules, libxml2-wasm for XSD)
- **Preview**: 100% client-side (XML parsing + HTML template rendering in browser)
- **PDF export**: client-side via browser print-to-PDF or jsPDF, NOT server-side Puppeteer
- **NBP rates**: client-side fetch to public api.nbp.pl (CORS-friendly, no proxy needed)
- **NIP lookup**: may need a thin proxy to GUS/VIES API (rate-limited, cacheable)
- **Static hosting**: Vercel free tier handles static/SSG pages well
- **No database**: localStorage for saved data, no user accounts unless absolutely needed
- **No auth**: no Clerk, no login walls. If accounts are ever added, they're optional convenience

The only server costs should be: Vercel hosting (free tier), domain renewal (~$25/year), and
potentially a small API proxy for NIP lookups.

### Monetization

Not a priority in early phases. Once there's meaningful traffic:

- **Sponsorships**: tasteful, single-sponsor ads like Daring Fireball / Carbon Ads style. One small
  banner, relevant to the audience (accounting tools, banking, business services). No programmatic
  ads, no tracking pixels.
- **"Powered by ksefuj" API**: if other tools want to embed our validator, that's a potential
  sponsorship/partnership channel.
- The site should always feel clean and ad-free. If ads ever appear, they should be so subtle that
  users barely notice them.

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
