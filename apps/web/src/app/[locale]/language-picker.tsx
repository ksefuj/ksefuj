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
          flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-all
          bg-stone-800/50 hover:bg-stone-800 text-stone-300 hover:text-stone-100
          border border-stone-700/50 hover:border-stone-600
          ${isPending ? "opacity-50 cursor-wait" : ""}
        `}
        aria-label={t("ariaLabel")}
        aria-expanded={isOpen}
      >
        <span className="text-xs opacity-70">{currentLanguage.flag}</span>
        <span>{currentLanguage.label}</span>
        <svg
          className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg bg-stone-900 border border-stone-700 shadow-xl overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleChange(lang.code)}
              disabled={isPending || lang.code === currentLocale}
              className={`
                w-full px-4 py-2.5 text-left text-sm transition-all flex items-center gap-3
                ${
                  lang.code === currentLocale
                    ? "bg-stone-700/50 text-stone-100 cursor-default"
                    : "text-stone-300 hover:bg-stone-800 hover:text-stone-100"
                }
              `}
            >
              <span className="text-base">{lang.flag}</span>
              <div className="flex-1">
                <div className="font-medium">{lang.name}</div>
                <div className="text-xs opacity-60">{lang.label}</div>
              </div>
              {lang.code === currentLocale && (
                <svg className="w-4 h-4 text-stone-400" fill="currentColor" viewBox="0 0 20 20">
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
