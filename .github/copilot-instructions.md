# Copilot Instructions — ksefuj

## Project

**ksefuj** — open source toolkit for Polish KSeF (Krajowy System e-Faktur) e-invoicing. Monorepo
(pnpm workspaces): validator npm package, Next.js web app (ksefuj.to), Claude skills.

KSeF is Poland's mandatory e-invoicing system. All VAT taxpayers must issue structured XML invoices
(schema FA(3)) through KSeF — mandatory since Feb 1, 2026 for large companies, April 1, 2026 for
everyone else. The XML schema is published by the Ministry of Finance (MF).

The canonical reference for all FA(3) rules is `packages/validator/docs/fa3-information-sheet.md`.

---

## Agent Team

This repo uses two specialized agents. Always invoke them for their domains — do not substitute
general judgment for domain-specific review.

### `constitutional-judge` — Factual Accuracy

**Invoke when a PR touches:**

- `packages/validator/src/semantic.ts` or any validation rule logic
- `skills/ksef-fa3/` — XML examples and generation guidance must be spec-correct
- Any content making KSeF/MF/tax claims: blog posts, guides, FAQ, landing copy about deadlines,
  penalties, or invoice requirements
- Error messages that describe a legal or schema requirement

**What it does:** Verifies every claim against the official FA(3) information sheet and MF corpus.
Issues verdicts: ✅ CONFIRMED / ⚠️ UNVERIFIABLE / ❌ CONTRADICTED with severity 🔴 BLOCK / 🟡 FLAG /
🟢 CONFIRMED.

**What it does NOT do:** Write code, write copy, give tax advice, make code changes.

### `copywriter` — Copy and Content

**Invoke when a PR touches:**

- `apps/web/src/i18n/messages/*.json` — locale files (PL/EN/UK must always be updated together)
- Landing page components, feature cards, hero copy
- Error message text (first line must pass the Ania test — plain language, no XML element names)
- Blog posts, guides, FAQ entries, or any MDX content

**What it does:** Ensures copy targets all three audiences (Ania = freelancer, Pani Krystyna =
accountant, Marek = developer), follows brand voice, and maintains locale parity across PL/EN/UK.

**What it does NOT do:** Verify factual KSeF claims — that's the Constitutional Judge's job.

### Team Collaboration Rule

```
Copywriter writes → Constitutional Judge verifies (mandatory for KSeF/legal claims)
Dev implements validator rule → Constitutional Judge verifies rule matches FA(3) spec
```

The Constitutional Judge is the last line of defense before merge. A 🔴 BLOCK from the Judge must be
resolved before the PR can merge.

---

## Architecture

```
ksefuj/
├── packages/validator/     ← @ksefuj/validator (npm + CLI)
│   ├── src/validate.ts     ← main validate() function
│   ├── src/semantic.ts     ← 42 semantic business rule checks
│   ├── src/cli.ts          ← CLI entry point
│   └── src/schemas/        ← bundled FA(3) XSD schemas
│   └── docs/
│       └── fa3-information-sheet.md  ← THE constitutional reference
├── apps/web/               ← Next.js 15 app (ksefuj.to)
│   └── src/i18n/messages/  ← pl.json, en.json, uk.json
└── skills/ksef-fa3/        ← Claude skill for XML generation
```

**Privacy-first:** everything runs client-side. XML data never leaves the browser.

**Two validation layers:**

1. XSD — structural compliance via libxml2-wasm + bundled schemas
2. Semantic rules — 42 business logic checks in `semantic.ts`, each tracing to a §section in the
   FA(3) information sheet

---

## Code Conventions

- **Package manager:** pnpm only. Never `npm install` or `yarn`.
- **Language:** TypeScript strict mode, ESM (`"type": "module"`)
- **Code always in English.** One exception: FA(3) XML element names stay as-is (`Podmiot1`,
  `FaWiersz`, `NrWierszaFa`, etc.) — they match the official schema.
- **User-facing strings:** always in i18n locale files, never hardcoded. Polish is canonical.
- **Commit style:** conventional commits — scopes: `validator`, `web`, `i18n`, `semantic`, `xsd`,
  `deps`, `ci`, `config`, `skill`
- **Never commit a planning or status message.** Commits like `"Initial plan"`, `"Starting work"`,
  `"WIP"`, or any message that describes intent rather than a code change are forbidden. Every
  commit must describe an actual code change in the form `type(scope): description`. If you have
  nothing to commit yet, do not commit.

## PR Review Checklist (by area)

| Area                                 | Agent(s) to invoke                                     |
| ------------------------------------ | ------------------------------------------------------ |
| `packages/validator/src/semantic.ts` | `constitutional-judge`                                 |
| `skills/ksef-fa3/`                   | `constitutional-judge`                                 |
| `apps/web/src/i18n/messages/`        | `copywriter`                                           |
| Landing page / UI copy               | `copywriter` + `constitutional-judge` (if KSeF claims) |
| Blog / MDX content                   | `copywriter` + `constitutional-judge` (always)         |
| XSD schemas, `src/schemas/`          | `constitutional-judge`                                 |
| Build, CI, deps, config              | Standard review — no agent needed                      |
