import { describe, expect, it } from "vitest";
import { isValidKsefNumber } from "../src";

describe("isValidKsefNumber", () => {
  it("accepts the MF example", () => {
    expect(isValidKsefNumber("5265877635-20250826-0100001AF629-AF")).toBe(true);
  });
  it("accepts 5214567890-20260401-000001000001-49", () => {
    expect(isValidKsefNumber("5214567890-20260401-000001000001-49")).toBe(true);
  });
  it("rejects the 36-character layout (the MF document only defines 35 characters)", () => {
    expect(isValidKsefNumber("5214567890-20260401-000001-000001-49")).toBe(false);
    expect(isValidKsefNumber("5214567890-20260401-000001-000001-01")).toBe(false);
  });
  it("rejects a wrong checksum", () => {
    expect(isValidKsefNumber("5265877635-20250826-0100001AF629-AE")).toBe(false);
    expect(isValidKsefNumber("5214567890-20260401-000001000001-01")).toBe(false);
  });
  it("rejects malformed values", () => {
    expect(isValidKsefNumber("")).toBe(false);
    expect(isValidKsefNumber("5265877635-20250826-0100001af629-AF")).toBe(false);
    expect(isValidKsefNumber("5265877635-20251326-0100001AF629-AF")).toBe(false);
    expect(isValidKsefNumber(" 5265877635-20250826-0100001AF629-AF")).toBe(false);
  });
});
