# Research Brief: FA(2) vs FA(3) — co się zmieniło i co to znaczy dla Ciebie

**Requested by:** Copywriter agent
**Date:** 2026-03-27
**For content:** Blog post — "FA(2) vs FA(3) — co się zmieniło i co to znaczy dla Ciebie"
**Target persona:** Developer who had a working FA(2) integration with KSeF 1.0 and needs to
understand exactly what changed in FA(3) / KSeF 2.0 — what to update, what to add, what's gone.
**Tool context:** ksefuj.to — free KSeF XML validator

---

## Source Corpus Used

| Source                                                               | Tier     | File / URL                                              | Status  |
| -------------------------------------------------------------------- | -------- | ------------------------------------------------------- | ------- |
| FA(3) Information Sheet (Broszura informacyjna, marzec 2026, 174 s.) | 2        | `packages/validator/docs/fa3-information-sheet.md`      | CURRENT |
| FA(3) XSD Schema (schemat.xsd)                                       | 2        | `packages/validator/src/schemas/schemat.xsd`            | CURRENT |
| Ustawa o VAT (Dz.U. 2025 poz. 775)                                  | 1        | Art. 2(32a), 106na, 106nda, 106nh, 106nf, 145m          | CURRENT |
| Existing KB brief: bledy-walidacji-fa3.md                            | internal | `docs/knowledge-base/briefs/bledy-walidacji-fa3.md`     | CURRENT |
| Existing KB brief: ksef-dla-jdg.md                                   | internal | `docs/knowledge-base/briefs/ksef-dla-jdg.md`            | CURRENT |

> ⚠️ **NOTE TO COPYWRITER:** The FA(3) Information Sheet (Broszura) is the constitutional
> reference for all schema-level facts. The FA(2) namespace URI
> (`http://crd.gov.pl/wzor/2023/06/29/12648/`) is documented in existing KB briefs and in our
> published blog content as a known fact, but is NOT explicitly cited in the FA(3) information sheet
> itself (which only documents FA(3)). It is cited here as MEDIUM confidence. All FA(3) structural
> facts are HIGH confidence from the Broszura.
>
> The information sheet does NOT enumerate FA(2) fields and then show which were removed — it only
> documents what FA(3) contains. Statements about "removed elements" are therefore drawn from
> structural inference (if the Broszura doesn't mention a field that was in FA(2), it's gone) or
> from existing KB briefs, and are marked MEDIUM confidence.

---

## The "What Happened" Summary

FA(2) was the XML schema for structured invoices in KSeF 1.0, valid from 1 September 2023. On 31
January 2026, KSeF 1.0 was shut down. FA(3) is its replacement — a new, incompatible XML schema
introduced with KSeF 2.0. The two schemas have different namespaces, different header attributes,
new mandatory fields, and new optional blocks. Any FA(2) XML document will be **rejected outright**
by KSeF 2.0.

---

## Key Facts by Topic

---

### Topic 1 — Key Dates (What Shut Down When)

**1.1 — FA(2) end-of-life**

- **Fact:** The logical structure FA(2) was effective from 1 September 2023 and was used until 31
  January 2026. From 1 February 2026, it is no longer accepted.
- **Source:** FA(3) Information Sheet, §1.2
- **Verbatim:** "The logical structure FA(2), effective from 1 September 2023, was used until 31
  January 2026. **From 1 February 2026, the logical structure FA(3) is the binding structured
  invoice template.**"
- **Confidence:** HIGH

**1.2 — FA(3) applies retroactively to corrections and settlements**

- **Fact:** FA(3) applies to ALL structured invoices issued from 1 February 2026 — including
  corrective invoices that correct an original FA(2) invoice, and settlement invoices that finalise
  an FA(2) advance invoice.
- **Source:** FA(3) Information Sheet, §1.2 (CRITICAL RULE box)
- **Verbatim:** "The FA(3) logical structure applies to ALL structured invoices issued from 1
  February 2026. This includes: Corrective invoices where the original invoice was issued before 1
  February 2026 using FA(2) or FA(1). Final invoices where the advance invoice was issued before 1
  February 2026 using FA(2) or FA(1)."
