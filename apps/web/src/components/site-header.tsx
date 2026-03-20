"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "./logo";

interface SiteHeaderProps {
  locale: string;
  languagePicker?: React.ReactNode;
}

export function SiteHeader({ locale, languagePicker }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 border-b border-white/20">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href={`/${locale}`} className="hover:opacity-80 transition-opacity">
            <Logo size="md" />
          </Link>

          <nav className="flex items-center gap-6">{languagePicker}</nav>
        </div>
      </div>
    </header>
  );
}
