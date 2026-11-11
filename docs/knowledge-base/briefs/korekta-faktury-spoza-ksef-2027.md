# Research Brief: Korekta faktury wystawionej poza KSeF po 1 stycznia 2027 r.

**Requested by:** Orchestrator (new PL blog post) **Date:** 2026-11-11 **For content:** PL blog post
„Korekta faktury wystawionej poza KSeF po 1 stycznia 2027 r." **Personas:** Ania (JDG, w 2026 r.
wystawiała PDF-y w limicie 10 000 zł) and Pani Krystyna (księgowa)

**Provenance and live status (2026-11-11):** no official host was reachable from this session. The
egress proxy answered 403 to CONNECT for api.sejm.gov.pl, isap.sejm.gov.pl, ksef.podatki.gov.pl,
legislacja.gov.pl, eli.gov.pl and www.gov.pl (proxy status log, 2026-11-11 06:01–06:02 UTC). Nothing
was downloaded. Every quote below comes from (a) the bundled FA(3) XSD
`packages/validator/src/schemas/schemat.xsd` (read directly; CLAUDE.md and WATCHLIST record it as
identical to crd.gov.pl), (b) `packages/validator/docs/fa3-information-sheet.md` (English repo
conversion of the brochure), or (c) Polish verbatim already recorded in sibling briefs, mostly
live-verified on 2026-10-16 to 2026-10-26. The sibling brief that holds each quote is named. Lines
from `podrecznik-ksef-20-czesc-ii.md` are a condensed summary of the 01.02.2026 edition, so they are
marked „KB extract text" and are not MF verbatim. **NOT VERIFIED** = no primary-source text in the
KB; the item is also listed in „Needs local verification".

**Source keys:**

- [VAT] Ustawa o VAT, t.j. Dz.U. 2026 poz. 1263:
  https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf
- [VAT2025] Ustawa o VAT, t.j. Dz.U. 2025 poz. 775 (post-1.02.2026 variants), read in full for
  `kurs-waluty-art-31a.md`: https://api.sejm.gov.pl/eli/acts/DU/2025/775/text.pdf
- [A1598] Ustawa z 16.06.2023 (Dz.U. 2023 poz. 1598):
  https://api.sejm.gov.pl/eli/acts/DU/2023/1598/text.pdf
- [A1203] Ustawa z 5.08.2025 (Dz.U. 2025 poz. 1203):
  https://api.sejm.gov.pl/eli/acts/DU/2025/1203/text.pdf
- [CZ1] Podręcznik KSeF 2.0 cz. I (06.08.2026):
  https://ksef.podatki.gov.pl/media/dmrfdixs/podrecznik-ksef-20-cz-i-rozpoczecie-korzystania-z-ksef-06082026.pdf
- [CZ2] Podręcznik KSeF 2.0 cz. II (06.08.2026):
  https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
- [BRO] Broszura informacyjna FA(3) (sierpień 2026; no numbered sections, repo conversion uses
  §9.7):
  https://ksef.podatki.gov.pl/media/nuclnu0w/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf
- [XSD] Schemat FA(3): https://crd.gov.pl/wzor/2025/06/25/13775/schemat.xsd (bundled copy, lines
  cited below)
- [FAQ] MF, Pytania i odpowiedzi KSeF 2.0: https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20/
- [NP] MF, Najczęstsze pytania: https://ksef.podatki.gov.pl/ksef-news/najczestsze-pytania/

---

**Target query:** „korekta faktury wystawionej poza KSeF 2027"

**Answer in two sentences:** Ustawa nie zawiera przepisu, który kazałby korygować fakturę „w tej
samej formie co oryginał": obowiązek z art. 106ga ust. 1 dotyczy wystawiania faktur, faktura
korygująca jest fakturą (art. 106j ust. 1), a art. 145m i 145n pozwalają na faktury poza KSeF tylko
„w okresie od dnia 1 kwietnia [1 lutego] 2026 r. do dnia 31 grudnia 2026 r.", więc korekta
wystawiona w 2027 r. dla podatnika z NIP powinna trafić do KSeF ([VAT] art. 106ga ust. 1, 106j ust.
1, 145m, 145n). To wniosek z brzmienia przepisów (MEDIUM): w materiałach MF w KB nie ma zdania, że o
formie korekty decyduje obowiązek z dnia jej wystawienia, ale struktura FA(3) i art. 106j ust. 2 pkt
2a przewidują wprost korektę w KSeF do faktury bez numeru KSeF (`NrKSeFN` = 1) ([XSD] l. 2894–2931;
[CZ2] pkt 2.13.6, 4.1.3).

**What changes the answer:**

- **Nabywca to konsument** (osoba fizyczna nieprowadząca działalności): obowiązek KSeF nie obejmuje
  faktur dla niego (art. 106ga ust. 2 pkt 4), także w 2027 r.; korekta takiej faktury może zostać
  poza KSeF albo trafić tam dobrowolnie (art. 106ga ust. 4). Wniosek dla korekt: MEDIUM (fakt 7).
- **Inne stałe wyłączenia art. 106ga ust. 2** (sprzedawca bez siedziby i stałego miejsca w Polsce,
  procedury szczególne, art. 113a, rozporządzenie z art. 106s): jak wyżej, MEDIUM (fakt 8).
- **Awaria / niedostępność / offline24 w dniu korekty**: korektę wystawia się jak każdą fakturę w
  danym trybie; przy awarii całkowitej (art. 106ng) faktur nie przesyła się do KSeF. Zastosowanie do
  korekt: inference, LOW–MEDIUM (fakt 9).
- **Korekta wystawiona jeszcze w 2026 r.** (np. 30 grudnia): mieści się w okresie art. 145m/145n,
  jeśli spełnione są ich warunki; czy korekta liczy się do limitu 10 000 zł: NOT VERIFIED.
- **Oryginał miał błędny NIP nabywcy**: zasada „korekta do zera + nowa faktura" nie ma w XSD/[BRO]
  wyjątku dla oryginałów spoza KSeF; skutek (korekta zerująca w KSeF trafia do podmiotu o błędnym
  NIP) nie jest opisany przez MF (fakt 15).
