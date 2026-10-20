"use client";

import type { ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { type FilterChip, FilterChips } from "@/components/filter-chips";
import type { ContentTopic } from "@/lib/topics";
import {
  availableTopics,
  buildListingHref,
  filterListingItems,
  type ListingFilters,
  parseListingFiltersFromParams,
} from "@/lib/listing-filters";

export interface BlogListingItem {
  /** Unique across posts and guides (prefix with the section). */
  key: string;
  topic?: ContentTopic;
  translated: boolean;
  /** Pre-rendered lead row (larger title), used when this item is first in the current view. */
  lead: ReactNode;
  /** Pre-rendered list row. */
  card: ReactNode;
}

export interface BlogListingProps {
  locale: string;
  basePath: string;
  /** Posts and guides, already merged and sorted by date (newest first). */
  items: BlogListingItem[];
  labels: {
    allTopics: string;
    topics: Record<ContentTopic, string>;
    topicFilter: string;
    languageFilter: string;
    languageAll: string;
    languageTranslatedOnly: string;
    empty: string;
  };
}

const NO_FILTERS: ListingFilters = { translatedOnly: false };

/**
 * Blog listing body. The page itself is static: the server renders every post and guide into
 * one date-sorted `items` list, and this component only decides which of them to show. With no JS (and in the
 * static HTML crawlers see) the unfiltered list is rendered, see `BlogListing`'s Suspense fallback.
 */
export function BlogListingView({
  filters,
  locale,
  basePath,
  items,
  labels,
}: BlogListingProps & { filters: ListingFilters }) {
  const { topic: activeTopic, translatedOnly } = filters;

  // Posts and guides share one list and follow the same topic and language filters. The first
  // visible item always gets the lead variant, so a filtered view opens the same way as the full one.
  const visibleItems = filterListingItems(items, filters);
  const [lead, ...rest] = visibleItems;

  const topicChips: FilterChip[] = [
    {
      key: "all",
      label: labels.allTopics,
      href: buildListingHref(basePath, { translatedOnly }),
      active: !activeTopic,
      event: "topic_filter_selected",
      eventProps: { locale, section: "blog", topic: "all" },
    },
    ...availableTopics(items, { translatedOnly }).map((topic) => ({
      key: topic,
      label: labels.topics[topic],
      href: buildListingHref(basePath, { topic, translatedOnly }),
      active: activeTopic === topic,
      event: "topic_filter_selected",
      eventProps: { locale, section: "blog", topic },
    })),
  ];

  const languageChips: FilterChip[] = [
    {
      key: "all",
      label: labels.languageAll,
      href: buildListingHref(basePath, { topic: activeTopic }),
      active: !translatedOnly,
    },
    {
      key: "translated",
      label: labels.languageTranslatedOnly,
      href: buildListingHref(basePath, { topic: activeTopic, translatedOnly: true }),
      active: translatedOnly,
    },
  ];

  return (
    <>
      <div className="space-y-3">
        <FilterChips chips={topicChips} label={labels.topicFilter} />
        {locale !== "pl" && <FilterChips chips={languageChips} label={labels.languageFilter} />}
      </div>

      {!lead ? (
        <p className="text-slate-500">{labels.empty}</p>
      ) : (
        <>
          <ul className="divide-y divide-slate-200 border-y border-slate-200">
            <li key={lead.key}>{lead.lead}</li>
            {rest.map((item) => (
              <li key={item.key}>{item.card}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

/** Reads `?topic=` / `?filter=` on the client. Must sit inside a `<Suspense>` boundary. */
export function BlogListing(props: BlogListingProps) {
  const filters = parseListingFiltersFromParams(useSearchParams());
  return <BlogListingView {...props} filters={filters} />;
}

/** Suspense fallback: the full, unfiltered list (what static HTML and no-JS clients get). */
export function BlogListingFallback(props: BlogListingProps) {
  return <BlogListingView {...props} filters={NO_FILTERS} />;
}
