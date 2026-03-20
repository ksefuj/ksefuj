"use client";

import { useState } from "react";
import { SectionContainer } from "@/components/section-container";

interface DeveloperSectionProps {
  title: string;
  subtitle: string;
  expandText: string;
  collapseText: string;
  content: {
    cli: {
      title: string;
      description: string;
      commands: { label: string; command: string }[];
    };
    docs: {
      title: string;
      description: string;
      example: string;
    };
    npm: {
      title: string;
      description: string;
      install: string;
      usage: string;
    };
  };
}

export function DeveloperSection({
  title,
  subtitle,
  expandText,
  collapseText,
  content,
}: DeveloperSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <SectionContainer background="slate">
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 font-display">
            {title}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">{subtitle}</p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-violet-600 hover:text-violet-700 font-semibold transition-colors"
          >
            {isExpanded ? collapseText : expandText} →
          </button>
        </div>

        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            {/* CLI */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2 font-display">
                {content.cli.title}
              </h3>
              <p className="text-slate-600 text-sm mb-4">{content.cli.description}</p>
              <div className="space-y-2">
                {content.cli.commands.map((cmd, index) => (
                  <div key={index}>
                    <p className="text-xs text-slate-500 mb-1">{cmd.label}</p>
                    <div className="bg-slate-900 text-slate-100 rounded-lg p-2 font-mono text-xs">
                      {cmd.command}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* npm Package */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2 font-display">
                {content.npm.title}
              </h3>
              <p className="text-slate-600 text-sm mb-4">{content.npm.description}</p>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Install</p>
                  <div className="bg-slate-900 text-slate-100 rounded-lg p-2 font-mono text-xs">
                    {content.npm.install}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Usage</p>
                  <div className="bg-slate-900 text-slate-100 rounded-lg p-2 font-mono text-xs overflow-x-auto">
                    <pre>{content.npm.usage}</pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Documentation */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2 font-display">
                {content.docs.title}
              </h3>
              <p className="text-slate-600 text-sm mb-4">{content.docs.description}</p>
              <div className="bg-slate-900 text-slate-100 rounded-lg p-2 font-mono text-xs overflow-x-auto">
                <pre>{content.docs.example}</pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
