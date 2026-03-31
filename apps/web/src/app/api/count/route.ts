import { kv } from "@vercel/kv";

export async function POST(request: Request) {
  try {
    const { fileCount, errorCount, warningCount } = await request
      .json()
      .catch(() => ({ fileCount: 1, errorCount: 0, warningCount: 0 }));
    await Promise.all([
      fileCount > 0 && kv.incrby("validations:total", fileCount),
      errorCount > 0 && kv.incrby("issues:errors", errorCount),
      warningCount > 0 && kv.incrby("issues:warnings", warningCount),
    ]);
  } catch {
    // Counter failure must never affect users — swallow silently
  }
  return Response.json({ ok: true });
}