- **Oryginał był fakturą z kasy albo paragonem z NIP** (art. 145n): od 2027 r. kasa nie wystawia
  faktur; korekta dla podatnika → KSeF (MEDIUM), szczegóły paragonu NOT VERIFIED (fakty 10–12).
- **Kary z art. 106ni**: korekta dla podatnika wystawiona w 2027 r. poza KSeF mimo obowiązku byłaby
  „niewystawieniem w KSeF" tylko przy założeniu z odpowiedzi 1 (LOW, inference). Status kar:
  `sankcje-ksef-ud477.md`.

---

## Key Facts (ready to use)

### A. Czy korekta z 2027 r. idzie do KSeF (pytanie 1)

1. **Obowiązek dotyczy wystawiania faktur, bez rozróżnienia rodzaju faktury.**
   - Verbatim [VAT] art. 106ga ust. 1: „Podatnicy są obowiązani wystawiać faktury ustrukturyzowane
     przy użyciu Krajowego Systemu e-Faktur." (`koniec-limitu-10000-zl.md` fakt 2,
     `faktura-poza-ksef-odliczenie-vat.md` fakt 1; live 2026-10-16.)
   - Definicja, verbatim [VAT] art. 2 pkt 32a (s. 9): „fakturze ustrukturyzowanej – rozumie się
     przez to fakturę wystawioną przy użyciu Krajowego Systemu e-Faktur wraz z przydzielonym numerem
     identyfikującym tę fakturę w tym systemie" (`pusta-faktura-pdf-xml.md` H8, live 2026-10-16).
   - Tier 1 (law). Confidence: HIGH (text). Ania: yes (as background).

2. **Faktura korygująca jest fakturą wystawianą przez podatnika po wystawieniu faktury pierwotnej.**
   - Verbatim [VAT] art. 106j ust. 1 (s. 129): „W przypadku gdy po wystawieniu faktury: 1) podstawa
     opodatkowania lub kwota podatku wskazana w fakturze uległa zmianie, (…) 5) stwierdzono pomyłkę
     w jakiejkolwiek pozycji faktury – podatnik wystawia fakturę korygującą."
     (`pusta-faktura-pdf-xml.md` H8; `nota-korygujaca-ksef.md` header, live 2026-10-16.)
   - [CZ2] pkt 1.6.2 (s. 18), verbatim: „Jedyną formą poprawienia błędu w wystawionej fakturze lub
     jej uzupełnienia jest wystawienie faktury korygującej w KSeF." (`nota-korygujaca-ksef.md`
     header, live 2026-10-16.) Context: the sentence sits in a section about invoices already sent
     to KSeF; it is not a statement about originals issued outside KSeF.
   - Tier 1 / Tier 2. Confidence: HIGH (text).

3. **Art. 145m i 145n są ograniczone w czasie do 31.12.2026.**
   - Verbatim fragment [VAT] art. 145m ust. 1: „w okresie od dnia 1 kwietnia 2026 r. do dnia 31
     grudnia 2026 r." (`koniec-limitu-10000-zl.md` fakt 1). The KB holds the remainder of ust. 1
     only in paraphrase: faktury elektroniczne lub papierowe, if the monthly gross value of sales
     documented by them is ≤ 10 000 zł; ust. 2: right lost „począwszy od faktury, którą przekroczono
     wartość" (`limity-i-wylaczenia.md`, live 2026-10-16).
   - Verbatim [VAT] art. 145n ust. 1: „W okresie od dnia 1 lutego 2026 r. do dnia 31 grudnia 2026 r.
     podatnicy obowiązani do wystawiania faktur ustrukturyzowanych mogą wystawiać: 1) faktury
     elektroniczne lub faktury w postaci papierowej przy zastosowaniu kas rejestrujących; 2)
     paragony fiskalne uznane za faktury wystawione zgodnie z art. 106e ust. 5 pkt 3."
     (`faktura-z-kasy-fiskalnej-ksef-2027.md` fakt 1.)
   - [CZ1] s. 14, verbatim: „Od 1 stycznia 2027 r. Brak możliwości wystawiania faktur przy użyciu
     kas rejestrujących i uznawania za faktury uproszczone paragonów fiskalnych z NIP nabywcy." MF
     roadmap: „1 stycznia 2027 r. KSeF obowiązkowy dla wszystkich." (`koniec-limitu-10000-zl.md`
     fakty 3, 6.)
   - Tier 1 / 2. Confidence: HIGH (text). Ania: yes.
   - The KB has no full verbatim of art. 145m ust. 1 showing whether it says „faktury" generally or
     mentions corrective invoices. NOT VERIFIED (see Needs local verification 1).

4. **Ustawa przewiduje korektę w KSeF do faktury bez numeru KSeF.**
   - [VAT] art. 106j ust. 2 pkt 2a (s. 130), verbatim fragment: the corrective invoice contains the
     KSeF number of the corrected invoice „z wyjątkiem faktur korygujących wystawianych do faktur,
     dla których nie został nadany numer" (`faktura-korygujaca-ksef.md` fakt 1; live 2026-10-17).
     The opening words of pkt 2a are not in the KB.
   - [XSD] `NrKSeFN` (bundled `schemat.xsd`, l. 2923–2927), verbatim: „Znacznik faktury korygowanej
     wystawionej poza KSeF".
   - [CZ2] pkt 4.1.3 (s. 72–73), verbatim: „Faktura korygująca powinna zawierać więc między innymi
     numer KSeF faktury, której dotyczy faktura korygująca. Wymóg ten nie dotyczy jednak przypadków,
     gdy fakturze korygowanej nie został nadany ten numer." (`faktura-korygujaca-ksef.md` fakt 1.)
   - [BRO] opis pola `NrKSeFN` (s. 70), verbatim: „W przypadku, gdy faktura korygowana była
     wystawiona poza KSeF należy wskazać „1"." (`faktura-korygujaca-ksef.md` fakt 1.)
   - Tier 1 / 2. Confidence: HIGH that a KSeF correction of an out-of-KSeF original is foreseen and
     technically possible. Ania: yes.

