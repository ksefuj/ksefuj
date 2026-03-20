import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "warning" | "error" | "info" | "neutral";
  className?: string;
}

export function Badge({ children, variant = "neutral", className }: BadgeProps) {
  const variants = {
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border border-amber-200",
    error: "bg-rose-50 text-rose-700 border border-rose-200",
    info: "bg-violet-50 text-violet-700 border border-violet-200",
    neutral: "bg-slate-100 text-slate-600 border border-slate-200",
  };

  return (
    <span
      className={cn("rounded-full px-3 py-1 text-xs font-semibold", variants[variant], className)}
    >
      {children}
    </span>
  );
}
