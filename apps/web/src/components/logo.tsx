import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Logo({ size = "md", className }: LogoProps) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl md:text-4xl",
  };

  return (
    <div className={cn("inline-flex items-center font-mono", sizeClasses[size], className)}>
      <span className="font-bold text-slate-900">ksefuj</span>
      <span className="inline-block w-[0.4em] h-[0.4em] rounded-full bg-violet-500 mx-[0.1em]" />
      <span className="font-light text-slate-400">to</span>
    </div>
  );
}
