import { kv } from "@vercel/kv";
import { feedbackKey, parseArticleRef, parseFeedbackVote } from "@/lib/article-feedback";
import { contentExists } from "@/lib/content";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = parseFeedbackVote(body);
  // Only count votes for published articles, so the API can't be used to fill Redis with junk keys
  if (!parsed || !contentExists(parsed.locale, parsed.section, parsed.slug)) {
    return Response.json({ ok: false }, { status: 400 });
  }
  try {
    await kv.hincrby(feedbackKey(parsed), parsed.vote, 1);
  } catch {
    // Let the client know so it doesn't remember a vote that was never stored
    return Response.json({ ok: false }, { status: 503 });
  }
  return Response.json({ ok: true });
}

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const ref = parseArticleRef({
    section: params.get("section"),
    locale: params.get("locale"),
    slug: params.get("slug"),
  });
  if (!ref) {
    return Response.json({ error: "invalid params" }, { status: 400 });
  }
  let up = 0;
  let down = 0;
  try {
    const counts = await kv.hgetall<{ up?: number | string; down?: number | string }>(
      feedbackKey(ref),
    );
    up = Number(counts?.up ?? 0) || 0;
    down = Number(counts?.down ?? 0) || 0;
  } catch {
    // Fall back to zeros
  }
  return Response.json(
    { up, down },
    { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } },
  );
}
