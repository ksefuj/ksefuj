# Research Brief: PDF inny niż XML: ryzyko „pustej faktury"

**Requested by:** Orchestrator (backlog item `pusta-faktura-pdf-xml`, `docs/content-backlog.md`)
**Date:** 2026-10-15 **For content:** blog post „PDF inny niż XML: ryzyko pustej faktury"
**Personas:** K (Pani Krystyna, księgowa), M (Marek, developer) **Backlog note:** „official source
UNVERIFIED". This brief confirms that note for the central claim (see NOT SETTLED, item 1).

**Provenance:** built only from the repo knowledge base. Baseline per
`docs/knowledge-base/WATCHLIST.md` (last checked 2026-10-07): VAT Act consolidated text Dz.U. 2026
poz. 1263; Podręcznik KSeF 2.0 cz. I–IV and the AP manual, editions of 2026-08-06. No official host
was fetched in this run (ksef.podatki.gov.pl, isap.sejm.gov.pl, api.sejm.gov.pl, gov.pl are blocked
by the container proxy with 403, as recorded in `jak-odebrac-fakture-ksef.md` and
`falszywe-faktury-ksef.md`). The KB extract of Podręcznik cz. II (`podrecznik-ksef-20-czesc-ii.md`)
is a condensed Polish summary of the **2026-02-01** edition, not a transcript: its lines are quoted
below as „KB extract text" (near-verbatim), section numbers are from that edition. The 2026-08-06
edition was judged to differ only in legal-basis citations and pkt 6.3 (`mf-faq-podreczniki-2026.md`
fact 3, MEDIUM). Our own published content is not used as a source.

**Live verification, 2026-10-16 (constitutional judge).** The sources below were fetched live and
read in full for the cited points: [CZ2] 06.08.2026 PDF (pdftotext), [VAT] Dz.U. 2026 poz. 1263 PDF
(Obwieszczenie Marszałka Sejmu of 1.09.2026, legal state as of 26.08.2026), [FAQ] HTML, [AP]
06.08.2026 PDF, [PDFGEN] (HTTP 200). Verbatim extracts are in section **H** below; facts whose
wording or verdict changed are marked „VERIFIED 2026-10-16". Where a fact below still says „KB
extract text", section H supersedes it.

**URLs used (all already in the KB):**

- [CZ2] Podręcznik KSeF 2.0 cz. II (06.08.2026):
  https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
- [VAT] Ustawa o VAT, t.j. Dz.U. 2026 poz. 1263:
  https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf (ISAP:
  https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260001263)
- [VAT2025] Ustawa o VAT, t.j. Dz.U. 2025 poz. 775 (read in full 2026-08-12 in
  `kurs-waluty-art-31a.md`): https://api.sejm.gov.pl/eli/acts/DU/2025/775/text/T/D20250775L.pdf
- [NP] MF „Najczęstsze pytania": https://ksef.podatki.gov.pl/ksef-news/najczestsze-pytania/
- [FAQ] MF FAQ KSeF 2.0: https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20/
- [AP] Podręcznik użytkownika Aplikacji Podatnika KSeF 2.0 (06.08.2026):
  https://ksef.podatki.gov.pl/media/qocjn3ai/podrecznik-uzytkownika-aplikacji-podatnika-ksef-20_06082026.pdf
- [FA3] Broszura FA(3):
  https://ksef.podatki.gov.pl/media/nuclnu0w/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf
- [PDFGEN] MF official visualisation generator (WATCHLIST):
  https://github.com/CIRFMF/ksef-pdf-generator

---

## Target query

„pusta faktura KSeF"

## Answer in two sentences

Gdy podatnik wystawia fakturę w KSeF, fakturą jest plik XML FA(3), któremu KSeF nadał numer
(e-Faktura, Podręcznik KSeF 2.0 cz. II pkt 1.1), a PDF/wydruk przekazany poza KSeF to jego
wizualizacja, która według MF musi być spójna z XML i nie może mu przeczyć (cz. II pkt 1.6.5);
nabywca krajowy z NIP otrzymuje fakturę wyłącznie w KSeF (cz. II pkt 6.2). Błąd w XML, który już ma
numer KSeF, poprawia tylko sprzedawca fakturą korygującą, bo faktury nie da się edytować, usunąć ani
odrzucić (cz. II pkt 1.6.2, 1.6.3, 6.3), natomiast żaden dokument MF w bazie nie nazywa rozbieżnego
PDF „pustą fakturą" i nie rozstrzyga, który dokument przeważa przy rozbieżności (NOT SETTLED).

## What changes the answer

- **Kim jest nabywca.** Nabywca krajowy z NIP w `Podmiot2/DaneIdentyfikacyjne/NIP` dostaje fakturę w
  KSeF, data otrzymania = dzień nadania numeru KSeF (art. 106na ust. 3; cz. II pkt 5.1). Nabywca z
  art. 106gb ust. 4 (konsument, bez NIP, zagraniczny, SME z UE) dostaje fakturę w sposób uzgodniony,
  z kodem QR; data otrzymania = faktyczne otrzymanie (art. 106na ust. 4; cz. II pkt 5.1, 5.3.1).
  Facts 6, 7, 13.
- **Tryb wystawienia.** Online: jeden kod QR z numerem KSeF; offline (bez numeru): dwa kody QR
  („OFFLINE" + „CERTYFIKAT"); przed nadaniem numeru nabywca z NIP może dostać tylko „potwierdzenie
  transakcji" (cz. II pkt 1.6.5, 1.6.6). Facts 4, 8.
- **Czy sprzedawca w ogóle wystawia w KSeF.** Do 31.12.2026 sprzedawca w limicie 10 000 zł (art.
  145m) lub z kasy (art. 145n) może wystawić fakturę papierową / PDF poza KSeF; wtedy PDF jest
  fakturą elektroniczną (art. 2 pkt 32), a nie wizualizacją (cz. II pkt 1.1, 1.7). Fact 2.
