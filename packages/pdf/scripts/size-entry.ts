// Tiny entry for `pnpm --filter @ksefuj/pdf size`: what an app ships when it lazy-loads the package.
// The assignment is a side effect so the bundler keeps the dynamic import (and its chunks).
(globalThis as Record<string, unknown>).loadPdf = (): Promise<typeof import("../src/index")> =>
  import("../src/index");
