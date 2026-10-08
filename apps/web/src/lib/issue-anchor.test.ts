import { describe, expect, it } from "vitest";
import type { ValidationIssue } from "@ksefuj/validator";
import { extractHeadings } from "./content";
import { checkIssueAnchors, issueAnchorKey, resolveIssueHelpHref } from "./issue-anchor";

function invalid(
  metadata: Record<string, unknown>,
  element?: string,
  code = "INVALID_ELEMENT_VALUE",
  domain: "xsd" | "semantic" = "xsd",
): ValidationIssue {
  return {
    code: { domain, category: "schema", code, severity: "error" },
    context: { location: { element }, metadata },
    message: "",
    fixSuggestions: [],
  };
}

describe("issueAnchorKey", () => {
  it.each([
    [{ facet: "pattern", typeName: "TKwotowy" }, "P_13_1", "amount"],
    [{ facet: "pattern", typeName: "TKwotowy2" }, "P_9A", "amount"],
    [{ facet: "pattern", typeName: "TDataT" }, "P_1", "date"],
    [{ facet: "pattern", typeName: "TData" }, "P_6", "date"],
    [{ facet: "pattern" }, "DataWytworzeniaFa", "date"],
    [{ facet: "pattern", typeName: "TNrNIP" }, "NIP", "nip"],
    [{ facet: "pattern" }, "NIP", "nip"],
    [{ facet: "enumeration", typeName: "TKodKraju" }, "KodKraju", "countryCode"],
    [{ facet: "pattern" }, "KodKraju", "countryCode"],
    [{ facet: "maxLength", typeName: "TZnakowy" }, "P_2", "length"],
    [{ facet: "minLength" }, "P_2", "length"],
    [{ facet: "length" }, "P_2", "length"],
    [{ facet: "fractionDigits" }, "P_8B", "fractionDigits"],
    [{ facet: "totalDigits" }, "P_8B", "fractionDigits"],
    [{ facet: "enumeration" }, "P_12", "enumeration"],
    [{ facet: "pattern" }, "P_12", "other"],
    [{ facet: "type" }, "P_12", "other"],
    [{}, undefined, "other"],
    [{ facet: "pattern", typeName: "TIlosci" }, "P_8B", "other"],
  ])("classifies %j on %s as %s", (metadata, element, expected) => {
    expect(issueAnchorKey(invalid(metadata, element))).toBe(expected);
  });

  it("returns undefined for other codes and domains", () => {
    expect(issueAnchorKey(invalid({}, "P_1", "UNEXPECTED_ELEMENT"))).toBeUndefined();
    expect(issueAnchorKey(invalid({}, "P_1", "INVALID_ELEMENT_VALUE", "semantic"))).toBeUndefined();
  });
});

describe("resolveIssueHelpHref", () => {
  const links = { INVALID_ELEMENT_VALUE: "/validator/v", UNEXPECTED_ELEMENT: "/validator/u" };
  const anchors = { INVALID_ELEMENT_VALUE: { amount: "kwoty" } };

  it("appends the declared anchor for the issue kind", () => {
    const issue = invalid({ typeName: "TKwotowy" }, "P_13_1");
    expect(resolveIssueHelpHref(issue, links, anchors)).toBe("/validator/v#kwoty");
  });

  it("keeps the bare href when the kind is not declared or no anchors exist", () => {
    const date = invalid({ typeName: "TData" }, "P_1");
    expect(resolveIssueHelpHref(date, links, anchors)).toBe("/validator/v");
    expect(resolveIssueHelpHref(date, links, undefined)).toBe("/validator/v");
    expect(resolveIssueHelpHref(invalid({}, "P_1", "UNEXPECTED_ELEMENT"), links, anchors)).toBe(
      "/validator/u",
    );
  });

  it("returns undefined when no page covers the code", () => {
    expect(resolveIssueHelpHref(invalid({}, "P_1"), {}, anchors)).toBeUndefined();
  });
});

describe("checkIssueAnchors", () => {
  const body = "## Kwoty i ceny\n\n### Daty\n\n## Kwoty i ceny\n";
  const ids = extractHeadings(body).map((h) => h.id);
  const codes = ["INVALID_ELEMENT_VALUE"];

  it("accepts anchors that match headings, including de-duplicated ids", () => {
    expect(ids).toEqual(["kwoty-i-ceny", "daty", "kwoty-i-ceny-1"]);
    expect(checkIssueAnchors({ amount: "kwoty-i-ceny", date: "daty" }, codes, ids)).toEqual([]);
    expect(checkIssueAnchors(undefined, codes, ids)).toEqual([]);
  });

  it("flags ids without a heading", () => {
    expect(checkIssueAnchors({ amount: "nope" }, codes, ids)).toEqual([
      'anchors.amount points at "nope", which matches no heading',
    ]);
  });

  it("flags unknown keys and keys the page's codes do not allow", () => {
    expect(checkIssueAnchors({ bogus: "daty" }, codes, ids)).toHaveLength(1);
    expect(checkIssueAnchors({ amount: "daty" }, ["UNEXPECTED_ELEMENT"], ids)).toHaveLength(1);
  });

  it("flags a malformed anchors value", () => {
    expect(checkIssueAnchors(["daty"], codes, ids)).toHaveLength(1);
    expect(checkIssueAnchors("daty", codes, ids)).toHaveLength(1);
  });
});
