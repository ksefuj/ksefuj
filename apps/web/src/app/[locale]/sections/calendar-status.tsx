"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { getMilestoneStatus, type Milestone, statusKey } from "@/lib/ksef-calendar";

const TONES: Partial<Record<ReturnType<typeof statusKey>, string>> = {
  inForce: "text-emerald-700",
  startsToday: "text-emerald-700",
  checkCurrent: "text-amber-700",
  inDaysUncertain: "text-amber-700",
};

interface CalendarStatusProps {
  milestone: Pick<Milestone, "date" | "kind" | "uncertain">;
  /** ISO time the page was rendered at. Used for the first paint so hydration matches. */
  renderedAt: string;
}

/**
 * Status line of a calendar milestone. The page is statically generated, so the server HTML
 * carries the status as of the last build/revalidation; after hydration this recomputes it
 * against the visitor's clock and never goes stale.
 */
export function CalendarStatus({ milestone, renderedAt }: CalendarStatusProps) {
  const t = useTranslations("landing.calendar.status");
  const [now, setNow] = useState(() => new Date(renderedAt));

  useEffect(() => {
    setNow(new Date());
  }, []);

  const status = getMilestoneStatus(milestone, now);
  const key = statusKey(milestone, status);
  const days = status.phase === "upcoming" ? status.days : 0;
  const tone = TONES[key] ?? "text-slate-600";

  return <span className={tone}>{t(key, { days })}</span>;
}
