import { describe, expect, it } from "vitest";
import { topographyDataUrl, topographyStats, topographySvg } from "./og-patterns";

const MAX_SVG_BYTES = 200_000;
const W = 1200;
const H = 630;

describe("topographySvg", () => {
  it("is deterministic for the same key", () => {
    expect(topographySvg("ksef-limit-10000-zl", W, H)).toBe(
      topographySvg("ksef-limit-10000-zl", W, H),
    );
  });

  it("differs between keys", () => {
    expect(topographySvg("home", W, H)).not.toBe(topographySvg("validator", W, H));
  });

  it("returns an svg document with contour paths, within the size budget", () => {
    const svg = topographySvg("home", W, H);
    expect(svg.startsWith("<svg")).toBe(true);
    expect(svg).toContain("<path");
    expect(svg).toMatch(/d="M[\d.-]+ [\d.-]+q/);
    expect(svg).not.toContain("NaN");
    expect(svg.length).toBeLessThan(MAX_SVG_BYTES);
  });
});

describe("topographyStats", () => {
  it.each(["home", "validator", "kinets-limitu-10000-zl"])(
    "keeps contours evenly spaced for %s",
    (key) => {
      const stats = topographyStats(key, W, H);
      expect(stats.minSpacing).toBeGreaterThanOrEqual(9);
      expect(stats.medianSpacing).toBeGreaterThan(12);
      expect(stats.medianSpacing).toBeLessThan(24);
    },
  );
});

describe("topographyDataUrl", () => {
  it("builds a base64 svg data url", () => {
    expect(topographyDataUrl("x", 400, 630)).toMatch(/^data:image\/svg\+xml;base64,/);
  });
});
