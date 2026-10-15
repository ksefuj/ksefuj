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

15. **Faktura przyjęta z numerem KSeF = pełnoprawna faktura → obowiązek zapłaty podatku (art. 108);
    błąd → niezwłocznie korekta „do zera".** KB extract text: „Niedopuszczalne jest przesyłanie
    faktur testowych do środowiska produkcyjnego. Faktura przyjęta z numerem KSeF = pełnoprawna
    faktura → obowiązek zapłaty podatku (art. 108). W razie błędu → niezwłocznie korekta „do zera"."
    - Source: [CZ2] pkt 3.2.3 (context: test invoices sent to production). Tier 2. Confidence: HIGH
      for the MF statement. Applying it to other erroneous XML is our extension (MEDIUM).

16. **Art. 108 ust. 1 — text NOT IN KB.** No KB file quotes art. 108 (only fact 15's pointer „art.
    108"). Do not quote it; if the post explains it, attribute only „art. 108 ustawy o VAT" via
    [CZ2] pkt 3.2.3. Confidence of any paraphrase beyond fact 15: LOW.

17. **Art. 88 ust. 3a pkt 4 lit. a — text NOT IN KB.** `faktury-scamowe.md` (facts 2.1, 2.2) cites
    art. 88 ust. 3a as „⚠️ TEXT NOT READ DIRECTLY", MEDIUM, against the superseded Dz.U. 2025 poz.
    775; `falszywe-faktury-ksef.md` fact 6: „No KB file contains the text of art. 88 ust. 3a or of
    pkt 4." What the KB does hold: [NP] pyt. 1 — deduction from an invoice issued outside KSeF
    despite the obligation is kept „pod warunkiem spełnienia przesłanek materialnych odliczenia, o
    których mowa w art. 86 ustawy, oraz niezaistnienia przesłanek negatywnych zgodnie z art. 88
    ustawy" (`kary-ksef-2027-2028.md` fact 12). Confidence: HIGH for that quote; the „pusta faktura"
    content of art. 88 is unverified.

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

### G. Nabywcy z art. 106gb ust. 4 (konsument, bez NIP, zagraniczni)

26. **Ci nabywcy dostają fakturę w sposób uzgodniony; ustawa nie wskazuje sposobu ani formy
    uzgodnienia.** KB extract text (pkt 5.3.1): „Art. 106gb ust. 4 — obowiązek przekazania w sposób
    uzgodniony gdy nabywca to: Podmiot zagraniczny (…) Podatnik UE w procedurze SME, Podmiot bez
    NIP, Konsument. Faktura poza KSeF → obowiązkowy kod/kody QR." [FAQ] Q25: no method or form
    prescribed (paraphrase, `aplikacja-podatnika-ksef-pierwsza-faktura.md` fact 13).
    - Source: [CZ2] pkt 1.6.5, 5.3.1; [FAQ] Q25. Statute paraphrased (no verbatim of art. 106gb ust.
      4 in KB). Confidence: HIGH.
    - The consistency rule of fact 5 sits in pkt 1.6.5, whose heading covers both „wydana w sposób
      uzgodniony" (106gb ust. 4 buyers) and „użyta poza KSeF". The KB has **no separate FAQ or
      Podręcznik sentence** on consistency specific to consumers or foreign buyers beyond pkt 1.6.5
      and the language rule (fact 6). Confidence that 1.6.5 applies to them: HIGH by heading
      wording.
    - Consumer may download the invoice from KSeF via QR + access data without logging in ([CZ2] pkt
      5.3.2).

---

## NOT SETTLED

1. **No MF statement in the KB that a PDF / visualisation diverging from the XML is a „pusta
   faktura", or which document prevails when they differ.** Searched all
   `docs/knowledge-base/briefs/*.md`, `WATCHLIST.md`, `CHANGELOG.md` and
   `packages/validator/docs/fa3-information-sheet.md` for „pusta", „pustej", „fikcyjn",
   „nierzeteln", „sprzeczn", „spójn", „wizualizacj", „PDF": the only MF rule on divergence is pkt
   1.6.5 (consistency, no contradiction, fact 5), which states a requirement and no consequence. The
   FA(3) information sheet does not mention visualisation at all. The backlog note „official source
   UNVERIFIED" stands. The post must not say MF treats a mismatched PDF as a „pusta faktura", must
   not state that the XML legally prevails, and must not state a tax consequence of the mismatch. It
   may say: MF requires consistency (fact 5), the invoice is the XML with a KSeF number (fact 1), a
   domestic NIP buyer gets the invoice only in KSeF (fact 11).
2. **Text of art. 88 ust. 3a pkt 4 lit. a and art. 108 ust. 1 not in the KB** (facts 16, 17).
   Whether a PDF that shows a transaction or amounts different from the XML is itself an „invoice"
   for art. 108 or art. 88 ust. 3a purposes: not addressed by any KB source. Leave to „skonsultuj z
   doradcą".
3. **Status of a PDF handed to a domestic NIP buyer alongside the KSeF invoice.** MF says such
   sellers „nie wydają faktur poza systemem" (fact 11) and calls handing a document out before
   sending an offline24 invoice „działanie nieprawidłowe" (fact 14), but the KB has no MF sentence
   saying a PDF copy of an online KSeF invoice is or is not a (second) invoice, or that it has no
   legal effect. (`jak-odebrac-fakture-ksef.md` fact 24 reached the same conclusion.)
4. **Whether a buyer may deduct VAT based on the PDF figures when they differ from the XML.** Not in
   KB. Fact 13 (receipt = KSeF number date) points to the KSeF invoice, but no source says so for a
   mismatch.
5. **Whether art. 106ni (penalties) reaches a mismatched visualisation.** Not in KB.
6. **Meaning of „informacja o zgodności" in QR step 1** (fact 23) — undefined in the KB.
7. **Edition gap:** pkt 1.6.5 / 6.2 / 6.3 are quoted from the 2026-02-01 edition extract; the
   2026-08-06 edition's wording was not compared line by line (pkt 6.3 changed). Re-read before
   publishing quotes as verbatim.

## Could not be read live in this run (proxy 403, not attempted)

- Ustawa o VAT, Dz.U. 2026 poz. 1263: art. 2 pkt 31, 32, 32a; art. 88 ust. 3a pkt 4 lit. a; art. 108
  ust. 1; art. 106na ust. 3–4; art. 106gb ust. 1 and 4; art. 106e; art. 106j
  (https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf,
  https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260001263).
- Podręcznik KSeF 2.0 cz. II, edition 06.08.2026, pkt 1.1, 1.6.1–1.6.6, 1.8, 3.2.3, 4.1, 5.1–5.7,
  6.2, 6.3 ([CZ2] URL above); page numbers known only for pkt 1.6.6 (s. 22–26) and 1.7–1.8 (s.
  29–32).
- MF FAQ KSeF 2.0 (Q6, Q16, Q25) and „Najczęstsze pytania" (pyt. 1, 4, 7) ([FAQ], [NP] URLs above).
- Podręcznik Aplikacji Podatnika (06.08.2026), s. 21 ([AP]).
- CIRFMF/ksef-pdf-generator repository content ([PDFGEN]).

## Suggested Sources Section

- Podręcznik KSeF 2.0 cz. II, pkt 1.1, 1.6.1–1.6.6, 1.8, 3.2.3, 4.1, 5.1–5.7, 6.2, 6.3, 2.13:
  https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
- Ustawa o VAT, t.j. Dz.U. 2026 poz. 1263 (art. 106na, 106gb, 108 — pointers only):
  https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf
- MF, Pytania i odpowiedzi KSeF 2.0: https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20/
- MF, Najczęstsze pytania: https://ksef.podatki.gov.pl/ksef-news/najczestsze-pytania/
- Podręcznik użytkownika Aplikacji Podatnika KSeF 2.0:
  https://ksef.podatki.gov.pl/media/qocjn3ai/podrecznik-uzytkownika-aplikacji-podatnika-ksef-20_06082026.pdf
- (M) Oficjalny generator wizualizacji MF: https://github.com/CIRFMF/ksef-pdf-generator

## Warning: Common Misconceptions

- **„MF: PDF niezgodny z XML to pusta faktura"** — no MF source in the KB says this (NOT SETTLED 1).
- **„Prawną wersją jest XML, PDF nie ma mocy prawnej"** — appears in our own published content and
  in `checklist-przygotowanie.md` fact 9.3 / `ksef-dla-jdg.md` (sourced from our output, not MF).
  MF's documented position is narrower: e-Faktura = XML with KSeF number (fact 1); visualisation
  must be consistent (fact 5).
- **„Wystarczy poprawić PDF / wysłać nowy PDF"** — the XML in KSeF cannot be edited or deleted; only
  a corrective invoice fixes it (fact 19). Noty korygujące do not work since 1.02.2026.
- **„Nabywca może odrzucić błędną fakturę w KSeF"** — no (fact 21).
- **„KSeF sprawdzi, czy kwoty się zgadzają"** — KSeF does not verify arithmetic (fact 18).
- **„Kod QR potwierdza, że PDF jest zgodny z XML"** — the KB supports only that KOD I points to the
  XML by its SHA-256 hash (facts 22, 25); comparing visible PDF data needs the downloaded XML.
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
