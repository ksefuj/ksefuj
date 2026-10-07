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

const base = "inline-block rounded-full px-4 py-1.5 text-sm font-medium transition-colors border";
const active = "bg-violet-600 text-white border-violet-600";
const inactive =
  "bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-700";

/** Server-rendered filter chips. Plain links, so filtered views work without client JS. */
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
