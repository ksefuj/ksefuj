#!/usr/bin/env tsx

/**
 * Search Console export + site health crawl
 *
 * Collects Google Search Console data (search analytics, sitemaps, URL inspection)
 * and runs a Google-free health crawl of every sitemap URL, then writes:
 * - <out>/<YYYY-MM-DD>.json  full raw data
 * - <out>/latest.json        copy of the above
 * - <out>/latest.md          digest with Problems and Opportunities
 *
 * Env:
 * - GSC_SERVICE_ACCOUNT_JSON  service account key JSON (webmasters.readonly)
 * - GSC_SITE_URL              e.g. "sc-domain:ksefuj.to" or "https://ksefuj.to/"
 * If either is missing the GSC sections are skipped and only the health crawl runs.
 *
 * Run: pnpm exec tsx scripts/gsc-export.ts --out gsc-out
 * Exit code: 0 even when problems are found, 1 only on auth/config failure.
 */

/* eslint-disable no-console */
import { copyFileSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";

import { GoogleAuth } from "google-auth-library";

// ---------- config ----------

const SITE_ORIGIN = "https://ksefuj.to";
const SITEMAP_URL = `${SITE_ORIGIN}/sitemap.xml`;
const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";
const API_BASE = "https://searchconsole.googleapis.com";
const MAX_INSPECTIONS = 1800;
const INSPECTION_INTERVAL_MS = 100; // <= 10 req/s
const CRAWL_CONCURRENCY = 5;
const MAX_REDIRECTS = 5;
const USER_AGENT = "ksefuj-health-crawl/1.0 (+https://ksefuj.to)";

// ---------- small helpers ----------

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function addDays(d: Date, days: number): Date {
  const copy = new Date(d.getTime());
  copy.setUTCDate(copy.getUTCDate() + days);
  return copy;
}

function parseArgs(argv: string[]): { out: string } {
  let out = "gsc-out";
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--out" && argv[i + 1]) {
      out = argv[i + 1];
      i++;
    } else if (argv[i].startsWith("--out=")) {
      out = argv[i].slice("--out=".length);
    }
  }
  return { out };
}

async function pool<T, R>(
  items: T[],
  concurrency: number,
  fn: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  const workers = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (true) {
      const i = next++;
      if (i >= items.length) {
        return;
      }
      results[i] = await fn(items[i], i);
    }
  });
  await Promise.all(workers);
  return results;
}

function normalizeUrl(url: string): string {
  try {
    const u = new URL(url);
    u.hash = "";
    let s = u.toString();
    if (u.pathname !== "/" && s.endsWith("/") && !u.search) {
      s = s.slice(0, -1);
    }
    return s;
  } catch {
    return url;
  }
}

function decodeEntities(s: string): string {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h: string) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d: string) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function stripTags(s: string): string {
  return decodeEntities(s.replace(/<[^>]*>/g, ""))
    .replace(/\s+/g, " ")
    .trim();
}

function parseAttrs(tag: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const re = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+))/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(tag)) !== null) {
    attrs[m[1].toLowerCase()] = decodeEntities(m[2] ?? m[3] ?? m[4] ?? "");
  }
  return attrs;
}

// ---------- sitemap ----------

async function fetchText(url: string): Promise<{ status: number; text: string }> {
  const res = await fetch(url, {
    headers: { "user-agent": USER_AGENT },
    signal: AbortSignal.timeout(20000),
  });
  return { status: res.status, text: await res.text() };
}

async function loadSitemapUrls(url: string, depth = 0): Promise<string[]> {
  const { status, text } = await fetchText(url);
  if (status !== 200) {
    throw new Error(`${url} returned HTTP ${status}`);
  }
  const locs = [...text.matchAll(/<loc>\s*([\s\S]*?)\s*<\/loc>/gi)].map((m) =>
    decodeEntities(m[1].trim()),
  );
  if (/<sitemapindex/i.test(text) && depth < 3) {
    const nested = await Promise.all(locs.map((l) => loadSitemapUrls(l, depth + 1)));
    return [...new Set(nested.flat())];
  }
  return [...new Set(locs)];
}

// ---------- health crawl ----------

interface Hop {
  url: string;
  status: number;
}

interface PageResult {
  url: string;
  finalUrl: string;
  status: number | null;
  error?: string;
  redirectChain: Hop[];
  responseTimeMs: number | null;
  title: string | null;
  titleCount: number;
  titleLength: number;
  description: string | null;
  descriptionLength: number;
  canonical: string | null;
  robotsMeta: string | null;
  xRobotsTag: string | null;
  hreflang: { lang: string; href: string }[];
  h1Count: number;
  h1Text: string | null;
  internalLinks: string[];
}

