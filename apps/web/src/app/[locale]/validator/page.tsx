import type { Metadata } from "next";
import { withSiteSuffix } from "@/lib/page-title";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionContainer } from "@/components/section-container";
import { buildWebApplicationSchema } from "@/lib/structured-data";
import { buildContentPath } from "@/lib/content";
import {
  buildIssueHelpAnchors,
  buildIssueHelpLinks,
  listValidatorPages,
} from "@/lib/validator-pages";
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
  const ta = await getTranslations({ locale, namespace: "asystentAi" });
  const referencePages = await listValidatorPages(locale);
  const issueHelpLinks = buildIssueHelpLinks(locale, referencePages);
  const issueHelpAnchors = buildIssueHelpAnchors(referencePages);

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
              <p className="text-sm text-slate-500">
                {t("previewLinkText")}{" "}
                <Link
                  href={locale === "pl" ? "/podglad" : `/${locale}/podglad`}
                  className="font-medium text-violet-600 hover:text-violet-700 underline transition-colors"
                >
                  {t("previewLink")}
                </Link>
              </p>
              <p className="text-sm text-slate-500">
                {ta("validatorHint.text")}{" "}
                <Link
                  href={locale === "pl" ? "/asystent-ai" : `/${locale}/asystent-ai`}
                  className="font-medium text-violet-600 hover:text-violet-700 underline transition-colors"
                >
                  {ta("validatorHint.link")}
                </Link>
              </p>
            </div>
            <Validator
              locale={locale}
              issueHelpLinks={issueHelpLinks}
              issueHelpAnchors={issueHelpAnchors}
            />
            {referencePages.length > 0 && (
              <section id="messages" aria-labelledby="messages-heading" className="space-y-4 pt-8">
                <div className="space-y-1">
                  <h2
                    id="messages-heading"
                    className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 font-display"
                  >
                    {t("messagesIndex.title")}
                  </h2>
                  <p className="text-sm text-slate-500">{t("messagesIndex.intro")}</p>
                </div>
                <ul className="divide-y divide-slate-200 border-y border-slate-200">
                  {referencePages.map(({ frontmatter }) => (
                    <li key={frontmatter.slug} className="group relative py-4">
                      <h3 className="text-base font-semibold leading-snug text-slate-900">
                        <Link
                          href={buildContentPath(locale, "validator", frontmatter.slug)}
                          className="underline-offset-4 decoration-violet-500 group-hover:text-violet-700 group-hover:underline after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-violet-500"
                        >
                          {frontmatter.title}
                        </Link>
                      </h3>
                      <p className="mt-1 max-w-3xl text-sm text-slate-600 line-clamp-2">
                        {frontmatter.description}
                      </p>
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
