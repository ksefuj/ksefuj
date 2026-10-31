# Research Brief: WDT ze stawką 0%: warunki i dowody

**Requested by:** content batch `content/six-new-posts` **Date:** 2026-10-26 **For content:** blog
post `wdt-dowody-stawka-0` (PL)

**Target query:** „wdt stawka 0 warunki dowody" / „jakie dokumenty do wdt"

**Answer in two sentences:** A Polish VAT-UE-registered seller may apply 0% to an intra-Community
supply of goods (WDT) only if the buyer gave a valid EU VAT number, the seller holds evidence that
the goods left Poland and reached the buyer in another member state before the JPK deadline, and the
supply is correctly reported in the VAT-UE summary information (art. 42 ust. 1 and 1a ustawy o VAT).
Without evidence by the deadline the supply is shown later at the domestic rate, and corrected back
to 0% in the original period once evidence arrives (art. 42 ust. 12 and 12a).

**What changes the answer:**

- Monthly vs quarterly filer: different period for the domestic-rate fallback (art. 42 ust. 12 pkt 1
  and 2).
- Who transports (carrier vs own transport of seller/buyer): different document set (art. 42 ust. 3
  pkt 1 vs ust. 4).
- New means of transport, excise goods: special rules (art. 13 ust. 2 pkt 3–4, art. 42 ust. 5–10);
  out of scope.
- Buyer without a VAT-UE number: art. 42 ust. 1 pkt 1 not met (exceptions in ust. 2 only for excise
  goods / new means of transport).

## Sources fetched live (2026-10-26)

- Ustawa o VAT, tekst jednolity **Dz.U. 2026 poz. 1263** (obwieszczenie z 1 września 2026 r.), PDF
  from `https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf` (224 pages, pdftotext). ISAP page:
  https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260001263
- Rozporządzenie wykonawcze Rady (UE) 2018/1912 z 4 grudnia 2018 r. (Dz.Urz. UE L 311 z 7.12.2018,
  s. 10), which inserted art. 45a into rozporządzenie wykonawcze 282/2011. Fetched via the
  Publications Office (`http://publications.europa.eu/resource/celex/32018R1912`, PL XHTML).
  eur-lex.europa.eu returned an empty HTTP 202 bot challenge for every URL; the consolidated
  282/2011 text was not read. Public URL for citing:
  https://eur-lex.europa.eu/legal-content/PL/TXT/?uri=CELEX:32018R1912
- VIES web app (https://ec.europa.eu/taxation_customs/vies/): only the app bundle was readable
  (SPA). See fact 15.
- Local: `packages/validator/docs/fa3-information-sheet.md` (Broszura FA(3), August 2026 text),
  `packages/validator/src/schemas/schemat.xsd`,
  `docs/knowledge-base/briefs/podrecznik-ksef-20-czesc-ii.md` (Podręcznik KSeF 2.0 cz. II,
  2026-02-01 edition).

## Key Facts (ready to use)

### Definition and conditions (Tier 1, ustawa o VAT, Dz.U. 2026 poz. 1263)

1. **Definition.** Art. 13 ust. 1: „Przez wewnątrzwspólnotową dostawę towarów (...) rozumie się
   wywóz towarów z terytorium kraju w wykonaniu czynności określonych w art. 7 na terytorium państwa
   członkowskiego inne niż terytorium kraju". Art. 13 ust. 2 pkt 1: buyer is „podatnikiem podatku od
   wartości dodanej zidentyfikowanym na potrzeby transakcji wewnątrzwspólnotowych na terytorium
   państwa członkowskiego innym niż terytorium kraju" (pkt 2: legal person non-taxpayer identified
   for intra-EU transactions). Confidence: HIGH. Ania-relevant: yes.
