# Content Backlog

The daily content routine takes the first unchecked item, writes it, ticks it here in the same PR.
Order is priority. Humans can reorder, add, or delete items freely.

Item format: `slug-idea` — PL title (working) · target query · persona · deadline · sources · notes.
Persona: A = Ania (JDG), K = Pani Krystyna (accountant), M = Marek (developer). Source shorthand,
all under `https://ksef.podatki.gov.pl`: FAQ = `/ksef-news/najczestsze-pytania/`, 10K =
`/ponizej-10-000-zl/`, PRAWO = `/informacje-ogolne-ksef-20/podstawy-prawne-oraz-kluczowe-terminy/`,
APP = `/aplikacja-podatnika-ksef-20/`, KOM = `/komunikaty-techniczne/`, P2/P3 = Podręcznik KSeF 2.0
cz. II / cz. III (linked from the MF site).

Items marked **UPDATE** revise existing posts instead of creating a new one: keep the slug, set
`updated`, change only what's outdated, and mention the change in the PR description.

Facts flagged UNVERIFIED came from secondary sources during backlog research (2026-10-07). The
researcher must confirm them against Tier 1–3 sources before they go in a post, or the post must say
what is not yet settled.

## Next up

Planned 2026-10-20 from Search Console (2026-09-19 to 2026-10-16) and a scan of what Polish tax
sites published in the last month. Trade-press items are topic signals only: every fact still needs
a Tier 1–3 source.

- [ ] **UPDATE** `ksef-checklist-przygotowanie` — refresh as „KSeF: checklista na 1 stycznia 2027” ·
      date-driven · A, K · 2026-12-01 · brief `checklist-przygotowanie.md` (its penalty facts are
      stale), `sankcje-ksef-ud477.md` · End of art. 145m limit and 145n cash-register invoices,
      tokens, penalties deferred (MF 2026-09-16, UD477 not enacted). Link the existing posts on
      each.
- [ ] **UPDATE** `ksef-scisla-walidacja-xml-19-10` — rejection was announced for PROD from
      2026-10-19; once CIRFMF confirms it is live, switch the post from future to present tense and
      lead with „KSeF odrzuca…” · M, K · now · CIRFMF `faktury/weryfikacja-faktury.md`,
      `api-changelog.md`
- [ ] **UPDATE** `najczestsze-bledy-walidacji-fa3` — open with a direct answer to „co znaczy błąd
      walidacji” in the first 100 words, then the list; mention the strict-XML rejections from 19.10
      and link that post · „błąd walidacji co to znaczy” · A · GSC ~74 impr at pos 7–14 · brief
      `bledy-walidacji-fa3.md`
- [ ] `mpp-split-payment-ksef` — Split payment (MPP) na fakturze w KSeF · „MPP KSeF” / „split
      payment KSeF” · K, A · Broszura FA(3) `P_18A`, KIS interpretation
      0114-KDIP1-1.4012.566.2026.1.MM of 22.09.2026 (UNVERIFIED, via infor.pl 2026-10-17) · No
      coverage on our side; strong validator fit (Adnotacje rules).
- [ ] **UPDATE** `tokeny-ksef-po-2026` — check the token decision for new details before 31.12:
      validity 1–365 days and renewal only with the owner's consent are reported by infor.pl
      (2026-10-07, citing interpelacja 19230) but UNVERIFIED; still no legal act · A, M · 2026-12-01
      · brief `rozporzadzenie-ksef-i-tokeny.md`
- [ ] `wspolnota-mieszkaniowa-ksef` — Wspólnota mieszkaniowa i spółdzielnia a KSeF · „wspólnota
      mieszkaniowa KSeF” · K, A (zarządca) · FAQ, MF training PDF `/media/hb0mye13/` · Signal:
      infor.pl 2026-09-01; MF answer to interpelacja 17044 reportedly rules out an exclusion
      (UNVERIFIED). Cover VAT-exempt wspólnoty and the art. 145m limit.
- [ ] `terminy-ksef-data-wystawienia` — Data wystawienia, przesłania i otrzymania faktury w KSeF ·
      „data wystawienia faktury KSeF” · A, K · P2, art. 106na ust. 3 · Signal: infor.pl 2026-10-13.
      Link `awaria-ksef-offline` and `jak-odebrac-fakture-ksef`.
- [ ] `najem-lokalu-ksef` — Najem lokalu firmie a KSeF (bez działalności) · „najem KSeF” · A · FAQ,
      PRAWO · Signal: infor.pl 2026-09-11; dates for private landlords UNVERIFIED.
- [ ] **UPDATE** `awaria-ksef-offline` — add the case where downloading invoices is unavailable but
      sending works (KOM notice of 2026-10-13 on the 16–17.10 outage) · A, K · KOM

## Evergreen

Ordered by Search Console demand (2026-10-20); the items from `faktura-zaliczkowa-ksef` down had no
matching queries.

- [ ] `walidacja-xml-fa3` — Jak sprawdzić XML FA(3) przed wysyłką · „walidacja XML FA(3)” /
      „walidator KSeF” · M · `/ksef-na-okres-obligatoryjny/wsparcie-dla-integratorow` · Core product
      fit; developer voice allowed. ~20 impr of tool intent land on `/` and `/guides`. Also cover
      where the official XSD lives („ksef xml schema”, ~11 impr, no PL page).
