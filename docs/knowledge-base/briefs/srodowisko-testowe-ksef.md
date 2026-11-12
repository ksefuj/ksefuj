# Research Brief: Środowisko testowe KSeF (TEST, DEMO, PROD)

**Requested by:** Orchestrator **Date:** 2026-11-12 **Freshness:** 2026-11-12 (CIRFMF GitHub only)
**For content:** Guide "Środowisko testowe KSeF" (PL slug `srodowisko-testowe-ksef`) **Personas:**
Ania (JDG freelancer who wants to practise safely), developer integrating the KSeF API

**Target query:** „środowisko testowe KSeF", „KSeF test", „ap-test ksef", „KSeF demo"

## Answer in two sentences

KSeF 2.0 ma trzy publiczne środowiska: TEST (do testowania integracji z API, wersje RC, akceptuje
samopodpisane certyfikaty i fikcyjne NIP-y), DEMO (przedprodukcyjne, konfiguracja jak na produkcji)
i PROD (faktury o pełnej mocy prawnej) — CIRFMF `srodowiska.md` (16.03.2026). Dokumenty wysłane do
TEST i DEMO nie są fakturami i nie wywołują skutków prawnych, a DEMO wymaga faktycznych danych
uwierzytelniających i faktycznych uprawnień jak na produkcji — Podręcznik KSeF 2.0 cz. II §3.2.1 i
§3.2.2 (per KB extract `podrecznik-ksef-20-czesc-ii.md`).

## What changes the answer

- **Which environment:** TEST (fake data, self-signed certs, data shared between integrators) vs
  DEMO (real credentials and permissions, PROD-like limits) vs PROD (legal effect, art. 108 risk).
- **Tool:** Aplikacja Podatnika (web UI, for Ania) vs API (for developers, OpenAPI per environment).
- **Schema:** TEST also accepts FA(2); DEMO and PROD only FA(3) / FA_PEF (3) / FA_KOR_PEF (3).
- **Rate limits on TEST:** two CIRFMF statements disagree (10x PROD vs equal to PROD), see
  Contradictions.
- **Time of day:** TEST environments may have maintenance 16:00–18:00 (since 2025-10-01).

## Provenance

Fetched in this run (2026-11-12), via `git clone --depth 1` of public GitHub repos:

- `CIRFMF/ksef-api` HEAD `ce3670ea042de380039de4c5849fd6455811b292` (commit date 2026-10-14; API
  2.9.0): `srodowiska.md`, `README.md`, `uwierzytelnianie.md`,
  `auth/testowe-certyfikaty-i-podpisy-xades.md`, `dane-testowe-scenariusze.md`, `kody-qr.md`,
  `limity/limity.md`, `limity/limity-api.md`, `przeglad-kluczowych-zmian-ksef-api-2-0.md`,
  `faktury/weryfikacja-faktury.md`, `api-changelog.md`, `open-api.json`.
- `CIRFMF/ksef-client-csharp` HEAD `d62836914cad3e5302ca5f2aef72eb74f74e344e` (2026-11-09) and
  `CIRFMF/ksef-client-java` HEAD `14dbb86e88ae840fd09be5e4e0f4b23025145420` (2026-11-10):
  environment constants and config files only.

**Not reachable in this run:** the agent proxy refused CONNECT (HTTP 403) to ksef.podatki.gov.pl,
ap-test / ap-demo / ap / api-test / api-demo / api / qr-test .ksef.mf.gov.pl, web2te-ksef.mf.gov.pl
and to DNS-over-HTTPS (dns.google); local DNS resolution is not available. **No hostname was
resolved or probed today.** Podręcznik KSeF 2.0 cz. II and the Aplikacja Podatnika manual were NOT
re-read; their facts below come from existing KB briefs (dates given per fact).

## Key Facts (ready to use)

### A. Environments and URLs

1. **Three public environments.** TEST „Testowe (Release Candidate)": „Środowisko do testowania
   integracji z KSeF API 2.0, zawiera wersje RC."; DEMO „Przedprodukcyjne (Demo)": „Środowisko
   odpowiadające konfiguracji produkcyjnej, przeznaczone do końcowej walidacji integracji w
   warunkach zbliżonych do produkcji."; PROD: „Środowisko do wystawiania i odbierania faktur o
   pełnej mocy prawnej, z gwarantowanym SLA i właściwymi danymi produkcyjnymi." — CIRFMF
   `srodowiska.md` (16.03.2026), table. Tier 2. Confidence: HIGH. Ania-relevant: yes (simplified).
   Freshness: doc date 16.03.2026.
