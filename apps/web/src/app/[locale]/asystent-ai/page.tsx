import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { withSiteSuffix } from "@/lib/page-title";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionContainer } from "@/components/section-container";
import { TrackedLink } from "@/components/tracked-link";
import { LanguagePicker } from "../language-picker";

interface Props {
  params: Promise<{ locale: string }>;
}

const REPO_URL = "https://github.com/ksefuj/skills";
const RELEASES_URL = "https://github.com/ksefuj/skills/releases/latest";

const STEP_KEYS = ["describe", "generate", "check"] as const;
const SKILL_KEYS = ["invoice", "correction"] as const;
const PROMPT_KEYS = ["foreignClient", "wrongNip"] as const;
const FAQ_KEYS = ["free", "xml", "send", "which"] as const;

const H2_CLASSES = "text-3xl md:text-4xl font-bold tracking-tight text-slate-900 font-display";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "asystentAi" });

  const canonical = locale === "pl" ? "/asystent-ai" : `/${locale}/asystent-ai`;
  const title = withSiteSuffix(t("meta.title"));
  const description = t("meta.description");

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "x-default": "/asystent-ai",
        pl: "/asystent-ai",
        en: "/en/asystent-ai",
        uk: "/uk/asystent-ai",
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

export default async function AssistantPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "asystentAi" });

  const p = locale === "pl" ? "" : `/${locale}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_KEYS.map((key) => ({
      "@type": "Question",
      name: t(`faq.${key}.q`),
      acceptedAnswer: { "@type": "Answer", text: t(`faq.${key}.a`) },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
      />
      <SiteHeader locale={locale} languagePicker={<LanguagePicker currentLocale={locale} />} />
      <main className="min-h-screen">
        {/* Hero */}
        <SectionContainer>
          <div className="space-y-6">
            <span className="inline-block rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-violet-700">
              {t("hero.eyebrow")}
            </span>
            <h1 className="max-w-3xl text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 font-display">
              {t("hero.title")}
            </h1>
            <p className="max-w-2xl text-lg text-slate-600">{t("hero.subtitle")}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="#instalacja" className="btn-primary inline-block">
                {t("hero.primaryCta")}
              </a>
              <TrackedLink
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-block"
                event="skills_install_clicked"
                eventProps={{ target: "github", locale }}
              >
                {t("hero.secondaryCta")}
              </TrackedLink>
            </div>
          </div>
        </SectionContainer>

        {/* How it works */}
        <SectionContainer background="slate">
          <div className="space-y-8">
            <h2 className={H2_CLASSES}>{t("howItWorks.title")}</h2>
            <ol className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {STEP_KEYS.map((key, index) => (
                <li
                  key={key}
                  className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <span
                    aria-hidden
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-50 text-sm font-semibold text-violet-700"
                  >
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 font-display">
                    {t(`howItWorks.steps.${key}.title`)}
                  </h3>
                  <p className="text-sm text-slate-600">{t(`howItWorks.steps.${key}.text`)}</p>
                </li>
              ))}
            </ol>
          </div>
        </SectionContainer>

        {/* Skills */}
        <SectionContainer>
          <div className="space-y-8">
            <h2 className={H2_CLASSES}>{t("skills.title")}</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {SKILL_KEYS.map((key) => {
                const items = t.raw(`skills.${key}.items`) as string[];
                return (
                  <article
                    key={key}
                    className="space-y-4 rounded-2xl border border-slate-200 border-t-4 border-t-violet-400 bg-white p-6 md:p-8"
                  >
                    <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-slate-700">
                      {t(`skills.${key}.name`)}
                    </code>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 font-display">
                      {t(`skills.${key}.title`)}
                    </h3>
                    <p className="text-slate-600">{t(`skills.${key}.description`)}</p>
                    <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600 marker:text-slate-400">
                      {items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </SectionContainer>

        {/* Install */}
        <div id="instalacja" className="scroll-mt-20">
          <SectionContainer background="violet">
            <div className="space-y-8">
              <div className="space-y-3">
                <h2 className={H2_CLASSES}>{t("install.title")}</h2>
                <p className="max-w-2xl text-lg text-slate-600">{t("install.intro")}</p>
              </div>
              <div className="space-y-6">
                <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
                  <h3 className="text-xl font-bold text-slate-900 font-display">
                    {t("install.claudeApp.title")}
                  </h3>
                  <ol className="list-decimal space-y-1 pl-5 text-slate-700 marker:text-slate-400">
                    {[0, 1, 2].map((i) => (
                      <li key={i}>{t(`install.claudeApp.steps.${i}`)}</li>
                    ))}
                  </ol>
                  <TrackedLink
                    href={RELEASES_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-block"
                    event="skills_install_clicked"
                    eventProps={{ target: "releases", locale }}
                  >
                    {t("install.claudeApp.downloadCta")}
                  </TrackedLink>
                </div>
                <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
                  <h3 className="text-xl font-bold text-slate-900 font-display">
                    {t("install.claudeCode.title")}
                  </h3>
                  <p className="text-slate-700">{t("install.claudeCode.intro")}</p>
                  <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 font-mono text-sm text-slate-100">
                    <code>
                      {"/plugin marketplace add ksefuj/skills\n/plugin install ksef@ksefuj"}
                    </code>
                  </pre>
                </div>
                <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
                  <h3 className="text-xl font-bold text-slate-900 font-display">
                    {t("install.otherAssistants.title")}
                  </h3>
                  <p className="text-slate-600">{t("install.otherAssistants.text")}</p>
                </div>
              </div>
            </div>
          </SectionContainer>
        </div>

        {/* Example prompts */}
        <SectionContainer>
          <div className="space-y-8">
            <h2 className={H2_CLASSES}>{t("examplePrompt.title")}</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {PROMPT_KEYS.map((key) => (
                <figure
                  key={key}
                  className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 md:p-8"
                >
                  <figcaption className="text-xs font-semibold uppercase tracking-wide text-violet-700">
                    {t(`examplePrompt.${key}.label`)}
                  </figcaption>
                  <blockquote className="border-l-4 border-violet-200 pl-4 text-slate-700 leading-relaxed">
                    {t(`examplePrompt.${key}.text`)}
                  </blockquote>
                </figure>
              ))}
            </div>
          </div>
        </SectionContainer>

        {/* Privacy */}
        <SectionContainer background="slate">
          <div className="space-y-3">
            <h2 className={H2_CLASSES}>{t("privacy.title")}</h2>
            <p className="max-w-2xl text-lg text-slate-600">{t("privacy.text")}</p>
          </div>
        </SectionContainer>

        {/* Caveat */}
        <SectionContainer background="amber">
          <div className="space-y-4">
            <h2 className={H2_CLASSES}>{t("caveat.title")}</h2>
            <p className="max-w-2xl text-lg text-slate-600">{t("caveat.text")}</p>
            <Link href={`${p}/validator`} className="btn-primary inline-block">
              {t("caveat.cta")}
            </Link>
          </div>
        </SectionContainer>

        {/* FAQ + disclaimer */}
        <SectionContainer>
          <div className="space-y-8">
            <h2 className={H2_CLASSES}>{t("faq.title")}</h2>
            <dl className="space-y-6">
              {FAQ_KEYS.map((key) => (
                <div key={key} className="space-y-2">
                  <dt className="text-base font-bold text-slate-900">{t(`faq.${key}.q`)}</dt>
                  <dd className="max-w-2xl leading-relaxed text-slate-600">{t(`faq.${key}.a`)}</dd>
                </div>
              ))}
            </dl>
            <p className="border-t border-slate-100 pt-6 text-sm text-slate-400">
              {t("disclaimer")}
            </p>
          </div>
        </SectionContainer>
      </main>
      <SiteFooter />
    </>
  );
}
