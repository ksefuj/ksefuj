/**
 * Bundled XSD schemas for browser validation
 *
 * This module provides a browser-compatible way to access Polish Ministry of Finance
 * XSD schemas without CORS issues. All schemas are bundled as static data.
 */

import { BUNDLED_SCHEMAS, SCHEMA_URLS as URLS } from "./schemas-data.js";

export const SCHEMA_URLS = URLS;

/**
 * Get bundled schemas - works in both Node.js and browser without network requests
 */
export async function getBundledSchemas(): Promise<Record<string, string>> {
  // Return pre-bundled schemas - no network requests needed!
  return { ...BUNDLED_SCHEMAS };
}
