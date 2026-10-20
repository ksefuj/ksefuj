"use client";

import { type CSSProperties, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  getMilestoneStatus,
  KSEF_MILESTONES,
  PENALTIES_RANGE_END,
  timelinePercent,
  warsawDay,
} from "@/lib/ksef-calendar";

interface CalendarTimelineProps {
  /** ISO time the page was rendered at. Used for the first paint so hydration matches. */
  renderedAt: string;
}

// Track sits 5rem from the top of the box; labels hang 0.9rem above or below it.
const TRACK_TOP = "5rem";
const LABEL_ABOVE = { bottom: "5.9rem" } as const;
const LABEL_BELOW = { top: "5.9rem" } as const;

const dash = (color: string): CSSProperties => ({
  backgroundImage: `repeating-linear-gradient(90deg, ${color} 0 6px, transparent 6px 10px)`,
});

function Label({
  title,
  caption,
  className,
  style,
}: {
  title: string;
  caption: string;
  className?: string;
  style: CSSProperties;
}) {
  return (
    <div className={`absolute whitespace-nowrap ${className ?? ""}`} style={style}>
      <p className="font-display text-base font-bold tabular-nums text-slate-900">{title}</p>
      <p className="text-xs text-slate-500">{caption}</p>
    </div>
  );
}

/**
 * Horizontal overview of the calendar milestones (md+ only; the list below it is the mobile view
 * and the accessible content). Positions are proportional to the dates. The "today" marker is
 * computed client-side from the visitor's clock, seeded with `renderedAt` so hydration matches.
 */
export function CalendarTimeline({ renderedAt }: CalendarTimelineProps) {
  const t = useTranslations("landing.calendar.timeline");
  const locale = useLocale();
  const [now, setNow] = useState(() => new Date(renderedAt));

  useEffect(() => {
    setNow(new Date());
  }, []);

  const milestone = (id: string) => KSEF_MILESTONES.find((m) => m.id === id)!;
  const large = milestone("largeTaxpayers");
  const all = milestone("allTaxpayers");
  const reliefsEnd = milestone("reliefsEnd");
  const penalties = milestone("penalties");

  const day = (iso: string) => new Date(`${iso}T12:00:00Z`);
  const fmt = (iso: string, options: Intl.DateTimeFormatOptions) =>
    day(iso).toLocaleDateString(locale, { timeZone: "UTC", ...options });
  const full = { day: "numeric", month: "short", year: "numeric" } as const;
  const dayMonth = { day: "numeric", month: "short" } as const;

  const today = warsawDay(now);
  const todayPct = timelinePercent(today);
  const reached = (m: { date: string }) => getMilestoneStatus(m, now).phase !== "upcoming";

  const pct = {
    large: timelinePercent(large.date),
    all: timelinePercent(all.date),
    mid: timelinePercent(reliefsEnd.date),
    penaltiesStart: timelinePercent(penalties.date),
    rangeEnd: timelinePercent(PENALTIES_RANGE_END),
  };
  const midLabel = `${fmt(reliefsEnd.date, dayMonth)} / ${fmt(penalties.date, full)}`;

  const dotBase = "absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2";
  const dotState = (done: boolean) =>
    done ? "border-emerald-500 bg-emerald-500" : "border-slate-400 bg-[#FAFAF8]";

  return (
    <div role="img" aria-label={t("ariaLabel")} className="mb-8 hidden h-40 md:block">
      <div className="relative mx-2 h-full">
        {/* Track and fills */}
        <div className="absolute inset-x-0 h-0.5 bg-slate-200" style={{ top: TRACK_TOP }} />
        <div
          className="absolute left-0 h-0.5 bg-emerald-500"
          style={{ top: TRACK_TOP, width: `${todayPct}%` }}
        />
        <div
          className="absolute h-0.5"
          style={{
            top: TRACK_TOP,
            left: `${pct.penaltiesStart}%`,
            width: `${pct.rangeEnd - pct.penaltiesStart}%`,
            ...dash("#f59e0b"),
          }}
        />

        {/* Milestone dots */}
        {[
          { left: pct.large, done: reached(large) },
          { left: pct.all, done: reached(all) },
          { left: pct.mid, done: reached(reliefsEnd) },
        ].map(({ left, done }) => (
          <span
            key={left}
            aria-hidden
            className={`${dotBase} ${dotState(done)}`}
            style={{ top: TRACK_TOP, left: `${left}%` }}
          />
        ))}
        <span
          aria-hidden
          className={`${dotBase} border-dashed border-amber-500 bg-[#FAFAF8]`}
          style={{ top: TRACK_TOP, left: `${pct.rangeEnd}%` }}
        />

        {/* Labels: alternate below/above so neighbours never collide */}
        <Label
          title={fmt(large.date, full)}
          caption={t("largeTaxpayers")}
          style={{ left: 0, ...LABEL_BELOW }}
        />
        <Label
          title={fmt(all.date, full)}
          caption={t("allTaxpayers")}
          className="-translate-x-1/2 text-center"
          style={{ left: `${pct.all}%`, ...LABEL_ABOVE }}
        />
        <Label
          title={midLabel}
          caption={t("reliefsEndPenalties")}
          className="-translate-x-1/2 text-center"
          style={{ left: `${pct.mid}%`, ...LABEL_BELOW }}
        />
        <Label
          title={fmt(PENALTIES_RANGE_END, full)}
          caption={t("penaltiesDraft")}
          className="text-right"
          style={{ right: `${100 - pct.rangeEnd}%`, ...LABEL_ABOVE }}
        />

        {/* Today */}
        {todayPct > 0 && todayPct < 100 && (
          <>
            <span
              aria-hidden
              className="absolute w-px -translate-x-1/2 bg-violet-500"
              style={{ left: `${todayPct}%`, top: "3.5rem", height: "3rem" }}
            />
            <span
              className="absolute -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-violet-700"
              style={{ left: `${todayPct}%`, top: "2.25rem" }}
            >
              {t("today")}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
