# SEO change log

One entry per change made by the daily SEO routine (or by hand), so later runs can measure the
effect. Record the date, the page, what changed (old -> new for titles and descriptions) and the
metric that motivated it. After 28 days, add a **Results** line comparing current CTR/position with
the baseline.

## 2026-10-28

Digest: `gsc-data` 2026-10-27 (GSC 2026-09-27 to 2026-10-24: 125 clicks, 9,217 impressions, CTR
1.36%, avg position 6.8). No title or description changes: every page in the low-CTR list had its
title or description rewritten on 2026-10-26 (commits "sharpen low-CTR titles" and follow-ups) or
has frontmatter `updated` within 28 days (`/blog/faktura-zagraniczna-ksef` 2026-10-27, also in open
content PR #179). No crawl Problems (all 164 sitemap URLs 200, no broken links, no canonical, robots
or hreflang issues); sitemap still 0 errors, 6 warnings. No Results lines yet: the oldest logged
change is from 2026-10-07 (21 days).

- **Pages:** `/guides/aplikacja-podatnika-ksef-pierwsza-faktura`,
  `/en/guides/ksef-taxpayer-app-first-invoice`,
  `/uk/guides/pershyy-rakhunok-v-aplikatsiyi-podatnyka`
  - **Change:** body only. One sentence after the payment bullet in the form walkthrough (enter the
    account number without spaces: 26 digits, or 28 characters as an IBAN with "PL") linking
    `/validator/bledny-numer-rachunku-bankowego`,
    `/en/validator/invalid-bank-account-number-invoice` and
    `/uk/validator/nevirnyy-nomer-bankivskogo-rakhunku`.
  - **Motivation:** `/validator/bledny-numer-rachunku-bankowego` is still "Discovered - currently
    not indexed" (since at least 2026-10-17) and has the fewest internal links of any not-indexed
    URL: 3 (`/validator`, the FA(3) errors post, and `/blog/pusta-faktura-pdf-xml`, itself not
    indexed). The Aplikacja Podatnika guides are indexed (PL 46 impr, pos 9.1; EN 37 impr, pos 5.4)
    and the bullet is where a reader types the account number. EN validator page: 76 impr, pos 10.9.
  - **Baseline to compare:** URL Inspection state of the PL page (Discovered - not indexed); EN 76
    impr / pos 10.9, UK 2 impr / pos 5.5.

## 2026-10-21

Digest: `gsc-data` 2026-10-20 (GSC 2026-09-20 to 2026-10-17: 105 clicks, 8,629 impressions, CTR
1.22%, avg position 6.6). The digest crawl predates the redesign merges of 2026-10-20 (#145, #146);
the live site could not be reached from the routine's environment to re-crawl. No title or
description changes: every page in the low-CTR list was updated or published within the last 28
days. No crawl Problems (all 149 sitemap URLs 200, no broken links, no canonical or hreflang
issues); sitemap still 0 errors, 6 warnings. The not-indexed pages are 5-14 days old and already
have 7-15 internal links each, so no new links today. No Results lines yet: the oldest logged change
is from 2026-10-07.

- **Page:** `/blog/najczestsze-bledy-walidacji-fa3`
  - **Change:** body only (title and description unchanged). New second paragraph defining what a
    validation error is and what happens to the invoice (KSeF rejects it, no KSeF number, the
    invoice is not issued; fix and resend), citing Podręcznik KSeF 2.0 cz. II pkt 1.6.1.
  - **Motivation:** definitional queries rank the post at positions 6-11 without a direct answer:
    „błędy walidacji co to znaczy" (13 impr, pos 10.4), „błąd podczas walidacji co to znaczy" (5,
    7.8), „błąd podczas walidacji" (3, 5.7), „co to jest błąd walidacji" (3, 6.7), „co oznacza błąd
    walidacji" (2, 10.5). Page: 629 impr, 8 clicks, CTR 1.27%, pos 7.1.
  - **Baseline to compare:** position of those queries and the page CTR above.

## 2026-10-19

Digest: `gsc-data` 2026-10-18 (GSC 2026-09-18 to 2026-10-15: 101 clicks, 8,611 impressions, CTR
1.17%, avg position 6.5). No title or description changes: every page in the low-CTR list was
updated or published within the last 28 days (`/blog/faktura-zagraniczna-ksef` 2026-10-12, the rest
as on 2026-10-18), and the FA(2) vs FA(3) posts are still in open content PR #137. No crawl Problems
(all 149 sitemap URLs 200, no broken links, no canonical mismatches, no hreflang issues). The
sitemap has had 6 warnings with 0 errors since at least 2026-10-13; the API gives no detail. No
Results lines yet: the oldest logged change is from 2026-10-07.

- **Pages:** `/guides/logowanie-ksef`, `/en/guides/ksef-login`, `/uk/guides/vkhid-do-ksef`
  - **Change:** body only. One sentence after „Po zalogowaniu zobaczysz faktury wystawione na Twój
    NIP" (and its EN and UK equivalents) linking `/guides/jak-odebrac-fakture-ksef`,
    `/en/guides/receiving-invoices-in-ksef` and `/uk/guides/yak-otrymaty-rakhunok-v-ksef`.
  - **Motivation:** all three receiving-invoices guides are "Discovered - currently not indexed",
    each with only 6 internal links (the listings and new posts that are themselves not indexed).
    The login guides are indexed (PL 246 impr, pos 9.0; EN 188 impr, pos 6.4).
  - **Baseline to compare:** URL Inspection state of the receiving-invoices guides (all three
    Discovered - not indexed).
- **Pages:** `/blog/ksef-dla-jdg`, `/en/blog/ksef-for-sole-traders`, `/uk/blog/ksef-dlya-fop`
  - **Change:** body only. In the Aplikacja Podatnika bullet, the words „otrzymane" /
    „uprawnieniami" (EN "received ones" / "permissions", UK „отримані" / „повноваженнями") now link
    the receiving-invoices guide and the accountant-access guide in each locale.
  - **Motivation:** `/guides/uprawnienia-ksef-ksiegowa` and `/en/guides/ksef-accountant-access` are
    "Discovered - currently not indexed" with 6 internal links each; the sole-trader post is the
    natural entry point for both topics.
  - **Baseline to compare:** URL Inspection state of the accountant-access guides (PL and EN
    Discovered - not indexed; UK not in the not-indexed list).

## 2026-10-18

Digest: `gsc-data` 2026-10-17 (GSC 2026-09-17 to 2026-10-14: 98 clicks, 8,559 impressions, CTR
1.14%, avg position 6.5). No title or description changes: every page in the low-CTR list was
updated or published within the last 28 days (corrective-invoice posts 2026-10-17, FA(3) errors post
2026-10-08, `/guides/logowanie-ksef` published 2026-10-07), and the FA(2) vs FA(3) posts are in open
content PR #137. No crawl Problems (all 149 sitemap URLs 200, no broken links, no canonical
mismatches, no hreflang issues). No Results lines yet: the oldest logged change is from 2026-10-07.

