# Research Brief: Fałszywe faktury w KSeF — jak się bronić

**Requested by:** Copywriter agent **Date:** 2026-04-02 **For content:** Blog post — "Fałszywe
faktury w KSeF — jak się bronić" **Target personas:** (A) "Ania" — JDG freelancer who logged into
KSeF and found an invoice from a company she never worked with; (B) "Pani Krystyna" — accountant
whose clients are calling with the same question. **Tool context:** ksefuj.to — free KSeF XML
validator

---

## Source Corpus Used

| Source                                                               | Tier            | File / URL                                                         | Status                                                                                                                                                     |
| -------------------------------------------------------------------- | --------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ustawa o VAT (Dz. U. z 2025 r., poz. 775 ze zm.) — Art. 88 ust. 3a   | 1               | https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20250000775 | CURRENT — **⚠️ TEXT NOT ACCESSIBLE** — Act not stored locally; network access unavailable. Art. 88 ust. 3a content cited from task brief description only. |
| Ustawa o VAT — Art. 106a–106s (KSeF invoicing rules)                 | 1               | https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20250000775 | CURRENT — **⚠️ TEXT NOT ACCESSIBLE**                                                                                                                       |
| Podręcznik KSeF 2.0, część III (reporting abuse section)             | 2               | Not stored in local repository                                     | CURRENT — **⚠️ NOT ACCESSIBLE** — Document not available locally; claims sourced from task brief description only.                                         |
| Podręcznik Aplikacji Podatnika KSeF 2.0                              | 2               | Not stored in local repository                                     | CURRENT — **⚠️ NOT ACCESSIBLE**                                                                                                                            |
| FA(3) Information Sheet (Broszura informacyjna, marzec 2026, 174 s.) | 2               | `packages/validator/docs/fa3-information-sheet.md`                 | CURRENT — **SILENT on scam invoices** — technical schema document only; covers NIP/Podmiot2 structure but not abuse reporting or tax consequences.         |
| FAQ MF — KSeF 2.0                                                    | 3               | https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20           | CURRENT — **⚠️ NOT ACCESSIBLE** — network unavailable                                                                                                      |
| Blog (PL): ksef-ruszyl.mdx                                           | internal output | `apps/web/content/pl/blog/ksef-ruszyl.mdx`                         | CURRENT — NOT a primary source; contains one relevant sentence about VAT deduction risk                                                                    |
| Blog (PL): ksef-od-1-kwietnia-2026.mdx                               | internal output | `apps/web/content/pl/blog/ksef-od-1-kwietnia-2026.mdx`             | CURRENT — NOT a primary source; contains one relevant sentence about Art. 88 risk for invoices issued outside KSeF                                         |
| FAQ (PL): podstawy-ksef.mdx                                          | internal output | `apps/web/content/pl/faq/podstawy-ksef.mdx`                        | CURRENT — NOT a primary source; describes how KSeF assigns numbers but not recipient-routing mechanism                                                     |

> ⚠️ **CRITICAL ACCESS GAP — READ BEFORE USING THIS BRIEF.**
>
> The two most important claims in this brief — (1) that Art. 88 ust. 3a governs when a recipient
> loses the right to deduct VAT, and (2) the full mechanics of the Aplikacja Podatnika abuse
> reporting feature — are sourced from **inaccessible documents** (Act text and Podręcznik KSeF 2.0
> część III). Neither has been directly read in this extraction session. All claims derived from
> those sources carry **MEDIUM** confidence and must be verified against the primary text before
> publication.
>
> The FA(3) Information Sheet (the one Tier 2 document that IS accessible locally) is completely
> silent on scam invoices, reporting mechanisms, and Art. 88. It is a technical schema reference,
> not a guide to tax consequences.
>
> **No prior brief or extract in this knowledge base covers fake/scam invoices. This is new
> territory.** There are no internal content files to cross-validate against.

---

## Key Facts (ready to use)

### Topic 1 — Mechanism: how scam invoices appear in KSeF

---

**Fact 1.1 — NIP-based automatic routing: no "accept" step for recipient**

- **Fact:** KSeF routes every invoice to the recipient's account automatically based on the NIP
  (Polish tax ID) entered by the sender in the `Podmiot2/DaneIdentyfikacyjne/NIP` field. There is no
  step at which the recipient must "accept" or "approve" the invoice before it appears in their KSeF
  inbox.
- **Source:** FA(3) Information Sheet (Broszura informacyjna, marzec 2026), §6 (Podmiot2 section),
  p. [field-level reference — NIP is mandatory in Podmiot2 for Polish purchaser]; architecture
  confirmed by FAQ (PL): `podstawy-ksef.mdx` (internal output): "Każda faktura B2B musi być
  przesłana do KSeF w formacie XML i otrzymać urzędowy numer, zanim trafi do nabywcy."
- **Verbatim (PL) — from FA(3) Information Sheet §6.2:** "NIP — Numer Identyfikacji Podatkowej
  nabywcy. [...] **MUST** be entered in the `NIP` field within `Podmiot2/DaneIdentyfikacyjne`."
  _(Note: the cited text describes the schema constraint, not the routing mechanism explicitly — the
  routing inference is structural.)_
