import React from "react";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/badge";
import { TableOfContents } from "@/components/table-of-contents";
import { ShareButton } from "@/components/share-button";
import { BackLink } from "./back-link";
import type { Frontmatter } from "@/lib/content";

interface GuideLayoutProps {
  frontmatter: Frontmatter;
  readingTime: number;
  headings: Array<{ level: 2 | 3; text: string; id: string }>;
  children: React.ReactNode;
  locale: string;
}

export async function GuideLayout({
  frontmatter,
  readingTime,
  headings,
  children,
  locale,
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
            {t("layout.guideAudience")}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {frontmatter.audience?.map((a) => (
              <Badge key={a} variant="info">
                {t(`audience.${a}` as "audience.jdg")}
              </Badge>
            ))}
          </div>
        </div>
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
