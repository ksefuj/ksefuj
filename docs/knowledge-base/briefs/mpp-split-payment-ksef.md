# Research Brief: Split payment (MPP) na fakturze w KSeF

**Requested by:** human (backlog item `mpp-split-payment-ksef`) **Date:** 2026-10-22 **For
content:** „Split payment (MPP) na fakturze w KSeF" (`pl/blog/mpp-split-payment-ksef`), personas K
(księgowa) i A (JDG)

**Target query:** „MPP KSeF" / „split payment KSeF"

**Answer in two sentences:** Na fakturze FA(3) MPP oznacza się polem `P_18A` w `Adnotacje`: wartość
`1`, gdy kwota należności ogółem przekracza 15 000 zł (lub jej równowartość w walucie obcej) i
faktura obejmuje towary lub usługi z załącznika nr 15 do ustawy o VAT, a w przeciwnym przypadku `2`;
pole jest obowiązkowe na każdej fakturze (schemat FA(3), adnotacja elementu `P_18A`; broszura FA(3),
§9.6). Opcjonalnie można oznaczyć poszczególne wiersze z załącznika nr 15 znacznikiem `P_12_Zal_15`
(`P_12Z_Zal_15` w fakturze zaliczkowej), a od płatności dokonanych od 1 stycznia 2027 r. w
komunikacie przelewu MPP za fakturę ustrukturyzowaną podaje się jej numer KSeF (art. 108a ust. 3 pkt
3; art. 17 ustawy z 16.06.2023).

**What changes the answer:**

- Kwota należności ogółem > 15 000 zł i towary/usługi z załącznika nr 15: oba warunki naraz
  (adnotacja XSD `P_18A`; art. 108a ust. 1a wg briefu `numer-ksef-w-przelewie.md`, fakt 4).
- Waluta obca: próg liczy się od równowartości w złotych, przeliczonej wg zasad dla podstawy
  opodatkowania (adnotacja XSD `P_18A`).
- Nabywca: adnotacja XSD mówi o dostawie/usłudze „dokonaną na rzecz podatnika"; definicji
  „podatnika" w tym kontekście schemat nie podaje.
- Data płatności (nie faktury): numer KSeF / identyfikator zbiorczy w komunikacie MPP dla płatności
  od 1.01.2027 (art. 17 ustawy z 16.06.2023, cytowany w obwieszczeniu Dz.U. 2026 poz. 1263, s. 2).
- Płatność za kilka faktur jednego dostawcy: identyfikator zbiorczy zamiast numeru faktury (art.
  108a ust. 3a-3c), szczegóły w opublikowanym poście `/blog/numer-ksef-w-przelewie`.

**Provenance of this run:** official hosts are unreachable from this environment (one test request
to eureka.mf.gov.pl on 2026-10-22: proxy 403). Nothing below was fetched live. Every fact comes from
the repo: the bundled official FA(3) XSD (`packages/validator/src/schemas/schemat.xsd`, namespace
`http://crd.gov.pl/wzor/2025/06/25/13775/`), the brochure conversion
(`packages/validator/docs/fa3-information-sheet.md`, no PDF page numbers in the conversion), and
existing KB briefs whose own fetch dates are given per fact.

## Key Facts (ready to use)

### A. Jak oznaczyć MPP w FA(3)

1. **`P_18A` – znaczenie wartości (Tier 2, schemat MF).** Verbatim adnotacja XSD: „W przypadku
   faktur, w których kwota należności ogółem przekracza kwotę 15 000 zł lub jej równowartość
   wyrażoną w walucie obcej, obejmujących dokonaną na rzecz podatnika dostawę towarów lub
   świadczenie usług, o których mowa w załączniku nr 15 do ustawy - wyrazy "mechanizm podzielonej
   płatności", przy czym do przeliczania na złote kwot wyrażonych w walucie obcej stosuje się zasady
   przeliczania kwot stosowane w celu określenia podstawy opodatkowania; należy podać wartość "1", w
   przeciwnym przypadku - wartość "2"" — `schemat.xsd`, element `Fa/Adnotacje/P_18A`, l. 2662-2667.
   Confidence: HIGH. Fetched live: no (bundled XSD). K: yes, A: yes
2. **`P_18A` jest obowiązkowy.** W XSD element nie ma `minOccurs="0"` i ma typ `etd:TWybor1_2`
   (dozwolone tylko `1` lub `2`) — `schemat.xsd` l. 2662; `ElementarneTypyDanych_v10-0E.xsd`, typ
   `TWybor1_2`. Broszura FA(3) §9.6: `P_18A` „Mandatory", „"1" = split payment mechanism (total >
   PLN 15,000, Annex 15 goods/services); "2" = no split payment" (konwersja EN, l. 511). Brak MPP =
   `<P_18A>2</P_18A>`, pominięcie pola to błąd. Confidence: HIGH. Fetched live: no. K: yes, A: yes
