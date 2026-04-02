/**
 * NBP (National Bank of Poland) exchange rate client.
 *
 * Cache structure:
 *   localStorage `nbp:rates:<CURRENCY>` → Record<DateString, RawRate | null>
 *
 * A `null` entry means "we asked NBP about this date and got nothing back" —
 * a valid cached result for weekends, holidays, or any other non-publishing day.
 * The cache only grows, never invalidates. Business logic (Art. 31a) lives in
 * the public-facing functions, not here.
 *
 * @see https://api.nbp.pl/ for API documentation
 */

import type { CurrencyRate } from "@ksefuj/validator";

const NBP_API_BASE = "https://api.nbp.pl/api/exchangerates/rates/A";
const LOOKBACK_DAYS = 10;

/** Earliest date for which NBP Table A rates are available. */
export const NBP_MIN_DATE = "2002-01-02";

/** Earliest invoice date that can yield a valid NBP rate (one day after NBP_MIN_DATE). */
export const NBP_MIN_INVOICE_DATE = "2002-01-03";

/** Cached formatter — en-CA produces YYYY-MM-DD, Europe/Warsaw ties dates to the Polish calendar. */
const warsawFormatter = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Warsaw" });

/** Returns today's date in Warsaw local time (YYYY-MM-DD). */
export function todayWarsaw(): string {
  return warsawFormatter.format(new Date());
}

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

/**
 * Per-currency cache: effectiveDate → RawRate | null.
 * null means NBP was queried for this date but published no rate (weekend/holiday).
 */
type RateStore = Record<string, RawRate | null>;

function clampToNbpEra(date: string): string {
  return date < NBP_MIN_DATE ? NBP_MIN_DATE : date;
}

function subtractDays(dateStr: string, days: number): string {
  const date = new Date(`${dateStr}T12:00:00Z`); // noon UTC keeps the same calendar date in any timezone
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

function mergeRates(
  currency: string,
  store: RateStore,
  incoming: RawRate[],
  end?: string,
): RateStore {
  for (const rate of incoming) {
    store[rate.effectiveDate] = rate;
  }
  // For past dates: if `end` still has no rate after merging, record null so
  // future cache checks know we already asked NBP (weekend/holiday — final answer).
  // For today/future dates: absence means NBP hasn't published yet, so don't
  // cache it — let the next call re-fetch.
  if (end !== undefined && !(end in store)) {
    store[end] = null;
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
    if (response.status === 404) {
      return []; // NBP has no rates for this range (holiday/future period) — not a network error
    }
    if (!response.ok) {
      return null; // server or network error
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
 * Return the cached rate store for a currency, fetching only when `end` has
 * not been seen before.
 *
 * A cache entry for `end` may hold a real rate or null (no NBP publication that
 * day) — both are valid: past data from NBP is final. Returns null only on an
 * actual network/server error or when NBP hasn't published yet (today/future).
 */
async function getOrFetch(
  currency: string,
  start: string,
  end: string,
): Promise<{ store: RateStore; source: "cache" | "network" } | null> {
  const store = loadRates(currency);

  if (end in store) {
    return { store, source: "cache" };
  }

  const fetched = await fetchFromApi(currency, start, end);
  const endIsPast = end < todayWarsaw();

  // null = network/server error; [] on today/future = not yet published.
  // Both mean "no reliable answer yet" — don't cache, signal the caller to retry.
  if (fetched === null || (!endIsPast && fetched.length === 0)) {
    return null;
  }
  // Past date with [] = weekend/holiday — absence is final, cache the null sentinel.
  return {
    store: mergeRates(currency, store, fetched, endIsPast ? end : undefined),
    source: "network",
  };
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
      const rangeStart = clampToNbpEra(subtractDays(sorted[0], LOOKBACK_DAYS));
      const rangeEnd = subtractDays(sorted[sorted.length - 1], 1);
      if (rangeEnd < NBP_MIN_DATE) {
        table[currency] = [];
        return;
      }

      const result = await getOrFetch(currency, rangeStart, rangeEnd);
      table[currency] = result
        ? Object.entries(result.store)
            .filter(
              (entry): entry is [string, RawRate] =>
                entry[1] !== null && entry[0] >= rangeStart && entry[0] <= rangeEnd,
            )
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

  const rangeEnd = subtractDays(invoiceDate, 1);
  if (rangeEnd < NBP_MIN_DATE) {
    return "no_rate";
  }
  const rangeStart = clampToNbpEra(subtractDays(invoiceDate, LOOKBACK_DAYS));

  const result = await getOrFetch(currency, rangeStart, rangeEnd);
  if (!result) {
    return "network";
  }

  // Art. 31a §1: pick the latest published rate strictly before the invoice date
  let best: RawRate | null = null;
  for (const rate of Object.values(result.store)) {
    if (!rate || rate.effectiveDate >= invoiceDate) {
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
