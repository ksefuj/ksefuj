"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface BlogFilterProps {
  labelAll: string;
  labelTranslatedOnly: string;
}

export function BlogFilter({ labelAll, labelTranslatedOnly }: BlogFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("filter") ?? "all";

  function setFilter(value: "all" | "translated") {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("filter");
    } else {
      params.set("filter", value);
    }
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  const base =
    "rounded-full px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer border";
  const active = "bg-violet-600 text-white border-violet-600";
  const inactive =
    "bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-700";

  return (
    <div className="flex gap-2" role="group">
      <button
        onClick={() => setFilter("all")}
        className={cn(base, current === "all" ? active : inactive)}
        aria-pressed={current === "all"}
      >
        {labelAll}
      </button>
      <button
        onClick={() => setFilter("translated")}
        className={cn(base, current === "translated" ? active : inactive)}
        aria-pressed={current === "translated"}
      >
        {labelTranslatedOnly}
      </button>
    </div>
  );
}
