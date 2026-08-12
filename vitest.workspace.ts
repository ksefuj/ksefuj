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
      // Node environment — the web tests cover pure logic. Add jsdom as a devDependency
      // here if component tests are ever introduced; it is not currently installed.
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
