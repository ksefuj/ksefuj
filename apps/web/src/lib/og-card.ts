import { getTranslations } from "next-intl/server";
import { getContentItem, getContentItemWithFallback } from "@/lib/content";
import { type ContentTopic, isContentTopic } from "@/lib/topics";

type Section = "blog" | "guides" | "docs" | "validator";

export interface ArticleCard {
  title: string;
  topic?: ContentTopic;
  label?: string;
  meta?: string;
}

/** Title, topic, top label and bottom-right label for an article OG card; null when missing. */
export async function getArticleCard(
  locale: string,
  section: Section,
  slug: string,
): Promise<ArticleCard | null> {
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

  const tContent = await getTranslations({ locale, namespace: "content" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const validTopic = isContentTopic(topic) ? topic : undefined;

  let label: string | undefined;
  if (validTopic) {
    label = tContent(`topics.${validTopic}`);
  } else if (section === "validator") {
    label = tNav("validator");
  } else if (section === "docs") {
    label = tNav("docs");
  }

  let meta: string | undefined;
  if (section === "guides") {
    meta = tContent("discovery.guide");
  } else if (section === "blog") {
    const date = frontmatter.updated ?? frontmatter.date;
    meta = new Date(date).toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
  }

  return { title: frontmatter.title, topic: validTopic, label, meta };
}
