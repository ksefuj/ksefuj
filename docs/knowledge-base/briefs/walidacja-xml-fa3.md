# Research Brief: Walidacja XML FA(3) przed wysyłką do KSeF

**Requested by:** coordinator (content backlog item `walidacja-xml-fa3`, `docs/content-backlog.md`,
section "Evergreen") **Date:** 2026-11-05 **For content:** PL guide `walidacja-xml-fa3`: „Jak
sprawdzić XML FA(3) przed wysyłką do KSeF” **Persona:** Marek (developer, generuje XML), plus
księgowi, którzy szukają przyczyny odrzucenia pliku. Developer voice allowed.

**Target query:** „walidacja XML FA(3)”, „walidator KSeF”, „ksef xml schema” (where the official XSD
lives)

**Answer in two sentences:** KSeF 2.0 nie ma osobnego narzędzia „tylko do walidacji”: plik jest
sprawdzany dopiero przy wysyłce w sesji (zgodność z XSD zadeklarowanym przy otwarciu sesji, poprawny
XML 1.0 w UTF-8 bez BOM, brak instrukcji przetwarzania i niezalecanych znaków, duplikat, data P_1,
suma kontrolna NIP, rozmiar do 1 MB / 3 MB z załącznikami, uprawnienia), a lokalnie można sprawdzić
plik oficjalnym XSD FA(3) (namespace `http://crd.gov.pl/wzor/2025/06/25/13775/`, kopia też w
repozytorium MF CIRFMF/ksef-api) albo wysyłką na środowisko TEST. KSeF nie sprawdza rachunków („KSeF
nie dokonuje weryfikacji obliczeń matematycznych”), więc plik zgodny z XSD może zostać przyjęty z
błędami merytorycznymi, których KSeF nie sygnalizuje. — `faktury/weryfikacja-faktury.md`
(09.04.2026), https://github.com/CIRFMF/ksef-api/blob/main/faktury/weryfikacja-faktury.md;
Podręcznik KSeF 2.0 cz. II (06.08.2026), pkt 1.6.1, s. 18.

**What changes the answer:**

