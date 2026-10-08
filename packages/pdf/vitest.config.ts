import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@shared": fileURLToPath(new URL("./vendor/ksef-pdf-generator/src/shared", import.meta.url)),
    },
  },
  test: {
    name: "pdf",
    include: ["test/**/*.test.ts"],
    testTimeout: 60_000,
  },
});