- **Verbatim (PL) — from FAQ internal output:** "System działa jak centralny rejestr faktur
  podatkowych prowadzony przez państwo."
- **Confidence:** HIGH for the structural fact (NIP field is the routing key per FA(3) schema) |
  MEDIUM for the absence of an accept/reject step (confirmed by architecture but no explicit MF
  statement found in accessible sources stating "there is no accept step")
- **Ania-relevant:** ✅ This is the root cause of the problem Ania experienced
- **Implication:** Anyone who knows Ania's NIP (which is publicly visible in CEIDG) can address an
  invoice to her KSeF inbox without her knowledge or consent.

---

**Fact 1.2 — NIP numbers are public**

- **Fact:** The NIP (tax ID) of every JDG and company registered in Poland is publicly accessible
  via the CEIDG register (for sole traders) and the KRS register (for companies). No special access
  is required to find any taxpayer's NIP.
- **Source:** General legal knowledge — CEIDG and KRS are public registers established by Polish
  law. Not sourced from MF documents; no MF document in the accessible corpus makes this claim
  explicitly.
- **Verbatim:** Not applicable — no MF verbatim quote available for this structural fact.
- **Confidence:** HIGH (matter of established fact — CEIDG/KRS are statutory public registers)
- **Ania-relevant:** ✅ Explains why Ania's NIP is easy to find
- **Note:** This is NOT sourced from any MF document. It is a legal fact about Polish registration
  registers. The Copywriter should not attribute it to MF guidance.

---

**Fact 1.3 — Contrast with paper/PDF invoicing: delivery was the control**

- **Fact:** Under paper or PDF invoicing, a fraudulent invoice required physical or email delivery
  to the victim. Under KSeF, the invoice appears automatically in the recipient's KSeF account as
  soon as it is accepted by the system, with no delivery action required by the sender.
- **Source:** Structural inference from KSeF architecture. Not stated explicitly in any accessible
  MF document.
- **Verbatim:** Not applicable.
- **Confidence:** MEDIUM (logical inference from architecture — no MF source states this contrast
  explicitly)
- **Ania-relevant:** ✅ Explains why KSeF changes the threat model
- **⚠️ Note:** Do NOT present this as a claim MF makes. It is an architectural observation.

---

### Topic 2 — Legal basis: tax consequences (or lack thereof)

---

**Fact 2.1 — Art. 88 ust. 3a: conditions for denial of VAT deduction right**

- **Fact:** Art. 88 ust. 3a of the Ustawa o VAT enumerates the conditions under which a buyer loses
  the right to deduct input VAT from an invoice. The mere presence of an invoice in the recipient's
  KSeF inbox does NOT by itself trigger a tax obligation or VAT deduction right for the recipient.
  Tax effects arise at the moment the invoice is entered into the accounting records
  (zaksięgowane/ujęte w ewidencji).
- **Source:** Ustawa o VAT (Dz. U. z 2025 r., poz. 775 ze zm.), Art. 88 ust. 3a — **⚠️ TEXT NOT READ
  DIRECTLY.** Claim sourced from task brief description. Art. 88 ust. 3a URL:
  https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20250000775
- **Verbatim (PL):** _(Not extracted — Act text not accessible in this environment. The article
  should NOT quote Art. 88 ust. 3a verbatim without reading the current consolidated text.)_
- **Confidence:** MEDIUM — The claim about "booking triggers tax consequences" is consistent with
  general VAT law principles (input VAT is deducted in the period when the invoice is received AND
  the goods/services are acquired, per standard VAT rules), but the exact relationship between KSeF
  inbox presence and accounting booking has not been confirmed by direct reading of Art. 88 ust. 3a
  or any Tier 1–2 accessible source. **Verify before publishing.**
- **Ania-relevant:** ✅ This is the KEY reassurance Ania needs — finding the invoice does not mean
  she owes money
- **⚠️ Constitutional Judge flag:** This is Claim (a) in the Claims for Review section — highest
  priority for verification.

---

**Fact 2.2 — Not booking = no tax obligation for the recipient**

- **Fact:** If a recipient does not enter a suspicious invoice into their accounting records (does
  not book it, does not claim input VAT from it), no VAT deduction obligation and no payment
  obligation arises for the recipient from that invoice alone.
- **Source:** Derived from Art. 88 ust. 3a and general VAT accounting principles — **⚠️ TEXT NOT
  READ DIRECTLY.** No accessible MF document states this explicitly in the context of scam invoices.