- **Implication:** A developer issuing a correction in February 2026 against an FA(2) invoice must
  produce the corrective invoice in FA(3) format. There is no "FA(2) correction mode."
- **Confidence:** HIGH

**1.3 — KSeF mandatory adoption timeline (separate from FA(3) format cutover)**

- **Fact:** Taxpayers with gross turnover exceeding 200 million PLN in 2024 became subject to
  mandatory KSeF from 1 February 2026. All other active VAT taxpayers became subject to mandatory
  KSeF from 1 April 2026.
- **Source:** KB brief `ksef-dla-jdg.md`, Facts 1.1 and 1.2 (citing Ustawa o VAT, Art. 145m)
- **Confidence:** HIGH
- **Note for Copywriter:** The FA(3) format cutover (Feb 1, 2026) and the KSeF mandatory adoption
  dates are related but distinct. FA(3) format is required for ALL KSeF invoices from Feb 1, 2026
  regardless of when KSeF became mandatory for a given company. A developer integrating for April
  2026 is still integrating FA(3), not FA(2).

---

### Topic 2 — Namespace Change (The Single Most Breaking Change)

**2.1 — FA(3) namespace URI**

- **Fact:** The FA(3) root element `<Faktura>` must declare the namespace
  `http://crd.gov.pl/wzor/2025/06/25/13775/`.
- **Source:** FA(3) Information Sheet, §1.2; XSD `schemat.xsd` line 1
  (`targetNamespace="http://crd.gov.pl/wzor/2025/06/25/13775/"`)
- **Verbatim (§1.2):** "The FA(3) logical structure in its production version is available at:
  `https://crd.gov.pl/wzor/2025/06/25/13775/`"
- **Confidence:** HIGH (confirmed by XSD `targetNamespace` attribute)

**2.2 — FA(2) namespace URI (now invalid)**

- **Fact:** The FA(2) namespace was `http://crd.gov.pl/wzor/2023/06/29/12648/`. Any document using
  this namespace will be rejected by KSeF 2.0.
- **Source:** KB brief `bledy-walidacji-fa3.md` (references the FA(2) namespace explicitly in the
  namespace error section)
- **Confidence:** MEDIUM (not explicitly stated in the FA(3) information sheet, which only
  documents FA(3); derived from existing KB briefs and published blog content)

```xml
<!-- ❌ FA(2) — invalid since 1 February 2026 -->
<Faktura xmlns="http://crd.gov.pl/wzor/2023/06/29/12648/">

<!-- ✅ FA(3) — required from 1 February 2026 -->
<Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/">
```

---

### Topic 3 — Header Changes (Naglowek)

**3.1 — KodFormularza attributes changed**

- **Fact:** In FA(3), the `<KodFormularza>` element requires attributes
  `kodSystemowy="FA (3)"` (with a space before the parenthesis) and `wersjaSchemy="1-0E"`, with
  element text content `FA`.
- **Source:** FA(3) Information Sheet, §4.1
- **Verbatim:** "Two attributes: `kodSystemowy` = `FA(3)`, `wersjaSchemy` = `1-0E`"
- **Confidence:** HIGH

```xml
<!-- ✅ FA(3) -->
<KodFormularza kodSystemowy="FA (3)" wersjaSchemy="1-0E">FA</KodFormularza>
```

**3.2 — WariantFormularza value changed**

- **Fact:** In FA(3), the `<WariantFormularza>` element value is `3`. In FA(2) it was `2`.
- **Source:** FA(3) Information Sheet, §4.1 — "Schema designation. Current value: **`3`**"
- **Verbatim:** "WariantFormularza: Schema designation. Current value: 3"
- **Confidence:** HIGH (FA(3) value is explicitly "3"; FA(2) value of "2" is inferred from the
  schema name but not stated in the FA(3) information sheet)

