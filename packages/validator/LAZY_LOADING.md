# Lazy Loading Architecture for @ksefuj/validator

## Problem

The libxml2-wasm library uses top-level await, which causes:

1. Slow initial page loads when the validator package is imported
2. Webpack warnings about async/await in environments that might not support it
3. WASM being loaded even when only importing types

## Solution Implemented

We've implemented a multi-layered lazy loading strategy:

### 1. Internal Lazy Loading (✅ Implemented)

The validator package now lazily loads libxml2-wasm internally:

```typescript
// packages/validator/src/xsd.ts and validate.ts
let libxml2Module: any = null;

async function getLibxml2Module() {
  if (!libxml2Module) {
    // Only loads when validation is actually performed
    libxml2Module = await import("libxml2-wasm");
  }
  return libxml2Module;
}
```

### 2. Separate Export Paths (✅ Implemented)

The package provides three export paths:

```json
// packages/validator/package.json
"exports": {
  ".": {
    // Main export - validation function (backward compatible)
    "import": "./dist/index.js",
    "types": "./dist/index.d.ts"
  },
  "./types": {
    // Types-only export - no runtime code
    "import": "./dist/types-export.js",
    "types": "./dist/types-export.d.ts"
  },
  "./validate": {
    // Explicit validation function export
    "import": "./dist/index.js",
    "types": "./dist/index.d.ts"
  }
}
```

### 3. Client Usage Pattern

```typescript
// Import types - no WASM loading
import type { ValidationResult } from "@ksefuj/validator/types";

// Or for backward compatibility
import type { ValidationResult } from "@ksefuj/validator";

// Lazy load validation function when needed
const { validate } = await import("@ksefuj/validator/validate");
// Or from main export
const { validate } = await import("@ksefuj/validator");
```

## Benefits

1. **Zero WASM loading for type imports** - Types can be imported without any runtime overhead
2. **On-demand WASM loading** - WASM only loads when validation is actually performed
3. **Improved initial page load** - No WASM parsing/compilation on page load
4. **Better code splitting** - Validation code can be in a separate chunk

## Known Issue: Webpack Module Analysis

Despite the separation, webpack still analyzes all export paths during build time, leading to
warnings about top-level await in libxml2-wasm. This is a build-time warning only and doesn't affect
runtime performance.

### Why This Happens

Webpack's module graph analysis is comprehensive - it analyzes all possible import paths to:

- Generate proper chunks
- Optimize module loading
- Provide tree shaking

Even though we're only importing from the main export (types), webpack still analyzes the
`/validate` export path because it's defined in package.json.

### Workarounds

1. **Use dynamic imports in the client** (recommended):

   ```typescript
   // Don't import at module level
   // const { validate } = await import('@ksefuj/validator/validate');

   // Import only when needed inside a function
   async function validateFile(xml: string) {
     const { validate } = await import("@ksefuj/validator/validate");
     return validate(xml);
   }
   ```

2. **Ignore the warning** - It's only a build-time warning and doesn't affect functionality

3. **Use webpack config to suppress the warning** (if needed):
   ```javascript
   // next.config.js
   module.exports = {
     webpack: (config) => {
       config.ignoreWarnings = [{ module: /libxml2-wasm/ }];
       return config;
     },
   };
   ```

## Testing

To verify lazy loading is working:

1. Import only types and check that libxml2-wasm is not loaded
2. Perform a validation and verify WASM loads on first use
3. Check that subsequent validations reuse the loaded module

## Future Improvements

1. Consider using a build tool that better handles lazy loading
2. Investigate if we can prevent webpack from analyzing unused export paths
3. Consider providing a separate types-only package (`@ksefuj/validator-types`)
