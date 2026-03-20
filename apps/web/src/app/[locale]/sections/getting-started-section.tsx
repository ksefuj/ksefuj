import { SectionContainer } from "@/components/section-container";

interface Step {
  number: string;
  title: string;
  description: string;
  code?: string;
}

interface GettingStartedSectionProps {
  title: string;
  subtitle?: string;
  steps: Step[];
}

export function GettingStartedSection({ title, subtitle, steps }: GettingStartedSectionProps) {
  return (
    <SectionContainer background="amber">
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 font-display">
            {title}
          </h2>
          {subtitle && <p className="text-lg text-slate-600 max-w-2xl mx-auto">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-sm">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-display">{step.title}</h3>
              </div>
              <p className="text-slate-600 text-sm mb-3">{step.description}</p>
              {step.code && (
                <div className="bg-slate-900 text-slate-100 rounded-xl p-3 font-mono text-xs overflow-x-auto">
                  {step.code}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
