import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LanguagePicker } from "../../language-picker";
import { BlogPostLayout } from "@/components/layouts/blog-post-layout";
import { extractHeadings, getContentItem, listSlugs } from "@/lib/content";
import { compileMDXContent } from "@/lib/compile-mdx";
import { buildArticleSchema } from "@/lib/structured-data";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

const ALL_LOCALES = ["pl", "en", "uk"] as const;

/**
 * For each locale, return the best available path for the current blog post.
 * - If the slug exists in that locale → `/blog/${slug}`
 * - Otherwise → `/blog` (listing page as graceful fallback)
 */
async function buildLocalePaths(slug: string): Promise<Record<string, string>> {
  const entries = await Promise.all(
    ALL_LOCALES.map(async (loc) => {
      const slugs = await listSlugs(loc, "blog");
      const path = slugs.includes(slug) ? `/blog/${slug}` : "/blog";
      return [loc, path] as const;
    }),
  );
  return Object.fromEntries(entries);
}

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const slugs = await listSlugs(locale, "blog");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = await getContentItem(locale, "blog", slug);
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
  const item = await getContentItem(locale, "blog", slug);
  if (!item) {notFound();}

  const headings = extractHeadings(item.content);
  const urlPath = locale === "pl" ? `/blog/${slug}` : `/${locale}/blog/${slug}`;
  const schema = buildArticleSchema(item.frontmatter, urlPath);
  const localePaths = await buildLocalePaths(slug);

  const { content } = await compileMDXContent({ source: item.content });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader locale={locale} languagePicker={<LanguagePicker currentLocale={locale} localePaths={localePaths} />} />
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
