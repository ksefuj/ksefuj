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
import { type RateReferenceRule, resolveRateReference } from "@ksefuj/validator/currency-date";

const NBP_API_BASE = "https://api.nbp.pl/api/exchangerates/rates/A";
const LOOKBACK_DAYS = 10;

/** Earliest date for which NBP Table A rates are available. */
export const NBP_MIN_DATE = "2002-01-02";

/** Earliest invoice date that can yield a valid NBP rate (one day after NBP_MIN_DATE). */
export const NBP_MIN_INVOICE_DATE = "2002-01-03";

/** Returns today's date in Warsaw local time (YYYY-MM-DD). */
export function todayWarsaw(): string {
  // Get Warsaw time but ensure consistent YYYY-MM-DD format across all browsers
  // Some browsers (especially mobile Safari) don't reliably format en-CA as YYYY-MM-DD
  const now = new Date();
  const warsawDate = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Warsaw" }));
  const year = warsawDate.getFullYear();
  const month = String(warsawDate.getMonth() + 1).padStart(2, "0");
  const day = String(warsawDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
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
  /** YYYY-MM-DD — the date the rate was looked up against (Art. 31a) */
  readonly referenceDate: string;
  /**
   * `tax_point` = Art. 31a ust. 1, `issue_date` = Art. 31a ust. 2,
   * `issue_date_assumed` = no tax point was supplied, so which one governs is undetermined
   */
  readonly rule: RateReferenceRule;
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

function daysBetween(from: string, to: string): number {
  const ms = new Date(`${to}T12:00:00Z`).getTime() - new Date(`${from}T12:00:00Z`).getTime();
  return Math.round(ms / 86_400_000);
}

/** NBP rejects a range request spanning more than 367 days. */
const NBP_MAX_RANGE_DAYS = 367;

export interface RateWindow {
  readonly start: string;
  readonly end: string;
}

/**
 * The NBP ranges that must be fetched to resolve a set of reference dates.
 *
 * Each date needs only the `LOOKBACK_DAYS` before it, so a batch is covered by the
 * union of those small windows rather than by one span from the earliest date to the
 * latest. Overlapping windows are merged to keep the request count down, and any
 * merged window longer than NBP's limit is split — a full year of invoices spans more
 * than 367 days, and a single request for it fails outright, which would mark every
 * invoice of that currency unverifiable.
 *
 * Exported for testing.
 */
export function rateWindows(dates: string[]): RateWindow[] {
  const sorted = dates
    .map((date) => ({
      start: clampToNbpEra(subtractDays(date, LOOKBACK_DAYS)),
      end: subtractDays(date, 1),
    }))
    .filter((window) => window.end >= NBP_MIN_DATE)
    .sort((a, b) => a.start.localeCompare(b.start));

  const merged: { start: string; end: string }[] = [];
  for (const window of sorted) {
    const last = merged[merged.length - 1];
    if (last && window.start <= last.end) {
      if (window.end > last.end) {
        last.end = window.end;
      }
    } else {
      merged.push({ ...window });
    }
  }

  const chunked: RateWindow[] = [];
  for (const window of merged) {
    let start = window.start;
    while (daysBetween(start, window.end) >= NBP_MAX_RANGE_DAYS) {
      const end = subtractDays(start, -(NBP_MAX_RANGE_DAYS - 1));
      chunked.push({ start, end });
      start = subtractDays(end, -1);
    }
    chunked.push({ start, end: window.end });
  }
  return chunked;
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
 * Return the cached rate store for a currency, fetching only the windows whose
 * `end` has not been seen before.
 *
 * A cache entry for a window's `end` may hold a real rate or null (no NBP
 * publication that day) — both are valid: past data from NBP is final. Returns null
 * only on an actual network/server error or when NBP hasn't published yet
 * (today/future).
 */
async function getOrFetch(
  currency: string,
  windows: readonly RateWindow[],
): Promise<{ store: RateStore; source: "cache" | "network" } | null> {
  let store = loadRates(currency);
  let source: "cache" | "network" = "cache";

  for (const { start, end } of windows) {
    if (end in store) {
      continue;
    }

    const fetched = await fetchFromApi(currency, start, end);
    const endIsPast = end < todayWarsaw();

    // null = network/server error; [] on today/future = not yet published.
    // Both mean "no reliable answer yet" — don't cache, signal the caller to retry.
    if (fetched === null || (!endIsPast && fetched.length === 0)) {
      return null;
    }
    // Past date with [] = weekend/holiday — absence is final, cache the null sentinel.
    store = mergeRates(currency, store, fetched, endIsPast ? end : undefined);
    source = "network";
  }

  return { store, source };
}

// --- Public API ---

/**
 * Fetch NBP Table A mid-rates for a set of (currency, invoice date) pairs.
 * Groups by currency; skips network if cache already covers the date window.
 *
 * @param pairs - { currency, date } where date is a rate reference date (YYYY-MM-DD).
 *                An invoice may contribute more than one, since Art. 31a can key
 *                the rate to either the tax-obligation date or the issue date.
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
      const windows = rateWindows(dates);
      if (windows.length === 0) {
        table[currency] = [];
        return;
      }

      const result = await getOrFetch(currency, windows);
      table[currency] = result
        ? Object.entries(result.store)
            .filter(
              (entry): entry is [string, RawRate] =>
                entry[1] !== null && windows.some((w) => entry[0] >= w.start && entry[0] <= w.end),
            )
            .map(([, r]) => ({ currency, date: r.effectiveDate, mid: r.mid }))
        : null;
    }),
  );

  return table;
}

/**
 * Fetch the correct NBP Table A rate for a single invoice.
 *
 * Applies Art. 31a: the rate is the last one published strictly before the
 * reference date, which is the tax-obligation date (ust. 1) unless the invoice
 * was issued earlier, in which case the issue date governs (ust. 2).
 *
 * @param currency - ISO 4217 currency code (e.g. "EUR")
 * @param invoiceDate - P_1 invoice date (YYYY-MM-DD)
 * @param taxPointDate - date the tax obligation arises (YYYY-MM-DD); omit when unknown
 * @returns The applicable rate with table number, or `"network"` / `"no_rate"` on failure
 */
export async function fetchNbpRateForInvoice(
  currency: string,
  invoiceDate: string,
  taxPointDate?: string | null,
): Promise<NbpRateResult | NbpFetchError> {
  if (currency === "PLN") {
    return "no_rate";
  }

  const reference = resolveRateReference(invoiceDate, taxPointDate);
  if (!reference) {
    return "no_rate";
  }

  const windows = rateWindows([reference.date]);
  if (windows.length === 0) {
    return "no_rate";
  }

  const result = await getOrFetch(currency, windows);
  if (!result) {
    return "network";
  }

  // Pick the latest published rate strictly before the reference date
  let best: RawRate | null = null;
  for (const rate of Object.values(result.store)) {
    if (!rate || rate.effectiveDate >= reference.date) {
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
    referenceDate: reference.date,
    rule: reference.rule,
  };
}
