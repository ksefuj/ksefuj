# Research Brief: Usunięcie, edycja i anulowanie faktury w KSeF

**Requested by:** Orchestrator **Date:** 2026-10-20 **For content:** PL blog post (section blog,
topic invoicing), working title „Czy można usunąć fakturę z KSeF?" **Persona:** Ania (JDG, 1–5
faktur miesięcznie, wystawia w Aplikacji Podatnika lub prostym programie)

**Target query:** „usunięcie faktury KSeF" (secondary: „czy można usunąć fakturę w KSeF", „czy można
edytować fakturę w KSeF", „anulowanie faktury KSeF")

**Answer in two sentences:** Faktury, której KSeF nadał numer, nie da się edytować, anulować ani
usunąć: weszła do obrotu prawnego, KSeF przechowuje ją 10 lat od końca roku wystawienia, a błąd
poprawia sprzedawca wyłącznie fakturą korygującą (Podręcznik KSeF 2.0 cz. II, pkt 1.6.2–1.6.3, 7;
ustawa o VAT art. 106j ust. 1). Jeśli KSeF plik odrzucił, numeru nie ma i faktura nie została
wystawiona, więc poprawiasz dane i wysyłasz ją ponownie (cz. II, pkt 1.6.1).

**What changes the answer:**

- **Plik odrzucony (brak numeru KSeF):** to nie jest wystawiona faktura; popraw i wyślij ponownie
  (fakty 8–9). Faktura offline odrzucona technicznie: korekta techniczna w API (fakt 10).
- **Błędny NIP nabywcy:** nie koryguje się NIP na inny; korekta „do zera" + nowa faktura (fakt 12).
- **Faktura testowa wysłana na produkcję:** pełnoprawna faktura, korekta „do zera" (fakt 14).
  Środowisko testowe / demo: dokumenty nie są fakturami (fakt 15).
- **Faktura offline jeszcze niewysłana:** KB nie rozstrzyga, czy można ją „wycofać" (fakt 11,
  UNVERIFIED).
- **Ta sama faktura wysłana dwa razy:** druga kopia odrzucona jako duplikat (fakt 18).
- **Faktura poza KSeF** (B2C, art. 145m do 31.12.2026, art. 145n): KB nie ma reguły o anulowaniu
  (fakt 22, NOT IN KB).
- **Faktura, która nie jest Twoja** (pomyłka sprzedawcy albo fałszywka): nie odrzucisz jej;
  ukrywanie tylko zapowiedziane (fakty 19–21).

---

## Update 2026-10-26: data wystawienia i otrzymania (sekcja „Numer KSeF oznacza, że faktura już istnieje”)

**Reason:** the published sentence „Za wystawioną uznaje się ją w dniu przesłania do KSeF, a za
otrzymaną w dniu nadania numeru.” omits the P_1 condition and the art. 106gb ust. 4 buyers.

**Live status:** one curl attempt each on 2026-10-26 to
https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf and
https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
→ both `CONNECT tunnel failed, response 403` (proxy `connect_rejected`). Nothing below was
re-fetched; all facts are **[KB]**, baseline per `WATCHLIST.md` (VAT Act t.j. Dz.U. 2026 poz. 1263;
Podręcznik KSeF 2.0 editions of 2026-08-06).

**Target query:** „usunięcie faktury KSeF" (unchanged).

**Corrected answer (issue/receipt-date sentence) in two sentences:** Fakturę wysłaną online uznaje
się za wystawioną w dniu przesłania do KSeF, jeśli data w P_1 jest tą samą datą; gdy P_1 jest
wcześniejsza, faktura jest traktowana jako offline24 z datą wystawienia z P_1, a P_1 późniejsza niż
dzień przyjęcia do KSeF powoduje odrzucenie pliku (ustawa o VAT art. 106na ust. 1, art. 106nda ust.
10 i 16; Podręcznik KSeF 2.0 cz. II pkt 1.4, 1.6.1). Nabywca otrzymuje fakturę w dniu nadania numeru
KSeF, a nabywca z art. 106gb ust. 4 (np. konsument, podmiot zagraniczny bez siedziby lub stałego
miejsca w Polsce, podmiot bez NIP), któremu udostępniono ją poza KSeF, w dniu faktycznego otrzymania
(art. 106na ust. 3 i 4; cz. II pkt 5.1).

**What changes the answer:**

- **P_1 vs dzień przesłania:** równa → data wystawienia = dzień przesłania (U1); wcześniejsza →
  offline24, data = P_1, bez odrzucenia (U2); późniejsza → odrzucenie, faktura nie jest wystawiona
  (U3).
- **Kim jest nabywca:** krajowy, otrzymuje w KSeF → dzień nadania numeru (U4); art. 106gb ust. 4 i
  udostępnienie poza KSeF → dzień faktycznego otrzymania (U5).

**Facts:**