5. **Explicit MF statement that the form of the correction follows the obligation on the day the
   correction is issued: NOT FOUND in the KB.**
   - Closest MF text, [FAQ] section „KSeF w Jednostkach Samorządu Terytorialnego", question „Czy
     możliwe jest wystawienie korekty faktury z ubiegłego roku w KSeF?", verbatim: „System KSeF
     zapewnia wystawianie faktur korygujących, w tym korekty faktury z ubiegłego roku, tj. 2025 r.
     Korekta ta powinna być wystawiona przez sprzedawcę. Z chwilą obowiązywania KSeF nabywca nie
     będzie mógł wystawiać not korygujących." (`nota-korygujaca-ksef.md` header, live 2026-10-16.)
     It concerns 2025 originals (before the obligation), says KSeF „zapewnia" (provides for) such
     corrections, and does not say „musi". Tier 3. Confidence: HIGH (quote), MEDIUM (as support for
     the 2027 rule; an analogy, not the same case).
   - [CZ2] pkt 2.13.6 (KB extract text): `DaneFaKorygowanej` „umożliwia korektę zbiorczą odnoszącą
     się jednocześnie do faktur z KSeF i poza KSeF". Shows the mechanism, not an obligation.
   - [BRO] wstęp „Wzór faktury ustrukturyzowanej" (s. 3–4): FA(3) is used from 1.02.2026 also for
     „faktur korygujących, w sytuacji gdy faktura pierwotna (…) została wystawiona przed 1 lutego
     2026 r. przy użyciu struktury FA(2) lub FA(1)" (`faktura-korygujaca-ksef.md` fakt 4). Same
     principle (the correction follows the rules in force when it is issued) but for a schema
     change, not for paper originals. MEDIUM as analogy.
   - Objaśnienia podatkowe 28.01.2026: not in the repo, not read. NOT VERIFIED.
   - Conclusion for the post: present answer 1 as „z przepisów wynika", not as an MF statement.
     Confidence for the conclusion: MEDIUM.

6. **Transitional provisions on corrections of invoices issued before / outside KSeF: none found in
   the KB.**
   - [A1598] art. 15 (only transitional rule on corrections recorded in the KB), verbatim: „1. Do
     not korygujących wystawionych przez nabywcę towaru lub usługi i niezaakceptowanych przez
     wystawcę faktury przed dniem wejścia w życie niniejszej ustawy stosuje się przepis art. 106k
     ust. 2 ustawy zmienianej w art. 1, w brzmieniu dotychczasowym. 2. Do not korygujących
     wystawionych przez nabywcę towaru lub usługi przed dniem wejścia w życie niniejszej ustawy
     stosuje się przepis art. 106l ustawy zmienianej w art. 1, w brzmieniu dotychczasowym."
     (`nota-korygujaca-ksef.md` header, live 2026-10-16.) Notes only.
   - The obwieszczenie to [VAT] restates art. 11–18, 22 and 23 of [A1598] (`nota-korygujaca-ksef.md`
     header). Only art. 15 and 23 are quoted in the KB; art. 11–14, 16–18 and 22 were not extracted.
     [A1203] art. 2 was checked only for art. 1 pkt 15 / art. 15 and for art. 106nda/106nh. **NOT
     VERIFIED** that no other transitional provision covers corrective invoices (Needs local
     verification 2).
   - [VAT2025] art. 29a ust. 13a (paraphrase only, `kurs-waluty-art-31a.md` Answer 7): a corrective
     invoice **not** in structured form → period of the buyer's acknowledgement. Shows the statute
     still contemplates corrective invoices outside KSeF after 1.02.2026 (e.g. excluded cases); it
     does not say when they are allowed. MEDIUM.

### B. Kiedy korekta z 2027 r. może zostać poza KSeF (pytanie 2)

7. **Konsument: wyłączenie bez daty końcowej; dotyczy faktur „na rzecz" konsumenta.**
   - [VAT] art. 106ga ust. 2 pkt 4, verbatim fragment: invoices „na rzecz nabywcy … będącego osobą
     fizyczną nieprowadzącą działalności gospodarczej” (`biuro-rachunkowe-ksef-kto-co-robi.md` D1);
     ust. 4: in pkt 1, 2 and 4 the taxpayer may issue in KSeF (paraphrase, same source). Full text
     of pkt 4 and ust. 4 not in KB.
   - [FAQ], verbatim: „Wystawianie w KSeF faktur na rzecz konsumentów nie jest obowiązkowe. Jeżeli
     jednak podatnik wyraża taką chęć to może taką fakturę wystawić w KSeF (w tym fakturę do
     paragonu)." (`faktura-z-kasy-fiskalnej-ksef-2027.md` fakt 5.)
   - No end date: `faktura-dla-osoby-prywatnej-ksef.md` fakt 12 (HIGH by absence of an end date).
   - **Application to corrections:** a correction of a consumer invoice is itself an invoice issued
     to the same consumer, so it falls under pkt 4. No MF sentence on corrections of B2C invoices.
     Confidence: MEDIUM. Ania: yes.
   - If the consumer original was issued voluntarily in KSeF, it has a KSeF number and the
     correction uses `NrKSeF` + number (fact 13); whether the correction must then also be in KSeF:
     NOT VERIFIED.

