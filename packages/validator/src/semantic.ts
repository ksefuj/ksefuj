/**
 * @ksefuj/validator - Semantic validation rules
 *
 * Business logic validation for KSeF FA(3) invoices that cannot
 * be expressed through XSD schema validation alone.
 */

import type { SemanticRule, ValidationAssertion, ValidationIssue, XmlDocument } from "./types.js";
import { ERROR_CODES } from "./error-codes.js";

const NS = "http://crd.gov.pl/wzor/2025/06/25/13775/";

// --- Helper Functions ---

function el(doc: XmlDocument, tag: string): XmlDocument | null {
  const elements = doc.find(`.//ksef:${tag}`, { ksef: NS });
  return elements.length > 0 ? (elements[0] as XmlDocument) : null;
}

function els(doc: XmlDocument, tag: string): XmlDocument[] {
  return doc.find(`.//ksef:${tag}`, { ksef: NS }) as XmlDocument[];
}

function text(doc: XmlDocument, tag: string): string | null {
  const result = doc.eval(`string(.//ksef:${tag}[1])`, { ksef: NS });
  return typeof result === "string" && result.trim() ? result.trim() : null;
}

function xpath(element: string): string {
  return `//ksef:${element.replace("/", "/ksef:")}`;
}

// --- Semantic Rules ---

