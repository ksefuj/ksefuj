import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { TrackedLink } from "@/components/tracked-link";
import { buildContentPath } from "@/lib/content";
import { getTopicHubs } from "@/lib/content-discovery";
import { buildListingHref } from "@/lib/listing-filters";
import { homeLinkClasses, HomeSection } from "./home-section";

const MOBILE_LIMIT = 3;
const DESKTOP_LIMIT = 5;

/** Homepage topic hubs: per topic, its newest articles and guides as plain text links. */
export async function TopicsSection({ locale }: { locale: string }) {
  const [hubs, t, tTopics] = await Promise.all([
    getTopicHubs(locale),
    getTranslations({ locale, namespace: "landing.topics" }),
    getTranslations({ locale, namespace: "content.topics" }),
  ]);

  if (hubs.length === 0) {
    return null;
  }

  const prefix = locale === "pl" ? "" : `/${locale}`;

  return (
    <HomeSection id="topics" title={t("title")}>
      <div className="grid gap-x-10 gap-y-8 md:grid-cols-2 md:gap-y-10 lg:grid-cols-4">
        {hubs.map(({ topic, items, total }) => (
          // Subgrid rows (md+) keep headings, lists and "all" links aligned across a row even when
          // a heading wraps or one topic has fewer items.
          <div key={topic} className="md:row-span-3 md:grid md:grid-rows-subgrid md:gap-y-0">
            <h3 className="mb-3 border-b border-slate-200 pb-2 font-display text-lg font-bold tracking-tight text-slate-900">
              {tTopics(topic)}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {items.slice(0, DESKTOP_LIMIT).map(({ item, section }, index) => (
                // Mobile shows the first MOBILE_LIMIT items only; the "all" link covers the rest
                <li
                  key={`${section}/${item.plSlug}`}
                  className={index >= MOBILE_LIMIT ? "hidden md:list-item" : undefined}
                >
                  <TrackedLink
                    href={buildContentPath(item.contentLocale, section, item.frontmatter.slug)}
                    className="text-slate-800 underline-offset-4 hover:text-violet-700 hover:underline"
                    event="homepage_topic_link_clicked"
                    eventProps={{
                      locale,
                      topic,
                      slug: item.frontmatter.slug,
                      position: index + 1,
                    }}
                  >
                    {item.frontmatter.title}
                  </TrackedLink>
                  {item.contentLocale !== locale && (
                    <span className="ml-1.5 text-xs text-slate-400">PL</span>
                  )}
                </li>
              ))}
              {topic === "errors" && (
                <li>
                  <Link href="/validator#messages" className={homeLinkClasses}>
                    {t("validatorMessages")}
                  </Link>
                </li>
              )}
            </ul>
            <p className="mt-3 self-end text-sm md:mt-0 md:pt-3">
              <TrackedLink
                href={buildListingHref(`${prefix}/blog`, { topic })}
                className={homeLinkClasses}
                event="homepage_topic_link_clicked"
                eventProps={{ locale, topic, slug: "all", position: 0 }}
              >
                {t("allWithCount", { count: total })}
              </TrackedLink>
            </p>
          </div>
        ))}
      </div>
    </HomeSection>
  );
}
