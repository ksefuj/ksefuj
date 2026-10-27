# ksefuj

[![CI](https://github.com/ksefuj/ksefuj/actions/workflows/ci.yml/badge.svg)](https://github.com/ksefuj/ksefuj/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@ksefuj/validator)](https://www.npmjs.com/package/@ksefuj/validator)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue)](LICENSE)

Free, open-source tools for KSeF, Poland's mandatory e-invoicing system. This repository holds the
[ksefuj.to](https://ksefuj.to) website and the [`@ksefuj/validator`](packages/validator) npm
package.

Invoice files are processed in the browser and never uploaded. No account, no usage limits. The UI
is in Polish, English and Ukrainian.

## What is KSeF?

KSeF (Krajowy System e-Faktur) is the Ministry of Finance system through which VAT taxpayers issue
structured XML invoices in the FA(3) schema: since February 1, 2026 for companies whose 2024 sales
exceeded 200 mln zł, since April 1, 2026 for everyone else. KSeF itself has no standalone validator;
an invoice is only checked when it is submitted.

## What's on ksefuj.to

- **[Validator](https://ksefuj.to/validator)**: drop one or more FA(3) XML files and get a list of
  problems, each with its location in the file and a suggested fix.
- **[PDF preview](https://ksefuj.to/podglad)**: render an invoice as a PDF visualisation, with the
  KOD I QR code when you have its KSeF number.
- **[NBP rates](https://ksefuj.to/waluty)**: the exchange rate to use on a foreign-currency invoice,
  picked from the date rules of art. 31a of the VAT Act.
- **Guides, blog, docs and FAQ**: KSeF rules explained in plain language, with sources.

## What the validator checks

1. **XSD schema**: the official FA(3) schemas from `crd.gov.pl`, bundled and run through
   [libxml2-wasm](https://github.com/jameslan/libxml2-wasm), so nothing is fetched at runtime.
2. **Ministry of Finance rules**: business rules from the official FA(3) information sheet that the
   XSD cannot express (mandatory `Adnotacje` fields, JST/GV roles in `Podmiot3`, NIP placement, tax
   rates for foreign buyers, GTU format, decimal precision, currency fields, corrective invoices).
   Each rule cites its section of the sheet.
3. **Extra checks**: things KSeF accepts but that cause trouble later: tax arithmetic (`P_14_x`,
   `P_15`), the NBP rate in `KursWaluty`, Polish bank account format, duplicate line numbers,
   negative quantities outside corrective invoices, and the strict XML rules of KSeF API 2.4.0
   (processing instructions, discouraged Unicode characters, BOM, non-UTF-8 encoding).

The full list of rules is in
[`packages/validator/docs/fa3-information-sheet.md`](packages/validator/docs/fa3-information-sheet.md)
and [`packages/validator/src/semantic.ts`](packages/validator/src/semantic.ts).

## Command line and npm

```bash
npx @ksefuj/validator invoice.xml
```

```typescript
import { validate } from "@ksefuj/validator";

const result = await validate(xmlString);

for (const issue of result.issues) {
  console.log(issue.code.severity, issue.code.code, issue.message);
}
```

Options, the issue format and NBP rate checking are documented in the
[package README](packages/validator/README.md).

## Repository layout

```
ksefuj/
├── apps/web/            ← ksefuj.to (Next.js, App Router, next-intl)
│   └── content/         ← blog posts, guides and docs (MDX, PL/EN/UK)
├── packages/validator/  ← @ksefuj/validator (npm + CLI)
├── packages/pdf/        ← @ksefuj/pdf, PDF visualisation (private, used by the web app)
├── docs/knowledge-base/ ← extracts of official MF documents the rules and content rely on
├── test-fixtures/       ← official MF example invoices and error cases
└── scripts/             ← schema updates, content checks, screenshots
```

## Development

Requires Node.js 20+ and pnpm 9.

```bash
git clone https://github.com/ksefuj/ksefuj.git
cd ksefuj
pnpm install
pnpm dev              # web app on localhost:3000
pnpm build            # validator, pdf, then the web app
pnpm test             # tests in all packages
pnpm lint && pnpm typecheck
```

The XSD schemas are bundled in the validator. `pnpm update-schemas` downloads the current ones from
`crd.gov.pl`, shows what changed and regenerates the bundle. Review the diff before committing:
schema changes can change validation results.

See [CONTRIBUTING.md](CONTRIBUTING.md) for commit conventions and the PR process.

## Roadmap

Shipped: the validator (web, CLI, npm), PDF preview with KOD I, NBP rate calculator, guides and blog
in three languages.

Next:

- [ ] QR codes for invoices issued outside KSeF (offline mode, KOD II)
- [ ] One-click fixes for common errors
- [ ] Invoice form that produces FA(3) XML
- [ ] Buyer lookup by NIP (GUS/VIES)

## Related repositories

- [ksefuj/skills](https://github.com/ksefuj/skills): Claude skills that generate FA(3) invoices and
  corrective invoices
- [ksefuj/awesome-ksef](https://github.com/ksefuj/awesome-ksef): a curated list of KSeF tools and
  resources

## License

[Apache 2.0](LICENSE). Third-party licences are listed in
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
