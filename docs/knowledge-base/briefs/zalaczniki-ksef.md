# Research Brief: Załączniki do faktury w KSeF

**Requested by:** coordinator (content backlog item `zalaczniki-ksef`, `docs/content-backlog.md`
line 108: „Załączniki do faktury w KSeF · „załącznik do faktury KSeF" · M, A · FAQ") **Date:**
2026-11-13 **For content:** PL blog post `zalaczniki-ksef` „Załączniki do faktury w KSeF"
**Personas:** Ania (JDG, 1-5 faktur/mies., Aplikacja Podatnika lub prosty program), Marek
(developer, generuje XML FA(3) i wysyła przez API)

**Freshness / method.** Built 2026-11-13 from the local corpus only. Official hosts
(ksef.podatki.gov.pl, isap.sejm.gov.pl, api.sejm.gov.pl, crd.gov.pl, gov.pl) did not respond from
this environment and github.com returned proxy 403, so nothing was fetched live in this run (see
„Sources not fetched live"). Every fact names the KB file it comes from. URLs are copied from
existing KB files or published posts; none were added.

**Target query:** „załącznik do faktury KSeF" (also: „faktura z załącznikiem KSeF", „PDF do faktury
KSeF", „Zalacznik FA(3)")

**Answer in two sentences:** Do faktury w KSeF nie dołączysz PDF-a, skanu ani innego pliku:
Podręcznik KSeF 2.0 cz. II mówi wprost, że „załączniki w formie nieustrukturyzowanej" nie są
przesyłane do KSeF, a jedynym „załącznikiem" jest element `Zalacznik` w XML FA(3), czyli
ustrukturyzowane bloki danych (klucz-wartość, akapity tekstu, tabele) służące wyłącznie danym z art.
106e ustawy o VAT lub danym ściśle z nimi związanym, np. rozbudowanym danym o jednostkach miary,
ilościach i cenach jednostkowych netto (Podręcznik cz. II pkt 1.1 i pkt 2; broszura FA(3) §16 w
konwersji `fa3-information-sheet.md`). Żeby go użyć, trzeba wcześniej zgłosić to w e-Urzędzie
Skarbowym, a fakturę z `Zalacznik` (do 3 MB zamiast 1 MB) wysyła się tylko w sesji wsadowej API; bez
zgłoszenia KSeF ją odrzuca (status `415` „Brak możliwości wysyłania faktury z załącznikiem"), a za
umieszczanie tam cenników, umów czy reklam MF zapowiada odebranie prawa do faktur z załącznikiem
(Podręcznik cz. II pkt 1.6.1, 3.3; `weryfikacja-faktury.md`; `open-api.json`; broszura §16).

**What changes the answer:**

- **Zgłoszenie w e-US.** Bez zgłoszenia faktura z `Zalacznik` jest odrzucana (fakty 9, 10).
  Szczegóły zgłoszenia (formularz, kto składa, od kiedy działa, czy da się wycofać): brak w korpusie
  (Unsettled 1-4).
- **Rodzaj sesji / tryb.** Interaktywna sesja nie przyjmie faktury z załącznikiem; wyjątek: korekta
  techniczna faktury offline (fakty 11, 13). Programy i Aplikacja Podatnika: korpus nie mówi, czy
  obsługują `Zalacznik` (fakt 18).
- **Treść.** Dane spoza art. 106e (cenniki, gwarancje, umowy, protokoły, reklama) nie mogą trafić do
  `Zalacznik`; skutek: odebranie prawa (fakt 6). Taka treść może iść do `Stopka/StopkaFaktury`,
  która według broszury służy m.in. informacjom marketingowym i linkom do formularzy (fakt 7).
- **Rozmiar pliku.** 1 MB bez załącznika, 3 MB z załącznikiem, MB dziesiętne (10^6 B); limity z
  gwiazdką, MF prosi o kontakt przy niewystarczających limitach (fakt 12).
- **Środowisko.** Na TEST włączasz/wyłączasz załączniki endpointem `/testdata/attachment` i
  `/revoke`, bez e-US (fakt 16).
- **Nowa wersja schematu** (nowy namespace na crd.gov.pl) może zmienić strukturę i limity z faktów
  4-5.

## Source keys

| Key    | Document                                                                                                                                                                                                                                                                                                                              | KB file that holds it                                                                                                          | Tier |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ---- |
| [BRO]  | Broszura informacyjna FA(3) (EN March 2026 conversion; text equal to August 2026 ed.). PL: https://ksef.podatki.gov.pl/media/nuclnu0w/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf EN: https://ksef.podatki.gov.pl/media/f2hnwjk2/information-sheet-on-the-fa-3-logical-structure.pdf                                 | `packages/validator/docs/fa3-information-sheet.md` §2.3, §3.1, §15, §16, App. A, B, D; `broszura-fa3-wydania.md` facts 3, 5, 8 | 2    |
| [XSD]  | Schemat FA(3), namespace `http://crd.gov.pl/wzor/2025/06/25/13775/`, https://crd.gov.pl/wzor/2025/06/25/13775/schemat.xsd                                                                                                                                                                                                             | bundled `packages/validator/src/schemas/schemat.xsd` (lines 1170-1215, 3791-3940), read 2026-11-13                             | 2    |
| [CZ2]  | Podręcznik KSeF 2.0 cz. II „Wystawianie i otrzymywanie faktur w KSeF". Extract = edition of 2026-02-01; current edition 2026-08-06: https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf (page numbers below are for the 06.08.2026 ed. where the KB gives them) | `podrecznik-ksef-20-czesc-ii.md` lines 42-43, 170-182, 333, 822-837                                                            | 2    |
| [WER]  | CIRFMF `faktury/weryfikacja-faktury.md` (09.04.2026), https://github.com/CIRFMF/ksef-api/blob/main/faktury/weryfikacja-faktury.md                                                                                                                                                                                                     | `walidacja-xml-fa3.md` facts 16, 19, 21 (fetched live 2026-11-05); `kody-bledow-ksef.md` fact 13 (2026-11-06)                  | 2    |
| [OAPI] | CIRFMF `open-api.json`, https://github.com/CIRFMF/ksef-api/blob/main/open-api.json                                                                                                                                                                                                                                                    | `kody-bledow-ksef.md` fact 1 (2026-11-06); `srodowisko-testowe-ksef.md` fact 26 (2026-11-12)                                   | 2    |
| [KT]   | CIRFMF `offline/korekta-techniczna.md` (20.08.2025), https://github.com/CIRFMF/ksef-api/blob/main/offline/korekta-techniczna.md                                                                                                                                                                                                       | `kody-bledow-ksef.md` fact 16; `usuniecie-faktury-ksef.md` fact 10                                                             | 2    |
| [SCEN] | CIRFMF `dane-testowe-scenariusze.md` (05.08.2025), https://github.com/CIRFMF/ksef-api/blob/main/dane-testowe-scenariusze.md                                                                                                                                                                                                           | `srodowisko-testowe-ksef.md` fact 27                                                                                           | 2    |

Note on language: the local FA(3) conversion is an English structural summary. Where only [BRO] EN
wording is available locally, the quote is English and marked „EN conv."; Polish broszura wording is
quoted only where `broszura-fa3-wydania.md` already has it.

## Key Facts (ready to use)

### A. Can you attach a PDF / scan / any file? (Q1)

1. **Unstructured attachments are not sent to KSeF.** Verbatim (WAŻNE box): „Do KSeF nie są
   przesyłane: faktury pro forma, noty obciążeniowe, noty uznaniowe, faktury wewnętrzne, dowody
   wewnętrzne i załączniki w formie nieustrukturyzowanej." — [CZ2] pkt 1.1 (KB:
   `podrecznik-ksef-20-czesc-ii.md` line 42-43; same quote in `nota-korygujaca-ksef.md` line 15 and
   `biuro-rachunkowe-ksef-kto-co-robi.md` D4). MF guidance (Tier 2), not a statutory quote.
   Confidence: HIGH. Ania: yes. Marek: yes.
   - The corpus does NOT say whether such files may be sent to the buyer separately (e-mail etc.)
     alongside a KSeF invoice. See Unsettled 7.

