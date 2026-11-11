# Research Brief: Rozporządzenie w sprawie KSeF (Dz.U. 2025 poz. 1815) i przyszłość tokenów

**Requested by:** weekly knowledge refresh **Date:** 2026-10-07 **Freshness:** 2026-11-11 (fact 7
draft text read on RCL; fact 6 GitHub only; ELI amendment list checked 2026-11-11) **For content:**
updates of posts and briefs on tokens vs certificates

**Target query:** "tokeny KSeF po 2026", "czy tokeny KSeF będą działać w 2027"

**Answer in two sentences:** The binding regulation (Dz.U. 2025 poz. 1815, amended by Dz.U. 2026
poz. 169) still ends KSeF tokens on 31 December 2026, but MF has decided to keep them and put a
draft amending regulation into the government legislative process on 2026-10-27 (fact 7; not law).
According to the CIRFMF API team (issue #834, 2026-09-10), tokens issued by 31.12.2026 will remain
usable until 30.11.2027 and a new token endpoint will follow.

**What changes the answer:** signature and publication of the amending regulation in Dziennik Ustaw;
until then the regulation text in force governs.

## Key Facts (ready to use)

1. **Regulation in force:** Rozporządzenie MiG z 12.12.2025 w sprawie korzystania z KSeF, Dz.U. 2025
   poz. 1815 (https://api.sejm.gov.pl/eli/acts/DU/2025/1815), amended by Dz.U. 2026 poz. 169 of
   2026-02-13 (https://api.sejm.gov.pl/eli/acts/DU/2026/169), which changed two dates: §13 ust. 1
   pkt 2 (transitional use of podpis zaufany under §5 ust. 1 pkt 3 of the 2021 regulation) from „31
   marca 2026 r." to „13 lutego 2026 r.", and §15 pkt 2 (entry into force of §6 ust. 1 pkt 1) from
   „1 kwietnia 2026 r." to „14 lutego 2026 r.". Tier 1 Confidence: HIGH (read in the act text).
   NOTE: MF FAQ KSeF 2.0 still lists Podpis Zaufany among login methods in the Aplikacja Podatnika;
   how that squares with §13 ust. 1 pkt 2 is not resolved here. Do not claim PZ stopped working.
2. **Tokens in the regulation:** allowed until 2026-12-31 (§13 ust. 1 pkt 1; no KSeF certificate can
   be generated when authenticating this way, §13 ust. 2). — Dz.U. 2025 poz. 1815 §13 Tier 1
   Confidence: HIGH Ania-relevant: yes
3. **MF decision to keep tokens:** consultation summary of 2026-06-11: MF proposed keeping tokens
   (https://ksef.podatki.gov.pl/wyjasnienia/pierwsze-konsultacje-po-czesciowym-wdrozeniu-ksef-podsumowanie).
   Podręcznik KSeF 2.0 cz. I (edition 06.08.2026), p. 26: MF „zdecydowało o zachowaniu tej metody
   uwierzytelniania [tokeny] na czas nieokreślony"; the regulation is to be amended. Tier 2/3
   Confidence: HIGH
4. **API team statement (issue #834, 2026-07-17 and 2026-09-10, account kw-cirf):** plans assume
   keeping tokens; formal communication belongs to MF. On 2026-09-10: „Tokeny wydane do 31 grudnia
   2026 r. nadal będą mogły być wykorzystywane do uwierzytelniania w KSeF, jednak ich ważność
   zostanie ograniczona do 30 listopada 2027 r."; a new version of the token-creation endpoint will
   be added; the old one will work "w trybie zgodności" (tokens with limited lifetime).
   https://github.com/CIRFMF/ksef-api/issues/834 Tier 3 (MF-side maintainer, not law) Confidence:
   MEDIUM
5. **Older MF pages still say tokens end 2026** (FAQ KSeF 2.0, AP page as of issue #834). Treat as
   outdated once the regulation is amended; flag the conflict. Confidence: MEDIUM
6. **Draft token rules, 2026-11-06 (CIRFMF/ksef-api issue 885, account kw-cirf):** from 2027-01-01
   new `rev2` token endpoints: default validity 90 days, max 365; tokens requested after a token
   login need approval within 24 h; 100 tokens per context; tokens from the old endpoints valid 90
   days from 2027-01-01; tokens generated before 2027-01-01 valid until end of 2027-11-30; old
   endpoints withdrawn 2027-09-30. Open for comments until 2026-11-20.
   https://github.com/CIRFMF/ksef-api/issues/885 Tier 3 (a proposal, not law) Confidence: HIGH that
   it was published. Details: brief `tokeny-ksef-po-2026.md` fact 15.

7. **Draft amending regulation, October 2026 (primary text read on RCL, 2026-11-11):**
   „Rozporządzenie Ministra Finansów i Gospodarki zmieniające rozporządzenie w sprawie korzystania z
   Krajowego Systemu e-Faktur", draft dated 2026-10-26, RCL project 12416152 created 2026-10-27,
   wykaz prac MF no. 138/2026, status „otwarty" (https://legislacja.gov.pl/projekt/12416152). MF
   letter of 2026-10-27 (znak PT7.8100.10.2026): comments within 14 days of publication on BIP RCL.
   Provisions (draft § 1):
   - pkt 4: § 13 ust. 1 pkt 1 amended so that until 2027-11-30 authentication may use the 2021 „ciąg
     znaków alfanumerycznych" generated before 2027-01-01; new § 13 ust. 3: such a token is valid no
     longer than until 2027-11-30;
   - pkt 1 lit. b and pkt 3 lit. a: new definition „token KSeF" (§ 2 pkt 5a) and new permanent
     method § 6 ust. 1 pkt 5: a KSeF token generated after authenticating with methods pkt 1–4
     (węzeł, podpis kwalifikowany, pieczęć kwalifikowana, certyfikat KSeF);
   - pkt 3 lit. b: § 6 ust. 2d: a KSeF token is valid no longer than 365 days from generation or
     from a start date indicated by the taxpayer (calendar days, Ordynacja rules on deadlines do not
     apply, per uzasadnienie); § 6 ust. 2a–2c: certificate usable within the holder's permissions,
     by a Peppol-identified entity (2b), or limited to one NIP or one branch identifier under § 4
     ust. 8 pkt 2 (2c);
   - pkt 3 lit. c: § 6 ust. 3 leaves token technical requirements to the API specification;
   - pkt 2: new permission „obsługi identyfikatorów zbiorczych" (§ 3 ust. 1 pkt 5, ust. 6–8); held
     by everyone entitled to issue or access invoices, and grantable on its own (uzasadnienie);
     covers generating, decoding, searching by KSeF number and browsing collective identifiers (art.
     108g);
   - § 2: entry into force 2027-01-01, except § 1 pkt 4 (the § 13 change) on 2026-12-31. The draft
     does not mention the 90-day default or the 24 h approval step from issue 885. Tier 1 draft (not
     law) Confidence: HIGH as to the draft text. ELI check 2026-11-11: still only Dz.U. 2026 poz.
     169 amends the regulation.

## Unsettled Questions

- Final form of the draft in fact 7 after consultation; when it will be signed and published.
- Whether the amending regulation takes over the issue 885 draft (90/365 days, approval step). The
  365-day maximum (fact 7) matches; the draft is silent on the 90-day default and approval step.
- Final date of the amending regulation and whether 30.11.2027 is an MF decision or only a plan.
- Whether "na czas nieokreślony" (cz. I) conflicts with the limited validity of old tokens.

## Suggested Sources Section

- Rozporządzenie Dz.U. 2025 poz. 1815: https://api.sejm.gov.pl/eli/acts/DU/2025/1815
- Dz.U. 2026 poz. 169: https://api.sejm.gov.pl/eli/acts/DU/2026/169
- Podsumowanie konsultacji MF 2026-06-11 (link above)
- Podręcznik KSeF 2.0 cz. I (06.08.2026):
  https://ksef.podatki.gov.pl/media/dmrfdixs/podrecznik-ksef-20-cz-i-rozpoczecie-korzystania-z-ksef-06082026.pdf
- CIRFMF/ksef-api issue #834: https://github.com/CIRFMF/ksef-api/issues/834
- CIRFMF/ksef-api issue #885 (draft token rules): https://github.com/CIRFMF/ksef-api/issues/885
- Draft amending regulation (fact 7): https://legislacja.gov.pl/projekt/12416152 (cite as a draft,
  „projekt, nie prawo")

## Warning: Common Misconceptions

- „Tokeny przestają działać 1 stycznia 2027": the text of the regulation says so, but MF has decided
  to keep them and the API team states existing tokens will not be invalidated on that date.
- „Można już zakładać, że tokeny zostają na zawsze": no; the regulation has not been amended yet.
- „Od 2027 tokeny działają do 30.11.2027, tak mówi rozporządzenie": no; that is the draft, not the
  regulation in force.
