# Research Brief: Faktura VAT RR w KSeF

**Target query:** „VAT RR KSeF"

**Answer in two sentences:** Fakturę VAT RR wystawia nabywca produktów rolnych, czyli podatnik
zarejestrowany jako czynny podatnik VAT, kupujący od rolnika ryczałtowego (art. 116 ust. 1 ustawy o
VAT), a od 1 kwietnia 2026 r. może ją wystawiać w KSeF dobrowolnie (MF, „Podstawy prawne oraz
kluczowe terminy"). W KSeF wystawi ją tylko wtedy, gdy rolnik złoży w systemie oświadczenie, że jest
rolnikiem ryczałtowym, i wskaże tego nabywcę jako uprawnionego; bez tego faktura VAT RR powstaje
poza KSeF (FAQ KSeF 2.0, pyt. 12).

**What changes the answer:**

- **Rolnik złożył oświadczenie i wskazał nabywcę albo nie.** Bez oświadczenia: VAT RR poza KSeF (FAQ
  Q12, fact 3). Technicznie uprawnienie podmiotowe `RRInvoicing` nadaje właściciel albo
  administrator z `CredentialsManage` podmiotowi identyfikowanemu NIP-em (facts 6–7). That the FAQ
  „oświadczenie" and the API grant `RRInvoicing` are the same step is our reading (MEDIUM).
- **Rolnik cofnął uprawnienie.** Odebranie uprawnienia podmiotowego „ma natychmiastowy skutek" (fact
  9).
- **Rolnik bez NIP.** Schema FA_RR(1) requires `NIP` for both Podmiot1 (dostawca) and Podmiot2
  (nabywca); there is no BrakID option for them (fact 12). Whether such a farmer can make the KSeF
  oświadczenie at all: NOT SETTLED.
- **Faktura korygująca.** VAT RR KOREKTA (`KOR_VAT_RR`) is in the same schema; the corrected invoice
  may be identified by its KSeF number or flagged as issued outside KSeF (`NrKSeFN`) (fact 15).
- **Data.** Before 2026-04-01 PROD did not accept FA_RR(1) 1-1E (fact 10). Art. 145m (≤ 10 000 zł
  gross/month) ends 2026-12-31; whether it applies to VAT RR: NOT SETTLED (U3).

---

**Requested by:** Orchestrator (new PL blog post) **Date:** 2026-11-20 **For content:**
`apps/web/content/pl/blog/faktura-vat-rr-ksef.mdx` (slug `faktura-vat-rr-ksef`)

**Audience:** Ania-type small business buying farm produce from a rolnik ryczałtowy (skup, mała
przetwórnia, sklep, gastronomia), plus accountants.

**Provenance:** KB briefs verified live on 2026-10-16 (`limity-i-wylaczenia.md`, „Live verification
(2026-10-16)") and baseline `docs/knowledge-base/WATCHLIST.md` (last checked 2026-10-07: VAT Act
Dz.U. 2026 poz. 1263). Fresh in this run: the official `CIRFMF/ksef-api` repository, cloned at
commit `d4460b6` (2026-11-17 13:49 +0100); files cited as
`https://github.com/CIRFMF/ksef-api/blob/main/<path>` with line numbers from that commit. A single
curl to ksef.podatki.gov.pl on 2026-11-20 returned proxy 403; no MF page, ISAP or Sejm text was
re-fetched in this run.

Key: **K** = the law (Tier 1) / **G** = MF guidance (Tier 2/3) / **T** = technical spec (schema, API
docs; Tier 2). Ania-relevant: **A** yes, **(A)** accountant-level.

## Key Facts (ready to use)

### A. Who issues VAT RR, and is KSeF mandatory

