import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionContainer } from "@/components/section-container";
import { Badge } from "@/components/badge";
import { LanguagePicker } from "../language-picker";
import { listContentItems } from "@/lib/content";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: `Przewodniki — ${t("title")}`,
    description: "Przewodniki krok po kroku o KSeF i fakturach elektronicznych dla JDG i firm.",
    alternates: {
      canonical: locale === "pl" ? "/przewodniki" : `/${locale}/guides`,
    },
  };
}

const difficultyLabel: Record<string, string> = {
  beginner: "Podstawowy",
  intermediate: "Średniozaawansowany",
  advanced: "Zaawansowany",
};

const difficultyVariant: Record<string, "success" | "warning" | "error"> = {
  beginner: "success",
  intermediate: "warning",
  advanced: "error",
};

export default async function GuidesListPage({ params }: Props) {
  const { locale } = await params;
  const section = locale === "pl" ? "przewodniki" : "guides";
  const guides = await listContentItems(locale, section);

  return (
    <>
      <SiteHeader locale={locale} languagePicker={<LanguagePicker currentLocale={locale} />} />
      <main className="min-h-screen">
        <SectionContainer>
          <div className="space-y-12">
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                Przewodniki
              </h1>
              <p className="text-lg text-slate-600">
                Krok po kroku przez KSeF i faktury elektroniczne.
              </p>
            </div>

            {guides.length === 0 ? (
              <p className="text-slate-500">Przewodniki są w przygotowaniu.</p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                {guides.map((guide) => {
                  const href =
                    locale === "pl"
                      ? `/przewodniki/${guide.frontmatter.slug}`
                      : `/${locale}/guides/${guide.frontmatter.slug}`;
                  return (
                    <Link
                      key={guide.frontmatter.slug}
                      href={href}
                      className="group block rounded-2xl border border-slate-200 bg-white p-6 hover:border-violet-200 hover:shadow-md transition-all"
                    >
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        {guide.frontmatter.difficulty && (
                          <Badge
                            variant={
                              difficultyVariant[guide.frontmatter.difficulty] ?? "neutral"
                            }
                          >
                            {difficultyLabel[guide.frontmatter.difficulty] ??
                              guide.frontmatter.difficulty}
                          </Badge>
                        )}
                        <span className="text-xs text-slate-400">
                          {guide.readingTime} min
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-slate-900 group-hover:text-violet-700 transition-colors leading-snug mb-2">
                        {guide.frontmatter.title}
                      </h2>
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {guide.frontmatter.description}
                      </p>
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
