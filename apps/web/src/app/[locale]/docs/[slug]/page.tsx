import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LanguagePicker } from "../../language-picker";
import { DocsLayout } from "@/components/layouts/docs-layout";
import { extractHeadings, getContentItem, listSlugs } from "@/lib/content";
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
  const item = await getContentItem(locale, "docs", slug);
  if (!item) {return {};}

  const { frontmatter } = item;
  const canonical =
    frontmatter.seo?.canonical ?? (locale === "pl" ? `/docs/${slug}` : `/${locale}/docs/${slug}`);

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: { canonical },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      ...(frontmatter.seo?.ogImage ? { images: [{ url: frontmatter.seo.ogImage }] } : {}),
    },
  };
}

export default async function DocsPage({ params }: Props) {
  const { locale, slug } = await params;
  const item = await getContentItem(locale, "docs", slug);
  if (!item) {notFound();}

  const headings = extractHeadings(item.content);

  const { content } = await compileMDXContent({ source: item.content });

  return (
    <>
      <SiteHeader locale={locale} languagePicker={<LanguagePicker currentLocale={locale} />} />
      <main className="min-h-screen">
        <DocsLayout frontmatter={item.frontmatter} headings={headings} locale={locale}>
          {content}
        </DocsLayout>
      </main>
      <SiteFooter />
    </>
  );
}
