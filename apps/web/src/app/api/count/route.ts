import { kv } from "@vercel/kv";

export async function POST() {
  try {
    await kv.incr("validations:total");
  } catch {
    // Counter failure must never affect users — swallow silently
  }
  return Response.json({ ok: true });
}
