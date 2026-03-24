"use client";

import { SectionContainer } from "@/components/section-container";
import { Logo } from "@/components/logo";
import React, { useState } from "react";

type CellStatus = "good" | "bad" | "partial";

interface Cell {
  value: string;
  status: CellStatus;
}

interface FeatureRow {
  title: string;
  ksefuj: Cell;
  freemium: Cell;
  enterprise: Cell;
}

interface ComparisonProps {
  title: string;
  subtitle: string;
  featuresHeader: string;
  features: Record<string, FeatureRow>;
  competitors: Array<{ name: string; tagline: string }>;
  disclaimer: string;
}

const STATUS_ICONS: Record<CellStatus, React.ReactNode> = {
  good: (
    <svg
      className="w-5 h-5 text-emerald-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  bad: (
    <svg
      className="w-5 h-5 text-rose-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  partial: (
    <svg
      className="w-5 h-5 text-amber-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
      />
    </svg>
  ),
};

export function ComparisonSection({
  title,
  subtitle,
  featuresHeader,
  features,
  competitors,
  disclaimer,
}: ComparisonProps) {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const featureRows = Object.entries(features);

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
                    {featuresHeader}
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
              {featureRows.map(([key, row]) => (
                <div
                  key={key}
                  className={`grid grid-cols-4 border-b border-slate-100 last:border-b-0 transition-colors ${
                    hoveredRow === key ? "bg-slate-50/50" : ""
                  }`}
                  onMouseEnter={() => setHoveredRow(key)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <div className="p-4 flex items-center">
                    <div className="font-medium text-slate-900 text-xs">{row.title}</div>
                  </div>

                  {/* ksefuj value */}
                  <div className="p-4 bg-violet-50/30 border-x border-violet-100 flex items-center">
                    <div className="flex items-center space-x-3">
                      {STATUS_ICONS[row.ksefuj.status]}
                      <span className="text-violet-700 font-semibold text-sm">
                        {row.ksefuj.value}
                      </span>
                    </div>
                  </div>

                  {/* Freemium value */}
                  <div className="p-4 border-r border-slate-100 flex items-center">
                    <div className="flex items-center space-x-3">
                      {STATUS_ICONS[row.freemium.status]}
                      <span className="text-slate-600 text-sm">{row.freemium.value}</span>
                    </div>
                  </div>

                  {/* Enterprise value */}
                  <div className="p-4 flex items-center">
                    <div className="flex items-center space-x-3">
                      {STATUS_ICONS[row.enterprise.status]}
                      <span className="text-slate-600 text-sm">{row.enterprise.value}</span>
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
