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
2. **Compares** with existing schemas and shows differences
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
   http://crd.gov.pl/wzor/2025/06/25/13775/schemat.xsd
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
- **Shows diffs** - Reports exactly what changed

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