1. **The buyer issues the VAT RR invoice.** K. Art. 116 ust. 1: „Podatnik zarejestrowany jako
   podatnik VAT czynny nabywający produkty rolne od rolnika ryczałtowego wystawia w dwóch
   egzemplarzach fakturę dokumentującą nabycie tych produktów." Source: Ustawa o VAT, Dz.U. 2026
   poz. 1263, art. 116 ust. 1, https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf . KB:
   `limity-i-wylaczenia.md`, „Live verification (2026-10-16)". Confidence: HIGH. A
2. **VAT RR in KSeF is optional from 2026-04-01.** G (Tier 3). „Fakultatywne wystawianie faktur VAT
   RR i faktur VAT RR KOREKTA w KSeF będzie możliwe od 1 kwietnia 2026 r." Source: MF, Podstawy
   prawne oraz kluczowe terminy, section „Faktury VAT RR",
   https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/podstawy-prawne-oraz-kluczowe-terminy/ .
   KB: `limity-i-wylaczenia.md` fact 1 + live verification; `mf-faq-podreczniki-2026.md` fact 6.
   Confidence: HIGH (for „optional from 1.04.2026"). No end date of the optional regime in any KB
   source (see U1). A
3. **Condition: the farmer's oświadczenie in KSeF naming the buyer.** G (Tier 3). FAQ KSeF 2.0 Q12:
   „Nabywca (podatnik VAT) wystawi fakturę VAT RR w KSeF tylko wtedy, gdy rolnik ryczałtowy złoży w
   systemie oświadczenie, że jest rolnikiem ryczałtowym i wskaże tego nabywcę jako uprawnionego.
   Jeśli rolnik nie złoży oświadczenia w KSeF, faktura VAT RR będzie wystawiona poza systemem."
   Source: https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20 , section „Zasady obowiązywania
   KSeF i przepisy prawne". KB: `limity-i-wylaczenia.md`, „Live verification (2026-10-16)".
   Confidence: HIGH. A
4. **The farmer himself is freed from issuing invoices (art. 117) and may issue a rachunek.** K.
   Art. 117: „Rolnik ryczałtowy w zakresie prowadzonej działalności rolniczej dostarczający produkty
   rolne jest zwolniony z obowiązku: 1) wystawiania faktur; …" (KB `limity-i-wylaczenia.md`, live
   verification). G (Tier 2): Podręcznik KSeF 2.0 cz. II §1.3 (sierpień 2026, p. 13): rachunki mogą
   być wystawione „przez rolników ryczałtowych zwolnionych z obowiązku wystawiania faktur na
   podstawie art. 117 ustawy o VAT." KB: `podrecznik-ksef-20-czesc-ii.md` l. 131;
   `limity-i-wylaczenia.md` fact 4. Confidence: HIGH. A (context: the farmer does not issue the VAT
   RR)
5. **„Rolnik ryczałtowy" is a VAT regime, not PIT ryczałt.** KB `ryczalt-ksef.md` fact 15 („a VAT
   regime (art. 115–117), unrelated to ryczałt ewidencjonowany"). Confidence: HIGH for the
   distinction; art. 115 text itself is not extracted in the KB. A

### B. Permission: how KSeF knows the buyer may issue (technical layer)

6. **VAT RR issuing is an „uprawnienie podmiotowe" granted to another entity.** T. „Innym podmiotom
   do działania w swoim kontekście w imieniu podmiotu uprawniającego (uprawnienia podmiotowe): (…)
   podmiotom uprawnionym do wystawiania faktur VAT RR." Role table: „Podmiot upoważniony" — „Inny
   podmiot gospodarczy, któremu nadano określone uprawnienia do wystawiania faktur w imieniu
   podmiotu" — `SelfInvoicing`, `RRInvoicing`, `TaxRepresentative`. Source:
   https://github.com/CIRFMF/ksef-api/blob/main/uprawnienia.md l. 43–46, 85, 99. KB:
   `samofakturowanie-ksef.md` fact 22 (pointer), V4. Confidence: HIGH. (A)
