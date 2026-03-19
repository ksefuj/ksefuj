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
import type { SemanticRule, ValidationAssertion, ValidationIssue, XmlDocument } from "./types.js";

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
 * @returns Object containing validation issues and assertions
 */
export function checkSemantics(
  doc: XmlDocument,
  collectAssertions: boolean = false,
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

  return { issues, assertions };
}
