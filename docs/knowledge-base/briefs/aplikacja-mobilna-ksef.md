# Research Brief: Aplikacja mobilna KSeF

**Requested by:** Orchestrator (backlog `aplikacja-mobilna-ksef`) **Date:** 2026-11-09 **For
content:** blog post „Aplikacja mobilna KSeF” **Target persona:** Ania (JDG, a few invoices a month)
**Method:** built only from the existing KB and published posts. Official hosts were not reachable
from this environment on 2026-11-09 (proxy 403 / DNS failure), so nothing was re-read live. The
baseline is the one in `WATCHLIST.md` (verified 2026-10-07) plus the mobile manual edition of
2026-08-31 recorded in `CHANGELOG.md`.

**Target query:** „aplikacja mobilna KSeF”

**Answer in two sentences:** MF provides the Aplikacja Mobilna KSeF for free, alongside the
Aplikacja Podatnika KSeF and e-mikrofirma. It issues and receives e-invoices (Podręcznik KSeF 2.0
cz. II, pkt 3.1), but according to the MF mobile app manual (pkt 1.1) it issues only basic domestic
invoices in PLN, plus corrections of invoices that were issued in the mobile app itself.

**What changes the answer:**

- **Invoice type.** Advance invoices (zaliczkowa), invoices in foreign currency, foreign
  transactions, and corrections of invoices issued elsewhere (AP, another program) fall outside the
  scope described in the mobile manual pkt 1.1. Per KB, the alternatives are the AP (web) or a
  commercial program (fact 3).
- **Offline / outage.** The KB has no statement on whether the mobile app issues offline. The FAQ
  says only that the AP issues "jedynie faktury w trybie online" (fact 7). Offline issuing needs a
  program that supports the mode and a KSeF certificate typ 2 (fact 8).
- **Date.** From 1.01.2027 the art. 145m 10 000 zł rule ends, and MF says its free tools "mogą być
  docelowym narzędziem" (fact 5). Penalty status: see `sankcje-ksef-ud477.md`.

---

## Key Facts (ready to use)

1. **The MF tool is free and named in the official list of free tools.** Podręcznik cz. II pkt 3.1
   lists: AP KSeF, „Aplikacja Mobilna KSeF — wystawianie, odbieranie w czasie rzeczywistym,
   zarządzanie z dowolnego miejsca”, e-mikrofirma.
   - Source: Podręcznik KSeF 2.0 cz. II (06.08.2026), pkt 3.1 (KB: `podrecznik-ksef-20-czesc-ii.md`
     l. 785-795); https://ksef.podatki.gov.pl/pliki-do-pobrania-ksef-20/ . Tier 2. Confidence: HIGH.
     Ania: yes.
2. **No paid program is needed.** MF page: „Nie. Ministerstwo Finansów zapewnia bezpłatne narzędzia
   – Aplikację Podatnika KSeF … i Aplikację Mobilną KSeF.”
   - Source:
     https://ksef.podatki.gov.pl/czy-trzeba-miec-platny-program-zeby-wystawiac-faktury-w-ksef/ (KB:
     `zwolniony-z-vat-ksef.md` fact 15). Also FAQ KSeF 2.0
     (https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20; KB:
     `faktura-z-kasy-fiskalnej-ksef-2027.md` fact 14). Tier 3. HIGH. Ania: yes.
3. **Issuing scope: basic invoices and their corrections, domestic transactions, PLN only.
   Corrections only for invoices issued in the mobile app.**
   - Source: Podręcznik Aplikacji Mobilnej KSeF, pkt 1.1 (edition 2026-08-31 per `CHANGELOG.md`; KB:
     `aplikacja-podatnika-ksef-pierwsza-faktura.md` fact 14);
     https://ksef.podatki.gov.pl/pliki-do-pobrania-ksef-20/ . Tier 2. HIGH. Ania: yes. The KB has
     only the summary, no verbatim Polish quote.
4. **Receiving: the mobile app is listed as a tool for receiving invoices ("odbieranie w czasie
   rzeczywistym").** Receiving in KSeF has been mandatory since 1.02.2026, regardless of the
   deferral of issuing. Without an integrated program the free MF tools (AP, Aplikacja Mobilna,
   e-mikrofirma) are enough.
   - Source: Podręcznik cz. II pkt 3.1 and pkt 6.2 (s. 96) (KB: `podrecznik-ksef-20-czesc-ii.md` l.
     1105-1115; `jak-odebrac-fakture-ksef.md` fact 7; `koniec-limitu-10000-zl.md` fact 8). Tier 2.
     HIGH for "the tool exists for receiving". HOW receiving works in the app: NOT IN KB.
5. **The free MF tools "mogą być docelowym narzędziem" for issuing from 2027.**
   - Source: Podręcznik cz. I s. 21; cz. II s. 96 (KB: `koniec-limitu-10000-zl.md` fact 9;
     `ksef-checklist-przygotowanie.md` fact 24). Tier 2. HIGH. Ania: yes.
6. **Official MF page for the mobile app exists:**
   https://ksef.podatki.gov.pl/aplikacja-podatnika-ksef-i-inne-narzedzia/aplikacja-mobilna-ksef/
   (status 200 on 2026-10-07 per `aplikacja-podatnika-ksef-pierwsza-faktura.md` source table). Its
   contents (store links, requirements) are NOT extracted in the KB. Tier 3. HIGH (existence only).
7. **The AP (web) issues only online.** „W Aplikacji Podatnika KSeF 2.0 wystawiamy jedynie faktury w
   trybie online.”
   - Source: FAQ „Najczęstsze pytania”, Q11 (modified 2026-04-29),
     https://ksef.podatki.gov.pl/ksef-news/najczestsze-pytania/ (KB: `mf-faq-podreczniki-2026.md`;
     `awaria-ksef-offline.md` fact 7). Tier 3. HIGH. **This statement is about the AP, NOT the
     mobile app.** Do not transfer it to the mobile app.
