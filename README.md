# ksefuj

Open source toolkit for Polish KSeF FA(3) e-invoicing.

- **100% free forever** — no limits, no signup, no hidden costs
- **Privacy-first** — everything runs locally in your browser
- **Multilingual** — Polish, English, Ukrainian

🌐 **[ksefuj.to](https://ksefuj.to)** — free online validator
📦 **[@ksefuj/validator](https://www.npmjs.com/package/@ksefuj/validator)** — npm package + CLI

## What is KSeF?

KSeF (Krajowy System e-Faktur) is Poland's mandatory e-invoicing system. Starting April 1, 2026 (February 1, 2026 for large companies), all VAT taxpayers must issue structured XML invoices through KSeF using the FA(3) schema.

## Features

- **XML Validator** — validates KSeF FA(3) invoices against XSD schema and semantic business rules
- **100% client-side** — your data never leaves your browser
- **CLI tool** — `npx @ksefuj/validator invoice.xml`
- **Claude Skills** — ready-made skills for generating e-invoices in Claude Projects
- **Developer-friendly** — TypeScript, zero runtime dependencies, ESM

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

// defaults to Polish
const result = validate(xmlString);

// or with locale selection
const result = validate(xmlString, { locale: 'en' }); // 'pl' | 'en' | 'ua'

if (!result.valid) {
  for (const error of result.errors) {
    console.error(error.message, error.path);
  }
}
```

## Repository Structure

```
ksefuj/
├── packages/
│   └── validator/       ← @ksefuj/validator (npm + CLI)
├── apps/
│   └── web/             ← ksefuj.to (Next.js)
└── skills/
    └── ksef-fa3/        ← Claude skill for invoice generation
```

## What the Validator Checks

### Semantic Rules (implemented)

- Required JST and GV fields in Podmiot2
- Correct P_12 enumeration (VAT rates: "23", "8", "5", "0", "np I", "np II", etc.)
- Reverse charge consistency (P_13_8 ↔ P_18 ↔ P_12)
- Exchange rate placement (FaWiersz/KursWaluty vs Fa/KursWalutyZ)
- Correct GTU format (`<GTU>GTU_12</GTU>`, not `<GTU_12>1</GTU_12>`)
- Adnotacje completeness
- Trailing zeros warning
- Required P_15 (total amount)

### XSD Schema Validation (in progress)

Full XSD validation in the browser using libxml2-wasm.

## Claude Skills

The `skills/` directory contains skills for Claude Projects:

- **ksef-fa3** — generates FA(3) XML invoices from input data (PDF, text, form)

Installation: download the `.skill` file from [Releases](https://github.com/ksefuj/ksefuj/releases) and add to your Claude Project.

## Development

Requires pnpm:

```bash
git clone https://github.com/ksefuj/ksefuj.git
cd ksefuj
pnpm install
pnpm dev              # runs web app on localhost:3000
pnpm build            # builds all packages
```

## Roadmap

### Phase 1: Validator ✅
- Semantic rules engine
- CLI tool
- Web app with drag & drop
- npm package

### Phase 2: Preview (upcoming)
- XML → HTML invoice visualization
- PDF export
- QR code generation

### Phase 3: Generator
- Form-based XML generation
- Auto NBP exchange rates
- Auto NIP lookup (GUS/VIES)
- REST API

## License

Apache 2.0

A permissive open source license that allows commercial use, modification, and distribution. Requires preservation of copyright and license notices.