- **Strict-XML enforcement on PROD.** The four strict-XML rules (no BOM, no non-UTF-8 encoding in
  the prolog, no processing instructions, no discouraged Unicode) were announced for PROD rejection
  from 2026-10-19 only in a maintainer comment (issue #718, 2026-06-24, Tier 3). As of 2026-11-05
  `api-changelog.md` (latest 2.9.0) still says „Zaostrzenie walidacji XML zacznie obowiązywać od
  **16.07.2026**” and no CIRFMF document confirms PROD enforcement. TEST/DEMO reject since 2.4.0
  (10/13.04.2026). Write „miał zacząć odrzucać od 19.10.2026”, not „odrzuca”. Fetched live today:
  changelog and weryfikacja-faktury.md (HEAD `ce3670e`, 2026-10-14, unchanged since 2026-10-24).
  Issue #718 NOT re-read (HTTP 403).
- **Environment.** NIP checksum checks (Podmiot1/2/3/PodmiotUpowazniony and `InternalId`) „Dotyczy
  tylko środowiska produkcyjnego” → a file with a bad NIP checksum can pass on TEST and be rejected
  on PROD. TEST also accepts FA(2); DEMO and PROD only FA(3) (`srodowiska.md`).
- **Limits are adjustable.** 1 MB / 3 MB / 10 000 invoices per session carry an asterisk: if
  insufficient, „prosimy o kontakt z działem wsparcia KSeF” (`weryfikacja-faktury.md`).
- **Schema version.** Everything here is FA(3), `kodSystemowy="FA (3)"`, `wersjaSchemy="1-0E"`. A
  new schema version (new namespace on crd.gov.pl) changes the URLs and namespace.
- **Attachments.** Invoices with `Zalacznik` only in batch sessions and only after enabling the
  option in e-Urząd Skarbowy (status `415` otherwise).

## Fetch log (2026-11-05)

| URL / source                                                                                      | Fetched live?                | Result                                                                    |
| ------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------- |
| `git clone https://github.com/CIRFMF/ksef-api.git` (HEAD `ce3670e`, 2026-10-14 „update version”)  | YES                          | `git ls-remote` HEAD = `ce3670ea042d…`; history unshallowed for file logs |
| https://raw.githubusercontent.com/CIRFMF/ksef-api/main/faktury/weryfikacja-faktury.md             | YES (HTTP 200)               | identical to the clone                                                    |
| `api-changelog.md`, `open-api.json`, `srodowiska.md`, `sesja-interaktywna.md`, `limity/limity.md` | YES (from clone)             | read                                                                      |
| `faktury/schemy/FA/*.xsd` in ksef-api                                                             | YES (from clone)             | compared with our bundled XSD (see Fact 9)                                |
| `git clone https://github.com/CIRFMF/ksef-schematy.git`                                           | YES                          | README only (commit `cd826b8`, 2026-05-11)                                |
| https://github.com/CIRFMF/ksef-api/issues/718 (html and api.github.com via `gh`)                  | NO (HTTP 403)                | not re-read; facts from `ksef-scisla-walidacja-xml.md`                    |
| api.github.com (commits, issues, repo metadata)                                                   | NO (403, session not scoped) | used `git` over https instead                                             |
| https://ksef.podatki.gov.pl/ksef-na-okres-obligatoryjny/wsparcie-dla-integratorow                 | NO (proxy, no connection)    | content UNKNOWN; URL not present in KB (only the path in backlog)         |
| https://crd.gov.pl/wzor/2025/06/25/13775/schemat.xsd and the 3 imported XSD                       | NO (proxy, no connection)    | relied on bundled copies + CIRFMF copies                                  |
| https://ap-test.ksef.mf.gov.pl/web/, https://api-test.ksef.mf.gov.pl/docs/v2, ap-demo             | NO (proxy, no connection)    | KB says HTTP 200 on 2026-10-07 (`api-ksef-zmiany-cirfmf.md` fact 10)      |
| Podręcznik KSeF 2.0 cz. II PDF (ksef.podatki.gov.pl)                                              | NO                           | quoted via KB briefs (verbatim quotes recorded there)                     |
| registry.npmjs.org `@ksefuj/validator`                                                            | YES                          | latest `0.4.0`, published 2026-10-08                                      |
| Local tests: `xmllint` (libxml 2.9.14) and our CLI on official example `FA_3_Przykład_1.xml`      | YES (run locally)            | see Facts 14-17                                                           |

## Key Facts (ready to use)

### A. Is there an official standalone validator?

1. **No validate-only operation in the KSeF API.** `open-api.json` (78 paths, HEAD `ce3670e`)
   contains invoice submission (POST `/sessions/online/{ref}/invoices`, POST `/sessions/batch`),
   status endpoints and `/testdata/*` helpers; no path that validates an invoice without sending it
   in a session. The FA(3) XSD is chosen at session open: „wersji schematu faktury: […] określa,
   którą wersję XSD system będzie stosować do walidacji przesyłanych faktur.”
   (`sesja-interaktywna.md`, „1. Otwarcie sesji”). Tier 2. Confidence: HIGH (for the API); the claim
   „MF nie ma walidatora” in general is MEDIUM: MF websites were not reachable today, and absence
   was checked only in CIRFMF docs and the KB. Marek-relevant: yes. URL:
   https://github.com/CIRFMF/ksef-api/blob/main/open-api.json,
   https://github.com/CIRFMF/ksef-api/blob/main/sesja-interaktywna.md
2. **MF encourages checking before sending.** Podręcznik cz. II, pkt 1.6.1 (local extract of the
   02.2026 edition, paraphrase, not verbatim): „MF zachęca do implementacji mechanizmów
   sprawdzających zgodność pliku XML ze wzorem przed wysyłką.” Tier 2. Confidence: MEDIUM (KB
   paraphrase; PDF not re-read; no page number in the local extract). Source file:
   `docs/knowledge-base/briefs/podrecznik-ksef-20-czesc-ii.md` §1.6.1. URL (Aug 2026 edition, not
   fetched today):
   https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
3. **What MF offers instead: three environments.** `srodowiska.md` (16.03.2026):
   - **TEST** „Środowisko do testowania integracji z KSeF API 2.0, zawiera wersje RC.”, formats
     FA(2), FA(3), FA_PEF (3), FA_KOR_PEF (3); API docs https://api-test.ksef.mf.gov.pl/docs/v2.
   - **DEMO** „przeznaczone do końcowej walidacji integracji w warunkach zbliżonych do produkcji”,
     FA(3), FA_PEF (3), FA_KOR_PEF (3); https://api-demo.ksef.mf.gov.pl/docs/v2.
   - **PROD** https://api.ksef.mf.gov.pl/docs/v2. Verbatim warning: „Środowiska testowe (TE/DEMO)
     służy wyłącznie do testowania integracji z API KSeF. Nie należy przesyłać do niego **faktur
     produkcyjnych** ani rzeczywistych danych podmiotów.” Tier 2. Confidence: HIGH. URL:
     https://github.com/CIRFMF/ksef-api/blob/main/srodowiska.md
4. **TEST specifics.** Self-signed certificates allowed on TE, so „dane wprowadzone w środowisku
   `TE` nie są odizolowane i mogą być współdzielone między integratorami. Do testów należy używać
   losowych identyfikatorów NIP”; service windows on test environments 16:00-18:00 (since
   1.10.2025). Same file. Confidence: HIGH.
5. **Aplikacja Podatnika TEST / DEMO URLs.** AP test https://ap-test.ksef.mf.gov.pl/web/, AP demo
   https://ap-demo.ksef.mf.gov.pl/ (HTTP 200 on 2026-10-07 per `api-ksef-zmiany-cirfmf.md` fact 10;
   NOT fetched today). Podręcznik cz. II 3.2.1 (local extract): TEST „Dokumenty nie są fakturami i
   nie wywołują skutków prawnych”; 3.2.2 DEMO „Wymaga faktycznych uprawnień (jak produkcja).
   Niedostępne publicznie.” 3.2.3 WAŻNE: „Niedopuszczalne jest przesyłanie faktur testowych do
   środowiska produkcyjnego.” Tier 2. Confidence: HIGH (KB), URLs UNVERIFIED today.
