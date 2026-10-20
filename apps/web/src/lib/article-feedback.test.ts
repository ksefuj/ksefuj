import { describe, expect, it } from "vitest";
import {
  FEEDBACK_DISPLAY_THRESHOLD,
  feedbackKey,
  feedbackStorageKey,
  parseArticleRef,
  parseFeedbackVote,
} from "./article-feedback";

describe("parseArticleRef", () => {
  it("accepts a valid reference", () => {
    expect(
      parseArticleRef({ section: "blog", locale: "pl", slug: "jak-wystawic-fakture" }),
    ).toEqual({ section: "blog", locale: "pl", slug: "jak-wystawic-fakture" });
  });

  it("rejects unknown sections and locales", () => {
    expect(parseArticleRef({ section: "docs", locale: "pl", slug: "a" })).toBeNull();
    expect(parseArticleRef({ section: "blog", locale: "de", slug: "a" })).toBeNull();
  });

  it("rejects malformed slugs", () => {
    for (const slug of ["", "Upper", "a/b", "a b", "a:b", "x".repeat(121), 5, undefined]) {
      expect(parseArticleRef({ section: "guides", locale: "en", slug })).toBeNull();
    }
    expect(
      parseArticleRef({ section: "guides", locale: "en", slug: "x".repeat(120) }),
    ).not.toBeNull();
  });
});

describe("parseFeedbackVote", () => {
  const base = { section: "guides", locale: "uk", slug: "abc" };

  it("accepts up and down", () => {
    expect(parseFeedbackVote({ ...base, vote: "up" })?.vote).toBe("up");
    expect(parseFeedbackVote({ ...base, vote: "down" })?.vote).toBe("down");
  });

  it("rejects bad votes and non-objects", () => {
    expect(parseFeedbackVote({ ...base, vote: "sideways" })).toBeNull();
    expect(parseFeedbackVote({ ...base })).toBeNull();
    expect(parseFeedbackVote(null)).toBeNull();
    expect(parseFeedbackVote("up")).toBeNull();
  });
});

describe("keys", () => {
  const ref = { section: "blog", locale: "en", slug: "my-post" } as const;

  it("builds redis and storage keys", () => {
    expect(feedbackKey(ref)).toBe("feedback:blog:en:my-post");
    expect(feedbackStorageKey(ref)).toBe("ksefuj:feedback:blog:en:my-post");
  });

  it("exposes the display threshold", () => {
    expect(FEEDBACK_DISPLAY_THRESHOLD).toBe(5);
  });
});