2. **Three conditions for 0%.** Art. 42 ust. 1: 0% „pod warunkiem że: 1) podatnik dokonał dostawy na
   rzecz nabywcy posiadającego właściwy i ważny numer identyfikacyjny dla transakcji
   wewnątrzwspólnotowych, nadany przez państwo członkowskie właściwe dla nabywcy, zawierający
   dwuliterowy kod stosowany dla podatku od wartości dodanej, który nabywca podał podatnikowi; 2)
   podatnik przed upływem terminu do złożenia deklaracji podatkowej za dany okres rozliczeniowy,
   posiada w swojej dokumentacji dowody, że towary (...) zostały wywiezione z terytorium kraju i
   dostarczone do nabywcy na terytorium państwa członkowskiego inne niż terytorium kraju; 3)
   podatnik składając deklarację podatkową, w której wykazuje tę dostawę towarów, jest
   zarejestrowany jako podatnik VAT UE." Confidence: HIGH. Ania-relevant: yes.
   - **Correction vs task brief:** the VAT-UE summary information (informacja podsumowująca)
     condition is **art. 42 ust. 1a**, not ust. 1 pkt 3. Pkt 3 is VAT-UE registration.
3. **VAT-UE information condition.** Art. 42 ust. 1a: 0% „nie ma zastosowania, jeżeli: 1) podatnik
   nie dopełnił obowiązku, o którym mowa w art. 100 ust. 1 pkt 1 lub ust. 3 pkt 1, lub 2) złożona
   informacja podsumowująca nie zawiera prawidłowych danych dotyczących wewnątrzwspólnotowych dostaw
   towarów zgodnie z wymogami, o których mowa w art. 100 ust. 8 – chyba że podatnik należycie na
   piśmie wyjaśnił uchybienie naczelnikowi urzędu skarbowego." Confidence: HIGH. Ania-relevant: yes.
4. **VAT-UE information deadline.** Art. 100 ust. 1 pkt 1 (obligation for WDT „do których ma
   zastosowanie art. 42 ust. 1"); art. 100 ust. 3: „Informacje podsumowujące składa się za okresy
   miesięczne, za pomocą środków komunikacji elektronicznej, w terminie do 25. dnia miesiąca
   następującego po miesiącu, w którym: 1) powstał obowiązek podatkowy z tytułu dokonania transakcji
   (...)". Art. 100 ust. 8 pkt 2: must contain the buyer's „właściwy i ważny numer identyfikacyjny
   dla transakcji wewnątrzwspólnotowych". Confidence: HIGH.
   - The task brief mentioned "JPK reporting" as the condition. The law ties ust. 1a to the
     informacja podsumowująca (VAT-UE), and ust. 1 pkt 2 / ust. 12 to the deadline for the
     „deklaracja podatkowa" and the „ewidencja, o której mowa w art. 109 ust. 3". That JPK_V7 is the
     form of both is general knowledge, not re-verified in this run (rozporządzenie JPK_VAT not
     fetched). Confidence: MEDIUM for "JPK_V7" naming.
5. **VAT-UE registration before the first WDT.** Art. 97 ust. 1: active VAT taxpayers „są obowiązani
   przed dniem dokonania pierwszej wewnątrzwspólnotowej dostawy (...) zawiadomić naczelnika urzędu
   skarbowego w zgłoszeniu rejestracyjnym, o którym mowa w art. 96, o zamiarze rozpoczęcia
   wykonywania tych czynności." Ust. 4: the office registers the taxpayer „jako podatnika VAT UE".
   Ust. 10 pkt 2: VAT-UE taxpayers use the number with which they are identified for tax purposes
   when making WDT. Confidence: HIGH. Ania-relevant: yes.
6. **JPK / declaration deadline.** Art. 99 ust. 1: monthly declarations „w terminie do 25. dnia
   miesiąca następującego po każdym kolejnym miesiącu"; ust. 2–3: quarterly for small taxpayers
   (25th of the month after the quarter). Confidence: HIGH.

### Evidence (art. 42 ust. 3, 4, 11)

