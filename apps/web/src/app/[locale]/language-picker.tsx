"use client";

import { usePathname, useRouter } from "../../i18n/routing";
import { useEffect, useRef, useState, useTransition } from "react";
import { track } from "@vercel/analytics";
import { useTranslations } from "next-intl";

interface Props {
  currentLocale: string;
}

const languages = [
  { code: "pl", label: "PL", name: "Polski" },
  { code: "en", label: "EN", name: "English" },
  { code: "uk", label: "UK", name: "Українська" },
] as const;

export function LanguagePicker({ currentLocale }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("languagePicker");

  const currentLanguage = languages.find((lang) => lang.code === currentLocale) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleChange = (locale: string) => {
    // Track language change
    track("language_changed", {
      from: currentLocale,
      to: locale,
      path: pathname,
    });

    setIsOpen(false);
    startTransition(() => {
      router.replace(pathname, { locale });
    });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={`
          inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-all
          text-slate-700 hover:text-violet-600 hover:bg-violet-50
          ${isPending ? "opacity-50 cursor-wait" : ""}
        `}
        aria-label={t("ariaLabel")}
        aria-expanded={isOpen}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5h12M3 12h12m-9 7h6"
          />
        </svg>
        <span className="font-semibold">{currentLanguage.label}</span>
        <svg
          className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-1 w-32 rounded-xl bg-white border border-slate-200 shadow-lg overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleChange(lang.code)}
              disabled={isPending || lang.code === currentLocale}
              className={`
                w-full px-3 py-2 text-left text-sm transition-colors flex items-center justify-between
                ${
                  lang.code === currentLocale
                    ? "bg-violet-50 text-violet-700 font-semibold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }
              `}
            >
              <span>{lang.label}</span>
              {lang.code === currentLocale && (
                <svg
                  className="w-3.5 h-3.5 text-violet-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