- **Data:** kary z art. 106ni od 1.01.2027 w ustawie; MF zapowiada przesunięcie do końca 2027 r.,
  projekt UD477 (nieuchwalony) do 1.01.2028 (`sankcje-ksef-ud477.md`). Not central here.

---

## Key Facts (ready to use)

### A. Co jest fakturą

1. **e-Faktura (faktura ustrukturyzowana) = faktura wystawiona przy użyciu KSeF wraz z przydzielonym
   numerem; format XML, FA(3) od 1.02.2026.** KB extract text: „Faktura ustrukturyzowana (e-Faktura)
   — faktura wystawiona przy użyciu KSeF wraz z przydzielonym numerem identyfikującym ją w
   systemie"; cechy: „Wystawiana i otrzymywana przy użyciu KSeF", „Format pliku XML", „Posiada
   przydzielony numer KSeF".
   - Source: [CZ2] pkt 1.1. Tier 2 (MF guidance). Confidence: HIGH. K: yes, M: yes.
   - Statute: art. 2 pkt 32a is **not quoted anywhere in the KB**. Only a paraphrase of [NP] pyt. 4
     exists: dokument wystawiony poza systemem „nie spełnia definicji faktury ustrukturyzowanej
     (art. 2 pkt 32a)" (`kary-ksef-2027-2028.md` fact 13). Cite art. 2 pkt 32a only as a pointer,
     not as a quote.

2. **Faktura elektroniczna (art. 2 pkt 32) ≠ faktura ustrukturyzowana.** KB extract text: „Faktura
   elektroniczna nie musi być wystawiana przy użyciu struktury FA, nie jest przesyłana do KSeF, może
   być dowolnym plikiem (np. PDF) przesyłanym e-mailem."
   - Source: [CZ2] pkt 1.1. Tier 2. Confidence: HIGH. K: yes.

3. **Data wystawienia e-Faktury online = dzień przesłania do KSeF.** Verbatim (art. 106na ust. 1):
   „Fakturę ustrukturyzowaną uznaje się za wystawioną w dniu jej przesłania do Krajowego Systemu
   e-Faktur."
   - Source: [VAT2025] art. 106na ust. 1, s. 133 (quoted in `kurs-waluty-art-31a.md`; text of Dz.U.
     2025 poz. 775, not re-read against Dz.U. 2026 poz. 1263). Tier 1. Confidence: HIGH (MEDIUM on
     identical wording in the 2026 t.j.). [CZ2] pkt 1.4 adds the P_1 condition (P_1 earlier →
     offline24; P_1 in the future → rejection).

4. **Numer KSeF nie jest elementem faktury (pliku XML).** KB extract text: „Numer KSeF nie jest
   elementem faktury. FA(3) nie zawiera pola na numer KSeF." Zwracany w UPO.
   - Source: [CZ2] pkt 4.1; [NP] Q7 (`mf-faq-podreczniki-2026.md` fact 1). Tier 2/3. Confidence:
     HIGH. M: yes (the PDF/QR carries the number; the XML never does).

### B. Wizualizacja / faktura przekazana poza KSeF (cz. II pkt 1.6.5)

5. **Zawartość faktury poza KSeF: spójność z XML, czytelność, brak sprzeczności.** KB extract text:
   „Zawartość faktury poza KSeF: Spójność z plikiem XML w KSeF; Czytelność dokumentu; Brak
   sprzeczności z zawartością pliku XML."
   - Source: [CZ2] pkt 1.6.5 („Faktura wydana w sposób uzgodniony lub użyta poza KSeF"; updated in
     the February 2026 edition per its change log). Tier 2 — MF guidance, not a statutory rule.
     Confidence: HIGH that MF says this. K: yes, M: yes.
   - Note: the KB does not record which statutory provision, if any, MF links to this requirement.

6. **Dodatkowe dane i język.** KB extract text: „Wizualizacja może zawierać dodatkowe dane (logo,
   kontakt BOK), które nie mają znaczenia systemowego." „Plik XML może być w języku polskim, a
   faktura udostępniona nabywcy poza KSeF — w języku obcym lub dwujęzycznie. Kluczowa jest
   merytoryczna zgodność."
   - Source: [CZ2] pkt 1.6.5; also [FAQ] Q16 per `aplikacja-podatnika-ksef-pierwsza-faktura.md` fact
     13 (paraphrase: visualisation may be in another language if consistent with XML; no verbatim in
     KB; FAQ Q numbers unreliable). Tier 2/3. Confidence: HIGH.

7. **MF nie zaleca danych płatności tylko na wizualizacji.** KB extract text: „Nie jest zalecane
   przesyłanie do KSeF pliku XML z tylko podstawowymi danymi, a dodatkowych informacji (termin
   płatności, nr rachunku) tylko na wizualizacji. Utrudnia to automatyzację. MF zachęca do pełnego
   wykorzystywania struktury FA(3): DodatkowyOpis, Platnosc, Rozliczenie, WarunkiTransakcji."
   - Source: [CZ2] pkt 1.6.5 (marked „WAŻNE"). Tier 2 recommendation („nie jest zalecane"), not a
     prohibition. Confidence: HIGH. M: yes (strong validator/generator fit).

8. **Kody QR na fakturze poza KSeF.** KB extract text: „Tryb ONLINE → jeden kod QR z numerem KSeF";
   „Tryb OFFLINE (nieprzesłana do KSeF) → dwa kody QR: „OFFLINE" + „CERTYFIKAT"". Dla nabywców z
   art. 106gb ust. 4: „Faktura poza KSeF → obowiązkowy kod/kody QR." Gdy format uniemożliwia
   naniesienie kodu (np. EDI) → „można przesłać odrębny link/kod QR wraz z odpowiednimi
   oznaczeniami".
   - Source: [CZ2] pkt 1.6.5, 5.3.1, 5.4.1, 5.4.4. Tier 2. Confidence: HIGH.

