/**
 * Homepage "recently published and updated" list. Pure and framework-free; loading lives in
 * `content-discovery.ts`.
 */

export interface RecentEntry {
  /** Slug of the Polish source item. Identity shared by all translations. */
  plSlug: string;
  section: "blog" | "guides";
  /** ISO date or Date of publication. */
  date: string | Date;
  /** ISO date or Date of the last significant update. */
  updated?: string | Date;
  /** True when the item exists in the requested locale (always true for PL). */
  translated: boolean;
}

export const RECENT_ACTIVITY_COUNT = 6;

const time = (date: string | Date | undefined) => {
  if (date === undefined) {
    return 0;
  }
  const t = new Date(date).getTime();
  return Number.isNaN(t) ? 0 : t;
};

/** When the item last changed: its update date if that is later than publication, else `date`. */
export function activityTime(entry: Pick<RecentEntry, "date" | "updated">): number {
  return Math.max(time(entry.date), time(entry.updated));
}

/** True when the activity is an update of an older item rather than a fresh publication. */
export function isUpdate(entry: Pick<RecentEntry, "date" | "updated">): boolean {
  return time(entry.updated) > time(entry.date);
}

/**
 * Items by most recent activity (publication or update), newest first, ties by section then
 * `plSlug`. Translated items come before PL fallbacks only when the cut-off would otherwise
 * drop them: ordering itself is by activity, so the list reads as a chronology.
 */
export function selectRecentActivity<T extends RecentEntry>(
  entries: readonly T[],
  limit: number = RECENT_ACTIVITY_COUNT,
): T[] {
  const byActivity = (a: T, b: T) =>
    activityTime(b) - activityTime(a) ||
    a.section.localeCompare(b.section) ||
    a.plSlug.localeCompare(b.plSlug);

  const translated = entries.filter((e) => e.translated);
  const fallbacks = entries.filter((e) => !e.translated);
  const picked = [...translated].sort(byActivity).slice(0, limit);
  if (picked.length < limit) {
    picked.push(...[...fallbacks].sort(byActivity).slice(0, limit - picked.length));
  }
  return picked.sort(byActivity);
}
