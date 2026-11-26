# Research Brief: Kurs waluty na fakturze w KSeF

**Requested by:** human (content) **Date:** 2026-11-26 **For content:** PL blog post
`kurs-waluty-faktura-ksef` („Kurs waluty na fakturze w KSeF”) **Personas:** K = Pani Krystyna
(księgowa), A = JDG wystawiająca faktury w EUR

**Target query:** „faktura w walucie KSeF kurs”

**Answer in two sentences:** Na fakturze w walucie obcej kwoty zostają w walucie, a w złotych podaje
się tylko podatek (`P_14_xW`), przeliczony co do zasady po kursie średnim NBP z ostatniego dnia
roboczego przed dniem powstania obowiązku podatkowego, a gdy faktura wyprzedza ten dzień, przed
dniem wystawienia (`P_1`) (art. 31a ust. 1 i 2 ustawy o VAT; FAQ MF KSeF 2.0 pyt. 19). Użyty kurs
wpisuje się w `FaWiersz/KursWaluty` (na fakturze zaliczkowej `KursWalutyZ` / `KursWalutyZW`), a KSeF
sprawdza tylko zapis liczby (kropka, max 6 miejsc po przecinku), nie jej zgodność z NBP (XSD
`TIlosci`; broszura FA(3) §2.5-2.6).

**What changes the answer:**

- **Faktura przed obowiązkiem podatkowym** (np. z góry): kurs sprzed `P_1` (art. 31a ust. 2).
  Fakt 3.
- **Obowiązek powstaje z wystawieniem faktury** (budowlanka, najem/leasing, media, stała obsługa
  prawna i biurowa, WDT): opcja kursu sprzed `P_1` (art. 31a ust. 1a); spóźniona faktura przesuwa
  obowiązek (art. 19a ust. 7, art. 20 ust. 1). Fakty 5, 13.
- **Usługa rozliczana okresami** (abonament, retainer): obowiązek z upływem okresu (art. 19a ust.
  3). Fakt 13.
- **Wybór kursu EBC** (art. 31a ust. 1 zd. 2) lub **zasad z podatku dochodowego** (ust. 2a-2d, 12
  miesięcy). Fakty 2, 6.
- **Zaliczka:** obowiązek w dniu otrzymania zapłaty (art. 19a ust. 8), pola `KursWalutyZ` /
  `KursWalutyZW`. Fakt 16.
- **Korekta:** kurs przyjęty na fakturze pierwotnej (art. 31b ust. 1), wyjątek: korekta zbiorcza
  rabatu (art. 31b ust. 2). Fakt 17.
- **Metoda kasowa** (`P_16` = 1): obowiązek z zapłatą (art. 21 ust. 1). Fakt 13.
- **Stawki 0 WDT, 0 EX, zw, np I, np II, oo:** brak pola `P_14_xW` na fakturze. Fakt 9.
- **Faktura w PLN z kursem umownym:** `KursUmowny` + `WalutaUmowna`, poza art. 31a (FAQ pyt. 18).
  Fakt 10.

**Provenance:** official hosts are blocked by the proxy (one check of `api.nbp.pl` on 2026-11-26:
HTTP 403). **Nothing below was fetched live in this session.** Every fact comes from the repo KB:
mainly `kurs-waluty-art-31a.md` (Dz.U. 2025 poz. 775 read in full 2026-08-12; FAQ MF retrieved
2026-08-12), the XSD and broszura conversion in `packages/validator/`, and the MF example files in
`test-fixtures/official-examples/`.

### Which VAT Act text to cite

- **Cite Dz.U. 2026 poz. 1263** (consolidated text, `WATCHLIST.md` verified baseline 2026-10-07;
  latest amending act checked Dz.U. 2026 poz. 1270, no KSeF changes). **Page numbers below („s.”)
  are from Dz.U. 2025 poz. 775**, the only text in the KB with page-level quotes of art.
  31a/31b/19a.
