"use client";

import { Logo } from "./logo";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export function SiteFooter() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const p = locale === "pl" ? "" : `/${locale}`;

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div
        className="max-w-4xl mx-auto px-4 md:px-6 py-16"
        style={{ paddingBottom: "max(4rem, env(safe-area-inset-bottom))" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Logo size="sm" className="brightness-0 invert opacity-80" />
            <p className="text-sm">{t("description")}</p>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-slate-300 font-semibold text-sm uppercase tracking-wide">
              {t("resources")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/ksefuj/ksefuj"
                  className="hover:text-slate-300 transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.npmjs.com/package/@ksefuj/validator"
                  className="hover:text-slate-300 transition-colors"
                >
                  {t("npmPackage")}
                </a>
              </li>
              <li>
                <a
                  href="https://ksef.podatki.gov.pl/"
                  className="hover:text-slate-300 transition-colors"
                >
                  {t("ksefPortal")}
                </a>
              </li>
            </ul>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h3 className="text-slate-300 font-semibold text-sm uppercase tracking-wide">
              {t("content")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`${p}/blog`} className="hover:text-slate-300 transition-colors">
                  {t("blog")}
                </Link>
              </li>
              <li>
                <Link href={`${p}/guides`} className="hover:text-slate-300 transition-colors">
                  {t("guides")}
                </Link>
              </li>
              <li>
                <Link href={`${p}/faq`} className="hover:text-slate-300 transition-colors">
                  {t("faq")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div className="space-y-4">
            <h3 className="text-slate-300 font-semibold text-sm uppercase tracking-wide">
              {t("legal")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`${p}/privacy`} className="hover:text-slate-300 transition-colors">
                  {t("privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link href={`${p}/terms`} className="hover:text-slate-300 transition-colors">
                  {t("termsOfUse")}
                </Link>
              </li>
              <li>
                <span>Apache 2.0</span>
              </li>
            </ul>
            <div className="pt-2 space-y-1 text-sm">
              <p>{t("emailLabel")}</p>
              <a
                href="mailto:hej@ksefuj.to"
                className="text-violet-400 hover:text-violet-300 transition-colors"
              >
                hej@ksefuj.to
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">{t("copyright")}</p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/ksefuj/ksefuj"
              className="text-slate-400 hover:text-slate-300 transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://www.npmjs.com/package/@ksefuj/validator"
              className="text-slate-400 hover:text-slate-300 transition-colors"
              aria-label="npm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M0 0v24h24v-24h-24zm6.168 20.16v-14.32h5.832v11.52h2.88v-11.52h2.952v14.32h-11.664z" />
              </svg>
            </a>
            <a
              href="https://x.com/ksefujto"
              className="text-slate-400 hover:text-slate-300 transition-colors"
              aria-label="X"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
              </svg>
            </a>
            <a
              href="/feed.xml"
              className="text-slate-400 hover:text-slate-300 transition-colors"
              aria-label="RSS"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
