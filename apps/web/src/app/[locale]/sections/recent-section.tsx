import { getTranslations } from "next-intl/server";
import { TrackedLink } from "@/components/tracked-link";
import { buildContentPath } from "@/lib/content";
import { getRecentActivityItems } from "@/lib/content-discovery";
import { isUpdate } from "@/lib/recent-activity";
import { isContentTopic } from "@/lib/topics";
import { homeLinkClasses, HomeSection } from "./home-section";

/** Homepage "recently published and updated": a dense list, newest activity first. */
export async function RecentSection({ locale }: { locale: string }) {
  const [items, t, tTopics] = await Promise.all([
    getRecentActivityItems(locale),
    getTranslations({ locale, namespace: "landing.recent" }),
    getTranslations({ locale, namespace: "content.topics" }),
  ]);

  if (items.length === 0) {
    return null;
  }

  const prefix = locale === "pl" ? "" : `/${locale}`;
  const fmt = (date: string) =>
    new Date(date).toLocaleDateString(locale, { day: "numeric", month: "short", year: "numeric" });

  return (
    <HomeSection
      id="recent"
      title={t("title")}
      aside={
        <p className="flex gap-5 text-sm">
          <TrackedLink
            href={`${prefix}/blog`}
            className={homeLinkClasses}
            event="homepage_blog_link_clicked"
            eventProps={{ locale, destination: "blog" }}
          >
            {t("allPosts")}
          </TrackedLink>
          <TrackedLink
            href={`${prefix}/guides`}
            className={homeLinkClasses}
            event="homepage_blog_link_clicked"
            eventProps={{ locale, destination: "guides" }}
          >
            {t("guides")}
          </TrackedLink>
        </p>
      }
    >
      <ul className="divide-y divide-slate-200 border-y border-slate-200">
        {items.map(({ item, section }, index) => {
          const fm = item.frontmatter;
          const updated = isUpdate(fm);
          const topic = isContentTopic(fm.topic) ? fm.topic : undefined;
          return (
            <li
              key={`${section}/${item.plSlug}`}
              className="grid gap-x-6 gap-y-0.5 py-3 sm:grid-cols-[11rem_13rem_1fr]"
            >
              <time dateTime={updated ? fm.updated : fm.date} className="text-sm text-slate-500">
                {updated ? `${t("updated")} ${fmt(fm.updated as string)}` : fmt(fm.date)}
              </time>
              <span className="text-sm text-slate-500">{topic ? tTopics(topic) : ""}</span>
              <TrackedLink
                href={buildContentPath(item.contentLocale, section, fm.slug)}
                className="font-medium text-slate-900 underline-offset-4 hover:text-violet-700 hover:underline"
                event="homepage_post_clicked"
                eventProps={{ locale, slug: fm.slug, section, position: index + 1 }}
              >
                {fm.title}
              </TrackedLink>
            </li>
          );
        })}
      </ul>
    </HomeSection>
  );
}