async function fetchFollowing(
  url: string,
  method: "GET" | "HEAD",
): Promise<{
  finalUrl: string;
  status: number | null;
  chain: Hop[];
  headers: Headers | null;
  body: string;
  ms: number | null;
  error?: string;
}> {
  const chain: Hop[] = [];
  let current = url;
  for (let i = 0; i <= MAX_REDIRECTS; i++) {
    const start = Date.now();
    try {
      const res = await fetch(current, {
        method,
        redirect: "manual",
        headers: { "user-agent": USER_AGENT, accept: "text/html,*/*" },
        signal: AbortSignal.timeout(20000),
      });
      const body = method === "GET" ? await res.text() : "";
      const ms = Date.now() - start;
      const location = res.headers.get("location");
      if (res.status >= 300 && res.status < 400 && location) {
        chain.push({ url: current, status: res.status });
        if (i === MAX_REDIRECTS) {
          return {
            finalUrl: current,
            status: res.status,
            chain,
            headers: res.headers,
            body: "",
            ms,
            error: "too many redirects",
          };
        }
        current = new URL(location, current).toString();
        continue;
      }
      return { finalUrl: current, status: res.status, chain, headers: res.headers, body, ms };
    } catch (err) {
      return {
        finalUrl: current,
        status: null,
        chain,
        headers: null,
        body: "",
        ms: null,
        error: err instanceof Error ? err.message : String(err),
      };
    }
  }
  return { finalUrl: current, status: null, chain, headers: null, body: "", ms: null };
}

function isInternalHost(host: string): boolean {
  const h = host.replace(/^www\./, "");
  return h === new URL(SITE_ORIGIN).host;
}

function parseHtml(url: string, html: string) {
  const head = html;
  const titles = [...head.matchAll(/<title[^>]*>([\s\S]*?)<\/title>/gi)].map((m) =>
    stripTags(m[1]),
  );
  let description: string | null = null;
  let robotsMeta: string | null = null;
  for (const m of head.matchAll(/<meta\s[^>]*>/gi)) {
    const a = parseAttrs(m[0]);
    const name = (a.name ?? "").toLowerCase();
    if (name === "description" && description === null) {
      description = (a.content ?? "").trim();
    } else if ((name === "robots" || name === "googlebot") && a.content) {
      robotsMeta = robotsMeta ? `${robotsMeta}, ${a.content}` : a.content;
    }
  }
  let canonical: string | null = null;
  const hreflang: { lang: string; href: string }[] = [];
  for (const m of head.matchAll(/<link\s[^>]*>/gi)) {
    const a = parseAttrs(m[0]);
    const rel = (a.rel ?? "").toLowerCase().split(/\s+/);
    if (rel.includes("canonical") && canonical === null && a.href) {
      canonical = new URL(a.href, url).toString();
    } else if (rel.includes("alternate") && a.hreflang && a.href) {
      hreflang.push({ lang: a.hreflang, href: new URL(a.href, url).toString() });
    }
  }
  const h1s = [...html.matchAll(/<h1[\s>][\s\S]*?<\/h1>/gi)].map((m) => stripTags(m[0]));
  const links = new Set<string>();
  for (const m of html.matchAll(/<a\s[^>]*>/gi)) {
    const href = parseAttrs(m[0]).href;
    if (!href || /^(mailto:|tel:|javascript:|#)/i.test(href)) {
      continue;
    }
    try {
      const u = new URL(href, url);
      if ((u.protocol === "http:" || u.protocol === "https:") && isInternalHost(u.host)) {
        u.hash = "";
        // Cloudflare-injected endpoints (e.g. email obfuscation) are not real pages.
        if (!u.pathname.startsWith("/cdn-cgi/")) {
          links.add(u.toString());
        }
      }
    } catch {
      // ignore malformed href
    }
  }
  return {
    title: titles[0] ?? null,
    titleCount: titles.length,
    description,
    canonical,
    robotsMeta,
    hreflang,
    h1Count: h1s.length,
    h1Text: h1s[0] ?? null,
    internalLinks: [...links],
  };
}

const pageCache = new Map<string, Promise<PageResult>>();

function crawlPage(url: string): Promise<PageResult> {
  const key = normalizeUrl(url);
  let p = pageCache.get(key);
  if (!p) {
    p = doCrawlPage(url);
    pageCache.set(key, p);
  }
  return p;
}

async function doCrawlPage(url: string): Promise<PageResult> {
  const r = await fetchFollowing(url, "GET");
  const base: PageResult = {
    url,
    finalUrl: r.finalUrl,
    status: r.status,
    error: r.error,
    redirectChain: r.chain,
    responseTimeMs: r.ms,
    title: null,
    titleCount: 0,
    titleLength: 0,
    description: null,
    descriptionLength: 0,
    canonical: null,
    robotsMeta: null,
    xRobotsTag: r.headers?.get("x-robots-tag") ?? null,
    hreflang: [],
    h1Count: 0,
    h1Text: null,
    internalLinks: [],
  };
  if (r.status !== 200 || !r.body) {
    return base;
  }
  const parsed = parseHtml(r.finalUrl, r.body);
  return {
    ...base,
    ...parsed,
    titleLength: parsed.title?.length ?? 0,
    descriptionLength: parsed.description?.length ?? 0,
  };
}

interface LinkCheck {
  url: string;
  status: number | null;
  error?: string;
}

const linkCache = new Map<string, Promise<LinkCheck>>();

function checkLink(url: string): Promise<LinkCheck> {
  const key = normalizeUrl(url);
  let p = linkCache.get(key);
  if (!p) {
    p = (async () => {
      let r = await fetchFollowing(url, "HEAD");
      if (r.status === null || r.status >= 400) {
        r = await fetchFollowing(url, "GET");
      }
      // Report the first response (not the redirect target) so redirects surface as non-200.
      const first = r.chain[0];
      return { url, status: first ? first.status : r.status, error: r.error };
    })();
    linkCache.set(key, p);
  }
  return p;
}

interface HreflangIssue {
  page: string;
  lang: string;
  href: string;
  problem: string;
}

interface HealthData {
  sitemapUrl: string;
  sitemapUrlCount: number;
  sitemapError?: string;
  crawledAt: string;
  robots: {
    status: number | null;
    sitemapDirectives: string[];
    blockedSitemapUrls: string[];
  };
  pages: (PageResult & { brokenInternalLinks: LinkCheck[]; hreflangIssues: HreflangIssue[] })[];
}

function robotsDisallows(robotsTxt: string): string[] {
  // Collect Disallow rules from groups that apply to "*".
  const rules: string[] = [];
  let applies = false;
  let inAgents = false;
  for (const raw of robotsTxt.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, "").trim();
    const m = line.match(/^([a-zA-Z-]+)\s*:\s*(.*)$/);
    if (!m) {
      continue;
    }
    const field = m[1].toLowerCase();
    const value = m[2].trim();
    if (field === "user-agent") {
      if (!inAgents) {
        applies = false;
      }
      inAgents = true;
      if (value === "*") {
        applies = true;
      }
    } else {
      inAgents = false;
      if (applies && field === "disallow" && value) {
        rules.push(value);
      }
    }
  }
  return rules;
}

