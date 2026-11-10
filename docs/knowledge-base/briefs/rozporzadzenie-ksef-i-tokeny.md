# Research Brief: Rozporządzenie w sprawie KSeF (Dz.U. 2025 poz. 1815) i przyszłość tokenów

**Requested by:** weekly knowledge refresh **Date:** 2026-10-07 **Freshness:** 2026-11-10 (fact 7,
secondary sources only; fact 6 GitHub only; law in force at the 2026-10-07 check) **For content:**
updates of posts and briefs on tokens vs certificates

**Target query:** "tokeny KSeF po 2026", "czy tokeny KSeF będą działać w 2027"

**Answer in two sentences:** The binding regulation (Dz.U. 2025 poz. 1815, amended by Dz.U. 2026
poz. 169) still ends KSeF tokens on 31 December 2026, but MF has decided to keep them and, per
secondary sources, put a draft amending regulation into the government legislative process on
2026-10-27 (fact 7; not law, primary text not read). According to the CIRFMF API team (issue #834,
2026-09-10), tokens issued by 31.12.2026 will remain usable until 30.11.2027 and a new token
endpoint will follow.

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

7. **Draft amending regulation, October 2026 (secondary sources only, primary text NOT read):**
   several trade sites report that a draft „rozporządzenie Ministra Finansów i Gospodarki
   zmieniające rozporządzenie w sprawie korzystania z Krajowego Systemu e-Faktur" appeared on the
   RCL portal (legislacja.gov.pl) on 2026-10-27 (some sites say 2026-10-26), with uzgodnienia,
   public consultation and opiniowanie started the same day. Search summaries mention wykaz prac MF
   no. 138/2026 and RCL project id 12416152; both unconfirmed. Consultation deadline: not found.
   Reported provisions:
   - tokens generated before 2027-01-01 stay valid until 2027-11-30 (this provision reportedly
     enters into force on 2026-12-31, the rest on 2027-01-01);
   - tokens generated from 2027-01-01: validity at most 365 days from generation or from a start
     date chosen by the taxpayer;
   - a KSeF certificate can be limited to one NIP or one branch (oddział); it still carries no
     permissions by itself;
   - a permission to handle collective identifiers (identyfikator zbiorczy, marking one payment for
     several invoices) from 2027-01-01; sources disagree whether it is a separate permission or
     included in existing invoice issuing/access permissions. Secondary sources:
     https://fakturownia.pl/krajowy-system-e-faktur/zmiany-w-ksef,
     https://bezprawnik.pl/tokeny-ksef-2027/,
     https://www.prawo.pl/podatki/mf-wykorzystanie-tokenow-w-ksef-w-2027-r,1555908.html,
     https://ksiegowosc.infor.pl/wiadomosci/7690858 (article id),
     https://norman.finance/pl/en/blog/ksef-token-or-certificate. Tier 4 (press) Confidence: MEDIUM
     (consistent across outlets and with the API team statements in facts 4 and 6).
     legislacja.gov.pl, api.sejm.gov.pl and the press sites refused connections from the 2026-11-10
     run environment; the draft text, project number, date and consultation deadline must be checked
     locally before stating them as fact.

## Unsettled Questions

- Exact text, project number, consultation deadline and final form of the draft in fact 7; when it
  will be signed and published.
- Whether the amending regulation takes over the issue 885 draft (90/365 days, approval step). The
  reported 365-day maximum (fact 7) matches; the 90-day default and approval step are not reported.
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
- Draft amending regulation (fact 7): find on https://legislacja.gov.pl (search „e-Faktur"); until
  read, cite as „projekt opisany w mediach".

## Warning: Common Misconceptions

- „Tokeny przestają działać 1 stycznia 2027": the text of the regulation says so, but MF has decided
  to keep them and the API team states existing tokens will not be invalidated on that date.
- „Można już zakładać, że tokeny zostają na zawsze": no; the regulation has not been amended yet.
- „Od 2027 tokeny działają do 30.11.2027, tak mówi rozporządzenie": no; that is the draft, not the
  regulation in force.
