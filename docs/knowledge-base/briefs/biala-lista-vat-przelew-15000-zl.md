# Research Brief: Przelew ponad 15 000 zł na rachunek spoza białej listy

**Requested by:** coordinator (batch `content/six-new-posts`) **Date:** 2026-10-26 **For content:**
`pl/blog/biala-lista-vat-przelew-15000-zl`, persona A (JDG)

**Target query:** „biała lista 15000 zł” / „przelew na konto spoza białej listy” / „ZAW-NR termin”

**Answer in two sentences:** Gdy płacisz przelewem za fakturę od czynnego podatnika VAT w
transakcji, która musi przejść przez rachunek (art. 19 Prawa przedsiębiorców: druga strona jest
przedsiębiorcą i jednorazowa wartość transakcji przekracza 15 000 zł), a rachunku odbiorcy nie ma w
wykazie podatników VAT na dzień zlecenia przelewu, odpowiadasz solidarnie za zaległości VAT
sprzedawcy w części przypadającej na tę transakcję (art. 117ba Ordynacji podatkowej) i nie możesz
zaliczyć tej płatności do kosztów (art. 22p ust. 1 pkt 2 PIT / art. 15d ust. 1 pkt 2 CIT). Obu
skutków unikniesz, płacąc w MPP albo składając ZAW-NR do swojego naczelnika urzędu skarbowego w
ciągu 7 dni od zlecenia przelewu; od faktur wystawionych od 1 stycznia 2027 r. sankcja kosztowa
znika (Dz.U. 2026 poz. 1371), a odpowiedzialność solidarna zostaje.

**Provenance:** all acts fetched live 2026-10-26 from api.sejm.gov.pl (ELI PDFs, converted with
pdftotext). podatki.gov.pl ZAW-NR page and wl-api.mf.gov.pl API docs fetched live the same day.
FA(3) facts from the bundled official XSD (`packages/validator/src/schemas/schemat.xsd`, namespace
`http://crd.gov.pl/wzor/2025/06/25/13775/`). No commercial or news sources used.

## Sources

| #   | Source                                                                                               | URL                                                                                                                                    |
| --- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| S1  | Ordynacja podatkowa, t.j. Dz.U. 2026 poz. 622 (art. 117ba, s. 92–93)                                 | https://api.sejm.gov.pl/eli/acts/DU/2026/622/text.pdf                                                                                  |
| S2  | Ustawa z 29.05.2026 o zmianie OP, Dz.U. 2026 poz. 846 (art. 1 pkt 40, art. 35; w życie 1.10.2026)    | https://api.sejm.gov.pl/eli/acts/DU/2026/846/text.pdf                                                                                  |
| S3  | Ustawa o PIT, t.j. Dz.U. 2026 poz. 592 (art. 22p, s. 82–83)                                          | https://api.sejm.gov.pl/eli/acts/DU/2026/592/text.pdf                                                                                  |
| S4  | Ustawa o CIT, t.j. Dz.U. 2026 poz. 554 (art. 15d, s. 60)                                             | https://api.sejm.gov.pl/eli/acts/DU/2026/554/text.pdf                                                                                  |
| S5  | Ustawa z 18.09.2026 o zmianie ustawy o PIT oraz ustawy o CIT, Dz.U. 2026 poz. 1371 (ogł. 21.10.2026) | https://api.sejm.gov.pl/eli/acts/DU/2026/1371/text.pdf                                                                                 |
| S6  | Prawo przedsiębiorców, t.j. Dz.U. 2025 poz. 1480 (art. 19, s. 7)                                     | https://api.sejm.gov.pl/eli/acts/DU/2025/1480/text.pdf                                                                                 |
| S7  | Ustawa o VAT, t.j. Dz.U. 2026 poz. 1263 (art. 96b, s. 110–112)                                       | https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf                                                                                 |
| S8  | podatki.gov.pl, „Zawiadomienie ZAW-NR” (publ. 15.12.2025, aktualizacja 30.09.2026)                   | https://www.podatki.gov.pl/eurzad-skarbowy-zalatw-sprawy-podatkowe-online/konto-organizacji-w-eurzedzie-skarbowym/zawiadomienie-zaw-nr |
| S9  | Wyszukiwarka wykazu (podatki.gov.pl przekierowuje na wykazpodatnikowvat.mf.gov.pl)                   | https://www.podatki.gov.pl/wykaz-podatnikow-vat-wyszukiwarka                                                                           |
| S10 | API Rejestr WL (wl-api.mf.gov.pl), dokumentacja v1.6.1                                               | https://wl-api.mf.gov.pl/                                                                                                              |
| S11 | Schemat FA(3) (bundled), `Fa/Platnosc/RachunekBankowy`, `TRachunekBankowy`, `TRachunekWlasnyBanku`   | https://crd.gov.pl/wzor/2025/06/25/13775/schemat.xsd                                                                                   |

