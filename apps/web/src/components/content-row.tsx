import { getTranslations } from "next-intl/server";
import { TrackedLink } from "@/components/tracked-link";
import { buildContentPath, type ContentItemWithLocale } from "@/lib/content";
import { isContentTopic } from "@/lib/topics";
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
   * `default` is a list row: meta line, title, description. `lead` is the same with a larger
   * title (first row of a listing). `compact` drops the description.
   */
  variant?: "default" | "lead" | "compact";
  /** Heading element, so rows nest correctly under the page's own headings. */
  headingLevel?: "h2" | "h3";
  /** Hide the "Guide" marker (e.g. on the guides page, where every row is a guide). */
  hideSectionMarker?: boolean;
  track?: ContentRowTrack;
}

const titleClasses = {
  default: "text-lg font-semibold leading-snug",
  lead: "text-2xl md:text-3xl font-bold tracking-tight leading-tight",
  compact: "text-base font-semibold leading-snug",
} as const;

/**
 * Shared list row for blog posts and guides: listings, read next, homepage. Meant to sit inside
 * a `<li>` of a `divide-y divide-slate-200` list. The whole row is clickable through the title link.
 */
export async function ContentRow({
  item,
  locale,
  section,
  variant = "default",
  headingLevel = "h3",
  hideSectionMarker = false,
  track,
}: ContentRowProps) {
  const t = await getTranslations({ locale, namespace: "content" });
  const { frontmatter } = item;
  const Heading = headingLevel;
  const href = buildContentPath(item.contentLocale, section, frontmatter.slug);
  const topic = isContentTopic(frontmatter.topic) ? frontmatter.topic : undefined;
  const isFallback = item.contentLocale !== locale;
  const dateFormatted = new Date(frontmatter.date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={cn("group relative", variant === "lead" ? "py-6 md:py-8" : "py-4")}>
      <p className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
        {topic && <span className="font-medium text-slate-700">{t(`topics.${topic}`)}</span>}
        {section === "guides" && !hideSectionMarker && (
          <>
            {topic && <span aria-hidden>·</span>}
            <span>{t("discovery.guide")}</span>
          </>
        )}
        {(topic || (section === "guides" && !hideSectionMarker)) && <span aria-hidden>·</span>}
        <time dateTime={String(frontmatter.date)}>{dateFormatted}</time>
        <span aria-hidden>·</span>
        <span>{t("blog.readingTime", { minutes: item.readingTime })}</span>
        {isFallback && (
          <span className="rounded border border-slate-300 px-1 text-[0.65rem] leading-4 text-slate-500">
            {t("blog.languageBadge")}
          </span>
        )}
      </p>
      <Heading className={cn("text-slate-900", titleClasses[variant])}>
        <TrackedLink
          href={href}
          className="underline-offset-4 decoration-violet-500 group-hover:text-violet-700 group-hover:underline after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-violet-500"
          event={track?.event}
          eventProps={track?.props}
        >
          {frontmatter.title}
        </TrackedLink>
      </Heading>
      {variant !== "compact" && (
        <p
          className={cn(
            "mt-1.5 text-slate-600",
            variant === "lead" ? "text-base max-w-3xl" : "text-sm max-w-3xl line-clamp-2",
          )}
        >
          {frontmatter.description}
        </p>
      )}
    </div>
  );
}
