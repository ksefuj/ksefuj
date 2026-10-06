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

- [ ] `ksef-scisla-walidacja-xml-19-10` — KSeF od 19.10.2026 odrzuci XML z instrukcjami
      przetwarzania i niezalecanymi znakami · „KSeF błąd xml-002" · M, K · 2026-10-19 · CIRFMF
      ksef-api release 2.4.0 changelog and issue #718 (maintainer: PROD enforcement moved to
      2026-10-19) · Urgent: explain what gets rejected, the `X-System-Warning` xml-00x warnings, and
      how to check a file (the ksefuj validator, once it flags these).
- [x] `kary-ksef-2027-2028` (in review: branch `content/kary-ksef-2027-2028`) — Kary za KSeF: co się
      zmienia od 1 stycznia 2027 · „kary KSeF 2027" · A, K · before 2026-12-31 · PRAWO, UD477 ·
      Obligation in 2027, fines from 2028 (if passed). What KAS does in 2027 instead (reminders,
      verification). Update when the act passes.
- [x] `koniec-limitu-10000-zl` (in review: branch `content/koniec-limitu-10000-zl`) — Koniec limitu
      10 000 zł: co zrobić przed 1 stycznia 2027 · „KSeF od 1 stycznia 2027" · A · 2026-12-31 · 10K,
      PRAWO · Link to `ksef-limit-10000-zl`; don't re-explain the limit math.
- [x] `faktura-z-kasy-fiskalnej-ksef-2027` (in review: branch
      `content/faktura-z-kasy-fiskalnej-ksef-2027`) — Faktura z kasy fiskalnej i paragon z NIP od
      2027 · „paragon z NIP KSeF 2027" · A · 2026-12-31 · FAQ, PRAWO · Transitional exclusion ends
      2026-12-31 (UNVERIFIED legal basis).
- [x] `numer-ksef-w-przelewie` (in review: branch `content/numer-ksef-w-przelewie`) — Numer KSeF w
      przelewie i split payment · „numer KSeF w przelewie" · K, A · 2027-01-01 · PRAWO · Date and
      format UNVERIFIED; PRAWO says "not yet in force".
- [x] `tokeny-ksef-po-2026` (in review: branch `content/tokeny-ksef-po-2026`) — Tokeny KSeF po 31
      grudnia 2026 · „token KSeF 2027" · M, K · 2026-12-31 · APP · MF announced tokens stay;
      regulation change UNVERIFIED. Link to `certyfikaty-vs-tokeny-ksef` and UPDATE that post if the
      regulation is published.
- [x] `zwolniony-z-vat-ksef` (in review: branch `content/zwolniony-z-vat-ksef`) — Zwolniony z VAT a
      KSeF od 2027 · „zwolniony z VAT KSeF" · A · 2027-01-01 · P2 · art. 113 threshold UNVERIFIED.
- [ ] `aplikacja-podatnika-ksef-pierwsza-faktura` — Pierwsza faktura w Aplikacji Podatnika KSeF ·
      „aplikacja podatnika KSeF jak wystawić fakturę" · A · rolling · APP,
      `/czy-trzeba-miec-platny-program-zeby-wystawiac-faktury-w-ksef/` · Platform-agnostic intro,
      then MF's free app step by step.
- [ ] `logowanie-ksef` — Logowanie do KSeF: Profil Zaufany, podpis, certyfikat · „KSeF logowanie
      profil zaufany" · A · rolling · APP, KOM
- [ ] `uprawnienia-ksef-ksiegowa` — Jak dać księgowej dostęp do KSeF · „KSeF uprawnienia biuro
      rachunkowe" · A, K · before 2027-01-01 · FAQ, P3
- [ ] `awaria-ksef-offline` — Awaria KSeF: tryb offline24 i offline krok po kroku · „awaria KSeF co
      robić" · A, K, M · evergreen · KOM, P2

## Evergreen

- [ ] `faktura-dla-osoby-prywatnej-ksef` — Faktura dla osoby prywatnej a KSeF · „faktura dla osoby
      prywatnej KSeF" · A · FAQ, 10K
