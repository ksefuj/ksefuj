# Research Brief: Schemat XSD FA(3) — referencja struktury

**Requested by:** coordinator (new guide) **Date:** 2026-11-13 **For content:** PL guide
`schemat-xsd-fa3` („Schemat XSD FA(3)”), EN `fa3-xsd-schema` **Persona:** Marek (developer,
generates XML) and technically curious freelancers. Developer voice allowed. **Scope:** SCHEMA
REFERENCE (what is in the XSD). How to validate (xmllint catalog, CLI walkthrough, what KSeF checks
on submission) is already covered by `apps/web/content/pl/guides/walidacja-xml-fa3.mdx` and its
brief `docs/knowledge-base/briefs/walidacja-xml-fa3.md` (2026-11-05). Link there; do not re-explain.

**Target query:** „schemat XSD FA(3)”, „FA(3) xsd”, „struktura FA(3) XML”, „ksef xml schema”,
„przykładowy XML FA(3)”

**Answer in two sentences:** Schemat FA(3) to plik `schemat.xsd` z przestrzenią nazw
`http://crd.gov.pl/wzor/2025/06/25/13775/` i elementem głównym `Faktura` (`Naglowek`, `Podmiot1`,
`Podmiot2`, `Podmiot3` 0..100, `PodmiotUpowazniony`, `Fa`, `Stopka`, `Zalacznik`), który importuje
trzy wspólne schematy MF (`StrukturyDanych` → `ElementarneTypyDanych` → `KodyKrajow`); obowiązuje
dla wszystkich faktur ustrukturyzowanych od 1 lutego 2026 r. (Broszura FA(3) pkt 1.2; `schemat.xsd`
l. 1-2, 2120). Najmniejsza poprawna faktura krajowa ma ~60 linii: nagłówek z
`kodSystemowy="FA (3)"`, `wersjaSchemy="1-0E"`, `WariantFormularza` = 3, sprzedawcę i nabywcę z NIP,
`JST` i `GV` w `Podmiot2`, oraz `Fa` z `KodWaluty`, `P_1`, `P_2`, `P_15`, kompletnymi `Adnotacje` i
`RodzajFaktury` (fakty 4-6, szkielet w sekcji G, przetestowany).

**What changes the answer:**

- **New schema version.** Everything below is FA(3) `1-0E` (namespace `…/2025/06/25/13775/`). A new
  version would change the namespace, `kodSystemowy`/`wersjaSchemy`/`WariantFormularza` and URLs. MF
  announces XSD changes in the API changelog (`walidacja-xml-fa3.md` fact 11).
- **Invoice type.** The skeleton is a plain `RodzajFaktury` = `VAT` in PLN. Corrections (`KOR`),
  advances (`ZAL`), foreign currency (`P_14_xW`, `KursWaluty`), reverse charge, JST/GV etc. need
  extra elements; the XSD alone does not tell you which (Information Sheet does).
- **XSD-valid ≠ accepted ≠ correct.** Pure XSD lets through a bad NIP checksum, a missing
  `FaWiersz`, a missing `P_13_1`/`P_14_1` group, wrong arithmetic (fact G4). KSeF adds its own
  checks (`walidacja-xml-fa3.md` facts 12-21).

---

## Link-only facts (already verified in `walidacja-xml-fa3.md`; the new guide should LINK to `/guides/walidacja-xml-fa3`, not repeat)

- How to run xmllint with an XML catalog, the `--nonet` failure message, the `catalog.xml` content
  (`walidacja-xml-fa3.md` fact 35; guide section „Jak sprawdzić plik schematem w xmllint?”).
- What KSeF checks on submission: UTF-8 without BOM, no processing instructions, discouraged
  Unicode, duplicates (440), P_1 vs acceptance date, NIP checksum on PROD only, 1 MB / 3 MB, 10 000
  per session, permissions (facts 12-21).
- Strict-XML PROD enforcement date status (19.10.2026 announced, unconfirmed) (facts 24-26). Do not
  restate the date in the schema guide.
- Status codes 430/450/440 (facts 27-30).
- TEST/DEMO environment caveats (facts 3-5, 42) → also `/guides/srodowisko-testowe-ksef`.
- Full CLI walkthrough and npm API (`validate()`, options) (facts 38-39). The schema guide may show
  one `npx` line (fact H1) and link for the rest.
- FA(2) → FA(3) migration details → `/blog/fa2-vs-fa3-ksef` (brief `fa2-vs-fa3.md`). Only a
  one-paragraph pointer here (fact C3).
- Error pages: wrong namespace `/validator/zly-namespace-faktura-fa3`, wrong order
  `/validator/element-w-zlym-miejscu-fa3`, missing JST/GV `/validator/brak-jst-gv-podmiot2`, missing
  field `/validator/brak-wymaganego-pola-fa3`, invalid value
  `/validator/nieprawidlowa-wartosc-pola-fa3`, rate `/validator/nieprawidlowa-stawka-vat-p12`,
  separators `/validator/kwoty-bez-separatorow-tysiecy` (all exist in
  `apps/web/content/pl/validator/`).

## Fetch log (2026-11-13)

| Source                                                                                                    | Fetched?                 | Result                                                                                                  |
| --------------------------------------------------------------------------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------- |
| `https://crd.gov.pl/wzor/2025/06/25/13775/schemat.xsd` + 3 `…/DefinicjeTypy/*.xsd` (browser User-Agent)   | NO                       | `curl: (56) CONNECT tunnel failed, response 403` (proxy); `http://` variant: `Could not resolve host`   |
| `raw.githubusercontent.com/CIRFMF/ksef-api/main/faktury/schemy/FA/schemat_FA(3)_v1-0E.xsd`                | YES, HTTP 200, 183 798 B | **byte-identical** to bundled `schemat.xsd` (SHA-256 `b646b6b5…d958` both)                              |
| `…/FA/bazowe/StrukturyDanych_v10-0E.xsd`, `ElementarneTypyDanych_v10-0E.xsd`, `KodyKrajow_v10-0E.xsd`     | YES, HTTP 200            | identical after whitespace/line-ending normalization, except `xsd:include schemaLocation` (see fact B3) |
| `…/FA/schemat_FA(2)_v1-0E.xsd`                                                                            | YES, HTTP 200, 170 674 B | used for FA(2) pointers (fact C3)                                                                       |
| `git ls-remote https://github.com/CIRFMF/ksef-api.git HEAD`                                               | YES                      | `ce3670ea042d…` (same HEAD as 2026-11-05 in `walidacja-xml-fa3.md`)                                     |
| registry.npmjs.org `@ksefuj/validator` + tarball 0.4.0                                                    | YES                      | latest `0.4.0` (2026-10-08); tarball has `dist/schemas/schemas-data.js`, no `.xsd` files                |
| Broszura FA(3) PL PDF (ksef.podatki.gov.pl)                                                               | NO (no connection)       | quoted via `packages/validator/docs/fa3-information-sheet.md` (EN conversion)                           |
| Local runs: repo CLI (`packages/validator/dist/cli.js`, v0.4.0 build) and xmllint (libxml 20914 = 2.9.14) | YES                      | sections G, H                                                                                           |

