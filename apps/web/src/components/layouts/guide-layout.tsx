import React from "react";
import { getTranslations } from "next-intl/server";
import { TableOfContents } from "@/components/table-of-contents";
import { ContributeFooter } from "@/components/contribute-footer";
import { ShareButton } from "@/components/share-button";
import { ReadNext } from "@/components/read-next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { MoreInTopic } from "@/components/more-in-topic";
import { SidebarNewsletter } from "@/components/sidebar-newsletter";
import { ArticleNewsletter } from "@/components/article-newsletter";
import type { Frontmatter } from "@/lib/content";
import { getUpdatedDay, toIsoDay } from "@/lib/content-dates";
import Link from "next/link";
import { buildListingHref } from "@/lib/listing-filters";
import { isContentTopic } from "@/lib/topics";

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
  const [t, tNav] = await Promise.all([
    getTranslations({ locale, namespace: "content" }),
    getTranslations({ locale, namespace: "nav" }),
  ]);
  const p = locale === "pl" ? "" : `/${locale}`;
  const listHref = `${p}/guides`;
  const dateFormatted = new Date(frontmatter.date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const updatedDay = getUpdatedDay(frontmatter);
  const updatedFormatted = updatedDay
    ? new Date(updatedDay).toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <Breadcrumbs
        label={t("layout.breadcrumb")}
        items={[
          { label: t("layout.home"), href: p || "/" },
          { label: tNav("guides"), href: listHref },
          { label: frontmatter.title },
        ]}
      />
      <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
        <article>
          <header className="mb-8 space-y-4">
            {isContentTopic(frontmatter.topic) && (
              <p className="text-sm font-medium">
                <Link
                  href={buildListingHref(listHref, { topic: frontmatter.topic })}
                  className="text-violet-700 underline-offset-4 hover:underline"
                >
                  {t(`topics.${frontmatter.topic}`)}
                </Link>
              </p>
            )}
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight font-display">
              {frontmatter.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
              <time dateTime={toIsoDay(frontmatter.date)}>{dateFormatted}</time>
              {updatedDay && (
                <>
                  <span aria-hidden>·</span>
                  <time dateTime={updatedDay}>
                    {t("layout.updated", { date: updatedFormatted })}
                  </time>
                </>
              )}
              <span aria-hidden>·</span>
              <span>{t("layout.readingTime", { minutes: readingTime })}</span>
              <span aria-hidden>·</span>
              <ShareButton title={frontmatter.title} locale={locale} />
            </div>
          </header>

          <div className="prose prose-slate max-w-none mdx-content">{children}</div>

          {frontmatter.sources && frontmatter.sources.filter((s) => s.url).length > 0 && (
            <div className="mt-10 pt-6 border-t border-slate-200">
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

          <ArticleNewsletter locale={locale} topic={frontmatter.topic} />

          <ReadNext locale={locale} section="guides" frontmatter={frontmatter} />

          <MoreInTopic locale={locale} section="guides" frontmatter={frontmatter} />

          <ContributeFooter
            locale={locale}
            section={frontmatter.section}
            slug={frontmatter.slug}
            contentLocale={contentLocale}
          />
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
            <TableOfContents headings={headings} />
            <SidebarNewsletter locale={locale} />
          </div>
        </aside>
      </div>
    </div>
  );
}
