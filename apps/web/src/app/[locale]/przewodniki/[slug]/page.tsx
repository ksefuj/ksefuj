import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LanguagePicker } from "../../language-picker";
import { GuideLayout } from "@/components/layouts/guide-layout";
import { extractHeadings, getContentItem, listSlugs } from "@/lib/content";
import { compileMDXContent } from "@/lib/compile-mdx";
import { buildHowToSchema } from "@/lib/structured-data";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const section = locale === "pl" ? "przewodniki" : "guides";
  const slugs = await listSlugs(locale, section);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const section = locale === "pl" ? "przewodniki" : "guides";
  const item = await getContentItem(locale, section, slug);
  if (!item) {return {};}

  const { frontmatter } = item;
  const canonical =
    frontmatter.seo?.canonical ??
    (locale === "pl"
      ? `/przewodniki/${slug}`
      : `/${locale}/guides/${slug}`);

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

export default async function GuidePage({ params }: Props) {
  const { locale, slug } = await params;
  const section = locale === "pl" ? "przewodniki" : "guides";
  const item = await getContentItem(locale, section, slug);
  if (!item) {notFound();}

  const headings = extractHeadings(item.content);
  const urlPath =
    locale === "pl" ? `/przewodniki/${slug}` : `/${locale}/guides/${slug}`;
  const schema = buildHowToSchema(item.frontmatter, urlPath);

  const { content } = await compileMDXContent({ source: item.content });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader locale={locale} languagePicker={<LanguagePicker currentLocale={locale} />} />
      <main className="min-h-screen">
        <GuideLayout
          frontmatter={item.frontmatter}
          readingTime={item.readingTime}
          headings={headings}
          locale={locale}
        >
          {content}
        </GuideLayout>
      </main>
      <SiteFooter />
    </>
  );
}
