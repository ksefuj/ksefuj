# Research Brief: Ryczałt a KSeF

**Requested by:** Orchestrator (content backlog item `ryczalt-ksef`, `docs/content-backlog.md`)
**Date:** 2026-11-10 **For content:** PL blog post „Ryczałt a KSeF" **Persona:** Ania, JDG on
ryczałt ewidencjonowany (PIT); variants: czynny podatnik VAT / zwolniony z VAT (art. 113)

**Provenance:** built only from the repo knowledge base (baseline
`docs/knowledge-base/WATCHLIST.md`: VAT Act consolidated text Dz.U. 2026 poz. 1263; Podręcznik KSeF
2.0 editions of 2026-08-06). No official host was fetched in this run (proxy 403 from this
container). Every fact names the KB brief it comes from. `podrecznik-ksef-20-czesc-ii.md` is a
condensed Polish summary of the Podręcznik (2026-02-01 edition), so its lines are „KB extract text",
not MF verbatim.

**Target query:** „ryczałt KSeF"

**Answer in two sentences:** Obowiązek KSeF wynika z przepisów ustawy o VAT o fakturach („Podatnicy
są obowiązani wystawiać faktury ustrukturyzowane przy użyciu Krajowego Systemu e-Faktur", art. 106ga
ust. 1; FAQ MF Q10: „każdy podatnik (czynny i zwolniony), który ma obowiązek wystawienia faktury,
będzie wystawiał ją w KSeF"), a żaden z tych przepisów ani tekstów MF w KB nie odwołuje się do formy
opodatkowania PIT, więc ryczałt ewidencjonowany sam w sobie niczego nie zmienia. Liczy się status w
VAT i to, komu wystawiasz fakturę: czynny VAT wystawia faktury firmom w KSeF od 1.04.2026 (z limitem
10 000 zł brutto miesięcznie poza KSeF do 31.12.2026, art. 145m), zwolniony z VAT (art. 113)
wystawia fakturę tylko na żądanie, ale wtedy też w KSeF, a faktury dla konsumentów są poza
obowiązkiem.

**What changes the answer:**

- **Status VAT (nie PIT):** czynny vs zwolniony podmiotowo (art. 113, 240 000 zł). Facts 4–9.
- **Nabywca:** osoba fizyczna nieprowadząca działalności → poza obowiązkiem, dobrowolnie w KSeF
  (art. 106ga ust. 2 pkt 4, ust. 4). Fact 10.
- **Data wystawienia faktury:** do 31.12.2026 limit 10 000 zł (art. 145m) i faktury z kasy (art.
  145n); od 1.01.2027 bez limitu. Facts 6–7.
- **Kary:** art. 106ni od 1.01.2027 w obowiązującej ustawie; UD477 (przesunięcie na 1.01.2028)
  uchwalona przez Sejm 6.11.2026, nie jest jeszcze prawem. Facts 13–14.
- **Rolnik ryczałtowy** to inny reżim (VAT), nie ryczałt ewidencjonowany. Fact 15.

## Key Facts (ready to use)

### A. Ryczałt ewidencjonowany a KSeF

1. **No Tier 1–3 source in the KB mentions „ryczałt ewidencjonowany" (or PIT forms of taxation) in
   connection with KSeF.** A grep of `docs/knowledge-base/` (2026-11-10) finds the term only in (a)
   `limit-10000-zl.md` Fact 5.1 and misconception 3, whose stated source is our own blog
   `ksef-od-1-kwietnia-2026.mdx` (not a valid source; Fact 5.1 says the independence is „implied by
   the general KSeF framework"), and (b) `biala-lista-vat-przelew-15000-zl.md` fact 11 (art. 22p
   PIT, flagged as logical inference). Consequence for the post: state the VAT/PIT independence as
   following from the wording of art. 106ga ust. 1 and FAQ Q10 (both refer to „podatnicy" under the
   VAT Act and their invoicing obligation), NOT as an MF statement about ryczałt. Confidence: HIGH
   (absence in KB); the independence itself: MEDIUM-HIGH as a reading of the text, no MF verbatim.
   Ania-relevant: yes.
2. **KSeF obligation is defined by the VAT Act invoicing rules.** Art. 106ga ust. 1 verbatim:
   „Podatnicy są obowiązani wystawiać faktury ustrukturyzowane przy użyciu Krajowego Systemu
   e-Faktur." Exclusions in ust. 2: no seat / fixed establishment in PL (pkt 1, 2), special
   procedures (pkt 3), buyer a private person (pkt 4), art. 106s regulation (pkt 5), art. 113a (pkt
   6). None refers to the PIT form of taxation (the list as recorded in the KB). Source: Dz.U. 2026
   poz. 1263, https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf — KB:
   `koniec-limitu-10000-zl.md` fact 2, `zwolniony-z-vat-ksef.md` fact 12, `limity-i-wylaczenia.md`
   fact 7. Tier 1. Confidence: HIGH. Ania-relevant: yes.
3. **MF: KSeF applies to every taxpayer with an invoicing obligation, czynny and zwolniony.** FAQ
   KSeF 2.0 Q10 verbatim: „każdy podatnik (czynny i zwolniony), który ma obowiązek wystawienia
   faktury, będzie wystawiał ją w KSeF". Podręcznik cz. II §1.2 (KB extract text): „Najpierw ustala
   się obowiązek wystawienia faktury, potem — obowiązek wystawienia w KSeF." Sources:
   https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20/ ;
   https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
   — KB: `zwolniony-z-vat-ksef.md` fact 6, `podrecznik-ksef-20-czesc-ii.md` (§1.2 „WAŻNE" box). Tier
   3 / Tier 2. Confidence: HIGH. Ania-relevant: yes.

### B. Ryczałtowiec – czynny podatnik VAT

4. **Stage dates:** from 1.02.2026 taxpayers with gross sales > 200 mln zł in 2024; from 1.04.2026
   all other taxpayers. KB extract text: „Od 1 lutego 2026 r. — podatnicy o sprzedaży brutto > 200
   mln zł (za 2024 r.)"; „Od 1 kwietnia 2026 r. — pozostali podatnicy". Source: Podręcznik cz. II
   („Terminy obowiązku wystawiania w KSeF"), URL above — KB: `podrecznik-ksef-20-czesc-ii.md` line
   ~89; also `faktura-korygujaca-ksef.md` fact 2. Tier 2. Confidence: HIGH. Ania-relevant: yes
   (1.04.2026; 1.02.2026 context only). Note: `ksef-dla-jdg.md` Fact 1.2 cites „Art. 145m" for the
   1.02.2026 date; art. 145m is the 10 000 zł rule, so cite the Podręcznik, not 145m, for the dates.
5. **MF stages page:** „1 stycznia 2027 r. KSeF obowiązkowy dla wszystkich … KSeF 2.0 obowiązkowy
   dla wcześniej zwolnionych przedsiębiorców (do 10 tys. zł miesięcznie)." („zwolnionych" = from
   KSeF by the 10k rule, not VAT-exempt.) Source: https://ksef.podatki.gov.pl/etapy-wdrozenia-ksef/
   — KB: `koniec-limitu-10000-zl.md` fact 3, `zwolniony-z-vat-ksef.md` fact 8. Tier 3. Confidence:
   HIGH. Ania-relevant: yes.
6. **Art. 145m (10 000 zł, until 31.12.2026):** taxpayers obliged to issue structured invoices „mogą
   wystawiać faktury elektroniczne lub faktury w postaci papierowej, jeżeli łączna wartość sprzedaży
   wraz z kwotą podatku … udokumentowana tymi fakturami wystawionymi w danym miesiącu jest mniejsza
   lub równa 10 000 zł"; period „w okresie od dnia 1 kwietnia 2026 r. do dnia 31 grudnia 2026 r.";
   ust. 2: right lost „począwszy od faktury, którą przekroczono" the value. Gross (with tax), month
   of issue. FAQ MF Q22: excluded from the sum are invoices to private persons, cash-register
   invoices in the daily report, receipts with NIP up to 450 zł / 100 euro, invoices excluded under
   the art. 106s regulation. Sources: Dz.U. 2026 poz. 1263 art. 145m (URL above);
   https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20/ ;
   https://ksef.podatki.gov.pl/ponizej-10-000-zl/ — KB: `zwolniony-z-vat-ksef.md` fact 7,
   `koniec-limitu-10000-zl.md` facts 1, 7. Tier 1 + Tier 3. Confidence: HIGH. Ania-relevant: yes.
   Applies to czynny and zwolniony alike (`limit-10000-zl.md` misconception 5, corrected
   2026-10-07).
7. **Art. 145n (cash register, until 31.12.2026):** „W okresie od dnia 1 lutego 2026 r. do dnia 31
   grudnia 2026 r. podatnicy obowiązani do wystawiania faktur ustrukturyzowanych mogą wystawiać: 1)
   faktury elektroniczne lub faktury w postaci papierowej przy zastosowaniu kas rejestrujących; 2)
   paragony fiskalne uznane za faktury wystawione zgodnie z art. 106e ust. 5 pkt 3." From 1.01.2027
   (Podręcznik cz. I s. 14): „Brak możliwości wystawiania faktur przy użyciu kas rejestrujących i
   uznawania za faktury uproszczone paragonów fiskalnych z NIP nabywcy." Sources: Dz.U. 2026 poz.
   1263 art. 145n ust. 1;
   https://ksef.podatki.gov.pl/media/dmrfdixs/podrecznik-ksef-20-cz-i-rozpoczecie-korzystania-z-ksef-06082026.pdf
   — KB: `faktura-z-kasy-fiskalnej-ksef-2027.md` facts 1, 3. Tier 1 / Tier 2. Confidence: HIGH.
   Ania-relevant: only if she has a till.

