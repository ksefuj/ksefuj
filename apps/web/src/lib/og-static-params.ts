import { routing } from "../i18n/routing";
import { listSlugs } from "./content";

/** Static params for section-level OG routes: one image per locale. */
export function localeParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Static params for article OG routes: every (locale, slug) pair the sibling page generates.
 * Returns the locale explicitly because metadata routes do not receive the parent's params.
 */
export function articleParams(section: "blog" | "guides" | "docs" | "validator") {
  return async () => {
    const pairs = await Promise.all(
      routing.locales.map(async (locale) =>
        (await listSlugs(locale, section)).map((slug) => ({ locale, slug })),
      ),
    );
    return pairs.flat();
  };
}
