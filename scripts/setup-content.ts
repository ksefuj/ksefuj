#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Content Setup Script for ksefuj.to
 *
 * Ensures the content directory structure exists so that `next dev` and
 * `next build` don't fail on a fresh checkout. Content files (MDX) are
 * committed directly to git — this script only creates the directories.
 *
 * Usage:
 *   pnpm setup-content             (from monorepo root)
 *   tsx scripts/setup-content.ts   (from monorepo root)
 *
 * Also invoked automatically via package.json `predev` / `prebuild` hooks
 * in apps/web.
 */

import { existsSync, mkdirSync } from "fs";
import { join } from "path";

// When invoked from apps/web as a prebuild/predev hook, process.cwd() is apps/web/.
// When invoked from monorepo root directly, we need to locate apps/web/ ourselves.
function getContentDir(): string {
  const cwd = process.cwd();
  // If we're running from apps/web/, content is ./content
  if (existsSync(join(cwd, "next.config.js"))) {
    return join(cwd, "content");
  }
  // If we're running from monorepo root, content is ./apps/web/content
  return join(cwd, "apps", "web", "content");
}

function ensureDir(dir: string): void {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
    console.log(`  created ${dir}`);
  }
}

function main(): void {
  const contentDir = getContentDir();
  console.log(`Setting up content directories in: ${contentDir}`);

  const locales = ["pl", "en", "uk"];
  const sections = ["blog", "guides", "docs", "faq"];
  for (const locale of locales) {
    for (const section of sections) {
      ensureDir(join(contentDir, locale, section));
    }
  }

  console.log("Content setup complete.");
}

main();
