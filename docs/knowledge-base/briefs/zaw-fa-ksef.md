# Research Brief: ZAW-FA w KSeF 2.0 (kiedy jest potrzebny)

**Requested by:** Copywriter (backlog `zaw-fa-ksef`) **Date:** 2026-11-27 **For content:** blog post
„ZAW-FA: kiedy jest potrzebny” **Personas:** Ania (JDG), Pani Krystyna (biuro rachunkowe)

**Baseline:** knowledge base only (no live fetch possible on 2026-11-27, see last section).
Podręcznik KSeF 2.0 cz. I and AP manual: editions of 2026-08-06; KSeF regulation Dz.U. 2025 poz.
1815 as amended by Dz.U. 2026 poz. 169 (WATCHLIST.md).

**Target query:** „ZAW-FA KSeF” (also „czy JDG musi składać ZAW-FA”, „ZAW-FA dla księgowej”, „jak
złożyć ZAW-FA w e-Urzędzie Skarbowym”)

**Answer in two sentences:** ZAW-FA is needed when a taxpayer that is not a natural person (e.g. a
spółka) cannot authenticate in KSeF with a qualified seal: it names exactly one natural person, who
then gets i.a. permission management, issuing and access to invoices and adds further people
electronically (Dz.U. 2025 poz. 1815 § 5 ust. 1; Podręcznik KSeF 2.0 cz. I, pp. 58-60). A JDG does
not file it, because owner permissions are assigned to its NIP automatically, except to register its
own qualified signature that contains neither NIP nor PESEL; access for an accountant is granted
electronically, without ZAW-FA (cz. I, p. 57).

**What changes the answer:**

- **Natural person vs not:** JDG = automatic owner permissions, no ZAW-FA (facts 4-5); non-natural
  person = qualified seal or ZAW-FA (facts 2-3).
- **Qualified seal available:** a non-natural person with a qualified seal can log in with it
  instead (fact 2).
- **Own qualified signature without NIP and PESEL:** the one JDG case for ZAW-FA (fact 5); after
  renewal/replacement of such a signature, permissions must be registered again (fact 12).
- **Whose signature lacks NIP/PESEL:** the accountant's such signature is registered electronically
  via its fingerprint in AP, not via ZAW-FA (fact 13).
- **Channel:** ePUAP stopped being an effective channel on 1.01.2026 (fact 8).
- **Changing the named person:** two filings, revoke then grant (fact 10).

## Key Facts (ready to use)

### A. What ZAW-FA is and its legal basis

1. **ZAW-FA is a notification used for granting/revoking KSeF permissions „wyłącznie w określonych
   sytuacjach”; the default route is electronic (AP KSeF 2.0 or a program integrated with API KSeF
   2.0), and the taxpayer chooses the tool.** Source: Podręcznik KSeF 2.0 cz. I (06.08.2026), p. 56
   (via `biuro-rachunkowe-ksef-kto-co-robi.md` B6),
   https://ksef.podatki.gov.pl/media/dmrfdixs/podrecznik-ksef-20-cz-i-rozpoczecie-korzystania-z-ksef-06082026.pdf.
   Verbatim (fragment only in KB): „wyłącznie w określonych sytuacjach”. Tier 2. MF guidance.
   Confidence: HIGH. Ania: yes. Krystyna: yes.
   - The current form version is named **ZAW-FA(3)** in the KB (cz. I pp. 58-61; MF notice
     https://www.gov.pl/web/finanse/formularz-zaw-fa3-dostepny-w-e-us). The **full official title of
     the zawiadomienie is NOT in the KB** (OPEN). Our FAQ post describes it as „formularz
     zawiadomienia o nadaniu lub odebraniu uprawnień w KSeF” (our output, not a source).
2. **Legal basis in the regulation: § 5 ust. 1 of Dz.U. 2025 poz. 1815.** A taxpayer or entity that
   is not a natural person and cannot authenticate with a qualified seal names one natural person in
   ZAW-FA. Source: Rozporządzenie MF w sprawie korzystania z KSeF, Dz.U. 2025 poz. 1815 § 5 ust. 1,
   https://api.sejm.gov.pl/eli/acts/DU/2025/1815 (via `logowanie-ksef.md` fact 12,
   `uprawnienia-ksef-ksiegowa.md` fact 12). Verbatim of § 5: **not in KB** (only the paraphrase
   „podmiot niebędący osobą fizyczną, który nie może uwierzytelnić się pieczęcią kwalifikowaną”,
   `wspolnota-mieszkaniowa-ksef.md` fact 15, attributed to § 5 ust. 1 and cz. I pp. 58-61). Tier 1
   (law). Confidence: HIGH (provision and content), verbatim missing.
