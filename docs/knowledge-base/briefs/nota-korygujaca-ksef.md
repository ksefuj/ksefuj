# Research Brief: Nota korygująca a KSeF

**Requested by:** Orchestrator (content backlog item `nota-korygujaca-ksef`; backlog note: „Frame as
nota vs korekta; link faktura-korygujaca-ksef") **Date:** 2026-10-16 **For content:** PL blog post
`/blog/nota-korygujaca-ksef`, working title „Nota korygująca a KSeF" **Personas:** Pani Krystyna
(księgowa, obsługuje kilku klientów, zna noty sprzed 2026) and Ania (JDG, dostaje fakturę z błędem w
swoich danych i nie wie, czy może „wystawić notę")

**Provenance:** built only from the repo knowledge base (baseline per
`docs/knowledge-base/WATCHLIST.md`, last checked 2026-10-07: VAT Act consolidated text Dz.U. 2026
poz. 1263; Podręcznik KSeF 2.0 cz. I–IV of 2026-08-06),
`packages/validator/docs/fa3-information-sheet.md`, the FA(3) XSD
`packages/validator/src/schemas/schemat.xsd`, and published PL posts. No official host was fetched
in this run (container proxy returns 403 for isap.sejm.gov.pl, api.sejm.gov.pl, ksef.podatki.gov.pl,
gov.pl). **Nothing below was fetched live.** The Podręcznik cz. II extract
(`podrecznik-ksef-20-czesc-ii.md`) is a condensed Polish summary of the **2026-02-01** edition, not
a verbatim transcript; lines from it are cited as „KB extract text". The 2026-08-06 edition changed
„legal-basis citations, section 6.3" (content of the change not recorded,
`mf-faq-podreczniki-2026.md` fact 3).

**Source keys and URLs (all already in the KB or in published posts):**

- [CZ2] Podręcznik KSeF 2.0 cz. II (KB extract of 01.02.2026 ed.; current ed. 06.08.2026):
  https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
- [CZ3] Podręcznik KSeF 2.0 cz. III (06.08.2026), NOT extracted in KB:
  https://ksef.podatki.gov.pl/media/3ikdk3qm/podrecznik-ksef-20-cz-iii-dodatkowe-funkcjonalnosci-ksef-06082026.pdf
- [BRO] Broszura informacyjna FA(3) (repo conversion
  `packages/validator/docs/fa3-information-sheet.md`):
  https://ksef.podatki.gov.pl/media/nuclnu0w/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf
- [XSD] Struktura logiczna FA(3) (`schemat.xsd`, Polish `xsd:documentation`):
  https://crd.gov.pl/wzor/2025/06/25/13775/
- [VAT] Ustawa o VAT, t.j. Dz.U. 2026 poz. 1263:
  https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf
- [VAT2025] Ustawa o VAT, t.j. Dz.U. 2025 poz. 775 (superseded consolidated text, read in full for
  `kurs-waluty-art-31a.md`): https://api.sejm.gov.pl/eli/acts/DU/2025/775/text/T/D20250775L.pdf
- [FAQ] MF FAQ KSeF 2.0: https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20/
- [NP] MF „Najczęstsze pytania": https://ksef.podatki.gov.pl/ksef-news/najczestsze-pytania/

---

## 1. Target query

„nota korygująca KSeF" (secondary: „czy można wystawić notę korygującą w KSeF", „nota korygująca
2026", „błąd w nazwie nabywcy na fakturze KSeF")

## 2. The answer in two sentences

Od 1 lutego 2026 r. noty korygującej już nie ma: MF pisze wprost, że „nie funkcjonują już noty
korygujące", a faktury przesłanej do KSeF nie da się edytować, anulować ani odrzucić, więc jedyną
formą poprawienia jest faktura korygująca wystawiana przez sprzedawcę ([CZ2] pkt 1.6.2, 1.6.3, 6.3).
Nabywca, który widzi błąd (np. w nazwie lub adresie), zgłasza go sprzedawcy poza systemem;
sprzedawca poprawia dane nabywcy korektą z elementem `Podmiot2K`, a przy błędnym NIP nabywcy
wystawia korektę „do zera" i nową fakturę ([CZ2] pkt 1.6.4, 2.13.8; [BRO] §9.7; [XSD] `Podmiot2K`).

## 3. What changes the answer

- **Błąd w NIP nabywcy (lub sprzedawcy) zamiast w nazwie/adresie:** nie koryguje się go `Podmiot2K`
  / `Podmiot1K`; wymagana korekta do zera + nowa faktura ([CZ2] 1.6.4, 2.13.8; [BRO] §9.7 CRITICAL
  RULE; [XSD] `Podmiot1K`, `Podmiot2K`). Facts 9–11.
