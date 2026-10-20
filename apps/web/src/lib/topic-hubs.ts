import type { ContentTopic } from "./topics";

/**
 * Pure selection for the homepage topic hubs and the "more in this topic" article block.
 * Framework-free so it can be unit tested; loading lives in `content-discovery.ts`.
 */

export interface HubEntry {
  /** Slug of the Polish source item. Identity shared by all translations. */
  plSlug: string;
  section: "blog" | "guides";
  topic?: ContentTopic;
  /** ISO date or Date. */
  date: string | Date;
  /** `featured: true` on the item or on its PL source. */
  featured: boolean;
  /** True when the item exists in the requested locale (always true for PL). */
  translated: boolean;
}

export const TOPIC_HUB_LIMIT = 6;
export const MORE_IN_TOPIC_LIMIT = 8;

const time = (date: string | Date) => {
  const t = new Date(date).getTime();
  return Number.isNaN(t) ? 0 : t;
};

/** Translated before PL fallbacks, then newest first, then `plSlug` for a stable order. */
function compareTranslatedNewest(a: HubEntry, b: HubEntry): number {
  if (a.translated !== b.translated) {
    return a.translated ? -1 : 1;
  }
  const byDate = time(b.date) - time(a.date);
  if (byDate !== 0) {
    return byDate;
  }
  return a.section.localeCompare(b.section) || a.plSlug.localeCompare(b.plSlug);
}

const key = (e: Pick<HubEntry, "section" | "plSlug">) => `${e.section}/${e.plSlug}`;

/**
 * Items of one topic for its homepage hub: featured first, then the rest, each group translated
 * before PL fallbacks and newest first. At most `limit`, no duplicates. `total` is the number of
 * items the topic has, for the "all in topic" link.
 */
export function selectTopicHub<T extends HubEntry>(
  entries: readonly T[],
  topic: ContentTopic,
  limit: number = TOPIC_HUB_LIMIT,
): { items: T[]; total: number } {
  const inTopic = entries.filter((e) => e.topic === topic);
  const sorted = [
    ...inTopic.filter((e) => e.featured).sort(compareTranslatedNewest),
    ...inTopic.filter((e) => !e.featured).sort(compareTranslatedNewest),
  ];
  const seen = new Set<string>();
  const unique = sorted.filter((e) => !seen.has(key(e)) && seen.add(key(e)));
  return { items: unique.slice(0, limit), total: unique.length };
}

/**
 * Other items of the article's topic: never the article itself, nor anything in `exclude`
 * (the "read next" picks, as `section/plSlug`). Translated first, newest first, at most `limit`.
 */
export function selectMoreInTopic<T extends HubEntry>(
  entries: readonly T[],
  current: { section: "blog" | "guides"; plSlug: string; topic?: ContentTopic },
  exclude: Iterable<string> = [],
  limit: number = MORE_IN_TOPIC_LIMIT,
): T[] {
  if (!current.topic) {
    return [];
  }
  const skip = new Set<string>([key(current), ...exclude]);
  return entries
    .filter((e) => e.topic === current.topic && !skip.has(key(e)))
    .sort(compareTranslatedNewest)
    .slice(0, limit);
}

export { key as hubEntryKey };