function ruleMatches(rule: string, path: string): boolean {
  const anchored = rule.endsWith("$");
  const pattern = (anchored ? rule.slice(0, -1) : rule)
    .split("*")
    .map((s) => s.replace(/[.+?^${}()|[\]\\]/g, "\\$&"))
    .join(".*");
  return new RegExp(`^${pattern}${anchored ? "$" : ""}`).test(path);
}

async function runHealthCrawl(urls: string[], sitemapError?: string): Promise<HealthData> {
  console.log(`Health crawl: ${urls.length} URLs`);

  const robotsRes = await fetchText(`${SITE_ORIGIN}/robots.txt`).catch(() => null);
  const robotsTxt = robotsRes?.status === 200 ? robotsRes.text : "";
  const disallows = robotsDisallows(robotsTxt);
  const sitemapDirectives = [...robotsTxt.matchAll(/^\s*sitemap\s*:\s*(\S+)/gim)].map((m) => m[1]);
  const blockedSitemapUrls = urls.filter((u) => {
    const { pathname, search } = new URL(u);
    return disallows.some((rule) => ruleMatches(rule, pathname + search));
  });

  const crawled = await pool(urls, CRAWL_CONCURRENCY, async (url, i) => {
    const page = await crawlPage(url);
    if ((i + 1) % 10 === 0) {
      console.log(`  crawled ${i + 1}/${urls.length}`);
    }
    return page;
  });

  // Internal link checks (deduped via linkCache).
  const allLinks = [...new Set(crawled.flatMap((p) => p.internalLinks.map(normalizeUrl)))];
  console.log(`Checking ${allLinks.length} unique internal links`);
  await pool(allLinks, CRAWL_CONCURRENCY, (l) => checkLink(l));

  const pages: HealthData["pages"] = [];
  for (const page of crawled) {
    const broken: LinkCheck[] = [];
    for (const link of page.internalLinks) {
      const res = await checkLink(link);
      if (res.status !== 200) {
        broken.push(res);
      }
    }

    const hreflangIssues: HreflangIssue[] = [];
    const selfKey = normalizeUrl(page.finalUrl);
    for (const alt of page.hreflang) {
      const altPage = await crawlPage(alt.href);
      if (altPage.status !== 200) {
        hreflangIssues.push({
          page: page.url,
          lang: alt.lang,
          href: alt.href,
          problem: `alternate returns ${altPage.status ?? altPage.error ?? "no response"}`,
        });
        continue;
      }
      const backlinks = altPage.hreflang.some((h) => normalizeUrl(h.href) === selfKey);
      if (!backlinks && normalizeUrl(alt.href) !== selfKey) {
        hreflangIssues.push({
          page: page.url,
          lang: alt.lang,
          href: alt.href,
          problem: "alternate does not link back (non-reciprocal)",
        });
      }
    }
    pages.push({ ...page, brokenInternalLinks: broken, hreflangIssues });
  }

  return {
    sitemapUrl: SITEMAP_URL,
    sitemapUrlCount: urls.length,
    sitemapError,
    crawledAt: new Date().toISOString(),
    robots: { status: robotsRes?.status ?? null, sitemapDirectives, blockedSitemapUrls },
    pages,
  };
}

// ---------- Google Search Console ----------

type Json = Record<string, unknown>;