9. **Adnotacje na wizualizacji: tylko gdy występują.** KB extract text: „Jeśli adnotacja nie
   występuje (np. P_16 = „2"), nie trzeba umieszczać na wizualizacji informacji o jej braku.
   Obowiązek zamieszczenia adnotacji istnieje tylko gdy adnotacja występuje (np. P_16 = „1" →
   „metoda kasowa")."
   - Source: [CZ2] pkt 1.6.5. Tier 2. Confidence: HIGH. M: yes.

10. **MF publikuje oficjalny generator wizualizacji.** `CIRFMF/ksef-pdf-generator` is listed in the
    WATCHLIST as „Changes to the official invoice visualisation"; release 1.1.40 noted in CHANGELOG.
    - Source: [PDFGEN]; `WATCHLIST.md`, `CHANGELOG.md`. Tier 3 at best (GitHub). Confidence: MEDIUM
      (the KB holds no extract of what the generator renders or whether MF requires its use). M:
      yes.

### C. Nabywca krajowy z NIP

11. **Sprzedawca objęty obowiązkiem nie wydaje faktur poza KSeF nabywcom krajowym z NIP; może wydać
    potwierdzenie transakcji.** KB extract text: „Sprzedawcy objęci obowiązkiem KSeF od 1.02.2026
    nie wydają faktur poza systemem nabywcom krajowym z NIP (ale mogą wydawać potwierdzenia
    transakcji)."
    - Source: [CZ2] pkt 6.2. Tier 2. Confidence: HIGH. K: yes.
    - **VERIFIED 2026-10-16, caveat:** pkt 6.2 (06.08.2026) is about the Feb–Apr 2026 transition and
      reads „poza przesłaniem faktury do KSeF, nie wydają faktury poza systemem nabywcom krajowym
      posiadającym identyfikator podatkowy NIP". Pkt 1.6.6 (ONLINE, number assigned, NIP buyer) says
      the opposite for a copy: „sprzedawca może dodatkowo wydać nabywcy fakturę poza KSeF np. wydruk
      tej faktury lub plik pdf, pamiętając o opatrzeniu tego dokumentu kodem QR". Do not write that
      sellers „do not issue" PDFs to NIP buyers without the 1.6.6 qualification. FAQ „Wystawianie i
      otrzymywanie faktur" pyt. 50: other channels such as e-mail „mają jedynie charakter pomocniczy
      i techniczno-organizacyjny. Z przepisów podatkowych nie wynika obowiązek równoległego
      udostępniania faktury w formacie XML lub jako wizualizacji poza KSeF."

12. **Potwierdzenie transakcji to nie dokument podatkowy.** KB extract text: „Potwierdzenie
    transakcji — propozycja biznesowa, nie dokument podatkowy. Korzystanie dobrowolne." Offline bez
    numeru + nabywca krajowy z NIP → „potwierdzenie transakcji z dwoma kodami QR (nabywca otrzyma
    fakturę wyłącznie w KSeF)".
    - Source: [CZ2] pkt 1.6.6 (s. 22–26 of the 06.08.2026 edition per `awaria-ksef-offline.md` fact
      6). Tier 2. Confidence: HIGH.

13. **Nabywca z NIP otrzymuje fakturę w KSeF automatycznie; data otrzymania = dzień nadania numeru
    KSeF.** KB extract text: „Art. 106na ust. 3 — data otrzymania = dzień przydzielenia numeru
    KSeF." „Art. 106na ust. 4 — dla nabywców z art. 106gb ust. 4 (…) = data faktycznego otrzymania
    poza KSeF." Warunek: NIP nabywcy w polu NIP (nie NrVatUE ani NrID).
    - Source: [CZ2] pkt 5 (wstęp), 5.1, 5.2; [VAT] art. 106na ust. 3–4 (paraphrased by MF; **no
      verbatim of art. 106na ust. 3–4 in the KB**). Tier 1 via Tier 2. Confidence: HIGH.

14. **Faktura offline24 przekazana nabywcy poza KSeF przed wysłaniem = „działanie nieprawidłowe
    sprzedawcy".** KB extract text: „Jeśli nabywca otrzymał dokument poza KSeF przed przesłaniem do
    KSeF (działanie nieprawidłowe sprzedawcy), nabywa prawo odliczenia w dacie faktycznego
    otrzymania."
    - Source: [CZ2] pkt 1.8. Tier 2. Confidence: HIGH. The only KB passage where MF attaches a
      consequence to a document handed over outside KSeF in addition to the KSeF invoice; it
      concerns timing of deduction, not content mismatch.

### D. Skutki podatkowe faktury z numerem KSeF i „pusta faktura" w ustawie

15. **VERIFIED 2026-10-16, wording corrected: MF says a test invoice accepted in production „w
    istocie nie dokumentuje żadnej transakcji" and this „Skutkować to może" (MAY result in) a duty
    to pay tax under art. 108, not that it does.** See H5. Original KB summary: **Faktura przyjęta z
    numerem KSeF = pełnoprawna faktura → obowiązek zapłaty podatku (art. 108); błąd → niezwłocznie
    korekta „do zera".** KB extract text: „Niedopuszczalne jest przesyłanie faktur testowych do
    środowiska produkcyjnego. Faktura przyjęta z numerem KSeF = pełnoprawna faktura → obowiązek
    zapłaty podatku (art. 108). W razie błędu → niezwłocznie korekta „do zera"."
    - Source: [CZ2] pkt 3.2.3 (context: test invoices sent to production). Tier 2. Confidence: HIGH
      for the MF statement. Applying it to other erroneous XML is our extension (MEDIUM).

16. **SUPERSEDED 2026-10-16: art. 108 ust. 1–2 read live, see H2.** Original note: **Art. 108 ust. 1
    — text NOT IN KB.** No KB file quotes art. 108 (only fact 15's pointer „art. 108"). Do not quote
    it; if the post explains it, attribute only „art. 108 ustawy o VAT" via [CZ2] pkt 3.2.3.
    Confidence of any paraphrase beyond fact 15: LOW.

17. **SUPERSEDED 2026-10-16: art. 88 ust. 3a pkt 4 read live, see H1.** Original note: **Art. 88
    ust. 3a pkt 4 lit. a — text NOT IN KB.** `faktury-scamowe.md` (facts 2.1, 2.2) cites art. 88
    ust. 3a as „⚠️ TEXT NOT READ DIRECTLY", MEDIUM, against the superseded Dz.U. 2025 poz. 775;
    `falszywe-faktury-ksef.md` fact 6: „No KB file contains the text of art. 88 ust. 3a or of pkt
    4." What the KB does hold: [NP] pyt. 1 — deduction from an invoice issued outside KSeF despite
    the obligation is kept „pod warunkiem spełnienia przesłanek materialnych odliczenia, o których
    mowa w art. 86 ustawy, oraz niezaistnienia przesłanek negatywnych zgodnie z art. 88 ustawy"
    (`kary-ksef-2027-2028.md` fact 12). Confidence: HIGH for that quote; the „pusta faktura" content
    of art. 88 is unverified.

18. **KSeF nie weryfikuje obliczeń.** KB extract text: „KSeF nie dokonuje weryfikacji obliczeń
    matematycznych. Nie odrzuci faktury z błędami rachunkowymi (np. nieprawidłowa kwota VAT)." KSeF
    checks XSD conformity and permissions (plus P_1 not in the future, attachment registration).
    - Source: [CZ2] pkt 1.6.1. Tier 2. Confidence: HIGH. M: yes (XML with wrong amounts gets a KSeF
      number; validator fit).

### E. Naprawa błędnego XML w KSeF

19. **Brak edycji, anulowania, usuwania; jedyna droga to faktura korygująca; noty korygujące nie
    funkcjonują od 1.02.2026.** KB extract text: „Po przesłaniu do KSeF — brak edycji. Jedyna forma
    poprawienia: faktura korygująca. Od 1 lutego 2026 r. nie funkcjonują już noty korygujące." „Po
    nadaniu numeru KSeF — faktura weszła do obrotu prawnego. Brak anulowania nawet przy błędnym
    nabywcy → należy wystawić korektę „do zera" + nową fakturę pierwotną." „Podatnicy nie mogą
    samodzielnie usuwać faktur."
    - Source: [CZ2] pkt 1.6.2, 1.6.3, 1.6.4; [FAQ] Q6 per
      `aplikacja-podatnika-ksef-pierwsza-faktura.md` fact 12. Tier 2/3. Confidence: HIGH.

20. **Korekta pokazuje różnice.** P_13_x, P_14_x, P_14_xW, P_15 „wypełniane przez różnicę w stosunku
    do faktury pierwotnej" (art. 106j ust. 2 pkt 5); kolejne korekty od stanu po wcześniejszych
    korektach; w DaneFaKorygowanej dane faktury pierwotnej.
    - Source: [CZ2] pkt 2.13.1–2.13.3. Tier 2. Confidence: HIGH. M: yes. Link
      `/blog/faktura-korygujaca-ksef`.

21. **Nabywca nie może odrzucić faktury w KSeF.** KB extract text: „KSeF nie posiada opcji
    zatwierdzania/odrzucania faktur. Spory rozstrzygane poza systemem." Przy błędnym nabywcy:
    korekta „do zera" + nowa faktura; ukrycie / zgłoszenie scamu (cz. III).
    - Source: [CZ2] pkt 6.3 (this section changed in the 06.08.2026 edition; content of the change
      not recorded, `mf-faq-podreczniki-2026.md` fact 3). Tier 2. Confidence: HIGH for no-reject.
    - **VERIFIED 2026-10-16 against the 06.08.2026 text (s. 97–98).** „KSeF nie posiada opcji
      zatwierdzania lub odrzucania faktur po otrzymaniu ich przez nabywcę. Wyjaśnienie (…) błędów
      czy rozstrzygnięcie potencjalnych sporów (…) odbywa się całkowicie poza systemem." Wrong
      buyer: korekta „do zera" + new invoice; the buyer „będzie mógł skorzystać ewentualnie z opcji
      ukrycia faktury (…) opisana w cz. III (…) Zostanie ona wdrożona produkcyjnie kilka miesięcy po
      uruchomieniu KSeF 2.0". Wrong base/tax/any other item: seller „jest zobowiązany na podstawie
      art. 106j ust. 1 ustawy do wystawienia faktury korygującej". The 06.08.2026 pkt 6.3 **does not
      mention reporting scam invoices**; drop „zgłoszenie scamu" when citing pkt 6.3.

### F. Weryfikacja PDF przez nabywcę (QR)

22. **KOD I: zawartość i wyróżnik.** KOD I „zapewnia dostęp do faktury w KSeF i umożliwia
    weryfikację danych"; zawiera adres zasobu, datę wystawienia (P_1), NIP sprzedawcy, wyróżnik
    faktury. Wyróżnik = „Skrót faktury" — ciąg „obliczony na podstawie skrótu kryptograficznego
    SHA-256 pliku XML".
    - Source: [CZ2] pkt 5.4.1, 5.4.3. Tier 2. Confidence: HIGH. M: yes.

23. **Dostęp dwuetapowy.** Krok 1: skan QR → podstawowe dane (nr KSeF, NIP sprzedawcy, data
    wystawienia, skrót dokumentu, data nadania numeru KSeF, typ schemy, tryb wystawienia,
    „informacja o zgodności") „lub informacja o braku faktury w KSeF". Krok 2: P_2, identyfikator
    podatkowy nabywcy lub informacja o braku, P_15 → pobranie XML lub PDF bez uwierzytelnienia;
    kilka błędnych prób → czasowa blokada. Korekta: dane z faktury korygującej.
    - Source: [CZ2] pkt 5.5. Tier 2. Confidence: HIGH. K: yes.

24. **Dostęp anonimowy bez QR (Aplikacja Podatnika, bez logowania):** numer KSeF, P_2, NIP /
    identyfikator nabywcy lub informacja o braku, imię i nazwisko / nazwa nabywcy lub informacja o
    braku, P_15 („§ 8 rozporządzenia"). Podgląd anonimowy oferuje XML lub PDF ([AP] s. 21).
    - Source: [CZ2] pkt 5.7; [AP] s. 21 per `aplikacja-podatnika-ksef-pierwsza-faktura.md` fact 10.
      Tier 2. Confidence: HIGH. The KB does not confirm which regulation „§ 8" means.

25. **Inference (not an MF statement): a QR code generated from a different XML than the one in KSeF
    would not lead to the KSeF invoice.** Combination of facts 22 and 23 (wyróżnik = SHA-256 of the
    XML; step 1 may return „informacja o braku faktury w KSeF"). Confidence: MEDIUM (derived).
    Conversely, nothing in the KB says the QR check compares the _visible PDF content_ with the XML:
    a PDF with a correct QR but altered visible amounts is caught only by downloading the XML
    (step 2) and comparing by hand. What „informacja o zgodności" in step 1 checks is not defined in
    the KB.
    - **VERIFIED 2026-10-16 ([CZ2] pkt 5.5, s. 89–90):** step 1 displays „Informacja czy dokument
      przesłany do KSeF jest zgodny z dokumentem, dla którego wygenerowano link weryfikacyjny". MF's
      own example (Przykład 14, s. 88): after entering access data the buyer „może także pobrać
      fakturę i zweryfikować czy dane znajdujące się w KSeF są zbieżne z danymi w otrzymanym
      wydruku". So comparing the visible PDF with the downloaded invoice is MF's described method,
      not just our inference. KOD I contents per pkt 5.4.1 (s. 84–85): adres zasobu, P_1, NIP
      sprzedawcy, wyróżnik; no amounts. Lock-out: „W przypadku wskazania kilka razy z rzędu błędnych
      danych dostępowych, nastąpi czasowa blokada (…) na poziomie skrótu faktury (SHA256)."

### G. Nabywcy z art. 106gb ust. 4 (konsument, bez NIP, zagraniczni)

26. **Ci nabywcy dostają fakturę w sposób uzgodniony; ustawa nie wskazuje sposobu ani formy
    uzgodnienia.** KB extract text (pkt 5.3.1): „Art. 106gb ust. 4 — obowiązek przekazania w sposób
    uzgodniony gdy nabywca to: Podmiot zagraniczny (…) Podatnik UE w procedurze SME, Podmiot bez
    NIP, Konsument. Faktura poza KSeF → obowiązkowy kod/kody QR." [FAQ] Q25: no method or form
    prescribed (paraphrase, `aplikacja-podatnika-ksef-pierwsza-faktura.md` fact 13).
    - Source: [CZ2] pkt 1.6.5, 5.3.1; [FAQ] Q25. Statute paraphrased (no verbatim of art. 106gb ust.
      4 in KB). Confidence: HIGH.
    - **VERIFIED 2026-10-16, citation corrected:** the live FAQ numbers questions per section, and
      no „Q25" says that no form is prescribed („Zasady obowiązywania" pyt. 25 is about optional
      fields; „Wystawianie i otrzymywanie faktur" pyt. 25 is about self-billing). Use instead: art.
      106gb ust. 4 (H3: „udostępniana nabywcy w sposób z nim uzgodniony", no form stated); [CZ2] pkt
      1.6.5, s. 20: „podatnicy mają dowolność w zakresie formy przekazania faktury odbiorcom"; FAQ
      „Wystawianie i otrzymywanie faktur" pyt. 36: „sprzedawca musi przekazać mu dokument w
      uzgodniony sposób — np. w formie PDF, mailowo, albo nawet papierowo". QR duty: art. 106gb ust.
      5 pkt 1 (H3).
    - The consistency rule of fact 5 sits in pkt 1.6.5, whose heading covers both „wydana w sposób
      uzgodniony" (106gb ust. 4 buyers) and „użyta poza KSeF". The KB has **no separate FAQ or
      Podręcznik sentence** on consistency specific to consumers or foreign buyers beyond pkt 1.6.5
      and the language rule (fact 6). Confidence that 1.6.5 applies to them: HIGH by heading
      wording.
    - Consumer may download the invoice from KSeF via QR + access data without logging in ([CZ2] pkt
      5.3.2).

### H. Verbatim extracts read live on 2026-10-16

Page numbers are the PDF's printed page numbers. [VAT] = Dz.U. 2026 poz. 1263 (t.j., stan prawny na
26.08.2026). [CZ2] = Podręcznik KSeF 2.0 cz. II, edition 06.08.2026.

**H1. Art. 88 ust. 3a pkt 4 ([VAT] s. 96).** „3a. Nie stanowią podstawy do obniżenia podatku
należnego oraz zwrotu różnicy podatku lub zwrotu podatku naliczonego faktury i dokumenty celne w
przypadku gdy: (…) 4) wystawione faktury, faktury korygujące lub dokumenty celne: a) stwierdzają
czynności, które nie zostały dokonane – w części dotyczącej tych czynności, b) podają kwoty
niezgodne z rzeczywistością – w części dotyczącej tych pozycji, dla których podane zostały kwoty
niezgodne z rzeczywistością, c) potwierdzają czynności, do których mają zastosowanie przepisy art.
58 i 83 Kodeksu cywilnego – w części dotyczącej tych czynności;" Ust. 3b: „Przepis ust. 3a stosuje
się odpowiednio do duplikatów faktur oraz kolejnych egzemplarzy faktur."

- The phrase „pusta faktura" does not occur anywhere in [VAT] (full-text search of the t.j.; the
  only „pust-" hits are „opust") nor in [CZ2]. It is not a statutory term. The statutory hooks are
  H1 lit. a (transactions not performed) and lit. b (amounts inconsistent with reality).
- Ust. 3b (duplicates and further copies) is the only text that touches „copies"; neither [VAT] nor
  [CZ2] says whether a KSeF visualisation is a „kolejny egzemplarz faktury". Do not assert it.

**H2. Art. 108 ust. 1–2 ([VAT] s. 136).** „1. W przypadku gdy osoba prawna, jednostka organizacyjna
niemająca osobowości prawnej lub osoba fizyczna wystawi fakturę, w której wykaże kwotę podatku, jest
obowiązana do jego zapłaty. 2. Przepis ust. 1 stosuje się odpowiednio, w przypadku gdy podatnik
wystawi fakturę, w której wykaże kwotę podatku wyższą od kwoty podatku należnego."

**H3. Art. 106gb ust. 4–5 ([VAT] s. 127).** Ust. 4 lists pkt 1–6 (place of supply abroad; no seat/FE
in PL; FE not participating; art. 113a ust. 1 SME; no tax ID; consumer) „– faktura ustrukturyzowana
jest udostępniana nabywcy w sposób z nim uzgodniony." Ust. 5: „Podatnik jest obowiązany do
oznaczenia faktury ustrukturyzowanej kodem umożliwiającym dostęp do tej faktury w Krajowym Systemie
e-Faktur oraz umożliwiającym weryfikację danych zawartych na tej fakturze, w przypadku: 1)
udostępnienia jej nabywcy, o którym mowa w ust. 4, w sposób inny niż przy użyciu Krajowego Systemu
e-Faktur, lub 2) użycia tej faktury poza Krajowym Systemem e-Faktur."

