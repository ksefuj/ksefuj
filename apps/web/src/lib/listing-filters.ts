import { type ContentTopic, isContentTopic } from "./topics";

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