export const semanticRules: SemanticRule[] = [
  // --- Core validation rules ---
  {
    id: "PODMIOT2_JST_GV",
    description: "Podmiot2 must contain JST and GV elements",
    category: "required_field",
    severity: "error",
    check(doc) {
      const podmiot2 = el(doc, "Podmiot2");
      if (!podmiot2) {
        return [];
      }
      const issues: ValidationIssue[] = [];

      if (!el(podmiot2, "JST")) {
        const errorDef = ERROR_CODES.PODMIOT2_JST_MISSING;
        issues.push({
          code: errorDef.code,
          context: {
            location: {
              xpath: xpath("Podmiot2/JST"),
              element: "JST",
            },
            metadata: {
              parent: "Podmiot2",
            },
          },
          message: errorDef.description,
          fixSuggestions: errorDef.fixTemplates,
        });
      }

      if (!el(podmiot2, "GV")) {
        const errorDef = ERROR_CODES.PODMIOT2_GV_MISSING;
        issues.push({
          code: errorDef.code,
          context: {
            location: {
              xpath: xpath("Podmiot2/GV"),
              element: "GV",
            },
            metadata: {
              parent: "Podmiot2",
            },
          },
          message: errorDef.description,
          fixSuggestions: errorDef.fixTemplates,
        });
      }
      return issues;
    },
    getAssertions(doc) {
      const podmiot2 = el(doc, "Podmiot2");
      if (!podmiot2) {
        return [];
      }

      const assertions: ValidationAssertion[] = [];
      const validElements: string[] = [];

      if (el(podmiot2, "JST")) {
        validElements.push("JST");
      }
      if (el(podmiot2, "GV")) {
        validElements.push("GV");
      }

      if (validElements.length === 2) {
        assertions.push({
          domain: "semantic",
          aspect: "podmiot2_structure",
          description: "Podmiot2 structure is complete with JST and GV",
          elements: validElements,
          confidence: 1.0,
        });
      }
      return assertions;
    },
  },

  {
    id: "P12_ENUMERATION",
    description: "P_12 must have valid enumeration value",
    category: "enumeration",
    severity: "error",
    check(doc) {
      const valid = [
        "23",
        "22",
        "8",
        "7",
        "5",
        "4",
        "3",
        "0 KR",
        "0 WDT",
        "0 EX",
        "zw",
        "oo",
        "np I",
        "np II",
      ];
      const issues: ValidationIssue[] = [];

      for (const wiersz of els(doc, "FaWiersz")) {
        const p12 = text(wiersz, "P_12");
        const nr = text(wiersz, "NrWierszaFa");

        if (p12 && !valid.includes(p12)) {
          const errorDef = ERROR_CODES.P12_INVALID;
          issues.push({
            code: errorDef.code,
            context: {
              location: {
                xpath: xpath(`FaWiersz[NrWierszaFa="${nr}"]/P_12`),
                element: "P_12",
              },
              actualValue: p12,
              expectedValues: valid,
              metadata: {
                lineNumber: nr,
              },
            },
            message: `${errorDef.description}. Got "${p12}", expected one of: ${valid.join(", ")}`,
            fixSuggestions: [],
          });
        }
      }
      return issues;
    },
    getAssertions(doc) {
      const validRates: string[] = [];
      for (const wiersz of els(doc, "FaWiersz")) {
        const p12 = text(wiersz, "P_12");
        const nr = text(wiersz, "NrWierszaFa");
        if (p12) {
          validRates.push(`Line ${nr}: ${p12}`);
        }
      }

      if (validRates.length > 0) {
        return [
          {
            domain: "semantic",
            aspect: "tax_rates",
            description: "All tax rates are valid",
            elements: validRates,
            confidence: 1.0,
          },
        ];
      }
      return [];
    },
  },

  {
    id: "REVERSE_CHARGE_CONSISTENCY",
    description: "P_13_8 > 0 requires P_18 = 1 and P_12 = 'np I' in rows",
    category: "business_logic",
    severity: "error",
    check(doc) {
      const fa = el(doc, "Fa");
      if (!fa) {
        return [];
      }

      const p13_8 = text(fa, "P_13_8");
      if (!p13_8 || parseFloat(p13_8) === 0) {
        return [];
      }

      const issues: ValidationIssue[] = [];
      const p18 = text(doc, "P_18");

      if (p18 !== "1") {
        const errorDef = ERROR_CODES.P13_8_REQUIRES_P18;
        issues.push({
          code: errorDef.code,
          context: {
            location: {
              xpath: xpath("Fa/Adnotacje/P_18"),
              element: "P_18",
            },
            actualValue: p18 || "missing",
            expectedValues: ["1"],
            relatedElements: ["P_13_8"],
          },
          message: `${errorDef.description}. Current P_18: ${p18 || "missing"}`,
          fixSuggestions: errorDef.fixTemplates,
        });
      }

      for (const wiersz of els(doc, "FaWiersz")) {
        const p12 = text(wiersz, "P_12");
        const nr = text(wiersz, "NrWierszaFa");

        if (p12 && p12 !== "np I") {
          const warningDef = ERROR_CODES.P13_8_REQUIRES_NP_I;
          issues.push({
            code: warningDef.code,
            context: {
              location: {
                xpath: xpath(`FaWiersz[NrWierszaFa="${nr}"]/P_12`),
                element: "P_12",
              },
              actualValue: p12,
              expectedValues: ["np I"],
              relatedElements: ["P_13_8"],
              metadata: {
                lineNumber: nr,
              },
            },
            message: `Row ${nr}: ${warningDef.description}. Current: "${p12}"`,
            fixSuggestions: warningDef.fixTemplates.map((f) => ({
              ...f,
              targetXPath: xpath(`FaWiersz[NrWierszaFa="${nr}"]/P_12`),
            })),
          });
        }
      }
      return issues;
    },
  },

  {
    id: "KURS_WALUTY_PLACEMENT",
    description: "Regular currency invoices: rate in FaWiersz, not in Fa",
    category: "structure",
    severity: "error",
    check(doc) {
      const fa = el(doc, "Fa");
      if (!fa) {
        return [];
      }

      const waluta = text(fa, "KodWaluty");
      if (!waluta || waluta === "PLN") {
        return [];
      }

      const rodzaj = text(fa, "RodzajFaktury");
      if (rodzaj === "ZAL") {
        return [];
      } // advance invoice — KursWalutyZ in Fa OK

      const issues: ValidationIssue[] = [];

      // Check for export/WDT - they don't need exchange rates in line items
      let isExportWDT = false;
      for (const wiersz of els(doc, "FaWiersz")) {
        const p12 = text(wiersz, "P_12");
        if (p12 === "0 WDT" || p12 === "0 EX") {
          isExportWDT = true;
          break;
        }
      }

      if (el(fa, "KursWalutyZ")) {
        const errorDef = ERROR_CODES.KURS_WALUTY_WRONG_LEVEL;
        issues.push({
          code: errorDef.code,
          context: {
            location: {
              xpath: xpath("Fa/KursWalutyZ"),
              element: "KursWalutyZ",
            },
            metadata: {
              invoiceType: rodzaj || "regular",
              currency: waluta,
            },
          },
          message: errorDef.description,
          fixSuggestions: errorDef.fixTemplates,
        });
      }

      // Skip KursWaluty requirement for WDT/Export invoices
      if (!isExportWDT) {
        for (const wiersz of els(doc, "FaWiersz")) {
          if (!el(wiersz, "KursWaluty")) {
            const nr = text(wiersz, "NrWierszaFa");
            const warningDef = ERROR_CODES.KURS_WALUTY_MISSING;
            issues.push({
              code: warningDef.code,
              context: {
                location: {
                  xpath: xpath(`FaWiersz[NrWierszaFa="${nr}"]/KursWaluty`),
                  element: "KursWaluty",
                },
                metadata: {
                  lineNumber: nr,
                  currency: waluta,
                },
              },
              message: `Row ${nr}: ${warningDef.description} for ${waluta}`,
              fixSuggestions: [],
            });
          }
        }
      }
      return issues;
    },
  },

  {
    id: "GTU_FORMAT",
    description: "GTU should be <GTU>GTU_12</GTU>, not <GTU_12>1</GTU_12>",
    category: "format",
    severity: "error",
    check(doc) {
      const issues: ValidationIssue[] = [];

      for (let i = 1; i <= 13; i++) {
        const tag = `GTU_${String(i).padStart(2, "0")}`;
        const elements = els(doc, tag);
        if (elements.length > 0) {
          const errorDef = ERROR_CODES.GTU_WRONG_FORMAT;
          issues.push({
            code: errorDef.code,
            context: {
              location: {
                xpath: xpath(`FaWiersz/${tag}`),
                element: tag,
              },
              metadata: {
                correctFormat: `<GTU>${tag}</GTU>`,
                incorrectFormat: `<${tag}>1</${tag}>`,
              },
            },
            message: `${errorDef.description}. Found <${tag}>, should be <GTU>${tag}</GTU>`,
            fixSuggestions: [
              {
                type: "replace",
                targetXPath: xpath(`FaWiersz/${tag}`),
                content: `<GTU>${tag}</GTU>`,
                description: `Replace <${tag}>1</${tag}> with <GTU>${tag}</GTU>`,
                confidence: 0.95,
                dependencies: [],
              },
            ],
          });
        }
      }
      return issues;
    },
  },

  {
    id: "TRAILING_ZEROS",
    description: "Unnecessary trailing zeros in numeric values",
    category: "format",
    severity: "warning",
    check(doc) {
      const issues: ValidationIssue[] = [];
      const fieldsToCheck = ["P_8B", "P_9A", "KursWaluty"];

      for (const wiersz of els(doc, "FaWiersz")) {
        const nr = text(wiersz, "NrWierszaFa");
        for (const field of fieldsToCheck) {
          const val = text(wiersz, field);
          if (!val || !val.includes(".")) {
            continue;
          }

          const clean = val.replace(/\.?0+$/, "");
          if (clean !== val) {
            const warningDef = ERROR_CODES.TRAILING_ZEROS;
            issues.push({
              code: warningDef.code,
              context: {
                location: {
                  xpath: xpath(`FaWiersz[NrWierszaFa="${nr}"]/${field}`),
                  element: field,
                },
                actualValue: val,
                metadata: {
                  lineNumber: nr,
                  cleanValue: clean,
                },
              },
              message: `Row ${nr}: ${field} has trailing zeros. "${val}" should be "${clean}"`,
              fixSuggestions: [
                {
                  type: "replace",
                  targetXPath: xpath(`FaWiersz[NrWierszaFa="${nr}"]/${field}`),
                  content: `<${field}>${clean}</${field}>`,
                  description: `Remove trailing zeros from ${field}`,
                  confidence: 1.0,
                  dependencies: [],
                },
              ],
            });
          }
        }
      }
      return issues;
    },
  },

  {
    id: "P15_MISSING",
    description: "P_15 (total amount due) is mandatory",
    category: "required_field",
    severity: "error",
    check(doc) {
      const fa = el(doc, "Fa");
      if (!fa) {
        return [];
      }

      if (!text(fa, "P_15")) {
        const errorDef = ERROR_CODES.P15_MISSING;
        return [
          {
            code: errorDef.code,
            context: {
              location: {
                xpath: xpath("Fa/P_15"),
                element: "P_15",
              },
            },
            message: errorDef.description,
            fixSuggestions: [],
          },
        ];
      }
      return [];
    },
    getAssertions(doc) {
      const fa = el(doc, "Fa");
      if (!fa) {
        return [];
      }

      const p15 = text(fa, "P_15");
      if (p15) {
        return [
          {
            domain: "semantic",
            aspect: "invoice_total",
            description: "Invoice total amount (P_15) is present",
            elements: [`P_15: ${p15}`],
            confidence: 1.0,
          },
        ];
      }
      return [];
    },
  },

  {
    id: "ADNOTACJE_COMPLETENESS",
    description: "Adnotacje must contain complete structure",
    category: "required_field",
    severity: "error",
    check(doc) {
      const adnotacje = el(doc, "Adnotacje");
      if (!adnotacje) {
        return [];
      }

      const issues: ValidationIssue[] = [];
      const required = ["P_16", "P_17", "P_18", "P_18A", "P_23"];

      for (const field of required) {
        if (!text(adnotacje, field)) {
          const errorDef = ERROR_CODES.ADNOTACJE_FIELD_MISSING;
          issues.push({
            code: errorDef.code,
            context: {
              location: {
                xpath: xpath(`Fa/Adnotacje/${field}`),
                element: field,
              },
              metadata: {
                parent: "Adnotacje",
              },
            },
            message: `${errorDef.description}: ${field}`,
            fixSuggestions: [],
          });
        }
      }

      const subSections = [
        { name: "Zwolnienie", error: ERROR_CODES.ADNOTACJE_ZWOLNIENIE_MISSING },
        { name: "NoweSrodkiTransportu", error: ERROR_CODES.ADNOTACJE_NST_MISSING },
        { name: "PMarzy", error: ERROR_CODES.ADNOTACJE_PMARZY_MISSING },
      ];

      for (const section of subSections) {
        if (!el(adnotacje, section.name)) {
          issues.push({
            code: section.error.code,
            context: {
              location: {
                xpath: xpath(`Fa/Adnotacje/${section.name}`),
                element: section.name,
              },
              metadata: {
                parent: "Adnotacje",
              },
            },
            message: section.error.description,
            fixSuggestions: section.error.fixTemplates,
          });
        }
      }
      return issues;
    },
    getAssertions(doc) {
      const adnotacje = el(doc, "Adnotacje");
      if (!adnotacje) {
        return [];
      }

      const validFields: string[] = [];
      const required = ["P_16", "P_17", "P_18", "P_18A", "P_23"];

      for (const field of required) {
        if (text(adnotacje, field)) {
          validFields.push(field);
        }
      }

      if (el(adnotacje, "Zwolnienie")) {
        validFields.push("Zwolnienie");
      }
      if (el(adnotacje, "NoweSrodkiTransportu")) {
        validFields.push("NoweSrodkiTransportu");
      }
      if (el(adnotacje, "PMarzy")) {
        validFields.push("PMarzy");
      }

      if (validFields.length > 0) {
        return [
          {
            domain: "semantic",
            aspect: "adnotacje_structure",
            description: "Adnotacje section contains valid fields",
            elements: validFields,
            confidence: validFields.length / (required.length + 3),
          },
        ];
      }
      return [];
    },
  },

  // --- Additional rules from official examples ---

  {
    id: "KOR_REQUIRES_DANE_FA_KORYGOWANEJ",
    description: "Correction invoices must have DaneFaKorygowanej",
    category: "required_field",
    severity: "error",
    check(doc) {
      const fa = el(doc, "Fa");
      if (!fa) {
        return [];
      }

      const rodzaj = text(fa, "RodzajFaktury");
      if (rodzaj !== "KOR") {
        return [];
      }

      if (!el(fa, "DaneFaKorygowanej")) {
        const errorDef = ERROR_CODES.KOR_REQUIRES_DANE_FA_KORYGOWANEJ;
        return [
          {
            code: errorDef.code,
            context: {
              location: {
                xpath: xpath("Fa/DaneFaKorygowanej"),
                element: "DaneFaKorygowanej",
              },
              metadata: {
                invoiceType: "KOR",
              },
            },
            message: errorDef.description,
            fixSuggestions: [],
          },
        ];
      }
      return [];
    },
  },

  {
    id: "SIMPLIFIED_INVOICE_LIMIT",
    description: "Simplified invoices (P_15 <= 450 PLN) validation",
    category: "business_logic",
    severity: "info",
    check(doc) {
      const fa = el(doc, "Fa");
      if (!fa) {
        return [];
      }

      const p15 = text(fa, "P_15");
      if (!p15) {
        return [];
      }

      const amount = parseFloat(p15);
      const issues: ValidationIssue[] = [];

      if (amount <= 450) {
        const podmiot2 = el(doc, "Podmiot2");
        if (podmiot2) {
          const nip = text(podmiot2, "NIP");
          const nazwa = text(podmiot2, "Nazwa");

          if (!nip && nazwa) {
            const infoDef = ERROR_CODES.SIMPLIFIED_INVOICE_BUYER;
            issues.push({
              code: infoDef.code,
              context: {
                location: {
                  xpath: xpath("Podmiot2"),
                  element: "Podmiot2",
                },
                metadata: {
                  invoiceAmount: amount,
                },
              },
              message: infoDef.description,
              fixSuggestions: [],
            });
          }
        }
      }
      return issues;
    },
  },

  {
    id: "WDT_EXPORT_P23",
    description: "WDT and Export invoices validation for P_23",
    category: "business_logic",
    severity: "warning",
    check(doc) {
      const issues: ValidationIssue[] = [];

      let hasWDT = false;
      let hasExport = false;

      for (const wiersz of els(doc, "FaWiersz")) {
        const p12 = text(wiersz, "P_12");
        if (p12 === "0 WDT") {
          hasWDT = true;
        }
        if (p12 === "0 EX") {
          hasExport = true;
        }
      }

      if (hasWDT || hasExport) {
        const p23 = text(doc, "P_23");
        if (!p23 || (p23 !== "1" && p23 !== "2")) {
          const warningDef = ERROR_CODES.WDT_EXPORT_P23_MISSING;
          issues.push({
            code: warningDef.code,
            context: {
              location: {
                xpath: xpath("Fa/Adnotacje/P_23"),
                element: "P_23",
              },
              actualValue: p23 || "missing",
              expectedValues: ["1", "2"],
              metadata: {
                transactionType: hasWDT ? "WDT" : "Export",
              },
            },
            message: `${hasWDT ? "WDT" : "Export"} invoice should have P_23 set to 1 or 2`,
            fixSuggestions: [],
          });
        }
      }
      return issues;
    },
  },

  {
    id: "MARGIN_PROCEDURE_VALIDATION",
    description: "VAT margin procedure validation (PMarzy)",
    category: "business_logic",
    severity: "warning",
    check(doc) {
      const fa = el(doc, "Fa");
      if (!fa) {
        return [];
      }

      const issues: ValidationIssue[] = [];
      let hasMarginProcedure = false;

      for (const wiersz of els(doc, "FaWiersz")) {
        const p12 = text(wiersz, "P_12");
        if (p12 === "marża") {
          hasMarginProcedure = true;
          break;
        }
      }

      if (hasMarginProcedure) {
        const pmarzy = el(doc, "PMarzy");
        if (pmarzy) {
          const pmarzyN = text(pmarzy, "P_PMarzyN");
          if (pmarzyN !== "2") {
            const warningDef = ERROR_CODES.MARGIN_PROCEDURE_PMARZY;
            issues.push({
              code: warningDef.code,
              context: {
                location: {
                  xpath: xpath("Fa/Adnotacje/PMarzy/P_PMarzyN"),
                  element: "P_PMarzyN",
                },
                actualValue: pmarzyN || "missing",
                expectedValues: ["2"],
              },
              message: warningDef.description,
              fixSuggestions: [],
            });
          }
        }
      }
      return issues;
    },
  },

  {
    id: "ADVANCE_INVOICE_VALIDATION",
    description: "Advance invoice (ZAL) specific validation",
    category: "structure",
    severity: "warning",
    check(doc) {
      const fa = el(doc, "Fa");
      if (!fa) {
        return [];
      }

      const rodzaj = text(fa, "RodzajFaktury");
      if (rodzaj !== "ZAL") {
        return [];
      }

      const issues: ValidationIssue[] = [];

      if (!el(fa, "Zamowienie")) {
        const warningDef = ERROR_CODES.ADVANCE_INVOICE_ZAMOWIENIE;
        issues.push({
          code: warningDef.code,
          context: {
            location: {
              xpath: xpath("Fa/Zamowienie"),
              element: "Zamowienie",
            },
            metadata: {
              invoiceType: "ZAL",
            },
          },
          message: warningDef.description,
          fixSuggestions: [],
        });
      }

      const waluta = text(fa, "KodWaluty");
      if (waluta && waluta !== "PLN") {
        if (!el(fa, "KursWalutyZ")) {
          const warningDef = ERROR_CODES.ADVANCE_INVOICE_KURS_WALUTY;
          issues.push({
            code: warningDef.code,
            context: {
              location: {
                xpath: xpath("Fa/KursWalutyZ"),
                element: "KursWalutyZ",
              },
              metadata: {
                invoiceType: "ZAL",
                currency: waluta,
              },
            },
            message: warningDef.description,
            fixSuggestions: [],
          });
        }
      }
      return issues;
    },
  },

  {
    id: "SETTLEMENT_INVOICE_VALIDATION",
    description: "Settlement invoice (ROZ) validation",
    category: "required_field",
    severity: "error",
    check(doc) {
      const fa = el(doc, "Fa");
      if (!fa) {
        return [];
      }

      const rodzaj = text(fa, "RodzajFaktury");
      if (rodzaj !== "ROZ") {
        return [];
      }

      if (!el(fa, "FakturaZaliczkowa")) {
        const errorDef = ERROR_CODES.ROZ_REQUIRES_FAKTURA_ZALICZKOWA;
        return [
          {
            code: errorDef.code,
            context: {
              location: {
                xpath: xpath("Fa/FakturaZaliczkowa"),
                element: "FakturaZaliczkowa",
              },
              metadata: {
                invoiceType: "ROZ",
              },
            },
            message: errorDef.description,
            fixSuggestions: [],
          },
        ];
      }
      return [];
    },
  },

  {
    id: "THIRD_PARTY_VALIDATION",
    description: "Third party (Podmiot3) role validation",
    category: "enumeration",
    severity: "error",
    check(doc) {
      const podmiot3 = el(doc, "Podmiot3");
      if (!podmiot3) {
        return [];
      }

      const issues: ValidationIssue[] = [];
      const rola = text(podmiot3, "Rola");

      if (rola && !["1", "2", "3", "4", "5", "8"].includes(rola)) {
        const errorDef = ERROR_CODES.THIRD_PARTY_INVALID_ROLE;
        issues.push({
          code: errorDef.code,
          context: {
            location: {
              xpath: xpath("Podmiot3/Rola"),
              element: "Rola",
            },
            actualValue: rola,
            expectedValues: ["1", "2", "3", "4", "5", "8"],
          },
          message: `${errorDef.description}. Got: ${rola}`,
          fixSuggestions: [],
        });
      }
      return issues;
    },
  },

  {
    id: "PAYMENT_VALIDATION",
    description: "Payment information validation",
    category: "consistency",
    severity: "warning",
    check(doc) {
      const platnosc = el(doc, "Platnosc");
      if (!platnosc) {
        return [];
      }

      const issues: ValidationIssue[] = [];
      const zaplacono = text(platnosc, "Zaplacono");
      const dataZaplaty = text(platnosc, "DataZaplaty");

      if (zaplacono === "1" && !dataZaplaty) {
        const warningDef = ERROR_CODES.PAYMENT_DATE_MISSING;
        issues.push({
          code: warningDef.code,
          context: {
            location: {
              xpath: xpath("Fa/Platnosc/DataZaplaty"),
              element: "DataZaplaty",
            },
            relatedElements: ["Zaplacono"],
            metadata: {
              paymentStatus: "paid",
            },
          },
          message: warningDef.description,
          fixSuggestions: [],
        });
      }
      return issues;
    },
  },
];

/**
 * Run all semantic validation checks on an XML document.
 * Returns both issues (errors/warnings) and assertions (what passed).
 */
export function checkSemantics(
  doc: XmlDocument,
  collectAssertions: boolean = false,
): {
  issues: ValidationIssue[];
  assertions: ValidationAssertion[];
} {
  const issues = semanticRules.flatMap((rule) => rule.check(doc));

  const assertions = collectAssertions
    ? semanticRules.flatMap((rule) => rule.getAssertions?.(doc) ?? [])
    : [];

  return { issues, assertions };
}