2. **API documentation URLs per environment:** https://api-test.ksef.mf.gov.pl/docs/v2,
   https://api-demo.ksef.mf.gov.pl/docs/v2, https://api.ksef.mf.gov.pl/docs/v2 — `srodowiska.md`,
   column „Dokumentacja API". Tier 2. HIGH (documented). Reachability: HTTP 200 on 2026-10-07 per
   `api-ksef-zmiany-cirfmf.md` fact 10; **not re-checked 2026-11-12**. Ania-relevant: no.
3. **Accepted formats:** TEST „FA(2), FA(3), FA_PEF (3), FA_KOR_PEF (3)"; DEMO and PROD „FA(3),
   FA_PEF (3), FA_KOR_PEF (3)" — `srodowiska.md`. Tier 2. HIGH. Ania-relevant: marginal. Note: FA(2)
   accepted on TEST means a passing TEST submission does not prove PROD acceptance of the schema
   version (documented difference, not inference about outcomes).
4. **Real API base path is `/v2` on the host (not `/api/v2`).** OpenAPI `servers`:
   `https://api-test.ksef.mf.gov.pl/v2` („Środowisko TEST"); `info.description`: „**Adres serwera
   API:** - Środowisko TEST: `https://api-test.ksef.mf.gov.pl/v2`" — `open-api.json` in ksef-api
   repo (title „KSeF API TE v2", „Wersja API: 2.9.0 (build 2.9.0-te)"). The C# SDK builds requests
   as host
   - `/v2/...` (e.g. `"/v2/auth/challenge"` in `KSeF.Client/Clients/KSeFClient.cs`). Tier 2. HIGH
     for TEST. DEMO/PROD base path `/v2`: MEDIUM — inferred from SDK hosts
     (`KsefEnviromentsUris.cs`: TEST `https://api-test.ksef.mf.gov.pl`, DEMO
     `https://api-demo.ksef.mf.gov.pl`, PROD `https://api.ksef.mf.gov.pl`) plus the shared `/v2/`
     paths; the DEMO/PROD OpenAPI files were not read. Legacy: changelog 2.0.0 RC5.5 writes „GET
     `/api/v2/rate-limits`"; whether `/api/v2` still works is not documented.
5. **OpenAPI JSON file:** „Specyfikacja (plik JSON OpenAPI)" at
   https://api-test.ksef.mf.gov.pl/docs/v2/openapi.json; interactive docs
   https://api-test.ksef.mf.gov.pl/docs/v2/index.html — `przeglad-kluczowych-zmian-ksef-api-2-0.md`
   (09.06.2025). Java SDK Javadoc links `https://api.ksef.mf.gov.pl/docs/v2/openapi.json` (PROD). A
   copy (`open-api.json`, TE build) is in the ksef-api repo. Tier 2. HIGH (TEST URL documented);
   DEMO `.../docs/v2/openapi.json`: not stated anywhere (unverified).
6. **Aplikacja Podatnika URLs.** PROD https://ap.ksef.mf.gov.pl/, TEST
   https://ap-test.ksef.mf.gov.pl/web/ („test version (no legal effect)"), recorded from the MF page
   https://ksef.podatki.gov.pl/aplikacja-podatnika-ksef-20/ by a sibling run on 2026-10-07
   (`zwolniony-z-vat-ksef.md`). DEMO https://ap-demo.ksef.mf.gov.pl/: HTTP 200 on 2026-10-07 per
   `api-ksef-zmiany-cirfmf.md` fact 10; no MF page quoting the demo AP URL is in the KB. The CIRFMF
   docs do not mention AP URLs at all. Tier 3. Confidence: HIGH (TEST, PROD), MEDIUM (DEMO). **Not
   re-checked 2026-11-12.** Ania-relevant: yes.
7. **AP versions timeline:** „Wersje: testowa (od 3.11.2025), przedprodukcyjna (od 15.11.2025),
   produkcyjna (od 1.02.2026)." — Podręcznik KSeF 2.0 cz. II §3.1 (edition 1.02.2026, per KB extract
   `podrecznik-ksef-20-czesc-ii.md` l. 788-789; paraphrased extract, not verbatim PDF). Tier 2.
   HIGH.