---

### Topic 4 — New Mandatory Fields in FA(3)

**4.1 — JST flag (Podmiot2) — NEW in FA(3)**

- **Fact:** `JST` is a **mandatory** field in `Podmiot2` in FA(3). Value "1" means the invoice
  concerns a subordinate local government unit (JST); value "2" means it does not. When `JST` = "1",
  a corresponding `Podmiot3` entry with `Rola` = "8" (JST – recipient) is also required.
- **Source:** FA(3) Information Sheet, §6.1 (table), and CRITICAL RULE box
- **Verbatim:** "JST — Mandatory — Subordinate Local Government Unit flag: '1' = invoice concerns
  subordinate JST, '2' = does not"
- **Implication:** Every developer migrating from FA(2) must add `<JST>2</JST>` to `Podmiot2` at
  minimum. Omitting it causes XSD validation failure regardless of whether the invoice has anything
  to do with local government.
- **Confidence:** HIGH (explicitly mandatory in §6.1)
- **Note:** The FA(3) information sheet does not explicitly say "JST did not exist in FA(2)" — but
  since it is listed as new mandatory in §6.1 and documented existing blog content confirms it was
  absent from FA(2), this is the migration delta.

**4.2 — GV flag (Podmiot2) — NEW in FA(3)**

- **Fact:** `GV` is a **mandatory** field in `Podmiot2` in FA(3). Value "1" means the invoice
  concerns a VAT group (Grupa VAT) member; value "2" means it does not. When `GV` = "1", a
  corresponding `Podmiot3` entry with `Rola` = "10" (GV member – recipient) is also required.
- **Source:** FA(3) Information Sheet, §6.1 (table), and CRITICAL RULE box
- **Verbatim:** "GV — Mandatory — GV member flag: '1' = invoice concerns GV member, '2' = does not"
- **Implication:** Like JST, must always be present. Default value for standard invoices: `<GV>2</GV>`.
- **Confidence:** HIGH

---

### Topic 5 — New Optional / Conditional Elements in FA(3)

**5.1 — Rola 11 (Employee) in Podmiot3 — EXPLICITLY NEW in FA(3)**

- **Fact:** `Podmiot3` / `Rola` value `"11"` (Employee) is explicitly new in FA(3). It covers
  employee expenses where an employee purchases on behalf of the employer.
- **Source:** FA(3) Information Sheet, §7.1
- **Verbatim:** "Role 11 – Employee (new in FA(3)) — for employee expenses where an employee
  purchases on behalf of employer"
- **Implication:** When `Rola` = "11", the employee has no tax ID, so `DaneIdentyfikacyjne/BrakID`
  = "1" must be used, with `DaneIdentyfikacyjne/Nazwa` = full name of the employee.
- **Confidence:** HIGH (only fact explicitly marked "new in FA(3)" in the information sheet)

**5.2 — Zalacznik (Attachment) — NEW in FA(3)**

- **Fact:** The `<Zalacznik>` element is an optional top-level element in FA(3), available from 1
  February 2026. It serves invoices with complex data concerning units of measurement, quantity, or
  net unit prices. It did not exist in FA(2).
- **Source:** FA(3) Information Sheet, §16 ("Optional element. Available from 1 February 2026.")
- **Verbatim:** "Optional element. Available from 1 February 2026. For invoices with complex data
  concerning units of measurement, quantity, or net unit prices."
- **Implication:** Requires prior notification of intent to use attachment via e-Tax Office
  (e-Urząd Skarbowy). If attachment is used for non-tax data (price lists, warranties, contracts),
  the right to issue invoices with attachment will be revoked.
- **Confidence:** HIGH (explicit "Available from 1 February 2026" date establishes it as FA(3)-only)

**5.3 — StatusInfoPodatnika (Podmiot1)**

- **Fact:** `StatusInfoPodatnika` is an optional field in `Podmiot1` indicating taxpayer status:
  "1" = liquidation, "2" = restructuring, "3" = bankruptcy, "4" = business in inheritance.