- **Verbatim:** Not available.
- **Confidence:** MEDIUM — Consistent with how VAT works (you deduct what you book; you don't deduct
  what you don't book) but not confirmed by direct MF statement about the KSeF scam scenario
  specifically.
- **Ania-relevant:** ✅ Practical answer to "do I have to pay this?"
- **⚠️ Important caveat:** The Copywriter must add a "consult your accountant" hedge. General VAT
  principles are clear, but the specific interaction between KSeF registration of an invoice and
  accounting period obligations may have nuances not captured here.

---

**Fact 2.3 — Invoices issued outside KSeF and VAT deduction risk (adjacent)**

- **Fact:** Our own published blog (`ksef-ruszyl.mdx`) notes that a buyer "may have issues deducting
  VAT from an invoice issued outside KSeF in breach of the obligation." The blog
  `ksef-od-1-kwietnia-2026.mdx` adds: "Tax law may restrict the buyer's right to deduct input VAT
  from an invoice issued outside KSeF in breach of the obligation."
- **Source:** `apps/web/content/pl/blog/ksef-ruszyl.mdx`, line 43;
  `apps/web/content/pl/blog/ksef-od-1-kwietnia-2026.mdx`, line 149
- **Verbatim (PL — from ksef-ruszyl.mdx):** "Twój kontrahent może mieć problem z odliczeniem VAT z
  takiej faktury — skonsultuj to z doradcą podatkowym."
- **Verbatim (PL — from ksef-od-1-kwietnia-2026.mdx):** "przepisy ustawy o VAT mogą ograniczać prawo
  nabywcy do odliczenia VAT z faktury wystawionej poza KSeF z naruszeniem obowiązku."
- **Confidence:** MEDIUM — These are our own output files, not primary MF sources. They reference
  the VAT Act but without specific article.
- **Ania-relevant:** ❌ (adjacent context — this is about invoices legitimately issued outside KSeF,
  not scam invoices; the Copywriter should not conflate these two scenarios)
- **⚠️ Note:** This fact is about LEGITIMATE invoices issued outside KSeF in breach of the
  obligation — NOT scam invoices. Do not mix the two scenarios.

---

### Topic 3 — Reporting mechanism (from 1 April 2026)

---

**Fact 3.1 — Abuse reporting feature available from 1 April 2026**

- **Fact:** From 1 April 2026, the Aplikacja Podatnika KSeF includes a simplified mechanism for
  recipients to report invoices suspected of being fraudulent or issued without a real transaction.
  This feature was launched simultaneously with the mandatory KSeF obligation.
- **Source:** Podręcznik KSeF 2.0, część III (reporting abuse section) — **⚠️ NOT ACCESSIBLE
  LOCALLY.** Also: FAQ MF — **⚠️ NOT ACCESSIBLE.** Claim sourced from task brief description.
- **Verbatim (PL):** Not extracted — source document not available locally.
- **Confidence:** MEDIUM — Launch date consistent with overall KSeF 2.0 mandatory date (1 April
  2026), but the specific feature mechanics have not been verified against accessible primary source
  text.
- **Ania-relevant:** ✅ Practical tool Ania can use

---

**Fact 3.2 — Reporting flow: log in → find invoice → report button → justification**

- **Fact:** The reporting workflow in Aplikacja Podatnika KSeF is: (1) log into the application, (2)
  locate the suspicious invoice in the inbox, (3) click the "report abuse" button on that invoice,
  (4) provide a written justification explaining why the invoice is considered fraudulent.
- **Source:** Podręcznik KSeF 2.0, część III — **⚠️ NOT ACCESSIBLE LOCALLY.**
- **Verbatim (PL):** Not extracted.
- **Confidence:** MEDIUM — Procedural description sourced from task brief; could not verify step
  names, button labels, or exact UI flow against primary source.
- **Ania-relevant:** ✅
- **⚠️ Note for Copywriter:** Do NOT use specific button labels (e.g., exact Polish name of the
  "report" button) without verifying against the actual Podręcznik KSeF 2.0 część III or the live
  Aplikacja Podatnika interface. UI labels are high-risk for staleness.

---

**Fact 3.3 — Each report covers a single invoice only**

- **Fact:** The reporting mechanism in Aplikacja Podatnika requires a separate report for each
  invoice. It is not possible to submit a batch report covering multiple invoices in a single
  submission.
- **Source:** Podręcznik KSeF 2.0, część III — **⚠️ NOT ACCESSIBLE LOCALLY.**
- **Verbatim (PL):** Not extracted.
- **Confidence:** MEDIUM
- **Ania-relevant:** ✅ (practical implication: if Ania received 3 fake invoices, she must file 3
  separate reports)
- **⚠️ Constitutional Judge flag:** This is Claim (c) in the Claims for Review section.

---

**Fact 3.4 — Only the RECIPIENT (nabywca) can report — NOT the sender (sprzedawca)**

- **Fact:** The abuse reporting function in Aplikacja Podatnika is available exclusively to the
  recipient (nabywca) named in the invoice. The sender (sprzedawca, Podmiot1) does NOT have access
  to the reporting function for an invoice they issued.
- **Source:** Podręcznik KSeF 2.0, część III — **⚠️ NOT ACCESSIBLE LOCALLY.**
- **Verbatim (PL):** Not extracted.
- **Confidence:** MEDIUM
- **Ania-relevant:** ✅ (Ania is the recipient — she CAN report; if she were the wrongly named
  sender she could not)
- **⚠️ Constitutional Judge flag:** This is Claim (d) in the Claims for Review section. This is a
  non-obvious limitation — high importance to verify.

---

**Fact 3.5 — KAS analyzes reports but does NOT notify the reporter of the outcome**

- **Fact:** The Krajowa Administracja Skarbowa (KAS) receives and analyzes abuse reports submitted
  via Aplikacja Podatnika. However, KAS does not send a confirmation or notification of the
  verification outcome to the person who filed the report.
- **Source:** FAQ MF — **⚠️ NOT ACCESSIBLE.** Claim sourced from task brief.
- **Verbatim (PL):** Not extracted.
- **Confidence:** MEDIUM
- **Ania-relevant:** ✅ (manages expectations: filing a report is not the same as receiving
  confirmation that the sender was investigated)
- **⚠️ Constitutional Judge flag:** This is Claim (e) in the Claims for Review section.

---

**Fact 3.6 — A submitted report can be WITHDRAWN**

- **Fact:** A recipient who filed an abuse report can subsequently withdraw it — for example, if it
  turns out the invoice was a genuine mistake (wrong NIP entered by the sender) rather than a
  deliberate fraud.
- **Source:** Podręcznik KSeF 2.0, część III — **⚠️ NOT ACCESSIBLE LOCALLY.** Claim from task brief.
- **Verbatim (PL):** Not extracted.
- **Confidence:** MEDIUM
- **Ania-relevant:** ✅ (important safety valve — Ania should not feel she is making an irrevocable
  accusation)

---

**Fact 3.7 — The reporting mechanism is technical/procedural, not a statutory right**

- **Fact:** The abuse reporting feature in Aplikacja Podatnika is described as a technical procedure
  (tryb techniczny) built into the application. It is not a separately enumerated statutory right in
  the Ustawa o VAT. The legal basis for KSeF system features is Art. 106na–106s and related
  provisions, but no specific statutory article appears to enumerate an "abuse reporting" right as a
  distinct entitlement.
- **Source:** Inference from the absence of explicit statutory citation in available sources. Tier 1
  law (Art. 106a–106s) not fully read in this environment. The Podręcznik KSeF 2.0 is a technical
  guide (Tier 2) — **⚠️ NOT ACCESSIBLE.**
- **Verbatim (PL):** Not extracted.
- **Confidence:** LOW — This is an inference from source silence. The absence of a statutory
  citation does not confirm it doesn't exist. **Requires direct verification of Art. 106na–106s.**
- **Ania-relevant:** ❌ (too technical for JDG audience — relevant for Pani Krystyna / legal
  precision contexts)
- **⚠️ Constitutional Judge flag:** This is Claim (f) in the Claims for Review section. LOW
  confidence — must be verified before being stated authoritatively.

---

### Topic 4 — Distinguishing scam from innocent mistake (wrong NIP)

---

**Fact 4.1 — Two distinct scenarios requiring different responses**

- **Fact:** An invoice appearing unexpectedly in a KSeF inbox falls into one of two categories: (a)
  honest mistake — the sender accidentally typed the wrong NIP (e.g., transposed digits); or (b)
  deliberate fraud — the sender intentionally addressed an invoice to a recipient with whom they
  have no commercial relationship.
- **Source:** General logical inference from KSeF architecture. No MF document in the accessible
  corpus distinguishes these scenarios explicitly.
- **Verbatim:** Not applicable.
- **Confidence:** HIGH (the two scenarios are logically exhaustive and the distinction has practical
  legal consequences)
- **Ania-relevant:** ✅

---

**Fact 4.2 — Innocent mistake: corrective invoice procedure**

- **Fact:** If the unexpected invoice is a genuine NIP entry mistake, the correct resolution is: (1)
  the recipient contacts the sender to inform them of the error; (2) the sender issues a corrective
  invoice that zeros out the original (faktura korygująca do zera); (3) the sender then issues a new
  invoice with the correct NIP.
- **Source:** General corrective invoice procedure under the Ustawa o VAT. The FA(3) Information
  Sheet, §10 (Korekty) describes the correction mechanism for invoices including NIP errors.
  Verbatim from FA(3) Information Sheet §10: "Incorrect NIP is NOT correctable — requires zeroing
  correction." (paraphrase of schema constraint noted in our internal brief `fa2-vs-fa3.md`, which
  itself cites the Broszura).
