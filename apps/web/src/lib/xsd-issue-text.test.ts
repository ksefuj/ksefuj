import { describe, expect, it } from "vitest";
import { createTranslator } from "next-intl";
import type { ValidationIssue } from "@ksefuj/validator";
import pl from "../i18n/messages/pl.json";
import en from "../i18n/messages/en.json";
import uk from "../i18n/messages/uk.json";
import {
  buildXsdIssueText,
  editDistance,
  suggestElementName,
  type Translate,
} from "./xsd-issue-text";

function translator(locale: "pl" | "en" | "uk" = "pl"): Translate {
  const messages = { pl, en, uk }[locale];
  const t = createTranslator({ locale, messages, namespace: "validator" });
  return (key, params) => (t as unknown as Translate)(key, params);
}

const NS = "{http://crd.gov.pl/wzor/2025/06/25/13775/}";

function issue(
  code: string,
  location: ValidationIssue["context"]["location"],
  rest: Partial<ValidationIssue["context"]> = {},
  originalMessage = "",
  domain: "xsd" | "semantic" = "xsd",
): ValidationIssue {
  return {
    code: { domain, category: "schema", code, severity: "error" },
    context: { location, ...rest, metadata: { originalMessage, ...rest.metadata } },
    message: originalMessage,
    fixSuggestions: [],
  };
}

const t = translator();

describe("suggestElementName", () => {
  it("suggests a close typo of an expected name", () => {
    expect(suggestElementName("NazwaBank", ["NazwaBanku", "RachunekBankowy"])).toBe("NazwaBanku");
  });

  it("matches case-insensitively", () => {
    expect(suggestElementName("nazwabanku", ["NazwaBanku"])).toBe("NazwaBanku");
  });

  it("does not suggest when the element is already expected or nothing is close", () => {
    expect(suggestElementName("NazwaBanku", ["NazwaBanku"])).toBeNull();
    expect(suggestElementName("Adnotacje", ["NazwaBanku"])).toBeNull();
  });

  it("does not treat numbered fields as typos of each other", () => {
    expect(suggestElementName("P_2", ["P_1"])).toBeNull();
    expect(suggestElementName("P_13_2", ["P_13_1"])).toBeNull();
  });

  it("stays quiet when two candidates are equally close", () => {
    expect(suggestElementName("Nazwa", ["Nazwy", "Nazwi"])).toBeNull();
  });

  it("computes edit distance", () => {
    expect(editDistance("kitten", "sitting")).toBe(3);
    expect(editDistance("ABC", "abc")).toBe(0);
  });
});

