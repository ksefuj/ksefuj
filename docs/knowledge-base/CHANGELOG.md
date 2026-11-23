# Knowledge Changelog

What changed in KSeF law and official documentation, newest first. One entry per weekly knowledge
run: date range, each change with its official source, and its impact on this repo (briefs, posts,
validator, none).

---

## 2026-11-16 → 2026-11-23 (partial run, GitHub only; `Last checked` not updated)

Official hosts were unreachable from the run environment for the fifth run in a row (proxy refused
CONNECT with HTTP 403): ksef.podatki.gov.pl, api.sejm.gov.pl, legislacja.rcl.gov.pl,
dziennikustaw.gov.pl, isap.sejm.gov.pl, www.sejm.gov.pl, www.senat.gov.pl, www.gov.pl,
eureka.mf.gov.pl, crd.gov.pl. Law, MF guidance and schemas were not checked; this is not a "no
changes" entry. Still unverified: the UD477 Senate/President stage and publication (art. 3 is due to
enter into force 2026-12-31), the token regulation draft (RCL 12416152), and whether art. 145m/145n
were extended. CIRFMF issue comments were not readable (GitHub REST API refused for unattached
repos); git history and the issue search API were. Open issue:
https://github.com/ksefuj/ksefuj/issues/127.

### Technical (API/schemas/GitHub)

