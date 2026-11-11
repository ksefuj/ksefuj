# Research Brief: Faktura zaliczkowa w KSeF

**Requested by:** human (backlog item `faktura-zaliczkowa-ksef`, source P2) **Date:** 2026-11-11
**For content:** „Faktura zaliczkowa w KSeF" (`pl/blog/faktura-zaliczkowa-ksef`, topic `invoicing`),
personas K (księgowa, Pani Krystyna), M (developer, Marek), A (JDG)

**Target query:** „faktura zaliczkowa KSeF"

**Answer in two sentences:** Zaliczkę otrzymaną przed dostawą lub usługą dokumentuje się w KSeF
fakturą FA(3) z `RodzajFaktury` = `ZAL`, bez wierszy `FaWiersz`, z danymi zamówienia w `Zamowienie`
i kwotą otrzymanej zapłaty w `P_15` (Podręcznik KSeF 2.0 cz. II, pkt 2.6 i 2.14; adnotacja XSD
`ZAL`). Po wykonaniu czynności wystawia się fakturę rozliczającą `ROZ` z pełnymi wierszami, kwotą
pozostałą do zapłaty w `P_15` i numerami KSeF faktur zaliczkowych w `FakturaZaliczkowa` (art. 106f
ust. 3 ustawy o VAT wg Podręcznika cz. II, pkt 2.7 i 4.1.1).

**What changes the answer:**

- **Zaliczka i dostawa w tym samym miesiącu:** zamiast osobnej `ZAL` jedna faktura po wykonaniu
  czynności, oznaczona `ROZ`, z zaliczką w `ZaliczkaCzesciowa` (art. 106b ust. 1a / art. 106e ust.
  1a; broszura §9.5 i §9.8; Podręcznik cz. II pkt 2.7). Fakty 6-7.
- **Zapłacono 100% z góry:** brak obowiązku `ROZ` (Podręcznik cz. II pkt 2.8); ostatnia `ZAL`
  wskazuje numery KSeF poprzednich zaliczkowych (art. 106f ust. 4 wg pkt 4.1.2). Fakty 11-12.
- **Faktura zaliczkowa wystawiona poza KSeF** (limit 10 000 zł z art. 145m do 31.12.2026, faktura
  sprzed obowiązku): `ROZ` wskazuje jej numer z `NrKSeFZN` = `1` + `NrFaZaliczkowej`. Fakt 10.
- **Zaliczka na WDT:** faktury nie trzeba wystawiać (art. 106b ust. 1 pkt 4 lit. a wg
  `wdt-dowody-stawka-0.md` fakt 14). Fakt 3.
- **Waluta obca:** kurs w `KursWalutyZ` (cała faktura) lub `KursWalutyZW` (każda zaliczka); dniem
  obowiązku podatkowego jest dzień otrzymania zaliczki (art. 19a ust. 8). Fakty 17-18.
- **Sprzedawca zwolniony z VAT (art. 113):** KB nie zawiera reguły dla zaliczek u zwolnionego (patrz
  Unsettled 5).

**Provenance of this run:** official hosts (ksef.podatki.gov.pl, api.sejm.gov.pl, isap.sejm.gov.pl,
crd.gov.pl) are unreachable from this environment; **nothing below was fetched live on 2026-11-11.**
Every fact comes from the repo, which `WATCHLIST.md` treats as the verified baseline (VAT Act
consolidated text Dz.U. 2026 poz. 1263; Podręcznik cz. I-IV editions of 2026-08-06):

| Label | Source                                                                | Tier | Repo file / notes                                                                                                                                                                                                                                |
| ----- | --------------------------------------------------------------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [CZ2] | Podręcznik KSeF 2.0 cz. II „Wystawianie i otrzymywanie faktur w KSeF" | 2    | `docs/knowledge-base/briefs/podrecznik-ksef-20-czesc-ii.md`: structured extract of the **2026-02-01** edition (point numbers are the manual's; no page numbers). Newer edition 2026-08-06 exists, changes judged minor (see the brief's header). |
| [BRO] | Broszura informacyjna dotycząca struktury logicznej FA(3)             | 2    | `packages/validator/docs/fa3-information-sheet.md`: **English** conversion of the March 2026 edition, no page numbers; quotes from it are English, not Polish verbatim.                                                                          |
| [XSD] | Schemat FA(3), ns `http://crd.gov.pl/wzor/2025/06/25/13775/`          | 2    | `packages/validator/src/schemas/schemat.xsd` (line numbers below); Polish `xsd:documentation` quoted verbatim.                                                                                                                                   |
| [PRZ] | Przykładowe pliki FA(3) (MF)                                          | 2    | `test-fixtures/official-examples/` (examples 10-14, 17, 18). URL of the package: not in KB. Warning: the folder's `README.md` describes the examples wrongly (e.g. no. 10 as "transport details"); use the XML, not the README.                  |
| [VAT] | Ustawa o VAT                                                          | 1    | Only via other briefs, each giving its own fetch date: `kurs-waluty-art-31a.md` (Dz.U. 2025 poz. 775, read 2026-08-12), `wdt-dowody-stawka-0.md`, `mpp-split-payment-ksef.md`, `koniec-limitu-10000-zl.md` (Dz.U. 2026 poz. 1263).               |
| [FAQ] | MF „Pytania i odpowiedzi KSeF 2.0"                                    | 3    | Via `kurs-waluty-art-31a.md` (retrieved 2026-08-12), q. 19.                                                                                                                                                                                      |

