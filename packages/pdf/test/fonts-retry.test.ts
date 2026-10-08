import { describe, expect, it, vi } from "vitest";
import type * as Fonts from "../src/fonts";

const loader = vi.hoisted(() => ({ failures: 1, calls: 0 }));

vi.mock("../src/fonts", async (importOriginal) => {
  const original = await importOriginal<typeof Fonts>();
  return {
    ...original,
    loadRobotoVfs: async () => {
      loader.calls++;
      if (loader.failures-- > 0) {
        throw new Error("chunk load failed");
      }
      return original.loadRobotoVfs();
    },
  };
});

describe("font loading", () => {
  it("does not cache a failed load: the next render retries and succeeds", async () => {
    const { renderInvoicePdf } = await import("../src");
    const { readExample } = await import("./helpers");
    const bytes = readExample("FA_3_Przykład_1.xml");

    await expect(renderInvoicePdf(bytes)).rejects.toThrow("chunk load failed");
    const result = await renderInvoicePdf(bytes);
    expect(result.invoiceType).toBe("VAT");
    expect(loader.calls).toBe(2);

    // Once loaded it stays loaded.
    await renderInvoicePdf(bytes);
    expect(loader.calls).toBe(2);
  });
});
