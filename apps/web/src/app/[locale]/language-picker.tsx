"use client";

import { usePathname, useRouter } from "../../i18n/routing";
import { useEffect, useRef, useState, useTransition } from "react";
import { track } from "@vercel/analytics";
import { useTranslations } from "next-intl";

interface Props {
  currentLocale: string;
}

const languages = [
  { code: "pl", label: "PL", name: "Polski", flag: "🇵🇱" },
  { code: "en", label: "EN", name: "English", flag: "🇬🇧" },
  { code: "uk", label: "UK", name: "Українська", flag: "🇺🇦" },
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
          flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all
          bg-white/70 hover:bg-white backdrop-blur-sm text-slate-700 hover:text-slate-900
          border border-slate-200 hover:border-violet-200 shadow-sm hover:shadow-md
          ${isPending ? "opacity-50 cursor-wait" : ""}
        `}
        aria-label={t("ariaLabel")}
        aria-expanded={isOpen}
      >
        <span className="text-base">{currentLanguage.flag}</span>
        <span className="font-bold">{currentLanguage.label}</span>
        <svg
          className={`w-4 h-4 transition-transform text-violet-400 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white/95 backdrop-blur-sm border border-slate-200 shadow-2xl overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleChange(lang.code)}
              disabled={isPending || lang.code === currentLocale}
              className={`
                w-full px-4 py-3 text-left text-sm transition-all flex items-center gap-3
                ${
                  lang.code === currentLocale
                    ? "bg-violet-50 text-violet-700 font-semibold cursor-default"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium"
                }
              `}
            >
              <span className="text-lg">{lang.flag}</span>
              <div className="flex-1">
                <div className="font-semibold">{lang.name}</div>
                <div className="text-xs text-slate-400">{lang.label}</div>
              </div>
              {lang.code === currentLocale && (
                <svg className="w-4 h-4 text-violet-500" fill="currentColor" viewBox="0 0 20 20">
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
