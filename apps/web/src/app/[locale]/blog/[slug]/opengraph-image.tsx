import { getArticleCard } from "@/lib/og-card";
import { articleParams } from "@/lib/og-static-params";
import { contentType, ogResponse, size } from "@/lib/og-image";

export { size, contentType };

export const generateStaticParams = articleParams("blog");

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function Image({ params }: Props) {
  const { locale, slug } = await params;
  const result = await getArticleCard(locale, "blog", slug);

  return ogResponse({
    title: result?.title ?? "ksefuj.to",
    patternKey: result?.patternKey ?? slug,
    topicLabel: result?.topicLabel,
  });
}