Amendment check (2026-10-26, ELI `references` → „Akty zmieniające”): OP amendments promulgated after
t.j. 622 (poz. 825, 846, 875, 1098, 1154, 1206) grepped for `117ba`/`117bb`: only poz. 846 touches
117ba (adds § 3a). PIT amendments after t.j. 592 (poz. 779, 846, 1079, 1098, 1123, 1287, 1347,
1354, 1371) and CIT amendments after t.j. 554 (poz. 779, 846, 912, 1123, 1287, 1371): only poz. 1371
touches art. 22p / 15d. Prawo przedsiębiorców after t.j. 1480 (2025 poz. 1795, 1826; 2026 poz. 507):
none touches art. 19. VAT after t.j. 1263: poz. 1270 (from 1.01.2027) only renumbers a reference in
art. 96b ust. 2 („ust. 3 pkt 1–3” → „ust. 3 pkt 1, 2 i 3”).

## Key Facts

### A. Próg 15 000 zł (S6)

1. **Art. 19 Prawa przedsiębiorców** (verbatim): „Dokonywanie lub przyjmowanie płatności związanych
   z wykonywaną działalnością gospodarczą następuje za pośrednictwem rachunku płatniczego
   przedsiębiorcy, w każdym przypadku gdy: 1) stroną transakcji, z której wynika płatność, jest inny
   przedsiębiorca oraz 2) jednorazowa wartość transakcji, bez względu na liczbę wynikających z niej
   płatności, przekracza 15 000 zł lub równowartość tej kwoty, przy czym transakcje w walutach
   obcych przelicza się na złote według średniego kursu walut obcych ogłaszanego przez Narodowy Bank
   Polski z ostatniego dnia roboczego poprzedzającego dzień dokonania transakcji.” Confidence: HIGH.
   - Both conditions jointly; „przekracza” → exactly 15 000,00 zł is not over.
   - Value of the transaction, not of a single payment: 3 raty po 6 000 zł z jednej transakcji na 18
     000 zł podlegają przepisowi.
   - Gross vs net: the act says „wartość transakcji”, it does not say brutto/netto. **Not resolved
     in fetched sources** (MF objaśnienia on this were not fetched). Do not state brutto/netto as
     law.

### B. Odpowiedzialność solidarna (S1, S2)

2. **Art. 117ba § 1 OP:** podatnik z art. 15 ustawy o VAT, na rzecz którego dokonano dostawy/usługi,
   „odpowiada solidarnie całym swoim majątkiem wraz z dostawcą towarów lub usługodawcą
   zarejestrowanym na potrzeby podatku od towarów i usług jako podatnik VAT czynny za jego
   zaległości podatkowe w części podatku od towarów i usług proporcjonalnie przypadającej na tę
   dostawę towarów lub to świadczenie usług, jeżeli zapłata należności za dostawę towarów lub
   świadczenie usług, potwierdzone fakturą, została dokonana przelewem na rachunek inny niż zawarty
   na dzień zlecenia przelewu w wykazie podmiotów, o którym mowa w art. 96b ust. 1 ustawy [o VAT]”.
   Confidence: HIGH.
   - Payer = „podatnik, o którym mowa w art. 15” ustawy o VAT (not limited by the text to VAT
     czynny).
   - Seller must be VAT czynny. Moment of check = **dzień zlecenia przelewu**.
