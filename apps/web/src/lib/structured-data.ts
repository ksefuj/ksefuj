import type { Frontmatter } from "@/lib/content";

const BASE_URL = "https://ksefuj.to";

const PUBLISHER = {
  "@type": "Organization",
  name: "ksefuj.to",
  url: BASE_URL,
} as const;

function absoluteUrl(urlOrPath: string): string {
  return urlOrPath.startsWith("http") ? urlOrPath : `${BASE_URL}${urlOrPath}`;
}

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
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}${urlPath}` },
    image: frontmatter.seo?.ogImage
      ? absoluteUrl(frontmatter.seo.ogImage)
      : `${BASE_URL}${urlPath}/opengraph-image`,
    inLanguage: locale,
    author: PUBLISHER,
    publisher: PUBLISHER,
    ...(frontmatter.tags ? { keywords: frontmatter.tags.join(", ") } : {}),
  };
}

/**
 * Generate WebApplication JSON-LD structured data for tool pages.
 */
export function buildWebApplicationSchema(
  name: string,
  description: string,
  urlPath: string,
  locale: string,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: `${BASE_URL}${urlPath}`,
    inLanguage: locale,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "PLN",
    },
    author: PUBLISHER,
    publisher: PUBLISHER,
  };
}

/**
 * Generate Article JSON-LD structured data for guides.
 * (HowTo needs explicit step markup that our free-form MDX guides don't expose.)
 */
export function buildGuideSchema(
  frontmatter: Frontmatter,
  urlPath: string,
  locale: string,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    dateModified: frontmatter.updated ?? frontmatter.date,
    url: `${BASE_URL}${urlPath}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}${urlPath}` },
    image: frontmatter.seo?.ogImage
      ? absoluteUrl(frontmatter.seo.ogImage)
      : `${BASE_URL}${urlPath}/opengraph-image`,
    inLanguage: locale,
    author: PUBLISHER,
    publisher: PUBLISHER,
  };
}

/**
 * Generate BreadcrumbList JSON-LD. Items are ordered root to leaf; paths are site-relative.
 */
export function buildBreadcrumbSchema(
  items: { name: string; path: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`,
    })),
  };
}
