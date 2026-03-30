"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { track } from "@vercel/analytics";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

interface SiteHeaderProps {
  locale: string;
  languagePicker?: ReactNode;
}

export function SiteHeader({ locale, languagePicker }: SiteHeaderProps) {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const p = locale === "pl" ? "" : `/${locale}`;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const navLinks = [
    { href: `${p}/blog`, label: t("blog") },
    { href: `${p}/guides`, label: t("guides") },
    { href: `${p}/faq`, label: t("faq") },
  ];

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-4">
          <Logo size="md" className="invisible" />
        </div>
      </div>

      <div className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
        <div
          ref={menuRef}
          className={cn(
            "pointer-events-auto transition-all duration-200 ease-linear",
            scrolled
              ? "mx-2 md:mx-auto mt-2 md:mt-4 max-w-4xl rounded-2xl shadow-sm border border-white/60 bg-white/50 backdrop-blur-2xl"
              : "border-b border-slate-100 bg-white/80 backdrop-blur-xl pt-[env(safe-area-inset-top)]",
          )}
        >
          <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
            <Link href={p || "/"} className="hover:opacity-80 transition-opacity">
              <Logo size="md" />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => track("nav_clicked", { destination: href, locale })}
                  className="text-sm font-medium text-slate-600 hover:text-violet-600 transition-colors"
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
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((o) => !o)}
                className="p-1.5 rounded-lg text-slate-600 hover:text-violet-600 hover:bg-slate-100 transition-colors"
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu dropdown */}
          {menuOpen && (
            <nav className="md:hidden border-t border-slate-100 px-4 py-3 flex flex-col gap-1">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => {
                    setMenuOpen(false);
                    track("nav_clicked", { destination: href, locale, mobile: true });
                  }}
                  className="text-sm font-medium text-slate-600 hover:text-violet-600 hover:bg-slate-50 transition-colors px-3 py-2 rounded-lg"
                >
                  {label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </div>
    </>
  );
}