3. **Art. 117ba § 3 OP — wyłączenia:** § 1 i 2 nie stosuje się, jeżeli zapłata: (1) wynika z
   transakcji innej niż określona w art. 19 Prawa przedsiębiorców; (2) poszła na rachunek spoza
   wykazu, a podatnik „złożył przy pierwszej zapłacie należności przelewem na ten rachunek
   zawiadomienie o zapłacie należności na ten rachunek do naczelnika urzędu skarbowego właściwego
   dla podatnika, który dokonał zapłaty należności, w terminie 7 dni od dnia zlecenia przelewu”; (3)
   poszła na rachunek banku/SKOK (lit. a: do rozliczeń wierzytelności nabytych przez bank —
   faktoring; lit. b: do pobierania należności i przekazania dostawcy; lit. c: gospodarka własna,
   niebędący rachunkiem rozliczeniowym), jeżeli bank/SKOK/wystawca faktury przekazali informację, że
   to taki rachunek; (4) „została dokonana z zastosowaniem mechanizmu podzielonej płatności”; (5)
   wynika z faktury dokumentującej WNT, import towarów, import usług lub dostawę rozliczaną przez
   nabywcę. Confidence: HIGH.
4. **Termin ZAW-NR = 7 dni od dnia zlecenia przelewu** (not 3). **Urząd = właściwy dla płacącego**
   (nie dla wystawcy). „Przy pierwszej zapłacie” na dany rachunek. Confidence: HIGH (S1, S3, S4,
   S8).
5. **Art. 117ba § 4 OP — treść zawiadomienia:** (1) NIP, nazwa i adres płacącego (osoba fizyczna:
   imię, nazwisko, adres stałego miejsca prowadzenia działalności, a gdy go nie ma — zamieszkania);
   (2) dane wystawcy faktury wskazane na fakturze (NIP, nazwa/imię i nazwisko, adres); (3) numer
   rachunku, na który zapłacono; (4) wysokość należności zapłaconej przelewem na ten rachunek i
   dzień zlecenia przelewu. § 5: MF „może określić” wzór w rozporządzeniu. Confidence: HIGH.
6. **Art. 117bb OP: „(uchylony)”** in t.j. 2026 poz. 622. Do not cite 117bb. Confidence: HIGH.
7. **Art. 117ba § 3a OP (nowy, od 1.10.2026):** „Pełnomocnictwo do podpisywania deklaracji udzielone
   na podstawie art. 80a § 1 obejmuje również upoważnienie do podpisywania zawiadomienia, o którym
   mowa w § 3 pkt 2.” — Dz.U. 2026 poz. 846, art. 1 pkt 40; art. 35 (w życie 1.10.2026, pkt 40 nie
   jest wśród wyjątków). Confidence: HIGH.

### C. Koszty uzyskania przychodów (S3, S4, S5)

8. **Art. 22p ust. 1 PIT (stan do 31.12.2026):** podatnicy prowadzący pozarolniczą działalność
   gospodarczą nie zaliczają do kosztów kosztu w tej części, w jakiej płatność dotycząca transakcji
   z art. 19 Prawa przedsiębiorców: 1) bez pośrednictwa rachunku płatniczego, 2) „przelewem na
   rachunek inny niż zawarty na dzień zlecenia przelewu w wykazie podmiotów, o którym mowa w art.
   96b ust. 1 ustawy o podatku od towarów i usług – w przypadku dostawy towarów lub świadczenia
   usług, potwierdzonych fakturą, dokonanych przez dostawcę towarów lub usługodawcę zarejestrowanego
   na potrzeby podatku od towarów i usług jako podatnik VAT czynny”, 3) z pominięciem obowiązkowego
   MPP mimo wyrazów „mechanizm podzielonej płatności” na fakturze. Art. 15d ust. 1 CIT — identyczne
   brzmienie. Confidence: HIGH.
