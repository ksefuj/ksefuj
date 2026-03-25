import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ locale: string }>;
}

const faqContent: Record<string, { title: string; description: string; badge: string }> = {
  pl: {
    title: "FAQ — Najczęstsze pytania o KSeF",
    description: "Odpowiedzi na 40+ pytań o KSeF, e-faktury i FA(3).",
    badge: "Pytania i odpowiedzi",
  },
  en: {
    title: "FAQ — KSeF Questions Answered",
    description: "Answers to 40+ questions about KSeF, e-invoicing and FA(3).",
    badge: "Questions & Answers",
  },
  uk: {
    title: "FAQ — Питання про KSeF",
    description: "Відповіді на 40+ питань про KSeF, е-рахунки та FA(3).",
    badge: "Питання і відповіді",
  },
};

export default async function Image({ params }: Props) {
  const { locale } = await params;
  const content = faqContent[locale] ?? faqContent.pl;

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

      <div style={{ display: "flex", marginBottom: "28px" }}>
        <div
          style={{
            fontSize: "20px",
            color: "#7c3aed",
            backgroundColor: "#ede9fe",
            padding: "6px 18px",
            borderRadius: "999px",
            fontWeight: 600,
          }}
        >
          {content.badge}
        </div>
      </div>

      <div
        style={{
          fontSize: "64px",
          fontWeight: 800,
          color: "#0f172a",
          lineHeight: 1.1,
          marginBottom: "32px",
          flex: 1,
        }}
      >
        {content.title}
      </div>

      <div
        style={{
          fontSize: "26px",
          color: "#475569",
          lineHeight: 1.4,
          marginBottom: "52px",
        }}
      >
        {content.description}
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
