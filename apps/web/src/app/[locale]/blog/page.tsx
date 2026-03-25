import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionContainer } from "@/components/section-container";
import { Badge } from "@/components/badge";
import { LanguagePicker } from "../language-picker";
import { buildContentPath, listContentItemsUnified } from "@/lib/content";
import { BlogFilter } from "./blog-filter";

const FILTER_TRANSLATED = "translated" as const;

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ filter?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const [tMeta, tContent] = await Promise.all([
    getTranslations({ locale, namespace: "meta" }),
    getTranslations({ locale, namespace: "content.blog" }),
  ]);

  const canonical = locale === "pl" ? "/blog" : `/${locale}/blog`;
  const title = `${tContent("title")} — ${tMeta("title")}`;
  const description = tContent("metaDescription");

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "x-default": "/blog",
        pl: "/blog",
        en: "/en/blog",
        uk: "/uk/blog",
      },
      types: {
        "application/rss+xml": "/feed.xml",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://ksefuj.to${canonical}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogListPage({ params, searchParams }: Props) {
  const [{ locale }, { filter }] = await Promise.all([params, searchParams]);
  const [allPosts, t] = await Promise.all([
    listContentItemsUnified(locale, "blog"),
    getTranslations({ locale, namespace: "content" }),
  ]);

  const activeFilter = filter === FILTER_TRANSLATED ? FILTER_TRANSLATED : "all";
  const posts =
    activeFilter === FILTER_TRANSLATED
      ? allPosts.filter((p) => p.contentLocale === locale)
      : allPosts;

  const dateFormatted = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <>
      <SiteHeader locale={locale} languagePicker={<LanguagePicker currentLocale={locale} />} />
      <main className="min-h-screen">
        <SectionContainer>
          <div className="space-y-12">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                  {t("blog.title")}
                </h1>
                <a
                  href="/feed.xml"
                  title="RSS"
                  className="shrink-0 text-slate-400 hover:text-violet-500 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z" />
                  </svg>
                </a>
              </div>
              <p className="text-lg text-slate-600">{t("blog.description")}</p>
            </div>

            {locale !== "pl" && (
              <Suspense>
                <BlogFilter
                  labelAll={t("blog.filter.all")}
                  labelTranslatedOnly={t("blog.filter.translatedOnly")}
                />
              </Suspense>
            )}

            {posts.length === 0 ? (
              <p className="text-slate-500">{t("blog.empty")}</p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                {posts.map((post) => {
                  const href = buildContentPath(post.contentLocale, "blog", post.frontmatter.slug);
                  return (
                    <Link
                      key={post.frontmatter.slug}
                      href={href}
                      className="group block rounded-2xl border border-slate-200 bg-white p-6 hover:border-violet-200 hover:shadow-md transition-all"
                    >
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.frontmatter.tags?.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="info">
                            {tag}
                          </Badge>
                        ))}
                        {post.contentLocale !== locale && (
                          <Badge variant="neutral" className="ml-auto">
                            {t("blog.languageBadge")}
                          </Badge>
                        )}
                      </div>
                      <h2 className="text-xl font-bold text-slate-900 group-hover:text-violet-700 transition-colors leading-snug mb-2">
                        {post.frontmatter.title}
                      </h2>
                      <p className="text-sm text-slate-600 line-clamp-2 mb-4">
                        {post.frontmatter.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <time dateTime={post.frontmatter.date}>
                          {dateFormatted(post.frontmatter.date)}
                        </time>
                        <span aria-hidden>·</span>
                        <span>{t("blog.readingTime", { minutes: post.readingTime })}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </SectionContainer>
      </main>
      <SiteFooter />
    </>
  );
}