7. **Carrier transport.** Art. 42 ust. 3: evidence are the following documents „jeżeli łącznie
   potwierdzają dostarczenie towarów (...) do nabywcy znajdującego się na terytorium państwa
   członkowskiego innym niż terytorium kraju: 1) dokumenty przewozowe otrzymane od przewoźnika
   (spedytora) odpowiedzialnego za wywóz towarów z terytorium kraju, z których jednoznacznie wynika,
   że towary zostały dostarczone do miejsca ich przeznaczenia na terytorium państwa członkowskiego
   inne niż terytorium kraju – w przypadku gdy przewóz towarów jest zlecany przewoźnikowi
   (spedytorowi), 2) (uchylony) 3) specyfikacja poszczególnych sztuk ładunku 4) (uchylony)".
   Confidence: HIGH. Ania-relevant: yes.
8. **Own transport (seller or buyer).** Art. 42 ust. 4: besides the specification (ust. 3 pkt 3), a
   document with at least: 1) names and addresses of seller and buyer; 2) delivery address if
   different from buyer's seat/residence; 3) „określenie towarów i ich ilości"; 4) „potwierdzenie
   przyjęcia towarów przez nabywcę" at that address in another member state; 5) „rodzaj oraz numer
   rejestracyjny środka transportu, którym są wywożone towary, lub numer lotu". Confidence: HIGH.
9. **Supplementary evidence.** Art. 42 ust. 11: when the ust. 3–5 documents „nie potwierdzają
   jednoznacznie dostarczenia", evidence „mogą być również inne dokumenty wskazujące, że nastąpiła
   dostawa wewnątrzwspólnotowa, w szczególności: 1) korespondencja handlowa z nabywcą, w tym jego
   zamówienie; 2) dokumenty dotyczące ubezpieczenia lub kosztów frachtu; 3) dokument potwierdzający
   zapłatę za towar (...); 4) dowód potwierdzający przyjęcie przez nabywcę towaru na terytorium
   państwa członkowskiego innym niż terytorium kraju." Confidence: HIGH. Ania-relevant: yes.

### Missing evidence: timing (art. 42 ust. 12, 12a)

10. **Monthly filer.** Art. 42 ust. 12 pkt 2: if no evidence before the deadline for the period's
    declaration, the taxpayer „nie wykazuje tej dostawy w ewidencji (...) za ten okres; podatnik
    wykazuje tę dostawę w ewidencji (...) za kolejny po następnym okresie rozliczeniowym okres
    rozliczeniowy ze stawką właściwą dla dostawy danego towaru na terytorium kraju, jeżeli przed
    upływem terminu do złożenia deklaracji podatnik za ten kolejny po następnym okresie
    rozliczeniowym okres rozliczeniowy nie posiada dowodów". Confidence: HIGH.
    - Worked example (derived, arithmetic only): tax point March → March JPK due 25 April; if no
      evidence by then, March skips it; if still none by 25 June (deadline for May, the period after
      April), it goes into May at the domestic rate.
11. **Quarterly filer.** Art. 42 ust. 12 pkt 1: not in that quarter; shown „za następny okres
    rozliczeniowy" at the domestic rate if no evidence by that next period's deadline. Confidence:
    HIGH.
12. **Evidence arrives later.** Art. 42 ust. 12a: receiving evidence „upoważnia podatnika do
    wykazania wewnątrzwspólnotowej dostawy towarów ze stawką 0 % w ewidencji (...) za okres
    rozliczeniowy, w którym powstał obowiązek podatkowy (...) i dokonania korekty deklaracji
    podatkowej oraz odpowiednio informacji podsumowującej". Confidence: HIGH.
