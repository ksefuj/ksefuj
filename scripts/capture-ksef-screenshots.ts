#!/usr/bin/env tsx

/**
 * KSeF Aplikacja Podatnika screenshots (TEST environment only)
 *
 * Captures the screenshots used in the guide "Jak odebrać fakturę z KSeF":
 * 1. logs in to https://ap-test.ksef.mf.gov.pl/web/ as a fake seller (self-signed test certificate),
 * 2. issues two fake invoices to a fake buyer by uploading FA(3) XML ("Wczytaj fakturę"),
 * 3. logs in as the buyer and captures the purchase-invoice screens,
 * 4. converts the shots to WebP and merges them into apps/web/src/data/screenshots.json.
 *
 * Only fictional data is used. Never point this script at the production environment.
 *
 * Run: pnpm screenshots            (add --headed to watch the browser)
 * Exit code: 0 when every screenshot was produced, 1 on any failure.
 */

/* eslint-disable no-console */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { type BrowserContext, chromium, type Locator, type Page } from "playwright";
import sharp from "sharp";

// ---------- config ----------

const APP_URL = "https://ap-test.ksef.mf.gov.pl/web/";
// Production KSeF hosts. Any request to them is aborted, so the script can only ever touch TEST.
const PRODUCTION_HOSTS = /^(ap|api|qr)\.ksef\.mf\.gov\.pl$/;
const VIEWPORT = { width: 1280, height: 800 };
const DEVICE_SCALE_FACTOR = 2;
const WEBP_QUALITY = 82;
const HIGHLIGHT_STYLE = "outline: 3px solid #8b5cf6; outline-offset: 3px; border-radius: 8px";

// Fixed, checksum-valid, fictional NIPs (not the docs example 7980332920) so reruns are reproducible.
const SELLER = {
  nip: "5264812036",
  name: "Przykładowa Pracownia Sp. z o.o.",
  address1: "ul. Przykładowa 1",
  address2: "00-001 Warszawa",
};
const BUYER = {
  nip: "7429136088",
  name: "Anna Przykładowa Usługi Graficzne",
  address1: "ul. Testowa 2",
  address2: "00-002 Warszawa",
};

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "apps/web/public/screenshots/ksef-ap");
const MANIFEST_PATH = join(ROOT, "apps/web/src/data/screenshots.json");

const HEADED = process.argv.includes("--headed");

// ---------- helpers ----------

interface ManifestEntry {
  src: string;
  width: number;
  height: number;
  capturedAt: string;
  appVersion: string;
  env: "test";
}

function step(message: string): void {
  console.log(`\n[step] ${message}`);
}

function info(message: string): void {
  console.log(`       ${message}`);
}