describe("buildXsdIssueText", () => {
  it("returns null for the fallback code and non-XSD issues", () => {
    expect(buildXsdIssueText(issue("SCHEMA_VALIDATION_FAILED", {}), t)).toBeNull();
    expect(buildXsdIssueText(issue("P15_MISSING", {}, {}, "", "semantic"), t)).toBeNull();
  });

  it("explains an unexpected element with the expected one and the line", () => {
    const result = buildXsdIssueText(
      issue("UNEXPECTED_ELEMENT", { element: "P_2", lineNumber: 37 }, { expectedValues: ["P_1"] }),
      t,
    )!;
    expect(result.message).toBe(
      "Element `P_2` stoi w złym miejscu albo w ogóle nie powinno go tu być. W tym miejscu oczekujemy: `P_1`. (linia 37)",
    );
    expect(result.fix).toContain("kolejności");
  });

  it("adds a did-you-mean for a typo", () => {
    const result = buildXsdIssueText(
      issue(
        "UNEXPECTED_ELEMENT",
        { element: "NazwaBank", lineNumber: 5 },
        { expectedValues: ["NazwaBanku"] },
      ),
      t,
    )!;
    expect(result.message).toContain("Czy chodziło o `NazwaBanku`?");
    expect(result.fix).toContain("nazwę");
  });

  it("truncates long expected lists", () => {
    const result = buildXsdIssueText(
      issue(
        "UNEXPECTED_ELEMENT",
        { element: "X" },
        { expectedValues: ["A", "B", "C", "D", "E", "F", "G", "H"] },
      ),
      t,
    )!;
    expect(result.message).toContain("`F` i jeszcze 2");
    expect(result.message).not.toContain("`G`");
  });

  it("explains a missing required element and attribute", () => {
    expect(
      buildXsdIssueText(
        issue(
          "REQUIRED_ELEMENT_MISSING",
          { element: "Podmiot1" },
          { expectedValues: ["DaneIdentyfikacyjne"] },
        ),
        t,
      )!.message,
    ).toBe("W elemencie `Podmiot1` brakuje wymaganego pola: `DaneIdentyfikacyjne`.");
    expect(
      buildXsdIssueText(
        issue("REQUIRED_ELEMENT_MISSING", { element: "Foo" }, { metadata: { attribute: "bar" } }),
        t,
      )!.message,
    ).toBe("Element `Foo` nie ma wymaganego atrybutu `bar`.");
  });

  it("explains a not-allowed attribute and element", () => {
    expect(
      buildXsdIssueText(
        issue("ELEMENT_NOT_ALLOWED", { element: "Faktura" }, { metadata: { attribute: "foo" } }),
        t,
      )!.message,
    ).toBe("Atrybut `foo` nie może występować w elemencie `Faktura`.");
    expect(
      buildXsdIssueText(issue("ELEMENT_NOT_ALLOWED", { element: "Faktura" }), t)!.message,
    ).toBe("Element `Faktura` nie może się tu znaleźć.");
  });

  it("explains the namespace problem", () => {
    const result = buildXsdIssueText(
      issue("WRONG_NAMESPACE", { element: "Faktura", lineNumber: 3 }),
      t,
    )!;
    expect(result.message).toContain(
      '`<Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/">`',
    );
    expect(result.message).toContain("(linia 3)");
    expect(result.fix).toContain("xmlns");
  });

  describe("INVALID_ELEMENT_VALUE", () => {
    const invalid = (
      facet: string,
      location: ValidationIssue["context"]["location"],
      actualValue: string | undefined,
      originalMessage: string,
      typeName?: string,
      expectedValues?: string[],
    ) =>
      issue(
        "INVALID_ELEMENT_VALUE",
        location,
        {
          ...(actualValue !== undefined ? { actualValue } : {}),
          ...(expectedValues ? { expectedValues } : {}),
          metadata: { facet, ...(typeName ? { typeName } : {}) },
        },
        originalMessage,
      );

    it("type: amount with a thousands separator", () => {
      const result = buildXsdIssueText(
        invalid(
          "type",
          { element: "P_13_1", lineNumber: 41 },
          "1,000.00",
          `Element '${NS}P_13_1': '1,000.00' is not a valid value of the atomic type '${NS}TKwotowy'.`,
          "TKwotowy",
        ),
        t,
      )!;
      expect(result.message).toBe(
        "Wartość `1,000.00` w polu `P_13_1` ma nieprawidłowy format. (linia 41)",
      );
      expect(result.fix).toContain("kropki");
      expect(result.fix).toContain("1230.50");
    });

    it("type without a known hint says the value is not valid for the field", () => {
      const result = buildXsdIssueText(invalid("type", { element: "Foo" }, "x", ""), t)!;
      expect(result.message).toBe("Wartość `x` w polu `Foo` nie jest poprawna dla tego pola.");
      expect(result.fix).toContain("format wymagany");
    });

    it("type: date hint", () => {
      const result = buildXsdIssueText(
        invalid("type", { element: "P_1" }, "15/02/2026", "", "TDataT"),
        t,
      )!;
      expect(result.fix).toContain("RRRR-MM-DD");
    });

    it("type: date-time hint from the element name when the type is anonymous", () => {
      const result = buildXsdIssueText(
        invalid("type", { element: "DataWytworzeniaFa" }, "2026-02-01", ""),
        t,
      )!;
      expect(result.fix).toContain("hh:mm:ss");
    });

    it("pattern: NIP, and an empty NIP", () => {
      const filled = buildXsdIssueText(
        invalid("pattern", { element: "NIP" }, "123-456-78-90", "", "TNrNIP"),
        t,
      )!;
      expect(filled.message).toBe("Wartość `123-456-78-90` w polu `NIP` ma nieprawidłowy format.");
      expect(filled.fix).toContain("10 cyfr");

      const empty = buildXsdIssueText(invalid("pattern", { element: "NIP" }, "", ""), t)!;
      expect(empty.message).toBe("Pole `NIP` jest puste, a musi mieć wartość.");
      expect(empty.fix).toContain("10 cyfr");
    });

    it("pattern without a known type uses the generic fix", () => {
      const result = buildXsdIssueText(invalid("pattern", { element: "Foo" }, "x", ""), t)!;
      expect(result.fix).toContain("wymagany format");
    });

    it("enumeration: country code shows at most 8 values and the POL hint", () => {
      const codes = Array.from({ length: 250 }, (_, i) => `C${i}`);
      const result = buildXsdIssueText(
        invalid("enumeration", { element: "KodKraju" }, "POL", "", undefined, codes),
        t,
      )!;
      expect(result.message).toContain("`POL`");
      expect(result.message).toContain("`C7` i jeszcze 242");
      expect(result.message).not.toContain("`C8`");
      expect(result.fix).toContain("`PL` zamiast `POL`");
    });

    it("enumeration without a known element uses the generic fix", () => {
      const result = buildXsdIssueText(
        invalid("enumeration", { element: "Rodzaj" }, "X", "", undefined, ["A", "B"]),
        t,
      )!;
      expect(result.message).toContain("Dozwolone: `A`, `B`.");
      expect(result.fix).toBe("Wybierz jedną z dozwolonych wartości.");
    });

    // Real libxml2 output: length facets quote no value, only the length
    const lengthIssue = (facet: string, element: string, actualLength: number, message: string) =>
      issue(
        "INVALID_ELEMENT_VALUE",
        { element, lineNumber: 9 },
        { metadata: { facet, actualLength } },
        `Element '${NS}${element}': [facet '${facet}'] ${message}`,
      );

    it("maxLength without a quoted value reports the actual length and the limit", () => {
      const over = lengthIssue(
        "maxLength",
        "P_7",
        600,
        "The value has a length of '600'; this exceeds the allowed maximum length of '512'.",
      );
      expect(buildXsdIssueText(over, translator("en"))).toEqual({
        message: "`P_7` is too long (600 characters). Maximum number of characters: 512. (line 9)",
        fix: "Shorten the value.",
      });
    });

    it("minLength with length 0 is an empty field, not a length complaint", () => {
      const empty = lengthIssue(
        "minLength",
        "P_7",
        0,
        "The value has a length of '0'; this underruns the allowed minimum length of '1'.",
      );
      expect(buildXsdIssueText(empty, t)!.message).toBe(
        "Pole `P_7` jest puste, a musi mieć wartość. (linia 9)",
      );
    });

    it("minLength and exact length with a non-zero length say how far off it is", () => {
      const short = lengthIssue(
        "minLength",
        "X",
        1,
        "The value has a length of '1'; this underruns the allowed minimum length of '2'.",
      );
      expect(buildXsdIssueText(short, translator("en"))!.message).toContain(
        "too short (1 characters). Minimum number of characters: 2.",
      );
      const exact = lengthIssue(
        "length",
        "KodUE",
        3,
        "The value has a length of '3'; this differs from the allowed length of '2'.",
      );
      expect(buildXsdIssueText(exact, translator("en"))!.message).toContain(
        "wrong length (3 characters). Required number of characters: 2.",
      );
    });

    it("a length facet that does quote the value keeps using the value wording", () => {
      const quoted = buildXsdIssueText(
        invalid(
          "maxLength",
          { element: "P_2" },
          "xxxxx",
          "Element 'P_2': [facet 'maxLength'] The value 'xxxxx' has a length of '5'; this exceeds the allowed maximum length of '3'.",
        ),
        t,
      )!;
      expect(quoted.message).toContain("`xxxxx`");
      expect(quoted.message).toContain("Maksymalna liczba znaków: 3.");
    });

    it("fractionDigits, totalDigits and range facets", () => {
      const frac = buildXsdIssueText(
        invalid(
          "fractionDigits",
          { element: "P_15" },
          "1.234",
          "Element 'P_15': [facet 'fractionDigits'] The value '1.234' has more fractional digits than are allowed ('2').",
        ),
        t,
      )!;
      expect(frac.message).toContain("za dużo miejsc po przecinku. Maksymalnie: 2.");

      const total = buildXsdIssueText(
        invalid(
          "totalDigits",
          { element: "P_15" },
          "1",
          "Element 'P_15': [facet 'totalDigits'] The value '1' has more digits than are allowed ('18').",
        ),
        t,
      )!;
      expect(total.message).toContain("Maksymalna liczba cyfr: 18.");

      const min = buildXsdIssueText(
        invalid(
          "minInclusive",
          { element: "X" },
          "-1",
          "Element 'X': [facet 'minInclusive'] The value '-1' is less than the minimum value allowed ('0').",
        ),
        t,
      )!;
      expect(min.message).toContain("Minimalna wartość: 0.");
      const max = buildXsdIssueText(
        invalid(
          "maxExclusive",
          { element: "X" },
          "10",
          "Element 'X': [facet 'maxExclusive'] The value '10' must be less than '10'.",
        ),
        t,
      )!;
      expect(max.message).toContain("mniejsza niż 10.");
    });

    it("falls back to a generic message for a limit facet without a readable limit", () => {
      const result = buildXsdIssueText(invalid("maxLength", { element: "X" }, "abc", "weird"), t)!;
      expect(result.message).toBe("Wartość `abc` w polu `X` jest nieprawidłowa.");
    });

    it("whiteSpace and content", () => {
      expect(
        buildXsdIssueText(invalid("whiteSpace", { element: "X" }, "a b", ""), t)!.message,
      ).toBe("Wartość `a b` w polu `X` jest nieprawidłowa.");
      expect(
        buildXsdIssueText(invalid("content", { element: "Fa" }, undefined, ""), t)!.message,
      ).toBe("W elemencie `Fa` nie może być tekstu, tylko inne elementy.");
    });

    it("never lets a backtick from the file break out of the inline code", () => {
      const result = buildXsdIssueText(invalid("pattern", { element: "X" }, "a`b", ""), t)!;
      expect(result.message).toContain("`a'b`");
    });
  });

  it("renders in English and Ukrainian too", () => {
    const issueToTest = issue(
      "UNEXPECTED_ELEMENT",
      { element: "NazwaBank" },
      { expectedValues: ["NazwaBanku"] },
    );
    expect(buildXsdIssueText(issueToTest, translator("en"))!.message).toBe(
      "`NazwaBank` is in the wrong place or shouldn't be here. Expected here: `NazwaBanku`. Did you mean `NazwaBanku`?",
    );
    expect(buildXsdIssueText(issueToTest, translator("uk"))!.message).toContain("`NazwaBanku`");
  });
});
