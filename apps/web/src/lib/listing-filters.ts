import { CONTENT_TOPICS, type ContentTopic, isContentTopic } from "./topics";

type Param = string | string[] | undefined;

function first(value: Param): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export interface ListingFilters {
  /** Valid `?topic=` value. Unknown values are ignored. */
  topic?: ContentTopic;
  /** `?filter=translated` (EN/UK): hide items that only exist in Polish. */
  translatedOnly: boolean;
}

export function parseListingFilters(query: { topic?: Param; filter?: Param }): ListingFilters {
  const topic = first(query.topic);
  return {
    topic: isContentTopic(topic) ? topic : undefined,
    translatedOnly: first(query.filter) === "translated",
  };
}

/** Parses filters from `useSearchParams()` (or any `URLSearchParams`-like object). */
export function parseListingFiltersFromParams(params: {
  get(name: string): string | null;
}): ListingFilters {
  return parseListingFilters({
    topic: params.get("topic") ?? undefined,
    filter: params.get("filter") ?? undefined,
  });
}

export interface ListingItemMeta {
  topic?: ContentTopic;
  /** False for PL fallbacks shown in EN/UK. */
  translated: boolean;
}

/** Items visible under the filters, order preserved (listings are sorted newest first). */
export function filterListingItems<T extends ListingItemMeta>(
  items: readonly T[],
  filters: Partial<ListingFilters>,
): T[] {
  return items.filter(
    (item) =>
      (!filters.translatedOnly || item.translated) &&
      (!filters.topic || item.topic === filters.topic),
  );
}

/** Topics that have at least one item once the language filter is applied, in list order. */
export function availableTopics(
  items: readonly ListingItemMeta[],
  filters: Pick<ListingFilters, "translatedOnly">,
): ContentTopic[] {
  const visible = filterListingItems(items, { translatedOnly: filters.translatedOnly });
  return CONTENT_TOPICS.filter((topic) => visible.some((item) => item.topic === topic));
}

/** Listing URL for a filter combination; the unfiltered view is the bare path. */
export function buildListingHref(basePath: string, filters: Partial<ListingFilters>): string {
  const params = new URLSearchParams();
  if (filters.topic) {
    params.set("topic", filters.topic);
  }
  if (filters.translatedOnly) {
    params.set("filter", "translated");
  }
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}