3. **Statute: art. 106nb VAT Act lists persons indicated in ZAW-FA among those who may use KSeF**
   (with the taxpayer, „podmioty wskazane przez podatnika” and persons indicated by authorised
   natural persons). Source: Ustawa o VAT art. 106nb (via `biuro-rachunkowe-ksef-kto-co-robi.md`
   B1); the KB gives a paraphrase, not the statutory text, and no paragraph (ustęp) numbers. Tier 1.
   Confidence: MEDIUM (paraphrase only). **Art. 106m as a basis: not in KB (OPEN).** The older claim
   „§ 4–5” of the regulation (`ksef-checklist-przygotowanie.md`) is unverified for § 4.

### B. Who files it

4. **Non-natural person without a qualified seal: ZAW-FA names exactly one natural person, who need
   not appear in KRS, and who receives i.a. permission management, issuing invoices and access to
   invoices; further people are then added electronically.** Source: Dz.U. 2025 poz. 1815 § 5 ust.
   1; cz. I pp. 58-60 (via `logowanie-ksef.md` fact 12; `uprawnienia-ksef-ksiegowa.md` fact 12).
   Tier 1/2. Confidence: HIGH. Krystyna: yes (company clients). Ania: no.
   - Alternative for such an entity: log in with its qualified seal (`logowanie-ksef.md` fact 12;
     regulation § 6 ust. 1 pkt 3 per `logowanie-ksef.md` misconceptions). HIGH.
   - Cz. II, pkt 1.5 KROK 1: „Podmiot niebędący osobą fizyczną → pieczęć kwalifikowana lub
     zawiadomienie ZAW-FA” (KB extract wording, 2026-02-01 edition,
     `podrecznik-ksef-20-czesc-ii.md`). HIGH.
   - **Entity types:** the KB names spółka z o.o. only in our own guide example. Fundacja,
     stowarzyszenie, JST, wspólnota mieszkaniowa: **not named by MF in KB** (the wspólnota brief
     fact 15 explicitly says the KB does not apply ZAW-FA to wspólnoty by name). Copywriter may say
     „podmiot, który nie jest osobą fizyczną”, not list types as MF's. OPEN.
   - **Who signs ZAW-FA for a spółka (representation rules):** not in KB. OPEN.
   - **Who holds the „właściciel” role in a company's NIP context:** not in KB
     (`kontekst-logowania-ksef.md` fact 10). OPEN.

### C. Who does not file it

5. **JDG (natural person running a business): owner permissions are assigned automatically to the
   NIP (issuing, access to invoices, permission management, subordinate units, session history,
   viewing permissions) and cannot be revoked; such a person does not file ZAW-FA to designate a
   person acting for it. Only exception: registering the unique data of its own signature.** Source:
   cz. I p. 57 (via `logowanie-ksef.md` fact 10; `uprawnienia-ksef-ksiegowa.md` facts 1-2). Tier 2.
   Confidence: HIGH. Ania: yes.
   - Verbatim, Podręcznik Aplikacji Mobilnej (2026-08-31), pkt 3, pp. 23-24: „W przypadku podatników
     będących osobami fizycznymi pierwotne uprawnienie o charakterze właścicielskim jest przypisane
     automatycznie. Osoba taka nie musi nic zgłaszać.” (via `kontekst-logowania-ksef.md` fact 9).
     Tier 2. HIGH.
   - Our posts cite this as „Podręcznik KSeF 2.0, cz. I, pkt 3.2.1” (`najem-lokalu-ksef.mdx`) and
     „s. 57” (`logowanie-ksef.mdx`, `zwolniony-z-vat-ksef.mdx`).
6. **Accountant / biuro access is granted electronically, not via ZAW-FA:** AP path Uprawnienia →
   Nadaj uprawnienie; for an office „Podmiotowi do wystawiania i przeglądania faktur” (NIP, full
   name, scope, optional „z prawem do dalszego przekazywania uprawnienia”). Source: FAQ MF
   „Najczęstsze pytania” pyt. 17, https://ksef.podatki.gov.pl/ksef-news/najczestsze-pytania/; AP
   manual p. 145,
   https://ksef.podatki.gov.pl/media/qocjn3ai/podrecznik-uzytkownika-aplikacji-podatnika-ksef-20_06082026.pdf
   (via `uprawnienia-ksef-ksiegowa.md` fact 4). Tier 3/2. MF guidance. Confidence: HIGH. Ania: yes.
   Krystyna: yes.
