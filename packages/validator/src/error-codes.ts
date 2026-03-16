/**
 * @ksefuj/validator - Error code registry
 *
 * Comprehensive catalog of all validation errors, warnings, and issues
 * that can be detected in KSeF FA(3) XML documents.
 */

import type { ErrorCodeDefinition, FixSuggestion } from "./types.js";

// --- Semantic Error Codes ---

export const SEMANTIC_ERRORS = {
  PODMIOT2_JST_MISSING: {
    code: {
      domain: "semantic",
      category: "required_field",
      code: "PODMIOT2_JST_MISSING",
      severity: "error",
    },
    description: "JST element is required in Podmiot2 for FA(3) invoices",
    commonCauses: [
      "Missing JST element in buyer data",
      "Incorrect Podmiot2 structure",
      "Legacy FA(2) format used",
    ],
    fixTemplates: [
      {
        type: "add",
        targetXPath: "//ksef:Podmiot2",
        content: "<JST>2</JST>",
        description: "Add required JST element with value 2",
        confidence: 0.95,
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
    description: "GV element is required in Podmiot2 for FA(3) invoices",
    commonCauses: [
      "Missing GV element in buyer data",
      "Incomplete Podmiot2 structure",
      "Migration from older schema version",
    ],
    fixTemplates: [
      {
        type: "add",
        targetXPath: "//ksef:Podmiot2",
        content: "<GV>2</GV>",
        description: "Add required GV element with value 2",
        confidence: 0.95,
        dependencies: [],
      },
    ],
  },

  P12_INVALID: {
    code: {
      domain: "semantic",
      category: "enumeration",
      code: "P12_INVALID",
      severity: "error",
    },
    description: "P_12 tax rate must be a valid enumeration value",
    commonCauses: [
      'Using "NP" instead of "np I" or "np II"',
      'Missing space in "np I" or "np II"',
      "Invalid tax rate code",
      'Wrong case (should be lowercase "np")',
    ],
    fixTemplates: [],
  },

  P13_8_REQUIRES_P18: {
    code: {
      domain: "semantic",
      category: "business_logic",
      code: "P13_8_REQUIRES_P18",
      severity: "error",
    },
    description: "P_13_8 > 0 (foreign reverse charge) requires Adnotacje/P_18 = 1",
    commonCauses: [
      "Missing P_18 flag for reverse charge",
      "P_18 set to wrong value",
      "Incorrect reverse charge configuration",
    ],
    fixTemplates: [
      {
        type: "replace",
        targetXPath: "//ksef:Adnotacje/ksef:P_18",
        content: "<P_18>1</P_18>",
        description: "Set P_18 to 1 for reverse charge",
        confidence: 0.9,
        dependencies: [],
      },
    ],
  },

  P13_8_REQUIRES_NP_I: {
    code: {
      domain: "semantic",
      category: "business_logic",
      code: "P13_8_REQUIRES_NP_I",
      severity: "warning",
    },
    description: 'Reverse charge (P_13_8) rows should have P_12 = "np I"',
    commonCauses: [
      "Wrong tax rate for reverse charge items",
      'Should be "np I" not regular tax rate',
    ],
    fixTemplates: [
      {
        type: "replace",
        targetXPath: "//ksef:FaWiersz/ksef:P_12",
        content: "<P_12>np I</P_12>",
        description: 'Set tax rate to "np I" for reverse charge',
        confidence: 0.8,
        dependencies: [],
      },
    ],
  },

  KURS_WALUTY_WRONG_LEVEL: {
    code: {
      domain: "semantic",
      category: "structure",
      code: "KURS_WALUTY_WRONG_LEVEL",
      severity: "error",
    },
    description:
      "Exchange rate placement error - KursWalutyZ at Fa level only for advance invoices",
    commonCauses: [
      "KursWalutyZ used for regular invoice",
      "Should use FaWiersz/KursWaluty for non-advance invoices",
      "Wrong currency configuration",
    ],
    fixTemplates: [
      {
        type: "move",
        targetXPath: "//ksef:Fa/ksef:KursWalutyZ",
        content: "//ksef:FaWiersz",
        description: "Move exchange rate to line items",
        confidence: 0.85,
        dependencies: [],
      },
    ],
  },

  KURS_WALUTY_MISSING: {
    code: {
      domain: "semantic",
      category: "required_field",
      code: "KURS_WALUTY_MISSING",
      severity: "warning",
    },
    description: "Currency invoice line missing exchange rate",
    commonCauses: [
      "Foreign currency invoice without exchange rate",
      "Missing KursWaluty in line items",
    ],
    fixTemplates: [],
  },

  GTU_WRONG_FORMAT: {
    code: {
      domain: "semantic",
      category: "format",
      code: "GTU_WRONG_FORMAT",
      severity: "error",
    },
    description: "GTU code has incorrect XML format",
    commonCauses: [
      "Using <GTU_12>1</GTU_12> instead of <GTU>GTU_12</GTU>",
      "Legacy GTU format from old system",
      "Incorrect GTU structure",
    ],
    fixTemplates: [],
  },

  P15_MISSING: {
    code: {
      domain: "semantic",
      category: "required_field",
      code: "P15_MISSING",
      severity: "error",
    },
    description: "P_15 (total amount due) is mandatory",
    commonCauses: ["Missing total amount", "Incomplete invoice summary"],
    fixTemplates: [],
  },

  ADNOTACJE_FIELD_MISSING: {
    code: {
      domain: "semantic",
      category: "required_field",
      code: "ADNOTACJE_FIELD_MISSING",
      severity: "error",
    },
    description: "Required field missing in Adnotacje section",
    commonCauses: ["Incomplete Adnotacje structure", "Missing mandatory annotation field"],
    fixTemplates: [],
  },

  ADNOTACJE_ZWOLNIENIE_MISSING: {
    code: {
      domain: "semantic",
      category: "required_field",
      code: "ADNOTACJE_ZWOLNIENIE_MISSING",
      severity: "error",
    },
    description: "Missing Zwolnienie element in Adnotacje",
    commonCauses: ["Incomplete Adnotacje structure", "Missing tax exemption section"],
    fixTemplates: [
      {
        type: "add",
        targetXPath: "//ksef:Adnotacje",
        content: "<Zwolnienie><P_19N>2</P_19N></Zwolnienie>",
        description: "Add required Zwolnienie structure",
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
    description: "Missing NoweSrodkiTransportu element in Adnotacje",
    commonCauses: ["Incomplete Adnotacje structure", "Missing new transport means section"],
    fixTemplates: [
      {
        type: "add",
        targetXPath: "//ksef:Adnotacje",
        content: "<NoweSrodkiTransportu><P_22N>2</P_22N></NoweSrodkiTransportu>",
        description: "Add required NoweSrodkiTransportu structure",
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
    description: "Missing PMarzy element in Adnotacje",
    commonCauses: ["Incomplete Adnotacje structure", "Missing margin procedure section"],
    fixTemplates: [
      {
        type: "add",
        targetXPath: "//ksef:Adnotacje",
        content: "<PMarzy><P_PMarzyN>2</P_PMarzyN></PMarzy>",
        description: "Add required PMarzy structure",
        confidence: 0.9,
        dependencies: [],
      },
    ],
  },

  KOR_REQUIRES_DANE_FA_KORYGOWANEJ: {
    code: {
      domain: "semantic",
      category: "required_field",
      code: "KOR_REQUIRES_DANE_FA_KORYGOWANEJ",
      severity: "error",
    },
    description: "Correction invoice must reference original invoice",
    commonCauses: [
      "Missing DaneFaKorygowanej section",
      "Correction invoice without original reference",
    ],
    fixTemplates: [],
  },

  ROZ_REQUIRES_FAKTURA_ZALICZKOWA: {
    code: {
      domain: "semantic",
      category: "required_field",
      code: "ROZ_REQUIRES_FAKTURA_ZALICZKOWA",
      severity: "error",
    },
    description: "Settlement invoice must reference advance invoice",
    commonCauses: [
      "Missing FakturaZaliczkowa reference",
      "Settlement without advance invoice link",
    ],
    fixTemplates: [],
  },

  THIRD_PARTY_INVALID_ROLE: {
    code: {
      domain: "semantic",
      category: "enumeration",
      code: "THIRD_PARTY_INVALID_ROLE",
      severity: "error",
    },
    description: "Invalid Podmiot3 role value",
    commonCauses: [
      "Role value outside allowed range (1-5, 8)",
      "Invalid third party role specification",
    ],
    fixTemplates: [],
  },
} as const satisfies Record<string, ErrorCodeDefinition>;

// --- Semantic Warnings ---

export const SEMANTIC_WARNINGS = {
  TRAILING_ZEROS: {
    code: {
      domain: "semantic",
      category: "format",
      code: "TRAILING_ZEROS",
      severity: "warning",
    },
    description: "Unnecessary trailing zeros in numeric value",
    commonCauses: ["Excessive decimal precision", "Poor number formatting"],
    fixTemplates: [],
  },

  SIMPLIFIED_INVOICE_BUYER: {
    code: {
      domain: "semantic",
      category: "business_logic",
      code: "SIMPLIFIED_INVOICE_BUYER",
      severity: "info",
    },
    description: "Simplified invoice (≤450 PLN) only requires buyer NIP",
    commonCauses: ["Providing full buyer details for simplified invoice"],
    fixTemplates: [],
  },

  WDT_EXPORT_P23_MISSING: {
    code: {
      domain: "semantic",
      category: "business_logic",
      code: "WDT_EXPORT_P23_MISSING",
      severity: "warning",
    },
    description: "WDT/Export invoices should specify P_23",
    commonCauses: ["Missing P_23 declaration for WDT/Export"],
    fixTemplates: [],
  },

  MARGIN_PROCEDURE_PMARZY: {
    code: {
      domain: "semantic",
      category: "business_logic",
      code: "MARGIN_PROCEDURE_PMARZY",
      severity: "warning",
    },
    description: "Margin procedure requires P_PMarzyN = 2",
    commonCauses: ["Wrong PMarzy configuration for margin procedure"],
    fixTemplates: [],
  },

  ADVANCE_INVOICE_ZAMOWIENIE: {
    code: {
      domain: "semantic",
      category: "structure",
      code: "ADVANCE_INVOICE_ZAMOWIENIE",
      severity: "warning",
    },
    description: "Advance invoice should include Zamowienie section",
    commonCauses: ["Missing order reference in advance invoice"],
    fixTemplates: [],
  },

  ADVANCE_INVOICE_KURS_WALUTY: {
    code: {
      domain: "semantic",
      category: "structure",
      code: "ADVANCE_INVOICE_KURS_WALUTY",
      severity: "warning",
    },
    description: "Foreign currency advance invoice needs KursWalutyZ",
    commonCauses: ["Missing exchange rate for currency advance invoice"],
    fixTemplates: [],
  },

  PAYMENT_DATE_MISSING: {
    code: {
      domain: "semantic",
      category: "consistency",
      code: "PAYMENT_DATE_MISSING",
      severity: "warning",
    },
    description: "Paid invoice missing payment date",
    commonCauses: ["Zaplacono=1 but DataZaplaty missing"],
    fixTemplates: [],
  },
} as const satisfies Record<string, ErrorCodeDefinition>;

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
} as const satisfies Record<string, ErrorCodeDefinition>;

// --- Combined Registry ---

export const ERROR_CODES = {
  ...SEMANTIC_ERRORS,
  ...SEMANTIC_WARNINGS,
  ...XSD_ERRORS,
  ...PARSE_ERRORS,
  ...INFRASTRUCTURE_ERRORS,
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