8. **TEST (API) available since 30.09.2025, still after 1.02.2026; DEMO still after 1.02.2026; PROD
   from 1.02.2026** — cz. II §3.2.1–3.2.3 (per KB extract l. 797-812). Tier 2. HIGH.
9. **QR verification hosts per environment:** TE https://qr-test.ksef.mf.gov.pl, DEMO
   https://qr-demo.ksef.mf.gov.pl, PROD https://qr.ksef.mf.gov.pl; „Poniższe przykłady są
   przygotowane dla środowiska testowego (TE)." Example KOD I:
   `https://qr-test.ksef.mf.gov.pl/invoice/1111111111/01-02-2026/UtQp9Gpc51y-u3xApZjIjgkpZ01js-J8KflSPW8WzIE`;
   KOD II uses `https://qr-test.ksef.mf.gov.pl/certificate/...` — CIRFMF `kody-qr.md` (21.08.2025),
   „Środowiska". Same hosts in C# SDK `KsefQREnviromentsUris.cs` and Java `application*.yaml`.
   Tier 2. HIGH. Ania-relevant: yes (a QR on a test invoice points to qr-test, not to the real
   verifier). Freshness: doc date 21.08.2025.
10. **URLs returned by the API match the called environment:** „W każdym przypadku, gdy API zwraca
    adres URL do pobrania lub wysyłki zasobu, jego host odpowiada środowisku, do którego zostało
    skierowane wywołanie (`TEST`, `DEMO` albo `PROD`)." — `srodowiska.md`, „Adresy URL zwracane
    przez API". Tier 2. HIGH. Ania-relevant: no.
11. **Latarnia (KSeF status service) hosts in SDK only:** TEST
    `https://api-latarnia-test.ksef.mf.gov.pl/`, PROD `https://api-latarnia.ksef.mf.gov.pl/` (no
    DEMO constant) — `KSeF.Client/DI/LighthouseEnvironmentsUris.cs` („Adresy dla środowisk
    Latarni."). Not described in ksef-api docs. Tier 3 (SDK code). MEDIUM. Ania-relevant: no.

### B. Legal status and data

12. **TEST: no legal effect.** „Dokumenty nie są fakturami i nie wywołują skutków prawnych." (cz. II
    §3.2.1 per KB extract l. 799-800; extract wording). Tier 2. HIGH. Ania-relevant: yes.
13. **DEMO: no legal effect, real credentials and permissions.** „Oparte o faktyczne dane
    uwierzytelniające. Wymaga faktycznych uprawnień (jak produkcja). Niedostępne publicznie.
    Dokumenty bez skutków prawnych." (cz. II §3.2.2 per KB extract l. 807-808; extract wording,
    changelog of cz. II Nov 2025: „3.2.2 — uszczegółowienie zasad środowiska demo"). Tier 2. HIGH
    (no legal effect, real credentials), MEDIUM („Niedostępne publicznie", see Contradictions).
    Ania-relevant: yes.
14. **PROD: real invoices; never send test invoices.** „Niedopuszczalne jest przesyłanie faktur
    testowych do środowiska produkcyjnego. Faktura przyjęta z numerem KSeF = pełnoprawna faktura →
    obowiązek zapłaty podatku (art. 108). W razie błędu → niezwłocznie korekta „do zera"." (cz. II
    §3.2.3 box „WAŻNE", per KB extract l. 814-816). Tier 2 (citing Tier 1 art. 108). HIGH.
    Ania-relevant: yes, key warning.
15. **No production invoices or real data on TEST/DEMO.** „Środowiska testowe (TE/DEMO) służy
    wyłącznie do testowania integracji z API KSeF. Nie należy przesyłać do niego **faktur
    produkcyjnych** ani rzeczywistych danych podmiotów." — `srodowiska.md`, „Uwaga". Tier 2. HIGH.
16. **TEST data are not isolated and may be shared.** „W środowisku testowym `TE` dopuszczalne jest
    uwierzytelnianie przy użyciu samopodpisanych certyfikatów (self-signed), co w praktyce oznacza,
    że wielu integratorów może uwierzytelnić się w kontekście tej samej firmy. Z tego względu dane
    wprowadzone w środowisku `TE` nie są odizolowane i mogą być współdzielone między integratorami."
    „Do testów należy używać losowych identyfikatorów NIP, unikając jakichkolwiek danych
    rzeczywistych." — `srodowiska.md`. Tier 2. HIGH. Ania-relevant: yes (anyone may see what you
    upload to TEST under a given NIP).
17. **TEST data requirements (Podręcznik):** „zanonimizowane dane, brak rzeczywistych NIP + danych
    osobowych łącznie." (cz. II §3.2.1 per KB extract l. 802; extract wording — exact PDF phrasing
    not in KB). Tier 2. MEDIUM (paraphrase; whether a real NIP alone is allowed is not clear from
    the extract).
