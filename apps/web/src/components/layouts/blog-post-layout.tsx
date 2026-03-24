import React from "react";
import Link from "next/link";
import { Badge } from "@/components/badge";
import { TableOfContents } from "@/components/table-of-contents";
import { ContributeFooter } from "@/components/contribute-footer";
import type { Frontmatter } from "@/lib/content";

interface BlogPostLayoutProps {
  frontmatter: Frontmatter;
  readingTime: number;
  headings: Array<{ level: 2 | 3; text: string; id: string }>;
  children: React.ReactNode;
  locale: string;
}

const difficultyLabel: Record<string, string> = {
  beginner: "Podstawowy",
  intermediate: "Średniozaawansowany",
  advanced: "Zaawansowany",
};

const difficultyColor: Record<string, "success" | "warning" | "error"> = {
  beginner: "success",
  intermediate: "warning",
  advanced: "error",
};

export function BlogPostLayout({
  frontmatter,
  readingTime,
  headings,
  children,
  locale,
}: BlogPostLayoutProps) {
  const backHref = locale === "pl" ? "/blog" : `/${locale}/blog`;
  const dateFormatted = new Date(frontmatter.date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      {/* Back link */}
      <Link
        href={backHref}
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-8"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Blog
      </Link>

      <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
        {/* Main content */}
        <article>
          {/* Header */}
          <header className="mb-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              {frontmatter.tags?.map((tag) => (
                <Badge key={tag} variant="info">
                  {tag}
                </Badge>
              ))}
              {frontmatter.difficulty && (
                <Badge variant={difficultyColor[frontmatter.difficulty] ?? "info"}>
                  {difficultyLabel[frontmatter.difficulty] ?? frontmatter.difficulty}
                </Badge>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              {frontmatter.title}
            </h1>

            <div className="flex items-center gap-3 text-sm text-slate-500">
              <time dateTime={frontmatter.date}>{dateFormatted}</time>
              <span aria-hidden>·</span>
              <span>{readingTime} min czytania</span>
            </div>
          </header>

          {/* MDX prose content */}
          <div className="prose prose-slate max-w-none mdx-content">{children}</div>

          {/* GitHub contribution footer */}
          <ContributeFooter
            locale={locale}
            section={frontmatter.section}
            slug={frontmatter.slug}
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
