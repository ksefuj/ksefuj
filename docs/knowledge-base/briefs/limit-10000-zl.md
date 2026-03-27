# Research Brief: Limit 10 000 zł — próg zwalniający z KSeF

**Requested by:** Copywriter agent
**Date:** 2026-03-27
**For content:** Blog post — "Limit 10 000 zł a KSeF — kogo dotyczy i jak go liczyć"
**Target persona:** Small JDG / freelancer, czynny podatnik VAT, monthly sales near or below 10,000 PLN;
also: JDG on ryczałt ewidencjonowany (PIT), JDG not issuing many invoices. Secondary: accountant
advising micro-businesses.
**Tool context:** ksefuj.to — free KSeF XML validator

---

## Source Corpus Used

| Source | Tier | File / URL | Status |
| --- | --- | --- | --- |
| Ustawa o VAT (Dz. U. z 2025 r., poz. 775 ze zm.) | 1 | https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20250000775 | CURRENT — **⚠️ TEXT NOT ACCESSIBLE** in this environment (no network access; Act not stored locally) |
| Rozporządzenie MF z 7.12.2025 (wyłączenia) | 1 | https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20250001740 | CURRENT — ⚠️ TEXT NOT ACCESSIBLE |
| FA(3) Information Sheet (Broszura informacyjna, marzec 2026) | 2 | `packages/validator/docs/fa3-information-sheet.md` | CURRENT — **SILENT on adoption thresholds** (technical schema doc only) |
| FAQ MF — KSeF 2.0 | 3 | https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20 | CURRENT — ⚠️ NOT ACCESSIBLE (network unavailable) |
| Blog (PL): ksef-od-1-kwietnia-2026.mdx | internal output | `apps/web/content/pl/blog/ksef-od-1-kwietnia-2026.mdx` | CURRENT (not a primary source — our output) |
| Blog (PL): ksef-dla-jdg.mdx | internal output | `apps/web/content/pl/blog/ksef-dla-jdg.mdx` | CURRENT (not a primary source — our output) |
| FAQ (PL): limity-i-wylaczenia.mdx | internal output | `apps/web/content/pl/faq/limity-i-wylaczenia.mdx` | CURRENT (not a primary source — our output) |
| Blog (EN): ksef-dla-jdg.mdx | internal output | `apps/web/content/en/blog/ksef-dla-jdg.mdx` | CURRENT (translated output) |
| Blog (EN): ksef-od-1-kwietnia-2026.mdx | internal output | `apps/web/content/en/blog/ksef-od-1-kwietnia-2026.mdx` | CURRENT (translated output) |
| FAQ (EN): exemptions-and-thresholds.mdx | internal output | `apps/web/content/en/faq/exemptions-and-thresholds.mdx` | CURRENT (translated output) |
| Research Brief: ksef-dla-jdg.md | internal knowledge base | `docs/knowledge-base/briefs/ksef-dla-jdg.md` | CURRENT |

> ⚠️ **CRITICAL NOTICE TO COPYWRITER:** No Tier 1 or Tier 2 source text was directly accessible
> during this extraction. The network and the local repository do not contain the full text of the
> Ustawa o VAT. **ALL factual claims about the threshold mechanism below are sourced from our own
> published output (internal), not from primary law text.** This creates a significant verification
> gap — especially for the calculation method (monthly vs annual). See **Critical Discrepancy** and
> **Unsettled Questions** sections. **Do not publish the blog post without first verifying Art. 145m
> text directly against the current consolidated Act.**

---

## Summary of What the Corpus Says

Every accessible source in the repository — blogs (PL, EN, UK), FAQ (PL, EN, UK), and the
ksef-dla-jdg research brief — consistently describes the 10,000 PLN threshold as **monthly total
sales** ("miesięczna sprzedaż", "łączna wartość sprzedaży w danym miesiącu"). This description is
uniform across seven separate files.

