# @ksefuj/validator

KSeF FA(3) XML validator with full XSD schema validation and semantic business rules.

## Features

- **Full XSD validation** using libxml2-wasm (WebAssembly)
- **Semantic business rules** that catch errors XSD can't express
- **Works everywhere** - Node.js, browser, CLI
- **Zero network requests** - bundled schemas for offline use
- **TypeScript support** with full type definitions

## Installation

```bash
npm install @ksefuj/validator
# or
pnpm add @ksefuj/validator
# or
yarn add @ksefuj/validator
```

## Usage

```typescript
import { validate } from "@ksefuj/validator";

const result = await validate(xmlString, {
  locale: "en", // 'pl' (default) | 'en' | 'uk'
  enableXsdValidation: true, // default: true
  enableSemanticValidation: true, // default: true
});

if (!result.valid) {
  // Separate XSD and semantic errors
  const xsdErrors = result.errors.filter((e) => e.source === "xsd");
  const semanticErrors = result.errors.filter((e) => e.source === "semantic");

  for (const error of result.errors) {
    console.error(`${error.source}: ${error.message}`, error.path);
  }
}
```

## CLI Usage

```bash
npx @ksefuj/validator invoice.xml
```

## Architecture

### Schema Management

The validator uses bundled XSD schemas from the Polish Ministry of Finance to ensure:

- **No CORS issues** - schemas are embedded, not fetched
- **Offline capability** - works without internet connection
- **Consistent validation** - always uses the same schema version

#### How schemas are organized:

```
src/schemas/
├── *.xsd                    # Source XSD files (development only)
├── schemas-data.ts          # Generated bundle with all schemas
└── bundle.ts                # Bundle loader
```

#### Development vs Runtime:

- **Development**: Individual `.xsd` files are the source of truth, downloaded from government
  servers
- **Build time**: TypeScript compiles `schemas-data.ts` → `schemas-data.js`
- **Runtime**: Only `schemas-data.js` is used - XSD files are never accessed
- **npm package**: Excludes `.xsd` and `.ts` files to minimize size (~760KB saved)

#### Updating schemas:

From the project root:

```bash
pnpm update-schemas
```

This downloads the latest schemas from crd.gov.pl and regenerates the bundle.

### Package Optimization

The published npm package is optimized to exclude redundant files:

| Files          | Purpose            | Included in npm?    |
| -------------- | ------------------ | ------------------- |
| `*.xsd`        | Source schemas     | ❌ No (saved 442KB) |
| `*.ts` in dist | TypeScript sources | ❌ No (saved 318KB) |
| `*.js`         | Compiled code      | ✅ Yes              |
| `*.d.ts`       | Type definitions   | ✅ Yes              |

**Result**: Package size reduced from ~1.4MB to ~100KB (compressed).

## Validation Layers

### 1. XSD Schema Validation

Full compliance with official Ministry of Finance FA(3) schemas using libxml2-wasm.

### 2. Semantic Business Rules

**38 comprehensive validation rules** based on the official FA(3) information sheet from the
Ministry of Finance.

#### Rule Categories

1. **Podmiot Rules** (8 rules) — Entity validation, JST/GV requirements, NIP placement
2. **Fa Core Rules** (5 rules) — P_15 requirement, mutual exclusions, currency handling
3. **Adnotacje Rules** (11 rules) — All mandatory fields, selection logic for exemptions/margin
   procedures
4. **FaWiersz Rules** (4 rules) — Tax rate validation, GTU format, decimal precision
5. **Corrective Invoice Rules** (2 rules) — KSeF number consistency, reverse charge validation
6. **Payment & Transaction Rules** (6 rules) — Payment dates, bank accounts, currency pairs
7. **Format Rules** (2 rules) — Number formatting, separator validation

#### Key Validations

- **Constitution-based**: Each rule references specific sections from the official FA(3) information
  sheet
- **Precise error reporting**: Exact XPath locations, error context, and fix suggestions
- **Common gotchas**: NIP field placement, GTU format, decimal precision, selection logic
- **Business logic**: Currency conversions, tax rate consistency, entity relationships

## Testing

Comprehensive test suite ensuring 100% compliance with government standards:

### Official MF Examples

**All 26 official KSeF FA(3) examples** from the Polish Ministry of Finance pass validation:

- Standard VAT invoices
- Correction invoices (KOR) - both universal and difference methods
- Advance invoices (ZAL) and settlements (ROZ)
- Simplified invoices (≤450 PLN)
- WDT (intra-community) and export invoices
- VAT margin procedures
- Foreign currency invoices
- Invoices with attachments and edge cases

### Semantic Rule Testing

**100+ targeted test cases** for each semantic validation rule:

- Positive tests (valid cases that should pass)
- Negative tests (invalid cases with specific error expectations)
- Edge cases and boundary conditions
- Constitution-based test scenarios from FA(3) information sheet

### Test Framework

- **Vitest** for fast, modern testing
- **XSD + Semantic dual validation** for each test case
- **Detailed error assertions** with exact error codes and locations
- **CI/CD integration** ensuring all tests pass before deployment

All tests guarantee compatibility with the KSeF 2.0 system and adherence to Ministry of Finance
specifications.

## License

Apache 2.0