- ksef-api 2.10.0 on TEST (2026-11-16; DEMO/PROD dates not set): `rev2` token endpoints with
  validity period, token approval endpoint, old token generate/list/status deprecated (withdrawal
  30.09.2027); OpenAPI says tokens from old POST `/tokens` generated from 07.11.2026 are valid 90
  days: https://github.com/CIRFMF/ksef-api/blob/main/api-changelog.md,
  https://github.com/CIRFMF/ksef-api/blob/main/open-api.json. Impact: briefs
  `api-ksef-zmiany-cirfmf.md`, `rozporzadzenie-ksef-i-tokeny.md` (the brief and post
  `tokeny-ksef-po-2026` are already updated for 2.10.0 in open PR #218); posts none beyond #218;
  validator none.
- ksef-api 2.10.0: the `authenticationMethod` removal announced for 2026-11-16 was cancelled; old
  auth status/session endpoints supported until 15.06.2027, `rev2` replacements; `Deprecation`/
  `Sunset` headers and `410 Gone` after sunset; `CollectiveIdentifierManage` for EU entities;
  collective-identifier lookup rejects bad KSeF number checksums (`21405`):
  https://github.com/CIRFMF/ksef-api/blob/main/api-changelog.md. Impact: brief
  `api-ksef-zmiany-cirfmf.md`; posts none; validator none.
- ksef-client-csharp 2.10.0 (2026-11-18): API 2.10.0 support, CRC-8 KSeF number validation, breaking
  changes in test-data context blocking and `FormType.FA_RR`:
  https://github.com/CIRFMF/ksef-client-csharp/blob/main/RELEASE_NOTES.md. Impact: brief only.
- ksef-client-java (3.0.30), ksef-pdf-generator (1.1.48), ksef-schematy (`cd826b8`), ksef-latarnia
  (`b3d8196`): no commits since the 2026-11-16 run. Impact: none.
- Lead only (community question, no readable MF answer): CIRFMF/ksef-api#889/#890 ask whether and
  when the per-IP `global` rate limit announced in 2.8.0 is switched on; #889 was closed 2026-11-17.
  Not recorded as fact.
- `pnpm update-schemas`: crd.gov.pl unreachable, every download `fetch failed`, script fell back to
  bundled files (and still printed "All schemas are up to date"); schemas not verified.

---

## 2026-11-09 → 2026-11-16 (partial run, GitHub only; `Last checked` not updated)

Official hosts were unreachable from the run environment for the fourth run in a row (proxy refused
CONNECT with HTTP 403): ksef.podatki.gov.pl, api.sejm.gov.pl, legislacja.rcl.gov.pl,
dziennikustaw.gov.pl, isap.sejm.gov.pl, www.sejm.gov.pl, www.gov.pl, www.podatki.gov.pl,
eureka.mf.gov.pl, crd.gov.pl, api.nbp.pl. Law, MF guidance and schemas were not checked; this is not
a "no changes" entry. The UD477 Senate stage and the token regulation draft (RCL 12416152) remain
unverified. The GitHub REST API for CIRFMF repos was also refused this run (repos not attached to
the session), so issues (#718, #885 comments to 2026-11-20) were not read; only git history was.
Open issue: https://github.com/ksefuj/ksefuj/issues/127.

### Technical (API/schemas/GitHub)

- ksef-client-java 3.0.30 (2026-11-10, API 2.9.0): `CollectiveIdentifierManage` permission enum
  value, `ownerPermissions` in personal-grants query, `ResponseHeaderObserver` for per-call
  `X-System-Warning` capture: https://github.com/CIRFMF/ksef-client-java/blob/main/RELEASE_NOTES.md.
  Impact: brief `api-ksef-zmiany-cirfmf.md`; posts none; validator none.
- ksef-client-csharp 2.9.0.1 (2026-11-09): dependency and vulnerability updates only:
  https://github.com/CIRFMF/ksef-client-csharp/blob/main/RELEASE_NOTES.md. Impact: brief only.
- ksef-api / ksef-docs (HEAD `ce3670e`, 2.9.0 of 2026-10-14), ksef-pdf-generator (1.1.48),
  ksef-schematy (`cd826b8`, 2026-05-11), ksef-latarnia (`b3d8196`, 2026-01-23): no commits since the
  2026-11-09 run at the time of this run. Impact: none.
- **Added in local verification 2026-11-23, NOT yet processed:** later on 2026-11-16 (commits 16:15
  UTC) ksef-api released **2.10.0** (TEST 16.11.2026, DEMO/PROD not yet): `rev2` token endpoints
  with validity period and approval (`POST /tokens/{referenceNumber}/approve`), old token endpoints
  deprecated and withdrawn 30.09.2027; `GET /auth/rev2/...` and `/auth/sessions/rev2`, old ones kept
  until 15.06.2027 (the announced 2026-11-16 removal of `authenticationMethod` will not happen);
  `Deprecation`/`Sunset` headers, `410 Gone` after withdrawal. ksef-client-csharp 2.10.0 followed on
  2026-11-18. https://github.com/CIRFMF/ksef-api/blob/main/api-changelog.md. Next run: update this
  brief and `tokeny-ksef-po-2026.md`.
- `pnpm update-schemas`: crd.gov.pl unreachable, every download `fetch failed`, script fell back to
  bundled files (and still printed "All schemas are up to date"); schemas not verified.

---

## 2026-10-19 → 2026-11-09 (partial run, GitHub only; `Last checked` not updated)

Official hosts were unreachable from the run environment again (proxy refused CONNECT with HTTP
403): ksef.podatki.gov.pl, api.sejm.gov.pl, legislacja.rcl.gov.pl, dziennikustaw.gov.pl,
isap.sejm.gov.pl, www.sejm.gov.pl, www.senat.gov.pl, www.gov.pl, eureka.mf.gov.pl, crd.gov.pl. Law,
MF guidance and schemas were not checked by this run; this is not a "no changes" entry. (The Sejm
vote on UD477 of 2026-11-06 was recorded separately in `sankcje-ksef-ud477.md` on 2026-11-07.) Open
issue: https://github.com/ksefuj/ksefuj/issues/127.

### Technical (API/schemas/GitHub)

- Draft of new KSeF token rules published for discussion by the API team (2026-11-06, comments to
  2026-11-20): `rev2` endpoints from 2027-01-01, validity default 90 days / max 365, approval of
  tokens requested after a token login, 100 tokens per context, old-endpoint tokens valid 90 days
  from 2027-01-01, pre-2027 tokens valid to 2027-11-30, old endpoints withdrawn 2027-09-30:
  https://github.com/CIRFMF/ksef-api/issues/885. Issues #834 and #461 closed the same day. Impact:
  briefs `tokeny-ksef-po-2026.md`, `rozporzadzenie-ksef-i-tokeny.md`, `api-ksef-zmiany-cirfmf.md`;
  posts `tokeny-ksef-po-2026` (backlog UPDATE); validator none.
- ksef-pdf-generator 1.1.48 (changelog 2026-11-06): PDF `Producer`/`Creator` metadata, watermark on
  PEF invoices and UPO: https://github.com/CIRFMF/ksef-pdf-generator/blob/main/changelog.md. Impact:
  brief only.
- ksef-api / ksef-docs (HEAD `ce3670e`, 2.9.0 of 2026-10-14), ksef-client-csharp (2.9.0),
  ksef-client-java (3.0.29), ksef-schematy, ksef-latarnia: no commits or releases since the
  2026-10-19 run. Impact: none.
- `pnpm update-schemas`: crd.gov.pl unreachable, every download `fetch failed`, script fell back to
  bundled files (and still printed "All schemas are up to date"); schemas not verified.

---

## 2026-10-07 → 2026-10-19 (partial run, GitHub only; `Last checked` not updated)

Official hosts were unreachable from the run environment (proxy refused CONNECT with HTTP 403):
ksef.podatki.gov.pl, api.sejm.gov.pl, legislacja.rcl.gov.pl, www.gov.pl, dziennikustaw.gov.pl,
isap.sejm.gov.pl, eureka.mf.gov.pl, www.sejm.gov.pl, crd.gov.pl. Law, MF guidance and schemas were
not checked; this is not a "no changes" entry. Open issue:
https://github.com/ksefuj/ksefuj/issues/127.

### Technical (API/schemas/GitHub)

- ksef-api 2.9.0 (PROD 2026-10-15): `OwnerPermissionScope` in POST
  /permissions/query/personal/grants; error 21001 documented in OpenAPI (code existed before):
  https://github.com/CIRFMF/ksef-api/blob/main/api-changelog.md. Impact: brief
  `api-ksef-zmiany-cirfmf.md`; posts none; validator none.
- ksef-client-csharp 2.9.0 (2026-10-14), return type change for personal permission search:
  https://github.com/CIRFMF/ksef-client-csharp/blob/main/RELEASE_NOTES.md. Impact: brief only.
- ksef-pdf-generator 1.1.46 (2026-10-14), visualisation fixes (number formatting, decimal
  separators, rounding): https://github.com/CIRFMF/ksef-pdf-generator/blob/main/changelog.md.
  Impact: brief only.
- `faktury/weryfikacja-faktury.md` (strict XML rules, PROD 2026-10-19): no commits since 2026-09-22.
  ksef-client-java (last 3.0.29, 2026-09-25), ksef-schematy, ksef-latarnia: no commits since
  2026-10-07. Impact: none.
- `pnpm update-schemas`: crd.gov.pl unreachable, script fell back to bundled files; schemas not
  verified.

---

## 2026-04-01 → 2026-10-07 (catch-up run, checked 2026-10-07)

### Law in force

- No KSeF-relevant statute or regulation entered into force in the period beyond the VAT Act
  consolidated text, Dz.U. 2026 poz. 1263 (https://api.sejm.gov.pl/eli/acts/DU/2026/1263): art.
  106ni penalty from 2027-01-01; art. 145m (10 000 zł) and art. 145n (cash registers) until
  2026-12-31; art. 113 threshold 240 000 zł. Impact: briefs, posts (see PR CONTENT IMPACT).
- Dz.U. 2026 poz. 1270 (act of 2026-09-04, mostly in force 2027-01-01): not KSeF (adds art. 113 ust.
  1a, admin relief). https://api.sejm.gov.pl/eli/acts/DU/2026/1270. Impact: none.
- Regulation Dz.U. 2026 poz. 169 (2026-02-13) changed §13 ust. 1 pkt 2 and §15 pkt 2 dates of Dz.U.
  2025 poz. 1815: https://api.sejm.gov.pl/eli/acts/DU/2026/169. Impact: brief
  `rozporzadzenie-ksef-i-tokeny.md`.

### Drafts in progress

- UD477 (draft 2026-09-22; uzgodnienia/konsultacje 2026-09-23, comments to 2026-09-30; planned in
  force 2026-12-31): art. 106ni ust. 1–3, 5–7 from 2028-01-01, art. 145e reverse charge to
  2030-06-30. https://legislacja.rcl.gov.pl/projekt/12414954. Impact: new brief
  `sankcje-ksef-ud477.md`, posts, validator none.
- MF announcement 2026-09-16, penalties deferred to end of 2027:
  https://www.gov.pl/web/finanse/przedluzenie-odroczenia-kar-za-bledy-w-stosowaniu-ksef-do-konca-2027-r.
  Impact: briefs, posts.
- Amending regulation to keep KSeF tokens: announced (MF consultation summary 2026-06-11), no draft
  found yet.
  https://ksef.podatki.gov.pl/wyjasnienia/pierwsze-konsultacje-po-czesciowym-wdrozeniu-ksef-podsumowanie.
  Impact: brief `rozporzadzenie-ksef-i-tokeny.md`, `certyfikaty-tokeny.md`, posts.

### MF guidance & docs

- FAQ "Najczęstsze pytania" (2026-04-15, modified 2026-04-29), 25 Q&A (deduction kept, formal
  defect, no 2026 sanctions, limit counting):
  https://ksef.podatki.gov.pl/ksef-news/najczestsze-pytania/. Impact: brief
  `mf-faq-podreczniki-2026.md`, posts.
- FAQ KSeF 2.0 (modified 2026-09-11): Q10 VAT-exempt taxpayers are in KSeF; art. 108g / 108a ust. 3
  pkt 3 from 2027-01-01: https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20. Impact: briefs
  `ksef-dla-jdg.md`, `limit-10000-zl.md` corrected; posts.
- Podręcznik KSeF 2.0 cz. I–IV and AP manual re-issued 2026-08-06, mobile app manual 2026-08-31:
  https://ksef.podatki.gov.pl/pliki-do-pobrania-ksef-20/. Impact: briefs (cz. II note), none
  otherwise.
- FA(3) broszura (Aug 2026 file, 173 pp.) vs repo conversion (March 2026, 174 pp.), no changelog
  entry:
  https://ksef.podatki.gov.pl/media/nuclnu0w/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf
  Diff done 2026-10-08: no content changes, see `briefs/broszura-fa3-wydania.md`. Impact: none.
- Technical notices (Profil Zaufany outages May 2026, node certificate change 2026-07-03, AP prod
  difficulties 2026-09-25): https://ksef.podatki.gov.pl/komunikaty-techniczne/. Impact: none.
- Legal-basis page modified 2026-05-29:
  https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/podstawy-prawne-oraz-kluczowe-terminy/.
  Impact: none (consistent).

### Technical (API/schemas/GitHub)

- FA(3) XSD and 3 dependent XSDs on crd.gov.pl: identical to bundled files (`pnpm update-schemas`
  reported no changes). Impact: none.
- ksef-api 2.4.0 to 2.8.1 (strict XML validation, PROD enforcement 2026-10-19; 410 Gone;
  publicKeyId; TarGz; collective identifiers; 100-day date range; new limit groups; error 21184):
  https://github.com/CIRFMF/ksef-api/blob/main/api-changelog.md. Impact: brief
  `api-ksef-zmiany-cirfmf.md`, posts, validator (XML-level rules possible).
- Issue #834, tokens issued by 2026-12-31 valid to 2027-11-30 (maintainer):
  https://github.com/CIRFMF/ksef-api/issues/834. Impact: briefs, posts.
- Issue #875, `authenticationMethod` removal via new operation revision, 12-month transition:
  https://github.com/CIRFMF/ksef-api/issues/875. Impact: brief only.
- ksef-docs merged into ksef-api; SDK releases (C# 2.6.0–2.8.1, Java 3.0.24–3.0.29, pdf-generator
  1.1.40): https://github.com/CIRFMF/ksef-pdf-generator. Impact: none.
