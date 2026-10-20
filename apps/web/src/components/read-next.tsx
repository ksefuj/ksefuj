import { getTranslations } from "next-intl/server";
import { ContentRow } from "@/components/content-row";
import type { Frontmatter } from "@/lib/content";
import { getReadNextItems } from "@/lib/content-discovery";

interface ReadNextProps {
  locale: string;
  section: "blog" | "guides";
  frontmatter: Frontmatter;
}

/** "Read next" block for post and guide pages. Server-rendered at build time. */
export async function ReadNext({ locale, section, frontmatter }: ReadNextProps) {
  const [picks, t] = await Promise.all([
    getReadNextItems(locale, { section, frontmatter }),
    getTranslations({ locale, namespace: "content.discovery" }),
  ]);

  if (picks.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="read-next-heading" className="mt-12 border-t border-slate-200 pt-8">
      <h2
        id="read-next-heading"
        className="mb-2 font-display text-xl font-bold tracking-tight text-slate-900"
      >
        {t("readNext")}
      </h2>
      <ul className="divide-y divide-slate-200">
        {picks.map(({ item, section: toSection, reason }, index) => (
          <li key={`${toSection}/${item.plSlug}`}>
            <ContentRow
              item={item}
              locale={locale}
              section={toSection}
              headingLevel="h3"
              track={{
                event: "read_next_clicked",
                props: {
                  locale,
                  fromSection: section,
                  fromSlug: frontmatter.slug,
                  toSection,
                  toSlug: item.frontmatter.slug,
                  position: index + 1,
                  reason,
                },
              }}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
