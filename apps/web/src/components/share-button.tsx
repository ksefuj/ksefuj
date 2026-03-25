"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";

interface ShareButtonProps {
  title: string;
  locale: string;
}

const strings: Record<string, { copyLabel: string; copied: string; shareLabel: string }> = {
  pl: { copyLabel: "Kopiuj link", copied: "Skopiowano!", shareLabel: "Udostępnij" },
  en: { copyLabel: "Copy link", copied: "Copied!", shareLabel: "Share" },
  uk: { copyLabel: "Копіювати посилання", copied: "Скопійовано!", shareLabel: "Поділитися" },
};

export function ShareButton({ title, locale }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const s = strings[locale] ?? strings.pl;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && !!navigator.share);
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
      track("content_link_copied", { locale });
    } catch {
      // Clipboard not available
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({ title, url: window.location.href });
      track("content_shared", { locale });
    } catch {
      // User cancelled
    }
  };

  return (
    <>
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
        aria-label={s.copyLabel}
      >
        {copied ? (
          <CheckIcon className="w-4 h-4 text-emerald-500" />
        ) : (
          <LinkIcon className="w-4 h-4" />
        )}
        <span className={copied ? "text-emerald-600 font-medium" : ""}>
          {copied ? s.copied : s.copyLabel}
        </span>
      </button>

      {canShare && (
        <>
          <span aria-hidden>·</span>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            aria-label={s.shareLabel}
          >
            <ShareIcon className="w-4 h-4" />
            <span>{s.shareLabel}</span>
          </button>
        </>
      )}
    </>
  );
}

function LinkIcon({ className }: { className?: string }) {
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
        d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
      />
    </svg>
  );
}

function ShareIcon({ className }: { className?: string }) {
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
        d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}