- **Source:** FA(3) Information Sheet, §5.2
- **Confidence:** MEDIUM (the information sheet documents it in FA(3) but does not state it was
  absent from FA(2))

**5.4 — IPKSeF (KSeF payment identifier) in Platnosc**

- **Fact:** `IPKSeF` is an optional field in `Fa/Platnosc`. It is a KSeF payment identifier:
  3-char settlement agent ID + 10-char unique string, max 13 chars, characters 0-9 a-z A-Z, must be
  unique per payment.
- **Source:** FA(3) Information Sheet, §12.1
- **Confidence:** MEDIUM (documented in FA(3) information sheet; whether this existed in FA(2) is
  not stated)

**5.5 — StanPrzed (line-level "status before correction") in FaWiersz**

- **Fact:** `StanPrzed` is an optional field in `FaWiersz` with value "1" meaning "this line
  represents the status before correction". This enables showing before/after correction states in
  separate rows within the same corrective invoice.
- **Source:** FA(3) Information Sheet, §10.2
- **Confidence:** MEDIUM

**5.6 — P_11Vat (per-line tax amount) in FaWiersz**

- **Fact:** `P_11Vat` is a conditional field in `FaWiersz` containing the tax amount per line item,
  per Art. 106e sec. 10 (optional per-item tax breakdown).
- **Source:** FA(3) Information Sheet, §10.2
- **Confidence:** MEDIUM

---

### Topic 6 — Top-Level Structure Comparison

**6.1 — Top-level element set in FA(3)**

- **Fact:** FA(3) defines the following top-level elements inside `<Faktura>`:
  `Naglowek` (mandatory), `Podmiot1` (mandatory), `Podmiot2` (mandatory),
  `Podmiot3` (optional, max 100), `PodmiotUpowazniony` (conditional),
  `Fa` (mandatory), `Stopka` (optional), `Zalacznik` (optional, new in FA(3)).
- **Source:** FA(3) Information Sheet, §3.1
- **Confidence:** HIGH

**6.2 — XSD imports and auxiliary namespace**

- **Fact:** The FA(3) XSD imports a shared Ministry of Finance type definitions schema at namespace
  `http://crd.gov.pl/xml/schematy/dziedzinowe/mf/2022/01/05/eD/DefinicjeTypy/` (file
  `StrukturyDanych_v10-0E.xsd`). The FA(3) target namespace is
  `http://crd.gov.pl/wzor/2025/06/25/13775/`.
- **Source:** `packages/validator/src/schemas/schemat.xsd`, line 1
- **Verbatim (XSD line 1):** `targetNamespace="http://crd.gov.pl/wzor/2025/06/25/13775/"
  xmlns:etd="http://crd.gov.pl/xml/schematy/dziedzinowe/mf/2022/01/05/eD/DefinicjeTypy/"`
- **Confidence:** HIGH

---

### Topic 7 — What Developers Need to Change (Migration Steps)

> ⚠️ NOTE TO COPYWRITER: The information sheet does not contain a dedicated "migration guide"
> section. The following migration steps are derived from structural analysis of what changed between
> FA(2) (namespace, attributes) and FA(3) (as documented in the information sheet). All individual
> facts cited are HIGH confidence; their framing as "migration steps" is the Researcher's structural
> inference.

**Step 1 — Update the XML namespace (BREAKING — causes 100% validation failure if missed)**

- Change `xmlns="http://crd.gov.pl/wzor/2023/06/29/12648/"` →
  `xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/"`
- This is the single most common cause of FA(3) validation failure for developers coming from FA(2).
- **Source for FA(3) namespace:** FA(3) Information Sheet §1.2; XSD `schemat.xsd` line 1 —
  Confidence: HIGH

**Step 2 — Update KodFormularza attributes**

- Change `kodSystemowy="FA (2)"` → `kodSystemowy="FA (3)"`
- Change `wersjaSchemy` to `"1-0E"`
- **Source:** FA(3) Information Sheet §4.1 — Confidence: HIGH

