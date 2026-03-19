/**
 * @ksefuj/validator - Error code registry
 *
 * Comprehensive catalog of all validation errors, warnings, and issues
 * that can be detected in KSeF FA(3) XML documents.
 *
 * All 38 semantic validation error codes are included, each with detailed
 * descriptions, common causes, and fix suggestions based on the official
 * FA(3) information sheet from the Ministry of Finance.
 */

import type { ErrorCodeDefinition, FixSuggestion } from "./types.js";

// --- XSD Errors ---

export const XSD_ERRORS = {
  SCHEMA_VALIDATION_FAILED: {
    code: {
      domain: "xsd",
      category: "schema",
      code: "SCHEMA_VALIDATION_FAILED",
      severity: "error",
    },
    description: "XML does not conform to FA(3) XSD schema",
    commonCauses: [
      "Invalid element order",
      "Missing required elements",
      "Invalid element values",
      "Wrong namespace",
    ],
    fixTemplates: [],
  },

  ELEMENT_NOT_ALLOWED: {
    code: {
      domain: "xsd",
      category: "schema",
      code: "ELEMENT_NOT_ALLOWED",
      severity: "error",
    },
    description: "Element not allowed at this location",
    commonCauses: ["Element in wrong parent", "Typo in element name", "Wrong element order"],
    fixTemplates: [],
  },

  REQUIRED_ELEMENT_MISSING: {
    code: {
      domain: "xsd",
      category: "schema",
      code: "REQUIRED_ELEMENT_MISSING",
      severity: "error",
    },
    description: "Required element missing according to schema",
    commonCauses: ["Mandatory element not provided", "Incomplete structure"],
    fixTemplates: [],
  },

  INVALID_ELEMENT_VALUE: {
    code: {
      domain: "xsd",
      category: "schema",
      code: "INVALID_ELEMENT_VALUE",
      severity: "error",
    },
    description: "Element value does not match schema constraints",
    commonCauses: ["Value outside allowed range", "Wrong data type", "Pattern mismatch"],
    fixTemplates: [],
  },
} as const satisfies Record<string, ErrorCodeDefinition>;

// --- Parse Errors ---

export const PARSE_ERRORS = {
  MALFORMED_XML: {
    code: {
      domain: "parse",
      category: "syntax",
      code: "MALFORMED_XML",
      severity: "error",
    },
    description: "XML is not well-formed",
    commonCauses: [
      "Missing closing tags",
      "Invalid characters",
      "Mismatched tags",
      "Invalid XML declaration",
    ],
    fixTemplates: [],
  },

  ENCODING_ERROR: {
    code: {
      domain: "parse",
      category: "encoding",
      code: "ENCODING_ERROR",
      severity: "error",
    },
    description: "Character encoding error",
    commonCauses: ["Invalid UTF-8 sequences", "Wrong encoding declaration"],
    fixTemplates: [],
  },
} as const satisfies Record<string, ErrorCodeDefinition>;

// --- Infrastructure Errors ---

export const INFRASTRUCTURE_ERRORS = {
  VALIDATOR_INITIALIZATION_FAILED: {
    code: {
      domain: "infrastructure",
      category: "system",
      code: "VALIDATOR_INITIALIZATION_FAILED",
      severity: "error",
    },
    description: "Failed to initialize validation system",
    commonCauses: [
      "Schema loading failed",
      "Memory allocation error",
      "System resource unavailable",
    ],
    fixTemplates: [],
  },

  VALIDATION_TIMEOUT: {
    code: {
      domain: "infrastructure",
      category: "system",
      code: "VALIDATION_TIMEOUT",
      severity: "error",
    },
    description: "Validation exceeded time limit",
    commonCauses: ["Very large document", "Complex validation rules", "System overload"],
    fixTemplates: [],
  },

  EXECUTION_ERROR: {
    code: {
      domain: "infrastructure",
      category: "system",
      code: "EXECUTION_ERROR",
      severity: "error",
    },
    description: "Unexpected error during validation execution",
    commonCauses: [
      "Runtime environment issue",
      "Unhandled exception in validation logic",
      "System resource exhaustion",
    ],
    fixTemplates: [],
  },
} as const satisfies Record<string, ErrorCodeDefinition>;

// --- Semantic Errors ---

