import type { CSSProperties, ReactNode } from "react";
import type { ContentTopic } from "@/lib/topics";
import { topicTheme } from "@/lib/topic-theme";
import { cn } from "@/lib/utils";

interface CoverTileProps {
  topic: ContentTopic | undefined;
  /** Uppercase label at the top (topic name). */
  label?: string;
  /** Footer text at the bottom right (date, reading time). */
  meta?: ReactNode;
  /** The article heading and summary, rendered as the tile's real text. */
  children: ReactNode;
  className?: string;
}

/**
 * On-site version of the dark topic cover (same look as the OG images). It is the whole lead
 * story: label, heading, summary and footer live inside one card so it reads as one article.
 * Not positioned on purpose: a stretched link inside should cover the whole row.
 */
export function CoverTile({ topic, label, meta, children, className }: CoverTileProps) {
  const style = { "--cover": topicTheme(topic).cover } as CSSProperties;

  return (
    <div
      style={style}
      className={cn(
        "flex min-h-[16rem] flex-col gap-4 rounded-xl bg-[var(--cover)] p-6 text-white md:min-h-[20rem] md:p-10",
        className,
      )}
    >
      {label && (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">{label}</p>
      )}
      {children}
      <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4">
        <span className="inline-flex items-center font-mono text-base">
          <span className="font-bold text-white">ksefuj</span>
          <span
            aria-hidden
            className="mx-[0.1em] inline-block size-[0.4em] rounded-full bg-violet-500"
          />
          <span className="font-light text-white/50">to</span>
        </span>
        {meta && <span className="text-sm text-white/70">{meta}</span>}
      </div>
    </div>
  );
}
