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

## Addendum 2026-10-27: P_18A on foreign invoices

**Requested by:** content backlog UPDATE item (2026-10-27), post section „## Adnotacje: P_18 i
P_18A" in `apps/web/content/pl/blog/faktura-zagraniczna-ksef.mdx` (l. 177-193)

**Target query:** „P_18A faktura zagraniczna" / „MPP WDT eksport"

**Answer in two sentences:** `P_18A` = `1` only when the invoice's kwota należności ogółem exceeds
15 000 zł (or the foreign-currency equivalent) and it covers a supply of goods or services listed in
załącznik nr 15 „dokonaną na rzecz podatnika"; in every other case `2` (schema FA(3), annotation of
`P_18A`, `schemat.xsd` l. 2662-2667). The schema text names no exclusion for WDT, export or services
to foreign buyers, and no source in the repo says MPP „nie ma zastosowania w transakcjach
zagranicznych", so `2` on a typical foreign invoice follows from the conditions not being met (no
Annex 15 item, amount ≤ 15 000 zł), not from a rule about foreign transactions.

**What changes the answer:**

- Invoice has no item from załącznik nr 15 (e.g. most services billed with `np I` / `np II`): `2`
  regardless of amount (schema condition not met).
- Kwota należności ogółem ≤ 15 000 zł (PLN equivalent, converted under the rules for the tax base):
  `2` (schema condition not met).
- Annex 15 goods > 15 000 zł supplied as WDT (`0 WDT`) or export (`0 EX`), or to a foreign buyer:
  NOT SETTLED in the corpus. Whether the buyer counts as „podatnik" in „na rzecz podatnika", and
  whether a 0% invoice is in scope, is not explained by any source in the repo (see Unsettled
  Questions below).

**Fetch status (this run):** one attempt each, 2026-10-27:
`https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf` and
`https://crd.gov.pl/wzor/2025/06/25/13775/schemat.xsd` both failed with
`CONNECT tunnel failed, response 403` (agent proxy, connect_rejected). Not retried. Nothing below
was fetched live in this run; "fetched live" flags refer to earlier KB runs as stated in the cited
brief.

### Key Facts

1. **Schema condition for `P_18A` (Tier 2, MF schema).** Verbatim: „W przypadku faktur, w których
   kwota należności ogółem przekracza kwotę 15 000 zł lub jej równowartość wyrażoną w walucie obcej,
   obejmujących dokonaną na rzecz podatnika dostawę towarów lub świadczenie usług, o których mowa w
   załączniku nr 15 do ustawy - wyrazy "mechanizm podzielonej płatności", (...) należy podać wartość
   "1", w przeciwnym przypadku - wartość "2"" — bundled
   `packages/validator/src/schemas/ schemat.xsd`, `Fa/Adnotacje/P_18A`, l. 2662-2667. Three
   cumulative conditions: amount > 15 000 zł (or equivalent), Annex 15 goods/services, supply „na
   rzecz podatnika". Confidence: HIGH. Fetched live: no (bundled XSD; crd.gov.pl 403 this run).
2. **The schema text names no transaction-type exclusion.** The `P_18A` annotation does not mention
   WDT, export, rates `0 WDT` / `0 EX` / `np I` / `np II`, reverse charge or the buyer's country
   (same source, l. 2664-2665). By contrast, the `P_18` annotation is the one that refers to the
   buyer settling the tax: „W przypadku dostawy towarów lub wykonania usługi, dla których
   obowiązanym do rozliczenia podatku od wartości dodanej lub podatku o podobnym charakterze jest
   nabywca towaru lub usługi - wyrazy "odwrotne obciążenie"" (l. 2657-2661). Confidence: HIGH (what
   the text says); whether the provision applies to foreign supplies in substance: not stated.
   Fetched live: no.
3. **Statutory counterpart is worded the same.** Art. 106e ust. 1 pkt 18a has wording consistent
   with the `P_18A` annotation, including „na rzecz podatnika" — Dz.U. 2026 poz. 1263, via brief
   `mpp-split-payment-ksef.md`, fact 9 (fetched live 2026-10-23 in that run). Confidence: HIGH.
   Fetched live: no (this run); yes (2026-10-23, per that brief).