- **U1. Issue date online = day of sending to KSeF, provided P_1 equals that day.** LAW (art. 106na
  ust. 1) + MF (condition as stated in Podręcznik).
  - Statute verbatim (art. 106na ust. 1): „Fakturę ustrukturyzowaną uznaje się za wystawioną w dniu
    jej przesłania do Krajowego Systemu e-Faktur." KB: `pusta-faktura-pdf-xml.md` fakt 3 and H4
    (ust. 1 „confirmed identical in the 2026 t.j.", live 2026-10-16). The statutory sentence itself
    carries no P_1 condition; the condition comes from art. 106nda ust. 16 (U2) as read by MF.
  - MF, KB extract text (cz. II pkt 1.4, s. 14; not MF verbatim): „Zgodnie z art. 106na ust. 1
    ustawy — datą wystawienia jest data przesłania do KSeF, pod warunkiem że data w polu P_1 jest
    tożsama z datą przesłania." Same condition in FA(3) information sheet §9.2 (EN).
  - KB: `terminy-ksef-data-wystawienia.md` fakt 1. Tier 1 + 2. Confidence: HIGH. [KB]
- **U2. P_1 earlier than the sending day → invoice treated as offline24, issue date = P_1; not a
  ground for rejection.** LAW (art. 106nda ust. 10, 16) + MF.
  - KB extract text (cz. II pkt 1.4): „Jeśli data przesłania jest późniejsza niż P_1 → faktura
    uznana za wystawioną w trybie offline24, a datą wystawienia jest data z P_1." Pkt 1.6.1 (s. 18):
    „Nie jest przesłanką odrzucenia: data P_1 wcześniejsza niż data przesłania (faktura uznawana za
    offline24)."
  - Statute text of art. 106nda ust. 10/16: **not verbatim in KB** (cited via Podręcznik, broszura
    §9.2 and `awaria-ksef-offline.md` fakt 4). Do not quote it.
  - KB: `terminy-ksef-data-wystawienia.md` fakt 2. Tier 1 (via Tier 2) + 2. Confidence: HIGH. [KB]
- **U3. P_1 later than the day of acceptance into KSeF → file rejected; no KSeF number, invoice not
  issued.** MF (no statutory provision on rejection in KB).
  - KB extract text (cz. II pkt 1.6.1, przesłanki odrzucenia): „Data P_1 z przyszłości (późniejsza
    niż data przesłania)". API verbatim (`faktury/weryfikacja-faktury.md`, „Walidacja dat"): „Data
    wystawienia faktury (`P_1`) nie może być późniejsza niż data przyjęcia dokumentu do systemu
    KSeF." Rejection = „faktura nie została wystawiona" (pkt 1.6.1, s. 18, fact 8 below).
  - KB: `terminy-ksef-data-wystawienia.md` fakty 3–4. Tier 2. Confidence: HIGH. [KB]
- **U4. Receipt date = day the KSeF number is assigned.** LAW (art. 106na ust. 3).
  - Verbatim: „Faktura ustrukturyzowana jest uznana za otrzymaną przy użyciu Krajowego Systemu
    e-Faktur w dniu przydzielenia w tym systemie numeru identyfikującego tę fakturę." KB:
    `pusta-faktura-pdf-xml.md` H4 ([VAT] s. 131). MF: cz. II pkt 5.1 (s. 79), Przykład 10.
  - KB: `terminy-ksef-data-wystawienia.md` fakt 6. Tier 1. Confidence: HIGH. [KB]