However, **no source in the corpus contains the actual text of Art. 145m**, and the FAQ
`limity-i-wylaczenia.mdx` explicitly notes the rules "były kilkakrotnie nowelizowane" (were amended
several times). The existing research brief `ksef-dla-jdg.md` already flagged this as an unsettled
question: "The specific article number is not confirmed in the corpus available for this extraction."

A competing interpretation — **annual sales documented with invoices in the previous tax year** —
is referenced in the task brief for this article but is **not found in any accessible corpus
source**. See **Critical Discrepancy** section.

---

## Key Facts (ready to use)

### 1. Existence and duration of the 10,000 PLN exemption

---

**Fact 1.1 — The exemption exists and is temporary**

- **Fact:** Active VAT taxpayers whose sales fall below 10,000 PLN have a temporary exemption from
  the mandatory KSeF obligation. This exemption expires on **31 December 2026**. After that date,
  KSeF becomes mandatory for this group too.
- **Source:** Ustawa o VAT (as amended), Art. 145m; blog `ksef-od-1-kwietnia-2026.mdx`, §"Wyjątek:
  bardzo małe obroty"; blog `ksef-dla-jdg.mdx`, §"Czy dotyczy mnie KSeF"
- **Verbatim (PL):** "Jeśli Twoja miesięczna sprzedaż nie przekracza 10 000 PLN, przepisy przewidują
  tymczasowe zwolnienie z obowiązku wystawiania faktur przez KSeF — **do 31 grudnia 2026 r.** Po tym
  terminie zwolnienie wygasa i obowiązek KSeF obejmie również tę grupę."
- **Confidence:** MEDIUM — The existence and expiry date of the exemption are stated consistently
  across all accessible sources. However: (a) the Act text has not been read directly; (b) the FAQ
  notes the rules "były kilkakrotnie nowelizowane" — the expiry date may have changed and may change
  again; (c) always hedge with "według aktualnie obowiązujących przepisów."
- **⚠️ Freshness flag:** Expiry condition: 31 December 2026. **Review on 1 January 2027.** Monitor
  for any further legislative amendments before that date.

---

**Fact 1.2 — The threshold has already been amended at least once**

- **Fact:** The 10,000 PLN threshold and its associated exemption period have been amended at least
  once since the original KSeF legislation. The current rules may not match the version originally
  enacted.
- **Source:** FAQ `limity-i-wylaczenia.mdx` (PL and EN); Research Brief `ksef-dla-jdg.md`
- **Verbatim (PL):** "Przepisy te były kilkakrotnie nowelizowane — sprawdź aktualne regulacje na
  stronie ksef.podatki.gov.pl lub zapytaj księgowego." (FAQ `limity-i-wylaczenia.mdx`)
  Also: "Limit był już nowelizowany — zawsze weryfikuj aktualną datę na ksef.podatki.gov.pl przed
  podjęciem decyzji." (blog `ksef-dla-jdg.mdx`)
- **Confidence:** HIGH (the amendment history itself is stated explicitly)
- **Implication:** Do not cite the original legislative text for this threshold; always point readers
  to the consolidated current version of the Act (Dz. U. z 2025 r., poz. 775 ze zm.) and advise
  verification at ksef.podatki.gov.pl.

---

**Fact 1.3 — This applies only to czynni podatnicy VAT (active VAT taxpayers)**

- **Fact:** The 10,000 PLN exemption is a transitional provision for **czynni podatnicy VAT** — i.e.,
  taxpayers registered for VAT who file VAT-7 or VAT-7K returns. Taxpayers already exempt from VAT
  (zwolnienie podmiotowe — annual turnover below 200,000 PLN, or zwolnienie przedmiotowe — exempt
  activity by law) are entirely outside the KSeF mandate as of 1 April 2026 and therefore do not
  need the 10,000 PLN exemption at all.
- **Source:** Blog `ksef-od-1-kwietnia-2026.mdx`, §"Kogo dotyczy obowiązek" and §"Wyjątek: bardzo
  małe obroty"; blog `ksef-dla-jdg.mdx`, §"Czy dotyczy mnie KSeF"
