import React from "react";
import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  background?: "white" | "violet" | "amber" | "slate";
}

export function SectionContainer({
  children,
  className,
  background = "white",
}: SectionContainerProps) {
  const bgClasses = {
    white: "",
    violet: "bg-violet-50/50",
    amber: "bg-amber-50/50",
    slate: "bg-slate-50",
  };

  return (
    <section className={cn("py-16 md:py-24", bgClasses[background], className)}>
      <div className="max-w-4xl mx-auto px-4 md:px-6">{children}</div>
    </section>
  );
}