8. **Offline issuing prerequisites (all tools): KOD II (CERTYFIKAT) requires a KSeF certificate typ
   2, generated in advance, valid up to 2 years; the taxpayer obtains it from KSeF (art. 106nda ust.
   7).** Offline needs software that supports the mode.
   - Source: Podręcznik cz. II s. 85, pkt 5.6 s. 90; FAQ; ustawa o VAT art. 106nda ust. 7 (KB:
     `awaria-ksef-offline.md` fact 7). Tier 1/2. HIGH. Related: Podręcznik cz. I s. 42 says a KSeF
     certificate cannot be used to authenticate in MF's free tools such as the AP (KB:
     `logowanie-ksef.md` fact 3). The KB does not say whether this applies to the mobile app. Do not
     draw a conclusion about mobile offline from these two facts.
9. **Offline modes have no change from 1.01.2027 in KB (statute or mobile app).** Offline24,
   niedostępność, awaria (7 dni roboczych), awaria całkowita stay. „Zmiany dla aplikacji mobilnej
   offline: not found in KB.”
   - Source: KB `ksef-checklist-przygotowanie.md` fact 22. HIGH (absence in KB), not a source
     statement.
10. **JDG access: owner permissions are automatic for a natural person who is a VAT taxpayer with a
    NIP, no ZAW-FA, no "account" to create.**
    - Source: FAQ MF (Uprawnienia Q2-Q4, Q8) (KB: `zwolniony-z-vat-ksef.md` fact 14;
      `faktura-z-kasy-fiskalnej-ksef-2027.md` fact 14). Tier 3. HIGH. Applies to KSeF in general.
      The KB has no mobile-specific confirmation.
11. **Mobile manual edition: 2026-08-31** (AP manual and Podręcznik cz. I-IV: 2026-08-06).
    - Source: `CHANGELOG.md` l. 73; `WATCHLIST.md` l. 38. HIGH. Freshness: check for a newer edition
      before publishing.

---

## Not in KB / unsettled (do NOT state definitively)

- **Login method to the mobile app.** No source in the corpus states it (`logowanie-ksef.md` fact
  21: "Do not describe it"). The AP login methods (login.gov.pl, qualified certificate; AP manual
  4.1 s. 14) must NOT be presented as the mobile app's login methods.
- **Where to download / app stores (Google Play, App Store), supported systems, version.** NOT IN
  KB. The MF page (fact 6) was not extracted. Do not name stores or give store links.
- **Offline use of the mobile app in 2027 (infor.pl, 2026-10-07).** Could NOT be confirmed: the KB
  has no Tier 1-3 statement, and infor.pl is not a source (news article). Offline in the mobile app,
  now or in 2027: unsettled. Only fact 7 (AP online only) and fact 8 (offline prerequisites) are
  sourced.
- **Receiving details** (list, filters, download XML/PDF, UPO, notifications in the mobile app). NOT
  IN KB. The mobile manual was read for issuing only (`jak-odebrac-fakture-ksef.md` fact 7 caveat).
  Only "odbieranie w czasie rzeczywistym" (pkt 3.1) is sourced.
- **Foreign currency, foreign buyers, advance, margin, extended invoice types.** Per pkt 1.1 they
  fall outside the mobile scope (domestic, PLN, basic). The exact list of excluded types is not in
  KB. Say "tylko podstawowe faktury krajowe w złotych" and send other cases to the AP or a program.
- **"Zarządzanie z dowolnego miejsca"** (cz. II pkt 3.1): which management functions (permissions,
  tokens, certificates) the mobile app offers is NOT IN KB.
- **Whether the mobile app works for VAT-exempt sellers, e.g. P_19 exemption fields.** NOT IN KB.
- **QR codes / PDF visualisation generated by the mobile app, delivery to a buyer outside KSeF.**
  NOT IN KB.

---

## Not fetched live (cited from KB / published posts, all last verified ≤ 2026-10-07)

- https://ksef.podatki.gov.pl/aplikacja-podatnika-ksef-i-inne-narzedzia/aplikacja-mobilna-ksef/
- https://ksef.podatki.gov.pl/pliki-do-pobrania-ksef-20/ (Podręcznik Aplikacji Mobilnej KSeF
  31.08.2026; Podręcznik KSeF 2.0 cz. I, cz. II 06.08.2026; AP manual 06.08.2026)
