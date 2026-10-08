import type { Metadata } from "next";
import { withSiteSuffix } from "@/lib/page-title";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionContainer } from "@/components/section-container";
import { buildWebApplicationSchema } from "@/lib/structured-data";
import { buildContentPath } from "@/lib/content";
import { buildIssueHelpLinks, listValidatorPages } from "@/lib/validator-pages";
import { LanguagePicker } from "../language-picker";
import { Validator } from "./validator";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "validatorPage" });

  const canonical = locale === "pl" ? "/validator" : `/${locale}/validator`;
  const title = withSiteSuffix(t("metaTitle"));
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
  const referencePages = await listValidatorPages(locale);
  const issueHelpLinks = buildIssueHelpLinks(locale, referencePages);

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
            <Validator locale={locale} issueHelpLinks={issueHelpLinks} />
            {referencePages.length > 0 && (
              <section className="space-y-4 pt-8 border-t border-slate-100">
                <div className="space-y-1">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 font-display">
                    {t("commonErrors.title")}
                  </h2>
                  <p className="text-sm text-slate-500">{t("commonErrors.intro")}</p>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {referencePages.map(({ frontmatter }) => (
                    <li key={frontmatter.slug}>
                      <Link
                        href={buildContentPath(locale, "validator", frontmatter.slug)}
                        className="block h-full bg-white rounded-2xl border border-slate-200 p-4 text-slate-700 font-medium hover:shadow-md hover:text-violet-600 transition-shadow duration-200"
                      >
                        {frontmatter.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </SectionContainer>
      </main>
      <SiteFooter />
    </>
  );
}
