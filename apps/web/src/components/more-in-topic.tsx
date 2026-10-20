import { getTranslations } from "next-intl/server";
import { TrackedLink } from "@/components/tracked-link";
import { buildContentPath, type Frontmatter } from "@/lib/content";
import { getMoreInTopicItems } from "@/lib/content-discovery";
import { isContentTopic } from "@/lib/topics";

interface MoreInTopicProps {
  locale: string;
  section: "blog" | "guides";
  frontmatter: Frontmatter;
}

/** "More in this topic" text-link list for post and guide pages. Server-rendered at build time. */
export async function MoreInTopic({ locale, section, frontmatter }: MoreInTopicProps) {
  const [items, t] = await Promise.all([
    getMoreInTopicItems(locale, { section, frontmatter }),
    getTranslations({ locale, namespace: "content" }),
  ]);

  if (items.length === 0) {
    return null;
  }

  const topic = items[0].item.frontmatter.topic;

  return (
    <section
      aria-labelledby="more-in-topic-heading"
      className="mt-12 border-t border-slate-200 pt-8"
    >
      <h2
        id="more-in-topic-heading"
        className="mb-4 font-display text-xl font-bold tracking-tight text-slate-900"
      >
        {t("discovery.moreInTopic")}
        {isContentTopic(topic) && (
          <span className="font-normal text-slate-500">: {t(`topics.${topic}`)}</span>
        )}
      </h2>
      <ul className="space-y-2">
        {items.map(({ item, section: toSection }, index) => (
          <li key={`${toSection}/${item.plSlug}`}>
            <TrackedLink
              href={buildContentPath(item.contentLocale, toSection, item.frontmatter.slug)}
              className="text-violet-700 underline-offset-4 hover:text-violet-800 hover:underline"
              event="more_in_topic_clicked"
              eventProps={{
                locale,
                fromSection: section,
                fromSlug: frontmatter.slug,
                toSection,
                toSlug: item.frontmatter.slug,
                position: index + 1,
              }}
            >
              {item.frontmatter.title}
            </TrackedLink>
            {item.contentLocale !== locale && (
              <span className="ml-2 text-xs text-slate-400">{t("blog.languageBadge")}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
