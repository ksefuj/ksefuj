export const SITE_TITLE_SUFFIX = " — ksefuj.to";
export const MAX_TITLE_LENGTH = 60;

/** Matches a brand suffix already baked into a title, e.g. " — ksefuj" or " — ksefuj.to". */
const BRAND_SUFFIX = /\s+—\s+ksefuj(\.to)?$/;

/**
 * Appends the site suffix to a page title only when the full title stays within the length
 * Google shows in search results (60 characters). Longer titles are used bare, and a brand suffix
 * already present in the title is normalised to the same rule.
 */
export function withSiteSuffix(title: string): string {
  const bare = title.replace(BRAND_SUFFIX, "");
  const full = `${bare}${SITE_TITLE_SUFFIX}`;
  return full.length <= MAX_TITLE_LENGTH ? full : bare;
}
