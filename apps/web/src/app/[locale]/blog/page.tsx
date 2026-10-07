import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionContainer } from "@/components/section-container";
import { ContentCard } from "@/components/content-card";
import { BlogListing, BlogListingFallback, type BlogListingProps } from "@/components/blog-listing";
import { LanguagePicker } from "../language-picker";
import { listContentItemsUnified } from "@/lib/content";
import { isContentTopic, topicLabels } from "@/lib/topics";

// No `searchParams` here on purpose: reading them would make the route dynamic. The page is
// static and renders every item; `?topic=` / `?filter=translated` are applied client-side.
interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const tContent = await getTranslations({ locale, namespace: "content.blog" });

  const canonical = locale === "pl" ? "/blog" : `/${locale}/blog`;
  const title = `${tContent("metaTitle")} — ksefuj.to`;
  const description = tContent("metaDescription");

  return {
    title,
    description,
    // Filtered URLs (`?topic=`, `?filter=`) share this static HTML; the canonical below points
    // them at the bare listing.
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

export default async function BlogListPage({ params }: Props) {
  const { locale } = await params;
  const [allPosts, allGuides, t] = await Promise.all([
    listContentItemsUnified(locale, "blog"),
    listContentItemsUnified(locale, "guides"),
    getTranslations({ locale, namespace: "content" }),
  ]);

  const basePath = locale === "pl" ? "/blog" : `/${locale}/blog`;
  const guidesPath = locale === "pl" ? "/guides" : `/${locale}/guides`;

  const listing: BlogListingProps = {
    locale,
    basePath,
    guidesPath,
    posts: allPosts.map((post) => ({
      key: post.plSlug,
      topic: isContentTopic(post.frontmatter.topic) ? post.frontmatter.topic : undefined,
      translated: post.contentLocale === locale,
      lead: (
        <ContentCard
          item={post}
          locale={locale}
          section="blog"
          variant="featured"
          headingLevel="h2"
          track={{
            event: "featured_post_clicked",
            props: { locale, slug: post.frontmatter.slug },
          }}
        />
      ),
      card: <ContentCard item={post} locale={locale} section="blog" headingLevel="h2" />,
    })),
    guides: allGuides.map((guide) => ({
      key: guide.plSlug,
      translated: guide.contentLocale === locale,
      card: (
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
      ),
    })),
    labels: {
      allTopics: t("discovery.allTopics"),
      topics: topicLabels(t),
      topicFilter: t("discovery.topicFilterLabel"),
      languageFilter: t("discovery.languageFilterLabel"),
      languageAll: t("blog.filter.all"),
      languageTranslatedOnly: t("blog.filter.translatedOnly"),
      guidesStrip: t("discovery.guidesStrip"),
      empty: t("blog.empty"),
    },
  };

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

            <Suspense fallback={<BlogListingFallback {...listing} />}>
              <BlogListing {...listing} />
            </Suspense>
          </div>
        </SectionContainer>
      </main>
      <SiteFooter />
    </>
  );
}
