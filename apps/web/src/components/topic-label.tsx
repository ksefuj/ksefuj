import type { CSSProperties } from "react";
import type { ContentTopic } from "@/lib/topics";
import { topicTheme } from "@/lib/topic-theme";
import { cn } from "@/lib/utils";

interface TopicLabelProps {
  topic: ContentTopic | undefined;
  children: string;
  className?: string;
}

/**
 * Topic marker: an 8px dot plus the label, both in the topic accent. Underlines on hover when an
 * ancestor has the `group` class (e.g. a wrapping link).
 */
export function TopicLabel({ topic, children, className }: TopicLabelProps) {
  const style = { "--topic": topicTheme(topic).accent } as CSSProperties;
  return (
    <span
      className={cn("inline-flex items-center gap-1.5 font-medium text-[var(--topic)]", className)}
      style={style}
    >
      <span aria-hidden className="size-2 shrink-0 rounded-full bg-[var(--topic)]" />
      <span className="underline-offset-4 group-hover:underline">{children}</span>
    </span>
  );
}
