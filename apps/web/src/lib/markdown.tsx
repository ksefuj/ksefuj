import React from "react";

/**
 * Simple inline markdown renderer for validation messages
 * Supports: `code`, **bold**, and preserves line breaks
 */
export function renderMarkdown(text: string): React.ReactNode {
  if (!text) {
    return null;
  }

  // Split by markdown patterns while preserving them
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);

  return parts
    .map((part, index) => {
      if (!part) {
        return null;
      }

      // Handle inline code
      if (part.startsWith("`") && part.endsWith("`")) {
        const content = part.slice(1, -1);
        return (
          <code
            key={index}
            className="font-mono bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-xs"
          >
            {content}
          </code>
        );
      }

      // Handle bold text
      if (part.startsWith("**") && part.endsWith("**")) {
        const content = part.slice(2, -2);
        return (
          <strong key={index} className="font-semibold text-slate-800">
            {content}
          </strong>
        );
      }

      // Regular text
      return <span key={index}>{part}</span>;
    })
    .filter(Boolean);
}

/**
 * Wrapper component for rendering markdown text
 */
interface MarkdownTextProps {
  children: string;
  className?: string;
}

export function MarkdownText({ children, className = "" }: MarkdownTextProps) {
  return <span className={className}>{renderMarkdown(children)}</span>;
}
