import type { Frontmatter } from "@/lib/content";

const BASE_URL = "https://ksefuj.to";

const PUBLISHER = {
  "@type": "Organization",
  name: "ksefuj.to",
  url: BASE_URL,
} as const;

/**
 * Generate BlogPosting JSON-LD structured data for blog posts.
 */
export function buildArticleSchema(
  frontmatter: Frontmatter,
  urlPath: string,
  locale: string,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    dateModified: frontmatter.updated ?? frontmatter.date,
    url: `${BASE_URL}${urlPath}`,
    image: `${BASE_URL}${urlPath}/opengraph-image`,
    inLanguage: locale,
    author: PUBLISHER,
    publisher: PUBLISHER,
    ...(frontmatter.tags ? { keywords: frontmatter.tags.join(", ") } : {}),
  };
}

/**
 * Generate HowTo JSON-LD structured data for guides.
 */
export function buildHowToSchema(
  frontmatter: Frontmatter,
  urlPath: string,
  locale: string,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: frontmatter.title,
    description: frontmatter.description,
    url: `${BASE_URL}${urlPath}`,
    image: `${BASE_URL}${urlPath}/opengraph-image`,
    inLanguage: locale,
    author: PUBLISHER,
    publisher: PUBLISHER,
    datePublished: frontmatter.date,
    dateModified: frontmatter.updated ?? frontmatter.date,
  };
}
