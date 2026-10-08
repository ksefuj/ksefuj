import { describe, expect, it } from "vitest";
import { MAX_TITLE_LENGTH, SITE_TITLE_SUFFIX, withSiteSuffix } from "./page-title";

/** A bare title that is `length` characters long. */
function titleOf(length: number): string {
  return "a".repeat(length);
}

const roomForSuffix = MAX_TITLE_LENGTH - SITE_TITLE_SUFFIX.length;

describe("withSiteSuffix", () => {
  it("appends the suffix to a short title", () => {
    expect(withSiteSuffix("FAQ")).toBe("FAQ — ksefuj.to");
  });

  it("appends the suffix when the full title is exactly 60 characters", () => {
    const result = withSiteSuffix(titleOf(roomForSuffix));
    expect(result).toBe(`${titleOf(roomForSuffix)}${SITE_TITLE_SUFFIX}`);
    expect(result).toHaveLength(MAX_TITLE_LENGTH);
  });

  it("drops the suffix when the full title would be 61 characters", () => {
    expect(withSiteSuffix(titleOf(roomForSuffix + 1))).toBe(titleOf(roomForSuffix + 1));
  });

  it("returns a title longer than 60 characters unchanged", () => {
    expect(withSiteSuffix(titleOf(80))).toBe(titleOf(80));
  });

  it("normalises an existing ' — ksefuj' suffix", () => {
    expect(withSiteSuffix("Polityka prywatności — ksefuj")).toBe(
      "Polityka prywatności — ksefuj.to",
    );
  });

  it("does not duplicate an existing ' — ksefuj.to' suffix", () => {
    expect(withSiteSuffix("FAQ — ksefuj.to")).toBe("FAQ — ksefuj.to");
  });

  it("strips an existing suffix when the result would exceed 60 characters", () => {
    expect(withSiteSuffix(`${titleOf(roomForSuffix + 1)} — ksefuj.to`)).toBe(
      titleOf(roomForSuffix + 1),
    );
  });

  it("keeps 'ksefuj' when it is part of the title rather than a suffix", () => {
    expect(withSiteSuffix("Jak działa ksefuj")).toBe("Jak działa ksefuj — ksefuj.to");
  });
});
