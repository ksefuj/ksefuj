import { getTranslations } from "next-intl/server";
import { NewsletterForm } from "@/components/newsletter-form";
import { HomeSection } from "./home-section";

/** Homepage newsletter block: the page's single tinted area, a plain inline form. */
export async function NewsletterSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "landing.newsletter" });

  return (
    <HomeSection id="newsletter" tinted>
      <div className="max-w-xl">
        <h2
          id="newsletter-title"
          className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
        >
          {t("title")}
        </h2>
        <p className="mb-5 mt-2 text-slate-600">{t("subtitle")}</p>
        <NewsletterForm placement="homepage" />
      </div>
    </HomeSection>
  );
}
