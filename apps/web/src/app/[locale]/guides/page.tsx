import { Suspense } from "react";
import type { Metadata } from "next";
import { withSiteSuffix } from "@/lib/page-title";
import { getTranslations } from "next-intl/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionContainer } from "@/components/section-container";
import { LanguagePicker } from "../language-picker";
import { ContentCard } from "@/components/content-card";
import {
  GuidesListing,
  GuidesListingFallback,
  type GuidesListingProps,
} from "@/components/guides-listing";
import { listContentItemsUnified } from "@/lib/content";
import { isContentTopic, topicLabels } from "@/lib/topics";

// No `searchParams` here on purpose: reading them would make the route dynamic. The page is
// static and renders every guide; `?topic=` is applied client-side.
interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const tContent = await getTranslations({ locale, namespace: "content.guides" });

  const canonical = locale === "pl" ? "/guides" : `/${locale}/guides`;
  const title = withSiteSuffix(tContent("title"));
  const description = tContent("metaDescription");

  return {
    title,
    description,
    // `?topic=` URLs share this static HTML; the canonical below points them at /guides.
    alternates: {
      canonical,
      languages: {
        "x-default": "/guides",
        pl: "/guides",
        en: "/en/guides",
        uk: "/uk/guides",
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

export default async function GuidesListPage({ params }: Props) {
  const { locale } = await params;
  const [allGuides, t] = await Promise.all([
    listContentItemsUnified(locale, "guides"),
    getTranslations({ locale, namespace: "content" }),
  ]);

  const listing: GuidesListingProps = {
    locale,
    basePath: locale === "pl" ? "/guides" : `/${locale}/guides`,
    guides: allGuides.map((guide) => ({
      key: guide.plSlug,
      topic: isContentTopic(guide.frontmatter.topic) ? guide.frontmatter.topic : undefined,
      translated: guide.contentLocale === locale,
      card: (
        <ContentCard
          item={guide}
          locale={locale}
          section="guides"
          headingLevel="h2"
          hideSectionMarker
        />
      ),
    })),
    labels: {
      allTopics: t("discovery.allTopics"),
      topics: topicLabels(t),
      topicFilter: t("discovery.topicFilterLabel"),
      empty: t("guides.empty"),
    },
  };

  return (
    <>
      <SiteHeader locale={locale} languagePicker={<LanguagePicker currentLocale={locale} />} />
      <main className="min-h-screen">
        <SectionContainer>
          <div className="space-y-10">
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                {t("guides.title")}
              </h1>
              <p className="text-lg text-slate-600">{t("guides.description")}</p>
            </div>

            <Suspense fallback={<GuidesListingFallback {...listing} />}>
              <GuidesListing {...listing} />
            </Suspense>
          </div>
        </SectionContainer>
      </main>
      <SiteFooter />
    </>
  );
}