6. **Integrator support page**
   `https://ksef.podatki.gov.pl/ksef-na-okres-obligatoryjny/wsparcie-dla-integratorow`:
   **UNVERIFIED.** Not reachable from this environment, not present as a full URL anywhere in
   `docs/knowledge-base/` or published content (only as a path in `docs/content-backlog.md`). Do not
   describe its contents and do not link it until a human opens it.
7. **Official MF repositories on GitHub (Tier 2/3).** `CIRFMF/ksef-api` README: „KSeF 2.0 -
   Przewodnik dla Integratorów” (05.05.2026), the integrator guide incl. changelog, OpenAPI and
   schemas. `CIRFMF/ksef-schematy` README: „Wspólna przestrzeń do dyskusji, interpretacji i rozwoju
   schematów faktur KSeF”, goals incl. „uzgadnianie interpretacji schematów (XSD)”; it contains only
   the README (no XSD). Confidence: HIGH. URLs: https://github.com/CIRFMF/ksef-api,
   https://github.com/CIRFMF/ksef-schematy

### B. Where the official FA(3) XSD lives

8. **Namespace and production location.** Namespace `http://crd.gov.pl/wzor/2025/06/25/13775/`
   (`targetNamespace` in `schemat.xsd`). Information Sheet §1.2: „The FA(3) logical structure in its
   production version is available at: `https://crd.gov.pl/wzor/2025/06/25/13775/`” (EN conversion,
   `packages/validator/docs/fa3-information-sheet.md`; PL broszura:
   https://ksef.podatki.gov.pl/media/nuclnu0w/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf,
   not fetched today). Main file: https://crd.gov.pl/wzor/2025/06/25/13775/schemat.xsd (URL from
   `scripts/update-schemas.ts`; not fetched today). Root element `Faktura`, `KodFormularza`
   attributes fixed `kodSystemowy="FA (3)"`, `wersjaSchemy="1-0E"`, `WariantFormularza` = `3`
   (bundled `schemat.xsd`, lines 1084-1093). Tier 2. Confidence: HIGH.
9. **The 3 imported schemas (4 files total)** — exact URLs from `scripts/update-schemas.ts`
   (`SCHEMA_URLS`):
   - main: `https://crd.gov.pl/wzor/2025/06/25/13775/schemat.xsd`
   - `https://crd.gov.pl/xml/schematy/dziedzinowe/mf/2022/01/05/eD/DefinicjeTypy/StrukturyDanych_v10-0E.xsd`
   - `https://crd.gov.pl/xml/schematy/dziedzinowe/mf/2022/01/05/eD/DefinicjeTypy/ElementarneTypyDanych_v10-0E.xsd`
   - `https://crd.gov.pl/xml/schematy/dziedzinowe/mf/2022/01/05/eD/DefinicjeTypy/KodyKrajow_v10-0E.xsd`

   Chain inside the files (namespace
   `http://crd.gov.pl/xml/schematy/dziedzinowe/mf/2022/01/05/eD/DefinicjeTypy/`, prefix `etd`):
   `schemat.xsd` **imports** StrukturyDanych → StrukturyDanych **includes** ElementarneTypyDanych →
   ElementarneTypyDanych **includes** KodyKrajow. In the crd.gov.pl copies (as bundled by us) every
   `schemaLocation` is an absolute **`http://`** (not https) URL. Confidence: HIGH (read from
   files).