- **Verbatim (PL):** "Obowiązek korzystania z KSeF mają **czynni podatnicy VAT** [...] **Nie dotyczy**
  (na razie) podatników VAT zwolnionych."
- **Confidence:** HIGH
- **Implication:** A JDG on zwolnienie z VAT (below 200k/year threshold) does NOT need the 10,000 PLN
  exemption — they are already excluded. The 10,000 PLN provision is only relevant to a JDG who IS
  registered for VAT but has very small sales.

---

### 2. How the 10,000 PLN threshold is calculated — the corpus position

---

**Fact 2.1 — Corpus position: threshold is based on total monthly sales**

- **Fact:** According to every accessible source in the corpus, the 10,000 PLN threshold is
  calculated as the **total value of sales in a given calendar month** (łączna wartość sprzedaży w
  danym miesiącu), not the number of invoices issued, and not annual turnover.
- **Source:** FAQ `limity-i-wylaczenia.mdx` (PL and EN); blog `ksef-dla-jdg.mdx` and its `<Info>`
  block; Research Brief `ksef-dla-jdg.md`, Fact 1.7
- **Verbatim (PL — primary statement):** "Limit liczony jest jako łączna wartość sprzedaży w danym
  miesiącu, nie suma wystawionych faktur. Wlicza się sprzedaż opodatkowaną VAT oraz zwolnioną."
  (FAQ `limity-i-wylaczenia.mdx`)
- **Verbatim (PL — corroborating blog):** "Limit 10 000 zł liczy się od łącznej wartości sprzedaży
  w danym miesiącu — nie od liczby wystawionych faktur. Wlicza się zarówno sprzedaż opodatkowana
  VAT, jak i zwolniona." (blog `ksef-dla-jdg.mdx`, `<Info>` block)
- **Confidence:** MEDIUM — Stated consistently across seven files, but ALL of these are our own
  published output, not primary law text. The Act text (Art. 145m) has not been read directly. See
  Critical Discrepancy below.
- **⚠️ VERIFY BEFORE PUBLISHING against Art. 145m text.**

---

**Fact 2.2 — Both VAT-taxable and VAT-exempt sales are counted**

- **Fact:** The threshold includes both sales subject to VAT and sales exempt from VAT. It is not
  limited to invoiced revenue only — it is total sales value.
- **Source:** FAQ `limity-i-wylaczenia.mdx`; blog `ksef-dla-jdg.mdx`; EN FAQ
  `exemptions-and-thresholds.mdx`
- **Verbatim (PL):** "Wlicza się sprzedaż opodatkowaną VAT oraz zwolnioną."
- **Verbatim (EN):** "Both VAT-taxable and VAT-exempt sales count."
- **Confidence:** MEDIUM (same caveat as Fact 2.1 — derived from internal output, not Act text)
- **Implication:** A JDG cannot subtract their VAT-exempt revenue (e.g., health, educational
  services under art. 43) to stay below the threshold. Total sales count.

---

**Fact 2.3 — The threshold is NOT based on the number of invoices issued**

- **Fact:** The FAQ explicitly states the threshold is NOT calculated as the sum of invoices issued
  ("nie suma wystawionych faktur"). The sales count whether or not they are documented with invoices.
- **Source:** FAQ `limity-i-wylaczenia.mdx`; blog `ksef-dla-jdg.mdx`
- **Verbatim (PL):** "Limit liczony jest jako łączna wartość sprzedaży w danym miesiącu, **nie suma
  wystawionych faktur**."
- **Confidence:** MEDIUM (internal output only; Act text not read)
- **Implication for misconception:** A JDG who earns 12,000 PLN in a month but issued invoices for
  only 5,000 PLN is NOT below the threshold according to this corpus interpretation.

---

### 3. Critical Discrepancy: monthly sales vs. annual invoice-documented sales

---

> **⚠️ THIS IS THE MOST IMPORTANT SECTION OF THIS BRIEF. READ BEFORE WRITING.**

