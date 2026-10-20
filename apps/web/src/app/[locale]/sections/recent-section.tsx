import { getTranslations } from "next-intl/server";
import { TrackedLink } from "@/components/tracked-link";
import { ContentRow } from "@/components/content-row";
import { getRecentActivityItems } from "@/lib/content-discovery";
import { homeLinkClasses, HomeSection } from "./home-section";

/** Homepage "recently published and updated": a dense list, newest activity first. */
export async function RecentSection({ locale }: { locale: string }) {
  const [items, t] = await Promise.all([
    getRecentActivityItems(locale),
    getTranslations({ locale, namespace: "landing.recent" }),
  ]);

  if (items.length === 0) {
    return null;
  }

  const prefix = locale === "pl" ? "" : `/${locale}`;

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
        {items.map(({ item, section }, index) => (
          <li key={`${section}/${item.plSlug}`}>
            <ContentRow
              item={item}
              locale={locale}
              section={section}
              variant={index === 0 ? "lead" : "default"}
              headingLevel="h3"
              showUpdated
              rail="home"
              track={{
                event: "homepage_post_clicked",
                props: { locale, slug: item.frontmatter.slug, section, position: index + 1 },
              }}
            />
          </li>
        ))}
      </ul>
    </HomeSection>
  );
}
