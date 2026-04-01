import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionContainer } from "@/components/section-container";
import { buildWebApplicationSchema } from "@/lib/structured-data";
import { buildContentPath, getContentItemWithFallback } from "@/lib/content";
import { LanguagePicker } from "../language-picker";
import { RateCalculator } from "./rate-calculator";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const [tMeta, tContent] = await Promise.all([
    getTranslations({ locale, namespace: "meta" }),
    getTranslations({ locale, namespace: "content.waluty" }),
  ]);

  const canonical = locale === "pl" ? "/waluty" : `/${locale}/waluty`;
  const title = `${tContent("title")} — ${tMeta("title")}`;
  const description = tContent("metaDescription");

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "x-default": "/waluty",
        pl: "/waluty",
        en: "/en/waluty",
        uk: "/uk/waluty",
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

const RELATED_SLUGS = [
  "faktura-zagraniczna-ksef",
  "najczestsze-bledy-walidacji-fa3",
  "ksef-dla-jdg",
] as const;

export default async function WalutyPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "content.waluty" });

  const urlPath = locale === "pl" ? "/waluty" : `/${locale}/waluty`;
  const structuredData = buildWebApplicationSchema(
    t("title"),
    t("metaDescription"),
    urlPath,
    locale,
  );

  const relatedArticles = await Promise.all(
    RELATED_SLUGS.map(async (slug) => {
      const result = await getContentItemWithFallback(locale, "blog", slug);
      if (!result) {
        return null;
      }
      const { item, contentLocale } = result;
      return {
        title: item.frontmatter.title,
        description: item.frontmatter.description,
        href: buildContentPath(contentLocale, "blog", item.frontmatter.slug),
      };
    }),
  );

  const articles = relatedArticles.filter(Boolean);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteHeader locale={locale} languagePicker={<LanguagePicker currentLocale={locale} />} />
      <main className="min-h-screen">
        <SectionContainer>
          <div className="space-y-12">
            <div className="space-y-8">
              <div className="space-y-3">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                  {t("title")}
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl">{t("description")}</p>
              </div>
              <RateCalculator />
            </div>

            {articles.length > 0 && (
              <div className="space-y-6 border-t border-slate-100 pt-8">
                <h2 className="text-lg font-semibold text-slate-900">{t("relatedArticles")}</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {articles.map((article) => (
                    <Link
                      key={article!.href}
                      href={article!.href}
                      className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div>
                        <p className="text-base font-bold leading-snug text-slate-900 group-hover:text-violet-700 transition-colors">
                          {article!.title}
                        </p>
                        <p className="mt-2 text-sm text-slate-500 line-clamp-2">
                          {article!.description}
                        </p>
                      </div>
                      <span className="mt-4 text-sm font-medium text-violet-600 group-hover:text-violet-700">
                        {t("readMore")}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </SectionContainer>
      </main>
      <SiteFooter />
    </>
  );
}
