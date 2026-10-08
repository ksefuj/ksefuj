// Test-only hook. Not exported from index.ts and not part of the public API.
import type { TDocumentDefinitions } from "pdfmake/interfaces";

/** Registers a callback that receives every pdfmake document definition built by the adapter. */
export async function observeDocDefinitions(
  observer: ((doc: TDocumentDefinitions) => void) | undefined,
): Promise<void> {
  const { setDocDefinitionObserver } = await import("./engine");
  setDocDefinitionObserver(observer);
}
