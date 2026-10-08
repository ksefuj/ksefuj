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
import { existsSync, readdirSync, readFileSync, statSync } from "fs";
import { join, relative } from "path";
import matter from "gray-matter";
import { CONTENT_TOPICS, isContentTopic } from "../apps/web/src/lib/topics";

interface ValidationError {
  file: string;
  errors: string[];
}

const errors: ValidationError[] = [];

function addError(file: string, error: string) {
  const existing = errors.find((e) => e.file === file);
  if (existing) {
    if (!existing.errors.includes(error)) {
      existing.errors.push(error);
    }
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

// Parse frontmatter with a real YAML parser (same one the web app uses). Invalid YAML is
// reported as an error instead of crashing the script.
function parseFrontmatter(content: string, relPath: string): Record<string, unknown> {
  try {
    return matter(content).data;
  } catch (error) {
    addError(relPath, `Invalid frontmatter YAML: ${(error as Error).message.split("\n")[0]}`);
    return {};
  }
}

// Check MDX files for hardcoded canonical URLs
function validateContentFiles() {
  console.log("🔍 Checking content files for SEO issues...\n");

  const contentFiles = getFiles("apps/web/content", /\.mdx$/);

  for (const file of contentFiles) {
    const content = readFileSync(file, "utf-8");
    const relPath = relative(process.cwd(), file);
    const frontmatter = parseFrontmatter(content, relPath);

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

    // Check for missing translations mapping (all blog posts in all locales)
    if (file.includes("/blog/")) {
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

// Check that translation slugs declared in frontmatter actually exist on disk
function validateTranslationCrossReferences() {
  console.log("🔍 Checking translation cross-references...\n");

  const contentFiles = getFiles("apps/web/content", /\.mdx$/);

  for (const file of contentFiles) {
    const content = readFileSync(file, "utf-8");
    const relPath = relative(process.cwd(), file);
    const frontmatter = parseFrontmatter(content, relPath);

    const translations = frontmatter.translations as Record<string, string> | undefined;
    if (!translations) {
      continue;
    }

    // Detect section from path (blog, guides, docs, faq)
    const sectionMatch = file.match(/\/content\/\w+\/(\w+)\//);
    if (!sectionMatch) {
      continue;
    }
    const section = sectionMatch[1];

    for (const [locale, slug] of Object.entries(translations)) {
      const expectedPath = join("apps/web/content", locale, section, `${slug}.mdx`);
      try {
        statSync(expectedPath);
      } catch {
        addError(
          relPath,
          `translations.${locale}: "${slug}" — file not found: ${relative(process.cwd(), expectedPath)}`,
        );
      }
    }
  }
}

const RELATED_MAX = 3;
const RELATED_REF = /^(blog|guides)\/([a-z0-9]+(?:-[a-z0-9]+)*)$/;

// Every blog post and guide needs exactly one topic from the closed list, translations must carry
// the same topic as their PL source and map to a PL source at all (topic and "Read next"
// self-exclusion are keyed by the PL slug), and `related` must point at existing PL items.
function validateDiscoveryFrontmatter() {
  console.log("🔍 Checking content topics and related links...\n");

  const contentFiles = getFiles("apps/web/content", /\.mdx$/);
  const plTopics = new Map<string, unknown>();
  const entries: Array<{
    relPath: string;
    locale: string;
    section: string;
    topic: unknown;
    plSlug?: string;
  }> = [];

  for (const file of contentFiles) {
    const match = file.match(/\/content\/(\w+)\/(blog|guides)\/([^/]+)\.mdx$/);
    if (!match) {
      continue;
    }
    const [, locale, section, slug] = match;
    const relPath = relative(process.cwd(), file);
    const frontmatter = parseFrontmatter(readFileSync(file, "utf-8"), relPath);
    const topic = frontmatter.topic;

    if (topic === undefined || topic === "") {
      addError(relPath, `Missing topic in frontmatter (one of: ${CONTENT_TOPICS.join(", ")})`);
    } else if (!isContentTopic(topic)) {
      addError(relPath, `Unknown topic "${String(topic)}" (allowed: ${CONTENT_TOPICS.join(", ")})`);
    }

    const translations = frontmatter.translations as Record<string, string> | undefined;
    const plSlug = locale === "pl" ? slug : translations?.pl;

    if (locale === "pl") {
      plTopics.set(`${section}/${slug}`, topic);
    } else if (!plSlug) {
      addError(
        relPath,
        "Missing translations.pl: blog posts and guides must map to their PL source",
      );
    }
    entries.push({ relPath, locale, section, topic, plSlug: locale === "pl" ? undefined : plSlug });

    if (frontmatter.related !== undefined) {
      validateRelated(relPath, frontmatter.related, plSlug ? `${section}/${plSlug}` : undefined);
    }
  }

  for (const { relPath, locale, section, topic, plSlug } of entries) {
    if (locale === "pl" || !plSlug || topic === undefined) {
      continue;
    }
    const plTopic = plTopics.get(`${section}/${plSlug}`);
    if (plTopic !== undefined && plTopic !== topic) {
      addError(
        relPath,
        `Topic "${String(topic)}" differs from PL source topic "${String(plTopic)}"`,
      );
    }
  }
}

// `related` entries are section-qualified PL refs (`blog/<slug>`, `guides/<slug>`): slugs are only
// unique within a section, so a bare slug would be ambiguous.
function validateRelated(relPath: string, related: unknown, selfRef: string | undefined) {
  if (!Array.isArray(related)) {
    addError(relPath, 'related must be a list of "blog/<pl-slug>" or "guides/<pl-slug>" refs');
    return;
  }
  if (related.length > RELATED_MAX) {
    addError(relPath, `related has ${related.length} entries (max ${RELATED_MAX})`);
  }
  const seen = new Set<string>();
  for (const ref of related) {
    const parsed = typeof ref === "string" ? ref.match(RELATED_REF) : null;
    if (!parsed) {
      addError(
        relPath,
        `related entry ${JSON.stringify(ref)} must look like "blog/<pl-slug>" or "guides/<pl-slug>"`,
      );
      continue;
    }
    if (seen.has(ref as string)) {
      addError(relPath, `related entry "${String(ref)}" is listed more than once`);
    }
    seen.add(ref as string);
    if (ref === selfRef) {
      addError(relPath, `related entry "${String(ref)}" points at the item itself`);
    }
    const [, section, slug] = parsed;
    if (!existsSync(join("apps/web/content/pl", section, `${slug}.mdx`))) {
      addError(relPath, `related entry "${String(ref)}" not found in apps/web/content/pl`);
    }
  }
}

// Validator reference pages (one per issue code) have no topic and no locale fallback: each file
// must describe itself accurately, list the issue codes it explains and map to itself in
// `translations` so hreflang alternates include the page's own locale.
function validateValidatorPages() {
  console.log("🔍 Checking validator reference pages...\n");

  for (const file of getFiles("apps/web/content", /\.mdx$/)) {
    const match = file.match(/\/content\/(\w+)\/validator\/([^/]+)\.mdx$/);
    if (!match) {
      continue;
    }
    const [, locale, slug] = match;
    const relPath = relative(process.cwd(), file);
    const frontmatter = parseFrontmatter(readFileSync(file, "utf-8"), relPath);

    if (frontmatter.section !== "validator") {
      addError(relPath, 'section must be "validator"');
    }
    if (frontmatter.locale !== locale) {
      addError(relPath, `locale must be "${locale}" (matches the directory)`);
    }
    if (frontmatter.slug !== slug) {
      addError(relPath, `slug must be "${slug}" (matches the file name)`);
    }

    const codes = frontmatter.codes;
    if (
      !Array.isArray(codes) ||
      codes.length === 0 ||
      !codes.every((c) => typeof c === "string" && /^[A-Z0-9_]+$/.test(c))
    ) {
      addError(relPath, "codes must be a non-empty list of issue codes (e.g. UNEXPECTED_ELEMENT)");
    }

    const translations = frontmatter.translations as Record<string, string> | undefined;
    if (!translations) {
      addError(relPath, "Validator page missing translations mapping for hreflang alternates");
    } else if (translations[locale] !== slug) {
      addError(relPath, `translations.${locale} must point at the page itself ("${slug}")`);
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
      // The [...rest] catch-all only calls notFound(), so it has no metadata to set.
      if (!file.includes("[slug]") && !file.includes("[...rest]")) {
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

// Check internal links in MDX bodies: no /pl prefix, locale prefix matches the file, and
// blog/guides/docs/faq targets exist in that locale.
function validateInternalLinks() {
  console.log("🔍 Checking internal links in content...\n");

  const contentRoot = "apps/web/content";
  const staticRoutes = new Set(["", "/validator", "/waluty", "/privacy", "/terms"]);
  const sections = ["blog", "guides", "docs", "faq", "validator"];
  const locales = ["pl", "en", "uk"];
  const slugsFor = (locale: string, section: string): Set<string> => {
    const dir = join(contentRoot, locale, section);
    return new Set(
      existsSync(dir)
        ? readdirSync(dir)
            .filter((f) => f.endsWith(".mdx"))
            .map((f) => f.replace(/\.mdx$/, ""))
        : [],
    );
  };

  for (const file of getFiles(contentRoot, /\.mdx$/)) {
    const relPath = relative(process.cwd(), file);
    const fileLocale = relPath.split("/")[3];
    // Ignore fenced code blocks and inline code: they show example links, not real ones.
    const body = matter(readFileSync(file, "utf-8"))
      .content.replace(/^[ \t]*(```|~~~)[\s\S]*?^[ \t]*\1[^\n]*$/gm, "")
      .replace(/`[^`\n]*`/g, "");
    const targets = [
      ...[...body.matchAll(/\]\((\/[^)\s]*)[^)]*\)/g)].map((m) => m[1]),
      ...[...body.matchAll(/^[ \t]{0,3}\[[^\]]+\]:[ \t]*(\/\S*)/gm)].map((m) => m[1]),
      ...[...body.matchAll(/href=["'](\/[^"']*)["']/g)].map((m) => m[1]),
    ];

    for (const target of targets) {
      const path = target.split(/[?#]/)[0].replace(/\/$/, "");
      const first = path.split("/")[1];
      if (first === "pl") {
        addError(relPath, `Internal link "${target}" uses a /pl prefix (Polish has no prefix)`);
        continue;
      }
      const linkLocale = locales.includes(first) ? first : "pl";
      const rest = locales.includes(first) ? path.slice(first.length + 1) : path;
      const [, section, slug, ...extra] = rest.split("/");

      if (sections.includes(section) && slug) {
        // Content link. Cross-locale links are fine only when deliberate: the file's own locale
        // lacks the slug (e.g. a UK article linking to a Polish-only article).
        const inLinkLocale = slugsFor(linkLocale, section).has(slug);
        if (extra.length > 0 || !inLinkLocale) {
          addError(
            relPath,
            `Internal link "${target}" points to a ${section} slug that does not exist in ${linkLocale}`,
          );
        } else if (linkLocale !== fileLocale && slugsFor(fileLocale, section).has(slug)) {
          addError(
            relPath,
            `Internal link "${target}" points to the ${linkLocale} locale from a ${fileLocale} file`,
          );
        }
      } else if (linkLocale !== fileLocale) {
        addError(
          relPath,
          `Internal link "${target}" points to the ${linkLocale} locale from a ${fileLocale} file`,
        );
      } else if (
        !staticRoutes.has(rest) &&
        !sections.includes(section) &&
        !rest.startsWith("/api") &&
        !/\.\w+$/.test(rest)
      ) {
        addError(relPath, `Internal link "${target}" does not match any known route`);
      }
    }
  }
}

// Main validation
function main() {
  console.log("🚀 Starting SEO validation...\n");
  console.log(`${"=".repeat(60)}\n`);

  validateContentFiles();
  validateTranslationCrossReferences();
  validateDiscoveryFrontmatter();
  validateInternalLinks();
  validateValidatorPages();
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
    console.log(
      "   - Give every blog post and guide a topic from the list in apps/web/src/lib/topics.ts",
    );
    console.log("\n");

    process.exit(1);
  }
}

main();