**H4. Art. 106na ust. 3–4 ([VAT] s. 131).** „3. Faktura ustrukturyzowana jest uznana za otrzymaną
przy użyciu Krajowego Systemu e-Faktur w dniu przydzielenia w tym systemie numeru identyfikującego
tę fakturę. 4. W przypadku udostępnienia faktury ustrukturyzowanej nabywcy, o którym mowa w art.
106gb ust. 4, w sposób inny niż przy użyciu Krajowego Systemu e-Faktur, za datę otrzymania tej
faktury uznaje się datę jej faktycznego otrzymania przez tego nabywcę." Ust. 1 (issue date = day of
sending to KSeF) confirmed identical in the 2026 t.j.

**H5. [CZ2] pkt 3.2.3 (s. 66–67).** „Niedopuszczalne jest przesyłanie faktur testowych do środowiska
produkcyjnego, gdyż w przypadku wysyłki zakończonej sukcesem i nadaniem numeru KSeF jest to
równoznaczne z wystawieniem pełnoprawnej faktury, która w istocie nie dokumentuje żadnej transakcji.
Skutkować to może obowiązkiem zapłaty podatku, wynikającym z treści art. 108 ustawy. W przypadku
popełnienia tego typu błędu – tj. wystawienia faktury, która nie dokumentuje faktycznie wykonanej
czynności opodatkowanej, należy niezwłocznie wystawić fakturę korygującą „do zera"." This is the
only MF passage found that ties a KSeF invoice „documenting no transaction" to art. 108.

