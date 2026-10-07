import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionContainer } from "@/components/section-container";
import { ContentCard } from "@/components/content-card";
import { type FilterChip, FilterChips } from "@/components/filter-chips";
import { LanguagePicker } from "../language-picker";
import { listContentItemsUnified } from "@/lib/content";
import { CONTENT_TOPICS, isContentTopic } from "@/lib/topics";
import { buildListingHref, parseListingFilters } from "@/lib/listing-filters";

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ filter?: string | string[]; topic?: string | string[] }>;
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const [{ locale }, query] = await Promise.all([params, searchParams]);
  const { topic, translatedOnly } = parseListingFilters(query);
  const tContent = await getTranslations({ locale, namespace: "content.blog" });

  const canonical = locale === "pl" ? "/blog" : `/${locale}/blog`;
  const title = `${tContent("metaTitle")} — ksefuj.to`;
  const description = tContent("metaDescription");

  return {
    title,
    description,
    // Filtered views are thin duplicates of the main listing: keep them out of the index and
    // point search engines at the unfiltered page, but let crawlers follow the post links.
    ...(topic || translatedOnly ? { robots: { index: false, follow: true } } : {}),
    alternates: {
      canonical,
      languages: {
        "x-default": "/blog",
        pl: "/blog",
        en: "/en/blog",
        uk: "/uk/blog",
      },
      types: {
        "application/rss+xml": "/feed.xml",
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

export default async function BlogListPage({ params, searchParams }: Props) {
  const [{ locale }, query] = await Promise.all([params, searchParams]);
  const { topic: activeTopic, translatedOnly } = parseListingFilters(query);
  const [allPosts, allGuides, t] = await Promise.all([
    listContentItemsUnified(locale, "blog"),
    listContentItemsUnified(locale, "guides"),
    getTranslations({ locale, namespace: "content" }),
  ]);

  const inLocale = <T extends { contentLocale: string }>(items: T[]) =>
    translatedOnly ? items.filter((i) => i.contentLocale === locale) : items;

  const basePath = locale === "pl" ? "/blog" : `/${locale}/blog`;
  const guidesPath = locale === "pl" ? "/guides" : `/${locale}/guides`;

  const localePosts = inLocale(allPosts);
  const posts = activeTopic
    ? localePosts.filter((p) => p.frontmatter.topic === activeTopic)
    : localePosts;
  const guides = activeTopic ? [] : inLocale(allGuides);
  const [lead, ...rest] = posts;

  const topicChips: FilterChip[] = [
    {
      key: "all",
      label: t("discovery.allTopics"),
      href: buildListingHref(basePath, { translatedOnly }),
      active: !activeTopic,
      event: "topic_filter_selected",
      eventProps: { locale, section: "blog", topic: "all" },
    },
    ...CONTENT_TOPICS.filter((topic) =>
      localePosts.some((p) => isContentTopic(p.frontmatter.topic) && p.frontmatter.topic === topic),
    ).map((topic) => ({
      key: topic,
      label: t(`topics.${topic}`),
      href: buildListingHref(basePath, { topic, translatedOnly }),
      active: activeTopic === topic,
      event: "topic_filter_selected",
      eventProps: { locale, section: "blog", topic },
    })),
  ];

  const languageChips: FilterChip[] = [
    {
      key: "all",
      label: t("blog.filter.all"),
      href: buildListingHref(basePath, { topic: activeTopic }),
      active: !translatedOnly,
    },
    {
      key: "translated",
      label: t("blog.filter.translatedOnly"),
      href: buildListingHref(basePath, { topic: activeTopic, translatedOnly: true }),
      active: translatedOnly,
    },
  ];

  return (
    <>
      <SiteHeader locale={locale} languagePicker={<LanguagePicker currentLocale={locale} />} />
      <main className="min-h-screen">
        <SectionContainer>
          <div className="space-y-10">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                  {t("blog.title")}
                </h1>
                <a
                  href="/feed.xml"
                  title="RSS"
                  aria-label="RSS"
                  className="shrink-0 text-slate-400 hover:text-violet-500 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z" />
                  </svg>
                </a>
              </div>
              <p className="text-lg text-slate-600">{t("blog.description")}</p>
            </div>

            <div className="space-y-3">
              <FilterChips chips={topicChips} label={t("discovery.topicFilterLabel")} />
              {locale !== "pl" && (
                <FilterChips chips={languageChips} label={t("discovery.languageFilterLabel")} />
              )}
            </div>

            {!lead ? (
              <p className="text-slate-500">{t("blog.empty")}</p>
            ) : (
              <>
                <ContentCard
                  item={lead}
                  locale={locale}
                  section="blog"
                  variant="featured"
                  headingLevel="h2"
                  track={{
                    event: "featured_post_clicked",
                    props: { locale, slug: lead.frontmatter.slug },
                  }}
                />

                {guides.length > 0 && (
                  <section aria-labelledby="guides-strip-heading" className="space-y-4">
                    <h2 id="guides-strip-heading" className="text-lg font-bold text-slate-900">
                      <Link href={guidesPath} className="hover:text-violet-700 transition-colors">
                        {t("discovery.guidesStrip")} →
                      </Link>
                    </h2>
                    <ul className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 snap-x md:mx-0 md:px-0">
                      {guides.map((guide) => (
                        <li key={guide.plSlug} className="flex w-64 shrink-0 snap-start">
                          <ContentCard
                            item={guide}
                            locale={locale}
                            section="guides"
                            variant="compact"
                            headingLevel="h3"
                            hideSectionMarker
                            track={{
                              event: "guides_strip_clicked",
                              props: { locale, slug: guide.frontmatter.slug },
                            }}
                          />
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {rest.length > 0 && (
                  <div className="grid gap-6 sm:grid-cols-2">
                    {rest.map((post) => (
                      <ContentCard
                        key={post.plSlug}
                        item={post}
                        locale={locale}
                        section="blog"
                        headingLevel="h2"
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </SectionContainer>
      </main>
      <SiteFooter />
    </>
  );
}
