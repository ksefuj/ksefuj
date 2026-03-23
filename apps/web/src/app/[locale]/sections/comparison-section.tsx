"use client";

import { SectionContainer } from "@/components/section-container";
import { Logo } from "@/components/logo";
import { useState } from "react";

interface ComparisonProps {
  title: string;
  subtitle: string;
  ourProduct: string;
  recommended: string;
  features: {
    privacy: { title: string; ksefuj: string; freemium: string; enterprise: string };
    pricing: { title: string; ksefuj: string; freemium: string; enterprise: string };
    validation: { title: string; ksefuj: string; freemium: string; enterprise: string };
    localXsd: { title: string; ksefuj: string; freemium: string; enterprise: string };
    errorDetails: { title: string; ksefuj: string; freemium: string; enterprise: string };
    cli: { title: string; ksefuj: string; freemium: string; enterprise: string };
    openSource: { title: string; ksefuj: string; freemium: string; enterprise: string };
    registration: { title: string; ksefuj: string; freemium: string; enterprise: string };
    batchProcessing: { title: string; ksefuj: string; freemium: string; enterprise: string };
  };
  competitors: Array<{ name: string; tagline: string }>;
  checkmark: string;
  cross: string;
  partial: string;
  ctaSubtitle: string;
  ctaButton: string;
  disclaimer: string;
}

export function ComparisonSection({
  title,
  subtitle,
  features,
  competitors,
  disclaimer,
}: ComparisonProps) {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const getValueIcon = (value: string, isKsefuj: boolean = false) => {
    const lowerValue = value.toLowerCase();

    if (
      isKsefuj ||
      lowerValue.includes("apache") ||
      lowerValue.includes("42") ||
      lowerValue.includes("100%") ||
      lowerValue === "nie wymagana" ||
      lowerValue === "not required" ||
      lowerValue === "не потрібна" ||
      lowerValue.includes("bez limitów") ||
      lowerValue.includes("no limits") ||
      lowerValue.includes("без лімітів") ||
      lowerValue.includes("darmowy na zawsze") ||
      lowerValue.includes("free forever") ||
      lowerValue.includes("безкоштовно назавжди") ||
      lowerValue.includes("tak, w przeglądarce") ||
      lowerValue.includes("yes, in browser") ||
      lowerValue.includes("так, у браузері")
    ) {
      return (
        <svg
          className="w-5 h-5 text-emerald-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    }

    if (
      lowerValue === "nie" ||
      lowerValue === "no" ||
      lowerValue === "ні" ||
      lowerValue === "brak" ||
      lowerValue === "none" ||
      lowerValue === "немає" ||
      lowerValue.includes("serwery") ||
      lowerValue.includes("servers") ||
      lowerValue.includes("wymagana") ||
      lowerValue.includes("required") ||
      lowerValue.includes("обов'язкова") ||
      lowerValue === "podstawowa" ||
      lowerValue === "basic" ||
      lowerValue === "базова" ||
      lowerValue === "podstawowy xsd" ||
      lowerValue === "basic xsd" ||
      lowerValue === "базовий xsd" ||
      lowerValue.includes("kod zamknięty") ||
      lowerValue.includes("closed source") ||
      lowerValue.includes("закритий код") ||
      lowerValue.includes("wymaga serwera") ||
      lowerValue.includes("requires server") ||
      lowerValue.includes("потребує сервер")
    ) {
      return (
        <svg
          className="w-5 h-5 text-rose-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      );
    }

    if (
      lowerValue.includes("lokaln") ||
      lowerValue === "local" ||
      lowerValue.includes("opcjonaln") ||
      lowerValue === "optional" ||
      lowerValue === "опціонально" ||
      lowerValue.includes("częściow") ||
      lowerValue === "partial" ||
      lowerValue.includes("частков") ||
      lowerValue.includes("5 ") ||
      lowerValue.includes("1 ") ||
      lowerValue.includes("z limitami") ||
      lowerValue.includes("with limits") ||
      lowerValue.includes("з лімітами") ||
      lowerValue.includes("płatn") ||
      lowerValue.includes("paid") ||
      lowerValue.includes("€") ||
      lowerValue.includes("freemium") ||
      lowerValue.includes("często") ||
      lowerValue.includes("often") ||
      lowerValue.includes("часто")
    ) {
      return (
        <svg
          className="w-5 h-5 text-amber-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      );
    }

    return (
      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    );
  };

  const getValueStyle = (isKsefuj: boolean) => {
    if (isKsefuj) {
      return "text-violet-700 font-semibold";
    }
    return "text-slate-600";
  };

  const featureRows = Object.entries(features).map(([key, feature]) => ({
    key,
    title: feature.title,
    values: {
      ksefuj: feature.ksefuj,
      freemium: feature.freemium,
      enterprise: feature.enterprise,
    },
  }));

  return (
    <SectionContainer className="bg-gradient-to-br from-slate-50 to-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">{title}</h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">{subtitle}</p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="overflow-x-auto px-4">
          <div className="min-w-[768px] py-4">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-4 bg-gradient-to-r from-slate-50 to-white border-b-2 border-slate-200">
                <div className="p-4 flex items-center">
                  <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                    Features
                  </div>
                </div>

                {/* ksefuj column */}
                <div className="p-4 bg-gradient-to-br from-violet-50 to-violet-100/50 relative border-x-2 border-violet-200 flex items-center justify-center">
                  <Logo />
                </div>

                {/* Freemium competitors */}
                <div className="p-4 border-r border-slate-200">
                  <div className="flex flex-col space-y-1">
                    <div className="font-medium text-slate-700">{competitors[1].name}</div>
                    <div className="text-xs text-slate-500">{competitors[1].tagline}</div>
                  </div>
                </div>

                {/* Enterprise competitors */}
                <div className="p-4">
                  <div className="flex flex-col space-y-1">
                    <div className="font-medium text-slate-700">{competitors[2].name}</div>
                    <div className="text-xs text-slate-500">{competitors[2].tagline}</div>
                  </div>
                </div>
              </div>

              {/* Feature rows */}
              {featureRows.map((row) => (
                <div
                  key={row.key}
                  className={`grid grid-cols-4 border-b border-slate-100 last:border-b-0 transition-colors ${
                    hoveredRow === row.key ? "bg-slate-50/50" : ""
                  }`}
                  onMouseEnter={() => setHoveredRow(row.key)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <div className="p-4 flex items-center">
                    <div className="font-medium text-slate-900 text-xs">{row.title}</div>
                  </div>

                  {/* ksefuj value */}
                  <div className="p-4 bg-violet-50/30 border-x border-violet-100 flex items-center">
                    <div className="flex items-center space-x-3">
                      {getValueIcon(row.values.ksefuj, true)}
                      <span className={`${getValueStyle(true)} text-sm`}>{row.values.ksefuj}</span>
                    </div>
                  </div>

                  {/* Freemium value */}
                  <div className="p-4 border-r border-slate-100 flex items-center">
                    <div className="flex items-center space-x-3">
                      {getValueIcon(row.values.freemium, false)}
                      <span className={`${getValueStyle(false)} text-sm`}>
                        {row.values.freemium}
                      </span>
                    </div>
                  </div>

                  {/* Enterprise value */}
                  <div className="p-4 flex items-center">
                    <div className="flex items-center space-x-3">
                      {getValueIcon(row.values.enterprise, false)}
                      <span className={`${getValueStyle(false)} text-sm`}>
                        {row.values.enterprise}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-xs text-slate-400">{disclaimer}</p>
        </div>
      </div>
    </SectionContainer>
  );
}
