import { listContentItems } from "@/lib/content";
import { buildRssFeed } from "@/lib/rss";

export const dynamic = "force-static";

export async function GET() {
  const posts = await listContentItems("pl", "blog");
  const xml = buildRssFeed(posts);
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
