"use client";

import type { ComponentProps } from "react";
import Link from "next/link";
import * as amplitude from "@amplitude/analytics-browser";

type EventProps = Record<string, string | number>;

interface TrackedLinkProps extends ComponentProps<typeof Link> {
  /** Amplitude event fired on click. Props must be slugs, topics, locale and positions only. */
  event?: string;
  eventProps?: EventProps;
}

/**
 * next/link with an optional Amplitude click event. Lets server-rendered cards and chips
 * report clicks without turning whole pages into client components.
 */
export function TrackedLink({ event, eventProps, onClick, ...props }: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        if (event) {
          amplitude.track(event, eventProps);
        }
        onClick?.(e);
      }}
    />
  );
}
