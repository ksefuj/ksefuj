# Research Brief: Tokeny KSeF po 31 grudnia 2026

**Requested by:** human (content backlog item `tokeny-ksef-po-2026`) **Date:** 2026-10-07, updated
2026-10-25, 2026-11-09 and 2026-11-21 **For content:** blog post "Tokeny KSeF po 31 grudnia 2026"
(PL) and "KSeF tokens after 2026" (EN)

**Target query:** „token KSeF 2027"

**Answer in two sentences:** The regulation in force allows authentication with a token only until
31 December 2026 (Dz.U. 2025 poz. 1815, § 13 ust. 1 pkt 1; § 6 ust. 1, the list of permanent
methods, does not include tokens). MF has said it will keep tokens (Podręcznik KSeF 2.0 cz. I, p.
26: „na czas nieokreślony"; KSeF API team, 2026-09-23: „tokeny zostają ale na nowych zasadach"), but
no amending regulation had been published as of the last ELI check (2026-11-11; only a draft on RCL
since 2026-10-27, and official Polish hosts were unreachable on 2026-11-21, so not re-checked). On
2026-11-06 the KSeF API team published a draft of the new token rules (fact 15: default 90 days,
maximum 365, approval step, 100 tokens per context, from 2027-01-01), and on 2026-11-16 API 2.10.0
put the `rev2` token endpoints on the TEST environment only, not DEMO or PROD (fact 16); these are
technical announcements, not law.

**What changes the answer:**

- Publication of an amending regulation (watch Dziennik Ustaw / ISAP; as of the last ELI check,
  2026-11-11, the record listed only Dz.U. 2026 poz. 169 as an amending act; not re-checked on
  2026-11-21 because official Polish hosts were unreachable).
- Wording of that amendment: validity period (1-365 days) and the auto-renewal permission were
  proposals at the 2026-06-09 consultations, not law; the API team separately announced a 30 Nov
  2027 limit for tokens issued until 31 Dec 2026 (fact 11). MF has not reconciled the two.
- Whether the amendment is published before 2027-01-01. If not, § 13 as written no longer covers
  tokens from that date; MF has not said what KSeF does technically in that case.
- Deployment of API 2.10.0 (the `rev2` token endpoints) on DEMO and PROD. As of 2026-11-21 the
  changelog shows TEST 16.11.2026 and „-" for DEMO and PROD (fact 16). Watch the changelog for the
  DEMO/PROD dates and for any change to the values (90/365 days, 24 h approval, 100 per context,
  withdrawal 30.09.2027) after the issue 885 discussion window ended on 2026-11-20 (the issue itself
  is still open, fact 16(d)) (facts 15-16).
- The validity of tokens generated via the old `POST /tokens`: the TEST OpenAPI says 90 days for
  tokens generated „od 07.11.2026", the issue 885 draft says from 2027-01-01 (fact 16). Which date
  applies on PROD is not stated.
- Status of the RCL draft 12416152 (consultation of 14 days from 2026-10-27); not re-checked on
  2026-11-21 because legislacja.gov.pl was unreachable.

## Key Facts (ready to use)

1. **Until 31 Dec 2026 an alphanumeric string may be used for authentication.** § 13 ust. 1 pkt 1:
   „do dnia 31 grudnia 2026 r. do uwierzytelniania się podmiotów korzystających z Krajowego Systemu
   e-Faktur może służyć ciąg znaków alfanumerycznych, o którym mowa w § 5 ust. 1 pkt 4
   rozporządzenia Ministra Finansów z dnia 27 grudnia 2021 r." Source: Dz.U. 2025 poz. 1815, § 13
   ust. 1 pkt 1 (https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20250001815). Tier 1.
   Confidence: HIGH. (Law)
2. **After authenticating this way a KSeF certificate cannot be generated.** § 13 ust. 2: „W
   przypadku uwierzytelnienia się w sposób, o którym mowa w ust. 1 pkt 1, nie będzie możliwe
   wytworzenie certyfikatu KSeF." Same source. Confidence: HIGH. (Law)
3. **Permanent authentication means (§ 6 ust. 1):** e-ID via the national node (pkt 1), qualified
   signature (pkt 2), qualified seal (pkt 3), KSeF certificate generated after authenticating by pkt
   1-3 (pkt 4). Tokens are not listed. Certificate valid at most 2 years (§ 6 ust. 2). Same source.
   Confidence: HIGH. (Law)
