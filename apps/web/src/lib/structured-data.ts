import type { Frontmatter } from "@/lib/content";

const BASE_URL = "https://ksefuj.to";

/**
 * Generate Article JSON-LD structured data for blog posts.
 */
export function buildArticleSchema(
  frontmatter: Frontmatter,
  urlPath: string,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    dateModified: frontmatter.updated ?? frontmatter.date,
    url: `${BASE_URL}${urlPath}`,
    publisher: {
      "@type": "Organization",
      name: "ksefuj.to",
      url: BASE_URL,
    },
    ...(frontmatter.tags ? { keywords: frontmatter.tags.join(", ") } : {}),
  };
}

/**
 * Generate HowTo JSON-LD structured data for guides.
 */
export function buildHowToSchema(
  frontmatter: Frontmatter,
  urlPath: string,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: frontmatter.title,
    description: frontmatter.description,
    url: `${BASE_URL}${urlPath}`,
    datePublished: frontmatter.date,
    dateModified: frontmatter.updated ?? frontmatter.date,
    ...(frontmatter.difficulty
      ? {
          educationalLevel: frontmatter.difficulty,
        }
      : {}),
  };
}
