import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionContainer } from "@/components/section-container";
import { LanguagePicker } from "../language-picker";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

  // Canonical URL: Polish has no prefix, other locales have prefix
  const canonical = locale === "pl" ? "/privacy" : `/${locale}/privacy`;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical,
      languages: {
        pl: "/privacy",
        en: "/en/privacy",
        uk: "/uk/privacy",
        "x-default": "/privacy",
      },
    },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

  const sections = [
    { title: t("noCollection.title"), description: t("noCollection.description") },
    { title: t("noStorage.title"), description: t("noStorage.description") },
    { title: t("cookies.title"), description: t("cookies.description") },
    { title: t("thirdParty.title"), description: t("thirdParty.description") },
    { title: t("noAccounts.title"), description: t("noAccounts.description") },
    { title: t("openSource.title"), description: t("openSource.description") },
    { title: t("changes.title"), description: t("changes.description") },
    { title: t("contact.title"), description: t("contact.description") },
  ];

  return (
    <>
      <SiteHeader locale={locale} languagePicker={<LanguagePicker currentLocale={locale} />} />

      <main className="min-h-screen">
        <SectionContainer>
          <div className="space-y-12">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                {t("title")}
              </h1>
              <p className="text-slate-500 text-sm">{t("lastUpdated")}</p>
              <p className="text-lg text-slate-600">{t("intro")}</p>
            </div>

            <div className="space-y-10">
              {sections.map((section) => (
                <div key={section.title} className="space-y-3">
                  <h2 className="text-xl font-bold text-slate-900">{section.title}</h2>
                  <p className="text-slate-600 leading-relaxed">{section.description}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionContainer>
      </main>

      <SiteFooter />
    </>
  );
}