- [ ] `kody-bledow-ksef` — Kody błędów KSeF i co znaczą · „błąd 450 KSeF" · M · integrator docs ·
      Error codes UNVERIFIED.
- [ ] `usuniecie-faktury-ksef` — Czy można usunąć lub edytować fakturę w KSeF · „usunięcie faktury
      KSeF" / „anulowanie faktury KSeF” · A · FAQ, P2 pkt 1.6.2–1.6.3 · Ranks pos 2 already;
      infor.pl ran the same question 2026-10-19.
- [ ] `numer-ksef-gdzie-znalezc` — Numer KSeF: gdzie go znaleźć · „numer KSeF faktury" · A, M · FAQ
- [ ] `aplikacja-mobilna-ksef` — Aplikacja mobilna KSeF · „aplikacja mobilna KSeF" · A ·
      `/mobilna-ksef-20/`, APP · infor.pl 2026-10-07 covers offline use in 2027 (UNVERIFIED).
- [ ] `ryczalt-ksef` — Ryczałt a KSeF · „ryczałt KSeF" · A · P2
- [ ] `faktura-zaliczkowa-ksef` — Faktura zaliczkowa w KSeF · „faktura zaliczkowa KSeF" · K, M · P2
- [ ] `samofakturowanie-ksef` — Samofakturowanie w KSeF · „samofakturowanie KSeF" · K · FAQ, P3
- [ ] `zalaczniki-ksef` — Załączniki do faktury w KSeF · „załącznik do faktury KSeF" · M, A · FAQ
- [ ] `faktura-po-angielsku-ksef` — Faktura KSeF po angielsku · „faktura KSeF po angielsku" · A ·
      FAQ · Link `faktura-zagraniczna-ksef`.
- [ ] `przechowywanie-faktur-ksef` — Jak długo KSeF przechowuje faktury · „jak długo faktury w KSeF"
      · K · FAQ
- [ ] `kontekst-logowania-ksef` — Kontekst logowania w KSeF · „kontekst logowania KSeF" · A · FAQ
- [ ] `faktura-vat-rr-ksef` — Faktura VAT RR w KSeF · „VAT RR KSeF" · A · APP
- [ ] `di-bfk-jpk-v7` — Oznaczenia DI i BFK w JPK_V7 · „JPK_V7 BFK DI" · K · FAQ
- [ ] `kurs-waluty-faktura-ksef` — Kurs waluty na fakturze w KSeF · „faktura w walucie KSeF kurs" ·
      K · existing brief `docs/knowledge-base/briefs/kurs-waluty-art-31a.md` · The `/waluty` tool
      already gets this intent.
- [ ] `zaw-fa-ksef` — ZAW-FA: kiedy jest potrzebny · „ZAW-FA KSeF" · A, K · P3

## Scheduled maintenance

Dated chores, not for the daily routine's "first unchecked item" pick.

- [ ] **2027-01-02:** remove `featured: true` from `koniec-limitu-10000-zl` and
      `kary-ksef-2027-2028` (pinned on the homepage for the run-up to 1 January 2027), and pin
      whatever matters most then.

## Done

Merged items, newest first. One line each; the PR has the details.

- [x] **UPDATE** `kary-ksef-2027-2028`: Podręcznik cz. II pkt 1.7 deduction limit, UD477 status
      (#140)
- [x] **UPDATE** `fa2-vs-fa3-ksef`: `NrKSeF` for FA(2) corrections, 1.04.2026 scope (#137)
- [x] **UPDATE** `faktura-korygujaca-ksef`: `NrKSeFN` tied to the KSeF number, not the date (#135)
- [x] `nota-korygujaca-ksef` (#134)
- [x] `pusta-faktura-pdf-xml` (#133)
- [x] `faktura-poza-ksef-odliczenie-vat` (#131)
- [x] **UPDATE** FAQ `limity-i-wylaczenia`: below-limit schedule, foundations, B2C, rolnicy
      ryczałtowi (#129)
- [x] **UPDATE** `faktura-zagraniczna-ksef`: VAT-exempt taxpayers in scope (#128)
- [x] **UPDATE** `falszywe-faktury-ksef`: deduction period, reporting mechanics (#126)
- [x] `jak-odebrac-fakture-ksef` (#125)
- [x] **UPDATE** `ksef-dla-jdg` + `ksef-od-1-kwietnia-2026`: B2C exclusion citation (#123)
- [x] `faktura-dla-osoby-prywatnej-ksef` (#107)
- [x] `logowanie-ksef` (#94)
- [x] `aplikacja-podatnika-ksef-pierwsza-faktura` (#91)
- [x] `awaria-ksef-offline` (#90)
- [x] `uprawnienia-ksef-ksiegowa` (#89)
- [x] `ksef-scisla-walidacja-xml-19-10` (#88)
- [x] `kary-ksef-2027-2028` (#87)
- [x] `numer-ksef-w-przelewie` (#85)
- [x] `koniec-limitu-10000-zl` (#84)
- [x] `zwolniony-z-vat-ksef` (#83)
- [x] `faktura-z-kasy-fiskalnej-ksef-2027` (#82)
- [x] `tokeny-ksef-po-2026` (#81)
- [x] **UPDATE** penalties postponed to 2028, all existing posts (#80)

<!-- When merged, move the item here as one line: `- [x] slug (#PR)`, newest first. -->
