# Research Brief: Jak długo KSeF przechowuje faktury

**Requested by:** Orchestrator **Date:** 2026-11-15 **For content:** PL blog post (section `blog`,
topic `invoicing`), working title „Jak długo faktury są w KSeF i czy trzeba je archiwizować"
**Persona:** Pani Krystyna (biuro rachunkowe); secondary: Ania / właściciele JDG

**Provenance:** built only from the repo knowledge base (baseline
`docs/knowledge-base/WATCHLIST.md`, last checked 2026-10-07: VAT Act t.j. Dz.U. 2026 poz. 1263;
Podręcznik KSeF 2.0 cz. I–IV and AP manual of 2026-08-06), `packages/validator/docs/`, and published
PL posts. One curl to ksef.podatki.gov.pl in this run: `CONNECT tunnel failed, response 403`; no
other official host was tried. The KB extract `podrecznik-ksef-20-czesc-ii.md` is a condensed Polish
summary of the **2026-02-01** edition, not a verbatim transcript: its lines are cited as „KB extract
text". Only pkt 1.6.3 (p. 19) of the 06.08.2026 edition was verified verbatim (live 2026-10-16,
recorded in `nota-korygujaca-ksef.md`). The KB holds **no text** of VAT Act art. 112 or 112a, no
statutory article for the 10-year KSeF storage, and no text of Ordynacja podatkowa art. 70.

Source keys used below:

| Key   | Source                                                                                                   | URL                                                                                                                       | Tier |
| ----- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---- |
| [CZ2] | Podręcznik KSeF 2.0 cz. II, wystawianie i otrzymywanie faktur (06.08.2026; KB extract of 01.02.2026 ed.) | https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf | 2    |
| [CZ1] | Podręcznik KSeF 2.0 cz. I, rozpoczęcie korzystania (06.08.2026)                                          | https://ksef.podatki.gov.pl/media/dmrfdixs/podrecznik-ksef-20-cz-i-rozpoczecie-korzystania-z-ksef-06082026.pdf            | 2    |
| [AP]  | Podręcznik użytkownika Aplikacji Podatnika KSeF 2.0 (06.08.2026)                                         | https://ksef.podatki.gov.pl/media/qocjn3ai/podrecznik-uzytkownika-aplikacji-podatnika-ksef-20_06082026.pdf                | 2    |
| [NP]  | MF „Najczęstsze pytania" (modified 2026-04-29)                                                           | https://ksef.podatki.gov.pl/ksef-news/najczestsze-pytania/                                                                | 3    |
| [PP]  | MF „Podstawy prawne oraz kluczowe terminy" (modified 2026-05-29)                                         | https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/podstawy-prawne-oraz-kluczowe-terminy/                              | 3    |
| [VAT] | Ustawa o VAT, t.j. Dz.U. 2026 poz. 1263                                                                  | https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf                                                                    | 1    |
| [OP]  | Ordynacja podatkowa, t.j. Dz.U. 2026 poz. 622 (in KB only for art. 117ba)                                | https://api.sejm.gov.pl/eli/acts/DU/2026/622/text.pdf                                                                     | 1    |
| [API] | CIRFMF/ksef-api changelog                                                                                | https://github.com/CIRFMF/ksef-api/blob/main/api-changelog.md                                                             | 2    |

## 1. Target query

„jak długo faktury w KSeF" (secondary: „ile lat KSeF przechowuje faktury", „czy trzeba archiwizować
faktury z KSeF", „przechowywanie faktur KSeF")

## 2. The answer in two sentences