- **Pages:** `/blog/ksef-limit-10000-zl`, `/en/blog/ksef-10000-pln-limit`,
  `/uk/blog/ksef-porig-10000-zl`
  - **Change:** body only. One sentence at the end of the cash-register bullet in „Co nie wlicza się
    do limitu" / its EN and UK equivalents linking `/blog/faktura-z-kasy-fiskalnej-ksef-2027`,
    `/en/blog/cash-register-invoices-ksef-2027` and
    `/uk/blog/rakhunok-z-kasovogo-aparata-ksef-2027`.
  - **Motivation:** the PL and EN cash-register posts are "Discovered - currently not indexed" and
    the health crawl found only 2 internal links to each (blog listing and the private-person post).
    The 10,000 zł limit post is indexed (PL 136 impr, pos 8.8) and its bullet covers exactly the
    art. 145n topic.
  - **Baseline to compare:** URL Inspection state of the cash-register posts (PL and EN Discovered -
    not indexed; UK not in the not-indexed list).

## 2026-10-17

Digest: `gsc-data` 2026-10-16 (GSC 2026-09-16 to 2026-10-13: 91 clicks, 8,595 impressions, CTR
1.06%, avg position 6.5). No title or description changes: every page in the low-CTR list has
frontmatter `updated` within the last 28 days (2026-10-07/08), and the two corrective-invoice posts
are in open content PR #135. No crawl Problems (all 140 sitemap URLs 200, no broken links, no
canonical mismatches).

- **Pages:** `/blog/fa2-vs-fa3-ksef`, `/en/blog/fa2-vs-fa3-ksef`
  - **Change:** body only. One sentence at the end of „Nowe obowiązkowe pola JST i GV w Podmiot2" /
    "New mandatory JST and GV fields in Podmiot2" linking `/validator/brak-jst-gv-podmiot2` /
    `/en/validator/missing-jst-gv-podmiot2`.
  - **Motivation:** `/en/validator/missing-jst-gv-podmiot2` is "Discovered - currently not indexed"
    with only 3 internal links. The FA(2) vs FA(3) posts are indexed (EN 603 impr, pos 5.9; PL pos
    ~7) and have a section on exactly this error.
  - **Baseline to compare:** URL Inspection state (EN Discovered - not indexed).
- **Pages:** `/blog/pusta-faktura-pdf-xml`, `/en/blog/pdf-different-from-xml-ksef`,
  `/uk/blog/pdf-ne-zbigayetsya-z-xml-ksef`
  - **Change:** body only. One sentence in „Dla developerów" / "For developers" (where the post says
    the bank account number belongs in `Platnosc`) linking the bank-account validator page in each
    locale.
  - **Motivation:** `/validator/bledny-numer-rachunku-bankowego` is "Discovered - currently not
    indexed" with only 2 internal links (`/validator` and the FA(3) errors post). EN page gets the
    query "account length is incorrect" (pos 11).
  - **Baseline to compare:** URL Inspection state (PL Discovered - not indexed; EN and UK not in the
    not-indexed list).

## 2026-10-14

Digest: `gsc-data` 2026-10-13 (GSC 2026-09-13 to 2026-10-10: 72 clicks, 8,687 impressions, CTR
0.83%, avg position 6.4). No title or description changes: every page in the low-CTR list still has
frontmatter `updated` within the last 28 days (2026-10-07/08).

- **Pages:** `/blog/ksef-scisla-walidacja-xml`, `/en/blog/ksef-strict-xml-validation`
  - **Change:** body only (title and description unchanged). One sentence at the end of „Jak
    sprawdzić, czy Twoje pliki są dotknięte" / "How to find out whether your files are affected"
    pointing readers whose file is not well-formed XML to
    `/validator/xml-nie-jest-poprawnie-sformatowany` / `/en/validator/malformed-xml-invoice`.
  - **Motivation:** `/validator/xml-nie-jest-poprawnie-sformatowany` is still "URL is unknown to
    Google" and the health crawl found only 2 internal links to it (`/validator` and the FA(3)
    errors post added on 2026-10-13). The strict-XML post is the closest topic match.
  - **Baseline to compare:** URL Inspection state of the two validator pages (PL unknown to Google;
    EN not in the not-indexed list).

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