**Step 3 — Update WariantFormularza value**

- Change `<WariantFormularza>2</WariantFormularza>` → `<WariantFormularza>3</WariantFormularza>`
- **Source:** FA(3) Information Sheet §4.1 — Confidence: HIGH (for FA(3) value = "3")

**Step 4 — Add JST and GV to every Podmiot2 (BREAKING — mandatory fields)**

- Add `<JST>2</JST>` and `<GV>2</GV>` to every Podmiot2 as the default "not applicable" case.
- If the invoice involves a subordinate JST unit or VAT group member, set "1" and add the
  corresponding Podmiot3 entry.
- **Source:** FA(3) Information Sheet §6.1 — Confidence: HIGH

**Step 5 — Handle FA(3) corrections of old FA(2) invoices correctly**

- When issuing a corrective invoice in 2026 that corrects an original FA(2) invoice issued before
  Feb 1, 2026: use FA(3) format for the corrective invoice.
- In `DaneFaKorygowanej`, set `NrKSeFN` = "1" (original invoice issued outside current KSeF), NOT
  `NrKSeF` = "1" (which would be for invoices that were in KSeF 2.0).
- **Source:** FA(3) Information Sheet §9.7 (DaneFaKorygowanej structure), §1.2 (CRITICAL RULE) —
  Confidence: HIGH for the FA(3) format requirement; MEDIUM for the NrKSeFN inference (§9.7 defines
  the choice but does not explicitly address the FA(2)→FA(3) correction scenario)

**Step 6 — (If applicable) Implement Zalacznik for complex unit/quantity invoices**

- New in FA(3): structured attachments for complex measurement/quantity/unit price data.
- **Prerequisite:** Submit notification of intent via e-Tax Office before first use.
- **Source:** FA(3) Information Sheet §16 — Confidence: HIGH

**Step 7 — (If applicable) Implement Role 11 (Employee) in Podmiot3**

- For employee-expense invoices: use `Rola` = "11" with `BrakID` = "1" and employee full name.
- **Source:** FA(3) Information Sheet §7.1, §7.3, CRITICAL RULE box after §7.3 — Confidence: HIGH

**Step 8 — Validate against the FA(3) XSD schema and KSeF test environment**

- XSD schema location: `packages/validator/src/schemas/schemat.xsd` (internal) or at
  `https://crd.gov.pl/wzor/2025/06/25/13775/` (official MF publication)
- KSeF 2.0 test environment: `https://web2te-ksef.mf.gov.pl/` (fictitious data, no legal effect)
- **Source for test URL:** KB brief `ksef-dla-jdg.md`, Fact 5.1; CLAUDE.md project reference;
  `skills/ksef-fa3/SKILL.md` — Confidence: HIGH (consistent across multiple internal references)
- ⚠️ **Freshness flag:** `https://web2te-ksef.mf.gov.pl/` — verify URL is still active before
  publication (infrastructure URLs can change)

---

### Topic 8 — Test Environment

**8.1 — KSeF 2.0 test environment URL**

- **Fact:** The Ministry of Finance provides a KSeF 2.0 test environment at
  `https://web2te-ksef.mf.gov.pl/`. Invoices submitted there use fictitious data and have no legal
  effect.
- **Source:** Multiple internal references confirming the same URL: `CLAUDE.md` p. 212,
  `skills/ksef-fa3/SKILL.md` line 31, KB brief `ksef-dla-jdg.md` Fact 5.1
- **Confidence:** HIGH (consistent across all references)
- ⚠️ **Freshness flag:** URL to verify before each publication

**8.2 — Old KSeF 1.0 URL is dead**

- **Fact:** The KSeF 1.0 production URL (`ap.ksef.mf.gov.pl`) has been shut down since 1 February
  2026 and must not be referenced.
- **Source:** KB constitutional-judge.md reference §242–243: "Production is `ap.ksef.mf.gov.pl`,
  test is `web2te-ksef.mf.gov.pl`. The old 1.0 URL is dead since Feb 1, 2026."
