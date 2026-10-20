import type { ReactNode } from "react";

interface HeroSectionProps {
  title: string;
  lead: string;
  /** The compact drop zone, placed beside the text on large screens. */
  children?: ReactNode;
}

/** Masthead: H1 and one plain sentence on the left, the validator drop zone on the right. */
export function HeroSection({ title, lead, children }: HeroSectionProps) {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-4">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            {title}
          </h1>
          <p className="max-w-xl text-lg text-slate-600">{lead}</p>
        </div>
        {children && <div>{children}</div>}
      </div>
    </section>
  );
}