7. **Permissions can also be granted in a program integrated with API KSeF 2.0; no „account” has to
   be created.** Source: FAQ KSeF 2.0 pyt. 6, 8,
   https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20 (via `uprawnienia-ksef-ksiegowa.md` fact
   18). Tier 3. HIGH.

### D. Channels and filing

8. **ZAW-FA(3) is filed on paper, via the interactive form in e-Urząd Skarbowy (Dokumenty → Złóż
   dokument) or via e-Doręczenia; a ZAW-FA sent via ePUAP is not effective since 1.01.2026.**
   Source: cz. I pp. 58-61; MF notice
   https://www.gov.pl/web/finanse/formularz-zaw-fa3-dostepny-w-e-us (Tier 3); FAQ KSeF 2.0 pyt. 16
   (via `uprawnienia-ksef-ksiegowa.md` fact 13; `logowanie-ksef.md` fact 13). Tier 2/3. Confidence:
   HIGH. Our uprawnienia guide cites pp. 58-59 for ePUAP.
   - Background (not ZAW-FA-specific): ePUAP equivalence with e-Doręczenia ended 31.12.2025 (art.
     147 ust. 2-3 ustawy o doręczeniach elektronicznych, t.j. 2026 poz. 3; `e-doreczenia-jdg.md`
     fact 15). Tier 1. HIGH.
   - **Competent tax office (which naczelnik US):** not in KB. OPEN.
   - **Signature requirements for the electronic ZAW-FA (who signs, with what in e-US):** not in KB.
     OPEN.
   - **Form fields** (beyond: purpose „nadanie”/„odebranie”, contact e-mail addresses, signature
     fingerprint): not in KB. OPEN.

### E. When it works, change, revocation

9. **Permissions from ZAW-FA work only after the tax office enters the data into the system; a
   confirmation e-mail goes to the addresses given in the form.** Source: cz. I pp. 58-61 (our guide
   cites p. 33 for the e-mail); FAQ KSeF 2.0 pyt. 16 (via `uprawnienia-ksef-ksiegowa.md` fact 13).
   Tier 2/3. Confidence: HIGH. **No processing time is stated in the KB** (OPEN; do not give a
   number of days).
10. **To change the person named in ZAW-FA: first a ZAW-FA with purpose „odebranie uprawnień” for
    person A, then „nadanie” for person B. Revoking A does not revoke permissions that A granted to
    others.** Source: cz. I p. 60 (via `uprawnienia-ksef-ksiegowa.md` fact 14). Tier 2. HIGH.
    Krystyna: yes.
11. **After login, the ZAW-FA person authenticates with their own method (login.gov.pl or a
    qualified signature) and enters the company's NIP as the context identifier.** Source: our guide
    `logowanie-ksef.mdx` § „Spółka loguje się…”, citing § 5 ust. 1 and cz. I pp. 58-61; consistent
    with `kontekst-logowania-ksef.md` facts 9-10. Tier 2. Confidence: MEDIUM (KB has no direct page
    cite for the „enter NIP of the company” step in the ZAW-FA context).
    - General revocation: only a person with „zarządzanie uprawnieniami” can revoke electronically
      (FAQ-NP pyt. 18, `biuro-rachunkowe-ksef-kto-co-robi.md` C1). HIGH.

### F. Signature fingerprint („odcisk palca”)

12. **A qualified certificate without NIP or PESEL needs its SHA-256 fingerprint (64 characters 0-9,
    a-f) registered; after renewal or replacement of such a signature, permissions must be
    registered again; nothing to do if the new certificate contains NIP/PESEL.** Source: cz. I pp.
    33, 66; FAQ „Najczęstsze pytania” pyt. 19; FAQ KSeF 2.0 pyt. 14, 28 (via
    `uprawnienia-ksef-ksiegowa.md` fact 15; `logowanie-ksef.md` fact 14). Tier 2/3. HIGH. Ania: yes
    (only if her signature lacks NIP/PESEL, e.g. issued abroad).
13. **AP has „Pobierz odcisk palca” (sign a file with the certificate, „Przekaż plik”); for another
    person (e.g. accountant) the fingerprint is entered in the electronic grant form (identifier
    „Brak”, date of birth, ID document).** Source: AP manual pp. 16-17, 139 (via
    `uprawnienia-ksef-ksiegowa.md` fact 16). Tier 2. HIGH. Krystyna: yes.

### G. KSeF 1.0 carry-over, cost, deadlines, penalties

14. **Validity in KSeF 2.0 of a ZAW-FA (or ZAW-FA(2)) filed for KSeF 1.0: not in KB.** No brief
    discusses migration of KSeF 1.0 permissions. OPEN. Do not claim either way.
