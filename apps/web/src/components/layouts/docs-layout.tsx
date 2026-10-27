import React from "react";
import { getTranslations } from "next-intl/server";
import { TableOfContents } from "@/components/table-of-contents";
import { ContributeFooter } from "@/components/contribute-footer";
import { ShareButton } from "@/components/share-button";
import { BackLink } from "./back-link";
import type { Frontmatter } from "@/lib/content";

interface DocsLayoutProps {
  frontmatter: Frontmatter;
  headings: Array<{ level: 2 | 3; text: string; id: string }>;
  children: React.ReactNode;
  locale: string;
  contentLocale?: string;
}

export async function DocsLayout({
  frontmatter,
  headings,
  children,
  locale,
  contentLocale,
}: DocsLayoutProps) {
  const t = await getTranslations({ locale, namespace: "content.layout" });
  const p = locale === "pl" ? "" : `/${locale}`;
  const backHref = `${p}/docs`;
  const updatedFormatted = new Date(frontmatter.updated ?? frontmatter.date).toLocaleDateString(
    locale,
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <BackLink href={backHref} label={t("backToDocs")} />

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
              <a
                href="#ai-open-source"
                className="text-sm text-slate-500 underline-offset-2 hover:text-violet-600 hover:underline transition-colors"
              >
                {t("aiNote")}
              </a>
              <span aria-hidden className="text-slate-300">
                ·
              </span>
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

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents headings={headings} />
          </div>
        </aside>
      </div>
    </div>
  );
}