export const SEMANTIC_ERRORS = {
  // Group 1: Podmiot Rules — Constitution §5–§8
  PODMIOT2_JST_MISSING: {
    code: {
      domain: "semantic",
      category: "required_field",
      code: "PODMIOT2_JST_MISSING",
      severity: "error",
    },
    description: "JST element is mandatory in Podmiot2 (§6.1)",
    commonCauses: ["Missing JST element in Podmiot2", "Element not provided"],
    fixTemplates: [
      {
        type: "add",
        targetXPath: "//*[local-name()='Podmiot2']",
        content: "<JST>2</JST>",
        description: "Add JST element with value 2 (not a local government unit)",
        confidence: 0.9,
        dependencies: [],
      },
    ],
  },

  PODMIOT2_GV_MISSING: {
    code: {
      domain: "semantic",
      category: "required_field",
      code: "PODMIOT2_GV_MISSING",
      severity: "error",
    },
    description: "GV element is mandatory in Podmiot2 (§6.1)",
    commonCauses: ["Missing GV element in Podmiot2", "Element not provided"],
    fixTemplates: [
      {
        type: "add",
        targetXPath: "//*[local-name()='Podmiot2']",
        content: "<GV>2</GV>",
        description: "Add GV element with value 2 (not a VAT group)",
        confidence: 0.9,
        dependencies: [],
      },
    ],
  },

  JST_REQUIRES_PODMIOT3: {
    code: {
      domain: "semantic",
      category: "consistency",
      code: "JST_REQUIRES_PODMIOT3",
      severity: "error",
    },
    description:
      "When Podmiot2/JST = '1', at least one Podmiot3 must exist with Rola = '8' (§6.1, Appendix D #3)",
    commonCauses: [
      "Invoice issued for local government unit but missing Podmiot3 with role 8",
      "JST incorrectly set to 1 when not actually a local government unit",
    ],
    fixTemplates: [],
  },

  GV_REQUIRES_PODMIOT3: {
    code: {
      domain: "semantic",
      category: "consistency",
      code: "GV_REQUIRES_PODMIOT3",
      severity: "error",
    },
    description:
      "When Podmiot2/GV = '1', at least one Podmiot3 must exist with Rola = '10' (§6.1, Appendix D #3)",
    commonCauses: [
      "Invoice issued for VAT group but missing Podmiot3 with role 10",
      "GV incorrectly set to 1 when not actually a VAT group",
    ],
    fixTemplates: [],
  },

  NIP_IN_WRONG_FIELD: {
    code: {
      domain: "semantic",
      category: "business_logic",
      code: "NIP_IN_WRONG_FIELD",
      severity: "warning",
    },
    description:
      "Polish NIP detected in NrVatUE field - must be in NIP field for purchaser KSeF access (§2.10, §6.2)",
    commonCauses: [
      "Polish NIP (10 digits) incorrectly placed in NrVatUE field",
      "Using EU VAT field for Polish tax number",
    ],
    fixTemplates: [],
  },

  PODMIOT3_UDZIAL_REQUIRES_ROLE_4: {
    code: {
      domain: "semantic",
      category: "consistency",
      code: "PODMIOT3_UDZIAL_REQUIRES_ROLE_4",
      severity: "error",
    },
    description: "Udzial element on Podmiot3 is only permitted when Rola = '4' (§7.2)",
    commonCauses: [
      "Udzial (share) specified for wrong entity role",
      "Should only be used for property rights holder (role 4)",
    ],
    fixTemplates: [],
  },

  PODMIOT3_ROLE_MISSING: {
    code: {
      domain: "semantic",
      category: "required_field",
      code: "PODMIOT3_ROLE_MISSING",
      severity: "error",
    },
    description:
      "When Podmiot3 has no Rola, both RolaInna and OpisRoli must be present. When RolaInna = '1', OpisRoli is mandatory (§7.3)",
    commonCauses: [
      "Missing role definition for Podmiot3",
      "RolaInna = 1 but OpisRoli not provided",
    ],
    fixTemplates: [],
  },

  SELF_BILLING_PODMIOT3_CONFLICT: {
    code: {
      domain: "semantic",
      category: "business_logic",
      code: "SELF_BILLING_PODMIOT3_CONFLICT",
      severity: "warning",
    },
    description:
      "Self-billing (P_17 = '1'): purchaser data belongs in Podmiot2, not Podmiot3 with Rola = '5' (§7.3, §9.6)",
    commonCauses: [
      "Self-billing invoice has invoice issuer role in Podmiot3",
      "Purchaser incorrectly placed in Podmiot3 instead of Podmiot2",
    ],
    fixTemplates: [],
  },

  // Group 2: Fa Core Rules — Constitution §9
  P15_MISSING: {
    code: {
      domain: "semantic",
      category: "required_field",
      code: "P15_MISSING",
      severity: "error",
    },
    description: "P_15 (total amount due) is mandatory in Fa (§9.4)",
    commonCauses: ["Missing P_15 element", "Total amount not calculated"],
    fixTemplates: [],
  },

  P6_P6A_MUTUAL_EXCLUSION: {
    code: {
      domain: "semantic",
      category: "consistency",
      code: "P6_P6A_MUTUAL_EXCLUSION",
      severity: "error",
    },
    description:
      "P_6 (common delivery date) and P_6A (per-line delivery date) are mutually exclusive (§9.2, §10.2, Appendix D #8)",
    commonCauses: [
      "Both P_6 in Fa and P_6A in FaWiersz are present",
      "Mixed delivery date specification",
    ],
    fixTemplates: [],
  },

  RODZAJ_FAKTURY_SECTIONS: {
    code: {
      domain: "semantic",
      category: "consistency",
      code: "RODZAJ_FAKTURY_SECTIONS",
      severity: "error",
    },
    description:
      "Invoice type determines required sections: KOR/KOR_ZAL/KOR_ROZ → DaneFaKorygowanej; ZAL → Zamowienie; ROZ → FakturaZaliczkowa (§9.5, §9.7, §9.9, §14)",
    commonCauses: [
      "Corrective invoice missing DaneFaKorygowanej section",
      "Advance invoice missing Zamowienie section",
      "Final invoice missing FakturaZaliczkowa section",
    ],
    fixTemplates: [],
  },

  KURS_WALUTY_Z_PLACEMENT: {
    code: {
      domain: "semantic",
      category: "business_logic",
      code: "KURS_WALUTY_Z_PLACEMENT",
      severity: "error",
    },
    description:
      "KursWalutyZ at Fa level is ONLY valid for advance invoices (RodzajFaktury = ZAL or KOR_ZAL) (§9.2, §9.5)",
    commonCauses: [
      "Exchange rate placed at wrong level for non-advance invoice",
      "Should be in FaWiersz/KursWaluty for regular invoices",
    ],
    fixTemplates: [],
  },

  FOREIGN_CURRENCY_TAX_PLN: {
    code: {
      domain: "semantic",
      category: "business_logic",
      code: "FOREIGN_CURRENCY_TAX_PLN",
      severity: "warning",
    },
    description:
      "Foreign currency invoice with tax amounts should include PLN conversions in P_14_*W fields (§9.3)",
    commonCauses: [
      "Missing PLN tax conversion for foreign currency invoice",
      "P_14_*W fields not provided when KodWaluty ≠ PLN",
    ],
    fixTemplates: [],
  },

  // Group 3: Adnotacje Rules — Constitution §9.6
  ADNOTACJE_P16_MISSING: {
    code: {
      domain: "semantic",
      category: "required_field",
      code: "ADNOTACJE_P16_MISSING",
      severity: "error",
    },
    description: "P_16 is mandatory in Adnotacje (§9.6)",
    commonCauses: ["Missing P_16 element in Adnotacje"],
    fixTemplates: [
      {
        type: "add",
        targetXPath: "//*[local-name()='Adnotacje']",
        content: "<P_16>2</P_16>",
        description: "Add P_16 with value 2 (no significant terms agreed)",
        confidence: 0.9,
        dependencies: [],
      },
    ],
  },

  ADNOTACJE_P17_MISSING: {
    code: {
      domain: "semantic",
      category: "required_field",
      code: "ADNOTACJE_P17_MISSING",
      severity: "error",
    },
    description: "P_17 is mandatory in Adnotacje (§9.6)",
    commonCauses: ["Missing P_17 element in Adnotacje"],
    fixTemplates: [
      {
        type: "add",
        targetXPath: "//*[local-name()='Adnotacje']",
        content: "<P_17>2</P_17>",
        description: "Add P_17 with value 2 (not self-billing)",
        confidence: 0.9,
        dependencies: [],
      },
    ],
  },

  ADNOTACJE_P18_MISSING: {
    code: {
      domain: "semantic",
      category: "required_field",
      code: "ADNOTACJE_P18_MISSING",
      severity: "error",
    },
    description: "P_18 is mandatory in Adnotacje (§9.6)",
    commonCauses: ["Missing P_18 element in Adnotacje"],
    fixTemplates: [
      {
        type: "add",
        targetXPath: "//*[local-name()='Adnotacje']",
        content: "<P_18>2</P_18>",
        description: "Add P_18 with value 2 (not reverse charge)",
        confidence: 0.9,
        dependencies: [],
      },
    ],
  },

  ADNOTACJE_P18A_MISSING: {
    code: {
      domain: "semantic",
      category: "required_field",
      code: "ADNOTACJE_P18A_MISSING",
      severity: "error",
    },
    description: "P_18A is mandatory in Adnotacje (§9.6)",
    commonCauses: ["Missing P_18A element in Adnotacje"],
    fixTemplates: [
      {
        type: "add",
        targetXPath: "//*[local-name()='Adnotacje']",
        content: "<P_18A>2</P_18A>",
        description: "Add P_18A with value 2 (not split payment mechanism)",
        confidence: 0.9,
        dependencies: [],
      },
    ],
  },

  ADNOTACJE_ZWOLNIENIE_MISSING: {
    code: {
      domain: "semantic",
      category: "required_field",
      code: "ADNOTACJE_ZWOLNIENIE_MISSING",
      severity: "error",
    },
    description: "Zwolnienie element is mandatory in Adnotacje (§9.6)",
    commonCauses: ["Missing Zwolnienie element in Adnotacje"],
    fixTemplates: [
      {
        type: "add",
        targetXPath: "//*[local-name()='Adnotacje']",
        content: "<Zwolnienie><P_19N>1</P_19N></Zwolnienie>",
        description: "Add Zwolnienie element indicating no exemptions",
        confidence: 0.9,
        dependencies: [],
      },
    ],
  },

  ADNOTACJE_NST_MISSING: {
    code: {
      domain: "semantic",
      category: "required_field",
      code: "ADNOTACJE_NST_MISSING",
      severity: "error",
    },
    description: "NoweSrodkiTransportu element is mandatory in Adnotacje (§9.6)",
    commonCauses: ["Missing NoweSrodkiTransportu element in Adnotacje"],
    fixTemplates: [
      {
        type: "add",
        targetXPath: "//*[local-name()='Adnotacje']",
        content: "<NoweSrodkiTransportu><P_22N>1</P_22N></NoweSrodkiTransportu>",
        description: "Add NoweSrodkiTransportu element indicating no new means of transport",
        confidence: 0.9,
        dependencies: [],
      },
    ],
  },

  ADNOTACJE_P23_MISSING: {
    code: {
      domain: "semantic",
      category: "required_field",
      code: "ADNOTACJE_P23_MISSING",
      severity: "error",
    },
    description: "P_23 is mandatory in Adnotacje (§9.6)",
    commonCauses: ["Missing P_23 element in Adnotacje"],
    fixTemplates: [
      {
        type: "add",
        targetXPath: "//*[local-name()='Adnotacje']",
        content: "<P_23>2</P_23>",
        description: "Add P_23 with value 2 (no procedural annotations)",
        confidence: 0.9,
        dependencies: [],
      },
    ],
  },

  ADNOTACJE_PMARZY_MISSING: {
    code: {
      domain: "semantic",
      category: "required_field",
      code: "ADNOTACJE_PMARZY_MISSING",
      severity: "error",
    },
    description: "PMarzy element is mandatory in Adnotacje (§9.6)",
    commonCauses: ["Missing PMarzy element in Adnotacje"],
    fixTemplates: [
      {
        type: "add",
        targetXPath: "//*[local-name()='Adnotacje']",
        content: "<PMarzy><P_PMarzyN>1</P_PMarzyN></PMarzy>",
        description: "Add PMarzy element indicating no margin procedure",
        confidence: 0.9,
        dependencies: [],
      },
    ],
  },

  ZWOLNIENIE_LOGIC: {
    code: {
      domain: "semantic",
      category: "consistency",
      code: "ZWOLNIENIE_LOGIC",
      severity: "error",
    },
    description:
      "Zwolnienie: exactly one of P_19 or P_19N required. If P_19 = '1', exactly one of P_19A/B/C required (§9.6)",
    commonCauses: [
      "Both P_19 and P_19N present or both missing",
      "P_19 = 1 but exemption basis not specified",
      "P_19N = 1 but exemption fields present",
    ],
    fixTemplates: [],
  },

  NST_LOGIC: {
    code: {
      domain: "semantic",
      category: "consistency",
      code: "NST_LOGIC",
      severity: "error",
    },
    description:
      "NoweSrodkiTransportu: exactly one of P_22 or P_22N required. If P_22 = '1', P_42_5 and NowySrodekTransportu required (§9.6)",
    commonCauses: [
      "Both P_22 and P_22N present or both missing",
      "P_22 = 1 but vehicle details not provided",
      "P_22N = 1 but vehicle fields present",
    ],
    fixTemplates: [],
  },

  PMARZY_LOGIC: {
    code: {
      domain: "semantic",
      category: "consistency",
      code: "PMARZY_LOGIC",
      severity: "error",
    },
    description:
      "PMarzy: exactly one of P_PMarzy or P_PMarzyN required. If P_PMarzy = '1', exactly one procedure type required (§9.6)",
    commonCauses: [
      "Both P_PMarzy and P_PMarzyN present or both missing",
      "P_PMarzy = 1 but procedure type not specified",
      "P_PMarzyN = 1 but margin fields present",
    ],
    fixTemplates: [],
  },

  // Group 4: FaWiersz Rules — Constitution §10
  P12_ENUMERATION: {
    code: {
      domain: "semantic",
      category: "business_logic",
      code: "P12_ENUMERATION",
      severity: "error",
    },
    description:
      "P_12 must be one of: 23, 22, 8, 7, 5, 4, 3, 0 KR, 0 WDT, 0 EX, zw, oo, np I, np II (§10.3)",
    commonCauses: [
      "Invalid tax rate code",
      "Using percentage instead of code",
      "Typo in rate code",
    ],
    fixTemplates: [],
  },

  OO_RATE_FOREIGN_BUYER: {
    code: {
      domain: "semantic",
      category: "business_logic",
      code: "OO_RATE_FOREIGN_BUYER",
      severity: "warning",
    },
    description:
      "P_12 = 'oo' is for domestic reverse charge only. Use 'np I' or 'np II' for foreign buyers (§10.3, Appendix D #18)",
    commonCauses: [
      "Using domestic reverse charge code for foreign entity",
      "Should use 'np I' or 'np II' for EU/non-EU buyers",
    ],
    fixTemplates: [],
  },

  GTU_FORMAT: {
    code: {
      domain: "semantic",
      category: "format",
      code: "GTU_FORMAT",
      severity: "error",
    },
    description:
      "GTU value must match pattern GTU_XX (GTU_01 through GTU_13). Common error: <GTU_12>1</GTU_12> instead of <GTU>GTU_12</GTU> (§10.4)",
    commonCauses: [
      "Wrong GTU element format",
      "Using GTU code as element name instead of value",
      "Invalid GTU code number",
    ],
    fixTemplates: [],
  },

  DECIMAL_PRECISION: {
    code: {
      domain: "semantic",
      category: "format",
      code: "DECIMAL_PRECISION",
      severity: "error",
    },
    description:
      "Amount field exceeds maximum decimal precision defined in §2.6 of FA(3) specification",
    commonCauses: [
      "Unit price has more than 8 decimal places",
      "General amount has more than 2 decimal places",
      "Quantity or exchange rate has more than 6 decimal places",
      "System generating excessive decimal precision",
    ],
    fixTemplates: [],
  },

  // Group 5: Corrective Invoice Rules — Constitution §9.7
  KOR_NRKSEF_CONSISTENCY: {
    code: {
      domain: "semantic",
      category: "consistency",
      code: "KOR_NRKSEF_CONSISTENCY",
      severity: "error",
    },
    description:
      "DaneFaKorygowanej: exactly one of NrKSeF/NrKSeFN = '1'. When NrKSeF = '1', NrKSeFFaKorygowanej required (§9.7)",
    commonCauses: [
      "Both NrKSeF and NrKSeFN set to 1 or neither",
      "NrKSeF = 1 but KSeF number not provided",
      "NrKSeFN = 1 but KSeF fields present",
    ],
    fixTemplates: [],
  },

  REVERSE_CHARGE_CONSISTENCY: {
    code: {
      domain: "semantic",
      category: "consistency",
      code: "REVERSE_CHARGE_CONSISTENCY",
      severity: "warning",
    },
    description:
      "Reverse charge: P_13_8/P_13_10 requires P_18 = '1', and at least one FaWiersz with P_12 in (np I, np II, oo) (§9.4, §9.6)",
    commonCauses: [
      "Reverse charge amounts but P_18 not set to 1",
      "P_18 = 1 but no reverse charge tax rates in line items",
    ],
    fixTemplates: [],
  },

  // Group 6: Payment & Transaction Rules — Constitution §12–§13
  PAYMENT_ZAPLACONO_DATE: {
    code: {
      domain: "semantic",
      category: "consistency",
      code: "PAYMENT_ZAPLACONO_DATE",
      severity: "warning",
    },
    description: "When Platnosc/Zaplacono = '1', DataZaplaty must be present (§12.1)",
    commonCauses: ["Payment marked as paid but payment date not provided"],
    fixTemplates: [],
  },

  RACHUNEKBANKOWY_NRRB: {
    code: {
      domain: "semantic",
      category: "required_field",
      code: "RACHUNEKBANKOWY_NRRB",
      severity: "error",
    },
    description:
      "When RachunekBankowy element is filled, NrRB is mandatory (nested obligation) (§2.2, §12.1, Appendix D #4)",
    commonCauses: ["Bank account section present but account number not provided"],
    fixTemplates: [],
  },

  NRRB_LENGTH: {
    code: {
      domain: "semantic",
      category: "format",
      code: "NRRB_LENGTH",
      severity: "warning",
    },
    description: "NrRB must be 10–34 characters (§12.1)",
    commonCauses: ["Bank account number too short or too long", "Invalid IBAN format"],
    fixTemplates: [],
  },

  IPKSEF_FORMAT: {
    code: {
      domain: "semantic",
      category: "format",
      code: "IPKSEF_FORMAT",
      severity: "warning",
    },
    description: "IPKSeF must be exactly 13 alphanumeric characters [0-9a-zA-Z] (§12.1)",
    commonCauses: ["Invalid IPKSeF format", "Wrong length", "Non-alphanumeric characters"],
    fixTemplates: [],
  },

  WALUTA_UMOWNA_PLN: {
    code: {
      domain: "semantic",
      category: "business_logic",
      code: "WALUTA_UMOWNA_PLN",
      severity: "error",
    },
    description: "WalutaUmowna must NEVER be 'PLN' (§13.1, Appendix D #10)",
    commonCauses: ["PLN incorrectly used in contract currency field"],
    fixTemplates: [],
  },

  KURS_WALUTA_PAIR: {
    code: {
      domain: "semantic",
      category: "consistency",
      code: "KURS_WALUTA_PAIR",
      severity: "error",
    },
    description:
      "KursUmowny and WalutaUmowna must both be present or both absent (§13.1, Appendix D #11)",
    commonCauses: [
      "Contract exchange rate provided without currency",
      "Contract currency provided without exchange rate",
    ],
    fixTemplates: [],
  },

  TRANSPORT_MINIMUM_DATA: {
    code: {
      domain: "semantic",
      category: "consistency",
      code: "TRANSPORT_MINIMUM_DATA",
      severity: "warning",
    },
    description:
      "Transport requires: (RodzajTransportu OR TransportInny+OpisInnegoTransportu) AND (OpisLadunku OR LadunekInny+OpisInnegoLadunku) (§13.2, Appendix D #17)",
    commonCauses: [
      "Transport section present but minimum required data missing",
      "Missing transport type or cargo description",
    ],
    fixTemplates: [],
  },

  // Group 7: Format Rules — Constitution §2
  AMOUNT_NO_SEPARATORS: {
    code: {
      domain: "semantic",
      category: "format",
      code: "AMOUNT_NO_SEPARATORS",
      severity: "error",
    },
    description:
      "Amount fields must not contain spaces, commas, or any non-numeric characters except minus and decimal point (§2.5, Appendix D #13)",
    commonCauses: [
      "Thousand separators (spaces or commas) in amount fields",
      "Non-numeric characters in numeric fields",
    ],
    fixTemplates: [],
  },
} as const satisfies Record<string, ErrorCodeDefinition>;

// --- Combined Registry ---

export const ERROR_CODES = {
  ...XSD_ERRORS,
  ...PARSE_ERRORS,
  ...INFRASTRUCTURE_ERRORS,
  ...SEMANTIC_ERRORS,
} as const;

export type ErrorCode = keyof typeof ERROR_CODES;

// --- Helper Functions ---

export function getErrorDefinition(code: string): ErrorCodeDefinition | undefined {
  return ERROR_CODES[code as ErrorCode];
}

export function getFixSuggestions(code: string): readonly FixSuggestion[] {
  const definition = getErrorDefinition(code);
  return definition?.fixTemplates ?? [];
}

export function isKnownErrorCode(code: string): code is ErrorCode {
  return code in ERROR_CODES;
}
