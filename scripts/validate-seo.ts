#!/usr/bin/env tsx

/**
 * SEO Validation Script
 *
 * Validates that all pages have proper SEO metadata:
 * - Canonical URLs with full domain
 * - Hreflang alternates for all language versions
 * - No hardcoded relative canonical URLs in content files
 * - Proper meta descriptions
 *
 * Run: pnpm validate:seo
 */

/* eslint-disable no-console */
import { readdirSync, readFileSync, statSync } from "fs";
import { join, relative } from "path";

interface ValidationError {
  file: string;
  errors: string[];
}

const errors: ValidationError[] = [];

function addError(file: string, error: string) {
  const existing = errors.find((e) => e.file === file);
  if (existing) {
    existing.errors.push(error);
  } else {
    errors.push({ file, errors: [error] });
  }
}

// Get all files matching a pattern
function getFiles(dir: string, pattern: RegExp): string[] {
  const files: string[] = [];

  function walk(currentDir: string) {
    const entries = readdirSync(currentDir);
    for (const entry of entries) {
      const fullPath = join(currentDir, entry);
      const stat = statSync(fullPath);

      if (stat.isDirectory() && !entry.includes("node_modules") && !entry.startsWith(".")) {
        walk(fullPath);
      } else if (stat.isFile() && pattern.test(fullPath)) {
        files.push(fullPath);
      }
    }
  }

  walk(dir);
  return files;
}

