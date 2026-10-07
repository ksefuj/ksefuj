import { getTranslations } from "next-intl/server";
import { localeParams } from "@/lib/og-static-params";
import { contentType, ogResponse, size } from "@/lib/og-image";

export { size, contentType };

export const generateStaticParams = localeParams;

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function Image({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "validatorPage" });

  return ogResponse({ title: t("ogImageTitle"), patternKey: "validator" });
}
