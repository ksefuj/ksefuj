import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionContainer } from "@/components/section-container";
import { buildWebApplicationSchema } from "@/lib/structured-data";
import { LanguagePicker } from "../language-picker";
import { Validator } from "./validator";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "validatorPage" });

  const canonical = locale === "pl" ? "/validator" : `/${locale}/validator`;
  const title = t("metaTitle");
  const description = t("metaDescription");

  return {
    title,
    description,
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

export default async function ValidatorPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "validatorPage" });

  const urlPath = locale === "pl" ? "/validator" : `/${locale}/validator`;
  const structuredData = buildWebApplicationSchema(
    t("metaTitle"),
    t("metaDescription"),
    urlPath,
    locale,
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteHeader locale={locale} languagePicker={<LanguagePicker currentLocale={locale} />} />
      <main className="min-h-screen">
        <SectionContainer>
          <div className="space-y-8">
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 font-display">
                {t("title")}
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl">{t("intro")}</p>
              <p className="text-sm text-slate-500">{t("privacy")}</p>
            </div>
            <Validator locale={locale} />
          </div>
        </SectionContainer>
      </main>
      <SiteFooter />
    </>
  );
}