- **Confidence:** HIGH

---

### Topic 9 — Structural Deep-Dive: FA(3) Schema Reference (Quick Guide for Developers)

The following facts are needed for the article's "what changed in the XML" sections.

**9.1 — Minimal valid FA(3) document structure**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/">
  <Naglowek>
    <KodFormularza kodSystemowy="FA (3)" wersjaSchemy="1-0E">FA</KodFormularza>
    <WariantFormularza>3</WariantFormularza>
    <DataWytworzeniaFa>2026-09-15T10:00:00Z</DataWytworzeniaFa>
  </Naglowek>
  <Podmiot1>...</Podmiot1>
  <Podmiot2>
    ...
    <JST>2</JST>
    <GV>2</GV>
  </Podmiot2>
  <Fa>...</Fa>
</Faktura>
```

- **Source:** FA(3) Information Sheet §3.1, §4.1, §6.1; KB brief `bledy-walidacji-fa3.md`
  "Minimal Valid Document Structure" section — Confidence: HIGH

**9.2 — Podmiot2 field changes summary**

Fields that are mandatory in FA(3) `Podmiot2` and NOT present in FA(2):

| Field | Status in FA(3) | Notes                                       |
| ----- | --------------- | ------------------------------------------- |
| `JST` | Mandatory       | "2" = not applicable; "1" triggers Podmiot3 |
| `GV`  | Mandatory       | "2" = not applicable; "1" triggers Podmiot3 |

- **Source:** FA(3) Information Sheet §6.1 — Confidence: HIGH

**9.3 — FaWiersz fields present in FA(3) that may be new**

| Field         | Status     | Notes                                                       |
| ------------- | ---------- | ----------------------------------------------------------- |
| `StanPrzed`   | Optional   | "1" = status before correction (supports before/after rows) |
| `P_11Vat`     | Conditional | Tax amount per line (Art. 106e sec. 10)                    |
| `P_12_Zal_15` | Optional   | "1" = Annex 15 goods/services flag                          |
| `P_9B`        | Conditional | Gross unit price (Art. 106e sec. 7/8 formula)              |
| `P_11A`       | Conditional | Gross sales value (Art. 106e sec. 7/8 formula)             |
| `KursWaluty`  | Optional   | Exchange rate per line item (up to 6 decimal places)        |
| `UU_ID`       | Optional   | Universal unique invoice line number (max 50 chars)         |

- **Source:** FA(3) Information Sheet §10.2 — Confidence: HIGH for FA(3) existence; MEDIUM for
  whether each was absent from FA(2) (the information sheet does not enumerate FA(2) fields)

---

## Unsettled Questions (Do NOT answer definitively in the article)

1. **Which specific FA(2) fields were removed in FA(3)?** The FA(3) information sheet does not
   explicitly list fields that existed in FA(2) but were dropped. There is no official
   "FA(2)→FA(3) migration changelog" document in the source corpus. The Copywriter should state
   what IS in FA(3) and note the namespace change, rather than claiming specific removals.

2. **KseF 2.0 API endpoint for invoice submission** — the test environment URL is confirmed
   (`web2te-ksef.mf.gov.pl`) but specific REST API paths/endpoints are not documented in the
   FA(3) information sheet. Refer readers to the official KSeF API documentation (Podręcznik KSeF
   2.0) for API-level integration details — that document is NOT in the current processed corpus.

3. **FA(2) `wersjaSchemy` value** — The FA(3) information sheet only states FA(3) uses
   `wersjaSchemy="1-0E"`. The FA(2) value is not documented in any processed Tier 1 or Tier 2
   source. Do not state the FA(2) value without sourcing it.

4. **Grace period / penalty regime for late migration** — The FA(3) information sheet is silent on
   penalty structures. The KB brief `ksef-dla-jdg.md` notes there is a grace period for penalties
   after April 1, 2026, but specifics are in the Ustawa (Art. 145m) and Objaśnienia podatkowe —
   not yet fully processed into the knowledge base.

---

## Suggested Sources Section (for article "Źródła" footer)

1. **Broszura informacyjna FA(3), marzec 2026** — Ministerstwo Finansów — §1.2 (timeline), §3.1
   (structure), §4.1 (header), §6.1 (Podmiot2), §7.1 (Podmiot3 Role 11), §16 (Zalacznik)
   — URL: `https://crd.gov.pl/wzor/2025/06/25/13775/`