**Discrepancy 3.1 — "Monthly" (corpus) vs. "Annual invoice-documented" (task brief)**

- **Position A (corpus — every accessible source):** The threshold is monthly total sales —
  "łączna wartość sprzedaży w danym miesiącu."
- **Position B (not found in corpus — cited in task brief for this article):** The threshold is
  annual sales documented with invoices in the **previous tax year** — "wartość sprzedaży
  udokumentowanej fakturami wystawionymi w poprzednim roku podatkowym."
- **Sources for Position A:** FAQ `limity-i-wylaczenia.mdx`, blog `ksef-dla-jdg.mdx`,
  `ksef-od-1-kwietnia-2026.mdx`, EN equivalents, Research Brief `ksef-dla-jdg.md` — **all internal
  output, Tier 0 (our own content).**
- **Sources for Position B:** NONE found in this corpus. The task brief references it without citing
  a specific source document. The Act text is inaccessible in this environment.
- **Why Position B cannot be dismissed:** Polish tax thresholds frequently use the prior-year
  backward-looking mechanism (e.g., the 200,000 PLN VAT exemption under Art. 113 also uses prior
  year turnover to determine eligibility at the start of a new year). A phase-in rule in Art. 145m
  that uses the prior-year invoice value would be structurally consistent with how Polish tax law
  typically stages compliance obligations. However, this is analytical inference — NOT a factual
  claim sourced from the Act text.
- **Why Position A cannot be dismissed:** Seven separate content files consistently use "monthly."
  This consistency suggests the authors of those files had a source. However, no Tier 1 citation is
  preserved in those files to confirm what that source was.
- **Resolution status:** UNRESOLVED. Cannot be resolved without reading Art. 145m directly.
- **Recommended action:** **Before writing the blog post, read Art. 145m of the current consolidated
  Ustawa o VAT (Dz. U. z 2025 r., poz. 775 ze zm.) directly.** The exact statutory phrase
  determines which interpretation is correct. If Position B is correct, ALL seven existing content
  files contain a material error that must be corrected across the entire site.
- **Confidence for Copywriter use:** Position A = MEDIUM (consistent internal usage, no direct law
  citation). Position B = LOW (not found in corpus, inference only).

---

**Discrepancy 3.2 — Practical stakes of the discrepancy**

| Question | If Position A (monthly) | If Position B (annual invoice-documented) |
| --- | --- | --- |
| How do you know if you qualify? | Check your sales each calendar month | Look at your previous year's invoice total |
| If you earned 8,000 PLN/month in 2025 in invoices, do you qualify in 2026? | Yes, each month you check anew | Yes, based on 2025 data you qualify for all of 2026 |
| If you earn 11,000 PLN in June 2026, do you lose the exemption that month? | Yes, immediately | No, you're still exempt all of 2026; 2027 status depends on 2026 totals |
| Does non-invoiced revenue count? | Yes (total sales) | No (only invoice-documented sales per corpus description of Position B) |
| Can you plan your KSeF adoption timing? | Month-by-month unpredictability | Annual predictability — you know at start of year |

- **Confidence:** LOW on the entire table — these are logical implications of the two interpretations, not facts from corpus sources.

---

### 4. Timeline: when does the exemption end and what happens then?

---

**Fact 4.1 — Hard expiry: 31 December 2026**

- **Fact:** The 10,000 PLN exemption expires on **31 December 2026**. From **1 January 2027**,
  all czynni podatnicy VAT — regardless of sales volume — must use KSeF.
- **Source:** Blog `ksef-od-1-kwietnia-2026.mdx`, §"Wyjątek: bardzo małe obroty"; blog
  `ksef-dla-jdg.mdx`; Research Brief `ksef-dla-jdg.md`, Fact 1.6
- **Verbatim (PL):** "Po tym terminie zwolnienie wygasa i obowiązek KSeF obejmie również tę grupę."
- **Confidence:** MEDIUM (as Fact 1.1; expiry date consistent across corpus, but Act text not read
  directly; hedge with "według aktualnie obowiązujących przepisów")
