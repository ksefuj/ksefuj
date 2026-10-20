import type { ReactNode } from "react";

interface HeroSectionProps {
  eyebrow: string;
  title: string;
  lead: string;
  /** One-line trust strip under the masthead; links to the about section. */
  trust: string;
  /** The slim drop strip, placed beside the text on large screens. */
  children?: ReactNode;
}

/** Masthead: eyebrow, H1 and one plain sentence on the left, the validator drop strip beside it. */
export function HeroSection({ eyebrow, title, lead, trust, children }: HeroSectionProps) {
  return (
    <section className="pb-6 pt-8 md:pb-8 md:pt-12">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid items-end gap-6 lg:grid-cols-[3fr_2fr] lg:gap-14">
          <div>
            <p className="mb-2 text-sm font-medium text-slate-500">{eyebrow}</p>
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              {title}
            </h1>
            <p className="mt-3 max-w-xl text-base text-slate-600 md:text-lg">{lead}</p>
          </div>
          {children && <div>{children}</div>}
        </div>
        <p className="mt-6 text-sm text-slate-500">
          <a href="#about" className="underline-offset-4 hover:text-violet-700 hover:underline">
            {trust}
          </a>
        </p>
      </div>
    </section>
  );
}
