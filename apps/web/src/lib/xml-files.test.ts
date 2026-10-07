import { describe, expect, it } from "vitest";
import { isXmlFile, partitionXmlFiles } from "./xml-files";

describe("isXmlFile", () => {
  it("accepts .xml regardless of case", () => {
    expect(isXmlFile({ name: "faktura.xml" })).toBe(true);
    expect(isXmlFile({ name: "FAKTURA.XML" })).toBe(true);
    expect(isXmlFile({ name: "faktura.Xml" })).toBe(true);
  });

  it("rejects other extensions and names that merely contain xml", () => {
    expect(isXmlFile({ name: "faktura.pdf" })).toBe(false);
    expect(isXmlFile({ name: "faktura.xml.zip" })).toBe(false);
    expect(isXmlFile({ name: "xml" })).toBe(false);
    expect(isXmlFile({ name: "" })).toBe(false);
  });
});

describe("partitionXmlFiles", () => {
  it("separates XML files from the rest, keeping order", () => {
    const files = [{ name: "a.xml" }, { name: "b.pdf" }, { name: "C.XML" }, { name: "d.txt" }];
    const { xml, rejected } = partitionXmlFiles(files);
    expect(xml.map((f) => f.name)).toEqual(["a.xml", "C.XML"]);
    expect(rejected.map((f) => f.name)).toEqual(["b.pdf", "d.txt"]);
  });

  it("handles an empty list", () => {
    expect(partitionXmlFiles([])).toEqual({ xml: [], rejected: [] });
  });
});
