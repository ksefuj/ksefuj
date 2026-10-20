import type { ReactElement } from "react";
import { readFileSync } from "fs";
import { join } from "path";
import { ImageResponse } from "next/og";
import type { ContentTopic } from "./topics";
import { topicTheme } from "./topic-theme";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface OgImageProps {
  title: string;
  /** Topic of the article; picks the cover colour. Neutral theme when absent. */
  topic?: ContentTopic;
  /** Small uppercase label above the title (translated topic or section name). */
  label?: string;
  /** Small label bottom-right (formatted date or "Guide"). */
  meta?: string;
}

const VIOLET = "#8b5cf6";

function cardTitleSize(title: string): number {
  if (title.length <= 40) {
    return 72;
  }
  if (title.length <= 65) {
    return 64;
  }
  if (title.length <= 90) {
    return 56;
  }
  return 48;
}

export function ogLayout({ title, topic, label, meta }: OgImageProps): ReactElement {
  const theme = topicTheme(topic);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: "72px",
        backgroundColor: theme.cover,
        color: "#ffffff",
        fontFamily: '"Plus Jakarta Sans", Inter, sans-serif',
      }}
    >
      <div
        style={{
          display: "flex",
          height: "32px",
          fontSize: "24px",
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.6)",
        }}
      >
        {label ?? ""}
      </div>

      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          minHeight: 0,
        }}
      >
        <div
          style={{
            display: "block",
            fontSize: `${cardTitleSize(title)}px`,
            fontWeight: 800,
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
            lineClamp: 4,
          }}
        >
          {title}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "32px",
        }}
      >
        <div style={{ display: "flex", fontWeight: 800, letterSpacing: "-0.02em" }}>
          <span>ksefuj</span>
          <div
            style={{
              width: "16px",
              flexShrink: 0,
              height: "16px",
              borderRadius: "9999px",
              backgroundColor: VIOLET,
              margin: "0 4px",
              alignSelf: "center",
            }}
          />
          <span style={{ color: "rgba(255,255,255,0.5)" }}>to</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "24px",
            fontWeight: 600,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          {meta ?? ""}
        </div>
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
// Lazy-loaded and traced via outputFileTracingIncludes.
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
