import React from "react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/badge";
import { TableOfContents } from "@/components/table-of-contents";
import { ContributeFooter } from "@/components/contribute-footer";
import { ShareButton } from "@/components/share-button";
import type { Frontmatter } from "@/lib/content";

interface BlogPostLayoutProps {
  frontmatter: Frontmatter;
  readingTime: number;
  headings: Array<{ level: 2 | 3; text: string; id: string }>;
  children: React.ReactNode;
  locale: string;
  contentLocale?: string;
}

export async function BlogPostLayout({
  frontmatter,
  readingTime,
  headings,
  children,
  locale,
  contentLocale,
}: BlogPostLayoutProps) {
  const t = await getTranslations({ locale, namespace: "content" });
  const p = locale === "pl" ? "" : `/${locale}`;
  const backHref = `${p}/blog`;
  const dateFormatted = new Date(frontmatter.date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
        {t("layout.backToBlog")}
      </Link>

      <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
        <article>
          <header className="mb-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              {frontmatter.tags?.map((tag) => (
                <Badge key={tag} variant="info">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              {frontmatter.title}
            </h1>

            <div className="flex items-center gap-3 text-sm text-slate-500">
              <time dateTime={frontmatter.date}>{dateFormatted}</time>
              <span aria-hidden>·</span>
              <span>{t("layout.readingTime", { minutes: readingTime })}</span>
              <span aria-hidden>·</span>
              <ShareButton title={frontmatter.title} locale={locale} />
            </div>
          </header>

          <div className="prose prose-slate max-w-none mdx-content">{children}</div>

          <ContributeFooter
            locale={locale}
            section={frontmatter.section}
            slug={frontmatter.slug}
            contentLocale={contentLocale}
          />
        </article>

        {/* Sidebar TOC (desktop only) */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents headings={headings} />
          </div>
        </aside>
      </div>
    </div>
  );
}
