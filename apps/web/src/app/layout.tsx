import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

interface Props {
  children: ReactNode;
  params?: Promise<{ locale?: string }>;
}

export default async function RootLayout({ children, params }: Props) {
  // Get locale from params if available (passed from [locale] segment)
  const resolvedParams = params ? await params : {};
  const locale = resolvedParams.locale || "pl";

  return (
    <html lang={locale}>
      <body className="bg-stone-950 text-stone-100 antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
