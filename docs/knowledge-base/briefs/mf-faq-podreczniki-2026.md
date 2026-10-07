# Research Brief: Nowe odpowiedzi MF i nowe wydania dokumentów (kwiecień–wrzesień 2026)

**Requested by:** weekly knowledge refresh **Date:** 2026-10-07 **Freshness:** 2026-10-07 **For
content:** FAQ / posts that quote MF guidance. INTERNAL reference.

**Answer in two sentences:** MF added a new FAQ „Najczęstsze pytania" (published 2026-04-15,
modified 2026-04-29, 25 Q&A), updated FAQ KSeF 2.0 (modified 2026-09-11), and re-issued Podręcznik
KSeF 2.0 cz. I–IV and the Aplikacja Podatnika manual (editions of 2026-08-06). The FA(3) information
sheet (Aug 2026 file) has no new changelog entry.

## Key Facts (ready to use)

1. **FAQ „Najczęstsze pytania" (https://ksef.podatki.gov.pl/ksef-news/najczestsze-pytania/):**
   - Q1/Q2: deduction from an invoice issued outside KSeF despite the obligation is kept if art. 86
     is met and no art. 88 exclusion; no automatic negative consequence for the buyer; „za 2026 rok
     nie będą nakładane sankcje" (Q2).
   - Q4: missing KSeF invoice = „uchybienie formalne".
   - Q7: KSeF number is not in the XML; it is returned in the UPO.
   - Q8/Q9: JPK_VAT markers DI (offline24 / unavailability invoices without KSeF number yet) and
     BFK.
   - Q11: Aplikacja Podatnika issues only online invoices (no offline).
   - Q12–Q14: 10 000 zł limit counts only invoices that must be issued in KSeF (not consumer
     invoices, not cash-register sales to consumers); once exceeded, KSeF obligation applies from
     that invoice on, even if later months are below.
   - Q21: invoices stored 10 years from the end of the issue year. Confidence: HIGH Tier 3
2. **FAQ KSeF 2.0 (https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20), modified 2026-09-11:**
   Q10: „każdy podatnik (czynny i zwolniony), który ma obowiązek wystawienia faktury, będzie
   wystawiał ją w KSeF"; Q43/Q44 (numbering varies by section of the page): art. 108g and art. 108a
   ust. 3 pkt 3 (KSeF number in the payment title) apply to payments from 2027-01-01. NOTE: the page
   has several sections each numbering from 1; older briefs' Q numbers may be off. Confidence: HIGH
3. **Manuals (https://ksef.podatki.gov.pl/pliki-do-pobrania-ksef-20/):** Podręcznik KSeF 2.0 cz. I
   (06.08.2026), cz. II (06.08.2026), cz. III, cz. IV (all 06.08.2026), Podręcznik Aplikacji
   Podatnika (06.08.2026), mobile app manual (31.08.2026). Changes in cz. II vs the February 2026
   edition used by `podrecznik-ksef-20-czesc-ii.md`: minor (legal-basis citations, §6.3). The
   existing brief is based on the stan z 1 lutego 2026 edition and was not re-extracted. Tier 2
   Confidence: MEDIUM (diff summarised by the research pass, not line-by-line)
4. **FA(3) information sheet**
   (https://ksef.podatki.gov.pl/media/nuclnu0w/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf):
   file in August 2026 has 173 pages (repo conversion: March 2026, 174 pages); no new changelog
   entry found. Action: a human should diff the PDF against
   `packages/validator/docs/fa3-information- sheet.md` before the next semantic-rule change.
   Confidence: MEDIUM
5. **Technical notices** (https://ksef.podatki.gov.pl/komunikaty-techniczne/): profil zaufany
   outages 2026-05-05/11, 27.08 maintenance; node certificate change 2026-07-03; TEST/Demo
   maintenance 2026-06-17/22; business-event model consultation 2026-04-23; Aplikacja Podatnika
   production difficulties 2026-09-25. Tier 3
6. **Legal-basis page** (modified 2026-05-29) lists the acts: Dz.U. 2025 poz. 1203, 1740, 1742, 1815
   and states the exemptions until end of 2026: 10 000 zł invoices, cash-register invoices (also
   receipts with NIP up to 450 zł), KSeF number in payments (art. 108g); VAT RR optional from
   2026-04-01.
   https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/podstawy-prawne-oraz-kluczowe-terminy/

## Unsettled Questions

- Not re-extracted: full diff of cz. II 2026-08-06 vs 2026-02-01.

## Suggested Sources Section

- URLs above.

## Warning: Common Misconceptions

- FAQ question numbers differ between the two FAQ pages and between sections; always cite page and
  quote the question text.