interface Metrics {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface PageRow extends Metrics {
  page: string;
  prev?: Metrics;
  delta?: { clicks: number; impressions: number; ctr: number; position: number };
}

interface QueryRow extends Metrics {
  query: string;
  page: string;
}

interface InspectionResult {
  url: string;
  error?: string;
  verdict?: string;
  coverageState?: string;
  indexingState?: string;
  robotsTxtState?: string;
  pageFetchState?: string;
  lastCrawlTime?: string;
  googleCanonical?: string;
  userCanonical?: string;
  crawledAs?: string;
  mobileUsability?: { verdict?: string; issues?: unknown[] };
  richResults?: { verdict?: string; issues?: unknown[] };
}

interface GscData {
  skipped: boolean;
  reason?: string;
  error?: string;
  site?: string;
  periods?: {
    current: { start: string; end: string };
    previous: { start: string; end: string };
    daily: { start: string; end: string };
  };
  pages?: PageRow[];
  queries?: QueryRow[];
  daily?: ({ date: string } & Metrics)[];
  countries?: ({ country: string } & Metrics)[];
  devices?: ({ device: string } & Metrics)[];
  totals?: { current?: Metrics; previous?: Metrics };
  /** False when either by-page period request failed; deltas are then omitted. */
  comparisonAvailable?: boolean;
  sitemaps?: Json[];
  inspections?: InspectionResult[];
  inspectionsSkipped?: number;
  sectionErrors?: string[];
}

class AuthError extends Error {}

class GscClient {
  private readonly auth: GoogleAuth;
  readonly site: string;

  constructor(credentialsJson: string, site: string) {
    let credentials: Json;
    try {
      credentials = JSON.parse(credentialsJson) as Json;
    } catch {
      throw new AuthError("GSC_SERVICE_ACCOUNT_JSON is not valid JSON");
    }
    this.auth = new GoogleAuth({ credentials, scopes: [SCOPE] });
    this.site = site;
  }

