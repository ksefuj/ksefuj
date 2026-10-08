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

/**
 * Map issue code to the heading ids its page declares per issue kind (`anchors` frontmatter).
 * Same first-page-wins rule as `buildIssueHelpLinks`, so a code's href and anchors always come
 * from the same page.
 */
export function buildIssueHelpAnchors(
  items: readonly ContentItem[],
): Record<string, Record<string, string>> {
  const anchors: Record<string, Record<string, string>> = {};
  const claimed = new Set<string>();
  for (const { frontmatter } of items) {
    for (const code of frontmatter.codes ?? []) {
      if (claimed.has(code)) {
        continue;
      }
      claimed.add(code);
      if (frontmatter.anchors && Object.keys(frontmatter.anchors).length > 0) {
        anchors[code] = frontmatter.anchors;
      }
    }
  }
  return anchors;
}

export async function getIssueHelpAnchors(
  locale: string,
): Promise<Record<string, Record<string, string>>> {
  return buildIssueHelpAnchors(await listValidatorPages(locale));
}
