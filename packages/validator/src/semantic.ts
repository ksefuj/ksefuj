/**
 * Semantic validation rules for KSeF FA(3).
 *
 * These catch errors that XSD schema validation misses:
 * - Business logic (P_13_8 requires P_12 = "np I")
 * - Cross-field consistency (Adnotacje vs FaWiersz)
 * - Common mistakes (trailing zeros, wrong GTU format)
 */

import type { ValidationError } from "./validate.js";
import { getMessages, type Locale } from "./messages.js";

const NS = "http://crd.gov.pl/wzor/2025/06/25/13775/";

export interface SemanticRule {
  id: string;
  description: string;
  check: (doc: Document, locale: Locale) => ValidationError[];
}

// --- Helpers ---

function el(parent: Document | Element, tag: string): Element | null {
  return parent.getElementsByTagNameNS(NS, tag)[0] ?? null;
}

function els(parent: Document | Element, tag: string): Element[] {
  return Array.from(parent.getElementsByTagNameNS(NS, tag));
}

function text(parent: Document | Element, tag: string): string | null {
  return el(parent, tag)?.textContent?.trim() ?? null;
}

// --- Rules ---

const rules: SemanticRule[] = [
  {
    id: "PODMIOT2_JST_GV",
    description: "Podmiot2 must contain JST and GV",
    check(doc, locale) {
      const podmiot2 = el(doc, "Podmiot2");
      if (!podmiot2) {
        return [];
      }
      const errors: ValidationError[] = [];
      const msg = getMessages(locale);

      if (!el(podmiot2, "JST")) {
        errors.push({
          level: "error",
          source: "semantic",
          message: msg.PODMIOT2_JST_MISSING,
          path: "Podmiot2/JST",
        });
      }
      if (!el(podmiot2, "GV")) {
        errors.push({
          level: "error",
          source: "semantic",
          message: msg.PODMIOT2_GV_MISSING,
          path: "Podmiot2/GV",
        });
      }
      return errors;
    },
  },

  {
    id: "P12_ENUMERATION",
    description: "P_12 must have valid enumeration value",
    check(doc, locale) {
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
      const errors: ValidationError[] = [];
      const msg = getMessages(locale);

      for (const wiersz of els(doc, "FaWiersz")) {
        const p12 = text(wiersz, "P_12");
        if (p12 && !valid.includes(p12)) {
          errors.push({
            level: "error",
            source: "semantic",
            message: msg.P12_INVALID(p12, valid.join(", ")),
            path: `FaWiersz/P_12`,
          });
        }
      }
      return errors;
    },
  },

  {
    id: "REVERSE_CHARGE_CONSISTENCY",
    description: "P_13_8 > 0 requires P_18 = 1 and P_12 = 'np I' in rows",
    check(doc, locale) {
      const fa = el(doc, "Fa");
      if (!fa) {
        return [];
      }
      const p13_8 = text(fa, "P_13_8");
      if (!p13_8 || parseFloat(p13_8) === 0) {
        return [];
      }

      const errors: ValidationError[] = [];
      const msg = getMessages(locale);
      const p18 = text(doc, "P_18");

      if (p18 !== "1") {
        errors.push({
          level: "error",
          source: "semantic",
          message: msg.P13_8_REQUIRES_P18(p18),
          path: "Fa/Adnotacje/P_18",
        });
      }

      for (const wiersz of els(doc, "FaWiersz")) {
        const p12 = text(wiersz, "P_12");
        if (p12 && p12 !== "np I") {
          const nr = text(wiersz, "NrWierszaFa");
          errors.push({
            level: "warning",
            source: "semantic",
            message: msg.P13_8_REQUIRES_NP_I(nr, p12),
            path: `FaWiersz[${nr}]/P_12`,
          });
        }
      }
      return errors;
    },
  },

  {
    id: "KURS_WALUTY_PLACEMENT",
    description: "Regular currency invoices: rate in FaWiersz, not in Fa",
    check(doc, locale) {
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

      const errors: ValidationError[] = [];
      const msg = getMessages(locale);

      if (el(fa, "KursWalutyZ")) {
        errors.push({
          level: "error",
          source: "semantic",
          message: msg.KURS_WALUTY_WRONG_LEVEL,
          path: "Fa/KursWalutyZ",
        });
      }

      for (const wiersz of els(doc, "FaWiersz")) {
        if (!el(wiersz, "KursWaluty")) {
          const nr = text(wiersz, "NrWierszaFa");
          errors.push({
            level: "warning",
            source: "semantic",
            message: msg.KURS_WALUTY_MISSING(nr, waluta),
            path: `FaWiersz[${nr}]/KursWaluty`,
          });
        }
      }
      return errors;
    },
  },

  {
    id: "GTU_FORMAT",
    description: "GTU should be <GTU>GTU_12</GTU>, not <GTU_12>1</GTU_12>",
    check(doc, locale) {
      const errors: ValidationError[] = [];
      const msg = getMessages(locale);

      for (let i = 1; i <= 13; i++) {
        const tag = `GTU_${String(i).padStart(2, "0")}`;
        if (els(doc, tag).length > 0) {
          errors.push({
            level: "error",
            source: "semantic",
            message: msg.GTU_WRONG_FORMAT(tag),
            path: `FaWiersz/${tag}`,
          });
        }
      }
      return errors;
    },
  },

  {
    id: "TRAILING_ZEROS",
    description: "Unnecessary trailing zeros in numeric values",
    check(doc, locale) {
      const warnings: ValidationError[] = [];
      const msg = getMessages(locale);
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
            warnings.push({
              level: "warning",
              source: "semantic",
              message: msg.TRAILING_ZEROS(nr, field, val, clean),
              path: `FaWiersz[${nr}]/${field}`,
            });
          }
        }
      }
      return warnings;
    },
  },

  {
    id: "P15_REQUIRED",
    description: "P_15 (total amount due) is mandatory",
    check(doc, locale) {
      const fa = el(doc, "Fa");
      if (!fa) {
        return [];
      }
      const msg = getMessages(locale);

      if (!text(fa, "P_15")) {
        return [
          {
            level: "error",
            source: "semantic",
            message: msg.P15_MISSING,
            path: "Fa/P_15",
          },
        ];
      }
      return [];
    },
  },

  {
    id: "ADNOTACJE_COMPLETENESS",
    description: "Adnotacje must contain complete structure",
    check(doc, locale) {
      const adnotacje = el(doc, "Adnotacje");
      if (!adnotacje) {
        return [];
      }
      const errors: ValidationError[] = [];
      const msg = getMessages(locale);
      const required = ["P_16", "P_17", "P_18", "P_18A", "P_23"];

      for (const field of required) {
        if (!text(adnotacje, field)) {
          errors.push({
            level: "error",
            source: "semantic",
            message: msg.ADNOTACJE_FIELD_MISSING(field),
            path: `Fa/Adnotacje/${field}`,
          });
        }
      }

      const zwolnienie = el(adnotacje, "Zwolnienie");
      if (!zwolnienie) {
        errors.push({
          level: "error",
          source: "semantic",
          message: msg.ADNOTACJE_ZWOLNIENIE_MISSING,
          path: "Fa/Adnotacje/Zwolnienie",
        });
      }

      const nst = el(adnotacje, "NoweSrodkiTransportu");
      if (!nst) {
        errors.push({
          level: "error",
          source: "semantic",
          message: msg.ADNOTACJE_NST_MISSING,
          path: "Fa/Adnotacje/NoweSrodkiTransportu",
        });
      }

      const pmarzy = el(adnotacje, "PMarzy");
      if (!pmarzy) {
        errors.push({
          level: "error",
          source: "semantic",
          message: msg.ADNOTACJE_PMARZY_MISSING,
          path: "Fa/Adnotacje/PMarzy",
        });
      }
      return errors;
    },
  },
];

/**
 * Run all semantic checks on a parsed XML document.
 */
export function checkSemantics(doc: Document, locale: Locale = "pl"): ValidationError[] {
  return rules.flatMap((rule) => rule.check(doc, locale));
}
