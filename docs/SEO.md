# SEO Guidelines for ksefuj.to

This document outlines the SEO requirements and best practices for the ksefuj.to website.

## Automated SEO Validation

We have automated SEO validation to ensure consistent implementation across all pages:

```bash
# Run SEO validation
pnpm validate:seo
```

This validation is run:

- During pre-commit hooks (blocks commits with SEO issues)
- In CI/CD pipeline (blocks PRs with SEO issues)
- Manually via the command above

## Core SEO Requirements

### 1. Canonical URLs

Every page MUST have a canonical URL that:

- Uses the full domain (e.g., `https://ksefuj.to/blog`)
- Handles locale prefixes correctly:
  - Polish (default): NO prefix (`/`, `/blog`, etc.)
  - English: `/en` prefix (`/en`, `/en/blog`, etc.)
  - Ukrainian: `/uk` prefix (`/uk`, `/uk/blog`, etc.)

**Implementation:**

```typescript
// In page.tsx generateMetadata function
const canonical = locale === "pl" ? "/path" : `/${locale}/path`;

return {
  alternates: {
    canonical,
    // ...
  },
};
```

### 2. Hreflang Alternates

All pages with multiple language versions MUST include hreflang alternates:

```typescript
alternates: {
  canonical,
  languages: {
    "pl": "/path",
    "en": "/en/path",
    "uk": "/uk/path",
    "x-default": "/path", // Points to Polish version
  }
}
```

### 3. Content Files (MDX)

**DO NOT** include hardcoded canonical URLs in MDX frontmatter:

```yaml
# ❌ WRONG - Remove this
seo:
  canonical: "/blog/post-slug"

# ✅ CORRECT - Let the system generate it
# (no seo.canonical field)
```

### 4. Meta Descriptions

- Keep under 160 characters (Google's typical display limit)
- Required for all pages and content
- Should be unique and descriptive

### 5. Blog Posts

Blog posts MUST include translations mapping for proper hreflang generation:

```yaml
---
title: "Post Title"
description: "Description under 160 chars"
translations:
  en: "english-slug"
  uk: "ukrainian-slug"
---
```

## Page-Specific Requirements

### Static Pages

All static pages (`page.tsx`) must have:

1. `generateMetadata` function
2. Canonical URL with locale handling
3. Hreflang alternates for all language versions

### Dynamic Routes

Dynamic routes (`[slug]/page.tsx`) should:

1. Generate canonical URLs based on content
2. Use translations from frontmatter for hreflang
3. Not hardcode locale logic if content determines it

## SEO Files

### Required Files

1. **sitemap.ts** - Generates XML sitemap
   - Located at: `apps/web/src/app/sitemap.ts`
   - Updates automatically based on content

2. **robots.ts** - Configures robots.txt
   - Located at: `apps/web/src/app/robots.ts`
   - Allows all crawlers by default

## Common Issues and Fixes

### Issue: "Alternative page with proper canonical tag"

**Cause:** Pages have missing or incorrect canonical URLs

**Fix:**

1. Ensure all pages have canonical URLs in `generateMetadata`
2. Remove hardcoded canonical URLs from MDX files
3. Use full domain URLs

### Issue: Pages not indexed

**Cause:** Missing or conflicting SEO metadata

**Fix:**

1. Run `pnpm validate:seo` to identify issues
2. Fix all reported problems
3. Ensure canonical and hreflang tags are consistent

## Testing SEO

### Local Testing

```bash
# Start dev server
pnpm dev

# Check canonical tags
curl -s http://localhost:3000/blog | grep -E 'rel="(canonical|alternate)"'
```

### Validation

```bash
# Run SEO validation
pnpm validate:seo

# This checks:
# - No hardcoded canonical URLs in MDX
# - All pages have generateMetadata
# - Proper locale handling for canonicals
# - Hreflang alternates present
# - Meta description length
# - Required SEO files exist
```

## Google Search Console

After deployment, verify in Google Search Console:

1. Submit sitemap: `https://ksefuj.to/sitemap.xml`
2. Check Coverage report for indexing issues
3. Monitor Core Web Vitals
4. Review Mobile Usability

## Best Practices

1. **Never hardcode canonical URLs** in content files
2. **Always include hreflang** for multi-language content
3. **Keep descriptions concise** (under 160 characters)
4. **Test before committing** - pre-commit hooks will catch issues
5. **Monitor Search Console** regularly for new issues

## Resources

- [Google Search Central Documentation](https://developers.google.com/search)
- [Canonical URLs Guide](https://developers.google.com/search/docs/crawling-indexing/canonicalization)
- [Hreflang Guide](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Meta Description Best Practices](https://developers.google.com/search/docs/appearance/snippet)