Tags per fact: **Conf.** HIGH/MEDIUM/LOW · **Live: no** (all) · personas **K / M / A**.

## Key Facts (ready to use)

### A. Kiedy faktura zaliczkowa i w jakim terminie

1. **Podstawa: art. 106b ust. 1 pkt 4 ustawy o VAT — faktura dokumentująca otrzymanie całości lub
   części zapłaty przed dokonaniem czynności.** [CZ2] pkt 2.6: „Art. 106b ust. 1 pkt 4 ustawy."
   [XSD] l. 1817, enumeracja `ZAL`: „Faktura dokumentująca otrzymanie zapłaty lub jej części przed
   dokonaniem czynności oraz faktura wystawiona w związku z art. 106f ust. 4 ustawy (faktura
   zaliczkowa)". Verbatim of art. 106b ust. 1 pkt 4 itself: NOT IN KB. Conf. HIGH. K, M, A
2. **Obowiązek podatkowy od zaliczki powstaje z chwilą jej otrzymania (art. 19a ust. 8).** [VAT] via
   `kurs-waluty-art-31a.md` („ust. 8 — advances", Dz.U. 2025 poz. 775 s. 30): „Jeżeli przed
   dokonaniem dostawy towaru lub wykonaniem usługi otrzymano całość lub część zapłaty, w
   szczególności przedpłatę, zaliczkę, zadatek, ratę […], obowiązek podatkowy powstaje z chwilą jej
   otrzymania w odniesieniu do otrzymanej kwoty", z wyjątkami z ust. 1b i ust. 5 pkt 4. Conf. HIGH.
   K, A (A: only if VAT-czynna)
3. **Zaliczka na WDT: faktury nie trzeba wystawiać.** `wdt-dowody-stawka-0.md` fakt 14 (statute
   verified 2026-10-26): art. 106b ust. 1 pkt 4 lit. a wyłącza zaliczki na WDT z obowiązku („nie
   musisz", nie zakaz). [CZ2] pkt 1.3: z obowiązku wystawienia faktury na żądanie wyłączone są m.in.
   „zaliczki na WDT". [BRO] §14.2 note on `P_12Z`: "0 WDT" rate will not be used for advance
   invoices in practice, because ICS advance payments are not documented by invoice and do not give
   rise to tax liability. Conf. HIGH. K
4. **Termin: nie wcześniej niż 60 dni przed otrzymaniem zapłaty (art. 106i ust. 7 pkt 2) — nie 30
   dni.** `kurs-waluty-art-31a.md` Answer 6 (Dz.U. 2025 poz. 775, s. 130): art. 106i ust. 7 pkt 2
   pozwala wystawić fakturę do 60 dni przed „otrzymaniem, przed dokonaniem dostawy towaru lub
   wykonaniem usługi, całości lub części zapłaty". Wording not re-checked against Dz.U. 2026
   poz. 1263. Conf. HIGH (2025 text). K, A
   - **Termin „najpóźniej 15. dnia miesiąca po otrzymaniu zaliczki" (art. 106i ust. 2): NOT IN KB.**
     The KB has only art. 106i ust. 1 (15. dzień miesiąca po dostawie/usłudze, „z zastrzeżeniem ust.
     2-9"; `terminy-ksef-data-wystawienia.md` fakt 12, verbatim NOT IN KB). UNVERIFIED: do not state
     the ust. 2 deadline as sourced until checked in Dz.U. 2026 poz. 1263.

### B. Faktura zaliczkowa w KSeF (`ZAL`)

5. **Od dat obowiązkowych `ZAL` wystawia się w KSeF jak każdą fakturę ustrukturyzowaną.** No KB
   source makes an advance-specific statement; the rule is general: art. 106ga ust. 1 „Podatnicy są
   obowiązani wystawiać faktury ustrukturyzowane przy użyciu Krajowego Systemu e-Faktur."
   (`koniec-limitu-10000-zl.md` fakt 2, Dz.U. 2026 poz. 1263), and [CZ2] pkt 1.5 krok 3 lists „dane
   zamówienia przy zaliczce" among conditional data of an invoice issued in KSeF. Exceptions (art.
   145m to 31.12.2026, art. 106ga ust. 2) apply as for any invoice. Conf. HIGH (rule) / MEDIUM (no
   MF sentence naming ZAL). K, A
6. **Zawartość `ZAL` w FA(3).** [CZ2] pkt 2.6, elementy charakterystyczne:
   - `RodzajFaktury` = „ZAL";
   - `P_6` — „data otrzymania zapłaty (jeśli różna od daty wystawienia)"; [XSD] l. 2471: `P_6` to
     także „data otrzymania zapłaty, o której mowa w art. 106b ust. 1 pkt 4 ustawy, o ile taka data
     jest określona i różni się od daty wystawienia faktury";
   - podsumowanie w podziale na stawki (`P_13_x`, `P_14_x`, `P_14_xW`); [XSD] l. 2502: „W przypadku
     faktur zaliczkowych - wartość zaliczki netto"; l. 2507: podatek „wyliczon[y] według wzoru, o
     którym mowa w art. 106f ust. 1 pkt 3 ustawy";
   - wzór [CZ2]: `KP = (ZB × SP) / (100 + SP)` (ZB = otrzymana kwota brutto, SP = stawka);
   - `P_15` = wartość zaliczki (suma `P_15Z` przy kilku zaliczkach);
   - `Zamowienie` — wypełniony; `FaWiersz` — pominięty. Conf. HIGH. K, M (A: via the invoicing
     program)
7. **`Zamowienie` = zamówienie lub umowa z art. 106f ust. 1 pkt 4, w walucie faktury zaliczkowej.**
   [XSD] l. 3610: „Zamówienie lub umowa, o których mowa w art. 106f ust. 1 pkt 4 ustawy (dla faktur
   zaliczkowych), w walucie, w której wystawiono fakturę zaliczkową". [BRO] §14.1:
   `WartoscZamowienia` = total order value including tax = sum of (`P_11NettoZ` + `P_11VatZ`);
   `ZamowienieWiersz` max 10 000. GTU and procedure on `ZAL`/`KOR_ZAL` go in `ZamowienieWiersz` as
   `GTUZ` / `ProceduraZ` ([BRO] §10.4, §10.5); MPP marker `P_12Z_Zal_15`
   (`mpp-split-payment-ksef.md` fakt 5). Full statutory list of art. 106f ust. 1 (pkt 1-4): NOT IN
   KB verbatim; only pkt 3 (wzór podatku) and pkt 4 (zamówienie/umowa) are referenced, via the XSD.
   Conf. HIGH. K, M
8. **`P_15` na fakturze zaliczkowej = kwota zapłaty dokumentowana fakturą.** [XSD] l. 2633: „W
   przypadku faktur zaliczkowych - kwota zapłaty dokumentowana fakturą." [CZ2] pkt 2.14 table:
   Zaliczkowa → „Kwota otrzymanej zapłaty (wartość zaliczki)". [BRO] §9.4: "For advance invoices =
   payment amount." Published validator page `brak-p15-kwota-naleznosci-ogolem` already says so.
   Conf. HIGH. K, M, A
9. **Kilka zaliczek na jednej fakturze: `ZaliczkaCzesciowa`, max 31 wystąpień, każda z `P_6Z`
   (data), `P_15Z` (kwota) i opcjonalnym `KursWalutyZW`.** [XSD] l. 3008 (`maxOccurs="31"`),
   annotation: „Dane dla przypadków faktur dokumentujących otrzymanie więcej niż jednej płatności, o
   której mowa w art. 106b ust. 1 pkt 4 ustawy." `P_6Z` (l. 3014): „Data otrzymania płatności […]";
   `P_15Z` (l. 3019): „Kwota płatności […] składająca się na kwotę w polu P_15". [CZ2] pkt 2.6;
   [BRO] §9.8 and Appendix B. Conf. HIGH. M, K
   - Official example [PRZ] no. 10 (`ZAL`, PLN): `P_1` = `P_6` = 2026-02-15, `P_13_1` = 16260.16,
     `P_14_1` = 3739.84, `P_15` = 20000, `WartoscZamowienia` = 375150, `DodatkowyOpis` „wysokosć
     wpłaconego zadatku" = „20000 zł". (3739.84 = 20000 × 23/123, the [CZ2] formula.) Note: MF fills
     `P_6` here although it equals `P_1`, while the XSD annotation says „o ile […] różni się od daty
     wystawienia" (see Ambiguities). No official example uses `ZaliczkaCzesciowa`, `KursWalutyZ` or
     `NrKSeFZN`.

### C. Faktura rozliczająca (`ROZ`) i odwołania do zaliczek

10. **`ROZ` (art. 106f ust. 3): pełne wiersze, `P_15` = kwota pozostała do zapłaty, numery KSeF
    faktur zaliczkowych w `FakturaZaliczkowa`.** [CZ2] pkt 2.7: `P_13_x`, `P_14_x`, `P_14_xW`
    „odnoszą się wyłącznie do kwoty pozostałej do zapłaty"; `FaWiersz` — „pełne wartości przedmiotu
    transakcji"; `Zamowienie` — pominięty. [CZ2] pkt 4.1.1: „Art. 106f ust. 3 — faktura rozliczająca
    zawiera numery KSeF faktur zaliczkowych. Dla faktur poza KSeF → numery nadane przez podatnika."
    [XSD] l. 2633: `P_15` „W przypadku faktur, o których mowa w art. 106f ust. 3 ustawy - kwota
    pozostała do zapłaty". [BRO] §10.1: "For settlement invoices (Art. 106f sec. 3): full value of
    the order must be shown." Verbatim of art. 106f ust. 3: NOT IN KB. Conf. HIGH. K, M, A
    - `FakturaZaliczkowa` ([XSD] l. 3047, `maxOccurs="100"`, `xsd:choice`; [CZ2] pkt 4.1.2; [BRO]
      §9.9): faktura zaliczkowa w KSeF → `NrKSeFFaZaliczkowej` (type `TNumerKSeF`; annotation „Pole
      obowiązkowe w przypadku, gdy faktura zaliczkowa była wystawiona za pomocą KSeF"); poza KSeF →
      `NrKSeFZN` = `1` + `NrFaZaliczkowej` (annotation l. 3061: „Numer faktury zaliczkowej
      wystawionej poza KSeF. Pole obowiązkowe dla faktury wystawianej po wydaniu towaru lub
      wykonaniu usługi, o której mowa w art. 106f ust. 3 ustawy i ostatniej z faktur, o której mowa
      w art. 106f ust. 4 ustawy"). One reference per advance invoice, up to 100. Conf. HIGH. M, K
    - Official examples [PRZ] no. 14 and 17 (`ROZ`): `P_15` = 307635 / 300000,
      `FakturaZaliczkowa/ NrKSeFFaZaliczkowej` present, `FaWiersz` with full values (no. 14:
      „mieszkanie 50m^2" 307500 at 8%, „usługi dodatkowe" 4500 at 23%). [CZ2] names these examples
      for pkt 2.7.
11. **Zaliczkowe sprzed obowiązku KSeF, z limitu 10 000 zł (art. 145m) lub w FA(2).** No KB source
    addresses advance invoices issued under art. 145m explicitly. Fact-level chain: art. 145m ust. 1
    allows paper/electronic invoices to 31.12.2026 up to 10 000 zł brutto monthly
    (`koniec-limitu-10000-zl.md` fakt 1); such invoices have no KSeF number, so the `ROZ` uses the
    poza-KSeF branch (`NrKSeFZN` = `1` + `NrFaZaliczkowej`, fact 10). [BRO] §1.2: FA(3) applies to
    all structured invoices from 1.02.2026, including "Final invoices where the advance invoice was
    issued before 1 February 2026 using FA(2) or FA(1)". FA(2) advance invoices sent to KSeF 1.0
    have a KSeF number; `TNumerKSeF` ([XSD] l. 1220) allows an optional hyphen in the middle segment
    (`([0-9A-F]{6})-?([0-9A-F]{6})`), i.e. both the 35- and 36-character forms. Using
    `NrKSeFFaZaliczkowej` for KSeF 1.0 numbers is the same reading as for corrections in
    `fa2-vs-fa3.md` (MF does not address it explicitly). Conf. MEDIUM (combination). K, M
12. **Zaliczka i dostawa w tym samym miesiącu (art. 106b ust. 1a): bez osobnej `ZAL`; faktura po
    wykonaniu czynności ma typ `ROZ` i zaliczkę w `ZaliczkaCzesciowa`.** [BRO] §9.5 rule (English):
    "When a taxpayer does not issue an advance invoice per Art. 106b sec. 1a (payment received in
    same month as activity), the invoice issued after goods delivered/services performed, containing
    elements per Art. 106e sec. 1a, shall be marked `ROZ`." [CZ2] pkt 2.7: `ZaliczkaCzesciowa` —
    „gdy art. 106e ust. 1a (zaliczka i dostawa w tym samym miesiącu, bez odrębnej faktury
    zaliczkowej)". [BRO] §9.8: `ZaliczkaCzesciowa` also for "invoices per Art. 106e sec. 1a (in
    conjunction with Art. 106b sec. 1a)". [XSD] l. 3010: „W przypadku, gdy faktura, o której mowa w
    art. 106f ust. 3 ustawy dokumentuje jednocześnie otrzymanie części zapłaty przed dokonaniem
    czynności, różnica kwoty w polu P_15 i sumy poszczególnych pól P_15Z stanowi kwotę pozostałą
    ponad płatności otrzymane przed wykonaniem czynności udokumentowanej fakturą". Verbatim of art.
    106b ust. 1a and 106e ust. 1a: NOT IN KB; [BRO] wording "does not issue" frames it as the
    taxpayer's choice, not a ban (MEDIUM). Conf. HIGH for the FA(3) mapping. K, M, A

### D. Zapłata 100% z góry

13. **Przy 100% zapłaty i fakturze zaliczkowej nie ma obowiązku `ROZ`; dobrowolna `ROZ` ma `P_15`
    = 0.** [CZ2] pkt 2.8 („Faktura końcowa »zerowa«"): „Gdy podatnik otrzymał 100% zapłaty i
    wystawił fakturę zaliczkową → brak obowiązku wystawienia faktury rozliczającej." If issued:
    `ROZ`, `P_15 = 0`, `FakturaZaliczkowa` (numer + znacznik KSeF/poza KSeF), `FaWiersz` pełne
    wartości, `Zamowienie` pominięty. Conf. HIGH. K, A
14. **Ostatnia faktura zaliczkowa (obejmująca łącznie całą zapłatę) wskazuje numery KSeF poprzednich
    zaliczkowych (art. 106f ust. 4) i nadal ma typ `ZAL`.** [CZ2] pkt 4.1.2: „Art. 106f ust. 4 —
    ostatnia faktura zaliczkowa (obejmująca łącznie całą zapłatę) zawiera numery KSeF poprzednich
    faktur zaliczkowych." [CZ2] pkt 2.6: `FakturaZaliczkowa` on `ZAL` „gdy łącznie obejmują całą
    zapłatę". Type: [XSD] `ZAL` annotation includes „faktura wystawiona w związku z art. 106f ust. 4
    ustawy"; [BRO] §9.5: `ZAL` "including Art. 106f sec. 4". Conf. HIGH. K, M

### E. Korekta faktury zaliczkowej (`KOR_ZAL`) i rozliczającej (`KOR_ROZ`)

15. **Korekta `ZAL` ma typ `KOR_ZAL`, korekta `ROZ` — `KOR_ROZ`.** [CZ2] pkt 2.13.1; [XSD] l. 1830
    („faktura korygująca fakturę zaliczkową"); `faktura-korygujaca-ksef.md` („Korekta faktury
    zaliczkowej / rozliczającej → `KOR_ZAL` / `KOR_ROZ`"). Original referenced in
    `DaneFaKorygowanej` as for any correction. Conf. HIGH. K, M
16. **Pola korekty zaliczkowej: `P_15ZK`, `KursWalutyZK`, `Zamowienie` przed/po, `P_15` jako
    różnica.** [CZ2] pkt 2.13.1: `P_15ZK` — „kwota zapłaty przed korektą (korekta zaliczkowej) lub
    kwota pozostała do zapłaty przed korektą (korekta rozliczającej)"; `KursWalutyZK` — „kurs waluty
    przed korektą (korekta zaliczkowej w walucie obcej)". [XSD] l. 2998 (`P_15ZK`), l. 3001
    (`KursWalutyZK`, „…przed korektą", `minOccurs="0"`). [CZ2] pkt 2.13.5: nawet gdy korekta nie
    dotyczy wartości zamówienia, a zmienia podstawę/podatek → „zalecenie wprowadzenia zapisu stanu
    przed i po korekcie w częściach Zamowienie (korekta zaliczkowej) lub FaWiersz (korekta
    rozliczającej)"; `WartoscZamowienia` = wartość po korekcie; „`P_15` → różnica wartości zaliczki
    w stosunku do faktury pierwotnej". `StanPrzedZ` marks the "before" row ([XSD] l. 3722; [BRO]
    §14.2). `FaWiersz` optional on `KOR_ZAL` ([BRO] §10.1). Conf. HIGH (this is MF's "zalecenie" =
    guidance, not statute). K, M
    - Official examples [PRZ] no. 11-13 (`KOR_ZAL` of `ZAL` no. 10, `NrFaKorygowanej`
      FZ2026/02/150): no. 11 `P_15ZK` = 20000, `P_15` = 0, `P_13_1` negative and `P_13_2` positive
      (rate change, rows with `StanPrzedZ`); no. 12 `P_15ZK` = 20000, `P_15` = 10000; no. 13
      `P_15ZK` = 30000, `P_15` = 0, `WartoscZamowienia` 375150 → 337635. No. 18 is a `KOR_ROZ`
      (`P_15ZK` = 300000) and repeats `FakturaZaliczkowa`. The KB has no MF narrative for these
      scenarios; describe fields only.

### F. Waluta obca

17. **Kurs: zwykła reguła art. 31a, ale obowiązek podatkowy = dzień otrzymania zaliczki (art. 19a
    ust. 8); jeśli faktura wyprzedza zapłatę, art. 31a ust. 2 (dzień przed wystawieniem).**
    `kurs-waluty-art-31a.md` Answer 6: „There is no separate rate rule for zaliczki. Art. 31a
    contains no advance-payment provision"; tax point = payment receipt date (`P_6`, or per payment
    `P_6Z`); „Art. 31a ust. 2 can still apply to a ZAL" when issued before the payment (art. 106i
    ust. 7 pkt 2). Conf. HIGH. K, M
18. **Pola kursu: `KursWalutyZ` (cała faktura zaliczkowa) albo `ZaliczkaCzesciowa/KursWalutyZW`
    (osobno dla każdej zaliczki); max 6 miejsc po przecinku.** [XSD] l. 2636 `KursWalutyZ`: „Kurs
    waluty stosowany do wyliczenia kwoty podatku w przypadkach, o których mowa w dziale VI ustawy na
    fakturach, o których mowa w art. 106b ust. 1 pkt 4 ustawy"; [CZ2] pkt 2.5: „`Fa/KursWalutyZ` lub
    `Fa/ZaliczkaCzesciowa/KursWalutyZW` — kurs dla faktur zaliczkowych"; [BRO] §2.6 (6 decimals).
    [FAQ] q. 19 (via `kurs-waluty-art-31a.md`, retrieved 2026-08-12): „oprócz pola KodWaluty
    wypełniane jest pole KursWaluty, względnie pole KursWalutyZ." Both fields are optional in the
    XSD. Amounts stay in the invoice currency; only tax in PLN (`P_14_xW`, art. 106e ust. 11, [CZ2]
    pkt 2.5). Conf. HIGH. M, K

### G. Płatność

19. **Przelew MPP za zaliczkę: w komunikacie wpisuje się wyraz „zaliczka".**
    `mpp-split-payment-ksef.md` fakt 9 (Dz.U. 2026 poz. 1263, fetched 2026-10-23): art. 108a ust. 1c
    — ust. 1-1b stosuje się „odpowiednio" do zaliczek (art. 19a ust. 8), a w komunikacie przelewu
    zamiast numeru faktury wpisuje się wyraz „zaliczka". Whether art. 108g (numer KSeF w przelewie,
    od 2027) has an advance rule: NOT IN KB. Conf. HIGH (MPP only). K

## Unsettled Questions

1. **Art. 106i ust. 2 (termin 15. dnia po miesiącu otrzymania zaliczki):** not in KB. Do not present
   as sourced; verify in Dz.U. 2026 poz. 1263.
2. **Art. 106i ust. 7: 60 vs 30 dni.** KB (2025 text) says 60 days (fact 4); the request assumed 30.
   Not re-checked against the 2026 consolidated text.
3. **`ROZ` z art. 106b ust. 1a bez żadnej faktury zaliczkowej — czy `FakturaZaliczkowa` jest
   wymagana?** [XSD] makes it `minOccurs="0"` and requires `NrFaZaliczkowej` only „dla faktury […] o
   której mowa w art. 106f ust. 3"; in the ust. 1a case there is no advance invoice to point to, and
   no KB source says what to put there. **Repo note (engineering, not a source claim):**
   `checkRodzajFakturySections` in `packages/validator/src/semantic.ts` (~l. 374) reports every
   `ROZ` without `FakturaZaliczkowa`, which would flag the [BRO] §9.5 ust. 1a invoice. Route to the
   validator owner before the post tells readers the validator handles this case.
4. **Mixed case:** advance invoice issued earlier for part of the payment, plus another payment in
   the delivery month documented in `ZaliczkaCzesciowa` on the same `ROZ`: XSD allows both elements
   together; no MF example or text in KB.
5. **Sprzedawca zwolniony (art. 113) a zaliczka:** art. 106b ust. 2 relieves exempt sellers of the
   invoicing duty (`zwolniony-z-vat-ksef.md` fakt 3); whether/when an exempt seller documents an
   advance on request is not covered in KB.
6. **Art. 145m limit and advance invoices:** whether the 10 000 zł monthly sum counts the `ZAL` and
   `ROZ` amounts separately is not addressed in KB (art. 145m counts "wartość sprzedaży wraz z
   podatkiem udokumentowana tymi fakturami"). Do not answer.
7. **`P_6` equal to `P_1` on `ZAL`:** MF example no. 10 fills it; the XSD annotation says it is
   filled only when different. Both accepted by the XSD; KB has no MF statement which is preferred.
8. **Art. 106f ust. 1 full content and art. 106f ust. 3/4 verbatim:** not in KB; only paraphrased
   via [CZ2] and XSD annotations.
9. **Podręcznik cz. II 2026-08-06 edition:** the KB extract is of 2026-02-01. Section numbers
   (2.6-2.8, 2.13.5, 4.1.1-4.1.2) and wording should be checked against the newer PDF before quoting
   point numbers in the post.

## Suggested Sources Section

- Podręcznik KSeF 2.0, cz. II „Wystawianie i otrzymywanie faktur w KSeF", MF, wyd. 6.08.2026, pkt
  2.5-2.8, 2.13.1, 2.13.5, 2.14, 4.1.1-4.1.2:
  https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
  (KB extract of the 2026-02-01 edition; see Unsettled 9)
- Broszura informacyjna dotycząca struktury logicznej FA(3), MF: opisy `RodzajFaktury`,
  `ZaliczkaCzesciowa`, `FakturaZaliczkowa`, `Zamowienie`, `P_15`:
  https://ksef.podatki.gov.pl/media/nuclnu0w/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf
- Schemat FA(3) (`RodzajFaktury`, `P_6`, `P_15`, `KursWalutyZ`, `ZaliczkaCzesciowa`,
  `FakturaZaliczkowa`, `Zamowienie`, `P_15ZK`, `KursWalutyZK`):
  https://crd.gov.pl/wzor/2025/06/25/13775/schemat.xsd
- Ustawa o VAT, t.j. Dz.U. 2026 poz. 1263 (art. 19a ust. 8, 31a, 106b, 106f, 106i, 106ga, 108a,
  145m): https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf (ISAP:
  https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260001263)
- MF, Pytania i odpowiedzi KSeF 2.0, pytanie 19 (`KursWalutyZ`):
  https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20

## Internal links (published, `apps/web/content/pl`)

- `/blog/faktura-korygujaca-ksef` — korekty, `DaneFaKorygowanej`; anchor
  `#korekta-faktury-bez-numeru-ksef` for originals outside KSeF (relevant to `KOR_ZAL`).
- `/blog/koniec-limitu-10000-zl` and `/blog/ksef-limit-10000-zl` — art. 145m, invoices outside KSeF
  until 31.12.2026 (fact 11).
- `/blog/faktura-poza-ksef-odliczenie-vat` — buyer's side of invoices issued outside KSeF.
- `/blog/numer-ksef-w-przelewie` — KSeF number in transfers; section on MPP (fact 19).
- `/blog/mpp-split-payment-ksef` — `P_12Z_Zal_15` on advance invoices.
- `/blog/terminy-ksef-data-wystawienia` — date of issue (`P_1` vs send date), art. 106i ust. 1.
- `/blog/fa2-vs-fa3-ksef` — final invoices to FA(2) advance invoices must be FA(3).
- `/blog/faktura-zagraniczna-ksef` — foreign-currency invoices (fact 18).
- Validator pages: `/validator/brak-p15-kwota-naleznosci-ogolem` (P_15 per invoice type, incl. ZAL),
  `/validator/podatek-w-pln-faktura-walutowa` (`KursWalutyZ`),
  `/validator/nieprawidlowa-wartosc-pola-fa3` (`RodzajFaktury` enum),
  `/validator/blad-kalkulacji-vat-p14-p15` (how `KOR_ZAL`/`KOR_ROZ` sums are checked),
  `/validator/odwrotne-obciazenie-p18-ksef` (`P_12Z` in `ZamowienieWiersz`). No validator page
  exists for `RODZAJ_FAKTURY_SECTIONS` (ZAL without `Zamowienie`, ROZ without `FakturaZaliczkowa`)
  or `KURS_WALUTY_Z_PLACEMENT`.

## Warning: Common Misconceptions

- **„Fakturę zaliczkową można wystawić najwcześniej 30 dni przed zapłatą."** KB: 60 days (art. 106i
  ust. 7 pkt 2, fact 4).
- **„Faktura zaliczkowa ma pozycje jak zwykła faktura."** `FaWiersz` is omitted; goods go in
  `Zamowienie/ZamowienieWiersz` ([CZ2] pkt 2.6).
- **„W `ROZ` wpisuje się pełną kwotę."** `FaWiersz` shows full values, but `P_13_x`/`P_14_x`/`P_15`
  only the remaining amount ([CZ2] pkt 2.7).
- **„Faktura końcowa jest zawsze obowiązkowa."** Not after 100% prepayment documented by advance
  invoices ([CZ2] pkt 2.8).
- **„Zaliczka w tym samym miesiącu też wymaga `ZAL`."** [BRO] §9.5 / [CZ2] pkt 2.7: one `ROZ` with
  `ZaliczkaCzesciowa` (fact 12).
- **„Korektę zaliczkowej oznacza się `KOR`."** It is `KOR_ZAL` ([XSD], [CZ2] pkt 2.13.1).
- **Stale repo claim:** `kurs-waluty-art-31a.md` Answer 6 / table row 4 says `KursWalutyZ` and
  `KursWalutyZW` are never rate-checked. `semantic.ts` now reads `ZaliczkaCzesciowa/KursWalutyZW`
  per payment (~l. 1634) and uses `P_6Z` as a tax-point fallback (~l. 1402); that finding is stale.
- **`test-fixtures/official-examples/README.md`** mislabels examples (10 is `ZAL`, 11-13 `KOR_ZAL`,
  14/17 `ROZ`, 18 `KOR_ROZ`, 21 is a `VAT` in EUR); do not cite the README.

## Local verification (2026-11-11)

Checked against the text of Dz.U. 2026 poz. 1263 (PDF from
`https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf`; ELI metadata: obwieszczenie of 2026-09-01,
status „obowiązujący”). The "NOT IN KB" items above are now verified:

- Art. 106i ust. 2: „fakturę wystawia się niepóźniej niż 15. dnia miesiąca następującego po
  miesiącu, w którym otrzymano całość lub część zapłaty od nabywcy”.
- Art. 106i ust. 7 pkt 2: not earlier than the 60th day before receiving the payment.
- Art. 19a ust. 8: tax point on receipt of the payment „w odniesieniu do otrzymanej kwoty”, except
  ust. 1b and ust. 5 pkt 4. Art. 31a ust. 1 and 2 unchanged from the 2025 text.
- Art. 106b ust. 1 pkt 4 lit. a–c (WDT, 19a ust. 5 pkt 4, 19a ust. 1b), ust. 1a (same month), ust. 2
  and ust. 3 pkt 2 (exempt sales, 3 months), art. 106e ust. 1a, art. 106f ust. 1 pkt 3 (formula),
  ust. 3 and ust. 4, art. 145m ust. 1.
- **Art. 106b ust. 1b (added to the post):** „Przepisu ust. 1a nie stosuje się w przypadkach, dla
  których terminy wystawienia faktury określone są w art. 106i ust. 3–8”, e.g. construction and
  construction-assembly services (art. 106i ust. 3 pkt 1 with art. 19a ust. 5 pkt 3 lit. a). For
  those the same-month waiver does not apply.
- Podręcznik cz. II of 06.08.2026 (live PDF): pkt 2.8 (zero `ROZ`, `P_15` = 0) and pkt 2.13.5
  („zaleca się” before/after rows) match the KB extract.
