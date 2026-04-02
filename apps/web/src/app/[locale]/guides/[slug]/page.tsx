import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LanguagePicker } from "../../language-picker";
import { GuideLayout } from "@/components/layouts/guide-layout";
import { TranslationBanner } from "@/components/translation-banner";
import {
  buildContentLocalePaths,
  buildContentPath,
  buildHreflangAlternates,
  buildLocalizedCanonical,
  extractHeadings,
  getContentItemWithFallback,
  listSlugs,
  resolveContentRedirect,
} from "@/lib/content";
import { compileMDXContent } from "@/lib/compile-mdx";
import { buildHowToSchema } from "@/lib/structured-data";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const slugs = await listSlugs(locale, "guides");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const result = await getContentItemWithFallback(locale, "guides", slug);
  if (!result) {
    return {};
  }

  const { item } = result;

  const canonical = buildLocalizedCanonical(locale, "guides", slug, item.frontmatter);
  const hreflang = buildHreflangAlternates("guides", item.frontmatter.translations);
  const ogLocaleMap: Record<string, string> = { en: "en_US", uk: "uk_UA" };
  const ogLocale = ogLocaleMap[locale] ?? "pl_PL";

  return {
    title: `${item.frontmatter.title} — ksefuj.to`,
    description: item.frontmatter.description,
    alternates: {
      canonical,
      ...(Object.keys(hreflang).length > 0 ? { languages: hreflang } : {}),
    },
    openGraph: {
      title: item.frontmatter.title,
      description: item.frontmatter.description,
      type: "article",
      url: `https://ksefuj.to${buildContentPath(locale, "guides", slug)}`,
      locale: ogLocale,
      publishedTime: item.frontmatter.date,
      modifiedTime: item.frontmatter.updated,
      ...(item.frontmatter.seo?.ogImage ? { images: [{ url: item.frontmatter.seo.ogImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: item.frontmatter.title,
      description: item.frontmatter.description,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { locale, slug } = await params;
  const result = await getContentItemWithFallback(locale, "guides", slug);
  if (!result) {
    notFound();
  }

  const { item, contentLocale } = result;

  const redirectPath = resolveContentRedirect(
    locale,
    "guides",
    slug,
    contentLocale,
    item.frontmatter,
  );
  if (redirectPath) {
    redirect(redirectPath);
  }

  const headings = extractHeadings(item.content);
  const urlPath = buildContentPath(locale, "guides", slug);
  const schema = buildHowToSchema(item.frontmatter, urlPath, locale);
  const localePaths = buildContentLocalePaths("guides", slug, item.frontmatter.translations);

  const { content } = await compileMDXContent({ source: item.content });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
      <SiteHeader
        locale={locale}
        languagePicker={<LanguagePicker currentLocale={locale} localePaths={localePaths} />}
      />
      <main className="min-h-screen">
        {contentLocale !== locale && (
          <div className="max-w-4xl mx-auto px-4 md:px-6 pt-8">
            <TranslationBanner
              uiLocale={locale}
              contentLocale={contentLocale}
              section="guides"
              slug={slug}
            />
          </div>
        )}
        <GuideLayout
          frontmatter={item.frontmatter}
          readingTime={item.readingTime}
          headings={headings}
          locale={locale}
          contentLocale={contentLocale !== locale ? contentLocale : undefined}
        >
          {content}
        </GuideLayout>
      </main>
      <SiteFooter />
    </>
  );
}