4. **Buyer's obligation (art. 108a ust. 1a) is tied to paying for Annex 15 purchases.** „Przy
   dokonywaniu płatności za nabyte towary lub usługi wymienione w załączniku nr 15 do ustawy,
   udokumentowane fakturą, w której kwota należności ogółem przekracza kwotę 15 000 zł lub jej
   równowartość wyrażoną w walucie obcej, podatnicy są obowiązani zastosować mechanizm podzielonej
   płatności." Ust. 1: MPP is otherwise optional („mogą zastosować"). Ust. 1b: the seller must
   accept MPP payment for an invoice under art. 106e ust. 1 pkt 18a. — Dz.U. 2026 poz. 1263, via
   `mpp-split-payment-ksef.md` facts 8-9. Confidence: HIGH. Fetched live: no (this run); yes
   (2026-10-23, per that brief).
5. **What an MPP payment carries (art. 108a ust. 3).** The MPP transfer message contains the VAT
   amount (pkt 1), the gross amount (pkt 2), the invoice number / KSeF number (pkt 3) and „numer
   identyfikujący dostawcę na potrzeby podatku" (pkt 4) — Dz.U. 2026 poz. 1263, PDF s. 137, via
   brief `numer-ksef-w-przelewie.md` fact 3; Podręcznik KSeF 2.0 cz. II, pkt 4.1.4 (brief
   `podrecznik-ksef-20-czesc-ii.md` l. 897-903). Confidence: HIGH for the list. Art. 108a ust. 2
   (where the VAT amount is paid, e.g. a VAT account) is **not found in corpus**; the KB does not
   quote it, so no claim about the VAT-account mechanics or about invoices showing 0 zł VAT can be
   sourced from the repo. Fetched live: no.
6. **No KB source says MPP doesn't apply to foreign transactions.** Grep of `docs/knowledge-base/`
   and `packages/validator/docs/fa3-information-sheet.md` (2026-10-27) for MPP / „podzielonej" /
   `P_18A` / „załącznik nr 15" / WDT / eksport: no statement excluding WDT, export or foreign buyers
   from MPP, and no statement on whether a foreign buyer is a „podatnik" for `P_18A`. The only such
   claim in the repo is the published post itself (already flagged in `mpp-split-payment-ksef.md`,
   Unsettled Questions). Confidence: HIGH (absence in corpus). Fetched live: n/a.
7. **Brochure FA(3) §9.6 gives only the two conditions.** `P_18A` „Mandatory", „"1" = split payment
   mechanism (total > PLN 15,000, Annex 15 goods/services); "2" = no split payment" —
   `fa3-information-sheet.md` l. 511 (EN conversion; the „na rzecz podatnika" condition is not
   rendered in the conversion). No WDT/export remark at `P_18A`. Confidence: HIGH. Fetched live: no.
8. **„Podatnik" in the KB is only defined for the issuer side.** Podręcznik KSeF 2.0 cz. II §1.2
   lists who is a „podatnik" under art. 15 ust. 1 (JDG, spółki, grupy VAT, etc.) in the context of
   who must issue invoices in KSeF (`podrecznik-ksef-20-czesc-ii.md` l. 45-63). It says nothing
   about foreign buyers or about the meaning of „na rzecz podatnika" in art. 106e ust. 1 pkt 18a.
   Confidence: HIGH (for what it covers); applicability to the `P_18A` buyer: not stated. Fetched
   live: no.
