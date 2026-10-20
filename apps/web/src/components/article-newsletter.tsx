import { getTranslations } from "next-intl/server";
import { NewsletterForm } from "@/components/newsletter-form";
import { isContentTopic } from "@/lib/topics";

/** Inline newsletter signup right after a blog post or guide. Deadline articles get dedicated copy. */
export async function ArticleNewsletter({ locale, topic }: { locale: string; topic?: unknown }) {
  const t = await getTranslations({ locale, namespace: "content.newsletter" });
  const isDeadlines = isContentTopic(topic) && topic === "deadlines";

  return (
    <section
      aria-labelledby="article-newsletter-heading"
      className="mt-12 border-t border-slate-200 pt-8"
    >
      <h2
        id="article-newsletter-heading"
        className="mb-1 font-display text-xl font-bold tracking-tight text-slate-900"
      >
        {isDeadlines ? t("deadlines.title") : t("title")}
      </h2>
      <p className="mb-4 max-w-xl text-slate-600">
        {isDeadlines ? t("deadlines.text") : t("text")}
      </p>
      <NewsletterForm
        placement="article"
        buttonText={isDeadlines ? t("deadlines.button") : undefined}
      />
    </section>
  );
}