- **Verbatim (PL — from FA(3) Information Sheet §10, as cited in fa2-vs-fa3.md):** "Podmiot2K —
  Purchaser data from the corrected invoice (for correcting purchaser details). Incorrect NIP is NOT
  correctable — requires zeroing correction."
- **Confidence:** HIGH for the zeroing requirement (confirmed by FA(3) schema) | MEDIUM for the full
  three-step procedure (step-by-step description is from task brief; the zeroing requirement is
  schema-confirmed)
- **Ania-relevant:** ✅ First thing to check before escalating to abuse report

---

**Fact 4.3 — Red flags indicating deliberate fraud (not innocent mistake)**

- **Fact:** The following characteristics suggest deliberate fraud rather than innocent NIP mistake:
  (1) invoice from a company the recipient has never had any business relationship with; (2)
  services or goods described that were never ordered or received; (3) the sender cannot be reached
  (phone disconnected, email bounces); (4) very short payment deadline (e.g., 3 days); (5) language
  errors or unusual phrasing in the service description; (6) sender does not appear (or appears as
  "inactive") in the Wykaz Podatników VAT (Biała Lista) at
  https://www.podatki.gov.pl/wykaz-podatnikow-vat-wyszukiwarka.
- **Source:** Practical heuristics from task brief. No MF document in the accessible corpus
  enumerates specific red flags for scam invoices.
