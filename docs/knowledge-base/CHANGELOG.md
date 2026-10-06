# Knowledge Changelog

What changed in KSeF law and official documentation, newest first. One entry per weekly knowledge
run: date range, each change with its official source, and its impact on this repo (briefs, posts,
validator, none).

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
  https://ksef.podatki.gov.pl/media/nuclnu0w/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf.
  Impact: validator (needs human diff), none confirmed.
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
