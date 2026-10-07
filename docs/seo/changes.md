# SEO change log

One entry per change made by the daily SEO routine (or by hand), so later runs can measure the
effect. Record the date, the page, what changed (old -> new for titles and descriptions) and the
metric that motivated it. After 28 days, add a **Results** line comparing current CTR/position with
the baseline.

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
