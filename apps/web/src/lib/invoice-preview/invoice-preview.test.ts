import { describe, expect, it } from "vitest";
import {
  effectiveKsefNumber,
  initialKsefInputState,
  ksefInputReducer,
  type KsefInputState,
  ksefInputStatus,
  ksefNumberNip,
  normalizeKsefNumber,
} from "./ksef-input";
import { INLINE_PREVIEW_QUERY, supportsInlinePreview } from "./inline-preview";
import { pdfFileNameFromInvoiceNumber } from "./pdf-filename";
import { isPreviewableResult } from "./previewable";

describe("pdfFileNameFromInvoiceNumber", () => {
  it("prefixes the number with faktura-", () => {
    expect(pdfFileNameFromInvoiceNumber("FV-2026-10-014")).toBe("faktura-FV-2026-10-014.pdf");
  });

  it("replaces slashes and spaces", () => {
    expect(pdfFileNameFromInvoiceNumber("FV/2026/10/014")).toBe("faktura-FV-2026-10-014.pdf");
    expect(pdfFileNameFromInvoiceNumber("  FV 14 / 2026 ")).toBe("faktura-FV-14-2026.pdf");
  });

  it("transliterates Polish letters", () => {
    expect(pdfFileNameFromInvoiceNumber("Łódź/ŻÓŁW")).toBe("faktura-Lodz-ZOLW.pdf");
  });

  it("neutralises path traversal and control characters", () => {
    expect(pdfFileNameFromInvoiceNumber("../../etc/passwd")).toBe("faktura-etc-passwd.pdf");
    expect(pdfFileNameFromInvoiceNumber("a\u0000b\n\\c")).toBe("faktura-a-b-c.pdf");
    expect(pdfFileNameFromInvoiceNumber(".hidden")).toBe("faktura-hidden.pdf");
  });

  it("falls back to faktura.pdf", () => {
    expect(pdfFileNameFromInvoiceNumber(null)).toBe("faktura.pdf");
    expect(pdfFileNameFromInvoiceNumber(undefined)).toBe("faktura.pdf");
    expect(pdfFileNameFromInvoiceNumber("   ")).toBe("faktura.pdf");
    expect(pdfFileNameFromInvoiceNumber("///")).toBe("faktura.pdf");
    expect(pdfFileNameFromInvoiceNumber("日本語")).toBe("faktura.pdf");
  });

  it("caps the length", () => {
    const name = pdfFileNameFromInvoiceNumber("A".repeat(300));
    expect(name).toBe(`faktura-${"A".repeat(80)}.pdf`);
  });
});

describe("KSeF number input state machine", () => {
  const VALID = "5214567890-20260401-000001000001-49";
  const isValid = (value: string) => value === VALID;
  const type = (state: KsefInputState, raw: string) =>
    ksefInputReducer(state, { type: "change", raw });

  it("starts empty", () => {
    expect(ksefInputStatus(initialKsefInputState, isValid)).toBe("empty");
    expect(effectiveKsefNumber(initialKsefInputState, isValid)).toBeUndefined();
  });

  it("stays quiet while typing and flags an invalid number only after blur", () => {
    let state = type(initialKsefInputState, "5214567890-2026");
    expect(ksefInputStatus(state, isValid)).toBe("typing");
    state = ksefInputReducer(state, { type: "blur" });
    expect(ksefInputStatus(state, isValid)).toBe("invalid");
    expect(effectiveKsefNumber(state, isValid)).toBeUndefined();
  });

  it("flags an invalid number on submit", () => {
    const state = ksefInputReducer(type(initialKsefInputState, "abc"), { type: "submit" });
    expect(ksefInputStatus(state, isValid)).toBe("invalid");
  });

  it("becomes valid immediately and normalises pasted whitespace and case", () => {
    const state = type(initialKsefInputState, `  ${VALID.toLowerCase()}\n`);
    expect(ksefInputStatus(state, isValid)).toBe("valid");
    expect(effectiveKsefNumber(state, isValid)).toBe(VALID);
  });

  it("returns to empty when cleared", () => {
    let state = type(initialKsefInputState, VALID);
    state = type(state, "");
    expect(ksefInputStatus(state, isValid)).toBe("empty");
    expect(effectiveKsefNumber(state, isValid)).toBeUndefined();
  });

  it("reports a seller NIP mismatch for that number only", () => {
    let state = type(initialKsefInputState, VALID);
    state = ksefInputReducer(state, {
      type: "mismatch",
      mismatch: { number: VALID, ksefNip: "5214567890", sellerNip: "1234563218" },
    });
    expect(ksefInputStatus(state, isValid)).toBe("mismatch");
    expect(effectiveKsefNumber(state, isValid)).toBeUndefined();
    // Any edit clears the mismatch
    state = type(state, VALID.slice(0, -1));
    expect(state.mismatch).toBeNull();
    state = type(state, VALID);
    expect(ksefInputStatus(state, isValid)).toBe("valid");
  });

  it("resets", () => {
    const state = ksefInputReducer(type(initialKsefInputState, "x"), { type: "reset" });
    expect(state).toEqual(initialKsefInputState);
  });

  it("extracts the NIP prefix", () => {
    expect(ksefNumberNip(VALID)).toBe("5214567890");
    expect(ksefNumberNip("abc")).toBe("abc");
    expect(normalizeKsefNumber(" 12 ab ")).toBe("12AB");
  });
});

describe("supportsInlinePreview", () => {
  it("is false without matchMedia (SSR)", () => {
    expect(supportsInlinePreview(undefined)).toBe(false);
  });

  it("asks for a wide screen with a fine pointer", () => {
    const queries: string[] = [];
    const desktop = (query: string) => {
      queries.push(query);
      return { matches: true };
    };
    expect(supportsInlinePreview(desktop)).toBe(true);
    expect(queries).toEqual([INLINE_PREVIEW_QUERY]);
    expect(INLINE_PREVIEW_QUERY).toContain("min-width: 768px");
    expect(INLINE_PREVIEW_QUERY).toContain("pointer: fine");
  });

  it("is false on phones and touch devices", () => {
    expect(supportsInlinePreview(() => ({ matches: false }))).toBe(false);
  });
});

describe("isPreviewableResult", () => {
  const issue = (code: string, originalMessage?: string) => ({
    code: { code },
    context: originalMessage ? { metadata: { originalMessage } } : undefined,
  });

  it("accepts a clean result and a result with ordinary validation issues", () => {
    expect(isPreviewableResult({ issues: [] })).toBe(true);
    expect(
      isPreviewableResult({ issues: [issue("ELEMENT_NOT_ALLOWED"), issue("P15_MISMATCH")] }),
    ).toBe(true);
  });

  it("rejects malformed XML, wrong namespace and unknown roots", () => {
    expect(isPreviewableResult({ issues: [issue("MALFORMED_XML")] })).toBe(false);
    expect(isPreviewableResult({ issues: [issue("WRONG_NAMESPACE")] })).toBe(false);
    expect(
      isPreviewableResult({
        issues: [
          issue(
            "SCHEMA_VALIDATION_FAILED",
            "No matching global declaration available for the validation root",
          ),
        ],
      }),
    ).toBe(false);
  });

  it("rejects a missing result", () => {
    expect(isPreviewableResult(null)).toBe(false);
    expect(isPreviewableResult(undefined)).toBe(false);
  });
});
