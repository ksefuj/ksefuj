import type { ReactElement } from "react";
import { readFileSync } from "fs";
import { join } from "path";
import { ImageResponse } from "next/og";
import { topographyDataUrl } from "./og-patterns";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface OgImageProps {
  title: string;
  /** Seeds the topography panel. Use a stable key (PL slug for articles) so locales match. */
  patternKey: string;
  /** Topic badge shown above the title (articles only). */
  topicLabel?: string;
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

function cardTitleSize(title: string): string {
  if (title.length <= 40) {
    return "64px";
  }
  if (title.length <= 70) {
    return "52px";
  }
  return "44px";
}

export function ogLayout({ title, patternKey, topicLabel }: OgImageProps): ReactElement {
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "#FAFAF8",
        fontFamily: '"Plus Jakarta Sans", Inter, sans-serif',
      }}
    >
      <img
        src={topographyDataUrl(patternKey, size.width, size.height)}
        width={size.width}
        height={size.height}
        alt=""
        style={{ position: "absolute", top: 0, left: 0 }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          width: "760px",
          height: "100%",
          padding: "72px",
          paddingRight: "48px",
        }}
      >
        {topicLabel ? (
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                fontSize: "24px",
                fontWeight: 600,
                color: "#6d28d9",
                backgroundColor: "#f5f3ff",
                border: "2px solid #ddd6fe",
                borderRadius: "9999px",
                padding: "8px 24px",
              }}
            >
              {topicLabel}
            </div>
          </div>
        ) : null}

        <div
          style={{
            fontSize: cardTitleSize(title),
            fontWeight: 800,
            color: "#0f172a",
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
            flex: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          {title}
        </div>

        <img src={getLogoDataUrl()} width={263} height={60} alt="ksefuj.to" />
      </div>
    </div>
  );
}

type OgFont = {
  name: string;
  data: Buffer;
  weight: 600 | 800;
  style: "normal";
};

// Static instances (wght 600/800) of Plus Jakarta Sans (display font, Latin + Latin Extended) and
// Inter (glyph fallback for Cyrillic, which Plus Jakarta Sans lacks). Both OFL; see assets/fonts.
// Lazy-loaded and traced via outputFileTracingIncludes, like the logo.
const FONT_FILES: Array<[string, 600 | 800, string]> = [
  ["Plus Jakarta Sans", 800, "PlusJakartaSans-800.ttf"],
  ["Plus Jakarta Sans", 600, "PlusJakartaSans-600.ttf"],
  ["Inter", 800, "Inter-800.ttf"],
  ["Inter", 600, "Inter-600.ttf"],
];
let _fonts: OgFont[] | undefined;
export function getOgFonts(): OgFont[] {
  if (!_fonts) {
    _fonts = FONT_FILES.map(([name, weight, file]) => ({
      name,
      weight,
      style: "normal" as const,
      data: readFileSync(join(process.cwd(), "assets/fonts", file)),
    }));
  }
  return _fonts;
}

/** Renders the share card PNG response (fonts included). */
export function ogResponse(props: OgImageProps): ImageResponse {
  return new ImageResponse(ogLayout(props), { ...size, fonts: getOgFonts() });
}
