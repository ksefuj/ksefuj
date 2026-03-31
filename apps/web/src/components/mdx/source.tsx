"use client";

import * as amplitude from "@amplitude/unified";

interface SourceProps {
  href: string;
  label: string;
}

/** Inline source citation with an external link icon */
export function Source({ href, label }: SourceProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        let domain = "";
        try {
          domain = new URL(href).hostname;
        } catch {
          // relative or malformed URL — track without domain
        }
        amplitude.track("external_link_clicked", { href, domain, source: true });
      }}
      className="inline-flex items-center gap-1.5 text-sm text-violet-600 hover:text-violet-700 transition-colors"
    >
      <svg
        className="w-3.5 h-3.5 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
      {label}
    </a>
  );
}