- **Verbatim:** Not applicable — no MF source text available.
- **Confidence:** MEDIUM — These are reasonable indicators consistent with general fraud detection
  principles; not sourced from any Tier 1–3 MF document.
- **Ania-relevant:** ✅ Practical checklist for Ania to self-assess
- **⚠️ Note for Copywriter:** Present these as "sygnały ostrzegawcze" (warning signs), not as an
  official MF-defined list. Do NOT attribute them to MF sources.

---

**Fact 4.4 — Biała Lista (Wykaz Podatników VAT) is the verification tool**

- **Fact:** The Wykaz Podatników VAT (commonly called "Biała Lista") is an official MF register of
  VAT taxpayers, searchable by NIP, company name, or bank account number. It allows anyone to check
  whether a given NIP belongs to an active VAT taxpayer.
- **Source:** General knowledge about the register — the Biała Lista is established by Art. 96b of
  the Ustawa o VAT. Search URL: https://www.podatki.gov.pl/wykaz-podatnikow-vat-wyszukiwarka
- **Verbatim:** Not applicable from accessible sources.
- **Confidence:** HIGH (Biała Lista is a well-established tool; its existence and URL are not in
  dispute)
- **Ania-relevant:** ✅ First step: check the sender before anything else

---

### Topic 5 — Phishing context: KSeF-related email scams

---

**Fact 5.1 — MF warned of phishing wave exploiting KSeF branding**

- **Fact:** The Ministry of Finance issued warnings about a wave of phishing emails using "KSeF" in
  the subject line, impersonating tax officials, and directing recipients to fraudulent websites to
  steal credentials or install malware.
- **Source:** MF public communications — **⚠️ NOT ACCESSIBLE LOCALLY.** Specific MF warning document
  not identified in this extraction. Claim sourced from task brief.
- **Verbatim (PL):** Not extracted.
- **Confidence:** MEDIUM — MF routinely warns about phishing during major tax system launches;
  consistent with the KSeF 2.0 launch context. Could not verify specific warning document, date, or
  exact URL.
- **Ania-relevant:** ✅ Urgent safety information
- **⚠️ Note:** Verify the specific MF warning source (gov.pl URL, date, exact wording) before
  publishing. Do NOT link to a specific MF warning page without confirming the URL is still active.

---

**Fact 5.2 — Official KSeF is accessible ONLY at ksef.podatki.gov.pl**

- **Fact:** The official KSeF system and Aplikacja Podatnika are accessible exclusively through the
  domain `ksef.podatki.gov.pl`. Emails with links to other domains claiming to be KSeF should be
  treated as phishing attempts.
- **Source:** URL confirmed in multiple accessible sources. The Aplikacja Podatnika URL is also
  cited as `https://ap.ksef.mf.gov.pl/` in existing brief `ksef-dla-jdg.md`, which cites the FAQ. MF
  communications consistently use these domains.
- **Verbatim:** "ksef.podatki.gov.pl" — URL present in multiple internal output files as the
  authoritative portal.
- **Confidence:** HIGH for the domain — confirmed across corpus | MEDIUM for the "never click email
  links" advisory (standard security advice consistent with MF guidance but specific MF wording not
  accessible)
- **Ania-relevant:** ✅

---

### Topic 6 — Practical recommendations

---

**Fact 6.1 — Do NOT pay a suspicious invoice**

- **Fact:** Receiving an unexpected invoice in a KSeF inbox does not create a payment obligation. An
  unbooked invoice in KSeF has no tax effect for the recipient.
- **Source:** Derived from Art. 88 ust. 3a principles — **⚠️ TEXT NOT READ DIRECTLY.** See Fact 2.1
  and 2.2.
- **Confidence:** MEDIUM (see caveats under Facts 2.1 and 2.2)
- **Ania-relevant:** ✅

---

**Fact 6.2 — Do NOT book/account for a suspicious invoice**

- **Fact:** Entering a suspicious invoice into accounting records (zaksięgowanie) is the action that
  creates tax consequences. A recipient who does not book a suspicious invoice avoids creating input
  VAT deduction entries and the associated obligations.
- **Source:** Derived from general VAT accounting principles (Art. 86–88 of the Ustawa o VAT) — **⚠️
  SPECIFIC TEXT NOT READ DIRECTLY.**
- **Confidence:** MEDIUM
- **Ania-relevant:** ✅ Pani Krystyna needs this — critical for accounting bureau instruction

---

**Fact 6.3 — Auto-import from KSeF: warn the accountant immediately**

