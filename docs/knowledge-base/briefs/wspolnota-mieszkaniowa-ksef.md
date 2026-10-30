# Research Brief: Wspólnota mieszkaniowa i spółdzielnia a KSeF

**Requested by:** Orchestrator (content backlog item `wspolnota-mieszkaniowa-ksef`) **Date:**
2026-10-30 **For content:** Blog post "Wspólnota mieszkaniowa i spółdzielnia a KSeF"

**Target query:** „wspólnota mieszkaniowa KSeF"

**Personas:** accountant / zarządca nieruchomości handling a wspólnota's invoices; Ania, who owns a
flat and pays charges to the wspólnota.

**Provenance:** built only from the repo knowledge base (baseline
`docs/knowledge-base/WATCHLIST.md`, last checked 2026-10-07: VAT Act consolidated text Dz.U. 2026
poz. 1263) and `packages/validator/docs/fa3-information-sheet.md`. No official host was fetched in
this run (proxy 403 for ksef.podatki.gov.pl, isap/api.sejm.gov.pl, gov.pl, legislacja.rcl.gov.pl).
The KB extract of Podręcznik cz. II (`podrecznik-ksef-20-czesc-ii.md`) is a condensed Polish summary
of the **2026-02-01** edition, not a verbatim transcript; its lines are cited as „KB extract text".
A 2026-08-06 edition exists (changes judged minor in a non-line-by-line check).

**Answer in two sentences:** Ustawa o VAT nie wyłącza wspólnot mieszkaniowych z KSeF: MF wymienia
wspólnoty mieszkaniowe wśród podatników (Podręcznik KSeF 2.0 cz. II, pkt 1.2), a każdy podatnik,
czynny i zwolniony, który wystawia fakturę innemu podatnikowi, robi to w KSeF (art. 106ga ust. 1;
FAQ MF KSeF 2.0, pyt. 10 i 22), do 31.12.2026 z możliwością wystawiania poza KSeF przy sprzedaży do
10 000 zł brutto miesięcznie (art. 145m). Faktury dla właścicieli lokali będących osobami prywatnymi
są poza obowiązkiem (art. 106ga ust. 2 pkt 4), sprzedaż zwolnioną z art. 43 ust. 1 lub art. 113
dokumentuje się fakturą tylko na żądanie (art. 106b ust. 2, ust. 3 pkt 2), a faktury zakupowe z NIP
wspólnoty w polu NIP nabywcy trafiają do niej w KSeF automatycznie.

**What changes the answer:**

- **Whether the wspólnota acts as a podatnik** for the activity in question: Podręcznik cz. II pkt
  1.2 ties the status to „samodzielność, ciągłość, charakter zarobkowy" (fact 1). Which wspólnota
  charges are VAT activity is not in the KB (Unsettled).
- **Buyer is a private owner (osoba fizyczna nieprowadząca działalności):** no KSeF obligation,
  voluntary only (art. 106ga ust. 2 pkt 4, ust. 4).
- **Sale exempt under art. 43 ust. 1 or art. 113:** no invoice unless requested within 3 months
  (art. 106b ust. 2, ust. 3 pkt 2); if issued for a taxpayer, it goes through KSeF.
- **Invoice issued by 31.12.2026 and monthly invoiced sales ≤ 10 000 zł gross:** may be outside KSeF
  (art. 145m); from 1.01.2027 no limit.
- **Wspólnota without NIP:** KSeF cannot issue an invoice without the seller's NIP (FAQ Q14); as a
  buyer, a „podmiot bez NIP" gets invoices in an agreed way, not in KSeF (art. 106gb ust. 4).
- **Document is a nota księgowa / obciążeniowa, not a faktura:** not sent to KSeF.

## Key Facts (ready to use)