15. **Fee for ZAW-FA: not in KB.** (e-Doręczenia to a public body cost 0 zł, `e-doreczenia-jdg.md`
    fact 14, Tier 1/3, but that concerns the channel, not ZAW-FA.) OPEN.
16. **Deadline to file ZAW-FA / penalty for not filing: none found in KB.** The KSeF penalty of art.
    106ni concerns invoicing outside KSeF, not ZAW-FA (project baseline; brief
    `sankcje-ksef-ud477.md`). Practical consequence stated only in our own guide: without effective
    permissions the entity cannot use KSeF, so „nie zostawiaj tego na dzień wystawienia faktury”
    (our output, not a source). Confidence: HIGH (absence in KB), not an MF statement.

## Not supported: do NOT reuse (older briefs built from our own output)

| Claim                                                                                           | Where                                                                                               | Status                                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| „ZAW-FA is the form to grant an accountant/biuro access” / „biuro asks every client for ZAW-FA” | `certyfikaty-tokeny.md` 6.1, 6.5, 8.4; `checklist-przygotowanie.md` 6.1, 6.3; `ksef-dla-jdg.md` 6.5 | WRONG for JDG: electronic grant (facts 5-6); `biuro-rachunkowe-ksef-kto-co-robi.md` lists „Do nadania uprawnień biuru JDG składa ZAW-FA” as a misconception.            |
| „ZAW-FA scope: three levels (read-only / issuing-only / full)”                                  | `certyfikaty-tokeny.md` 6.2; `checklist-przygotowanie.md` 6.2                                       | NOT SUPPORTED: ZAW-FA person gets i.a. permission management, issuing, access (fact 4); scope choices belong to electronic grants (fact 6).                             |
| „Certyfikat KSeF typ 2 requires ZAW-FA” / „ZAW-FA from each client before API integration”      | `certyfikaty-tokeny.md` 4.3, 6.4, 8.4; `checklist-przygotowanie.md` 6.4                             | WRONG: certificate types are `Authentication` and `Offline` (`logowanie-ksef.md` misconceptions, CIRFMF `certyfikaty-KSeF.md`); permissions are granted electronically. |
| „ZAW-FA can be granted inside Aplikacja Podatnika”                                              | `certyfikaty-tokeny.md` 6.3, misconception 5; `checklist-przygotowanie.md` 6.1(c)                   | CONFLATION: AP grants are electronic permissions, not ZAW-FA; ZAW-FA goes to the tax office (fact 8).                                                                   |
| „Accountant must be authorised via ZAW-FA”                                                      | `checklist-przygotowanie.md` misconception 6                                                        | WRONG for JDG (facts 5-6).                                                                                                                                              |
| e-US URL https://www.podatki.gov.pl/e-urzad-skarbowy/ for ZAW-FA                                | `certyfikaty-tokeny.md` sources                                                                     | Not verified as a ZAW-FA source; use the MF notice URL instead.                                                                                                         |

## Contradictions & Ambiguities (published posts vs KB)

- **„podpis lub pieczęć bez NIP/PESEL”.** `faq/dostep-i-uprawnienia.mdx` („gdy jego podpis lub
  pieczęć nie zawierają numeru NIP lub PESEL”), `blog/certyfikaty-vs-tokeny-ksef.mdx` and
  `blog/ksef-checklist-przygotowanie.mdx` („pieczęć zawiera tylko NIP”) extend the fingerprint case
  to seals. Every primary-cited brief speaks only of a qualified **signature** (certificate) without
  NIP/PESEL (facts 5, 12). The seal claim is not supported in the KB. Flag for the Judge.
- **„ZAW-FA covers only the taxpayer's own signature (or the single named person's)”.**
  `guides/uprawnienia-ksef-ksiegowa.mdx` cites cz. I pp. 33 and 57; no brief records the „jedyna
  osoba wskazana w zawiadomieniu” part. MEDIUM; verify against cz. I before reuse.
- **FAQ numbering:** FAQ question numbers are per-section and unstable in the KB (see
  `faktura-po-angielsku-ksef.md` note); prefer question titles when citing FAQ KSeF 2.0 pyt. 16.
- **Cz. II extract edition:** KROK 1 wording comes from the 2026-02-01 edition; a 2026-08-06 edition
  exists (changes judged minor, not checked line by line).

## Unsettled Questions (OPEN, do not answer definitively)

