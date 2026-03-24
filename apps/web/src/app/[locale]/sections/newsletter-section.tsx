"use client";

import React, { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { SectionContainer } from "@/components/section-container";

interface NewsletterProps {
  title: string;
  subtitle: string;
  placeholder: string;
  buttonText: string;
  successMessage: string;
  errorMessage: string;
  disclaimer: string;
  poweredBy: string;
}

export function NewsletterSection({
  title,
  subtitle,
  placeholder,
  buttonText,
  successMessage,
  errorMessage,
  disclaimer,
  poweredBy,
}: NewsletterProps) {
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
        track("newsletter_subscribed");
      } else {
        setStatus("error");
        track("newsletter_subscribe_failed");
      }

      scheduleReset();
    } catch {
      setStatus("error");
      track("newsletter_subscribe_failed");
      scheduleReset();
    }
  };

  return (
    <SectionContainer className="bg-gradient-to-br from-violet-50 to-indigo-50">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">{title}</h2>
        <p className="text-xl text-slate-600 mb-12">{subtitle}</p>

        <div className="relative">
          {status === "success" && (
            <div
              role="status"
              aria-live="polite"
              className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-emerald-800 font-medium">{successMessage}</p>
            </div>
          )}

          {status === "error" && (
            <div
              role="alert"
              aria-live="assertive"
              className="bg-rose-50 border border-rose-200 rounded-2xl p-8"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-rose-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <p className="text-rose-800 font-medium">{errorMessage}</p>
            </div>
          )}

          {(status === "idle" || status === "loading") && (
            <form onSubmit={handleSubmit} className="flex gap-4 max-w-md mx-auto">
              <div className="flex-1">
                <label className="sr-only" htmlFor="newsletter-email">
                  {placeholder}
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={placeholder}
                  className="w-full px-6 py-4 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 outline-none transition-all duration-200 text-slate-900 placeholder-slate-500"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-8 py-4 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white font-medium rounded-xl transition-colors duration-200 flex items-center gap-2 whitespace-nowrap"
              >
                {status === "loading" ? (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  buttonText
                )}
              </button>
            </form>
          )}
        </div>

        <div className="mt-8 space-y-2">
          <p className="text-sm text-slate-500">{disclaimer}</p>
          <p className="text-xs text-slate-400">
            {poweredBy}{" "}
            <a
              href="https://buttondown.com/refer/ksefuj"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-slate-600"
            >
              Buttondown
            </a>
          </p>
        </div>
      </div>
    </SectionContainer>
  );
}