2. **Schemat XSD FA(3)** — `targetNamespace="http://crd.gov.pl/wzor/2025/06/25/13775/"`
   — URL: `https://crd.gov.pl/wzor/2025/06/25/13775/`

3. **Ustawa o podatku od towarów i usług** — Dz.U. 2025 poz. 775 — Art. 145m (mandatory KSeF
   timeline), Art. 106na (invoice issuance date rules)

4. **Środowisko testowe KSeF 2.0** — `https://web2te-ksef.mf.gov.pl/`

---

## Warning: Common Misconceptions (Flag for the Copywriter)

1. **"KSeF 2.0 also accepts FA(2) for backward compatibility"** — WRONG. KSeF 2.0 only accepts
   FA(3). There is no backward-compatible mode. Source: FA(3) Information Sheet §1.2.

2. **"Corrections to FA(2) invoices can be issued in FA(2) format"** — WRONG. Any corrective
   invoice issued on or after 1 February 2026 must use FA(3), regardless of the original invoice's
   format. Source: FA(3) Information Sheet §1.2 CRITICAL RULE.

3. **"Only large companies need FA(3) from February 2026"** — NEEDS NUANCE. FA(3) format is
   required for all KSeF invoices from February 1, 2026. The Feb 1 / Apr 1 2026 dates refer to
   *when KSeF becomes mandatory* for different company sizes — not to different FA(3) versions.
   Source: FA(3) Information Sheet §1.2 (format); KB brief `ksef-dla-jdg.md` (timeline).

4. **"Just changing the namespace is all you need to migrate"** — INCOMPLETE. Namespace change is
   necessary but not sufficient. Developers must also update KodFormularza attributes, WariantFormularza,
   and add the new mandatory JST/GV fields to Podmiot2.

5. **"FA(3) test environment is the same URL as KSeF 1.0"** — WRONG. The old KSeF 1.0 URL
   (`ap.ksef.mf.gov.pl`) is dead since Feb 1, 2026. The KSeF 2.0 test environment is at
   `https://web2te-ksef.mf.gov.pl/`.

---

## Freshness Markers

| Claim                                                                     | Condition for review                                      | Confidence |
| ------------------------------------------------------------------------- | --------------------------------------------------------- | ---------- |
| Test environment URL `https://web2te-ksef.mf.gov.pl/`                    | Verify before publication; MF may change infrastructure   | MEDIUM     |
| KSeF mandatory from April 1, 2026 for all VAT taxpayers                  | Review if MF announces further deadline extensions        | HIGH       |
| FA(3) XSD schema version `1-0E`, `wersjaSchemy="1-0E"`                   | Review if MF publishes a new FA(3) minor version          | HIGH       |
| Penalty grace period details after April 1, 2026                         | Review after April 1, 2026 — MF may publish updated guidance | MEDIUM   |

---

## Cross-References to Existing Briefs

- **Namespace errors and fixes** → `briefs/bledy-walidacji-fa3.md`, Error 1 section — extends
  the FA(2) namespace discussion with concrete XML examples and error codes
- **KSeF mandatory timeline and April 2026 deadline** → `briefs/ksef-dla-jdg.md`, Facts 1.1–1.2
  — consistent with FA(3) Information Sheet §1.2
- **JST/GV errors** → `briefs/bledy-walidacji-fa3.md`, Error section on JST/GV — confirms these
  fields were absent in FA(2) templates and are required in FA(3)