9. **Official MF examples for WDT and export use `P_18A` = `2`.** `FA_3_Przykład_22.xml` (WDT,
   `P_12` `0 WDT`, KodUE DE, KodWaluty EUR, P_15 4000, goods „lodówka Zimnotech mk1") and
   `FA_3_Przykład_23.xml` (export, `P_12` `0 EX`, buyer US, KodWaluty USD, P_15 8000, same goods)
   both have `<P_18>2</P_18>` and `<P_18A>2</P_18A>`, no `P_12_Zal_15` —
   `test-fixtures/ official-examples/` (Podręcznik cz. II §2.11 refers to „przykład nr 22, 23").
   None of the 26 bundled MF examples uses `P_18A` = `1`. These examples show values, not a rule:
   they do not say why `2` was chosen, and the KB has no Annex 15 item list to check whether the
   goods are on it. Confidence: HIGH (file content); MEDIUM-LOW as evidence of a foreign-transaction
   rule (none stated). Fetched live: no.
10. **Firm conclusion supported by the schema alone:** for a foreign invoice with no Annex 15 item
    (e.g. typical services with `np I` / `np II`, IT, consulting) or with kwota należności ogółem ≤
    15 000 zł (PLN equivalent), the schema condition is not met → `P_18A` = `2` (fact 1, „w
    przeciwnym przypadku - wartość "2""). Confidence: HIGH. The reason is the missing Annex 15 item
    or amount, not the foreign buyer. Fetched live: no.
11. **`P_18` and `P_18A` are independent fields.** Each is its own mandatory `TWybor1_2` element
    with its own condition (`schemat.xsd` l. 2657-2667; brochure §9.6 l. 510-511); no source links
    reverse charge (`P_18` = `1`) to `P_18A`. Confidence: HIGH. Fetched live: no.

### Unsettled Questions (do not answer definitively in the post)

- **Annex 15 goods > 15 000 zł as WDT or export:** `P_18A` = `1` or `2`? Turns on whether the
  foreign buyer is a „podatnik" in „na rzecz podatnika" and whether MPP is meaningful for an invoice
  with 0 zł VAT. Neither point is addressed in the corpus; art. 108a ust. 2 is not in the KB. Add to
  `faq-gaps.md` when the index is next updated.
- **Annex 15 services to a foreign buyer under reverse charge (`np I` / `np II`):** same open point;
  in practice Annex 15 is mostly goods, but the KB holds no item list (`mpp-split-payment-ksef.md`,
  Unsettled Questions: „pełna lista pozycji załącznika nr 15: brak w KB").
- **Foreign buyer paying in MPP at all:** no KB source covers whether a non-Polish payer can make an
  MPP transfer.

### Suggested wording direction for the Copywriter (facts only)

- Replace „MPP dotyczy płatności krajowych i nie ma zastosowania w transakcjach zagranicznych" and
  „domyślna wartość przy transakcjach zagranicznych" (no source) with the three schema conditions
  (fact 1) and state that for services and goods outside załącznik nr 15, or invoices ≤ 15 000 zł,
  the value is `2` (fact 10). For Annex 15 goods above the threshold sold as WDT/export, say the MF
  materials do not address it (Unsettled Questions).
- Sources to cite (already in KB / posts): schemat FA(3)
  https://crd.gov.pl/wzor/2025/06/25/13775/schemat.xsd; Broszura FA(3) §9.6
  https://ksef.podatki.gov.pl/media/nuclnu0w/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf;
  ustawa o VAT Dz.U. 2026 poz. 1263 (art. 106e ust. 1 pkt 18a, art. 108a ust. 1, 1a)
  https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260001263; internal
  `/blog/mpp-split-payment-ksef` (published).

### Warning: Common Misconceptions

- „MPP nie dotyczy transakcji zagranicznych": not stated in any official source in the corpus; the
  schema conditions are amount + Annex 15 + „na rzecz podatnika".
- „`P_18` = `1` (odwrotne obciążenie) oznacza `P_18A` = `2`": no source links them (fact 11); for
  services `2` follows from the Annex 15 condition, not from reverse charge.
- „`2` to wartość domyślna": `2` is the value when the condition is not met („w przeciwnym
  przypadku"), and the field must always be present; there is no default in the schema.

**Freshness:** 2026-10-27. Re-check when Dz.U. art. 108a / art. 106e ust. 1 pkt 18a change, a new FA
schema or brochure is published (`pnpm update-schemas`), or MF publishes guidance on MPP and
WDT/export; also when api.sejm.gov.pl becomes reachable (quote art. 108a ust. 2 and art. 106e ust. 1
pkt 18a verbatim).