### C. Ryczałtowiec – zwolniony z VAT (art. 113)

8. **Art. 113 ust. 1 threshold: 240 000 zł** (sales excl. VAT, from 1.01.2026); ust. 5: exemption
   lost from the transaction that crosses it. Verbatim: „kwoty 240 000 zł". Source: Dz.U. 2026 poz.
   1263 art. 113 — KB: `zwolniony-z-vat-ksef.md` fact 2. Tier 1. Confidence: HIGH. Ania-relevant:
   yes.
9. **No invoice obligation unless requested; if issued → KSeF; no rachunek.**
   - Art. 106b ust. 2: „Podatnik nie jest obowiązany do wystawienia faktury w odniesieniu do
     sprzedaży zwolnionej od podatku na podstawie art. 43 ust. 1, art. 113 ust. 1 i 9, art. 113a
     ust. 1 lub przepisów wydanych na podstawie art. 82 ust. 3." — KB: `zwolniony-z-vat-ksef.md`
     fact 3. Tier 1. HIGH.
   - Art. 106b ust. 3 pkt 2: on request „jeżeli żądanie jej wystawienia zostało zgłoszone w terminie
     3 miesięcy, licząc od końca miesiąca, w którym dostarczono towar lub wykonano usługę bądź
     otrzymano całość lub część zapłaty". Applies to business and consumer buyers. — KB:
     `zwolniony-z-vat-ksef.md` fact 4. Tier 1. HIGH.
   - FAQ MF Q22: „Faktury wystawiane przez podatników zwolnionych z VAT lub wykonujących czynności
     wyłącznie zwolnione z VAT na rzecz innych podatników, jeśli wobec tych faktur nie istnieją
     żadne wyłączenia lub przepisy epizodyczne pozwalające na ich wystawienie poza KSeF, należy
     wystawić przy użyciu KSeF." — https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20/ ; KB:
     `zwolniony-z-vat-ksef.md` fact 6. Tier 3. HIGH.
   - Rachunek: Podręcznik cz. II §1.3 (KB extract text): „Jeśli podatnik zdecyduje się dokumentować
     czynność — tym dokumentem zawsze musi być faktura, nie rachunek." Rachunek only for activities
     outside VAT (art. 6), non-taxpayers, rolnicy ryczałtowi zwolnieni z fakturowania (art. 117).
     „Pierwszeństwo ma zawsze obowiązek wystawienia faktury." — KB: `podrecznik-ksef-20-czesc-ii.md`
     §1.3; `najem-lokalu-ksef.md` fact 8. Tier 2. HIGH.
   - FAQ MF Q12: „Czynności zwolnione z VAT są dokumentowane fakturą wystawianą na żądanie nabywcy,
     a nie rachunkiem. […] Taka faktura będzie wystawiana w KSeF." — KB: `zwolniony-z-vat-ksef.md`
     fact 11. Tier 3. MEDIUM (answer given to a budget unit; Ordynacja podatkowa art. 87 not
     extracted).
   - Exempt invoice must state the exemption basis (art. 106e ust. 1 pkt 19; FA(3)
     `Adnotacje/Zwolnienie`: P_19 = 1 + one of P_19A/P_19B/P_19C) — KB: `zwolniony-z-vat-ksef.md`
     fact 5; `packages/validator/docs/fa3-information-sheet.md` (Zwolnienie). HIGH. Ania-relevant:
     one line (software fills it).

