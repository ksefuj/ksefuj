import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionContainer } from "@/components/section-container";
import { ContributeFooter } from "@/components/contribute-footer";
import { LanguagePicker } from "../language-picker";
import { listContentItems } from "@/lib/content";
import { compileMDXContent } from "@/lib/compile-mdx";

interface Props {
  params: Promise<{ locale: string }>;
}

function extractFaqItems(content: string): Array<{ question: string; answer: string }> {
  const regex = /<Question q="([^"]+)">([\s\S]*?)<\/Question>/g;
  const items: Array<{ question: string; answer: string }> = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    items.push({
      question: match[1].trim(),
      answer: match[2].replace(/\s+/g, " ").trim(),
    });
  }
  return items;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const [tMeta, tContent] = await Promise.all([
    getTranslations({ locale, namespace: "meta" }),
    getTranslations({ locale, namespace: "content.faq" }),
  ]);

  const canonical = locale === "pl" ? "/faq" : `/${locale}/faq`;
  const title = `${tContent("title")} — ${tMeta("title")}`;
  const description = tContent("metaDescription");

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        pl: "/faq",
        en: "/en/faq",
        uk: "/uk/faq",
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
    },
  };
}

export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  const [items, t] = await Promise.all([
    listContentItems(locale, "faq"),
    getTranslations({ locale, namespace: "content.faq" }),
  ]);

  const faqItems = items.flatMap((item) => extractFaqItems(item.content));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

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
      {faqItems.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
          }}
        />
      )}
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
            <ContributeFooter
              locale={locale}
              section="faq"
              slug=""
              contentLocale={locale}
              editUrl={`https://github.com/ksefuj/ksefuj/tree/main/apps/web/content/${locale}/faq`}
            />
          </div>
        </SectionContainer>
      </main>
      <SiteFooter />
    </>
  );
}