- https://ksef.podatki.gov.pl/czy-trzeba-miec-platny-program-zeby-wystawiac-faktury-w-ksef/
- https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20
- https://ksef.podatki.gov.pl/ksef-news/najczestsze-pytania/
- https://ap.ksef.mf.gov.pl

The backlog path `/mobilna-ksef-20/` does NOT appear in the KB or any post. Do not use it.

---

## Suggested Sources Section

- Aplikacja mobilna KSeF (MF):
  https://ksef.podatki.gov.pl/aplikacja-podatnika-ksef-i-inne-narzedzia/aplikacja-mobilna-ksef/
- Podręcznik Aplikacji Mobilnej KSeF (31.08.2026), pkt 1.1:
  https://ksef.podatki.gov.pl/pliki-do-pobrania-ksef-20/
- Podręcznik KSeF 2.0 cz. II, pkt 3.1, 6.2: https://ksef.podatki.gov.pl/pliki-do-pobrania-ksef-20/
  (the published guide `jak-odebrac-fakture-ksef` uses the direct PDF:
  https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf)
- MF: Czy trzeba mieć płatny program:
  https://ksef.podatki.gov.pl/czy-trzeba-miec-platny-program-zeby-wystawiac-faktury-w-ksef/
- FAQ MF Najczęstsze pytania (Q11): https://ksef.podatki.gov.pl/ksef-news/najczestsze-pytania/

---

## Warning: Common Misconceptions

- **"The mobile app = full replacement for the AP or a program."** No: basic domestic PLN invoices
  and corrections of its own invoices only (mobile manual pkt 1.1).
- **"The mobile app corrects any invoice."** No: only invoices issued in the mobile app.
- **"The mobile app works offline in 2027"** (infor.pl 2026-10-07). Not confirmed by any Tier 1-3
  source in KB.
- **"The AP is online only, so the mobile app is too"** (or the reverse). The FAQ statement covers
  the AP only.
- **"You log in to the mobile app like in the AP / with a token."** Not in corpus. Tokens and KSeF
  certificates are not AP login methods (cz. I s. 42), and the mobile login is undocumented in KB.
- **"KSeF 1.0 mobile app / ksef.mf.gov.pl."** KSeF 1.0 is dead since 1.02.2026. Any KSeF 1.0-era
  mobile tool description is stale.
- **"You must pay / activate KSeF to use the app."** False: the tools are free and a JDG gets owner
  permissions automatically (fact 2, fact 10; post `/blog/oplata-za-wpis-ceidg-oszustwo`).

---

## Cross-References (published PL content, verified to exist 2026-11-09)

- `/guides/aplikacja-podatnika-ksef-pierwsza-faktura`, § „Czego aplikacja nie zrobi” (l. 139-150:
  mobile scope paragraph + MF link), FAQ „Czy wystawię fakturę w Aplikacji Podatnika offline?”.
  Consistent with facts 3, 7.
- `/guides/jak-odebrac-fakture-ksef`, § „Gdzie zobaczyć i pobrać fakturę zakupową” (receiving also
  in the mobile app). Consistent with fact 4.
- `/guides/logowanie-ksef`, § „Jak wygląda logowanie”, § „Token i certyfikat KSeF są dla programów,
  nie dla ciebie” (AP login only, not mobile).
- `/blog/koniec-limitu-10000-zl`, § „2. Wybierz program” (free MF tools as the target tool from
  2027). Consistent with fact 5.
- `/guides/awaria-ksef-offline`, § „Przygotuj się, zanim coś się zepsuje” (certificate typ 2, AP
  online only). Consistent with facts 7, 8.
- `/blog/ksef-checklist-przygotowanie`, § „Co sprawdzić, choć się nie zmienia” (free tools incl.
  mobile app).
- `/blog/oplata-za-wpis-ceidg-oszustwo` (free MF tools, no "activation fee").

## KB inconsistency noted (not resolved here)

- `certyfikaty-tokeny.md` §4 (Fact 4.3) describes certificate typ 2 as one "dla podmiotu
  upoważnionego" (accounting firms/ERP). `awaria-ksef-offline.md` fact 7 (Podręcznik cz. II s.
  85, 90) describes typ 2 as what the taxpayer needs for offline KOD II. Check against Podręcznik
  cz. I before the post mentions certificate types. Safer: link to `/guides/awaria-ksef-offline`
  instead of explaining.

## Freshness Markers

| Claim                             | Basis                    | Re-check when                                 |
| --------------------------------- | ------------------------ | --------------------------------------------- |
| Mobile scope (PLN, domestic, own) | Mobile manual 2026-08-31 | New mobile manual edition / app release notes |
| Mobile offline status             | Not in KB                | Any MF statement; next live fetch of MF page  |
| AP online only (FAQ Q11)          | FAQ modified 2026-04-29  | FAQ edit                                      |
| Free tools as target from 2027    | Podręcznik 2026-08-06    | New Podręcznik edition                        |
| Penalty start date                | UD477 (not yet law)      | Senate / President / Dz.U.                    |
