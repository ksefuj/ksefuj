# Research Brief: Data wystawienia, przesłania i otrzymania faktury w KSeF

**Requested by:** Orchestrator **Date:** 2026-10-23 **For content:** PL blog post „Data wystawienia,
przesłania i otrzymania faktury w KSeF" **Persona:** Ania (JDG, 1-5 faktur miesięcznie), secondary
Marek (integrator: API timestamps)

**Target query:** „data wystawienia faktury KSeF"; secondary: „data otrzymania faktury KSeF", „P_1 a
data przesłania"

**Answer in two sentences:** Fakturę wysłaną do KSeF w trybie online uznaje się za wystawioną w dniu
przesłania do KSeF, o ile data w P_1 jest tą samą datą; gdy P_1 jest wcześniejsza niż dzień
przesłania, faktura jest traktowana jako offline24 z datą wystawienia z P_1, a P_1 późniejsza niż
dzień przyjęcia do KSeF powoduje odrzucenie pliku (ustawa o VAT art. 106na ust. 1, art. 106nda ust.
10 i 16; Podręcznik KSeF 2.0 cz. II pkt 1.4, 1.6.1). Nabywca otrzymuje fakturę w dniu nadania jej
numeru KSeF, bez względu na to, kiedy ją pobierze, a nabywcy z art. 106gb ust. 4 (konsument, podmiot
zagraniczny, bez NIP) w dniu faktycznego otrzymania (art. 106na ust. 3 i 4; cz. II pkt 5.1).

**What changes the answer:**

- **Tryb:** online (art. 106na) vs offline24 (art. 106nda), niedostępność (art. 106nh), awaria (art.
  106nf), awaria całkowita (art. 106ng). Fakty 1-9.
- **Relacja P_1 do dnia przesłania:** równa → online; wcześniejsza → offline24 (data = P_1);
  późniejsza → odrzucenie. Fakty 1-5.
- **Rodzaj sesji API (dla integratorów):** w sesji wsadowej „dzień przesłania" liczy się wg otwarcia
  sesji, w interaktywnej wg chwili przesłania faktury. Fakt 14.
- **Kim jest nabywca:** krajowy z NIP w polu NIP → data nadania numeru KSeF; art. 106gb ust. 4 →
  faktyczne otrzymanie. Fakty 6-8.
- **Dokument wydany poza KSeF przed wysłaniem (offline24):** odliczenie od faktycznego otrzymania,
  ale to „działanie nieprawidłowe" sprzedawcy. Fakt 9.
- **Data 31.12.2026:** koniec art. 145m (limit 10 000 zł liczony wg faktur wystawionych w miesiącu).
  Fakt 19.

**Provenance and live status.** Today 2026-10-23. No official host was reachable (one attempt:
`curl https://api.sejm.gov.pl/eli/acts/DU/2026/1263` → `CONNECT tunnel failed, response 403`). Every
fact marked **[KB]** is from the KB, not fetched live; baseline per `WATCHLIST.md` (verified
2026-10-07): VAT Act consolidated text Dz.U. 2026 poz. 1263; Podręcznik KSeF 2.0 editions of
2026-08-06. The KB extract `podrecznik-ksef-20-czesc-ii.md` is a condensed summary of the
**2026-02-01** edition, not a verbatim transcript: its lines are cited as „KB extract text" and must
not be put in quotation marks as MF wording. Verbatim art. 106na ust. 1, 3, 4 is in
`pusta-faktura-pdf-xml.md` H4 and art. 106nda ust. 10 and 16 in `usuniecie-faktury-ksef.md` (U2),
both checked live 2026-10-26. Facts marked **[API]** were read verbatim from the local clone of
https://github.com/CIRFMF/ksef-api (`/home/user/cirfmf/ksef-api`, commit `ce3670e`, 2026-10-14);
Tier 2 (official MF API documentation), but the GitHub repo was not re-fetched after that commit.
Section/page numbers: cz. II pkt numbers from the 2026-02-01 extract; pages (s.) from the 06.08.2026
edition as recorded in sibling briefs.

**Labels:** LAW = the statute says; MF = MF guidance/technical documentation; COMBINATION = two KB
facts joined, no single source sentence states it (do not attribute to MF).

## Key Facts (ready to use)

### A. Data wystawienia (pytanie 1)

