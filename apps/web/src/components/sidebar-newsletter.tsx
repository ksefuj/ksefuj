import { getTranslations } from "next-intl/server";
import { NewsletterForm } from "@/components/newsletter-form";

/** Compact newsletter signup under the table of contents in the article sidebar. */
export async function SidebarNewsletter({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "content.newsletter" });

  return (
    <section
      aria-labelledby="sidebar-newsletter-heading"
      className="mt-6 border-t border-slate-200 pt-6"
    >
      <h2
        id="sidebar-newsletter-heading"
        className="mb-1 font-display text-sm font-bold tracking-tight text-slate-900"
      >
        {t("sidebar.title")}
      </h2>
      <p className="mb-3 text-sm text-slate-600">{t("sidebar.text")}</p>
      <NewsletterForm placement="article-sidebar" compact />
    </section>
  );
}