7. **Who grants it and to whom.** T. „Te uprawnienia mogą być nadawane wyłącznie przez właściciela
   lub administratora posiadającego `CredentialsManage`." `RRInvoicing` is described as
   „(samofakturowanie RR)"; grant field `subjectIdentifier` = „Identyfikator podmiotu. `"Nip"`".
   Endpoint: POST `/permissions/authorizations/grants`. Source: `uprawnienia.md` l. 330, 334, 340,
   344–345. Confidence: HIGH (API text). MEDIUM that this is the „oświadczenie" of FAQ Q12: the API
   docs never use the word „oświadczenie" and do not mention „rolnik ryczałtowy"; the link rests on
   both describing the farmer authorising the buyer. (A)
8. **KSeF checks the permission against the invoice data on upload.** T. „Są to uprawnienia
   podmiotowe, co oznacza, że są istotne przy wysyłaniu przez podmiot plików faktur i weryfikowane w
   procesie ich walidacji. Weryfikowana jest zależność pomiędzy podmiotem, a danymi na fakturach."
   Source: `uprawnienia.md` l. 338. G (Tier 2): Podręcznik cz. II §1.6.1 lists among KSeF checks
   „Uprawnienia osoby/podmiotu przesyłającego" and „Brak uprawnień" as a rejection ground (KB
   `podrecznik-ksef-20-czesc-ii.md` l. 174–180). Confidence: HIGH. Which invoice field is matched
   (presumably Podmiot1 NIP) is not stated: MEDIUM. A (practical: without the grant, upload fails)
9. **Revocation is immediate.** T. „Tego typu uprawnienia nie są przekazywalne, więc ich odebranie
   ma natychmiastowy skutek i kończy możliwość realizacji operacji fakturowych w danym trybie."
   Endpoint DELETE `/permissions/authorizations/grants/{permissionId}`; list includes
   „samofakturowanie RR". Source: `uprawnienia.md` l. 613–620. Confidence: HIGH. A

### C. Schema FA_RR(1) and API

10. **FA_RR(1) 1-1E on PROD from 01.04 (2026).** T. Changelog 2.2.1: „Dodano nową wersję (`1-1E`)
    schemy `FA_RR (1)`. Schema `FA_RR (1) 1-0E` będzie obsługiwana na środowisku TEST do 23.04.
    Schema `FA_RR (1) 1-1E` będzie obowiązywać na środowisku PROD od 01.04." Changelog 2.4.0 (PROD
    16.04.2026): „Doprecyzowano wartość pola `Value` dla schemy `FA_RR (1) 1-1E`: zamiast `RR`
    należy przekazywać `FA_RR`"; for downloads „na PROD akceptowana będzie wyłącznie `FA_RR`".
    Changelog 2.5.0 (PROD 11.05.2026): „Usunięto wartości związane z fakturami RR, wcześniej
    oznaczone jako deprecated (m.in. `InvoiceQueryFormType.RR`)." Source:
    https://github.com/CIRFMF/ksef-api/blob/main/api-changelog.md l. 179–204, 206–212, 262–265,
    278–283. Confidence: HIGH. (A, developers)
11. **Schema identity.** T. Namespace `http://crd.gov.pl/wzor/2026/03/06/14189/`; `KodFormularza`
    enum `FA_RR`; attributes `kodSystemowy` fixed „FA_RR (1)", `wersjaSchemy` fixed „1-1E"; root
    element documented „Faktura VAT RR"; `DataWytworzeniaFa` min 2026-01-01. `FakturaRR`
    documentation: „Na podstawie art. 116 ustawy." Source:
    https://github.com/CIRFMF/ksef-api/blob/main/faktury/schemy/RR/schemat_FA_RR(1)_v1-1E.xsd l. 1,
    1072, 1084, 1103, 1541, 1708–1711. The XSD is the only file in `faktury/schemy/RR/` at d4460b6.
    Open API (`open-api.json`) lists `FA_RR (1)` / `1-1E` / Value `FA_RR` and invoice types `VatRr`
    „(FA_RR) Podstawowa", `KorVatRr` „(FA_RR) Korygująca". Confidence: HIGH. (A)
