import type { ReactNode } from "react";
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

export default function RootLayout({ children }: { children: ReactNode }) {
  // <html> and <body> are rendered by app/[locale]/layout.tsx so `lang` follows the locale.
  return children;
}