// Parse frontmatter manually (simple version for our needs)
function parseFrontmatter(content: string): Record<string, unknown> {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    return {};
  }

  const frontmatterText = match[1];
  const data: Record<string, unknown> = {};

  // Simple YAML parsing for our specific needs
  const lines = frontmatterText.split("\n");
  let currentKey = "";

  for (const line of lines) {
    const indent = line.search(/\S/);
    if (indent === -1) {
      continue;
    } // Skip empty lines

    if (indent === 0) {
      // Top-level key
      const [key, ...valueParts] = line.split(":").map((s) => s.trim());
      currentKey = key;
      const value = valueParts.join(":").trim();

      if (value && !value.startsWith('"') && !value.startsWith("'")) {
        data[key] = value;
      } else if (value) {
        data[key] = value.replace(/^["']|["']$/g, "");
      }
    } else if (currentKey === "seo" && line.includes("canonical:")) {
      // Look for seo.canonical specifically
      if (!data.seo) {
        data.seo = {} as Record<string, unknown>;
      }
      const value = line
        .split(":")[1]
        .trim()
        .replace(/^["']|["']$/g, "");
      (data.seo as Record<string, unknown>).canonical = value;
    } else if (currentKey === "translations" && line.includes(":")) {
      // Look for translations
      if (!data.translations) {
        data.translations = {} as Record<string, unknown>;
      }
      const [locale, slug] = line
        .trim()
        .split(":")
        .map((s) => s.trim());
      (data.translations as Record<string, unknown>)[locale] = slug.replace(/^["']|["']$/g, "");
    }
  }

  return data;
}

// Check MDX files for hardcoded canonical URLs
function validateContentFiles() {
  console.log("🔍 Checking content files for SEO issues...\n");

  const contentFiles = getFiles("apps/web/content", /\.mdx$/);

  for (const file of contentFiles) {
    const content = readFileSync(file, "utf-8");
    const frontmatter = parseFrontmatter(content);
    const relPath = relative(process.cwd(), file);

    // Check for hardcoded canonical URLs
    const seo = frontmatter.seo as Record<string, unknown> | undefined;
    if (seo?.canonical) {
      const canonical = seo.canonical as string;

      // Canonical should not be present (let system generate it)
      addError(
        relPath,
        `Hardcoded canonical URL found: "${canonical}". Remove it to let the system generate proper URLs.`,
      );

      // If it exists, check if it's a full URL
      if (!canonical.startsWith("http")) {
        addError(
          relPath,
          `Canonical URL is relative: "${canonical}". Should be removed or be a full URL.`,
        );
      }
    }

    // Check for missing translations mapping (for blog posts)
    if (file.includes("/blog/") && !file.includes("/uk/")) {
      if (!frontmatter.translations) {
        addError(relPath, "Blog post missing translations mapping for hreflang alternates");
      }
    }

    // Check for missing required frontmatter
    if (!frontmatter.title) {
      addError(relPath, "Missing title in frontmatter");
    }

    if (!frontmatter.description) {
      addError(relPath, "Missing description in frontmatter");
    }

    // Check description length (Google typically shows 150-160 chars)
    if (
      frontmatter.description &&
      typeof frontmatter.description === "string" &&
      frontmatter.description.length > 160
    ) {
      addError(
        relPath,
        `Description too long (${frontmatter.description.length} chars, recommended max 160)`,
      );
    }
  }
}

// Check page components for proper metadata generation
function validatePageComponents() {
  console.log("🔍 Checking page components for SEO metadata...\n");

  const pageFiles = getFiles("apps/web/src/app", /page\.tsx$/);

  for (const file of pageFiles) {
    const content = readFileSync(file, "utf-8");
    const relPath = relative(process.cwd(), file);

    // Check if generateMetadata function exists
    if (!content.includes("generateMetadata")) {
      // Some pages might not need it (like dynamic routes)
      if (!file.includes("[slug]")) {
        addError(relPath, "Missing generateMetadata function");
      }
      continue;
    }

    // Check for canonical URL implementation
    if (!content.includes("canonical")) {
      addError(relPath, "generateMetadata doesn't set canonical URL");
    }

    // Check for alternates/languages (hreflang)
    if (!content.includes("alternates") && !file.includes("[slug]")) {
      addError(relPath, "generateMetadata doesn't set hreflang alternates");
    }

    // Check that canonical URLs use proper locale logic
    if (content.includes("canonical:") && !content.includes('locale === "pl"')) {
      if (!file.includes("[slug]")) {
        addError(
          relPath,
          "Canonical URL doesn't properly handle locale prefix (Polish should have no prefix)",
        );
      }
    }
  }
}

// Check for SEO-related files
function checkSEOFiles() {
  console.log("🔍 Checking SEO-related files...\n");

  // Check for sitemap
  try {
    readFileSync("apps/web/src/app/sitemap.ts", "utf-8");
    console.log("✅ sitemap.ts found");
  } catch {
    addError("apps/web/src/app/sitemap.ts", "Missing sitemap.ts configuration");
  }

  // Check for robots.txt
  try {
    readFileSync("apps/web/src/app/robots.ts", "utf-8");
    console.log("✅ robots.ts found");
  } catch {
    addError("apps/web/src/app/robots.ts", "Missing robots.ts configuration");
  }
}

// Main validation
function main() {
  console.log("🚀 Starting SEO validation...\n");
  console.log(`${"=".repeat(60)}\n`);

  validateContentFiles();
  validatePageComponents();
  checkSEOFiles();

  // Report results
  console.log(`\n${"=".repeat(60)}`);

  if (errors.length === 0) {
    console.log("\n✅ All SEO checks passed!\n");
    process.exit(0);
  } else {
    console.log(`\n❌ Found ${errors.length} file(s) with SEO issues:\n`);

    for (const { file, errors: fileErrors } of errors) {
      console.log(`\n📄 ${file}:`);
      for (const error of fileErrors) {
        console.log(`   ⚠️  ${error}`);
      }
    }

    console.log("\n");
    console.log("💡 Tips:");
    console.log("   - Remove hardcoded canonical URLs from MDX frontmatter");
    console.log("   - Ensure all pages have generateMetadata with canonical and alternates");
    console.log("   - Use locale === 'pl' check for canonical URL generation");
    console.log("   - Keep meta descriptions under 160 characters");
    console.log("\n");

    process.exit(1);
  }
}

main();
