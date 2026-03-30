import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LanguagePicker } from "../language-picker";
import { ValidatorPageClient } from "./validator-page-client";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "validatorPage.meta" });

  const canonical = locale === "pl" ? "/validator" : `/${locale}/validator`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical,
      languages: {
        "x-default": "/validator",
        pl: "/validator",
        en: "/en/validator",
        uk: "/uk/validator",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `https://ksefuj.to${canonical}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function ValidatorPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "validatorPage" });

  return (
    <>
      <SiteHeader locale={locale} languagePicker={<LanguagePicker currentLocale={locale} />} />
      <main className="min-h-screen">
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="mb-8">
              <a
                href={locale === "pl" ? "/" : `/${locale}`}
                className="text-sm text-slate-500 hover:text-violet-600 transition-colors inline-flex items-center gap-1"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                {t("backToHome")}
              </a>
            </div>

            <div className="text-center space-y-4 mb-12">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 font-display">
                {t("heading")}
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto font-body">
                {t("description")}
              </p>
            </div>

            <ValidatorPageClient locale={locale} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
