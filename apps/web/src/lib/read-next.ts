/**
 * "Read next" selection. Pure and framework-free so it can be unit tested and reused by any
 * page that needs onward links (see docs/specs/blog-discovery.md, section 2).
 */

export type ReadNextReason = "related" | "topic" | "recent";

export interface ReadNextEntry {
  /** Slug of the Polish source item. Identity shared by all translations. */
  plSlug: string;
  section: string;
  topic?: string;
  /** ISO date or Date. Newest first. */
  date: string | Date;
  /** True when the item exists in the requested locale (always true for PL). */
  translated: boolean;
}

export interface ReadNextCurrent {
  plSlug: string;
  section: string;
  topic?: string;
  /** PL slugs from the frontmatter `related` field. Override the automatic picks. */
  related?: readonly string[];
}

export interface ReadNextPick<T extends ReadNextEntry> {
  entry: T;
  reason: ReadNextReason;
}

export const READ_NEXT_COUNT = 3;

const entryKey = (e: { section: string; plSlug: string }) => `${e.section}/${e.plSlug}`;

function time(date: string | Date): number {
  const t = new Date(date).getTime();
  return Number.isNaN(t) ? 0 : t;
}

/**
 * Pick up to `limit` items to read after `current`, in order and without duplicates:
 *
 * 1. `related` slugs, in the listed order (an editor's choice: locale does not reorder them).
 * 2. Items with translations in the requested locale: same topic first, then newest overall.
 * 3. Items without one (PL fallbacks in EN/UK): same topic first, then newest overall.
 *
 * Within each group items are sorted newest first (stable for equal dates). The current item is
 * never returned. Fewer than `limit` picks come back when the site has fewer other items.
 */
export function selectReadNext<T extends ReadNextEntry>(
  current: ReadNextCurrent,
  candidates: readonly T[],
  limit: number = READ_NEXT_COUNT,
): ReadNextPick<T>[] {
  const picks: ReadNextPick<T>[] = [];
  const seen = new Set<string>([entryKey(current)]);

  const add = (entry: T, reason: ReadNextReason) => {
    if (picks.length >= limit) {
      return;
    }
    const key = entryKey(entry);
    if (seen.has(key)) {
      return;
    }
    seen.add(key);
    picks.push({ entry, reason });
  };

  for (const slug of current.related ?? []) {
    const match = candidates.find((c) => c.plSlug === slug);
    if (match) {
      add(match, "related");
    }
  }

  const newestFirst = [...candidates].sort((a, b) => time(b.date) - time(a.date));

  for (const translated of [true, false]) {
    const pool = newestFirst.filter((c) => c.translated === translated);
    if (current.topic) {
      for (const c of pool) {
        if (c.topic === current.topic) {
          add(c, "topic");
        }
      }
    }
    for (const c of pool) {
      add(c, "recent");
    }
  }

  return picks;
}