- **KB evidence of no change:** `faktura-zaliczkowa-ksef.md` „Local verification (2026-11-11)”,
  checked against Dz.U. 2026 poz. 1263: „Art. 19a ust. 8 […] Art. 31a ust. 1 and 2 unchanged from
  the 2025 text.” `kurs-waluty-art-31a.md` „Currency of the text”: amending acts poz. 894, 896,
  1203, 1541, 1811 of 2025 do not touch art. 19a, 31a or 31b.
- **No KB evidence either way** that art. 31a ust. 1a, ust. 2a-2d, art. 31b, art. 19a (other than
  ust. 8 and ust. 7 as quoted) or art. 106e ust. 11 read the same in Dz.U. 2026 poz. 1263. Not
  re-checked. The post may quote them, but the Judge should know the verbatim text is from the 2025
  consolidation (in force 2026-08-12 per the amendment scan).
- UD477 (Sejm druk 3245, not law) touches art. 106ni only (`WATCHLIST.md`); nothing in KB says it
  touches art. 31a.

## Key Facts (ready to use)

### A. Reguła ogólna i wyjątki (art. 31a)

1. **Kurs średni NBP z ostatniego dnia roboczego przed dniem powstania obowiązku podatkowego.** Art.
   31a ust. 1 zd. 1, Dz.U. 2025 poz. 775 s. 43: „W przypadku gdy kwoty stosowane do określenia
   podstawy opodatkowania są określone w walucie obcej, przeliczenia na złote dokonuje się według
   kursu średniego danej waluty obcej ogłoszonego przez Narodowy Bank Polski na ostatni dzień
   roboczy poprzedzający dzień powstania obowiązku podatkowego.” Tier 1, law. HIGH. K: yes, A: yes.
2. **Opcja EBC (w tym samym ustępie).** Art. 31a ust. 1 zd. 2, s. 43: „Podatnik może wybrać sposób
   przeliczania tych kwot na złote według ostatniego kursu wymiany opublikowanego przez Europejski
   Bank Centralny na ostatni dzień poprzedzający dzień powstania obowiązku podatkowego; w takim
   przypadku waluty inne niż euro przelicza się z zastosowaniem kursu wymiany każdej z nich względem
   euro.” Note: NBP leg says „ostatni dzień roboczy”, ECB leg „ostatni dzień”. Tier 1. HIGH. K: yes,
   A: mention only.
3. **Faktura przed obowiązkiem podatkowym → kurs sprzed dnia wystawienia.** Art. 31a ust. 2 (version
   in force from 1.02.2026, footnote 34), s. 43: „W przypadku gdy podatnik wystawił fakturę przed
   powstaniem obowiązku podatkowego, a kwoty stosowane do określenia podstawy opodatkowania są
   określone na tej fakturze w walucie obcej, przeliczenia na złote podatnik dokonuje według kursu
   średniego danej waluty obcej ogłoszonego przez Narodowy Bank Polski na ostatni dzień roboczy
   poprzedzający dzień wystawienia faktury.” Zd. 2 adds the `P_1`-based option for structured
   invoices (same wording as ust. 1a); zd. 3: „Przepis ust. 1 zdanie drugie stosuje się
   odpowiednio.” „Przed” = strictly before; at day granularity same-day issue changes nothing
   (`kurs-waluty-art-31a.md` Answer 2). Tier 1. HIGH. K: yes, A: yes (faktura z góry).
4. **W KSeF dniem wystawienia jest `P_1` w każdym trybie.** Online: „Fakturę ustrukturyzowaną uznaje
   się za wystawioną w dniu jej przesłania do Krajowego Systemu e-Faktur” (art. 106na ust. 1, s.
   133), and `P_1` cannot be later than the send date (KSeF rejects „Data P_1 z przyszłości”,
   Podręcznik cz. II §1.6.1). Offline24, online sent after `P_1`, niedostępność, awaria: „Za datę
   wystawienia faktury […] uznaje się datę, o której mowa w art. 106e ust. 1 pkt 1, wskazaną przez
   podatnika na tej fakturze” (art. 106nda ust. 10, Dz.U. 2025 poz. 1203 s. 5; ust. 16; art. 106nh
   ust. 4; art. 106nf ust. 9, s. 136). Tier 2 corroboration: broszura §9.2 „P_1 — Date of Issue
   Rules”; Podręcznik cz. II §1.4 „Przykład 2 (offline24): P_1 = 2.02.2026, przesłanie 3.02.2026.
   Data wystawienia = 2.02.2026”. So the rate is set from `P_1`, not from the KSeF number date. Tier
   1. HIGH. K: yes, A: yes.
