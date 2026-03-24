"use client";

import type { AnchorHTMLAttributes } from "react";
import { track } from "@vercel/analytics";

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export function ExternalLink({ href, children, ...props }: ExternalLinkProps) {
  const isExternal = typeof href === "string" && /^https?:\/\//.test(href);

  if (!isExternal) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        const domain = new URL(href).hostname;
        track("external_link_clicked", { href, domain });
      }}
      {...props}
    >
      {children}
    </a>
  );
}
