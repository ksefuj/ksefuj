import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  // Package tests
  {
    test: {
      name: "validator",
      root: "./packages/validator",
      include: ["test/**/*.test.ts"],
      exclude: ["test/fixtures.test.ts"], // Moved to integration
    },
  },
  {
    test: {
      name: "web",
      root: "./apps/web",
      include: ["src/**/*.test.{ts,tsx}"],
      environment: "jsdom",
    },
  },
  // Integration tests
  {
    test: {
      name: "integration",
      root: "./",
      include: ["test/integration/**/*.test.ts"],
    },
  },
]);