10. **CIRFMF publishes the same XSD on GitHub.** `CIRFMF/ksef-api/faktury/schemy/FA/`:
    `schemat_FA(3)_v1-0E.xsd`, `schemat_FA(2)_v1-0E.xsd` and `bazowe/` with
    `StrukturyDanych_v10-0E.xsd`, `ElementarneTypyDanych_v10-0E.xsd`, `KodyKrajow_v10-0E.xsd` (also
    PEF and RR). The OpenAPI session request links FA (3) to
    https://github.com/CIRFMF/ksef-api/blob/main/faktury/schemy/FA/schemat_FA(3)_v1-0E.xsd with
    `SystemCode` „FA (3)”, `SchemaVersion` „1-0E”, `Value` „FA”. Comparison 2026-11-05 with our
    bundle (downloaded from crd.gov.pl): main schema and KodyKrajow byte-identical (ignoring CR);
    StrukturyDanych and ElementarneTypyDanych identical except whitespace and `xsd:include`
    `schemaLocation` (CIRFMF: relative, e.g. `schemaLocation="KodyKrajow_v10-0E.xsd"`; crd: absolute
    http). The CIRFMF main schema still imports StrukturyDanych from the absolute
    `http://crd.gov.pl/...` URL. Last commit touching `faktury/schemy/FA`: `23e1ce5` 2025-12-01
    „xsd: reorganize schema tree”. Tier 2. Confidence: HIGH. Marek-relevant: yes.
11. **Schema changes are announced in the changelog.** `srodowiska.md`: in the changelog
    „publikowane będą **wyłącznie zmiany mające wpływ na integrację** np. zmiany zachowań API,
    modyfikacje kontraktów, schematów XSD, limitów itp.” URL:
    https://github.com/CIRFMF/ksef-api/blob/main/api-changelog.md. Confidence: HIGH.

### C. What KSeF checks on submission (`faktury/weryfikacja-faktury.md`, dated 09.04.2026, last commit `f1f68ba` 2026-04-21)

Intro verbatim: „Faktura przesyłana do systemu KSeF podlega szeregowi kontroli technicznych i
semantycznych.” Tier 2 (MF technical documentation), not law. URL for all of section C unless
stated: https://github.com/CIRFMF/ksef-api/blob/main/faktury/weryfikacja-faktury.md (fetched live).

