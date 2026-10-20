import { describe, expect, it } from "vitest";
import { type HubEntry, selectMoreInTopic, selectTopicHub } from "./topic-hubs";

function entry(plSlug: string, overrides: Partial<HubEntry> = {}): HubEntry {
  return {
    plSlug,
    section: "blog",
    topic: "deadlines",
    date: "2026-01-01",
    featured: false,
    translated: true,
    ...overrides,
  };
}

const slugs = (items: HubEntry[]) => items.map((e) => e.plSlug);

describe("selectTopicHub", () => {
  it("keeps only the topic, featured first, then newest", () => {
    const { items, total } = selectTopicHub(
      [
        entry("old", { date: "2026-01-01" }),
        entry("new", { date: "2026-03-01" }),
        entry("pinned", { date: "2025-01-01", featured: true }),
        entry("other-topic", { topic: "errors" }),
        entry("no-topic", { topic: undefined }),
      ],
      "deadlines",
    );
    expect(slugs(items)).toEqual(["pinned", "new", "old"]);
    expect(total).toBe(3);
  });

  it("puts translated items before PL fallbacks inside each group", () => {
    const { items } = selectTopicHub(
      [
        entry("fallback-new", { date: "2026-05-01", translated: false }),
        entry("translated-old", { date: "2026-01-01" }),
      ],
      "deadlines",
    );
    expect(slugs(items)).toEqual(["translated-old", "fallback-new"]);
  });

  it("caps at the limit but reports the full total", () => {
    const many = Array.from({ length: 9 }, (_, i) => entry(`p${i}`, { date: `2026-01-0${i + 1}` }));
    const { items, total } = selectTopicHub(many, "deadlines", 6);
    expect(items).toHaveLength(6);
    expect(total).toBe(9);
    expect(items[0].plSlug).toBe("p8");
  });

  it("mixes blog posts and guides and does not depend on input order", () => {
    const a = entry("a", { date: "2026-02-01" });
    const b = entry("b", { section: "guides", date: "2026-03-01" });
    expect(slugs(selectTopicHub([a, b], "deadlines").items)).toEqual(["b", "a"]);
    expect(slugs(selectTopicHub([b, a], "deadlines").items)).toEqual(["b", "a"]);
  });

  it("returns nothing for an empty topic", () => {
    expect(selectTopicHub([entry("a")], "access")).toEqual({ items: [], total: 0 });
  });
});

describe("selectMoreInTopic", () => {
  const all = [
    entry("self", { date: "2026-04-01" }),
    entry("read-next", { date: "2026-03-01" }),
    entry("a", { date: "2026-02-01" }),
    entry("b", { date: "2026-01-01" }),
    entry("same-slug-guide", { section: "guides", date: "2026-01-15" }),
    entry("elsewhere", { topic: "errors" }),
  ];

  it("excludes the current item, read-next picks and other topics", () => {
    const out = selectMoreInTopic(all, { section: "blog", plSlug: "self", topic: "deadlines" }, [
      "blog/read-next",
    ]);
    expect(slugs(out)).toEqual(["a", "same-slug-guide", "b"]);
  });

  it("only excludes the current item in its own section", () => {
    const out = selectMoreInTopic([entry("x"), entry("x", { section: "guides" })], {
      section: "blog",
      plSlug: "x",
      topic: "deadlines",
    });
    expect(out.map((e) => e.section)).toEqual(["guides"]);
  });

  it("caps at 8 and returns nothing without a topic", () => {
    const many = Array.from({ length: 12 }, (_, i) =>
      entry(`p${i}`, { date: `2026-01-${10 + i}` }),
    );
    expect(
      selectMoreInTopic(many, { section: "blog", plSlug: "zzz", topic: "deadlines" }),
    ).toHaveLength(8);
    expect(selectMoreInTopic(many, { section: "blog", plSlug: "zzz" })).toEqual([]);
  });
});