1. **MF lists wspólnoty mieszkaniowe among taxpayers obliged to use KSeF, subject to the general
   criteria.** KB extract text (pkt 1.2 „Kto jest obowiązany wystawiać faktury w KSeF?"): „Obowiązek
   dotyczy zasadniczo **wszystkich podatników** zobowiązanych do wystawiania faktur na podstawie
   polskich przepisów"; podatnikami (art. 15 ust. 1) są m.in. „Inne podmioty niebędące osobą
   fizyczną (fundacje, wspólnoty mieszkaniowe, stowarzyszenia)"; „Trzy kluczowe przesłanki:
   samodzielność, ciągłość, charakter zarobkowy." Source: Podręcznik KSeF 2.0 cz. II, pkt 1.2
   (2026-02-01 edition per KB; current edition 2026-08-06:
   https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf).
   Tier 2 (MF guidance). Confidence: HIGH (that the list names wspólnoty), MEDIUM (condensed
   extract, not verbatim; the list illustrates who can be a podatnik, it does not say every
   wspólnota is one for every activity). Persona: both.
2. **Spółdzielnie mieszkaniowe are not named in the KB.** The Podręcznik list (fact 1) names spółki
   kapitałowe and „inne podmioty niebędące osobą fizyczną" but not spółdzielnie. The obligation in
   art. 106ga ust. 1 is addressed to „Podatnicy" without listing legal forms (fact 3). The only
   spółdzielnia reference in the KB is art. 19a ust. 8 (tax point for advances, including „wkład
   budowlany lub mieszkaniowy przed ustanowieniem spółdzielczego prawa do lokalu mieszkalnego"),
   quoted in `kurs-waluty-art-31a.md` from Dz.U. 2025 poz. 775, s. 30. Confidence: HIGH (absence in
   KB). Persona: accountant.
3. **KSeF obligation, exempt taxpayers included.** Art. 106ga ust. 1: „Podatnicy są obowiązani
   wystawiać faktury ustrukturyzowane przy użyciu Krajowego Systemu e-Faktur." FAQ MF KSeF 2.0 Q10:
   „każdy podatnik (czynny i zwolniony), który ma obowiązek wystawienia faktury, będzie wystawiał ją
   w KSeF". FAQ Q22: invoices of VAT-exempt taxpayers „na rzecz innych podatników, jeśli wobec tych
   faktur nie istnieją żadne wyłączenia lub przepisy epizodyczne pozwalające na ich wystawienie poza
   KSeF, należy wystawić przy użyciu KSeF." Source: Dz.U. 2026 poz. 1263, art. 106ga ust. 1 (Tier
   1); https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20/ (Tier 3). Per
   `zwolniony-z-vat-ksef.md` fact 6. Confidence: HIGH. Persona: both.
4. **Stage dates:** 1.02.2026 for taxpayers with 2024 sales above 200 mln zł gross, 1.04.2026 for
   the rest. Source: Podręcznik cz. II pkt 1.2 (KB extract text: „Od 1 kwietnia 2026 r. — pozostali
   podatnicy"). Confidence: HIGH. Persona: both.
5. **The statutory exclusions do not name wspólnoty or spółdzielnie.** Art. 106ga ust. 2: no
   obligation for invoices by a taxpayer without seat/fixed establishment in Poland (pkt 1, 2),
   special procedures (pkt 3), „na rzecz nabywcy … będącego osobą fizyczną nieprowadzącą
   działalności gospodarczej" (pkt 4), cases from the art. 106s regulation (pkt 5), art. 113a SME
   scheme (pkt 6). Regulation Dz.U. 2025 poz. 1740 § 2, as recorded in the KB: e.g. simplified
   invoices for paid motorways (pkt 1) and single-journey passenger tickets (pkt 2). Source: Dz.U.
   2026 poz. 1263, art. 106ga ust. 2–4; https://api.sejm.gov.pl/eli/acts/DU/2025/1740/text.pdf. Per
   `biuro-rachunkowe-ksef-kto-co-robi.md` D1, D7 (1740 fetched there 2026-10-26). Confidence: HIGH
   for the statute list; MEDIUM for § 2 of poz. 1740 (KB records it with „e.g.", full list not
   transcribed). Persona: both.
6. **Invoices to owners who are private persons: outside the obligation, voluntary in KSeF.** Art.
   106ga ust. 2 pkt 4 (fact 5); ust. 4: in pkt 1, 2 and 4 the taxpayer may issue in KSeF. The
   consumer is an art. 106gb ust. 4 buyer and receives the invoice in an agreed way, with a QR code
   (Podręcznik cz. II pkt 1.6.5, 5.3). Per `faktura-dla-osoby-prywatnej-ksef.md` facts 1, 2, 5.
   Confidence: HIGH. Persona: Ania (yes).
7. **Exempt sales: no invoice unless requested.** Art. 106b ust. 2: „Podatnik nie jest obowiązany do
   wystawienia faktury w odniesieniu do sprzedaży zwolnionej od podatku na podstawie art. 43 ust. 1,
   art. 113 ust. 1 i 9, art. 113a ust. 1 lub przepisów wydanych na podstawie art. 82 ust. 3." Art.
   106b ust. 3 pkt 2: on request „zgłoszone w terminie 3 miesięcy, licząc od końca miesiąca, w
   którym dostarczono towar lub wykonano usługę bądź otrzymano całość lub część zapłaty". Source:
   Dz.U. 2026 poz. 1263, art. 106b. Per `zwolniony-z-vat-ksef.md` facts 3–4. Confidence: HIGH.
   Persona: accountant.
8. **Residential lease exemption and subjective exemption.** Art. 43 ust. 1 pkt 36 — KB extract
   text: „najem nieruchomości mieszkalnych na cele mieszkaniowe" (zwolnienie przedmiotowe). Lease of
   that kind or for business use under art. 113 „dokonywany na rzecz osoby fizycznej → brak
   obowiązku wystawienia faktury nawet na żądanie (art. 106b ust. 3 pkt 1 lit. a). Podatnik może
   wystawić fakturę dobrowolnie (w KSeF lub poza KSeF)." Art. 113 ust. 1 threshold: 240 000 zł from
   1.01.2026. Source: Podręcznik cz. II pkt 1.2.1; Dz.U. 2026 poz. 1263 art. 113 (per
   `zwolniony-z-vat-ksef.md` fact 2). The KB text concerns najem prywatny generally, not wspólnota
   charges. Confidence: HIGH (rule as stated), applicability to wspólnoty not in KB. Persona: Ania
   (if she rents her flat out).
9. **10 000 zł rule until 31.12.2026.** Art. 145m ust. 1: from 1.04 to 31.12.2026 taxpayers „mogą
   wystawiać faktury elektroniczne lub faktury w postaci papierowej, jeżeli łączna wartość sprzedaży
   wraz z kwotą podatku … udokumentowana tymi fakturami wystawionymi w danym miesiącu jest mniejsza
   lub równa 10 000 zł"; ust. 2: right lost „począwszy od faktury, którą przekroczono". Consumer
   invoices and cash-register invoices are not counted (Podręcznik cz. II pkt 1.2.1; FAQ Q22).
   Source: Dz.U. 2026 poz. 1263, art. 145m. Per `zwolniony-z-vat-ksef.md` fact 7,
   `koniec-limitu-10000-zl.md` fact 1. Confidence: HIGH. Persona: accountant.
10. **Cash-register invoices (art. 145n) only until 31.12.2026; from 1.01.2027 no limit.** Art. 145n
    ust. 1: invoices from cash registers and receipts treated as invoices may be outside KSeF until
    31.12.2026. MF: „1 stycznia 2027 r. KSeF obowiązkowy dla wszystkich"
    (https://ksef.podatki.gov.pl/etapy-wdrozenia-ksef/). Per `koniec-limitu-10000-zl.md` facts 3,
    5, 6. Confidence: HIGH. Persona: accountant.
11. **Same answer as for fundacje and stowarzyszenia.** Fact 1 lists them alongside wspólnoty; the
    KB corrected an earlier claim that organisations with only exempt activity join on 1.01.2027
    (not supported, FAQ Q10). Source: `limit-10000-zl.md` Fact 5.3 (correction 2026-10-07). Our FAQ
    `apps/web/content/pl/faq/limity-i-wylaczenia.mdx` gives the same answer (own content,
    cross-reference only). Confidence: HIGH. Persona: accountant.
12. **NIP is needed to issue in KSeF.** FAQ Q14: KSeF cannot issue an invoice without the seller's
    NIP (VAT-R and NIP-7 first). Per `zwolniony-z-vat-ksef.md` fact 14 (paraphrase, no verbatim in
    KB; the answer is framed for natural persons). Confidence: HIGH (paraphrase). Persona:
    accountant.
13. **Purchase invoices reach the wspólnota in KSeF when its NIP is in `Podmiot2/.../NIP`.** KB
    extract text: „Faktura z numerem KSeF automatycznie dostępna po stronie nabywcy (gdy NIP nabywcy
    w Podmiot2/DaneIdentyfikacyjne/NIP)"; „NIP nabywcy musi być w polu NIP (nie NrVatUE ani NrID),
    inaczej nabywca nie otrzyma faktury w KSeF"; a wrong NIP assigns the invoice to that NIP's
    holder. FA(3) sheet §6.2: „The invoice will only be correctly made available to the purchaser if
    their NIP is in the `NIP` field." Date of receipt = date the KSeF number is assigned (art. 106na
    ust. 3). Source: Podręcznik cz. II pkt 5.2, 1.6.4, 5.1; broszura FA(3)
    (https://ksef.podatki.gov.pl/media/nuclnu0w/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf).
    Per `jak-odebrac-fakture-ksef.md` facts 1, 3, 14. Confidence: HIGH. Persona: accountant /
    zarządca.
14. **Buyer without NIP: invoice in an agreed way, with QR code.** Art. 106gb ust. 4 list includes
    „Podmiot bez NIP" and „Konsument"; for these buyers the date of receipt is actual receipt (art.
    106na ust. 4). Source: Podręcznik cz. II pkt 1.6.5, 5.3.1. Per `jak-odebrac-fakture-ksef.md`
    fact 15. Statute held in the KB only as the Podręcznik's paraphrase. Confidence: HIGH. Persona:
    accountant.
15. **Access for a non-natural person: qualified seal or ZAW-FA, then electronic grants.** ZAW-FA is
    for a „podmiot niebędący osobą fizyczną, który nie może uwierzytelnić się pieczęcią
    kwalifikowaną"; it names exactly one natural person (need not be in KRS), who gets i.a.
    permission management, issuing and access to invoices; further people are added electronically.
    ZAW-FA(3): paper, e-US or e-Doręczenia; ePUAP not effective since 1.01.2026. Source: Dz.U. 2025
    poz. 1815 § 5 ust. 1 (https://api.sejm.gov.pl/eli/acts/DU/2025/1815/text.pdf); Podręcznik cz. I
    s. 58–61
    (https://ksef.podatki.gov.pl/media/dmrfdixs/podrecznik-ksef-20-cz-i-rozpoczecie-korzystania-z-ksef-06082026.pdf);
    https://www.gov.pl/web/finanse/formularz-zaw-fa3-dostepny-w-e-us. Per `logowanie-ksef.md` facts
    12–13, `uprawnienia-ksef-ksiegowa.md` facts 12–13. The KB does not apply this to wspólnoty by
    name. Confidence: HIGH. Persona: accountant / zarządca.
16. **Permissions can be granted to another entity.** To a podmiot (example in KB: biuro rachunkowe)
    „wystawianie i przeglądanie faktur"; three cooperation models with an accounting office. Source:
    Podręcznik cz. I s. 20, 22; AP manual s. 136–145. Per `koniec-limitu-10000-zl.md` facts 12–13.
    The KB does not mention zarządca nieruchomości. Confidence: HIGH (mechanism). Persona: zarządca.
17. **Noty księgowe / obciążeniowe are not sent to KSeF.** KB extract text: „Do KSeF nie są
    przesyłane: faktury pro forma, noty obciążeniowe, noty uznaniowe, faktury wewnętrzne, dowody
    wewnętrzne i załączniki w formie nieustrukturyzowanej." FAQ (section „KSeF w JST"): „KSeF nie
    likwiduje not księgowych. Mogą one dalej funkcjonować, ale nie będą wystawiane w KSeF." Source:
    Podręcznik cz. II pkt 1.1 (WAŻNE); https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20/
    (cite by question text „Czy nota księgowa przestanie funkcjonować?", numbering unreliable). Per
    `nota-korygujaca-ksef.md` fact 4. The KB does not say when a nota may replace a faktura.
    Confidence: HIGH. Persona: both.
18. **Rachunek is not an alternative for exempt activity.** FAQ (Wystawianie i otrzymywanie faktur,
    Q12): „Czynności zwolnione z VAT są dokumentowane fakturą wystawianą na żądanie nabywcy, a nie
    rachunkiem. … Taka faktura będzie wystawiana w KSeF." Answer given to a budget unit; Ordynacja
    podatkowa not checked. Per `zwolniony-z-vat-ksef.md` fact 11. Confidence: MEDIUM. Persona:
    accountant.
19. **Penalties (art. 106ni) in the law in force from 1.01.2027, deferral announced, not enacted.**
    Up to 100% of tax on an invoice issued outside KSeF, „a w przypadku faktury bez wykazanego
    podatku – … do 18,7 % kwoty należności ogółem". MF announcement 2026-09-16: deferral to the end
    of 2027. Bill UD477 (Sejm druk 3245, first reading 2026-10-21) moves art. 106ni ust. 1–3, 5–7 to
    1.01.2028; not passed or published (status checked 2026-10-23). Source: Dz.U. 2026 poz. 1263,
    art. 106ni;
    https://www.gov.pl/web/finanse/przedluzenie-odroczenia-kar-za-bledy-w-stosowaniu-ksef-do-konca-2027-r;
    https://legislacja.rcl.gov.pl/projekt/12414954;
    https://api.sejm.gov.pl/sejm/term10/prints/3245/3245.pdf. Per `sankcje-ksef-ud477.md` facts 1,
    4, 5. Confidence: HIGH (state as of 2026-10-23). Persona: both.

## Unsettled Questions

- **VAT treatment of specific wspólnota charges is outside this KB.** Whether zaliczki na koszty
  zarządu nieruchomością wspólną, fundusz remontowy, re-invoiced media (water, heating, waste) or
  rent of common areas are VAT-able, exempt or outside VAT is not addressed by any source in
  `docs/knowledge-base/`. Do not state it; it decides whether an invoice (and so KSeF) arises at
  all.
- **MF answer to interpelacja 17044** (reportedly ruling out an exclusion for wspólnoty): not in the
  KB, not confirmable here. What the KB does settle: the statute (art. 106ga ust. 2) and the
  regulation as recorded (Dz.U. 2025 poz. 1740 § 2) contain no exclusion for wspólnoty (fact 5).
- **MF training PDF `/media/hb0mye13/` on ksef.podatki.gov.pl:** only a partial path in
  `docs/content-backlog.md`, no full URL in the KB; not fetched, content unknown. Do not cite.
- **Spółdzielnie mieszkaniowe:** no KB source names them (fact 2). The general rule (fact 3) applies
  to every podatnik, but no MF statement on spółdzielnie is in the corpus.
- **Wspólnota without NIP:** KB does not say whether wspólnoty in general hold a NIP or what a
  wspólnota without one must do to issue in KSeF (FAQ Q14 is framed for natural persons).
- **Ania as owner with a JDG:** whether an invoice from the wspólnota to an owner who runs a JDG is
  a consumer invoice (pkt 4) or a mandatory KSeF invoice is not settled
  (`faktura-dla-osoby-prywatnej-ksef.md` fact 10: no MF source on who decides).
- **Zarządca as Podmiot3 or entity grantee:** KB has no MF statement on how a professional zarządca
  should be set up (entity permission vs ZAW-FA person); only the general mechanisms (facts 15–16).
- **Whether UD477 is enacted** before 31.12.2026; do not state 2028 as law.
- **Stale line in the KB extract:** Podręcznik cz. II pkt 1.2 (2026-02-01 edition) says „Od 1
  stycznia 2027 r. — podatnicy zwolnieni, u których limit 10 000 zł nie jest przekroczony"; read
  with FAQ Q10/Q22 (fact 3), exempt taxpayers are in KSeF now, subject to art. 145m.

## Not fetched live

All of the following are relied on via the KB only; none was fetched in this run.

- Dz.U. 2026 poz. 1263 (ustawa o VAT, t.j.): art. 15 ust. 1, 19a ust. 8 (quoted from Dz.U. 2025 poz.
  775 in KB), 43 ust. 1 pkt 36, 106b ust. 2–3, 106ga ust. 1–4, 106gb ust. 4, 106na ust. 3–4, 106ni,
  113 ust. 1, 145m, 145n — https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf ;
  https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260001263
- Rozporządzenie Dz.U. 2025 poz. 1740 § 2 — https://api.sejm.gov.pl/eli/acts/DU/2025/1740/text.pdf
- Rozporządzenie Dz.U. 2025 poz. 1815 § 5 — https://api.sejm.gov.pl/eli/acts/DU/2025/1815/text.pdf
- Podręcznik KSeF 2.0 cz. II, pkt 1.1, 1.2, 1.2.1, 1.6.4, 1.6.5, 5.1, 5.2, 5.3 —
  https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
  (KB extract is of the 2026-02-01 edition)
- Podręcznik KSeF 2.0 cz. I, s. 20, 22, 58–61 —
  https://ksef.podatki.gov.pl/media/dmrfdixs/podrecznik-ksef-20-cz-i-rozpoczecie-korzystania-z-ksef-06082026.pdf
- FAQ MF KSeF 2.0 (Q10, Q12, Q14, Q22, „Czy nota księgowa przestanie funkcjonować?") —
  https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20/
- MF, Etapy wdrożenia KSeF — https://ksef.podatki.gov.pl/etapy-wdrozenia-ksef/
- Broszura FA(3) —
  https://ksef.podatki.gov.pl/media/nuclnu0w/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf
  (local conversion `packages/validator/docs/fa3-information-sheet.md` §6.2 read)
- MF, formularz ZAW-FA(3) w e-US — https://www.gov.pl/web/finanse/formularz-zaw-fa3-dostepny-w-e-us
- MF announcement 2026-09-16 —
  https://www.gov.pl/web/finanse/przedluzenie-odroczenia-kar-za-bledy-w-stosowaniu-ksef-do-konca-2027-r
- UD477 — https://legislacja.rcl.gov.pl/projekt/12414954 ; Sejm druk 3245 —
  https://api.sejm.gov.pl/sejm/term10/prints/3245/3245.pdf
- Interpelacja 17044 and MF training PDF `/media/hb0mye13/`: not in KB, no URL, not used.

## Suggested Sources Section

- Ustawa o VAT, tekst jednolity Dz.U. 2026 poz. 1263 (art. 106b, 106ga, 106gb, 106ni, 145m, 145n):
  https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf
- Rozporządzenie Dz.U. 2025 poz. 1740: https://api.sejm.gov.pl/eli/acts/DU/2025/1740/text.pdf
- Podręcznik KSeF 2.0 cz. II (06.08.2026), pkt 1.2:
  https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
- Podręcznik KSeF 2.0 cz. I (06.08.2026):
  https://ksef.podatki.gov.pl/media/dmrfdixs/podrecznik-ksef-20-cz-i-rozpoczecie-korzystania-z-ksef-06082026.pdf
- FAQ MF KSeF 2.0: https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20/
- MF, komunikat 16.09.2026 o odroczeniu kar:
  https://www.gov.pl/web/finanse/przedluzenie-odroczenia-kar-za-bledy-w-stosowaniu-ksef-do-konca-2027-r

## Warning: Common Misconceptions

- „Wspólnota nie prowadzi działalności, więc KSeF jej nie dotyczy": MF lists wspólnoty among
  podatnicy (fact 1) and the statute has no exclusion for them (fact 5); what matters is whether it
  issues an invoice to another taxpayer.
- „Zwolniona z VAT wspólnota/organizacja wchodzi do KSeF dopiero od 2027": not supported; exempt
  taxpayers are in KSeF now (FAQ Q10/Q22), with the art. 145m option until 31.12.2026 (facts 3, 9,
  11).
- „Każda opłata dla właściciela musi iść przez KSeF": invoices to private owners are outside the
  obligation (fact 6); noty księgowe never go to KSeF (fact 17).
- „Kary od 1.01.2027 są odwołane": still the law until UD477 is published (fact 19).

**Freshness:** 2026-10-30 (KB baseline 2026-10-07; UD477 status 2026-10-23). Recheck after:
publication of UD477, 1.01.2027 (expiry of art. 145m/145n), any MF FAQ entry on wspólnoty or
spółdzielnie, a KB extract of the interpelacja 17044 answer.
