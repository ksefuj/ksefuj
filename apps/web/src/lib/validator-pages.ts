import { buildContentPath, type ContentItem, listContentItems } from "./content";

const SECTION = "validator";

/**
 * Validator reference pages for a locale. There is no locale fallback for this section: a page
 * exists only in the locales that have its file, so the same text is never served twice.
 */
export async function listValidatorPages(locale: string): Promise<ContentItem[]> {
  const items = await listContentItems(locale, SECTION);
  return [...items].sort((a, b) => a.frontmatter.slug.localeCompare(b.frontmatter.slug));
}

/**
 * Map issue code to the localized path of the page that explains it. When several pages claim the
 * same code, the first slug alphabetically wins, so the result is stable.
 */
export function buildIssueHelpLinks(
  locale: string,
  items: readonly ContentItem[],
): Record<string, string> {
  const links: Record<string, string> = {};
  for (const { frontmatter } of items) {
    for (const code of frontmatter.codes ?? []) {
      if (!(code in links)) {
        links[code] = buildContentPath(locale, SECTION, frontmatter.slug);
      }
    }
  }
  return links;
}

export async function getIssueHelpLinks(locale: string): Promise<Record<string, string>> {
  return buildIssueHelpLinks(locale, await listValidatorPages(locale));
}
