import { describe, expect, it } from "vitest";
import { type LatestPostEntry, selectLatestPosts } from "./latest-posts";

function entry(plSlug: string, overrides: Partial<LatestPostEntry> = {}): LatestPostEntry {
  return {
    plSlug,
    section: "blog",
    title: plSlug,
    date: "2026-01-01",
    featured: false,
    translated: true,
    ...overrides,
  };
}

const slugs = (picks: LatestPostEntry[]) => picks.map((p) => p.plSlug);

describe("selectLatestPosts", () => {
  it("puts featured items first, newest first, then fills with the newest posts", () => {
    const picks = selectLatestPosts([
      entry("new", { date: "2026-05-01" }),
      entry("pinned-old", { date: "2025-01-01", featured: true }),
      entry("pinned-new", { date: "2026-02-01", featured: true }),
      entry("mid", { date: "2026-03-01" }),
    ]);
    expect(slugs(picks)).toEqual(["pinned-new", "pinned-old", "new"]);
  });

  it("returns the 3 newest posts when nothing is featured", () => {
    const picks = selectLatestPosts([
      entry("a", { date: "2026-01-01" }),
      entry("d", { date: "2026-04-01" }),
      entry("b", { date: "2026-02-01" }),
      entry("c", { date: "2026-03-01" }),
    ]);
    expect(slugs(picks)).toEqual(["d", "c", "b"]);
  });

  it("does not repeat a featured post in the newest fill", () => {
    const picks = selectLatestPosts([
      entry("pinned", { date: "2026-05-01", featured: true }),
      entry("b", { date: "2026-04-01" }),
      entry("c", { date: "2026-03-01" }),
      entry("d", { date: "2026-02-01" }),
    ]);
    expect(slugs(picks)).toEqual(["pinned", "b", "c"]);
  });

  it("ignores duplicate entries with the same section and PL slug", () => {
    const picks = selectLatestPosts([
      entry("a", { date: "2026-03-01" }),
      entry("a", { date: "2026-03-01" }),
      entry("b", { date: "2026-02-01" }),
    ]);
    expect(slugs(picks)).toEqual(["a", "b"]);
  });

  it("prefers translated items over PL fallbacks within each tier", () => {
    const picks = selectLatestPosts([
      entry("pl-newest", { date: "2026-06-01", translated: false }),
      entry("tr-old", { date: "2025-06-01" }),
      entry("tr-mid", { date: "2026-01-01" }),
      entry("pl-pinned", { date: "2025-01-01", featured: true, translated: false }),
      entry("tr-pinned", { date: "2024-01-01", featured: true }),
    ]);
    expect(slugs(picks)).toEqual(["tr-pinned", "pl-pinned", "tr-mid"]);
  });

  it("falls back to PL items when too few are translated", () => {
    const picks = selectLatestPosts([
      entry("tr", { date: "2025-01-01" }),
      entry("pl-a", { date: "2026-02-01", translated: false }),
      entry("pl-b", { date: "2026-03-01", translated: false }),
      entry("pl-c", { date: "2026-04-01", translated: false }),
    ]);
    expect(slugs(picks)).toEqual(["tr", "pl-c", "pl-b"]);
  });

  it("returns fewer than 3 when there are fewer eligible items", () => {
    expect(selectLatestPosts([])).toEqual([]);
    expect(slugs(selectLatestPosts([entry("a"), entry("b")]))).toEqual(["a", "b"]);
  });

  it("uses guides only when featured", () => {
    const picks = selectLatestPosts([
      entry("guide", { section: "guides", date: "2026-06-01" }),
      entry("pinned-guide", { section: "guides", date: "2025-01-01", featured: true }),
      entry("post", { date: "2026-01-01" }),
    ]);
    expect(slugs(picks)).toEqual(["pinned-guide", "post"]);
  });

  it("treats a blog post and a guide with the same PL slug as different items", () => {
    const picks = selectLatestPosts([
      entry("same", { section: "guides", featured: true }),
      entry("same", { date: "2026-02-01" }),
    ]);
    expect(picks.map((p) => p.section)).toEqual(["guides", "blog"]);
  });

  it("orders same-date items by updated, then title, then PL slug, whatever the input order", () => {
    const items = [
      entry("slug-d", { title: "Beta", date: "2026-03-01" }),
      entry("slug-c", { title: "Alpha", date: "2026-03-01" }),
      entry("slug-b", { title: "Alpha", date: "2026-03-01", updated: "2026-03-05" }),
      entry("slug-a", { title: "Zeta", date: "2026-03-01", updated: "2026-03-09" }),
      entry("slug-e", { title: "Alpha", date: "2026-03-01" }),
    ];
    const expected = ["slug-a", "slug-b", "slug-c", "slug-e", "slug-d"];
    expect(slugs(selectLatestPosts(items, 5))).toEqual(expected);
    expect(slugs(selectLatestPosts([...items].reverse(), 5))).toEqual(expected);
  });

  it("accepts Date objects as parsed by YAML front matter", () => {
    const picks = selectLatestPosts([
      entry("old", { date: new Date("2025-01-01") }),
      entry("new", { date: new Date("2026-01-01") }),
    ]);
    expect(slugs(picks)).toEqual(["new", "old"]);
  });
});