13. **Domestic rate.** „Stawka właściwa dla dostawy danego towaru na terytorium kraju", e.g. 23%
    (art. 146ef ust. 1 pkt 1: „stawka podatku, o której mowa w art. 41 ust. 1 i 13 (...) wynosi 23
    %"). Whether tax is then computed from the agreed price as net or gross: **not addressed in the
    text read**. Do not state.

### Tax point and invoice deadline

14. **Tax point.** Art. 20 ust. 1: „W wewnątrzwspólnotowej dostawie towarów obowiązek podatkowy
    powstaje z chwilą wystawienia faktury przez podatnika, niepóźniej jednak niż 15. dnia miesiąca
    następującego po miesiącu, w którym dokonano tej dostawy". Ust. 1a: continuous supplies longer
    than a month are deemed made at the end of each month. Confidence: HIGH.
    - Art. 106i ust. 1: invoice „niepóźniej niż 15. dnia miesiąca następującego po miesiącu, w
      którym dokonano dostawy towaru". Confidence: HIGH.
    - Advances: Podręcznik KSeF 2.0 cz. II §1.3 (brief): obligation to invoice on request excludes
      „zaliczki na WDT"; Broszura FA(3) note on P_12Z: „0 WDT" not used on advance invoices because
      WDT advances „are not documented by invoice and do not give rise to tax liability". Statute
      (verified 2026-10-26): art. 106b ust. 1 pkt 4 lit. a excludes WDT advances from the invoicing
      obligation ("nie musisz", not a ban). HIGH for the invoice point.

### EU presumption (rozporządzenie wykonawcze 282/2011, art. 45a)

15. **Presumption, carrier arranged by seller.** Art. 45a ust. 1 lit. a (as inserted by 2018/1912):
    goods are presumed dispatched to another member state when the seller indicates it (or a third
    party on its behalf) transported them and holds „co najmniej dwóch niebędących ze sobą w
    sprzeczności dowodów, o których mowa w ust. 3 lit. a), które zostały wydane przez dwie różne
    strony, które są niezależne od siebie nawzajem, od sprzedawcy i od nabywcy", or one item from
    lit. a plus one non-contradictory item from lit. b, likewise from two independent parties.
    Confidence: HIGH.
16. **Presumption, buyer transports.** Art. 45a ust. 1 lit. b: seller holds (i) a written statement
    of the buyer that the buyer (or a third party on its behalf) transported the goods, naming the
    destination member state, with: date of issue; buyer's name and address; quantity and type of
    goods; date and place of arrival; for means of transport, its identification number; identity of
    the person accepting the goods for the buyer; and (ii) the same two non-contradictory items as
    in lit. a. „Nabywca dostarcza sprzedawcy pisemne oświadczenie (...) do dziesiątego dnia miesiąca
    następującego po miesiącu, w którym nastąpiła dostawa." Confidence: HIGH.
17. **Rebuttable.** Art. 45a ust. 2: „Organ podatkowy może obalić domniemanie przyjęte na podstawie
    ust. 1." Confidence: HIGH.
18. **Groups.** Art. 45a ust. 3 lit. a (transport documents): „podpisany list przewozowy CMR,
    konosament, faktura za towarowy przewóz lotniczy lub faktura od przewoźnika towarów". Lit. b:
    (i) „polisa ubezpieczeniowa w odniesieniu do wysyłki lub transportu towarów lub dokumenty
    bankowe potwierdzające zapłatę za wysyłkę lub transport towarów"; (ii) „dokumenty urzędowe
    wydane przez organ władzy publicznej, na przykład notariusza, potwierdzające przybycie towarów
    do państwa członkowskiego przeznaczenia"; (iii) „poświadczenie odbioru wystawione przez
    prowadzącego magazyn w państwie członkowskim przeznaczenia". Confidence: HIGH.
19. **Application date and effect.** 2018/1912 art. 2: „stosuje się od dnia 1 stycznia 2020 r. (...)
    wiąże w całości i jest bezpośrednio stosowane we wszystkich państwach członkowskich."
    Confidence: HIGH.
    - Not established from sources read: how MF relates art. 45a to art. 42 ust. 3–11 (MF
      objaśnienia „quick fixes" of 23.12.2019 could not be located on podatki.gov.pl: candidate URL
      404, listing page had no link). Safe phrasing: both apply; art. 45a gives a presumption the
      tax office can rebut; Polish law lists accepted documents. Do not claim one replaces the
      other.

### VIES