18. **Whether TEST or DEMO data are periodically cleared: NOT FOUND.** No CIRFMF document read here
    states a purge/reset schedule. Related documented facts only: duplicate detection is global per
    `Podmiot1:NIP` + `RodzajFaktury` + `P_2`, error 440, uniqueness kept „przez okres 10 pełnych
    lat" (`faktury/weryfikacja-faktury.md`, „Unikalność faktury"; the doc does not limit this to
    PROD or say how it applies on TEST). A Java SDK test comment warns that, because anyone can open
    a session with a given NIP on TEST, another person may revoke a test certificate
    (`QrCodeOfflineIntegrationTest.java` l. 237; Tier 3, code comment).
19. **Test UPO is labelled.** From UPO v4-3, `NazwaPodmiotuPrzyjmujacego` gets an environment
    suffix: „`TE`: Ministerstwo Finansów - środowisko testowe (TE)", „`TR`: Ministerstwo Finansów -
    środowisko przedprodukcyjne (TR)"; „`PROD`: bez zmian - Ministerstwo Finansów." —
    `api-changelog.md`, 2.0.0 RC6.0. Tier 2. HIGH. Ania-relevant: yes (how to tell a test UPO).
    Note: TR = internal code for DEMO.
20. **Maintenance windows on test environments:** „od dnia 1 października 2025 r." cyclic
    maintenance „w godzinach od **16:00 do 18:00**", „mogą wystąpić przejściowe utrudnienia"; only
    integration-relevant changes go to the changelog — `srodowiska.md`, „Prace serwisowe". Technical
    notices also listed TEST/Demo maintenance on 2026-06-17/22 (`mf-faq-podreczniki-2026.md`, from
    https://ksef.podatki.gov.pl/komunikaty-techniczne/). Tier 2/3. HIGH. Ania-relevant: yes.

### C. Login / authentication

21. **Self-signed certificates: TEST only.** „samopodpisane certyfikaty są dopuszczalne wyłącznie w
    środowisku testowym." (`uwierzytelnianie.md`, „Szybki start (demo)" note); „Na środowisku
    testowym dopuszcza się użycie samodzielnie wygenerowanego certyfikatu będącego odpowiednikiem
    certyfikatów kwalifikowanych" (`uwierzytelnianie.md`, XAdES section). Same in cz. II §3.2.1 per
    KB extract. Tier 2. HIGH. Ania-relevant: no (API); yes only as „TEST nie wymaga prawdziwego
    podpisu" — see Unverified for the AP login screen.