function todayIso(): string {
  const d = new Date();
  const pad = (n: number): string => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

interface FakeInvoice {
  number: string;
  description: string;
  netAmount: number;
}

function money(value: number): string {
  return value.toFixed(2);
}

/** Minimal valid FA(3) invoice, one line item, 23% VAT, issued today. */
function buildInvoiceXml(invoice: FakeInvoice, issueDate: string): string {
  const vat = Math.round(invoice.netAmount * 23) / 100;
  const gross = invoice.netAmount + vat;
  return `<?xml version="1.0" encoding="UTF-8"?>
<Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <Naglowek>
    <KodFormularza kodSystemowy="FA (3)" wersjaSchemy="1-0E">FA</KodFormularza>
    <WariantFormularza>3</WariantFormularza>
    <DataWytworzeniaFa>${new Date().toISOString().replace(/\.\d+Z$/, "Z")}</DataWytworzeniaFa>
    <SystemInfo>ksefuj</SystemInfo>
  </Naglowek>
  <Podmiot1>
    <DaneIdentyfikacyjne><NIP>${SELLER.nip}</NIP><Nazwa>${SELLER.name}</Nazwa></DaneIdentyfikacyjne>
    <Adres><KodKraju>PL</KodKraju><AdresL1>${SELLER.address1}</AdresL1><AdresL2>${SELLER.address2}</AdresL2></Adres>
  </Podmiot1>
  <Podmiot2>
    <DaneIdentyfikacyjne><NIP>${BUYER.nip}</NIP><Nazwa>${BUYER.name}</Nazwa></DaneIdentyfikacyjne>
    <Adres><KodKraju>PL</KodKraju><AdresL1>${BUYER.address1}</AdresL1><AdresL2>${BUYER.address2}</AdresL2></Adres>
    <JST>2</JST>
    <GV>2</GV>
  </Podmiot2>
  <Fa>
    <KodWaluty>PLN</KodWaluty>
    <P_1>${issueDate}</P_1>
    <P_2>${invoice.number}</P_2>
    <P_13_1>${money(invoice.netAmount)}</P_13_1>
    <P_14_1>${money(vat)}</P_14_1>
    <P_15>${money(gross)}</P_15>
    <Adnotacje>
      <P_16>2</P_16><P_17>2</P_17><P_18>2</P_18><P_18A>2</P_18A>
      <Zwolnienie><P_19N>1</P_19N></Zwolnienie>
      <NoweSrodkiTransportu><P_22N>1</P_22N></NoweSrodkiTransportu>
      <P_23>2</P_23>
      <PMarzy><P_PMarzyN>1</P_PMarzyN></PMarzy>
    </Adnotacje>
    <RodzajFaktury>VAT</RodzajFaktury>
    <FaWiersz>
      <NrWierszaFa>1</NrWierszaFa>
      <P_7>${invoice.description}</P_7>
      <P_8A>szt.</P_8A>
      <P_8B>1</P_8B>
      <P_9A>${money(invoice.netAmount)}</P_9A>
      <P_11>${money(invoice.netAmount)}</P_11>
      <P_12>23</P_12>
    </FaWiersz>
  </Fa>
</Faktura>
`;
}

async function dismissCookieBanner(page: Page): Promise<void> {
  await page
    .getByRole("button", { name: "Rozumiem" })
    .click({ timeout: 2000 })
    .catch(() => undefined);
}

/** Self-signed test login ("Uwierzytelnienie testowe") for the given NIP. */
async function login(context: BrowserContext, nip: string): Promise<Page> {
  step(`Logging in as ${nip}`);
  const page = await context.newPage();
  await page.goto(APP_URL, { waitUntil: "networkidle", timeout: 60_000 }).catch(() => undefined);
  await dismissCookieBanner(page);

  await page.getByRole("button", { name: "Zaloguj", exact: true }).first().click();
  await page
    .locator("input[type=checkbox], mat-checkbox, [role=checkbox]")
    .first()
    .click({ force: true });
  await page.getByRole("button", { name: "Przejdź dalej" }).click();
  await dismissCookieBanner(page);

  await page.getByRole("button", { name: "Generuj certyfikat" }).click();
  const nipInputs = page.getByPlaceholder("Wpisz NIP");
  await nipInputs.first().waitFor({ timeout: 15_000 });
  for (let i = 0; i < (await nipInputs.count()); i++) {
    await nipInputs.nth(i).fill(nip);
  }

  // Signing the test request may time out in the UI while the login still succeeds.
  await page
    .getByRole("button", { name: "Podpisz testowe żądanie autoryzacyjne" })
    .click({ timeout: 10_000, force: true })
    .catch(() => info("sign button click did not settle (continuing)"));
  await page
    .getByRole("button", { name: "Uwierzytelnij do aplikacji testowej" })
    .click({ timeout: 15_000 });

  await page.waitForURL(/\/web\/home/, { timeout: 45_000 });
  await dismissCookieBanner(page);
  await menuItem(page, "Faktury").waitFor({ timeout: 15_000 });
  info(`logged in, on ${page.url()}`);
  return page;
}

function menuItem(page: Page, name: string): Locator {
  return page
    .locator("#main-menu")
    .getByRole("treeitem", { name: new RegExp(name) })
    .first();
}

async function openInvoicesMenu(page: Page): Promise<void> {
  const group = menuItem(page, "Faktury");
  if ((await group.getAttribute("aria-expanded")) !== "true") {
    await group.click();
  }
  await page.locator("#main-menu").getByText("Lista faktur", { exact: true }).waitFor();
}

// ---------- seeding ----------

async function issueInvoice(page: Page, invoice: FakeInvoice, xml: string): Promise<void> {
  step(`Issuing invoice ${invoice.number}`);
  await openInvoicesMenu(page);
  await page.locator("#main-menu").getByText("Wczytaj fakturę", { exact: true }).click();
  await page.locator("input[type=file]").setInputFiles({
    name: "faktura.xml",
    mimeType: "text/xml",
    buffer: Buffer.from(xml, "utf-8"),
  });
  await page.getByText("Plik wczytany pomyślnie.").waitFor({ timeout: 15_000 });
  await page.getByRole("button", { name: "Wystaw fakturę" }).click();

  const result = page.locator("main, #akmf-main, body").first();
  const deadline = Date.now() + 120_000;
  let text = "";
  while (Date.now() < deadline) {
    await page.waitForTimeout(4000);
    text = (await result.innerText()).replace(/\s+/g, " ");
    if (!/W realizacji/.test(text)) {
      break;
    }
    await page
      .getByRole("button", { name: /Odśwież/ })
      .first()
      .click()
      .catch(() => undefined);
  }

  if (/W realizacji/.test(text)) {
    throw new Error(`Invoice ${invoice.number} still processing after timeout`);
  }
  if (/Identyczna faktura została już prawidłowo wysłana/.test(text)) {
    info("identical invoice already in KSeF (rerun on the same day), reusing it");
  } else if (/Błąd/.test(text)) {
    throw new Error(`Invoice ${invoice.number} rejected: ${text.slice(0, 400)}`);
  } else {
    info(`done: ${text.slice(0, 160)}`);
  }
  // Leave the result screen so the next "Wczytaj fakturę" starts from a fresh form.
  await page.getByText("Powrót do listy faktur").first().click();
  await page.getByRole("tab", { name: /Faktury sprzedażowe/ }).waitFor();
}

async function seed(context: BrowserContext): Promise<void> {
  const issueDate = todayIso();
  const [year, month] = issueDate.split("-");
  const invoices: FakeInvoice[] = [
    { number: `FV/${year}/${month}/1`, description: "Projekt logo", netAmount: 2000 },
    { number: `FV/${year}/${month}/2`, description: "Projekt wizytówek", netAmount: 450 },
  ];
  const page = await login(context, SELLER.nip);
  for (const invoice of invoices) {
    await issueInvoice(page, invoice, buildInvoiceXml(invoice, issueDate));
  }
  await page.close();
}

// ---------- capturing ----------

interface Shot {
  name: string;
  png: Buffer;
}

const shots: Shot[] = [];

async function highlight(target: Locator): Promise<void> {
  await target.evaluate((el, style) => {
    el.setAttribute("data-ksefuj-prev-style", el.getAttribute("style") ?? "");
    el.setAttribute("style", `${el.getAttribute("style") ?? ""}; ${style}`);
  }, HIGHLIGHT_STYLE);
}

async function unhighlight(target: Locator): Promise<void> {
  await target.evaluate((el) => {
    el.setAttribute("style", el.getAttribute("data-ksefuj-prev-style") ?? "");
    el.removeAttribute("data-ksefuj-prev-style");
  });
}

/** Screenshot of a page region in CSS pixels (page coordinates, full page). */
async function capture(
  page: Page,
  name: string,
  clip: { x: number; y: number; width: number; height: number },
  highlighted?: Locator,
): Promise<void> {
  if (highlighted) {
    await highlight(highlighted);
  }
  await page.waitForTimeout(400);
  const png = await page.screenshot({ clip, fullPage: true, animations: "disabled" });
  if (highlighted) {
    await unhighlight(highlighted);
  }
  shots.push({ name, png });
  info(`captured ${name}`);
}

async function setMenuOpen(page: Page, open: boolean): Promise<void> {
  const isOpen = await page.locator("#main-menu").isVisible();
  if (isOpen !== open) {
    await page.getByRole("button", { name: /Menu/ }).first().click();
    await page.waitForTimeout(800);
  }
}

async function openPurchaseList(page: Page, invoiceNumbers: string[]): Promise<void> {
  await openInvoicesMenu(page);
  await page.locator("#main-menu").getByText("Lista faktur", { exact: true }).click();
  await page.getByRole("tab", { name: /Faktury zakupowe/ }).click();
  const deadline = Date.now() + 90_000;
  for (;;) {
    const body = await page.locator("body").innerText();
    if (invoiceNumbers.every((n) => body.includes(n))) {
      return;
    }
    if (Date.now() > deadline) {
      throw new Error("Seeded invoices did not show up in purchase list");
    }
    await page.waitForTimeout(3000);
    await page
      .getByRole("button", { name: /Odśwież/ })
      .first()
      .click()
      .catch(() => undefined);
  }
}

async function captureAll(context: BrowserContext): Promise<string> {
  const issueDate = todayIso();
  const [year, month] = issueDate.split("-");
  const page = await login(context, BUYER.nip);

  const version =
    /Wersja\s+([\d.]+)/.exec(await page.locator("body").innerText())?.[1] ?? "unknown";
  info(`app version: ${version}`);

  // 1. Menu with "Faktury" expanded.
  step("faktury-menu");
  await openInvoicesMenu(page);
  await capture(
    page,
    "faktury-menu",
    { x: 0, y: 0, width: 640, height: 640 },
    menuItem(page, "Lista faktur"),
  );

  // 2. Purchase invoice search/filter screen.
  step("faktury-wyszukiwanie");
  await openPurchaseList(page, [`FV/${year}/${month}/1`, `FV/${year}/${month}/2`]);
  await setMenuOpen(page, false);
  await page.getByText("Filtrowanie", { exact: true }).first().click();
  await page.getByText("Rodzaj daty").first().waitFor();
  const tab = page.getByRole("tab", { name: /Faktury zakupowe/ });
  await capture(page, "faktury-wyszukiwanie", { x: 0, y: 150, width: 1280, height: 660 }, tab);
  await page.getByText("Filtrowanie", { exact: true }).first().click();

  // 3. Results list with a selected row.
  step("faktury-lista");
  const firstRow = page
    .getByRole("row")
    .filter({ hasText: `FV/${year}/${month}/1` })
    .first();
  await firstRow.getByRole("checkbox").check({ force: true });
  const downloadMain = page
    .locator("button:not(.akmf-dropdown__expander-btn)", { hasText: "Pobierz" })
    .first();
  await downloadMain.waitFor();
  const downloadGroup = downloadMain.locator("xpath=..");
  await capture(page, "faktury-lista", { x: 0, y: 150, width: 1280, height: 650 }, downloadGroup);

  // 4. Download format choice.
  step("faktura-pobierz");
  await page.locator("button.akmf-dropdown__expander-btn").first().click();
  const menuPanel = page.locator("[id$='akmf-dropdown']").first();
  await menuPanel.waitFor();
  await capture(page, "faktura-pobierz", { x: 0, y: 150, width: 1280, height: 760 }, menuPanel);
  await page.keyboard.press("Escape");

  // 5. Invoice preview.
  step("faktura-podglad");
  await firstRow.getByRole("button", { name: "Przejdź do podglądu faktury" }).first().click();
  const heading = page.getByText(/Szczegóły faktury nr/);
  await heading.waitFor({ timeout: 30_000 });
  await setMenuOpen(page, false);
  const canvas = page.locator("canvas:not(.hiddenCanvasElement)").first();
  await canvas.waitFor({ timeout: 30_000 });
  await page.waitForTimeout(3000);
  // The preview is a PDF canvas taller than its panel and scrolls inside it: show the lower part
  // (totals, payment details, QR code), then bring the panel into view.
  await page
    .locator(".ng2-pdf-viewer-container")
    .first()
    .evaluate((el) => {
      el.scrollTop = el.scrollHeight;
    });
  await heading.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);
  const clip = { x: 0, y: 0, width: VIEWPORT.width, height: VIEWPORT.height };
  await capture(page, "faktura-podglad", clip);

  await page.close();
  return version;
}