- **U5. Buyers under art. 106gb ust. 4 to whom the invoice is made available outside KSeF: receipt
  date = day of actual receipt.** LAW (art. 106na ust. 4).
  - Verbatim: „W przypadku udostępnienia faktury ustrukturyzowanej nabywcy, o którym mowa w art.
    106gb ust. 4, w sposób inny niż przy użyciu Krajowego Systemu e-Faktur, za datę otrzymania tej
    faktury uznaje się datę jej faktycznego otrzymania przez tego nabywcę." KB:
    `pusta-faktura-pdf-xml.md` H4. Art. 106gb ust. 4 pkt 1–6 (H3): place of supply abroad; no seat /
    fixed establishment in PL; fixed establishment not participating; art. 113a ust. 1 (SME); no tax
    ID; consumer. MF: cz. II pkt 5.1 (KB extract text: „zagraniczni, konsumenci, bez NIP itp.").
  - Note: ust. 4 is conditioned on making the invoice available outside KSeF („w sposób inny niż
    przy użyciu Krajowego Systemu e-Faktur"), not on buyer type alone.
  - KB: `terminy-ksef-data-wystawienia.md` fakt 7. Tier 1. Confidence: HIGH. [KB]

**KB inconsistency noted (not resolved):** `terminy-ksef-data-wystawienia.md` (Provenance) states
the KB holds „no verbatim text of art. 106na"; `pusta-faktura-pdf-xml.md` H4 records verbatim ust.
3–4 and fakt 3 verbatim ust. 1 (live 2026-10-16). The verbatim quotes above are taken from the
latter.

**Sources (URLs already in KB):**

- Ustawa o VAT, t.j. Dz.U. 2026 poz. 1263, art. 106na ust. 1, 3, 4; art. 106nda ust. 10, 16; art.
  106gb ust. 4: https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf
- Podręcznik KSeF 2.0 cz. II (06.08.2026), pkt 1.4, 1.6.1, 5.1:
  https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
- KSeF API, weryfikacja faktury (walidacja dat):
  https://github.com/CIRFMF/ksef-api/blob/main/faktury/weryfikacja-faktury.md

---

## Provenance

- **KB** = taken from the repo knowledge base, not re-fetched in this run. Official hosts
  (ksef.podatki.gov.pl, api.sejm.gov.pl, isap.sejm.gov.pl, gov.pl) are blocked from this environment
  (proxy 403) and were not contacted. Baseline per `WATCHLIST.md` (last checked 2026-10-07): VAT Act
  t.j. Dz.U. 2026 poz. 1263; Podręcznik KSeF 2.0 cz. I–IV of 2026-08-06. Many KB quotes below were
  verified live by earlier passes (2026-10-16/17); the KB file is named per fact.
- **LIVE 2026-10-20** = fetched in this run from raw.githubusercontent.com / CIRFMF/ksef-api (main
  branch): `faktury/weryfikacja-faktury.md` (dated 09.04.2026), `offline/korekta-techniczna.md`
  (20.08.2025), `tryby-offline.md`, `faktury/sesje/sesja-sprawdzenie-stanu-i-pobranie-upo.md`,
  `api-changelog.md` (latest 2.9.0), `open-api.json`.
- `podrecznik-ksef-20-czesc-ii.md` is a condensed summary of the 2026-02-01 edition („KB extract
  text"), not verbatim. Where an earlier pass quoted the 06.08.2026 edition verbatim, that is used.

**Source keys (URLs exactly as they appear in the KB):**

- [CZ2] Podręcznik KSeF 2.0 cz. II (06.08.2026):
  https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
- [CZ3] Podręcznik KSeF 2.0 cz. III (06.08.2026), NOT extracted in KB:
  https://ksef.podatki.gov.pl/media/3ikdk3qm/podrecznik-ksef-20-cz-iii-dodatkowe-funkcjonalnosci-ksef-06082026.pdf
- [VAT] Ustawa o VAT, t.j. Dz.U. 2026 poz. 1263:
  https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf
- [NP] MF „Najczęstsze pytania": https://ksef.podatki.gov.pl/ksef-news/najczestsze-pytania/
- [FAQ] MF FAQ KSeF 2.0: https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20/
- [XSD] Struktura FA(3): https://crd.gov.pl/wzor/2025/06/25/13775/
- [API] CIRFMF/ksef-api: https://github.com/CIRFMF/ksef-api (verification rules:
  https://github.com/CIRFMF/ksef-api/blob/main/faktury/weryfikacja-faktury.md)

---

## Key Facts (ready to use)

### A. Faktura z numerem KSeF: brak edycji, anulowania, usuwania

1. **Faktura ustrukturyzowana = faktura wystawiona przy użyciu KSeF wraz z przydzielonym numerem.**
   - Verbatim (art. 2 pkt 32a): „fakturze ustrukturyzowanej – rozumie się przez to fakturę
     wystawioną przy użyciu Krajowego Systemu e-Faktur wraz z przydzielonym numerem identyfikującym
     tę fakturę w tym systemie".
   - Source: [VAT] art. 2 pkt 32a, s. 9. KB: `pusta-faktura-pdf-xml.md` H8 (live 2026-10-16).
   - Tier 1 (law). Confidence: HIGH. Checked: KB. Ania: yes (as background, no article quote
     needed).

2. **Data wystawienia i otrzymania (art. 106na) — corrected 2026-10-26, see Update U1–U5.**
   - Ust. 1 verbatim: „Fakturę ustrukturyzowaną uznaje się za wystawioną w dniu jej przesłania do
     Krajowego Systemu e-Faktur." **Not unconditional in practice:** it applies when the date in P_1
     equals the sending day ([CZ2] pkt 1.4, s. 14, KB extract text: „pod warunkiem że data w polu
     P_1 jest tożsama z datą przesłania"); P_1 earlier → offline24, issue date = P_1 (art. 106nda
     ust. 10, 16; [CZ2] 1.4, 1.6.1); P_1 later than the day of acceptance → file rejected ([CZ2]
     1.6.1; [API] `weryfikacja-faktury.md`). Source: `terminy-ksef-data-wystawienia.md` fakty 1–3.
     Ust. 3 verbatim: „Faktura ustrukturyzowana jest uznana za otrzymaną przy użyciu Krajowego
     Systemu e-Faktur w dniu przydzielenia w tym systemie numeru identyfikującego tę fakturę." Ust.
     4: for buyers from art. 106gb ust. 4 (e.g. konsument, podmiot zagraniczny, bez NIP) to whom the
     invoice is made available outside KSeF, receipt = day of actual receipt ([CZ2] 5.1). Ust. 2
     (akceptacja odbiorcy) uchylony od 1.02.2026 ([CZ2] 6.1).
   - Source: [VAT] art. 106na ust. 1, 3–4, s. 131. KB: `pusta-faktura-pdf-xml.md` fact 3 and H4
     (live 2026-10-16; ust. 1 confirmed identical in the 2026 t.j.); `jak-odebrac-fakture-ksef.md`
     fakt 2 (ust. 2).
   - Tier 1. Confidence: HIGH. Checked: KB. Ania: yes.
   - Offline: issue date = P_1 (art. 106nda ust. 10), receipt = day of KSeF number (ust. 11)
     (`awaria-ksef-offline.md` fakt 4). Tier 1. HIGH.

3. **Brak edycji; jedyną formą poprawienia jest faktura korygująca wystawiona przez sprzedawcę.**
   - Verbatim ([CZ2] pkt 1.6.2, s. 18): „Jedyną formą poprawienia błędu w wystawionej fakturze lub
     jej uzupełnienia jest wystawienie faktury korygującej w KSeF. Od 1 lutego 2026 r. nie
     funkcjonują już również noty korygujące. Zatem w przypadku zidentyfikowania pomyłki w
     wystawionej fakturze jedyną formą jej korekty jest faktura korygującą wystawiona przez
     podatnika – wystawcę faktury pierwotnej."
   - KB: `nota-korygujaca-ksef.md` header block (live 2026-10-16).
   - Tier 2 (MF guidance). Confidence: HIGH. Checked: KB. Ania: yes.

4. **Podstawa prawna korekty: art. 106j ust. 1.**
   - Verbatim: „W przypadku gdy po wystawieniu faktury: 1) podstawa opodatkowania lub kwota podatku
     wskazana w fakturze uległa zmianie, (…) 5) stwierdzono pomyłkę w jakiejkolwiek pozycji faktury
     – podatnik wystawia fakturę korygującą."
   - Source: [VAT] art. 106j ust. 1, s. 129. KB: `pusta-faktura-pdf-xml.md` H8;
     `faktura-korygujaca-ksef.md` (live 2026-10-17). [CZ2] 6.3 (06.08.2026, s. 97–98) cites it:
     seller „jest zobowiązany na podstawie art. 106j ust. 1 ustawy do wystawienia faktury
     korygującej".
   - Related: art. 106j ust. 2 pkt 2a requires the KSeF number of the corrected invoice „z wyjątkiem
     faktur korygujących wystawianych do faktur, dla których nie został nadany numer"
     (`faktura-korygujaca-ksef.md` fact 1). Korekta = różnice (art. 106j ust. 2 pkt 5; [CZ2]
     2.13.2).
   - Tier 1. Confidence: HIGH. Checked: KB. Ania: yes (one-line legal basis).

5. **Brak anulowania i usuwania; faktura weszła do obrotu prawnego.**
   - KB extract text ([CZ2] pkt 1.6.3 „Brak możliwości anulowania lub usunięcia wystawionej
     faktury"): „Po nadaniu numeru KSeF — faktura weszła do obrotu prawnego. Brak anulowania nawet
     przy błędnym nabywcy → należy wystawić korektę „do zera" + nową fakturę pierwotną." „Podatnicy
     nie mogą samodzielnie usuwać faktur."
   - KB: `podrecznik-ksef-20-czesc-ii.md` §1.6.3; 06.08.2026 ed. p. 19 per `nota-korygujaca-ksef.md`
     header (paraphrase there, no full verbatim).
   - Tier 2. Confidence: HIGH. Checked: KB. Ania: yes.

6. **API KSeF nie ma operacji usunięcia ani zmiany faktury.**
   - `open-api.json` (main): the only DELETE operations are `/auth/sessions/current`,
     `/auth/sessions/{referenceNumber}`, `/permissions/common/grants/{permissionId}`,
     `/permissions/authorizations/grants/{permissionId}`, `/tokens/{referenceNumber}` and three
     `/testdata/...` endpoints. No DELETE/PUT/PATCH on any invoice path. `api-changelog.md` (to
     2.9.0) records no invoice withdrawal/deletion.
   - Source: [API] `open-api.json`, `api-changelog.md`. Tier 2 (MF technical docs). Confidence: HIGH
     (absence in spec; MF does not state it in words). Checked: **LIVE 2026-10-20**. Ania: no (too
     technical; at most „nie ma takiej funkcji także w API").

7. **Przechowywanie: 10 lat od końca roku wystawienia; art. 112 i 112a nie stosuje się w tym
   okresie.**
   - KB extract text ([CZ2] pkt 7): „Okres przechowywania: 10 lat od końca roku wystawienia. W tym
     okresie nie stosuje się art. 112 i 112a ustawy (brak obowiązku przechowywania we własnym
     zakresie)." Przykład MF: „Wysyłka 5.02.2026 → przechowywanie w KSeF do 31.12.2036. Podatnik
     pobiera fakturę najpóźniej do 31.12.2036 → przechowuje poza KSeF do przedawnienia."
   - Also [CZ2] 1.6.3, s. 19 (06.08.2026): „Faktury wystawione w KSeF są przechowywane w systemie
     przez okres 10 lat od końca roku, w którym faktura została wystawiona"
     (`nota-korygujaca-ksef.md` header, live 2026-10-16). [NP] pyt. 21: 10 years
     (`mf-faq-podreczniki-2026.md` fakt 1, paraphrase).
   - The KB does **not** cite the statutory article that sets the 10-year KSeF storage period. Do
     not attribute it to a specific article.
   - Tier 2 / 3. Confidence: HIGH. Checked: KB. Ania: yes.
   - Stored there are also offline invoices after sending ([CZ2] 7).

### B. Plik odrzucony, plik niewysłany

8. **Odrzucony plik nie ma numeru KSeF = faktura nie została wystawiona; popraw i wyślij ponownie.**
   - Verbatim ([CZ2] pkt 1.6.1, s. 18, 06.08.2026 ed.): „W przypadku negatywnej weryfikacji system
     nie przydziela numeru KSeF faktury. Oznacza to, że faktura nie została wystawiona. Należy więc
     zweryfikować poprawność wprowadzonych danych i ponowić wysyłkę."
   - KB: `ksef-scisla-walidacja-xml.md` fakt 11; `awaria-ksef-offline.md` fakt 5. Not re-checked in
     this run.
   - Przesłanki odrzucenia per [CZ2] 1.6.1 (KB extract): niezgodność ze wzorem, brak uprawnień, P_1
     z przyszłości, załącznik bez zgłoszenia w e-US. API adds: XML rules (UTF-8 bez BOM, brak
     instrukcji przetwarzania, niezalecane znaki Unicode; PROD od 2026-10-19), duplikat (440), NIP
     checksum for Podmiot1/2/3 on PROD only, size limits ([API] `weryfikacja-faktury.md`, **LIVE
     2026-10-20**; strict XML date per `ksef-scisla-walidacja-xml.md`).
   - KSeF does not check arithmetic: a wrong VAT amount gets a number and needs a korekta ([CZ2]
     1.6.1 WAŻNE, KB extract).
   - Batch: invalid files rejected individually, valid ones get numbers ([CZ2] 3.3.2); rejected
     invoices listed via GET `/sessions/{referenceNumber}/invoices/failed` ([API]
     `sesja-sprawdzenie-stanu-i-pobranie-upo.md`, **LIVE 2026-10-20**: „Zwraca łączną liczbę
     odrzuconych faktur w sesji oraz szczegółowe informacje (status i szczegóły błędów)…").
   - Tier 2. Confidence: HIGH. Ania: yes (core of the „odrzucona" case; skip endpoint).

9. **Numer faktury po odrzuceniu.** KB extract text ([CZ2] 1.6.7): „KSeF nie weryfikuje ciągłości
   numeracji ani prawidłowości numerowania. Dopuszcza się sytuację, gdy faktura o numerze
   wcześniejszym została przesłana do KSeF później niż faktury o numerach późniejszych (np. z powodu
   odrzucenia i ponownej wysyłki)." Tier 2. HIGH. Checked: KB. Ania: yes.
   - Whether the **same P_2** may be reused after rejection: not stated in words. [API] says
     duplicates are detected „w oparciu o dane przechowywane w systemie" (LIVE 2026-10-20), and
     [CZ2] 1.6.7 describes resending; reuse is implied. Confidence: MEDIUM (implied).

10. **Faktura offline odrzucona technicznie: korekta techniczna (API).**
    - [API] `offline/korekta-techniczna.md`
      (https://github.com/CIRFMF/ksef-api/blob/main/offline/korekta-techniczna.md) (20.08.2025),
      **LIVE 2026-10-20**: allows resending an offline invoice that was „**odrzucona** z powodu
      błędów technicznych, np.: niezgodność ze schematem, przekroczenie dopuszczalnego rozmiaru
      pliku, duplikat faktury, inne błędy walidacji technicznej uniemożliwiające nadanie numeru
      KSeF". Limits: „nie dotyczy sytuacji związanych z brakiem uprawnień", „nie jest dozwolona
      korygowanie treści faktury", interactive session only, not allowed if „została już przyjęta
      inna prawidłowa korekta". Sent with `offlineMode: true` and `hashOfCorrectedInvoice`; the old
      QR I then leads to the corrected invoice.
    - Not in the KB before this run; [CZ2] extract mentions „korekta techniczna" only as the
      exception for attachments in interactive sessions (3.3.1).
    - Tier 2 (MF technical docs). Confidence: HIGH. Ania: no (her software does it; at most „Twój
      program ponownie wyśle poprawiony plik"). Aplikacja Podatnika issues only online invoices
      ([NP] pyt. 11, `mf-faq-podreczniki-2026.md` fakt 1), so Ania in AP will not meet this case.
    - Legal effect of rejection after the art. 106nda ust. 2 deadline: NOT SETTLED
      (`awaria-ksef-offline.md` fakt 5, open question 4). Do not state.

11. **Faktura offline jeszcze niewysłana: UNVERIFIED.** KB holds: offline24 must be sent
    „niezwłocznie, nie później niż w następnym dniu roboczym po dniu jej wystawienia" (art. 106nda
    ust. 2); issue date = P_1 (ust. 10); buyer with Polish NIP receives it only in KSeF (ust. 3)
    (`awaria-ksef-offline.md` fakty 3–4, 6). No KB source says whether an offline invoice that has
    been issued (and perhaps handed to the buyer with QR codes) but not yet sent may be withdrawn,
    destroyed or not sent at all. **Do not answer.** Confidence: n/a. Ania: marginal (AP has no
    offline).

### C. Błędy, które poprawia korekta

12. **Błędny NIP nabywcy: korekta „do zera" + nowa faktura; nie poprawiać NIP na inny.**
    - Verbatim ([CZ2] 1.6.4, s. 19–20): „nie należy wystawiać faktury korygującej błędny numer NIP
      na inny prawidłowy" (`nota-korygujaca-ksef.md` header, live). KB extract: 1. korekta „do zera"
      z błędnym NIP, 2. nowa faktura pierwotna z prawidłowym NIP.
    - [XSD] `Podmiot2K`: „Korekcie nie podlegają błędne numery NIP identyfikujące nabywcę oraz
      dodatkowego nabywcę - wówczas wymagana jest korekta faktury do wartości zerowych"
      (`nota-korygujaca-ksef.md` fact 9). Same for seller NIP (`Podmiot1K`, fact 11).
    - Tier 2. HIGH. Checked: KB. Ania: yes. Link
      `/blog/faktura-korygujaca-ksef#korekta-do-zera-gdy-nip-nabywcy-jest-pomylony`.

13. **Inne dane (nazwa, adres, kwoty, stawka, data, numer faktury) poprawia korekta.** Nabywca:
    `Podmiot2K` (dane sprzed korekty) ([CZ2] 2.13.8; [XSD]); błędny numer faktury: `NrFaKorygowany`
    ([XSD], `nota-korygujaca-ksef.md` fact 13). Tier 2. HIGH. Checked: KB. Ania: yes (plain language
    only).

14. **Faktura testowa wysłana na produkcję = pełnoprawna faktura; niezwłocznie korekta „do zera".**
    Verbatim ([CZ2] 3.2.3, s. 66–67): „Niedopuszczalne jest przesyłanie faktur testowych do
    środowiska produkcyjnego, gdyż w przypadku wysyłki zakończonej sukcesem i nadaniem numeru KSeF
    jest to równoznaczne z wystawieniem pełnoprawnej faktury, która w istocie nie dokumentuje żadnej
    transakcji. Skutkować to może obowiązkiem zapłaty podatku, wynikającym z treści art. 108
    ustawy." KB: `pusta-faktura-pdf-xml.md` H5 (live 2026-10-16). Tier 2 (art. 108 Tier 1). HIGH.
    Ania: yes (common fear).

15. **Środowisko testowe / demo: dokumenty nie są fakturami.** KB extract ([CZ2] 3.2.1): „Dokumenty
    nie są fakturami i nie wywołują skutków prawnych."; demo (3.2.2): „Dokumenty bez skutków
    prawnych." Tier 2. HIGH. Checked: KB. Ania: yes (test URL in CLAUDE.md:
    https://ap-test.ksef.mf.gov.pl/web/).

16. **Korekta „do zera" nie anuluje faktury; obie zostają w KSeF.** [CZ2] 1.6.3, 7;
    `nota-korygujaca-ksef.md` misconception 6; „na zawsze" overstates, it is 10 years
    (`faktura-korygujaca-ksef.md` fact 8). Tier 2. HIGH. Ania: yes.

17. **Noty korygujące: nie funkcjonują od 1.02.2026, także dla faktur poza KSeF.**
    - Art. 106k uchylony (art. 1 pkt 15 ustawy z 16.06.2023, Dz.U. 2023 poz. 1598; [VAT] „Art. 106k.
      (uchylony)"), with no carve-out for paper, cash-register or B2C invoices. Transitional art. 15
      of the 2023 act covers only notes issued before 1.02.2026 (former art. 106k ust. 2 / 106l
      apply).
    - [CZ2] 1.6.2 (fact 3). [FAQ] (section „KSeF w JST"): „Z chwilą obowiązywania KSeF nabywca nie
      będzie mógł wystawiać not korygujących."
    - There is **no** buyer-side note left in the KB: the buyer reports the error to the seller
      outside KSeF ([CZ2] 6.3), the seller issues the korekta. Noty księgowe/obciążeniowe/uznaniowe
      still exist but are not sent to KSeF ([CZ2] 1.1; [FAQ] „KSeF nie likwiduje not księgowych").
    - KB: `nota-korygujaca-ksef.md` facts 1–4, 19 (live 2026-10-16). Tier 1 + 2 + 3. HIGH. Checked:
      KB. Ania: yes. Self-billing corrections: cz. III not extracted, NOT SETTLED.
    - URL for the 2023 act as in KB: https://api.sejm.gov.pl/eli/acts/DU/2023/1598/text.pdf

### D. Duplikat

18. **Ta sama faktura wysłana drugi raz (ten sam NIP sprzedawcy + P_2 + RodzajFaktury): KSeF ją
    odrzuca, kod 440 „Duplikat faktury"; unikalność przez 10 lat.**
    - [API] `weryfikacja-faktury.md` (09.04.2026), **LIVE 2026-10-20**: „KSeF wykrywa duplikaty
      faktur globalnie, w oparciu o dane przechowywane w systemie." „W przypadku duplikatu zwracany
      jest kod błędu 440 („Duplikat faktury”)." „Unikalność faktury utrzymywana jest w KSeF przez
      okres 10 pełnych lat, liczonych od końca roku kalendarzowego, w którym faktura została
      wystawiona." Same in [CZ2] 3.4 (KB extract).
    - Consequence: the second copy gets no number, so there is nothing to delete. Tier 2. HIGH.
      Ania: yes.
    - **Same sale sent twice under two different numbers (P_2)**: both pass the check; the KB has
      **no** MF statement on how to fix it. Applying fact 14 (korekta „do zera" of an invoice that
      documents no transaction) is an inference. NOT SETTLED; do not present as MF rule.
    - Not to confuse with [CZ2] 1.8 „Skutki podwójnie wystawionej faktury" (PDF outside KSeF + the
      same invoice in KSeF: buyer receipt date), `faktura-poza-ksef-odliczenie-vat.md` §E.
    - Note: API code 440 is also listed in the changelog as „Sesja anulowana" (session status, not
      invoice) — different context (`api-changelog.md`, LIVE). Do not mention in the post.

### E. Faktura, której nie chcesz (otrzymana przez pomyłkę lub fałszywa)

19. **Nabywca nie może odrzucić ani zaakceptować faktury; spory poza systemem.** Verbatim ([CZ2]
    6.3, s. 97–98, 06.08.2026): „KSeF nie posiada opcji zatwierdzania lub odrzucania faktur po
    otrzymaniu ich przez nabywcę. Wyjaśnienie ewentualnych wątpliwości co do zasadności wystawienia
    danej faktury, zidentyfikowanych w niej błędów czy rozstrzygnięcie potencjalnych sporów pomiędzy
    sprzedawcą a nabywcą odbywa się całkowicie poza systemem." Also 6.1: „W okresie obligatoryjnym
    nabywca nie może wyrazić braku akceptacji na otrzymanie faktury w KSeF." KB:
    `nota-korygujaca-ksef.md` header (live). Tier 2. HIGH. Ania: yes.

20. **Ukrywanie faktur: tylko zapowiedziane.** [CZ2] 6.3 (06.08.2026): buyer „będzie mógł skorzystać
    ewentualnie z opcji ukrycia faktury", described in cz. III, „wdrożona produkcyjnie kilka
    miesięcy po uruchomieniu KSeF 2.0" (live 2026-10-16 per `nota-korygujaca-ksef.md`). Per our
    guide citing [CZ3] pkt 8: function not yet available; hidden invoice does not disappear from
    KSeF; seller is not informed; MF does not describe tax effects. Status as of 2026-10-20: **not
    re-checked** (cz. III not in KB, ksef.podatki.gov.pl blocked). Tier 2. Confidence: HIGH
    (announced), MEDIUM (mechanics, via our guide). Ania: yes. Hiding ≠ deleting.

21. **Zgłoszenie nadużycia (fałszywa faktura): przycisk „Zgłoszenie nadużycia" w Aplikacji
    Podatnika; zgłoszenia trafiają do KAS; faktury wystawionej przez pomyłkę nie zgłasza się jako
    fałszywej.** Source: [CZ3] pkt 7 via published guide `/guides/jak-odebrac-fakture-ksef` („Błędna
    lub podejrzana faktura"); `falszywe-faktury-ksef.md` fakt 13. cz. III NOT extracted in KB; not
    live. Note: the 06.08.2026 [CZ2] 6.3 **no longer mentions** scam reporting (it did in 01.02.2026
    ed.). Whether reporting removes the invoice: **not stated** (`faktury-scamowe.md` misconception
    3, „STATUS UNKNOWN"). Tier 2. MEDIUM. Ania: yes, but link `/blog/falszywe-faktury-ksef` instead
    of repeating.

### F. Faktury poza KSeF

22. **Faktury poza KSeF: KB has no rule on cancelling them. NOT IN KB.** A search of
    `docs/knowledge-base/` for „anul" finds only KSeF-context statements; nothing on paper/PDF
    invoices issued under art. 145m (10 000 zł/month, „faktury elektroniczne lub papierowe", until
    31.12.2026), art. 145n (cash-register invoices, until 31.12.2026), or B2C invoices outside KSeF
    (art. 106ga ust. 2 pkt 4). What the KB does settle: such invoices are also corrected by a
    corrective invoice (art. 106j ust. 1 applies to every invoice; the FA(3) korekta of an invoice
    without a KSeF number uses `NrKSeFN` = 1, [CZ2] 2.13.6, 4.1.3), and no nota korygująca exists
    for them (fact 17). **Do not write** that paper invoices „can be cancelled under general rules"
    or that they cannot; flag for a future source (Objaśnienia / FAQ).
    - B2C invoice issued voluntarily in KSeF: it has a KSeF number, so facts 3–7 apply (B2C in KSeF
      is voluntary, `faktura-dla-osoby-prywatnej-ksef.md` fact 2). Confidence: HIGH (combination of
      two KB facts, no inference about cancellation).

---

## Unsettled Questions

- Withdrawing / not sending an offline invoice already issued (fact 11).
- Same sale sent twice under different P_2 numbers: MF fix not stated (fact 18).
- Cancelling paper/PDF/B2C invoices outside KSeF (fact 22).
- Effect of rejecting an offline invoice after the art. 106nda ust. 2 deadline (fact 10).
- Current status of hiding / reporting in AP (facts 20–21): cz. III not extracted, not re-checked.
- Statutory article for the 10-year KSeF storage period (fact 7): not in KB.
- [FAQ] „Q6" (cannot edit/delete) in `aplikacja-podatnika-ksef-pierwsza-faktura.md` fact 12: that
  brief's table lists FAQ KSeF 2.0 with the date of „Najczęstsze pytania" (29.04.2026); which page
  holds Q6 is unclear. Cite [CZ2] instead.

## Suggested Sources Section

- Ustawa o VAT, t.j. Dz.U. 2026 poz. 1263, art. 2 pkt 32a, 106j ust. 1, 106na ust. 1 i 3:
  https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf
- Podręcznik KSeF 2.0, cz. II, pkt 1.6.1–1.6.4, 1.6.7, 3.2.3, 6.3, 7:
  https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
- Podręcznik KSeF 2.0, cz. III, pkt 7–8 (only if facts 20–21 are used):
  https://ksef.podatki.gov.pl/media/3ikdk3qm/podrecznik-ksef-20-cz-iii-dodatkowe-funkcjonalnosci-ksef-06082026.pdf
- MF „Najczęstsze pytania", pyt. 21 (przechowywanie):
  https://ksef.podatki.gov.pl/ksef-news/najczestsze-pytania/
- KSeF API, weryfikacja faktury (duplikat 440):
  https://github.com/CIRFMF/ksef-api/blob/main/faktury/weryfikacja-faktury.md

Internal links: `/blog/faktura-korygujaca-ksef` (primary), `/blog/nota-korygujaca-ksef`,
`/blog/falszywe-faktury-ksef`, `/blog/najczestsze-bledy-walidacji-fa3` (rejected files),
`/blog/ksef-scisla-walidacja-xml`, `/guides/awaria-ksef-offline`,
`/guides/jak-odebrac-fakture-ksef`, `/blog/ksef-limit-10000-zl`,
`/blog/faktura-dla-osoby-prywatnej-ksef`.

## Warning: Common Misconceptions

1. „Korektą do zera anulujesz / usuwasz fakturę" — no; both stay in KSeF for 10 years (facts 5, 7,
   16).
2. „Faktury zostają w KSeF na zawsze" — 10 years from end of the issue year (fact 7).
3. „Odrzuconą fakturę trzeba skorygować" — no; without a KSeF number it was not issued; fix and
   resend (fact 8). Conversely: KSeF does not catch arithmetic errors, so an accepted invoice with a
   wrong VAT amount needs a korekta.
4. „Błędny NIP poprawię korektą danych nabywcy" — no; korekta „do zera" + nowa faktura (fact 12).
5. „Nabywca może wystawić notę korygującą / odrzucić fakturę" — no (facts 17, 19).
6. „Ukryta faktura znika z KSeF" / „ukrywanie już działa" — announced only; hidden ≠ deleted (fact
   20).
7. „Faktura wysłana na testowe środowisko jest ważna" / „testowa na produkcji się nie liczy" —
   reversed: test env = no legal effect; production with a number = full invoice (facts 14–15).

## Freshness

2026-10-20. Review when: a new cz. II / cz. III edition appears; hiding/reporting goes live in AP;
after 31.12.2026 (art. 145m/145n expiry, fact 22 scope shrinks); new API version adding invoice
operations (check `open-api.json`).