2. **`Zalacznik` is the eighth top-level element of FA(3) and is structured.** Verbatim: „8.
   **Zalacznik** — ustrukturyzowany załącznik (wymaga zgłoszenia w e-US)" — [CZ2] pkt 2 („Osiem
   głównych elementów struktury FA(3)", KB: `podrecznik-ksef-20-czesc-ii.md` line 333; note: KB
   extract wording, may be a summary of the PDF). [BRO] §3.1 (EN conv.): „Zalacznik | Optional |
   Attachment for invoices with complex data". [XSD] line 3791-3793:
   `<xsd:element name="Zalacznik" minOccurs="0">` with documentation „Załącznik do faktury VAT"; it
   is the last element of the `Faktura` sequence after `Stopka` (also `bledy-walidacji-fa3.md` line
   260, 367). Confidence: HIGH. Ania: yes (concept only). Marek: yes.

3. **New in FA(3), usable from 1 February 2026; did not exist in FA(2).** [BRO] §16 (EN conv.):
   „Optional element. Available from 1 February 2026. For invoices with complex data concerning
   units of measurement, quantity, or net unit prices." PL broszura s. 149 (quoted in
   `broszura-fa3-wydania.md` fact 8): „od 1 lutego 2026 r. podatnik może wystawiać i przesyłać do
   KSeF faktury … z załącznikiem". FA(2) comparison: `fa2-vs-fa3.md` 5.2 („It did not exist in
   FA(2)"). Confidence: HIGH. Ania: yes. Marek: yes.