1. **Online: datą wystawienia jest dzień przesłania do KSeF, pod warunkiem że P_1 = data
   przesłania.** LAW (art. 106na ust. 1) as paraphrased by MF.
   - KB extract text (cz. II pkt 1.4, s. 14): „Zgodnie z art. 106na ust. 1 ustawy — datą wystawienia
     jest data przesłania do KSeF, pod warunkiem że data w polu P_1 jest tożsama z datą przesłania."
   - Corroboration: FA(3) information sheet §9.2 (EN edition, verbatim): "Online mode (Art. 106na
     sec. 1): Invoice deemed issued on the date it was sent to KSeF, provided the date in P_1
     matches the sending date." Polish verbatim of the broszura not in KB.
   - Source: ustawa o VAT (Dz.U. 2026 poz. 1263) art. 106na ust. 1; Podręcznik cz. II pkt 1.4;
     `packages/validator/docs/fa3-information-sheet.md` §9.2. Tier 1 (via Tier 2 paraphrase).
     Confidence: HIGH. [KB] Ania: yes.

2. **P_1 wcześniejsza niż dzień przesłania → faktura uznana za offline24, data wystawienia = P_1;
   nie jest to przesłanka odrzucenia.** LAW (art. 106nda ust. 10, 16) + MF.
   - KB extract text (cz. II pkt 1.4): „Jeśli data przesłania jest późniejsza niż P_1 → faktura
     uznana za wystawioną w trybie offline24, a datą wystawienia jest data z P_1." Pkt 1.6.1 (s.
     18): „Nie jest przesłanką odrzucenia: data P_1 wcześniejsza niż data przesłania (faktura
     uznawana za offline24)."
   - Information sheet §9.2 (EN, verbatim): P_1 is the formal date of issue for "Invoices in
     'online' mode where sending date > P_1 date (Art. 106nda sec. 16)" and "Invoices in 'offline24'
     mode (Art. 106nda sec. 10)".
   - Source: art. 106nda ust. 10, 16 (verbatim in `usuniecie-faktury-ksef.md` U2, checked live
     2026-10-26; `awaria-ksef-offline.md` fakt 4); Podręcznik cz. II pkt 1.4, 1.6.1. Tier 1/2.
     Confidence: HIGH. [KB] Ania: yes.

