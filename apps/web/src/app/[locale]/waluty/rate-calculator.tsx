"use client";

import { type ChangeEvent, type FormEvent, useCallback, useState } from "react";
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

export function RateCalculator() {
  const t = useTranslations("content.waluty");
  const [currency, setCurrency] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<NbpRateResult | null>(null);
  const [errorType, setErrorType] = useState<"noRate" | "network">("noRate");
  const [copied, setCopied] = useState(false);

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

  const handleDateChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInvoiceDate(e.target.value);
  }, []);

  const isFormValid = currency && invoiceDate;

  return (
    <div className="space-y-8">
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

          {/* Date picker */}
          <div className="space-y-2">
            <label htmlFor="invoiceDate" className="block text-sm font-medium text-slate-700">
              {t("invoiceDate")}
            </label>
            <input
              id="invoiceDate"
              type="date"
              value={invoiceDate}
              onChange={handleDateChange}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm transition-colors focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
            />
            <p className="text-xs text-slate-500">{t("invoiceDateHint")}</p>
          </div>
        </div>

        <button
          type="submit"
          disabled={!isFormValid || status === "loading"}
          className="w-full sm:w-auto rounded-xl bg-violet-600 px-8 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "loading" ? t("loading") : t("checkRate")}
        </button>
      </form>

      {/* Result */}
      {status === "success" && result && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 space-y-4">
          <h2 className="text-lg font-bold text-slate-900">{t("result.title")}</h2>

          <div className="flex items-baseline gap-3">
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