5. **Art. 31a ust. 1a (od 1.02.2026): opcjonalny kurs sprzed `P_1`, gdy obowiązek powstaje z
   wystawieniem faktury.** S. 43 (added by ustawa z 16.06.2023, Dz.U. poz. 1598): „W przypadku
   dostaw towarów i świadczenia usług, dla których obowiązek podatkowy powstaje z chwilą wystawienia
   faktury, przeliczenia na złote podatnik może dokonać według kursu średniego danej waluty obcej
   ogłoszonego przez Narodowy Bank Polski na ostatni dzień roboczy poprzedzający dzień, o którym
   mowa w art. 106e ust. 1 pkt 1, pod warunkiem że faktura ustrukturyzowana została wystawiona nie
   później niż następnego dnia po dniu, o którym mowa w art. 106e ust. 1 pkt 1. Przepis ust. 1
   zdanie drugie stosuje się odpowiednio.” Scope is a criterion, not a list; verified members: art.
   19a ust. 5 pkt 3 and 4, art. 20 ust. 1 (WDT). Tier 1. HIGH (text); the meaning of the proviso is
   UNSETTLED (see below). K: yes, A: only if najem/budowlanka/WDT.
6. **Zasady z podatku dochodowego (ust. 2a-2d), opcja na min. 12 miesięcy.** Ust. 2a, s. 43: „Kwoty
   stosowane do określenia podstawy opodatkowania określone w walucie obcej mogą być przeliczane
   przez podatnika na złote zgodnie z zasadami przeliczania przychodu określonego w walucie obcej
   wynikającymi z przepisów o podatku dochodowym, obowiązującymi tego podatnika na potrzeby
   rozliczania danej transakcji.” Ust. 2b: „…jest obowiązany do ich stosowania przez co najmniej 12
   kolejnych miesięcy, licząc od miesiąca, w którym je wybrał.” Ust. 2c: after resigning, ust. 1-2
   for at least 12 months from the following month. Ust. 2d: a transaction the income-tax rules
   don't cover falls back to ust. 1-2. Tier 1. HIGH. K: yes, A: no (one sentence at most). The
   PIT/CIT conversion rules themselves: NOT IN KB.

### B. Co wymaga FA(3) i KSeF

7. **Pola kursu: tylko w wierszu, w zaliczce i w korekcie zaliczki. Nie ma `Fa/KursWaluty`.** XSD
   `schemat.xsd`: `FaWiersz/KursWaluty` (l. 3199), `Fa/KursWalutyZ` (l. 2636, „…na fakturach, o
   których mowa w art. 106b ust. 1 pkt 4 ustawy”), `Fa/ZaliczkaCzesciowa/KursWalutyZW` (l. 3024, per
   payment), `KursWalutyZK` (l. 3001, „…przed korektą”). Annotation of the first three: „Kurs waluty
   stosowany do wyliczenia kwoty podatku w przypadkach, o których mowa w dziale VI ustawy”. All
   `minOccurs="0"`. FAQ MF pyt. 19: „oprócz pola KodWaluty wypełniane jest pole KursWaluty,
   względnie pole KursWalutyZ.” Podręcznik cz. II §2.5: „`FaWiersz/KursWaluty` — kurs waluty na
   poziomie wiersza (max 6 miejsc po kropce)”. Tier 2/3. HIGH. K: yes, A: yes. **„KursWaluty in Fa”
   (nagłówek) is wrong; do not write it.**
