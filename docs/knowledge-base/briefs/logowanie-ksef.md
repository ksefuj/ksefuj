# Research Brief: Logowanie do KSeF — Profil Zaufany, podpis, certyfikat

**Requested by:** Orchestrator **Date:** 2026-10-07 **Freshness:** 2026-10-07 **For content:** Blog
post "Logowanie do KSeF: Profil Zaufany, podpis, certyfikat" **Personas:** Ania (JDG), właściciel
spółki, JDG prowadzona przez obywatela Ukrainy **Legal baseline:**
`docs/knowledge-base/WATCHLIST.md` (KSeF regulation Dz.U. 2025 poz. 1815 as amended by Dz.U. 2026
poz. 169; Podręcznik KSeF 2.0 cz. I and AP manual, editions of 2026-08-06)

**Target query:** „KSeF logowanie profil zaufany"

## Answer in two sentences

Do Aplikacji Podatnika KSeF 2.0 (https://ap.ksef.mf.gov.pl) logujesz się albo przez login.gov.pl
(Profil Zaufany, mObywatel, bankowość elektroniczna, e-dowód), albo kwalifikowanym certyfikatem
podpisu lub pieczęci; token i certyfikat KSeF służą programom (API), a nie do logowania w aplikacji.
JDG ma uprawnienia właścicielskie automatycznie na swój NIP, a spółka loguje się pieczęcią
kwalifikowaną albo przez osobę wskazaną w ZAW-FA, która nadaje dostęp kolejnym osobom.

## What changes the answer

- **Kim jesteś:** osoba fizyczna z JDG (uprawnienia automatyczne po NIP) vs podmiot niebędący osobą
  fizyczną (pieczęć kwalifikowana albo ZAW-FA).
- **Co jest w Twoim podpisie kwalifikowanym:** NIP/PESEL (działa od razu) vs brak NIP i PESEL
  (wymaga zgłoszenia odcisku palca certyfikatu).
- **Czy masz PESEL / polski środek identyfikacji:** zagraniczne eID z UE nie są obsługiwane.
- **Aplikacja Podatnika vs program księgowy (API):** w API metody to podpis XAdES lub token KSeF.
- **Nowelizacja rozporządzenia o tokenach** (zapowiedziana, nieopublikowana na 2026-10-07).
- **Status samodzielnego podpisu zaufanego** po 13.02.2026 (patrz Unsettled).

## Provenance

Facts citing Podręcznik KSeF 2.0 cz. I (06.08.2026), Podręcznik Aplikacji Podatnika KSeF 2.0
(06.08.2026), MF FAQ pages, the MF technical-notices page and Dz.U. 2025 poz. 1815 / Dz.U. 2026 poz.
169 were extracted on 2026-10-07 by sibling research runs that had access to ksef.podatki.gov.pl and
api.sejm.gov.pl (briefs: `rozporzadzenie-ksef-i-tokeny.md`, `mf-faq-podreczniki-2026.md` on
`knowledge/2026-10-07`; `aplikacja-podatnika-ksef-pierwsza-faktura.md`,
`uprawnienia-ksef-ksiegowa.md`, `tokeny-ksef-po-2026.md` on their `content/*` branches). They were
**not re-fetched here** (egress to gov.pl / ksef.podatki.gov.pl / sejm blocked). Only the CIRFMF
`ksef-docs` files on raw.githubusercontent.com were fetched in this run (HTTP 200):
`uwierzytelnianie.md`, `tokeny-ksef.md`, `certyfikaty-KSeF.md`, `srodowiska.md`. The local
`certyfikaty-tokeny.md` was used only to identify misconceptions.

## Key Facts

| #   | Fact                                                                                                                                                                                                                                                                                                                                                         | Source + page/section                                                                              | Tier  | Confidence                                             |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- | ----- | ------------------------------------------------------ |
| 1   | The AP login screen has two options: „Zaloguj przez login.gov.pl" (Profil Zaufany, mObywatel, bankowość elektroniczna, e-dowód; via Węzeł krajowy) and „Zaloguj certyfikatem" (qualified certificate of signature or seal).                                                                                                                                  | Podręcznik AP (06.08.2026), ch. 4.1, pp. 13-15                                                     | 2     | HIGH                                                   |
| 2   | Foreign (other EU states) eID is not supported for login.                                                                                                                                                                                                                                                                                                    | Podręcznik AP (06.08.2026), pp. 13-15; cz. I pp. 41-42 (per `uprawnienia-ksef-ksiegowa.md`)        | 2     | HIGH                                                   |
| 3   | A KSeF certificate cannot be used to authenticate in MF's free tools such as the AP; token/KSeF certificate are not AP login methods.                                                                                                                                                                                                                        | Podręcznik KSeF 2.0 cz. I (06.08.2026), p. 42                                                      | 2     | HIGH (but see Contradictions: AP manual glossary p. 8) |
| 4   | Token KSeF and certyfikat KSeF are API authentication means: API auth is either an XAdES-signed `AuthTokenRequest` or a KSeF token; a token can only be generated after a one-time XAdES authentication.                                                                                                                                                     | CIRFMF/ksef-docs `uwierzytelnianie.md` (Wstęp, §2), `tokeny-ksef.md` (Wymagania wstępne) — fetched | 2     | HIGH                                                   |
| 5   | Permanent authentication means in the regulation: e-ID via national node (§ 6 ust. 1 pkt 1), qualified signature (pkt 2), qualified seal (pkt 3), KSeF certificate generated after pkt 1-3 (pkt 4). Tokens not listed. KSeF certificate valid max 2 years (§ 6 ust. 2).                                                                                      | Dz.U. 2025 poz. 1815, § 6                                                                          | 1     | HIGH                                                   |
| 6   | Dz.U. 2026 poz. 169 (13.02.2026) changed two dates only: § 13 ust. 1 pkt 2 (transitional use of podpis zaufany under § 5 ust. 1 pkt 3 of the 2021 regulation) from „31 marca 2026 r." to „13 lutego 2026 r."; § 15 pkt 2 (entry into force of § 6 ust. 1 pkt 1, e-ID via national node) from „1 kwietnia 2026 r." to „14 lutego 2026 r.".                    | Dz.U. 2026 poz. 169 (act text)                                                                     | 1     | HIGH                                                   |
| 7   | Reading of fact 6 (stated by the act, no inference beyond it): the regulation's transitional basis for standalone podpis zaufany ends 13.02.2026; the permanent basis for login via Węzeł krajowy (login.gov.pl, which includes Profil Zaufany as a login means) applies from 14.02.2026. MF FAQ KSeF 2.0 still lists Profil Zaufany among AP login methods. | Dz.U. 2026 poz. 169; Podręcznik cz. I (06.08.2026) fn. 20; FAQ KSeF 2.0                            | 1/2/3 | MEDIUM (see Unsettled)                                 |
| 8   | Login context: after choosing the method you choose the identifier type (NIP, internal identifier, or compound VAT-UE identifier), enter it and click „Przejdź dalej".                                                                                                                                                                                       | Podręcznik AP (06.08.2026), ch. 4.1; FAQ KSeF 2.0 (context question, Q22 per sibling brief)        | 2/3   | HIGH                                                   |
| 9   | API side: the system checks that the authenticating subject has at least one active permission in the chosen context; otherwise no access token.                                                                                                                                                                                                             | CIRFMF `uwierzytelnianie.md`, Wstęp — fetched                                                      | 2     | HIGH                                                   |
| 10  | JDG: owner permissions are assigned automatically to the taxpayer's NIP (issuing, access to invoices, permission management, subordinate units, session history, viewing permissions) and cannot be revoked. A natural person with business does not file ZAW-FA, except to register unique data of their own signature.                                     | Podręcznik KSeF 2.0 cz. I (06.08.2026), p. 57                                                      | 2     | HIGH                                                   |
| 11  | JDG can access immediately via Profil Zaufany or a qualified signature.                                                                                                                                                                                                                                                                                      | MF leaflet „MŚP i JDG" (per `aplikacja-podatnika-ksef-pierwsza-faktura.md`, no page)               | 3     | HIGH                                                   |
| 12  | Company (not a natural person) without a qualified seal: ZAW-FA names exactly one natural person (need not be in KRS), who gets i.a. permission management, issuing and access to invoices; further people are added electronically.                                                                                                                         | Dz.U. 2025 poz. 1815 § 5 ust. 1; cz. I pp. 58-60                                                   | 1/2   | HIGH                                                   |
| 13  | ZAW-FA(3) is filed on paper, via e-US (Dokumenty → Złóż dokument) or e-Doręczenia; ePUAP not effective since 1.01.2026. Permissions work after the tax office enters the data.                                                                                                                                                                               | cz. I pp. 58-61; FAQ KSeF 2.0 (Q16 per sibling brief)                                              | 2/3   | HIGH                                                   |
| 14  | Qualified certificate without NIP or PESEL: its SHA-256 fingerprint (64 hex chars) must be registered; after renewal/replacement of such a signature, permissions must be registered again; not needed if the new certificate has NIP/PESEL.                                                                                                                 | cz. I pp. 33, 66; FAQ „Najczęstsze pytania" Q19                                                    | 2/3   | HIGH                                                   |
| 15  | AP has „Pobierz odcisk palca" (sign a file with the certificate, „Przekaż plik"); the fingerprint is entered when granting permissions to a person with certificate without NIP/PESEL (identifier „Brak", date of birth, ID document).                                                                                                                       | Podręcznik AP (06.08.2026), pp. 16-17, 139                                                         | 2     | HIGH                                                   |
| 16  | Tokens: regulation allows them until 31.12.2026 (§ 13 ust. 1 pkt 1); no KSeF certificate can be generated after token authentication (§ 13 ust. 2).                                                                                                                                                                                                          | Dz.U. 2025 poz. 1815 § 13                                                                          | 1     | HIGH                                                   |
| 17  | MF decided to keep tokens „na czas nieokreślony"; the regulation „zostanie odpowiednio znowelizowane". No amending regulation published as of 2026-10-07.                                                                                                                                                                                                    | Podręcznik cz. I (06.08.2026), p. 26; ELI record of poz. 1815                                      | 2     | HIGH (intent, not law)                                 |
| 18  | CIRFMF API team (kw-cirf, 2026-09-10): tokens issued by 31.12.2026 remain usable but validity limited to 30.11.2027; new token endpoint, old one in compatibility mode.                                                                                                                                                                                      | https://github.com/CIRFMF/ksef-api/issues/834                                                      | 3     | MEDIUM (announcement)                                  |
| 19  | Production AP: https://ap.ksef.mf.gov.pl (HTTP 200 per sibling run).                                                                                                                                                                                                                                                                                         | `aplikacja-podatnika-ksef-pierwsza-faktura.md` source table                                        | 3     | HIGH                                                   |
| 20  | Test AP URL https://ap-test.ksef.mf.gov.pl/web/ — **UNVERIFIED**: appears only in project CLAUDE.md, not in any official extract; not reachable from here. API environments TEST/DEMO/PROD exist; TEST data are not isolated and accept self-signed certificates; „Nie należy przesyłać do niego faktur produkcyjnych ani rzeczywistych danych podmiotów".   | CIRFMF `srodowiska.md` (16.03.2026) — fetched                                                      | 2     | HIGH (API envs) / UNVERIFIED (AP test URL)             |
| 21  | Mobile app: the MF mobile app manual (31.08.2026) was read by a sibling run for invoicing scope only; **no source in the corpus states how login to the mobile app works**. Do not describe it.                                                                                                                                                              | `mf-faq-podreczniki-2026.md`; `aplikacja-podatnika-ksef-pierwsza-faktura.md`                       | —     | NOT FOUND                                              |
| 22  | Outage notices on the MF technical-notices page: Profil Zaufany outages 2026-05-05 and 2026-05-11; maintenance 27.08 (2026); AP production difficulties 2026-09-25.                                                                                                                                                                                          | https://ksef.podatki.gov.pl/komunikaty-techniczne/                                                 | 3     | HIGH (dates only; texts not extracted)                 |
| 23  | Ukrainian JDG: no specific MF statement found. Applicable general rules: foreign eID unsupported (fact 2); qualified signature without NIP/PESEL → fingerprint registration (facts 10, 14). Whether a given person has access to Profil Zaufany/mObywatel is outside the corpus (**UNVERIFIED**).                                                            | —                                                                                                  | —     | NOT FOUND                                              |

## Contradictions & Ambiguities

- **Podpis zaufany in the API docs vs the regulation.** CIRFMF `uwierzytelnianie.md` §2.1 (header
  date 10.07.2025) still lists „Profil Zaufany (ePUAP) – umożliwia podpisanie dokumentu" as a way to
  sign the XAdES `AuthTokenRequest`; `certyfikaty-KSeF.md` (03.02.2026) lists Profil Zaufany as a
  source of CSR data. Dz.U. 2026 poz. 169 ends the transitional basis for podpis zaufany on
  13.02.2026. Tier 1 > Tier 2; whether KSeF technically still accepts PZ-signed XAdES is not
  documented.
- **KSeF certificate in AP.** Podręcznik cz. I p. 42: not usable in AP. AP manual glossary p. 8
  lists token/KSeF certificate as general KSeF authentication means. Same tier and edition date; the
  login screen description (ch. 4.1) supports cz. I.
- **Consultation date.** Sibling briefs date the MF tokens consultation summary 2026-06-11
  (`rozporzadzenie-ksef-i-tokeny.md`) vs 9 June 2026 (`tokeny-ksef-po-2026.md`). Cite the URL, not a
  date, until resolved.
- **„Na czas nieokreślony" (cz. I p. 26) vs 30.11.2027 limit for old tokens (issue #834).**

## Unsettled Questions

- What exactly „podpis zaufany" in § 13 ust. 1 pkt 2 covered (text of § 5 ust. 1 pkt 3 of the 2021
  regulation not read here) and whether KSeF still technically accepts standalone podpis zaufany
  after 13.02.2026. **Do not claim Profil Zaufany stopped working**: login.gov.pl with Profil
  Zaufany is the Węzeł krajowy path (fact 7). Safe wording: log in „przez login.gov.pl".