**Upstream match conclusion:** the bundled copy matches the MF GitHub copy (CIRFMF, Tier 2). It
could NOT be compared to crd.gov.pl today. The 2026-11-05 comparison in `walidacja-xml-fa3.md` fact
10 says CIRFMF = crd content; our bundle was downloaded from crd.gov.pl (`schemas-data.ts` header
„Last updated: 2026-03-13T14:37:20.852Z”). Direct crd.gov.pl match today: **UNVERIFIED**.

---

## Key Facts (ready to use)

Line numbers refer to `packages/validator/src/schemas/schemat.xsd` (LF line endings, 3 950 lines)
unless stated. `StrukturyDanych_v10-0E.xsd` and `ElementarneTypyDanych_v10-0E.xsd` use CR-only line
endings (`file` reports „with CR line terminators”), so `wc -l` shows 0; line numbers given for
`ElementarneTypyDanych` count CR as a line break. All XSD facts: Tier 2 (MF technical
documentation). Confidence HIGH unless stated.

### A. Namespace, root, header constants

1. **Root `xsd:schema` attributes** (l. 1, verbatim):
   `xmlns:xsd="http://www.w3.org/2001/XMLSchema"`,
   `xmlns:etd="http://crd.gov.pl/xml/schematy/dziedzinowe/mf/2022/01/05/eD/DefinicjeTypy/"`,
   `xmlns:tns="http://crd.gov.pl/wzor/2025/06/25/13775/"`,
   `targetNamespace="http://crd.gov.pl/wzor/2025/06/25/13775/"`, `elementFormDefault="qualified"`,
   `attributeFormDefault="unqualified"`, `xml:lang="pl"`. **No `version` attribute** on the FA(3)
   `xsd:schema` element (only one `version=` in the file: the XML prolog). The two `DefinicjeTypy`
   schemas `ElementarneTypyDanych` and `KodyKrajow` carry `version="1.0"`; `StrukturyDanych` does
   not. Developer-relevant: yes.
