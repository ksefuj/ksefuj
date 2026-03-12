import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "ksefuj.to — walidator KSeF FA(3)",
  description:
    "Darmowy walidator faktur KSeF FA(3). Wrzuć XML, sprawdź błędy. Wszystko client-side — Twoje dane nie opuszczają przeglądarki.",
  openGraph: {
    title: "ksefuj.to — walidator KSeF FA(3)",
    description: "Darmowy walidator faktur KSeF. Client-side, bez logowania.",
    url: "https://ksefuj.to",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pl">
      <body className="bg-stone-950 text-stone-100 antialiased">{children}</body>
    </html>
  );
}
