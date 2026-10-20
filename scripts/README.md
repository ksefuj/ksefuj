# Scripts

This directory contains utility scripts for maintaining the KSeF validator.

## update-schemas.ts

Updates the XSD schemas from official Polish Ministry of Finance sources.

### Purpose

The KSeF validator uses bundled XSD schemas to avoid CORS issues and ensure offline functionality.
This script downloads the latest schemas from the government servers and updates our local bundle.

### Usage

```bash
# From project root
pnpm update-schemas

# Or directly
tsx scripts/update-schemas.ts
```

### What it does

1. **Downloads** all 4 XSD schemas from `crd.gov.pl`
2. **Compares** with existing schemas and shows change summary (size/line count)
3. **Updates** schema files if changes are detected
4. **Regenerates** `schemas-data.ts` with embedded schemas
5. **Reports** summary of changes and bundle size

### When to run

- **Monthly** - Check for schema updates from Ministry of Finance
- **Before releases** - Ensure latest compliance before publishing
- **When KSeF spec changes** - After official announcements about schema updates

### Output

The script will:

- ✅ Show download progress and file sizes
- 📊 Report whether each schema changed
- 📝 Regenerate the TypeScript bundle file
- 📋 Provide summary and next steps

### Example output

```
🔄 KSeF Schema Update Tool
==========================

📥 Downloading main schema...
   https://crd.gov.pl/wzor/2025/06/25/13775/schemat.xsd
   ✅ Downloaded 178KB
   📊 Modified (+1024 bytes, +15 lines)
   💾 Updated schemat.xsd

📋 Update Summary
=================
✅ Schemas updated successfully!

📌 Next steps:
   1. Review the changes with git diff
   2. Test the validator: cd packages/validator && pnpm build && pnpm test
   3. Commit the updated schemas if tests pass

📦 Total bundle size: 260KB
```

### Error handling

- **Network failures** - Falls back to existing files if download fails
- **Invalid content** - Validates that responses are proper XML
- **Missing dependencies** - Creates directories as needed

### Files updated

- `packages/validator/src/schemas/*.xsd` - Individual schema files (source of truth, not included in
  npm package)
- `packages/validator/src/schemas/schemas-data.ts` - TypeScript bundle (used at runtime, compiled to
  JS)

### Safety

- **No automatic commits** - Always requires manual review
- **Preserves existing files** - Falls back on download failures
- **Validates content** - Ensures downloaded files are valid XML
- **Reports changes** - Shows size and line count differences

### Schema Storage Architecture

**Development:**

- Individual `.xsd` files serve as the source of truth
- `schemas-data.ts` is generated from these files
- Both are kept in version control

**Runtime:**

- Only `schemas-data.js` (compiled from `.ts`) is used
- XSD files are NOT loaded or accessed by the validator
- Everything runs from the bundled TypeScript constants

**npm Package:**

- `.xsd` files are excluded to reduce package size (~442KB saved)
- Source `.ts` files are excluded (~318KB saved)
- Only compiled `.js` and `.d.ts` files are included
- Package size: ~100KB compressed (vs ~500KB+ with duplicates)

## capture-ksef-screenshots.ts

Captures the KSeF Aplikacja Podatnika screenshots used in the guide "Jak odebrać fakturę z KSeF".

### Purpose

The guide shows the official purchase-invoice screens. This script reproduces them so they can be
refreshed whenever MF changes the UI.

### Usage

```bash
# From project root (first run only: download the browser)
pnpm exec playwright install chromium

pnpm screenshots

# Watch the browser while debugging
pnpm screenshots -- --headed
```

### What it does

1. **Logs in** to the KSeF **test** environment (`ap-test.ksef.mf.gov.pl`) as a fake seller with a
   self-signed test certificate
2. **Issues** two fake FA(3) invoices to a fake buyer ("Wczytaj fakturę", then "Wystaw fakturę")
3. **Logs in as the buyer** and captures the menu, the "Faktury zakupowe (Podmiot2)" search, the
   list, the "Pobierz" dropdown and the invoice preview (1280x800 viewport, 2x scale)
4. **Writes** WebP files to `apps/web/public/screenshots/ksef-ap/` and merges the entries into
   `apps/web/src/data/screenshots.json` (width, height, capture date, app version)

### Notes

- **Test environment only, fake data only** - the NIPs and names in the script are fictional; the
  test environment is not isolated between users, so never use real data
- **Not run in CI** - run it manually and review the images before committing
- **When MF changes the UI** - rerun, and if a step times out fix the Polish label or selector in
  the script (they are `getByRole`/`getByText` lookups at the top of each step), then compare the
  new images with the old ones
- **Reruns** - an identical invoice on the same day is reported by KSeF as a duplicate and reused