20. **VIES check.** The VIES web app (ec.europa.eu/taxation_customs/vies/) checks a VAT number by
    member state code + number; the request accepts optional „requesterMemberStateCode" and
    „requesterNumber" and the result view has a „requestIdentifier" cell (confirmed 2026-10-26 via
    the official REST endpoint `vies/rest-api/check-vat-number`: with requester data the response
    carries `requestIdentifier`). Confidence: HIGH. The law requires a „właściwy i ważny" number
    (fact 2); it does not name VIES or prescribe keeping a VIES printout. Keeping proof is a
    practical recommendation, not a statutory obligation.

### KSeF / FA(3)

21. **WDT invoice in KSeF.** Podręcznik KSeF 2.0 cz. II §2.11 (brief): „Podmiot1 → NIP +
    PrefiksPodatnika = „PL"; Podmiot2 → KodUE + NrVatUE; `P_13_6_2` — suma wartości sprzedaży
    objętej stawką 0% (WDT); `P_12 = „0 WDT"` (na poziomie wiersza)". Examples 22, 23. Confidence:
    HIGH.
22. **Statutory basis for the prefix.** Art. 106e ust. 1 pkt 24 (cases of art. 97 ust. 10 pkt 2,
    i.e. WDT): invoice contains the seller's number „poprzedzony kodem PL" and the buyer's VAT
    number „zawierający dwuliterowy kod". Broszura FA(3) (fa3-information-sheet.md, Podmiot1 table):
    `PrefiksPodatnika` "PL" must be provided for invoices documenting intra-Community supply of
    goods. Confidence: HIGH.
23. **Enumeration.** schemat.xsd line ~1881: `<xsd:enumeration value="0 WDT">` in the P_12 rate
    type; Broszura FA(3) §9.4: `P_13_6_2` „0% rate — intra-Community supply of goods". Confidence:
    HIGH.
24. **Buyer without Polish NIP gets the invoice outside KSeF.** Podręcznik cz. II §5.3.1 (brief):
    art. 106gb ust. 4 pkt 2 requires delivery „w sposób uzgodniony" when the buyer has no seat or
    fixed establishment in Poland (the trigger is the seat, not the lack of NIP); „Faktura poza KSeF
    → obowiązkowy kod/kody QR". §5.2: buyer receives in KSeF only if NIP is in the NIP field.
    Confidence: HIGH (via existing brief).
25. **KSeF obligation and 10 000 zł carve-out.** See `briefs/faktura-zagraniczna-ksef.md` facts 1–3
    (art. 106ga ust. 1; art. 145m until 31.12.2026). Confidence: HIGH.

## Unsettled Questions

- MF's position on art. 45a vs art. 42 ust. 3 (objaśnienia 2019 not fetched).
- Whether domestic-rate tax under art. 42 ust. 12 is computed „od stu" or „w stu".
- What a JDG on VAT exemption (art. 113) must do for WDT: out of scope; art. 42 ust. 1 pkt 3
  requires VAT-UE registration, and art. 97 ust. 1 refers to „podatnicy VAT czynni".
- No MF source read on how long to keep the VIES result.

## Suggested Sources Section

- Ustawa o VAT, Dz.U. 2026 poz. 1263, art. 13, 20, 42, 97, 100, 106e:
  https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260001263
- Rozporządzenie wykonawcze Rady (UE) 2018/1912 (art. 45a rozp. 282/2011):
  https://eur-lex.europa.eu/legal-content/PL/TXT/?uri=CELEX:32018R1912
- VIES: https://ec.europa.eu/taxation_customs/vies/
- Broszura informacyjna FA(3):
  https://ksef.podatki.gov.pl/media/nuclnu0w/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf
- Podręcznik KSeF 2.0 cz. II (06.08.2026):
  https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf

## Warning: Common Misconceptions

- „Wystarczy numer VAT-UE nabywcy": no, evidence of transport and VAT-UE registration are separate
  conditions; missing VAT-UE summary information also removes 0% (ust. 1a).
- „Brak CMR = 23% na zawsze": no, ust. 12a lets you return to 0% in the original period.
- „Kurier list przewozowy wystarczy sam": art. 45a needs two non-contradictory items from two
  independent parties; art. 42 ust. 3 requires documents that „łącznie" confirm delivery (transport
  document plus specification).
