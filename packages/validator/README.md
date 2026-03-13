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
  locale: "en", // 'pl' | 'en' | 'ua'
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

Catches common errors that XSD cannot express:

- Required JST/GV fields in Podmiot2
- Correct P_12 VAT rate enumerations
- Reverse charge consistency
- Exchange rate placement rules
- GTU format validation
- And more...

## License

Apache 2.0
