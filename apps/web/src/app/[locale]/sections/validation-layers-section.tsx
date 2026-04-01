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

const layerIconColor = ["text-amber-500", "text-emerald-500", "text-violet-500"];

const badgeVariant = (index: number): "warning" | "success" | "info" => {
  if (index === 0) {
    return "warning";
  }
  if (index === 1) {
    return "success";
  }
  return "info";
};

function renderBold(text: string) {
  const parts = text.split(/\*\*(.+?)\*\*/);
  if (parts.length === 1) {
    return text;
  }
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-slate-800">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

export function ValidationLayersSection({ title, subtitle, layers }: ValidationLayersSectionProps) {
  return (
    <SectionContainer background="white">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 font-display">
            {title}
          </h2>
          {subtitle && <p className="text-lg text-slate-600 max-w-2xl mx-auto">{subtitle}</p>}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 divide-y md:divide-y-0 md:divide-x divide-slate-100 flex flex-col md:flex-row">
          {layers.map((layer, index) => (
            <div key={index} className="flex-1 p-6">
              <div className="mb-3">
                <Badge variant={badgeVariant(index)}>{layer.badge}</Badge>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 font-display">{layer.title}</h3>
              <p className="text-sm text-slate-500 mb-4 pb-4 border-b border-slate-100">
                {layer.description}
              </p>
              <ul className="space-y-2.5">
                {layer.checks.map((check, checkIndex) => (
                  <li key={checkIndex} className="flex items-start gap-2.5">
                    <svg
                      className={`w-4 h-4 mt-0.5 shrink-0 ${layerIconColor[index]}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-slate-600 leading-5">{renderBold(check)}</span>
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