12. **Weryfikacja XML (all required, „łącznie”):** poprawny XML 1.0; UTF-8 bez BOM („3 pierwsze
    bajty 0xEF 0xBB 0xBF”); „zgodna z zadeklarowanym schematem podanym przy otwarciu sesji”; prolog
    allowed but „nie może wskazywać kodowania innego niż UTF-8”; „nie może zawierać instrukcji
    przetwarzania XML (processing instructions)”; no discouraged Unicode from W3C XML
    (https://www.w3.org/TR/xml/#charsets): `[#x7F-#x84]`, `[#x86-#x9F]`, `[#xFDD0-#xFDEF]`,
    `[#x1FFFE-#x1FFFF]` … `[#x10FFFE-#x10FFFF]` (planes 1-16). „Niespełnienie któregokolwiek z
    powyższych wymagań spowoduje odrzucenie faktury.” Confidence: HIGH (text); PROD enforcement date
    for the strict rules: MEDIUM, see "What changes the answer".
13. **Unikalność (duplikat):** key = `Podmiot1:NIP` + `RodzajFaktury` + `P_2`; „W przypadku
    duplikatu zwracany jest kod błędu 440 („Duplikat faktury”).”; uniqueness kept „przez okres 10
    pełnych lat, liczonych od końca roku kalendarzowego, w którym faktura została wystawiona.”
    Confidence: HIGH.
14. **Walidacja dat:** „Data wystawienia faktury (`P_1`) nie może być późniejsza niż data przyjęcia
    dokumentu do systemu KSeF.” Earlier P_1 is not an error (offline24; Podręcznik cz. II pkt 1.4,
    local extract). Confidence: HIGH.
15. **NIP checksum:** for `Podmiot1`, `Podmiot2`, `Podmiot3`, `PodmiotUpowazniony` and the NIP
    inside `Podmiot3` `InternalId`; both: „Dotyczy tylko środowiska produkcyjnego.” Confidence:
    HIGH.
16. **Rozmiar pliku:** „Maksymalny rozmiar faktury bez załączników: **1 MB \*** (1 000 000 bajtów).”
    / „z załącznikami: **3 MB \*** (3 000 000 bajtów).” Note: decimal MB (10^6 bytes), not MiB. Same
    values in `limity/limity.md` table. Confidence: HIGH.
17. **Ograniczenia ilościowe:** max 10 000 invoices per session (interactive and batch, with \*);
    batch: max 50 ZIP parts, each ≤ 100 MB (100 000 000 bytes) before encryption, whole ZIP ≤ 5 GB
    (5 000 000 000 bytes). Confidence: HIGH.
18. **Szyfrowanie and metadata:** AES-256-CBC (key 256 bit, IV 128 bit, PKCS#7), key wrapped with
    RSAES-OAEP (SHA-256/MGF1); interactive session verifies hash + size of the invoice and of the
    encrypted invoice. Confidence: HIGH. Marek-relevant: yes; accountant: no.
19. **Załączniki:** only batch mode (exception: korekta techniczna faktury offline in interactive
    session); requires prior „zgłoszenia tej opcji w usłudze `e-Urząd Skarbowy`”. Confidence: HIGH.
20. **Uprawnienia:** „Wysłanie faktury do KSeF wymaga posiadania odpowiednich uprawnień do jej
    wystawienia w kontekście danego podmiotu.” Confidence: HIGH.
21. **Limits footnote:** „\* Jeżeli w scenariuszach biznesowych organizacji dostępne limity są
    niewystarczające, prosimy o kontakt z działem wsparcia KSeF”. Confidence: HIGH.
22. **Podręcznik view (Tier 2, user manual):** cz. II pkt 1.6.1 lists grounds for rejection:
    „Niezgodność struktury pliku ze wzorem”, brak uprawnień, P_1 z przyszłości, załącznik bez
    zgłoszenia w e-US (local extract); effect verbatim (06.08.2026 edition, s. 18, quoted in
    `ksef-scisla-walidacja-xml.md` fact 11): „W przypadku negatywnej weryfikacji system nie
    przydziela numeru KSeF faktury. Oznacza to, że faktura nie została wystawiona. Należy więc
    zweryfikować poprawność wprowadzonych danych i ponowić wysyłkę.” Confidence: HIGH (via KB; PDF
    not re-read today). Consistent with weryfikacja-faktury.md, which is the longer list.
23. **Batch is not atomic:** Podręcznik cz. II pkt 3.3 (s. 69 per `ksef-scisla-walidacja-xml.md`
    fact 12): „KSeF w takiej sytuacji odrzuca tylko błędne semantycznie pliki XML i informuje o
    powodzie odrzucenia poszczególnych plików”; failed invoices via GET
    `/sessions/{referenceNumber}/invoices/failed`: „Zwraca łączną liczbę odrzuconych faktur w sesji
    oraz szczegółowe informacje (status i szczegóły błędów) dla każdej niepoprawnie przetworzonej
    faktury.” (`faktury/sesje/sesja-sprawdzenie-stanu-i-pobranie-upo.md`, fetched live). Confidence:
    HIGH.

### D. Strict-XML status (as of 2026-11-05)

24. **Changelog unchanged.** `api-changelog.md` latest entry „Wersja 2.9.0” (TEST/DEMO 13.10.2026,
    PROD 15.10.2026) is about `OwnerPermissionScope` and documenting error `21001` („Nieczytelna
    treść”); the 2.4.0 entry still says enforcement from 16.07.2026. No entry announces PROD
    rejection or the date 19.10.2026. Last commit on the file: `ce3670e` 2026-10-14 (same HEAD as
    checked on 2026-10-24 and 2026-10-29). Fetched live. Confidence: HIGH.
25. **19.10.2026 date source:** only the kw-cirf comment of 2026-06-24 in issue #718 („Termin
    włączenia zaostrzonej walidacji XML został przesunięty na okres po sezonie urlopowym, tj. na
    19.10.2026.”), quoted in `ksef-scisla-walidacja-xml.md` fact 3. Issue NOT re-read today (403).
    Tier 3. Confidence: MEDIUM. URL: https://github.com/CIRFMF/ksef-api/issues/718
26. **PROD warning channel:** optional header `X-System-Warning` (since 2.6.0), format
    `[code]: message | [code]: message`; codes not predefined (`ksef-scisla-walidacja-xml.md` facts
    5, 8). Confidence: HIGH (header exists), codes: not documented.

### E. Status codes relevant to rejection (OpenAPI only)

27. **Invoice status table** (`SessionInvoiceStatusResponse.status`, `open-api.json`, fetched live):
    `100` Faktura przyjęta do dalszego przetwarzania; `150` Trwa przetwarzanie; `200` Sukces; `405`
    Przetwarzanie anulowane z powodu błędu sesji; `410` Nieprawidłowy zakres uprawnień; `415` Brak
    możliwości wysyłania faktury z załącznikiem; `430` Błąd weryfikacji pliku faktury; `435` Błąd
    odszyfrowania pliku; `440` Duplikat faktury (extensions `originalSessionReferenceNumber`,
    `originalKsefNumber`); `450` Błąd weryfikacji semantyki dokumentu faktury; `500` Nieznany błąd
    ({statusCode}); `550` Operacja została anulowana przez system. Tier 2. Confidence: HIGH (table).
    Status also carries `details` (array of strings).
28. **Which code an XSD failure returns is NOT documented.** Neither `weryfikacja-faktury.md` nor
    the OpenAPI maps XSD, strict-XML, P_1 or NIP-checksum failures to `430` vs `450`. Only `440`
    (duplicate) is mapped explicitly. Do not write „błąd XSD = 450”. Confidence: HIGH (absence in
    CIRFMF docs). Consistent with `bledy-walidacji-fa3.md` ("Error codes").
29. **Session status codes** (`SessionStatusResponse.status`): batch `405` „Błąd weryfikacji
    poprawności dostarczonych elementów paczki”, `420` „Przekroczony limit faktur w sesji”, `445`
    „Błąd weryfikacji, brak poprawnych faktur” (also in interactive), `440` „Sesja anulowana”
    (Przekroczono czas wysyłki / Nie przesłano faktur). Note: the same numbers mean different things
    at session and invoice level (e.g. 440, 415). Confidence: HIGH.
30. **Do not confuse:** `450` in `api-changelog.md` is also an authentication status
    („Uwierzytelnianie zakończone niepowodzeniem z powodu błędnego tokenu”); `21184` is „Sesja
    tymczasowo niedostępna” (2.8.0), not a validation error. Confidence: HIGH.

### F. What KSeF does NOT check

31. **No arithmetic.** Podręcznik cz. II 1.6.1 WAŻNE (local extract): „KSeF nie dokonuje weryfikacji
    obliczeń matematycznych. Nie odrzuci faktury z błędami rachunkowymi (np. nieprawidłowa kwota
    VAT).” Tier 2. Confidence: HIGH. Accountant-relevant: yes.
32. **Business rules of the Information Sheet beyond XSD**: not listed among KSeF checks in either
    `weryfikacja-faktury.md` or Podręcznik 1.6.1. Whether KSeF enforces any of them is **not
    confirmed in the corpus** (`bledy-walidacji-fa3.md`, Unsettled Q3). Examples of Information
    Sheet rules the XSD cannot express (implemented as semantic rules in our validator, cite the
    Sheet sections, not KSeF): Adnotacje single-choice groups (Zwolnienie, NoweSrodkiTransportu,
    PMarzy), JST=1 → Podmiot3 Rola 8, GV=1 → Podmiot3 Rola 10, Polish NIP in `NrVatUE`, decimal
    precision, currency fields. Wording for the post: „te reguły określa MF w broszurze FA(3)”, not
    „KSeF odrzuci”. Confidence: MEDIUM (absence inferred).
33. **Exchange rate value:** KSeF enforces only the `KursWaluty` format, not the NBP value
    (CLAUDE.md "Extra checks"; based on the XSD type). Confidence: MEDIUM (internal summary; no MF
    sentence found saying KSeF does not check NBP rates).
34. **Rejection vs acceptance consequence:** an error KSeF does not check → invoice gets a KSeF
    number and is issued; it can only be fixed by faktura korygująca (Podręcznik cz. II 1.6.2, via
    `bledy-walidacji-fa3.md` (b)). Confidence: HIGH.

### G. How to validate locally (tested 2026-11-05)

35. **xmllint (libxml2) works with the official XSD, but needs local imports.** Test:
    `xmllint --noout --nonet --schema "schemat_FA(3)_v1-0E.xsd" FA_3_Przykład_1.xml` with the CIRFMF
    files fails to compile („The QName value '{…DefinicjeTypy/}TNrKRS' does not resolve to a(n) type
    definition” … „failed to compile”), because the main schema imports StrukturyDanych from
    `http://crd.gov.pl/...`. With an XML catalog (`XML_CATALOG_FILES`) rewriting
    `http://crd.gov.pl/xml/schematy/dziedzinowe/mf/2022/01/05/eD/DefinicjeTypy/` to the local
    `bazowe/` folder (`rewriteSystem` + `rewriteURI`), the same command prints „validates”. Without
    `--nonet`, xmllint tries to download the import over plain http (not tested: crd.gov.pl
    unreachable here). Tool: libxml 2.9.14. Confidence: HIGH (reproduced). Alternative (not tested):
    edit `schemaLocation` in a local copy to a relative path.
36. **XSD alone is not enough (reproduced).** Same official example with `<?xml-stylesheet …?>`
    added, or with a UTF-8 BOM prepended: xmllint → „validates” for both. Same example with `P_15`
    changed to `999999.99`: xmllint → „validates”. Consistent with issue #718 report
    (`ksef-scisla-walidacja-xml.md` fact 9). Confidence: HIGH.
37. **Our validator, web:** https://ksefuj.to/validator (Polish default locale,
    `localePrefix: "as-needed"` in `apps/web/src/i18n/routing.ts`), runs client-side; no XML sent to
    a server (CLAUDE.md, "Privacy-first"). Internal fact, not an MF source.