**H6. Art. 106nf ust. 2 ([VAT] s. 133).** „Faktury, o których mowa w ust. 1, udostępnia się nabywcy
w sposób z nim uzgodniony." [CZ2] pkt 1.6.6 (s. 26): in tryb awaryjny the invoice is given „w sposób
uzgodniony (niezależnie od statusu nabywcy)"; if the buyer agreed to receive it outside KSeF →
invoice with two QR codes; if in KSeF → seller may additionally give a potwierdzenie transakcji.
(Corrects the draft's „w trybie awaryjnym faktura z dwoma kodami QR trafia do nabywcy poza KSeF",
which held only for buyers who agreed to outside delivery.)

**H7. Art. 145m ust. 1 and 145n ust. 1 ([VAT] s. 193).** 145m: „W okresie od dnia 1 kwietnia 2026 r.
do dnia 31 grudnia 2026 r. podatnicy obowiązani do wystawiania faktur ustrukturyzowanych mogą
wystawiać faktury elektroniczne lub faktury w postaci papierowej, jeżeli łączna wartość sprzedaży
wraz z kwotą podatku u tych podatników udokumentowana tymi fakturami wystawionymi w danym miesiącu
jest mniejsza lub równa 10 000 zł." 145n: „W okresie od dnia 1 lutego 2026 r. do dnia 31 grudnia
2026 r. (…) mogą wystawiać: 1) faktury elektroniczne lub faktury w postaci papierowej przy
zastosowaniu kas rejestrujących; 2) paragony fiskalne uznane za faktury (…)".

