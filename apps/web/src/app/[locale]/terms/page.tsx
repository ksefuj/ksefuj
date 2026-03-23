import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LanguagePicker } from "../language-picker";
import Link from "next/link";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms.meta" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms" });

  const sections = [
    "license",
    "noWarranties",
    "liability",
    "userResponsibility",
    "freeForever",
    "privacy",
    "governingLaw",
    "contact",
  ] as const;

  return (
    <>
      <SiteHeader locale={locale} languagePicker={<LanguagePicker currentLocale={locale} />} />

      <main className="min-h-screen">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-16">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">{t("title")}</h1>
            <p className="text-sm text-slate-500">{t("lastUpdated")}</p>
          </div>

          <p className="text-slate-700 mb-10 text-base leading-relaxed">{t("intro")}</p>

          <div className="space-y-8">
            {sections.map((section) => (
              <section key={section}>
                <h2 className="text-lg font-semibold text-slate-900 mb-2">
                  {t(`sections.${section}.title`)}
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  {t(`sections.${section}.content`)}
                  {section === "contact" && (
                    <a
                      href="mailto:hej@ksefuj.to"
                      className="text-violet-600 hover:text-violet-700 transition-colors"
                    >
                      hej@ksefuj.to
                    </a>
                  )}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200">
            <Link
              href={`/${locale}`}
              className="text-violet-600 hover:text-violet-700 transition-colors text-sm"
            >
              ← ksefuj.to
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