9. **Art. 22p ust. 2 PIT / 15d ust. 2 CIT:** jeśli koszt już ujęto, podatnik zmniejsza koszty albo
   (gdy nie może) zwiększa przychody „w miesiącu, w którym … został zlecony przelew”. Ust. 3:
   odpowiednio dla środków trwałych/WNiP, po likwidacji działalności i po przejściu na ryczałt.
   Confidence: HIGH.
10. **Art. 22p ust. 4 PIT / 15d ust. 4 CIT:** ust. 1 pkt 2 nie stosuje się przy ZAW-NR (art. 117ba §
    3 pkt 2 OP, 7 dni, US płacącego), rachunkach własnych banku/SKOK (lit. a–c), MPP, WNT/imporcie
    towarów/imporcie usług/dostawie rozliczanej przez nabywcę — the same list as 117ba § 3. Note:
    there is no „transakcja inna niż art. 19” exception here because ust. 1 is already limited to
    art. 19 transactions. Confidence: HIGH.
11. Art. 22p concerns koszty uzyskania przychodów; a taxpayer on ryczałt ewidencjonowany does not
    deduct costs, so ust. 1 pkt 2 usually has no practical effect for them (logical inference; the
    ryczałt act was not checked for an equivalent). Exception: ust. 3 pkt 2 lit. b — payment made
    after switching to ryczałt for a cost recognised earlier → correction for the tax year preceding
    the switch. 117ba still applies. Confidence: MEDIUM (inference).
12. **Zmiana od 2027 r. — Dz.U. 2026 poz. 1371** (ustawa z 18.09.2026, ogłoszona 21.10.2026): art. 1
    pkt 2 nadaje art. 22p ust. 1 PIT brzmienie obejmujące tylko płatność „bez pośrednictwa rachunku
    płatniczego”, zmienia część wspólną ust. 2 („– w miesiącu, w którym została dokonana płatność
    bez pośrednictwa rachunku płatniczego.”) i uchyla ust. 4; art. 2 pkt 4 — to samo w art. 15d CIT.
    Art. 1 pkt 1 / art. 2 pkt 3 uchylają art. 14 ust. 2h–2i PIT i art. 12 ust. 4i–4j CIT (przychód
    pośrednika pobierającego należności — not relevant to the persona). **Art. 3 ust. 2:** „Do
    płatności wynikającej z faktury wystawionej przed dniem 1 stycznia 2027 r. mają zastosowanie
    przepisy art. 22p … oraz art. 15d … w brzmieniu dotychczasowym.” **Art. 6:** these points and
    art. 3 wchodzą w życie 1 stycznia 2027 r. (reszta ustawy po 14 dniach od ogłoszenia; ELI
    entryIntoForce 2026-11-05). Effect: for invoices issued from 1.01.2027 there is no cost
    exclusion for white-list or MPP failures; for invoices issued up to 31.12.2026 the old rule
    applies even if paid in 2027. The act does **not** amend art. 117ba OP. Confidence: HIGH.
    - Not found: MF communication explaining the change; Sejm print number (ELI `prints` empty).
13. **S8 page still says** (updated 30.09.2026) that ZAW-NR serves to keep the payment in PIT/CIT
    costs and to avoid joint liability; predates poz. 1371. Confidence: HIGH (as a quote of the
    page).

### D. ZAW-NR w praktyce (S8)

14. podatki.gov.pl: „w ciągu 7 dni powiadom urząd skarbowy na formularzu ZAW-NR o numerze rachunku
    spoza wykazu, na który zleciłeś przelew”; „Gdzie złożyć zawiadomienie: Do urzędu skarbowego
    właściwego dla podatnika, który dokonał zapłaty należności”; „Jak złożyć zawiadomienie: Zaloguj
    się do eUS przez login.gov.pl, wypełnij potrzebne dane i złóż ZAW-NR online.” Można złożyć za
    siebie lub za inny podmiot; za innych potrzebne PPO-1 lub PPS-1 (przez eUS: PPO-1). The page
    also mentions a historical 14-day term during COVID epidemic state (irrelevant now). Confidence:
    HIGH.
