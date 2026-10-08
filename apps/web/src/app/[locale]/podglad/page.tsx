import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { withSiteSuffix } from "@/lib/page-title";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionContainer } from "@/components/section-container";
import { buildWebApplicationSchema } from "@/lib/structured-data";
import { LanguagePicker } from "../language-picker";
import { PreviewTool } from "./preview-tool";

interface Props {
  params: Promise<{ locale: string }>;
}

interface Step {
  title: string;
  text: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "previewPage" });

  const canonical = locale === "pl" ? "/podglad" : `/${locale}/podglad`;
  const title = withSiteSuffix(t("metaTitle"));
  const description = t("metaDescription");

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "x-default": "/podglad",
        pl: "/podglad",
        en: "/en/podglad",
        uk: "/uk/podglad",
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

export default async function PreviewPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "previewPage" });

  const p = locale === "pl" ? "" : `/${locale}`;
  const steps = t.raw("howItWorks.steps") as Step[];
  const faqItems = t.raw("faq.items") as FaqItem[];

  const appSchema = buildWebApplicationSchema(
    t("title"),
    t("metaDescription"),
    `${p}/podglad`,
    locale,
  );
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
      />
      <SiteHeader locale={locale} languagePicker={<LanguagePicker currentLocale={locale} />} />
      <main className="min-h-screen">
        <SectionContainer>
          <div className="space-y-12">
            <div className="space-y-8">
              <div className="space-y-3">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 font-display">
                  {t("title")}
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl">{t("intro")}</p>
                <p className="text-sm text-slate-500">{t("privacy")}</p>
              </div>
              <PreviewTool locale={locale} />
            </div>

            <section className="space-y-6 pt-8 border-t border-slate-100">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 font-display">
                {t("howItWorks.title")}
              </h2>
              <ol className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {steps.map((step, index) => (
                  <li
                    key={step.title}
                    className="space-y-2 rounded-2xl border border-slate-200 bg-white p-6"
                  >
                    <span
                      aria-hidden
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-50 text-sm font-semibold text-violet-700"
                    >
                      {index + 1}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
                    <p className="text-sm text-slate-600">{step.text}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 font-display">
                {t("faq.title")}
              </h2>
              <dl className="space-y-6">
                {faqItems.map((item) => (
                  <div key={item.question} className="space-y-2">
                    <dt className="text-base font-bold text-slate-900">{item.question}</dt>
                    <dd className="text-slate-600 leading-relaxed">{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
              <h2 className="text-xl font-bold text-slate-900 font-display">{t("cta.title")}</h2>
              <p className="text-slate-600">{t("cta.text")}</p>
              <Link href={`${p}/validator`} className="btn-primary inline-block">
                {t("cta.button")}
              </Link>
            </section>
          </div>
        </SectionContainer>
      </main>
      <SiteFooter />
    </>
  );
}