// ---------- output ----------

async function writeOutputs(version: string): Promise<void> {
  step("Converting to WebP and updating manifest");
  mkdirSync(OUT_DIR, { recursive: true });
  mkdirSync(dirname(MANIFEST_PATH), { recursive: true });
  const manifest: Record<string, ManifestEntry> = existsSync(MANIFEST_PATH)
    ? (JSON.parse(readFileSync(MANIFEST_PATH, "utf-8")) as Record<string, ManifestEntry>)
    : {};

  for (const shot of shots) {
    const outPath = join(OUT_DIR, `${shot.name}.webp`);
    const { data, info: meta } = await sharp(shot.png)
      .webp({ quality: WEBP_QUALITY })
      .toBuffer({ resolveWithObject: true });
    writeFileSync(outPath, data);
    manifest[`ksef-ap/${shot.name}`] = {
      src: `/screenshots/ksef-ap/${shot.name}.webp`,
      width: meta.width,
      height: meta.height,
      capturedAt: todayIso(),
      appVersion: version,
      env: "test",
    };
    info(`${shot.name}.webp  ${meta.width}x${meta.height}  ${Math.round(data.length / 1024)} kB`);
  }
  const sorted = Object.fromEntries(
    Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)),
  );
  writeFileSync(MANIFEST_PATH, `${JSON.stringify(sorted, null, 2)}\n`);
}

async function main(): Promise<void> {
  const browser = await chromium.launch({ headless: !HEADED });
  try {
    const newContext = async (): Promise<BrowserContext> => {
      const context = await browser.newContext({
        viewport: VIEWPORT,
        deviceScaleFactor: DEVICE_SCALE_FACTOR,
        locale: "pl-PL",
      });
      await context.route("**/*", (route) => {
        const host = new URL(route.request().url()).hostname;
        if (PRODUCTION_HOSTS.test(host)) {
          console.error(`Blocked request to production KSeF host: ${host}`);
          return route.abort();
        }
        return route.continue();
      });
      return context;
    };

    const sellerContext = await newContext();
    await seed(sellerContext);
    await sellerContext.close();

    const buyerContext = await newContext();
    const version = await captureAll(buyerContext);
    await buyerContext.close();

    await writeOutputs(version);
    console.log(`\nDone: ${shots.length} screenshots written to ${OUT_DIR}`);
  } finally {
    await browser.close();
  }
}

main().catch((error: unknown) => {
  console.error("\nFailed:", error instanceof Error ? error.message : error);
  process.exit(1);
});