8. **Podatek w PLN w `P_14_1W`-`P_14_4W`; reszta kwot w walucie faktury.** XSD l. 2510 (`P_14_1W`):
   „W przypadku gdy faktura jest wystawiona w walucie obcej - kwota podatku od sumy wartości
   sprzedaży netto objętej stawką podstawową, przeliczona zgodnie z przepisami działu VI w związku z
   art. 106e ust. 11 ustawy”; same for 8% (l. 2530), 5% (l. 2550), taxi lump sum (l. 2570); all
   optional in XSD. Broszura §9.1: sales and tax fields „in the currency in which the invoice was
   issued, except for tax fields calculated per Section VI in conjunction with Art. 106e sec. 11”
   (EN conversion). Podręcznik cz. II §2.5: „Zgodnie z art. 106e ust. 11 — kwoty podatku wykazuje
   się w złotych.” FAQ pyt. 19: „kwoty określone są wyłącznie w walucie obcej i jedynie kwota
   podatku w polu P_14_xW przeliczona jest na złotówki zgodnie z art. 106e ust. 11 ustawy o VAT.”
   **Verbatim art. 106e ust. 11: NOT IN KB** (only these MF paraphrases). `P_15` stays in currency.
   Tier 2/3. HIGH. K: yes, A: yes.
9. **Stawki bez `P_14_xW`.** XSD: `W` fields exist only for `P_13_1`-`P_13_4`; none for `P_13_5`
   (OSS), `P_13_6_1`-`P_13_6_3` (0% krajowe, WDT, eksport), `P_13_7` (zw), `P_13_8`-`P_13_10` (np I,
   np II, oo) or `P_13_11` (marża). MF examples 22 (WDT, EUR, `P_13_6_2` 4000) and 23 (eksport, USD,
   `P_13_6_3` 8000) carry no `KursWaluty`. Tier 2. HIGH for the invoice fields. **The KB does not
   support „no conversion needed for VAT” at these rates:** art. 31a converts „kwoty stosowane do
   określenia podstawy opodatkowania”, i.e. the base, and the KB holds no source on how the PLN base
   of a 0%/np sale is reported (JPK_VAT). Say only „na fakturze nie ma pola na podatek w PLN”. K:
   yes, A: yes (np II usługi dla firm z UE).
10. **`KursUmowny`/`WalutaUmowna` to coś innego.** FAQ pyt. 18: „Pola KursUmowny i WalutaUmowna
    dotyczą przypadków, gdy faktura wystawiona jest w złotówkach … a strony transakcji chcą w
    fakturze zawrzeć informację o kursie waluty w oparciu, o który dokonano takiego umownego
    przeliczenia.” Broszura (EN conversion): „Does NOT apply to Section VI Act cases.” Tier 3/2.
    HIGH. K: yes, A: yes.
11. **Format, nie wartość.** XSD `TIlosci` (l. 1245): „Wartość numeryczna 22 znaki max, w tym 6 po
    przecinku”, pattern `-?([1-9]\d{0,15}|0)(\.\d{1,6})?`. Broszura §2.5: „Only a full stop (`.`)
    may be used as the decimal separator”, no thousand separators; §2.6: KursWaluty, KursWalutyZ,
    KursWalutyZW, KursWalutyZK, KursUmowny „Up to 6 decimal places”. No KB source says KSeF compares
    the value with NBP; the XSD has no such constraint and „There is NO standalone XML validator in
    KSeF 2.0” (CLAUDE.md). Wording „KSeF nie sprawdza, czy kurs jest właściwy” = inference from the
    schema, MEDIUM; no MF sentence says it. K: yes, A: yes.
12. **Waluta faktury: kod ISO 4217 ze słownika XSD.** `KodWaluty` (XSD l. 2445, „Kod waluty (ISO
    4217)”) of type `TKodWaluty`, enumeration of 182 codes incl. EUR, USD, UAH, PLN (l. 150-1066);
    broszura §9.2: mandatory, „For PLN invoices: "PLN"”. **Whether the statute limits the choice of
    currency: NOT IN KB.** Tier 2. HIGH (schema). A: yes.

### C. Kiedy powstaje obowiązek podatkowy (to on wyznacza datę kursu)