12. **Podmiot1 = dostawca (the farmer), Podmiot2 = nabywca (the issuer); both need a NIP.** T.
    `Podmiot1` „Dane dostawcy", `Podmiot2` „Dane nabywcy"; both use `TPodmiot1`, a plain sequence of
    `NIP` („Identyfikator podatkowy NIP", type `etd:TNrNIP`, no `minOccurs="0"`) and `Nazwa` („Imię
    i nazwisko lub nazwa albo nazwa skrócona"). No BrakID / foreign-ID alternative for Podmiot1 or
    Podmiot2 (BrakID exists only in `TPodmiot3`). Source: XSD l. 1347–1362, 1550, 1598. Confidence:
    HIGH. Note for readers used to FA(3): here the issuer is Podmiot2, not Podmiot1. A
13. **Rates allowed: 6.5 and 7.** T. `TStawkaPodatku` „Stawka zryczałtowanego zwrotu podatku",
    enumeration `6.5`, `7`; line field `P_9`. Source: XSD l. 1467–1473, 1969. Confidence: HIGH for
    the schema. The legal basis of these rates (art. 115 ust. 2?) is NOT in the KB: UNVERIFIED (U5).
    A
14. **Main fields.** T. `P_4B` „Data wystawienia faktury" (required); `P_4A` „Data dokonania
    nabycia" (optional, when common to all lines; per line `P_4AA`); `P_4C` „Kolejny numer faktury";
    `P_11_1` „Wartość nabytych produktów rolnych lub usług rolniczych"; `P_11_2` „Kwota
    zryczałtowanego zwrotu podatku"; `P_12_1` „Kwota należności ogółem wraz z kwotą zryczałtowanego
    zwrotu podatku, wyrażona cyfrowo"; `P_12_2` same „wyrażona słownie"; lines `FakturaRRWiersz`
    with `P_5` (nazwa), `P_6A`/`P_6B` (jednostka, ilość), `P_6C` „Oznaczenie (opis) klasy lub
    jakości", `P_7`/`P_8` (cena, wartość bez zwrotu), `P_9` (stawka), `P_10` (kwota zwrotu), `P_11`
    (wartość ze zwrotem). Currency: `KodWaluty`; foreign currency fields `P_11_1W`, `P_11_2W`,
    `P_12_1W` and line `KursWaluty` per „art. 116 ust. 2b i 2c". Source: XSD l. 1708–1778, 1940–2000
    range. Confidence: HIGH. (A)
15. **Correction (VAT RR KOREKTA).** T. `RodzajFaktury` enum `VAT_RR` „Faktura pierwotna",
    `KOR_VAT_RR` „Faktura korygująca". For corrections: `PrzyczynaKorekty`, `TypKorekty` (1–4, incl.
    „4 Korekta skutkująca w dacie dokonania zwrotu całości lub części należności"),
    `DaneFaKorygowanej` with a choice: `NrKSeF` + `NrKSeFFaKorygowanej`, or `NrKSeFN` „Znacznik
    faktury korygowanej wystawionej poza KSeF". Source: XSD l. 1455–1462, 1778–1830. Confidence:
    HIGH (schema). Whether a KSeF KOR_VAT_RR may legally correct a paper VAT RR: the schema allows
    the flag; no MF sentence in KB. A
16. **Payment fields.** T. `Platnosc` (optional): choice of `FormaPlatnosci` (enum only `1`
    „przelew") or `PlatnoscInna` + `OpisPlatnosci`; `RachunekBankowy1` „Numer rachunku rolnika",
    `RachunekBankowy2` „Numer rachunku nabywcy" (0–3 each); `IPKSeF`, `LinkDoPlatnosci`.
    `DokumentZaplaty` (0–50): `NrDokumentu` „Dane identyfikacyjne dokumentu, o którym mowa w art.
    116 ust. 6 pkt 3 ustawy, lub dokumentu potwierdzającego dokonanie zapłaty zaliczki, o którym
    mowa w art. 116 ust. 9 pkt 1 i ust. 9b ustawy"; `DataDokumentu`. Source: XSD l. 1879–1890,
    2060–2100. Confidence: HIGH (schema). Content of art. 116 ust. 6 pkt 3 / ust. 9 is NOT in the KB
    (U6). A

### D. Storage

17. **VAT RR and VAT RR KOREKTA are stored in KSeF for 10 years.** G (Tier 2). Podręcznik cz. II §7:
    stored are „Faktury VAT RR i VAT RR KOREKTA (tryb ONLINE i offline24 po dosłaniu)"; „Okres
    przechowywania: 10 lat od końca roku wystawienia". KB: `podrecznik-ksef-20-czesc-ii.md` l.
    1148–1151 (KB extract of the 1.02.2026 edition, not MF verbatim). Confidence: HIGH. A
18. **KSeF validates FA_RR(1) XML.** G (Tier 2). „Zgodność pliku XML ze strukturą XSD (FA(3),
    FA_RR(1), PEF)". KB: `podrecznik-ksef-20-czesc-ii.md` l. 174 (KB extract text). Confidence:
    HIGH. (A)

## UNVERIFIED / not settled (do not state as fact)

- **U1. Does VAT RR ever become mandatory in KSeF?** The KB records only „optional from 2026-04-01"
  (fact 2) with no end date and no planned switch to mandatory. Write „dobrowolnie" without a time
  limit and without predicting change.
- **U2. Farmer without NIP.** FA_RR(1) requires NIP for Podmiot1 (fact 12) and the `RRInvoicing`
  grant identifies the subject by NIP and is made by an owner/admin logged into an entity context
  (fact 7). Whether a farmer without NIP can make the oświadczenie, or must get a NIP first: no
  source. Consequence (VAT RR outside KSeF in that case) follows from FAQ Q12 only if no
  oświadczenie is possible: our reading, not MF's.
- **U3. Art. 145m and VAT RR.** Art. 145m ust. 1 speaks of sale „u tych podatników udokumentowana
  tymi fakturami wystawionymi" (KB `samofakturowanie-ksef.md` fact 27); VAT RR is a purchase
  document issued by the buyer, and VAT RR in KSeF is optional anyway. No source links the two. Moot
  after 2026-12-31.
- **U4. UI path in Aplikacja Podatnika for the oświadczenie / RRInvoicing grant.** Not in the KB and
  not in the CIRFMF repo (which documents only the API). Do not describe menu steps.
- **U5. Legal basis of 6.5% / 7%.** Not extracted in the KB (art. 115 ust. 2 not quoted anywhere).
  Only the schema enumeration (fact 13) is verified. Do not say which rate applies to what.
- **U6. Art. 116 ust. 2–10 content** (required invoice elements, payment by bank transfer, the
  „dokument zapłaty" of ust. 6 pkt 3, advance-payment rules of ust. 9, farmer's oświadczenie on
  paper under the Act). Not in the KB; the schema refers to these provisions only by number.
- **U7. „W dwóch egzemplarzach" in KSeF.** Art. 116 ust. 1 requires two copies; how this is met when
  the VAT RR is in KSeF, and how the farmer receives/accesses it, is not stated in any KB source.
- **U8. Whether the FAQ „oświadczenie" = API `RRInvoicing` grant** (fact 7): MEDIUM, not stated by
  MF.
- **U9. Offline modes for VAT RR.** Podręcznik §7 mentions „offline24 po dosłaniu" for storage; no
  source in the KB details offline/QR rules specific to FA_RR.
- **U10. Can the buyer deduct / settle the flat-rate refund from a VAT RR outside KSeF** (art. 86
  etc.): not in KB. Do not cover.

## Suggested Sources Section

- Ustawa o VAT, tekst jednolity Dz.U. 2026 poz. 1263 (art. 116 ust. 1, art. 117):
  https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf
- MF, Podstawy prawne oraz kluczowe terminy (section „Faktury VAT RR"):
  https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/podstawy-prawne-oraz-kluczowe-terminy/
- MF, Pytania i odpowiedzi KSeF 2.0 (pyt. 12):
  https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20
- Podręcznik KSeF 2.0 cz. II (sierpień 2026), §1.3, §1.6.1, §7:
  https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
- Schemat FA_RR(1) 1-1E (MF, repozytorium CIRFMF/ksef-api):
  https://github.com/CIRFMF/ksef-api/blob/main/faktury/schemy/RR/schemat_FA_RR(1)_v1-1E.xsd
- Dokumentacja API KSeF 2.0, uprawnienia (RRInvoicing):
  https://github.com/CIRFMF/ksef-api/blob/main/uprawnienia.md
- Dokumentacja API KSeF 2.0, historia zmian (2.2.1, 2.4.0, 2.5.0):
  https://github.com/CIRFMF/ksef-api/blob/main/api-changelog.md

## Warning: Common Misconceptions

- „VAT RR musi być w KSeF od 1 kwietnia 2026" — wrong: optional („fakultatywne") from 1.04.2026
  (fact 2).
- „Fakturę VAT RR wystawia rolnik" — wrong: the buyer (czynny podatnik VAT) issues it (art. 116 ust.
  1, fact 1); the farmer is zwolniony z wystawiania faktur (art. 117, fact 4).
- „Nabywca może wysłać VAT RR do KSeF na własną rękę" — not per MF: only after the farmer's
  oświadczenie naming the buyer (FAQ Q12, fact 3); KSeF verifies the permission on upload (fact 8).
- „Rolnik ryczałtowy jest wyłączony z KSeF" — not supported by any MF source in the KB (KB
  `limity-i-wylaczenia.md`, misconceptions).