8. **Pozostałe wyłączenia art. 106ga ust. 2 i rozporządzenie z art. 106s.**
   - [VAT] art. 106ga ust. 2: no seat / fixed establishment in Poland (pkt 1, 2); special procedures
     of dział XII rozdz. 7, 7a, 9 (pkt 3); consumer (pkt 4); art. 106s regulation (pkt 5); art. 113a
     (pkt 6) (`limity-i-wylaczenia.md` live verification 2026-10-16). Ust. 3: then electronic or
     paper invoices (paraphrase, `biuro-rachunkowe-ksef-kto-co-robi.md` D1). HIGH (list).
   - Regulation: KB records „Dz.U. 2025 poz. 1740 § 2: no KSeF obligation for e.g. simplified
     invoices for paid motorways (pkt 1) and single-journey passenger tickets (… pkt 2)"
     (`biuro-rachunkowe-ksef-kto-co-robi.md` D7, fetched 2026-10-26). Full § 2 not in KB.
   - **KB inconsistency:** the MF legal-basis page lists the art. 106s regulation as „Dz. U. z 2025
     r. poz. 1742 („w sprawie przypadków, w których nie ma obowiązku wystawiania faktur
     ustrukturyzowanych")" (`limity-i-wylaczenia.md`, live 2026-10-16), while other briefs and
     published posts cite poz. 1740 § 2. Needs local verification 3. Do not cite either number in
     the new post until resolved; link `/blog/koniec-limitu-10000-zl` instead.
   - Application to corrections: as fact 7, MEDIUM. Ania: marginal (a JDG rarely sells under these).

9. **Tryby offline i awarie w dniu wystawiania korekty.**
   - Offline24 (art. 106nda): no statutory condition; send „niezwłocznie, nie później niż w
     następnym dniu roboczym po dniu jej wystawienia" (art. 106nda ust. 2). Awaria (106nf): 7 dni
     roboczych. Awaria całkowita (106ng): faktur nie przesyła się do KSeF; art. 106ng: „faktury w
     postaci papierowej lub faktury elektroniczne" (`awaria-ksef-offline.md` fakty 1–3;
     `faktura-korygujaca-ksef.md` fakt 6). HIGH (text).
   - These provisions speak of „faktura"; no MF sentence on corrective invoices in these modes
     beyond [BRO] `NrKSeF` (s. 70): „Obowiązek podawania numeru KSeF faktury korygowanej dotyczy
     także faktur wystawionych zgodnie z art. 106nda ust. 1 lub ust. 16 ustawy, 106nh ust. 1 ustawy,
     art. 106nf ust. 1 ustawy." (that is about the **original** being offline). Applying the modes
     to the correction itself: MEDIUM (offline24/awaria), LOW (106ng). Ania: marginal; link the
     guide.

### C. Faktury z kasy i paragony z NIP (pytanie 3)

10. **Od 2027 r. faktura do sprzedaży z kasy dla podatnika idzie do KSeF.**
    - [FAQ] question „Czy KSeF będzie obejmował faktury wystawiane dotąd na kasach fiskalnych
      online?", verbatim: „Od 2027 r., jeśli do transakcji zaewidencjonowanej przy użyciu kasy
      fiskalnej online będzie wystawiana faktura, to będzie musiała ona zostać wystawiona w KSeF,
      jeśli dotyczy sprzedaży na rzecz podatnika." (`faktura-z-kasy-fiskalnej-ksef-2027.md` fakt 4.)
      Tier 3. HIGH.
    - [VAT] art. 111 ust. 3a pkt 1 in the wording from 1.01.2027 (footnote 27 of the t.j.): kasa
      users issue a paragon fiskalny for each sale, without „lub fakturę"
      (`faktura-z-kasy-fiskalnej-ksef-2027.md` fakt 3; paraphrase, HIGH).
    - **Corrections specifically: NOT FOUND.** No MF source in the KB speaks about correcting a 2026
      cash-register invoice or a paragon uznany za fakturę in 2027. Applying fact 10 and answer 1 to
      a 2027 correction (→ KSeF when the buyer is a taxpayer): MEDIUM. Kasa cannot issue the
      correction in 2027 (fact 3, [CZ1] s. 14): HIGH as to „faktury przy użyciu kas".

11. **Korekta faktury uproszczonej → `RodzajFaktury` = `KOR`.** [BRO] §9.5 RULE (repo conversion):
    correction of a simplified invoice uses `KOR`; [CZ2] pkt 2.13.1 (KB extract text): „`KOR` —
    korekta faktury podstawowej lub uproszczonej". HIGH. Whether a paragon fiskalny uznany za
    fakturę (art. 106e ust. 5 pkt 3) counts as „faktura uproszczona" for this purpose: the statute
    calls it a paragon „uznany za fakturę"; no MF text in KB on its correction. MEDIUM.

12. **Paragon z NIP: what to enter in `NrFaKorygowanej` / `DataWystFaKorygowanej`: NOT VERIFIED.**
    [XSD] requires both (fact 13). The KB has no MF rule on whether the paragon number, the kasa
    unique number or something else is the „numer faktury korygowanej" for a paragon uznany za
    fakturę. Also not in KB: any correction obligations on the cash-register side (rozporządzenie w
    sprawie kas rejestrujących, not in corpus) and whether art. 145n ust. 4 (2026 invoices included
    in the daily report, `faktura-z-kasy-fiskalnej-ksef-2027.md` fakt 9) affects how a 2027
    correction is recorded. Needs local verification 6.

### D. FA(3): jak opisać oryginał bez numeru KSeF (pytanie 4)

