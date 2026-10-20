"use client";

import { Fragment, type ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import * as amplitude from "@amplitude/analytics-browser";
import { Logo } from "./logo";

interface SiteHeaderProps {
  locale: string;
  languagePicker?: ReactNode;
}

export function SiteHeader({ locale, languagePicker }: SiteHeaderProps) {
  const t = useTranslations("nav");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const p = locale === "pl" ? "" : `/${locale}`;

  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Reading first, tools after the separator.
  const contentLinks = [
    { href: `${p}/blog`, label: t("blog") },
    { href: `${p}/guides`, label: t("guides") },
    { href: `${p}/faq`, label: t("faq") },
  ];
  const toolLinks = [
    { href: `${p}/validator`, label: t("validator") },
    { href: `${p}/podglad`, label: t("preview") },
    { href: `${p}/waluty`, label: t("waluty") },
  ];

  return (
    <header
      ref={menuRef}
      className="sticky top-0 z-40 border-b border-slate-200 bg-[#FAFAF8] pt-[env(safe-area-inset-top)]"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link href={p || "/"} className="hover:opacity-80 transition-opacity">
          <Logo size="md" />
        </Link>

        {/* Desktop nav */}
        <nav aria-label={t("mainNav")} className="hidden md:flex items-center gap-6">
          {contentLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => amplitude.track("nav_clicked", { destination: href, locale })}
              className="text-sm font-medium text-slate-600 hover:text-violet-700 hover:underline underline-offset-4"
            >
              {label}
            </Link>
          ))}
          <span aria-hidden className="h-4 w-px bg-slate-300" />
          {toolLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => amplitude.track("nav_clicked", { destination: href, locale })}
              className="text-sm font-medium text-slate-600 hover:text-violet-700 hover:underline underline-offset-4"
            >
              {label}
            </Link>
          ))}
          {languagePicker}
        </nav>

        {/* Mobile: language picker + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          {languagePicker}
          <button
            aria-label={t("toggleMenu")}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="p-1.5 rounded-lg text-slate-600 hover:text-violet-700 hover:bg-slate-100 transition-colors"
          >
            {menuOpen ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <nav
          aria-label={t("mainNav")}
          className="md:hidden border-t border-slate-200 px-4 py-3 flex flex-col"
        >
          {[contentLinks, toolLinks].map((group, groupIndex) => (
            <Fragment key={groupIndex}>
              {groupIndex > 0 && <hr className="my-2 border-slate-200" />}
              {group.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => {
                    setMenuOpen(false);
                    amplitude.track("nav_clicked", { destination: href, locale, mobile: true });
                  }}
                  className="text-sm font-medium text-slate-700 hover:text-violet-700 hover:bg-slate-100 transition-colors px-3 py-2 rounded-lg"
                >
                  {label}
                </Link>
              ))}
            </Fragment>
          ))}
        </nav>
      )}
    </header>
  );
}
