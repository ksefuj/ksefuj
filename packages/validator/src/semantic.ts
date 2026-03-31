/**
 * @ksefuj/validator - Semantic validation implementation
 *
 * Business logic validation for KSeF FA(3) invoices that cannot
 * be expressed through XSD schema validation alone.
 *
 * Based on the official FA(3) information sheet (March 2026 edition).
 * All rules trace directly to specific sections in the constitution.
 */

import { ERROR_CODES } from "./error-codes.js";
import type {
  CurrencyRate,
  SemanticRule,
  ValidationAssertion,
  ValidationIssue,
  XmlDocument,
} from "./types.js";

// Namespace for FA(3) schema
const NS = "http://crd.gov.pl/wzor/2025/06/25/13775/";
const nsMap = { ns: NS };

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// XML Document Helper Functions
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function el(doc: XmlDocument, xpath: string): XmlDocument | null {
  const results = doc.find(xpath, nsMap);
  return results.length > 0 ? (results[0] as XmlDocument) : null;
}

function els(doc: XmlDocument, xpath: string): XmlDocument[] {
  return doc.find(xpath, nsMap) as XmlDocument[];
}

function text(doc: XmlDocument, xpath: string): string | null {
  const result = doc.eval(xpath, nsMap);
  return typeof result === "string" ? result : null;
}