4. **The regulation was amended once, by Dz.U. 2026 poz. 169 (13 Feb 2026).** The ELI record of the
   original lists it as the only amending act ("Akty zmieniające"). Content per the prior check:
   Profil Zaufany transitional date and § 15 pkt 2 date; nothing on tokens. Sources:
   https://api.sejm.gov.pl/eli/acts/DU/2025/1815 and
   https://api.sejm.gov.pl/eli/acts/DU/2026/169/text.pdf. Confidence: HIGH (checked 2026-10-07).
5. **MF consultation, 9 June 2026:** „Jedną z propozycji Ministerstwa Finansów jest utrzymanie
   tokenów jako jednej z metod logowania do KSeF [...] Ministerstwo Finansów zaproponowało, aby
   tokeny były dostępne również po 31 grudnia 2026 r." Also: „określenie terminu ważności tokenów od
   1 do 365 dni oraz wprowadzenie nowego uprawnienia, które może, po uprzedniej zgodzie właściciela,
   automatycznie odnowić token w systemie." Source:
   https://ksef.podatki.gov.pl/wyjasnienia/pierwsze-konsultacje-po-czesciowym-wdrozeniu-ksef-podsumowanie/
   . Tier 3 (MF guidance, a proposal). Confidence: HIGH that it is a proposal.
6. **Podręcznik KSeF 2.0 cz. I (edition 2026-08-06), p. 26:** „Wg pierwotnych założeń tokeny jako
   metoda uwierzytelnienia się w KSeF miały obowiązywać wyłącznie do 31 grudnia 2026 r. Biorąc pod
   uwagę postulaty zgłaszane przez przedsiębiorców i dostawców oprogramowania, Ministerstwo Finansów
   zdecydowało o zachowaniu tej metody uwierzytelniania na czas nieokreślony. W związku z powyższym
   rozporządzenie w sprawie korzystania z KSeF zostanie odpowiednio znowelizowane." Source:
   https://ksef.podatki.gov.pl/media/dmrfdixs/podrecznik-ksef-20-cz-i-rozpoczecie-korzystania-z-ksef-06082026.pdf
   . Tier 2. Confidence: HIGH (a statement of intent, not law). Note: the title page says „Stan
   prawny na dzień: 1 lutego 2026 r.", Warszawa, sierpień 2026.
