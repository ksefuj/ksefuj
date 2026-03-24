import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionContainer } from "@/components/section-container";
import { LanguagePicker } from "../language-picker";
import { listContentItems } from "@/lib/content";
import { compileMDXContent } from "@/lib/compile-mdx";

interface FaqQuestion {
  id: string;
  question: string;
  answer: string;
}

interface FaqCategory {
  id: string;
  title: string;
  questions: FaqQuestion[];
}

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const [tMeta, tContent] = await Promise.all([
    getTranslations({ locale, namespace: "meta" }),
    getTranslations({ locale, namespace: "content.faq" }),
  ]);

  return {
    title: `${tContent("title")} — ${tMeta("title")}`,
    description: tContent("metaDescription"),
    alternates: {
      canonical: locale === "pl" ? "/faq" : `/${locale}/faq`,
    },
  };
}

export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  const [items, t] = await Promise.all([
    listContentItems(locale, "faq"),
    getTranslations({ locale, namespace: "content.faq" }),
  ]);

  const rawCategories = t.raw("categories") as FaqCategory[] | undefined;
  const categories = Array.isArray(rawCategories) ? rawCategories : [];

  return (
    <>
      <SiteHeader locale={locale} languagePicker={<LanguagePicker currentLocale={locale} />} />
      <main className="min-h-screen">
        <SectionContainer>
          <div className="max-w-2xl space-y-12">
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                {t("title")}
              </h1>
              <p className="text-lg text-slate-600">{t("description")}</p>
            </div>

            {items.length > 0 ? (
              <div className="space-y-8">
                {await Promise.all(
                  items.map(async (item) => {
                    const { content } = await compileMDXContent({ source: item.content });
                    return (
                      <div
                        key={item.frontmatter.slug}
                        className="prose prose-slate max-w-none mdx-content"
                      >
                        {content}
                      </div>
                    );
                  }),
                )}
              </div>
            ) : categories.length > 0 ? (
              <div className="space-y-10">
                {categories.map((category) => (
                  <section key={category.id} id={category.id}>
                    <h2 className="text-xl font-bold text-slate-900 mb-4">{category.title}</h2>
                    <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
                      {category.questions.map((q) => (
                        <details
                          key={q.id}
                          id={q.id}
                          className="group"
                        >
                          <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none text-slate-900 font-medium hover:bg-slate-50 transition-colors">
                            <span>{q.question}</span>
                            <svg
                              className="w-4 h-4 shrink-0 text-slate-400 transition-transform group-open:rotate-180"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </summary>
                          <div className="px-5 pb-5 pt-2 text-slate-600 leading-relaxed text-[0.9375rem]">
                            {q.answer}
                          </div>
                        </details>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <p className="text-slate-500">{t("empty")}</p>
            )}
          </div>
        </SectionContainer>
      </main>
      <SiteFooter />
    </>
  );
}
