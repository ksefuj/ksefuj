import { SectionContainer } from "@/components/section-container";
import { ContentCard } from "@/components/content-card";
import { TrackedLink } from "@/components/tracked-link";
import { getLatestPostItems } from "@/lib/content-discovery";

interface LatestPostsSectionProps {
  locale: string;
  title: string;
  allPostsLabel: string;
  guidesLabel: string;
}

const linkClasses =
  "text-sm font-medium text-violet-700 hover:text-violet-800 hover:underline underline-offset-4 transition-colors";

/** Locale-aware path: Polish has no prefix. */
const localePath = (locale: string, path: string) => (locale === "pl" ? path : `/${locale}${path}`);

/** Homepage "Latest from the blog" section. Server-rendered at build time. */
export async function LatestPostsSection({
  locale,
  title,
  allPostsLabel,
  guidesLabel,
}: LatestPostsSectionProps) {
  const posts = await getLatestPostItems(locale);

  if (posts.length === 0) {
    return null;
  }

  return (
    <SectionContainer background="slate">
      <div className="space-y-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 font-display">
            {title}
          </h2>
          <div className="flex items-center gap-5">
            <TrackedLink
              href={localePath(locale, "/blog")}
              className={linkClasses}
              event="homepage_blog_link_clicked"
              eventProps={{ locale, destination: "blog" }}
            >
              {allPostsLabel} →
            </TrackedLink>
            <TrackedLink
              href={localePath(locale, "/guides")}
              className={linkClasses}
              event="homepage_blog_link_clicked"
              eventProps={{ locale, destination: "guides" }}
            >
              {guidesLabel} →
            </TrackedLink>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map(({ item, section }, index) => (
            <ContentCard
              key={`${section}/${item.plSlug}`}
              item={item}
              locale={locale}
              section={section}
              headingLevel="h3"
              track={{
                event: "homepage_post_clicked",
                props: {
                  locale,
                  slug: item.frontmatter.slug,
                  section,
                  position: index + 1,
                },
              }}
            />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
