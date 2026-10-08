"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

// Client component on purpose: not-found files receive no `params`, so server-side
// getTranslations() would fall back to the default locale. The locale layout's
// NextIntlClientProvider already carries the right locale and messages.
export default function LocaleNotFound() {
  const t = useTranslations("notFound");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-3 px-4 text-center">
      <p className="text-sm font-semibold text-violet-600">404</p>
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{t("title")}</h1>
      <p className="text-slate-600 max-w-md">{t("description")}</p>
      <Link href="/" className="text-violet-600 hover:text-violet-700 transition-colors text-sm">
        {t("home")}
      </Link>
    </main>
  );
}
