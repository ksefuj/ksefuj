# SEO change log

One entry per change made by the daily SEO routine (or by hand), so later runs can measure the
effect. Record the date, the page, what changed (old -> new for titles and descriptions) and the
metric that motivated it. After 28 days, add a **Results** line comparing current CTR/position with
the baseline.

## 2026-10-13

Digest: `gsc-data` 2026-10-12 (GSC 2026-09-12 to 2026-10-09: 70 clicks, 8,869 impressions, CTR
0.79%, avg position 6.4). No title or description changes: every page in the low-CTR list
(`/en/blog/corrective-invoice-ksef`, `/en/blog/fa2-vs-fa3-ksef`,
`/blog/najczestsze-bledy-walidacji-fa3`, `/blog/faktura-korygujaca-ksef`,
`/en/blog/certificates-vs-tokens-ksef`, `/en/guides/first-fa3-invoice`, `/blog/fa2-vs-fa3-ksef`) has
frontmatter `updated` within the last 28 days.

- **Pages:** `/blog/najczestsze-bledy-walidacji-fa3`, `/en/blog/most-common-fa3-validation-errors`
  - **Change:** body only (title and description unchanged). Added a „Więcej o tym błędzie" / "More
    about this error" link at the end of 9 of the 12 sections to the matching `/validator/<slug>`
    reference page (namespace, element order, missing field, NIP, date, decimals, JST/GV, P_12,
    P_14/P_15), and a line in „Co dalej" / "Next step" linking the malformed-XML and bank-account
    pages.
  - **Motivation:** no blog post or guide linked to any validator issue page; the health crawl found
    only 1 internal link (from `/validator`) to `/validator/bledny-numer-rachunku-bankowego` and
    `/validator/xml-nie-jest-poprawnie-sformatowany`, both "URL is unknown to Google", and 2 to
    `/en/validator/missing-jst-gv-podmiot2` (also unknown). The source posts are indexed and among
    the top pages: PL 638 impr, 9 clicks, pos 6.9; EN 631 impr, 10 clicks, pos 4.5.
  - **Baseline to compare:** URL Inspection state of the three validator pages above; validator
    pages had 1-5 impressions each in this period.

## 2026-10-09

Digest: `gsc-data` 2026-10-08 (GSC 2026-09-08 to 2026-10-05: 73 clicks, 9,833 impressions, CTR
0.74%, avg position 6.3). The live site could not be reached from the routine's environment.

- **Pages:** `/waluty`, `/en/waluty`, `/uk/waluty`
  - **Change:** meta description (`content.waluty.metaDescription`) shortened to fit under 160
    characters; it now gives the answer instead of describing the calculator.
    - PL (213 -> 159): „Jaki kurs NBP zastosować na fakturze w obcej walucie? Kalkulator bierze kurs
      z ostatniego dnia roboczego przed datą sprzedaży — albo przed datą wystawienia, jeśli faktura
      jest wcześniejsza (art. 31a ustawy o VAT)." -> „Jaki kurs NBP na fakturze walutowej? Z
      ostatniego dnia roboczego przed datą sprzedaży, a gdy faktura jest wcześniejsza — przed datą
      jej wystawienia (art. 31a)."
    - EN (220 -> 159): "Which NBP rate applies to a foreign-currency invoice? The calculator takes
      the rate from the last business day before the sale date — or before the issue date, if the
      invoice comes first (Art. 31a of the Polish VAT Act)." -> "Which NBP rate goes on a
      foreign-currency invoice? The one from the last business day before the sale date, or before
      the issue date if the invoice is earlier."
    - UK (220 -> 157): "Який курс NBP застосувати до рахунку-фактури в іноземній валюті? Калькулятор
      бере курс з останнього робочого дня перед датою продажу — або перед датою виставлення, якщо
      рахунок виставлено раніше (ст. 31a Закону про ПДВ)." -> "Який курс NBP для рахунку в іноземній
      валюті? З останнього робочого дня перед датою продажу, а якщо рахунок виставлено раніше —
      перед датою його виставлення."
  - **Motivation:** health crawl Problem — description too long (213/220/220 > 160). No GSC
    baseline: the pages have no impressions in the period.
- **Content rule:** frontmatter `title` limit 49 -> 48 characters (`STYLE.md`, `content/README.md`,
  `scripts/check-content-style.ts`). The suffix „ — ksefuj.to" is 12 characters, not 11, so a
  49-character title renders as 61 and `withSiteSuffix` drops the brand.
  - **Motivation:** health crawl Problem — 5 pages with a 61-character `<title>` (crawl predates
    #110, which caps titles at 60 by dropping the suffix). Seven titles are at exactly 49 and now
    render without the brand; not shortened here because all were updated within 28 days.

## 2026-10-07

Search Console data was not available (no `gsc-data` branch yet, see issue #95), and the live site
could not be reached from the routine's environment. The health crawl ran against a local production
build of `seo/crawl-fixes` instead.

- **Pages:** `/blog`, `/en/blog`, `/uk/blog` (listing pages)
  - **Change:** `<title>` `Blog — ksefuj.to` -> `Blog o KSeF i e-fakturach — ksefuj.to` (PL),
    `Blog — ksefuj.to` -> `KSeF and e-invoicing blog — ksefuj.to` (EN), `Блог — ksefuj.to` ->
    `Блог про KSeF та е-рахунки — ksefuj.to` (UK). New `content.blog.metaTitle` message key; the
    on-page heading (`content.blog.title`) is unchanged.
  - **Motivation:** health crawl Problem — duplicate title `Blog — ksefuj.to` on `/blog` and
    `/en/blog`. No GSC baseline (no data yet).
