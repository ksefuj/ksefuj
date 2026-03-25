import type { ContentItem } from "./content";

const SITE_URL = "https://ksefuj.to";

function escapeXml(text: string): string {
  // Strip XML-illegal control characters (U+0000–U+001F except tab, LF, CR)
  const sanitized = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "");
  // Ampersand must be replaced first to avoid double-escaping
  return sanitized
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date string in blog frontmatter: "${dateStr}"`);
  }
  return date.toUTCString();
}

export function buildRssFeed(posts: ContentItem[]): string {
  const items = posts
    .map((post) => {
      const { title, description, date, slug } = post.frontmatter;
      const link = `${SITE_URL}/blog/${encodeURIComponent(slug)}`;
      return `    <item>
      <title>${escapeXml(title)}</title>
      <link>${link}</link>
      <description>${escapeXml(description)}</description>
      <pubDate>${toRfc822(date)}</pubDate>
      <guid isPermaLink="true">${link}</guid>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>ksefuj.to — blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Aktualności i poradniki o KSeF — Krajowym Systemie e-Faktur.</description>
    <language>pl</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;
}
