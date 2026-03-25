import { ImageResponse } from "next/og";
import { getContentItemWithFallback } from "@/lib/content";
import { contentType, ogLayout, size } from "@/lib/og-image";

export { size, contentType };

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function Image({ params }: Props) {
  const { locale, slug } = await params;
  const result = await getContentItemWithFallback(locale, "docs", slug);

  const title = result?.item.frontmatter.title ?? "ksefuj.to";
  return new ImageResponse(ogLayout({ title }), size);
}