- **⚠️ Freshness flag:** Review on 1 January 2027 (or earlier if further amendments are announced).

---

**Fact 4.2 — What happens when threshold is crossed — NOT described in corpus**

- **Finding:** No accessible source in the corpus describes what happens when a taxpayer CROSSES the
  10,000 PLN threshold. Specifically:
  - Is the obligation immediate (starting with the invoice that causes the threshold to be exceeded)?
  - Does it start from the following calendar month?
  - Does it start from the following invoice?
  - Is there a transition period?
- **Source:** NOT FOUND IN CORPUS.
- **Confidence:** N/A — gap, not a fact.
- **⚠️ Open Question:** See Unsettled Questions, item 1. Do NOT write guidance on this without
  verifying against Art. 145m text.

---

**Fact 4.3 — Penalty grace period applies independently of the threshold**

- **Fact:** Financial penalties for violating the KSeF obligation are deferred until **1 January
  2027** for all taxpayers — including those who exceed the 10,000 PLN threshold before 31 December
  2026. The deferral of penalties does not extend the legal obligation itself.
- **Source:** Blog `ksef-od-1-kwietnia-2026.mdx`, §"Co grozi za fakturę wystawioną poza KSeF";
  blog `ksef-dla-jdg.mdx`, §"Najczęstsze pytania JDG o KSeF — Od kiedy grożą kary"; Research
  Brief `ksef-dla-jdg.md`, Freshness Tracker
- **Verbatim (PL):** "Kary za błędy w KSeF zostały odroczone do **1 stycznia 2027 r.** Oznacza to,
  że od 1 kwietnia 2026 roku obowiązek wystawiania faktur przez KSeF obowiązuje, ale sankcje za jego
  naruszenie zaczną być egzekwowane dopiero od 2027 roku."
- **Confidence:** HIGH (consistent, with Art. 106gc cited as source)
- **Legal basis cited:** Art. 106gc ustawy o VAT

---

### 5. Who is affected — practical scenarios

---

**Fact 5.1 — JDG on ryczałt ewidencjonowany (PIT) — NOT the same as VAT exemption**

- **Fact:** A JDG paying income tax on the "ryczałt ewidencjonowany" (flat-rate income tax) basis
  is NOT automatically VAT-exempt. Ryczałt refers to the PIT (income tax) settlement method — it is
  independent of VAT status. A JDG on ryczałt can be (and often is) a czynny podatnik VAT, in which
  case the KSeF obligation and the 10,000 PLN threshold apply normally.
- **Source:** FAQ `limity-i-wylaczenia.mdx` is silent on this specific distinction. The distinction
  between PIT ryczałt and VAT status is implied by the general KSeF framework in blog
  `ksef-od-1-kwietnia-2026.mdx`, §"Kogo dotyczy obowiązek" (only mentions VAT status, not PIT
  settlement method).
- **Confidence:** HIGH (the VAT/PIT independence is a fundamental and settled point of Polish tax
  law, not specific to KSeF)
- **Implication:** "Jestem na ryczałcie" is NOT a reason to be exempt from KSeF. Only being on VAT
  exemption (not registered as czynny podatnik VAT) creates the exclusion.
- **⚠️ NOTE:** "Rolnik ryczałtowy" (flat-rate VAT farmer) is a DIFFERENT concept under Art. 43
  ust. 1 pkt 3 — they are excluded from KSeF for agricultural product sales. FAQ
  `limity-i-wylaczenia.mdx` confirms this separately.

---

**Fact 5.2 — Sole traders not issuing invoices — still potentially affected**

- **Fact:** A czynny podatnik VAT who does not typically issue invoices (e.g., sells only to
  consumers and issues receipts/paragony) is NOT in the 10,000 PLN threshold scenario — B2C invoices
  and cash register receipts are excluded from KSeF regardless of volume. The 10,000 PLN threshold
  is relevant only for B2B transactions where invoices must be issued.
