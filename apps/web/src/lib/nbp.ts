/**
 * NBP (National Bank of Poland) exchange rate client.
 *
 * Fetches official mid-rates from the NBP Table A API.
 * Handles weekend/holiday fallback (7-day lookback window)
 * and caches results in localStorage keyed by invoice date.
 *
 * @see https://api.nbp.pl/ for API documentation
 */

import type { CurrencyRate } from "@ksefuj/validator";

const NBP_API_BASE = "https://api.nbp.pl/api/exchangerates/rates/A";

function subtractDays(dateStr: string, days: number): string {
  const date = new Date(dateStr);
  date.setDate(date.getDate() - days);
  return date.toISOString().slice(0, 10);
}

function cacheKey(currency: string, date: string): string {
  return `nbp:${currency}:${date}`;
}

async function fetchNbpRate(currency: string, date: string): Promise<CurrencyRate | null> {
  try {
    // 1. Try exact date (works on business days)
    const exact = await fetch(`${NBP_API_BASE}/${currency}/${date}/?format=json`);
    if (exact.ok) {
      const data = await exact.json();
      return {
        currency,
        date: data.rates[0].effectiveDate,
        mid: data.rates[0].mid,
      };
    }

    // 2. Fallback: fetch last 7 days up to invoice date, take the most recent published rate
    if (exact.status === 404) {
      const start = subtractDays(date, 7);
      const range = await fetch(`${NBP_API_BASE}/${currency}/${start}/${date}/?format=json`);
      if (!range.ok) {
        return null;
      }
      const data = await range.json();
      const last = data.rates.at(-1);
      if (!last) {
        return null;
      }
      return {
        currency,
        date: last.effectiveDate,
        mid: last.mid,
      };
    }

    return null;
  } catch {
    // Network error — validation continues without currency check
    return null;
  }
}

/**
 * Get the NBP mid-rate for a given currency and invoice date.
 * Results are cached in localStorage keyed by invoice date.
 * Returns null on any network error — validation continues without the currency check.
 *
 * @param currency - ISO 4217 currency code (e.g. "EUR", "USD")
 * @param date - Invoice date in YYYY-MM-DD format (DataWystawienia)
 */
export async function getNbpRate(currency: string, date: string): Promise<CurrencyRate | null> {
  const key = cacheKey(currency, date);

  // Check localStorage cache first
  try {
    const cached = localStorage.getItem(key);
    if (cached) {
      return JSON.parse(cached) as CurrencyRate;
    }
  } catch {
    // localStorage may be unavailable (SSR, private browsing)
  }

  const rate = await fetchNbpRate(currency, date);

  if (rate) {
    try {
      localStorage.setItem(key, JSON.stringify(rate));
    } catch {
      // localStorage may be full or unavailable
    }
  }

  return rate;
}
