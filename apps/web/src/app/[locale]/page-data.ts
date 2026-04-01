/**
 * Locale-independent data for landing page sections.
 * Anything that doesn't need translation lives here, not in i18n JSON files.
 */

export type CellStatus = "good" | "bad" | "partial";
export type FeatureIcon = "preview" | "autofix" | "generate";
export type AccentColor = "violet" | "emerald" | "amber";

/**
 * Comparison table statuses.
 *
 * "freemium" column represents: ksefwalidator.pl, ksefu.pl, naprawksef.pl, ksefstart.pl
 *   - ksefwalidator.pl: free after signup (3 validations without account), client-side, XSD + NIP + VAT whitelist checks
 *   - ksefu.pl: 10 validations/month free, client-side, paid tiers from 19 PLN/month
 *   - naprawksef.pl: 3 validations/day free, server-side, auto-repair focus; FA(1/2) only as of March 2026
 *   - ksefstart.pl: fully free, client-side, basic FA(3) validator + generator
 *
 * "enterprise" column represents: Sorgera (services.sorgera.com/ksef)
 *   - Turkish SAP consultancy, enterprise-focused, English-only
 *   - Has XML validator, XML→PDF converter, AI-assisted error diagnostics
 *   - No CLI, npm package, or open source
 *   - Pricing model unclear from public pages as of March 2026 (may be behind login)
 */
export const COMPARISON_STATUSES: Record<
  string,
  Record<"ksefuj" | "freemium" | "enterprise", CellStatus>
> = {
  pricing: { ksefuj: "good", freemium: "partial", enterprise: "bad" },
  validationXsd: { ksefuj: "good", freemium: "partial", enterprise: "partial" },
  validationSemantic: { ksefuj: "good", freemium: "bad", enterprise: "partial" },
  currencyRate: { ksefuj: "good", freemium: "bad", enterprise: "partial" },
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
