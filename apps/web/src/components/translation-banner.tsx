import { getTranslations } from "next-intl/server";

const REPO = "https://github.com/ksefuj/ksefuj";

interface Props {
  uiLocale: string;
  contentLocale: string;
  section: string;
  slug: string;
}

export async function TranslationBanner({ uiLocale, contentLocale, section, slug }: Props) {
  const t = await getTranslations({ locale: uiLocale, namespace: "translationBanner" });
  const contentLanguageName = t(`languageNames.${contentLocale}` as "languageNames.pl");

  const issueUrl = `${REPO}/issues/new?labels=translation&title=${encodeURIComponent(
    `Translate: ${section}/${slug} → ${uiLocale}`,
  )}&body=${encodeURIComponent(
    `The article \`${slug}\` in \`content/${contentLocale}/${section}/\` has no \`${uiLocale}\` translation yet.\n\nPlease add \`content/${uiLocale}/${section}/<translated-slug>.mdx\` and link it via the \`translations\` frontmatter key.`,
  )}`;

  return (
    <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
      <svg
        className="w-4 h-4 shrink-0 mt-0.5 text-amber-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
        />
      </svg>
      <span className="flex-1">{t("body", { language: contentLanguageName })}</span>
      <a
        href={issueUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 font-medium text-amber-700 underline underline-offset-2 hover:text-amber-900 transition-colors"
      >
        {t("contribute")}
      </a>
    </div>
  );
}
