# Research Brief: Tokeny KSeF po 31 grudnia 2026

**Requested by:** human (content backlog item `tokeny-ksef-po-2026`) **Date:** 2026-10-07 **For
content:** blog post "Tokeny KSeF po 31 grudnia 2026" (PL) and "KSeF tokens after 2026" (EN)

**Target query:** „token KSeF 2027"

**Answer in two sentences:** The regulation in force allows authentication with a token only until
31 December 2026 (Dz.U. 2025 poz. 1815, § 13 ust. 1 pkt 1; § 6 ust. 1, the list of permanent
methods, does not include tokens). MF has said it will keep tokens indefinitely and will amend the
regulation (Podręcznik KSeF 2.0 cz. I, p. 26; consultations of 9 June 2026), but as of 2026-10-07 no
amending regulation has been published.

**What changes the answer:**

- Publication of an amending regulation (watch Dziennik Ustaw / ISAP; the ELI record of the
  regulation lists only Dz.U. 2026 poz. 169 as an amending act).
- Wording of that amendment: validity period (1-365 days) and the auto-renewal permission were
  proposals at the 2026-06-09 consultations, not law.
- Whether the amendment is published before 2027-01-01. If not, § 13 as written no longer covers
  tokens from that date; MF has not said what KSeF does technically in that case.

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
    was said; it is an announcement, not law, and no OpenAPI for it was published as of 2026-10-07.

## Unsettled Questions

- Text, date of publication and entry into force of the amending regulation. No draft found. The RCL
  register (legislacja.rcl.gov.pl) could not be searched programmatically (list pages render
  client-side, the API rejects requests); a manual check on the site is still advisable.
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

## Warning: Common Misconceptions

- „Tokeny znikają z KSeF 1 stycznia 2027": not yet true as law or as MF's plan. MF says it will keep
  them, but the regulation has not been changed yet.
- „Tokeny zostają na stałe": that is MF's declared intent, not a published legal change.
- Press and vendor blogs repeat MF's statements; only the sources above are used here.
- Older ksefuj.to content (certyfikaty-vs-tokeny-ksef) mixes up certificate types (they are by
  function: type 1 authentication, type 2 OFFLINE invoicing); do not copy from it.

**Freshness:** 2026-10-07. Re-check when Dz.U. publishes an amendment to poz. 1815 or before
2026-12-31.
