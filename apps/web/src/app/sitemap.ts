import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { listContentItems } from "@/lib/content";

const BASE_URL = "https://ksefuj.to";

// Pages available in all locales
const pages = ["/", "/validator", "/privacy", "/terms"];

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
    { section: "faq", urlPrefix: "/faq" },
  ],
  en: [
    { section: "blog", urlPrefix: "/en/blog" },
    { section: "docs", urlPrefix: "/en/docs" },
    { section: "guides", urlPrefix: "/en/guides" },
    { section: "faq", urlPrefix: "/en/faq" },
  ],
  uk: [
    { section: "blog", urlPrefix: "/uk/blog" },
    { section: "docs", urlPrefix: "/uk/docs" },
    { section: "guides", urlPrefix: "/uk/guides" },
    { section: "faq", urlPrefix: "/uk/faq" },
  ],
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages (all locales)
  for (const page of pages) {
    for (const prefix of localePrefixes) {
      const path = page === "/" ? prefix || "/" : `${prefix}${page}`;
      const isHome = page === "/";
      const isValidator = page === "/validator";

      let changeFrequency: "weekly" | "monthly" = "monthly";
      if (isHome || isValidator) {
        changeFrequency = "weekly";
      }

      let priority = 0.7;
      if (isHome) {
        priority = 1.0;
      } else if (isValidator) {
        priority = 0.9;
      }

      entries.push({
        url: `${BASE_URL}${path}`,
        changeFrequency,
        priority,
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
    { path: "/en/faq", priority: 0.7 },
    { path: "/uk/blog", priority: 0.7 },
    { path: "/uk/docs", priority: 0.7 },
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