15. **Mode:** the page describes only online filing in e-Urząd Skarbowy. Whether paper filing is
    admissible was **not verified** (no current rozporządzenie on the ZAW-NR wzór fetched). Write
    „składasz online w e-Urzędzie Skarbowym”, without claiming it is the only way.

### E. Wykaz (biała lista) i sprawdzenie (S7, S9, S10)

16. **Art. 96b ust. 1, 2, 3 pkt 13, ust. 8 ustawy o VAT:** Szef KAS prowadzi wykaz elektronicznie;
    udostępniany w BIP MF tak, by można było sprawdzić, „w tym automatycznie”, czy podmiot jest w
    wykazie „na wybrany dzień, przypadający nie wcześniej niż w okresie 5 lat poprzedzających rok, w
    którym podmiot jest sprawdzany” (i.e. current year + 5 previous years); zawiera m.in. status
    („podatnik VAT czynny” / „zwolniony”) i numery rachunków rozliczeniowych (lub imiennych SKOK)
    zgłoszonych i potwierdzonych przez STIR; aktualizowany „w dni robocze, raz na dobę”. Ust. 4 pkt
    1: dla niezarejestrowanych i wykreślonych wykaz nie zawiera rachunków. Ust. 9: dostęp także
    przez CEIDG i PIP. Confidence: HIGH.
17. **Wyszukiwarka:** https://www.podatki.gov.pl/wykaz-podatnikow-vat-wyszukiwarka → redirect to
    https://wykazpodatnikowvat.mf.gov.pl/ (Angular SPA, UI not rendered; button labels not
    verified). Also „plik płaski” at wykazpodatnikowvat.mf.gov.pl/plik-plaski (linked from
    podatki.gov.pl).
18. **API (S10):** `GET /api/check/nip/{nip}/bank-account/{bank-account}?date=` returns
    `accountAssigned` „TAK”/„NIE”, `requestDateTime` and `requestId`; search endpoints by NIP,
    REGON, bank account; `date` parameter required. Confidence: HIGH (from docs). That `requestId`
    serves as proof of the check is a **practical inference**, not stated in any fetched source.
19. **Saving proof:** no fetched source requires or describes keeping proof of the search. Practical
    advice only (save a screenshot/printout with date, or the API `requestId`). Do not present as a
    legal requirement.

### F. KSeF / FA(3) angle (S11)

20. Sprzedawca podaje rachunek w `Fa/Platnosc/RachunekBankowy` (opcjonalny, do 100 wystąpień, typ
    `TRachunekBankowy`: `NrRB` „Pełny numer rachunku”, opcjonalnie `SWIFT`, `RachunekWlasnyBanku`,
    `NazwaBanku`, `OpisRachunku`); osobno `RachunekBankowyFaktora` (do 20). `RachunekWlasnyBanku`
    przyjmuje wartości 1–3, których opisy w schemacie odpowiadają dokładnie art. 117ba § 3 pkt 3
    lit. a–c OP (rachunek banku/SKOK do wierzytelności nabytych, do pobierania należności i
    przekazania dostawcy, gospodarka własna). Confidence: HIGH (schema). Whether this marker counts
    as the „informacja” required by § 3 pkt 3 is **not stated** by MF in fetched sources.
21. KSeF does not check the account against the wykaz (no such rule in the XSD; the account is
    optional). A number on a KSeF invoice is what the issuer typed; a fraudulent invoice can also
    reach KSeF (see `falszywe-faktury-ksef` brief). Check must be on the day of the transfer order,
    because the wykaz changes daily. Confidence: HIGH for XSD; MEDIUM for „no KSeF-side check”
    (based on absence in schema/docs).

## Not verified / open

- Brutto vs netto for the 15 000 zł threshold (MF objaśnienia not fetched).
- Whether ZAW-NR may still be filed on paper.
- Any MF communication about Dz.U. 2026 poz. 1371.
- Whether `RachunekWlasnyBanku` on FA(3) satisfies the „informacja” condition of 117ba § 3 pkt 3.
- Wyszukiwarka UI wording (SPA not rendered).