**H8. Art. 2 pkt 32a ([VAT] s. 9) and art. 106j ust. 1 ([VAT] s. 129).** 2 pkt 32a: „fakturze
ustrukturyzowanej – rozumie się przez to fakturę wystawioną przy użyciu Krajowego Systemu e-Faktur
wraz z przydzielonym numerem identyfikującym tę fakturę w tym systemie". 106j ust. 1: „W przypadku
gdy po wystawieniu faktury: 1) podstawa opodatkowania lub kwota podatku wskazana w fakturze uległa
zmianie, (…) 5) stwierdzono pomyłkę w jakiejkolwiek pozycji faktury – podatnik wystawia fakturę
korygującą."

**H9. [CZ2] pkt 1.6.5 (s. 20–22), 06.08.2026 wording.** „O sposobie prezentacji poszczególnych
danych na fakturze decyduje wystawca faktury/integrator systemu. Biorąc jednak pod uwagę, że faktura
użyta poza KSeF odpowiada treści pliku źródłowego tej faktury wystawionej w KSeF (w pliku XML),
należy zadbać o: jej spójność z zawartością pliku XML faktury w KSeF, czytelność dokumentu (…), brak
sprzeczności pomiędzy zawartością pliku XML przesłanego do KSeF, przyjętego przez system a treścią
udostępnianej faktury." Later: „faktura udostępniania poza KSeF lub używana poza KSeF musi zawierać
elementy zgodne z tymi zawartymi w pliku XML." Also: „podatnicy mają dowolność w zakresie formy
przekazania faktury odbiorcom" (106gb ust. 4 buyers).

