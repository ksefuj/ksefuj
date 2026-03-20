import React from "react";
import { SectionContainer } from "@/components/section-container";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent?: "violet" | "emerald" | "amber";
}

interface FeaturesSectionProps {
  title: string;
  subtitle?: string;
  features: Feature[];
}

export function FeaturesSection({ title, subtitle, features }: FeaturesSectionProps) {
  const accentColors = {
    violet: "border-t-violet-400",
    emerald: "border-t-emerald-400",
    amber: "border-t-amber-400",
  };

  return (
    <SectionContainer background="violet">
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 font-display">
            {title}
          </h2>
          {subtitle && <p className="text-lg text-slate-600 max-w-2xl mx-auto">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl border border-slate-200 p-6 md:p-8 hover:shadow-md transition-shadow duration-200 border-t-4 ${
                feature.accent ? accentColors[feature.accent] : "border-t-slate-200"
              }`}
            >
              <div className="text-violet-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 font-display">
                {feature.title}
              </h3>
              <p className="text-slate-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
