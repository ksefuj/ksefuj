import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface Frontmatter {
  title: string;
  description: string;
  date: string;
  updated?: string;
  section: "blog" | "docs" | "guides" | "faq";
  locale: "pl" | "en" | "uk";
  slug: string;
  tags?: string[];
  sources?: Array<{ label: string; url: string }>;
  seo?: {
    canonical?: string;
    ogImage?: string;
  };
  /** Maps locale codes to the slug of the translated version of this content. */
  translations?: Partial<Record<"pl" | "en" | "uk", string>>;
}

export interface ContentItem {
  frontmatter: Frontmatter;
  content: string;
  readingTime: number;
}

export interface ContentItemWithLocale extends ContentItem {
  /** The actual language of the content returned (may differ from the requested locale). */
  contentLocale: string;
}

/** Estimate reading time from word count (~180 wpm for Polish) */
export function estimateReadingTime(content: string): number {
  const trimmed = content.trim();
  const wordCount = trimmed ? trimmed.split(/\s+/).length : 0;
  return Math.max(1, Math.ceil(wordCount / 180));
}

/**
 * Read and parse a single MDX file.
 * Returns null if the file does not exist.
 */
export async function getContentItem(
  locale: string,
  section: string,
  slug: string,
): Promise<ContentItem | null> {
  const filePath = path.join(CONTENT_DIR, locale, section, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    frontmatter: data as Frontmatter,
    content,
    readingTime: estimateReadingTime(content),
  };
}

/**
 * List all MDX files in a given locale/section directory.
 * Returns them sorted by date descending (newest first).
 */
export async function listContentItems(locale: string, section: string): Promise<ContentItem[]> {
  const dirPath = path.join(CONTENT_DIR, locale, section);
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".mdx"));

  const items: ContentItem[] = files.map((file) => {
    const raw = fs.readFileSync(path.join(dirPath, file), "utf8");
    const { data, content } = matter(raw);
    return {
      frontmatter: data as Frontmatter,
      content,
      readingTime: estimateReadingTime(content),
    };
  });

  return items.sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime(),
  );
}

/**
 * Unified blog feed driven by the PL canonical content directory.
 *
 * For every PL post:
 *  - If a translated slug is declared in `frontmatter.translations[locale]` and the
 *    corresponding file exists, that translated item is returned with `contentLocale: locale`.
 *  - Otherwise the PL item is returned with `contentLocale: "pl"`.
 *
 * Sort order follows the PL post dates (newest first) regardless of locale.
 */
export async function listContentItemsUnified(
  locale: string,
  section: string,
): Promise<ContentItemWithLocale[]> {
  const plItems = await listContentItems("pl", section);

  const results: ContentItemWithLocale[] = await Promise.all(
    plItems.map(async (plItem): Promise<ContentItemWithLocale> => {
      if (locale === "pl") {
        return { ...plItem, contentLocale: "pl" };
      }

      const translatedSlug = plItem.frontmatter.translations?.[locale as "pl" | "en" | "uk"];

      if (translatedSlug) {
        const translated = await getContentItem(locale, section, translatedSlug);
        if (translated) {
          return { ...translated, contentLocale: locale };
        }
      }

      return { ...plItem, contentLocale: "pl" };
    }),
  );

  return results;
}

/**
 * Get all slugs for a given locale/section — used for generateStaticParams.
 */
