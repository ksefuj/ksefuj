import { describe, expect, it } from "vitest";
import { isUpdate, type RecentEntry, selectRecentActivity } from "./recent-activity";

const e = (plSlug: string, over: Partial<RecentEntry> = {}): RecentEntry => ({
  plSlug,
  section: "blog",
  date: "2026-01-01",
  translated: true,
  ...over,
});
const slugs = (items: RecentEntry[]) => items.map((i) => i.plSlug);

describe("selectRecentActivity", () => {
  it("orders by the later of publication and update", () => {
    const out = selectRecentActivity([
      e("published-march", { date: "2026-03-01" }),
      e("updated-april", { date: "2026-01-01", updated: "2026-04-01" }),
      e("published-feb", { date: "2026-02-01" }),
    ]);
    expect(slugs(out)).toEqual(["updated-april", "published-march", "published-feb"]);
  });

  it("caps at the limit", () => {
    const many = Array.from({ length: 10 }, (_, i) =>
      e(`p${i}`, { date: `2026-01-0${(i % 9) + 1}` }),
    );
    expect(selectRecentActivity(many, 6)).toHaveLength(6);
  });

  it("fills with PL fallbacks only when translations run out", () => {
    const out = selectRecentActivity(
      [
        e("fallback-new", { date: "2026-09-01", translated: false }),
        e("translated-a", { date: "2026-01-01" }),
        e("translated-b", { date: "2026-02-01" }),
      ],
      2,
    );
    expect(slugs(out)).toEqual(["translated-b", "translated-a"]);
    expect(
      slugs(selectRecentActivity(out.slice(0, 1).concat(e("fb", { translated: false })), 2)),
    ).toContain("fb");
  });

  it("includes guides", () => {
    expect(selectRecentActivity([e("g", { section: "guides" })])).toHaveLength(1);
  });
});

describe("isUpdate", () => {
  it("is true only when updated is after date", () => {
    expect(isUpdate({ date: "2026-01-01", updated: "2026-02-01" })).toBe(true);
    expect(isUpdate({ date: "2026-01-01", updated: "2026-01-01" })).toBe(false);
    expect(isUpdate({ date: "2026-01-01" })).toBe(false);
  });
});
