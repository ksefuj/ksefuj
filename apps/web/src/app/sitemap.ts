import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { listContentItems } from "@/lib/content";

const BASE_URL = "https://ksefuj.to";

// Pages available in all locales
const pages = ["/", "/validator", "/podglad", "/waluty", "/privacy", "/terms"];

// Derive URL prefixes per locale from central i18n routing configuration
const localePrefixes =
  routing.localePrefix === "as-needed"
    ? routing.locales.map((locale) => (locale === routing.defaultLocale ? "" : `/${locale}`))
    : routing.locales.map((locale) => `/${locale}`);

/**
 * Map locale to the content sections it has, with their URL path prefix.
 * FAQ is excluded: its MDX files are categories rendered on the single /faq page, not routes.
 */
const contentSections: Record<string, Array<{ section: string; urlPrefix: string }>> = {
  pl: [
    { section: "blog", urlPrefix: "/blog" },
    { section: "guides", urlPrefix: "/guides" },
    { section: "validator", urlPrefix: "/validator" },
  ],
  en: [
    { section: "blog", urlPrefix: "/en/blog" },
    { section: "guides", urlPrefix: "/en/guides" },
    { section: "validator", urlPrefix: "/en/validator" },
  ],
  uk: [
    { section: "blog", urlPrefix: "/uk/blog" },
    { section: "guides", urlPrefix: "/uk/guides" },
    { section: "validator", urlPrefix: "/uk/validator" },
  ],
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages (all locales)
  for (const page of pages) {
    for (const prefix of localePrefixes) {
      const path = page === "/" ? prefix || "/" : `${prefix}${page}`;
      entries.push({
        url: `${BASE_URL}${path}`,
        changeFrequency: page === "/" ? "weekly" : "monthly",
        priority: page === "/" ? 1.0 : 0.7,
      });
    }
  }

  // Content listing pages (blog, guides, faq; docs are added below when non-empty)
  const contentListingPages = [
    { path: "/blog", priority: 0.8 },
    { path: "/guides", priority: 0.8 },
    { path: "/faq", priority: 0.7 },
    { path: "/en/blog", priority: 0.7 },
    { path: "/en/guides", priority: 0.7 },
    { path: "/en/faq", priority: 0.7 },
    { path: "/uk/blog", priority: 0.7 },
    { path: "/uk/guides", priority: 0.7 },
    { path: "/uk/faq", priority: 0.6 },
  ];

  // The docs listing is only exposed once docs content exists (it is noindex while empty).
  for (const locale of routing.locales) {
    if ((await listContentItems(locale, "docs")).length > 0) {
      const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
      contentListingPages.push({ path: `${prefix}/docs`, priority: 0.7 });
    }
  }

  for (const { path, priority } of contentListingPages) {
    entries.push({
      url: `${BASE_URL}${path}`,
      changeFrequency: "weekly",
      priority,
    });
  }

  // Dynamic content pages
  for (const [locale, sections] of Object.entries(contentSections)) {
    const docsPrefix = locale === routing.defaultLocale ? "/docs" : `/${locale}/docs`;
    for (const { section, urlPrefix } of [
      ...sections,
      { section: "docs", urlPrefix: docsPrefix },
    ]) {
      const items = await listContentItems(locale, section);
      for (const item of items) {
        entries.push({
          url: `${BASE_URL}${urlPrefix}/${item.frontmatter.slug}`,
          changeFrequency: "monthly",
          priority: 0.6,
          lastModified: item.frontmatter.updated ?? item.frontmatter.date,
        });
      }
    }
  }

  return entries;
}
