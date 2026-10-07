import {
  type ContentItemWithLocale,
  type Frontmatter,
  getContentItem,
  listContentItemsUnified,
} from "./content";
import { type ReadNextEntry, type ReadNextReason, selectReadNext } from "./read-next";

export interface ReadNextItem {
  item: ContentItemWithLocale;
  section: "blog" | "guides";
  reason: ReadNextReason;
}

type DiscoverySection = "blog" | "guides";

interface Candidate extends ReadNextEntry {
  item: ContentItemWithLocale;
  section: DiscoverySection;
}

/**
 * Items to suggest after a blog post or guide, built from the PL-driven unified listing so that
 * EN/UK readers get translated items first and PL fallbacks (shown with the PL badge) after.
 * Runs at build time for statically generated post pages.
 */
export async function getReadNextItems(
  locale: string,
  current: { section: DiscoverySection; frontmatter: Frontmatter },
): Promise<ReadNextItem[]> {
  const { section, frontmatter } = current;
  const [blog, guides] = await Promise.all([
    listContentItemsUnified(locale, "blog"),
    listContentItemsUnified(locale, "guides"),
  ]);

  const toCandidates = (items: ContentItemWithLocale[], sec: DiscoverySection): Candidate[] =>
    items.map((item) => ({
      item,
      section: sec,
      plSlug: item.plSlug,
      topic: item.frontmatter.topic,
      date: item.frontmatter.date,
      translated: item.contentLocale === locale,
    }));

  // `related` is authored on the PL source; translations do not repeat it.
  const plSlug = frontmatter.translations?.pl ?? frontmatter.slug;
  const plSource = locale === "pl" ? null : await getContentItem("pl", section, plSlug);
  const related = frontmatter.related ?? plSource?.frontmatter.related;

  const picks = selectReadNext(
    { plSlug, section, topic: frontmatter.topic ?? plSource?.frontmatter.topic, related },
    [...toCandidates(blog, "blog"), ...toCandidates(guides, "guides")],
  );

  return picks.map(({ entry, reason }) => ({ item: entry.item, section: entry.section, reason }));
}
