import {
  type ContentItemWithLocale,
  type Frontmatter,
  getContentItem,
  listContentItemsUnified,
} from "./content";
import { type RecentEntry, selectRecentActivity } from "./recent-activity";
import { type HubEntry, hubEntryKey, selectMoreInTopic, selectTopicHub } from "./topic-hubs";
import { CONTENT_TOPICS, type ContentTopic, isContentTopic } from "./topics";
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

export interface DiscoveryItem {
  item: ContentItemWithLocale;
  section: DiscoverySection;
}

interface TopicCandidate extends HubEntry, RecentEntry, DiscoveryItem {}

/**
 * All blog posts and guides of a locale as selection candidates. Built from the PL-driven unified
 * listing, so EN/UK get translations where they exist and PL fallbacks (shown with the PL badge)
 * otherwise. `featured` is authored on the PL source; translations inherit it. Runs at build time.
 */
async function loadCandidates(locale: string): Promise<TopicCandidate[]> {
  const sections: DiscoverySection[] = ["blog", "guides"];
  const lists = await Promise.all(
    sections.map(async (section) => ({
      section,
      items: await listContentItemsUnified(locale, section),
      plItems: locale === "pl" ? null : await listContentItemsUnified("pl", section),
    })),
  );

  return lists.flatMap(({ section, items, plItems }) => {
    const plBySlug = new Map((plItems ?? items).map((i) => [i.frontmatter.slug, i]));
    return items.map((item): TopicCandidate => {
      const pl = plBySlug.get(item.plSlug);
      const topic = item.frontmatter.topic ?? pl?.frontmatter.topic;
      return {
        item,
        section,
        plSlug: item.plSlug,
        topic: isContentTopic(topic) ? topic : undefined,
        date: item.frontmatter.date,
        updated: item.frontmatter.updated,
        featured: item.frontmatter.featured === true || pl?.frontmatter.featured === true,
        translated: item.contentLocale === locale,
      };
    });
  });
}

export interface TopicHub {
  topic: ContentTopic;
  items: DiscoveryItem[];
  total: number;
}

/** Homepage topic hubs: per topic, up to six blog posts and guides (see `selectTopicHub`). */
export async function getTopicHubs(locale: string): Promise<TopicHub[]> {
  const candidates = await loadCandidates(locale);
  return CONTENT_TOPICS.map((topic) => {
    const { items, total } = selectTopicHub(candidates, topic);
    return { topic, items: items.map(({ item, section }) => ({ item, section })), total };
  }).filter((hub) => hub.total > 0);
}

/** Homepage "recently published and updated" list (see `selectRecentActivity`). */
export async function getRecentActivityItems(locale: string): Promise<DiscoveryItem[]> {
  const candidates = await loadCandidates(locale);
  return selectRecentActivity(candidates).map(({ item, section }) => ({ item, section }));
}

/**
 * "More in this topic" for an article: other items of its topic, minus the article and its
 * "read next" picks (see `selectMoreInTopic`).
 */
export async function getMoreInTopicItems(
  locale: string,
  current: { section: DiscoverySection; frontmatter: Frontmatter },
): Promise<DiscoveryItem[]> {
  const { section, frontmatter } = current;
  const plSlug = frontmatter.translations?.pl ?? frontmatter.slug;
  const [candidates, readNext, plSource] = await Promise.all([
    loadCandidates(locale),
    getReadNextItems(locale, current),
    locale === "pl" ? null : getContentItem("pl", section, plSlug),
  ]);
  const topic = frontmatter.topic ?? plSource?.frontmatter.topic;

  const picks = selectMoreInTopic(
    candidates,
    { section, plSlug, topic: isContentTopic(topic) ? topic : undefined },
    readNext.map((r) => hubEntryKey({ section: r.section, plSlug: r.item.plSlug })),
  );
  return picks.map(({ item, section: s }) => ({ item, section: s }));
}
