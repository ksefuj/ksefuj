export const FEEDBACK_SECTIONS = ["blog", "guides"] as const;
export type FeedbackSection = (typeof FEEDBACK_SECTIONS)[number];
export type FeedbackVote = "up" | "down";

/** The 👍 count is shown publicly only from this many votes up. */
export const FEEDBACK_DISPLAY_THRESHOLD = 5;

// Mirrors routing.locales (src/i18n/routing.ts); not imported so the module stays unit-testable
// without next-intl navigation.
const FEEDBACK_LOCALES = ["pl", "en", "uk"] as const;

const SLUG_PATTERN = /^[a-z0-9-]{1,120}$/;

export interface ArticleRef {
  section: FeedbackSection;
  locale: string;
  slug: string;
}

function isSection(value: unknown): value is FeedbackSection {
  return typeof value === "string" && (FEEDBACK_SECTIONS as readonly string[]).includes(value);
}

function isLocale(value: unknown): value is string {
  return typeof value === "string" && (FEEDBACK_LOCALES as readonly string[]).includes(value);
}

/** Validates the (section, locale, slug) identity of an article. Returns null when invalid. */
export function parseArticleRef(input: {
  section?: unknown;
  locale?: unknown;
  slug?: unknown;
}): ArticleRef | null {
  const { section, locale, slug } = input;
  if (!isSection(section) || !isLocale(locale)) {
    return null;
  }
  if (typeof slug !== "string" || !SLUG_PATTERN.test(slug)) {
    return null;
  }
  return { section, locale, slug };
}

/** Validates a POST body. Returns null when invalid. */
export function parseFeedbackVote(body: unknown): (ArticleRef & { vote: FeedbackVote }) | null {
  if (typeof body !== "object" || body === null) {
    return null;
  }
  const record = body as Record<string, unknown>;
  const ref = parseArticleRef(record);
  if (!ref || (record.vote !== "up" && record.vote !== "down")) {
    return null;
  }
  return { ...ref, vote: record.vote };
}

/** Redis hash key holding the `up` / `down` counters of an article. */
export function feedbackKey({ section, locale, slug }: ArticleRef): string {
  return `feedback:${section}:${locale}:${slug}`;
}

/** localStorage key remembering this browser's vote. */
export function feedbackStorageKey(ref: ArticleRef): string {
  return `ksefuj:${feedbackKey(ref)}`;
}