export async function listSlugs(locale: string, section: string): Promise<string[]> {
  const dirPath = path.join(CONTENT_DIR, locale, section);
  if (!fs.existsSync(dirPath)) {
    return [];
  }
  return fs
    .readdirSync(dirPath)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

const ALL_LOCALES = ["pl", "en", "uk"] as const;

/**
 * Try to get content in the requested locale; fall back to any locale that has the slug.
 * Returns the item and the locale it was found in.
 */
export async function getContentItemWithFallback(
  locale: string,
  section: string,
  slug: string,
): Promise<{ item: ContentItem; contentLocale: string } | null> {
  const item = await getContentItem(locale, section, slug);
  if (item) {
    return { item, contentLocale: locale };
  }

  for (const fallback of ALL_LOCALES) {
    if (fallback === locale) {
      continue;
    }
    const fallbackItem = await getContentItem(fallback, section, slug);
    if (fallbackItem) {
      return { item: fallbackItem, contentLocale: fallback };
    }
  }

  return null;
}

/**
 * Build a locale-prefixed content URL path, e.g. `/blog/my-slug` (PL) or `/en/blog/my-slug`.
 */
export function buildContentPath(locale: string, section: string, slug: string): string {
  return locale === "pl" ? `/${section}/${slug}` : `/${locale}/${section}/${slug}`;
}

/**
 * Build hreflang alternates for Next.js Metadata from a content page's
 * frontmatter translations map. Only includes locales that have a translation.
 * Adds x-default pointing to the Polish (primary) version.
 */
export function buildHreflangAlternates(
  section: string,
  translations: Frontmatter["translations"],
): Record<string, string> {
  const alternates: Record<string, string> = {};

  if (translations?.pl) {
    alternates["pl"] = buildContentPath("pl", section, translations.pl);
  }
  if (translations?.en) {
    alternates["en"] = buildContentPath("en", section, translations.en);
  }
  if (translations?.uk) {
    alternates["uk"] = buildContentPath("uk", section, translations.uk);
  }

  if (alternates["pl"]) {
    alternates["x-default"] = alternates["pl"];
  }

  return alternates;
}

/**
 * Build locale → path map for the language picker on a content detail page.
 * Uses the frontmatter `translations` map to find the correct slug per locale.
 * Falls back to the current slug (which will render with a translation banner).
 */
export function buildContentLocalePaths(
  section: string,
  slug: string,
  translations: Frontmatter["translations"],
): Record<string, string> {
  return Object.fromEntries(
    ALL_LOCALES.map((loc) => {
      const targetSlug = translations?.[loc] ?? translations?.pl ?? slug;
      return [loc, `/${section}/${targetSlug}`];
    }),
  );
}

/**
 * Resolve the canonical URL for a content page, respecting localized slugs.
 * Falls back to the PL URL when no localized slug exists.
 */
export function buildLocalizedCanonical(
  locale: string,
  section: string,
  slug: string,
  frontmatter: Frontmatter,
): string {
  if (frontmatter.seo?.canonical) {
    return frontmatter.seo.canonical;
  }
  const localizedSlug = frontmatter.translations?.[locale as "pl" | "en" | "uk"];
  if (localizedSlug) {
    return buildContentPath(locale, section, localizedSlug);
  }
  return buildContentPath("pl", section, frontmatter.translations?.pl ?? slug);
}

/**
 * Return the redirect path when a content item was served under the wrong locale slug,
 * or null if no redirect is needed.
 */
export function resolveContentRedirect(
  locale: string,
  section: string,
  slug: string,
  contentLocale: string,
  frontmatter: Frontmatter,
): string | null {
  if (contentLocale === locale) {
    return null;
  }
  const correctSlug = frontmatter.translations?.[locale as "pl" | "en" | "uk"];
  if (correctSlug && correctSlug !== slug) {
    return buildContentPath(locale, section, correctSlug);
  }
  return null;
}

/** Normalize a heading text string to a URL-safe anchor id. */
export function slugifyHeading(text: string): string {
  // Decompose combined characters so diacritics can be stripped (e.g. "ą" → "a" + combining ogonek)
  const withoutDiacritics = text.normalize("NFD").replace(/\p{M}+/gu, "");
  const slug = withoutDiacritics
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "section";
}

/**
 * Extract headings from MDX content for table of contents.
 * Returns h2/h3 headings with their text and id.
 */
export function extractHeadings(
  content: string,
): Array<{ level: 2 | 3; text: string; id: string }> {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: Array<{ level: 2 | 3; text: string; id: string }> = [];
  let match: RegExpExecArray | null;

  const seen = new Map<string, number>();

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length as 2 | 3;
    const text = match[2].trim();
    const base = slugifyHeading(text);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    const id = count === 0 ? base : `${base}-${count}`;
    headings.push({ level, text, id });
  }

  return headings;
}