38. **Our validator, CLI** (`packages/validator/src/cli.ts`, README):
    `npx @ksefuj/validator faktura.xml`; `npx @ksefuj/validator --batch ./faktury/` (every `*.xml`
    in the directory, not recursive); options `--json`, `--verbose` (error codes, fix suggestions,
    timing), `--assertions` (count passed checks), `--help`. Exit code `0` all valid, `1` otherwise.
    Installed as a dependency the binary is `ksef-validate`. npm latest `0.4.0` (2026-10-08).
    Internal.
39. **Our validator, npm API:**
    `import { validate } from "@ksefuj/validator"; const result = await validate(xmlString);`
    `validate()` never throws; `result.valid` false if any issue has severity `error`; issue fields
    `code.code`, `code.domain` (`parse`, `xsd`, `semantic`, `infrastructure`), `xpath`,
    `lineNumber`; options `enableXsdValidation`, `enableSemanticValidation`, `collectAssertions`,
    `maxIssues`, `currencyRates` (README). Schemas bundled, no network requests. Internal.
40. **Our CLI on the reproduced cases:** PI file → `XML_PROCESSING_INSTRUCTION` error at line 2,
    exit 1; BOM file → `XML_BOM_PRESENT` error, exit 1; P_15 changed → `TAX_CALCULATION_MISMATCH`
    error at `/Faktura/Fa/P_15`. All four strict-XML codes have severity `error`
    (`src/error-codes.ts`). Internal, reproduced 2026-11-05.