KSeF przechowuje faktury ustrukturyzowane (także faktury offline po ich wysłaniu oraz faktury VAT
RR) przez 10 lat od końca roku, w którym je wystawiono, i w tym czasie nie stosuje się art. 112 i
112a ustawy o VAT, więc nie trzeba ich przechowywać u siebie ani dostarczać do urzędu, bo
administracja skarbowa ma do nich dostęp (Podręcznik KSeF 2.0 cz. II, pkt 7 i 1.6.3; FAQ MF
„Najczęstsze pytania", pyt. 21). Jeśli zobowiązanie podatkowe przedawnia się później niż po tych 10
latach, fakturę trzeba pobrać z KSeF przed końcem okresu i dalej przechowywać poza systemem, a
faktury wystawione poza KSeF (np. papierowe w limicie 10 000 zł) przechowuje się od początku na
zwykłych zasadach (cz. II pkt 7; fakty 6, 9–12).

## 3. What changes the answer

- **Faktura jest w KSeF czy poza nim.** Z numerem KSeF → 10 lat w KSeF, bez art. 112/112a (fakty
  1–5). Bez numeru KSeF (papier/PDF z art. 145m, z kasy z art. 145n, B2C poza KSeF, od sprzedawcy
  zagranicznego, VAT RR poza KSeF, awaria całkowita) → KSeF jej nie przechowuje (fakty 9–12).
- **Przedawnienie dłuższe niż 10 lat od końca roku wystawienia** → pobierz i przechowuj poza KSeF do
  przedawnienia (fakt 6). Przepis o przedawnieniu (Ordynacja art. 70) NOT IN KB.
- **Faktura offline jeszcze niewysłana** → w KSeF jej nie ma do czasu wysłania (fakt 2).
- **Dostęp osoby trzeciej** (biuro, księgowa) → kończy się z chwilą odebrania uprawnień (fakt 14);
  zamknięcie JDG / likwidacja: NOT IN KB (fakt 16).
- **Faktury z KSeF 1.0 (2022–31.01.2026)**: NOT IN KB (fakt 17).

## Key Facts (ready to use)

### A. Okres i zakres przechowywania w KSeF

1. **KSeF przechowuje faktury przez 10 lat od końca roku, w którym faktura została wystawiona.**
   - Verbatim [CZ2] pkt 1.6.3, s. 19 (06.08.2026 ed., verified live 2026-10-16 per
     `nota-korygujaca-ksef.md`): „Faktury wystawione w KSeF są przechowywane w systemie przez okres
     10 lat od końca roku, w którym faktura została wystawiona"
   - Also [CZ2] pkt 7 (KB extract text, 01.02.2026 ed.): „Okres przechowywania: 10 lat od końca roku
     wystawienia." Page in the 06.08.2026 edition: not recorded in KB.
   - Also [NP] pyt. 21 (paraphrase in `mf-faq-podreczniki-2026.md` fakt 1: „invoices stored 10 years
     from the end of the issue year"); no Polish verbatim in KB.
   - Tier 2 (MF guidance) / Tier 3. Confidence: HIGH. Krystyna: yes. Ania: yes.

2. **Co jest przechowywane w KSeF:** faktury ustrukturyzowane; faktury wystawione w trybach OFFLINE
   (offline24, awaria, niedostępność) po przesłaniu do KSeF; faktury VAT RR i VAT RR KOREKTA (online
   i offline24 po dosłaniu).
   - KB extract text [CZ2] pkt 7 (`podrecznik-ksef-20-czesc-ii.md` l. 1144–1148). Tier 2.
     Confidence: HIGH. Krystyna: yes.
   - Note: offline invoice exists in KSeF only „po przesłaniu" (same line); before sending it is not
     stored there. VAT RR is optional in KSeF from 2026-04-01 ([PP], verified live 2026-10-16 in
     `limity-i-wylaczenia.md`: „Fakultatywne wystawianie faktur VAT RR i faktur VAT RR KOREKTA w
     KSeF będzie możliwe od 1 kwietnia 2026 r."), so only VAT RR actually sent to KSeF is stored
     there.

3. **Podstawa prawna 10-letniego okresu: UNVERIFIED.** The KB does not cite the statutory article
   that sets the KSeF storage period (`usuniecie-faktury-ksef.md` fakt 7: „Do not attribute it to a
   specific article"). The requested candidate „art. 106gd" does not appear anywhere in the KB. **Do
   not name an article in the post** until [VAT] is checked live. Cite [CZ2] pkt 7 / 1.6.3.

4. **W tym okresie nie stosuje się art. 112 i 112a ustawy o VAT (brak obowiązku przechowywania we
   własnym zakresie).**
   - KB extract text [CZ2] pkt 7: „W tym okresie nie stosuje się art. 112 i 112a ustawy (brak
     obowiązku przechowywania we własnym zakresie)." Tier 2 (MF stating the law; the statutory text
     is not in KB). Confidence: HIGH that MF says it; statute wording UNVERIFIED. Krystyna: yes.

5. **Administracja skarbowa ma dostęp do faktur w KSeF, więc nie trzeba ich dostarczać do US.**
   - KB extract text [CZ2] pkt 7: „Administracja skarbowa ma dostęp do faktur w KSeF → brak
     konieczności dostarczania faktur do US." Tier 2. Confidence: HIGH. Krystyna: yes.

6. **Gdy 10 lat minie przed przedawnieniem zobowiązania, podatnik przechowuje faktury poza KSeF do
   przedawnienia (art. 112, 112a); pobrać je trzeba z wyprzedzeniem.**
   - KB extract text [CZ2] pkt 7: „Jeśli 10-letni okres upłynie przed przedawnieniem zobowiązania
     podatkowego → podatnik przechowuje faktury poza KSeF do przedawnienia (art. 112, 112a). Należy
     pobrać faktury z wyprzedzeniem."
   - **Przykład MF** (KB extract text): „Wysyłka 5.02.2026 → przechowywanie w KSeF do 31.12.2036.
     Podatnik pobiera fakturę najpóźniej do 31.12.2036 → przechowuje poza KSeF do przedawnienia."
   - MF's rationale (KB extract text): „10-letni okres zapewnia, że większość zobowiązań podatkowych
     się przedawni. Związany z okresem korekt podatku naliczonego (nieruchomości)."
   - Tier 2. Confidence: HIGH. Krystyna: yes (key point). Ania: yes.
   - **UNVERIFIED:** when a liability's limitation runs past 10 years (Ordynacja podatkowa art. 70,
     zawieszenie/przerwanie biegu). [OP] art. 70 is not in KB. Do not give examples or durations („5
     lat") from the KB; none exist there.

7. **Faktur w KSeF nie da się usunąć.** KB extract text [CZ2] pkt 1.6.3: „Podatnicy nie mogą
   samodzielnie usuwać faktur." Also no DELETE on invoice paths in the API
   (`usuniecie-faktury-ksef.md` fakt 6, live 2026-10-20). Tier 2. HIGH. Link
   `/blog/usuniecie-faktury-ksef`.

8. **Faktura dla konsumenta / zagranicznego nabywcy wystawiona w KSeF** (udostępniona „w sposób
   uzgodniony", art. 106gb ust. 4) ma numer KSeF, więc jest przechowywana w KSeF jak każda faktura
   ustrukturyzowana.
   - Combination of [CZ2] pkt 1.6.5 (exceptions list, KB extract text) and pkt 7 („Faktury
     ustrukturyzowane"). MEDIUM (MF does not say this in one sentence). Ania: yes.
   - B2C in KSeF is voluntary (`faktura-dla-osoby-prywatnej-ksef.md` fakt 2; [PP]: „Faktury na rzecz
     osób fizycznych nieprowadzących działalności gospodarczej mogą być wystawiane w KSeF
     dobrowolnie").

### B. Faktury poza KSeF

9. **Faktury bez numeru KSeF nie korzystają z 10-letniego przechowywania w KSeF; przechowuje je
   podatnik.**
   - Scope of [CZ2] pkt 7 (lists only invoices in KSeF). `korekta-faktury-spoza-ksef-2027.md` fakt
     23: „a paper/PDF original is not in KSeF, so the seller keeps it himself (inference from the
     scope of pkt 7; art. 112 text not in KB)". MEDIUM. Krystyna: yes.
   - Categories in KB:
     - art. 145m: faktury elektroniczne lub papierowe przy sprzedaży ≤ 10 000 zł brutto/mies., do
       31.12.2026 ([CZ2] pkt 1.2; `koniec-limitu-10000-zl.md`). Link `/blog/koniec-limitu-10000-zl`,
       `/blog/ksef-limit-10000-zl`.
     - art. 145n: faktury z kasy rejestrującej, do 31.12.2026 ([PP], `mf-faq-podreczniki-2026.md`
       fakt 6). Link `/blog/faktura-z-kasy-fiskalnej-ksef-2027`.
     - B2C poza KSeF: art. 106ga ust. 2 pkt 4 (`faktura-dla-osoby-prywatnej-ksef.md`). Link
       `/blog/faktura-dla-osoby-prywatnej-ksef`.
     - Faktury od sprzedawcy bez siedziby / stałego miejsca w Polsce: art. 106ga ust. 2 pkt 1–2
       (`jak-odebrac-fakture-ksef.md`, What changes the answer). Link
       `/blog/faktura-zagraniczna-ksef`.
     - Faktury z awarii całkowitej: nie przesyła się ich do KSeF (art. 106ng; Tabela trybów v1.3;
       `awaria-ksef-offline.md` fakt 3). Link `/guides/awaria-ksef-offline`.
     - Faktury wystawione poza KSeF przed objęciem obowiązkiem (papier/PDF przed 1.04.2026): not in
       KSeF (no KSeF number; `faktura-zaliczkowa-ksef` post l. 116 treats them as „poza KSeF").

10. **Treść art. 112 i 112a (gdzie, w jakiej formie, jak długo, dostępność dla organu): NOT IN KB.
    UNVERIFIED.** The KB only references the articles by number (jak-odebrac brief lists them as
    part of [VAT], not fetched). Do not paraphrase their content (e.g. „do upływu terminu
    przedawnienia", „na terytorium kraju", „udostępnić na żądanie") without a live check.

11. **Duplikat / wizualizacja z KSeF przechowywana u siebie:** KB has no MF statement on the form in
    which an invoice downloaded from KSeF must be kept after the 10 years (XML vs PDF). UNVERIFIED.
    Related: wizualizacja poza KSeF must be „spójna z plikiem XML" ([CZ2] 1.6.5) and the legal
    weight of PDF vs XML is NOT SETTLED (`jak-odebrac-fakture-ksef.md` fakt 24).

12. **Faktura poza KSeF a odliczenie VAT:** separate topic, link
    `/blog/faktura-poza-ksef-odliczenie-vat` (brief `faktura-poza-ksef-odliczenie-vat.md`). Not
    restated here.

### C. Pobieranie, dostęp, uprawnienia

13. **Pobieranie nie jest wymagane w okresie 10 lat; wymagane przed jego końcem, jeśli przedawnienie
    jest późniejsze.** Fact 4 + 6. HIGH. Ways to download that the KB documents:
    - Nabywca (lub uprawniony) może pobierać fakturę wielokrotnie; sprzedawca nie wie, czy i ile
      razy ją pobrano ([CZ2] pkt 6.5, s. 98). HIGH.
    - Aplikacja Podatnika: lista faktur → „Pobierz", 1–10 faktur naraz (kilka = ZIP) ([AP] s. 32–33,
      116–117 per `numer-ksef-gdzie-znalezc.md` fakt 6). HIGH. Krystyna: yes (bulk archiving in AP
      is slow; MF gives no bulk option in AP in KB).
    - API: `GET /invoices/ksef/{ksefNumber}`, eksport paczki; status eksportu zwraca 410 Gone po 7
      dniach retencji („eksport 7 dni"), a „Dla statusów sesji oraz wysyłki faktur retencja nie jest
      obecnie planowana" ([API] 2.4.0; `kody-bledow-ksef.md` fakt 11). The 7 days concern the export
      job, not the invoices. HIGH. Krystyna: only via her program.
    - Note: [CZ2] pkt 7 speaks of „podatnik" generally; no separate buyer-side sentence. HIGH by
      wording (`jak-odebrac-fakture-ksef.md` fakt 23).

14. **Biuro / księgowa traci dostęp po odebraniu uprawnień.** Revoking the office's permission makes
    all its employees' permissions inactive ([CZ1] s. 77–78, przykład 29;
    `biuro-rachunkowe-ksef-kto-co-robi.md` C2). Access to invoices „obejmuje dostęp do wszystkich
    faktur danego podatnika, w tym jego faktur sprzedażowych jak i faktur zakupowych" ([CZ1] s. 55).
    Tier 2. HIGH. Krystyna: yes (archive client invoices she needs before the client revokes access;
    this is a practical conclusion, label as such). Link `/blog/biuro-rachunkowe-ksef-kto-co-robi`,
    `/guides/uprawnienia-ksef-ksiegowa`.
    - UNVERIFIED: whether a new office sees invoices issued before its grant (MF says „wszystkich",
      no explicit history statement; `biuro-rachunkowe-ksef-kto-co-robi.md` Unsettled).

15. **Właściciel firmy loguje się w kontekście swojego NIP** (owner permissions cannot be removed:
    „Nie można odebrać sobie prawa do zarządzania uprawnieniami ani uprawnień właściciela",
    `uprawnienia-ksef-ksiegowa.md` fakt 11, AP manual). HIGH for the permission rule. Link
    `/guides/logowanie-ksef`.

16. **Dostęp po zamknięciu JDG, wykreśleniu z CEIDG, likwidacji spółki, śmierci przedsiębiorcy: NOT
    IN KB. UNVERIFIED.** Grep of `docs/knowledge-base/` and `apps/web/content/pl/` for likwidacja /
    zamknięcie / wykreślenie / zawieszenie / śmierć / sukcesja: no KSeF storage or access statement.
    Pkt 7 sets storage by issue year, not by business status, but whether the former taxpayer can
    still log in is not stated. **Do not answer in the post**; say MF does not describe it in the
    documents we checked, and recommend downloading before closing (practical advice, label as
    ours).

### D. KSeF 1.0 i usuwanie

17. **Faktury z dobrowolnego KSeF 1.0 (2022 – 31.01.2026): availability in KSeF 2.0 and storage
    period NOT IN KB. UNVERIFIED / NOT SETTLED.** KB facts that touch them: FA(2) invoices sent to
    KSeF 1.0 have a KSeF 1.0 number (36 chars), which FA(3) accepts in corrections
    (`faktura-korygujaca-ksef.md` fakt 4, MEDIUM); KSeF 1.0 (ksef.mf.gov.pl) is not operating since
    1.02.2026 (CLAUDE.md, `fa2-vs-fa3-ksef` post). Nothing in KB says whether those invoices were
    migrated, are downloadable in AP 2.0, or whether the 10-year rule applies to them. Do not claim
    either way.

18. **Faktury nie da się usunąć, anulować ani edytować;** korekta „do zera" nie usuwa — oryginał i
    korekta zostają w KSeF ([CZ2] 1.6.2–1.6.4; `usuniecie-faktury-ksef.md` misconception 1). HIGH.
    Link `/blog/usuniecie-faktury-ksef`, `/blog/faktura-korygujaca-ksef`.

19. **UPO:** our FAQ (`apps/web/content/pl/faq/podstawy-ksef.mdx` l. 86) and `/blog/ksef-dla-jdg`
    advise keeping the UPO with the XML. That is our output, not an MF source; KB has no MF storage
    rule for UPO. UNVERIFIED as an obligation.

## Unsettled Questions

- Statutory article for the 10-year KSeF storage period (fact 3).
- Verbatim of art. 112 and 112a (fact 10) and of „nie stosuje się art. 112 i 112a" (fact 4).
- Ordynacja podatkowa art. 70: when limitation exceeds 10 years from end of issue year (fact 6).
- Form of storage after download (XML vs PDF; fact 11).
- Access after closing JDG / liquidation / death (fact 16).
- KSeF 1.0 invoices in KSeF 2.0 (fact 17).
- Page number of [CZ2] pkt 7 in the 06.08.2026 edition, and whether pkt 7 wording changed (MF diff:
  „minor (legal-basis citations, §6.3)", `mf-faq-podreczniki-2026.md` fakt 3, MEDIUM).

## Related published posts (internal links)

- `/blog/usuniecie-faktury-ksef` (can't delete)
- `/guides/jak-odebrac-fakture-ksef` (section „Jak długo KSeF przechowuje faktury" already states
  facts 1, 4–7; keep consistent)
- `/blog/biuro-rachunkowe-ksef-kto-co-robi` (access, change of office)
- `/guides/uprawnienia-ksef-ksiegowa`, `/guides/logowanie-ksef`, `/guides/numer-ksef-gdzie-znalezc`
- `/blog/koniec-limitu-10000-zl`, `/blog/ksef-limit-10000-zl`
- `/blog/faktura-dla-osoby-prywatnej-ksef`, `/blog/faktura-zagraniczna-ksef`
- `/blog/faktura-z-kasy-fiskalnej-ksef-2027`, `/blog/faktura-poza-ksef-odliczenie-vat`
- `/blog/korekta-faktury-poza-ksef-2027`, `/blog/faktura-korygujaca-ksef`
- `/guides/awaria-ksef-offline`, `/guides/aplikacja-podatnika-ksef-pierwsza-faktura` (its FAQ answer
  „Jak długo KSeF przechowuje fakturę?")

## Suggested Sources Section

All URLs already appear in `docs/knowledge-base/` or published posts.

- Podręcznik KSeF 2.0 cz. II (06.08.2026), pkt 1.6.3 (s. 19), 1.6.5, 6.5 (s. 98), 7:
  https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
- MF „Najczęstsze pytania", pyt. 21: https://ksef.podatki.gov.pl/ksef-news/najczestsze-pytania/
- Podręcznik KSeF 2.0 cz. I (06.08.2026), s. 55, 77–78 (only if facts 14 used):
  https://ksef.podatki.gov.pl/media/dmrfdixs/podrecznik-ksef-20-cz-i-rozpoczecie-korzystania-z-ksef-06082026.pdf
- MF „Podstawy prawne oraz kluczowe terminy" (VAT RR, B2C, art. 145m/145n):
  https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/podstawy-prawne-oraz-kluczowe-terminy/
- Ustawa o VAT, t.j. Dz.U. 2026 poz. 1263 (art. 112, 112a, 145m, 145n, 106ga ust. 2) — only after
  live check: https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf

## Warning: Common Misconceptions

1. „KSeF przechowuje faktury na zawsze" — 10 years from end of issue year (fact 1).
2. „KSeF przechowuje faktury 10 lat od wystawienia" — from the **end of the year** of issue: an
   invoice sent 5.02.2026 stays until 31.12.2036 (fact 6).
3. „Trzeba codziennie archiwizować faktury z KSeF" — no obligation during the 10 years (fact 4);
   only before the end, if limitation runs longer (fact 6). Archiving may still be practical (e.g.
   before revoking an office's access), label as advice.
4. „Wszystkie faktury firmy są w KSeF" — not those issued outside KSeF (art. 145m, 145n, B2C,
   foreign sellers, awaria całkowita, offline not yet sent); those follow art. 112/112a (fact 9).
5. „Po 10 latach faktura może zniknąć, bo i tak się przedawni" — MF: „większość" liabilities, not
   all (fact 6).
6. „Korektą do zera usuniesz fakturę z KSeF" — no (fact 18).
7. Stale-check: any claim about KSeF 1.0 retention or about invoices from ksef.mf.gov.pl being kept
   in KSeF 2.0 — unsupported (fact 17).

## Not fetched live

Nothing was fetched in this run (one curl to ksef.podatki.gov.pl: proxy 403; isap.sejm.gov.pl and
api.sejm.gov.pl not tried per environment constraint). The human must check:

- [CZ2] 06.08.2026 PDF, **pkt 7** (full text, page number, any wording change vs 01.02.2026; the
  worked example 5.02.2026 → 31.12.2036; the rationale sentence), pkt 1.6.5, 6.5 (s. 98)
- https://ksef.podatki.gov.pl/ksef-news/najczestsze-pytania/ — **pyt. 21** verbatim (KB has only an
  English paraphrase)
- https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf — **art. 112, 112a** (content), the article
  setting the 10-year KSeF storage and excluding art. 112/112a (KB has none; „106gd" is the caller's
  guess, not in KB), art. 106ga ust. 2 pkt 1–2 and 4, 145m, 145n, 106ng
- https://api.sejm.gov.pl/eli/acts/DU/2026/622/text.pdf — Ordynacja podatkowa **art. 70**
  (przedawnienie; not in KB)
- [CZ1] 06.08.2026 PDF, s. 55 and 77–78 (access scope, revocation)
- [AP] 06.08.2026 PDF, s. 32–33, 116–117 („Pobierz", 1–10 faktur)
- https://github.com/CIRFMF/ksef-api/blob/main/api-changelog.md — 2.4.0 retention (export 7 days)
- Any MF source on: KSeF 1.0 invoices in KSeF 2.0; access after closing JDG / liquidation / death;
  storage form after download (no URL in KB; do not invent one)

## Freshness

2026-11-15. Review when: a new [CZ2] edition appears or pkt 7 is re-extracted; FAQ „Najczęstsze
pytania" changes; after 31.12.2026 (art. 145m/145n expiry shrinks fact 9 categories for invoices
issued from 2027); any MF statement on KSeF 1.0 data or access after closing a business.
