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
│   └── src/app/
│       ├── page.tsx        ← landing page
│       └── validator.tsx   ← drag & drop validator component
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

### Multilingual (PL + EN + UA)

- **UI**: Polish is the default language. English and Ukrainian must be fully supported. Use i18n
  from the start — do not hardcode Polish strings in components. Ukrainian support reflects the
  large Ukrainian community in Poland, many of whom run sole proprietorships (JDG) and need KSeF
  tools.
- **Error messages from validator**: Available in PL, EN, UA. Polish is default.
- **Blog/SEO content**: Polish-first (this is the SEO target), English and Ukrainian versions are
  nice-to-have.
- **Code**: Always in English. Variable names, function names, comments, commit messages — all
  English. The only exceptions are direct references to FA(3) XML element names that are inherently
  Polish (e.g., `Podmiot1`, `FaWiersz`, `Adnotacje`, `NrWierszaFa`). These should be used as-is
  since they match the XML schema.

## Tech Stack

- **Package manager**: pnpm (workspaces)
- **Web**: Next.js 15 (App Router) + Tailwind CSS v4 + TypeScript
- **Validator**: Pure TypeScript, zero runtime dependencies for browser use
- **Deployment**: Vercel (free tier)

## Validation Architecture

Two layers:

### 1. XSD Schema Validation

Full XML validation against the official FA(3) XSD schema from Ministry of Finance.

- **TODO**: Integrate `libxml2-wasm` for client-side XSD validation in the browser
- The XSD (`packages/validator/src/schemas/fa3.xsd`) imports an external schema
  `StrukturyDanych_v10-0E.xsd` from `crd.gov.pl` — this dependency needs to be bundled locally
- In Node/CLI context, can shell out to `xmllint` as fallback

### 2. Semantic Rules

Business logic checks that XSD cannot express. Already implemented in `semantic.ts`:

- `PODMIOT2_JST_GV` — JST and GV elements required in Podmiot2
- `P12_ENUMERATION` — P_12 must be valid tax rate ("23", "np I", etc.)
- `REVERSE_CHARGE_CONSISTENCY` — P_13_8 requires P_18=1 and P_12="np I"
- `KURS_WALUTY_PLACEMENT` — exchange rate goes in FaWiersz/KursWaluty, not Fa/KursWalutyZ (except
  for advance invoices)
- `GTU_FORMAT` — must be `<GTU>GTU_12</GTU>`, not `<GTU_12>1</GTU_12>`
- `TRAILING_ZEROS` — warn about unnecessary trailing zeros in amounts
- `P15_REQUIRED` — P_15 (total amount) is mandatory
- `ADNOTACJE_COMPLETENESS` — all Adnotacje sub-elements required

## KSeF FA(3) Key Gotchas

These are the most common validation errors. The semantic validator catches them, and error messages
should explain how to fix them:

1. Missing JST/GV in Podmiot2 → add `<JST>2</JST><GV>2</GV>`
2. `KursWalutyZ` in Fa for non-advance invoices → move to FaWiersz/KursWaluty
3. `P_12 = "NP"` instead of `"np I"` or `"np II"` (with space!)
4. `<GTU_12>1</GTU_12>` instead of `<GTU>GTU_12</GTU>`
5. Wrong field order in FaWiersz (XSD is xs:sequence — order is strict)
6. `NazwaBank` instead of `NazwaBanku`
7. P_13_x fields with value 0 — omit entirely instead
8. Incomplete Adnotacje structure

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

### Phase 1: Validator (current)

- [x] Semantic rules engine
- [x] CLI scaffold
- [x] Next.js web app with drag & drop
- [ ] libxml2-wasm integration for full XSD validation in browser
- [ ] i18n setup (PL + EN + UA)
- [ ] pnpm publish @ksefuj/validator
- [ ] Deploy to Vercel on ksefuj.to
- [ ] First blog posts (SEO)

### Phase 2: Preview

- [ ] XML → HTML invoice visualization
- [ ] MF-official template
- [ ] Minimal template
- [ ] PDF export (client-side via browser print / jsPDF)
- [ ] QR code generation (required for invoices sent outside KSeF)
- [ ] Custom branding templates

### Phase 3: Generator

- [ ] XML generator from form input
- [ ] Auto NBP exchange rate lookup
- [ ] Auto NIP lookup (GUS/VIES API)
- [ ] REST API endpoints (/api/v1/validate, /api/v1/preview, /api/v1/generate)
- [ ] Saved contractors / invoice templates (localStorage or optional account)

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
```

## Code Style

- TypeScript strict mode
- ESM (type: "module")
- All code in English (variables, functions, comments, commits)
- Exception: FA(3) XML element names stay as-is (Podmiot1, FaWiersz, etc.)
- User-facing strings via i18n (Polish default, English and Ukrainian supported)
