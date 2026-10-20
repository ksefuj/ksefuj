import { getTranslations } from "next-intl/server";
import { TrackedLink } from "@/components/tracked-link";
import { buildContentPath, type ContentItemWithLocale } from "@/lib/content";
import { isContentTopic } from "@/lib/topics";
import { isUpdate } from "@/lib/recent-activity";
import { CoverTile } from "@/components/cover-tile";
import { TopicLabel } from "@/components/topic-label";
import { toIsoDay } from "@/lib/content-dates";
import { cn } from "@/lib/utils";

export interface ContentRowTrack {
  event: string;
  props: Record<string, string | number>;
}

interface ContentRowProps {
  item: ContentItemWithLocale;
  /** UI locale. A row whose `item.contentLocale` differs gets the PL fallback marker. */
  locale: string;
  section: "blog" | "guides";
  /**
   * `default` is a list row: left rail (topic, date), title and description, cover thumbnail
   * (md+). `lead` is a two-column feature: cover tile holding the title, then meta and description.
   * `compact` drops the description and the thumbnail.
   */
  variant?: "default" | "lead" | "compact";
  /** Heading element, so rows nest correctly under the page's own headings. */
  headingLevel?: "h2" | "h3";
  /** Hide the "Guide" marker (e.g. on the guides page, where every row is a guide). */
  hideSectionMarker?: boolean;
  /** Show the update date ("Updated ...") instead of the publication date for updated items. */
  showUpdated?: boolean;
  /** Left rail width: `home` matches the homepage calendar rail (12rem). */
  rail?: "default" | "home";
  track?: ContentRowTrack;
}

const titleClasses = {
  default: "text-lg font-semibold leading-snug md:text-xl",
  compact: "text-base font-semibold leading-snug",
} as const;

const RAIL_COLUMNS = {
  default: "md:grid-cols-[9rem_minmax(0,1fr)]",
  home: "md:grid-cols-[12rem_minmax(0,1fr)]",
} as const;

/**
 * Shared list row for blog posts and guides: listings, read next, homepage. Meant to sit inside
 * a `<li>` of a `divide-y divide-slate-200` list. The whole row is clickable through the title link
 * (stretched with `after:`). Only the lead variant carries a cover; list rows use the topic dot.
 */
export async function ContentRow({
  item,
  locale,
  section,
  variant = "default",
  headingLevel = "h3",
  hideSectionMarker = false,
  showUpdated = false,
  rail = "default",
  track,
}: ContentRowProps) {
  const t = await getTranslations({ locale, namespace: "content" });
  const { frontmatter } = item;
  const Heading = headingLevel;
  const href = buildContentPath(item.contentLocale, section, frontmatter.slug);
  const topic = isContentTopic(frontmatter.topic) ? frontmatter.topic : undefined;
  const isFallback = item.contentLocale !== locale;
  const updated = showUpdated && isUpdate(frontmatter);
  const shownDate = updated ? (frontmatter.updated as string) : frontmatter.date;
  const isLead = variant === "lead";
  const dateFormatted = new Date(shownDate).toLocaleDateString(
    locale,
    isLead
      ? { year: "numeric", month: "long", day: "numeric" }
      : { year: "numeric", month: "short", day: "numeric" },
  );
  const dateText = updated ? t("layout.updated", { date: dateFormatted }) : dateFormatted;
  const showGuideMarker = section === "guides" && !hideSectionMarker;

  const topicNode = topic ? <TopicLabel topic={topic}>{t(`topics.${topic}`)}</TopicLabel> : null;
  // The narrow rail uses the short topic name so it stays on one line.
  const railTopicNode = topic ? (
    <TopicLabel topic={topic}>{t(`topicsShort.${topic}`)}</TopicLabel>
  ) : null;
  const dateNode = <time dateTime={toIsoDay(shownDate)}>{dateText}</time>;
  const readingNode = <span>{t("blog.readingTime", { minutes: item.readingTime })}</span>;
  const languageBadge = isFallback && (
    <span className="rounded border border-slate-300 px-1 text-[0.65rem] leading-4 text-slate-500">
      {t("blog.languageBadge")}
    </span>
  );
  const sep = (
    <span aria-hidden className="md:hidden">
      ·
    </span>
  );

  const titleLink = (extra: string) => (
    <TrackedLink
      href={href}
      className={cn(
        "underline-offset-4 decoration-violet-500 group-hover:underline after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-violet-500",
        extra,
      )}
      event={track?.event}
      eventProps={track?.props}
    >
      {frontmatter.title}
    </TrackedLink>
  );

  if (isLead) {
    const coverMeta = section === "guides" ? t("discovery.guide") : undefined;
    return (
      <div className="group relative grid gap-x-8 gap-y-4 py-6 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:items-center md:py-8">
        <CoverTile
          size="lg"
          topic={topic}
          label={topic ? t(`topics.${topic}`) : undefined}
          meta={coverMeta ?? dateFormatted}
        >
          <Heading className="font-display text-xl font-extrabold leading-tight tracking-tight text-white sm:text-2xl">
            {titleLink("group-hover:text-white")}
          </Heading>
        </CoverTile>
        <div className="space-y-3">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-500">
            {topicNode}
            {showGuideMarker && (
              <>
                {topic && <span aria-hidden>·</span>}
                <span>{t("discovery.guide")}</span>
              </>
            )}
            {(topic || showGuideMarker) && <span aria-hidden>·</span>}
            {dateNode}
            {languageBadge}
          </p>
          <p className="line-clamp-3 max-w-xl text-base text-slate-600">
            {frontmatter.description}
          </p>
          <p className="text-sm text-slate-500">
            {t("blog.readingTime", { minutes: item.readingTime })}
          </p>
        </div>
      </div>
    );
  }

  const compact = variant === "compact";
  const columns = RAIL_COLUMNS[rail];

  return (
    <div
      className={cn("group relative grid gap-x-6 gap-y-1 py-4 md:gap-y-0 md:items-start", columns)}
    >
      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-500 md:col-start-1 md:row-start-1 md:flex-col md:items-start md:pt-1">
        {(railTopicNode || showGuideMarker) && (
          <span className="inline-flex flex-wrap items-center gap-x-2">
            {railTopicNode}
            {showGuideMarker && (
              <>
                {topic && <span aria-hidden>·</span>}
                <span>{t("discovery.guide")}</span>
              </>
            )}
          </span>
        )}
        {(railTopicNode || showGuideMarker) && sep}
        <span className="inline-flex flex-wrap items-center gap-x-2">
          {dateNode}
          <span aria-hidden>·</span>
          {readingNode}
        </span>
        {languageBadge}
      </div>
      <div className="min-w-0 md:col-start-2 md:row-start-1">
        <Heading
          className={cn("text-slate-900", compact ? titleClasses.compact : titleClasses.default)}
        >
          {titleLink("group-hover:text-violet-700")}
        </Heading>
        {!compact && (
          <p className="mt-1 line-clamp-2 text-sm text-slate-600 md:line-clamp-1">
            {frontmatter.description}
          </p>
        )}
      </div>
    </div>
  );
}