41. **What our validator does NOT check (gap vs KSeF list):** file size (1 MB / 3 MB), NIP checksum,
    P_1 later than submission date, duplicates (needs KSeF data), permissions, encryption,
    attachments-enabled status. No rule IDs for these in `src/semantic.ts` (rule list read
    2026-11-05). So „passes ksefuj” ≠ „KSeF will accept”. Internal. Confidence: HIGH (code read).
    Copywriter: say it honestly.
42. **Test environment submission** is the only way to see KSeF's own verdict without legal effect
    (TEST/DEMO, facts 3-5). Caveats: NIP checksum not checked outside PROD (fact 15); TEST accepts
    FA(2) (fact 3); use random NIPs, data shared between integrators (fact 4). Confidence: HIGH.

## Unsettled Questions

- Whether PROD rejects strict-XML violations since 19.10.2026: not confirmed by any document read
  today; issue #718 not re-read. Do not use present tense.
- Which status code (430 or 450) an XSD failure, strict-XML failure, future P_1 or bad NIP checksum
  returns: not documented. Do not map.
- Whether KSeF enforces any Information Sheet business rule beyond the XSD: not confirmed.
- Whether Aplikacja Podatnika (TEST) lets a user upload a ready XML file for sending: not found in
  the KB briefs read; do not claim it.
