/**
 * NBP range-window planning tests.
 *
 * The windows decide which NBP range requests are made; getting them wrong either
 * under-fetches (false CURRENCY_RATE_UNVERIFIABLE) or exceeds NBP's 367-day range
 * limit, which fails the request and marks a whole currency unverifiable.
 */

import { describe, expect, it } from "vitest";
import { NBP_MIN_DATE, rateWindows } from "./nbp";

/** Inclusive length of a window in days. */
function span(window: { start: string; end: string }): number {
  const ms =
    new Date(`${window.end}T12:00:00Z`).getTime() - new Date(`${window.start}T12:00:00Z`).getTime();
  return Math.round(ms / 86_400_000) + 1;
}

describe("rateWindows", () => {
  it("covers the 10 days before a single date, ending the day before it", () => {
    expect(rateWindows(["2026-08-05"])).toEqual([{ start: "2026-07-26", end: "2026-08-04" }]);
  });

  it("merges overlapping windows into one request", () => {
    // Three invoices in the same week share almost all of their lookback
    const windows = rateWindows(["2026-08-03", "2026-08-04", "2026-08-05"]);
    expect(windows).toEqual([{ start: "2026-07-24", end: "2026-08-04" }]);
  });

  it("keeps distant dates as separate windows instead of one long span", () => {
    // The old behaviour fetched 2026-01-01 through 2026-12-30 as a single range
    const windows = rateWindows(["2026-01-05", "2026-12-31"]);
    expect(windows).toEqual([
      { start: "2025-12-26", end: "2026-01-04" },
      { start: "2026-12-21", end: "2026-12-30" },
    ]);
  });

  it("never emits a window longer than NBP's 367-day limit", () => {
    // A dense run of dates merges into one span far longer than the API allows
    const dates: string[] = [];
    for (let month = 0; month < 24; month++) {
      const year = 2025 + Math.floor(month / 12);
      const m = String((month % 12) + 1).padStart(2, "0");
      dates.push(`${year}-${m}-05`, `${year}-${m}-13`, `${year}-${m}-21`, `${year}-${m}-28`);
    }
    const windows = rateWindows(dates);
    expect(windows.length).toBeGreaterThan(1);
    for (const window of windows) {
      expect(span(window)).toBeLessThanOrEqual(367);
    }
  });

  it("produces contiguous chunks when it splits a long span", () => {
    const dates: string[] = [];
    for (let month = 0; month < 24; month++) {
      const year = 2025 + Math.floor(month / 12);
      const m = String((month % 12) + 1).padStart(2, "0");
      dates.push(`${year}-${m}-05`, `${year}-${m}-13`, `${year}-${m}-21`, `${year}-${m}-28`);
    }
    const windows = rateWindows(dates);
    for (let i = 1; i < windows.length; i++) {
      const previousEnd = new Date(`${windows[i - 1].end}T12:00:00Z`);
      previousEnd.setUTCDate(previousEnd.getUTCDate() + 1);
      expect(windows[i].start).toBe(previousEnd.toISOString().slice(0, 10));
    }
  });

  it("still covers every requested date after splitting", () => {
    const dates = ["2025-03-10", "2025-09-01", "2026-02-17", "2026-08-05"];
    const windows = rateWindows(dates);
    for (const date of dates) {
      // The rate for `date` is the last publication strictly before it
      const dayBefore = new Date(`${date}T12:00:00Z`);
      dayBefore.setUTCDate(dayBefore.getUTCDate() - 1);
      const needed = dayBefore.toISOString().slice(0, 10);
      expect(windows.some((w) => needed >= w.start && needed <= w.end)).toBe(true);
    }
  });

  it("drops dates with no NBP era to look back into", () => {
    expect(rateWindows([NBP_MIN_DATE])).toEqual([]);
    expect(rateWindows(["1999-01-01"])).toEqual([]);
  });

  it("clamps the lookback to the start of the NBP era", () => {
    const [window] = rateWindows(["2002-01-06"]);
    expect(window.start).toBe(NBP_MIN_DATE);
    expect(window.end).toBe("2002-01-05");
  });

  it("returns nothing for an empty input", () => {
    expect(rateWindows([])).toEqual([]);
  });
});
