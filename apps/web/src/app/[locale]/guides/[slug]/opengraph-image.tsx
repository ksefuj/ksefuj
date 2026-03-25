import { ImageResponse } from "next/og";
import { getContentItemWithFallback } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function Image({ params }: Props) {
  const { locale, slug } = await params;
  const result = await getContentItemWithFallback(locale, "guides", slug);

  const title = result?.item.frontmatter.title ?? "ksefuj.to";
  const description = result?.item.frontmatter.description ?? "";
  const tags = result?.item.frontmatter.tags ?? [];

  return new ImageResponse(
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
      <div style={{ display: "flex", marginBottom: "40px" }}>
        <div
          style={{
            width: "56px",
            height: "6px",
            backgroundColor: "#8b5cf6",
            borderRadius: "3px",
          }}
        />
      </div>

      {tags.length > 0 && (
        <div style={{ display: "flex", gap: "12px", marginBottom: "28px" }}>
          {tags.slice(0, 3).map((tag) => (
            <div
              key={tag}
              style={{
                fontSize: "20px",
                color: "#7c3aed",
                backgroundColor: "#ede9fe",
                padding: "6px 18px",
                borderRadius: "999px",
                fontWeight: 600,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          fontSize: title.length > 60 ? "52px" : "64px",
          fontWeight: 800,
          color: "#0f172a",
          lineHeight: 1.1,
          marginBottom: "32px",
          flex: 1,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: "26px",
          color: "#475569",
          lineHeight: 1.4,
          marginBottom: "52px",
        }}
      >
        {description.length > 130 ? `${description.slice(0, 130)}…` : description}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <div style={{ fontSize: "30px", fontWeight: 700, color: "#0f172a" }}>ksefuj</div>
        <div style={{ fontSize: "30px", fontWeight: 700, color: "#8b5cf6" }}>●</div>
        <div style={{ fontSize: "30px", fontWeight: 300, color: "#94a3b8" }}>to</div>
      </div>
    </div>,
    { ...size },
  );
}
