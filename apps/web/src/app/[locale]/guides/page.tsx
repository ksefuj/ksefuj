import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionContainer } from "@/components/section-container";
import { LanguagePicker } from "../language-picker";
import { ContentCard } from "@/components/content-card";
import { type FilterChip, FilterChips } from "@/components/filter-chips";
import { listContentItemsUnified } from "@/lib/content";
import { CONTENT_TOPICS, isContentTopic } from "@/lib/topics";
import { buildListingHref, parseListingFilters } from "@/lib/listing-filters";

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ topic?: string | string[] }>;
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const [{ locale }, query] = await Promise.all([params, searchParams]);
  const { topic } = parseListingFilters(query);
  const tContent = await getTranslations({ locale, namespace: "content.guides" });

  const canonical = locale === "pl" ? "/guides" : `/${locale}/guides`;
  const title = `${tContent("title")} — ksefuj.to`;
  const description = tContent("metaDescription");

  return {
    title,
    description,
    // Filtered views are thin duplicates of the main listing: noindex, canonical to /guides.
    ...(topic ? { robots: { index: false, follow: true } } : {}),
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

export default async function GuidesListPage({ params, searchParams }: Props) {
  const [{ locale }, query] = await Promise.all([params, searchParams]);
  const { topic: activeTopic } = parseListingFilters(query);
  const [allGuides, t] = await Promise.all([
    listContentItemsUnified(locale, "guides"),
    getTranslations({ locale, namespace: "content" }),
  ]);

  const basePath = locale === "pl" ? "/guides" : `/${locale}/guides`;
  const guides = activeTopic
    ? allGuides.filter((g) => g.frontmatter.topic === activeTopic)
    : allGuides;

  const topicChips: FilterChip[] = [
    {
      key: "all",
      label: t("discovery.allTopics"),
      href: basePath,
      active: !activeTopic,
      event: "topic_filter_selected",
      eventProps: { locale, section: "guides", topic: "all" },
    },
    ...CONTENT_TOPICS.filter((topic) =>
      allGuides.some((g) => isContentTopic(g.frontmatter.topic) && g.frontmatter.topic === topic),
    ).map((topic) => ({
      key: topic,
      label: t(`topics.${topic}`),
      href: buildListingHref(basePath, { topic }),
      active: activeTopic === topic,
      event: "topic_filter_selected",
      eventProps: { locale, section: "guides", topic },
    })),
  ];

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

            <FilterChips chips={topicChips} label={t("discovery.topicFilterLabel")} />

            {guides.length === 0 ? (
              <p className="text-slate-500">{t("guides.empty")}</p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                {guides.map((guide) => (
                  <ContentCard
                    key={guide.plSlug}
                    item={guide}
                    locale={locale}
                    section="guides"
                    headingLevel="h2"
                    hideSectionMarker
                  />
                ))}
              </div>
            )}
          </div>
        </SectionContainer>
      </main>
      <SiteFooter />
    </>
  );
}
