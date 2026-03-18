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
      <header className="backdrop-blur-sm bg-white/70 border-b border-slate-200 px-6 py-6 sticky top-0 z-40 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-black tracking-tighter">
            <span className="text-slate-800">ksef</span>
            <span className="text-violet-500">uj</span>
            <span className="text-slate-400 text-xl font-medium">.to</span>
          </h1>
          <LanguagePicker currentLocale={locale} />
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-5xl w-full space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-black tracking-tight text-slate-800">{t("heroTitle")}</h2>
            <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto">
              {t("heroDescription")}
            </p>
          </div>

          <Validator locale={locale} />
        </div>
      </div>

      <footer className="backdrop-blur-sm bg-white/50 border-t border-slate-200 px-6 py-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="text-sm text-slate-500 font-medium">© 2026 ksefuj</div>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/ksefuj/ksefuj"
              className="text-slate-500 hover:text-violet-500 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://www.npmjs.com/package/@ksefuj/validator"
              className="text-slate-500 hover:text-rose-500 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M0 0v24h24v-24h-24zm6.168 20.16v-14.32h5.832v11.52h2.88v-11.52h2.952v14.32h-11.664z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