4. **Exact structure (XSD).** [XSD] lines 3791-3940; [BRO] §16.2 (EN conv.). Confidence: HIGH (read
   directly from the bundled XSD). Marek: yes. Ania: no.

   ```
   Zalacznik                       [0..1]
   └── BlokDanych                  [1..1000]   „Szczegółowe dane załącznika"
       ├── ZNaglowek               [0..1]  TZnakowy512 (1-512 zn.)  „Nagłówek bloku danych"
       ├── MetaDane                [1..1000] „Dane opisowe"
       │   ├── ZKlucz              [1]     TZnakowy (1-256)
       │   └── ZWartosc            [1]     TZnakowy (1-256)
       ├── Tekst                   [0..1]  „Część tekstowa bloku danych"
       │   └── Akapit              [1..10] TZnakowy512 (1-512)
       └── Tabela                  [0..1000] „Tabele"
           ├── TMetaDane           [0..1000] → TKlucz, TWartosc: TZnakowy (1-256)
           ├── Opis                [0..1]  TZnakowy512 (1-512)
           ├── TNaglowek           [1]     „Nagłówek tabeli"
           │   └── Kol             [1..20] attribute Typ (required): date | datetime | dec | int | time | txt
           │       └── NKom        [1]     TZnakowy2 (0-256)
           ├── Wiersz              [1..1000] „Wiersze tabeli"
           │   └── WKom            [1..20] TZnakowy2 (0-256)
           └── Suma                [0..1]  „Podsumowania tabeli"
               └── SKom            [1..20] TZnakowy2 (0-256)
   ```

   - `MetaDane` is mandatory in every `BlokDanych` (no `minOccurs="0"`), so a block needs at least
     one key-value pair even if it only carries a table. [XSD] line 3808. HIGH.
   - `TZnakowy2` has `minLength value="0"` (lines 1179-1187), so table cells (`NKom`, `WKom`,
     `SKom`) may be empty; `TZnakowy` and `TZnakowy512` have `minLength 1`. HIGH.
   - `Typ` on `Kol` is one of only two attribute locations in FA(3) (published post
     `apps/web/content/pl/validator/niedozwolony-atrybut-fa3.mdx` line 28; consistent with [XSD]).
   - No element in the XSD carries binary/base64 content in `Zalacznik`; all leaf types are
     `xsd:token`-based character types. HIGH (XSD read). This is the technical reason a PDF cannot
     be embedded. The corpus does not state this reason in words; treat as a description of the
     schema, not an MF statement.
   - Ambiguity: the XSD does not validate cell values against `Typ` (cells are plain `TZnakowy2`);
     the corpus does not say whether KSeF checks e.g. that a `dec` column holds numbers. See
     Unsettled 9.

