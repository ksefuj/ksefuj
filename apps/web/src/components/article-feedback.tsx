"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import * as amplitude from "@amplitude/analytics-browser";
import {
  FEEDBACK_DISPLAY_THRESHOLD,
  type FeedbackSection,
  feedbackStorageKey,
  type FeedbackVote,
} from "@/lib/article-feedback";

interface ArticleFeedbackProps {
  section: FeedbackSection;
  /** Locale of the content actually rendered (not the UI locale). */
  locale: string;
  slug: string;
}

function readStoredVote(key: string): FeedbackVote | null {
  try {
    const value = window.localStorage.getItem(key);
    return value === "up" || value === "down" ? value : null;
  } catch {
    return null;
  }
}

export function ArticleFeedback({ section, locale, slug }: ArticleFeedbackProps) {
  const t = useTranslations("articleFeedback");
  const [vote, setVote] = useState<FeedbackVote | null>(null);
  const [upCount, setUpCount] = useState(0);

  useEffect(() => {
    const key = feedbackStorageKey({ section, locale, slug });
    setVote(readStoredVote(key));

    const controller = new AbortController();
    const query = new URLSearchParams({ section, locale, slug });
    fetch(`/api/feedback?${query}`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { up?: number } | null) => {
        if (data && typeof data.up === "number") {
          const up = data.up;
          // Keep an optimistic local increment if the user voted before the fetch resolved
          setUpCount((current) => Math.max(current, up));
        }
      })
      .catch(() => {});
    return () => controller.abort();
  }, [section, locale, slug]);

  const submit = (next: FeedbackVote) => {
    if (vote) {
      return;
    }
    setVote(next);
    if (next === "up") {
      setUpCount((current) => current + 1);
    }
    fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section, locale, slug, vote: next }),
      keepalive: true,
    })
      .then((res) => {
        // Remember the vote only once it's stored, so a failed request can be retried after reload
        if (res.ok) {
          window.localStorage.setItem(feedbackStorageKey({ section, locale, slug }), next);
        }
      })
      .catch(() => {});
    amplitude.track("article_feedback", { section, slug, locale, vote: next });
  };

  const buttonClass = (value: FeedbackVote) =>
    [
      "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/30",
      vote === value
        ? "border-violet-500 bg-violet-50 text-violet-700"
        : "border-slate-200 bg-white text-slate-700",
      vote ? "cursor-default" : "hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700",
      // Both buttons are disabled after voting; only the one not chosen fades out
      vote === value ? "disabled:opacity-100" : "disabled:opacity-50",
    ].join(" ");

  return (
    <section className="mt-10 pt-6 border-t border-slate-100" aria-live="polite">
      {vote ? (
        <p className="text-sm text-slate-600">{t("thanks")}</p>
      ) : (
        <p className="text-sm font-medium text-slate-700">{t("question")}</p>
      )}
      <div className="mt-3 flex flex-wrap gap-3">
        <button
          type="button"
          className={buttonClass("up")}
          onClick={() => submit("up")}
          disabled={vote !== null}
          aria-label={t("yesLabel")}
          aria-pressed={vote === "up"}
        >
          <span aria-hidden>👍</span>
          {t("yes")}
        </button>
        <button
          type="button"
          className={buttonClass("down")}
          onClick={() => submit("down")}
          disabled={vote !== null}
          aria-label={t("noLabel")}
          aria-pressed={vote === "down"}
        >
          <span aria-hidden>👎</span>
          {t("no")}
        </button>
      </div>
      {upCount >= FEEDBACK_DISPLAY_THRESHOLD && (
        <p className="mt-3 text-xs text-slate-400">{t("helpfulCount", { count: upCount })}</p>
      )}
    </section>
  );
}
