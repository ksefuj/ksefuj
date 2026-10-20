import type { CSSProperties, ReactNode } from "react";
import type { ContentTopic } from "@/lib/topics";
import { topicTheme } from "@/lib/topic-theme";
import { cn } from "@/lib/utils";

interface CoverTileProps {
  size: "lg" | "sm";
  topic: ContentTopic | undefined;
  /** Uppercase label at the top (topic name; short form for `sm`). */
  label?: string;
  /** `lg` only: small label at the bottom right (date or "Guide"). */
  meta?: string;
  /** `lg` only: the article heading, rendered as the tile's real text. */
  children?: ReactNode;
  className?: string;
}

/**
 * On-site version of the dark topic cover. `lg` carries the article title (so the title is not
 * repeated next to it); `sm` is a decorative list thumbnail and is hidden from assistive tech.
 * Not positioned on purpose: a stretched link inside `lg` should cover the whole row.
 */
export function CoverTile({ size, topic, label, meta, children, className }: CoverTileProps) {
  const style = { "--cover": topicTheme(topic).cover } as CSSProperties;
  const large = size === "lg";

  return (
    <div
      aria-hidden={large ? undefined : true}
      style={style}
      className={cn(
        "flex aspect-[1200/630] flex-col justify-between rounded-xl bg-[var(--cover)] text-white",
        large ? "gap-3 p-4 sm:p-5 lg:p-7" : "p-2.5",
        className,
      )}
    >
      {label && (
        <p
          className={cn(
            "font-semibold uppercase text-white/60",
            large ? "text-xs tracking-[0.18em]" : "text-[0.6rem] leading-none tracking-[0.12em]",
          )}
        >
          {label}
        </p>
      )}
      {large && children}
      <div className="mt-auto flex items-end justify-between gap-3 font-mono">
        <span className={cn("inline-flex items-center", large ? "text-base" : "text-[0.65rem]")}>
          {large && <span className="font-bold text-white">ksefuj</span>}
          <span
            aria-hidden
            className={cn(
              "inline-block rounded-full bg-violet-500",
              large ? "mx-[0.1em] size-[0.4em]" : "size-2",
            )}
          />
          {large && <span className="font-light text-white/50">to</span>}
        </span>
        {large && meta && <span className="text-xs text-white/60">{meta}</span>}
      </div>
    </div>
  );
}