- Content of the integrator support page on ksef.podatki.gov.pl: unknown (unreachable).
- Whether xmllint without `--nonet` still resolves the http:// import from crd.gov.pl (and whether
  crd.gov.pl serves it over http): not tested.

## Suggested Sources Section

- MF / CIRF, „Weryfikacja faktury” (09.04.2026):
  https://github.com/CIRFMF/ksef-api/blob/main/faktury/weryfikacja-faktury.md
- MF / CIRF, schematy FA(3) w repozytorium KSeF API:
  https://github.com/CIRFMF/ksef-api/blob/main/faktury/schemy/FA/schemat_FA(3)_v1-0E.xsd
- Struktura logiczna FA(3) na crd.gov.pl: https://crd.gov.pl/wzor/2025/06/25/13775/schemat.xsd (not
  fetched today; link as stated in the broszura / our update script)
- MF / CIRF, „Środowiska KSeF API 2.0” (16.03.2026):
  https://github.com/CIRFMF/ksef-api/blob/main/srodowiska.md
- MF / CIRF, changelog API KSeF 2.0: https://github.com/CIRFMF/ksef-api/blob/main/api-changelog.md
- MF / CIRF, specyfikacja OpenAPI (statusy faktur):
  https://github.com/CIRFMF/ksef-api/blob/main/open-api.json
- Podręcznik KSeF 2.0 cz. II (06.08.2026), pkt 1.6.1:
  https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
- Broszura informacyjna FA(3), pkt 1.2:
  https://ksef.podatki.gov.pl/media/nuclnu0w/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf
- W3C, XML 1.0, „Characters”: https://www.w3.org/TR/xml/#charsets
- Related ksefuj post: `apps/web/content/pl/blog/ksef-scisla-walidacja-xml.mdx`

## Warning: Common Misconceptions

- „Plik przechodzi XSD, więc KSeF go przyjmie”: KSeF also checks BOM/encoding/PI/characters,
  duplicates, P_1, NIP checksum (PROD), size, permissions (Facts 12-20, 36).
- „KSeF przyjął fakturę, więc jest poprawna”: KSeF does not check arithmetic (Fact 31).
- „Przeszło na TEST, przejdzie na PROD”: NIP checksum is checked only on PROD (Fact 15).
- „1 MB = 1 048 576 bajtów”: MF defines 1 MB as 1 000 000 bytes (Fact 16).
- „Błąd 450 = błąd schemy”: mapping not documented (Fact 28).
- „Walidator KSeF w Aplikacji Podatnika / ksef.mf.gov.pl”: KSeF 1.0 (ksef.mf.gov.pl) is dead since
  1.02.2026 (CLAUDE.md); old test host `web2te-ksef.mf.gov.pl` does not resolve (CLAUDE.md). STALE
  for any KSeF 1.0 / FA(2) instructions.
- FA(2) namespace `http://crd.gov.pl/wzor/2023/06/29/12648/` is stale for invoices from 1.02.2026
  (Information Sheet §1.2; `bledy-walidacji-fa3.md`); TEST still accepts FA(2), PROD does not.

## Freshness Markers

- Strict-XML PROD enforcement (19.10.2026 announced, unconfirmed) → re-check `api-changelog.md`,
  `weryfikacja-faktury.md`, issue #718 at every refresh.
- Limits 1 MB / 3 MB / 10 000 / 50 × 100 MB / 5 GB → adjustable, re-check `weryfikacja-faktury.md`
  and `limity/limity.md`.
- FA(3) schema `1-0E`, namespace `…/2025/06/25/13775/` → changes with a new schema version; run
  `pnpm update-schemas` and compare with `CIRFMF/ksef-api/faktury/schemy/FA`.
- Environment URLs (ap-test, ap-demo, api-test, api-demo) → last HTTP 200 on 2026-10-07; not
  verified on 2026-11-05.
- `@ksefuj/validator` version 0.4.0 and CLI flags → re-check before publishing.
