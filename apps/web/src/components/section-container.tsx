import React from "react";
import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  background?: "white" | "violet" | "amber" | "slate";
  wide?: boolean;
}

export function SectionContainer({
  children,
  className,
  background = "white",
  wide = false,
}: SectionContainerProps) {
  const bgClasses = {
    white: "",
    violet: "bg-violet-50/50",
    amber: "bg-amber-50/50",
    slate: "bg-slate-50",
  };

  return (
    <section className={cn("py-16 md:py-24", bgClasses[background], className)}>
      <div className={cn("mx-auto px-4 md:px-6", wide ? "max-w-6xl" : "max-w-4xl")}>{children}</div>
    </section>
  );
}
