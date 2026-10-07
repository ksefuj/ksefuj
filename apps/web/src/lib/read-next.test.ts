import { describe, expect, it } from "vitest";
import { type ReadNextEntry, selectReadNext } from "./read-next";

function entry(
  plSlug: string,
  overrides: Partial<ReadNextEntry> = {},
): ReadNextEntry & { id: string } {
  return {
    id: plSlug,
    plSlug,
    section: "blog",
    topic: "invoicing",
    date: "2026-01-01",
    translated: true,
    ...overrides,
  };
}

const slugs = (picks: Array<{ entry: { plSlug: string } }>) => picks.map((p) => p.entry.plSlug);

describe("selectReadNext", () => {
  const current = { plSlug: "me", section: "blog", topic: "invoicing" };

  it("puts related items first, in the listed order", () => {
    const candidates = [
      entry("a", { date: "2026-03-01" }),
      entry("b", { date: "2026-02-01", topic: "errors" }),
      entry("c", { date: "2026-01-15", topic: "deadlines" }),
      entry("d", { date: "2026-01-01" }),
    ];
    const picks = selectReadNext({ ...current, related: ["blog/c", "blog/b"] }, candidates);
    expect(slugs(picks)).toEqual(["c", "b", "a"]);
    expect(picks.map((p) => p.reason)).toEqual(["related", "related", "topic"]);
  });

  it("resolves section-qualified related refs and ignores unknown or bare ones", () => {
    const candidates = [
      entry("a"),
      entry("guide", { section: "guides", topic: "access", date: "2025-01-01" }),
    ];
    const picks = selectReadNext(
      { ...current, related: ["blog/missing", "a", "guides/guide"] },
      candidates,
    );
    expect(slugs(picks)).toEqual(["guide", "a"]);
    expect(picks.map((p) => p.reason)).toEqual(["related", "topic"]);
  });

  it("tells apart the same slug in different sections", () => {
    const candidates = [
      entry("same", { section: "blog", date: "2026-01-01" }),
      entry("same", { section: "guides", date: "2026-02-01" }),
      entry("other", { topic: "errors", date: "2026-03-01" }),
    ];
    const picks = selectReadNext({ ...current, related: ["blog/same"] }, candidates);
    expect(picks[0]).toMatchObject({ reason: "related", entry: { section: "blog" } });
  });

  it("fills with same-topic items from blog and guides together, newest first", () => {
    const candidates = [
      entry("old-blog", { date: "2026-01-01" }),
      entry("guide", { section: "guides", date: "2026-02-01" }),
      entry("other", { topic: "errors", date: "2026-05-01" }),
      entry("new-blog", { date: "2026-03-01" }),
    ];
    const picks = selectReadNext(current, candidates);
    expect(slugs(picks)).toEqual(["new-blog", "guide", "old-blog"]);
    expect(picks.every((p) => p.reason === "topic")).toBe(true);
  });

  it("falls back to the newest items overall when the topic runs out", () => {
    const candidates = [
      entry("same", { date: "2026-01-01" }),
      entry("x", { topic: "errors", date: "2026-02-01" }),
      entry("y", { topic: "access", date: "2026-04-01" }),
      entry("z", { topic: "deadlines", date: "2026-03-01" }),
    ];
    const picks = selectReadNext(current, candidates);
    expect(slugs(picks)).toEqual(["same", "y", "z"]);
    expect(picks.map((p) => p.reason)).toEqual(["topic", "recent", "recent"]);
  });

  it("works for an item without a topic", () => {
    const candidates = [entry("a", { date: "2026-01-01" }), entry("b", { date: "2026-02-01" })];
    const picks = selectReadNext({ plSlug: "me", section: "blog" }, candidates);
    expect(slugs(picks)).toEqual(["b", "a"]);
    expect(picks.every((p) => p.reason === "recent")).toBe(true);
  });

  it("never returns the current item, even when listed in related", () => {
    const candidates = [entry("me"), entry("a"), entry("b"), entry("c")];
    const picks = selectReadNext({ ...current, related: ["blog/me"] }, candidates);
    expect(slugs(picks)).not.toContain("me");
    expect(picks).toHaveLength(3);
  });

  it("only excludes the current item in its own section", () => {
    const candidates = [entry("me", { section: "guides" }), entry("a")];
    expect(slugs(selectReadNext(current, candidates))).toContain("me");
  });

  it("does not repeat an item that matches several rules", () => {
    const candidates = [entry("a"), entry("b"), entry("c"), entry("d")];
    const picks = selectReadNext({ ...current, related: ["blog/a", "blog/a"] }, candidates);
    expect(new Set(slugs(picks)).size).toBe(picks.length);
    expect(picks[0].reason).toBe("related");
  });

  it("prefers translated items over PL fallbacks, topic first within each group", () => {
    const candidates = [
      entry("pl-topic", { translated: false, date: "2026-05-01" }),
      entry("tr-recent", { topic: "errors", date: "2026-02-01" }),
      entry("tr-topic", { date: "2026-01-01" }),
      entry("pl-recent", { translated: false, topic: "errors", date: "2026-06-01" }),
      entry("tr-recent-2", { topic: "access", date: "2026-03-01" }),
    ];
    const picks = selectReadNext(current, candidates, 5);
    expect(slugs(picks)).toEqual(["tr-topic", "tr-recent-2", "tr-recent", "pl-topic", "pl-recent"]);
    expect(picks.map((p) => p.reason)).toEqual(["topic", "recent", "recent", "topic", "recent"]);
  });

  it("falls back to PL items when too few translations exist", () => {
    const candidates = [
      entry("tr", { date: "2026-01-01" }),
      entry("pl-1", { translated: false, date: "2026-02-01" }),
      entry("pl-2", { translated: false, date: "2026-03-01" }),
    ];
    expect(slugs(selectReadNext(current, candidates))).toEqual(["tr", "pl-2", "pl-1"]);
  });

  it("returns fewer than three when the site has fewer other items", () => {
    expect(slugs(selectReadNext(current, [entry("me"), entry("a")]))).toEqual(["a"]);
    expect(selectReadNext(current, [entry("me")])).toEqual([]);
    expect(selectReadNext(current, [])).toEqual([]);
  });

  it("handles Date objects and keeps input order for equal dates", () => {
    const candidates = [
      entry("first", { date: new Date("2026-03-01") }),
      entry("second", { date: "2026-03-01" }),
      entry("third", { date: new Date("2026-02-01") }),
    ];
    expect(slugs(selectReadNext(current, candidates))).toEqual(["first", "second", "third"]);
  });

  it("respects a custom limit", () => {
    const candidates = [entry("a"), entry("b"), entry("c"), entry("d")];
    expect(selectReadNext(current, candidates, 2)).toHaveLength(2);
  });
});
