export type Locale = "pl" | "en" | "uk";

export interface Messages {
  PODMIOT2_JST_MISSING: string;
  PODMIOT2_GV_MISSING: string;
  P12_INVALID: (value: string, allowed: string) => string;
  P13_8_REQUIRES_P18: (current: string | null) => string;
  P13_8_REQUIRES_NP_I: (row: string | null, value: string) => string;
  KURS_WALUTY_WRONG_LEVEL: string;
  KURS_WALUTY_MISSING: (row: string | null, currency: string) => string;
  GTU_WRONG_FORMAT: (tag: string) => string;
  TRAILING_ZEROS: (row: string | null, field: string, value: string, clean: string) => string;
  P15_MISSING: string;
  ADNOTACJE_FIELD_MISSING: (field: string) => string;
  ADNOTACJE_ZWOLNIENIE_MISSING: string;
  ADNOTACJE_NST_MISSING: string;
  ADNOTACJE_PMARZY_MISSING: string;
}

const messages: Record<Locale, Messages> = {
  pl: {
    PODMIOT2_JST_MISSING: "Brak elementu JST w Podmiot2 — wymagany w FA(3). Dodaj <JST>2</JST>.",
    PODMIOT2_GV_MISSING: "Brak elementu GV w Podmiot2 — wymagany w FA(3). Dodaj <GV>2</GV>.",
    P12_INVALID: (value, allowed) =>
      `P_12 = "${value}" — nieprawidłowa stawka. Dozwolone: ${allowed}`,
    P13_8_REQUIRES_P18: (current) =>
      `P_13_8 > 0 (reverse charge zagraniczny) wymaga Adnotacje/P_18 = 1. Obecnie: ${current ?? "brak"}`,
    P13_8_REQUIRES_NP_I: (row, value) =>
      `Wiersz ${row}: P_12 = "${value}" — przy P_13_8 oczekiwano "np I"`,
    KURS_WALUTY_WRONG_LEVEL:
      "KursWalutyZ na poziomie Fa jest dozwolony tylko dla faktur zaliczkowych (ZAL). " +
      "Dla zwykłych faktur walutowych użyj FaWiersz/KursWaluty.",
    KURS_WALUTY_MISSING: (row, currency) =>
      `Wiersz ${row}: faktura walutowa (${currency}) — brak KursWaluty w wierszu`,
    GTU_WRONG_FORMAT: (tag) =>
      `<${tag}>1</${tag}> — nieprawidłowy format GTU. Użyj <GTU>${tag}</GTU>`,
    TRAILING_ZEROS: (row, field, value, clean) =>
      `Wiersz ${row}: ${field} = "${value}" — zbędne zera końcowe (wystarczy "${clean}")`,
    P15_MISSING: "Brak P_15 — kwota należności ogółem jest obowiązkowa",
    ADNOTACJE_FIELD_MISSING: (field) =>
      `Brak ${field} w Adnotacje — wszystkie pola adnotacji są wymagane`,
    ADNOTACJE_ZWOLNIENIE_MISSING: "Brak elementu Zwolnienie w Adnotacje",
    ADNOTACJE_NST_MISSING: "Brak elementu NoweSrodkiTransportu w Adnotacje",
    ADNOTACJE_PMARZY_MISSING: "Brak elementu PMarzy w Adnotacje",
  },
  en: {
    PODMIOT2_JST_MISSING: "Missing JST element in Podmiot2 — required in FA(3). Add <JST>2</JST>.",
    PODMIOT2_GV_MISSING: "Missing GV element in Podmiot2 — required in FA(3). Add <GV>2</GV>.",
    P12_INVALID: (value, allowed) => `P_12 = "${value}" — invalid rate. Allowed: ${allowed}`,
    P13_8_REQUIRES_P18: (current) =>
      `P_13_8 > 0 (foreign reverse charge) requires Adnotacje/P_18 = 1. Current: ${current ?? "none"}`,
    P13_8_REQUIRES_NP_I: (row, value) =>
      `Row ${row}: P_12 = "${value}" — expected "np I" with P_13_8`,
    KURS_WALUTY_WRONG_LEVEL:
      "KursWalutyZ at Fa level is only allowed for advance invoices (ZAL). " +
      "For regular currency invoices use FaWiersz/KursWaluty.",
    KURS_WALUTY_MISSING: (row, currency) =>
      `Row ${row}: currency invoice (${currency}) — missing KursWaluty in row`,
    GTU_WRONG_FORMAT: (tag) => `<${tag}>1</${tag}> — incorrect GTU format. Use <GTU>${tag}</GTU>`,
    TRAILING_ZEROS: (row, field, value, clean) =>
      `Row ${row}: ${field} = "${value}" — unnecessary trailing zeros (use "${clean}")`,
    P15_MISSING: "Missing P_15 — total amount due is mandatory",
    ADNOTACJE_FIELD_MISSING: (field) =>
      `Missing ${field} in Adnotacje — all annotation fields are required`,
    ADNOTACJE_ZWOLNIENIE_MISSING: "Missing Zwolnienie element in Adnotacje",
    ADNOTACJE_NST_MISSING: "Missing NoweSrodkiTransportu element in Adnotacje",
    ADNOTACJE_PMARZY_MISSING: "Missing PMarzy element in Adnotacje",
  },
  uk: {
    PODMIOT2_JST_MISSING:
      "Відсутній елемент JST в Podmiot2 — обов'язковий в FA(3). Додайте <JST>2</JST>.",
    PODMIOT2_GV_MISSING:
      "Відсутній елемент GV в Podmiot2 — обов'язковий в FA(3). Додайте <GV>2</GV>.",
    P12_INVALID: (value, allowed) =>
      `P_12 = "${value}" — неправильна ставка. Дозволені: ${allowed}`,
    P13_8_REQUIRES_P18: (current) =>
      `P_13_8 > 0 (зворотне оподаткування іноземне) вимагає Adnotacje/P_18 = 1. Зараз: ${current ?? "немає"}`,
    P13_8_REQUIRES_NP_I: (row, value) =>
      `Рядок ${row}: P_12 = "${value}" — при P_13_8 очікується "np I"`,
    KURS_WALUTY_WRONG_LEVEL:
      "KursWalutyZ на рівні Fa дозволений лише для авансових рахунків (ZAL). " +
      "Для звичайних валютних рахунків використовуйте FaWiersz/KursWaluty.",
    KURS_WALUTY_MISSING: (row, currency) =>
      `Рядок ${row}: валютний рахунок (${currency}) — відсутній KursWaluty в рядку`,
    GTU_WRONG_FORMAT: (tag) =>
      `<${tag}>1</${tag}> — неправильний формат GTU. Використовуйте <GTU>${tag}</GTU>`,
    TRAILING_ZEROS: (row, field, value, clean) =>
      `Рядок ${row}: ${field} = "${value}" — зайві кінцеві нулі (достатньо "${clean}")`,
    P15_MISSING: "Відсутній P_15 — загальна сума до сплати є обов'язковою",
    ADNOTACJE_FIELD_MISSING: (field) =>
      `Відсутній ${field} в Adnotacje — всі поля анотацій є обов'язковими`,
    ADNOTACJE_ZWOLNIENIE_MISSING: "Відсутній елемент Zwolnienie в Adnotacje",
    ADNOTACJE_NST_MISSING: "Відсутній елемент NoweSrodkiTransportu в Adnotacje",
    ADNOTACJE_PMARZY_MISSING: "Відсутній елемент PMarzy в Adnotacje",
  },
};

export function getMessage(locale: Locale, key: keyof Messages, ...args: string[]): string {
  const msg = messages[locale][key];
  // Type assertion needed due to mixed string | function types in Messages interface
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return typeof msg === "function" ? (msg as any)(...args) : msg;
}

export function getMessages(locale: Locale): Messages {
  return messages[locale];
}
