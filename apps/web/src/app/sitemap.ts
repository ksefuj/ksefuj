import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://ksefuj.to";

// Pages available in all locales
const pages = ["/", "/privacy", "/terms"];

// Derive URL prefixes per locale from central i18n routing configuration
const localePrefixes =
  routing.localePrefix === "as-needed"
    ? routing.locales.map((locale) => (locale === routing.defaultLocale ? "" : `/${locale}`))
    : routing.locales.map((locale) => `/${locale}`);

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
