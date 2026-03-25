import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionContainer } from "@/components/section-container";
import { LanguagePicker } from "../language-picker";
import { buildContentPath, listContentItems } from "@/lib/content";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const [tMeta, tContent] = await Promise.all([
    getTranslations({ locale, namespace: "meta" }),
    getTranslations({ locale, namespace: "content.guides" }),
  ]);

  const canonical = locale === "pl" ? "/guides" : `/${locale}/guides`;
  const title = `${tContent("title")} — ${tMeta("title")}`;
  const description = tContent("metaDescription");

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "x-default": "/guides",
        pl: "/guides",
        en: "/en/guides",
        uk: "/uk/guides",
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

export default async function GuidesListPage({ params }: Props) {
  const { locale } = await params;
  const [guides, t] = await Promise.all([
    listContentItems(locale, "guides"),
    getTranslations({ locale, namespace: "content" }),
  ]);

  return (
    <>
      <SiteHeader locale={locale} languagePicker={<LanguagePicker currentLocale={locale} />} />
      <main className="min-h-screen">
        <SectionContainer>
          <div className="space-y-12">
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                {t("guides.title")}
              </h1>
              <p className="text-lg text-slate-600">{t("guides.description")}</p>
            </div>

            {guides.length === 0 ? (
              <p className="text-slate-500">{t("guides.empty")}</p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                {guides.map((guide) => {
                  const href = buildContentPath(locale, "guides", guide.frontmatter.slug);
                  return (
                    <Link
                      key={guide.frontmatter.slug}
                      href={href}
                      className="group block rounded-2xl border border-slate-200 bg-white p-6 hover:border-violet-200 hover:shadow-md transition-all"
                    >
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="text-xs text-slate-400">
                          {t("blog.readingTime", { minutes: guide.readingTime })}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-slate-900 group-hover:text-violet-700 transition-colors leading-snug mb-2">
                        {guide.frontmatter.title}
                      </h2>
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {guide.frontmatter.description}
                      </p>
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