**H10. [CZ2] pkt 1.8 (s. 31–32).** Offline24 document handed over before sending: „(co w świetle
regulacji art. 106nda jest działaniem nieprawidłowym ze strony sprzedawcy) należy uznać, że nabywca
otrzymał dokument inny niż faktura wystawiona zgodnie z art. 106nda ustawy. Mimo naruszenia (…)
nabywca nabywa prawo odliczenia podatku z tego dokumentu w dacie jego faktycznego otrzymania
dokumentu." Same section: „Do 31 grudnia 2026 r. podatnicy nie będą karani za błędy związane ze
stosowaniem KSeF." (general statement, not specific to visualisations; not used in the post).

**H11. [FAQ] (live HTML; questions are numbered per section).**

- „Wystawianie i otrzymywanie faktur", pyt. 33: „Czy wizualizacja faktury musi wyglądać tak jak wzór
  Ministerstwa? Nie. Programy mogą generować własny wygląd faktury. Wizualizacja musi odzwierciedlać
  pod względem merytorycznym dane w KSeF aby nie wprowadzać w błąd co do warunków transakcji, osoby,
  która taką wizualizację otrzymuje."
- Same section, pyt. 32: visualisation may be in another language „ale musi być zgodna pod względem
  merytorycznym (po przetłumaczeniu) z danymi w pliku XML".
- Same section, pyt. 50: see fact 11 („jedynie charakter pomocniczy i techniczno-organizacyjny").
- „KSeF w Jednostkach Samorządu Terytorialnego", pyt. 40: „Z formalnego punktu widzenia dokumentem
  jest format xml faktury. Zgodnie jednak z art. 106gb ust. 5 ustawy podatnik może użyć faktury poza
  KSeF pod warunkiem opatrzenia jej kodem umożliwiającym weryfikację danych w niej zawartych. Tak
  użyta poza KSeF faktura może być dokumentem księgowym, pod warunkiem, że zostanie opatrzona kodem
  QR z numerem KSeF (…)".
- Same JST section, pyt. 70: „Faktura wystawiona przy użyciu KSeF stanowi plik w formacie XML. Może
  być użyta poza KSeF w innym formacie, np. pdf."

**H12. [AP] s. 19–21 (pkt 4.2.1).** Anonymous search: numer KSeF; then P_2, identyfikator nabywcy
(NIP / VAT UE / inny / brak), imię i nazwisko lub nazwa, kwota należności ogółem; on success
„Aplikacja Podatnika umożliwia pobranie faktury w wybranym formacie XML lub PDF" (s. 21).

---

## NOT SETTLED

Re-checked live on 2026-10-16 against [CZ2], [VAT] and [FAQ] (section H).

1. **No MF statement that a PDF / visualisation diverging from the XML is a „pusta faktura", or
   which document prevails when they differ.** Searched the live [CZ2] and [FAQ] texts in addition
   to the KB: the phrase „pusta faktura" appears in neither, nor in [VAT] (H1). MF's rules on
   divergence are [CZ2] pkt 1.6.5 (consistency, no contradiction, „musi zawierać elementy zgodne",
   H9) and FAQ pyt. 33 („Wizualizacja musi odzwierciedlać pod względem merytorycznym dane w KSeF aby
   nie wprowadzać w błąd", H11). Both state a requirement and no consequence. MF does say „Z
   formalnego punktu widzenia dokumentem jest format xml faktury" (FAQ JST pyt. 40, H11), but not in
   the context of a conflicting visualisation. The post must not say MF treats a mismatched PDF as a
   „pusta faktura" and must not state a tax consequence of the mismatch; it may quote FAQ pyt. 40 as
   MF's general statement.
2. **Whether a PDF that shows a transaction or amounts different from the XML is itself an „invoice"
   for art. 108 or art. 88 ust. 3a purposes.** The statutory text is now read (H1, H2): both
   provisions speak of „faktury" (and art. 88 ust. 3b of duplicates and „kolejne egzemplarze"). No
   source says whether a KSeF visualisation is such an invoice or copy. The post may quote H1/H2
   verbatim and say the question is open; leave the answer to a tax adviser.
3. **Status of a PDF handed to a domestic NIP buyer alongside the KSeF invoice.** Partly answered:
   [CZ2] pkt 1.6.6 allows a printout/PDF with QR after the number is assigned; FAQ pyt. 50 calls
   other channels „pomocnicze" (fact 11). For offline24 handed over before sending, MF calls it
   „dokument inny niż faktura wystawiona zgodnie z art. 106nda" (H10). No MF sentence says that an
   online PDF copy is or is not a second invoice.
4. **Whether a buyer may deduct VAT based on the PDF figures when they differ from the XML.** Not
   addressed. Art. 106na ust. 3 (H4) points to the KSeF invoice for the receipt date; H1 lit. b is
   the statutory hook for „kwoty niezgodne z rzeczywistością", but no source applies it to a
   visualisation.
5. **Whether art. 106ni (penalties) reaches a mismatched visualisation.** Not addressed. [CZ2] pkt
   1.8 states generally „Do 31 grudnia 2026 r. podatnicy nie będą karani za błędy związane ze
   stosowaniem KSeF" (H10); not specific to visualisations, not used in the post.
6. **„Informacja o zgodności" in QR step 1:** RESOLVED. MF wording (pkt 5.5): „Informacja czy
   dokument przesłany do KSeF jest zgodny z dokumentem, dla którego wygenerowano link weryfikacyjny"
   (fact 25). It compares documents, not the visible PDF content.
7. **Edition gap:** RESOLVED. pkt 1.1, 1.6.1–1.6.6, 1.8, 2.13.2, 3.2.3, 4.1, 5.1–5.7, 6.2, 6.3 read
   in the 06.08.2026 edition. Differences that mattered: pkt 3.2.3 says „Skutkować to może" (fact
   15); pkt 6.3 no longer mentions scam reporting and cites art. 106j ust. 1 (fact 21); pkt 1.6.6
   tryb awaryjny depends on what the buyer agreed (H6).

