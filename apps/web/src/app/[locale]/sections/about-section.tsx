import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { homeLinkClasses, HomeSection } from "./home-section";

const ITEMS = ["sources", "privacy", "openSource", "free"] as const;

/** Homepage "How we work": sources, privacy, open source, price, in one short block. */
export async function AboutSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "landing.about" });

  return (
    <HomeSection id="about" title={t("title")}>
      <dl className="grid gap-x-10 gap-y-6 md:grid-cols-2">
        {ITEMS.map((id) => (
          <div key={id}>
            <dt className="font-semibold text-slate-900">{t(`items.${id}.title`)}</dt>
            <dd className="mt-1 text-sm text-slate-600">{t(`items.${id}.text`)}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        <a href="https://github.com/ksefuj/ksefuj" className={homeLinkClasses}>
          GitHub
        </a>
        <a href="https://www.npmjs.com/package/@ksefuj/validator" className={homeLinkClasses}>
          npm
        </a>
        <Link href="/privacy" className={homeLinkClasses}>
          {t("privacyLink")}
        </Link>
        <span className="text-slate-500">
          {t("cli")}{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-slate-800">
            npx @ksefuj/validator invoice.xml
          </code>
        </span>
      </p>
    </HomeSection>
  );
}
