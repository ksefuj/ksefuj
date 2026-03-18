import { Validator } from "./validator";
import { LanguagePicker } from "./language-picker";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroSection } from "./sections/hero-section";
import { FeaturesSection } from "./sections/features-section";
import { ValidationLayersSection } from "./sections/validation-layers-section";
import { GettingStartedSection } from "./sections/getting-started-section";
import { OpenSourceSection } from "./sections/open-source-section";
import { DeveloperSection } from "./sections/developer-section";
import { getPageContent } from "./page-content";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const content = getPageContent(locale);

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

  return (
    <>
      <SiteHeader locale={locale} languagePicker={<LanguagePicker currentLocale={locale} />} />

      <main className="min-h-screen">
        {/* Hero Section */}
        <HeroSection
          title={content.hero.title}
          description={content.hero.description}
          trustLine={content.hero.trustLine}
        >
          <Validator locale={locale} />
        </HeroSection>

        {/* Features Section */}
        <FeaturesSection
          title={content.features.title}
          subtitle={content.features.subtitle}
          features={[
            {
              icon: icons.shield,
              title: content.features.items[0].title,
              description: content.features.items[0].description,
              accent: content.features.items[0].accent,
            },
            {
              icon: icons.lock,
              title: content.features.items[1].title,
              description: content.features.items[1].description,
              accent: content.features.items[1].accent,
            },
            {
              icon: icons.sparkles,
              title: content.features.items[2].title,
              description: content.features.items[2].description,
              accent: content.features.items[2].accent,
            },
          ]}
        />

        {/* Validation Layers Section */}
        <ValidationLayersSection
          title={content.validation.title}
          subtitle={content.validation.subtitle}
          layers={content.validation.layers}
        />

        {/* Getting Started Section */}
        <GettingStartedSection
          title={content.gettingStarted.title}
          subtitle={content.gettingStarted.subtitle}
          steps={content.gettingStarted.steps}
        />

        {/* Open Source Section */}
        <OpenSourceSection
          title={content.openSource.title}
          description={content.openSource.description}
          features={[
            {
              icon: icons.code,
              title: content.openSource.features[0].title,
              description: content.openSource.features[0].description,
            },
            {
              icon: icons.heart,
              title: content.openSource.features[1].title,
              description: content.openSource.features[1].description,
            },
            {
              icon: icons.globe,
              title: content.openSource.features[2].title,
              description: content.openSource.features[2].description,
            },
          ]}
          githubUrl="https://github.com/ksefuj/ksefuj"
          npmUrl="https://www.npmjs.com/package/@ksefuj/validator"
          ctaText={content.openSource.ctaText}
        />

        {/* Developer Section */}
        <DeveloperSection
          title={content.developer.title}
          subtitle={content.developer.subtitle}
          expandText={content.developer.expandText}
          collapseText={content.developer.collapseText}
          content={content.developer.content}
        />
      </main>

      <SiteFooter />
    </>
  );
}