## Verified live on 2026-10-16

- [VAT] https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf (224 pages): art. 2 pkt 32a (s. 9),
  88 ust. 3a–3b (s. 96), 106gb ust. 4–5 (s. 127), 106j ust. 1 (s. 129), 106na ust. 1, 3–4 (s. 131),
  106nf ust. 1–2 (s. 133), 108 ust. 1–2 (s. 136), 145m, 145n (s. 193).
- [CZ2] 06.08.2026: pkt 1.1 (s. 5), 1.6.1–1.6.4 (s. 17–20), 1.6.5 (s. 20–22), 1.6.6 (s. 22–28), 1.8
  (s. 31–32), 2.13.2 (s. 54), 3.2.3 (s. 66–67), 4.1 (s. 70), 5.1–5.3 (s. 79–83), 5.4.1–5.4.3 (s.
  83–86), 5.5 (s. 87–90), 5.7 (s. 91–95), 6.2 (s. 96–97), 6.3 (s. 97–98).
- [FAQ] live HTML: „Wystawianie i otrzymywanie faktur" pyt. 32, 33, 34, 36, 50; „KSeF w JST" pyt.
  40, 70.
- [AP] 06.08.2026: pkt 4.2.1, s. 19–21.
- [PDFGEN] https://github.com/CIRFMF/ksef-pdf-generator resolves (HTTP 200); content not reviewed.
- Not re-read: [NP] „Najczęstsze pytania" (not cited in the post).

## Suggested Sources Section

- Podręcznik KSeF 2.0 cz. II, pkt 1.1, 1.6.1–1.6.6, 1.8, 2.13, 3.2.3, 4.1, 5.1–5.7, 6.3:
  https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
- Ustawa o VAT, t.j. Dz.U. 2026 poz. 1263 (art. 2 pkt 32a, 88 ust. 3a, 106gb, 106j, 106na, 106nf,
  108, 145m, 145n; verbatim in section H): https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf
- MF, Pytania i odpowiedzi KSeF 2.0: https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20/
- Podręcznik użytkownika Aplikacji Podatnika KSeF 2.0, s. 19–21:
  https://ksef.podatki.gov.pl/media/qocjn3ai/podrecznik-uzytkownika-aplikacji-podatnika-ksef-20_06082026.pdf
- (M) Oficjalny generator wizualizacji MF: https://github.com/CIRFMF/ksef-pdf-generator

## Warning: Common Misconceptions

- **„MF: PDF niezgodny z XML to pusta faktura"** — no MF source in the KB says this (NOT SETTLED 1).
- **„Prawną wersją jest XML, PDF nie ma mocy prawnej"** — appears in our own published content and
  in `checklist-przygotowanie.md` fact 9.3 / `ksef-dla-jdg.md` (sourced from our output, not MF).
  MF's documented position is narrower: e-Faktura = XML with KSeF number (fact 1); visualisation
  must be consistent (fact 5). **Update 2026-10-16:** the first half has MF support in substance:
  FAQ „KSeF w JST" pyt. 40: „Z formalnego punktu widzenia dokumentem jest format xml faktury"; pyt.
  70: „Faktura wystawiona przy użyciu KSeF stanowi plik w formacie XML" (H11). The second half („PDF
  nie ma mocy prawnej") is contradicted: the same pyt. 40 says a copy used outside KSeF with a QR
  code „może być dokumentem księgowym". Phrase it as MF does, not as „PDF nie ma mocy prawnej".
- **„Wystarczy poprawić PDF / wysłać nowy PDF"** — the XML in KSeF cannot be edited or deleted; only
  a corrective invoice fixes it (fact 19). Noty korygujące do not work since 1.02.2026.
- **„Nabywca może odrzucić błędną fakturę w KSeF"** — no (fact 21).
- **„KSeF sprawdzi, czy kwoty się zgadzają"** — KSeF does not verify arithmetic (fact 18).
- **„Kod QR potwierdza, że PDF jest zgodny z XML"** — the KB supports only that KOD I points to the
  XML by its SHA-256 hash (facts 22, 25); comparing visible PDF data needs the downloaded XML (MF's
  own method, [CZ2] Przykład 14).
- **„W trybie awaryjnym nabywca zawsze dostaje fakturę poza KSeF"** — no; it is delivered „w sposób
  uzgodniony", which may be KSeF (H6).
- **„Faktura z numerem KSeF bez transakcji = zawsze obowiązek zapłaty podatku"** — MF says „może
  skutkować" (H5); art. 108 itself is quoted in H2.
- **„Art. 106gb ust. 4 = zgoda na PDF dla firm z NIP"** — no; it covers consumers, buyers without
  NIP, foreign and EU-SME buyers (fact 26; `aplikacja-podatnika-ksef-pierwsza-faktura.md`
  Misconceptions).

## Freshness

| Claim                                        | Re-check when                                        |
| -------------------------------------------- | ---------------------------------------------------- |
| pkt 1.6.5 / 6.2 / 6.3 wording                | Next cz. II edition; line-by-line diff of 06.08.2026 |
| Art. 106ni penalties from 1.01.2027 (law)    | UD477 publication in Dz.U. (`sankcje-ksef-ud477.md`) |
| Art. 145m / 145n (PDF invoices outside KSeF) | After 1.01.2027                                      |
| ksef-pdf-generator behaviour                 | New releases (WATCHLIST)                             |
