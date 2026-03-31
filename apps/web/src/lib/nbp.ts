/**
 * NBP (National Bank of Poland) exchange rate client.
 *
 * Fetches official mid-rates from the NBP Table A API.
 * Groups by currency and fetches a single date range per currency,
 * then caches in localStorage. The validator selects the correct
 * rate for each invoice from the returned table.
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

function rangeCacheKey(currency: string, start: string, end: string): string {
  return `nbp:range:${currency}:${start}:${end}`;
}

async function fetchRateRange(
  currency: string,
  start: string,
  end: string,
): Promise<CurrencyRate[] | null> {
  try {
    const response = await fetch(`${NBP_API_BASE}/${currency}/${start}/${end}/?format=json`);
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data.rates.map((r: { effectiveDate: string; mid: number }) => ({
      currency,
      date: r.effectiveDate,
      mid: r.mid,
    }));
  } catch {
    // Network error
    return null;
  }
}

/**
 * Fetch NBP Table A mid-rates for a set of (currency, invoice date) pairs.
 * Groups by currency and issues one range request per unique currency.
 * Results are cached in localStorage keyed by currency + date range.
 *
 * @param pairs - { currency, date } where date is the invoice P_1 (YYYY-MM-DD)
 * @returns Record mapping currency → rate array (null if fetch failed)
 */
export async function fetchCurrencyRateTable(
  pairs: { currency: string; date: string }[],
): Promise<Record<string, CurrencyRate[] | null>> {
  // Group invoice dates by currency, skip PLN
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
      // Range covers the stale window (10 days) before the earliest invoice
      // and ends one day before the latest invoice (Art. 31a: previous business day)
      const rangeStart = subtractDays(sorted[0], 10);
      const rangeEnd = subtractDays(sorted[sorted.length - 1], 1);

      const key = rangeCacheKey(currency, rangeStart, rangeEnd);
      try {
        const cached = localStorage.getItem(key);
        if (cached) {
          table[currency] = JSON.parse(cached) as CurrencyRate[];
          return;
        }
      } catch {
        // localStorage unavailable
      }

      const rates = await fetchRateRange(currency, rangeStart, rangeEnd);
      table[currency] = rates;

      if (rates) {
        try {
          localStorage.setItem(key, JSON.stringify(rates));
        } catch {
          // localStorage full or unavailable
        }
      }
    }),
  );

  return table;
}
