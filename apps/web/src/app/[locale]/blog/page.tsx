import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionContainer } from "@/components/section-container";
import { Badge } from "@/components/badge";
import { LanguagePicker } from "../language-picker";
import { listContentItems } from "@/lib/content";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const [tMeta, tContent] = await Promise.all([
    getTranslations({ locale, namespace: "meta" }),
    getTranslations({ locale, namespace: "content.blog" }),
  ]);

  return {
    title: `${tContent("title")} — ${tMeta("title")}`,
    description: tContent("metaDescription"),
    alternates: {
      canonical: locale === "pl" ? "/blog" : `/${locale}/blog`,
    },
  };
}

export default async function BlogListPage({ params }: Props) {
  const { locale } = await params;
  const [posts, t] = await Promise.all([
    listContentItems(locale, "blog"),
    getTranslations({ locale, namespace: "content" }),
  ]);

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
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                {t("blog.title")}
              </h1>
              <p className="text-lg text-slate-600">{t("blog.description")}</p>
            </div>

            {posts.length === 0 ? (
              <p className="text-slate-500">{t("blog.empty")}</p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                {posts.map((post) => {
                  const p = locale === "pl" ? "" : `/${locale}`;
                  const href = `${p}/blog/${post.frontmatter.slug}`;
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
