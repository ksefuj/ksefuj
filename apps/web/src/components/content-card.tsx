import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/badge";
import { TrackedLink } from "@/components/tracked-link";
import { buildContentPath, type ContentItemWithLocale } from "@/lib/content";
import { isContentTopic } from "@/lib/topics";
import { cn } from "@/lib/utils";

export interface ContentCardTrack {
  event: string;
  props: Record<string, string | number>;
}

interface ContentCardProps {
  item: ContentItemWithLocale;
  /** UI locale. A card whose `item.contentLocale` differs gets the PL fallback badge. */
  locale: string;
  section: "blog" | "guides";
  /** `default` is the grid card, `featured` the large full-width lead, `compact` a strip card. */
  variant?: "default" | "featured" | "compact";
  /** Heading element, so cards nest correctly under the page's own headings. */
  headingLevel?: "h2" | "h3";
  /** Hide the "Guide" marker (e.g. on the guides page, where every card is a guide). */
  hideSectionMarker?: boolean;
  track?: ContentCardTrack;
}

const shell =
  "group flex flex-col rounded-2xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/30";

const variantClasses = {
  default: "p-6",
  featured: "p-6 md:p-8 border-t-4 border-t-violet-400",
  compact: "p-4",
} as const;

const titleClasses = {
  default: "text-xl font-bold leading-snug",
  featured: "text-2xl md:text-3xl font-extrabold tracking-tight leading-tight",
  compact: "text-base font-bold leading-snug",
} as const;

/** Shared card for blog posts and guides: blog page, guides page, read next, homepage. */
export async function ContentCard({
  item,
  locale,
  section,
  variant = "default",
  headingLevel = "h3",
  hideSectionMarker = false,
  track,
}: ContentCardProps) {
  const t = await getTranslations({ locale, namespace: "content" });
  const { frontmatter } = item;
  const Heading = headingLevel;
  const href = buildContentPath(item.contentLocale, section, frontmatter.slug);
  const topic = isContentTopic(frontmatter.topic) ? frontmatter.topic : undefined;
  const isFallback = item.contentLocale !== locale;
  const showDate = section === "blog" && variant !== "compact";
  const dateFormatted = showDate
    ? new Date(frontmatter.date).toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <TrackedLink
      href={href}
      className={cn(shell, variantClasses[variant])}
      event={track?.event}
      eventProps={track?.props}
    >
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {topic && <Badge variant="info">{t(`topics.${topic}`)}</Badge>}
        {section === "guides" && !hideSectionMarker && (
          <Badge variant="neutral">{t("discovery.guide")}</Badge>
        )}
        {isFallback && (
          <Badge variant="neutral" className="ml-auto">
            {t("blog.languageBadge")}
          </Badge>
        )}
      </div>
      <Heading
        className={cn(
          "text-slate-900 group-hover:text-violet-700 transition-colors",
          titleClasses[variant],
          variant === "compact" ? "line-clamp-3" : "mb-2",
        )}
      >
        {frontmatter.title}
      </Heading>
      {variant !== "compact" && (
        <p
          className={cn(
            "text-slate-600 mb-4",
            variant === "featured" ? "text-base line-clamp-3" : "text-sm line-clamp-2",
          )}
        >
          {frontmatter.description}
        </p>
      )}
      <div
        className={cn(
          "flex items-center gap-2 text-xs text-slate-400",
          variant === "compact" ? "mt-auto pt-3" : "mt-auto",
        )}
      >
        {dateFormatted && (
          <>
            <time dateTime={String(frontmatter.date)}>{dateFormatted}</time>
            <span aria-hidden>·</span>
          </>
        )}
        <span>{t("blog.readingTime", { minutes: item.readingTime })}</span>
      </div>
    </TrackedLink>
  );
}