3. **Pozycja w sekwencji `Adnotacje`:** `P_16` → `P_17` → `P_18` → `P_18A` → `Zwolnienie` →
   `NoweSrodkiTransportu` → `P_23` → `PMarzy`; kolejność wymuszona przez `xs:sequence` —
   `schemat.xsd` l. 2641-2662; broszura §9.6 (tabela); brief `bledy-walidacji-fa3.md` l. 925.
   Confidence: HIGH. Fetched live: no. K: yes, A: yes
4. **`P_12_Zal_15` (wiersz faktury, opcjonalny).** Verbatim XSD: „Znacznik dla towaru lub usługi
   wymienionych w załączniku nr 15 do ustawy - wartość "1"" — `schemat.xsd` l. 3179-3183,
   `minOccurs="0"`, typ `TWybor1` (tylko `1`; brak znacznika = pole pominięte). W `FaWiersz` stoi po
   `P_12_XII`, przed `KwotaAkcyzy` i `GTU`. Broszura §10.2 (l. 676): „Optional". Confidence: HIGH.
   Fetched live: no. K: yes, A: partly
5. **`P_12Z_Zal_15` (faktura zaliczkowa, `Zamowienie/ZamowienieWiersz`, opcjonalny).** Ta sama
   adnotacja co `P_12_Zal_15` — `schemat.xsd` l. 3700-3704; po `P_12Z_XII`, przed `GTUZ`. Broszura
   §14.2 (l. 881): „Optional". Confidence: HIGH. Fetched live: no. K: yes, A: no
6. **GTU a załącznik nr 15.** Broszura §10.4 opisuje GTU_05 jako odpady „(items 79-91 of Annex 15)",
   GTU_06 jako elektronikę „(items 7, 8, 59-63, 65, 66, 69, 94-96 of Annex 15) + stretch film (item
   9)", GTU_08 jako metale „(Annex 12 items 1, 1a; Annex 15 items 12-25, 33-40, 45, 46, 56, 78)"
   (konwersja l. 714-718). Broszura: GTU „optional and at the taxpayer's discretion" (l. 722).
   Adnotacje XSD przy kodach GTU odsyłają do § 10 ust. 3 rozporządzenia JPK_VAT, nie do załącznika
   nr 15 (`schemat.xsd` l. 2002+). Żadne źródło w repo nie mówi, że kod GTU wymusza `P_18A=1` ani
   `P_12_Zal_15`. Confidence: HIGH (dla treści broszury); powiązanie GTU↔MPP: not stated. K: yes, A:
   no
