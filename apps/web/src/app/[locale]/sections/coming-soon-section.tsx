"use client";

import React from "react";
import { SectionContainer } from "@/components/section-container";
import { Badge } from "@/components/badge";
import type { FeatureIcon } from "../page-data";

const ICONS: Record<FeatureIcon, React.ReactNode> = {
  preview: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  ),
  autofix: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
      />
    </svg>
  ),
  generate: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  ),
};

interface ComingSoonFeature {
  title: string;
  description: string;
  badge: string;
  icon: FeatureIcon;
  badgeVariant: "warning" | "neutral";
}

interface ComingSoonProps {
  title: string;
  subtitle: string;
  features: ComingSoonFeature[];
}

export function ComingSoonSection({ title, subtitle, features }: ComingSoonProps) {
  return (
    <SectionContainer>
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">{title}</h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">{subtitle}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="relative group">
            <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:border-violet-200 hover:shadow-lg transition-all duration-200 h-full">
              {/* Badge */}
              <div className="absolute -top-3 left-8">
                <Badge variant={feature.badgeVariant}>{feature.badge}</Badge>
              </div>

              {/* Icon */}
              <div className="w-16 h-16 bg-violet-100 rounded-xl flex items-center justify-center text-violet-600 mb-6 group-hover:bg-violet-200 transition-colors">
                {ICONS[feature.icon]}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
