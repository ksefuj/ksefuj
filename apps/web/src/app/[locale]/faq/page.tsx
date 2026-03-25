import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionContainer } from "@/components/section-container";
import { LanguagePicker } from "../language-picker";
import { listContentItems } from "@/lib/content";
import { compileMDXContent } from "@/lib/compile-mdx";

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

  const compiled = await Promise.all(
    items.map(async (item) => {
      const { content } = await compileMDXContent({ source: item.content });
      return (
        <div key={item.frontmatter.slug} className="prose prose-slate max-w-none mdx-content">
          {content}
        </div>
      );
    }),
  );

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
            {compiled.length > 0 ? (
              <div className="space-y-8">{compiled}</div>
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