7. **Co sprawdza walidator ksefuj:** brak `P_18A` w `Adnotacje` → błąd `ADNOTACJE_P18A_MISSING`
   („P_18A is mandatory in Adnotacje (§9.6)"), podpowiedź `<P_18A>2</P_18A>` —
   `packages/validator/src/semantic.ts` l. 502, `error-codes.ts` l. 553-570. Walidator nie łączy
   `P_18A` z kwotą 15 000 zł, `P_12_Zal_15` ani GTU (grep 2026-10-22: brak takich reguł). XSD sam
   też nie wiąże `P_18A` z `P_12_Zal_15`. Confidence: HIGH. Fetched live: n/a (kod). K: yes, A: yes

### B. Kiedy MPP jest obowiązkowy, a kiedy dobrowolny (Tier 1, z KB)

8. **Dobrowolny co do zasady:** art. 108a ust. 1 („mogą zastosować"). — Dz.U. 2026 poz. 1263, PDF s.
   136, wg briefu `numer-ksef-w-przelewie.md` fakt 4 (pobrany 2026-10-07). Confidence: HIGH. Fetched
   live: no (from KB). K: yes, A: yes
9. **Obowiązkowy** m.in. przy towarach/usługach z załącznika nr 15, gdy faktura przekracza 15 000 zł
   (art. 108a ust. 1a). — jw., fakt 4; w KB brak cytatu verbatim ust. 1a i brak pełnego katalogu
   przesłanek („m.in."). Confidence: HIGH (istota), MEDIUM (pełny zakres warunków). Fetched live:
   no. K: yes, A: yes
10. **Sankcja z art. 108a ust. 7:** dotyczy naruszenia ust. 1a (w KB opisana jako 30% VAT), nie
    numeru KSeF. — brief `numer-ksef-w-przelewie.md` fakt 12 (tekst jednolity Dz.U. 2026 poz. 1263).
    KB nie zawiera verbatim ust. 7 ani jego adresata (nabywca/sprzedawca) i wyjątków. Confidence:
    MEDIUM (brak cytatu). Fetched live: no. K: yes, A: partly

### C. Komunikat przelewu MPP i numer KSeF (od 2027)

11. **Elementy komunikatu MPP (art. 108a ust. 3):** kwota VAT (pkt 1), kwota brutto (pkt 2), „numer
    faktury, w związku z którą dokonywana jest płatność, a w przypadku faktury ustrukturyzowanej –
    numer identyfikujący tę fakturę w Krajowym Systemie e-Faktur" (pkt 3), numer identyfikujący
    dostawcę na potrzeby podatku (pkt 4). — Dz.U. 2026 poz. 1263, PDF s. 137, via brief
    `numer-ksef-w-przelewie.md` fakt 3; MF, Podręcznik KSeF 2.0 cz. II, pkt 4.1.4 (brief
    `podrecznik-ksef-20-czesc-ii.md` l. 897-903). Confidence: HIGH. Fetched live: no. K: yes, A: yes
12. **Termin:** art. 108a w nowym brzmieniu „stosuje się do płatności dokonanych od dnia 1 stycznia
    2027 r." — art. 17 ustawy z 16.06.2023, w obwieszczeniu Dz.U. 2026 poz. 1263, PDF s. 2 (brief
    `numer-ksef-w-przelewie.md` fakt 2). MF (strona „Podstawy prawne oraz kluczowe terminy"):
    obowiązek numeru KSeF „w ramach MPP" odroczony do końca 2026 r. (tamże, fakt 10). Confidence:
    HIGH. Fetched live: no. K: yes, A: yes
13. **Kilka faktur jednym przelewem MPP:** identyfikator zbiorczy KSeF (art. 108a ust. 3a, 3b pkt
    1a, 3c pkt 2) — nie powtarzać, linkować do `/blog/numer-ksef-w-przelewie` (sekcja „Split
    payment: co zmienia art. 108a"). Confidence: HIGH. Fetched live: no.
14. **Projekt UD477 nie zmienia art. 108a** (wersja z 22.09.2026; sprawdzono 2026-10-07) — brief
    `numer-ksef-w-przelewie.md` fakt 14. Confidence: HIGH dla tej wersji projektu. Fetched live: no.

### D. Waluta obca

15. **Próg 15 000 zł w walucie obcej:** liczy się „równowartość wyrażoną w walucie obcej",
    przeliczoną na złote wg „zasad przeliczania kwot stosowane[ych] w celu określenia podstawy
    opodatkowania" — adnotacja XSD `P_18A` (fakt 1). Same zasady przeliczenia (art. 31a, kurs NBP z
    ostatniego dnia roboczego przed powstaniem obowiązku podatkowego) opisuje brief
    `kurs-waluty-art-31a.md`. Confidence: HIGH (dla treści adnotacji); zastosowanie art. 31a do
    progu MPP to odesłanie adnotacji, nie osobny przepis cytowany w KB. Fetched live: no. K: yes, A:
    partly

## Unsettled Questions

- **Obowiązek sprzedawcy i sankcja za brak adnotacji „mechanizm podzielonej płatności" (art. 106e
  ust. 1 pkt 18a i powiązane przepisy sankcyjne):** grep 2026-10-22 po `docs/knowledge-base`,
  postach i broszurze: brak tekstu art. 106e ust. 1 pkt 18a i brak jakiejkolwiek sankcji dla
  sprzedawcy. Adnotacja XSD `P_18A` (fakt 1) brzmi jak odwzorowanie tego przepisu, ale to wniosek.
  Not verified from an official source in this run. W poście nie podawać sankcji dla wystawcy.
- **Dobrowolne MPP a `P_18A=1`:** XSD i broszura każą wpisać `1` tylko przy spełnieniu obu warunków
  (> 15 000 zł i załącznik nr 15), „w przeciwnym przypadku" `2`. Czy sprzedawca może wpisać `1` na
  fakturze poniżej progu, by zachęcić do MPP, oraz czy nabywca może zapłacić w MPP fakturę z
  `P_18A=2` — źródła w repo nie mówią. (Dobrowolność po stronie płacącego wynika z art. 108a ust. 1,
  fakt 8.)
- **Faktura mieszana:** gdy tylko część wierszy jest z załącznika nr 15, czy próg 15 000 zł liczy
  się od całej kwoty należności ogółem: adnotacja XSD mówi o „kwota należności ogółem" faktury
  „obejmujących" takie towary; pełnego brzmienia art. 108a ust. 1a w KB nie ma. Nie rozstrzygać.
- **Kim jest „podatnik" w „na rzecz podatnika"** (adnotacja XSD), np. przy nabywcy zagranicznym lub
  zwolnionym z VAT: KB nie zawiera wyjaśnienia. Uwaga: opublikowany post
  `faktura-zagraniczna-ksef.mdx` (l. 186-188) twierdzi, że MPP „nie ma zastosowania w transakcjach
  zagranicznych"; w KB nie ma źródła tego zdania (do weryfikacji przez Judge'a).
- **Korekta faktury z MPP:** jak ustawić `P_18A` na fakturze korygującej (np. gdy korekta przenosi
  kwotę przez próg): brak w źródłach w repo.
- **Treść art. 108a ust. 7:** stawka 30%, adresat, wyjątki (np. korekta deklaracji) — w KB tylko
  streszczenie bez cytatu (fakt 10).
- **Rachunek VAT, biała lista, pełna lista pozycji załącznika nr 15:** brak w KB.
- **Interpretacja indywidualna KIS 0114-KDIP1-1.4012.566.2026.1.MM z 22.09.2026: UNVERIFIED.** Znana
  tylko z infor.pl (wpis w `docs/content-backlog.md`, 2026-10-17); eureka.mf.gov.pl niedostępna (403
  w tym przebiegu). Nie znamy jej treści z oficjalnego źródła. Nie używać w poście.

## Suggested Sources Section

Only URLs already present in the KB or published posts:

- Ustawa o VAT, tekst jednolity Dz.U. 2026 poz. 1263 (art. 108a ust. 1, 1a, 3, 3a-3c, 7; art. 17
  ustawy z 16.06.2023 w obwieszczeniu): https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf
  (alternatywnie ISAP: https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260001263)
- MF, Broszura informacyjna dotycząca struktury logicznej FA(3), §9.6 (Adnotacje, `P_18A`), §10.2
  (`P_12_Zal_15`), §10.4 (GTU), §14.2 (`P_12Z_Zal_15`):
  https://ksef.podatki.gov.pl/media/nuclnu0w/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf
- Schemat FA(3) (adnotacje elementów `P_18A`, `P_12_Zal_15`, `P_12Z_Zal_15`):
  https://crd.gov.pl/wzor/2025/06/25/13775/schemat.xsd
- Podręcznik KSeF 2.0 cz. II, pkt 4.1.4 (komunikat przelewu MPP):
  https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
- MF, „Podstawy prawne oraz kluczowe terminy":
  https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/podstawy-prawne-oraz-kluczowe-terminy/
- MF, „Numer KSeF i zbiorczy identyfikator":
  https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/numer-ksef-i-zbiorczy-identyfikator/
- Wewnętrznie: `/blog/numer-ksef-w-przelewie`, `/blog/najczestsze-bledy-walidacji-fa3` (sekcja
  Adnotacje), `/blog/faktura-zagraniczna-ksef`.

## Warning: Common Misconceptions

- „Bez MPP pomijam `P_18A`": nie, pole jest obowiązkowe; brak MPP = `2` (XSD, broszura §9.6).
- „`P_12_Zal_15` zastępuje `P_18A`" / „wystarczy GTU": nie; `P_12_Zal_15` i GTU są opcjonalne, a
  `P_18A` jest obowiązkowy i osobny. Żadne źródło nie wiąże automatycznie GTU z MPP.
- „Numer KSeF w komunikacie MPP obowiązuje już teraz": nie, dla płatności od 1.01.2027 (art. 17
  ustawy z 16.06.2023).
- „Odroczenie kar z 16.09.2026 (UD477) przesuwa też MPP": wersja projektu z 22.09.2026 nie zmienia
  art. 108a (brief `numer-ksef-w-przelewie.md`, fakt 14).
- „Próg 15 000 zł dotyczy tylko faktur w PLN": adnotacja XSD wprost obejmuje równowartość w walucie
  obcej.

**Freshness:** 2026-10-22. Re-check: projekt UD477 (czy dotknie art. 108a), Dz.U. (zmiany art. 108a
lub art. 17 ustawy z 16.06.2023), nowa wersja schematu FA lub broszury (`pnpm update-schemas`),
status interpretacji KIS 0114-KDIP1-1.4012.566.2026.1.MM gdy eureka będzie osiągalna. Po 2027-01-01
przepisać fakty 12-13 na czas teraźniejszy.
