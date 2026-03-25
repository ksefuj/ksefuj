import React from "react";
import { getTranslations } from "next-intl/server";
import { TableOfContents } from "@/components/table-of-contents";
import { ContributeFooter } from "@/components/contribute-footer";
import { ShareButton } from "@/components/share-button";
import { BackLink } from "./back-link";
import type { Frontmatter } from "@/lib/content";

interface GuideLayoutProps {
  frontmatter: Frontmatter;
  readingTime: number;
  headings: Array<{ level: 2 | 3; text: string; id: string }>;
  children: React.ReactNode;
  locale: string;
  contentLocale?: string;
}

export async function GuideLayout({
  frontmatter,
  readingTime,
  headings,
  children,
  locale,
  contentLocale,
}: GuideLayoutProps) {
  const t = await getTranslations({ locale, namespace: "content" });
  const p = locale === "pl" ? "" : `/${locale}`;
  const backHref = `${p}/guides`;
  const dateFormatted = new Date(frontmatter.date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <BackLink href={backHref} label={t("layout.backToGuides")} />

      {/* Guide header card */}
      <div className="rounded-2xl border border-violet-100 bg-violet-50/50 px-6 py-5 mb-8 flex flex-wrap gap-6">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
            {t("layout.guideTime")}
          </span>
          <span className="text-sm font-medium text-slate-700">
            {t("layout.readingTime", { minutes: readingTime })}
          </span>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
        <article>
          <header className="mb-8 space-y-4">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              {frontmatter.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <time dateTime={frontmatter.date}>{dateFormatted}</time>
              <span aria-hidden>·</span>
              <ShareButton title={frontmatter.title} locale={locale} />
            </div>
          </header>

          <div className="prose prose-slate max-w-none mdx-content">{children}</div>

          {frontmatter.sources && frontmatter.sources.filter((s) => s.url).length > 0 && (
            <div className="mt-10 pt-6 border-t border-slate-100">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
                {t("layout.sources")}
              </h2>
              <ul className="space-y-1.5">
                {frontmatter.sources
                  .filter((s) => s.url)
                  .map((source) => (
                    <li key={source.url} className="text-sm">
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 hover:text-violet-600 transition-colors"
                      >
                        {source.label}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          <ContributeFooter
            locale={locale}
            section={frontmatter.section}
            slug={frontmatter.slug}
            contentLocale={contentLocale}
          />
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