5. **Max lengths and occurrences (sheet).** [BRO] §2.3 (EN conv.): max 512 for „ZNaglowek (in
   Zalacznik), Akapit (in Zalacznik), Opis (in Zalacznik)"; App. B: BlokDanych 1,000; MetaDane
   1,000; TMetaDane 1,000; Akapit 10; Tabela (per BlokDanych) 1,000; Kol 20; Wiersz 1,000; WKom 20;
   SKom 20. Consistent with [XSD]. Confidence: HIGH. Marek: yes.
   - **Internal KB error, do not copy:** `fa3-information-sheet.md` App. A (line 970) lists
     „Kol/NKom … Wiersz/WKom … Suma/SKom" under max length **20**. In [XSD] these are `TZnakowy2`
     (max 256 characters); 20 is the max number of columns/cells, not characters. §16.2 of the same
     file correctly says NKom max 256 chars. Logged under Contradictions below.

### B. What may and may not go into `Zalacznik` (Q2)

6. **Tax data only; forbidden content; sanction = right revoked.** [BRO] §16.1 (EN conv.): „The
   attachment serves to present tax-related data only. It should only contain data per Art. 106e of
   the Act, or data closely related to this data." MUST NOT include: „Price lists, warranty
   conditions, user manuals"; „Orders, contracts, agreements, annexes, acceptance reports";
   „Promotions, advertising material, individual offers, newsletters". Critical rule: „If the
   attachment is used in violation, the right to issue invoices with attachment will be revoked."
   Also App. D #12 and `fa2-vs-fa3.md` 5.2. MF guidance (Tier 2). Confidence: HIGH for what MF says.
   Ania: yes. Marek: yes.
   - Who revokes, by what procedure, for how long, whether it can be restored: NOT in corpus
     (Unsettled 5).
   - Polish original wording of the list: not in the local corpus (only EN conv.). The Copywriter
     should paraphrase in Polish, not present a translation as a quote.

7. **Where non-tax content may go instead: `Stopka`.** [BRO] §15.1 (EN conv.): `Informacje` (max 3)
   contains `StopkaFaktury` (max 3500 chars) „for: thank-you notes, discount codes, opening hours,
   hotline info, return form links, complaint form links, marketing info, GDPR statement, share
   capital, etc." [CZ2] pkt 1.6.5 (via `pusta-faktura-pdf-xml.md` fact 6): „Wizualizacja może
   zawierać dodatkowe dane (logo, kontakt BOK), które nie mają znaczenia systemowego." Confidence:
   HIGH. Ania: yes. Note: neither source links these to `Zalacznik`; presenting `Stopka` as „the
   alternative" is a juxtaposition by the Copywriter, not an MF statement.

