import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LanguagePicker } from "../../language-picker";
import { BlogPostLayout } from "@/components/layouts/blog-post-layout";
import { TranslationBanner } from "@/components/translation-banner";
import {
  buildContentLocalePaths,
  buildContentPath,
  extractHeadings,
  getContentItemWithFallback,
  listSlugs,
} from "@/lib/content";
import { compileMDXContent } from "@/lib/compile-mdx";
import { buildArticleSchema } from "@/lib/structured-data";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const slugs = await listSlugs(locale, "blog");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const result = await getContentItemWithFallback(locale, "blog", slug);
  if (!result) {
    return {};
  }

  const { item } = result;
  const canonical = item.frontmatter.seo?.canonical ?? buildContentPath(locale, "blog", slug);

  return {
    title: item.frontmatter.title,
    description: item.frontmatter.description,
    alternates: { canonical },
    openGraph: {
      title: item.frontmatter.title,
      description: item.frontmatter.description,
      type: "article",
      publishedTime: item.frontmatter.date,
      modifiedTime: item.frontmatter.updated,
      ...(item.frontmatter.seo?.ogImage ? { images: [{ url: item.frontmatter.seo.ogImage }] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const result = await getContentItemWithFallback(locale, "blog", slug);
  if (!result) {
    notFound();
  }

  const { item, contentLocale } = result;
  const headings = extractHeadings(item.content);
  const urlPath = buildContentPath(locale, "blog", slug);
  const schema = buildArticleSchema(item.frontmatter, urlPath);
  const localePaths = buildContentLocalePaths("blog", slug, item.frontmatter.translations);

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
              section="blog"
              slug={slug}
            />
          </div>
        )}
        <BlogPostLayout
          frontmatter={item.frontmatter}
          readingTime={item.readingTime}
          headings={headings}
          locale={contentLocale}
        >
          {content}
        </BlogPostLayout>
      </main>
      <SiteFooter />
    </>
  );
}
