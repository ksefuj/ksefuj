"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface Heading {
  level: 2 | 3;
  text: string;
  id: string;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const t = useTranslations("content.layout");
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) {
      return;
    }

    // Track all currently-visible heading IDs, then pick the first one in
    // document order (headings array) to avoid non-deterministic ordering
    // from IntersectionObserver's entries array.
    const visibleIds = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleIds.add(entry.target.id);
          } else {
            visibleIds.delete(entry.target.id);
          }
        }
        const first = headings.find((h) => visibleIds.has(h.id));
        if (first) {
          setActiveId(first.id);
        }
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0 },
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav aria-label={t("tableOfContents")} className="space-y-1">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
        {t("tableOfContents")}
      </p>
      {headings.map((h) => (
        <a
          key={h.id}
          href={`#${h.id}`}
          className={cn(
            "block text-sm transition-colors py-0.5",
            h.level === 3 && "pl-3",
            activeId === h.id
              ? "text-violet-600 font-medium"
              : "text-slate-500 hover:text-slate-800",
          )}
        >
          {h.text}
        </a>
      ))}
    </nav>
  );
}
