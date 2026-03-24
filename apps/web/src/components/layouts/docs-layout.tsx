import React from "react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { TableOfContents } from "@/components/table-of-contents";
import { ShareButton } from "@/components/share-button";
import type { Frontmatter } from "@/lib/content";

interface DocsLayoutProps {
  frontmatter: Frontmatter;
  headings: Array<{ level: 2 | 3; text: string; id: string }>;
  children: React.ReactNode;
  locale: string;
}

export async function DocsLayout({ frontmatter, headings, children, locale }: DocsLayoutProps) {
  const t = await getTranslations({ locale, namespace: "content.layout" });
  const p = locale === "pl" ? "" : `/${locale}`;
  const backHref = `${p}/docs`;
  const updatedFormatted = new Date(frontmatter.updated ?? frontmatter.date).toLocaleDateString(
    locale,
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <Link
        href={backHref}
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-8"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        {t("backToDocs")}
      </Link>

      <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
        <article>
          <header className="mb-8 space-y-3">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              {frontmatter.title}
            </h1>
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs text-emerald-700 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" aria-hidden />
                {t("lastVerified", { date: updatedFormatted })}
              </div>
              <span aria-hidden className="text-slate-300">
                ·
              </span>
              <ShareButton title={frontmatter.title} locale={locale} />
            </div>
          </header>

          <div className="prose prose-slate max-w-none mdx-content">{children}</div>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents headings={headings} />
          </div>
        </aside>
      </div>
    </div>
  );
}