8. **Legal basis: art. 106gba ust. 1 and art. 106nda ust. 1 are named, text NOT in corpus.**
   Broszura change register (PL s. 173, verbatim in `broszura-fa3-wydania.md` fact 3): „Wrzesień
   2025 r. | 9, 82, 149 | Dostosowanie zapisów broszury do finalnego brzmienia art. 106gba ust. 1
   ustawy." Fact 5 of the same brief: the `Zalacznik` description was changed to reference „art.
   106nda ust. 1" (was „ust. 18"), „cen jednostkowych netto", and „z załącznikiem będącym integralną
   częścią faktury" (was „z załącznikami będącymi ich integralną częścią"). Confidence: HIGH that
   the broszura cites these articles; the statutory text of art. 106gba is NOT in the KB (no brief
   quotes it). Do not quote or paraphrase art. 106gba. The regulation Dz.U. 2025 poz. 1815 brief
   (`rozporzadzenie-ksef-i-tokeny.md`) says nothing about attachments or the e-US notification.
   Ania: no. Marek: maybe (one line „podstawa: art. 106gba ustawy o VAT").

### C. Enabling: zgłoszenie w e-Urzędzie Skarbowym (Q3)

9. **Prior notification in e-US is required.** [BRO] §16 (EN conv.): „Notification of intention to
   issue invoices with attachment must be submitted via e-Tax Office (e-Urząd Skarbowy)." [CZ2] pkt
   2: „(wymaga zgłoszenia w e-US)". [WER] (via `walidacja-xml-fa3.md` fact 19): requires prior
   „zgłoszenia tej opcji w usłudze `e-Urząd Skarbowy`". Confidence: HIGH. Ania: yes. Marek: yes.

10. **No notification → invoice rejected (no KSeF number).** [CZ2] pkt 1.6.1 (s. 18), „Przesłanki
    odrzucenia": „Faktura z załącznikiem bez wcześniejszego zgłoszenia w e-US" (KB
    `podrecznik-ksef-20-czesc-ii.md` line 182; KB extract wording). Effect, same pkt (06.08.2026
    ed., quoted in `walidacja-xml-fa3.md` fact 22): „W przypadku negatywnej weryfikacji system nie
    przydziela numeru KSeF faktury. Oznacza to, że faktura nie została wystawiona." Status code:
    [OAPI] invoice status `415` „Brak możliwości wysyłania faktury z załącznikiem"
    (`kody-bledow-ksef.md` fact 1, table; `details` column „-"). Confidence: HIGH for the rejection
    and the code's description. MEDIUM for the mapping „no e-US notification → 415":
    `walidacja-xml-fa3.md` line 39-40 states it, but [OAPI] gives only the description, not the
    trigger; the 415 description could also cover sending an attachment in an interactive session.
    Do not say „415 appears only when you lack the e-US notification". Marek: yes. Ania: no (her
    software shows it).
    - **Timing of the e-US function:** PL broszura s. 149 (`broszura-fa3-wydania.md` fact 8):
      „Funkcjonalność będzie dostępna od 1 stycznia 2026 r." (EN s. 151: „The functionality will be
      available from 1 January 2026"). This sentence refers to the e-US notification function; the
      invoices with attachment themselves are from 1 February 2026 (fact 3). Wording is future tense
      in a 2026 edition (stale phrasing). Our §16 conversion omits this sentence. Confidence: HIGH
      (that the broszura says it). Whether the function actually opened on that date: not confirmed
      in corpus.
    - **NOT in corpus:** name of the e-US form/service, who may submit (owner only? pełnomocnik?
      accountant with UPL-1?), when the notification becomes effective (immediately / next day),
      whether it can be withdrawn and how, whether it applies per NIP or per context (e.g. VAT
      group, JST unit). Unsettled 1-4.

### D. Technical: sessions, size, errors, test environment (Q4)

11. **Batch session only; interactive session refuses attachments (except korekta techniczna).**
    [CZ2] pkt 3.3.1 „Sesja interaktywna" limits: „Brak faktur z załącznikiem (wyjątek: korekta
    techniczna)"; pkt 3.3.2 „Sesja wsadowa": „Faktury z załącznikiem → wyłącznie sesja wsadowa" (KB
    `podrecznik-ksef-20-czesc-ii.md` lines 827, 837; KB extract wording, page s. 69 per
    `walidacja-xml-fa3.md` fact 23 for pkt 3.3). [WER] (via `walidacja-xml-fa3.md` fact 19): „only
    batch mode (exception: korekta techniczna faktury offline in interactive session)". Confidence:
    HIGH. Marek: yes. Ania: no.

12. **File size: 1 MB without, 3 MB with attachment (decimal).** [WER] (via `walidacja-xml-fa3.md`
    fact 16): „Maksymalny rozmiar faktury bez załączników: **1 MB \*** (1 000 000 bajtów)." / „z
    załącznikami: **3 MB \*** (3 000 000 bajtów)." Footnote (fact 21): „\* Jeżeli w scenariuszach
    biznesowych organizacji dostępne limity są niewystarczające, prosimy o kontakt z działem
    wsparcia KSeF". [CZ2] pkt 3.3.2: „Max rozmiar pliku: **1 MB** (bez załącznika), **3 MB** (z
    załącznikiem)". Same in `srodowisko-testowe-ksef.md` fact 28 (`limity/limity.md`). Confidence:
    HIGH. Marek: yes (10^6 bytes, not MiB). Ania: no.
    - Other batch limits (not attachment-specific): max 10 000 invoices per session, max 50 ZIP
      parts each ≤ 100 MB, whole ZIP ≤ 5 GB (`walidacja-xml-fa3.md` fact 17; [CZ2] pkt 3.3.2).

