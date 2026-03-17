import { getTranslations } from "next-intl/server";
import { Validator } from "./validator";
import { LanguagePicker } from "./language-picker";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "homepage" });

  return (
    <main className="min-h-screen flex flex-col">
      <header className="border-b border-stone-800/50 px-6 py-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tighter">
            <span className="text-stone-100">ksef</span>
            <span className="text-stone-400">uj</span>
            <span className="text-stone-600 text-lg font-normal">.to</span>
          </h1>
          <LanguagePicker currentLocale={locale} />
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="max-w-3xl w-full space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold tracking-tight">{t("heroTitle")}</h2>
            <p className="text-stone-400 text-lg">{t("heroDescription")}</p>
          </div>

          <Validator locale={locale} />
        </div>
      </div>

      <footer className="border-t border-stone-800 px-6 py-4">
        <div className="max-w-3xl mx-auto text-center text-xs text-stone-600">© 2026 ksefuj</div>
      </footer>
    </main>
  );
}