- **Faktura, którą korygujesz, nie ma numeru KSeF** (wystawiona poza KSeF: limit 10 000 zł z art.
  145m, faktura z kasy z art. 145n, faktura B2C poza KSeF, faktura sprzed obowiązku): korekta w
  FA(3) wskazuje ją przez `NrKSeFN` = `1` zamiast numeru KSeF ([CZ2] 2.13.6, 4.1.3; [BRO] §9.7).
  Facts 14–16.
- **Faktura wystawiona poza KSeF a nota korygująca:** zakres zniesienia not dla faktur, które nadal
  mogą powstawać poza KSeF, **nie jest opisany w KB** (fact 3, section NOT SETTLED). Do not state
  either way.
- **Kto koryguje przy samofakturowaniu** (nabywca wystawia faktury w imieniu sprzedawcy): opisane w
  cz. III, której KB nie zawiera ([CZ2] 2.12). NOT SETTLED.
- **Faktura testowa wysłana na produkcję:** to pełnoprawna faktura, korekta „do zera" niezwłocznie
  ([CZ2] 3.2.3). Fact 12.

---

## 4. Key Facts (ready to use)

Legend: **Live** = fetched from an official host in this run (always „no" here). **Ania** /
**Krystyna** = persona relevance.

### A. Czy nota korygująca jeszcze istnieje

1. **Od 1.02.2026 noty korygujące nie funkcjonują; jedyną formą poprawienia faktury przesłanej do
   KSeF jest faktura korygująca.**
   - KB extract text ([CZ2] pkt 1.6.2 „Brak możliwości edytowania wystawionej faktury"): „Po
     przesłaniu do KSeF — brak edycji. Jedyna forma poprawienia: **faktura korygująca**. Od 1 lutego
     2026 r. nie funkcjonują już noty korygujące."
   - Source: [CZ2] pkt 1.6.2 (Tier 2, MF guidance, not statute). KB:
     `podrecznik-ksef-20-czesc-ii.md` §1.6.2; repeated in `jak-odebrac-fakture-ksef.md` fakt 25 and
     `falszywe-faktury-ksef.md` fakt 10.
   - Confidence: HIGH that MF says this (MEDIUM on exact wording: condensed extract of the
     01.02.2026 edition; the 06.08.2026 edition was not re-extracted). Live: no. Ania: yes.
     Krystyna: yes.
   - Already stated in published guide `/guides/jak-odebrac-fakture-ksef` (section „Błędna lub
     podejrzana faktura"), citing „Podręcznik KSeF 2.0, cz. II, pkt 1.6.2-1.6.4 i 6.3".

2. **Legal basis of the abolition (art. 106k ustawy o VAT, repeal by ustawa z 16.06.2023, Dz.U. poz.
   1598): NOT IN KB / UNVERIFIED.**
   - A full-text search of `docs/knowledge-base/` and `packages/validator/docs/` returns **zero**
     occurrences of „106k". No KB file quotes art. 106k (old or new wording) or a provision
     repealing it. The Podręcznik extract gives no legal basis for the 1.6.2 sentence.
   - What the KB does hold: the act „ustawa z dnia 16 czerwca 2023 r. o zmianie ustawy o podatku od
     towarów i usług oraz niektórych innych ustaw (Dz. U. poz. 1598 oraz z 2024 r. poz. 852 i
     1721)", in force from 1.02.2026, cited via footnote 4 of [VAT2025] (`kurs-waluty-art-31a.md`,
     „Currency of the text" and footnote 4 quote). The KB records it only as the source of the
     current art. 31a / art. 29a wording, **not** as repealing art. 106k. No ELI/ISAP URL for poz.
     1598 exists in the KB.
   - Recommendation: the post may cite the MF sentence (fact 1). Do **not** write „art. 106k został
     uchylony ustawą z 16.06.2023" or cite art. 106k at all until it is verified against [VAT] (art.
     106k in Dz.U. 2026 poz. 1263 should show „(uchylony)") and the amending act.
   - Confidence: n/a (not in KB). Live: no.

3. **Scope of the abolition: what the KB says, and only that.**
   - [CZ2] 1.6.2 states the sentence without any qualifier (no „w KSeF" / „dla faktur
     ustrukturyzowanych"), but it sits in a chapter about invoices already sent to KSeF („Po
     przesłaniu do KSeF — brak edycji").
   - The KB has **no** sentence on noty korygujące for invoices still lawfully issued outside KSeF:
     art. 145m (10 000 zł/month, to 31.12.2026: „faktury elektroniczne lub papierowe",
     `koniec-limitu-10000-zl.md` fakt 1), art. 145n (faktury z kas, to 31.12.2026,
     `faktura-z-kasy-fiskalnej-ksef-2027.md` fakt 1), B2C invoices outside KSeF (art. 106ga ust. 2
     pkt 4, `faktura-dla-osoby-prywatnej-ksef.md` fakty 2–3), foreign / art. 106ga ust. 2
     exclusions.
   - Related (indirect) statute point: [VAT2025] art. 29a ust. 13 (post-1.02.2026 wording, s. 41)
     refers to „fakturę korygującą w postaci faktury ustrukturyzowanej", „z zastrzeżeniem ust. 13a i
     13b"; the KB paraphrases ust. 13a as „non-structured corrective invoice → period of buyer's
     acknowledgement" (`kurs-waluty-art-31a.md`, Answer 7; researcher paraphrase, no verbatim of
     ust. 13a). This shows corrective **invoices** outside KSeF still exist in law; it says nothing
     about notes.
   - Confidence: HIGH that the KB is silent on scope. **Mark scope NOT SETTLED** (see section 6).
     Live: no. Krystyna: yes.

4. **Noty obciążeniowe, noty uznaniowe i noty księgowe nie są przesyłane do KSeF (they are a
   different thing from a nota korygująca).**
   - KB extract text ([CZ2] pkt 1.1, WAŻNE): „Do KSeF nie są przesyłane: faktury pro forma, noty
     obciążeniowe, noty uznaniowe, faktury wewnętrzne, dowody wewnętrzne i załączniki w formie
     nieustrukturyzowanej."
   - [FAQ] (question numbered 55 in the section „Wystawianie i otrzymywanie faktur" per
     `zwolniony-z-vat-ksef.md` fakt 11): noty księgowe are not issued in KSeF. Paraphrase only, no
     verbatim in KB; answer was given to a budget unit; FAQ numbering unreliable
     (`mf-faq-podreczniki-2026.md` fakt 2).
   - The KB does **not** define nota księgowa / obciążeniowa / uznaniowa, nor say when they are
     used.
   - Confidence: HIGH ([CZ2] 1.1), MEDIUM ([FAQ] paraphrase). Live: no. Krystyna: yes (useful for
     the „nota korygująca ≠ nota księgowa" distinction). Ania: marginal.

### B. Co może zrobić nabywca, gdy faktura ma błąd

5. **Nabywca nie może odrzucić ani zatwierdzić faktury w KSeF; spory rozstrzyga się poza systemem.**
   - KB extract text ([CZ2] pkt 6.3 „Brak możliwości odrzucenia faktury przez podmiot wskazany jako
     nabywca"): „KSeF nie posiada opcji zatwierdzania/odrzucania faktur. Spory rozstrzygane poza
     systemem."
   - Also [CZ2] 6.1: from 1.02.2026 art. 106na ust. 2 (acceptance) is repealed; „nabywca nie może
     wyrazić braku akceptacji na otrzymanie faktury w KSeF".
   - Confidence: HIGH. Note: §6.3 was changed in the 06.08.2026 edition (content not recorded).
     Live: no. Ania: yes. Krystyna: yes.

6. **Faktury po nadaniu numeru KSeF nie da się anulować ani usunąć; jest przechowywana w KSeF 10
   lat; podatnik nie może jej usunąć.**
   - KB extract text ([CZ2] pkt 1.6.3): „Po nadaniu numeru KSeF — faktura weszła do obrotu prawnego.
     Brak anulowania nawet przy błędnym nabywcy → należy wystawić korektę „do zera" + nową fakturę
     pierwotną." „Faktury przechowywane w KSeF przez 10 lat od końca roku wystawienia. Podatnicy nie
     mogą samodzielnie usuwać faktur."
   - Confidence: HIGH. Live: no. Ania: yes.

7. **Poprawia sprzedawca, fakturą korygującą.**
   - KB support: [CZ2] 1.6.2 („Jedyna forma poprawienia: faktura korygująca"), 1.6.3–1.6.4 and 6.3
     (instructions addressed to the issuer: „należy wystawić korektę"); the corrective invoice is an
     FA(3) file sent to KSeF with the seller in `Podmiot1` ([CZ2] 2.13; [BRO] §9.7).
   - The KB has **no** verbatim of art. 106j ust. 1 (who issues a corrective invoice / in which
     cases). „Tylko sprzedawca" is the KB briefs' wording (`jak-odebrac-fakture-ksef.md` fakt 25),
     not an MF quote.
   - Confidence: MEDIUM (implied by MF, not stated as a rule with a statutory citation). Exception
     not covered: self-billing (cz. III). Live: no. Ania: yes.

8. **Ukrycie faktury / zgłoszenie nadużycia (for invoices that are not Ania's at all).** [CZ2] 6.3
   (01.02.2026 ed.): nabywca „może skorzystać z opcji ukrycia faktury lub zgłoszenia faktury
   scamowej", functions to be deployed later, described in cz. III. Per the published guide
   `/guides/jak-odebrac-fakture-ksef` (citing [CZ3] pkt 7–8): button „Zgłoszenie nadużycia" in
   Aplikacja Podatnika, reports go to KAS; an invoice issued by mistake is not reported as fake;
   hiding still only announced.
   - Confidence: HIGH that MF announced them; MEDIUM for mechanics (cz. III not extracted in KB;
     secondary record via our own guide). Live: no. Ania: yes, but **link
     `/blog/falszywe-faktury-ksef` instead of repeating**.

### C. Korekta danych nabywcy (zamiast noty)

9. **Zmiana danych nabywcy (np. nazwa, adres) → faktura korygująca z `Podmiot2K` (dane ze stanu
   przed korektą); poprawne dane w `Podmiot2`.**
   - KB extract text ([CZ2] pkt 2.13.8): „**Podmiot2K** — dane nabywcy/dodatkowego nabywcy ze stanu
     przed korektą. Pełne dane z faktury pierwotnej. Korekcie nie podlegają błędne numery
     identyfikujące nabywcę." „Podmiot2K może wystąpić wielokrotnie (wielu nabywców na fakturze
     pierwotnej)." Przykładowy plik MF: przykład nr 5.
   - [XSD] `Podmiot2K` (minOccurs 0, maxOccurs 101), verbatim: „W przypadku korekty danych nabywcy
     występującego jako Podmiot2 lub dodatkowego nabywcy występującego jako Podmiot3 należy podać
     pełne dane tego podmiotu występujące na fakturze korygowanej. Korekcie nie podlegają błędne
     numery NIP identyfikujące nabywcę oraz dodatkowego nabywcę - wówczas wymagana jest korekta
     faktury do wartości zerowych. W przypadku korygowania pozostałych danych nabywcy lub
     dodatkowego nabywcy wskazany numer identyfikacyjny ma być tożsamy z numerem w części Podmiot2
     względnie Podmiot3 faktury korygującej".
   - [BRO] §9.1: „Corrective invoices: All fields filled in according to status AFTER correction."
   - Confidence: HIGH (Tier 2, schema + MF manual). Live: no. Ania: yes (plain language: „sprzedawca
     wystawia korektę, w której podaje stare i nowe dane"). Krystyna: yes (field names).
   - Note: the KB does not say whether a data-only correction carries amounts (zero differences) or
     how `P_15` looks then. Do not state.

10. **`IDNabywcy` łączy dane nabywcy przed i po korekcie.**
    - [XSD] verbatim (Podmiot2, Podmiot3, Podmiot2K): „Unikalny klucz powiązania danych nabywcy na
      fakturach korygujących, w przypadku gdy dane nabywcy na fakturze korygującej zmieniły się w
      stosunku do danych na fakturze korygowanej" (max 32 znaki, [BRO] §6.1).
    - KB extract text ([CZ2] 2.13.8): „Występuje wyłącznie w fakturach korygujących z Podmiot2K."
    - Confidence: HIGH. Live: no. Krystyna only (too technical for Ania).

11. **Błędny NIP nabywcy → korekta „do zera" + nowa faktura; nie korygować NIP na inny.**
    - KB extract text ([CZ2] pkt 1.6.4): „Błędny NIP w Podmiot2/DaneIdentyfikacyjne/NIP → faktura
      trafiła do niewłaściwego podmiotu. Postępowanie: 1. Wystawić fakturę korygującą „do zera" z
      błędnym NIP 2. Wystawić nową fakturę pierwotną z prawidłowym NIP nabywcy. **Nie należy**
      korygować NIP na inny prawidłowy (faktura z błędnym NIP jest przypisana do podmiotu o tym
      NIP)."
    - [BRO] §9.7 CRITICAL RULE: „Incorrect NIP of seller (Podmiot1) or purchaser (Podmiot2/Podmiot3
      role "4") is NOT subject to correction. A correction of the invoice to zero values is required
      instead." [XSD] `Podmiot1K` verbatim: „Pole nie dotyczy przypadku korekty błędnego NIP
      występującego na fakturze pierwotnej - wówczas wymagana jest korekta faktury do wartości
      zerowych".
    - Confidence: HIGH. Live: no. Ania: yes. Already covered in
      `/blog/faktura-korygujaca-ksef#korekta-do-zera-gdy-nip-nabywcy-jest-pomylony`: link, do not
      repeat the XML.

12. **Faktura testowa wysłana na środowisko produkcyjne = pełnoprawna faktura; korekta „do zera".**
    - KB extract text ([CZ2] pkt 3.2.3, WAŻNE): „Faktura przyjęta z numerem KSeF = pełnoprawna
      faktura → obowiązek zapłaty podatku (art. 108). W razie błędu → niezwłocznie korekta „do
      zera"."
    - Confidence: HIGH. Live: no. Krystyna: yes. Ania: marginal.

### D. Co zawiera faktura korygująca w FA(3)

13. **Pola korekty (FA(3)):**
    - `RodzajFaktury`: `KOR` (korekta faktury podstawowej lub uproszczonej), `KOR_ZAL`, `KOR_ROZ`
      ([CZ2] 2.13.1; [BRO] §9.5 RULE: korekta faktury uproszczonej → `KOR`).
    - `PrzyczynaKorekty`: optional ([CZ2] 2.13.1: „nieobowiązkowe"; [BRO] §9.7: „Reason for
      correction (per Art. 106j sec. 2a(2))"; [XSD] minOccurs 0).
    - `TypKorekty`: optional; 1 = „Korekta skutkująca w dacie ujęcia faktury pierwotnej", 2 =
      „Korekta skutkująca w dacie wystawienia faktury korygującej", 3 = „Korekta skutkująca w dacie
      innej, w tym gdy dla różnych pozycji faktury korygującej daty te są różne" ([XSD]
      `TTypKorekty`, verbatim). It is a settlement-period marker, not a rate selector
      (`kurs-waluty-art-31a.md` Answer 7).
    - `DaneFaKorygowanej` (max 50 000): `DataWystFaKorygowanej`, `NrFaKorygowanej`, then a choice:
      `NrKSeF` = 1 + `NrKSeFFaKorygowanej`, **or** `NrKSeFN` = 1 ([XSD]; [CZ2] 2.13.1, 2.13.6).
    - `NrFaKorygowany`: [XSD] verbatim „Poprawny numer faktury korygowanej w przypadku, gdy
      przyczyną korekty jest błędny numer faktury korygowanej. W takim przypadku błędny numer
      faktury należy wskazać w polu NrFaKorygowanej" (i.e. a wrong invoice number is also fixed by a
      correction).
    - `Podmiot1K` / `Podmiot2K`: fact 9, 11.
    - Amounts: P_13_x, P_14_x, P_14_xW, P_15 „przez różnicę" ([CZ2] 2.13.2, citing art. 106j ust. 2
      pkt 5); several corrections: each refers to the **original** invoice in `DaneFaKorygowanej`
      ([CZ2] 2.13.3).
    - Confidence: HIGH. Live: no. Krystyna: yes; Ania: only the idea, not field names. Already
      covered step-by-step in `/blog/faktura-korygujaca-ksef`; the new post should link, not repeat.

14. **Statutory content of a corrective invoice (art. 106j ust. 2): only fragments in KB.** KB
    holds: art. 106j ust. 2 pkt 5 (kwota korekty podstawy / podatku z podziałem na stawki; via [CZ2]
    2.13.2), art. 106j ust. 2a pkt 2 (przyczyna; only as the [BRO] §9.7 reference), art. 106j ust. 3
    (zbiorcza, opust/obniżka; [CZ2] 2.13.7, [XSD] `OkresFaKorygowanej`). Art. 106j was read in
    [VAT2025] (s. 131) for `kurs-waluty-art-31a.md`, but only ust. 3 is described there. **The full
    list of art. 106j ust. 1 and ust. 2 is NOT in the KB.** Confidence: HIGH for the fragments.
    Live: no.

### E. Korekta faktury bez numeru KSeF (sprzed 1.02.2026 lub poza KSeF)

15. **Korekta wskazuje numer KSeF faktury korygowanej, chyba że go nie nadano; dla faktury poza
    KSeF: `NrKSeFN` = 1.**
    - KB extract text ([CZ2] pkt 4.1.3): „Faktura korygująca zawiera numer KSeF faktury korygowanej
      (chyba że nie nadano nr KSeF). Dotyczy też faktur z trybów offline24, offline-niedostępność,
      awaryjnego."
    - KB extract text ([CZ2] pkt 2.13.6): „Dla faktury poza KSeF: DataWystFaKorygowanej +
      NrFaKorygowanej + `NrKSeFN = „1"`. Dla faktury z KSeF: DataWystFaKorygowanej + NrFaKorygowanej
      - `NrKSeF = „1"` + NrKSeFFaKorygowanej." One corrective invoice may cover both kinds at once
        (`DaneFaKorygowanej` up to 50 000).
    - [XSD] `NrKSeFN` verbatim: „Znacznik faktury korygowanej wystawionej poza KSeF". [BRO] §9.7:
      `NrKSeF` = "1" „if corrected invoice was issued in KSeF … This obligation applies even for
      invoices issued per Art. 106nda sec. 1/16, Art. 106nh sec. 1, Art. 106nf sec. 1."
    - [BRO] §9.7 `DataWystFaKorygowanej`: „Rules depend on how original was issued (outside KSeF,
      offline, online)."
    - Confidence: HIGH. Live: no. Krystyna: yes.

16. **Korekta faktury FA(2)/FA(1) sprzed 1.02.2026 wystawiana jest w FA(3).**
    - [BRO] §1.2 CRITICAL RULE: FA(3) „applies to ALL structured invoices issued from 1 February
      2026", including „Corrective invoices where the original invoice was issued before 1 February
      2026 using FA(2) or FA(1)".
    - Confidence: HIGH. Live: no. Already covered in `/blog/fa2-vs-fa3-ksef` („Korekty do faktur
      FA(2)") and `/blog/faktura-korygujaca-ksef` („Korekta faktury sprzed KSeF").
    - **Which flag for an FA(2) invoice that went through KSeF 1.0 (and has a KSeF number)?** NOT
      SETTLED, see section 6 and the contradiction in section 7.

### F. Nabywca, JPK i odliczenie

17. **Numer KSeF w JPK_V7M(3)/V7K(3): od lutego 2026 podaje się numery KSeF faktur sprzedażowych i
    zakupowych „lub odpowiednich oznaczeń przy braku numeru KSeF"** ([CZ2] 4.1.6). [NP] Q8/Q9:
    markers DI and BFK (`mf-faq-podreczniki-2026.md` fakt 1). The KB does not describe how a
    corrective invoice or an erroneous purchase invoice is recorded in JPK. Confidence: HIGH (for
    what is stated). Live: no. Krystyna: yes.

18. **Odliczenie (only general rules in KB):** prawo do odliczenia z faktury poza KSeF powstaje w
    okresie obowiązku podatkowego, nie wcześniej niż w okresie otrzymania faktury (art. 86 ust. 10b
    pkt 1; [CZ2] 1.7); data otrzymania faktury w KSeF = dzień nadania numeru KSeF (art. 106na ust.
    3; [CZ2] 5.1). The KB has **nothing** on how a buyer treats an invoice with a data error (name,
    address) for deduction, nor on the timing of a corrective invoice on the buyer's side (only the
    seller-side art. 29a ust. 13/13a/13b/17 paraphrases in `kurs-waluty-art-31a.md`). Confidence:
    HIGH for the stated rules; the error-handling question is NOT IN KB. Live: no.

19. **Noty korygujące wystawione przed 1.02.2026: NOT IN KB.** No KB file says whether a nota issued
    before 1.02.2026 stays valid, can still be accepted/confirmed after that date, or how to handle
    an error found now in a pre-2026 invoice other than by a FA(3) correction (fact 16).

---

## 5. Existing posts to link (do not repeat their content)

- `/blog/faktura-korygujaca-ksef`: how to issue a KOR in FA(3) step by step (RodzajFaktury,
  PrzyczynaKorekty, TypKorekty, DaneFaKorygowanej, amounts as difference, XML example), korekta do
  zera for a wrong NIP (anchor `#korekta-do-zera-gdy-nip-nabywcy-jest-pomylony`), correction of a
  pre-KSeF invoice. **Primary link (backlog note).** Does not mention noty or `Podmiot2K`.
- `/guides/jak-odebrac-fakture-ksef`: buyer side; invoice arrives automatically, no accept/reject;
  section „Błędna lub podejrzana faktura" already says noty korygujące don't work from 1.02.2026.
- `/blog/falszywe-faktury-ksef`: invoice that isn't yours: no reject, don't pay, Biała Lista,
  „Zgłoszenie nadużycia" in Aplikacja Podatnika.
- `/blog/ksef-limit-10000-zl`: how the 10 000 zł monthly limit (art. 145m) is counted; invoices
  outside KSeF until 31.12.2026.
- `/blog/koniec-limitu-10000-zl`: end of the limit on 1.01.2027; everything B2B into KSeF.
- `/blog/faktura-dla-osoby-prywatnej-ksef`: B2C invoices outside mandatory KSeF, voluntary KSeF +
  QR.
- `/blog/faktura-z-kasy-fiskalnej-ksef-2027`: cash-register invoices and receipts with NIP outside
  KSeF until end of 2026 (art. 145n).
- `/blog/fa2-vs-fa3-ksef`: FA(2) → FA(3) migration; section „Korekty do faktur FA(2)" (see
  contradiction 7.1).
- `/blog/najczestsze-bledy-walidacji-fa3`: FA(3) validation errors; useful if the correction file is
  rejected.
- `/guides/aplikacja-podatnika-ksef-pierwsza-faktura`: issuing in the free MF app; says invoices are
  fixed only by a corrective invoice and that the mobile app corrects only invoices issued in the
  same mobile app (our guide, citing the MF mobile manual; not in KB extracts).
- `/guides/uprawnienia-ksef-ksiegowa`: permissions for the accountant (Krystyna context).
- FAQ `apps/web/content/pl/faq/wystawianie-faktur.mdx`, question „Jak wygląda faktura korygująca w
  KSeF?" (see misconception 8.4).

---

## 6. NOT SETTLED / not in KB

1. **Art. 106k ustawy o VAT and its repeal by ustawa z 16.06.2023 (Dz.U. 2023 poz. 1598): NOT IN KB,
   unverified.** Zero hits for „106k" in the KB. Do not cite the article or the repealing provision.
   Verify in [VAT] (Dz.U. 2026 poz. 1263) when an official host is reachable.
2. **Scope: do noty korygujące disappear also for invoices lawfully issued outside KSeF** (art. 145m
   until 31.12.2026, art. 145n cash-register invoices, B2C invoices outside KSeF, art. 106ga ust. 2
   exclusions such as foreign sellers)? The KB has only MF's unqualified sentence in [CZ2] 1.6.2,
   placed in a chapter about invoices sent to KSeF. Do not write „dotyczy wszystkich faktur" nor
   „poza KSeF nadal możesz wystawić notę".
3. **Noty korygujące issued before 1.02.2026**: validity, acceptance by the seller after that date,
   bookkeeping. Not in KB.
4. **Who may issue a corrective invoice under art. 106j ust. 1, and the full list of art. 106j ust.
   2**: not in KB (only ust. 2 pkt 5, ust. 2a pkt 2 by reference, ust. 3).
5. **Self-billing corrections** (cz. III): not extracted.
6. **FA(2) invoice issued in KSeF 1.0 (has a KSeF number): `NrKSeF` + number, or `NrKSeFN`?** [CZ2]
   4.1.3 and [BRO] §9.7 tie the choice to whether the corrected invoice was issued in KSeF / has a
   KSeF number; no KB source addresses KSeF 1.0 numbers explicitly. `fa2-vs-fa3.md` Step 5 itself
   marks its `NrKSeFN` advice as MEDIUM inference. Do not state a rule.
7. **Buyer-side handling of an erroneous invoice** (JPK, deduction timing, whether a name/address
   typo affects deduction): not in KB.
8. **Content of [CZ2] §6.3 in the 06.08.2026 edition** (changed vs 01.02.2026, change not recorded);
   [CZ2] 1.6.2 wording in the current edition not re-checked.
9. **„Nota księgowa / nota obciążeniowa / nota uznaniowa"**: KB only says they are not sent to KSeF
   ([CZ2] 1.1; [FAQ] paraphrase). No definition, no use cases, no tax treatment in KB.
10. **Whether KSeF rejects a correction that uses `NrKSeFN` for an invoice that does have a KSeF
    number, or a wrong `NrKSeFFaKorygowanej`**: the KB records only XSD-level checks ([CZ2] 1.6.1:
    structure, permissions, P_1 in future, attachment). Our FAQ claim „bez niego zostanie odrzucona"
    (`ksef-dla-jdg.md` Fact 5.2 quotes it) has no MF source beyond the XSD choice.
11. **Data-only correction** (name/address): whether amounts/P_15 are 0 and how `TypKorekty` is set:
    not in KB. MF example file nr 5 is referenced but not extracted.

---

## 7. Contradictions found (internal content vs KB)

1. **`/blog/fa2-vs-fa3-ksef` („Korekty do faktur FA(2)") says: „Przy korekcie faktury wystawionej
   poza obecnym KSeF, czyli każdej faktury FA(2) z KSeF 1.0, użyj … `NrKSeFN` = `1`. Pole `NrKSeF`
   dotyczy faktur wystawionych już w KSeF 2.0."** KB: [CZ2] 4.1.3 „Faktura korygująca zawiera numer
   KSeF faktury korygowanej (chyba że nie nadano nr KSeF)"; [BRO] §9.7 `NrKSeF` = 1 „if corrected
   invoice was issued in KSeF". Neither distinguishes KSeF 1.0 from 2.0. Source of the post claim:
   `fa2-vs-fa3.md` Step 5 (MEDIUM, inference). Resolution: human decision; the new post should not
   repeat either version.
2. **`/blog/faktura-korygujaca-ksef` („Korekta faktury sprzed KSeF") says: „Jeśli korygujesz fakturę
   sprzed 1 kwietnia 2026, … ustawiasz `NrKSeFN` = `1`, bo oryginał nie ma numeru KSeF."** KB
   criterion is whether the original has a KSeF number, not its date (fact 15); invoices issued in
   KSeF before 1.04.2026 (from 1.02.2026 for the >200 mln zł group, or voluntarily) have numbers.
   Resolution: human decision; flag for that post's next update.
3. **`/blog/faktura-korygujaca-ksef` cites art. 106j via ISAP `WDU20250000775`** (Dz.U. 2025 poz.
   775); the current consolidated text per WATCHLIST is Dz.U. 2026 poz. 1263. Not a contradiction in
   substance; stale citation.

## 8. Warning: Common Misconceptions

1. „Nabywca może wystawić notę korygującą, żeby poprawić nazwę/adres" — MF: noty korygujące nie
   funkcjonują od 1.02.2026; poprawia sprzedawca fakturą korygującą ([CZ2] 1.6.2; `Podmiot2K`).
   Stale-claims candidate (pre-2026 rule).
2. „Mogę odrzucić błędną fakturę w KSeF" / „trzeba ją zaakceptować" — no reject/accept option; art.
   106na ust. 2 repealed from 1.02.2026 ([CZ2] 6.1, 6.3). KSeF 1.0 / fakultatywny-period rule.
3. „Błędny NIP nabywcy poprawię korektą danych" — no: korekta do zera + nowa faktura ([CZ2] 1.6.4;
   [BRO] §9.7; [XSD]).
4. „Zasady uzgadniania korekt z nabywcą pozostają bez zmian" (our FAQ `faq/wystawianie-faktur.mdx`)
   — not backed by the KB; the only KB trace is the art. 29a ust. 13a paraphrase limited to
   non-structured corrective invoices, while ust. 13 ties the in-minus correction of a structured
   invoice to the period of issue (`kurs-waluty-art-31a.md` Answer 7). The same FAQ answer says the
   correction gets its number „po zaakceptowaniu", which may be read as buyer acceptance. Flag for
   FAQ review; do not repeat.
5. „Nota korygująca = nota księgowa/obciążeniowa" — different documents; noty obciążeniowe/uznaniowe
   and noty księgowe are not sent to KSeF ([CZ2] 1.1; [FAQ]). The KB does not describe them further.
6. „Korektą do zera anulujesz fakturę" — no: the invoice cannot be cancelled or deleted; original
   and correction stay in KSeF ([CZ2] 1.6.3, 7).

## 9. Suggested Sources Section (for the post's „Źródła")

- Podręcznik KSeF 2.0, cz. II „Wystawianie i otrzymywanie faktur w KSeF" (MF), pkt 1.1, 1.6.2–1.6.4,
  2.13.1, 2.13.6, 2.13.8, 4.1.3, 6.3:
  https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
- Broszura informacyjna dotycząca struktury logicznej FA(3) (MF), cz. 9.7 (pola korekty):
  https://ksef.podatki.gov.pl/media/nuclnu0w/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf
- Struktura logiczna FA(3), elementy `Podmiot1K`, `Podmiot2K`, `DaneFaKorygowanej`:
  https://crd.gov.pl/wzor/2025/06/25/13775/
- Ustawa o VAT, t.j. Dz.U. 2026 poz. 1263 (art. 106j; art. 106na; art. 145m, 145n):
  https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf — cite only articles backed above; **not**
  art. 106k.
- Pytania i odpowiedzi KSeF 2.0 (MF), only if fact 4 (noty księgowe) is used:
  https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20/

## 10. Freshness

2026-10-16. Review when: gov.pl / ISAP reachable (verify art. 106k status and art. 106j text in
Dz.U. 2026 poz. 1263); Podręcznik cz. II 06.08.2026 re-extracted (1.6.2, 6.3); cz. III extracted
(self-billing, ukrywanie, zgłoszenie nadużycia); after 31.12.2026 (art. 145m/145n expiry changes
which invoices can exist outside KSeF); UD477 publication.
