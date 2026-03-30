import type { Metadata } from "next";
import { HeroDropZone } from "./hero-drop-zone";
import { LanguagePicker } from "./language-picker";
import { type FaqItem, StructuredData } from "./structured-data";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroSection } from "./sections/hero-section";
import { FeaturesSection } from "./sections/features-section";
import { ValidationLayersSection } from "./sections/validation-layers-section";
import { ComparisonSection } from "./sections/comparison-section";
import { ComingSoonSection } from "./sections/coming-soon-section";
import { NewsletterSection } from "./sections/newsletter-section";
import { GettingStartedSection } from "./sections/getting-started-section";
import { OpenSourceSection } from "./sections/open-source-section";
import { DeveloperSection } from "./sections/developer-section";
import { getTranslations } from "next-intl/server";
import { COMING_SOON_FEATURES, COMPARISON_STATUSES, FEATURES_ACCENTS } from "./page-data";

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

  // Feature icons
  const shieldIcon = (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  );

  const lockIcon = (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  );

  const sparklesIcon = (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
    </svg>
  );

  const codeIcon = (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    </svg>
  );

  const heartIcon = (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  );

  const globeIcon = (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const icons = {
    shield: shieldIcon,
    lock: lockIcon,
    sparkles: sparklesIcon,
    code: codeIcon,
    heart: heartIcon,
    globe: globeIcon,
  };

  const faqItems = t.raw("structuredData.faq") as FaqItem[];

  return (
    <>
      <StructuredData description={t("meta.description")} faqItems={faqItems} />

      <SiteHeader locale={locale} languagePicker={<LanguagePicker currentLocale={locale} />} />

      <main className="min-h-screen">
        {/* Hero Section */}
        <HeroSection
          title={t("landing.hero.title")}
          description={t("landing.hero.description")}
          trustLine={t("landing.hero.trustLine")}
        >
          <HeroDropZone locale={locale} />
        </HeroSection>

        {/* Features Section */}
        <FeaturesSection
          title={t("landing.features.title")}
          subtitle={t("landing.features.subtitle")}
          features={[
            {
              icon: icons.shield,
              title: t("landing.features.items.0.title"),
              description: t("landing.features.items.0.description"),
              accent: FEATURES_ACCENTS[0],
            },
            {
              icon: icons.lock,
              title: t("landing.features.items.1.title"),
              description: t("landing.features.items.1.description"),
              accent: FEATURES_ACCENTS[1],
            },
            {
              icon: icons.sparkles,
              title: t("landing.features.items.2.title"),
              description: t("landing.features.items.2.description"),
              accent: FEATURES_ACCENTS[2],
            },
          ]}
        />

        {/* Validation Layers Section */}
        <ValidationLayersSection
          title={t("landing.validation.title")}
          subtitle={t("landing.validation.subtitle")}
          layers={[
            {
              badge: t("landing.validation.layers.0.badge"),
              title: t("landing.validation.layers.0.title"),
              description: t("landing.validation.layers.0.description"),
              checks: [
                t("landing.validation.layers.0.checks.0"),
                t("landing.validation.layers.0.checks.1"),
                t("landing.validation.layers.0.checks.2"),
                t("landing.validation.layers.0.checks.3"),
              ],
            },
            {
              badge: t("landing.validation.layers.1.badge"),
              title: t("landing.validation.layers.1.title"),
              description: t("landing.validation.layers.1.description"),
              checks: [
                t("landing.validation.layers.1.checks.0"),
                t("landing.validation.layers.1.checks.1"),
                t("landing.validation.layers.1.checks.2"),
                t("landing.validation.layers.1.checks.3"),
              ],
            },
          ]}
        />

        {/* Comparison Section */}
        <ComparisonSection
          title={t("landing.comparison.title")}
          subtitle={t("landing.comparison.subtitle")}
          featuresHeader={t("landing.comparison.featuresHeader")}
          features={Object.fromEntries(
            Object.entries(
              t.raw("landing.comparison.features") as Record<
                string,
                { title: string; ksefuj: string; freemium: string; enterprise: string }
              >,
            ).map(([key, row]) => [
              key,
              {
                title: row.title,
                ksefuj: { value: row.ksefuj, status: COMPARISON_STATUSES[key].ksefuj },
                freemium: { value: row.freemium, status: COMPARISON_STATUSES[key].freemium },
                enterprise: { value: row.enterprise, status: COMPARISON_STATUSES[key].enterprise },
              },
            ]),
          )}
          competitors={t.raw("landing.comparison.competitors")}
          disclaimer={t("landing.comparison.disclaimer")}
        />

        {/* Coming Soon Section */}
        <ComingSoonSection
          title={t("landing.comingSoon.title")}
          subtitle={t("landing.comingSoon.subtitle")}
          features={(
            t.raw("landing.comingSoon.features") as {
              title: string;
              description: string;
              badge: string;
            }[]
          ).map((f, i) => ({
            ...f,
            icon: COMING_SOON_FEATURES[i].icon,
            badgeVariant: COMING_SOON_FEATURES[i].badgeVariant,
          }))}
        />

        {/* Newsletter Section */}
        <NewsletterSection
          title={t("landing.newsletter.title")}
          subtitle={t("landing.newsletter.subtitle")}
          placeholder={t("landing.newsletter.placeholder")}
          buttonText={t("landing.newsletter.buttonText")}
          successMessage={t("landing.newsletter.successMessage")}
          errorMessage={t("landing.newsletter.errorMessage")}
          disclaimer={t("landing.newsletter.disclaimer")}
          poweredBy={t("landing.newsletter.poweredBy")}
        />

        {/* Getting Started Section */}
        <GettingStartedSection
          title={t("landing.gettingStarted.title")}
          subtitle={t("landing.gettingStarted.subtitle")}
          steps={[
            {
              number: "1",
              title: t("landing.gettingStarted.steps.0.title"),
              description: t("landing.gettingStarted.steps.0.description"),
              code: t("landing.gettingStarted.steps.0.code"),
            },
            {
              number: "2",
              title: t("landing.gettingStarted.steps.1.title"),
              description: t("landing.gettingStarted.steps.1.description"),
              code: t("landing.gettingStarted.steps.1.code"),
            },
            {
              number: "3",
              title: t("landing.gettingStarted.steps.2.title"),
              description: t("landing.gettingStarted.steps.2.description"),
              code: t("landing.gettingStarted.steps.2.code"),
            },
          ]}
        />

        {/* Open Source Section */}
        <OpenSourceSection
          title={t("landing.openSource.title")}
          description={t("landing.openSource.description")}
          features={[
            {
              icon: icons.code,
              title: t("landing.openSource.features.0.title"),
              description: t("landing.openSource.features.0.description"),
            },
            {
              icon: icons.heart,
              title: t("landing.openSource.features.1.title"),
              description: t("landing.openSource.features.1.description"),
            },
            {
              icon: icons.globe,
              title: t("landing.openSource.features.2.title"),
              description: t("landing.openSource.features.2.description"),
            },
          ]}
          githubUrl="https://github.com/ksefuj/ksefuj"
          npmUrl="https://www.npmjs.com/package/@ksefuj/validator"
          ctaText={t("landing.openSource.ctaText")}
        />

        {/* Developer Section */}
        <DeveloperSection
          title={t("landing.developer.title")}
          subtitle={t("landing.developer.subtitle")}
          expandText={t("landing.developer.expandText")}
          collapseText={t("landing.developer.collapseText")}
          content={{
            cli: {
              title: t("landing.developer.content.cli.title"),
              description: t("landing.developer.content.cli.description"),
              commands: [
                {
                  label: t("landing.developer.content.cli.commands.0.label"),
                  command: "npx @ksefuj/validator invoice.xml",
                },
                {
                  label: t("landing.developer.content.cli.commands.1.label"),
                  command: "npm i -g @ksefuj/validator",
                },
              ],
            },
            npm: {
              title: t("landing.developer.content.npm.title"),
              description: t("landing.developer.content.npm.description"),
              installLabel: t("landing.developer.content.npm.installLabel"),
              usageLabel: t("landing.developer.content.npm.usageLabel"),
              install: "npm install @ksefuj/validator",
              usage: `import { validate } from '@ksefuj/validator';

const result = await validate(xmlContent);
if (result.valid) {
  console.log('✓ Valid');
}`,
            },
            docs: {
              title: t("landing.developer.content.docs.title"),
              description: t("landing.developer.content.docs.description"),
              example: `// Full TypeScript support
const result = await validate(xml, {
  locale: 'pl',
  enableXsdValidation: true,
  enableSemanticValidation: true
});`,
            },
          }}
        />
      </main>

      <SiteFooter />
    </>
  );
}
