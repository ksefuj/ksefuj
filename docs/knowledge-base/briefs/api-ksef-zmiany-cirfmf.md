# Research Brief: Zmiany w API KSeF 2.x (CIRFMF) istotne dla integratorów, kwiecień–wrzesień 2026

**Requested by:** weekly knowledge refresh **Date:** 2026-10-07 **Freshness:** 2026-10-07 **For
content:** developer-facing posts; validator context. INTERNAL reference.

**Target query:** "KSeF API zmiany 2026", "limity API KSeF", "KSeF walidacja XML 19 października"

**Answer in two sentences:** Between 2026-04-10 and 2026-09-22 the MF team released API versions
2.4.0 to 2.8.1 (changelog: https://github.com/CIRFMF/ksef-api/blob/main/api-changelog.md); the most
consequential items are the stricter XML validation (PROD from 2026-10-19), 410 Gone after status
retention, `publicKeyId` for key rotation and new rate-limit groups. Documentation formerly in
`CIRFMF/ksef-docs` now lives in `CIRFMF/ksef-api` (2.6.1 changelog: links changed).

**What changes the answer:** the changelog lists TEST/DEMO/PROD deployment dates per version; the
dates below are PROD unless stated.

## Key Facts (ready to use)

1. **Releases (ksef-api, tag = version):** 2.4.0 (2026-04-10; PROD 16.04), 2.5.0 (2026-05-06; PROD
   11.05), 2.6.0 (2026-05-19; PROD 26.05), 2.6.1 (2026-06-10; PROD 16.06), 2.7.0 (2026-07-21; TEST
   only at release), 2.7.1 (2026-08-26; PROD 23.09), 2.8.0 (2026-09-14; PROD 23.09), 2.8.1
   (2026-09-22; PROD 23.09). https://github.com/CIRFMF/ksef-api/releases Tier 3 (official MF repo)
   Confidence: HIGH
2. **2.4.0, stricter XML validation:** invoice must not contain XML processing instructions (e.g.
   xml-stylesheet); also no BOM, UTF-8 only, no W3C-discouraged characters (per changelog/doc
   "Weryfikacja faktury"). Enforcement on PROD: first announced 16.07.2026, postponed to
   **19.10.2026** (maintainer comment in issue #718, 2026-06-24); warnings via `X-System-Warning`
   (2.6.0) help detect it. Recommendation to fill `SystemInfo` in the invoice XML.
   https://github.com/CIRFMF/ksef-api/issues/718 Confidence: HIGH (date), MEDIUM (full list of
   character rules, see changelog 2.4.0). **Validator-relevant.**
3. **2.4.0, retention:** status of async operations returns `410 Gone` after retention: auth 7 days,
   invoice export 7 days, certificate enrollment 30 days, permission operations 30 days; no
   retention for session/invoice-send statuses. Optional Problem Details format via
   `X-Error-Format: problem-details`. A token can revoke itself without `CredentialsManage`.
4. **2.5.0:** `publicKeyId` selector in POST /auth/ksef-token, /sessions/online, /sessions/batch,
   /invoices/exports (public key rotation); `AuthTokenRequest` schema 2.1; TEST default rate limits
   equalised with PROD; RR invoice values removed from OpenAPI.
5. **2.6.0:** `TarGz` compression for batch and export (default stays Zip); optional response header
   `X-System-Warning` (force on TEST with `X-Test-System-Warning`).
6. **2.7.x:** collective identifiers (identyfikatory zbiorcze, permission
   `CollectiveIdentifierManage`; 2.7.1 changed GET to POST /collective-identifiers/invoices, max 10
   identifiers); invoice export/metadata `dateRange` extended from 3 months to 100 days (UTC); PUT
   /testdata/certificates/ {serialNumber} to simulate expiry on test environments.
7. **2.8.0 (PROD 23.09.2026), rate limits:** session-closing operations moved to separate limit
   groups (interactive 20/60/240, batch 20/40/120); GET /rate-limits now returns `anonymous` and
   `global` groups (global = future per-IP limits, currently off); new error `21184` ("Sesja
   tymczasowo niedostępna", HTTP 400) when sending in an existing interactive session is temporarily
   paused (open a new session); header `X-KSeF-Feature: subject-identifier-validation` on test
   environments. 2.8.1: error codes 71001/71004/71005 and 21418 for collective identifiers.
8. **Deprecation:** `authenticationMethod` response field was announced for withdrawal on 2026-11-16
   (changelog 2.1.0). In issue #875 (closed 2026-10-05) the maintainer said it stays in current
   operations; removal comes with a **new operation revision** and a **12-month transition** from
   production availability of the new revisions; extensible enums (`FutureValue`) come to v2 in new
   revisions. https://github.com/CIRFMF/ksef-api/issues/875 Confidence: HIGH
9. **Tokens (issue #834):** see `rozporzadzenie-ksef-i-tokeny.md` (tokens issued until 31.12.2026
   valid until 30.11.2027, new token endpoint). Confidence: MEDIUM
10. **Environments (all return HTTP 200 on 2026-10-07):** AP prod https://ap.ksef.mf.gov.pl/, AP
    test https://ap-test.ksef.mf.gov.pl/web/, AP demo https://ap-demo.ksef.mf.gov.pl/, API docs
    https://api.ksef.mf.gov.pl/docs/v2, https://api-test.ksef.mf.gov.pl/docs/v2,
    https://api-demo.ksef.mf.gov.pl/docs/v2.
11. **SDKs (releases, unofficial summary of tags):** ksef-client-csharp 2.6.0 to 2.8.1 (tracking API
    versions); ksef-client-java tags 3.0.24 to 3.0.29, breaking rename `upoVersion` -> `feature` in
    3.0.28 (per coordinator research; verify tag text before citing); ksef-pdf-generator up to
    1.1.40 (2026-09-17; PEF support, UTF-16 handling per coordinator research). ksef-latarnia: no
    releases found by `gh release list`.

## Unsettled Questions

- Exact enforcement behaviour on 2026-10-19 (reject vs warning) beyond the maintainer's statement.
- Whether `global` per-IP limits will be enabled and when.

## Suggested Sources Section

- https://github.com/CIRFMF/ksef-api/blob/main/api-changelog.md
- https://github.com/CIRFMF/ksef-api/releases
- Issues #718, #834, #875 (links above)
- Repo list: https://github.com/CIRFMF/ksef-docs (merged into ksef-api),
  https://github.com/CIRFMF/ksef-latarnia, https://github.com/CIRFMF/ksef-client-java,
  https://github.com/CIRFMF/ksef-client-csharp, https://github.com/CIRFMF/ksef-pdf-generator,
  https://github.com/CIRFMF/ksef-schematy

## Warning: Common Misconceptions

- „Walidacja XML zaostrzona od 16 lipca": postponed to 19.10.2026 on PROD.
- „Wystarczy dobry XSD": strict XML rules (no processing instructions, no BOM) are checked by KSeF
  in addition to the schema.
