import { getTranslations } from "next-intl/server";
import { NewsletterForm } from "@/components/newsletter-form";
import { HomeSection } from "./home-section";

/** Homepage newsletter block: a hairline-bounded inline block, like the calendar notify block. */
export async function NewsletterSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "landing.newsletter" });

  return (
    <HomeSection id="newsletter">
      <div className="grid gap-x-8 gap-y-4 rounded-xl border border-slate-200 bg-white p-6 md:grid-cols-[1fr_auto] md:items-start">
        <div className="max-w-xl">
          <h2
            id="newsletter-title"
            className="font-display text-lg font-bold tracking-tight text-slate-900"
          >
            {t("title")}
          </h2>
          <p className="mt-1 text-sm text-slate-600">{t("subtitle")}</p>
        </div>
        <NewsletterForm placement="homepage" />
      </div>
    </HomeSection>
  );
}