- [ ] `jak-odebrac-fakture-ksef` — Jak odebrać fakturę z KSeF · „jak odebrać fakturę w KSeF" · A ·
      FAQ (art. 106gb ust. 4), P2
- [ ] `faktura-poza-ksef-odliczenie-vat` — Faktura wystawiona poza KSeF: co z odliczeniem VAT ·
      „faktura poza KSeF odliczenie VAT" · K · FAQ
- [ ] `pusta-faktura-pdf-xml` — PDF inny niż XML: ryzyko pustej faktury · „pusta faktura KSeF" · K,
      M · official source UNVERIFIED · Strong validator fit.
- [ ] `nota-korygujaca-ksef` — Nota korygująca a KSeF · „nota korygująca KSeF" · K · P2 · Frame as
      nota vs korekta; link `faktura-korygujaca-ksef`.
- [ ] `usuniecie-faktury-ksef` — Czy można usunąć lub edytować fakturę w KSeF · „usunięcie faktury
      KSeF" · A · FAQ
- [ ] `numer-ksef-gdzie-znalezc` — Numer KSeF: gdzie go znaleźć · „numer KSeF faktury" · A, M · FAQ
- [ ] `faktura-zaliczkowa-ksef` — Faktura zaliczkowa w KSeF · „faktura zaliczkowa KSeF" · K, M · P2
- [ ] `samofakturowanie-ksef` — Samofakturowanie w KSeF · „samofakturowanie KSeF" · K · FAQ, P3
- [ ] `zalaczniki-ksef` — Załączniki do faktury w KSeF · „załącznik do faktury KSeF" · M, A · FAQ
- [ ] `di-bfk-jpk-v7` — Oznaczenia DI i BFK w JPK_V7 · „JPK_V7 BFK DI" · K · FAQ
- [ ] `ryczalt-ksef` — Ryczałt a KSeF · „ryczałt KSeF" · A · P2
- [ ] `faktura-po-angielsku-ksef` — Faktura KSeF po angielsku · „faktura KSeF po angielsku" · A ·
      FAQ · Link `faktura-zagraniczna-ksef`.
- [ ] `przechowywanie-faktur-ksef` — Jak długo KSeF przechowuje faktury · „jak długo faktury w KSeF"
      · K · FAQ
- [ ] `kontekst-logowania-ksef` — Kontekst logowania w KSeF · „kontekst logowania KSeF" · A · FAQ
- [ ] `aplikacja-mobilna-ksef` — Aplikacja mobilna KSeF · „aplikacja mobilna KSeF" · A ·
      `/mobilna-ksef-20/`, APP
- [ ] `faktura-vat-rr-ksef` — Faktura VAT RR w KSeF · „VAT RR KSeF" · A · APP
- [ ] `walidacja-xml-fa3` — Jak sprawdzić XML FA(3) przed wysyłką · „walidacja XML FA(3)" · M ·
      `/ksef-na-okres-obligatoryjny/wsparcie-dla-integratorow` · Core product fit; developer voice
      allowed.
- [ ] `kody-bledow-ksef` — Kody błędów KSeF i co znaczą · „błąd 450 KSeF" · M · integrator docs ·
      Error codes UNVERIFIED.
- [ ] `kurs-waluty-faktura-ksef` — Kurs waluty na fakturze w KSeF · „faktura w walucie KSeF kurs" ·
      K · existing brief `docs/knowledge-base/briefs/kurs-waluty-art-31a.md`
- [ ] `zaw-fa-ksef` — ZAW-FA: kiedy jest potrzebny · „ZAW-FA KSeF" · A, K · P3
- [ ] **UPDATE** `ksef-checklist-przygotowanie` — refresh as a December 2026 checklist (after the
      penalties update above).

## Done

- [x] **UPDATE** penalties postponed to 2028: done in the rewrite of all existing posts (branch
      `content/rewrite-existing-posts`).

<!-- Move items here with the PR number when merged, e.g. `- [x] slug (#81)` -->
