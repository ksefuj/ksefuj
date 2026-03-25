import type { ReactNode } from "react";
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ksefuj.to"),
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

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

interface Props {
  children: ReactNode;
  params?: Promise<{ locale?: string }>;
}

export default async function RootLayout({ children, params }: Props) {
  // Get locale from params if available (passed from [locale] segment)
  const resolvedParams = params ? await params : {};
  const locale = resolvedParams.locale || "pl";

  return (
    <html
      lang={locale}
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
      style={{ backgroundColor: "#FAFAF8" }}
    >
      <body className="antialiased min-h-screen bg-[#FAFAF8]">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
