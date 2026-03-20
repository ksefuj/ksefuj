import React from "react";
import { Badge } from "@/components/badge";

interface HeroSectionProps {
  title: string;
  description: string;
  trustLine?: string;
  children?: React.ReactNode; // For the validator/dropzone
}

export function HeroSection({ title, description, trustLine, children }: HeroSectionProps) {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="text-center space-y-6 mb-12">
          {trustLine && (
            <div className="animate-fade-up">
              <Badge variant="info" className="text-xs">
                {trustLine}
              </Badge>
            </div>
          )}

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 animate-fade-up font-display">
            {title}
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto animate-fade-up font-body">
            {description}
          </p>
        </div>

        {children && (
          <div className="animate-fade-up" style={{ animationDelay: "100ms" }}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
