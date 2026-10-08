/**
 * Unit tests for the libxml2 XSD message parser plus integration tests that run validate()
 * on the error-case fixtures and assert the structured XSD issues.
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { parseXsdMessage } from "../xsd-messages.js";
import { validate } from "../validate.js";
import { ERROR_CODES } from "../error-codes.js";

const NS = "{http://crd.gov.pl/wzor/2025/06/25/13775/}";

describe("parseXsdMessage", () => {
  it("classifies 'not expected' as UNEXPECTED_ELEMENT with expected list", () => {
    const parsed = parseXsdMessage(
      `Element '${NS}P_2': This element is not expected. Expected is ( ${NS}P_1 ).`,
    );
    expect(parsed).toMatchObject({
      code: "UNEXPECTED_ELEMENT",
      element: "P_2",
      expected: ["P_1"],
    });
  });

  it("parses 'Expected is one of' lists", () => {
    const parsed = parseXsdMessage(
      `Element '${NS}Adnotacje': This element is not expected. Expected is one of ( ${NS}P_13_2, ${NS}P_13_3 ).`,
    );
    expect(parsed.code).toBe("UNEXPECTED_ELEMENT");
    expect(parsed.expected).toEqual(["P_13_2", "P_13_3"]);
  });

  it("classifies missing child elements as REQUIRED_ELEMENT_MISSING", () => {
    const parsed = parseXsdMessage(
      `Element '${NS}Faktura': Missing child element(s). Expected is ( ${NS}Podmiot1 ).`,
    );
    expect(parsed).toMatchObject({
      code: "REQUIRED_ELEMENT_MISSING",
      element: "Faktura",
      expected: ["Podmiot1"],
    });
  });

  it("classifies pattern facet with empty value", () => {
    const parsed = parseXsdMessage(
      `Element '${NS}NIP': [facet 'pattern'] The value '' is not accepted by the pattern '[1-9]\\d{9}'.`,
    );
    expect(parsed).toMatchObject({
      code: "INVALID_ELEMENT_VALUE",
      element: "NIP",
      facet: "pattern",
      actualValue: "",
    });
  });

  it("classifies atomic type errors with type name and value", () => {
    const parsed = parseXsdMessage(
      `Element '${NS}P_15': '1230,00' is not a valid value of the atomic type '${NS}TKwotowy'.`,
    );
    expect(parsed).toMatchObject({
      code: "INVALID_ELEMENT_VALUE",
      element: "P_15",
      facet: "type",
      actualValue: "1230,00",
      typeName: "TKwotowy",
    });
  });

  it("handles local atomic types without a name", () => {
    const parsed = parseXsdMessage(
      `Element '${NS}P_8B': 'abc' is not a valid value of the local atomic type.`,
    );
    expect(parsed).toMatchObject({
      code: "INVALID_ELEMENT_VALUE",
      facet: "type",
      actualValue: "abc",
    });
    expect(parsed.typeName).toBeUndefined();
  });

  it("classifies enumeration facet and extracts allowed members", () => {
    const parsed = parseXsdMessage(
      `Element '${NS}KodKraju': [facet 'enumeration'] The value 'POL' is not an element of the set {'AF', 'AX', 'PL'}.`,
    );
    expect(parsed).toMatchObject({
      code: "INVALID_ELEMENT_VALUE",
      element: "KodKraju",
      facet: "enumeration",
      actualValue: "POL",
      expected: ["AF", "AX", "PL"],
    });
  });

  it("length facets quote no value: reads the length, leaves actualValue undefined", () => {
    const over = parseXsdMessage(
      `Element '${NS}P_7': [facet 'maxLength'] The value has a length of '600'; this exceeds the allowed maximum length of '512'.`,
    );
    expect(over).toMatchObject({ facet: "maxLength", element: "P_7", actualLength: 600 });
    expect(over.actualValue).toBeUndefined();

    const under = parseXsdMessage(
      `Element '${NS}P_7': [facet 'minLength'] The value has a length of '0'; this underruns the allowed minimum length of '1'.`,
    );
    expect(under).toMatchObject({ facet: "minLength", actualLength: 0 });
    expect(under.actualValue).toBeUndefined();
  });

  it("still reads a quoted value from length facet messages that include one", () => {
    const parsed = parseXsdMessage(
      `Element '${NS}X': [facet 'length'] The value 'abc' has a length of '3'; this differs from the allowed length of '2'.`,
    );
    expect(parsed).toMatchObject({ facet: "length", actualValue: "abc", actualLength: 3 });
  });

  it.each([
    [
      "pattern",
      "12'x is y",
      `Element '${NS}NIP': [facet 'pattern'] The value '12'x is y' is not accepted by the pattern '[1-9]\\d{9}'.`,
    ],
    [
      "enumeration",
      "P' is 'L",
      `Element '${NS}KodKraju': [facet 'enumeration'] The value 'P' is 'L' is not an element of the set {'AF', 'PL'}.`,
    ],
    [
      "maxInclusive",
      "9' is greater than 5",
      `Element '${NS}X': [facet 'maxInclusive'] The value '9' is greater than 5' is greater than the maximum value allowed ('5').`,
    ],
    [
      "fractionDigits",
      "1.2' has more digits than x",
      `Element '${NS}X': [facet 'fractionDigits'] The value '1.2' has more digits than x' has more fractional digits than are allowed ('2').`,
    ],
    [
      "pattern",
      "it's not",
      `Element '${NS}X': [facet 'pattern'] The value 'it's not' is not accepted by the pattern 'a'.`,
    ],
  ])("%s: keeps tricky values intact (%s)", (_facet, value, message) => {
    expect(parseXsdMessage(message).actualValue).toBe(value);
  });

  it("keeps an empty value empty", () => {
    expect(
      parseXsdMessage(
        `Element '${NS}NIP': [facet 'pattern'] The value '' is not accepted by the pattern 'x'.`,
      ).actualValue,
    ).toBe("");
  });

  it.each([
    [
      "maxLength",
      `Element '${NS}Nazwa': [facet 'maxLength'] The value has a length of '300'; this exceeds the allowed maximum length of '256'.`,
    ],
    [
      "minLength",
      `Element '${NS}Nazwa': [facet 'minLength'] The value has a length of '0'; this underruns the allowed minimum length of '1'.`,
    ],
    [
      "length",
      `Element '${NS}X': [facet 'length'] The value has a length of '3'; this differs from the allowed length of '2'.`,
    ],
    [
      "fractionDigits",
      `Element '${NS}P_15': [facet 'fractionDigits'] The value '1.234' has more fractional digits than are allowed ('2').`,
    ],
    [
      "totalDigits",
      `Element '${NS}P_15': [facet 'totalDigits'] The value '12345' has more digits than are allowed ('4').`,
    ],
    [
      "minInclusive",
      `Element '${NS}X': [facet 'minInclusive'] The value '-1' is less than the minimum value allowed ('0').`,
    ],
    [
      "maxInclusive",
      `Element '${NS}X': [facet 'maxInclusive'] The value '9' is greater than the maximum value allowed ('5').`,
    ],
    [
      "minExclusive",
      `Element '${NS}X': [facet 'minExclusive'] The value '0' must be greater than '0'.`,
    ],
    [
      "maxExclusive",
      `Element '${NS}X': [facet 'maxExclusive'] The value '5' must be less than '5'.`,
    ],
  ])("classifies %s facet as INVALID_ELEMENT_VALUE", (facet, message) => {
    const parsed = parseXsdMessage(message);
    expect(parsed.code).toBe("INVALID_ELEMENT_VALUE");
    expect(parsed.facet).toBe(facet);
    expect(parsed.element).toBeDefined();
  });

  it("is case-insensitive", () => {
    const parsed = parseXsdMessage(
      `ELEMENT '${NS}P_2': THIS ELEMENT IS NOT EXPECTED. EXPECTED IS ( ${NS}P_1 ).`,
    );
    expect(parsed.code).toBe("UNEXPECTED_ELEMENT");
  });

  it("classifies a root without namespace as WRONG_NAMESPACE", () => {
    const parsed = parseXsdMessage(
      "Element 'Faktura': No matching global declaration available for the validation root.",
    );
    expect(parsed).toMatchObject({ code: "WRONG_NAMESPACE", element: "Faktura" });
  });

  it("classifies a root in a wrong namespace as WRONG_NAMESPACE", () => {
    const parsed = parseXsdMessage(
      "Element '{http://example.com/other}Faktura': No matching global declaration available for the validation root.",
    );
    expect(parsed).toMatchObject({ code: "WRONG_NAMESPACE", element: "Faktura" });
  });

  it("does not call an unknown root element a namespace problem", () => {
    const parsed = parseXsdMessage(
      "Element 'Invoice': No matching global declaration available for the validation root.",
    );
    expect(parsed.code).toBe("SCHEMA_VALIDATION_FAILED");
  });

  it("classifies a disallowed attribute as ELEMENT_NOT_ALLOWED", () => {
    const parsed = parseXsdMessage(
      `Element '${NS}Faktura', attribute 'foo': The attribute 'foo' is not allowed.`,
    );
    expect(parsed).toMatchObject({
      code: "ELEMENT_NOT_ALLOWED",
      element: "Faktura",
      attribute: "foo",
    });
  });

  it("classifies stray text in element-only content as INVALID_ELEMENT_VALUE (content)", () => {
    const parsed = parseXsdMessage(
      `Element '${NS}Fa': Character content other than whitespace is not allowed because the content type is 'element-only'.`,
    );
    expect(parsed).toMatchObject({
      code: "INVALID_ELEMENT_VALUE",
      element: "Fa",
      facet: "content",
    });
  });

  it("falls back to SCHEMA_VALIDATION_FAILED for unknown messages", () => {
    const parsed = parseXsdMessage("Something entirely different happened.");
    expect(parsed).toEqual({ code: "SCHEMA_VALIDATION_FAILED", element: undefined });
  });
});

describe("validate() XSD issues on error-case fixtures", () => {
  const dir = join(
    dirname(fileURLToPath(import.meta.url)),
    "../../../../test-fixtures/error-cases",
  );
  const run = async (file: string) => {
    const result = await validate(readFileSync(join(dir, file), "utf-8"));
    return result.issues.filter((i) => i.code.domain === "xsd");
  };

  it("02-wrong-element-order: UNEXPECTED_ELEMENT with line and expected", async () => {
    const issues = await run("02-wrong-element-order.xml");
    const issue = issues.find((i) => i.code.code === "UNEXPECTED_ELEMENT");
    expect(issue).toBeDefined();
    expect(issue!.context.location.element).toBe("P_2");
    expect(issue!.context.location.lineNumber).toBeGreaterThan(0);
    expect(issue!.context.expectedValues).toEqual(["P_1"]);
    expect(issue!.message).toContain("This element is not expected");
  });

  it("03-typo-in-element-name: UNEXPECTED_ELEMENT for the typo", async () => {
    const issues = await run("03-typo-in-element-name.xml");
    const issue = issues.find((i) => i.code.code === "UNEXPECTED_ELEMENT");
    expect(issue?.context.location.element).toBe("Nazw");
    expect(issue?.context.expectedValues).toContain("Nazwa");
  });

  it("12-number-formatting-errors: INVALID_ELEMENT_VALUE with type metadata", async () => {
    const issues = await run("12-number-formatting-errors.xml");
    const issue = issues.find((i) => i.context.location.element === "P_15");
    expect(issue?.code.code).toBe("INVALID_ELEMENT_VALUE");
    expect(issue?.context.actualValue).toBe("1230,00");
    expect(issue?.context.metadata).toMatchObject({ facet: "type", typeName: "TKwotowy" });
    expect(issue?.context.location.lineNumber).toBeGreaterThan(0);
  });

  it("18-missing-namespace: WRONG_NAMESPACE on Faktura", async () => {
    const issues = await run("18-missing-namespace.xml");
    expect(issues).toHaveLength(1);
    expect(issues[0].code.code).toBe("WRONG_NAMESPACE");
    expect(issues[0].context.location.element).toBe("Faktura");
    expect(issues[0].context.location.lineNumber).toBeGreaterThan(0);
  });

  it("19-empty-required-fields: pattern and minLength facets", async () => {
    const issues = await run("19-empty-required-fields.xml");
    expect(issues.every((i) => i.code.code === "INVALID_ELEMENT_VALUE")).toBe(true);
    const nip = issues.find((i) => i.context.location.element === "NIP");
    expect(nip?.context.metadata).toMatchObject({ facet: "pattern" });
    expect(nip?.context.actualValue).toBe("");
    expect(issues.some((i) => i.context.metadata?.facet === "minLength")).toBe(true);
    expect(issues.every((i) => (i.context.location.lineNumber ?? 0) > 0)).toBe(true);
  });

  it("22-invalid-country-codes: enumeration facet with allowed values", async () => {
    const issues = await run("22-invalid-country-codes.xml");
    const issue = issues.find((i) => i.context.location.element === "KodKraju");
    expect(issue?.code.code).toBe("INVALID_ELEMENT_VALUE");
    expect(issue?.context.actualValue).toBe("POL");
    expect(issue?.context.metadata).toMatchObject({ facet: "enumeration" });
    expect(issue?.context.expectedValues).toContain("PL");
  });

  it("never emits namespace URIs in element names or expected values", async () => {
    const issues = await run("02-wrong-element-order.xml");
    for (const issue of issues) {
      expect(issue.context.location.element ?? "").not.toContain("{");
      for (const v of issue.context.expectedValues ?? []) {
        expect(v).not.toContain("{");
      }
    }
  });
});

describe("XSD error codes registry", () => {
  it("registers the new codes in the xsd domain", () => {
    expect(ERROR_CODES.UNEXPECTED_ELEMENT.code.domain).toBe("xsd");
    expect(ERROR_CODES.WRONG_NAMESPACE.code.domain).toBe("xsd");
    expect(ERROR_CODES.UNEXPECTED_ELEMENT.code.severity).toBe("error");
    expect(ERROR_CODES.WRONG_NAMESPACE.code.severity).toBe("error");
  });
});
