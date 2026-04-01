"use client";

import {
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
  useCallback,
  useRef,
  useState,
} from "react";
import { useTranslations } from "next-intl";
import { fetchNbpRateForInvoice, type NbpRateResult } from "@/lib/nbp";

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

function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function RateCalculator() {
  const t = useTranslations("content.waluty");
  const [currency, setCurrency] = useState("");
  const [dateDisplay, setDateDisplay] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<NbpRateResult | null>(null);
  const [errorType, setErrorType] = useState<"noRate" | "network">("noRate");
  const [copied, setCopied] = useState(false);
  const hiddenDateRef = useRef<HTMLInputElement>(null);

  const updateDate = useCallback((formatted: string) => {
    setDateDisplay(formatted);
    setInvoiceDate(isCompleteDate(formatted) ? formatted : "");
  }, []);

  const handleDateInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      updateDate(formatDateInput(e.target.value));
    },
    [updateDate],
  );

  const handleDateKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && dateDisplay.endsWith("-")) {
        e.preventDefault();
        updateDate(dateDisplay.slice(0, -2));
      }
    },
    [dateDisplay, updateDate],
  );

  const handleCalendarClick = useCallback(() => {
    hiddenDateRef.current?.showPicker();
  }, []);

  const handleHiddenDateChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDateDisplay(val);
    setInvoiceDate(val);
  }, []);

  const handleTodayClick = useCallback(() => {
    const today = todayISO();
    setDateDisplay(today);
    setInvoiceDate(today);
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!currency || !invoiceDate) {
        return;
      }

      setStatus("loading");
      setResult(null);
      setCopied(false);

      try {
        const rate = await fetchNbpRateForInvoice(currency, invoiceDate);
        if (rate) {
          setResult(rate);
          setStatus("success");
        } else {
          setErrorType("noRate");
          setStatus("error");
        }
      } catch {
        setErrorType("network");
        setStatus("error");
      }
    },
    [currency, invoiceDate],
  );

  const handleCopy = useCallback(async () => {
    if (!result) {
      return;
    }
    try {
      await navigator.clipboard.writeText(result.mid.toFixed(4));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable
    }
  }, [result]);

  const handleCurrencyChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
  }, []);

  const isFormValid = currency && invoiceDate;

  return (
    <div className="space-y-8">
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-4 items-end">
          {/* Currency selector */}
          <div className="space-y-2">
            <label htmlFor="currency" className="block text-sm font-medium text-slate-700">
              {t("currency")}
            </label>
            <select
              id="currency"
              value={currency}
              onChange={handleCurrencyChange}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm transition-colors focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
            >
              <option value="">{t("currencyPlaceholder")}</option>
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Date input with smart formatting */}
          <div className="space-y-2">
            <label htmlFor="invoiceDate" className="block text-sm font-medium text-slate-700">
              {t("invoiceDate")}
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  id="invoiceDate"
                  type="text"
                  inputMode="numeric"
                  placeholder="YYYY-MM-DD"
                  value={dateDisplay}
                  onChange={handleDateInput}
                  onKeyDown={handleDateKeyDown}
                  maxLength={10}
                  aria-describedby="invoiceDateHint"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm transition-colors focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
                />
                {/* Hidden native date picker */}
                <input
                  ref={hiddenDateRef}
                  type="date"
                  value={invoiceDate}
                  onChange={handleHiddenDateChange}
                  className="sr-only"
                  tabIndex={-1}
                  aria-hidden="true"
                />
              </div>
              {/* Calendar button */}
              <button
                type="button"
                onClick={handleCalendarClick}
                className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-slate-500 shadow-sm transition-colors hover:bg-slate-50 hover:text-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-100"
                aria-label="Open date picker"
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
              {/* Today button */}
              <button
                type="button"
                onClick={handleTodayClick}
                className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-500 shadow-sm transition-colors hover:bg-slate-50 hover:text-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-100"
              >
                {t("today")}
              </button>
            </div>
            <p id="invoiceDateHint" className="text-xs text-slate-500">
              {t("invoiceDateHint")}
            </p>
          </div>

          {/* Submit button — trailing edge */}
          <button
            type="submit"
            disabled={!isFormValid || status === "loading"}
            className="rounded-xl bg-violet-600 px-8 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-300 disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap"
          >
            {status === "loading" ? t("loading") : t("checkRate")}
          </button>
        </div>
      </form>

      {/* Result */}
      {status === "success" && result && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 space-y-4">
          <h2 className="text-lg font-bold text-slate-900">{t("result.title")}</h2>

          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="text-sm font-medium text-slate-600">{t("result.rate")}:</span>
            <span className="text-3xl font-extrabold tracking-tight text-slate-900 font-mono">
              {result.mid.toFixed(4)}
            </span>
            <span className="text-sm text-slate-500">{result.currency}/PLN</span>
            <button
              type="button"
              onClick={handleCopy}
              className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm transition-colors hover:bg-slate-50 hover:text-violet-600"
            >
              {copied ? (
                <>
                  <svg
                    className="w-4 h-4 text-emerald-500"
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
                  {t("result.copied")}
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  {t("result.copyRate")}
                </>
              )}
            </button>
          </div>

          <p className="text-sm text-slate-600">
            {t("result.table")} {result.tableNumber} {t("result.tableDate")} {result.date}
          </p>

          <p className="text-sm text-slate-500 border-t border-emerald-200 pt-4">
            {t("result.explanation")}
          </p>
        </div>
      )}

      {/* Error */}
      {status === "error" && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-6 space-y-2">
          <h2 className="text-lg font-bold text-slate-900">{t("error.title")}</h2>
          <p className="text-sm text-slate-600">{t(`error.${errorType}`)}</p>
        </div>
      )}
    </div>
  );
}