- **Fact:** Many accounting software packages (e.g., Comarch ERP, wFirma, Symfonia) offer automatic
  import of all incoming KSeF invoices directly into the bookkeeping system. If such auto-import is
  enabled, a scam invoice may be automatically booked without the taxpayer's review.
- **Source:** General knowledge about accounting software KSeF integration. No MF document in
  accessible corpus addresses this risk.
- **Verbatim:** Not applicable.
- **Confidence:** MEDIUM (auto-import feature is a known feature of major Polish accounting packages
  based on public software documentation; not sourced from MF documents)
- **Ania-relevant:** ✅ Especially relevant for Pani Krystyna whose clients may use auto-import
- **⚠️ Note:** Do NOT name specific software packages and claim they have auto-import unless you can
  confirm. Use general framing: "if your accounting software auto-imports from KSeF..."

---

**Fact 6.4 — Check sender on Biała Lista before contacting them**

- **Fact:** Before contacting the sender of a suspicious invoice, check their NIP on the Biała Lista
  (Wykaz Podatników VAT). An inactive or non-existent NIP is a strong indicator of fraud.
- **Source:** Standard due-diligence procedure. URL:
  https://www.podatki.gov.pl/wykaz-podatnikow-vat-wyszukiwarka
- **Confidence:** HIGH for the recommendation | HIGH for the URL
- **Ania-relevant:** ✅

---

**Fact 6.5 — Inform the accountant / biuro rachunkowe**

- **Fact:** A taxpayer using a biuro rachunkowe (accounting bureau) should inform their accountant
  immediately upon discovering a suspicious invoice in KSeF, before the accountant's next routine
  import or processing cycle.
- **Source:** Best-practice recommendation. Not sourced from any MF document.
- **Confidence:** HIGH for the recommendation as good practice
- **Ania-relevant:** ✅ Both Ania and Pani Krystyna's clients need this

---

## Unsettled Questions

> These are areas the Copywriter should NOT address definitively without verification. All marked as
> "do not state categorically."

1. **CRITICAL — Exact text of Art. 88 ust. 3a.** The claim that "an unbooked KSeF invoice has no tax
   effect" rests on this article. The current consolidated text of Art. 88 ust. 3a has not been read
   in this extraction. Verify at: https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20250000775
   (or the 2025 consolidated text poz. 775). **This is the single most important verification before
   publishing.**

2. **Exact mechanics of the reporting form in Aplikacja Podatnika.** The Podręcznik KSeF 2.0, część
   III was not accessible. Field names, button labels, and required justification content are
   unknown. Verify in the live application or against the Podręcznik.

3. **What happens to the invoice after a report is filed.** Does the invoice remain visible in the
   recipient's KSeF inbox indefinitely? Is it flagged/hidden after a report? Does KAS have the power
   to remove it from the inbox? None of the accessible sources answer this.

4. **Whether KAS can remove a scam invoice from a recipient's KSeF account.** If KAS confirms fraud,
   does the invoice disappear from the recipient's inbox? Or does it remain as a permanent record?
   This has practical implications for Pani Krystyna's clients who need clean books.

5. **Legal obligation to report.** Is a recipient legally REQUIRED to report a suspected scam
   invoice? Or is reporting voluntary? The task brief implies it's voluntary, but no Article in the
   accessible corpus explicitly states this. Do not claim either way without verification.

6. **What constitutes "justification" (uzasadnienie) in the report form.** Does the application
   require detailed evidence, or is a simple statement ("I have no relationship with this company")
   sufficient? Not answered in accessible sources.

7. **Criminal law intersection.** Fake invoices may involve criminal liability under the Kodeks
   Karny Skarbowy (fiscal criminal code) or Kodeks Karny (criminal code, art. 271a on false
   invoices). This brief does NOT cover criminal law — but the Copywriter should flag it with a "w
   przypadku podejrzenia przestępstwa skontaktuj się z organem ścigania" note, not attempt to
   explain the criminal provisions.

8. **Specific MF phishing warning document.** The warning about phishing emails could not be tied to
   a specific MF communication with a date and URL. Verify at gov.pl/web/finanse or CERT Polska
   before citing.

---

## Suggested Sources Section

For the article's "Źródła" footer:

1. **Ustawa z dnia 11 marca 2004 r. o podatku od towarów i usług — Art. 88 ust. 3a** — Dz. U. z 2025
   r., poz. 775 ze zm. — https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20250000775
2. **Podręcznik KSeF 2.0, część III** — Ministerstwo Finansów, 2026 — [exact URL to be confirmed
   against official MF publications page]
3. **FAQ MF — KSeF 2.0** — https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20
4. **Wykaz Podatników VAT (Biała Lista)** —
   https://www.podatki.gov.pl/wykaz-podatnikow-vat-wyszukiwarka
5. **Aplikacja Podatnika KSeF 2.0** — https://ap.ksef.mf.gov.pl/

> ⚠️ Do NOT list sources 2 and 3 in the article footer unless the content from those sources has
> been verified. Citing an inaccessible source as if it has been read is a corpus integrity
> violation.

---