- Token status after 31.12.2026: depends on an unpublished amending regulation.
- Mobile app login method: not in corpus.
- AP test-environment URL: not verified.
- Whether a Ukrainian citizen's Profil Zaufany / mObywatel works: outside corpus.

## Suggested Sources

Fetched in this run (HTTP 200, raw files; link the GitHub pages):

- https://github.com/CIRFMF/ksef-docs/blob/main/uwierzytelnianie.md
- https://github.com/CIRFMF/ksef-docs/blob/main/tokeny-ksef.md
- https://github.com/CIRFMF/ksef-docs/blob/main/certyfikaty-KSeF.md
- https://github.com/CIRFMF/ksef-docs/blob/main/srodowiska.md

Recorded by sibling runs on 2026-10-07 (not re-fetched here):

- Podręcznik KSeF 2.0 cz. I (06.08.2026), pp. 26, 33, 41-42, 57-61, 66:
  https://ksef.podatki.gov.pl/media/dmrfdixs/podrecznik-ksef-20-cz-i-rozpoczecie-korzystania-z-ksef-06082026.pdf
- Podręcznik użytkownika Aplikacji Podatnika KSeF 2.0 (06.08.2026), ch. 4.1, pp. 13-17, 139:
  https://ksef.podatki.gov.pl/media/qocjn3ai/podrecznik-uzytkownika-aplikacji-podatnika-ksef-20_06082026.pdf
