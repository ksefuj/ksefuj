"use client";

import type { ReactNode } from "react";
import Link from "next/link";
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

export interface BlogListingPost {
  key: string;
  topic?: ContentTopic;
  translated: boolean;
  /** Pre-rendered lead row (larger title), used when this post is first in the current view. */
  lead: ReactNode;
  /** Pre-rendered list row. */
  card: ReactNode;
}

export interface BlogListingGuide {
  key: string;
  translated: boolean;
  /** Pre-rendered compact row. */
  card: ReactNode;
}

export interface BlogListingProps {
  locale: string;
  basePath: string;
  guidesPath: string;
  posts: BlogListingPost[];
  guides: BlogListingGuide[];
  labels: {
    allTopics: string;
    topics: Record<ContentTopic, string>;
    topicFilter: string;
    languageFilter: string;
    languageAll: string;
    languageTranslatedOnly: string;
    guidesStrip: string;
    empty: string;
  };
}

const NO_FILTERS: ListingFilters = { translatedOnly: false };

/**
 * Blog listing body. The page itself is static: the server renders every post and guide into
 * `posts`/`guides`, and this component only decides which of them to show. With no JS (and in the
 * static HTML crawlers see) the unfiltered list is rendered, see `BlogListing`'s Suspense fallback.
 */
export function BlogListingView({
  filters,
  locale,
  basePath,
  guidesPath,
  posts,
  guides,
  labels,
}: BlogListingProps & { filters: ListingFilters }) {
  const { topic: activeTopic, translatedOnly } = filters;

  const visiblePosts = filterListingItems(posts, filters);
  // Guides follow the same topic filter, so a topic view (e.g. from a homepage hub) lists them too.
  const visibleGuides = filterListingItems(guides, filters);
  const [lead, ...rest] = visiblePosts;

  const topicChips: FilterChip[] = [
    {
      key: "all",
      label: labels.allTopics,
      href: buildListingHref(basePath, { translatedOnly }),
      active: !activeTopic,
      event: "topic_filter_selected",
      eventProps: { locale, section: "blog", topic: "all" },
    },
    ...availableTopics(posts, { translatedOnly }).map((topic) => ({
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
            {rest.map((post) => (
              <li key={post.key}>{post.card}</li>
            ))}
          </ul>

          {visibleGuides.length > 0 && (
            <section aria-labelledby="guides-strip-heading" className="space-y-2">
              <h2
                id="guides-strip-heading"
                className="font-display text-xl font-bold tracking-tight text-slate-900"
              >
                <Link
                  href={guidesPath}
                  className="hover:text-violet-700 hover:underline underline-offset-4"
                >
                  {labels.guidesStrip}
                </Link>
              </h2>
              <ul className="grid gap-x-8 divide-y divide-slate-200 border-y border-slate-200 sm:grid-cols-2 sm:divide-y-0">
                {visibleGuides.map((guide) => (
                  <li key={guide.key} className="border-slate-200 sm:border-b sm:last:border-b-0">
                    {guide.card}
                  </li>
                ))}
              </ul>
            </section>
          )}
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