## Warning: Common Misconceptions

1. **"Mam fakturę w KSeF, więc muszę ją zapłacić"** — WRONG. Receiving an invoice in your KSeF inbox
   does not create a payment obligation. Payment obligations arise from contracts, not from invoice
   delivery. An invoice for which you have no underlying contract or delivery of goods/services is
   not legally enforceable as a payment demand. Additionally, Art. 88 ust. 3a lists conditions under
   which VAT deduction is refused — but the invoice still needs to be BOOKED for any tax
   consequences to arise. Do NOT pay an invoice you didn't ask for without consulting an accountant
   or lawyer.

2. **"Mam fakturę w KSeF, więc muszę ją zaksięgować"** — WRONG. Having an invoice in the KSeF inbox
   does not force accounting entry. Accounting entry is a deliberate act by the taxpayer or their
   bookkeeper. A suspicious invoice should be held for review before any accounting action is taken.

3. **"Zgłoszenie nadużycia usuwa fakturę z mojego KSeF"** — STATUS UNKNOWN. It is not confirmed in
   accessible sources whether filing an abuse report removes the invoice from the recipient's inbox.
   Do NOT state that it does. Mark this as unknown pending verification of Podręcznik KSeF 2.0 część
   III.

4. **"Mogę odrzucić fakturę zanim trafi na moje konto"** — WRONG. There is no pre-acceptance filter
   in KSeF. Invoices appear automatically in the recipient's inbox based on NIP. There is no
   reject-before-delivery mechanism.

5. **"Wystarczy nie odpowiadać na fakturę — sprawa zniknie sama"** — POTENTIALLY WRONG. Ignoring the
   invoice without booking it is safe for tax purposes (no VAT consequence). However: (a) if your
   accounting software auto-imports from KSeF, the invoice may be booked without your knowledge; (b)
   it is advisable to file an abuse report via Aplikacja Podatnika to create a paper trail and
   notify KAS.

6. **"To błąd mojego NIP — wystarczy powiedzieć senderowi"** — ONLY SOMETIMES TRUE. If it is a
   genuine NIP mistake, contacting the sender is the right first step. But if the sender is
   unreachable or denies the mistake, the invoicing party may be conducting deliberate fraud. Always
   check the sender on Biała Lista before contacting them.

7. **"KSeF gwarantuje, że faktury w systemie są prawdziwe"** — WRONG. KSeF validates the structural
   and formal correctness of invoice XML (format, required fields, schema compliance). It does NOT
   verify that the underlying commercial transaction occurred. A structurally valid KSeF invoice for
   a non-existent transaction is still a fake invoice.

---

## Freshness Tracker (date-sensitive claims)

| Claim                                                                         | Expires / Review trigger                                               | Priority |
| ----------------------------------------------------------------------------- | ---------------------------------------------------------------------- | -------- |
| Reporting mechanism launched 1 April 2026 alongside mandatory KSeF            | Historical — but verify feature still exists at each major KSeF update | MEDIUM   |
| Biała Lista URL: https://www.podatki.gov.pl/wykaz-podatnikow-vat-wyszukiwarka | Verify URL is still active after any portal migration                  | LOW      |
| Aplikacja Podatnika URL: https://ap.ksef.mf.gov.pl/                           | Verify after any MF infrastructure change                              | LOW      |
| Art. 88 ust. 3a — current consolidated text                                   | Review after any VAT Act amendment (Dz. U. z 2025 r., poz. 775 ze zm.) | HIGH     |
| Phishing warning from MF — specific wave/date                                 | Verify specific MF warning source; check if still current              | HIGH     |
| "Per-invoice reporting only" (no batch) — Podręcznik KSeF 2.0, część III      | Review if Aplikacja Podatnika is updated with batch reporting feature  | MEDIUM   |
| "KAS does not notify reporter of outcome"                                     | Review if FAQ MF is updated with changed KAS procedure                 | MEDIUM   |

---

## Claims for Constitutional Judge Review

> The following 6 claims are the load-bearing legal/procedural facts in the planned article. Each
> must be verified against primary sources before publication. Claims are ranked by confidence
> (lowest first = highest urgency to verify).

---

### Claim (a) — PRIORITY 1 (lowest confidence)

**Claim:** An invoice appearing in a recipient's KSeF inbox does NOT automatically create tax
effects. Tax effects for the recipient arise only when the invoice is entered into accounting
records (zaksięgowane).

- **Intended legal basis:** Art. 88 ust. 3a, Ustawa o VAT
- **Current confidence:** MEDIUM
- **Gap:** Art. 88 ust. 3a text has not been read directly. The general VAT principle (book to
  deduct) is correct, but whether Art. 88 ust. 3a specifically addresses KSeF inbox presence vs.
  booking is unverified.
- **Verification method:** Read current consolidated text of Art. 88 ust. 3a at ISAP:
  https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20250000775
- **Verdict needed from Judge:** Does Art. 88 ust. 3a, in its current text, support the claim that
  KSeF inbox presence alone has no tax effect?

---

### Claim (b) — PRIORITY 2