13. **`DaneFaKorygowanej`: sequence, names and annotations (bundled [XSD] l. 2875–3005).** Order
    inside `Fa`: `RodzajFaktury` → optional sequence „Dane dla przypadków, gdy pole RodzajFaktury
    przyjmuje wartości KOR, KOR_ZAL lub KOR_ROZ": `PrzyczynaKorekty` (0..1) → `TypKorekty` (0..1) →
    `DaneFaKorygowanej` (1..50 000) → `OkresFaKorygowanej` (0..1) → `NrFaKorygowany` (0..1) →
    `Podmiot1K` (0..1) → `Podmiot2K` (0..101) → [`P_15ZK` → `KursWalutyZK`] (0..1). Inside each
    `DaneFaKorygowanej`, in this order:
    - `DataWystFaKorygowanej` (type `TDataT`, required): „Data wystawienia faktury korygowanej"
    - `NrFaKorygowanej` (type `TZnakowy`, required; `TZnakowy` = token, minLength 1, maxLength 256,
      l. 1170–1178): „Numer faktury korygowanej"
    - choice of exactly one:
      - `NrKSeF` (`etd:TWybor1`): „Znacznik numeru KSeF faktury korygowanej" followed by
        `NrKSeFFaKorygowanej` (`TNumerKSeF`): „Numer identyfikujący fakturę korygowaną w KSeF"
      - `NrKSeFN` (`etd:TWybor1`): „Znacznik faktury korygowanej wystawionej poza KSeF"
    - Tier 2. Confidence: HIGH (read directly). Ania: idea only; Krystyna: yes.
    - Information sheet §9.7 (`fa3-information-sheet.md` l. 582–590): `NrFaKorygowanej` „Filled
      regardless of whether corrected invoice was issued in KSeF or outside"; `NrKSeFN` „"1" if
      corrected invoice was issued outside KSeF. Then NrKSeF and NrKSeFFaKorygowanej are omitted";
      `DaneFaKorygowanej` „Must be provided separately for each original invoice being corrected".
      HIGH.

14. **`DataWystFaKorygowanej` for an out-of-KSeF original: rule not fully extracted.** [BRO] / §9.7:
    „Date of issue of corrected invoice. Rules depend on how original was issued (outside KSeF,
    offline, online). For online mode: date it was sent to KSeF per Art. 106na sec. 1 (if P_1
    matches sending date)." The repo conversion gives only the online rule; the Polish text for the
    outside-KSeF case ([BRO] s. 69) is not quoted in the KB. Using the date printed on the paper/PDF
    original is the natural reading, not a verified MF sentence. MEDIUM. Needs local verification 4.

