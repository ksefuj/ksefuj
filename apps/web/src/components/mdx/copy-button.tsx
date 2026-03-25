"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { track } from "@vercel/analytics";

interface CopyButtonProps {
  text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
  const t = useTranslations("content.mdx");
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    },
    [],
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => setCopied(false), 1500);
      track("code_copied");
    } catch {
      // clipboard API unavailable (e.g. non-secure context) — silently ignore
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="absolute top-2 right-2 z-10 px-2 py-1 text-xs rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
      aria-label={t("copy")}
    >
      {copied ? t("copied") : t("copy")}
    </button>
  );
}