**Claim:** The recipient cannot reject or block an invoice BEFORE it is assigned to their KSeF
account. There is no pre-acceptance filter.

- **Intended legal basis:** KSeF system architecture (NIP-based routing, no reject mechanism) —
  structural, not statutory.
- **Current confidence:** MEDIUM (confirmed by schema; no MF statement found explicitly saying
  "there is no reject mechanism")
- **Gap:** No MF document in the accessible corpus states this explicitly as a design choice. It is
  inferred from the absence of a reject mechanism in the FA(3) schema and system description.
- **Verification method:** Check Podręcznik KSeF 2.0 (any part) or FAQ MF for any reference to
  recipient rights to refuse/block invoices.
- **Verdict needed from Judge:** Is there any provision in the Ustawa o VAT or Podręcznik that gives
  a recipient the right to block an invoice before assignment?

---

### Claim (c) — PRIORITY 3

**Claim:** Reporting a scam invoice is: (i) voluntary (not obligatory), and (ii) per-invoice (not
batchable — one report per invoice).

- **Intended source:** Podręcznik KSeF 2.0, część III; FAQ MF
- **Current confidence:** MEDIUM
- **Gap:** Neither source was read directly.
- **Verification method:** Read Podręcznik KSeF 2.0, część III. Confirm whether reporting is
  described as optional or mandatory, and whether the UI allows multi-invoice reporting.
- **Verdict needed from Judge:** (i) Is there any Article of the VAT Act or regulation that makes
  reporting mandatory? (ii) Is batch reporting possible per the Podręcznik?

---

### Claim (d) — PRIORITY 4

**Claim:** Only the RECIPIENT (nabywca, Podmiot2) can file an abuse report. The sender (sprzedawca,
Podmiot1) cannot file a report for an invoice they issued.

- **Intended source:** Podręcznik KSeF 2.0, część III
- **Current confidence:** MEDIUM
- **Gap:** Source not read directly.
- **Verification method:** Read Podręcznik KSeF 2.0, część III. Identify which user roles have
  access to the reporting function.
- **Verdict needed from Judge:** Is the recipient-only restriction explicitly stated, or is it
  implicit in the UI design?
- **⚠️ Note:** If wrong, this claim would be seriously misleading in the article.

---

### Claim (e) — PRIORITY 5

**Claim:** KAS analyzes submitted reports but does NOT inform the reporting party of the
verification outcome.

- **Intended source:** FAQ MF
- **Current confidence:** MEDIUM
- **Gap:** FAQ MF not accessible.
- **Verification method:** Read FAQ MF at https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20,
  section on abuse reporting.
- **Verdict needed from Judge:** Does FAQ MF explicitly state that KAS will not notify the reporter?
  Or is this implicit/inferred?

---

### Claim (f) — PRIORITY 6 (lowest urgency — implicit / technical)

**Claim:** The reporting mechanism in Aplikacja Podatnika is technical in nature and is not a
separately enumerated statutory right in the Ustawa o VAT.

- **Intended source:** Inference from absence of statutory citation; structural observation.
- **Current confidence:** LOW
- **Gap:** Art. 106na–106s of the Ustawa o VAT not read directly. There may be a statutory basis
  that was not found.
- **Verification method:** Read Art. 106na–106s of the Ustawa o VAT for any explicit "prawo do
  zgłoszenia nadużycia" or similar statutory right.
- **Verdict needed from Judge:** Is there a statutory article that gives recipients a right to
  report abuse? Or is this purely a system feature?
- **Ania-relevant:** ❌ (not user-facing — the distinction matters legally but not practically for
  Ania's decision to report)

---

## Cross-References for the Copywriter

- **Existing article** `ksef-ruszyl.mdx` contains one sentence relevant to VAT deduction risk
  ("kontrahent może mieć problem z odliczeniem VAT") — but this is about invoices issued outside
  KSeF by the SELLER, not scam invoices received by the buyer. Do NOT reuse this phrasing for the
  scam scenario without clarifying the different context.
- **Brief** `ksef-dla-jdg.md` covers authentication and access to KSeF (Profil Zaufany etc.) —
  cross-reference for Ania's login context, but does not cover fake invoices.
- **Brief** `certyfikaty-tokeny.md` — not relevant to this article.
- **FAQ entries** to potentially cross-link from the article:
  - `/faq/podstawy-ksef` — "Co to jest KSeF?" for first-time readers
  - `/faq/wystawianie-faktur` — corrective invoice process (for the "innocent mistake" scenario)
- **Internal link opportunity:** The article should link to the Biała Lista search tool directly:
  https://www.podatki.gov.pl/wykaz-podatnikow-vat-wyszukiwarka
- **CTA for ksefuj.to:** Not directly relevant to this article's topic (ksefuj.to validates invoices
  you SEND, not ones you receive). Consider a softer CTA: "Jeśli wystawiasz faktury — sprawdź je na
  ksefuj.to zanim wyślesz, żeby Twoje faktury nie trafiły do kogoś przez błąd NIP." This reframes
  the tool as relevant to AVOIDING being the mistaken sender.
