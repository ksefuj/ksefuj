import React from "react";
import { SectionContainer } from "@/components/section-container";

interface OpenSourceSectionProps {
  title: string;
  description: string;
  features: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
  githubUrl: string;
  npmUrl: string;
  ctaText: string;
}

export function OpenSourceSection({
  title,
  description,
  features,
  githubUrl,
  npmUrl,
  ctaText,
}: OpenSourceSectionProps) {
  return (
    <SectionContainer background="white">
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 font-display">
            {title}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="text-center space-y-3">
              <div className="text-violet-600 flex justify-center">{feature.icon}</div>
              <h3 className="text-lg font-bold text-slate-900 font-display">{feature.title}</h3>
              <p className="text-slate-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <a
            href={githubUrl}
            className="inline-flex items-center gap-2 bg-slate-900 text-white rounded-xl px-6 py-3 font-semibold hover:bg-slate-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            {ctaText}
          </a>
          <a
            href={npmUrl}
            className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-violet-300 text-slate-700 rounded-xl px-6 py-3 font-semibold transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M0 0v24h24v-24h-24zm6.168 20.16v-14.32h5.832v11.52h2.88v-11.52h2.952v14.32h-11.664z" />
            </svg>
            npm
          </a>
        </div>
      </div>
    </SectionContainer>
  );
}
