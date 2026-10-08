import type { ReactNode } from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AmplitudeProvider } from "@/components/amplitude-provider";

import { routing } from "../../i18n/routing";

// Display font - for headings
const displayFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["700", "800"],
  display: "swap",
});

// Body font - for regular text
const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap",
});

// Monospace font - for code and logo
const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      type: "website",
      siteName: "ksefuj.to",
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: "https://ksefuj.to",
    },
  };
}

interface Props {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Ensure that the incoming locale is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
      style={{ backgroundColor: "#FAFAF8" }}
    >
      <body className="antialiased min-h-screen bg-[#FAFAF8]">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        <AmplitudeProvider />
        <SpeedInsights />
      </body>
    </html>
  );
}
