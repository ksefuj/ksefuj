/**
 * NBP (National Bank of Poland) exchange rate client.
 *
 * Cache structure mirrors the NBP API response:
 *   localStorage `nbp:rates:<CURRENCY>` → Record<DateString, RawRate>
 *
 * The cache is a dumb accumulating store — it only grows, never invalidates.
 * Business logic (Art. 31a "last business day before invoice date") lives in
 * the public-facing functions, not here.
 *
 * @see https://api.nbp.pl/ for API documentation
 */

import type { CurrencyRate } from "@ksefuj/validator";

const NBP_API_BASE = "https://api.nbp.pl/api/exchangerates/rates/A";
const LOOKBACK_DAYS = 10;

/** Extended rate with NBP table number for display purposes. */
export interface NbpRateResult {
  readonly currency: string;
  /** YYYY-MM-DD — the effective NBP publication date */
  readonly date: string;
  /** NBP mid-rate, 4 decimal places */
  readonly mid: number;
  /** NBP table number, e.g. "052/A/NBP/2026" */
  readonly tableNumber: string;
  /** Whether the result came from localStorage cache or a live network request */
  readonly source: "cache" | "network";
}

export type NbpFetchError = "network" | "no_rate";

interface RawRate {
  effectiveDate: string;
  mid: number;
  no: string;
}

/** Per-currency cache: effectiveDate → RawRate */
type RateStore = Record<string, RawRate>;

function subtractDays(dateStr: string, days: number): string {
  const date = new Date(`${dateStr}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() - days);
  return date.toISOString().slice(0, 10);
}

// --- Cache (dumb store, no business logic) ---

function loadRates(currency: string): RateStore {
  try {
    const raw = localStorage.getItem(`nbp:rates:${currency}`);
    if (raw) {
      return JSON.parse(raw) as RateStore;
    }
  } catch {
    // localStorage unavailable or parse error
  }
  return {};
}

function mergeRates(currency: string, incoming: RawRate[]): RateStore {
  const store = loadRates(currency);
  for (const rate of incoming) {
    store[rate.effectiveDate] = rate;
  }
  try {
    localStorage.setItem(`nbp:rates:${currency}`, JSON.stringify(store));
  } catch {
    // localStorage full or unavailable
  }
  return store;
}

// --- Network ---

async function fetchFromApi(
  currency: string,
  start: string,
  end: string,
): Promise<RawRate[] | null> {
  try {
    const response = await fetch(`${NBP_API_BASE}/${currency}/${start}/${end}/?format=json`);
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data.rates.map((r: { effectiveDate: string; mid: number; no: string }) => ({
      effectiveDate: r.effectiveDate,
      mid: r.mid,
      no: r.no,
    }));
  } catch {
    return null;
  }
}

/**
 * Return the cached rate store for a currency, fetching and merging a date
 * range only when the cache already has a recent rate near the end of the
 * requested window (within 3 days of `end`).
 *
 * Checking proximity to `end` (not just any date in the window) avoids a
 * stale-cache bug: a previous lookup for a different invoice date may have
 * populated the early part of the window but not the most recent business
 * days near `end` — which is where the Art. 31a best-rate candidate lives.
 */
async function getOrFetch(
  currency: string,
  start: string,
  end: string,
): Promise<{ store: RateStore; source: "cache" | "network" } | null> {
  const store = loadRates(currency);
  const recentThreshold = subtractDays(end, 3);
  const alreadyCovered = Object.keys(store).some((d) => d >= recentThreshold && d <= end);
  if (alreadyCovered) {
    return { store, source: "cache" };
  }

  const fetched = await fetchFromApi(currency, start, end);
  if (!fetched) {
    return null;
  }
  return { store: mergeRates(currency, fetched), source: "network" };
}

// --- Public API ---

/**
 * Fetch NBP Table A mid-rates for a set of (currency, invoice date) pairs.
 * Groups by currency; skips network if cache already covers the date window.
 *
 * @param pairs - { currency, date } where date is the invoice P_1 (YYYY-MM-DD)
 * @returns Record mapping currency → rate array (null if fetch failed)
 */
export async function fetchCurrencyRateTable(
  pairs: { currency: string; date: string }[],
): Promise<Record<string, CurrencyRate[] | null>> {
  const byCurrency = new Map<string, string[]>();
  for (const { currency, date } of pairs) {
    if (currency === "PLN") {
      continue;
    }
    if (!byCurrency.has(currency)) {
      byCurrency.set(currency, []);
    }
    byCurrency.get(currency)!.push(date);
  }

  const table: Record<string, CurrencyRate[] | null> = {};

  await Promise.all(
    Array.from(byCurrency.entries()).map(async ([currency, dates]) => {
      const sorted = [...dates].sort();
      const rangeStart = subtractDays(sorted[0], LOOKBACK_DAYS);
      const rangeEnd = subtractDays(sorted[sorted.length - 1], 1);

      const result = await getOrFetch(currency, rangeStart, rangeEnd);
      table[currency] = result
        ? Object.entries(result.store)
            .filter(([date]) => date >= rangeStart && date <= rangeEnd)
            .map(([, r]) => ({ currency, date: r.effectiveDate, mid: r.mid }))
        : null;
    }),
  );

  return table;
}

/**
 * Fetch the correct NBP Table A rate for a single invoice.
 * Applies Art. 31a §1: selects the latest rate strictly before invoiceDate.
 *
 * @param currency - ISO 4217 currency code (e.g. "EUR")
 * @param invoiceDate - P_1 invoice date (YYYY-MM-DD)
 * @returns The applicable rate with table number, or `"network"` / `"no_rate"` on failure
 */
export async function fetchNbpRateForInvoice(
  currency: string,
  invoiceDate: string,
): Promise<NbpRateResult | NbpFetchError> {
  if (currency === "PLN") {
    return "no_rate";
  }

  const rangeStart = subtractDays(invoiceDate, LOOKBACK_DAYS);
  const rangeEnd = subtractDays(invoiceDate, 1);

  const result = await getOrFetch(currency, rangeStart, rangeEnd);
  if (!result) {
    return "network";
  }

  // Art. 31a §1: pick the latest published rate strictly before the invoice date
  let best: RawRate | null = null;
  for (const rate of Object.values(result.store)) {
    if (rate.effectiveDate >= invoiceDate) {
      continue;
    }
    if (!best || rate.effectiveDate > best.effectiveDate) {
      best = rate;
    }
  }

  if (!best) {
    return "no_rate";
  }

  return {
    currency,
    date: best.effectiveDate,
    mid: best.mid,
    tableNumber: best.no,
    source: result.source,
  };
}