13. **Tax points that move the date** (all art. 19a, Dz.U. 2025 poz. 775 s. 28-30, quoted in
    `kurs-waluty-art-31a.md` Answer 4; HIGH):
    - ust. 1: dostawa/wykonanie usługi (rule). ust. 3: usługi z następującymi po sobie terminami
      płatności lub rozliczeń „uznaje się za wykonaną z upływem każdego okresu”; ciągłe >1 rok bez
      rozliczeń: z upływem roku podatkowego. ust. 4: ust. 3 odpowiednio do towarów.
    - ust. 5 pkt 3 (budowlane/budowlano-montażowe, książki) and pkt 4 (media, telekom, najem,
      dzierżawa, leasing, ochrona, stała obsługa prawna i biurowa, dystrybucja energii): z chwilą
      wystawienia faktury; ust. 7: late or missing invoice → upływ terminu z art. 106i ust. 3 i 4
      (30 dni od wykonania przy budowlanych; termin płatności przy pkt 4).
    - ust. 5 pkt 1: z chwilą otrzymania zapłaty (komis, egzekucja, usługi finansowe art. 43 ust. 1
      pkt 37-41 i in.).
    - Art. 20 ust. 1 (WDT, s. 30): „z chwilą wystawienia faktury […] nie później jednak niż 15. dnia
      miesiąca następującego po miesiącu, w którym dokonano tej dostawy”.
    - Art. 21 ust. 1 (metoda kasowa, s. 31): z dniem otrzymania zapłaty (dla nabywców innych niż
      czynni podatnicy VAT nie później niż 180. dnia); FA(3) marks it with `Adnotacje/P_16` = 1, the
      payment date is not in the XML.
    - **Eksport: no special tax-point rule in the KB**; do not state one. K: yes, A: ust. 3 yes.
14. **Daty w FA(3):** `P_6` = data dostawy/wykonania lub otrzymania zapłaty „o ile taka data jest
    określona i różni się od daty wystawienia faktury” (XSD l. 2471; art. 106e ust. 1 pkt 6, s.
    124); `FaWiersz/P_6A` per line; `OkresFa/P_6_Do` for art. 19a ust. 3, 4 and 5 pkt 4 (XSD l.
    2476, so the period end is the tax point for ust. 3/4 but not for ust. 5 pkt 4; FA(3) has no
    marker to tell them apart). Tier 2. HIGH. K: yes.
15. **MF examples 20 and 21 (EUR, `P_1` 2026-02-15) show per-line rates.** Ex. 20: deliveries 20,
    25, 26.02 (after `P_1`), one rate 4.5005 on all lines, `P_14_1W` 14036.16 = 13560 × 0.23 ×
    4.5005. Ex. 21: deliveries 5, 10, 20.02, rates 4.4080 / 4.5005 / 4.3250, `P_14_1W` 13768.14 =
    sum of line tax × line rate (arithmetic checked). Podręcznik cz. II §2.5 points to „przykład nr
    20 i 21”. Files show values, not a stated rule; rates not checked against NBP. MEDIUM as
    illustration. K: yes.

### D. Zaliczki i korekty

16. **Zaliczka: ta sama reguła, inna data.** Art. 19a ust. 8, s. 30: obowiązek „z chwilą jej
    otrzymania w odniesieniu do otrzymanej kwoty” (except ust. 1b and ust. 5 pkt 4). Date in `P_6`
    or per payment `ZaliczkaCzesciowa/P_6Z` (max 31), rate in `KursWalutyZ` or per payment
    `KursWalutyZW`. If the ZAL is issued before the payment (allowed up to 60 days before, art. 106i
    ust. 7 pkt 2), ust. 2 applies (rate before `P_1`). No separate rate rule for advances in art.
    31a. WDT advance: no invoice duty (art. 106b ust. 1 pkt 4 lit. a). Sources:
    `faktura-zaliczkowa-ksef.md` facts 17-18 and its local verification against Dz.U. 2026
    poz. 1263. Tier 1. HIGH. K: yes, A: yes.
17. **Korekta: kurs przyjęty na fakturze pierwotnej.** Art. 31b ust. 1, s. 44: „…przeliczenia na
    złote dokonuje się według kursu danej waluty obcej przyjętego do przeliczenia kwot stosowanych
    do określenia podstawy opodatkowania przed jej zmianą.” Exception art. 31b ust. 2: collective
    discount correction (art. 106j ust. 3) „może” use NBP or ECB from the day before the corrective
    invoice's issue. In-plus/in-minus (art. 29a ust. 13, 17) and `TypKorekty` set the settlement
    period, not the rate. Podręcznik cz. II §2.13.2: StanPrzed rows „Zalecane przy zmianie stawki
    VAT lub kursów walut”; `KursWalutyZK` = rate before correction of an advance (§2.13.1). Tier
    1/2. HIGH. K: yes, A: yes.

