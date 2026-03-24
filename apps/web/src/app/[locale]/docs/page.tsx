import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionContainer } from "@/components/section-container";
import { LanguagePicker } from "../language-picker";
import { listContentItems } from "@/lib/content";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: `Dokumentacja — ${t("title")}`,
    description: "Dokumentacja techniczna walidatora ksefuj i schematu FA(3).",
    alternates: {
      canonical: locale === "pl" ? "/docs" : `/${locale}/docs`,
    },
  };
}

export default async function DocsListPage({ params }: Props) {
  const { locale } = await params;
  const docs = await listContentItems(locale, "docs");

  return (
    <>
      <SiteHeader locale={locale} languagePicker={<LanguagePicker currentLocale={locale} />} />
      <main className="min-h-screen">
        <SectionContainer>
          <div className="space-y-12">
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                Dokumentacja
              </h1>
              <p className="text-lg text-slate-600">
                Dokumentacja techniczna walidatora i schematu FA(3).
              </p>
            </div>

            {docs.length === 0 ? (
              <p className="text-slate-500">Dokumentacja jest w przygotowaniu.</p>
            ) : (
              <div className="divide-y divide-slate-100">
                {docs.map((doc) => {
                  const href =
                    locale === "pl"
                      ? `/docs/${doc.frontmatter.slug}`
                      : `/${locale}/docs/${doc.frontmatter.slug}`;
                  return (
                    <Link
                      key={doc.frontmatter.slug}
                      href={href}
                      className="group flex items-start justify-between py-5 hover:bg-slate-50/50 -mx-4 px-4 rounded-xl transition-colors"
                    >
                      <div className="space-y-1">
                        <h2 className="text-base font-semibold text-slate-900 group-hover:text-violet-700 transition-colors">
                          {doc.frontmatter.title}
                        </h2>
                        <p className="text-sm text-slate-500">{doc.frontmatter.description}</p>
                      </div>
                      <svg
                        className="w-4 h-4 text-slate-400 group-hover:text-violet-500 shrink-0 mt-1 transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </SectionContainer>
      </main>
      <SiteFooter />
    </>
  );
}
