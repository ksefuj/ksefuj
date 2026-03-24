"use client";

import { type ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

interface SiteHeaderProps {
  locale: string;
  languagePicker?: ReactNode;
}

export function SiteHeader({ locale, languagePicker }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div aria-hidden className="pointer-events-none">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-4">
          <Logo size="md" className="invisible" />
        </div>
      </div>

      <div className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
        <div
          className={cn(
            "pointer-events-auto transition-all duration-200 ease-linear",
            scrolled
              ? "mx-4 md:mx-auto mt-3 max-w-4xl rounded-2xl shadow-sm border border-white/60 bg-white/50 backdrop-blur-2xl"
              : "border-b border-slate-100 bg-white/80 backdrop-blur-xl",
          )}
        >
          <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
            <Link href={`/${locale}`} className="hover:opacity-80 transition-opacity">
              <Logo size="md" />
            </Link>
            <nav className="flex items-center gap-6">
              <Link
                href={locale === "pl" ? "/blog" : `/${locale}/blog`}
                className="text-sm font-medium text-slate-600 hover:text-violet-600 transition-colors"
              >
                Blog
              </Link>
              {languagePicker}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