- **Source:** Blog `ksef-od-1-kwietnia-2026.mdx`, §"Kto jest wyłączony z KSeF" (B2C exclusion,
  paragony exclusion); FAQ `limity-i-wylaczenia.mdx`, §"Kto jest zwolniony z KSeF"
- **Verbatim (PL):** "Faktury wystawiane dla **konsumentów (B2C)** — osób fizycznych
  nieprowadzących działalności gospodarczej" — wyłączone z obowiązku.
- **Confidence:** HIGH (B2C exclusion is well-established)
- **Implication:** A czynny podatnik VAT with only B2C transactions may not need the 10,000 PLN
  threshold exemption at all, because their invoices are excluded from KSeF on other grounds. But
  a JDG with ANY B2B sales (even occasional) is in scope.

---

**Fact 5.3 — Nonprofit organizations (foundations, associations) — separate rule**

- **Fact:** Foundations and associations that are czynni podatnicy VAT are subject to KSeF from 1
  April 2026 for their VAT invoices, regardless of the 10,000 PLN threshold. Organizations
  conducting exclusively VAT-exempt activities join KSeF from 1 January 2027.
- **Source:** FAQ `limity-i-wylaczenia.mdx`, §"Czy fundacja lub stowarzyszenie musi korzystać z KSeF"
- **Verbatim (PL):** "Jeśli tak — od 1 kwietnia 2026 roku musi stosować KSeF dla swoich faktur
  VAT. Organizacje prowadzące wyłącznie działalność zwolnioną z VAT dołączają do systemu od 1
  stycznia 2027 roku."
- **Confidence:** HIGH
- **Relevance to 10k brief:** LIMITED — mention only in a "who does this apply to" context if
  needed; the main audience for the 10k article is JDG/small business, not NGOs.

---

### 6. What existing content correctly states (for continuity)

---

**Fact 6.1 — All existing content uses "monthly" consistently**

- **Fact:** Across all seven content files reviewed (PL blog, PL FAQ, EN blog, EN FAQ, UK blog, UK
  FAQ, research brief), the 10,000 PLN threshold is described as "miesięczna sprzedaż" or "monthly
  sales." There are no inconsistencies within the corpus on this point.
- **Source:** All files listed in Source Corpus table above.
- **Implication for Copywriter:** If the "monthly" interpretation is confirmed correct by reading
  Art. 145m, this brief and the new blog post are consistent with all existing content. If the
  "annual invoice-documented" interpretation turns out to be correct, ALL existing content contains
  an error and must be updated site-wide (7+ files).

---

**Fact 6.2 — Existing content always hedges with "według aktualnie obowiązujących przepisów"**

- **Fact:** All recent content files hedge the 10,000 PLN exemption with either "według aktualnie
  obowiązujących przepisów" or a note that the rules "były kilkakrotnie nowelizowane" and should be
  verified at ksef.podatki.gov.pl.
- **Source:** Blog `ksef-dla-jdg.mdx`: "Limit był już nowelizowany — zawsze weryfikuj aktualną datę
  na ksef.podatki.gov.pl przed podjęciem decyzji." FAQ `limity-i-wylaczenia.mdx`: "Przepisy te były
  kilkakrotnie nowelizowane — sprawdź aktualne regulacje na stronie ksef.podatki.gov.pl lub zapytaj
  księgowego."
- **Confidence:** HIGH (the hedges are present and correct regardless of which interpretation
  prevails)
- **Implication:** The new blog post MUST carry a similar hedge. Do not state the threshold
  calculation method categorically without noting that the rules have been amended and should be
  verified.

---

## Unsettled Questions

> These are areas the Copywriter should NOT address definitively without verification.