### E. „Ostatni dzień roboczy” w praktyce

18. **Worked example (calendar checked, rates not):** usługa wykonana w poniedziałek 30.11.2026,
    faktura 2.12.2026 → obowiązek 30.11 → ostatni dzień roboczy przed nim to piątek 27.11.2026
    (28-29.11 to sobota i niedziela). Faktura z góry 2.12 za usługę z 10.12 → ust. 2 → kurs z wtorku
    1.12.
    - „Dzień roboczy” is **not defined in the VAT Act** (`awaria-ksef-offline.md`, Unsettled 1;
      `terminy-ksef-data-wystawienia.md` Unsettled 7), Saturday status unsettled.
    - That NBP publishes Table A only on working days, and which days are public holidays (e.g. 11
      listopada, 24 grudnia): **NOT IN KB.** Our `/waluty` explainer and `apps/web/src/lib/nbp.ts`
      assume it; that is our output, not a source. Prefer weekend examples; avoid holiday examples
      unless verified.
    - The ECB leg says „ostatni dzień” (not „roboczy”), fact 2. K: yes, A: yes.

## Unsettled Questions

1. **Art. 31a ust. 1a / ust. 2 zd. 2 proviso** („wystawiona nie później niż następnego dnia po dniu
   […] art. 106e ust. 1 pkt 1”): either trivially met or a send-date condition; MF has not said.
   Both readings give the rate from the day before `P_1`. Do not present it as a separate rate.
2. **`OkresFa` with art. 19a ust. 5 pkt 4:** tax point `P_6_Do` or `P_1`; no FA(3) marker.
3. **Which NBP table for currencies outside Table A:** art. 31a says „kursu średniego […]
   ogłoszonego przez Narodowy Bank Polski”; the KB has no source on Table B; our tools use Table A
   only.
4. **Rounding:** no rule for the rate precision beyond the XSD 6 decimals; rounding of `P_14_xW` to
   2 decimals follows `TKwotowy`, no statutory rounding rule in KB.
5. **Statutory text of art. 106e ust. 11:** not in KB verbatim.
6. **PLN tax base for 0% / np / zw sales (JPK_VAT):** not in KB.
7. **WNT under art. 31a ust. 1a:** LOW, out of scope.
8. **Objaśnienia podatkowe 28.01.2026 and SLIM VAT objaśnienia on art. 31a:** not in corpus (SLIM
   VAT URL returned 404 on 2026-08-12). May address ust. 1a.
9. **Art. 31a ust. 1a, 2a-2d, art. 31b, art. 106e ust. 11 in Dz.U. 2026 poz. 1263:** not re-checked
   (only ust. 1, 2 and art. 19a ust. 8 were).
10. **Podręcznik cz. II 2026-08-06 edition:** KB extract is the 2026-02-01 edition; §2.5 / §2.13
    numbers may have shifted.

## Consistency notes (published content, not sources)

- `apps/web/src/app/[locale]/waluty/explainer.tsx` (PL) now states ust. 1 = tax point and ust. 2 =
  invoice before tax point. Finding #8 of `kurs-waluty-art-31a.md` (explainer stated the ust. 2 rule
  as ust. 1) is **stale; fixed**. It still asserts NBP working-day publication without a source.
- `apps/web/content/pl/blog/terminy-ksef-data-wystawienia.mdx` l. 134 cites the ECB option as „art.
  31a ust. 2 zd. 2 w zw. z ust. 1 zd. 2”. In the current ust. 2 the ECB cross-reference is the
  **third** sentence („Przepis ust. 1 zdanie drugie stosuje się odpowiednio”); zd. 2 is the `P_1`
  option. Flag to the Copywriter.
- `apps/web/content/pl/validator/podatek-w-pln-faktura-walutowa.mdx` cites ISAP for the 2025 text
  (`WDU20250000775`); the new post should cite Dz.U. 2026 poz. 1263.
