"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import * as amplitude from "@amplitude/analytics-browser";
import { useLocale, useTranslations } from "next-intl";

interface NewsletterFormProps {
  /** Where the form sits; sent with the subscribe events. */
  placement: "homepage" | "article" | "article-sidebar" | "calendar";
  /** Overrides the default submit label, e.g. a "notify me" wording next to the calendar. */
  buttonText?: string;
  /** Narrow-column variant: stacked full-width controls, smaller type, no "powered by" line. */
  compact?: boolean;
}

/** Buttondown signup form with status messages. Copy comes from `landing.newsletter`. */
export function NewsletterForm({ placement, buttonText, compact = false }: NewsletterFormProps) {
  const t = useTranslations("landing.newsletter");
  const locale = useLocale();
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const scheduleReset = () => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }
    resetTimerRef.current = setTimeout(() => setStatus("idle"), 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("https://buttondown.com/api/emails/embed-subscribe/ksefuj", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          email: email,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
        amplitude.track("newsletter_subscribed", { placement, locale });
      } else {
        setStatus("error");
        amplitude.track("newsletter_subscribe_failed", { placement, locale });
        scheduleReset();
      }
    } catch {
      setStatus("error");
      amplitude.track("newsletter_subscribe_failed", { placement, locale });
      scheduleReset();
    }
  };

  return (
    <div>
      {status === "success" && (
        <p
          role="status"
          aria-live="polite"
          className={`font-medium text-emerald-700 ${compact ? "text-sm" : ""}`}
        >
          {t("successMessage")}
        </p>
      )}

      {status === "error" && (
        <p
          role="alert"
          aria-live="assertive"
          className={`font-medium text-rose-700 ${compact ? "text-sm" : ""}`}
        >
          {t("errorMessage")}
        </p>
      )}

      {(status === "idle" || status === "loading") && (
        <form
          onSubmit={handleSubmit}
          className={compact ? "flex flex-col gap-2" : "flex max-w-md flex-col gap-2 sm:flex-row"}
        >
          <label className="sr-only" htmlFor={inputId}>
            {t("placeholder")}
          </label>
          <input
            id={inputId}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("placeholder")}
            className={`min-w-0 flex-1 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-500 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 ${
              compact ? "px-3 py-2 text-sm" : "px-4 py-2.5"
            }`}
            required
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className={`whitespace-nowrap rounded-lg bg-violet-600 font-medium text-white transition-colors hover:bg-violet-700 disabled:bg-violet-400 ${
              compact ? "px-3 py-2 text-sm" : "px-5 py-2.5"
            }`}
          >
            {buttonText ?? t("buttonText")}
          </button>
        </form>
      )}

      <p className={`text-slate-500 ${compact ? "mt-2 text-xs" : "mt-3 text-sm"}`}>
        {t("disclaimer")}
        {!compact && " "}
        {!compact && (
          <span className="text-slate-400">
            {t("poweredBy")}{" "}
            <a
              href="https://buttondown.com/refer/ksefuj"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-slate-600"
            >
              Buttondown
            </a>
          </span>
        )}
      </p>
    </div>
  );
}