1. **CRITICAL — Monthly vs. annual invoice-documented sales.** The calculation method for the 10,000
   PLN threshold is stated as "monthly" in all internal content but cannot be verified against Art.
   145m text in this environment. A competing interpretation ("annual invoice-documented sales from
   previous year") is referenced in the task brief but not found in any accessible source. **Resolve
   before publishing.** Method: read current Art. 145m at
   https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20250000775 or official MF FAQ.

2. **What triggers the obligation when threshold is crossed.** If Position A (monthly) is correct:
   what happens in the month when sales first exceed 10,000 PLN? Does the obligation apply (a) from
   that invoice, (b) from the next invoice in that month, (c) from the first invoice of the next
   calendar month? No source in the corpus answers this. **Required for practical guidance.**

3. **Exact sub-article of Art. 145m.** Art. 145m is referenced in all our blogs, but the specific
   sub-article (ustęp) that contains the 10,000 PLN provision is not stated in any accessible source.
   Research Brief `ksef-dla-jdg.md` already flagged this: "The specific article number is not
   confirmed in the corpus available for this extraction."

4. **Whether the threshold uses gross (brutto) or net (netto) sales value.** None of the accessible
   sources specify whether the 10,000 PLN is calculated on gross amounts (with VAT) or net amounts
   (without VAT). Given that the 200,000 PLN VAT exemption under Art. 113 uses net values, the same
   might apply here — but this is inference, not a sourced fact.

5. **Ryczałt ewidencjonowany (PIT) + VAT status.** The corpus is silent on whether a JDG on
   ryczałt PIT in a specific sector (e.g., IT services at 12%, 8.5%) is more or less likely to be a
   czynny podatnik VAT. This is a tax advisory question. Do not answer it; direct to an accountant.

6. **Whether the "annual" interpretation (Position B) refers to the calendar year 2025 specifically.**
   If Position B is correct, the threshold would be checked based on 2025 invoice data for the 2026
   exemption. For 2027, it would use 2026 data. The exact reference year is unspecified in any
   accessible source.

---

## Suggested Sources Section

For the article's "Źródła" footer:

1. **Ustawa z dnia 11 marca 2004 r. o podatku od towarów i usług** — Art. 145m — Dz. U. z 2025 r.,
   poz. 775 ze zm. — https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20250000775
2. **FAQ MF — KSeF 2.0** — https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20
3. **Rozporządzenie Ministra Finansów z dnia 7 grudnia 2025 r.** w sprawie wyłączeń z obowiązku
   wystawiania faktur ustrukturyzowanych —
   https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20250001740

---

## Warning: Common Misconceptions

1. **"Zarabiam 8 000 zł miesięcznie, więc jestem poniżej limitu"** — INSUFFICIENT REASONING.
   Monthly earnings ≠ monthly sales value for VAT purposes. The threshold (per corpus interpretation)
   is based on total sales value in the month, not take-home pay, not net revenue after costs, not
   invoice amounts only. Additionally: (a) if VAT-exempt revenue is included, the total may be
   higher; (b) if the "annual invoice-documented" interpretation turns out to be correct, monthly
   earnings are the wrong metric entirely.

2. **"Nie wystawiam faktur, więc mnie to nie dotyczy"** — WRONG in most B2B scenarios. If you are
   a czynny podatnik VAT conducting B2B transactions, you are required to issue VAT invoices by law
   — and therefore the KSeF obligation applies. "Not issuing invoices" may mean you are non-compliant
   with the invoicing obligation, not that you are exempt from KSeF. Exception: if you sell only to
   consumers (B2C) and issue only cash register receipts (paragony), those are excluded from KSeF.

3. **"Jestem na ryczałcie, więc KSeF mnie nie dotyczy"** — WRONG. "Ryczałt" in common speech often
   refers to ryczałt ewidencjonowany — a PIT (income tax) settlement method. It is entirely separate
   from VAT status. A JDG on ryczałt PIT who is registered as czynny podatnik VAT is subject to the
   KSeF obligation. Only "rolnik ryczałtowy" (flat-rate VAT farmer) has a separate exclusion — and
   only for agricultural product sales under a specific VAT regime.

4. **"Poniżej 10 000 zł miesięcznie znaczy, że w ogóle nie muszę się przygotowywać"** — DANGEROUS
   REASONING. The exemption expires 31 December 2026. Any JDG below the threshold today must
   implement KSeF by 1 January 2027 at the latest. Preparation takes time — software selection,
   testing, authentication setup. Starting in December 2026 is too late.

5. **"Limit 10 000 zł to tak samo jak limit 200 000 zł na zwolnienie z VAT"** — WRONG (probably).
   The 200,000 PLN threshold for VAT subjective exemption (Art. 113) applies to taxpayers NOT
   registered for VAT. The 10,000 PLN KSeF threshold applies to taxpayers who ARE registered as
   czynni podatnicy VAT but have very small sales. These are separate provisions for separate groups
   of taxpayers.

6. **"Jeśli wystawię mniej faktur, zostanę poniżej limitu"** — WRONG per corpus interpretation. The
   FAQ explicitly states the limit is NOT based on the sum of invoices issued ("nie suma wystawionych
   faktur") — it is total sales value. Issuing fewer invoices does not reduce sales value.

7. **"Limit obowiązuje mnie tylko jeśli mam stały, regularny obrót"** — NOT CONFIRMED. No source
   in the corpus discusses seasonality, irregular sales, or single large transactions. A single
   invoice for 12,000 PLN in one month would (per the monthly interpretation) push a taxpayer above
   the threshold for that month even if all other months are below.

---

## Freshness Tracker (date-sensitive claims)

| Claim | Expires / Review trigger | Priority |
| --- | --- | --- |
| Exemption expires 31 December 2026 | Review on 1 January 2027; monitor for further amendments | HIGH |
| Penalty grace period until 1 January 2027 | Review on 1 January 2027 | HIGH |
| Threshold rules "były kilkakrotnie nowelizowane" — current version is Dz. U. z 2025 r., poz. 775 ze zm. | Review after any new amending act is published in Dziennik Ustaw | HIGH |
| All czynni podatnicy VAT mandatory from 1 April 2026 | Past date — verify compliance state | MEDIUM |
| VAT-exempt entities join from 1 January 2027 | Review after 1 January 2027 | HIGH |

---

## Cross-References for the Copywriter

- **Existing article** `ksef-od-1-kwietnia-2026.mdx` mentions the 10,000 PLN threshold briefly in
  §"Wyjątek: bardzo małe obroty" with a link to this planned blog post (`/blog/limit-10000-zl`).
  The new article must live at that slug and fulfill the link promise.
- **FAQ** `limity-i-wylaczenia.mdx` covers the same questions at FAQ level. The blog post should
  go deeper — practical calculation examples, scenarios, misconceptions — while the FAQ remains the
  quick-reference version.
- **Research Brief** `ksef-dla-jdg.md` covers the 10,000 PLN threshold as a secondary fact (Facts
  1.6 and 1.7); this brief supersedes those entries for purposes of this dedicated article.
- **Internal link opportunity:** From the new article, link back to `ksef-od-1-kwietnia-2026.mdx`
  for the broader KSeF overview, and to `ksef-dla-jdg.mdx` for the JDG-specific checklist.
- **⚠️ If the annual interpretation (Position B) is confirmed correct by reading Art. 145m:** seven
  content files will need to be updated. Notify the Copywriter and Constitutional Judge immediately.
  The files are: `pl/faq/limity-i-wylaczenia.mdx`, `pl/blog/ksef-dla-jdg.mdx`,
  `pl/blog/ksef-od-1-kwietnia-2026.mdx`, `en/faq/exemptions-and-thresholds.mdx`,
  `en/blog/ksef-dla-jdg.mdx`, `en/blog/ksef-od-1-kwietnia-2026.mdx`,
  `uk/blog/ksef-dla-jdg.mdx`, `uk/blog/ksef-od-1-kwietnia-2026.mdx`, `uk/faq/vyluchennya.mdx`.
