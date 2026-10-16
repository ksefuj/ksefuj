# Research Brief: Rolnik ryczałtowy a KSeF (FAQ „Limity i wyłączenia")

**Requested by:** Orchestrator (FAQ update) **Date:** 2026-10-13 **For content:** FAQ answer „Czy
rolnik ryczałtowy musi korzystać z KSeF?" in `apps/web/content/pl/faq/limity-i-wylaczenia.mdx`

**Provenance:** built only from the repo knowledge base (baseline
`docs/knowledge-base/WATCHLIST.md`, last checked 2026-10-07: VAT Act consolidated text Dz.U. 2026
poz. 1263; Podręcznik KSeF 2.0 editions of 2026-08-06). A live check of ksef.podatki.gov.pl on
2026-10-13 returned proxy 403, so no official source was fetched in this run. All four sources were
then fetched live on 2026-10-16; see „Live verification (2026-10-16)" at the end.

**Target query:** „rolnik ryczałtowy KSeF"

**Answer in two sentences:** The KB has no MF source saying that rolnicy ryczałtowi are „wyłączeni z
KSeF". It shows two things: a rolnik ryczałtowy who is zwolniony z obowiązku fakturowania (art. 117)
may issue a rachunek instead of a faktura (Podręcznik KSeF 2.0 cz. II, §1.3), and faktury VAT RR,
issued by the buyer of agricultural produce, may be issued in KSeF voluntarily from 1 April 2026 (MF
page „Podstawy prawne oraz kluczowe terminy").

**What changes the answer:**

- The farmer issues invoices as a VAT taxpayer (czynny or zwolniony) for any sale: the general rule
  applies, „każdy podatnik (czynny i zwolniony), który ma obowiązek wystawienia faktury, będzie
  wystawiał ją w KSeF" (FAQ KSeF 2.0 Q10). Whether a farmer with other activity keeps the flat-rate
  status is NOT in the KB (see UNVERIFIED).
- Buyer of farm produce issuing VAT RR: optional in KSeF from 2026-04-01 (MF legal-basis page).
- Until 2026-12-31: art. 145m (10 000 zł/month gross) applies to every taxpayer (KB briefs
  `limit-10000-zl.md`, `koniec-limitu-10000-zl.md`).

## Key Facts (ready to use)

1. **VAT RR invoices are optional in KSeF from 2026-04-01.** The MF legal-basis page (modified
   2026-05-29) lists „VAT RR optional from 2026-04-01" among the KSeF rules. URL:
   https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/podstawy-prawne-oraz-kluczowe-terminy/ KB:
   `mf-faq-podreczniki-2026.md` fact 6 (English summary, no verbatim Polish). Already used in
   published content: `apps/web/content/pl/blog/ksef-od-1-kwietnia-2026.mdx:128` („Faktury VAT RR,
   wystawiane przy zakupie produktów rolnych od rolnika ryczałtowego … możesz wystawiać w KSeF
   dobrowolnie"). Confidence: HIGH (Tier 3) for „optional from 1.04.2026"; MEDIUM for anything about
   who issues it (see UNVERIFIED 1).
2. **KSeF accepts the FA_RR(1) schema.** KSeF checks XML against „FA(3), FA_RR(1), PEF". Source:
   Podręcznik KSeF 2.0 cz. II (stan na 1.02.2026), §1.6.1. KB: `podrecznik-ksef-20-czesc-ii.md` line
   174 (KB extract text, not MF verbatim). Confidence: HIGH
3. **VAT RR and VAT RR KOREKTA are stored in KSeF** („tryb ONLINE i offline24 po dosłaniu"), 10
   years from the end of the issue year. Source: Podręcznik cz. II, §7. KB:
   `podrecznik-ksef-20-czesc-ii.md` line 1148. Confidence: HIGH
4. **Rolnik ryczałtowy zwolniony z obowiązku fakturowania may issue a rachunek.** Rachunek „można
   wystawić jedynie dla: … Przez rolników ryczałtowych zwolnionych z obowiązku fakturowania (art.
   117 ustawy)". Source: Podręcznik cz. II, §1.3. KB: `podrecznik-ksef-20-czesc-ii.md` line 131 (KB
   extract text). A rachunek is not a faktura (art. 87 Ordynacji podatkowej, same §1.3), so it is
   not issued in KSeF; that last step is our reading, not an MF sentence. Confidence: HIGH (rachunek
   permitted) / MEDIUM (consequence for KSeF)
5. **Invoice takes precedence over rachunek.** „Pierwszeństwo ma zawsze obowiązek wystawienia
   faktury" (Podręcznik cz. II, §1.3; KB line ~120). Confidence: HIGH
6. **General rule: every taxpayer who must issue an invoice issues it in KSeF.** FAQ KSeF 2.0 Q10:
   „każdy podatnik (czynny i zwolniony), który ma obowiązek wystawienia faktury, będzie wystawiał ją
   w KSeF". URL: https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20 KB:
   `mf-faq-podreczniki-2026.md` fact 2. Confidence: HIGH (Tier 3)
7. **Permanent exclusions (art. 106ga ust. 2) do not name rolnik ryczałtowy.** KB lists: no seat /
   fixed establishment in PL (pkt 1, 2), special procedures (pkt 3), buyer a private person (pkt 4),
   art. 106s regulation (pkt 5), art. 113a (pkt 6). Source: VAT Act Dz.U. 2026 poz. 1263, art. 106ga
   (https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf). KB: `zwolniony-z-vat-ksef.md` fact 12;
   `kary-ksef-2027-2028.md` fact 11. Content of regulation Dz.U. 2025 poz. 1740 §2 is not in the KB
   (`limit-10000-zl.md`: „TEXT NOT ACCESSIBLE"). Confidence: HIGH for the list as recorded; whether
   §2 of poz. 1740 mentions farmers: not found in corpus.
8. **Exempt sales under art. 43 ust. 1 need no invoice unless the buyer asks.** Art. 106b ust. 2
   (verbatim in KB): „Podatnik nie jest obowiązany do wystawienia faktury w odniesieniu do sprzedaży
   zwolnionej od podatku na podstawie art. 43 ust. 1, art. 113 ust. 1 i 9 …"; on request within 3
   months he must (art. 106b ust. 3 pkt 2). KB: `zwolniony-z-vat-ksef.md` facts 3–4. Confidence:
   HIGH for the text; which pkt of art. 43 ust. 1 covers farmers is UNVERIFIED (see below).

## NOT supported by the KB (UNVERIFIED, do not state as fact)

1. ~~**Who issues VAT RR and on what basis (art. 116).**~~ RESOLVED 2026-10-16, see „Live
   verification" below: art. 116 ust. 1, issued by the buyer registered as czynny podatnik VAT.
2. **„Rolnik ryczałtowy is excluded from KSeF" / „art. 43 ust. 1 pkt 3".** INCORRECT (2026-10-16).
   `limit-10000-zl.md` Fact 5.1 note and misconception 3 claimed this from our own FAQ (circular);
   both are now struck through there. Art. 43 ust. 1 pkt 3 (read live) exempts from VAT „dostawę
   produktów rolnych dokonywaną przez rolnika ryczałtowego oraz świadczenie usług rolniczych przez
   rolnika ryczałtowego"; it is a VAT exemption, not a KSeF exclusion.
3. **Definition of rolnik ryczałtowy (art. 2 pkt 19):** still not extracted. Art. 117 is now
   verified (see below).
4. **Farmer with other business activity / VAT registration keeps or loses flat-rate status:** not
   in the KB. Current FAQ only says „skonsultuj się z księgowym"; keep that.
5. **Rolnik ryczałtowy as a buyer** (does he get KSeF invoices, NIP vs consumer): not in the KB
   (`faktura-dla-osoby-prywatnej-ksef.md` fact 11 GAP; published post lists it as unresolved).

## Unsettled Questions

- Does an invoice issued by a rolnik ryczałtowy for a non-agricultural or VAT-taxed sale go to KSeF?
  The general rule (fact 6) suggests yes, but no MF source in the KB applies it to farmers.
- Does VAT RR become mandatory in KSeF at any later date? The KB records only „optional from
  2026-04-01" with no end date.
- Does the art. 145m 10 000 zł limit interact with VAT RR? Not in the KB.

## Suggested Sources Section

- MF, Podstawy prawne oraz kluczowe terminy (VAT RR dobrowolnie od 1.04.2026):
  https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/podstawy-prawne-oraz-kluczowe-terminy/
- MF, Pytania i odpowiedzi KSeF 2.0 (Q10): https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20
- Podręcznik KSeF 2.0 cz. II, §1.3 (rachunek, art. 117), §7 (VAT RR w KSeF); current edition
  06.08.2026:
  https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
  (KB extract is of the 1.02.2026 edition; section numbers may differ)
- Ustawa o VAT, Dz.U. 2026 poz. 1263 (art. 106b, 106ga):
  https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf

## Warning: Common Misconceptions

- „Rolnik ryczałtowy jest wyłączony z KSeF" — not supported by any MF source in the KB; the only KB
  trace is circular (our own FAQ).
- „VAT RR musi iść do KSeF" — wrong for now: optional from 1.04.2026 (fact 1).
- Rolnik ryczałtowy (VAT regime) ≠ ryczałt ewidencjonowany (PIT); see `limit-10000-zl.md`
  misconception 3 (the PIT part is fine, the farmer-exclusion part is UNVERIFIED).

## URLs not fetched live on 2026-10-13 (proxy 403; all fetched on 2026-10-16, see below)

- https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/podstawy-prawne-oraz-kluczowe-terminy/
- https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20
- https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
- https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf

All facts above rest on the KB as verified up to 2026-10-07.

## Live verification (2026-10-16)

All four URLs above were fetched live on 2026-10-16.

- **Podstawy prawne oraz kluczowe terminy** (section „Faktury VAT RR"): „Fakultatywne wystawianie
  faktur VAT RR i faktur VAT RR KOREKTA w KSeF będzie możliwe od 1 kwietnia 2026 r." CONFIRMED. Same
  page: „Faktury na rzecz osób fizycznych nieprowadzących działalności gospodarczej mogą być
  wystawiane w KSeF dobrowolnie"; the art. 106s regulation is listed as Dz. U. z 2025 r. poz. 1742
  („w sprawie przypadków, w których nie ma obowiązku wystawiania faktur ustrukturyzowanych").
- **Pytania i odpowiedzi KSeF 2.0**, section „Zasady obowiązywania KSeF i przepisy prawne":
  - Q10: „Forma prawna nie ma znaczenia. Co do zasady każdy podatnik (czynny i zwolniony), który ma
    obowiązek wystawienia faktury, będzie wystawiał ją w KSeF — zgodnie z etapami: 1.02.2026 r.
    (duże podmioty) i 1.04.2026 r. (reszta)." CONFIRMED.
  - Q12: „Nabywca (podatnik VAT) wystawi fakturę VAT RR w KSeF tylko wtedy, gdy rolnik ryczałtowy
    złoży w systemie oświadczenie, że jest rolnikiem ryczałtowym i wskaże tego nabywcę jako
    uprawnionego. Jeśli rolnik nie złoży oświadczenia w KSeF, faktura VAT RR będzie wystawiona poza
    systemem."
  - Q5: „Obowiązek stosowania KSeF obejmie kwiaciarkę od 1 stycznia 2027 r." (sales under 10 000
    zł).
  - Q17: „Jeśli w drugim miesiącu przekroczy limit, to wystawia już w KSeF tę fakturę, którą
    przekroczył limit oraz wszystkie kolejne faktury."
- **Podręcznik KSeF 2.0 cz. II** (edition „Warszawa, sierpień 2026 r.", stan prawny na 1 lutego
  2026), §1.3 „Brak możliwości wystawienia rachunku przez podatnika korzystającego ze zwolnienia",
  p. 13: rachunki mogą być wystawione „przez rolników ryczałtowych zwolnionych z obowiązku
  wystawiania faktur na podstawie art. 117 ustawy o VAT." CONFIRMED.
- **Ustawa o VAT, Dz.U. 2026 poz. 1263** (tekst jednolity, stan na 26.08.2026):
  - Art. 117: „Rolnik ryczałtowy w zakresie prowadzonej działalności rolniczej dostarczający
    produkty rolne jest zwolniony z obowiązku: 1) wystawiania faktur; …" CONFIRMED.
  - Art. 116 ust. 1: „Podatnik zarejestrowany jako podatnik VAT czynny nabywający produkty rolne od
    rolnika ryczałtowego wystawia w dwóch egzemplarzach fakturę dokumentującą nabycie tych
    produktów."
  - Art. 106ga ust. 2 pkt 1–6: no seat/fixed establishment (pkt 1, 2); special procedures of dział
    XII rozdz. 7 (procedura nieunijna), 7a (okazjonalny międzynarodowy przewóz drogowy osób) and 9
    (import, IOSS) (pkt 3; the union OSS procedure, rozdz. 6a, is NOT listed); private-person buyer
    (pkt 4); art. 106s regulation (pkt 5); art. 113a (pkt 6). No mention of rolnik ryczałtowy.
    CONFIRMED.
  - Art. 145m ust. 1–2: 1.04.2026–31.12.2026, ≤ 10 000 zł gross per month; the right is lost
    „począwszy od faktury, którą przekroczono wartość".
