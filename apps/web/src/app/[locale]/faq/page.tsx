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
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: `FAQ — ${t("title")}`,
    description: "Często zadawane pytania o KSeF, schemat FA(3) i walidator ksefuj.",
    alternates: {
      canonical: locale === "pl" ? "/faq" : `/${locale}/faq`,
    },
  };
}

export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  const faqSection = locale === "pl" ? "faq" : "faq";
  const items = await listContentItems(locale, faqSection);

  return (
    <>
      <SiteHeader locale={locale} languagePicker={<LanguagePicker currentLocale={locale} />} />
      <main className="min-h-screen">
        <SectionContainer>
          <div className="max-w-2xl space-y-12">
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                FAQ
              </h1>
              <p className="text-lg text-slate-600">
                Często zadawane pytania o KSeF i ksefuj.
              </p>
            </div>

            {items.length === 0 ? (
              <p className="text-slate-500">FAQ jest w przygotowaniu.</p>
            ) : (
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
            )}
          </div>
        </SectionContainer>
      </main>
      <SiteFooter />
    </>
  );
}
