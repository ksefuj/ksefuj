import type { MetadataRoute } from "next";

const BASE_URL = "https://ksefuj.to";

// Pages available in all locales
const pages = ["/", "/privacy", "/terms"];

// URL prefixes per locale (default locale 'pl' uses no prefix per as-needed config)
const localePrefixes = ["", "/en", "/uk"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

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

  return entries;
}
