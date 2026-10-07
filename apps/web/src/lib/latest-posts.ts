/**
 * Homepage "Latest from the blog" selection. Pure and framework-free so it can be unit tested
 * (see docs/specs/blog-discovery.md, section 5).
 */

export interface LatestPostEntry {
  /** Slug of the Polish source item. Identity shared by all translations. */
  plSlug: string;
  section: "blog" | "guides";
  /** Title as shown on the card. Last-resort tie-break. */
  title: string;
  /** ISO date or Date. */
  date: string | Date;
  /** ISO date or Date of the last significant update. */
  updated?: string | Date;
  /** `featured: true` on the item or on its PL source. */
  featured: boolean;
  /** True when the item exists in the requested locale (always true for PL). */
  translated: boolean;
}

export const LATEST_POSTS_COUNT = 3;

function time(date: string | Date | undefined): number {
  if (date === undefined) {
    return 0;
  }
  const t = new Date(date).getTime();
  return Number.isNaN(t) ? 0 : t;
}

/**
 * Deterministic "newest first" order, independent of the input order (file system order differs
 * between machines): `date` descending, then `updated` descending (a missing `updated` counts as
 * oldest), then `title` ascending by UTF-16 code units, then `plSlug` ascending.
 */
export function compareNewestFirst(a: LatestPostEntry, b: LatestPostEntry): number {
  const byDate = time(b.date) - time(a.date);
  if (byDate !== 0) {
    return byDate;
  }
  const byUpdated = time(b.updated) - time(a.updated);
  if (byUpdated !== 0) {
    return byUpdated;
  }
  if (a.title !== b.title) {
    return a.title < b.title ? -1 : 1;
  }
  if (a.plSlug !== b.plSlug) {
    return a.plSlug < b.plSlug ? -1 : 1;
  }
  return 0;
}

/**
 * Pick up to `limit` items for the homepage, in display order and without duplicates (same
 * section and `plSlug`). Two tiers: items with `featured: true` (blog or guides), then blog
 * posts. Within each tier items with a translation in the requested locale come before PL
 * fallbacks, and each group is sorted with `compareNewestFirst`. Guides are never used as
 * newest fill, only as featured pins. Fewer than `limit` picks come back when there are fewer
 * eligible items.
 */
export function selectLatestPosts<T extends LatestPostEntry>(
  candidates: readonly T[],
  limit: number = LATEST_POSTS_COUNT,
): T[] {
  const picks: T[] = [];
  const seen = new Set<string>();

  const add = (entry: T) => {
    const key = `${entry.section}/${entry.plSlug}`;
    if (picks.length >= limit || seen.has(key)) {
      return;
    }
    seen.add(key);
    picks.push(entry);
  };

  const tiers = [
    candidates.filter((c) => c.featured),
    candidates.filter((c) => c.section === "blog"),
  ];

  for (const tier of tiers) {
    for (const translated of [true, false]) {
      tier
        .filter((c) => c.translated === translated)
        .sort(compareNewestFirst)
        .forEach(add);
    }
  }

  return picks;
}
