import type { ReactElement } from "react";
import { readFileSync } from "fs";
import { join } from "path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface OgImageProps {
  title: string;
}

// Load the pre-generated SVG logo (JetBrains Mono text converted to paths — no font needed at runtime).
// Regenerate with: node apps/web/scripts/generate-logo-svg.mjs
//
// Lazy-loaded: reading at module level would crash the serverless function bundle on first import
// because @vercel/nft cannot trace dynamic process.cwd() paths. The file is explicitly included
// via outputFileTracingIncludes in next.config.js.
let _logoDataUrl: string | undefined;
function getLogoDataUrl() {
  if (!_logoDataUrl) {
    const svg = readFileSync(join(process.cwd(), "public/logo-og.svg"));
    _logoDataUrl = `data:image/svg+xml;base64,${svg.toString("base64")}`;
  }
  return _logoDataUrl;
}

export function ogLayout({ title }: OgImageProps): ReactElement {
  const titleSize = title.length > 50 ? "56px" : "72px";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "#FAFAF8",
        padding: "80px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          width: "64px",
          height: "7px",
          backgroundColor: "#8b5cf6",
          borderRadius: "4px",
          marginBottom: "48px",
        }}
      />

      <div
        style={{
          fontSize: titleSize,
          fontWeight: 800,
          color: "#0f172a",
          lineHeight: 1.15,
          flex: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        {title}
      </div>

      <img
        src={getLogoDataUrl()}
        width={263}
        height={60}
        alt="ksefuj.to"
        style={{ marginTop: "40px" }}
      />
    </div>
  );
}
