import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { homeLinkClasses, HomeSection } from "./home-section";

const TOOLS = [
  { id: "validator", href: "/validator" },
  { id: "preview", href: "/podglad" },
  { id: "rates", href: "/waluty" },
  { id: "assistant", href: "/asystent-ai" },
] as const;

/** Homepage tools row: validator, invoice preview, NBP rates, and what the validator checks. */
export async function ToolsSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "landing.tools" });
  const checks = t.raw("validatorChecks") as string[];

  return (
    <HomeSection id="tools" title={t("title")}>
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {TOOLS.map(({ id, href }) => (
          <div key={id}>
            <h3 className="font-display text-lg font-bold tracking-tight text-slate-900">
              <Link
                href={href}
                className="underline-offset-4 hover:text-violet-700 hover:underline"
              >
                {t(`items.${id}.title`)}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-slate-600">{t(`items.${id}.description`)}</p>
            {id === "validator" && (
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600 marker:text-slate-400">
                {checks.map((check) => (
                  <li key={check}>{check}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      <p className="mt-8 text-sm">
        <Link href="/docs" className={homeLinkClasses}>
          {t("docs")}
        </Link>
      </p>
    </HomeSection>
  );
}
