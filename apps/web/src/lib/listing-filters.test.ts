import { describe, expect, it } from "vitest";
import {
  availableTopics,
  buildListingHref,
  filterListingItems,
  parseListingFiltersFromParams,
} from "./listing-filters";

const items = [
  { id: "a", topic: "errors" as const, translated: true },
  { id: "b", topic: "access" as const, translated: false },
  { id: "c", topic: "errors" as const, translated: false },
];

describe("listing filters", () => {
  it("parses topic and filter from search params, ignoring unknown topics", () => {
    const params = new URLSearchParams("topic=errors&filter=translated");
    expect(parseListingFiltersFromParams(params)).toEqual({
      topic: "errors",
      translatedOnly: true,
    });
    expect(parseListingFiltersFromParams(new URLSearchParams("topic=nope"))).toEqual({
      topic: undefined,
      translatedOnly: false,
    });
  });

  it("filters by topic and language, keeping order", () => {
    expect(filterListingItems(items, {}).map((i) => i.id)).toEqual(["a", "b", "c"]);
    expect(filterListingItems(items, { topic: "errors" }).map((i) => i.id)).toEqual(["a", "c"]);
    expect(
      filterListingItems(items, { topic: "errors", translatedOnly: true }).map((i) => i.id),
    ).toEqual(["a"]);
  });

  it("lists only topics that still have items, in the canonical order", () => {
    expect(availableTopics(items, { translatedOnly: false })).toEqual(["access", "errors"]);
    expect(availableTopics(items, { translatedOnly: true })).toEqual(["errors"]);
  });

  it("builds bare and filtered hrefs", () => {
    expect(buildListingHref("/blog", {})).toBe("/blog");
    expect(buildListingHref("/blog", { topic: "errors", translatedOnly: true })).toBe(
      "/blog?topic=errors&filter=translated",
    );
  });
});