function exists(doc: XmlDocument, xpath: string): boolean {
  return doc.find(xpath, nsMap).length > 0;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Group 1: Podmiot Rules (Constitution §5–§8)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function checkPodmiot2JST(doc: XmlDocument): ValidationIssue[] {
  // Rule 1: PODMIOT2_JST_MISSING - JST is mandatory in Podmiot2 (§6.1)
  const issues: ValidationIssue[] = [];

  if (!exists(doc, "//ns:Podmiot2/ns:JST")) {
    const errorDef = ERROR_CODES.PODMIOT2_JST_MISSING;
    issues.push({
      code: errorDef.code,
      context: {
        location: {
          xpath: "/Faktura/Podmiot2",
          element: "Podmiot2",
        },
      },
      message: errorDef.description,
      fixSuggestions: errorDef.fixTemplates,
    });
  }

  return issues;
}

function checkPodmiot2GV(doc: XmlDocument): ValidationIssue[] {
  // Rule 2: PODMIOT2_GV_MISSING - GV is mandatory in Podmiot2 (§6.1)
  const issues: ValidationIssue[] = [];

  if (!exists(doc, "//ns:Podmiot2/ns:GV")) {
    const errorDef = ERROR_CODES.PODMIOT2_GV_MISSING;
    issues.push({
      code: errorDef.code,
      context: {
        location: {
          xpath: "/Faktura/Podmiot2",
          element: "Podmiot2",
        },
      },
      message: errorDef.description,
      fixSuggestions: errorDef.fixTemplates,
    });
  }

  return issues;
}

function checkJSTRequiresPodmiot3(doc: XmlDocument): ValidationIssue[] {
  // Rule 3: JST_REQUIRES_PODMIOT3 - When JST = "1", requires Podmiot3 with Rola = "8" (§6.1, Appendix D #3)
  const issues: ValidationIssue[] = [];
  const jst = text(doc, "string(//ns:Podmiot2/ns:JST)");

  if (jst === "1") {
    const hasRole8 = exists(doc, "//ns:Podmiot3[ns:Rola='8']");
    if (!hasRole8) {
      const errorDef = ERROR_CODES.JST_REQUIRES_PODMIOT3;
      issues.push({
        code: errorDef.code,
        context: {
          location: {
            xpath: "/Faktura/Podmiot2/JST",
            element: "JST",
          },
          actualValue: "1",
        },
        message: errorDef.description,
        fixSuggestions: [],
      });
    }
  }

  return issues;
}

function checkGVRequiresPodmiot3(doc: XmlDocument): ValidationIssue[] {
  // Rule 4: GV_REQUIRES_PODMIOT3 - When GV = "1", requires Podmiot3 with Rola = "10" (§6.1, Appendix D #3)
  const issues: ValidationIssue[] = [];
  const gv = text(doc, "string(//ns:Podmiot2/ns:GV)");

  if (gv === "1") {
    const hasRole10 = exists(doc, "//ns:Podmiot3[ns:Rola='10']");
    if (!hasRole10) {
      const errorDef = ERROR_CODES.GV_REQUIRES_PODMIOT3;
      issues.push({
        code: errorDef.code,
        context: {
          location: {
            xpath: "/Faktura/Podmiot2/GV",
            element: "GV",
          },
          actualValue: "1",
        },
        message: errorDef.description,
        fixSuggestions: [],
      });
    }
  }

  return issues;
}

function checkNIPInWrongField(doc: XmlDocument): ValidationIssue[] {
  // Rule 5: NIP_IN_WRONG_FIELD - Polish NIP should be in NIP field, not NrVatUE (§2.10, §6.2)
  const issues: ValidationIssue[] = [];
  const nrVatUE = text(doc, "string(//ns:Podmiot2/ns:DaneIdentyfikacyjne/ns:NrVatUE)");

  if (nrVatUE && /^[0-9]{10}$/.test(nrVatUE)) {
    // Looks like a Polish NIP (10 digits, no letters)
    const errorDef = ERROR_CODES.NIP_IN_WRONG_FIELD;
    issues.push({
      code: errorDef.code,
      context: {
        location: {
          xpath: "/Faktura/Podmiot2/DaneIdentyfikacyjne/NrVatUE",
          element: "NrVatUE",
        },
        actualValue: nrVatUE,
      },
      message: errorDef.description,
      fixSuggestions: [],
    });
  }

  return issues;
}

function checkPodmiot3UdzialRole(doc: XmlDocument): ValidationIssue[] {
  // Rule 6: PODMIOT3_UDZIAL_REQUIRES_ROLE_4 - Udzial only with Rola = "4" (§7.2)
  const issues: ValidationIssue[] = [];
  const podmiot3s = els(doc, "//ns:Podmiot3[ns:Udzial]");

  for (const p3 of podmiot3s) {
    const rola = text(p3, "string(ns:Rola)");
    if (rola !== "4") {
      const errorDef = ERROR_CODES.PODMIOT3_UDZIAL_REQUIRES_ROLE_4;
      issues.push({
        code: errorDef.code,
        context: {
          location: {
            xpath: "/Faktura/Podmiot3",
            element: "Podmiot3",
          },
          actualValue: rola || undefined,
        },
        message: errorDef.description,
        fixSuggestions: [],
      });
    }
  }

  return issues;
}

function checkPodmiot3RoleMissing(doc: XmlDocument): ValidationIssue[] {
  // Rule 7: PODMIOT3_ROLE_MISSING - Role definition requirements (§7.3)
  const issues: ValidationIssue[] = [];
  const podmiot3s = els(doc, "//ns:Podmiot3");

  for (const p3 of podmiot3s) {
    const hasRola = exists(p3, "ns:Rola");
    const hasRolaInna = exists(p3, "ns:RolaInna");
    const hasOpisRoli = exists(p3, "ns:OpisRoli");
    const rolaInnaValue = text(p3, "string(ns:RolaInna)");

    if (!hasRola) {
      // When no Rola, both RolaInna and OpisRoli required
      if (!hasRolaInna || !hasOpisRoli) {
        const errorDef = ERROR_CODES.PODMIOT3_ROLE_MISSING;
        issues.push({
          code: errorDef.code,
          context: {
            location: {
              xpath: "/Faktura/Podmiot3",
              element: "Podmiot3",
            },
          },
          message: errorDef.description,
          fixSuggestions: [],
        });
      }
    } else if (rolaInnaValue === "1" && !hasOpisRoli) {
      // When RolaInna = "1", OpisRoli is mandatory
      const errorDef = ERROR_CODES.PODMIOT3_ROLE_MISSING;
      issues.push({
        code: errorDef.code,
        context: {
          location: {
            xpath: "/Faktura/Podmiot3",
            element: "Podmiot3",
          },
          actualValue: "RolaInna=1",
        },
        message: errorDef.description,
        fixSuggestions: [],
      });
    }
  }

  return issues;
}

function checkSelfBillingPodmiot3(doc: XmlDocument): ValidationIssue[] {
  // Rule 8: SELF_BILLING_PODMIOT3_CONFLICT - Self-billing conflicts (§7.3, §9.6)
  const issues: ValidationIssue[] = [];
  const p17 = text(doc, "string(//ns:Fa/ns:Adnotacje/ns:P_17)");

  if (p17 === "1") {
    // Self-billing invoice
    const hasRole5 = exists(doc, "//ns:Podmiot3[ns:Rola='5']");
    if (hasRole5) {
      const errorDef = ERROR_CODES.SELF_BILLING_PODMIOT3_CONFLICT;
      issues.push({
        code: errorDef.code,
        context: {
          location: {
            xpath: "/Faktura/Podmiot3",
            element: "Podmiot3",
          },
          actualValue: "Rola=5",
        },
        message: errorDef.description,
        fixSuggestions: [],
      });
    }
  }

  return issues;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Group 2: Fa Core Rules (Constitution §9)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function checkP15Missing(doc: XmlDocument): ValidationIssue[] {
  // Rule 9: P15_MISSING - P_15 is mandatory (§9.4)
  const issues: ValidationIssue[] = [];

  if (!exists(doc, "//ns:Fa/ns:P_15")) {
    const errorDef = ERROR_CODES.P15_MISSING;
    issues.push({
      code: errorDef.code,
      context: {
        location: {
          xpath: "/Faktura/Fa",
          element: "Fa",
        },
      },
      message: errorDef.description,
      fixSuggestions: [],
    });
  }

  return issues;
}

function checkP6P6AMutualExclusion(doc: XmlDocument): ValidationIssue[] {
  // Rule 10: P6_P6A_MUTUAL_EXCLUSION - P_6 and P_6A are mutually exclusive (§9.2, §10.2, Appendix D #8)
  const issues: ValidationIssue[] = [];
  const hasP6 = exists(doc, "//ns:Fa/ns:P_6");
  const hasP6A = exists(doc, "//ns:FaWiersz/ns:P_6A");

  if (hasP6 && hasP6A) {
    const errorDef = ERROR_CODES.P6_P6A_MUTUAL_EXCLUSION;
    issues.push({
      code: errorDef.code,
      context: {
        location: {
          xpath: "/Faktura/Fa",
          element: "Fa",
        },
      },
      message: errorDef.description,
      fixSuggestions: [],
    });
  }

  return issues;
}

function checkRodzajFakturySections(doc: XmlDocument): ValidationIssue[] {
  // Rule 11: RODZAJ_FAKTURY_SECTIONS - Invoice type determines required sections (§9.5, §9.7, §9.9, §14)
  const issues: ValidationIssue[] = [];
  const rodzajFaktury = text(doc, "string(//ns:Fa/ns:RodzajFaktury)");

  if (!rodzajFaktury) {
    return issues;
  }

  // Corrective invoices require DaneFaKorygowanej
  if (["KOR", "KOR_ZAL", "KOR_ROZ"].includes(rodzajFaktury)) {
    if (!exists(doc, "//ns:Fa/ns:DaneFaKorygowanej")) {
      const errorDef = ERROR_CODES.RODZAJ_FAKTURY_SECTIONS;
      issues.push({
        code: errorDef.code,
        context: {
          location: {
            xpath: "/Faktura/Fa",
            element: "Fa",
          },
          actualValue: rodzajFaktury,
        },
        message: `${errorDef.description} - ${rodzajFaktury} requires DaneFaKorygowanej`,
        fixSuggestions: [],
      });
    }
  }

  // Advance invoices require Zamowienie
  if (rodzajFaktury === "ZAL") {
    if (!exists(doc, "//ns:Fa/ns:Zamowienie")) {
      const errorDef = ERROR_CODES.RODZAJ_FAKTURY_SECTIONS;
      issues.push({
        code: errorDef.code,
        context: {
          location: {
            xpath: "/Faktura/Fa",
            element: "Fa",
          },
          actualValue: rodzajFaktury,
        },
        message: `${errorDef.description} - ZAL requires Zamowienie`,
        fixSuggestions: [],
      });
    }
  }

  // Final invoices require FakturaZaliczkowa
  if (rodzajFaktury === "ROZ") {
    if (!exists(doc, "//ns:Fa/ns:FakturaZaliczkowa")) {
      const errorDef = ERROR_CODES.RODZAJ_FAKTURY_SECTIONS;
      issues.push({
        code: errorDef.code,
        context: {
          location: {
            xpath: "/Faktura/Fa",
            element: "Fa",
          },
          actualValue: rodzajFaktury,
        },
        message: `${errorDef.description} - ROZ requires FakturaZaliczkowa`,
        fixSuggestions: [],
      });
    }
  }

  return issues;
}

function checkKursWalutyZPlacement(doc: XmlDocument): ValidationIssue[] {
  // Rule 12: KURS_WALUTY_Z_PLACEMENT - KursWalutyZ only for advance invoices (§9.2, §9.5)
  const issues: ValidationIssue[] = [];
  const hasKursWalutyZ = exists(doc, "//ns:Fa/ns:KursWalutyZ");
  const rodzajFaktury = text(doc, "string(//ns:Fa/ns:RodzajFaktury)");

  if (hasKursWalutyZ && rodzajFaktury && !["ZAL", "KOR_ZAL"].includes(rodzajFaktury)) {
    const errorDef = ERROR_CODES.KURS_WALUTY_Z_PLACEMENT;
    issues.push({
      code: errorDef.code,
      context: {
        location: {
          xpath: "/Faktura/Fa/KursWalutyZ",
          element: "KursWalutyZ",
        },
        actualValue: rodzajFaktury,
      },
      message: errorDef.description,
      fixSuggestions: [],
    });
  }

  return issues;
}

function checkForeignCurrencyTaxPLN(doc: XmlDocument): ValidationIssue[] {
  // Rule 13: FOREIGN_CURRENCY_TAX_PLN - Foreign currency needs PLN conversion (§9.3)
  const issues: ValidationIssue[] = [];
  const kodWaluty = text(doc, "string(//ns:Fa/ns:KodWaluty)");

  if (kodWaluty && kodWaluty !== "PLN") {
    // Check if any P_13_x fields exist
    const hasP13_1 = exists(doc, "//ns:Fa/ns:P_13_1");
    const hasP13_2 = exists(doc, "//ns:Fa/ns:P_13_2");
    const hasP13_3 = exists(doc, "//ns:Fa/ns:P_13_3");
    const hasP13_4 = exists(doc, "//ns:Fa/ns:P_13_4");

    // Check if corresponding P_14_xW fields exist
    const hasP14_1W = exists(doc, "//ns:Fa/ns:P_14_1W");
    const hasP14_2W = exists(doc, "//ns:Fa/ns:P_14_2W");
    const hasP14_3W = exists(doc, "//ns:Fa/ns:P_14_3W");
    const hasP14_4W = exists(doc, "//ns:Fa/ns:P_14_4W");

    if (
      (hasP13_1 && !hasP14_1W) ||
      (hasP13_2 && !hasP14_2W) ||
      (hasP13_3 && !hasP14_3W) ||
      (hasP13_4 && !hasP14_4W)
    ) {
      const errorDef = ERROR_CODES.FOREIGN_CURRENCY_TAX_PLN;
      issues.push({
        code: errorDef.code,
        context: {
          location: {
            xpath: "/Faktura/Fa",
            element: "Fa",
          },
          actualValue: kodWaluty,
        },
        message: errorDef.description,
        fixSuggestions: [],
      });
    }
  } else if (kodWaluty === "PLN") {
    // Check if any P_14_xW fields exist (they shouldn't for PLN)
    if (
      exists(doc, "//ns:Fa/*[starts-with(local-name(), 'P_14_') and contains(local-name(), 'W')]")
    ) {
      const errorDef = ERROR_CODES.FOREIGN_CURRENCY_TAX_PLN;
      issues.push({
        code: errorDef.code,
        context: {
          location: {
            xpath: "/Faktura/Fa",
            element: "Fa",
          },
          actualValue: "PLN",
        },
        message: "P_14_*W fields should not exist when KodWaluty = PLN",
        fixSuggestions: [],
      });
    }
  }

  return issues;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Group 3: Adnotacje Rules (Constitution §9.6)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function checkAdnotacjeMandatoryFields(doc: XmlDocument): ValidationIssue[] {
  // Rules 14-21: All mandatory fields in Adnotacje (§9.6)
  const issues: ValidationIssue[] = [];
  const adnotacje = el(doc, "//ns:Fa/ns:Adnotacje");

  if (!adnotacje) {
    // If Adnotacje doesn't exist, XSD will catch it
    return issues;
  }

  // Check each mandatory field
  const mandatoryFields = [
    { field: "P_16", error: ERROR_CODES.ADNOTACJE_P16_MISSING },
    { field: "P_17", error: ERROR_CODES.ADNOTACJE_P17_MISSING },
    { field: "P_18", error: ERROR_CODES.ADNOTACJE_P18_MISSING },
    { field: "P_18A", error: ERROR_CODES.ADNOTACJE_P18A_MISSING },
    { field: "Zwolnienie", error: ERROR_CODES.ADNOTACJE_ZWOLNIENIE_MISSING },
    { field: "NoweSrodkiTransportu", error: ERROR_CODES.ADNOTACJE_NST_MISSING },
    { field: "P_23", error: ERROR_CODES.ADNOTACJE_P23_MISSING },
    { field: "PMarzy", error: ERROR_CODES.ADNOTACJE_PMARZY_MISSING },
  ];

  for (const { field, error } of mandatoryFields) {
    if (!exists(adnotacje, `ns:${field}`)) {
      issues.push({
        code: error.code,
        context: {
          location: {
            xpath: "/Faktura/Fa/Adnotacje",
            element: "Adnotacje",
          },
        },
        message: error.description,
        fixSuggestions: error.fixTemplates,
      });
    }
  }

  return issues;
}

function checkZwolnienieLogic(doc: XmlDocument): ValidationIssue[] {
  // Rule 22: ZWOLNIENIE_LOGIC - Selection-type logic for exemptions (§9.6)
  const issues: ValidationIssue[] = [];
  const zwolnienie = el(doc, "//ns:Fa/ns:Adnotacje/ns:Zwolnienie");

  if (!zwolnienie) {
    return issues;
  }

  const p19 = text(zwolnienie, "string(ns:P_19)");
  const p19N = text(zwolnienie, "string(ns:P_19N)");
  const p19A = text(zwolnienie, "string(ns:P_19A)");
  const p19B = text(zwolnienie, "string(ns:P_19B)");
  const p19C = text(zwolnienie, "string(ns:P_19C)");

  // Exactly one of P_19 or P_19N must be "1"
  if ((p19 === "1" && p19N === "1") || (p19 !== "1" && p19N !== "1")) {
    const errorDef = ERROR_CODES.ZWOLNIENIE_LOGIC;
    issues.push({
      code: errorDef.code,
      context: {
        location: {
          xpath: "/Faktura/Fa/Adnotacje/Zwolnienie",
          element: "Zwolnienie",
        },
        actualValue: `P_19=${p19}, P_19N=${p19N}`,
      },
      message: errorDef.description,
      fixSuggestions: [],
    });
  }

  // If P_19 = "1", exactly one of P_19A/B/C must be filled
  if (p19 === "1") {
    const filledCount = [p19A, p19B, p19C].filter((v) => v && v !== "").length;
    if (filledCount !== 1) {
      const errorDef = ERROR_CODES.ZWOLNIENIE_LOGIC;
      issues.push({
        code: errorDef.code,
        context: {
          location: {
            xpath: "/Faktura/Fa/Adnotacje/Zwolnienie",
            element: "Zwolnienie",
          },
          actualValue: `P_19=1, but ${filledCount} exemption fields filled`,
        },
        message: errorDef.description,
        fixSuggestions: [],
      });
    }
  }

  // If P_19N = "1", P_19A/B/C must all be absent
  if (p19N === "1") {
    if (p19A || p19B || p19C) {
      const errorDef = ERROR_CODES.ZWOLNIENIE_LOGIC;
      issues.push({
        code: errorDef.code,
        context: {
          location: {
            xpath: "/Faktura/Fa/Adnotacje/Zwolnienie",
            element: "Zwolnienie",
          },
          actualValue: "P_19N=1 but exemption fields present",
        },
        message: errorDef.description,
        fixSuggestions: [],
      });
    }
  }

  return issues;
}

function checkNSTLogic(doc: XmlDocument): ValidationIssue[] {
  // Rule 23: NST_LOGIC - Selection-type logic for new transport means (§9.6)
  const issues: ValidationIssue[] = [];
  const nst = el(doc, "//ns:Fa/ns:Adnotacje/ns:NoweSrodkiTransportu");

  if (!nst) {
    return issues;
  }

  const p22 = text(nst, "string(ns:P_22)");
  const p22N = text(nst, "string(ns:P_22N)");
  const p42_5 = text(nst, "string(ns:P_42_5)");
  const hasNowySrodek = exists(nst, "ns:NowySrodekTransportu");

  // Exactly one of P_22 or P_22N must be "1"
  if ((p22 === "1" && p22N === "1") || (p22 !== "1" && p22N !== "1")) {
    const errorDef = ERROR_CODES.NST_LOGIC;
    issues.push({
      code: errorDef.code,
      context: {
        location: {
          xpath: "/Faktura/Fa/Adnotacje/NoweSrodkiTransportu",
          element: "NoweSrodkiTransportu",
        },
        actualValue: `P_22=${p22}, P_22N=${p22N}`,
      },
      message: errorDef.description,
      fixSuggestions: [],
    });
  }

  // If P_22 = "1", P_42_5 and NowySrodekTransportu required
  if (p22 === "1") {
    if (!p42_5 || !hasNowySrodek) {
      const errorDef = ERROR_CODES.NST_LOGIC;
      issues.push({
        code: errorDef.code,
        context: {
          location: {
            xpath: "/Faktura/Fa/Adnotacje/NoweSrodkiTransportu",
            element: "NoweSrodkiTransportu",
          },
          actualValue: "P_22=1 but vehicle details missing",
        },
        message: errorDef.description,
        fixSuggestions: [],
      });
    }
  }

  // If P_22N = "1", P_42_5 and NowySrodekTransportu must be absent
  if (p22N === "1") {
    if (p42_5 || hasNowySrodek) {
      const errorDef = ERROR_CODES.NST_LOGIC;
      issues.push({
        code: errorDef.code,
        context: {
          location: {
            xpath: "/Faktura/Fa/Adnotacje/NoweSrodkiTransportu",
            element: "NoweSrodkiTransportu",
          },
          actualValue: "P_22N=1 but vehicle fields present",
        },
        message: errorDef.description,
        fixSuggestions: [],
      });
    }
  }

  return issues;
}

function checkPMarzyLogic(doc: XmlDocument): ValidationIssue[] {
  // Rule 24: PMARZY_LOGIC - Selection-type logic for margin procedures (§9.6)
  const issues: ValidationIssue[] = [];
  const pmarzy = el(doc, "//ns:Fa/ns:Adnotacje/ns:PMarzy");

  if (!pmarzy) {
    return issues;
  }

  const pPMarzy = text(pmarzy, "string(ns:P_PMarzy)");
  const pPMarzyN = text(pmarzy, "string(ns:P_PMarzyN)");
  const pPMarzy_2 = text(pmarzy, "string(ns:P_PMarzy_2)");
  const pPMarzy_3_1 = text(pmarzy, "string(ns:P_PMarzy_3_1)");
  const pPMarzy_3_2 = text(pmarzy, "string(ns:P_PMarzy_3_2)");
  const pPMarzy_3_3 = text(pmarzy, "string(ns:P_PMarzy_3_3)");

  // Exactly one of P_PMarzy or P_PMarzyN must be "1"
  if ((pPMarzy === "1" && pPMarzyN === "1") || (pPMarzy !== "1" && pPMarzyN !== "1")) {
    const errorDef = ERROR_CODES.PMARZY_LOGIC;
    issues.push({
      code: errorDef.code,
      context: {
        location: {
          xpath: "/Faktura/Fa/Adnotacje/PMarzy",
          element: "PMarzy",
        },
        actualValue: `P_PMarzy=${pPMarzy}, P_PMarzyN=${pPMarzyN}`,
      },
      message: errorDef.description,
      fixSuggestions: [],
    });
  }

  // If P_PMarzy = "1", exactly one procedure type required
  if (pPMarzy === "1") {
    const filledCount = [pPMarzy_2, pPMarzy_3_1, pPMarzy_3_2, pPMarzy_3_3].filter(
      (v) => v && v !== "",
    ).length;
    if (filledCount !== 1) {
      const errorDef = ERROR_CODES.PMARZY_LOGIC;
      issues.push({
        code: errorDef.code,
        context: {
          location: {
            xpath: "/Faktura/Fa/Adnotacje/PMarzy",
            element: "PMarzy",
          },
          actualValue: `P_PMarzy=1, but ${filledCount} procedure types filled`,
        },
        message: errorDef.description,
        fixSuggestions: [],
      });
    }
  }

  // If P_PMarzyN = "1", all margin fields must be absent
  if (pPMarzyN === "1") {
    if (pPMarzy_2 || pPMarzy_3_1 || pPMarzy_3_2 || pPMarzy_3_3) {
      const errorDef = ERROR_CODES.PMARZY_LOGIC;
      issues.push({
        code: errorDef.code,
        context: {
          location: {
            xpath: "/Faktura/Fa/Adnotacje/PMarzy",
            element: "PMarzy",
          },
          actualValue: "P_PMarzyN=1 but margin fields present",
        },
        message: errorDef.description,
        fixSuggestions: [],
      });
    }
  }

  return issues;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Group 4: FaWiersz Rules (Constitution §10)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function checkP12Enumeration(doc: XmlDocument): ValidationIssue[] {
  // Rule 25: P12_ENUMERATION - P_12 must be valid tax rate code (§10.3)
  const issues: ValidationIssue[] = [];
  const validRates = [
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
  const faWiersze = els(doc, "//ns:FaWiersz");

  for (const wiersz of faWiersze) {
    const p12 = text(wiersz, "string(ns:P_12)");
    const nrWiersza = text(wiersz, "string(ns:NrWierszaFa)");

    if (p12 && !validRates.includes(p12)) {
      const errorDef = ERROR_CODES.P12_ENUMERATION;
      issues.push({
        code: errorDef.code,
        context: {
          location: {
            xpath: `/Faktura/FaWiersz[NrWierszaFa='${nrWiersza}']/P_12`,
            element: "P_12",
            lineNumber: nrWiersza ? parseInt(nrWiersza) : undefined,
          },
          actualValue: p12,
          expectedValues: validRates,
        },
        message: errorDef.description,
        fixSuggestions: [],
      });
    }
  }

  return issues;
}

function checkOORateForeignBuyer(doc: XmlDocument): ValidationIssue[] {
  // Rule 26: OO_RATE_FOREIGN_BUYER - 'oo' is for domestic reverse charge only (§10.3, Appendix D #18)
  const issues: ValidationIssue[] = [];

  // Check if buyer is foreign
  const kodKraju = text(doc, "string(//ns:Podmiot2/ns:Adres/ns:KodKraju)");
  const hasKodUE = exists(doc, "//ns:Podmiot2/ns:DaneIdentyfikacyjne/ns:KodUE");
  const hasNrVatUE = exists(doc, "//ns:Podmiot2/ns:DaneIdentyfikacyjne/ns:NrVatUE");

  const isForeignBuyer = (kodKraju && kodKraju !== "PL") || hasKodUE || hasNrVatUE;

  if (isForeignBuyer) {
    const faWiersze = els(doc, "//ns:FaWiersz[ns:P_12='oo']");

    for (const wiersz of faWiersze) {
      const nrWiersza = text(wiersz, "string(ns:NrWierszaFa)");
      const errorDef = ERROR_CODES.OO_RATE_FOREIGN_BUYER;
      issues.push({
        code: errorDef.code,
        context: {
          location: {
            xpath: `/Faktura/FaWiersz[NrWierszaFa='${nrWiersza}']/P_12`,
            element: "P_12",
            lineNumber: nrWiersza ? parseInt(nrWiersza) : undefined,
          },
          actualValue: "oo",
        },
        message: errorDef.description,
        fixSuggestions: [],
      });
    }
  }

  return issues;
}

function checkGTUFormat(doc: XmlDocument): ValidationIssue[] {
  // Rule 27: GTU_FORMAT - GTU must match pattern GTU_XX (§10.4)
  const issues: ValidationIssue[] = [];
  const validGTUPattern = /^GTU_(0[1-9]|1[0-3])$/;
  const faWiersze = els(doc, "//ns:FaWiersz[ns:GTU]");

  for (const wiersz of faWiersze) {
    const gtu = text(wiersz, "string(ns:GTU)");
    const nrWiersza = text(wiersz, "string(ns:NrWierszaFa)");

    if (gtu && !validGTUPattern.test(gtu)) {
      const errorDef = ERROR_CODES.GTU_FORMAT;
      issues.push({
        code: errorDef.code,
        context: {
          location: {
            xpath: `/Faktura/FaWiersz[NrWierszaFa='${nrWiersza}']/GTU`,
            element: "GTU",
            lineNumber: nrWiersza ? parseInt(nrWiersza) : undefined,
          },
          actualValue: gtu,
        },
        message: errorDef.description,
        fixSuggestions: [],
      });
    }
  }

  // Also check for common mistake: GTU as element name instead of value
  const wrongGTUs = els(doc, "//*[starts-with(local-name(), 'GTU_')]");
  for (const wrongGTU of wrongGTUs) {
    const errorDef = ERROR_CODES.GTU_FORMAT;
    issues.push({
      code: errorDef.code,
      context: {
        location: {
          element: wrongGTU.eval("local-name()", {}) as string,
        },
      },
      message: "Wrong GTU format: GTU code should be element value, not element name",
      fixSuggestions: [],
    });
  }

  return issues;
}

function checkDecimalPrecision(doc: XmlDocument): ValidationIssue[] {
  // Rule 28: DECIMAL_PRECISION - Check decimal precision limits (§2.6)
  const issues: ValidationIssue[] = [];

  // Define field precision limits based on §2.6 of FA(3) specification
  const precisionRules = {
    // Up to 2 decimal places - General amounts
    2: [
      "P_11",
      "P_11A",
      "P_11Vat",
      "P_13_1",
      "P_13_2",
      "P_13_3",
      "P_13_4",
      "P_13_5",
      "P_13_6",
      "P_13_7",
      "P_13_8",
      "P_13_9",
      "P_13_10",
      "P_13_11",
      "P_14_1",
      "P_14_2",
      "P_14_3",
      "P_14_4",
      "P_14_5",
      "P_14_1W",
      "P_14_2W",
      "P_14_3W",
      "P_14_4W",
      "P_14_5W",
      "P_15",
      "WartoscZamowienia",
    ],
    // Up to 6 decimal places - Quantities, rates, exchange rates
    6: [
      "P_8B",
      "P_8BZ",
      "P_12_XII",
      "P_12Z_XII",
      "KursWaluty",
      "KursWalutyZK",
      "KursWalutyZW",
      "KursWalutyZ",
      "KursUmowny",
      "Udzial",
    ],
    // Up to 8 decimal places - Unit prices, discounts
    8: ["P_9A", "P_9B", "P_9AZ", "P_10"],
  };

  // Helper function to count decimal places
  function getDecimalPlaces(value: string): number {
    const decimalIndex = value.indexOf(".");
    return decimalIndex === -1 ? 0 : value.length - decimalIndex - 1;
  }

  // Helper function to validate field precision
  function validateFieldPrecision(
    field: string,
    value: string,
    maxPrecision: number,
    xpath: string,
  ): void {
    if (!value || !/^-?\d*\.?\d*$/.test(value)) {
      return; // Skip non-numeric values
    }

    const decimalPlaces = getDecimalPlaces(value);
    if (decimalPlaces > maxPrecision) {
      const errorDef = ERROR_CODES.DECIMAL_PRECISION;
      issues.push({
        code: errorDef.code,
        context: {
          location: {
            xpath,
            element: field,
          },
          actualValue: value,
          expectedValues: [`Max ${maxPrecision} decimal places`],
          metadata: {
            actualPrecision: decimalPlaces,
            maxPrecision,
            field,
          },
        },
        message: `${errorDef.description}: ${field} has ${decimalPlaces} decimal places, maximum allowed is ${maxPrecision}`,
        fixSuggestions: [
          {
            type: "replace",
            targetXPath: xpath,
            content: parseFloat(value).toFixed(maxPrecision),
            description: `Round ${field} to ${maxPrecision} decimal places`,
            confidence: 0.8,
            dependencies: [],
          },
        ],
      });
    }
  }

  // Check all precision rules
  for (const [maxPrecision, fields] of Object.entries(precisionRules)) {
    const precision = parseInt(maxPrecision);

    for (const field of fields) {
      // Check Fa level
      const faValue = text(doc, `string(//ns:Fa/ns:${field})`);
      if (faValue) {
        validateFieldPrecision(field, faValue, precision, `/Faktura/Fa/${field}`);
      }

      // Check FaWiersz level (only for fields that can appear there)
      if (
        [
          "P_8B",
          "P_8BZ",
          "P_9A",
          "P_9B",
          "P_9AZ",
          "P_10",
          "P_11",
          "P_11A",
          "P_11Vat",
          "KursWaluty",
        ].includes(field)
      ) {
        const faWiersze = els(doc, "//ns:FaWiersz");
        for (const wiersz of faWiersze) {
          const nrWiersza = text(wiersz, "string(ns:NrWierszaFa)");
          const value = text(wiersz, `string(ns:${field})`);
          if (value) {
            validateFieldPrecision(
              field,
              value,
              precision,
              `/Faktura/FaWiersz[NrWierszaFa='${nrWiersza}']/${field}`,
            );
          }
        }
      }
    }
  }

  return issues;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Group 5: Corrective Invoice Rules (Constitution §9.7)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function checkKorNrKSeFConsistency(doc: XmlDocument): ValidationIssue[] {
  // Rule 29: KOR_NRKSEF_CONSISTENCY - NrKSeF/NrKSeFN logic (§9.7)
  const issues: ValidationIssue[] = [];
  const daneFaKorygowanej = el(doc, "//ns:Fa/ns:DaneFaKorygowanej");

  if (!daneFaKorygowanej) {
    return issues;
  }

  const nrKSeF = text(daneFaKorygowanej, "string(ns:NrKSeF)");
  const nrKSeFN = text(daneFaKorygowanej, "string(ns:NrKSeFN)");
  const nrKSeFFaKorygowanej = text(daneFaKorygowanej, "string(ns:NrKSeFFaKorygowanej)");

  // Exactly one of NrKSeF or NrKSeFN must be "1"
  if ((nrKSeF === "1" && nrKSeFN === "1") || (nrKSeF !== "1" && nrKSeFN !== "1")) {
    const errorDef = ERROR_CODES.KOR_NRKSEF_CONSISTENCY;
    issues.push({
      code: errorDef.code,
      context: {
        location: {
          xpath: "/Faktura/Fa/DaneFaKorygowanej",
          element: "DaneFaKorygowanej",
        },
        actualValue: `NrKSeF=${nrKSeF}, NrKSeFN=${nrKSeFN}`,
      },
      message: errorDef.description,
      fixSuggestions: [],
    });
  }

  // When NrKSeF = "1", NrKSeFFaKorygowanej is required
  if (nrKSeF === "1" && !nrKSeFFaKorygowanej) {
    const errorDef = ERROR_CODES.KOR_NRKSEF_CONSISTENCY;
    issues.push({
      code: errorDef.code,
      context: {
        location: {
          xpath: "/Faktura/Fa/DaneFaKorygowanej",
          element: "DaneFaKorygowanej",
        },
        actualValue: "NrKSeF=1 but NrKSeFFaKorygowanej missing",
      },
      message: errorDef.description,
      fixSuggestions: [],
    });
  }

  // When NrKSeFN = "1", NrKSeFFaKorygowanej must be absent
  if (nrKSeFN === "1" && nrKSeFFaKorygowanej) {
    const errorDef = ERROR_CODES.KOR_NRKSEF_CONSISTENCY;
    issues.push({
      code: errorDef.code,
      context: {
        location: {
          xpath: "/Faktura/Fa/DaneFaKorygowanej",
          element: "DaneFaKorygowanej",
        },
        actualValue: "NrKSeFN=1 but NrKSeFFaKorygowanej present",
      },
      message: errorDef.description,
      fixSuggestions: [],
    });
  }

  return issues;
}

function checkReverseChargeConsistency(doc: XmlDocument): ValidationIssue[] {
  // Rule 30: REVERSE_CHARGE_CONSISTENCY - Reverse charge field consistency (§9.4, §9.6)
  const issues: ValidationIssue[] = [];

  const p13_8 = text(doc, "string(//ns:Fa/ns:P_13_8)");
  const p13_10 = text(doc, "string(//ns:Fa/ns:P_13_10)");
  const p18 = text(doc, "string(//ns:Fa/ns:Adnotacje/ns:P_18)");

  // If P_13_8 or P_13_10 present, P_18 should be "1"
  if ((p13_8 || p13_10) && p18 !== "1") {
    const errorDef = ERROR_CODES.REVERSE_CHARGE_CONSISTENCY;
    issues.push({
      code: errorDef.code,
      context: {
        location: {
          xpath: "/Faktura/Fa/Adnotacje/P_18",
          element: "P_18",
        },
        actualValue: p18 || undefined,
      },
      message: "Reverse charge amounts (P_13_8/P_13_10) present but P_18 not set to 1",
      fixSuggestions: [],
    });
  }

  // If P_18 = "1", at least one FaWiersz should have reverse charge rate
  if (p18 === "1") {
    const hasReverseChargeRate = exists(
      doc,
      "//ns:FaWiersz[ns:P_12='np I' or ns:P_12='np II' or ns:P_12='oo']",
    );
    if (!hasReverseChargeRate) {
      const errorDef = ERROR_CODES.REVERSE_CHARGE_CONSISTENCY;
      issues.push({
        code: errorDef.code,
        context: {
          location: {
            xpath: "/Faktura/Fa/Adnotacje/P_18",
            element: "P_18",
          },
          actualValue: "1",
        },
        message: "P_18 = 1 but no line items with reverse charge tax rates (np I, np II, oo)",
        fixSuggestions: [],
      });
    }
  }

  return issues;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Group 6: Payment & Transaction Rules (Constitution §12–§13)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function checkPaymentZaplaconoDate(doc: XmlDocument): ValidationIssue[] {
  // Rule 31: PAYMENT_ZAPLACONO_DATE - Zaplacono=1 requires DataZaplaty (§12.1)
  const issues: ValidationIssue[] = [];
  const platnosc = el(doc, "//ns:Fa/ns:Platnosc");

  if (!platnosc) {
    return issues;
  }

  const zaplacono = text(platnosc, "string(ns:Zaplacono)");
  const dataZaplaty = text(platnosc, "string(ns:DataZaplaty)");

  if (zaplacono === "1" && !dataZaplaty) {
    const errorDef = ERROR_CODES.PAYMENT_ZAPLACONO_DATE;
    issues.push({
      code: errorDef.code,
      context: {
        location: {
          xpath: "/Faktura/Fa/Platnosc",
          element: "Platnosc",
        },
        actualValue: "Zaplacono=1",
      },
      message: errorDef.description,
      fixSuggestions: [],
    });
  }

  return issues;
}

function checkRachunekBankowyNrRB(doc: XmlDocument): ValidationIssue[] {
  // Rule 32: RACHUNEKBANKOWY_NRRB - Nested obligation for NrRB (§2.2, §12.1, Appendix D #4)
  const issues: ValidationIssue[] = [];
  const rachunekBankowy = el(doc, "//ns:Fa/ns:Platnosc/ns:RachunekBankowy");

  if (!rachunekBankowy) {
    return issues;
  }

  // Check if RachunekBankowy has any content at all
  const hasAnyContent = els(rachunekBankowy, "ns:*").length > 0;
  const nrRB = text(rachunekBankowy, "string(ns:NrRB)");

  if (hasAnyContent && !nrRB) {
    const errorDef = ERROR_CODES.RACHUNEKBANKOWY_NRRB;
    issues.push({
      code: errorDef.code,
      context: {
        location: {
          xpath: "/Faktura/Fa/Platnosc/RachunekBankowy",
          element: "RachunekBankowy",
        },
      },
      message: errorDef.description,
      fixSuggestions: [],
    });
  }

  return issues;
}

function checkNrRBLength(doc: XmlDocument): ValidationIssue[] {
  // Rule 33: NRRB_LENGTH - NrRB must be 10-34 characters (§12.1)
  const issues: ValidationIssue[] = [];
  const nrRB = text(doc, "string(//ns:Fa/ns:Platnosc/ns:RachunekBankowy/ns:NrRB)");

  if (nrRB && (nrRB.length < 10 || nrRB.length > 34)) {
    const errorDef = ERROR_CODES.NRRB_LENGTH;
    issues.push({
      code: errorDef.code,
      context: {
        location: {
          xpath: "/Faktura/Fa/Platnosc/RachunekBankowy/NrRB",
          element: "NrRB",
        },
        actualValue: `${nrRB} (length: ${nrRB.length})`,
      },
      message: errorDef.description,
      fixSuggestions: [],
    });
  }

  return issues;
}

function checkIPKSeFFormat(doc: XmlDocument): ValidationIssue[] {
  // Rule 34: IPKSEF_FORMAT - IPKSeF must be 13 alphanumeric chars (§12.1)
  const issues: ValidationIssue[] = [];
  const ipksef = text(doc, "string(//ns:Fa/ns:Platnosc/ns:IPKSeF)");
  const alphanumericPattern = /^[0-9a-zA-Z]{13}$/;

  if (ipksef && !alphanumericPattern.test(ipksef)) {
    const errorDef = ERROR_CODES.IPKSEF_FORMAT;
    issues.push({
      code: errorDef.code,
      context: {
        location: {
          xpath: "/Faktura/Fa/Platnosc/IPKSeF",
          element: "IPKSeF",
        },
        actualValue: ipksef,
      },
      message: errorDef.description,
      fixSuggestions: [],
    });
  }

  return issues;
}

function checkWalutaUmownaPLN(doc: XmlDocument): ValidationIssue[] {
  // Rule 35: WALUTA_UMOWNA_PLN - WalutaUmowna must never be PLN (§13.1, Appendix D #10)
  const issues: ValidationIssue[] = [];
  const walutaUmowna = text(doc, "string(//ns:Fa/ns:WarunkiTransakcji/ns:WalutaUmowna)");

  if (walutaUmowna === "PLN") {
    const errorDef = ERROR_CODES.WALUTA_UMOWNA_PLN;
    issues.push({
      code: errorDef.code,
      context: {
        location: {
          xpath: "/Faktura/Fa/WarunkiTransakcji/WalutaUmowna",
          element: "WalutaUmowna",
        },
        actualValue: "PLN",
      },
      message: errorDef.description,
      fixSuggestions: [],
    });
  }

  return issues;
}

function checkKursWalutaPair(doc: XmlDocument): ValidationIssue[] {
  // Rule 36: KURS_WALUTA_PAIR - KursUmowny and WalutaUmowna must both be present or absent (§13.1, Appendix D #11)
  const issues: ValidationIssue[] = [];
  const warunkiTransakcji = el(doc, "//ns:Fa/ns:WarunkiTransakcji");

  if (!warunkiTransakcji) {
    return issues;
  }

  const kursUmowny = text(warunkiTransakcji, "string(ns:KursUmowny)");
  const walutaUmowna = text(warunkiTransakcji, "string(ns:WalutaUmowna)");

  if ((kursUmowny && !walutaUmowna) || (!kursUmowny && walutaUmowna)) {
    const errorDef = ERROR_CODES.KURS_WALUTA_PAIR;
    issues.push({
      code: errorDef.code,
      context: {
        location: {
          xpath: "/Faktura/Fa/WarunkiTransakcji",
          element: "WarunkiTransakcji",
        },
        actualValue: `KursUmowny=${kursUmowny ? "present" : "absent"}, WalutaUmowna=${walutaUmowna ? "present" : "absent"}`,
      },
      message: errorDef.description,
      fixSuggestions: [],
    });
  }

  return issues;
}

function checkTransportMinimumData(doc: XmlDocument): ValidationIssue[] {
  // Rule 37: TRANSPORT_MINIMUM_DATA - Transport requires minimum fields (§13.2, Appendix D #17)
  const issues: ValidationIssue[] = [];
  const transport = el(doc, "//ns:Fa/ns:WarunkiTransakcji/ns:Transport");

  if (!transport) {
    return issues;
  }

  const rodzajTransportu = text(transport, "string(ns:RodzajTransportu)");
  const transportInny = text(transport, "string(ns:TransportInny)");
  const opisInnegoTransportu = text(transport, "string(ns:OpisInnegoTransportu)");
  const opisLadunku = text(transport, "string(ns:OpisLadunku)");
  const ladunekInny = text(transport, "string(ns:LadunekInny)");
  const opisInnegoLadunku = text(transport, "string(ns:OpisInnegoLadunku)");

  // Check transport type: RodzajTransportu OR (TransportInny + OpisInnegoTransportu)
  const hasTransportType = rodzajTransportu || (transportInny && opisInnegoTransportu);

  // Check cargo: OpisLadunku OR (LadunekInny + OpisInnegoLadunku)
  const hasCargo = opisLadunku || (ladunekInny && opisInnegoLadunku);

  if (!hasTransportType || !hasCargo) {
    const errorDef = ERROR_CODES.TRANSPORT_MINIMUM_DATA;
    issues.push({
      code: errorDef.code,
      context: {
        location: {
          xpath: "/Faktura/Fa/WarunkiTransakcji/Transport",
          element: "Transport",
        },
        actualValue: `TransportType=${hasTransportType ? "present" : "missing"}, Cargo=${hasCargo ? "present" : "missing"}`,
      },
      message: errorDef.description,
      fixSuggestions: [],
    });
  }

  return issues;
}

function checkCurrencyRateMismatch(
  doc: XmlDocument,
  currencyRates: Record<string, CurrencyRate>,
): ValidationIssue[] {
  // Rule: CURRENCY_RATE_MISMATCH - KursWaluty must match NBP mid-rate (Art. 31a ustawy o VAT)
  const issues: ValidationIssue[] = [];

  // Read KodWaluty (the invoice currency)
  const kodWaluty = text(doc, "string(//ns:Fa/ns:KodWaluty)");

  // Skip if no foreign currency or currency is PLN
  if (!kodWaluty || kodWaluty === "PLN") {
    return issues;
  }

  // Look up the rate for the invoice currency
  const rate = currencyRates[kodWaluty];
  if (!rate) {
    return issues;
  }

  // KursWaluty lives in FaWiersz (line items) per FA(3) §10.2 — check each line
  const faWiersze = els(doc, "//ns:Fa/ns:FaWiersz");
  for (const wiersz of faWiersze) {
    const kursWalutyStr = text(wiersz, "string(ns:KursWaluty)");
    if (!kursWalutyStr) {
      continue;
    }

    const kursWaluty = parseFloat(kursWalutyStr);
    if (isNaN(kursWaluty)) {
      continue;
    }

    // Compare using integer arithmetic to avoid floating-point issues
    if (Math.round(kursWaluty * 10000) !== Math.round(rate.mid * 10000)) {
      const nrWiersza = text(wiersz, "string(ns:NrWierszaFa)");
      const xpath = `/Faktura/Fa/FaWiersz[NrWierszaFa=${nrWiersza}]/KursWaluty`;
      const errorDef = ERROR_CODES.CURRENCY_RATE_MISMATCH;
      issues.push({
        code: errorDef.code,
        context: {
          location: {
            xpath,
            element: "KursWaluty",
          },
          actualValue: kursWalutyStr,
          expectedValues: [rate.mid.toFixed(4)],
          metadata: {
            currency: kodWaluty,
            nbpDate: rate.date,
            nbpMid: rate.mid,
          },
        },
        message: `KursWaluty (${kursWalutyStr}) in line ${nrWiersza} differs from the NBP rate on ${rate.date} (${rate.mid.toFixed(4)}).`,
        fixSuggestions: [
          {
            type: "replace",
            targetXPath: xpath,
            content: rate.mid.toFixed(4),
            description: `Set KursWaluty to ${rate.mid.toFixed(4)} (NBP Table A mid-rate for ${kodWaluty} on ${rate.date}).`,
            confidence: 0.95,
          },
        ],
      });
    }
  }

  return issues;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Group 7: Format Rules (Constitution §2)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function checkAmountNoSeparators(doc: XmlDocument): ValidationIssue[] {
  // Rule 38: AMOUNT_NO_SEPARATORS - No thousand separators in amounts (§2.5, Appendix D #13)
  const issues: ValidationIssue[] = [];

  // Define numeric fields to check
  const numericFields = [
    // Fa level amounts
    "P_13_1",
    "P_13_2",
    "P_13_3",
    "P_13_4",
    "P_13_5",
    "P_13_6",
    "P_13_7",
    "P_13_8",
    "P_13_9",
    "P_13_10",
    "P_13_11",
    "P_14_1",
    "P_14_2",
    "P_14_3",
    "P_14_4",
    "P_14_5",
    "P_14_1W",
    "P_14_2W",
    "P_14_3W",
    "P_14_4W",
    "P_14_5W",
    "P_15",
    "KursWalutyZ",
  ];

  // Pattern to check for invalid characters (anything other than digits, minus, and decimal point)
  const invalidPattern = /[^0-9.-]|.*\..*\./;

  // Check Fa level
  for (const field of numericFields) {
    const value = text(doc, `string(//ns:Fa/ns:${field})`);
    if (value && invalidPattern.test(value)) {
      const errorDef = ERROR_CODES.AMOUNT_NO_SEPARATORS;
      issues.push({
        code: errorDef.code,
        context: {
          location: {
            xpath: `/Faktura/Fa/${field}`,
            element: field,
          },
          actualValue: value,
        },
        message: errorDef.description,
        fixSuggestions: [],
      });
    }
  }

  // Check FaWiersz level
  const faWiersze = els(doc, "//ns:FaWiersz");
  for (const wiersz of faWiersze) {
    const nrWiersza = text(wiersz, "string(ns:NrWierszaFa)");
    for (const field of [
      "P_8B",
      "P_9A",
      "P_9B",
      "P_10",
      "P_11",
      "P_11A",
      "P_11Vat",
      "KursWaluty",
    ]) {
      const value = text(wiersz, `string(ns:${field})`);
      if (value && invalidPattern.test(value)) {
        const errorDef = ERROR_CODES.AMOUNT_NO_SEPARATORS;
        issues.push({
          code: errorDef.code,
          context: {
            location: {
              xpath: `/Faktura/FaWiersz[NrWierszaFa='${nrWiersza}']/${field}`,
              element: field,
              lineNumber: nrWiersza ? parseInt(nrWiersza) : undefined,
            },
            actualValue: value,
          },
          message: errorDef.description,
          fixSuggestions: [],
        });
      }
    }
  }

  return issues;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Group 8: Additional Business Logic Rules
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function checkTaxCalculations(doc: XmlDocument): ValidationIssue[] {
  // Rule 39: TAX_CALCULATION_MISMATCH - Validate arithmetic consistency of tax calculations
  const issues: ValidationIssue[] = [];

  // Skip tax calculation validation for corrective invoices
  const rodzajFaktury = text(doc, "string(//ns:Fa/ns:RodzajFaktury)");
  if (
    rodzajFaktury &&
    (rodzajFaktury === "KOR" || rodzajFaktury === "KOR_ZAL" || rodzajFaktury === "KOR_ROZ")
  ) {
    return issues; // Corrective invoices have different calculation structure
  }

  // Validate that line items use valid tax rates
  const faWiersze = els(doc, "//ns:FaWiersz");
  const validTaxRates = new Set([
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
  ]);

  for (const wiersz of faWiersze) {
    const p12 = text(wiersz, "string(ns:P_12)");
    if (p12 && !validTaxRates.has(p12)) {
      const nrWiersza = text(wiersz, "string(ns:NrWierszaFa)") || "unknown";
      const errorDef = ERROR_CODES.TAX_CALCULATION_MISMATCH;
      issues.push({
        code: errorDef.code,
        context: {
          location: {
            xpath: `//ns:FaWiersz[ns:NrWierszaFa='${nrWiersza}']/ns:P_12`,
            element: "P_12",
          },
          actualValue: p12,
          expectedValues: Array.from(validTaxRates),
        },
        message: `Invalid tax rate '${p12}' in line ${nrWiersza}. Must be one of: ${Array.from(validTaxRates).join(", ")}`,
        fixSuggestions: [],
      });
    }
  }

  // Check summary-level tax calculations
  const p13_1 = text(doc, "string(//ns:Fa/ns:P_13_1)");
  const p14_1 = text(doc, "string(//ns:Fa/ns:P_14_1)");
  const p13_2 = text(doc, "string(//ns:Fa/ns:P_13_2)");
  const p14_2 = text(doc, "string(//ns:Fa/ns:P_14_2)");
  const p13_3 = text(doc, "string(//ns:Fa/ns:P_13_3)");
  const p14_3 = text(doc, "string(//ns:Fa/ns:P_14_3)");
  const p13_4 = text(doc, "string(//ns:Fa/ns:P_13_4)");
  const p14_4 = text(doc, "string(//ns:Fa/ns:P_14_4)");
  const p13_5 = text(doc, "string(//ns:Fa/ns:P_13_5)");
  const p14_5 = text(doc, "string(//ns:Fa/ns:P_14_5)");
  const p15 = text(doc, "string(//ns:Fa/ns:P_15)");

  // Validate P_14_1 = P_13_1 * 0.23 (for 23% rate)
  if (p13_1 && p14_1) {
    const base = parseFloat(p13_1);
    const tax = parseFloat(p14_1);
    const expectedTax = Math.round(base * 23) / 100;

    if (Math.abs(tax - expectedTax) > 0.01) {
      // Allow 1 cent tolerance
      const errorDef = ERROR_CODES.TAX_CALCULATION_MISMATCH;
      issues.push({
        code: errorDef.code,
        context: {
          location: {
            xpath: "/Faktura/Fa/P_14_1",
            element: "P_14_1",
          },
          actualValue: p14_1,
          expectedValues: [expectedTax.toFixed(2)],
        },
        message: `${errorDef.description}: P_14_1 should be ${expectedTax.toFixed(2)} (P_13_1 × 23%)`,
        fixSuggestions: [],
      });
    }
  }

  // Similar checks for other tax rates...
  // Validate P_14_2 = P_13_2 * 0.08 (for 8% rate)
  if (p13_2 && p14_2) {
    const base = parseFloat(p13_2);
    const tax = parseFloat(p14_2);
    const expectedTax = Math.round(base * 8) / 100;

    if (Math.abs(tax - expectedTax) > 0.01) {
      const errorDef = ERROR_CODES.TAX_CALCULATION_MISMATCH;
      issues.push({
        code: errorDef.code,
        context: {
          location: {
            xpath: "/Faktura/Fa/P_14_2",
            element: "P_14_2",
          },
          actualValue: p14_2,
          expectedValues: [expectedTax.toFixed(2)],
        },
        message: `${errorDef.description}: P_14_2 should be ${expectedTax.toFixed(2)} (P_13_2 × 8%)`,
        fixSuggestions: [],
      });
    }
  }

  // Validate P_14_3 = P_13_3 * 0.05 (for 5% rate)
  if (p13_3 && p14_3) {
    const base = parseFloat(p13_3);
    const tax = parseFloat(p14_3);
    const expectedTax = Math.round(base * 5) / 100;

    if (Math.abs(tax - expectedTax) > 0.01) {
      const errorDef = ERROR_CODES.TAX_CALCULATION_MISMATCH;
      issues.push({
        code: errorDef.code,
        context: {
          location: {
            xpath: "/Faktura/Fa/P_14_3",
            element: "P_14_3",
          },
          actualValue: p14_3,
          expectedValues: [expectedTax.toFixed(2)],
        },
        message: `${errorDef.description}: P_14_3 should be ${expectedTax.toFixed(2)} (P_13_3 × 5%)`,
        fixSuggestions: [],
      });
    }
  }

  // Validate total P_15 = sum of all (P_13_x + P_14_x) only when summary fields are present
  if (p15) {
    // Check if this invoice has any P_13/P_14 summary fields
    const hasP13Fields = p13_1 || p13_2 || p13_3 || p13_4 || p13_5;
    const hasP14Fields = p14_1 || p14_2 || p14_3 || p14_4 || p14_5;

    // Check for special P_13 fields (6-11)
    const p13_6 = text(doc, "string(//ns:Fa/ns:P_13_6)");
    const p13_7 = text(doc, "string(//ns:Fa/ns:P_13_7)");
    const p13_8 = text(doc, "string(//ns:Fa/ns:P_13_8)");
    const p13_9 = text(doc, "string(//ns:Fa/ns:P_13_9)");
    const p13_10 = text(doc, "string(//ns:Fa/ns:P_13_10)");
    const p13_11 = text(doc, "string(//ns:Fa/ns:P_13_11)");

    const hasSpecialP13Fields = p13_6 || p13_7 || p13_8 || p13_9 || p13_10 || p13_11;

    // Only validate totals if we have summary tax fields (not simplified invoice)
    if (hasP13Fields || hasP14Fields || hasSpecialP13Fields) {
      let expectedTotal = 0;

      // Add all base amounts
      if (p13_1) {
        expectedTotal += parseFloat(p13_1);
      }
      if (p13_2) {
        expectedTotal += parseFloat(p13_2);
      }
      if (p13_3) {
        expectedTotal += parseFloat(p13_3);
      }
      if (p13_4) {
        expectedTotal += parseFloat(p13_4);
      }
      if (p13_5) {
        expectedTotal += parseFloat(p13_5);
      }

      if (p13_6) {
        expectedTotal += parseFloat(p13_6);
      }
      if (p13_7) {
        expectedTotal += parseFloat(p13_7);
      }
      if (p13_8) {
        expectedTotal += parseFloat(p13_8);
      }
      if (p13_9) {
        expectedTotal += parseFloat(p13_9);
      }
      if (p13_10) {
        expectedTotal += parseFloat(p13_10);
      }
      if (p13_11) {
        expectedTotal += parseFloat(p13_11);
      }

      // Add all tax amounts
      if (p14_1) {
        expectedTotal += parseFloat(p14_1);
      }
      if (p14_2) {
        expectedTotal += parseFloat(p14_2);
      }
      if (p14_3) {
        expectedTotal += parseFloat(p14_3);
      }
      if (p14_4) {
        expectedTotal += parseFloat(p14_4);
      }
      if (p14_5) {
        expectedTotal += parseFloat(p14_5);
      }

      const actualTotal = parseFloat(p15);

      if (Math.abs(actualTotal - expectedTotal) > 0.01) {
        // Allow 1 cent tolerance
        const errorDef = ERROR_CODES.TAX_CALCULATION_MISMATCH;
        issues.push({
          code: errorDef.code,
          context: {
            location: {
              xpath: "/Faktura/Fa/P_15",
              element: "P_15",
            },
            actualValue: p15,
            expectedValues: [expectedTotal.toFixed(2)],
          },
          message: `${errorDef.description}: P_15 should be ${expectedTotal.toFixed(2)} (sum of all P_13_x + P_14_x)`,
          fixSuggestions: [],
        });
      }
    } // Close the "if we have summary tax fields" condition
  }

  return issues;
}

function checkPolishBankAccountFormat(doc: XmlDocument): ValidationIssue[] {
  // Rule 40: INVALID_BANK_ACCOUNT_FORMAT - Polish IBAN (PL + 26 digits = 28 chars) or NRB (26 digits)
  const issues: ValidationIssue[] = [];
  const nrRB = text(doc, "string(//ns:Fa/ns:Platnosc/ns:RachunekBankowy/ns:NrRB)");

  if (nrRB) {
    const startsWithPL = nrRB.startsWith("PL");
    const isAllDigits = /^\d+$/.test(nrRB);
    // PL-prefixed IBAN must be PL + 26 digits = 28 chars; bare NRB must be 26 digits
    const isInvalidLength =
      (startsWithPL && nrRB.length !== 28) || (isAllDigits && nrRB.length !== 26);

    if (isInvalidLength) {
      const errorDef = ERROR_CODES.INVALID_BANK_ACCOUNT_FORMAT;
      issues.push({
        code: errorDef.code,
        context: {
          location: {
            xpath: "/Faktura/Fa/Platnosc/RachunekBankowy/NrRB",
            element: "NrRB",
          },
          actualValue: `${nrRB} (length: ${nrRB.length})`,
        },
        message: errorDef.description,
        fixSuggestions: [],
      });
    }
  }

  return issues;
}

function checkLineNumberUniqueness(doc: XmlDocument): ValidationIssue[] {
  // Rule 41: DUPLICATE_LINE_NUMBERS - Line numbers must be unique (except in corrective invoices)
  const issues: ValidationIssue[] = [];
  const rodzajFaktury = text(doc, "string(//ns:Fa/ns:RodzajFaktury)");
  const correctiveTypes = ["KOR", "KOR_ZAL", "KOR_ROZ"];

  // Skip check for corrective invoices - they can have duplicate line numbers for before/after states
  if (rodzajFaktury && correctiveTypes.includes(rodzajFaktury)) {
    return issues;
  }

  const faWiersze = els(doc, "//ns:FaWiersz");
  const lineNumbers = new Map<string, number>();

  for (const wiersz of faWiersze) {
    const nrWiersza = text(wiersz, "string(ns:NrWierszaFa)");

    if (nrWiersza) {
      const count = lineNumbers.get(nrWiersza) || 0;
      lineNumbers.set(nrWiersza, count + 1);

      if (count > 0) {
        // Duplicate found in non-corrective invoice
        const errorDef = ERROR_CODES.DUPLICATE_LINE_NUMBERS;
        issues.push({
          code: errorDef.code,
          context: {
            location: {
              xpath: `/Faktura/FaWiersz[NrWierszaFa='${nrWiersza}']`,
              element: "NrWierszaFa",
              lineNumber: parseInt(nrWiersza),
            },
            actualValue: nrWiersza,
          },
          message: `${errorDef.description}: Line number ${nrWiersza} appears multiple times`,
          fixSuggestions: [],
        });
      }
    }
  }

  return issues;
}

function checkNegativeQuantities(doc: XmlDocument): ValidationIssue[] {
  // Rule 42: NEGATIVE_QUANTITY_NOT_ALLOWED - Negative quantities only in corrective invoices
  const issues: ValidationIssue[] = [];
  const rodzajFaktury = text(doc, "string(//ns:Fa/ns:RodzajFaktury)");
  const correctiveTypes = ["KOR", "KOR_ZAL", "KOR_ROZ"];

  // Only check if not a corrective invoice
  if (rodzajFaktury && !correctiveTypes.includes(rodzajFaktury)) {
    const faWiersze = els(doc, "//ns:FaWiersz");

    for (const wiersz of faWiersze) {
      const p8b = text(wiersz, "string(ns:P_8B)");
      const nrWiersza = text(wiersz, "string(ns:NrWierszaFa)");

      if (p8b) {
        const quantity = parseFloat(p8b);

        if (quantity < 0) {
          const errorDef = ERROR_CODES.NEGATIVE_QUANTITY_NOT_ALLOWED;
          issues.push({
            code: errorDef.code,
            context: {
              location: {
                xpath: `/Faktura/FaWiersz[NrWierszaFa='${nrWiersza}']/P_8B`,
                element: "P_8B",
                lineNumber: nrWiersza ? parseInt(nrWiersza) : undefined,
              },
              actualValue: p8b,
            },
            message: `${errorDef.description}: Invoice type '${rodzajFaktury}' cannot have negative quantities`,
            fixSuggestions: [],
          });
        }
      }
    }
  }

  return issues;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Semantic Rules Array
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const semanticRules: SemanticRule[] = [
  // Group 1: Podmiot Rules
  {
    id: "PODMIOT2_JST_MISSING",
    description: "Check JST is present in Podmiot2",
    category: "required_field",
    severity: "error",
    check: checkPodmiot2JST,
  },
  {
    id: "PODMIOT2_GV_MISSING",
    description: "Check GV is present in Podmiot2",
    category: "required_field",
    severity: "error",
    check: checkPodmiot2GV,
  },
  {
    id: "JST_REQUIRES_PODMIOT3",
    description: "Check JST=1 requires Podmiot3 with Rola=8",
    category: "consistency",
    severity: "error",
    check: checkJSTRequiresPodmiot3,
  },
  {
    id: "GV_REQUIRES_PODMIOT3",
    description: "Check GV=1 requires Podmiot3 with Rola=10",
    category: "consistency",
    severity: "error",
    check: checkGVRequiresPodmiot3,
  },
  {
    id: "NIP_IN_WRONG_FIELD",
    description: "Check Polish NIP is in correct field",
    category: "business_logic",
    severity: "warning",
    check: checkNIPInWrongField,
  },
  {
    id: "PODMIOT3_UDZIAL_REQUIRES_ROLE_4",
    description: "Check Udzial only with Rola=4",
    category: "consistency",
    severity: "error",
    check: checkPodmiot3UdzialRole,
  },
  {
    id: "PODMIOT3_ROLE_MISSING",
    description: "Check Podmiot3 role definition",
    category: "required_field",
    severity: "error",
    check: checkPodmiot3RoleMissing,
  },
  {
    id: "SELF_BILLING_PODMIOT3_CONFLICT",
    description: "Check self-billing Podmiot3 conflicts",
    category: "business_logic",
    severity: "warning",
    check: checkSelfBillingPodmiot3,
  },

  // Group 2: Fa Core Rules
  {
    id: "P15_MISSING",
    description: "Check P_15 is present",
    category: "required_field",
    severity: "error",
    check: checkP15Missing,
  },
  {
    id: "P6_P6A_MUTUAL_EXCLUSION",
    description: "Check P_6 and P_6A mutual exclusion",
    category: "consistency",
    severity: "error",
    check: checkP6P6AMutualExclusion,
  },
  {
    id: "RODZAJ_FAKTURY_SECTIONS",
    description: "Check invoice type required sections",
    category: "consistency",
    severity: "error",
    check: checkRodzajFakturySections,
  },
  {
    id: "KURS_WALUTY_Z_PLACEMENT",
    description: "Check KursWalutyZ placement",
    category: "business_logic",
    severity: "error",
    check: checkKursWalutyZPlacement,
  },
  {
    id: "FOREIGN_CURRENCY_TAX_PLN",
    description: "Check foreign currency PLN conversion",
    category: "business_logic",
    severity: "warning",
    check: checkForeignCurrencyTaxPLN,
  },

  // Group 3: Adnotacje Rules
  {
    id: "ADNOTACJE_MANDATORY_FIELDS",
    description: "Check all mandatory Adnotacje fields",
    category: "required_field",
    severity: "error",
    check: checkAdnotacjeMandatoryFields,
  },
  {
    id: "ZWOLNIENIE_LOGIC",
    description: "Check Zwolnienie selection logic",
    category: "consistency",
    severity: "error",
    check: checkZwolnienieLogic,
  },
  {
    id: "NST_LOGIC",
    description: "Check NoweSrodkiTransportu logic",
    category: "consistency",
    severity: "error",
    check: checkNSTLogic,
  },
  {
    id: "PMARZY_LOGIC",
    description: "Check PMarzy selection logic",
    category: "consistency",
    severity: "error",
    check: checkPMarzyLogic,
  },

  // Group 4: FaWiersz Rules
  {
    id: "P12_ENUMERATION",
    description: "Check P_12 valid tax rate codes",
    category: "business_logic",
    severity: "error",
    check: checkP12Enumeration,
  },
  {
    id: "OO_RATE_FOREIGN_BUYER",
    description: "Check 'oo' rate for foreign buyers",
    category: "business_logic",
    severity: "warning",
    check: checkOORateForeignBuyer,
  },
  {
    id: "GTU_FORMAT",
    description: "Check GTU format",
    category: "format",
    severity: "error",
    check: checkGTUFormat,
  },
  {
    id: "DECIMAL_PRECISION",
    description: "Check decimal precision limits",
    category: "format",
    severity: "error",
    check: checkDecimalPrecision,
  },

  // Group 5: Corrective Invoice Rules
  {
    id: "KOR_NRKSEF_CONSISTENCY",
    description: "Check corrective invoice KSeF number consistency",
    category: "consistency",
    severity: "error",
    check: checkKorNrKSeFConsistency,
  },
  {
    id: "REVERSE_CHARGE_CONSISTENCY",
    description: "Check reverse charge consistency",
    category: "consistency",
    severity: "warning",
    check: checkReverseChargeConsistency,
  },

  // Group 6: Payment & Transaction Rules
  {
    id: "PAYMENT_ZAPLACONO_DATE",
    description: "Check payment date when marked as paid",
    category: "consistency",
    severity: "warning",
    check: checkPaymentZaplaconoDate,
  },
  {
    id: "RACHUNEKBANKOWY_NRRB",
    description: "Check bank account number requirement",
    category: "required_field",
    severity: "error",
    check: checkRachunekBankowyNrRB,
  },
  {
    id: "NRRB_LENGTH",
    description: "Check bank account number length",
    category: "format",
    severity: "warning",
    check: checkNrRBLength,
  },
  {
    id: "IPKSEF_FORMAT",
    description: "Check IPKSeF format",
    category: "format",
    severity: "warning",
    check: checkIPKSeFFormat,
  },
  {
    id: "WALUTA_UMOWNA_PLN",
    description: "Check WalutaUmowna not PLN",
    category: "business_logic",
    severity: "error",
    check: checkWalutaUmownaPLN,
  },
  {
    id: "KURS_WALUTA_PAIR",
    description: "Check KursUmowny and WalutaUmowna pairing",
    category: "consistency",
    severity: "error",
    check: checkKursWalutaPair,
  },
  {
    id: "TRANSPORT_MINIMUM_DATA",
    description: "Check transport minimum data",
    category: "consistency",
    severity: "warning",
    check: checkTransportMinimumData,
  },

  // Group 7: Format Rules
  {
    id: "AMOUNT_NO_SEPARATORS",
    description: "Check no separators in amount fields",
    category: "format",
    severity: "error",
    check: checkAmountNoSeparators,
  },

  // Group 8: Additional Business Logic Rules
  {
    id: "TAX_CALCULATION_MISMATCH",
    description: "Check tax calculation arithmetic consistency",
    category: "business_logic",
    severity: "error",
    check: checkTaxCalculations,
  },
  {
    id: "INVALID_BANK_ACCOUNT_FORMAT",
    description: "Check Polish bank account format",
    category: "format",
    severity: "error",
    check: checkPolishBankAccountFormat,
  },
  {
    id: "DUPLICATE_LINE_NUMBERS",
    description: "Check line number uniqueness",
    category: "consistency",
    severity: "error",
    check: checkLineNumberUniqueness,
  },
  {
    id: "NEGATIVE_QUANTITY_NOT_ALLOWED",
    description: "Check negative quantities only in corrective invoices",
    category: "business_logic",
    severity: "error",
    check: checkNegativeQuantities,
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Main Export Function
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Run all semantic validation checks on an XML document.
 * Returns both issues (errors/warnings) and assertions (what passed).
 *
 * @param doc - The XML document to validate
 * @param collectAssertions - Whether to collect positive assertions about what passed validation
 * @param currencyRates - Optional map of currency → NBP rate for KursWaluty accuracy validation
 * @returns Object containing validation issues and assertions
 */
export function checkSemantics(
  doc: XmlDocument,
  collectAssertions: boolean = false,
  currencyRates?: Record<string, CurrencyRate>,
): {
  issues: ValidationIssue[];
  assertions: ValidationAssertion[];
} {
  const issues: ValidationIssue[] = [];
  const assertions: ValidationAssertion[] = [];

  // Execute all semantic rules
  for (const rule of semanticRules) {
    const ruleIssues = rule.check(doc);
    issues.push(...ruleIssues);

    // Collect assertions if requested and rule passed
    if (collectAssertions && ruleIssues.length === 0) {
      assertions.push({
        domain: "semantic",
        aspect: rule.category,
        description: rule.description,
        elements: [rule.id],
        confidence: 1.0,
      });
    }
  }

  // Execute currency rate check if rates are provided
  if (currencyRates && Object.keys(currencyRates).length > 0) {
    const ruleIssues = checkCurrencyRateMismatch(doc, currencyRates);
    issues.push(...ruleIssues);

    if (collectAssertions && ruleIssues.length === 0) {
      assertions.push({
        domain: "semantic",
        aspect: "business_logic",
        description: "Check KursWaluty matches NBP mid-rate",
        elements: ["CURRENCY_RATE_MISMATCH"],
        confidence: 1.0,
      });
    }
  }

  return { issues, assertions };
}
