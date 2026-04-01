import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionContainer } from "@/components/section-container";
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

export default async function WalutyPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "content.waluty" });

  return (
    <>
      <SiteHeader locale={locale} languagePicker={<LanguagePicker currentLocale={locale} />} />
      <main className="min-h-screen">
        <SectionContainer>
          <div className="space-y-8">
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                {t("title")}
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl">{t("description")}</p>
            </div>
            <RateCalculator />
          </div>
        </SectionContainer>
      </main>
      <SiteFooter />
    </>
  );
}
