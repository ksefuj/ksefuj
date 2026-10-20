import { describe, expect, it } from "vitest";
import {
  getMilestoneStatus,
  KSEF_MILESTONES,
  type Milestone,
  statusKey,
  warsawDay,
} from "./ksef-calendar";

const at = (iso: string) => new Date(iso);

describe("warsawDay", () => {
  it("uses the Polish calendar day, not UTC", () => {
    expect(warsawDay(at("2026-12-31T23:30:00Z"))).toBe("2027-01-01");
    expect(warsawDay(at("2026-07-01T22:30:00Z"))).toBe("2026-07-02");
    expect(warsawDay(at("2026-12-31T22:59:00Z"))).toBe("2026-12-31");
  });
});

describe("getMilestoneStatus", () => {
  const m = { date: "2026-12-31" };

  it("counts calendar days until the date", () => {
    expect(getMilestoneStatus(m, at("2026-12-30T10:00:00Z"))).toEqual({
      phase: "upcoming",
      days: 1,
    });
    expect(getMilestoneStatus(m, at("2026-10-19T10:00:00Z"))).toEqual({
      phase: "upcoming",
      days: 73,
    });
  });

  it("is 'today' on the day itself, whatever the hour", () => {
    expect(getMilestoneStatus(m, at("2026-12-30T23:00:00Z"))).toEqual({ phase: "today" });
    expect(getMilestoneStatus(m, at("2026-12-31T20:00:00Z"))).toEqual({ phase: "today" });
  });

  it("is 'past' from the next Polish day", () => {
    expect(getMilestoneStatus(m, at("2026-12-31T23:00:00Z"))).toEqual({ phase: "past" });
    expect(getMilestoneStatus(m, at("2030-01-01T00:00:00Z"))).toEqual({ phase: "past" });
  });

  it("handles the DST change without drifting a day", () => {
    expect(getMilestoneStatus({ date: "2026-04-01" }, at("2026-03-28T12:00:00Z"))).toEqual({
      phase: "upcoming",
      days: 4,
    });
  });
});

describe("statusKey", () => {
  const start: Milestone = KSEF_MILESTONES[1];
  const end: Milestone = KSEF_MILESTONES[2];
  const penalties: Milestone = KSEF_MILESTONES[3];

  it("maps start milestones", () => {
    expect(statusKey(start, { phase: "upcoming", days: 3 })).toBe("inDays");
    expect(statusKey(start, { phase: "today" })).toBe("startsToday");
    expect(statusKey(start, { phase: "past" })).toBe("inForce");
  });

  it("maps end milestones", () => {
    expect(statusKey(end, { phase: "upcoming", days: 3 })).toBe("inDays");
    expect(statusKey(end, { phase: "today" })).toBe("lastDay");
    expect(statusKey(end, { phase: "past" })).toBe("ended");
  });

  it("never claims an uncertain milestone is in force", () => {
    expect(penalties.uncertain).toBe(true);
    expect(statusKey(penalties, { phase: "upcoming", days: 10 })).toBe("inDaysUncertain");
    expect(statusKey(penalties, { phase: "today" })).toBe("checkCurrent");
    expect(statusKey(penalties, { phase: "past" })).toBe("checkCurrent");
  });
});

describe("KSEF_MILESTONES", () => {
  it("is sorted by date and has unique ids", () => {
    const dates = KSEF_MILESTONES.map((x) => x.date);
    expect([...dates].sort()).toEqual(dates);
    expect(new Set(KSEF_MILESTONES.map((x) => x.id)).size).toBe(KSEF_MILESTONES.length);
  });
});
