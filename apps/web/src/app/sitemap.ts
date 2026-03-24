import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { listSlugs } from "@/lib/content";

const BASE_URL = "https://ksefuj.to";

// Pages available in all locales
const pages = ["/", "/privacy", "/terms"];

// Derive URL prefixes per locale from central i18n routing configuration
const localePrefixes =
  routing.localePrefix === "as-needed"
    ? routing.locales.map((locale) => (locale === routing.defaultLocale ? "" : `/${locale}`))
    : routing.locales.map((locale) => `/${locale}`);

/** Map locale to the content sections it has, with their URL path prefix */
const contentSections: Record<string, Array<{ section: string; urlPrefix: string }>> = {
  pl: [
    { section: "blog", urlPrefix: "/blog" },
    { section: "docs", urlPrefix: "/docs" },
    { section: "guides", urlPrefix: "/guides" },
  ],
  en: [
    { section: "blog", urlPrefix: "/en/blog" },
    { section: "docs", urlPrefix: "/en/docs" },
    { section: "guides", urlPrefix: "/en/guides" },
  ],
  uk: [{ section: "guides", urlPrefix: "/uk/guides" }],
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

  // Content listing pages (blog, docs, guides, faq)
  const contentListingPages = [
    { path: "/blog", priority: 0.8 },
    { path: "/docs", priority: 0.8 },
    { path: "/guides", priority: 0.8 },
    { path: "/faq", priority: 0.7 },
    { path: "/en/blog", priority: 0.7 },
    { path: "/en/docs", priority: 0.7 },
    { path: "/en/guides", priority: 0.7 },
    { path: "/uk/guides", priority: 0.7 },
    { path: "/uk/faq", priority: 0.6 },
  ];

  for (const { path, priority } of contentListingPages) {
    entries.push({
      url: `${BASE_URL}${path}`,
      changeFrequency: "weekly",
      priority,
    });
  }

  // Dynamic content pages
  for (const [locale, sections] of Object.entries(contentSections)) {
    for (const { section, urlPrefix } of sections) {
      const slugs = await listSlugs(locale, section);
      for (const slug of slugs) {
        entries.push({
          url: `${BASE_URL}${urlPrefix}/${slug}`,
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
    }
  }

  return entries;
}
