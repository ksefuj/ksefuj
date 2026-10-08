import { describe, expect, it } from "vitest";
import type { ContentItem } from "./content";
import { buildIssueHelpLinks } from "./validator-pages";

function page(slug: string, codes?: string[]): ContentItem {
  return {
    frontmatter: {
      title: slug,
      description: "",
      date: "2026-10-08",
      section: "validator",
      locale: "pl",
      slug,
      codes,
    },
    content: "",
    readingTime: 1,
  };
}

describe("buildIssueHelpLinks", () => {
  it("maps every code to its localized page path", () => {
    const items = [page("a", ["X", "Y"]), page("b", ["Z"]), page("c")];
    expect(buildIssueHelpLinks("pl", items)).toEqual({
      X: "/validator/a",
      Y: "/validator/a",
      Z: "/validator/b",
    });
    expect(buildIssueHelpLinks("en", items).Z).toBe("/en/validator/b");
  });

  it("keeps the first page when two claim the same code", () => {
    expect(buildIssueHelpLinks("pl", [page("a", ["X"]), page("b", ["X"])])).toEqual({
      X: "/validator/a",
    });
  });
});