22. **How test certificates are generated.** Console app `KSeF.Client.Tests.CertTestApp` in
    https://github.com/CIRFMF/ksef-client-csharp (folder confirmed in clone): generates a „testowego
    (self‑signed) certyfikatu", builds and XAdES-signs `AuthTokenRequest`, sends it, polls status,
    gets `accessToken`/`refreshToken`. Requirements: „.NET 10 SDK", Git, Windows or Linux; run
    `dotnet run --framework net10.0` („domyślnie losowy NIP"), options `--output screen|file`,
    `--nip`, `--no-startup-warnings` — `auth/testowe-certyfikaty-i-podpisy-xades.md` („Samopodpisane
    certyfikaty są **dozwolone wyłącznie** na środowisku **testowym**."). In code:
    `CertificateUtils.GetPersonalCertificate(...)` / `GetCompanySeal(...)` (C#),
    `certificateService.getPersonalCertificate(...)` / `getCompanySeal(...)` (Java) —
    `uwierzytelnianie.md`. Tier 2. HIGH. Ania-relevant: no.
23. **Any (random) NIP on TEST.** „Do testów należy używać losowych identyfikatorów NIP"
    (`srodowiska.md`); CertTestApp uses a random NIP by default. NIP checksum validation on invoices
    is opt-in on test environments: „Na środowiskach testowych dodano możliwość włączenia walidacji
    numerów NIP oraz identyfikatorów wewnętrznych podmiotów za pomocą nagłówka `X-KSeF-Feature`:
    `subject-identifier-validation`." (`api-changelog.md` 2.8.0, TEST 14.09.2026). Tier 2. HIGH
    (wording); that validation is off by default on TEST is implied, not stated: MEDIUM.
24. **DEMO needs real credentials and real permissions** — fact 13. Whether permissions granted on
    PROD are automatically visible on DEMO (shared registry vs separate copy): NOT FOUND.
25. **Profil Zaufany / login.gov.pl on TEST or DEMO AP: NOT FOUND** in any document read. The
    general AP login options (login.gov.pl, qualified certificate) are documented for the AP as such
    (Podręcznik AP 06.08.2026 ch. 4.1, per `logowanie-ksef.md` fact 1), without an
    environment-specific statement.

### D. Developer info

26. **Test-data endpoints (`/testdata/*`)**, from `open-api.json` (TE build 2.9.0): POST
    `/testdata/subject` (+ `/remove`; VAT group/JST with subunits), POST `/testdata/person` (+
    `/remove`; „osoby fizycznej, której system nadaje uprawnienia właścicielskie"; `isBailiff`;
    `isDeceased` since RC5.3 for status 470), POST `/testdata/permissions` (+ `/revoke`), POST
    `/testdata/attachment` (+ `/revoke`), POST `/testdata/context/block` / `unblock`
    („Uwierzytelnianie zakończy się błędem 480."), PUT `/testdata/certificates/{serialNumber}`
    (shorten `validTo`; 2.7.0), POST/DELETE `/testdata/limits/context/session`, POST/DELETE
    `/testdata/limits/subject/certificate`, POST/DELETE `/testdata/rate-limits`, POST
    `/testdata/rate-limits/production`. Several are marked „**Tylko na środowiskach testowych.**";
    `/testdata/rate-limits/production`: „Dostępny tylko na środowisku **TE**." (changelog RC6.0).
    Tier 2. HIGH. Ania-relevant: no. Whether non-limit `/testdata` endpoints work on DEMO: not
    stated (only „środowiskach testowych", plural; see Ambiguities).
27. **Scenarios doc** (`dane-testowe-scenariusze.md`, 05.08.2025): JDG on TEST = POST
    `/v2/testdata/person` with `isBailiff: false` → person logging in the NIP context „za pomocą
    numeru PESEL lub NIP-u, otrzyma uprawnienie właścicielskie (**Owner**)"; komornik
    (`isBailiff: true` → Owner + EnforcementOperations); VAT group via `/v2/testdata/subject` then
    `/v2/testdata/permissions`; attachments on/off via `/testdata/attachment[/revoke]`. Tier 2.
    HIGH.
28. **Rate limits per environment** (`limity/limity-api.md`, 14.09.2026, „Limity na środowiskach"):
    TE „Domyślne wartości limitów są **dziesięciokrotnie wyższe** niż na produkcji"; DEMO „**takie
    same limity jak na produkcji**", „replikowane z PROD"; PROD default limits, increase by request
    via form „(w przygotowaniu)". `limity/limity.md` (26.08.2026): PROD increase only on
    „uzasadnionego wniosku" via https://ksef.podatki.gov.pl/formularz/; modification endpoints on
    TEST „nie mają wpływu na środowisko produkcyjne". Public `/auth/challenge`: „60 żądań na sekundę
    dla jednego adresu IP". Context limits: invoice 1 MB / 3 MB with attachment, 10 000 invoices per
    session, 500 per collective identifier. Current values: GET `/rate-limits`. Tier 2. HIGH
    (wording), but TE multiplier contradicted, see Contradictions. Freshness: limits change often.
29. **Test-only headers:** force a warning on TEST with `X-Test-System-Warning` (changelog 2.6.0 /
    2.7.1); `X-KSeF-Feature: subject-identifier-validation` (2.8.0); historical: XAdES rules
    „obowiązują już na środowisku TEST", on DEMO/PROD from „16 marca 2026" with early opt-in
    `X-KSeF-Feature: enforce-xades-compliance` (2.1.0/2.1.1). Tier 2. HIGH.
30. **Release order TEST → DEMO → PROD.** Each changelog entry has a per-environment deployment
    table, e.g. 2.9.0: TEST 13.10.2026, DEMO 13.10.2026, PROD 15.10.2026; 2.8.0: TEST 14.09.2026,
    DEMO 15.09.2026, PROD 23.09.2026; 2.7.1: DEMO „-" — `api-changelog.md`. Tier 2. HIGH.
31. **Official SDKs:** „ksef-client-csharp – biblioteka w języku C#", „ksef-client-java – biblioteka
    w języku Java", „utrzymywane i rozwijane przez zespoły Ministerstwa Finansów oraz udostępniane
    publicznie na zasadach open source" — ksef-api `README.md` (05.05.2026). Both SDKs default to
    TEST (`appsettings.json` `"BaseUrl": "https://api-test.ksef.mf.gov.pl"`; Java `application.yaml`
    `base-uri`; `application-demo.yaml` / `application-prod.yaml` for the others). C# ClientFactory
    readme „Obsługiwane środowiska: Test / Demo / Produkcja". Java SDK: `ksef-client` (Java 11) +
    `demo-web-app` (Java 21, Spring Boot 3.5.7). Tier 2/3. HIGH.

## Contradictions & Ambiguities

- **TEST rate limits.** `api-changelog.md` 2.0.0 RC6.0: TE limits „z wartościami 10x wyższymi niż na
  **PROD**"; `api-changelog.md` 2.5.0 (TEST 06.05.2026): „Zrównano domyślne limity API na środowisku
  TEST z wartościami obowiązującymi na PROD."; `limity/limity-api.md` (header 14.09.2026) still says
  „dziesięciokrotnie wyższe". Same source family; the changelog entry is an explicit later change,
  the doc page has a later header date. Unresolved; do not state a multiplier. Safe: check GET
  `/rate-limits`.
- **DEMO „Niedostępne publicznie" vs „publiczne środowiska".** cz. II §3.2.2 (KB extract) vs
  `srodowiska.md` „Poniżej zestawiono informacje o publicznych środowiskach" (lists DEMO). The
  extract is a paraphrase; exact PDF wording not in KB. Meaning (restricted access vs requiring real
  credentials) is undefined.
- **DEMO real credentials vs „no real data".** cz. II §3.2.2: DEMO „Oparte o faktyczne dane
  uwierzytelniające"; `srodowiska.md`: TE/DEMO — „Nie należy przesyłać ... rzeczywistych danych
  podmiotów". Neither source states which invoice data (real buyer NIP?) are acceptable on DEMO.
- **„Środowiska testowe" scope.** OpenAPI marks endpoints „Tylko na środowiskach testowych" (plural)
  while the changelog says `/testdata/rate-limits/production` is „Dostępny tylko na środowisku
  **TE**". Whether DEMO counts as a „środowisko testowe" for `/testdata/*` is not defined.
- **`web2te-ksef.mf.gov.pl` in official code.** Java SDK test comment (2026-11-10 HEAD) still
  references `https://web2te-ksef.mf.gov.pl/web/certificates/certificate-list`; MF AP page (per
  sibling run) uses `ap-test.ksef.mf.gov.pl/web/`. Current resolution of web2te: not verified today.

## Unsettled Questions

- Whether TEST/DEMO data are periodically purged, and retention of test invoices (not found).
- Whether login.gov.pl / Profil Zaufany works on AP TEST; what the AP TEST login screen offers (e.g.
  login „by NIP" without a signature) — not in any source read.
- Whether DEMO is open to every taxpayer or requires an application; whether PROD permissions appear
  on DEMO.
- Whether invoices on AP TEST reach a counterparty only if they log in to TEST with that NIP
  (implied by fact 16, not stated).
- Duplicate detection (error 440) behaviour on shared TEST data (fact 18).

## Unverified / needs local verification

Proxy blocked all of these on 2026-11-12; verify from a normal network before publishing:

- HTTP status of https://ap-test.ksef.mf.gov.pl/web/, https://ap-demo.ksef.mf.gov.pl/,
  https://ap.ksef.mf.gov.pl/ (last 200: 2026-10-07, prior run).
- HTTP status of https://api-test.ksef.mf.gov.pl/docs/v2, https://api-demo.ksef.mf.gov.pl/docs/v2,
  https://api.ksef.mf.gov.pl/docs/v2 (last 200: 2026-10-07) and of
  `https://api-demo.ksef.mf.gov.pl/docs/v2/openapi.json`,
  `https://api.ksef.mf.gov.pl/docs/v2/openapi.json` (never checked).
- That `https://api-demo.ksef.mf.gov.pl/v2` and `https://api.ksef.mf.gov.pl/v2` are the API bases
  (`servers` of DEMO/PROD OpenAPI not read).
- That `https://api-test.ksef.mf.gov.pl/api/v2/...` does or does not still answer (legacy path).
- `web2te-ksef.mf.gov.pl` not resolving: stated in project CLAUDE.md; `dig`/DoH not possible here.
- qr-test / qr-demo / api-latarnia-test hosts respond.
- Exact Polish wording and PDF page numbers of cz. II §3.2.1–3.2.3 (06.08.2026 edition):
  https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
- Podręcznik Aplikacji Podatnika KSeF 2.0 (06.08.2026) statements about the test/demo versions (not
  in KB).
- MF page https://ksef.podatki.gov.pl/aplikacja-podatnika-ksef-20/ still lists the ap-test URL and
  whether it lists the demo AP.

## Suggested Sources

Fetched 2026-11-12 (link the GitHub pages):

- https://github.com/CIRFMF/ksef-api/blob/main/srodowiska.md
- https://github.com/CIRFMF/ksef-api/blob/main/uwierzytelnianie.md
- https://github.com/CIRFMF/ksef-api/blob/main/auth/testowe-certyfikaty-i-podpisy-xades.md
- https://github.com/CIRFMF/ksef-api/blob/main/dane-testowe-scenariusze.md
- https://github.com/CIRFMF/ksef-api/blob/main/kody-qr.md
- https://github.com/CIRFMF/ksef-api/blob/main/limity/limity-api.md
- https://github.com/CIRFMF/ksef-api/blob/main/limity/limity.md
- https://github.com/CIRFMF/ksef-api/blob/main/api-changelog.md
- https://github.com/CIRFMF/ksef-api/blob/main/open-api.json
- https://github.com/CIRFMF/ksef-client-csharp , https://github.com/CIRFMF/ksef-client-java

Recorded by earlier runs (not re-fetched):

- Podręcznik KSeF 2.0 cz. II (§3.1–3.2.3), URL above
- https://ksef.podatki.gov.pl/aplikacja-podatnika-ksef-20/
- https://ksef.podatki.gov.pl/komunikaty-techniczne/
- AP: https://ap-test.ksef.mf.gov.pl/web/, https://ap-demo.ksef.mf.gov.pl/,
  https://ap.ksef.mf.gov.pl/

## Warning: Common Misconceptions

- **„Środowisko testowe: web2te-ksef.mf.gov.pl."** Old URL; still in briefs `fa2-vs-fa3.md` (l.
  383+) and `ksef-dla-jdg.md` (l. 203+) and in a Java SDK test comment. Current:
  ap-test.ksef.mf.gov.pl/web/ (fact 6).
- **„TEST przyjmuje wyłącznie FA(3)."** Our post `apps/web/content/pl/blog/fa2-vs-fa3-ksef.mdx` l.
  184 (and EN twin) says so; `srodowiska.md` lists FA(2) as accepted on TEST (fact 3). Flag to the
  Judge.
- **„Na TEST nikt nie widzi moich danych."** TEST data are not isolated and may be shared (fact 16).
- **„DEMO to to samo co TEST."** DEMO requires real credentials and permissions and PROD limits
  (facts 13, 28).
- **„Faktura testowa wysłana na produkcję się nie liczy."** Accepted on PROD with a KSeF number = a
  real invoice; fix by correction „do zera" (fact 14).
- **„Limity na TEST są 10x wyższe."** Changelog 2.5.0 says they were equalised with PROD (see
  Contradictions).

## Freshness Markers

- All URLs (AP, API, QR, Latarnia) → re-check before publication and monthly.
- TEST rate-limit multiplier → re-check `limity-api.md` and GET `/rate-limits` after each API
  release.
- Maintenance window 16:00–18:00 → re-check `srodowiska.md`.
- FA(2) acceptance on TEST → may be withdrawn; re-check `srodowiska.md`.
- `/testdata/*` list → re-check OpenAPI with each release (last: 2.9.0, 2026-10-13/15).
- CertTestApp requires .NET 10 → re-check when the SDK changes target framework.
- Podręcznik cz. II facts come from the 2026-02-01 edition extract; 06.08.2026 edition not diffed
  line by line.
