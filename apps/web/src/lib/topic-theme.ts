import type { ContentTopic } from "./topics";

/**
 * One muted accent per content topic, used for wayfinding (dots, rules, labels) and for the dark
 * "cover" tiles and OG images. Hex values so the same palette works in Tailwind arbitrary values,
 * inline styles and `next/og` ImageResponse (which has no Tailwind).
 */
export interface TopicTheme {
  /** Accent for dots, rules and topic labels on light backgrounds. */
  accent: string;
  /** Pale tint for subtle backgrounds. */
  tint: string;
  /** Dark cover background (white text on top). */
  cover: string;
}

export const TOPIC_THEME: Record<ContentTopic, TopicTheme> = {
  deadlines: { accent: "#4338ca", tint: "#eef2ff", cover: "#1e1b4b" },
  access: { accent: "#0f766e", tint: "#f0fdfa", cover: "#134e4a" },
  invoicing: { accent: "#b45309", tint: "#fffbeb", cover: "#451a03" },
  errors: { accent: "#be123c", tint: "#fff1f2", cover: "#4c0519" },
};

/** Neutral fallback for content without a topic (e.g. validator explanations). */
export const NEUTRAL_THEME: TopicTheme = { accent: "#475569", tint: "#f8fafc", cover: "#0f172a" };

export function topicTheme(topic: ContentTopic | undefined): TopicTheme {
  return topic ? TOPIC_THEME[topic] : NEUTRAL_THEME;
}
