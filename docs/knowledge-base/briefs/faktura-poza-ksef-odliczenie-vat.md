# Research Brief: Faktura wystawiona poza KSeF: co z odliczeniem VAT

**Requested by:** Orchestrator (content backlog item `faktura-poza-ksef-odliczenie-vat`) **Date:**
2026-10-14 **For content:** PL blog post „Faktura wystawiona poza KSeF: co z odliczeniem VAT"
**Personas:** Pani Krystyna (księgowa, biuro rachunkowe) and VAT-registered (czynny) JDG buyers.
VAT-exempt buyers (art. 113) do not deduct VAT, so the deduction part does not apply to them
(`falszywe-faktury-ksef.md`, „Podatnik zwolniony z VAT").

**Provenance:** built only from the repo knowledge base. Baseline `docs/knowledge-base/WATCHLIST.md`
(last checked 2026-10-07): VAT Act consolidated text Dz.U. 2026 poz. 1263; Podręcznik KSeF 2.0 cz.
I–IV of 2026-08-06; FAQ „Najczęstsze pytania" published 2026-04-15, modified 2026-04-29. No official
host was fetched in this run (egress proxy blocks ksef.podatki.gov.pl, gov.pl,
isap/api.sejm.gov.pl). The KB extract of Podręcznik cz. II (`podrecznik-ksef-20-czesc-ii.md`) is a
condensed Polish summary of the **2026-02-01** edition, not a verbatim transcript: its lines are
cited as „KB extract text"; page numbers (s. 29–32) come from sibling briefs that recorded them from
the 06.08.2026 edition. FAQ „Najczęstsze pytania" wording is quoted only where a KB brief already
quotes it; English paraphrases in `mf-faq-podreczniki-2026.md` are marked as paraphrases.

**Abbreviations:** [VAT] ustawa o VAT, Dz.U. 2026 poz. 1263; [NP] MF FAQ „Najczęstsze pytania";
[CZ2] Podręcznik KSeF 2.0 cz. II; [CZ1] Podręcznik KSeF 2.0 cz. I; [MF0916] komunikat MF z
16.09.2026; [UD477] projekt UD477 (RCL). URLs in „Suggested Sources Section".

**COMBINATION** = the fact joins two or more KB facts; no single KB sentence states it. Do not
attribute a COMBINATION sentence to MF as a quote.

---

## 1. Target query

„faktura poza KSeF odliczenie VAT"

## 2. Answer in two sentences

Tak, możesz odliczyć VAT z faktury, którą dostałeś poza KSeF: MF pisze, że prawo do odliczenia
„będzie nadal zapewnione" także wtedy, gdy sprzedawca pominął obowiązek KSeF, o ile spełnione są
przesłanki z art. 86 i nie zachodzą negatywne z art. 88, a brak faktury w KSeF to „uchybienie
formalne", które obciąża wystawcę ([NP] pyt. 1, 2, 4; [CZ2] pkt 1.7). Prawo do odliczenia powstaje w
okresie powstania obowiązku podatkowego, nie wcześniej niż w okresie faktycznego otrzymania takiej
faktury (art. 86 ust. 10b pkt 1), podczas gdy fakturę z KSeF otrzymujesz w dniu nadania jej numeru
KSeF (art. 106na ust. 3) ([CZ2] pkt 1.7, 5.1).

## 3. What changes the answer

- **Dlaczego faktura jest poza KSeF.** Legalnie poza KSeF w 2026: sprzedawca w limicie 10 000 zł
  brutto miesięcznie (art. 145m) albo faktura z kasy rejestrującej / paragon z NIP do 450 zł (art.
  145n), oba tylko do 31.12.2026; na stałe: sprzedawca bez siedziby i stałego miejsca działalności w
  Polsce (art. 106ga ust. 2 pkt 1–2) i inne wyłączenia z art. 106ga ust. 2. Tryby offline mają
  własne zasady daty otrzymania. Sprzedawca, który po prostu zignorował obowiązek: odliczenie wg MF
  zachowane, ale faktura to „sygnał ostrzegawczy" ([NP] pyt. 5). Fakty 1–8, 12–15.
- **Tryb offline24 / niedostępność:** data otrzymania = data nadania numeru KSeF (art. 106nda ust.
  11; 106nh ust. 4); jeśli dokument przyszedł e-mailem wcześniej (nieprawidłowo), odliczenie od dnia
  faktycznego otrzymania ([CZ2] pkt 1.8). Awaria (106nf) i awaria całkowita (106ng): data otrzymania
  NOT IN KB. Fakty 9–11.
- **Data: 1 stycznia 2027.** Koniec art. 145m i 145n; stanowisko MF o odliczeniu w [CZ2] pkt 1.7 ma
  w tytule „luty–grudzień 2026", [NP] pyt. 1 nie ma ograniczenia w czasie: NIE wiadomo, czy MF je
  powtórzy na 2027. Kary z art. 106ni (dla wystawcy) wchodzą 1.01.2027 według obowiązującej ustawy;
  MF zapowiedziało odroczenie do końca 2027, projekt UD477 (nieuchwalony) przesuwa je na 1.01.2028.
  Fakty 16–21.
- **Status nabywcy:** czynny podatnik VAT odlicza; zwolniony (art. 113) nie odlicza (temat
  odliczenia go nie dotyczy).

---

## Key Facts (ready to use)

### A. Kiedy faktura legalnie przychodzi poza KSeF (2026) vs sprzedawca, który zignorował obowiązek

1. **Zasada: podatnicy wystawiają faktury ustrukturyzowane w KSeF; nabywca krajowy z NIP (B2B)
   otrzymuje fakturę w KSeF.**
   - Verbatim (art. 106ga ust. 1, quoted in `koniec-limitu-10000-zl.md` fakt 2): „Podatnicy są
     obowiązani wystawiać faktury ustrukturyzowane przy użyciu Krajowego Systemu e-Faktur."
   - KB extract text [CZ2] pkt 1.6.5: „Zasada: nabywca krajowy z NIP (B2B) otrzymuje fakturę w
     KSeF."
   - Source: [VAT] art. 106ga ust. 1; [CZ2] pkt 1.6.5. Tier 1 / Tier 2. Confidence: HIGH.
     Krystyna-relevant: yes.

2. **Art. 145m: od 1.04.2026 do 31.12.2026 podatnik może wystawiać faktury papierowe lub
   elektroniczne, jeśli łączna wartość sprzedaży z podatkiem udokumentowana nimi w danym miesiącu
   nie przekracza 10 000 zł; prawo traci się od faktury, którą przekroczono limit.**
   - Verbatim fragment: „w okresie od dnia 1 kwietnia 2026 r. do dnia 31 grudnia 2026 r."
   - Source: [VAT] art. 145m ust. 1–2 (`koniec-limitu-10000-zl.md` fakt 1). Tier 1 (law). HIGH.
   - MF FAQ: limit liczy tylko faktury, które muszą być w KSeF (nie faktury konsumenckie, nie
     sprzedaż z kasy na rzecz konsumentów); po przekroczeniu obowiązek KSeF od tej faktury, nawet
     jeśli kolejne miesiące są poniżej. — [NP] pyt. 12–14 (English paraphrase in
     `mf-faq-podreczniki-2026.md` fakt 1). Tier 3. HIGH.
   - Krystyna-relevant: yes (dostawcy klientów w limicie).

3. **Art. 145n ust. 1: od 1.02.2026 do 31.12.2026 podatnicy mogą wystawiać faktury przy zastosowaniu
   kas rejestrujących oraz paragony fiskalne uznane za faktury (art. 106e ust. 5 pkt 3: paragon z
   NIP do 450 zł / 100 euro).**
   - Verbatim: „W okresie od dnia 1 lutego 2026 r. do dnia 31 grudnia 2026 r. podatnicy obowiązani
     do wystawiania faktur ustrukturyzowanych mogą wystawiać: 1) faktury elektroniczne lub faktury w
     postaci papierowej przy zastosowaniu kas rejestrujących; 2) paragony fiskalne uznane za faktury
     wystawione zgodnie z art. 106e ust. 5 pkt 3."
   - Source: [VAT] art. 145n ust. 1 (`faktura-z-kasy-fiskalnej-ksef-2027.md` fakt 1). Tier 1. HIGH.
     Krystyna-relevant: yes (paragony z NIP za paliwo, drobne zakupy).

