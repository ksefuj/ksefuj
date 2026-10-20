/**
 * Homepage "KSeF calendar": the dated milestones readers ask about most. Locale-independent data
 * and the status logic; copy lives in i18n under `landing.calendar`.
 *
 * Dates and legal bases: see the project CLAUDE.md ("What is KSeF") and
 * docs/knowledge-base/briefs/sankcje-ksef-ud477.md.
 */

export type MilestoneId = "largeTaxpayers" | "allTaxpayers" | "reliefsEnd" | "penalties";

export interface Milestone {
  id: MilestoneId;
  /** Calendar day in Poland, `YYYY-MM-DD`. */
  date: string;
  /** `start`: a duty begins on `date`. `end`: `date` is the last day of a relief. */
  kind: "start" | "end";
  /** The date itself is not settled (announced deferral, draft law). Rendered as uncertain. */
  uncertain?: boolean;
  /** Polish slug of the blog post that covers the milestone. Resolved per locale at render. */
  articlePlSlug?: string;
}

export const KSEF_MILESTONES: readonly Milestone[] = [
  {
    id: "largeTaxpayers",
    date: "2026-02-01",
    kind: "start",
  },
  {
    id: "allTaxpayers",
    date: "2026-04-01",
    kind: "start",
    articlePlSlug: "ksef-od-1-kwietnia-2026",
  },
  {
    id: "reliefsEnd",
    date: "2026-12-31",
    kind: "end",
    articlePlSlug: "koniec-limitu-10000-zl",
  },
  {
    id: "penalties",
    date: "2027-01-01",
    kind: "start",
    uncertain: true,
    articlePlSlug: "kary-ksef-2027-2028",
  },
];

export type MilestoneStatus =
  /** `date` is in the future; `days` is the number of calendar days left (>= 1). */
  | { phase: "upcoming"; days: number }
  /** `date` is today. */
  | { phase: "today" }
  /** `date` is in the past. */
  | { phase: "past" };

const WARSAW_DAY = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Warsaw",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** Calendar day (`YYYY-MM-DD`) of `now` in Poland, so the status flips at Polish midnight. */
export function warsawDay(now: Date): string {
  return WARSAW_DAY.format(now);
}

function dayNumber(isoDay: string): number {
  const [y, m, d] = isoDay.split("-").map(Number);
  return Math.round(Date.UTC(y, m - 1, d) / 86_400_000);
}

/** Status of a milestone relative to `now`. Pure: callers pass the current time. */
export function getMilestoneStatus(milestone: Pick<Milestone, "date">, now: Date): MilestoneStatus {
  const diff = dayNumber(milestone.date) - dayNumber(warsawDay(now));
  if (diff > 0) {
    return { phase: "upcoming", days: diff };
  }
  return diff === 0 ? { phase: "today" } : { phase: "past" };
}

/**
 * i18n key (under `landing.calendar.status`) for a milestone's status line. Uncertain milestones
 * never claim to be in force: once their date passes the reader is sent to check the current law.
 */
export function statusKey(
  milestone: Pick<Milestone, "kind" | "uncertain">,
  status: MilestoneStatus,
): "inDays" | "startsToday" | "inForce" | "lastDay" | "ended" | "checkCurrent" | "inDaysUncertain" {
  if (milestone.uncertain) {
    return status.phase === "upcoming" ? "inDaysUncertain" : "checkCurrent";
  }
  if (status.phase === "upcoming") {
    return "inDays";
  }
  if (milestone.kind === "end") {
    return status.phase === "today" ? "lastDay" : "ended";
  }
  return status.phase === "today" ? "startsToday" : "inForce";
}

/**
 * End of the uncertain penalty range drawn on the homepage timeline. Comes from draft UD477 (not
 * yet enacted), which moves the art. 106ni penalties to 1 January 2028. Change it here only.
 */
export const PENALTIES_RANGE_END = "2028-01-01";

/** Timeline track bounds: the first milestone, and a margin after the end of the penalty range. */
export const TIMELINE_START = "2026-02-01";
export const TIMELINE_END = "2028-03-01";

/** Position of `isoDay` on the timeline track as a percentage (0-100), clamped to the track. */
export function timelinePercent(isoDay: string): number {
  const start = dayNumber(TIMELINE_START);
  const ratio = (dayNumber(isoDay) - start) / (dayNumber(TIMELINE_END) - start);
  return Math.min(100, Math.max(0, ratio * 100));
}