7. **Which tokens (the crux).** (a) FAQ MF q. 35: „tokeny wygenerowane w KSeF 1.0 nie będą
   kompatybilne z KSeF 2.0. Możliwość generowania tokenów zostanie udostępniona 1 lutego 2026 r."
   (https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20, Tier 3). (b) Podręcznik cz. I p. 35
   (2.4.1): a token is „wygenerowanym przez KSeF [...] ciągiem znaków alfanumerycznych (z
   wyłączeniem znaków interpunkcyjnych)", generated after authenticating with the national node,
   qualified signature, qualified seal or KSeF certificate. (c) CIRFMF/ksef-docs `tokeny-ksef.md`:
   KSeF token is generated via `POST /tokens` after authenticating with XAdES, and is used via
   `POST /auth/ksef-token` (`uwierzytelnianie.md` § 2.2). (d) The Podręcznik applies the 31 Dec 2026
   date to these KSeF 2.0 tokens (quote in fact 6) and describes them with the same words („ciąg
   znaków alfanumerycznych") as § 13. Conclusion: in practice § 13 and MF's manual treat the KSeF
   2.0 token as the token whose use ends 2026-12-31. The regulation text itself only refers to the
   2021 regulation's definition and never says „token KSeF 2.0"; that is a drafting gap, not a known
   practical difference. Confidence: MEDIUM-HIGH.
8. **Token properties (KSeF 2.0).** Carries the permissions declared at generation; usable only in
   the context it was generated in; no validity period (stays valid until revoked by the user); no
   system limit on the number; works in interactive and batch sessions; cannot be handed to other
   natural persons. Source: Podręcznik cz. I, 2.4.2-2.4.5 (pp. 36-38), table 3 (pp. 51-52).
   Confidence: HIGH.
9. **Certificate properties.** Type 1 = authentication (interactive and batch session), type 2 =
   OFFLINE invoicing; generated separately, CN carries „uwierzytelnianie" or „offline". Valid at
   most 2 years; does not carry permissions (uses the permissions of the identifier on it); usable
   across contexts. Requested via API 2.0 or Aplikacja Podatnika since Feb 2026, after
   authenticating by national node, qualified signature or seal. Limits: e.g. max 6 active (+6 new)
   per PESEL, 100 (+100) per NIP; a new one can be issued a month before the oldest active expires.
   Source: Podręcznik cz. I, 2.5.1-2.5.6 (pp. 42-46), table 3. Confidence: HIGH.
10. **Token management in Aplikacja Podatnika:** Tokeny / Generuj token, Lista tokenów (with
    revoke); the token is shown only once. Source: Podręcznik Aplikacji Podatnika KSeF 2.0 (edition
    2026-08-06), ch. 5.6.
    https://ksef.podatki.gov.pl/media/qocjn3ai/podrecznik-uzytkownika-aplikacji-podatnika-ksef-20_06082026.pdf
    Confidence: HIGH.

11. **KSeF API team statement (Tier 3, official repo, collaborator `kw-cirf`):** on 2026-09-10 in
    CIRFMF/ksef-api issue 834: „Technicznie przygotowujemy się do wydawania tokenów na nowych
    zasadach od 1 stycznia 2027 r. [...] Tokeny wydane do 31 grudnia 2026 r. nadal będą mogły być
    wykorzystywane do uwierzytelniania w KSeF, jednak ich ważność zostanie ograniczona do 30
    listopada 2027 r. [...] Dodamy nową wersje endpointu do tworzenie tokenów a poprzednia wersja
    będzie działać „w trybie zgodności" [...] czyli utworzy się token z ograniczonym czasem życia."
    Same day: both endpoints run in parallel; token format unchanged („Tak, będzie jak wcześniej").
    On 2026-07-17 the same author: „decyzja o wycofaniu tokenów została określona w rozporządzeniu,
    dlatego jej zmiana również wymaga zmiany przepisów [...] formalny komunikat i szczegóły okresu
    przejściowego należą do Ministerstwa Finansów." Sources:
    https://github.com/CIRFMF/ksef-api/issues/834#issuecomment-5619765888 and
    https://github.com/CIRFMF/ksef-api/issues/834#issuecomment-5003022923. Confidence: HIGH that it
    was said; it is an announcement, not law, and no OpenAPI for it was published as of 2026-10-07
    (still not in the changelog as of 2026-10-25, fact 14). Re-checked 2026-10-25: issue 834 is
    still open and the latest `kw-cirf` comment is still the 2026-09-10 one. The thread author
    quoted, in a comment of 23 July, a KIS reply (date of the reply not given) repeating the 1-365
    day validity and auto-renewal „po uprzedniej zgodzie właściciela"; that is consistent with fact
    5, which remains the citable source for both points. Also in the 2026-09-10 comment (re-read
    2026-10-25): the goal is to get through 2026/2027 „bez dotykania kodu po stronie integratora",
    while tokens created via the old endpoint will get a limited lifetime (the author calls this a
    breaking change in behaviour). A goal, not a promise.

12. **KSeF API team statement, 2026-09-23 (Tier 3, collaborator `kw-cirf`, closing the issue):**
    „Zamykam bo tokeny zostają ale na nowych zasadach. Dopracowujemy propozycję." Source:
    CIRFMF/ksef-api issue 565 („Bezsensowność rezygnacji z tokenów"),
    https://github.com/CIRFMF/ksef-api/issues/565 (fetched 2026-10-25). Confidence: HIGH that it was
    said; an announcement, not law. It does not state what the „nowe zasady" are.
13. **Amending regulation status.** Verified live 2026-10-26: the ELI record for Dz.U. 2025 poz.
    1815 lists only DU/2026/169 (changeDate 2026-02-16); RCL title search „e-Faktur" shows no 2026
    draft; no MF news on tokens. Confidence: HIGH for 2026-10-26. Superseded: the draft appeared on
    RCL on 2026-10-27 (https://legislacja.gov.pl/projekt/12416152); see brief
    `rozporzadzenie-ksef-i-tokeny.md` fact 7. ELI still lists only DU/2026/169 on 2026-11-11.
14. **API changelog, 2026-10-25:** latest version 2.9.0 (TEST/DEMO 13.10.2026, PROD 15.10.2026). No
    release contains an entry on token validity/expiry or a new version of the token-creation
    endpoint. Source: https://github.com/CIRFMF/ksef-api/blob/main/api-changelog.md (fetched
    2026-10-25). Tier 2/3 (official MF repo). Confidence: HIGH. Implication: the endpoint announced
    in fact 11 is not yet published. Superseded: version 2.10.0 (TEST 16.11.2026) adds the `rev2`
    token endpoints; see fact 16.

15. **Draft of the new token rules, 2026-11-06 (Tier 3, CIRFMF/ksef-api issue 885 „Propozycja zmian
    w zarządzaniu tokenami KSeF", opened by collaborator `kw-cirf`):** „Planujemy rozszerzyć
    funkcjonalność zarządzania tokenami KSeF [...] Dyskusję chcielibyśmy zamknąć do 20 listopada." A
    draft OpenAPI file is attached. Content of the draft:
    - „Nowe funkcjonalności zostaną udostępnione **1 stycznia 2027 r.**" Changed endpoints come in
      new revisions (`rev2`); the current endpoints stay until withdrawal, planned for **30 września
      2027 r.**
    - Validity in `rev2`: `validFrom` at most 60 days after the request (default: start of the
      process); `validTo` at most 365 days after `validFrom`; without `validTo` the token is valid
      **90 days**.
    - A token requested in `rev2` after logging in with a KSeF token is only a request: status
      `AwaitingApproval`, it must be approved within 24 hours (else `ApprovalExpired`) by an
      `Owner`, a holder of `CredentialsManage`, or the token's author if they hold all its
      permissions; approval itself requires the national node (Węzeł Krajowy) or a XAdES signature.
      Tokens generated after another login method need no approval.
    - New statuses `NotYetActive`, `AwaitingApproval`, `ApprovalExpired`, `Expired`; old endpoints
      map them to `Active`/`Revoked`.
    - Limit: 100 tokens per context (`Active`, `NotYetActive`, `Pending`, `AwaitingApproval`),
      checked only in `rev2`.
    - Revocation: `Owner`/`CredentialsManage` may revoke any token in the context; someone logged in
      with a token may revoke only that token; someone logged in via national node/XAdES may revoke
      the tokens they authored.
    - Old endpoints: a token generated through them from 2027-01-01 is valid **90 days**.
    - Tokens generated before 2027-01-01 (now without expiry) are valid „do końca 30 listopada 2027
      r." (consistent with fact 11). Source: https://github.com/CIRFMF/ksef-api/issues/885 (read
      2026-11-09 via the GitHub search API; github.com web pages returned HTTP 403 from the run
      environment). Confidence: HIGH that it was published; it is a draft open for comments and not
      law. The 90-day default and the 1-365 day range match the MF consultation proposal (fact 5);
      the draft does not mention the auto-renewal permission from fact 5. Issues 834 and 461 (token
      questions) were closed on 2026-11-06 minutes after 885 was opened; their closing comments
      could not be read (API access refused), so do not cite them for anything new.

16. **API 2.10.0: the `rev2` token endpoints are on TEST only (Tier 2/3, official MF repo).** (a)
    Changelog: version 2.10.0, deployment „**TEST** 16.11.2026", **DEMO** „-", **PROD** „-" (not
    deployed). New: „Wygenerowanie nowego tokena (POST `/tokens/rev2`) z możliwością określenia
    okresu ważności", GET `/tokens/rev2` (list), GET `/tokens/rev2/{referenceNumber}` (status), and
    „zatwierdzenie tokena (POST `/tokens/{referenceNumber}/approve`)". „Dotychczasowe operacje
    generowania tokena, pobierania listy i statusu oznaczono jako przestarzałe. Zostaną wycofane
    **30.09.2027 r.**" New status `450` with „Token poza okresem ważności" for an attempt to
    authenticate with a `rev2` token outside its validity; the context limits response gains the
    `rev2` token limit; deprecated endpoints return `Deprecation` and `Sunset` headers and, after
    withdrawal, `410 Gone`. Separately, GET `/auth/{referenceNumber}` and GET `/auth/sessions`
    „pozostaną dostępne i wspierane do **15 czerwca 2027 r.**" (new `rev2` versions added). Source:
    https://github.com/CIRFMF/ksef-api/blob/main/api-changelog.md (raw file fetched 2026-11-21). (b)
    OpenAPI `POST /tokens/rev2`: „`validFrom` może przypadać najpóźniej 60 dni po zainicjowaniu
    generowania tokena"; „`validTo` może przypadać najpóźniej 365 dni po `validFrom`. Jeśli nie
    zostanie podana, okres ważności wynosi 90 dni od `validFrom`." „Pierwszy token można wygenerować
    wyłącznie po uwierzytelnieniu za pomocą Węzła Krajowego lub podpisu w formacie XAdES". A token
    generated in a token-authenticated session gets `AwaitingApproval`; „Na zatwierdzenie
    przewidziano 24 h"; then `ApprovalExpired`. `POST /tokens/{referenceNumber}/approve`: approval
    by `Owner`, `CredentialsManage`, or the token's owner „jeśli posiada wszystkie uprawnienia
    przewidziane dla tego tokena"; „Zatwierdzenie wymaga uwierzytelnienia za pomocą Węzła Krajowego
    lub podpisu w formacie XAdES". „Maksymalna liczba tokenów w kontekście to 100 [...] niezależnie
    od autora i rewizji endpointu". Source:
    https://github.com/CIRFMF/ksef-api/blob/main/open-api.json (raw file fetched 2026-11-21; this is
    the spec deployed on TEST only). Consistent with the issue 885 draft (fact 15). (c) Discrepancy:
    the deprecated `POST /tokens` description in the same spec says „Token wygenerowany od
    07.11.2026 jest ważny przez 90 dni od momentu wygenerowania, o ile nie zostanie wcześniej
    unieważniony." The issue 885 draft (fact 15) dates this rule from 2027-01-01. Neither source
    explains the difference; it is likely TEST-only, but that is not stated. Do not present it as a
    production rule. The spec does not mention the 30.11.2027 limit for pre-2027 tokens. (d) Issue
    885 (read via web fetch 2026-11-21): still open, pinned by `kw-cirf` on 2026-11-12. `kw-cirf`
    comments: 2026-11-07, expiry reminders belong in client applications, not in Aplikacja
    Podatnika; `POST /auth/ksef-token` gets no new revision and accepts `rev2` tokens; an
    `X-System-Warning` for upcoming expiry was rejected. 2026-11-12, TEST deployment of the new
    token features announced for Friday 13 November, with changes possible until the discussion
    closes on 20 November. 2026-11-16, version 2.10.0 released (link to changelog). No MF comment
    reports a change to 90/365 days, 24 h, 100 tokens, 30.09.2027 or 30.11.2027. Community members
    asked to extend the 24 h approval window (e.g. to 7 days); no MF reply visible. Source:
    https://github.com/CIRFMF/ksef-api/issues/885. Confidence: HIGH that this is what the sources
    say on 2026-11-21; it is a TEST deployment and technical documentation, not law, and the dates
    for DEMO/PROD are not announced.

## Unsettled Questions

- When API 2.10.0 (`rev2` token endpoints) reaches DEMO and PROD; not announced as of 2026-11-21
  (fact 16). Whether the values in fact 16 change now that the issue 885 discussion closed on
  2026-11-20 (e.g. the community request for a longer approval window than 24 h, no MF reply
  visible), and whether MF or the amending regulation confirms the 90-day default, 365-day maximum
  and approval step. Whether the auto-renewal permission (fact 5) was dropped; neither the draft nor
  the 2.10.0 spec mentions it.
- From which date tokens generated via the old `POST /tokens` are valid 90 days: „od 07.11.2026"
  (TEST OpenAPI) or from 2027-01-01 (issue 885 draft). Unexplained discrepancy (fact 16 (c)).
- Whether the 30.11.2027 limit for tokens generated before 2027-01-01 (facts 11, 15) still holds;
  the 2.10.0 changelog and OpenAPI do not mention it.
- Text, date of publication and entry into force of the amending regulation. The RCL draft 12416152
  (published 2026-10-27, consultation of 14 days) was not re-checked on 2026-11-21
  (legislacja.gov.pl unreachable); the last ELI check (2026-11-11) still listed only DU/2026/169.
- What rules („nowe zasady", facts 11-12) will cover tokens issued from 1 Jan 2027. The 30 Nov 2027
  limit (fact 11) is a separate transition rule for tokens issued until 31 Dec 2026; MF has not said
  whether the 1-365 day proposal (fact 5) is what the new rules contain.
- Whether the 30 Nov 2027 limit announced in the API repo will be confirmed by MF or the regulation.
- Whether the proposed token validity (1-365 days) and the auto-renewal permission will be adopted;
  MF's current manual says tokens have no expiry.
- What KSeF does technically on 2027-01-01 if the amendment is late (MF has not said).
- Whether a token authenticated session can request a KSeF certificate. § 13 ust. 2 says no for the
  string authentication; § 6 pkt 4 says certificates follow authentication by pkt 1-3.
- Source contradiction: the Podręcznik cz. I (p. 42) says a KSeF certificate cannot be used to log
  in to MF's free tools such as Aplikacja Podatnika, while the AP manual's glossary lists the KSeF
  certificate among allowed authentication means. Not used in the post.

## Suggested Sources Section

- Rozporządzenie MF w sprawie korzystania z KSeF, Dz.U. 2025 poz. 1815, § 6 and § 13:
  https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20250001815
- Record of amendments (ELI): https://api.sejm.gov.pl/eli/acts/DU/2025/1815
- Podręcznik KSeF 2.0 cz. I, pp. 26, 35-38, 42-46, 51-52 (see URL in fact 6)
- Podręcznik Aplikacji Podatnika KSeF 2.0, ch. 5.6 (see URL in fact 10)
- MF, first consultations summary (9 June 2026): see fact 5
- FAQ MF q. 35: https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20
- CIRFMF/ksef-docs: https://github.com/CIRFMF/ksef-docs/blob/main/tokeny-ksef.md and
  https://github.com/CIRFMF/ksef-docs/blob/main/uwierzytelnianie.md
- CIRFMF/ksef-api issues 834 and 565 (facts 11-12) and the API changelog:
  https://github.com/CIRFMF/ksef-api/blob/main/api-changelog.md
- CIRFMF/ksef-api issue 885 and OpenAPI (facts 15-16): https://github.com/CIRFMF/ksef-api/issues/885
  and https://github.com/CIRFMF/ksef-api/blob/main/open-api.json

## Warning: Common Misconceptions

- „Tokeny znikają z KSeF 1 stycznia 2027": not yet true as law or as MF's plan. MF says it will keep
  them, but the regulation has not been changed yet.
- „Tokeny zostają na stałe": that is MF's declared intent, not a published legal change.
- Press and vendor blogs repeat MF's statements; only the sources above are used here. In
  particular, the infor.pl report citing interpelacja 19230 (2026-10-07) could not be verified
  (sejm.gov.pl unreachable) and is not used.
- Older ksefuj.to content (certyfikaty-vs-tokeny-ksef) mixes up certificate types (they are by
  function: type 1 authentication, type 2 OFFLINE invoicing); do not copy from it.

## Verified live on 2026-10-26

- ELI record https://api.sejm.gov.pl/eli/acts/DU/2025/1815: only DU/2026/169 (changeDate
  2026-02-16); fact 13
- RCL title search „e-Faktur": no 2026 draft; no MF news on tokens; fact 13

Not re-fetched (2026-10-07 baseline):

- Dz.U. 2025 poz. 1815, § 6 and § 13 (ISAP): facts 1-3
- Dz.U. 2026 poz. 169 text: fact 4
- MF consultation summary on ksef.podatki.gov.pl: fact 5
- Podręcznik KSeF 2.0 cz. I and Podręcznik Aplikacji Podatnika (ksef.podatki.gov.pl): facts 6-10
- FAQ MF q. 35: fact 7(a)

**Freshness:** 2026-11-21 (CIRFMF GitHub only: fact 16 added from the API changelog 2.10.0, the repo
`open-api.json` and issue 885, all fetched 2026-11-21; official Polish hosts (legislacja.gov.pl,
api.sejm.gov.pl, isap.sejm.gov.pl, ksef.podatki.gov.pl) unreachable on 2026-11-21, so the RCL draft
12416152 stage and the ELI amendments list were not re-checked; last ELI check 2026-11-11; facts
1-10 remain at the 2026-10-07 baseline). Previous: 2026-11-09 (fact 15). Re-check when 2.10.0 gets
DEMO/PROD dates in the changelog, when Dz.U. publishes an amendment to poz. 1815, when the RCL draft
moves past consultation, or before 2026-12-31.