4. **Stałe wyłączenia z obowiązku (art. 106ga ust. 2): sprzedawca bez siedziby i stałego miejsca
   działalności w Polsce (pkt 1), sprzedawca ze stałym miejscem w Polsce, które nie uczestniczy w
   dostawie (pkt 2), procedury szczególne, nabywca będący konsumentem (pkt 4), art. 113a ust. 1 (pkt
   6); dalsze przypadki w rozporządzeniu wydanym na podstawie art. 106s (Dz.U. 2025 poz. 1740).**
   - Source: [VAT] art. 106ga ust. 2 (`kary-ksef-2027-2028.md` fakt 11; `koniec-limitu-10000-zl.md`,
     What changes the answer). Tier 1. HIGH. KB describes these as „Wyłączenia z obowiązku stałe".
   - **NOT IN KB:** the text of Dz.U. 2025 poz. 1740 §2 (marked „TEXT NOT ACCESSIBLE" in
     `limit-10000-zl.md`). Do not list its cases.
   - Krystyna-relevant: yes (zagraniczni dostawcy: SaaS, reklamy, hosting itp. — examples are ours,
     not MF's; do not attribute).

5. **Faktury konsumenckie są poza obowiązkiem (art. 106ga ust. 2 pkt 4), ale dla tematu odliczenia
   są bez znaczenia:** konsument nie odlicza VAT. For a JDG buyer the relevant point is the reverse:
   kupując jako firma, podaje NIP, a sprzedawca objęty obowiązkiem wystawia fakturę w KSeF.
   - Source: [VAT] art. 106ga ust. 2 pkt 4 (`faktura-dla-osoby-prywatnej-ksef.md` fakt 1). HIGH for
     the exclusion.
   - **NOT SETTLED:** who decides whether a JDG owner buys privately or for the business, and
     whether giving / not giving NIP changes it (`faktura-dla-osoby-prywatnej-ksef.md` fakt 10;
     `jak-odebrac-fakture-ksef.md` fakt 16).

6. **Zagraniczny NABYWCA nie jest wyłączony — wyłączony jest zagraniczny SPRZEDAWCA bez siedziby /
   stałego miejsca.** Faktura dla nabywcy z art. 106gb ust. 4 (zagraniczny, bez NIP, konsument, SME
   UE) jest wystawiana w KSeF i przekazywana w sposób uzgodniony z kodem QR.
   - Source: [CZ2] pkt 1.6.5, 5.3.1 (`jak-odebrac-fakture-ksef.md` fakt 15); published post
     `ksef-od-1-kwietnia-2026.mdx` line 130 (our output, consistent). HIGH. Relevance: avoids
     confusing „faktura zagraniczna" with „faktura poza KSeF".

7. **Sprzedawcy objęci obowiązkiem nie wydają faktur poza systemem nabywcom krajowym z NIP (mogą
   wydać „potwierdzenie transakcji").**
   - KB extract text [CZ2] pkt 6.2: „Sprzedawcy objęci obowiązkiem KSeF od 1.02.2026 nie wydają
     faktur poza systemem nabywcom krajowym z NIP (ale mogą wydawać potwierdzenia transakcji)."
   - Potwierdzenie transakcji: „propozycja biznesowa, nie dokument podatkowy" ([CZ2] pkt 1.6.6).
   - Tier 2. HIGH. Krystyna-relevant: yes (potwierdzenie transakcji ≠ faktura, nie jest podstawą
     odliczenia — **COMBINATION/inference**: KB says only „nie dokument podatkowy"; do not write
     „nie jest podstawą odliczenia" as MF wording).

8. **PDF / papier z kodem QR od sprzedawcy, który wystawił w KSeF, to wizualizacja e-Faktury, nie
   „faktura poza KSeF".** Online invoice used outside KSeF carries one QR code with the KSeF number;
   offline invoice not yet sent carries two („OFFLINE" + „CERTYFIKAT"). Scanning the QR returns the
   basic data „lub informacja o braku faktury w KSeF".
   - Source: [CZ2] pkt 1.6.5, 5.4.1, 5.5 (`jak-odebrac-fakture-ksef.md` fakty 17, 18). HIGH for the
     QR rules.
   - **COMBINATION:** that the receipt date of such a PDF copy is still the KSeF-number date (art.
     106na ust. 3, fakt 9) and not the e-mail date joins [CZ2] pkt 1.6.5 with pkt 5.1. MEDIUM. Also
     NOT SETTLED in KB: the legal weight of a PDF/visualisation vs XML for a KSeF buyer
     (`jak-odebrac-fakture-ksef.md` fakt 24).

### B. Kiedy powstaje prawo do odliczenia

9. **Faktura z KSeF: data otrzymania = dzień przydzielenia numeru KSeF (art. 106na ust. 3).**
   - KB extract text [CZ2] pkt 5.1: „Art. 106na ust. 3 — data otrzymania = dzień przydzielenia
     numeru KSeF." UPO element 9: „Data nadania numeru KSeF = data otrzymania e-Faktury przez
     nabywcę" ([CZ2] pkt 4.2).
   - Art. 106na ust. 4: dla nabywców z art. 106gb ust. 4 — data faktycznego otrzymania poza KSeF.
   - Source: [VAT] art. 106na ust. 3–4; [CZ2] pkt 5.1. HIGH. Statute held in KB only as the
     Podręcznik's paraphrase (`jak-odebrac-fakture-ksef.md`, Unsettled).

10. **Faktura poza KSeF: prawo do odliczenia powstaje w okresie powstania obowiązku podatkowego, nie
    wcześniej niż w okresie otrzymania faktury (art. 86 ust. 10b pkt 1); moment otrzymania = data
    faktycznego otrzymania poza KSeF.**
    - KB extract text [CZ2] pkt 1.7: „Prawo do odliczenia VAT naliczonego z faktury wystawionej poza
      KSeF powstaje w okresie, w którym powstał obowiązek podatkowy, nie wcześniej niż w okresie
      otrzymania faktury (art. 86 ust. 10b pkt 1). Moment otrzymania = data faktycznego otrzymania
      poza KSeF."
    - Source: [CZ2] pkt 1.7 (s. 29–30 of the 06.08.2026 edition per `kary-ksef-2027-2028.md` fakt
      12); [VAT] art. 86 ust. 10b pkt 1. Tier 2 / Tier 1. HIGH. Krystyna-relevant: yes.
    - Note: art. 86 ust. 1 and the verbatim of ust. 10b are NOT IN KB; quote only the Podręcznik
      sentence. The claim „prawo do odliczenia powstaje w okresie ujęcia faktury w ewidencji (art.
      86 ust. 10)" is not supported by the KB (`falszywe-faktury-ksef.md` fakt 4) — do not use.
    - **COMBINATION:** applying art. 86 ust. 10b pkt 1 together with art. 106na ust. 3 to an
      ordinary online KSeF invoice (period of the KSeF-number date) is not a KB sentence
      (`jak-odebrac-fakture-ksef.md` fakt 4). MEDIUM. Phrase as two separate rules.

11. **Offline24 otrzymana wcześniej e-mailem (podwójnie wystawiona faktura, przypadek 2):** faktura
    offline24 musi trafić do KSeF najpóźniej następnego dnia roboczego; nabywca otrzymuje ją w KSeF,
    data otrzymania = data nadania numeru KSeF; jeśli nabywca dostał dokument poza KSeF przed
    przesłaniem do KSeF („działanie nieprawidłowe sprzedawcy"), nabywa prawo odliczenia w dacie
    faktycznego otrzymania.
    - KB extract text [CZ2] pkt 1.8 pkt 2: „Datą otrzymania jest data nadania numeru KSeF. Jeśli
      nabywca otrzymał dokument poza KSeF przed przesłaniem do KSeF (działanie nieprawidłowe
      sprzedawcy), nabywa prawo odliczenia w dacie faktycznego otrzymania."
    - Statute: art. 106nda ust. 2 (termin), ust. 3 (nabywca z krajowym NIP otrzymuje fakturę
      wyłącznie w KSeF), ust. 11 (data otrzymania) (`awaria-ksef-offline.md` fakty 3, 4, 6).
    - Niedostępność (art. 106nh): ust. 4 odsyła do art. 106nda ust. 4–15 „odpowiednio", więc ust. 11
      też (`jak-odebrac-fakture-ksef.md` fakt 22). HIGH. UD477 widens the reference to ust. 3–15
      (draft).
    - Source: [CZ2] pkt 1.8 (s. 31–32 per `awaria-ksef-offline.md` fakt 6). Tier 2. HIGH.
      Krystyna-relevant: yes.

12. **Podwójnie wystawiona faktura, przypadek 1: faktura elektroniczna poza KSeF „nigdy nie zostanie
    przesłana do KSeF"; prawo do odliczenia od daty faktycznego otrzymania.**
    - KB extract text [CZ2] pkt 1.8 pkt 1: „Faktura elektroniczna poza KSeF — nigdy nie zostanie
      przesłana do KSeF (nie spełnia wymogów technicznych). Prawo do odliczenia od daty faktycznego
      otrzymania."
    - Source: [CZ2] pkt 1.8 (section added in the February 2026 edition, per the extract's
      changelog). Tier 2. HIGH that the Podręcznik says this. See Unsettled (meaning of
      „podwójnie").

13. **Awaria (art. 106nf) i awaria całkowita (art. 106ng):** w trybie awaryjnym faktura „wydawana
    nabywcy poza KSeF z dwoma kodami QR" i przesyłana do KSeF w 7 dni roboczych od końca awarii;
    przy awarii całkowitej faktur nie przesyła się do KSeF.
    - Source: [CZ2] pkt 1.6.6; [VAT] art. 106nf ust. 4, 106ng (`awaria-ksef-offline.md` fakt 3).
      HIGH.
    - **NOT IN KB:** the receipt date (hence deduction period) for a domestic NIP buyer of an awaria
      (106nf) or awaria całkowita (106ng) invoice (`jak-odebrac-fakture-ksef.md` fakt 22). Do not
      state.

### C. Stanowisko MF: odliczenie zachowane, ale z należytą starannością

14. **Prawo do odliczenia z faktury wystawionej poza KSeF wbrew obowiązkowi „będzie nadal
    zapewnione, pod warunkiem spełnienia przesłanek materialnych odliczenia, o których mowa w art.
    86 ustawy, oraz niezaistnienia przesłanek negatywnych zgodnie z art. 88 ustawy".**
    - Source: [NP] pyt. 1 (quoted in `kary-ksef-2027-2028.md` fakt 12). Tier 3 (MF guidance, not
      law). HIGH.
    - Parallel, Tier 2: KB extract text [CZ2] pkt 1.7: „Prawo do odliczenia jest zapewnione nawet
      gdy dostawca wystawił fakturę z pominięciem obowiązku KSeF, pod warunkiem spełnienia
      przesłanek materialnych (art. 86) i niezaistnienia przesłanek negatywnych (art. 88)." HIGH.
    - MF justifies it by the „etapowanie" of the rollout (`kary-ksef-2027-2028.md` fakt 12). HIGH.
    - [NP] pyt. 1/2 also: no automatic negative consequence for the buyer — **English paraphrase**
      in `mf-faq-podreczniki-2026.md` fakt 1; no Polish verbatim in KB. MEDIUM as wording.
    - **NOT IN KB:** text of art. 88 (incl. ust. 3a) and art. 86 ust. 1. Refer generally to
      „przesłanki negatywne z art. 88" (`falszywe-faktury-ksef.md` fakt 6).
    - Krystyna-relevant: yes (core of the post).

15. **„Brak faktury w KSeF jest traktowany jako uchybienie formalne"; „Naruszenie obowiązku
    wystawienia faktury w KSeF obciąża co do zasady wystawcę."** Dokument poza KSeF nie spełnia
    definicji faktury ustrukturyzowanej (art. 2 pkt 32a), ale na gruncie art. 86 pozostaje
    dokumentem (fakturą) podstawą odliczenia, jeśli spełnione są przesłanki materialne.
    - Source: [NP] pyt. 4 i 2 (`kary-ksef-2027-2028.md` fakt 13). Tier 3. HIGH for the two quoted
      sentences; the art. 2 pkt 32a / art. 86 sentence is the KB brief's paraphrase of the FAQ, not
      a verbatim quote (MEDIUM as wording).
    - Context: [CZ2] pkt 1.1: faktura (art. 2 pkt 31) can be paper or electronic; e-Faktura =
      „faktura wystawiona przy użyciu KSeF wraz z przydzielonym numerem". HIGH.

16. **Nabywca nie musi weryfikować / wzywać sprzedawcy, ale ma zachować należytą staranność i
    zabezpieczyć dowody; brak faktury w KSeF „powinien stanowić dla nabywcy sygnał ostrzegawczy", a
    takie faktury „mogą zwiększać ryzyko weryfikacji rzetelności całej transakcji".**
    - [NP] pyt. 5: nabywca nie ma obowiązku wzywania sprzedawcy do wystawienia faktury w KSeF;
      powinien zabezpieczyć dowody faktycznego dokonania transakcji (płatności, protokoły,
      korespondencja); quotes as above. Refers to [CZ2] s. 32. (`kary-ksef-2027-2028.md` fakt 14).
      Tier 3. HIGH.
    - KB extract text [CZ2] pkt 1.7: „Nabywca nie ma obowiązku weryfikacji, czy faktura została
      prawidłowo wystawiona poza KSeF, ale powinien zachować należytą staranność." Tier 2. HIGH.
    - Krystyna-relevant: yes (archiwizuj przelewy, protokoły, maile; lista dostawców poza KSeF — the
      „lista dostawców" tip is from our published post `kary-ksef-2027-2028.mdx`, not MF).

17. **Sprzedawca: wystawienie dokumentu poza KSeF nie powoduje, że czynność przestaje podlegać VAT;
    sprzedawca nadal rozlicza podatek.**
    - Source: [NP] pyt. 3 (`kary-ksef-2027-2028.md` fakt 15; English paraphrase in KB, no Polish
      verbatim). Tier 3. HIGH (substance), MEDIUM (wording).

18. **Kara z art. 106ni dotyczy podatnika, który „wbrew obowiązkowi" nie wystawił faktury w KSeF,
    wystawił w trybie awarii/niedostępności/offline24 niezgodnie ze wzorem albo nie przesłał jej w
    terminie; do 100% kwoty podatku z faktury, bez podatku do 18,7% kwoty należności ogółem; nakłada
    ją naczelnik urzędu skarbowego decyzją.**
    - Source: [VAT] art. 106ni ust. 1–3 (`kary-ksef-2027-2028.md` fakty 1–2). Tier 1. HIGH.
    - **COMBINATION/inference:** „kara z art. 106ni nie dotyczy nabywcy" — the KB lists only
      issuer-side violations and MF says the breach „obciąża co do zasady wystawcę" (fakt 15); no KB
      sentence states „nabywca nie podlega karze". MEDIUM. Phrase as „kary z art. 106ni dotyczą
      wystawcy faktury".
    - Art. 106ni ust. 4 (no fiscal-penal proceedings for breaches of art. 106ga ust. 1, 106nda ust.
      2, 106nf ust. 4, 106nh ust. 2) is not in the 2027-01-01 list (`kary-ksef-2027-2028.md` fakt
      4). HIGH. Not buyer-relevant.

### D. Co się zmienia od 1 stycznia 2027

19. **Od 1.01.2027 nie ma limitu 10 000 zł (art. 145m) ani faktur z kas / paragonów z NIP jako
    faktur uproszczonych (art. 145n).**
    - Verbatim [CZ1] s. 14: „Od 1 stycznia 2027 r. Brak możliwości wystawiania faktur przy użyciu
      kas rejestrujących i uznawania za faktury uproszczone paragonów fiskalnych z NIP nabywcy."
    - MF roadmap: „1 stycznia 2027 r. KSeF obowiązkowy dla wszystkich." (`koniec-limitu-10000-zl.md`
      fakt 3).
    - Source: [VAT] art. 145m, 145n; [CZ1] s. 14 (`faktura-z-kasy-fiskalnej-ksef-2027.md` fakt 3).
      Tier 1 / 2. HIGH.
    - Stałe wyłączenia z art. 106ga ust. 2 (fakt 4) i tryby offline (fakty 11, 13) zostają; KB has
      no end date for them. HIGH (by absence of an end date; `faktura-dla-osoby-prywatnej-ksef.md`
      fakt 12).
    - **COMBINATION:** „od 2027 faktura od krajowego sprzedawcy dla nabywcy z NIP poza KSeF (poza
      trybami offline) oznacza zwykle naruszenie obowiązku" joins fakty 1, 4, 19. MEDIUM. Do not
      present as MF wording; the regulation 1740 cases are NOT IN KB.

20. **Czy MF powtórzy stanowisko o odliczeniu na 2027: NIE ROZSTRZYGNIĘTE.** [NP] pyt. 1 nie ma
    ograniczenia do roku, ale uzasadnienie odwołuje się do „etapowania"; [CZ2] pkt 1.7 ma tytuł
    „Odliczenie podatku VAT z faktur wystawionych poza KSeF (luty–grudzień 2026)".
    - Source: `kary-ksef-2027-2028.md`, Unsettled Questions (3rd bullet) and fakt 12. HIGH that the
      question is open.
    - The published post `kary-ksef-2027-2028.mdx` states: „Odpowiedzi o odliczeniu nie mają
      ograniczenia w czasie." That is accurate for [NP] but must be read together with the [CZ2]
      title (our output, not a source).

21. **Komunikat MF z 16.09.2026: kary odroczone do 31.12.2027 (zapowiedź, wymaga ustawy); KAS w 2027
    ma najpierw wspierać i przypominać, ale „będą reagować w przypadkach wystawiania faktur poza
    KSeF (z wyjątkiem ustawowo określonych przypadków) oraz badać, czy niestosowanie systemu nie
    prowadzi do nierzetelnego rozliczania podatku"; „Odroczenie kar nie oznacza braku obowiązku
    stosowania KSeF"; „Proponowane wydłużenie okresu odroczenia kar wymaga zmian ustawowych."**
    - Source: [MF0916] (`kary-ksef-2027-2028.md` fakt 7). MF announcement, not law. HIGH.
    - Uzasadnienie [UD477]: in 2027 KAS checks „zgodnie z zasadami art. 272 ustawy – Ordynacja
      podatkowa", whether not using KSeF leads to „nierzetelnego rozliczania podatku należnego i
      naliczonego" (`kary-ksef-2027-2028.md` fakt 9, HIGH; `sankcje-ksef-ud477.md` fakt 7 rates the
      same uzasadnienie MEDIUM, „verify in the RCL file before quoting" — see Contradictions).
      „Naliczonego" = the buyer's input VAT side. Draft, not law.
    - Krystyna-relevant: yes (2027 = większe ryzyko czynności sprawdzających także po stronie
      nabywcy — **COMBINATION/inference** from „naliczonego"; MEDIUM).

22. **Status prawny kar na 2026-10-14:** art. 106ni ust. 1–3 i 5–7 wchodzą w życie 1.01.2027 (Dz.U.
    2026 poz. 1263). Projekt UD477 (wersja 22.09.2026; uzgodnienia/konsultacje otwarte 23.09.2026,
    uwagi do 30.09.2026) przesuwa je na 1.01.2028, ustawa ma wejść w życie 31.12.2026. Brak wersji
    późniejszej niż 22.09.2026 w KB; KB has no record of Sejm/Dz.U. stage.
    - Source: [VAT]; [UD477] (`kary-ksef-2027-2028.md` fakty 4, 8; `WATCHLIST.md`; CHANGELOG
      2026-10-07). HIGH (state as of KB check 2026-10-07; not re-checked 2026-10-14).
    - Older MF materials say „Do 31 grudnia 2026 r. podatnicy nie będą karani" ([CZ2] s. 32) and
      [NP] pyt. 2: „za 2026 rok nie będą nakładane sankcje"; [NP] pyt. 3: kary „dopiero za
      naruszenia dokonane od 1 stycznia 2027 roku" — all predate [MF0916] (`sankcje-ksef-ud477.md`
      fakt 8). HIGH as quotes; pyt. 3 outdated if UD477 is enacted.

### E. Duplikaty (ta sama faktura poza KSeF i w KSeF)

23. **KB has only [CZ2] pkt 1.8 (fakty 11–12): two cases of „podwójnie wystawiona faktura" and the
    receipt date for each. No KB sentence says „odliczasz tylko raz", which document to book, or how
    to handle a seller who sends a PDF and also issues the same invoice in KSeF.**
    - Status: **NOT IN KB.** Do not state a rule on booking/deducting once as an MF position. If the
      post mentions it, mark it as general accounting common sense, not a source fact.
    - Unrelated mechanism, do not confuse: KSeF rejects a seller's duplicate upload with error 440
      „Duplikat faktury" when NIP sprzedawcy + P_2 + RodzajFaktury repeat within 10 years ([CZ2] pkt
      3.4). That is seller-side technical deduplication, not buyer-side deduction. HIGH.

### F. JPK_V7: oznaczenia

24. **From February 2026 JPK_V7M(3)/V7K(3) require KSeF numbers of sales and purchase invoices „(lub
    odpowiednich oznaczeń przy braku numeru KSeF)".** — KB extract text [CZ2] pkt 4.1.6. Tier 2.
    HIGH.
25. **DI and BFK:** KB states only: „faktury offline24 i z niedostępności bez numeru KSeF oznacza
    się DI i koryguje do numeru; faktury z awarii całkowitej BFK" (`awaria-ksef-offline.md` fakt 7);
    and that [NP] pyt. 8/9 cover DI and BFK (`mf-faq-podreczniki-2026.md` fakt 1, no wording).
    - **NOT IN KB:** which marker (BFK or other) applies to a purchase invoice received outside KSeF
      under art. 145m/145n, from a foreign seller, or from a seller who ignored the obligation; the
      Rozporządzenie JPK_VAT text; [NP] pyt. 8/9 verbatim. Backlog has a separate item
      `di-bfk-jpk-v7` (docs/content-backlog.md). Do not state BFK for out-of-KSeF purchase invoices
      in this post.

---

## Contradictions & Ambiguities (within KB)

- **UD477 uzasadnienie confidence:** `kary-ksef-2027-2028.md` fakt 9 quotes it at HIGH;
  `sankcje-ksef-ud477.md` fakt 7 rates it MEDIUM („per MF/legislative summary, verify in the RCL
  file before quoting"). Resolution not by inference: quote [MF0916] (HIGH) for the 2027 KAS
  reaction and use the uzasadnienie only with „projekt" and attribution.
- **Time scope of the deduction position:** [NP] pyt. 1 has no year limit; [CZ2] pkt 1.7 title is
  „luty–grudzień 2026". Both MF, different tiers (Tier 2 title vs Tier 3 FAQ). Not resolved; see
  Unsettled.
- **[CZ2] pkt 1.8 heading „Skutki podwójnie wystawionej faktury"** — the KB extract does not define
  „podwójnie"; case 1 describes an electronic invoice that „nigdy nie zostanie przesłana do KSeF",
  which does not read as a duplicate. The extract is a condensed summary; the 06.08.2026 PDF (s.
  31–32) needs re-reading.

## Unsettled Questions (do NOT answer definitively)

- Czy stanowisko MF o zachowaniu odliczenia (pyt. 1, pkt 1.7) obowiązuje także dla faktur poza KSeF
  wystawionych w 2027 r. (fakt 20).
- Czy UD477 zostanie uchwalony i opublikowany do 31.12.2026 (fakt 22). Do not write „kary od 2028"
  as law.
- Jak konkretnie KAS „zareaguje" w 2027 i czy czynności sprawdzające obejmą nabywców (fakt 21):
  komunikat i uzasadnienie opisują zamiar, nie procedurę.
- Czy i kiedy MF zaktualizuje [NP] pyt. 2/3 po komunikacie z 16.09.2026 (FAQ modified 2026-04-29).
- Data otrzymania faktury z trybu awaryjnego (106nf) i awarii całkowitej (106ng) dla nabywcy z
  krajowym NIP (fakt 13).
- Podwójna faktura (PDF + KSeF): który dokument ująć, jak uniknąć podwójnego odliczenia (fakt 23).
- Oznaczenia JPK_V7 dla faktur zakupowych poza KSeF (fakt 25).
- Treść art. 88 (w tym ust. 3a) i art. 86 ust. 1 — nieprzeczytane w KB; nie cytować.
- Przypadki z rozporządzenia Dz.U. 2025 poz. 1740 §2 — tekst niedostępny w KB.
- Jak nabywca ma odróżnić sprzedawcę w limicie 10 000 zł od tego, który zignorował obowiązek: KB
  says only that the buyer need not verify (fakt 16); no MF method described.
- JDG kupująca prywatnie vs firmowo (fakt 5).

## Suggested Sources Section

All URLs below already appear in `docs/knowledge-base/` (and most in published PL posts). None was
fetched live on 2026-10-14.

- MF, KSeF: Najczęstsze pytania (pyt. 1–5, 12–14; opublik. 15.04.2026, zmodyf. 29.04.2026):
  https://ksef.podatki.gov.pl/ksef-news/najczestsze-pytania/
- Podręcznik KSeF 2.0 cz. II (06.08.2026), pkt 1.1, 1.6.5, 1.6.6, 1.7, 1.8 (s. 29–32), 4.1.6, 5.1,
  6.2:
  https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
- Podręcznik KSeF 2.0 cz. I (06.08.2026), s. 14:
  https://ksef.podatki.gov.pl/media/dmrfdixs/podrecznik-ksef-20-cz-i-rozpoczecie-korzystania-z-ksef-06082026.pdf
- Ustawa o VAT, tekst jednolity Dz.U. 2026 poz. 1263 (art. 86 ust. 10b pkt 1, 106ga, 106gb, 106na,
  106nda, 106nf, 106ng, 106nh, 106ni, 145m, 145n):
  https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf (ISAP:
  https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260001263)
- MF, „Przedłużenie odroczenia kar za błędy w stosowaniu KSeF do końca 2027 r." (16.09.2026):
  https://www.gov.pl/web/finanse/przedluzenie-odroczenia-kar-za-bledy-w-stosowaniu-ksef-do-konca-2027-r
- Projekt UD477 (RCL): https://legislacja.rcl.gov.pl/projekt/12414954
- MF, Podstawy prawne oraz kluczowe terminy (wyłączenia do końca 2026):
  https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/podstawy-prawne-oraz-kluczowe-terminy/
- MF, Poniżej 10 000 zł: https://ksef.podatki.gov.pl/ponizej-10-000-zl/
- MF, Etapy wdrożenia KSeF: https://ksef.podatki.gov.pl/etapy-wdrozenia-ksef/
- MF, Tabela trybów wystawiania faktur (24.02.2026):
  https://ksef.podatki.gov.pl/media/xp2dhszg/tabela-tryby-wystawiania-faktur-24022026.pdf
- FAQ KSeF 2.0 (optional; potwierdzenie że zwolnieni też w KSeF):
  https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20/

Internal links (published, link don't restate): `/blog/kary-ksef-2027-2028`,
`/blog/koniec-limitu-10000-zl`, `/blog/ksef-limit-10000-zl`,
`/blog/faktura-z-kasy-fiskalnej-ksef-2027`, `/guides/awaria-ksef-offline`,
`/guides/jak-odebrac-fakture-ksef`, `/blog/falszywe-faktury-ksef`, `/blog/faktura-zagraniczna-ksef`.

## Warning: Common Misconceptions (myths to avoid)

- **„Faktura poza KSeF jest nieważna / kupujący traci VAT."** MF: odliczenie zachowane przy art. 86
  i braku art. 88; brak w KSeF to „uchybienie formalne" obciążające wystawcę ([NP] pyt. 1, 2, 4).
  Older ksefuj posts once said „kontrahent może mieć problem z odliczeniem" / „przepisy mogą
  ograniczać prawo nabywcy" (`faktury-scamowe.md` fakt 2.3); no MF source; current posts no longer
  say it.
- **„Odliczenie jest zawsze bezpieczne, nic nie trzeba robić."** MF: „sygnał ostrzegawczy", ryzyko
  weryfikacji rzetelności całej transakcji; zabezpiecz dowody ([NP] pyt. 5).
- **„Nabywca musi wezwać sprzedawcę do wystawienia faktury w KSeF / sprawdzić, czy sprzedawca mieści
  się w limicie."** No obligation ([NP] pyt. 5; [CZ2] pkt 1.7).
- **„Prawo do odliczenia powstaje w okresie ujęcia faktury w ewidencji (art. 86 ust. 10)."** Not in
  KB; the rule is art. 86 ust. 10b pkt 1 (`falszywe-faktury-ksef.md` fakt 4).
- **„Datą otrzymania faktury z KSeF jest dzień, w którym ją pobierzesz / dostaniesz PDF mailem."**
  No: dzień nadania numeru KSeF (art. 106na ust. 3). Exception: offline24 document received early
  outside KSeF ([CZ2] pkt 1.8).
- **„Faktura dla zagranicznej firmy jest poza KSeF."** The foreign SELLER without seat/fixed
  establishment is excluded (art. 106ga ust. 2 pkt 1–2); invoices TO foreign buyers go through KSeF.
- **„Potwierdzenie transakcji to faktura."** „propozycja biznesowa, nie dokument podatkowy" ([CZ2]
  pkt 1.6.6).
- **„Kary są od 2028 r."** Only MF announcement + draft UD477; the law in force says 1.01.2027.
- **„Brak kar = można wystawiać poza KSeF."** [MF0916]: „Odroczenie kar nie oznacza braku obowiązku
  stosowania KSeF".
- **„Kary grożą też kupującemu."** Art. 106ni targets the issuer (fakt 18; COMBINATION, MEDIUM).
- **„Do 31 grudnia 2026 r. podatnicy nie będą karani" as the full story** — true for 2026 but the
  2027 date is in flux; FAQ pyt. 3 and Podręcznik s. 32 predate 16.09.2026.
- **„Limit 10 000 zł i paragony z NIP zostają w 2027."** Both end 31.12.2026 (art. 145m, 145n; [CZ1]
  s. 14).
- **„Faktury z awarii całkowitej później trafiają do KSeF."** They do not (art. 106ng).

## Freshness

2026-10-14 (KB baseline 2026-10-07). Re-check: [NP] pyt. 1–5 after any update (sanctions wording,
2027 deduction scope); UD477 stage (RCL → Sejm → Dz.U.) before 2026-12-31; 2027-01-01 (art.
145m/145n expiry, art. 106ni entry into force unless amended); a new Podręcznik cz. II edition (pkt
1.7 title, 1.8 wording); re-read cz. II 06.08.2026 s. 29–32 verbatim when gov.pl is reachable.