### D. Klienci prywatni (B2C)

10. **Invoices to consumers are outside the KSeF obligation; voluntary in KSeF.** Art. 106ga ust. 2
    pkt 4: obligation does not cover invoices to a „osoba fizyczna nieprowadząca działalności
    gospodarczej" (KB holds this fragment only); ust. 4 allows voluntary structured invoices
    (paraphrase). FAQ MF: „Wystawianie w KSeF faktur na rzecz konsumentów nie jest obowiązkowe.
    Jeżeli jednak podatnik wyraża taką chęć to może taką fakturę wystawić w KSeF (w tym fakturę do
    paragonu)." Consumer receives it in an agreed way, with QR code (art. 106gb ust. 4; Podręcznik
    cz. II pkt 5.3). Sources: Dz.U. 2026 poz. 1263;
    https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20/ — KB:
    `faktura-dla-osoby-prywatnej-ksef.md` facts 1–3, `zwolniony-z-vat-ksef.md` fact 10. Tier 1 +
    Tier 3. Confidence: HIGH. Ania-relevant: yes. No end date for pkt 4 in the KB.

### E. Odbieranie faktur zakupowych

11. **Receiving in KSeF is mandatory from 1.02.2026, independent of the issuing deadline.** KB
    extract text: „Odroczenie terminów dotyczy wyłącznie wystawiania faktur, nie ich otrzymywania.
    Otrzymywanie w KSeF jest obowiązkowe od 1.02.2026 r." (cz. II §6.2); art. 106na ust. 2 repealed,
    no buyer acceptance (§6.1); invoice with the buyer's NIP in `Podmiot2/DaneIdentyfikacyjne/NIP`
    is available automatically; receipt date = KSeF number date (art. 106na ust. 3). Free MF tools
    suffice (Aplikacja Podatnika, Aplikacja Mobilna, e-mikrofirma). Sources: Podręcznik cz. II URL
    above; https://ksef.podatki.gov.pl/ponizej-10-000-zl/ (pyt. 4) — KB:
    `podrecznik-ksef-20-czesc-ii.md` §6.1–6.2, `jak-odebrac-fakture-ksef.md` facts 1–3,
    `koniec-limitu-10000-zl.md` fact 8. Tier 2/3. Confidence: HIGH. Ania-relevant: yes. Note: the KB
    statements are general („nabywca"); none singles out VAT-exempt or ryczałt buyers.
12. **Why receipt matters (VAT side, czynny only):** deduction right arises „nie wcześniej niż w
    okresie otrzymania faktury (art. 86 ust. 10b pkt 1)" (Podręcznik cz. II pkt 1.7, KB). Source: KB
    `jak-odebrac-fakture-ksef.md` fact 4, `faktura-poza-ksef-odliczenie-vat.md`. Tier 2. Confidence:
    HIGH for the VAT rule. **PIT side is OUT OF KB:** no Tier 1–3 source in the KB states that a
    ryczałtowiec does not deduct costs; the only KB line (`biala-lista-vat-przelew-15000-zl.md`
    fact 11) is a MEDIUM inference and says the ryczałt act was not checked. Recommendation: the
    post should not make PIT/ryczałt cost claims, or keep them to a non-sourced aside without
    numbers.

### F. Kary

13. **Law in force: art. 106ni from 1.01.2027.** Penalty „do 100 % kwoty podatku wykazanego na tej
    fakturze wystawionej poza Krajowym Systemem e-Faktur", for invoices without tax „do 18,7 % kwoty
    należności ogółem" (the zwolniony case). Source: Dz.U. 2026 poz. 1263 art. 106ni,
    https://api.sejm.gov.pl/eli/acts/DU/2026/1263 — KB: `sankcje-ksef-ud477.md` fact 1,
    `zwolniony-z-vat-ksef.md` fact 13. Tier 1. Confidence: HIGH. Article is 106ni, not 106gc.
14. **Deferral status (latest in KB, checked 2026-11-07):** MF announced 2026-09-16 deferral to end
    of 2027
    (https://www.gov.pl/web/finanse/przedluzenie-odroczenia-kar-za-bledy-w-stosowaniu-ksef-do-konca-2027-r;
    „Odroczenie kar nie oznacza braku obowiązku stosowania KSeF"). UD477 (Sejm druk 3245) moves art.
    106ni ust. 1–3 i 5–7 to 1.01.2028, entry into force 31.12.2026; art. 145m/145n unchanged. Sejm
    passed it 2026-11-06 without amendments (głosowanie nr 65: 437 za, 1 przeciw, 1 wstrzymujący
    się); PiS amendment (KSeF exemption for mikroprzedsiębiorcy to 31.12.2027) rejected 168/235/40.
    Senate: not yet registered as of 2026-11-07 (sittings planned 25–26.11, 8–9.12, 16–18.12.2026).
    Not law until Senate, President, publication. Sources:
    https://api.sejm.gov.pl/sejm/term10/processes/3245 ,
    https://api.sejm.gov.pl/sejm/term10/votings/68/65 ,
    https://legislacja.rcl.gov.pl/projekt/12414954 — KB: `sankcje-ksef-ud477.md` facts 4–5.
    Confidence: HIGH (status as of 2026-11-07). Suggested wording per KB: „Sejm uchwalił 6 listopada
    2026 r., ustawa czeka na Senat i Prezydenta". Ania-relevant: yes.

### G. Rolnik ryczałtowy (pointer only)

15. **„Rolnik ryczałtowy" is a VAT regime (art. 115–117), unrelated to ryczałt ewidencjonowany.** A
    rolnik ryczałtowy zwolniony z obowiązku fakturowania (art. 117) may issue a rachunek; VAT RR
    invoices are optional in KSeF from 1.04.2026; KB has no MF source saying farmers are „wyłączeni
    z KSeF". Source: KB `limity-i-wylaczenia.md` facts 1, 4, 7 and misconception notes;
    https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/podstawy-prawne-oraz-kluczowe-terminy/ .
    Confidence: HIGH. Ania-relevant: one line, link to the FAQ answer.

## Gaps / not settled

- **No MF statement on ryczałt ewidencjonowany** (Fact 1). The independence of PIT form and KSeF is
  our reading of art. 106ga / FAQ Q10. `limit-10000-zl.md` Fact 5.1 is sourced from our own blog and
  should not be cited as a source.
- **Ryczałt PIT mechanics** (no cost deduction, rates, ewidencja przychodów, whether a KSeF invoice
  or its number is needed for ryczałt records): not in KB. Avoid.
- **Art. 113 ust. 13 exclusions** (e.g. legal, consulting services cannot use the exemption): noted
  in `zwolniony-z-vat-ksef.md` as not covered; relevant to many ryczałt freelancers, not extracted.
- **Invoice for a 2026 sale issued in January 2027** (art. 145m ends 31.12.2026; 3-month request
  window): no MF answer; text points to KSeF (`zwolniony-z-vat-ksef.md`, `koniec-limitu-10000-zl.md`
  fact 7, MEDIUM).
- **Rachunek MF FAQ Q12** was given to a budget unit; Ordynacja podatkowa art. 87 not extracted.
- **UD477** after 2026-11-07: Senate stage unknown; recheck before publication.
- **Art. 106ga ust. 2 pkt 4 and ust. 4:** KB holds a fragment / paraphrase only, no full verbatim.

## Suggested Sources Section

- Ustawa o VAT, tekst jednolity Dz.U. 2026 poz. 1263 (art. 106b, 106e, 106ga, 106ni, 113, 145m,
  145n): https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf
- FAQ MF KSeF 2.0: https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20/
- MF, Etapy wdrożenia KSeF: https://ksef.podatki.gov.pl/etapy-wdrozenia-ksef/
- MF, Poniżej 10 000 zł: https://ksef.podatki.gov.pl/ponizej-10-000-zl/
- Podręcznik KSeF 2.0 cz. II (06.08.2026), pkt 1.3, 6.1–6.2:
  https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
- Podręcznik KSeF 2.0 cz. I (06.08.2026), s. 14:
  https://ksef.podatki.gov.pl/media/dmrfdixs/podrecznik-ksef-20-cz-i-rozpoczecie-korzystania-z-ksef-06082026.pdf
- MF, komunikat 16.09.2026:
  https://www.gov.pl/web/finanse/przedluzenie-odroczenia-kar-za-bledy-w-stosowaniu-ksef-do-konca-2027-r
- Sejm, druk 3245 (przebieg): https://api.sejm.gov.pl/sejm/term10/processes/3245

## Common misconceptions

- „Jestem na ryczałcie, więc KSeF mnie nie dotyczy": wrong; KSeF follows the VAT invoicing
  obligation (art. 106ga ust. 1, FAQ Q10), the PIT form is not a criterion anywhere in the KB
  sources.
- „Ryczałt = zwolnienie z VAT": wrong; PIT form and VAT status are separate (no MF verbatim; see
  Fact 1). A ryczałtowiec can be czynny VAT.
- „Zwolniony z VAT nie musi być w KSeF": wrong when he issues an invoice to a business (FAQ Q22);
  only art. 113a (EU SME, foreign seat) is excluded permanently.
- „Zwolniony może wystawić rachunek zamiast faktury": wrong (Podręcznik cz. II §1.3; FAQ Q12).
- „Rolnik ryczałtowy i ryczałt ewidencjonowany to to samo": wrong (Fact 15).
- „Kary od 2028 są przesądzone": not yet law as of the KB record (2026-11-07).
- „Limit 10 000 zł to netto / obowiązuje w 2027": gross, ends 31.12.2026.

**Freshness:** 2026-11-10 (KB baseline 2026-10-07 / UD477 status 2026-11-07). Recheck: UD477 Senate
and publication; 1.01.2027 (end of 145m/145n); any FAQ entry on PIT forms.
