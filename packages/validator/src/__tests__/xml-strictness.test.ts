/**
 * Strict XML checks required by KSeF API 2.4.0 (enforced on PROD from 2026-10-19).
 * Source: https://github.com/CIRFMF/ksef-api/blob/main/faktury/weryfikacja-faktury.md
 */

import { describe, expect, it } from "vitest";
import { checkStrictXml, MAX_REPORTED_FINDINGS } from "../xml-strictness.js";
import { validate } from "../validate.js";

const BOM = String.fromCharCode(0xfeff);
const DECL = '<?xml version="1.0" encoding="UTF-8"?>';

function doc(body: string, prolog = DECL): string {
  return `${prolog}\n<Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/"><Nazwa>${body}</Nazwa></Faktura>`;
}

const codes = (xml: string) => checkStrictXml(xml).map((i) => i.code.code);

describe("checkStrictXml", () => {
  describe("clean input", () => {
    it("passes a clean document", () => {
      expect(checkStrictXml(doc("Test"))).toEqual([]);
    });

    it("passes a document without any declaration", () => {
      expect(checkStrictXml(doc("Test", ""))).toEqual([]);
    });

    it("does not flag the XML declaration alone", () => {
      expect(checkStrictXml(`${DECL}<a/>`)).toEqual([]);
      expect(checkStrictXml(`<?xml version="1.0"?><a/>`)).toEqual([]);
      expect(checkStrictXml(`<?xml version='1.0' encoding='utf-8'?><a/>`)).toEqual([]);
    });

    it("does not flag Polish letters, typographic quotes and common symbols", () => {
      const text = "ąćęłńóśźż ĄĆĘŁŃÓŚŹŻ „cytat” «x» – — … € £ © ® ™ № § ° ± × ½   ¡ ÿ 😀 \u{10000}";
      expect(checkStrictXml(doc(text))).toEqual([]);
    });

    it("does not flag characters adjacent to the discouraged ranges", () => {
      // U+0085 (NEL) is deliberately allowed by the MF ranges; U+00A0 follows U+009F
      const text = "\u0085\u00a0\ufdcf\ufdf0\ufffd\uffff\u{1fffd}\u{20000}\u{10fffd}";
      // U+FFFF is itself a noncharacter in XML 1.0 5th ed. but is not in the MF list
      expect(codes(doc(text))).toEqual([]);
    });

    it("ignores <?...?> inside comments and CDATA", () => {
      const xml = `${DECL}<a><!-- <?pi x?> --><![CDATA[<?pi y?>]]></a>`;
      expect(checkStrictXml(xml)).toEqual([]);
    });
  });

  describe("processing instructions", () => {
    it("flags a PI after the declaration, reporting target and position", () => {
      const xml = `${DECL}\n<?xml-stylesheet type="text/xsl" href="a.xsl"?>\n<a/>`;
      const issues = checkStrictXml(xml);
      expect(issues).toHaveLength(1);
      const issue = issues[0]!;
      expect(issue.code.code).toBe("XML_PROCESSING_INSTRUCTION");
      expect(issue.code.severity).toBe("error");
      expect(issue.context.actualValue).toBe("xml-stylesheet");
      expect(issue.context.metadata?.target).toBe("xml-stylesheet");
      expect(issue.context.location).toEqual({ lineNumber: 2, columnNumber: 1 });
      expect(issue.message).toContain("2026-10-19");
    });

    it("flags a PI inside the document and one before the root", () => {
      const xml = `${DECL}<?a x?><r><?b y?></r>`;
      const issues = checkStrictXml(xml);
      expect(issues.map((i) => i.context.metadata?.target)).toEqual(["a", "b"]);
    });

    it("flags a PI when there is no XML declaration", () => {
      expect(codes(`<?xml-stylesheet href="a.xsl"?><a/>`)).toEqual(["XML_PROCESSING_INSTRUCTION"]);
    });

    it("flags a second xml declaration-like PI that is not at the very start", () => {
      expect(codes(`${DECL}<a/><?xml version="1.0"?>`)).toEqual(["XML_PROCESSING_INSTRUCTION"]);
    });
  });

  describe("discouraged characters", () => {
    const cases: [string, number][] = [
      ["start of [#x7F-#x84]", 0x7f],
      ["end of [#x7F-#x84]", 0x84],
      ["start of [#x86-#x9F]", 0x86],
      ["end of [#x86-#x9F]", 0x9f],
      ["start of [#xFDD0-#xFDEF]", 0xfdd0],
      ["end of [#xFDD0-#xFDEF]", 0xfdef],
      ["#x1FFFE", 0x1fffe],
      ["#x1FFFF", 0x1ffff],
      ["#x2FFFE", 0x2fffe],
      ["#x7FFFF", 0x7ffff],
      ["#xFFFFE", 0xffffe],
      ["#x10FFFE", 0x10fffe],
      ["#x10FFFF", 0x10ffff],
    ];

    it.each(cases)("flags %s", (_name, cp) => {
      const issues = checkStrictXml(doc(`a${String.fromCodePoint(cp)}b`));
      expect(issues).toHaveLength(1);
      const issue = issues[0]!;
      expect(issue.code.code).toBe("XML_DISCOURAGED_CHARACTER");
      expect(issue.code.severity).toBe("error");
      const label = `U+${cp.toString(16).toUpperCase().padStart(4, "0")}`;
      expect(issue.context.metadata?.codePoint).toBe(label);
      expect(issue.context.metadata?.snippet).toContain(`[${label}]`);
      expect(issue.message).toContain(label);
    });

    it("flags every plane's noncharacter pair", () => {
      for (let plane = 1; plane <= 16; plane++) {
        for (const low of [0xfffe, 0xffff]) {
          const cp = plane * 0x10000 + low;
          expect(codes(doc(String.fromCodePoint(cp)))).toEqual(["XML_DISCOURAGED_CHARACTER"]);
        }
      }
    });

    it("flags characters inside comments and attribute values too", () => {
      expect(codes(`${DECL}<a b="\u0084"><!-- \u009f --></a>`)).toEqual([
        "XML_DISCOURAGED_CHARACTER",
        "XML_DISCOURAGED_CHARACTER",
      ]);
    });

    it("reports line and column (1-based, code points) and a snippet", () => {
      const xml = `${DECL}\n<a>\n  zażółć 😀\u0084 gęślą</a>`;
      const [issue] = checkStrictXml(xml);
      expect(issue!.context.location).toEqual({ lineNumber: 3, columnNumber: 11 });
      expect(issue!.context.metadata?.snippet).toContain("😀[U+0084] gęślą</a>");
    });

    it("counts CRLF and lone CR as single line breaks", () => {
      const xml = `${DECL}\r\n<a>\r\r\u0084</a>`;
      const [issue] = checkStrictXml(xml);
      expect(issue!.context.location).toEqual({ lineNumber: 4, columnNumber: 1 });
    });

    it("reports every occurrence", () => {
      const issues = checkStrictXml(doc("\u0084x\u0086"));
      expect(issues).toHaveLength(2);
      expect(issues[0]!.context.location.columnNumber).toBeLessThan(
        issues[1]!.context.location.columnNumber!,
      );
    });
  });

  describe("BOM and encoding (also required by MF)", () => {
    it("flags a leading BOM", () => {
      expect(codes(`${BOM}${DECL}<a/>`)).toEqual(["XML_BOM_PRESENT"]);
    });

    it("does not treat the declaration after a BOM as a processing instruction", () => {
      expect(codes(`${BOM}${DECL}<a/>`)).not.toContain("XML_PROCESSING_INSTRUCTION");
    });

    it("flags a non-UTF-8 declared encoding", () => {
      const issues = checkStrictXml(`<?xml version="1.0" encoding="windows-1250"?><a/>`);
      expect(issues.map((i) => i.code.code)).toEqual(["XML_ENCODING_NOT_UTF8"]);
      expect(issues[0]!.context.actualValue).toBe("windows-1250");
    });
  });
});

