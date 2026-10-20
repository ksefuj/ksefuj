import { getTranslations } from "next-intl/server";
import { NewsletterForm } from "@/components/newsletter-form";
import { TrackedLink } from "@/components/tracked-link";
import { buildContentPath, listContentItemsUnified } from "@/lib/content";
import { KSEF_MILESTONES } from "@/lib/ksef-calendar";
import { CalendarStatus } from "./calendar-status";
import { HomeSection } from "./home-section";

interface CalendarSectionProps {
  locale: string;
}

/** Homepage "KSeF calendar": dated milestones with a live status and the article explaining each. */
export async function CalendarSection({ locale }: CalendarSectionProps) {
  const [t, posts] = await Promise.all([
    getTranslations({ locale, namespace: "landing.calendar" }),
    listContentItemsUnified(locale, "blog"),
  ]);
  const renderedAt = new Date().toISOString();

  return (
    <HomeSection id="calendar" title={t("title")}>
      <p className="-mt-4 mb-8 max-w-2xl text-slate-600">{t("intro")}</p>
      <ol className="divide-y divide-slate-200 border-y border-slate-200">
        {KSEF_MILESTONES.map((milestone) => {
          const article = milestone.articlePlSlug
            ? posts.find((p) => p.plSlug === milestone.articlePlSlug)
            : undefined;
          const date = new Date(`${milestone.date}T12:00:00Z`).toLocaleDateString(locale, {
            timeZone: "UTC",
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          return (
            <li
              key={milestone.id}
              className="grid gap-x-8 gap-y-2 py-5 md:grid-cols-[13rem_1fr_14rem]"
            >
              <div>
                <time dateTime={milestone.date} className="font-display text-lg font-bold">
                  {date}
                </time>
                <p className="mt-0.5 text-sm font-medium">
                  <CalendarStatus milestone={milestone} renderedAt={renderedAt} />
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{t(`items.${milestone.id}.title`)}</h3>
                <p className="mt-1 max-w-2xl text-sm text-slate-600">
                  {t(`items.${milestone.id}.description`)}
                </p>
                {milestone.uncertain && (
                  <p className="mt-1 text-sm font-medium text-amber-700">
                    {t("uncertain")} ·{" "}
                    <a
                      href="#calendar-notify"
                      className="underline underline-offset-4 decoration-amber-300 hover:decoration-amber-700"
                    >
                      {t("notify.jumpLink")}
                    </a>
                  </p>
                )}
              </div>
              <div className="text-sm md:text-right">
                {article && (
                  <TrackedLink
                    href={buildContentPath(article.contentLocale, "blog", article.frontmatter.slug)}
                    className="text-violet-700 underline underline-offset-4 decoration-violet-300 hover:text-violet-800 hover:decoration-violet-700"
                    event="homepage_calendar_link_clicked"
                    eventProps={{ locale, milestone: milestone.id }}
                  >
                    {article.frontmatter.title}
                  </TrackedLink>
                )}
              </div>
            </li>
          );
        })}
      </ol>
      <div
        id="calendar-notify"
        className="mt-8 grid scroll-mt-24 gap-x-8 gap-y-4 rounded-xl border border-slate-200 bg-white p-6 md:grid-cols-[1fr_auto] md:items-start"
      >
        <div className="max-w-xl">
          <h3 className="font-display text-lg font-bold text-slate-900">{t("notify.title")}</h3>
          <p className="mt-1 text-sm text-slate-600">{t("notify.text")}</p>
        </div>
        <NewsletterForm placement="calendar" buttonText={t("notify.button")} />
      </div>
    </HomeSection>
  );
}
