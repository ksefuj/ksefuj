import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LanguagePicker } from "../../language-picker";
import { DocsLayout } from "@/components/layouts/docs-layout";
import { TranslationBanner } from "@/components/translation-banner";
import {
  buildContentLocalePaths,
  buildContentPath,
  extractHeadings,
  getContentItemWithFallback,
  listSlugs,
} from "@/lib/content";
import { compileMDXContent } from "@/lib/compile-mdx";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const slugs = await listSlugs(locale, "docs");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const result = await getContentItemWithFallback(locale, "docs", slug);
  if (!result) {
    return {};
  }

  const { item } = result;
  const canonical = item.frontmatter.seo?.canonical ?? buildContentPath(locale, "docs", slug);

  return {
    title: item.frontmatter.title,
    description: item.frontmatter.description,
    alternates: { canonical },
    openGraph: {
      title: item.frontmatter.title,
      description: item.frontmatter.description,
      ...(item.frontmatter.seo?.ogImage ? { images: [{ url: item.frontmatter.seo.ogImage }] } : {}),
    },
  };
}

export default async function DocsPage({ params }: Props) {
  const { locale, slug } = await params;
  const result = await getContentItemWithFallback(locale, "docs", slug);
  if (!result) {
    notFound();
  }

  const { item, contentLocale } = result;
  const headings = extractHeadings(item.content);
  const localePaths = buildContentLocalePaths("docs", slug, item.frontmatter.translations);

  const { content } = await compileMDXContent({ source: item.content });

  return (
    <>
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
              section="docs"
              slug={slug}
            />
          </div>
        )}
        <DocsLayout frontmatter={item.frontmatter} headings={headings} locale={locale}>
          {content}
        </DocsLayout>
      </main>
      <SiteFooter />
    </>
  );
}
