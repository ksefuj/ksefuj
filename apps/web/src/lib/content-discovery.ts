import {
  type ContentItemWithLocale,
  type Frontmatter,
  getContentItem,
  listContentItemsUnified,
} from "./content";
import { type LatestPostEntry, selectLatestPosts } from "./latest-posts";
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

export interface LatestPostItem {
  item: ContentItemWithLocale;
  section: DiscoverySection;
}

/**
 * Items for the homepage "Latest from the blog" section: `featured` items first, then the newest
 * blog posts (see `selectLatestPosts`). Built from the PL-driven unified listing, so EN/UK get
 * translations where they exist and PL fallbacks (shown with the PL badge) otherwise. `featured`
 * is authored on the PL source; translations inherit it. Runs at build time.
 */
export async function getLatestPostItems(locale: string): Promise<LatestPostItem[]> {
  const sections: DiscoverySection[] = ["blog", "guides"];
  const lists = await Promise.all(
    sections.map(async (section) => ({
      section,
      items: await listContentItemsUnified(locale, section),
      plItems: locale === "pl" ? null : await listContentItemsUnified("pl", section),
    })),
  );

  const candidates = lists.flatMap(({ section, items, plItems }) => {
    const plFeatured = new Set(
      (plItems ?? items)
        .filter((i) => i.frontmatter.featured === true)
        .map((i) => i.frontmatter.slug),
    );
    return items.map((item): LatestPostEntry & LatestPostItem => ({
      item,
      section,
      plSlug: item.plSlug,
      title: item.frontmatter.title,
      date: item.frontmatter.date,
      updated: item.frontmatter.updated,
      featured: item.frontmatter.featured === true || plFeatured.has(item.plSlug),
      translated: item.contentLocale === locale,
    }));
  });

  return selectLatestPosts(candidates).map(({ item, section }) => ({ item, section }));
}
