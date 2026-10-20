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
          <ThumbUpIcon className="w-4 h-4" />
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
          <ThumbDownIcon className="w-4 h-4" />
          {t("no")}
        </button>
      </div>
      {upCount >= FEEDBACK_DISPLAY_THRESHOLD && (
        <p className="mt-3 text-xs text-slate-400">{t("helpfulCount", { count: upCount })}</p>
      )}
    </section>
  );
}

function ThumbUpIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
      />
    </svg>
  );
}

function ThumbDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
      />
    </svg>
  );
}