3. **P_1 późniejsza niż dzień przesłania (data „z przyszłości") → odrzucenie pliku XML.** MF
   (Podręcznik) + MF API rule.
   - KB extract text (cz. II pkt 1.6.1, przesłanki odrzucenia): „Data P_1 z przyszłości (późniejsza
     niż data przesłania)".
   - [API] verbatim, `faktury/weryfikacja-faktury.md`, „Walidacja dat": „Data wystawienia faktury
     (`P_1`) nie może być późniejsza niż data przyjęcia dokumentu do systemu KSeF."
   - Ustawa: no provision on rejection in KB (`awaria-ksef-offline.md` Misconceptions: odrzucenie
     opisuje Podręcznik, nie art. 106nda). Tier 2. Confidence: HIGH. Ania: yes.

4. **Odrzucona faktura nie jest wystawiona; brak numeru KSeF; poprawić i wysłać ponownie.** MF.
   - Per `awaria-ksef-offline.md` fakt 5 (cz. II, 06.08.2026): negatywna weryfikacja = brak numeru
     KSeF = „faktura nie została wystawiona". Stated in cz. II pkt 1.6.1, the general verification
     section whose rejection grounds include P_1 from the future (see `usuniecie-faktury-ksef.md`
     fakt 8), so it applies to rejected online invoices directly (corrected after judge review).
     Numbering: KSeF does not check sequence; an earlier number may reach KSeF later than later
     numbers, e.g. after rejection and resend (cz. II pkt 1.6.7). Tier 2. Confidence: HIGH. [KB]
     Ania: yes.

5. **Worked examples (MF's own, cz. II pkt 1.4, s. 14; KB extract text):**
   - „Przykład 1 (ONLINE): P_1 = 1.02.2026, przesłanie 1.02.2026 (23:50), rejestracja na bramce
     1.02.2026, nr KSeF nadany 2.02.2026 (00:01). Data wystawienia = 1.02.2026."
   - „Przykład 2 (offline24): P_1 = 2.02.2026, przesłanie 3.02.2026. Data wystawienia = 2.02.2026
     (tryb offline24)."
   - „Przykład 3 (odrzucenie): Przesłanie 2.02.2026, P_1 = 3.02.2026 (przyszłość). Plik XML
     odrzucony."
   - Receipt date for the 2.02.2026 case: MF, HIGH. Podręcznik cz. II pkt 5.1 Przykład 10 (sent
     23:56, number assigned 00:01): „Datą otrzymania faktury jest w tym przypadku data przydzielenia
     fakturze numeru KSeF, czyli 2 lutego 2026 r.".
   - Just-before-midnight technical behaviour (sesja interaktywna vs wsadowa): see fakt 14. Tier 2.
     Confidence: HIGH. [KB] Ania: yes (example 1 and 3).

### B. Data otrzymania (pytanie 2)

6. **Online: data otrzymania = dzień przydzielenia numeru KSeF.** LAW (art. 106na ust. 3).
   - KB extract text (cz. II pkt 5.1, s. 79): „Art. 106na ust. 3 — data otrzymania = dzień
     przydzielenia numeru KSeF." UPO element 9 (cz. II pkt 4.2): „Data nadania numeru KSeF = data
     otrzymania e-Faktury przez nabywcę".
   - [API] verbatim, `limity/limity-api.md`: „Datą otrzymania faktury jest data nadania numeru KSeF.
     Numer ten jest przypisywany automatycznie przez system w chwili przetworzenia faktury i nie
     zależy od momentu jej pobrania do systemu księgowego." Same idea in
     `pobieranie-faktur/przyrostowe-pobieranie-faktur.md`.
   - Tier 1 (via Tier 2). Confidence: HIGH. [KB] for the statute. Ania: yes.

7. **Nabywcy z art. 106gb ust. 4 (podmiot zagraniczny bez siedziby/stałego miejsca w PL lub z
   nieuczestniczącym stałym miejscem, podatnik UE w procedurze SME, podmiot bez NIP, konsument):
   data otrzymania = faktyczne otrzymanie poza KSeF.** LAW (art. 106na ust. 4).
   - KB extract text (cz. II pkt 5.1): „Art. 106na ust. 4 — dla nabywców z art. 106gb ust. 4
     (zagraniczni, konsumenci, bez NIP itp.) = data faktycznego otrzymania poza KSeF." List of 106gb
     ust. 4 cases: cz. II pkt 1.6.5 / 5.3.1.
   - Tier 1 (via Tier 2). Confidence: HIGH. [KB] Ania: yes (if she sells to consumers/abroad).

8. **Brak akceptacji odbiorcy: art. 106na ust. 2 uchylony od 1.02.2026; nabywca nie może odmówić
   otrzymania faktury w KSeF ani jej odrzucić.** LAW + MF.
   - KB extract text (cz. II pkt 5, 6.1, 6.3): „Od 1 lutego 2026 r. uchylony art. 106na ust. 2 —
     otrzymywanie e-Faktur nie wymaga akceptacji odbiorcy." „KSeF nie posiada opcji
     zatwierdzania/odrzucania faktur." Tier 1/2. Confidence: HIGH. [KB] Ania: yes.

9. **Tryby offline – data wystawienia i otrzymania:**
   - **Offline24:** data wystawienia = P_1 (art. 106nda ust. 10); data otrzymania = data nadania
     numeru KSeF (ust. 11), chyba że nabywca z art. 106gb ust. 4 (faktyczne otrzymanie); nabywca z
     krajowym NIP otrzymuje fakturę wyłącznie w KSeF (ust. 3); wysłanie „niezwłocznie, nie później
     niż w następnym dniu roboczym po dniu jej wystawienia" (ust. 2, verbatim as quoted in
     `awaria-ksef-offline.md` fakt 3). Tier 1. HIGH. [KB]
   - **Dokument wydany poza KSeF przed wysłaniem offline24:** cz. II pkt 1.8 (s. 31-32), verbatim
     fragments recorded live 2026-10-16 in `faktura-poza-ksef-odliczenie-vat.md`: „co w świetle
     regulacji art. 106nda jest działaniem nieprawidłowym ze strony sprzedawcy", „nabywca nabywa
     prawo odliczenia podatku z tego dokumentu w dacie jego faktycznego otrzymania dokumentu".
     Tier 2. HIGH. [KB]
   - **Niedostępność (art. 106nh):** ust. 4 odsyła do art. 106nda ust. 4-15 „odpowiednio", więc data
     wystawienia = P_1 (ust. 10) i data otrzymania = data numeru KSeF (ust. 11); termin wysłania:
     następny dzień roboczy po zakończeniu niedostępności (106nh ust. 2). Information sheet §9.2
     (EN): "Art. 106nda sec. 10 + Art. 106nh sec. 4". Tier 1. HIGH. [KB]
   - **Awaria (art. 106nf):** data wystawienia = P_1 (information sheet §9.2 EN: "Invoices in
     'emergency' mode due to KSeF failure (Art. 106nf sec. 9)"); termin 7 dni roboczych od końca
     awarii (ust. 4). **Data otrzymania przy awarii (106nf ust. 10):** dzień faktycznego otrzymania;
     jeśli nabywca dostał fakturę dopiero po nadaniu numeru, data nadania numeru; nabywca z art.
     106gb ust. 4, który uzgodnił inny sposób doręczenia, ma datę faktycznego otrzymania (Dz.U. 2026
     poz. 1263, verified 2026-10-23). **Awaria całkowita (106ng):** no separate rule. Tier 1. HIGH.
   - [API] verbatim, `tryby-offline.md`: „Za datę wystawienia system KSeF przyjmuje wyłącznie
     wartość zawartą w polu `P_1` struktury e-faktury." „Data otrzymania faktury to data nadania
     numeru KSeF lub w przypadku udostępnienia poza KSeF, data faktycznego jej otrzymania." Tier 2.
     HIGH.
   - Ania: yes (offline24), no (awaria details).

### C. Skutki (pytanie 3)

10. **Odliczenie VAT a data otrzymania.** MF/LAW, HIGH. Podręcznik cz. II pkt 1.8 (s. 31-32) states:
    „Za datę otrzymania faktury w KSeF uznaje się datę przydzielenia numeru". Confirmed by pkt 5.1
    Przykład 10.
    - KB extract text (cz. II pkt 1.7, s. 29-30): „Prawo do odliczenia VAT naliczonego z faktury
      wystawionej poza KSeF powstaje w okresie, w którym powstał obowiązek podatkowy, nie wcześniej
      niż w okresie otrzymania faktury (art. 86 ust. 10b pkt 1)."
    - Applying art. 86 ust. 10b pkt 1 + art. 106na ust. 3 to an ordinary online KSeF invoice (period
      of the KSeF-number date) is now stated by MF (pkt 1.8, see above); earlier labelled
      COMBINATION, MEDIUM (`jak-odebrac-fakture-ksef.md` fakt 4;
      `faktura-poza-ksef-odliczenie-vat.md` fakt 10). Verbatim of art. 86 ust. 10b: NOT IN KB.
      Published post `faktura-poza-ksef-odliczenie-vat.mdx` already presents the two rules side by
      side. Tier 1/2. [KB] Ania: yes if VAT-czynna; no if zwolniona (no deduction).
    - **Terminy płatności liczone od otrzymania faktury: NOT IN KB.** Do not state.

11. **Obowiązek podatkowy sprzedawcy a data wystawienia: only special cases are in KB.** Art. 19a
    ust. 7 (verbatim, Dz.U. 2025 poz. 775 s. 30, recorded in `kurs-waluty-art-31a.md`): „W
    przypadkach, o których mowa w ust. 5 pkt 3 i 4, gdy podatnik nie wystawił faktury lub wystawił
    ją z opóźnieniem, obowiązek podatkowy powstaje z chwilą upływu terminów wystawienia faktury
    określonych w art. 106i ust. 3 i 4, a w przypadku gdy nie określono takiego terminu – z chwilą
    upływu terminu płatności." The KB confirms art. 19a unchanged in Dz.U. 2026 poz. 1263 context
    only via that brief's check of amending acts. Tier 1. HIGH (text). [KB] Ania: rarely (najem,
    usługi ciągłe: yes).

12. **Termin wystawienia faktury (art. 106i ust. 1): zasadniczo nie później niż 15. dnia miesiąca
    następującego po miesiącu dostawy/wykonania usługi, z zastrzeżeniem ust. 2-9; KSeF go nie
    zmienia.**
    - Source: Dz.U. 2026 poz. 1263 art. 106i ust. 1 (paraphrase in
      `faktura-z-kasy-fiskalnej-ksef-2027.md` fakt 10; verbatim NOT IN KB). `awaria-ksef-offline.md`
      fakt 4: „Ustawowe terminy wystawienia faktury (zasadniczo 15. dnia następnego miesiąca) nie
      zmieniają się." Tier 1. HIGH. [KB]
    - Relation to send date: online invoice is issued on the send date (fakt 1), so meeting the 106i
      deadline online means sending by that day; offline24 is issued on P_1 (fakt 2) and sent by the
      next business day. Both are COMBINATION, MEDIUM; no MF sentence in KB links art. 106i to the
      send date. Ania: yes.

13. **Kurs waluty (art. 31a ust. 2): gdy faktura poprzedza obowiązek podatkowy, kurs z ostatniego
    dnia roboczego przed dniem wystawienia.** Hence the issue date (send date online / P_1 offline)
    matters for the NBP rate. Source: CLAUDE.md validator description; `kurs-waluty-art-31a.md`.
    Tier 1. HIGH (rule); COMBINATION (link to KSeF send date), MEDIUM. Ania: only foreign-currency
    invoices.

### D. Integratorzy: znaczniki czasu KSeF (pytanie 4, technical)

14. **KSeF automatically marks an invoice sent as online as offline when the calendar day of P_1 is
    earlier than the calendar day of acceptance (`invoicingDate`); in a batch session
    `invoicingDate` = session opening.** MF (API docs).
    - [API] verbatim, `offline/automatyczne-okreslanie-trybu-offline.md` (dated 04.10.2025): „Jeśli
      dzień kalendarzowy z `issueDate` jest wcześniejszy niż dzień kalendarzowy z `invoicingDate`
      (porównanie po dacie, nie po godzinie), system automatycznie oznacza fakturę jako **offline**,
      nawet jeśli nie była tak zadeklarowana." „sesja wsadowa - `invoicingDate` to moment otwarcia
      sesji (…), sesja interaktywna - `invoicingDate` to moment przesłania faktury."
    - Examples (verbatim): „Sesja wsadowa otwarta o 23:59:59 3 października: Nawet jeśli paczka
      będzie przesłana po północy, faktury pozostaną online – ponieważ `invoicingDate` to 3
      października (data otwarcia sesji)." „Sesja interaktywna rozpoczęta o 23:59:59 3 października,
      a faktury zostały przesłane po północy: Jeżeli `P_1` = 2025-10-03, system oznaczy je jako
      offline". Also: P_1 2025-10-03 sent 2025-10-04 00:00:01 → „zostanie oznaczona jako faktura
      offline".
    - Tier 2. Confidence: HIGH (system behaviour). Whether the batch-session rule matches „data
      przesłania" in art. 106na ust. 1: see Unsettled 2. Ania: no (Marek: yes).

15. **Four timestamps in invoice metadata / session invoice status (OpenAPI `open-api.json`,
    `InvoiceMetadata`, `SessionInvoiceStatusResponse`), verbatim descriptions:**
    - `issueDate` (date): „Data wystawienia faktury." (= P_1 for FA(3); `tryby-offline.md`)
    - `invoicingDate` (date-time): „Data przyjęcia faktury w systemie KSeF (do dalszego
      przetwarzania)."
    - `acquisitionDate` (date-time): „Data nadania numeru KSeF." (= receipt date under art. 106na
      ust. 3, per `limity/limity-api.md`; join with the statute is MF's own wording, HIGH)
    - `permanentStorageDate` (date-time): „Data trwałego zapisu faktury w repozytorium KSeF. Wartość
      uzupełniana asynchronicznie w momencie trwałego zapisu; zawsze późniejsza niż
      **acquisitionDate**."
    - `invoicingMode`: enum `Online` / `Offline` („Tryb fakturowania (online/offline).").
    - Query filter `InvoiceQueryDateType`: `Issue`, `Invoicing`, `PermanentStorage` (no filter by
      `acquisitionDate`). Changelog 2.1.2: dateRange values without offset are interpreted as „czas
      lokalny Europe/Warsaw". Older field `ReceiveDate` was replaced by `InvoicingDate`
      (api-changelog). Tier 2. HIGH. Ania: no.

16. **UPO (schema `faktury/upo/schemy/upo-v4-3.xsd`) carries three dates:** `DataWystawieniaFaktury`
    („Data wystawienia faktury"), `DataPrzeslaniaDokumentu` („Data przesłania dokumentu do systemu
    KSeF"), `DataNadaniaNumeruKSeF` („Czas i data wygenerowania numeru KSeF"), plus `TrybWysylki`
    („Online lub Offline"). Official example (`upo-faktura-kontekst-id-nip.xml`):
    `DataPrzeslaniaDokumentu` 2025-09-16T11:05:40.841+02:00, `DataNadaniaNumeruKSeF`
    2025-09-16T11:05:41.045+02:00. Podręcznik cz. II pkt 4.2 (KB extract text): element 7 „Data
    wystawienia (P_1) — data wystawienia w trybach offline", 8 „Data przesłania do KSeF — data
    wystawienia w trybie online (gdy zgodna z P_1)", 9 „Data nadania numeru KSeF = data otrzymania
    e-Faktury przez nabywcę". Tier 2. HIGH. Ania: partly (UPO is what the seller can download).

17. **Data w numerze KSeF = data przyjęcia do dalszego przetwarzania, nie data otrzymania.** [API]
    verbatim, `faktury/numer-ksef.md`: „`RRRRMMDD` – data przyjęcia faktury (rok, miesiąc, dzień) do
    dalszego przetwarzania". In MF's Przykład 1 (fakt 5) acceptance is 1.02 and the number is
    assigned 2.02; whether the number then shows 20260201 is COMBINATION (LOW): no source gives a
    number for that case. Tier 2. HIGH (definition). Ania: yes (avoid reading the receipt date from
    the number).

18. **P_1 vs P_6 vs DataWytworzeniaFa (FA(3) information sheet, EN, verbatim):**
    - `P_1`: "Mandatory | Date of issue." (§9.2)
    - `P_6`: "Date of delivery/completion or date of payment receipt (Art. 106b sec. 1(4)).
      Completed when the same for ALL invoice items. If dates differ per item, use P_6A in FaWiersz
      instead." `OkresFa` (P_6_Od/P_6_Do) for art. 19a ust. 3, 4, 5 pkt 4. P_6 and OkresFa are an
      xsd:choice (`bledy-walidacji-fa3.md` Error 12).
    - `DataWytworzeniaFa` (§4.1 NOTE): "`DataWytworzeniaFa` MAY differ from the date in field `P_1`
      and MAY differ from the date of actual delivery to KSeF."
    - Aplikacja Podatnika: issue date auto-filled and cannot be changed (AP manual 06.08.2026, s.
      24-31, per `aplikacja-podatnika-ksef-pierwsza-faktura.md` fakt 7); AP issues online only (FAQ
      MF, same brief fakt 2). So in AP P_1 = day of sending. Last sentence COMBINATION, MEDIUM.
    - Tier 2. HIGH. Ania: yes.

    | Data                      | Pole / znacznik                                 | Do czego służy (source)                                                    |
    | ------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------- |
    | Data wystawienia          | `P_1`; API `issueDate`; UPO `DataWystawienia…`  | data wystawienia offline; online gdy = dzień przesłania (fakty 1-2, 16)    |
    | Data dostawy / zapłaty    | `P_6` / `P_6A` / `OkresFa`                      | data sprzedaży lub otrzymania zapłaty, jeśli inna (fakt 18)                |
    | Data przesłania/przyjęcia | API `invoicingDate`; UPO `DataPrzeslania…`      | data wystawienia online (art. 106na ust. 1); test P_1 vs przyjęcie (3, 14) |
    | Data nadania numeru KSeF  | API `acquisitionDate`; UPO `DataNadaniaNumeru…` | data otrzymania przez nabywcę (art. 106na ust. 3; fakty 6, 15, 16)         |
    | Data trwałego zapisu      | API `permanentStorageDate`                      | technical, incremental download (HWM) only (fakt 15)                       |
    | Data wytworzenia XML      | `Naglowek/DataWytworzeniaFa`                    | technical; may differ from P_1 and send date (fakt 18)                     |

### E. Limit 10 000 zł (pytanie 3)

19. **Art. 145m: limit liczony z faktur wystawionych w danym miesiącu; online liczy się dzień
    przesłania.** LAW + MF.
    - Art. 145m ust. 1 (paraphrase in `koniec-limitu-10000-zl.md` fakt 1): łączna wartość sprzedaży
      wraz z podatkiem „udokumentowana tymi fakturami wystawionymi w danym miesiącu" ≤ 10 000 zł;
      verbatim fragment only: „w okresie od dnia 1 kwietnia 2026 r. do dnia 31 grudnia 2026 r."; cz.
      I s. 14 (verbatim, live 2026-10-16 per `faktura-poza-ksef-odliczenie-vat.md`): „mniejsza lub
      równa 10 000 zł". Ust. 2: right lost from the invoice that exceeds the limit.
    - FAQ „Poniżej 10 000 zł" (per `koniec-limitu-10000-zl.md` fakt 7, paraphrase): limit counted by
      date of issue, not sale; online invoice must be sent the same day or it is treated as
      offline24.
    - Note: the 10 000 zł invoices are issued outside KSeF, so „data przesłania" matters only for
      KSeF invoices; the published sentence „faktura online jest wystawiona w dniu przesłania do
      KSeF" plus the December-invoice-in-January example (`koniec-limitu-10000-zl.mdx`) is MEDIUM
      (wniosek z art. 145m, no separate MF answer).
    - Tier 1/3. HIGH (law), MEDIUM (application). [KB] Ania: yes (until 31.12.2026).

## Unsettled Questions

1. **Godzina i strefa czasowa „dnia przesłania".** API compares calendar days; dateRange without
   offset = Europe/Warsaw; UPO example shows +02:00. No source in KB says which time zone defines
   the calendar day in the P_1 vs `invoicingDate` comparison. Do not state „liczy się czas polski"
   as MF wording.
2. **Sesja wsadowa otwarta przed północą, paczka po północy:** API keeps the invoice online with the
   session-opening day; whether that day is „data przesłania" under art. 106na ust. 1 is not
   addressed by any Tier 1/2 legal text in KB.
3. **Late offline24 (art. 106nda ust. 16 vs ust. 2):** RESOLVED, no sheet/API conflict. The broszura
   "P_1 + 1 day" sentence only concerns the mode label shown in link-based verification; its own
   example (P_1 = 1.02, sent 3.02) applies ust. 16, matching the API (any earlier calendar day →
   offline). Still open: whether the ust. 2 deadline applies to an invoice converted under ust. 16
   (ust. 16 does not list ust. 2 among provisions applied "odpowiednio"). KSeF does not reject (fakt
   2); sanction art. 106ni ust. 1 pkt 3 from 1.01.2027 under current law, deferral to 1.01.2028 only
   in government bill UD477 (not yet passed). Do not describe consequences beyond that.
4. **Data otrzymania w trybie awaryjnym (106nf) i awarii całkowitej (106ng):** SETTLED for 106nf by
   art. 106nf ust. 10 (Dz.U. 2026 poz. 1263, verified 2026-10-23, see fakt 4); 106ng has no separate
   rule.
5. **Odliczenie dla zwykłej faktury online w okresie daty numeru KSeF:** RESOLVED by pkt 1.8 and pkt
   5.1 Przykład 10 (fakt 10).
6. **Odrzucona faktura online a termin z art. 106i:** no source on whether a rejected first attempt
   on the deadline day and a resend the next day is late. Do not answer.
7. **„Dzień roboczy" (sobota)** undefined in the VAT Act (`awaria-ksef-offline.md` Unsettled 1); use
   Tuesday → Wednesday examples.
8. **Podręcznik cz. II 06.08.2026** vs the 2026-02-01 extract: changes judged minor, not checked
   line by line; pkt numbers may have shifted.
9. **Backlog signal (infor.pl, 2026-10-13)** about delays in assigning KSeF numbers is trade press,
   not a source: do not cite it, do not claim that delays occur or how long. The only official
   statements in KB: number „generowany jest niezwłocznie po przesłaniu dokumentu. W wyjątkowych
   przypadkach (np. wysokie obciążenie systemu) numer może być nadany z niewielkim opóźnieniem."
   ([API] `kody-qr.md`, verbatim), and MF Przykład 1 (number assigned the next day).

## Suggested Sources Section

All URLs below already appear in `docs/knowledge-base/` or published posts.

- Ustawa o VAT, tekst jednolity Dz.U. 2026 poz. 1263 (art. 106i, 106na, 106nda, 106nf, 106nh, 145m):
  https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf
- Podręcznik KSeF 2.0, cz. II (06.08.2026), pkt 1.4, 1.6.1, 1.6.7 (Przykład 5, numbering), 1.8, 4.2,
  5.1:
  https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
- Broszura informacyjna FA(3) (P_1, P_6):
  https://ksef.podatki.gov.pl/media/nuclnu0w/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf
- Tabela trybów wystawiania faktur (24.02.2026):
  https://ksef.podatki.gov.pl/media/xp2dhszg/tabela-tryby-wystawiania-faktur-24022026.pdf
- MF, Poniżej 10 000 zł: https://ksef.podatki.gov.pl/ponizej-10-000-zl/
- Dokumentacja API KSeF, weryfikacja faktury (walidacja dat):
  https://github.com/CIRFMF/ksef-api/blob/main/faktury/weryfikacja-faktury.md
- Dokumentacja API KSeF, numer KSeF:
  https://github.com/CIRFMF/ksef-api/blob/main/faktury/numer-ksef.md
- Specyfikacja OpenAPI (issueDate, invoicingDate, acquisitionDate, permanentStorageDate):
  https://github.com/CIRFMF/ksef-api/blob/main/open-api.json
- Repozytorium dokumentacji API (pliki `offline/automatyczne-okreslanie-trybu-offline.md`,
  `tryby-offline.md`, `faktury/upo/schemy/upo-v4-3.xsd`; their own URLs are not yet in KB, cite via
  the repo): https://github.com/CIRFMF/ksef-api

## Warning: Common Misconceptions

- **„Data wystawienia to zawsze P_1."** Online: date of sending, provided P_1 equals it (fakt 1).
  P_1 is the issue date in offline modes and when sent later (fakt 2).
- **„Mogę wpisać w P_1 jutrzejszą datę i wysłać dziś."** KSeF rejects it (fakt 3).
- **„Wysłałam 23:50, numer przyszedł po północy, więc faktura jest z następnego dnia."** MF Przykład
  1: date of issue = day of sending (fakt 5).
- **„Wysłanie po północy z wczorajszą P_1 to błąd."** It is not rejected; it becomes offline24 with
  date P_1 (fakty 2, 14), subject to the next-business-day deadline.
- **„Data otrzymania to dzień, w którym pobiorę / otworzę fakturę albo dostanę PDF mailem."** Day
  the KSeF number is assigned (fakt 6); except 106gb ust. 4 buyers (fakt 7).
- **„Datę otrzymania odczytam z numeru KSeF."** The number contains the acceptance date (fakt 17);
  the receipt date is `acquisitionDate` / UPO `DataNadaniaNumeruKSeF`.
- **„Mogę odrzucić / nie zaakceptować faktury w KSeF."** Art. 106na ust. 2 repealed (fakt 8).
- **„P_6 to data wystawienia."** P_6 is delivery/payment date (fakt 18).
- **„DataWytworzeniaFa musi być równa P_1."** May differ (fakt 18).
- **„KSeF wydłuża termin wystawienia faktury."** Art. 106i deadlines unchanged (fakt 12).
- **„Faktura offline24 = ma 24 godziny."** Deadline is the next business day after the day of issue
  (fakt 9), not 24 hours.
- **„Do 31 grudnia 2026 r. podatnicy nie będą karani"** (Podręcznik cz. II pkt 1.7, 2026-02-01
  extract): stale vs MF communication of 2026-09-16; art. 106ni from 1.01.2027 under current law,
  1.01.2028 only in draft UD477 (`sankcje-ksef-ud477.md`).

**Freshness:** 2026-10-23. Re-check: VAT Act / UD477 after publication in Dz.U.; art. 145m after
2027-01-01 (fact 19 becomes historical); ksef-api docs on new releases (automatic offline rule, UPO
schema version v4-3); Podręcznik cz. II next edition (re-extract pkt 1.4, 5.1 verbatim).