1. Full official name of the ZAW-FA(3) zawiadomienie; version history (ZAW-FA(1)/(2)).
2. Verbatim text of § 5 of Dz.U. 2025 poz. 1815; whether art. 106m (or another VAT Act article) is
   the statutory delegation; whether § 4 is relevant.
3. Which tax office is competent (naczelnik US właściwy dla podatnika?), and who must sign a
   company's ZAW-FA (representation per KRS?).
4. How long the tax office takes to enter the data.
5. Whether ZAW-FA filed for KSeF 1.0 stays effective in KSeF 2.0.
6. Fee, deadline, penalty: none found.
7. Which non-natural persons MF names (fundacja, stowarzyszenie, JST, wspólnota, spółka cywilna).
   Note: the KB has no fact on spółka cywilna in this context.
8. Whether the same e-US form is also used to revoke and to register the JDG's own fingerprint (KB
   says the JDG exception exists, not the field/procedure).

## Suggested Sources Section („Źródła”)

- Podręcznik KSeF 2.0, cz. I: Rozpoczęcie korzystania z KSeF (06.08.2026), pp. 56-61, 33, 66:
  https://ksef.podatki.gov.pl/media/dmrfdixs/podrecznik-ksef-20-cz-i-rozpoczecie-korzystania-z-ksef-06082026.pdf
- Rozporządzenie w sprawie korzystania z KSeF, Dz.U. 2025 poz. 1815, § 5 ust. 1:
  https://api.sejm.gov.pl/eli/acts/DU/2025/1815 (PDF:
  https://api.sejm.gov.pl/eli/acts/DU/2025/1815/text.pdf); amended by Dz.U. 2026 poz. 169:
  https://api.sejm.gov.pl/eli/acts/DU/2026/169
- MF: formularz ZAW-FA(3) dostępny w e-US:
  https://www.gov.pl/web/finanse/formularz-zaw-fa3-dostepny-w-e-us
- Podręcznik użytkownika Aplikacji Podatnika KSeF 2.0 (06.08.2026), pp. 16-17, 139, 145:
  https://ksef.podatki.gov.pl/media/qocjn3ai/podrecznik-uzytkownika-aplikacji-podatnika-ksef-20_06082026.pdf
- FAQ MF KSeF 2.0: https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20
- FAQ MF „Najczęstsze pytania” (pyt. 17-19):
  https://ksef.podatki.gov.pl/ksef-news/najczestsze-pytania/

## Warning: Common Misconceptions

- „JDG musi złożyć ZAW-FA, żeby korzystać z KSeF.” No: automatic owner permissions (fact 5).
- „Żeby księgowa miała dostęp, składam ZAW-FA.” No for JDG: electronic grant in AP or program (facts
  6-7).
- „ZAW-FA wyślę przez ePUAP.” Not effective since 1.01.2026 (fact 8).
- „Uprawnienia z ZAW-FA działają od razu po wysłaniu.” Only after the tax office enters the data
  (fact 9).
- „W ZAW-FA wskażę kilka osób.” Exactly one; further people electronically (fact 4).
- „Zmiana osoby = jedno nowe ZAW-FA.” Revoke A, then grant B; A's grants to others stay (fact 10).
- „Certyfikat KSeF typ 2 wymaga ZAW-FA.” Wrong (see table above).
- „Logowanie do ksef.mf.gov.pl” — KSeF 1.0 address, dead since 1.02.2026 (stale).

## Not fetched live on 2026-11-27

One check of https://www.gov.pl/web/finanse/formularz-zaw-fa3-dostepny-w-e-us returned proxy
HTTP 403. Nothing below was re-read today; all facts come from KB briefs verified 2026-10-07 to
2026-11-11:

- Podręcznik KSeF 2.0 cz. I (06.08.2026) pp. 20, 26, 33, 53-61, 66, 74-78
- Podręcznik Aplikacji Podatnika (06.08.2026) pp. 16-17, 139, 145; Podręcznik Aplikacji Mobilnej
  (2026-08-31) pp. 23-24
- Dz.U. 2025 poz. 1815 § 5 ust. 1, § 6 ust. 1 pkt 3, § 13; Dz.U. 2026 poz. 169
- Ustawa o VAT art. 106nb (paraphrase only in KB)
- Ustawa o doręczeniach elektronicznych art. 147 (t.j. Dz.U. 2026 poz. 3)
- MF notice on ZAW-FA(3) in e-US (gov.pl); FAQ KSeF 2.0 pyt. 6, 8, 14, 16, 28; FAQ „Najczęstsze
  pytania” pyt. 17-19
- Podręcznik KSeF 2.0 cz. II, pkt 1.5 (KB extract of the 2026-02-01 edition)