  async request(method: "GET" | "POST", url: string, body?: unknown): Promise<Json> {
    for (let attempt = 0; attempt < 6; attempt++) {
      let token: string | null | undefined;
      try {
        token = await this.auth.getAccessToken();
      } catch (err) {
        throw new AuthError(
          `Failed to obtain access token: ${err instanceof Error ? err.message : String(err)}`,
        );
      }
      if (!token) {
        throw new AuthError("Empty access token");
      }
      const res = await fetch(url, {
        method,
        headers: {
          authorization: `Bearer ${token}`,
          ...(body ? { "content-type": "application/json" } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: AbortSignal.timeout(60000),
      }).catch(() => null);
      if (res && res.ok) {
        return (await res.json()) as Json;
      }
      const status = res?.status ?? 0;
      if (status === 401 || status === 403) {
        throw new AuthError(`HTTP ${status} from ${url}: ${(await res?.text())?.slice(0, 300)}`);
      }
      if (res && status !== 429 && status < 500) {
        throw new Error(`HTTP ${status} from ${url}: ${(await res.text()).slice(0, 300)}`);
      }
      await sleep(1000 * 2 ** attempt);
    }
    throw new Error(`Giving up on ${method} ${url} after retries`);
  }

  private get siteBase(): string {
    return `${API_BASE}/webmasters/v3/sites/${encodeURIComponent(this.site)}`;
  }

  async searchAnalytics(
    startDate: string,
    endDate: string,
    dimensions: string[],
    rowLimit: number,
    maxRows = rowLimit,
  ): Promise<Json[]> {
    const rows: Json[] = [];
    for (let startRow = 0; startRow < maxRows; startRow += rowLimit) {
      const res = await this.request("POST", `${this.siteBase}/searchAnalytics/query`, {
        startDate,
        endDate,
        dimensions,
        rowLimit,
        startRow,
        dataState: "final",
      });
      const batch = (res.rows as Json[] | undefined) ?? [];
      rows.push(...batch);
      if (batch.length < rowLimit) {
        break;
      }
    }
    return rows;
  }

  sitemaps(): Promise<Json> {
    return this.request("GET", `${this.siteBase}/sitemaps`);
  }

  inspect(url: string): Promise<Json> {
    return this.request("POST", `${API_BASE}/v1/urlInspection/index:inspect`, {
      inspectionUrl: url,
      siteUrl: this.site,
      languageCode: "en-US",
    });
  }
}

function metrics(r: Json): Metrics {
  return {
    clicks: Number(r.clicks ?? 0),
    impressions: Number(r.impressions ?? 0),
    ctr: Number(r.ctr ?? 0),
    position: Number(r.position ?? 0),
  };
}

function sumMetrics(rows: Metrics[]): Metrics {
  const clicks = rows.reduce((s, r) => s + r.clicks, 0);
  const impressions = rows.reduce((s, r) => s + r.impressions, 0);
  const position = impressions
    ? rows.reduce((s, r) => s + r.position * r.impressions, 0) / impressions
    : 0;
  return { clicks, impressions, ctr: impressions ? clicks / impressions : 0, position };
}

async function runGsc(client: GscClient, urls: string[], today: Date): Promise<GscData> {
  const end = addDays(today, -3);
  const curStart = addDays(end, -27);
  const prevEnd = addDays(curStart, -1);
  const prevStart = addDays(prevEnd, -27);
  const dailyStart = addDays(end, -89);
  const periods = {
    current: { start: isoDate(curStart), end: isoDate(end) },
    previous: { start: isoDate(prevStart), end: isoDate(prevEnd) },
    daily: { start: isoDate(dailyStart), end: isoDate(end) },
  };
  const data: GscData = { skipped: false, site: client.site, periods, sectionErrors: [] };

  const section = async <T>(name: string, fn: () => Promise<T>): Promise<T | undefined> => {
    try {
      return await fn();
    } catch (err) {
      if (err instanceof AuthError) {
        throw err;
      }
      const msg = `${name}: ${err instanceof Error ? err.message : String(err)}`;
      console.warn(`  GSC section failed: ${msg}`);
      data.sectionErrors?.push(msg);
      return undefined;
    }
  };

  console.log("GSC: search analytics");
  const [curPages, prevPages, curTotal, prevTotal] = await Promise.all([
    section("pages(current)", () =>
      client.searchAnalytics(periods.current.start, periods.current.end, ["page"], 1000, 25000),
    ),
    section("pages(previous)", () =>
      client.searchAnalytics(periods.previous.start, periods.previous.end, ["page"], 1000, 25000),
    ),
    section("totals(current)", () =>
      client.searchAnalytics(periods.current.start, periods.current.end, [], 1),
    ),
    section("totals(previous)", () =>
      client.searchAnalytics(periods.previous.start, periods.previous.end, [], 1),
    ),
  ]);
  // Site totals come from dimensionless queries (one row), not from summing page rows.
  // An empty result with a successful request means zero traffic.
  const totalOf = (rows: Json[] | undefined): Metrics | undefined => {
    if (!rows) {
      return undefined;
    }
    return rows[0] ? metrics(rows[0]) : sumMetrics([]);
  };
  data.totals = { current: totalOf(curTotal), previous: totalOf(prevTotal) };

  data.comparisonAvailable = curPages !== undefined && prevPages !== undefined;
  const prevByPage = new Map<string, Metrics>();
  for (const r of prevPages ?? []) {
    prevByPage.set((r.keys as string[])[0], metrics(r));
  }
  data.pages = (curPages ?? []).map((r) => {
    const page = (r.keys as string[])[0];
    const m = metrics(r);
    const prev = data.comparisonAvailable ? prevByPage.get(page) : undefined;
    return {
      page,
      ...m,
      prev,
      delta: prev
        ? {
            clicks: m.clicks - prev.clicks,
            impressions: m.impressions - prev.impressions,
            ctr: m.ctr - prev.ctr,
            position: m.position - prev.position,
          }
        : undefined,
    };
  });
  if (data.comparisonAvailable) {
    // Pages that only existed in the previous period (lost all traffic).
    const curSet = new Set(data.pages.map((p) => p.page));
    for (const [page, prev] of prevByPage) {
      if (!curSet.has(page)) {
        data.pages.push({
          page,
          clicks: 0,
          impressions: 0,
          ctr: 0,
          position: 0,
          prev,
          delta: {
            clicks: -prev.clicks,
            impressions: -prev.impressions,
            ctr: -prev.ctr,
            position: 0,
          },
        });
      }
    }
  }

  const queryRows = await section("queries", () =>
    client.searchAnalytics(
      periods.current.start,
      periods.current.end,
      ["query", "page"],
      5000,
      25000,
    ),
  );
  data.queries = (queryRows ?? []).map((r) => {
    const [query, page] = r.keys as string[];
    return { query, page, ...metrics(r) };
  });

  const daily = await section("daily", () =>
    client.searchAnalytics(periods.daily.start, periods.daily.end, ["date"], 1000),
  );
  data.daily = (daily ?? []).map((r) => ({ date: (r.keys as string[])[0], ...metrics(r) }));

  const countries = await section("countries", () =>
    client.searchAnalytics(periods.current.start, periods.current.end, ["country"], 1000),
  );
  data.countries = (countries ?? []).map((r) => ({
    country: (r.keys as string[])[0],
    ...metrics(r),
  }));

  const devices = await section("devices", () =>
    client.searchAnalytics(periods.current.start, periods.current.end, ["device"], 1000),
  );
  data.devices = (devices ?? []).map((r) => ({ device: (r.keys as string[])[0], ...metrics(r) }));

  console.log("GSC: sitemaps");
  const sm = await section("sitemaps", () => client.sitemaps());
  data.sitemaps = (sm?.sitemap as Json[] | undefined) ?? [];

  // Without a sitemap URL list, fall back to the pages that appear in Search Analytics.
  const inspectList =
    urls.length > 0
      ? urls
      : (curPages ?? [])
          .map((r) => (r.keys as string[])[0])
          .filter((u, i, arr) => arr.indexOf(u) === i);
  const toInspect = inspectList.slice(0, MAX_INSPECTIONS);
  data.inspectionsSkipped = inspectList.length - toInspect.length;
  console.log(`GSC: inspecting ${toInspect.length} URLs`);
  data.inspections = [];
  for (let i = 0; i < toInspect.length; i++) {
    const url = toInspect[i];
    const started = Date.now();
    try {
      const res = await client.inspect(url);
      const result = (res.inspectionResult ?? {}) as Json;
      const idx = (result.indexStatusResult ?? {}) as Json;
      const mobile = result.mobileUsabilityResult as Json | undefined;
      const rich = result.richResultsResult as Json | undefined;
      data.inspections.push({
        url,
        verdict: idx.verdict as string | undefined,
        coverageState: idx.coverageState as string | undefined,
        indexingState: idx.indexingState as string | undefined,
        robotsTxtState: idx.robotsTxtState as string | undefined,
        pageFetchState: idx.pageFetchState as string | undefined,
        lastCrawlTime: idx.lastCrawlTime as string | undefined,
        googleCanonical: idx.googleCanonical as string | undefined,
        userCanonical: idx.userCanonical as string | undefined,
        crawledAs: idx.crawledAs as string | undefined,
        mobileUsability: mobile
          ? { verdict: mobile.verdict as string | undefined, issues: mobile.issues as unknown[] }
          : undefined,
        richResults: rich
          ? { verdict: rich.verdict as string | undefined, issues: rich.detectedItems as unknown[] }
          : undefined,
      });
    } catch (err) {
      if (err instanceof AuthError) {
        throw err;
      }
      data.inspections.push({ url, error: err instanceof Error ? err.message : String(err) });
    }
    const wait = INSPECTION_INTERVAL_MS - (Date.now() - started);
    if (wait > 0) {
      await sleep(wait);
    }
  }
  return data;
}

// ---------- digest ----------

const pct = (n: number) => `${(n * 100).toFixed(2)}%`;
const num = (n: number) => Math.round(n).toLocaleString("en-US");
const signed = (n: number, digits = 0) => `${n >= 0 ? "+" : ""}${n.toFixed(digits)}`;
const pathOf = (url: string) => {
  try {
    const u = new URL(url);
    return u.pathname + u.search;
  } catch {
    return url;
  }
};

function queryCoveredByPage(query: string, page: HealthData["pages"][number] | undefined): boolean {
  if (!page || page.status !== 200) {
    return true; // cannot judge
  }
  const hay = `${page.title ?? ""} ${page.h1Text ?? ""}`.toLowerCase();
  const terms = query
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter((t) => t.length >= 3);
  if (terms.length === 0) {
    return true;
  }
  // Prefix match (first 5 chars) to tolerate Polish inflection.
  const hits = terms.filter((t) => hay.includes(t.slice(0, 5))).length;
  return hits / terms.length >= 0.5;
}

function buildDigest(date: string, health: HealthData, gsc: GscData): string {
  const L: string[] = [];
  const byUrl = new Map(health.pages.map((p) => [normalizeUrl(p.url), p]));
  const pageFor = (url: string) =>
    byUrl.get(normalizeUrl(url)) ?? byUrl.get(normalizeUrl(url.replace(/\/$/, "")));

  L.push(`# Search Console + site health digest (${date})`, "");
  L.push(`Site: ${SITE_ORIGIN} | Sitemap URLs: ${health.sitemapUrlCount}`, "");

  L.push("## Totals", "");
  if (gsc.skipped) {
    L.push(`GSC sections skipped: ${gsc.reason}`, "");
  } else if (gsc.totals && gsc.periods) {
    const c = gsc.totals.current;
    const p = gsc.totals.previous;
    L.push(
      `Current: ${gsc.periods.current.start} to ${gsc.periods.current.end}; previous: ${gsc.periods.previous.start} to ${gsc.periods.previous.end}`,
      "",
    );
    if (c && p) {
      L.push(
        "| Metric | Current | Previous | Change |",
        "| --- | --- | --- | --- |",
        `| Clicks | ${num(c.clicks)} | ${num(p.clicks)} | ${signed(c.clicks - p.clicks)} |`,
        `| Impressions | ${num(c.impressions)} | ${num(p.impressions)} | ${signed(c.impressions - p.impressions)} |`,
        `| CTR | ${pct(c.ctr)} | ${pct(p.ctr)} | ${signed((c.ctr - p.ctr) * 100, 2)} pp |`,
        `| Avg position | ${c.position.toFixed(1)} | ${p.position.toFixed(1)} | ${signed(c.position - p.position, 1)} |`,
        "",
      );
    } else {
      L.push(
        "Period comparison unavailable: a totals request failed (see GSC section errors).",
        "",
      );
      if (c) {
        L.push(
          `Current only: ${num(c.clicks)} clicks, ${num(c.impressions)} impressions, CTR ${pct(c.ctr)}, avg position ${c.position.toFixed(1)}`,
          "",
        );
      }
    }
    if (gsc.devices?.length) {
      L.push(
        `Devices: ${gsc.devices.map((d) => `${d.device} ${num(d.clicks)} clicks / ${num(d.impressions)} impr`).join("; ")}`,
        "",
      );
    }
    if (gsc.countries?.length) {
      const top = [...gsc.countries].sort((a, b) => b.clicks - a.clicks).slice(0, 5);
      L.push(
        `Top countries: ${top.map((d) => `${d.country} ${num(d.clicks)} clicks / ${num(d.impressions)} impr`).join("; ")}`,
        "",
      );
    }
  }
  if (gsc.sectionErrors?.length) {
    L.push("GSC section errors:", ...gsc.sectionErrors.map((e) => `- ${e}`), "");
  }

  // ----- Problems -----
  L.push("## Problems", "");
  let problemCount = 0;
  const section = (title: string, items: string[]) => {
    if (items.length === 0) {
      return;
    }
    problemCount += items.length;
    L.push(`### ${title} (${items.length})`, "", ...items.map((i) => `- ${i}`), "");
  };

  section("Sitemap", health.sitemapError ? [health.sitemapError] : []);

  const insp = gsc.inspections ?? [];
  section(
    "Not indexed (URL Inspection)",
    insp
      .filter((i) => !i.error && i.verdict !== "PASS")
      .map((i) => `${i.url}: ${i.coverageState ?? i.verdict ?? "unknown"}`),
  );
  section(
    "Google canonical differs from declared canonical",
    insp
      .filter(
        (i) =>
          i.googleCanonical &&
          i.userCanonical &&
          normalizeUrl(i.googleCanonical) !== normalizeUrl(i.userCanonical),
      )
      .map((i) => `${i.url}: google=${i.googleCanonical} user=${i.userCanonical}`),
  );
  section(
    "Sitemap URLs that are non-200 or redirected",
    health.pages
      .filter((p) => p.status !== 200 || p.redirectChain.length > 0)
      .map((p) => {
        const chain = p.redirectChain.map((h) => `${h.status}`).join(" -> ");
        return `${p.url}: ${p.status ?? p.error ?? "no response"}${chain ? ` (redirects: ${chain} -> ${p.finalUrl})` : ""}`;
      }),
  );
  section(
    "Sitemap URLs blocked by robots.txt",
    health.robots.blockedSitemapUrls.map((u) => u),
  );
  section(
    "Noindex on sitemap URLs",
    health.pages
      .filter((p) => /noindex/i.test(`${p.robotsMeta ?? ""} ${p.xRobotsTag ?? ""}`))
      .map((p) => `${p.url}: ${[p.robotsMeta, p.xRobotsTag].filter(Boolean).join(" / ")}`),
  );
  section(
    "Broken internal links",
    health.pages.flatMap((p) =>
      p.brokenInternalLinks.map(
        (l) => `${p.url} links to ${l.url}: ${l.status ?? l.error ?? "no response"}`,
      ),
    ),
  );
  section(
    "Hreflang errors",
    health.pages.flatMap((p) =>
      p.hreflangIssues.map((h) => `${h.page} [${h.lang}] ${h.href}: ${h.problem}`),
    ),
  );
  const ok = health.pages.filter((p) => p.status === 200);
  const canonicalProblems: string[] = [];
  for (const p of ok) {
    if (!p.canonical) {
      canonicalProblems.push(`${p.url}: missing canonical`);
    } else if (normalizeUrl(p.canonical) !== normalizeUrl(p.finalUrl)) {
      canonicalProblems.push(`${p.url}: canonical points to ${p.canonical}`);
    }
  }
  section("Canonical tag issues", canonicalProblems);

  const metaProblems: string[] = [];
  const titleCounts = new Map<string, string[]>();
  const descCounts = new Map<string, string[]>();
  for (const p of ok) {
    if (!p.title) {
      metaProblems.push(`${p.url}: missing title`);
    } else {
      titleCounts.set(p.title, [...(titleCounts.get(p.title) ?? []), p.url]);
      if (p.titleLength > 60) {
        metaProblems.push(`${p.url}: title too long (${p.titleLength} > 60)`);
      }
    }
    if (!p.description) {
      metaProblems.push(`${p.url}: missing meta description`);
    } else {
      descCounts.set(p.description, [...(descCounts.get(p.description) ?? []), p.url]);
      if (p.descriptionLength > 160) {
        metaProblems.push(`${p.url}: description too long (${p.descriptionLength} > 160)`);
      }
    }
    if (p.h1Count !== 1) {
      metaProblems.push(`${p.url}: ${p.h1Count} h1 elements (expected 1)`);
    }
  }
  for (const [t, us] of titleCounts) {
    if (us.length > 1) {
      metaProblems.push(`duplicate title "${t}": ${us.join(", ")}`);
    }
  }
  for (const [d, us] of descCounts) {
    if (us.length > 1) {
      metaProblems.push(`duplicate description "${d.slice(0, 60)}...": ${us.join(", ")}`);
    }
  }
  section("Title / description / h1 issues", metaProblems);

  section(
    "Sitemap errors (Search Console)",
    (gsc.sitemaps ?? [])
      .filter((s) => Number(s.errors ?? 0) > 0 || Number(s.warnings ?? 0) > 0)
      .map((s) => `${s.path}: ${s.errors} errors, ${s.warnings} warnings`),
  );
  section(
    "Mobile usability / rich result issues",
    insp.flatMap((i) => {
      const out: string[] = [];
      if (i.mobileUsability?.verdict && i.mobileUsability.verdict !== "PASS") {
        out.push(
          `${i.url}: mobile usability ${i.mobileUsability.verdict} ${JSON.stringify(i.mobileUsability.issues ?? [])}`,
        );
      }
      if (i.richResults?.verdict && i.richResults.verdict !== "PASS") {
        out.push(`${i.url}: rich results ${i.richResults.verdict}`);
      }
      return out;
    }),
  );
  section(
    "URL Inspection request failures",
    insp.filter((i) => i.error).map((i) => `${i.url}: ${i.error}`),
  );
  if (problemCount === 0) {
    L.push("No problems found.", "");
  }

  // ----- Opportunities -----
  L.push("## Opportunities", "");
  if (gsc.skipped) {
    L.push("Skipped (no Search Console data).", "");
  } else {
    const lowCtr = (gsc.pages ?? [])
      .filter((p) => p.impressions >= 200 && p.ctr < 0.015)
      .sort((a, b) => b.impressions - a.impressions);
    L.push(`### Pages with >= 200 impressions and CTR < 1.5% (${lowCtr.length})`, "");
    for (const p of lowCtr.slice(0, 25)) {
      const h = pageFor(p.page);
      L.push(
        `- ${pathOf(p.page)}: ${num(p.impressions)} impr, ${num(p.clicks)} clicks, CTR ${pct(p.ctr)}, pos ${p.position.toFixed(1)}${h ? ` | title (${h.titleLength}): "${h.title ?? ""}"` : ""}`,
      );
    }
    L.push("");

    const queries = gsc.queries ?? [];
    const striking = queries
      .filter((q) => q.position >= 4 && q.position <= 20 && q.impressions >= 50)
      .sort((a, b) => b.impressions - a.impressions);
    L.push(`### Queries at position 4-20 with >= 50 impressions (${striking.length})`, "");
    for (const q of striking.slice(0, 40)) {
      L.push(
        `- "${q.query}": pos ${q.position.toFixed(1)}, ${num(q.impressions)} impr, ${num(q.clicks)} clicks -> ${pathOf(q.page)}`,
      );
    }
    L.push("");

    const mismatched = queries
      .filter((q) => q.impressions > 0 && !queryCoveredByPage(q.query, pageFor(q.page)))
      .sort((a, b) => b.impressions - a.impressions);
    L.push(
      `### Queries whose ranking page lacks the query terms in title/h1 (${mismatched.length})`,
      "",
    );
    for (const q of mismatched.slice(0, 40)) {
      const h = pageFor(q.page);
      L.push(
        `- "${q.query}" (${num(q.impressions)} impr, pos ${q.position.toFixed(1)}) -> ${pathOf(q.page)} | title: "${h?.title ?? ""}" | h1: "${h?.h1Text ?? ""}"`,
      );
    }
    L.push("");

    if (gsc.comparisonAvailable) {
      const drops = (gsc.pages ?? [])
        .filter((p) => p.delta && p.delta.clicks < 0)
        .sort((a, b) => (a.delta?.clicks ?? 0) - (b.delta?.clicks ?? 0))
        .slice(0, 15);
      L.push(`### Biggest click drops vs previous period (${drops.length})`, "");
      for (const p of drops) {
        L.push(
          `- ${pathOf(p.page)}: ${num(p.prev?.clicks ?? 0)} -> ${num(p.clicks)} clicks (${signed(p.delta?.clicks ?? 0)}), impressions ${signed(p.delta?.impressions ?? 0)}, position ${signed(p.delta?.position ?? 0, 1)}`,
        );
      }
      L.push("");
    } else {
      L.push(
        "### Biggest click drops vs previous period",
        "",
        "Comparison unavailable: a by-page request failed (see GSC section errors).",
        "",
      );
    }
  }

  // ----- Page inventory -----
  L.push("## Health crawl inventory", "");
  L.push(
    "| Path | Status | ms | Title len | Desc len | h1 | Hreflang |",
    "| --- | --- | --- | --- | --- | --- | --- |",
  );
  for (const p of health.pages) {
    L.push(
      `| ${pathOf(p.url)} | ${p.status ?? "ERR"} | ${p.responseTimeMs ?? ""} | ${p.titleLength} | ${p.descriptionLength} | ${p.h1Count} | ${p.hreflang.length} |`,
    );
  }
  L.push("");
  return L.join("\n");
}

// ---------- main ----------

async function main() {
  const { out } = parseArgs(process.argv.slice(2));
  const now = new Date();
  const date = isoDate(now);

  const saJson = process.env.GSC_SERVICE_ACCOUNT_JSON;
  const siteUrl = process.env.GSC_SITE_URL;

  let urls: string[] = [];
  let sitemapError: string | undefined;
  try {
    urls = await loadSitemapUrls(SITEMAP_URL);
  } catch (err) {
    sitemapError = `sitemap.xml unreachable: ${err instanceof Error ? err.message : String(err)}`;
    console.warn(sitemapError);
  }
  console.log(`Sitemap: ${urls.length} URLs`);

  const health = await runHealthCrawl(urls, sitemapError);

  let gsc: GscData;
  let fatal: string | null = null;
  if (!saJson || !siteUrl) {
    const missing = [!saJson && "GSC_SERVICE_ACCOUNT_JSON", !siteUrl && "GSC_SITE_URL"]
      .filter(Boolean)
      .join(", ");
    gsc = { skipped: true, reason: `missing env: ${missing}` };
    console.warn(`GSC skipped: ${gsc.reason}`);
  } else {
    try {
      gsc = await runGsc(new GscClient(saJson, siteUrl), urls, now);
    } catch (err) {
      if (!(err instanceof AuthError)) {
        throw err;
      }
      fatal = err.message;
      gsc = { skipped: true, reason: `auth failure: ${err.message}`, error: err.message };
    }
  }

  mkdirSync(out, { recursive: true });
  const json = JSON.stringify({ generatedAt: now.toISOString(), date, gsc, health }, null, 2);
  const dated = join(out, `${date}.json`);
  writeFileSync(dated, json);
  copyFileSync(dated, join(out, "latest.json"));
  writeFileSync(join(out, "latest.md"), buildDigest(date, health, gsc));
  console.log(`Wrote ${dated}, latest.json, latest.md`);

  if (fatal) {
    console.error(`GSC auth/config failure: ${fatal}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