13. **Korekta techniczna (context for the interactive-session exception).** [KT] (via
    `kody-bledow-ksef.md` fact 16): „Korekta techniczna umożliwia ponowne przesłanie faktury
    wystawionej w trybie offline, która po przesłaniu do systemu KSeF została **odrzucona** z powodu
    błędów technicznych, np.: niezgodność ze schematem, przekroczenie dopuszczalnego rozmiaru pliku,
    duplikat faktury, inne **błędy walidacji technicznej** uniemożliwiające nadanie numeru KSeF."
    Only in an interactive session; „nie dotyczy sytuacji związanych z brakiem uprawnień"; content
    may not be changed. Confidence: HIGH. Marek: yes. Ania: no.
    - The corpus does not say whether a missing e-US notification is a „błąd walidacji technicznej"
      that korekta techniczna can fix (Unsettled 8).

14. **Batch is not atomic.** [CZ2] pkt 3.3 (s. 69, via `walidacja-xml-fa3.md` fact 23): „KSeF w
    takiej sytuacji odrzuca tylko błędne semantycznie pliki XML i informuje o powodzie odrzucenia
    poszczególnych plików". So one rejected attachment invoice does not block the rest of the
    package. Confidence: HIGH. Marek: yes.

15. **Other status codes nearby.** [OAPI] (via `kody-bledow-ksef.md` fact 1): `410` „Nieprawidłowy
    zakres uprawnień", `430` „Błąd weryfikacji pliku faktury", `450` „Błąd weryfikacji semantyki
    dokumentu faktury". Which one a size over 3 MB or an XSD error inside `Zalacznik` returns is NOT
    documented (`kody-bledow-ksef.md` fact 12, `walidacja-xml-fa3.md` fact 28). Do not map.
    Confidence: HIGH (table); mapping: not found.

16. **Test environment switch.** [OAPI] (via `srodowisko-testowe-ksef.md` fact 26): POST
    `/testdata/attachment` (+ `/revoke`), several `/testdata/*` endpoints marked „**Tylko na
    środowiskach testowych.**" [SCEN] (fact 27): „attachments on/off via
    `/testdata/attachment[/revoke]`". Published guide
    `apps/web/content/pl/guides/srodowisko-testowe-ksef.mdx` line 209: „`POST /testdata/attachment`
    i `/revoke`: włączenie i wyłączenie załączników." Request body / parameters: not in KB. Whether
    it works on DEMO: not stated. Confidence: HIGH (endpoint exists). Marek: yes. Ania: no.

17. **Our validator.** `walidacja-xml-fa3.md` fact 41: ksefuj does not check file size or the
    attachments-enabled status („attachments-enabled status. No rule IDs for these in
    `src/semantic.ts`"). It does validate `Zalacznik` against the XSD like any other element
    (bundled schema). Internal, not an MF fact. Marek: yes.

### E. Aplikacja Podatnika, mobile app, visualisation, QR (Q5)

18. **Corpus is silent.** Grep of `docs/knowledge-base/` (all briefs, incl.
    `aplikacja-podatnika-ksef-pierwsza-faktura.md`, `aplikacja-mobilna-ksef.md`,
    `mf-faq-podreczniki-2026.md`, `pusta-faktura-pdf-xml.md`, `jak-odebrac-fakture-ksef.md`) and
    `packages/validator/docs/` for „Zalacznik", „załącznik", „attachment" (2026-11-13): no statement
    on whether Aplikacja Podatnika or the mobile app can create, send, display or print an invoice
    with `Zalacznik`, how the MF visualisation/PDF (`CIRFMF/ksef-pdf-generator`) renders it, or any
    QR-code rule specific to it. Indirect only: Aplikacja Podatnika issues only online invoices
    ([NP] pyt. 11 via `mf-faq-podreczniki-2026.md` fact 1, cited in `usuniecie-faktury-ksef.md` fact
    10); the corpus does not say which session type AP uses. Do NOT infer that AP lacks or has the
    feature. Confidence: N/A (not found).

### F. How the buyer receives it (Q6)

19. **The attachment is part of the invoice XML.** [XSD]: `Zalacznik` is a child of the root
    `Faktura` sequence (line 3791, after `Stopka`), documented „Załącznik do faktury VAT". Broszura
    wording after the September 2025 change (`broszura-fa3-wydania.md` fact 5): „z załącznikiem
    będącym integralną częścią faktury" (fragment of a diff, not a full sentence; the Mar/Aug 2026
    editions did not change this text per fact 6). Confidence: HIGH that it is inside the one XML
    file; MEDIUM for the „integralna część" quote (fragment). Ania: yes. Marek: yes.
    - **NOT in corpus:** any statement about how the buyer's software or Aplikacja Podatnika shows
      the attachment, whether buyers need anything enabled to receive it (the e-US notification is
      described only for issuing), or whether a buyer can refuse it. Silence; Unsettled 6.

