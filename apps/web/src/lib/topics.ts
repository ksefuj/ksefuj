/**
 * Closed list of content topics. Every blog post and guide must have exactly one.
 * Keys are stable English identifiers; labels live in i18n under `content.topics.<key>`.
 * Imported by `scripts/validate-seo.ts`, so keep this file free of runtime dependencies.
 */
export const CONTENT_TOPICS = ["deadlines", "access", "invoicing", "errors"] as const;

export type ContentTopic = (typeof CONTENT_TOPICS)[number];

export function isContentTopic(value: unknown): value is ContentTopic {
  return typeof value === "string" && (CONTENT_TOPICS as readonly string[]).includes(value);
}

/** Translated labels for every topic, from a `getTranslations({ namespace: "content" })` result. */
export function topicLabels(
  t: (key: `topics.${ContentTopic}`) => string,
): Record<ContentTopic, string> {
  return Object.fromEntries(CONTENT_TOPICS.map((topic) => [topic, t(`topics.${topic}`)])) as Record<
    ContentTopic,
    string
  >;
}
