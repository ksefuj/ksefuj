import { getTranslations } from "next-intl/server";
import { getContentItem, getContentItemWithFallback } from "@/lib/content";
import { isContentTopic } from "@/lib/topics";

type Section = "blog" | "guides" | "docs";

/** Title, pattern key and topic badge for an article OG card; null when the item is missing. */
export async function getArticleCard(
  locale: string,
  section: Section,
  slug: string,
): Promise<{ title: string; patternKey: string; topicLabel?: string } | null> {
  const result = await getContentItemWithFallback(locale, section, slug);
  if (!result) {
    return null;
  }

  const { frontmatter } = result.item;
  const plSlug = frontmatter.translations?.pl ?? frontmatter.slug;
  let topic = frontmatter.topic;
  if (!topic && locale !== "pl") {
    topic = (await getContentItem("pl", section, plSlug))?.frontmatter.topic;
  }

  let topicLabel: string | undefined;
  if (isContentTopic(topic)) {
    const t = await getTranslations({ locale, namespace: "content" });
    topicLabel = t(`topics.${topic}`);
  }

  return {
    title: frontmatter.title,
    patternKey: section === "docs" ? `docs/${plSlug}` : plSlug,
    topicLabel,
  };
}