15. **Original without a number:** art. 106e ust. 1 pkt 2 (cited in §9.7 for `NrFaKorygowanej`)
    requires a „kolejny numer" on every invoice (statute text not quoted in KB); [XSD] makes
    `NrFaKorygowanej` mandatory and non-empty (minLength 1). An invoice without a number is a defect
    of the original; the KB has no MF guidance on how to correct it (e.g. via `NrFaKorygowany`,
    whose [XSD] annotation, l. 2937–2941, covers only a **wrong** number: „Poprawny numer faktury
    korygowanej w przypadku, gdy przyczyną korekty jest błędny numer faktury korygowanej. W takim
    przypadku błędny numer faktury należy wskazać w polu NrFaKorygowanej"). NOT VERIFIED. Do not
    give a recipe.

16. **Name/address correction: `Podmiot2K` (and `Podmiot1K` for the seller); no carve-out for
    out-of-KSeF originals.**
    - [XSD] `Podmiot2K` (l. 2966–2970), verbatim: „W przypadku korekty danych nabywcy występującego
      jako Podmiot2 lub dodatkowego nabywcy występującego jako Podmiot3 należy podać pełne dane tego
      podmiotu występujące na fakturze korygowanej. Korekcie nie podlegają błędne numery NIP
      identyfikujące nabywcę oraz dodatkowego nabywcę - wówczas wymagana jest korekta faktury do
      wartości zerowych. W przypadku korygowania pozostałych danych nabywcy lub dodatkowego nabywcy
      wskazany numer identyfikacyjny ma być tożsamy z numerem w części Podmiot2 względnie Podmiot3
      faktury korygującej"
    - [XSD] `Podmiot1K` (l. 2942–2946), verbatim: „W przypadku korekty danych sprzedawcy należy
      podać pełne dane sprzedawcy występujące na fakturze korygowanej. Pole nie dotyczy przypadku
      korekty błędnego NIP występującego na fakturze pierwotnej - wówczas wymagana jest korekta
      faktury do wartości zerowych"
    - [CZ2] pkt 1.6.4 (s. 19–20): „nie należy wystawiać faktury korygującej błędny numer NIP na inny
      prawidłowy" (`nota-korygujaca-ksef.md` header, live 2026-10-16).
    - Tier 2. HIGH (text). **Ambiguity:** MF's rationale in [CZ2] 1.6.4 is that a KSeF invoice with
      a wrong NIP lands with the entity holding that NIP (KB extract text: „faktura z błędnym NIP
      jest przypisana do podmiotu o tym NIP"). For a paper/PDF original that rationale does not
      apply, but neither [XSD] nor [BRO] limits the rule to KSeF originals. Consequence in 2027: the
      zero correction (in KSeF, `NrKSeFN` = 1) is addressed to the wrong NIP and is delivered to
      that entity in KSeF, and the new invoice with the right NIP is issued in KSeF (issued in
      2027). Both consequences are inference from facts 1–3 and the XSD. MEDIUM. Not addressed by MF
      in the KB: Unsettled.

17. **Amounts as differences; repeated corrections refer to the original.** [CZ2] pkt 2.13.2 (art.
    106j ust. 2 pkt 5): P_13_x, P_14_x, P_14_xW, P_15 „przez różnicę"; pkt 2.13.3: further
    corrections refer to the **original** in `DaneFaKorygowanej`, amounts from the state after
    earlier corrections (KB extract text; `faktura-korygujaca-ksef.md`). HIGH. Relevant if the 2026
    original already had a 2026 paper correction: the 2027 KSeF correction still points at the
    original (`NrKSeFN` = 1). The KB has no MF sentence on this mixed case. MEDIUM.

### E. Nabywca: data otrzymania i odliczenie (pytanie 5)

18. **Korekta wystawiona w KSeF jest otrzymana w dniu nadania numeru KSeF.**
    - Verbatim [VAT] art. 106na ust. 3 (s. 131): „Faktura ustrukturyzowana jest uznana za otrzymaną
      przy użyciu Krajowego Systemu e-Faktur w dniu przydzielenia w tym systemie numeru
      identyfikującego tę fakturę." (`usuniecie-faktury-ksef.md` U4, live 2026-10-26.)
    - Ust. 4 (buyers of art. 106gb ust. 4, incl. konsument): „za datę otrzymania tej faktury uznaje
      się datę jej faktycznego otrzymania przez tego nabywcę." (same, U5.)
    - Tier 1. HIGH. Ania: yes (as a buyer, she sees the correction in KSeF; no acceptance: [CZ2] pkt
      6.1, 6.3).

19. **Buyer's input-VAT timing for a downward correction (art. 86 ust. 19a): NOT VERIFIED.** The KB
    holds no text of art. 86 ust. 19a. Only trace: `kurs-waluty-art-31a.md` „Currency of the text"
    notes that Dz.U. 2025 poz. 1203 contains hits on „art. 86 ust. 19a" (content not recorded).
    Upward correction on the buyer side (art. 86 ust. 10b / ust. 13): NOT VERIFIED. Do not state a
    period in the post; say „moment ujęcia korekty u nabywcy ustala księgowy" or omit.

20. **Deduction from out-of-KSeF invoices in 2027 is an open question in MF's own material.** [CZ2]
    pkt 1.7 title, verbatim: „Odliczenie podatku VAT z faktur wystawionych poza KSeF w okresie od
    lutego do grudnia 2026 r."; [NP] pyt. 1 has no time limit (`faktura-poza-ksef-odliczenie-vat.md`
    fakty 14, 20). Relevance: the 2026 **original** was lawfully outside KSeF; the 2027 correction
    is a separate document. HIGH that the question is open; not this post's topic, link the
    odliczenie post.

### F. Sprzedawca: okres rozliczenia korekty (pytanie 6)

21. **Downward correction: period in which the structured corrective invoice was issued.**
    - Verbatim [VAT2025] art. 29a ust. 13 (s. 41, post-1.02.2026 variant): „W przypadkach, o których
      mowa w ust. 10 pkt 1–3, obniżenia podstawy opodatkowania, w stosunku do podstawy określonej na
      wystawionej fakturze z wykazanym podatkiem, dokonuje się za okres rozliczeniowy, w którym
      podatnik wystawił fakturę korygującą w postaci faktury ustrukturyzowanej, z zastrzeżeniem ust.
      13a i 13b." (`kurs-waluty-art-31a.md` Answer 7.)
    - The quote is from the 2025 t.j. (variant in force from 1.02.2026); not re-checked against
      [VAT] Dz.U. 2026 poz. 1263. Ust. 13a (non-structured correction → period of the buyer's
      acknowledgement) and ust. 13b (offline/awaria correction → period of transmission to KSeF):
      paraphrase only. The wording does not refer to the form of the original. Confidence: HIGH
      (ust. 13 text, 2025 t.j.), MEDIUM (13a/13b). No buyer confirmation is mentioned in ust. 13; do
      not say more than that. Needs local verification 5.
    - Upward correction, verbatim [VAT2025] art. 29a ust. 17 (s. 42): „W przypadku gdy podstawa
      opodatkowania uległa zwiększeniu, korekty tej podstawy dokonuje się w rozliczeniu za okres
      rozliczeniowy, w którym zaistniała przyczyna zwiększenia podstawy opodatkowania." HIGH.
    - The „dokumentacja uzgodnienia warunków" condition (since 2021): not in KB verbatim. NOT
      VERIFIED; do not cite.
    - FA(3) hook: `TypKorekty` 1/2/3 ([XSD] `TTypKorekty`: „Korekta skutkująca w dacie ujęcia
      faktury pierwotnej", „… w dacie wystawienia faktury korygującej", „… w dacie innej, w tym gdy
      dla różnych pozycji faktury korygującej daty te są różne"); optional ([CZ2] 2.13.1). HIGH.

### G. JPK_V7 (pytanie 7)

22. **JPK_V7M(3)/V7K(3): KSeF numbers of sales and purchase invoices „lub odpowiednich oznaczeń przy
    braku numeru KSeF" from February 2026.** [CZ2] pkt 4.1.6 (KB extract text); 06.08.2026 wording,
    s. 76: „a w przypadku braku nr KSeF ma obowiązek stosowania odpowiednich oznaczeń"
    (`faktura-poza-ksef-odliczenie-vat.md`, live 2026-10-16). HIGH.
    - DI / BFK: the KB holds only the paraphrase „faktury offline24 i z niedostępności bez numeru
      KSeF oznacza się DI i koryguje do numeru; faktury z awarii całkowitej BFK"
      (`awaria-ksef-offline.md` fakt 7) and „[NP] Q8/Q9 cover DI and BFK" without wording
      (`mf-faq-podreczniki-2026.md` fakt 1).
    - **NOT VERIFIED:** which marker the 2026 art. 145m/145n original carried; whether a 2027
      correction is reported with its own KSeF number (natural reading of 4.1.6, MEDIUM); whether
      anything links it to the original in JPK. The Rozporządzenie JPK_VAT text is not in the KB. Do
      not state markers in the post. Needs local verification 7.

### H. Lista kontrolna dla JDG (pytanie 8): only sourced ingredients

23. **Keep the original and know its number and date.** [XSD]: `DataWystFaKorygowanej` and
    `NrFaKorygowanej` are mandatory in every `DaneFaKorygowanej` (fact 13). Storage: the 10-year
    KSeF storage exempting from art. 112/112a applies to invoices in KSeF ([CZ2] pkt 7, KB extract
    text; `usuniecie-faktury-ksef.md` fakt 7); a paper/PDF original is not in KSeF, so the seller
    keeps it himself (inference from the scope of pkt 7; art. 112 text not in KB). MEDIUM.
24. **Tick „faktura spoza KSeF" (`NrKSeFN` = 1), not a KSeF number** (fact 13). HIGH. If the
    original was in fact issued in KSeF (voluntarily or after exceeding the limit), it has a number
    and the correction uses `NrKSeF` + number ([CZ2] 4.1.3; `faktura-korygujaca-ksef.md` fakt 5).
    Ania should check before choosing.
25. **Correct buyer data with `Podmiot2K`; a wrong NIP → korekta do zera + nowa faktura** (fact 16).
    HIGH (rule), MEDIUM (out-of-KSeF consequences).
26. **Tool:** Aplikacja Podatnika issues only online invoices ([NP]: „W Aplikacji Podatnika KSeF 2.0
    wystawiamy jedynie faktury w trybie online.", `awaria-ksef-offline.md` fakt 7). Whether the web
    Aplikacja Podatnika lets the user correct an invoice that is not in KSeF (manual
    `DaneFaKorygowanej` with `NrKSeFN`): NOT VERIFIED. Mobile app: our guide
    `/guides/aplikacja-podatnika-ksef-pierwsza-faktura` says, citing the MF mobile manual, that it
    corrects „tylko do faktur wystawionych w tej samej aplikacji mobilnej" (our output; MF manual
    not extracted in KB). If true, the mobile app cannot correct a 2026 PDF invoice. MEDIUM. Needs
    local verification 8.
27. **Only the seller corrects; no nota korygująca, also for out-of-KSeF invoices.** [CZ2] 1.6.2:
    „jedyną formą jej korekty jest faktura korygującą wystawiona przez podatnika – wystawcę faktury
    pierwotnej"; art. 106k repealed in full ([A1598] art. 1 pkt 15) (`nota-korygujaca-ksef.md` fakty
    2–3, 7). HIGH. Link, do not repeat.
28. **Validate the file before sending.** KSeF checks the XML against the schema ([CZ2] 1.6.1); the
    XSD choice means `NrKSeF` and `NrKSeFN` together is invalid (fact 13). HIGH. Whether KSeF checks
    that a `NrKSeFN` original really lacks a number: not in KB (`nota-korygujaca-ksef.md` §6 item
    10).

---

## Existing posts to link (do not duplicate)

- `/blog/faktura-korygujaca-ksef` („Korektę faktury w KSeF wystawisz w 6 krokach", updated
  2026-10-17): KOR step by step (RodzajFaktury, PrzyczynaKorekty, TypKorekty, DaneFaKorygowanej,
  differences, XML example), korekta do zera for wrong NIP
  (`#korekta-do-zera-gdy-nip-nabywcy-jest-pomylony`), and **`#korekta-faktury-bez-numeru-ksef`**:
  criterion is the KSeF number, not the date; lists 145m, 145n, B2C originals → `NrKSeFN` = 1;
  FA(2)/KSeF 1.0 case. Does **not** say whether a 2027 correction of such an invoice must go to
  KSeF. The new post adds exactly that; link the anchor for the field mechanics instead of repeating
  them.
- `/blog/nota-korygujaca-ksef` („Noty korygującej już nie ma, także poza KSeF"): art. 106k repealed,
  no note also for out-of-KSeF invoices (section „Faktury poza KSeF i noty sprzed lutego 2026"),
  `Podmiot2K`, buyer reports errors to the seller. Link for „kupujący nie wystawi noty".
- `/blog/faktura-poza-ksef-odliczenie-vat` (updated 2026-11-07): buyer's deduction from out-of-KSeF
  invoices, art. 86 ust. 10b pkt 1, art. 106na ust. 3, section „Co z fakturami poza KSeF w 2027 r."
  (open question on 2027). Link for the buyer side; do not restate.
- `/blog/koniec-limitu-10000-zl` (updated 2026-11-07): what ends on 31.12.2026, art. 106ga ust. 1
  for all, permanent exclusions (106ga ust. 2, rozporządzenie § 2), December invoice issued in
  January 2027 goes to KSeF. No word on corrections. Link for the context paragraph.
- `/blog/ksef-limit-10000-zl` (updated 2026-10-26): how the 10 000 zł limit is counted, what does
  not count, loss of the right. No word on corrections. Link once.
- `/blog/usuniecie-faktury-ksef` (updated 2026-10-26): no editing/deleting; errors fixed by korekta;
  section „Czego MF nie rozstrzygnęło" says out-of-KSeF invoices „koryguje się tak samo, fakturą
  korygującą, bo art. 106j ust. 1 dotyczy każdej faktury" and that cancelling an out-of-KSeF invoice
  is unresolved. Link; keep consistent.
- `/blog/faktura-z-kasy-fiskalnej-ksef-2027` (updated 2026-11-07): from 2027 the invoice to a
  receipt for a business goes to KSeF, NIP must be on the receipt (art. 106b ust. 5), art. 106h ust.
  1. No word on correcting 2026 cash-register invoices. Link for the kasa paragraph.
- Optional: `/blog/faktura-dla-osoby-prywatnej-ksef` (section „Od 2027 r. nic się tu nie zmienia")
  for the consumer exception; `/guides/awaria-ksef-offline` for offline modes;
  `/guides/aplikacja-podatnika-ksef-pierwsza-faktura` for the free MF tool.

## Contradictions & Ambiguities

- **Regulation number for art. 106s:** MF legal-basis page names Dz.U. 2025 poz. 1742
  (`limity-i-wylaczenia.md`, live 2026-10-16); `biuro-rachunkowe-ksef-kto-co-robi.md` D7 (fetched
  2026-10-26) and posts cite Dz.U. 2025 poz. 1740 § 2; `podrecznik-ksef-20-czesc-ii.md` cites poz.
  1740 for art. 106s and poz. 1742 § 3 for simplified invoices of exempt taxpayers. Not resolved
  here (no live access). Human / Judge to check.
- **[CZ2] pkt 1.6.2 „faktury korygującej w KSeF"** is phrased generally but sits in a section on
  invoices already in KSeF; it cannot be cited as MF saying that out-of-KSeF originals must be
  corrected in KSeF.
- **Wrong-NIP rule for out-of-KSeF originals** (fact 16): rule unconditioned in [XSD]/[BRO], MF
  rationale KSeF-specific.
- **[CZ2] pkt 1.7 vs [NP] pyt. 1** time scope (fact 20): already logged in
  `faktura-poza-ksef-odliczenie-vat.md`.

## Unsettled Questions (do not answer definitively in the post)

- Whether MF confirms that a 2027 correction of an art. 145m/145n invoice must be issued in KSeF
  (fact 5). The post may say „z przepisów wynika" and cite art. 106ga ust. 1, 106j, 145m, 145n.
- Whether a correction issued in December 2026 counts toward the 10 000 zł limit.
- Correcting a voluntarily-KSeF consumer invoice: must the correction also be in KSeF?
- Wrong NIP on a paper/PDF original: is the zero correction in KSeF really required (fact 16)?
- What to put in `NrFaKorygowanej` / `DataWystFaKorygowanej` for a paragon z NIP (fact 12) and the
  exact [BRO] rule for out-of-KSeF originals (fact 14).
- Buyer-side period for a downward or upward correction (fact 19).
- JPK markers for the original and the link to the correction (fact 22).
- Whether Aplikacja Podatnika (web) supports `NrKSeFN` corrections (fact 26).

## Needs local verification

1. [VAT] Dz.U. 2026 poz. 1263, full text of art. 145m ust. 1–2 and art. 145n ust. 1–4: does either
   mention corrective invoices, or extend to corrections of invoices issued under them? (KB holds
   fragments only.)
2. [A1598] art. 11–14, 16–18, 22 (restated in the obwieszczenie to [VAT]) and [A1203] art. 2 and its
   transitional provisions: any rule on corrective invoices to invoices issued before 1.02.2026 /
   1.04.2026 or outside KSeF? KB has only art. 15 (notes).
3. Art. 106s regulation: Dz.U. 2025 poz. 1740 vs poz. 1742; full § 2 list.
4. [BRO] s. 69 (PL), description of `DataWystFaKorygowanej` for an original issued outside KSeF;
   [BRO] description of `NrFaKorygowanej`.
5. [VAT] Dz.U. 2026 poz. 1263, art. 29a ust. 13, 13a, 13b, 17 (re-check against the 2026 t.j.; get
   verbatim of 13a/13b) and art. 106j ust. 2 pkt 2a full wording.
6. Kasa side: correcting a 2026 faktura z kasy / paragon z NIP in 2027 (rozporządzenie w sprawie kas
   rejestrujących; any MF FAQ entry); which number identifies a paragon uznany za fakturę in
   `NrFaKorygowanej`.
7. Rozporządzenie JPK_VAT (MF 7.12.2025) and [NP] pyt. 8/9: markers for sales invoices without KSeF
   number (art. 145m/145n) and for their corrections.
8. Podręcznik Aplikacji Podatnika (06.08.2026) and the mobile app manual (31.08.2026): correcting an
   invoice issued outside KSeF (`NrKSeFN`).
9. Art. 86 ust. 19a and ust. 10b (buyer side) in [VAT]; the „dokumentacja" condition for in-minus
   corrections (art. 29a).
10. [FAQ] and [NP] (current versions after 2026-09-11 / 2026-04-29): any new entry on corrections of
    out-of-KSeF invoices after 1.01.2027; Objaśnienia podatkowe 28.01.2026 (not in repo).
11. Art. 106ga ust. 2 pkt 4 and ust. 3–4 full wording.

## Suggested Sources Section

- Ustawa o VAT, t.j. Dz.U. 2026 poz. 1263, art. 2 pkt 32a, 106ga, 106j, 106na, 145m, 145n:
  https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf
- Ustawa o VAT, t.j. Dz.U. 2025 poz. 775, art. 29a ust. 13 i 17 (only if the seller-side timing is
  used; prefer the 2026 t.j. after local verification 5):
  https://api.sejm.gov.pl/eli/acts/DU/2025/775/text.pdf
- Podręcznik KSeF 2.0 cz. II (06.08.2026), pkt 1.6.2, 1.6.4, 2.13.1–2.13.3, 2.13.6, 2.13.8, 4.1.3,
  4.1.6:
  https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
- Podręcznik KSeF 2.0 cz. I (06.08.2026), s. 14:
  https://ksef.podatki.gov.pl/media/dmrfdixs/podrecznik-ksef-20-cz-i-rozpoczecie-korzystania-z-ksef-06082026.pdf
- Broszura informacyjna FA(3), opis pól `DaneFaKorygowanej`, `NrKSeF`, `NrKSeFN`, `Podmiot2K`:
  https://ksef.podatki.gov.pl/media/nuclnu0w/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf
- Struktura logiczna FA(3): https://crd.gov.pl/wzor/2025/06/25/13775/
- MF, Pytania i odpowiedzi KSeF 2.0 (pytania „Czy możliwe jest wystawienie korekty faktury z
  ubiegłego roku w KSeF?" i „Czy KSeF będzie obejmował faktury wystawiane dotąd na kasach fiskalnych
  online?"): https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20/
- MF, Etapy wdrożenia KSeF: https://ksef.podatki.gov.pl/etapy-wdrozenia-ksef/

## Warning: Common Misconceptions

- „Fakturę wystawioną na papierze koryguje się na papierze": no source says the correction follows
  the original's form; art. 145m/145n end on 31.12.2026 (facts 1–5). Phrase as a conclusion from the
  statute, not as an MF quote.
- „Faktura sprzed KSeF = `NrKSeFN`": the criterion is whether the original has a KSeF number, not
  its date (`faktura-korygujaca-ksef.md` misconceptions).
- „Nabywca może poprawić dane notą": no, art. 106k repealed, also for out-of-KSeF invoices (fact
  27).
- „Korektę faktury konsumenckiej też trzeba wysłać do KSeF": not required by art. 106ga ust. 2 pkt 4
  (fact 7, MEDIUM for corrections).
- „Kasa fiskalna wystawi korektę faktury z kasy w 2027": from 1.01.2027 kasy do not issue invoices
  ([CZ1] s. 14; fact 10).

## Freshness

2026-11-11, built from the KB (live checks of sibling briefs 2026-10-16 to 2026-10-26); no live
access in this run. Review: after 1.01.2027 (MF may publish guidance on corrections of 2026
out-of-KSeF invoices); when a new [CZ2] / [FAQ] / [NP] edition or VAT t.j. appears; after UD477
publication (does not touch art. 145m/145n per `sankcje-ksef-ud477.md`, re-check).