- Rozporządzenie Dz.U. 2025 poz. 1815: https://api.sejm.gov.pl/eli/acts/DU/2025/1815
- Dz.U. 2026 poz. 169: https://api.sejm.gov.pl/eli/acts/DU/2026/169
- FAQ KSeF 2.0: https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20
- FAQ „Najczęstsze pytania": https://ksef.podatki.gov.pl/ksef-news/najczestsze-pytania/
- Komunikaty techniczne: https://ksef.podatki.gov.pl/komunikaty-techniczne/
- Aplikacja Podatnika KSeF 2.0: https://ap.ksef.mf.gov.pl
- CIRFMF/ksef-api issue 834: https://github.com/CIRFMF/ksef-api/issues/834

## Warning: Common Misconceptions

- „Do Aplikacji Podatnika zalogujesz się tokenem albo certyfikatem KSeF" — no (cz. I p. 42; AP ch.
  4.1). Older internal `certyfikaty-tokeny.md` (Facts 1.1/1.2) says the opposite; do not copy.
- „Profil Zaufany nie działa w KSeF od 14 lutego" — not supported: login.gov.pl with PZ is the
  permanent § 6 ust. 1 pkt 1 path from 14.02.2026; only the transitional standalone podpis zaufany
  basis ended 13.02.2026.
- „Spółka loguje się Profilem Zaufanym prezesa" — only after permissions exist: via qualified seal,
  or the person named in ZAW-FA, then further people electronically (fact 12).
- „JDG musi złożyć ZAW-FA" — no, except to register its own signature without NIP/PESEL (fact 10).
- „Pieczęć kwalifikowana — brak w źródłach" (old brief §3) — outdated; regulation § 6 ust. 1 pkt 3
  and the AP manual cover it.
- „Certyfikat KSeF typ 2 dla pełnomocników z ZAW-FA" (old brief Fact 4.3) — wrong: types are
  `Authentication` and `Offline` (CIRFMF `certyfikaty-KSeF.md`).
- „Tokeny przestają działać 1.01.2027" / „tokeny zostają na zawsze" — both overstate; see facts
  16-18.
- „Logowanie do ksef.mf.gov.pl" — KSeF 1.0 address, dead since 1.02.2026 (project CLAUDE.md;
  stale-claims candidate).
