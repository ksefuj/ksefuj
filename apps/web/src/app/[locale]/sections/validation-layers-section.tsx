import { SectionContainer } from "@/components/section-container";
import { Badge } from "@/components/badge";

interface ValidationLayer {
  badge: string;
  title: string;
  description: string;
  checks: string[];
}

interface ValidationLayersSectionProps {
  title: string;
  subtitle?: string;
  layers: ValidationLayer[];
}

export function ValidationLayersSection({ title, subtitle, layers }: ValidationLayersSectionProps) {
  return (
    <SectionContainer background="white">
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 font-display">
            {title}
          </h2>
          {subtitle && <p className="text-lg text-slate-600 max-w-2xl mx-auto">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {layers.map((layer, index) => (
            <div key={index} className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
              <div className="mb-4">
                <Badge variant={index === 0 ? "info" : "success"}>{layer.badge}</Badge>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 font-display">{layer.title}</h3>
              <p className="text-slate-600 mb-4">{layer.description}</p>
              <ul className="space-y-2">
                {layer.checks.map((check, checkIndex) => (
                  <li key={checkIndex} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-emerald-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-slate-600">{check}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
