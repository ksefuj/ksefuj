import { getArticleCard } from "@/lib/og-card";
import { articleParams } from "@/lib/og-static-params";
import { contentType, ogResponse, size } from "@/lib/og-image";

export { size, contentType };

export const generateStaticParams = articleParams("docs");

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function Image({ params }: Props) {
  const { locale, slug } = await params;
  const result = await getArticleCard(locale, "docs", slug);

  return ogResponse({
    title: result?.title ?? "ksefuj.to",
    patternKey: result?.patternKey ?? `docs/${slug}`,
    topicLabel: result?.topicLabel,
  });
}