### G. ZAW-FA vs zgłoszenie załączników (Q7)

20. **ZAW-FA is a permissions form, unrelated to attachments in the corpus.**
    `certyfikaty-tokeny.md` fact 6.1 (MEDIUM in that brief): „ZAW-FA to formularz upoważnienia do
    korzystania z KSeF w imieniu podatnika." `biuro-rachunkowe-ksef-kto-co-robi.md` B6, B12 (cz. I
    s. 56-60; Dz.U. 2025 poz. 1815 § 5): ZAW-FA is used „wyłącznie w określonych sytuacjach", is not
    needed for a JDG to grant permissions, and is for non-natural persons without a qualified seal.
    No KB file links ZAW-FA with `Zalacznik` or with the e-US attachment notification. The corpus
    does not name the attachment notification form at all, so it cannot confirm that it is NOT
    ZAW-FA by name; it only shows that the two are described for different purposes. Confidence:
    HIGH (ZAW-FA's purpose); attachment form name: not found.

## Contradictions & Ambiguities

- **KB internal error (not an MF contradiction):** `fa3-information-sheet.md` Appendix A line 970
  puts NKom/WKom/SKom under max length 20; §16.2 (line 948) and [XSD] (`TZnakowy2`, maxLength 256)
  say 256 characters. 20 is maxOccurs. Fix suggested for the validator docs owner; Copywriter must
  use 256 chars / 20 columns.
- **„415" trigger:** `walidacja-xml-fa3.md` line 40 says 415 is returned without the e-US option;
  [OAPI] description is generic. Not a contradiction, an unproven mapping (fact 10).
- **Tense in broszura:** „Funkcjonalność będzie dostępna od 1 stycznia 2026 r." is future tense in
  the August 2026 edition (fact 10).
- **[CZ2] extract wording vs PDF:** facts 2, 10, 11 quote the KB extract of the 2026-02-01 edition,
  which may summarise; the 2026-08-06 edition was not compared line by line
  (`podrecznik-ksef-20-czesc-ii.md` freshness box).

## Unsettled Questions (do not answer definitively)

1. Name and path of the e-US notification (which service/form in e-Urząd Skarbowy). Not in corpus.
2. Who may submit it: only the taxpayer/owner, or also a pełnomocnik / biuro rachunkowe. Not in
   corpus.
3. When it takes effect (immediately, next day) and whether it is per NIP or per context (VAT group,
   JST, oddział). Not in corpus.
4. Whether and how the notification can be withdrawn by the taxpayer. Not in corpus (only the test
   `/testdata/attachment/revoke` endpoint exists, fact 16).
5. Revocation of the right for misuse: who decides, procedure, appeal, duration, effect on invoices
   already issued. Only „the right … will be revoked" (fact 6).
6. Buyer side: display of `Zalacznik` in AP, mobile app, MF PDF visualisation; whether buyers must
   enable anything. Not in corpus.
7. Whether a PDF/price list/contract may be sent to the buyer outside KSeF (e-mail) together with a
   KSeF invoice, and its legal status. Corpus only says unstructured attachments are not sent to
   KSeF (fact 1). Do not write „możesz wysłać mailem" as an MF statement.
8. Whether korekta techniczna can repair an offline invoice rejected for missing e-US notification.
   Not stated (fact 13).
9. Whether KSeF validates cell content against `Kol/@Typ` (e.g. text in a `dec` column). XSD does
   not; KSeF behaviour not documented.
10. Statutory text of art. 106gba ust. 1 (and whether the law itself, not only MF, limits content to
    art. 106e data and provides for revocation). Not in KB.
11. Whether Aplikacja Podatnika / the mobile app can issue invoices with `Zalacznik`. Not in corpus.

## Warning: Common Misconceptions

- „Do faktury w KSeF dołączę PDF z umową/specyfikacją." Wrong: unstructured attachments are not sent
  to KSeF (fact 1); `Zalacznik` holds only text/table data (fact 4) and only tax data (fact 6).
- „Załącznik działa od razu." Wrong: needs prior e-US notification (fact 9) and a batch session
  (fact 11).
- „Zgłoszenie załączników to ZAW-FA." Not supported: corpus describes ZAW-FA only as a permissions
  form (fact 20).
- „Limit 3 MB = 3 MiB (3 145 728 B)." Wrong: 3 000 000 bytes (fact 12).
- „Komórki tabeli mają max 20 znaków." Wrong (KB conversion error): 256 characters, max 20
  columns/cells (fact 5).

## Suggested Sources Section (for „Źródła")

- Podręcznik KSeF 2.0 cz. II, Wystawianie i otrzymywanie faktur w KSeF (06.08.2026), pkt 1.1, 1.6.1
  (s. 18), 2, 3.3 (s. 69):
  https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
- Broszura informacyjna dotycząca struktury logicznej FA(3) (sierpień 2026), opis elementu
  `Zalacznik` (PL s. 9, 82, 149):
  https://ksef.podatki.gov.pl/media/nuclnu0w/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf
- Schemat FA(3): https://crd.gov.pl/wzor/2025/06/25/13775/schemat.xsd
- CIRFMF, Weryfikacja faktury:
  https://github.com/CIRFMF/ksef-api/blob/main/faktury/weryfikacja-faktury.md
- CIRFMF, specyfikacja OpenAPI (status 415, `/testdata/attachment`):
  https://github.com/CIRFMF/ksef-api/blob/main/open-api.json
- CIRFMF, Korekta techniczna:
  https://github.com/CIRFMF/ksef-api/blob/main/offline/korekta-techniczna.md
- Internal links (published): `/blog/fa2-vs-fa3-ksef`, `/blog/kody-bledow-ksef`, guides
  `walidacja-xml-fa3`, `srodowisko-testowe-ksef`, validator page `niedozwolony-atrybut-fa3`.

## Sources not fetched live (2026-11-13)

Nothing was fetched in this run (official hosts unreachable, github.com 403). Last live reads as
recorded in the KB:

| Source                                      | Last live read (per KB)                                                               | KB file                                                   |
| ------------------------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Broszura FA(3) PL/EN (all editions)         | 2026-10-08                                                                            | `broszura-fa3-wydania.md`                                 |
| Podręcznik KSeF 2.0 cz. II                  | extract of 2026-02-01 ed.; 06.08.2026 ed. noted 2026-10-07, not compared line by line | `podrecznik-ksef-20-czesc-ii.md`                          |
| `faktury/weryfikacja-faktury.md`            | 2026-11-05 / 2026-11-06                                                               | `walidacja-xml-fa3.md`, `kody-bledow-ksef.md`             |
| `open-api.json` (status 415, `/testdata/*`) | 2026-11-06 / 2026-11-12                                                               | `kody-bledow-ksef.md`, `srodowisko-testowe-ksef.md`       |
| `offline/korekta-techniczna.md`             | 2026-10-20 / 2026-11-06                                                               | `usuniecie-faktury-ksef.md`, `kody-bledow-ksef.md`        |
| `dane-testowe-scenariusze.md`               | 2026-11-12                                                                            | `srodowisko-testowe-ksef.md`                              |
| FA(3) XSD                                   | bundled copy read locally 2026-11-13                                                  | `packages/validator/src/schemas/schemat.xsd`              |
| e-Urząd Skarbowy pages on the notification  | never read (not in KB)                                                                | —                                                         |
| Ustawa o VAT art. 106gba                    | never quoted in KB                                                                    | —                                                         |
| Podręcznik Aplikacji Podatnika / mobile app | read for other briefs; no attachment content recorded                                 | `mf-faq-podreczniki-2026.md`, `aplikacja-mobilna-ksef.md` |

## Freshness Markers

- 1 MB / 3 MB limits: adjustable („\*"), re-check `weryfikacja-faktury.md` and `limity/limity.md`.
- Schema namespace `2025/06/25/13775`: a new FA version would change facts 4-5.
- Broszura edition (August 2026, `nuclnu0w`): MF re-publishes under new media IDs.
- `/testdata/attachment` endpoints: tied to API version 2.9.0 (TE build).
