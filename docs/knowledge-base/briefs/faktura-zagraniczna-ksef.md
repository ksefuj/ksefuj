# Research Brief: Faktura zagraniczna w KSeF (UPDATE: who must use KSeF)

**Requested by:** content backlog UPDATE item `faktura-zagraniczna-ksef` **Date:** 2026-10-12 **For
content:** blog post `faktura-zagraniczna-ksef` (PL), `foreign-invoice-ksef` (EN),
`rakhunok-inozemnomu-kontrahenty-ksef` (UK)

**Target query:** „faktura dla zagranicznego kontrahenta KSeF"

**Answer in two sentences:** An invoice for a foreign buyer goes through KSeF like a domestic one,
with the buyer identified by `KodUE` + `NrVatUE`, `KodKraju` + `NrID` or `BrakID`, never NIP. The
obligation covers every taxpayer who issues invoices, active and VAT-exempt alike, from 1 April 2026
(1 February 2026 for the largest), with the 10 000 zł monthly carve-out until 31 December 2026.

**What changes the answer:**

- Seller is VAT-exempt (art. 113): still in KSeF, same timeline (MF FAQ, general Q10 and Q22).
- Monthly gross sales on invoices <= 10 000 zł, invoice issued by 31 Dec 2026: may be issued outside
  KSeF (art. 145m).
- Buyer is a private person: no obligation (art. 106ga ust. 2 pkt 4); not in scope of this update.

## Scope of the update

The post said „Od 1 kwietnia 2026 KSeF jest obowiązkowy dla wszystkich czynnych podatników VAT". Two
problems: VAT-exempt taxpayers are covered too, and the sentence ignored the 1 February stage for
the largest taxpayers and the art. 145m carve-out. Nothing else in the post is in scope.

## Key Facts (ready to use)

1. **KSeF covers active and exempt taxpayers.** Art. 106ga ust. 1 VAT Act: „Podatnicy są obowiązani
   wystawiać faktury ustrukturyzowane przy użyciu Krajowego Systemu e-Faktur." MF FAQ KSeF 2.0,
   general Q10: „każdy podatnik (czynny i zwolniony), który ma obowiązek wystawienia faktury, będzie
   wystawiał ją w KSeF". Source: https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20/ (quoted
   in `briefs/zwolniony-z-vat-ksef.md`, fact 6). Confidence: HIGH
2. **Stages:** 1 Feb 2026 for taxpayers whose 2024 sales exceeded 200 mln zł, 1 Apr 2026 for
   everyone else (CLAUDE.md legal baseline; `briefs/zwolniony-z-vat-ksef.md`, fact 6). Confidence:
   HIGH
3. **Art. 145m:** until 31 Dec 2026 a taxpayer may issue paper/electronic invoices if the gross
   value of sales documented by invoices issued in the month is <= 10 000 zł; the right is lost from
   the invoice that crosses it (`briefs/zwolniony-z-vat-ksef.md`, fact 7;
   `briefs/limit-10000-zl.md`). Confidence: HIGH
4. **Consolidated VAT Act is Dz.U. 2026 poz. 1263**
   (https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260001263), replacing the Dz.U. 2025
   poz. 775 link in the post's sources. Confidence: HIGH
5. **Private (consumer) buyers are outside the obligation.** Art. 106ga ust. 2 pkt 4 excludes
   invoices to „osoba fizyczna nieprowadząca działalności gospodarczej"; ust. 4 allows issuing them
   in KSeF voluntarily (`briefs/zwolniony-z-vat-ksef.md`, fact 10). Added to the `BrakID` section
   after the fact-check flagged that the post implied a foreign consumer invoice must go to KSeF.
   Confidence: HIGH

## Fetch status

ksef.podatki.gov.pl and isap.sejm.gov.pl returned proxy 403 from this environment on 2026-10-12. All
facts above are taken from the KB briefs verified earlier (see `WATCHLIST.md`); no URL here was
fetched live in this run.
