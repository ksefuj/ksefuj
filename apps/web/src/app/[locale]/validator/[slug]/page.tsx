import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LanguagePicker } from "../../language-picker";
import { ValidatorPageLayout } from "@/components/layouts/validator-page-layout";
import {
  buildContentPath,
  buildHreflangAlternates,
  extractHeadings,
  getContentItem,
} from "@/lib/content";
import { articleParams } from "@/lib/og-static-params";
import { compileMDXContent } from "@/lib/compile-mdx";
import { buildArticleSchema, buildBreadcrumbSchema } from "@/lib/structured-data";
import { withSiteSuffix } from "@/lib/page-title";

const SECTION = "validator";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export const generateStaticParams = articleParams(SECTION);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  // No locale fallback: the page exists only where the file does
  const item = await getContentItem(locale, SECTION, slug);
  if (!item) {
    return {};
  }

  const { frontmatter } = item;
  const path = buildContentPath(locale, SECTION, slug);
  const hreflang = buildHreflangAlternates(SECTION, frontmatter.translations);
  const ogLocaleMap: Record<string, string> = { en: "en_US", uk: "uk_UA" };

  return {
    title: withSiteSuffix(frontmatter.title),
    description: frontmatter.description,
    alternates: {
      canonical: path,
      ...(Object.keys(hreflang).length > 0 ? { languages: hreflang } : {}),
    },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: "article",
      url: `https://ksefuj.to${path}`,
      locale: ogLocaleMap[locale] ?? "pl_PL",
      publishedTime: frontmatter.date,
      modifiedTime: frontmatter.updated,
      ...(frontmatter.seo?.ogImage ? { images: [{ url: frontmatter.seo.ogImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.description,
    },
  };
}

export default async function ValidatorReferencePage({ params }: Props) {
  const { locale, slug } = await params;
  const item = await getContentItem(locale, SECTION, slug);
  if (!item) {
    notFound();
  }

  const headings = extractHeadings(item.content);
  const urlPath = buildContentPath(locale, SECTION, slug);
  const schema = buildArticleSchema(item.frontmatter, urlPath, locale);
  const tPage = await getTranslations({ locale, namespace: "validatorPage" });
  const prefix = locale === "pl" ? "" : `/${locale}`;
  const breadcrumbs = buildBreadcrumbSchema([
    { name: "ksefuj.to", path: prefix || "/" },
    { name: tPage("backToValidator"), path: `${prefix}/validator` },
    { name: item.frontmatter.title, path: urlPath },
  ]);
  // Locale-prefix-free paths. Locales without this page land on the validator itself.
  const translations = item.frontmatter.translations ?? {};
  const localePaths = Object.fromEntries(
    (["pl", "en", "uk"] as const).map((loc) => [
      loc,
      translations[loc] ? `/${SECTION}/${translations[loc]}` : `/${SECTION}`,
    ]),
  );

  const { content } = await compileMDXContent({ source: item.content });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replace(/</g, "\\u003c") }}
      />
      <SiteHeader
        locale={locale}
        languagePicker={<LanguagePicker currentLocale={locale} localePaths={localePaths} />}
      />
      <main className="min-h-screen">
        <ValidatorPageLayout frontmatter={item.frontmatter} headings={headings} locale={locale}>
          {content}
        </ValidatorPageLayout>
      </main>
      <SiteFooter />
    </>
  );
}
