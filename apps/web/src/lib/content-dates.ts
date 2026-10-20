import type { Frontmatter } from "./content";

/** Frontmatter dates are typed as strings, but unquoted YAML dates are parsed into `Date`s. */
export function toIsoDay(value: unknown): string | undefined {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? undefined : value.toISOString().slice(0, 10);
  }
  if (typeof value === "string" && value) {
    return value.slice(0, 10);
  }
  return undefined;
}

/** ISO day of the `updated` frontmatter date, only when it differs from the publish date. */
export function getUpdatedDay(
  frontmatter: Pick<Frontmatter, "date" | "updated">,
): string | undefined {
  const updated = toIsoDay(frontmatter.updated);
  return updated && updated !== toIsoDay(frontmatter.date) ? updated : undefined;
}
