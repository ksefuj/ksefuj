/**
 * @ksefuj/validator - Exchange-rate reference date selection tests
 *
 * Art. 31a ust. 1 (tax obligation date) vs ust. 2 (issue date).
 */

import { describe, expect, it } from "vitest";
import { rateReferenceCandidates, resolveRateReference } from "../currency-date.js";

describe("resolveRateReference", () => {
  it("uses the tax point when the invoice is issued after it (ust. 1)", () => {
    // Monthly service for July 2026, invoiced 5 Aug
    expect(resolveRateReference("2026-08-05", "2026-07-31")).toEqual({
      date: "2026-07-31",
      rule: "tax_point",
    });
  });

  it("uses the issue date when the invoice precedes the tax point (ust. 2)", () => {
    expect(resolveRateReference("2026-07-20", "2026-07-31")).toEqual({
      date: "2026-07-20",
      rule: "issue_date",
    });
  });

  it("uses the tax point when it falls on the issue date", () => {
    // ust. 2 requires the invoice to be issued strictly before the tax obligation arises
    expect(resolveRateReference("2026-07-31", "2026-07-31")).toEqual({
      date: "2026-07-31",
      rule: "tax_point",
    });
  });

  it("falls back to the issue date when the tax point is unknown, without claiming ust. 2", () => {
    expect(resolveRateReference("2026-08-05", null)).toEqual({
      date: "2026-08-05",
      rule: "issue_date_assumed",
    });
    expect(resolveRateReference("2026-08-05", undefined)).toEqual({
      date: "2026-08-05",
      rule: "issue_date_assumed",
    });
  });

  it("uses the tax point when the issue date is unknown", () => {
    expect(resolveRateReference(null, "2026-07-31")).toEqual({
      date: "2026-07-31",
      rule: "tax_point",
    });
  });

  it("returns null when neither date is known", () => {
    expect(resolveRateReference(null, null)).toBeNull();
    expect(resolveRateReference("", "")).toBeNull();
  });
});

describe("rateReferenceCandidates", () => {
  it("offers the issue date as an alternative when the tax point is earlier", () => {
    // Art. 19a ust. 5 pkt 4 (media, rental, leasing) puts the tax point on the
    // issue date for the same OkresFa-shaped invoices, and the XML cannot tell them apart
    expect(rateReferenceCandidates("2026-08-05", "2026-07-31")).toEqual([
      { date: "2026-07-31", rule: "tax_point" },
      { date: "2026-08-05", rule: "issue_date" },
    ]);
  });

  it("offers only the issue date under ust. 2", () => {
    expect(rateReferenceCandidates("2026-07-20", "2026-07-31")).toEqual([
      { date: "2026-07-20", rule: "issue_date" },
    ]);
  });

  it("does not duplicate the reference when both dates coincide", () => {
    expect(rateReferenceCandidates("2026-07-31", "2026-07-31")).toEqual([
      { date: "2026-07-31", rule: "tax_point" },
    ]);
  });

  it("offers only the tax point when the issue date is unknown", () => {
    expect(rateReferenceCandidates(null, "2026-07-31")).toEqual([
      { date: "2026-07-31", rule: "tax_point" },
    ]);
  });

  it("offers only the issue date when no tax point is known", () => {
    expect(rateReferenceCandidates("2026-08-05", null)).toEqual([
      { date: "2026-08-05", rule: "issue_date_assumed" },
    ]);
  });

  it("returns nothing when no date is known", () => {
    expect(rateReferenceCandidates(null, null)).toEqual([]);
  });
});
