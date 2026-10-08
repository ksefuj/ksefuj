import type { ReactNode } from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AmplitudeProvider } from "@/components/amplitude-provider";

import { routing } from "../../i18n/routing";
import { fontVariables } from "../fonts";

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
      url: locale === routing.defaultLocale ? "https://ksefuj.to" : `https://ksefuj.to/${locale}`,
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
    <html lang={locale} className={fontVariables} style={{ backgroundColor: "#FAFAF8" }}>
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
