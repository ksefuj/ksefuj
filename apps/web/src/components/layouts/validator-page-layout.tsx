import React from "react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { TableOfContents } from "@/components/table-of-contents";
import { ContributeFooter } from "@/components/contribute-footer";
import { ShareButton } from "@/components/share-button";
import { BackLink } from "./back-link";
import type { Frontmatter } from "@/lib/content";

interface ValidatorPageLayoutProps {
  frontmatter: Frontmatter;
  headings: Array<{ level: 2 | 3; text: string; id: string }>;
  children: React.ReactNode;
  locale: string;
}

/** Article layout for validator reference pages (one per issue code). */
export async function ValidatorPageLayout({
  frontmatter,
  headings,
  children,
  locale,
}: ValidatorPageLayoutProps) {
  const t = await getTranslations({ locale, namespace: "content.layout" });
  const tPage = await getTranslations({ locale, namespace: "validatorPage" });
  const p = locale === "pl" ? "" : `/${locale}`;
  const validatorHref = `${p}/validator`;
  const updatedFormatted = new Date(frontmatter.updated ?? frontmatter.date).toLocaleDateString(
    locale,
    { year: "numeric", month: "long", day: "numeric" },
  );
  const sources = (frontmatter.sources ?? []).filter((s) => s.url);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <BackLink href={validatorHref} label={tPage("backToValidator")} />

      <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
        <article>
          <header className="mb-8 space-y-3">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              {frontmatter.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
              <time dateTime={frontmatter.updated ?? frontmatter.date}>{updatedFormatted}</time>
              <span aria-hidden>·</span>
              <ShareButton title={frontmatter.title} locale={locale} />
            </div>
          </header>

          <div className="prose prose-slate max-w-none mdx-content">{children}</div>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 font-display">
              {tPage("ctaTitle")}
            </h2>
            <p className="mt-2 text-slate-600">{tPage("ctaText")}</p>
            <Link
              href={validatorHref}
              className="mt-4 inline-block bg-violet-600 hover:bg-violet-700 text-white rounded-xl px-6 py-3 font-semibold transition-colors"
            >
              {tPage("ctaButton")}
            </Link>
          </div>

          {sources.length > 0 && (
            <div className="mt-10 pt-6 border-t border-slate-100">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
                {t("sources")}
              </h2>
              <ul className="space-y-1.5">
                {sources.map((source) => (
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

          <ContributeFooter locale={locale} section="validator" slug={frontmatter.slug} />
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
