"use client";

import {
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as amplitude from "@amplitude/unified";
import {
  fetchNbpRateForInvoice,
  NBP_MIN_INVOICE_DATE,
  type NbpFetchError,
  type NbpRateResult,
  todayWarsaw,
} from "@/lib/nbp";

const CURRENCIES = [
  "EUR",
  "USD",
  "GBP",
  "CHF",
  "SEK",
  "NOK",
  "DKK",
  "CZK",
  "HUF",
  "JPY",
  "CAD",
  "AUD",
  "CNY",
  "RON",
  "BGN",
  "HRK",
  "TRY",
] as const;

type Status = "idle" | "loading" | "success" | "error";

/** Format a raw digit string into YYYY-MM-DD as the user types. */
function formatDateInput(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 4) {
    return digits;
  }
  if (digits.length <= 6) {
    return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  }
  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6)}`;
}

/** Check if a formatted string is a complete YYYY-MM-DD date. */
function isCompleteDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

/** Last calendar day of the month preceding `dateStr` — the tax point of a monthly service. */
function endOfPreviousMonth(dateStr: string): string {
  const date = new Date(`${dateStr}T12:00:00Z`); // noon UTC keeps the same calendar date in any timezone
  date.setUTCDate(1);
  date.setUTCDate(0);
  return date.toISOString().slice(0, 10);
}

function loadCurrency(): string {
  try {
    const saved = localStorage.getItem("waluty:currency");
    if (saved && (CURRENCIES as readonly string[]).includes(saved)) {
      return saved;
    }
  } catch {
    // localStorage unavailable
  }
  return "EUR";
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 transition-colors focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100";
const secondaryButtonClass =
  "rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-violet-300 hover:text-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-100 disabled:cursor-not-allowed disabled:opacity-50";

interface DateFieldProps {
  id: string;
  label: string;
  hint: ReactNode;
  placeholder?: string;
  /** What the user sees — may be a partial date while typing */
  display: string;
  /** Complete date, or "" while the display is partial */
  value: string;
  onChange: (formatted: string) => void;
  max?: string;
  pickerLabel: string;
  quickFill: { label: string; date: string | null };
}

function DateField({
  id,
  label,
  hint,
  placeholder = "YYYY-MM-DD",
  display,
  value,
  onChange,
  max,
  pickerLabel,
  quickFill,
}: DateFieldProps) {
  const hiddenDateRef = useRef<HTMLInputElement>(null);

  const inRange = useCallback(
    (date: string) => date >= NBP_MIN_INVOICE_DATE && (!max || date <= max),
    [max],
  );

  const handleInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const formatted = formatDateInput(e.target.value);
      if (isCompleteDate(formatted) && !inRange(formatted)) {
        return;
      }
      onChange(formatted);
    },
    [inRange, onChange],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && display.endsWith("-")) {
        e.preventDefault();
        onChange(display.slice(0, -2));
      }
    },
    [display, onChange],
  );

  const handleHiddenDateChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      // Picker UI already prevents out-of-range dates via min/max attrs, but double-check.
      if (!inRange(e.target.value)) {
        return;
      }
      onChange(e.target.value);
    },
    [inRange, onChange],
  );

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="flex gap-2">
        <div className="flex-1">
          <input
            id={id}
            type="text"
            inputMode="numeric"
            placeholder={placeholder}
            value={display}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            maxLength={10}
            aria-describedby={`${id}Hint`}
            className={inputClass}
          />
        </div>
        <div className="relative self-stretch">
          <button
            type="button"
            onClick={() => hiddenDateRef.current?.showPicker()}
            className="h-full rounded-xl border border-slate-200 bg-white p-3 text-slate-600 transition-colors hover:border-violet-300 hover:text-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-100"
            aria-label={pickerLabel}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </button>
          <input
            ref={hiddenDateRef}
            type="date"
            value={value}
            min={NBP_MIN_INVOICE_DATE}
            max={max}
            onChange={handleHiddenDateChange}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            tabIndex={-1}
            aria-hidden="true"
          />
        </div>
        <button
          type="button"
          onClick={() => quickFill.date && onChange(quickFill.date)}
          disabled={!quickFill.date}
          className={secondaryButtonClass}
        >
          {quickFill.label}
        </button>
      </div>
      <p id={`${id}Hint`} className="text-xs text-slate-500">
        {hint}
      </p>
    </div>
  );
}

function RateCalculatorInner() {
  const t = useTranslations("content.waluty");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read initial values from URL, falling back to localStorage/today.
  // Cap any URL date to todayWarsaw() — no future dates.
  const today = todayWarsaw();
  const urlCurrency = searchParams.get("currency") ?? "";
  const urlDate = searchParams.get("date") ?? "";
  const urlSaleDate = searchParams.get("sale") ?? "";
  const validUrlCurrency =
    urlCurrency && (CURRENCIES as readonly string[]).includes(urlCurrency) ? urlCurrency : null;
  const validUrlDate =
    urlDate && isCompleteDate(urlDate) && urlDate >= NBP_MIN_INVOICE_DATE && urlDate <= today
      ? urlDate
      : null;
  // The tax point may fall after the issue date (advance invoices), so it is not capped to today.
  const validUrlSaleDate =
    urlSaleDate && isCompleteDate(urlSaleDate) && urlSaleDate >= NBP_MIN_INVOICE_DATE
      ? urlSaleDate
      : null;

  const [currency, setCurrency] = useState(() => validUrlCurrency ?? loadCurrency());
  const [dateDisplay, setDateDisplay] = useState(() => validUrlDate ?? today);
  const [invoiceDate, setInvoiceDate] = useState(() => validUrlDate ?? today);
  const [saleDateDisplay, setSaleDateDisplay] = useState(() => validUrlSaleDate ?? "");
  const [saleDate, setSaleDate] = useState(() => validUrlSaleDate ?? "");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<NbpRateResult | null>(null);
  const [errorType, setErrorType] = useState<NbpFetchError>("no_rate");
  const [copied, setCopied] = useState(false);
  const lastCheckedRef = useRef<{ currency: string; date: string; saleDate: string } | null>(null);

  const updateInvoiceDate = useCallback((formatted: string) => {
    setDateDisplay(formatted);
    setInvoiceDate(isCompleteDate(formatted) ? formatted : "");
  }, []);

  const updateSaleDate = useCallback((formatted: string) => {
    setSaleDateDisplay(formatted);
    setSaleDate(isCompleteDate(formatted) ? formatted : "");
  }, []);

  const fetchRate = useCallback(async (cur: string, date: string, sale: string) => {
    setStatus("loading");
    setResult(null);
    setCopied(false);
    lastCheckedRef.current = { currency: cur, date, saleDate: sale };

    const sharedProps = {
      currency: cur,
      date,
      isToday: date === todayWarsaw(),
      hasSaleDate: sale !== "",
    };

    const rate = await fetchNbpRateForInvoice(cur, date, sale || null);

    if (typeof rate === "string") {
      setErrorType(rate);
      setStatus("error");
      amplitude.track("waluty_rate_failed", { ...sharedProps, reason: rate });
    } else {
      setResult(rate);
      setStatus("success");
      amplitude.track("waluty_rate_checked", {
        ...sharedProps,
        source: rate.source,
        rule: rate.rule,
      });
    }
  }, []);

  // Auto-fetch when both valid URL params are present on first render.
  useEffect(() => {
    if (validUrlCurrency && validUrlDate) {
      fetchRate(validUrlCurrency, validUrlDate, validUrlSaleDate ?? "");
    }
    // Only on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!currency || !invoiceDate) {
        return;
      }

      // Update URL so the result is shareable.
      const params = new URLSearchParams();
      params.set("currency", currency);
      params.set("date", invoiceDate);
      if (saleDate) {
        params.set("sale", saleDate);
      }
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });

      await fetchRate(currency, invoiceDate, saleDate);
    },
    [currency, invoiceDate, saleDate, fetchRate, router, pathname],
  );

  useEffect(() => {
    if (!copied) {
      return;
    }
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopy = useCallback(async () => {
    if (!result) {
      return;
    }
    try {
      await navigator.clipboard.writeText(result.mid.toFixed(4));
      setCopied(true);
    } catch {
      // Clipboard API unavailable
    }
  }, [result]);

  const handleCurrencyChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCurrency(value);
    try {
      localStorage.setItem("waluty:currency", value);
    } catch {
      // localStorage unavailable
    }
  }, []);

  const saleDateQuickFill = useMemo(
    () => (invoiceDate ? endOfPreviousMonth(invoiceDate) : null),
    [invoiceDate],
  );

  // A half-typed sale date is not the same as an empty one — it must not silently be ignored.
  const saleDatePending = saleDateDisplay !== "" && saleDate === "";
  const isFormValid = currency && invoiceDate && !saleDatePending;
  const isAlreadyShown =
    status !== "idle" &&
    lastCheckedRef.current?.currency === currency &&
    lastCheckedRef.current?.date === invoiceDate &&
    lastCheckedRef.current?.saleDate === saleDate;

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
        <div className="space-y-2">
          <label htmlFor="currency" className="block text-sm font-medium text-slate-700">
            {t("currency")}
          </label>
          <select
            id="currency"
            value={currency}
            onChange={handleCurrencyChange}
            className={inputClass}
          >
            <option value="">{t("currencyPlaceholder")}</option>
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <DateField
          id="invoiceDate"
          label={t("invoiceDate")}
          hint={t("invoiceDateHint")}
          display={dateDisplay}
          value={invoiceDate}
          onChange={updateInvoiceDate}
          max={today}
          pickerLabel={t("openDatePicker")}
          quickFill={{ label: t("today"), date: today }}
        />

        <DateField
          id="saleDate"
          label={t("saleDate")}
          hint={t("saleDateHint")}
          placeholder={t("saleDatePlaceholder")}
          display={saleDateDisplay}
          value={saleDate}
          onChange={updateSaleDate}
          pickerLabel={t("openSaleDatePicker")}
          quickFill={{ label: t("endOfLastMonth"), date: saleDateQuickFill }}
        />

        <button
          type="submit"
          disabled={!isFormValid || status === "loading" || isAlreadyShown}
          className="w-full rounded-xl bg-violet-600 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "loading" ? t("loading") : t("checkRate")}
        </button>
      </form>

      {status === "success" && result && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">{t("result.title")}</h2>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="space-y-0.5">
              <p className="text-sm font-medium text-slate-600">{t("result.rate")}:</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tracking-tight text-slate-900 font-mono">
                  {result.mid.toFixed(4)}
                </span>
                <span className="text-sm text-slate-500">{result.currency}/PLN</span>
                <button
                  type="button"
                  onClick={handleCopy}
                  aria-label={t("result.copyRate")}
                  className="text-slate-400 transition-colors hover:text-violet-600"
                >
                  {copied ? (
                    <svg
                      className="w-5 h-5 text-emerald-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <p className="text-sm text-slate-500 sm:text-right">
              {t("result.table")} {result.tableNumber} {t("result.tableDate")} {result.date}
            </p>
          </div>

          <p className="text-sm text-slate-500 border-t border-emerald-200 pt-2">
            {t(`result.explanation.${result.rule}`, { referenceDate: result.referenceDate })}
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-6 space-y-2">
          <h2 className="text-lg font-bold text-slate-900">{t("error.title")}</h2>
          <p className="text-sm text-slate-600">{t(`error.${errorType}`)}</p>
        </div>
      )}
    </div>
  );
}

export function RateCalculator() {
  return (
    <Suspense>
      <RateCalculatorInner />
    </Suspense>
  );
}
