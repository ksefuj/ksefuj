"use client";

import { useEffect, useState } from "react";

interface RotatingWordProps {
  /** First word is the default shown on the server and first client render. */
  words: readonly string[];
  /** Text that follows the word (e.g. the closing full stop); kept glued to it. */
  suffix?: string;
}

const INITIAL_HOLD_MS = 2500;
const HOLD_MS = 2200;
const DELETE_MS = 45;
const TYPE_MS = 80;

export function RotatingWord({ words, suffix = "" }: RotatingWordProps) {
  const [text, setText] = useState(words[0] ?? "");

  useEffect(() => {
    if (words.length < 2) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;
    let index = 0;

    const typeNext = () => {
      index = (index + 1) % words.length;
      const chars = Array.from(words[index]);
      let n = 0;
      const step = () => {
        if (cancelled) {
          return;
        }
        n += 1;
        setText(chars.slice(0, n).join(""));
        timer = setTimeout(
          n < chars.length ? step : deleteCurrent,
          n < chars.length ? TYPE_MS : HOLD_MS,
        );
      };
      step();
    };

    function deleteCurrent() {
      const chars = Array.from(words[index]);
      let n = chars.length;
      const step = () => {
        if (cancelled) {
          return;
        }
        n -= 1;
        setText(chars.slice(0, n).join(""));
        timer = setTimeout(n > 0 ? step : typeNext, DELETE_MS);
      };
      step();
    }

    timer = setTimeout(deleteCurrent, INITIAL_HOLD_MS);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [words]);

  return (
    <span className="inline-grid whitespace-nowrap align-baseline">
      {words.map((word) => (
        <span key={word} aria-hidden="true" className="invisible [grid-area:1/1]">
          {word}
          {suffix}
        </span>
      ))}
      <span aria-hidden="true" className="text-violet-600 [grid-area:1/1]">
        {text}
        <span className="rotating-caret ml-0.5 inline-block h-[0.9em] w-0.5 translate-y-[0.1em] bg-violet-500 align-baseline" />
        <span className="text-slate-900">{suffix}</span>
      </span>
    </span>
  );
}
