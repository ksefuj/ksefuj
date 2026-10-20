"use client";

import type { ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { type FilterChip, FilterChips } from "@/components/filter-chips";
import type { ContentTopic } from "@/lib/topics";
import {
  availableTopics,
  buildListingHref,
  filterListingItems,
  parseListingFiltersFromParams,
} from "@/lib/listing-filters";

export interface GuidesListingItem {
  key: string;
  topic?: ContentTopic;
  translated: boolean;
  /** Pre-rendered list row (the first one gets the lead variant). */
  card: ReactNode;
  /** Pre-rendered lead row, used when this guide is first in the current view. */
  lead: ReactNode;
}

export interface GuidesListingProps {
  locale: string;
  basePath: string;
  guides: GuidesListingItem[];
  labels: {
    allTopics: string;
    topics: Record<ContentTopic, string>;
    topicFilter: string;
    empty: string;
  };
}

/**
 * Guides listing body. The page is static and renders every guide; this only picks the ones to
 * show for `?topic=`. Pass `topic` explicitly for the no-JS fallback (unfiltered).
 */
export function GuidesListingView({
  topic: activeTopic,
  locale,
  basePath,
  guides,
  labels,
}: GuidesListingProps & { topic?: ContentTopic }) {
  const visible = filterListingItems(guides, { topic: activeTopic });

  const chips: FilterChip[] = [
    {
      key: "all",
      label: labels.allTopics,
      href: basePath,
      active: !activeTopic,
      event: "topic_filter_selected",
      eventProps: { locale, section: "guides", topic: "all" },
    },
    ...availableTopics(guides, { translatedOnly: false }).map((topic) => ({
      key: topic,
      label: labels.topics[topic],
      href: buildListingHref(basePath, { topic }),
      active: activeTopic === topic,
      event: "topic_filter_selected",
      eventProps: { locale, section: "guides", topic },
    })),
  ];

  return (
    <>
      <FilterChips chips={chips} label={labels.topicFilter} />

      {visible.length === 0 ? (
        <p className="text-slate-500">{labels.empty}</p>
      ) : (
        <ul className="divide-y divide-slate-200 border-y border-slate-200">
          {visible.map((guide, index) => (
            <li key={guide.key}>{index === 0 ? guide.lead : guide.card}</li>
          ))}
        </ul>
      )}
    </>
  );
}

/** Reads `?topic=` on the client. Must sit inside a `<Suspense>` boundary. */
export function GuidesListing(props: GuidesListingProps) {
  const { topic } = parseListingFiltersFromParams(useSearchParams());
  return <GuidesListingView {...props} topic={topic} />;
}

/** Suspense fallback: every guide, unfiltered (what static HTML and no-JS clients get). */
export function GuidesListingFallback(props: GuidesListingProps) {
  return <GuidesListingView {...props} />;
}
