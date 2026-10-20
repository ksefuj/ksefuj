import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HomeSectionProps {
  id?: string;
  /** Visible section heading; also names the section landmark. */
  title?: string;
  /** Optional element placed on the right of the heading row (e.g. a link). */
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Homepage section: hairline top border, left-aligned heading, shared container width. */
export function HomeSection({ id, title, aside, children, className }: HomeSectionProps) {
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={cn("border-t border-slate-200 py-10 md:py-16", className)}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {title && (
          <div className="mb-5 flex flex-wrap items-baseline md:mb-8 justify-between gap-x-6 gap-y-2">
            <h2
              id={headingId}
              className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
            >
              {title}
            </h2>
            {aside}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

/**
 * Left rail shared by every row-list section (calendar, recent). The width is spelled out as
 * literal class strings because Tailwind only generates classes it can find in the source: change
 * `12rem` in both places together.
 */
export const HOME_RAIL_2 = "md:grid-cols-[12rem_1fr]";
export const HOME_RAIL_3 = "md:grid-cols-[12rem_1fr_14rem]";

/** Text link style shared by homepage sections. */
export const homeLinkClasses =
  "text-violet-700 underline underline-offset-4 decoration-violet-300 hover:text-violet-800 hover:decoration-violet-700";