describe("validate() integration", () => {
  it("reports strict-XML errors and marks the file invalid", async () => {
    const xml = `${DECL}\n<?xml-stylesheet href="a.xsl"?>\n<Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/"><P>a\u0084</P></Faktura>`;
    const result = await validate(xml, {
      enableXsdValidation: false,
      enableSemanticValidation: false,
    });
    expect(result.valid).toBe(false);
    expect(result.issues.map((i) => i.code.code).sort()).toEqual([
      "XML_DISCOURAGED_CHARACTER",
      "XML_PROCESSING_INSTRUCTION",
    ]);
  });

  it("does not add issues for clean input", async () => {
    const result = await validate(doc("Zażółć gęślą jaźń"), {
      enableXsdValidation: false,
      enableSemanticValidation: false,
    });
    expect(result.valid).toBe(true);
    expect(result.issues).toEqual([]);
  });
});

describe("checkStrictXml robustness", () => {
  it("does not count a leading BOM as a column", () => {
    const issues = checkStrictXml(`${BOM}${DECL}<a>\u0084</a>`);
    const ch = issues.find((i) => i.code.code === "XML_DISCOURAGED_CHARACTER")!;
    expect(ch.context.location).toEqual({ lineNumber: 1, columnNumber: DECL.length + 4 });
  });

  it("caps individually reported characters and adds one summary", () => {
    const issues = checkStrictXml(doc("\u0084".repeat(MAX_REPORTED_FINDINGS + 5)));
    expect(issues.filter((i) => i.code.code === "XML_DISCOURAGED_CHARACTER")).toHaveLength(
      MAX_REPORTED_FINDINGS,
    );
    const summary = issues.filter((i) => i.code.code === "XML_DISCOURAGED_CHARACTER_MORE");
    expect(summary).toHaveLength(1);
    expect(summary[0]!.context.metadata?.count).toBe(5);
    expect(summary[0]!.context.metadata?.total).toBe(MAX_REPORTED_FINDINGS + 5);
  });

  it("caps processing instructions and adds one summary", () => {
    const xml = `${DECL}<r>${"<?p x?>".repeat(MAX_REPORTED_FINDINGS + 2)}</r>`;
    const issues = checkStrictXml(xml);
    expect(issues.filter((i) => i.code.code === "XML_PROCESSING_INSTRUCTION")).toHaveLength(
      MAX_REPORTED_FINDINGS,
    );
    expect(issues.filter((i) => i.code.code === "XML_PROCESSING_INSTRUCTION_MORE")).toHaveLength(1);
  });

  it("handles a multi-megabyte single-line file with many bad characters quickly", () => {
    const xml = `${DECL}<r>${"ab\u0084\u{1f600}".repeat(500_000)}</r>`;
    const start = Date.now();
    const issues = checkStrictXml(xml);
    expect(Date.now() - start).toBeLessThan(2000);
    expect(issues.length).toBe(MAX_REPORTED_FINDINGS + 1);
  });

  it("treats a whitespace-preceded declaration as the declaration, not a PI", () => {
    expect(codes(`\n <?xml version="1.0"?><a/>`)).toEqual([]);
    expect(codes(`\n <?xml version="1.0" encoding="ISO-8859-2"?><a/>`)).toEqual([
      "XML_ENCODING_NOT_UTF8",
    ]);
  });
});
