import { TrackedLink } from "@/components/tracked-link";
import { cn } from "@/lib/utils";

export interface FilterChip {
  key: string;
  label: string;
  href: string;
  active: boolean;
  event?: string;
  eventProps?: Record<string, string | number>;
}

interface FilterChipsProps {
  chips: FilterChip[];
  label: string;
}

const base = "inline-block rounded-full px-3.5 py-1 text-sm font-medium transition-colors border";
const active = "bg-slate-900 text-white border-slate-900";
const inactive =
  "bg-transparent text-slate-600 border-slate-300 hover:border-slate-500 hover:text-slate-900";

/** Filter chips. Plain links that update the query string; the listing reads it client-side. */
export function FilterChips({ chips, label }: FilterChipsProps) {
  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <li key={chip.key}>
            <TrackedLink
              href={chip.href}
              scroll={false}
              aria-current={chip.active ? "true" : undefined}
              className={cn(base, chip.active ? active : inactive)}
              event={chip.event}
              eventProps={chip.eventProps}
            >
              {chip.label}
            </TrackedLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
