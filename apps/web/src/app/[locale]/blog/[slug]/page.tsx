import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LanguagePicker } from "../../language-picker";
import { BlogPostLayout } from "@/components/layouts/blog-post-layout";
import { mdxComponents } from "@/components/mdx";
import { extractHeadings, getContentItem, listSlugs } from "@/lib/content";
import { rehypeAddHeadingIds } from "@/lib/rehype-heading-ids";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const section = locale === "pl" ? "blog" : "blog";
  const slugs = await listSlugs(locale, section);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const section = locale === "pl" ? "blog" : "blog";
  const item = await getContentItem(locale, section, slug);
  if (!item) {return {};}

  const { frontmatter } = item;
  const canonical = frontmatter.seo?.canonical ?? (locale === "pl" ? `/blog/${slug}` : `/${locale}/blog/${slug}`);

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: { canonical },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: "article",
      publishedTime: frontmatter.date,
      modifiedTime: frontmatter.updated,
      ...(frontmatter.seo?.ogImage ? { images: [{ url: frontmatter.seo.ogImage }] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const section = locale === "pl" ? "blog" : "blog";
  const item = await getContentItem(locale, section, slug);
  if (!item) {notFound();}

  const headings = extractHeadings(item.content);

  const { content } = await compileMDX({
    source: item.content,
    components: mdxComponents,
    options: {
      mdxOptions: {
        rehypePlugins: [rehypeAddHeadingIds],
      },
    },
  });

  return (
    <>
      <SiteHeader locale={locale} languagePicker={<LanguagePicker currentLocale={locale} />} />
      <main className="min-h-screen">
        <BlogPostLayout
          frontmatter={item.frontmatter}
          readingTime={item.readingTime}
          headings={headings}
          locale={locale}
        >
          {content}
        </BlogPostLayout>
      </main>
      <SiteFooter />
    </>
  );
}