- „W VAT RR nabywca to Podmiot1, bo wystawia" — wrong for the schema: Podmiot1 = dostawca (farmer),
  Podmiot2 = nabywca (fact 12).
- „VAT RR wysyła się jako FA(3)" — wrong: separate structure FA_RR(1), form code `FA_RR` (facts
  10–11). The old Value `RR` is no longer accepted on PROD (fact 10).
- Rolnik ryczałtowy (VAT) ≠ ryczałt ewidencjonowany (PIT) (fact 5).

## URLs not fetched live (2026-11-20)

Proxy returned 403 for ksef.podatki.gov.pl (one curl, 2026-11-20); isap.sejm.gov.pl, api.sejm.gov.pl
and crd.gov.pl were not attempted (known 403). Facts from these rest on the KB live verification of
2026-10-16 (and WATCHLIST baseline 2026-10-07):

- https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/podstawy-prawne-oraz-kluczowe-terminy/
- https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20
- https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
- https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf
- Schema namespace host `http://crd.gov.pl/wzor/2026/03/06/14189/` (not fetched; the XSD was read
  from the CIRFMF repo copy)

Fetched live in this run (git clone, commit `d4460b6`, 2026-11-17): `uprawnienia.md`,
`api-changelog.md`, `open-api.json`, `faktury/schemy/RR/schemat_FA_RR(1)_v1-1E.xsd`.

## Freshness markers

- Optional status of VAT RR in KSeF (fact 2): review on each MF legal-basis page update and any VAT
  Act / KSeF regulation amendment.
- FA_RR(1) schema version 1-1E (fact 10–11): check `faktury/schemy/RR/` and `api-changelog.md` for a
  new version.
- Art. 145m (U3): expires 2026-12-31.
