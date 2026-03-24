/**
 * Locale-independent data for landing page sections.
 * Anything that doesn't need translation lives here, not in i18n JSON files.
 */

export type CellStatus = "good" | "bad" | "partial";
export type FeatureIcon = "preview" | "autofix" | "generate";
export type AccentColor = "violet" | "emerald" | "amber";

export const COMPARISON_STATUSES: Record<
  string,
  Record<"ksefuj" | "freemium" | "enterprise", CellStatus>
> = {
  pricing: { ksefuj: "good", freemium: "partial", enterprise: "bad" },
  validation: { ksefuj: "good", freemium: "bad", enterprise: "partial" },
  localXsd: { ksefuj: "good", freemium: "bad", enterprise: "bad" },
  privacy: { ksefuj: "good", freemium: "bad", enterprise: "bad" },
  errorDetails: { ksefuj: "good", freemium: "bad", enterprise: "partial" },
  cli: { ksefuj: "good", freemium: "bad", enterprise: "partial" },
  openSource: { ksefuj: "good", freemium: "bad", enterprise: "bad" },
};

export const COMING_SOON_FEATURES: { icon: FeatureIcon; badgeVariant: "warning" | "neutral" }[] = [
  { icon: "preview", badgeVariant: "warning" },
  { icon: "autofix", badgeVariant: "warning" },
  { icon: "generate", badgeVariant: "neutral" },
];

export const FEATURES_ACCENTS: AccentColor[] = ["violet", "emerald", "amber"];
