import type { Metadata } from "next";
import { LanguagePicker } from "./language-picker";
import { type FaqItem, StructuredData } from "./structured-data";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroSection } from "./sections/hero-section";
import { HeroDropZone } from "./sections/hero-drop-zone";
import { CalendarSection } from "./sections/calendar-section";
import { TopicsSection } from "./sections/topics-section";
import { RecentSection } from "./sections/recent-section";
import { ToolsSection } from "./sections/tools-section";
import { NewsletterSection } from "./sections/newsletter-section";
import { AboutSection } from "./sections/about-section";
import { getTranslations } from "next-intl/server";

// Statuses in the KSeF calendar are computed against the current date: re-render at least daily
// so the server HTML does not drift (the client also recomputes after hydration).
export const revalidate = 86400;

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "landing.meta" });

  // Canonical URL: Polish has no prefix, other locales have prefix
  const canonical = locale === "pl" ? "/" : `/${locale}`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical,
      languages: {
        pl: "/",
        en: "/en",
        uk: "/uk",
        "x-default": "/",
      },
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const faqItems = t.raw("structuredData.faq") as FaqItem[];

  return (
    <>
      <StructuredData description={t("meta.description")} faqItems={faqItems} />

      <SiteHeader locale={locale} languagePicker={<LanguagePicker currentLocale={locale} />} />

      <main className="min-h-screen">
        <HeroSection title={t("landing.hero.title")} lead={t("landing.hero.lead")}>
          <HeroDropZone />
        </HeroSection>

        <CalendarSection locale={locale} />
        <TopicsSection locale={locale} />
        <RecentSection locale={locale} />
        <ToolsSection locale={locale} />
        <NewsletterSection locale={locale} />
        <AboutSection locale={locale} />
      </main>

      <SiteFooter />
    </>
  );
}