- `kurs-waluty-art-31a.md` gap findings #3-#5 are stale: `semantic.ts` now skips KOR/KOR_ZAL/KOR_ROZ
  and `P_16` = 1 (~l. 1425-1429) and reads `KursWalutyZ`/`KursWalutyZW` (~l. 1636-1674). Severity
  remains a warning. If the post describes the ksefuj check, say „porównuje z tabelą A NBP” and
  mention ECB / ust. 2a as lawful reasons for a mismatch.

## Suggested Sources Section

- Ustawa o VAT, t.j. Dz.U. 2026 poz. 1263, art. 19a, 20, 21, 31a, 31b, 106e ust. 1 pkt 1 i 6 i ust.
  11, 106i, 106na, 106nda, 106nf, 106nh: https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf
  (ISAP: https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260001263)
- (page numbers of quotes) Dz.U. 2025 poz. 775, art. 31a s. 43-44, art. 31b s. 44, art. 19a s.
  28-30: https://api.sejm.gov.pl/eli/acts/DU/2025/775/text/T/D20250775L.pdf
- Ustawa z 5.08.2025 (Dz.U. 2025 poz. 1203), art. 106nda ust. 10 i 16, art. 106nh ust. 4:
  https://api.sejm.gov.pl/eli/acts/DU/2025/1203
- MF, Pytania i odpowiedzi KSeF 2.0, pyt. 18 i 19:
  https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20
- Broszura informacyjna FA(3), §2.5-2.6, §9.1-9.5:
  https://ksef.podatki.gov.pl/media/nuclnu0w/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf
- Podręcznik KSeF 2.0 cz. II (wyd. 6.08.2026), §1.4, §1.6.1, §2.5, §2.13:
  https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
- Schemat FA(3): https://crd.gov.pl/wzor/2025/06/25/13775/schemat.xsd
- NBP, kursy średnie (tabela A): https://api.nbp.pl/
- Internal links: `/waluty` (kalkulator), `/validator/podatek-w-pln-faktura-walutowa`,
  `/blog/faktura-zagraniczna-ksef`, `/blog/faktura-zaliczkowa-ksef`,
  `/blog/faktura-korygujaca-ksef`, `/blog/terminy-ksef-data-wystawienia`.

## Warning: Common Misconceptions

- **„Kurs z dnia poprzedzającego datę wystawienia faktury”** as the rule: that is ust. 2 (exception)
  or the ust. 1a option; the rule is the tax point (ust. 1).
- **„Kurs od daty nadania numeru KSeF”:** no, `P_1` in every mode (fact 4).
- **„KSeF sprawdzi kurs”:** only the format is constrained (fact 11).
- **„Korekta = nowy kurs z dnia korekty”:** no, art. 31b ust. 1 (fact 17).
- **„Tylko NBP jest legalny”:** ECB and income-tax rules are lawful elections (facts 2, 6).
- **„Kurs wpisuje się w nagłówku `Fa/KursWaluty`”:** no such field (fact 7).
- **„KursUmowny = kurs do VAT”:** no (fact 10).
- **„art. 31a §1”:** statutes use „ust.”.
- **Stale (KSeF 1.0 / pre-1.02.2026):** the old ust. 2 („wystawia… dokonuje się”) had no `P_1`
  option for structured invoices, and art. 31a ust. 1a did not exist. Content written before 2026-02
  may lack both.

## Not fetched live in this session

- api.nbp.pl (one check, HTTP 403): no NBP rates or publication calendar verified; MF example rates
  not checked against NBP.
- api.sejm.gov.pl / isap.sejm.gov.pl: Dz.U. 2026 poz. 1263 not opened; art. 31a ust. 1a, 2a-2d, 31b,
  106e ust. 11 not compared with it; no new amending acts after Dz.U. 2026 poz. 1270 checked.
- ksef.podatki.gov.pl: FAQ pyt. 18-19 (last retrieved 2026-08-12), broszura, Podręcznik cz. II
  2026-08-06 not re-read.
- crd.gov.pl: XSD read from the bundled copy only.
- ECB reference rates: no source URL in KB; none given.
