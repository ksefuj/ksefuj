import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { contentType, ogLayout, size } from "@/lib/og-image";

export { size, contentType };

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function Image({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "content.docs" });

  return new ImageResponse(ogLayout({ title: t("ogImageTitle") }), size);
}