2. **What `elementFormDefault="qualified"` means in practice (tested):** every element of the
   invoice must be in the FA(3) namespace. A default
   `xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/"` on `<Faktura>` is enough. Prefixing only the
   root (`<tns:Faktura xmlns:tns=…>` with unprefixed children) fails: „Element 'Naglowek': This
   element is not expected. Expected is ( {http://crd.gov.pl/wzor/2025/06/25/13775/}Naglowek )”
   (xmllint, variant w). The FA(3) schema uses only **simple** types from `etd` (`TNrNIP`,
   `TWybor1`, `TWybor1_2`, `TKodKraju`, `TAdresEmail`, `TData`, `TDataCzas`, `TNaturalny`,
   `TNrIdentyfikacjiPodatkowej`, `TNrKRS`, `TNrREGON`, `TTekstowy`; grep of
   `type="etd:`/`base="etd:`), so no element lives in the `etd` namespace. HIGH (reproduced).
3. **Namespace must be `http://`, not `https://` (tested).**
   `xmlns="https://crd.gov.pl/wzor/2025/06/25/13775/"` → xmllint „No matching global declaration
   available for the validation root.”; our CLI `WRONG_NAMESPACE`. The Information Sheet §1.2 gives
   the _location_ with https („`https://crd.gov.pl/wzor/2025/06/25/13775/`”); the namespace
   _identifier_ is the http string from `targetNamespace`. Do not confuse the two. HIGH.
4. **MF example files declare extra, unused prefixes.**
   `test-fixtures/official-examples/FA_3_Przykład_1.xml` l. 2-3:
   `<Faktura xmlns:etd="…/DefinicjeTypy/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/">`.
   None of the 26 examples uses `xsi:schemaLocation` (grep count 0). Adding these declarations to
   our skeleton still validates (variant v). They are optional. HIGH.
5. **Root element:** `<xsd:element name="Faktura">` (l. 2120), documentation „Faktura VAT”. It is
   the only global element. HIGH.
6. **`KodFormularza`** (l. 1080-1089): text content type `TKodFormularza` = enumeration `FA` only
   (l. 1067-1074, value at l. 1072); attributes, verbatim l. 1084-1085:
   `kodSystemowy … use="required" fixed="FA (3)"` and `wersjaSchemy … use="required" fixed="1-0E"`.
   Note the **space** in `FA (3)`. `FA(3)` fails (xmllint: „The value 'FA(3)' does not match the
   fixed value constraint 'FA (3)'”, variant b). HIGH.
7. **`WariantFormularza`** (l. 1090-1096): `xsd:byte`, enumeration `3` only (l. 1093). Value `2`
   fails („not an element of the set {'3'}”, variant c). HIGH.
8. **`DataWytworzeniaFa`** (l. 1097-1107): restriction of `etd:TDataCzas` (xsd:dateTime, whiteSpace
   collapse) with `minInclusive 2025-09-01T00:00:00Z` (l. 1103) and
   `maxInclusive 2050-01-01T23:59:59Z` (l. 1104). `2025-08-31T23:59:59Z` fails (variant e). Info
   Sheet §2.9: format `YYYY-MM-DDTHH:MM:SS`, append `Z` for UTC. Observation: a value **without**
   `Z` (`2026-11-13T10:00:00`) passed both xmllint 2.9.14 and our CLI (variant e2); whether KSeF
   accepts it is **UNVERIFIED**. Info Sheet §4.1 NOTE: may differ from `P_1` and from the date of
   delivery to KSeF.
9. **`SystemInfo`** (l. 1108): optional, `tns:TZnakowy` (1-256 chars), „Nazwa systemu
   teleinformatycznego, z którego korzysta podatnik”.

### B. Imported / included schemas

1. **Chain (verbatim from files):**
   - `schemat.xsd` l. 2:
     `<xsd:import namespace="http://crd.gov.pl/xml/schematy/dziedzinowe/mf/2022/01/05/eD/DefinicjeTypy/" schemaLocation="http://crd.gov.pl/xml/schematy/dziedzinowe/mf/2022/01/05/eD/DefinicjeTypy/StrukturyDanych_v10-0E.xsd"/>`
     → **import** (different namespace).
   - `StrukturyDanych_v10-0E.xsd` (2nd line):
     `<xsd:include schemaLocation="http://crd.gov.pl/xml/schematy/dziedzinowe/mf/2022/01/05/eD/DefinicjeTypy/ElementarneTypyDanych_v10-0E.xsd"/>`
     → **include** (same namespace `…/DefinicjeTypy/`).
   - `ElementarneTypyDanych_v10-0E.xsd` (2nd line):
     `<xsd:include schemaLocation="http://crd.gov.pl/xml/schematy/dziedzinowe/mf/2022/01/05/eD/DefinicjeTypy/KodyKrajow_v10-0E.xsd"/>`
     → **include**.
   - `KodyKrajow_v10-0E.xsd`: no import/include. All `schemaLocation`s in the bundled
     (crd.gov.pl-origin) files are absolute **`http://`** URLs. Consistent with
     `walidacja-xml-fa3.md` fact 9.
2. **Four files total;** FA(3)-specific is only `schemat.xsd`. The three `DefinicjeTypy` files sit
   under the dated path `…/dziedzinowe/mf/2022/01/05/eD/DefinicjeTypy/` and are shared: the CIRFMF
   FA(2) schema imports the same `StrukturyDanych_v10-0E.xsd` URL (`schemat_FA(2)_v1-0E.xsd` l. 2,
   fetched 2026-11-13). HIGH.
3. **CIRFMF copy differs only in include paths.** In `CIRFMF/ksef-api/faktury/schemy/FA/bazowe/` the
   includes are relative (`schemaLocation="ElementarneTypyDanych_v10-0E.xsd"`,
   `schemaLocation="KodyKrajow_v10-0E.xsd"`); the main `schemat_FA(3)_v1-0E.xsd` is byte-identical
   to ours and still imports `StrukturyDanych` from the absolute `http://crd.gov.pl/…` URL (diff
   2026-11-13). That is why xmllint needs a catalog → link to walidacja guide.
4. **Main schema redefines some type names locally.** `schemat.xsd` has its own `tns:TZnakowy`
   (1-256 chars, l. 1170-1178) while `etd:TZnakowy` is 1-240 (`ElementarneTypyDanych` l. 7-15);
   FA(3) elements use `tns:TZnakowy`. Likewise FA(3) `tns:TAdres` (l. 1115: `KodKraju`, `AdresL1`,
   optional `AdresL2`, `GLN`) is not the `etd:TAdres` (`AdresPol`/`AdresZagr` choice) from
   `StrukturyDanych`. When reading types, check the prefix. HIGH.

### C. Since when FA(3) applies; FA(2) pointers

1. **Dates (Tier 2):** Information Sheet §1.2 (EN conversion, `fa3-information-sheet.md` l. 40-41):
   „The logical structure FA(2), effective from 1 September 2023, was used until 31 January 2026.” /
   „From 1 February 2026, the logical structure FA(3) is the binding structured invoice template.”
   Same in `fa2-vs-fa3.md` 1.1 and in PL broszura (wstęp „Wzór faktury ustrukturyzowanej”, s. 3-4,
   per `fa2-vs-fa3.md` 2026-10-18 update). PL verbatim NOT re-read today (PDF unreachable). HIGH.
2. **Applies to corrections of FA(2)/FA(1) invoices and to settlement invoices for pre-February
   advances** (§1.2 CRITICAL RULE box, `fa3-information-sheet.md` l. 45-50). HIGH.
3. **FA(2) vs FA(3) pointers (schema-to-schema diff, CIRFMF files fetched 2026-11-13), for one
   paragraph + link to `/blog/fa2-vs-fa3-ksef`:**
   - namespace FA(2) `http://crd.gov.pl/wzor/2023/06/29/12648/` (FA(2) xsd l. 1) vs FA(3)
     `…/2025/06/25/13775/`. This upgrades `fa2-vs-fa3.md` 2.2 from MEDIUM to HIGH.
   - `kodSystemowy` `FA (2)` (FA(2) l. 1079) vs `FA (3)`; `wersjaSchemy` is `1-0E` in **both**
     (FA(2) l. 1080) — answers `fa2-vs-fa3.md` Unsettled Q3; `WariantFormularza` `2` (FA(2) l. 1088)
     vs `3`.
   - `DataWytworzeniaFa` min `2022-01-01T00:00:00Z` (FA(2) l. 1098) vs `2025-09-01T00:00:00Z`.
   - FA(2) has **no** `JST`, `GV`, `Zalacznik`, `IPKSeF` elements (grep count 0); FA(3) adds them.
   - FA(2) top level: `Naglowek`, `Podmiot1`, `Podmiot2`, `Podmiot3` (0..100), `PodmiotUpowazniony`,
     `Fa`, `Stopka` (FA(2) l. 2082-3601) — FA(3) adds `Zalacznik`.
   - `StatusInfoPodatnika` (FA(2) l. 2142) and `StanPrzed` (FA(2) l. 3118) **already existed in
     FA(2)** → `fa2-vs-fa3.md` 5.3 / 5.5 must not be presented as new in FA(3).
   - `P_12` rates FA(2): `23 22 8 7 5 4 3 0 zw oo np` (FA(2) `TStawkaPodatku` l. 1839ff.) vs FA(3)
     `0 KR`, `0 WDT`, `0 EX`, `np I`, `np II` instead of `0`/`np` (fact E8).
   - `TRodzajFaktury` enum identical in both (VAT, KOR, ZAL, ROZ, UPR, KOR_ZAL, KOR_ROZ). Confidence
     HIGH (direct file comparison). Not a full diff; do not claim completeness.

### D. Top-level sequence of `Faktura` (l. 2125-3947, one `xsd:sequence`, order is strict)

| #   | Element              | Card.  | Line | Schema documentation / holds                                                                                                             | Key required children (if element present)                                                                                              |
| --- | -------------------- | ------ | ---- | ---------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `Naglowek`           | 1      | 2126 | „Nagłówek” (type `TNaglowek`, l. 1075)                                                                                                   | `KodFormularza`, `WariantFormularza`, `DataWytworzeniaFa` (`SystemInfo` optional)                                                       |
| 2   | `Podmiot1`           | 1      | 2131 | „Dane podatnika. Imię i nazwisko lub nazwa sprzedawcy towarów lub usług”                                                                 | `DaneIdentyfikacyjne` (`NIP` + `Nazwa`, type `TPodmiot1` l. 1541), `Adres` (l. 2152, required)                                          |
| 3   | `Podmiot2`           | 1      | 2194 | „Dane nabywcy”                                                                                                                           | `DaneIdentyfikacyjne` (`TPodmiot2`), `JST` (l. 2254), `GV` (l. 2276); `Adres` optional (l. 2210)                                        |
| 4   | `Podmiot3`           | 0..100 | 2299 | „Dane podmiotu/-ów trzeciego/-ich (innego/-ych niż sprzedawca i nabywca …), związanego/-ych z fakturą”                                   | `DaneIdentyfikacyjne` (`TPodmiot3`), and a choice `Rola` (`TRolaPodmiotu3`) or `RolaInna`=1 + `OpisRoli` (l. 2354-2372)                 |
| 5   | `PodmiotUpowazniony` | 0..1   | 2386 | „Dane podmiotu upoważnionego, związanego z fakturą”                                                                                      | `DaneIdentyfikacyjne` (`TPodmiot1`: NIP + Nazwa), `Adres`, `RolaPU` (l. 2431)                                                           |
| 6   | `Fa`                 | 1      | 2439 | „Na podstawie art. 106a - 106q ustawy. Pola dotyczące wartości sprzedaży i podatku wypełnia się w walucie, w której wystawiono fakturę…” | see E                                                                                                                                   |
| 7   | `Stopka`             | 0..1   | 3734 | „Pozostałe dane na fakturze”                                                                                                             | none (inner sequence `minOccurs="0"`): `Informacje` 0..3 (`StopkaFaktury`, `etd:TTekstowy` 1-3500), `Rejestry` 0..100 (KRS, REGON, BDO) |
| 8   | `Zalacznik`          | 0..1   | 3791 | „Załącznik do faktury VAT”                                                                                                               | `BlokDanych` 1..1000 (l. 3797) → `MetaDane` 1..1000 (`ZKlucz`, `ZWartosc`), optional `ZNaglowek`, `Tekst`, `Tabela` 0..1000             |

- Cardinalities: Information Sheet §3.1 table agrees (Naglowek, Podmiot1, Podmiot2, Fa mandatory;
  Podmiot3 optional max 100; PodmiotUpowazniony „Conditional”; Stopka, Zalacznik optional). HIGH.
- **No `xsd:unique`/`xsd:key`/`keyref`** anywhere in `schemat.xsd` (grep count 0): e.g. uniqueness
  of `NrWierszaFa` is not enforced by the XSD. HIGH.
- **`Podmiot2/DaneIdentyfikacyjne` choice** (`TPodmiot2`, l. 1558-1616): exactly one of `NIP` |
  (`KodUE` + `NrVatUE`) | (optional `KodKraju` + `NrID`) | `BrakID` (=1); then optional `Nazwa`.
  Polish NIP of the buyer belongs in `NIP` (Info Sheet §2.10 CRITICAL RULE) — XSD cannot enforce
  that.
- **`Podmiot2/JST` and `GV` are mandatory** (no `minOccurs`, l. 2254, 2276), each integer enum `1`
  (Tak) / `2` (Nie). Schema doc for JST, verbatim: „Wartość "1" oznacza, że faktura dotyczy
  jednostki podrzędnej JST. W takim przypadku, aby udostępnić fakturę jednostce podrzędnej JST,
  należy wypełnić sekcję Podmiot3, w szczególności podać NIP lub ID-Wew i określić rolę jako 8.”
  Missing `JST` → xmllint „Element 'GV': This element is not expected.” (variant a). The Podmiot3
  dependency is NOT expressed in XSD (it is a semantic rule; our validator `PODMIOT2_JST_MISSING`
  etc.).
- **`TRolaPodmiotu3`** (l. 1730-1791) values: 1 Faktor, 2 Odbiorca, 3 Podmiot pierwotny, 4 Dodatkowy
  nabywca, 5 Wystawca faktury, 6 Dokonujący płatności, 7 JST – wystawca, 8 JST – odbiorca, 9 Członek
  grupy VAT – wystawca, 10 Członek grupy VAT – odbiorca, 11 Pracownik.
- **`Podmiot1` optional extras** (l. 2137-2190): `PrefiksPodatnika` (fixed `PL`), `NrEORI`,
  `AdresKoresp`, `DaneKontaktowe` 0..3 (`Email`, `Telefon`), `StatusInfoPodatnika`.
- **Zalacznik operational limits (link only):** only batch session, prior e-Urząd Skarbowy
  notification, 3 MB limit with attachments (`walidacja-xml-fa3.md` facts 16, 19); content
  restrictions in Info Sheet §16.1 („tax-related data only”; price lists, contracts etc. excluded;
  right revoked on misuse). HIGH.

### E. `Fa` sequence (l. 2444 onward), in schema order

1. `KodWaluty` (l. 2445) — `TKodWaluty` (l. 150), enumeration of **182** codes incl. `PLN`, `EUR`,
   `USD`; case-sensitive (`pln` fails, variant q). Required.
2. `P_1` (l. 2450) — `TDataT`, „Data wystawienia, z zastrzeżeniem art. 106na ust. 1 ustawy”.
   Required.
3. `P_1M` (l. 2455) — optional, place of issue. Must come **after** `P_1` (variant o: placing it
   before → „Element 'P_1M': This element is not expected. Expected is ( …P_1 )”).
4. `P_2` (l. 2460) — `TZnakowy` (1-256), „Kolejny numer faktury, nadany w ramach jednej lub więcej
   serii, który w sposób jednoznaczny identyfikuje fakturę”. Required. 257 chars fail (variant s).
5. `WZ` 0..1000 (l. 2465).
6. **`xsd:choice minOccurs="0"`** (l. 2470): `P_6` (`TDataT`) **or** `OkresFa` (`P_6_Od` +
   `P_6_Do`), or neither. `P_6` doc verbatim: „…o ile taka data jest określona i różni się od daty
   wystawienia faktury. Pole wypełnia się w przypadku, gdy dla wszystkich pozycji faktury data jest
   wspólna” (l. 2473). Our skeleton omits it (delivery date = issue date). Same reading in
   `kurs-waluty-art-31a.md` (art. 106e ust. 1 pkt 6). HIGH.
7. **Tax groups — each inside its own `xsd:sequence minOccurs="0"`:**
   - l. 2496: `P_13_1` + `P_14_1` (both required **inside** the group) + optional `P_14_1W`; doc:
     „Pola wypełniane w przypadku wystąpienia na fakturze sprzedaży objętej stawką podstawową -
     aktualnie 23% albo 22%, z wyłączeniem procedury marży”.
   - l. 2516: `P_13_2` + `P_14_2` + opt. `P_14_2W` (first reduced rate, 8%/7% per Info Sheet §9.3).
   - l. 2536: `P_13_3` + `P_14_3` + opt. `P_14_3W` (5%).
   - l. 2556: `P_13_4` + `P_14_4` + opt. `P_14_4W` (taxi lump sum per §9.3).
   - l. 2576: `P_13_5` + **optional** `P_14_5` (OSS, §9.3).
   - Consequence (tested): the whole group may be absent (variant n validates under XSD), but if
     `P_13_1` is present `P_14_1` must follow (variant h: „Element 'P_15': This element is not
     expected. Expected is ( …P_14_1 )”). HIGH.
8. Single optional elements: `P_13_6_1`, `P_13_6_2`, `P_13_6_3`, `P_13_7`, `P_13_8`, `P_13_9`,
   `P_13_10`, `P_13_11` (l. 2591-2630).
9. `P_15` (l. 2631) — `TKwotowy`, **required**, „Kwota należności ogółem…”. Negative value is
   XSD-valid (pattern allows `-`; variant t validates in xmllint).
10. `KursWalutyZ` (l. 2636) — optional, `TIlosci`.
11. **`Adnotacje`** (l. 2641) — required, „Inne adnotacje na fakturze”; all children required, in
    this order:
    - `P_16` (l. 2647, `TWybor1_2`) „metoda kasowa” 1/2
    - `P_17` (l. 2652) „samofakturowanie” 1/2
    - `P_18` (l. 2657) „odwrotne obciążenie” 1/2
    - `P_18A` (l. 2662) mechanizm podzielonej płatności 1/2 (doc: „…kwota należności ogółem
      przekracza kwotę 15 000 zł…”)
    - `Zwolnienie` (l. 2668): choice `P_19`=1 + one of `P_19A`/`P_19B`/`P_19C` | `P_19N`=1
    - `NoweSrodkiTransportu` (l. 2703): choice `P_22`=1 + `P_42_5` + `NowySrodekTransportu` 1..10000
      | `P_22N`=1
    - `P_23` (l. 2827) procedura uproszczona (trójstronna) 1/2
    - `PMarzy` (l. 2832): choice `P_PMarzy`=1 + one of `P_PMarzy_2`/`_3_1`/`_3_2`/`_3_3` |
      `P_PMarzyN`=1 `TWybor1` = byte enum `1`; `TWybor1_2` = byte enum `1`,`2`
      (`ElementarneTypyDanych` l. 333-349). Dropping `P_23` → „Element 'PMarzy': This element is not
      expected. Expected is ( …P_23 )” (variant p). HIGH.
12. `RodzajFaktury` (l. 2875) — required, `TRodzajFaktury` (fact F9).
13. Correction block — `xsd:sequence minOccurs="0"` (l. 2880): `PrzyczynaKorekty`, `TypKorekty`,
    `DaneFaKorygowanej` 1..50000 (within the block), `OkresFaKorygowanej`, `NrFaKorygowany`,
    `Podmiot1K`, `Podmiot2K` 0..101, `P_15ZK`/`KursWalutyZK`. Link to correction content, do not
    detail.
14. `ZaliczkaCzesciowa` 0..31 (l. 3008), `FP` (l. 3032), `TP` (l. 3037), `DodatkowyOpis` 0..10000
    (`TKluczWartosc`, l. 3042), `FakturaZaliczkowa` 0..100 (l. 3047), `ZwrotAkcyzy` (l. 3073).
15. **`FaWiersz` 0..10000** (l. 3078). Inside: only `NrWierszaFa` (`TNaturalny`, l. 3084) is
    required; `P_7`, `P_8A`, `P_8B`, `P_9A`, `P_11`, `P_12` etc. are all `minOccurs="0"` with docs
    such as „Pole opcjonalne dla przypadków określonych w art. 106e ust. 2 i 3 oraz ust. 5 pkt 3
    ustawy”. Schema doc on `FaWiersz` (l. 3080): „węzeł opcjonalny dla faktury zaliczkowej, faktury
    korygującej fakturę zaliczkową oraz faktur korygujących … o których mowa w art. 106j ust. 3”. So
    the XSD lets a `VAT` invoice omit `FaWiersz` entirely (variant l validates in xmllint AND in our
    CLI). Info Sheet §10.1 lists only those cases as optional → for a plain VAT invoice lines are
    expected, but that is MF guidance, not XSD. Confidence: HIGH (XSD), MEDIUM („required for VAT”
    reading).
16. Later optional blocks: `Rozliczenie` (l. 3212), `Platnosc` (l. 3281; `TerminPlatnosci` 0..100,
    `FormaPlatnosci`, `RachunekBankowy` 0..100, `RachunekBankowyFaktora` 0..20, `Skonto`,
    `LinkDoPlatnosci`, `IPKSeF`), `WarunkiTransakcji` (l. 3441), `Zamowienie` (l. 3608,
    `ZamowienieWiersz` 1..10000).

### F. Key simple types (exact XSD)

Note: `\|` in the table cells below is Markdown table escaping; the XSD patterns contain a plain `|`
(copy patterns from the lines cited, not from this table).

| Type                              | Where                              | Base                   | Facets (verbatim)                                                                              | Notes                                                                                              |
| --------------------------------- | ---------------------------------- | ---------------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `TKwotowy`                        | l. 1142-1151                       | `xsd:decimal`          | `totalDigits 18`, `fractionDigits 2`, pattern `-?([1-9]\d{0,15}\|0)(\.\d{1,2})?` (l. 1149)     | doc „18 znaków max, w tym 2 znaki po przecinku”; max 16 integer digits; no leading zeros; dot only |
| `TKwotowy2`                       | l. 1152-1161                       | `xsd:decimal`          | `totalDigits 22`, `fractionDigits 8`, pattern `-?([1-9]\d{0,13}\|0)(\.\d{1,8})?` (l. 1159)     | used by `P_9A`, `P_9B`, `P_10`, `P_9AZ`; max 14 integer digits                                     |
| `TIlosci`                         | l. 1245-1254                       | `xsd:decimal`          | `totalDigits 22`, `fractionDigits 6`, pattern `-?([1-9]\d{0,15}\|0)(\.\d{1,6})?` (l. 1252)     | `P_8B`, `KursWaluty`, `KursWalutyZ/ZK/ZW`, `KursUmowny`, `P_8BZ`                                   |
| `TZnakowy` (tns)                  | l. 1170-1178                       | `xsd:token`            | `minLength 1`, `maxLength 256`                                                                 | `etd:TZnakowy` is 240 — different type                                                             |
| `TZnakowy2` / `20` / `50` / `512` | l. 1179 / 1188 / 1197 / 1206       | `xsd:token`            | 0-256 / 1-20 / 1-50 / 1-512                                                                    | `Nazwa`, `AdresL1`, `P_7` = 512                                                                    |
| `TDataT`                          | l. 1264-1272                       | `etd:TData`            | `minInclusive 2006-01-01` (l. 1269), `maxInclusive 2050-01-01` (l. 1270)                       | `P_1`, `P_6`, `P_6_Od/Do`, `P_6A`, `DataWystFaKorygowanej`, `P_6Z`                                 |
| `TData` (tns)                     | l. 1255-1263                       | `etd:TData`            | 2016-07-01 .. 2050-01-01                                                                       | e.g. `DataZaplaty`, `Termin`                                                                       |
| `TDataU`                          | l. 1273-1281                       | `etd:TData`            | 1990-01-01 .. 2050-01-01                                                                       | `DataUmowy`, `DataZamowienia`                                                                      |
| `TDataCzas` (tns)                 | l. 1282-1290                       | `etd:TDataCzas`        | 2021-10-01T00:00:00Z .. 2050-01-01T23:59:59Z                                                   | transport times; `DataWytworzeniaFa` has its own 2025-09-01 min (fact A8)                          |
| `etd:TData`                       | `ElementarneTypyDanych` l. 97-106  | `xsd:date`             | 1900-01-01 .. 2050-12-31, pattern `((\d{4})-(\d{2})-(\d{2}))`                                  | pattern forbids timezone suffix on dates                                                           |
| `etd:TNrNIP`                      | `ElementarneTypyDanych` l. 152-159 | `xsd:string`           | pattern `[1-9]((\d[1-9])\|([1-9]\d))\d{7}`                                                     | 10 digits, first ≠ 0, digits 2-3 not both 0; **no checksum**                                       |
| `TKodWaluty`                      | l. 150ff.                          | `xsd:normalizedString` | enumeration, 182 values                                                                        | ISO 4217 style, upper case                                                                         |
| `TKodyKrajowUE`                   | l. 3ff.                            | `xsd:normalizedString` | 28 values: AT BE BG CY CZ DK EE FI FR DE EL HR HU IE IT LV LT LU MT NL PL PT RO SK SI ES SE XI | Greece = `EL`, Northern Ireland = `XI`                                                             |
| `etd:TKodKraju`                   | `KodyKrajow_v10-0E.xsd`            | `xsd:normalizedString` | 254 enumeration values                                                                         | used by `Adres/KodKraju`                                                                           |
| `TNrVatUE`                        | l. 1291-1298                       | `xsd:string`           | pattern `(\d\|[A-Z]\|\+\|\*){1,12}`                                                            | without country prefix (prefix in `KodUE`)                                                         |
| `TNIPIdWew`                       | l. 1299-1306                       | `TZnakowy20`           | pattern `[1-9]((\d[1-9])\|([1-9]\d))\d{7}-\d{5}`                                               | `Podmiot3/IDWew`                                                                                   |
| `TNumerKSeF`                      | l. 1215-1222                       | `xsd:token`            | pattern (NIP/`M\d{9}`/`[A-Z]{3}\d{7}`)-date-hex blocks, optional middle hyphen                 | see `fa2-vs-fa3.md` 2026-10-18 update 1                                                            |
| `TNrRB`                           | l. 1307-1315                       | `xsd:string`           | length 10-34                                                                                   | no format check in XSD                                                                             |

**F9. `TRodzajFaktury`** (l. 1800-1841, base `tns:TZnakowy`): `VAT` (l. 1805, „Faktura podstawowa”),
`KOR` (1810, „Faktura korygująca”), `ZAL` (1815, zaliczkowa), `ROZ` (1820, „art. 106f ust. 3”),
`UPR` (1825, „art. 106e ust. 5 pkt 3”), `KOR_ZAL` (1830), `KOR_ROZ` (1835). `FV` fails (variant m).

**F10. `TStawkaPodatku`** (l. 1864-1912, base `tns:TZnakowy`): `23`, `22`, `8`, `7`, `5`, `4`, `3`,
`0 KR` („Stawka 0% w przypadku sprzedaży … na terytorium kraju (z wyłączeniem WDT i eksportu)”),
`0 WDT`, `0 EX`, `zw`, `oo` („odwrotne obciążenie”), `np I`, `np II` (l. 1869-1906). `23%` fails
(variant j). Values contain spaces (`0 KR`, `np I`). HIGH.

**F11. Decimal precision cross-check:** Info Sheet §2.6 (2 / 6 / 8 decimal places) matches the XSD
types above. Info Sheet §2.5: no thousand separators, dot as decimal separator (`1230,00` fails:
„not a valid value of the atomic type …TKwotowy”, variant i2). HIGH.

### G. Minimal valid skeleton (tested 2026-11-13)

File: `docs/knowledge-base/briefs/assets/schemat-xsd-fa3-minimalna-faktura.xml` (verbatim below).
Fake data. NIPs `1112223332` (seller) and `9876543210` (buyer) were chosen because they pass the NIP
checksum (weights 6,5,7,2,3,4,5,6,7, mod 11; computed locally) and the `TNrNIP` pattern. Whether
these numbers are assigned to real taxpayers: **UNVERIFIED** (not checked against any registry). I
did NOT use `5260250995` (checksum valid, but likely a real public-body NIP; not verified) — the
Copywriter should not use it either. For TEST submissions MF says to use random NIPs
(`walidacja-xml-fa3.md` fact 4).

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/">
  <Naglowek>
    <KodFormularza kodSystemowy="FA (3)" wersjaSchemy="1-0E">FA</KodFormularza>
    <WariantFormularza>3</WariantFormularza>
    <DataWytworzeniaFa>2026-11-13T10:00:00Z</DataWytworzeniaFa>
  </Naglowek>
  <Podmiot1>
    <DaneIdentyfikacyjne>
      <NIP>1112223332</NIP>
      <Nazwa>Jan Testowy Usługi IT</Nazwa>
    </DaneIdentyfikacyjne>
    <Adres>
      <KodKraju>PL</KodKraju>
      <AdresL1>ul. Przykładowa 1, 00-001 Warszawa</AdresL1>
    </Adres>
  </Podmiot1>
  <Podmiot2>
    <DaneIdentyfikacyjne>
      <NIP>9876543210</NIP>
      <Nazwa>Testowa Spółka z o.o.</Nazwa>
    </DaneIdentyfikacyjne>
    <Adres>
      <KodKraju>PL</KodKraju>
      <AdresL1>ul. Testowa 2, 30-001 Kraków</AdresL1>
    </Adres>
    <JST>2</JST>
    <GV>2</GV>
  </Podmiot2>
  <Fa>
    <KodWaluty>PLN</KodWaluty>
    <P_1>2026-11-13</P_1>
    <P_2>FV/1/11/2026</P_2>
    <P_13_1>1000.00</P_13_1>
    <P_14_1>230.00</P_14_1>
    <P_15>1230.00</P_15>
    <Adnotacje>
      <P_16>2</P_16>
      <P_17>2</P_17>
      <P_18>2</P_18>
      <P_18A>2</P_18A>
      <Zwolnienie>
        <P_19N>1</P_19N>
      </Zwolnienie>
      <NoweSrodkiTransportu>
        <P_22N>1</P_22N>
      </NoweSrodkiTransportu>
      <P_23>2</P_23>
      <PMarzy>
        <P_PMarzyN>1</P_PMarzyN>
      </PMarzy>
    </Adnotacje>
    <RodzajFaktury>VAT</RodzajFaktury>
    <FaWiersz>
      <NrWierszaFa>1</NrWierszaFa>
      <P_7>Usługa programistyczna</P_7>
      <P_8A>szt.</P_8A>
      <P_8B>1</P_8B>
      <P_9A>1000.00</P_9A>
      <P_11>1000.00</P_11>
      <P_12>23</P_12>
    </FaWiersz>
  </Fa>
</Faktura>
```

Notes for the Copywriter:

- `P_18A` = 2 is correct here only because `P_15` is 1 230 zł (MPP threshold doc: „przekracza kwotę
  15 000 zł”, l. 2662 doc; details in `mpp-split-payment-ksef.md`).
- `Podmiot2/Adres` is optional in XSD but kept for realism; `Podmiot1/Adres` is required.
- `P_6` omitted on purpose (fact E6). `Platnosc` omitted (optional). `SystemInfo` omitted
  (optional).
- „Minimal” = minimal for XSD + our semantic rules for this scenario, not „everything MF requires
  for every invoice” (e.g. `FaWiersz` is XSD-optional, see E15).

**G1. Validator CLI** (repo build of `@ksefuj/validator` 0.4.0; invocation from `cli.ts` l. 8-9,
24-25: `ksef-validate <file.xml>` = `node packages/validator/dist/cli.js <file>`), run from repo
root:

```
$ node packages/validator/dist/cli.js docs/knowledge-base/briefs/assets/schemat-xsd-fa3-minimalna-faktura.xml

✅ /home/user/ksefuj/docs/knowledge-base/briefs/assets/schemat-xsd-fa3-minimalna-faktura.xml
  No errors or warnings
exit=0
```

With `--verbose --assertions` (abridged: first 3 and last line of 37 assertions):

```
✅ …/schemat-xsd-fa3-minimalna-faktura.xml
  ✓ 37 validations passed
    • XML document is well-formed
    • Document conforms to FA(3) XSD schema
    • Check JST is present in Podmiot2
    …
    • Check negative quantities only in corrective invoices
  No errors or warnings
  ⏱  Validation time: 56ms
exit=0
```

`--json`: `valid true`, `issues` length 0, metadata
`{"validationTimeMs":67,"rulesExecuted":2,"elementsValidated":0,"schemaVersion":"FA(3) 2025-06-25","validatorVersion":"0.4.0"}`.
**Errors: 0. Warnings: 0.**

**G2. xmllint** (libxml 20914 = 2.9.14), CIRFMF files (main + `bazowe/`) with the catalog exactly as
in the walidacja guide:

```
$ XML_CATALOG_FILES=catalog.xml xmllint --noout --nonet --schema "schemat_FA(3)_v1-0E.xsd" faktura.xml
faktura.xml validates
exit=0
```

### H. What the XSD does and does not catch (tested variants of the skeleton, 2026-11-13)

xmllint = pure XSD (catalog setup above); CLI = our validator (XSD + semantic + extra).

| Variant                                                       | xmllint                                                   | Our CLI                                                                                |
| ------------------------------------------------------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| a. `JST` removed                                              | FAIL („Element 'GV': This element is not expected”)       | FAIL `UNEXPECTED_ELEMENT` + `PODMIOT2_JST_MISSING`                                     |
| b. `kodSystemowy="FA(3)"`                                     | FAIL (fixed value 'FA (3)')                               | FAIL `SCHEMA_VALIDATION_FAILED`                                                        |
| c. `WariantFormularza` 2                                      | FAIL (enumeration {'3'})                                  | not run                                                                                |
| d1. `P_1` 2005-12-31 / d2. 2050-01-02                         | FAIL (minInclusive 2006-01-01 / maxInclusive 2050-01-01)  | not run                                                                                |
| d3. `P_1` 2006-01-01                                          | validates                                                 | valid, 0 issues (KSeF's own date rule: link walidacja fact 14)                         |
| e. `DataWytworzeniaFa` 2025-08-31T23:59:59Z                   | FAIL (minInclusive)                                       | not run                                                                                |
| e2. `DataWytworzeniaFa` without `Z`                           | validates                                                 | valid, 0 issues                                                                        |
| f1. NIP `0112223332` / f2. `1002223332` / f4. `111-222-33-32` | FAIL (pattern)                                            | not run                                                                                |
| f3. NIP `1112223333` (bad checksum)                           | **validates**                                             | **valid, 0 issues** (our validator has no NIP checksum rule; KSeF checks on PROD only) |
| h. `P_13_1` without `P_14_1`                                  | FAIL (expected P_14_1)                                    | not run                                                                                |
| i1. `P_15` 1230.001 / i2. `1230,00`                           | FAIL (fractionDigits / atomic type)                       | not run                                                                                |
| i3. `P_8B` 7 decimals / i4. `P_9A` 9 decimals                 | FAIL (fractionDigits 6 / 8)                               | not run                                                                                |
| j. `P_12` `23%`                                               | FAIL (enumeration)                                        | not run                                                                                |
| k. FA(2) namespace                                            | FAIL („No matching global declaration…”)                  | FAIL `WRONG_NAMESPACE`                                                                 |
| l. no `FaWiersz` at all                                       | **validates**                                             | **valid, 0 issues**                                                                    |
| m. `RodzajFaktury` FV                                         | FAIL (enumeration)                                        | not run                                                                                |
| n. no `P_13_1`/`P_14_1` (P_15 still 1230.00)                  | **validates**                                             | **valid, 0 issues**                                                                    |
| o. `P_1M` before `P_1`                                        | FAIL (order)                                              | not run                                                                                |
| p. `P_23` removed                                             | FAIL (expected P_23)                                      | not run                                                                                |
| q. `KodWaluty` `pln`                                          | FAIL (enumeration)                                        | not run                                                                                |
| r. empty `Nazwa`                                              | FAIL (minLength 1)                                        | not run                                                                                |
| s. `P_2` 257 chars                                            | FAIL (maxLength 256)                                      | not run                                                                                |
| t. `P_15` -1230.00                                            | **validates**                                             | FAIL `TAX_CALCULATION_MISMATCH` („P_15 should be 1230.00”)                             |
| u. `xmlns="https://…"`                                        | FAIL („No matching global declaration…”)                  | FAIL `WRONG_NAMESPACE`                                                                 |
| v. MF-style root with extra `xmlns:etd`, `xmlns:xsi`          | validates                                                 | not run                                                                                |
| w. only root prefixed `tns:`                                  | FAIL („Element 'Naglowek': This element is not expected”) | not run                                                                                |

Usable claims: „XSD sprawdza kolejność, obecność, typy, wzorce i słowniki; nie sprawdza sumy
kontrolnej NIP, rachunków ani tego, czy faktura VAT ma pozycje”. Do NOT claim our validator catches
variants l and n (it does not; see Internal notes).

### I. CLI and npm package facts (internal, not MF)

1. Commands (README l. 19-22; `cli.ts` l. 8-10): `npx @ksefuj/validator faktura.xml`,
   `npx @ksefuj/validator --batch ./faktury/`. Options (`cli.ts` l. 27-31): `--help`, `--json`,
   `--assertions`, `--verbose`. Bin name `ksef-validate` → `./dist/cli.js` (`package.json` l. 26-28;
   npm 0.4.0 metadata same).
2. Exit codes: `0` when all files valid, `1` otherwise (`cli.ts` l. 132); `1` also on missing file
   argument (l. 122-126) and on an uncaught error (l. 135-138); `--help` or no args prints usage and
   exits `0` (l. 19-34). `--batch` reads `*.xml` (case-insensitive extension) in one directory, not
   recursive (l. 107-110).
3. **Schemas bundled, offline:** README l. 5-7 („no network requests (the schemas are bundled)”), l.
   147-149 (XSD compiled into `schemas-data.ts`, „only the compiled bundle ships in the npm
   package”). Verified: npm tarball 0.4.0 contains `dist/schemas/schemas-data.js` and no `.xsd`;
   `package.json` `files` excludes `dist/**/*.xsd` (l. 38-48). The four bundled strings in
   `dist/schemas/schemas-data.js` are byte-equal to the four `.xsd` files in `src/schemas/`
   (compared 2026-11-13). Runtime resolution: `src/xsd.ts` l. 93-116 registers each bundled schema
   under its `SCHEMA_URLS` URL and its file name via libxml2-wasm `XmlBufferInputProvider`.
4. npm latest `0.4.0`, published 2026-10-08T09:47:12Z (registry, fetched 2026-11-13).

### J. How the repo downloads schemas

1. `pnpm update-schemas` = `tsx scripts/update-schemas.ts` (root `package.json` l. 31).
2. URLs fetched (`scripts/update-schemas.ts` l. 59-66, all **https**):
   - `https://crd.gov.pl/wzor/2025/06/25/13775/schemat.xsd`
   - `https://crd.gov.pl/xml/schematy/dziedzinowe/mf/2022/01/05/eD/DefinicjeTypy/StrukturyDanych_v10-0E.xsd`
   - `https://crd.gov.pl/xml/schematy/dziedzinowe/mf/2022/01/05/eD/DefinicjeTypy/ElementarneTypyDanych_v10-0E.xsd`
   - `https://crd.gov.pl/xml/schematy/dziedzinowe/mf/2022/01/05/eD/DefinicjeTypy/KodyKrajow_v10-0E.xsd`
3. Destination: `packages/validator/src/schemas/` as `schemat.xsd`, `StrukturyDanych_v10-0E.xsd`,
   `ElementarneTypyDanych_v10-0E.xsd`, `KodyKrajow_v10-0E.xsd` (l. 28, 69-74); on change it
   regenerates `src/schemas/schemas-data.ts` (l. 136-165, 239-241). A failed download falls back to
   the existing file (l. 206-221). Response must start with `<?xml` (l. 97).
4. Note: the committed `schemas-data.ts` exports `SCHEMA_URLS` with **http://** URLs (l. 28-35)
   matching the `schemaLocation`s, and a „Last updated: 2026-03-13T14:37:20.852Z” header line that
   the current generator template (l. 137-157) does not emit. See Internal notes.

---

## Unsettled Questions

- Bundled copy vs crd.gov.pl **today**: not compared (proxy 403). Only vs CIRFMF (identical).
- Whether KSeF accepts `DataWytworzeniaFa` without `Z` / with a non-UTC offset: XSD tool accepted
  it; KSeF behaviour not documented in corpus.
- Whether the PL broszura §„Naglowek” writes `FA (3)` or `FA(3)`: the EN conversion
  (`fa3-information-sheet.md` §4.1 l. 167) shows `FA(3)` without space; `fa2-vs-fa3.md` 3.1 quotes
  the same section as „`FA (3)`”; `bledy-walidacji-fa3.md` l. 175 quotes `FA(3)`. PDF not
  re-readable today. The XSD (`fixed="FA (3)"`) is authoritative; write `FA (3)` and cite the XSD.
- Whether KSeF rejects a `VAT` invoice without `FaWiersz` or without the `P_13_x`/`P_14_x` group
  matching the lines: not documented (KSeF does not check arithmetic, `walidacja-xml-fa3.md` fact
  31).
- Whether NIPs `1112223332` / `9876543210` belong to real entities: not checked.
- Why the 2006-01-01 lower bound of `TDataT` / 2050 upper bound: not explained by MF; state as facts
  only.

## Suggested Sources Section

- Struktura logiczna FA(3), `schemat.xsd` (crd.gov.pl):
  https://crd.gov.pl/wzor/2025/06/25/13775/schemat.xsd (not fetchable from here today; URL from
  `scripts/update-schemas.ts` and Broszura §1.2)
- MF / CIRF, schemat FA(3) w repozytorium KSeF API:
  https://github.com/CIRFMF/ksef-api/blob/main/faktury/schemy/FA/schemat_FA(3)_v1-0E.xsd
- MF / CIRF, schematy bazowe (`StrukturyDanych`, `ElementarneTypyDanych`, `KodyKrajow`):
  https://github.com/CIRFMF/ksef-api/tree/main/faktury/schemy/FA/bazowe
- MF / CIRF, schemat FA(2) (dla porównania):
  https://github.com/CIRFMF/ksef-api/blob/main/faktury/schemy/FA/schemat_FA(2)_v1-0E.xsd
- Broszura informacyjna dotycząca struktury logicznej FA(3), pkt 1.2, 2, 3.1, 4:
  https://ksef.podatki.gov.pl/media/nuclnu0w/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf
- Information sheet on the FA(3) logical structure (EN):
  https://ksef.podatki.gov.pl/media/f2hnwjk2/information-sheet-on-the-fa-3-logical-structure.pdf
- `@ksefuj/validator` (npm): https://www.npmjs.com/package/@ksefuj/validator
- Internal links: `/guides/walidacja-xml-fa3`, `/blog/fa2-vs-fa3-ksef`, `/validator` error pages
  listed above.

## Warning: Common Misconceptions

- „Namespace to `https://crd.gov.pl/…`” — wrong; the namespace string is `http://…`; https is only
  where you download the file (A3).
- „`kodSystemowy="FA(3)"`” — wrong; fixed `FA (3)` with a space (A6).
- „`wersjaSchemy` zmieniła się z FA(2) na FA(3)” — no; `1-0E` in both. `kodSystemowy` and
  `WariantFormularza` changed (C3).
- „Plik zgodny z XSD to poprawna faktura” — XSD lets through bad NIP checksum, missing lines,
  missing tax groups, negative `P_15` (H).
- „XSD wymaga `FaWiersz`” — no, `minOccurs="0"` (E15).
- „`P_13_1`/`P_14_1` są obowiązkowe” — only as a pair when the group is used (E7).
- „`StatusInfoPodatnika`/`StanPrzed` są nowe w FA(3)” — they exist in the FA(2) schema (C3).
- Stale in `fa2-vs-fa3.md` (do not copy): test URL `web2te-ksef.mf.gov.pl` (does not resolve per
  CLAUDE.md), „`ap.ksef.mf.gov.pl` is dead” (it is the KSeF 2.0 production AP per CLAUDE.md), „KSeF
  2.0 only accepts FA(3)” (TEST still accepts FA(2), `walidacja-xml-fa3.md` fact 3), VAT Act Dz.U.
  2025 poz. 775 (superseded by t.j. Dz.U. 2026 poz. 1263).
- README of the validator (l. 93-94) says „for now production still answers with an
  `X-System-Warning` header” — time-sensitive internal claim; do not reuse in the schema guide.

## Freshness Markers

- FA(3) `1-0E`, namespace `…/2025/06/25/13775/`, `DataWytworzeniaFa` min 2025-09-01 → re-check on
  any CIRFMF changelog entry touching XSD; run `pnpm update-schemas` + compare with
  `CIRFMF/ksef-api/faktury/schemy/FA` (HEAD `ce3670e` on 2026-11-13).
- Upper date bounds `2050-01-01` (TDataT, DataWytworzeniaFa) → stable, no action.
- `@ksefuj/validator` 0.4.0, CLI flags, assertion count 37 → re-check before publishing.
- Skeleton dates (`2026-11-13`) → fine for XSD until 2050; the KSeF `P_1` rule (not later than
  acceptance) means a reader copying it for a TEST submission must use today's date.

## Internal notes for the coordinator (not for the guide)

1. **Validator gap (n):** `P_15` = 1230.00 with no `P_13_x`/`P_14_x` and a 23% line passes our CLI
   with 0 issues; the arithmetic rule appears to skip when no `P_13_x` exists.
2. **Validator gap (l):** a `VAT` invoice without any `FaWiersz` passes with 0 issues although Info
   Sheet §10.1 lists `FaWiersz` as optional only for ZAL/KOR_ZAL/106j ust. 3.
3. **No NIP checksum rule** in our validator (f3) — consistent with `walidacja-xml-fa3.md` fact 41.
4. **`update-schemas.ts` vs `schemas-data.ts`:** the script would regenerate `SCHEMA_URLS` with
   **https** keys, while the XSDs import/include **http** URLs and `xsd.ts` registers buffers by
   `SCHEMA_URLS` URL (plus file name). Whether resolution still works after a regeneration
   (file-name fallback) is UNVERIFIED; worth a test before the next `pnpm update-schemas`.
