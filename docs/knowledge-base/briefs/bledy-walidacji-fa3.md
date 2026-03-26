# Research Brief: Najczęstsze błędy walidacji FA(3) — i jak je naprawić

**Requested by:** Copywriter agent **Date:** 2026-03-26 **For content:** Blog post — "Najczęstsze
błędy walidacji FA(3) — i jak je naprawić" **Target persona:** Developer or technically-inclined
accountant generating FA(3) XML — someone who sees cryptic XSD validation errors and needs to
understand exactly what went wrong and how to fix it. **Tool context:** ksefuj.to — free KSeF XML
validator

---

## Source Corpus Used

| Source                                                               | Tier     | File / URL                                                         | Status  |
| -------------------------------------------------------------------- | -------- | ------------------------------------------------------------------ | ------- |
| FA(3) Information Sheet (Broszura informacyjna, marzec 2026, 174 s.) | 2        | `packages/validator/docs/fa3-information-sheet.md`                 | CURRENT |
| FA(3) XSD Schema (schemat.xsd)                                       | 2        | `packages/validator/src/schemas/schemat.xsd`                       | CURRENT |
| Semantic validation implementation                                   | internal | `packages/validator/src/semantic.ts`                               | CURRENT |
| Semantic validation tests                                            | internal | `packages/validator/src/__tests__/semantic.test.ts`                | CURRENT |
| Error code registry                                                  | internal | `packages/validator/src/error-codes.ts`                            | CURRENT |

> ⚠️ **NOTE TO COPYWRITER:** The FA(3) Information Sheet (Broszura) is the constitutional reference
> for all rules. The `semantic.ts` and `error-codes.ts` are our implementation — they are derived
> from the Broszura but are internal code, not MF sources. Cite the Broszura section numbers for
> authority; reference the code only for implementation details (e.g., error code names, fix
> suggestions).

---

## FA(3) XML Scaffolding — Reference for Examples

The Copywriter will need to write correct XML before/after examples. This section provides the
exact scaffolding.

### Namespace & Root Element

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/">
  <!-- all content here -->
</Faktura>
```

- **Source:** FA(3) Information Sheet, §1.2; XSD `schemat.xsd` line 1
- **Namespace URI:** `http://crd.gov.pl/wzor/2025/06/25/13775/`
- **Confidence:** HIGH
- This is the FA(3) production namespace. The URL corresponds to the logical structure available
  at `https://crd.gov.pl/wzor/2025/06/25/13775/`.
- The XSD `targetNamespace` in `schemat.xsd` confirms:
  `targetNamespace="http://crd.gov.pl/wzor/2025/06/25/13775/"`

### KodFormularza Attributes

```xml
<KodFormularza kodSystemowy="FA (3)" wersjaSchemy="1-0E">FA</KodFormularza>
```

- **Source:** FA(3) Information Sheet, §4.1
- **Verbatim:** "Two attributes: `kodSystemowy` = `FA(3)`, `wersjaSchemy` = `1-0E`"
- **Text content:** `FA` (the element text value)
- **Note:** The `kodSystemowy` attribute value is `FA (3)` with a space before the parenthesis —
  confirmed in test fixtures (`semantic.test.ts` line 19: `kodSystemowy="FA (3)"`).
- **Confidence:** HIGH

### Minimal Valid Document Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/">
  <Naglowek>
    <KodFormularza kodSystemowy="FA (3)" wersjaSchemy="1-0E">FA</KodFormularza>
    <WariantFormularza>3</WariantFormularza>
    <DataWytworzeniaFa>2026-09-15T10:00:00Z</DataWytworzeniaFa>
  </Naglowek>
  <Podmiot1>
    <DaneIdentyfikacyjne>
      <NIP>1234567890</NIP>
      <Nazwa>Firma Sprzedawcy Sp. z o.o.</Nazwa>
    </DaneIdentyfikacyjne>
    <Adres>
      <KodKraju>PL</KodKraju>
      <AdresL1>ul. Testowa 1, 00-001 Warszawa</AdresL1>
    </Adres>
  </Podmiot1>
  <Podmiot2>
    <DaneIdentyfikacyjne>
      <NIP>9876543210</NIP>
      <Nazwa>Firma Nabywcy S.A.</Nazwa>
    </DaneIdentyfikacyjne>
    <Adres>
      <KodKraju>PL</KodKraju>
      <AdresL1>ul. Przykładowa 2, 00-002 Kraków</AdresL1>
    </Adres>
    <JST>2</JST>
    <GV>2</GV>
  </Podmiot2>
  <Fa>
    <KodWaluty>PLN</KodWaluty>
    <P_1>2026-09-15</P_1>
    <P_2>FV/001/09/2026</P_2>
    <P_13_1>100.00</P_13_1>
    <P_14_1>23.00</P_14_1>
    <P_15>123.00</P_15>
    <Adnotacje>
      <P_16>2</P_16>
      <P_17>2</P_17>
      <P_18>2</P_18>
      <P_18A>2</P_18A>
      <Zwolnienie><P_19N>1</P_19N></Zwolnienie>
      <NoweSrodkiTransportu><P_22N>1</P_22N></NoweSrodkiTransportu>
      <P_23>2</P_23>
      <PMarzy><P_PMarzyN>1</P_PMarzyN></PMarzy>
    </Adnotacje>
    <RodzajFaktury>VAT</RodzajFaktury>
  </Fa>
  <FaWiersz>
    <NrWierszaFa>1</NrWierszaFa>
    <P_7>Usługa programistyczna</P_7>
    <P_8A>szt.</P_8A>
    <P_8B>1</P_8B>
    <P_9A>100.00</P_9A>
    <P_11>100.00</P_11>
    <P_12>23</P_12>
  </FaWiersz>
</Faktura>
```

- **Source:** Derived from `semantic.test.ts` "complete valid document" test (lines 772–817),
  cross-referenced with FA(3) Information Sheet §3.1 (top-level elements), §4.1 (Naglowek), §5
  (Podmiot1), §6 (Podmiot2), §9 (Fa), §10 (FaWiersz).
- **Confidence:** HIGH — this structure passes both XSD and all 38+ semantic validation rules.

### Top-Level Element Order (xs:sequence)

```
Faktura
├── Naglowek          [1..1] MANDATORY
├── Podmiot1           [1..1] MANDATORY
├── Podmiot2           [1..1] MANDATORY
├── Podmiot3           [0..100] Optional
├── PodmiotUpowazniony [0..1] Conditional
├── Fa                 [1..1] MANDATORY
├── Stopka             [0..1] Optional
└── Zalacznik          [0..1] Optional
```

- **Source:** FA(3) Information Sheet, §3.1
- **Confidence:** HIGH

### Naglowek Internal Order (xs:sequence)

```
Naglowek
├── KodFormularza      [1..1] MANDATORY
├── WariantFormularza   [1..1] MANDATORY
├── DataWytworzeniaFa   [1..1] MANDATORY
└── SystemInfo          [0..1] Optional
```

- **Source:** FA(3) Information Sheet, §4.1
- **Confidence:** HIGH

---

## Key Facts — The 12 Most Common Validation Errors

---

### Error 1: Wrong namespace / missing namespace declaration

**Validator error:** XSD `SCHEMA_VALIDATION_FAILED` — every element will be reported as unrecognized
if the namespace is wrong.

**What it is:**

- **Fact:** The root `<Faktura>` element must declare the FA(3) namespace via
  `xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/"`. Without it, the XSD validator cannot match
  any element to the schema, and every single child element will fail validation.
- **Source:** FA(3) Information Sheet, §1.2; XSD `schemat.xsd`
  (`targetNamespace="http://crd.gov.pl/wzor/2025/06/25/13775/"`)
- **Verbatim (from §1.2):** "The FA(3) logical structure in its production version is available at:
  `https://crd.gov.pl/wzor/2025/06/25/13775/`"
- **Confidence:** HIGH

**Common mistake patterns:**

1. Missing `xmlns` attribute entirely: `<Faktura>` instead of
   `<Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/">`
2. Using the FA(2) namespace (pre-February 2026):
   `xmlns="http://crd.gov.pl/wzor/2023/06/29/12648/"` — this was the KSeF 1.0 schema
3. Typo in the namespace URI — the date portion `2025/06/25/13775/` is easy to mistype
4. Using a prefixed namespace without qualifying elements:
   `xmlns:fa="http://crd.gov.pl/wzor/2025/06/25/13775/"` but then writing `<Faktura>` instead
   of `<fa:Faktura>`

**Fix:**

```xml
<!-- ❌ WRONG — missing namespace -->
<Faktura>
  ...
</Faktura>

<!-- ❌ WRONG — FA(2) namespace (KSeF 1.0, expired 31 January 2026) -->
<Faktura xmlns="http://crd.gov.pl/wzor/2023/06/29/12648/">
  ...
</Faktura>

<!-- ✅ CORRECT -->
<Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/">
  ...
</Faktura>
```

- **Stale content flag:** FA(2) namespace (`http://crd.gov.pl/wzor/2023/06/29/12648/`) was valid
  until 31 January 2026. FA(3) namespace applies from 1 February 2026. Any guides referencing the
  old namespace are outdated.
- **Source (FA(2) → FA(3) transition):** FA(3) Information Sheet, §1.2: "The logical structure
  FA(2), effective from 1 September 2023, was used until 31 January 2026. From 1 February 2026, the
  logical structure FA(3) is the binding structured invoice template."

---

### Error 2: Element order violation (xs:sequence)

**Validator error:** XSD `ELEMENT_NOT_ALLOWED` — "Element X not expected at this location"

**What it is:**

- **Fact:** The FA(3) XSD uses `xs:sequence` for all structural elements, meaning child elements
  must appear in the exact order defined by the schema. If `Podmiot2` appears before `Podmiot1`, or
  `WariantFormularza` appears before `KodFormularza`, validation fails.
- **Source:** FA(3) Information Sheet, §3.1 (top-level order), §4.1 (Naglowek order); XSD schema
  (xs:sequence throughout)
- **Confidence:** HIGH

**Common mistake patterns:**

1. Putting `Podmiot2` before `Podmiot1`
2. Inside `Naglowek`: putting `DataWytworzeniaFa` before `WariantFormularza`
3. Inside `Fa`: putting `RodzajFaktury` before `Adnotacje`, or `P_15` before `P_13_x`/`P_14_x`
   fields
4. Putting `FaWiersz` before `Fa` (FaWiersz is a sibling of Fa at Faktura level, must come after Fa)
5. Inside `Podmiot1`/`Podmiot2`: putting `Adres` before `DaneIdentyfikacyjne`

**Required orders (key sequences for the Copywriter):**

Top-level:
```
Naglowek → Podmiot1 → Podmiot2 → [Podmiot3] → [PodmiotUpowazniony] → Fa → [Stopka] → [Zalacznik]
```

Naglowek:
```
KodFormularza → WariantFormularza → DataWytworzeniaFa → [SystemInfo]
```

Podmiot1:
```
[PrefiksPodatnika] → [NrEORI] → DaneIdentyfikacyjne → Adres → [AdresKoresp] → [DaneKontaktowe] → [StatusInfoPodatnika]
```

Podmiot2:
```
[NrEORI] → DaneIdentyfikacyjne → [Adres] → [AdresKoresp] → [DaneKontaktowe] → [NrKlienta] → [IDNabywcy] → JST → GV
```

Fa (partial — most critical order):
```
KodWaluty → P_1 → [P_1M] → P_2 → [WZ] → [P_6] → [OkresFa] → ... → P_13_x → P_14_x → P_15 → [KursWalutyZ] → Adnotacje → RodzajFaktury → ...
```

- **Source:** FA(3) Information Sheet, §3.1, §4.1, §5.2, §6.1, §9.2–§9.5
- **Confidence:** HIGH

**Fix example:**

```xml
<!-- ❌ WRONG — Podmiot2 before Podmiot1 -->
<Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/">
  <Naglowek>...</Naglowek>
  <Podmiot2>...</Podmiot2>
  <Podmiot1>...</Podmiot1>
  ...
</Faktura>

<!-- ✅ CORRECT — Podmiot1 before Podmiot2 -->
<Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/">
  <Naglowek>...</Naglowek>
  <Podmiot1>...</Podmiot1>
  <Podmiot2>...</Podmiot2>
  ...
</Faktura>
```

---

### Error 3: Missing required elements

**Validator error:** XSD `REQUIRED_ELEMENT_MISSING`

**What it is:**

- **Fact:** FA(3) has multiple mandatory elements at different levels. Missing any of them causes
  XSD validation failure.
- **Source:** FA(3) Information Sheet, §3.1 (top-level), §4.1 (Naglowek), §5.1–§5.3 (Podmiot1),
  §6.1–§6.2 (Podmiot2), §9.2–§9.5 (Fa)
- **Confidence:** HIGH

**Mandatory elements by level:**

| Level | Required Elements | Source |
|-------|-------------------|--------|
| `Faktura` (top) | `Naglowek`, `Podmiot1`, `Podmiot2`, `Fa` | §3.1 |
| `Naglowek` | `KodFormularza` (with attributes), `WariantFormularza`, `DataWytworzeniaFa` | §4.1 |
| `Podmiot1/DaneIdentyfikacyjne` | `NIP`, `Nazwa` | §5.3 |
| `Podmiot1/Adres` | `KodKraju`, `AdresL1` | §5.4 |
| `Podmiot2/DaneIdentyfikacyjne` | At least one of: `NIP`, `KodUE`+`NrVatUE`, `KodKraju`+`NrID`, `BrakID`; plus `Nazwa` | §6.2 |
| `Podmiot2` | `JST`, `GV` | §6.1 |
| `Fa` | `KodWaluty`, `P_1`, `P_2`, `P_15`, `Adnotacje`, `RodzajFaktury` | §9.2, §9.4, §9.5 |
| `Fa/Adnotacje` | `P_16`, `P_17`, `P_18`, `P_18A`, `Zwolnienie`, `NoweSrodkiTransportu`, `P_23`, `PMarzy` | §9.6 |

**Common mistake patterns:**

1. Forgetting `WariantFormularza` (must be `3`)
2. Forgetting `KodWaluty` (must be ISO 4217 code, e.g. `PLN`)
3. Omitting `P_15` (total amount due) — **always mandatory** even for zero-value invoices
4. Missing `Adnotacje` block entirely
5. Missing `RodzajFaktury` (must be one of: `VAT`, `KOR`, `ZAL`, `ROZ`, `UPR`, `KOR_ZAL`,
   `KOR_ROZ`)

**Fix:** Ensure all mandatory elements are present. See the "Minimal Valid Document Structure"
above for a complete example.

---

### Error 4: Invalid NIP format

**Validator error:** XSD `INVALID_ELEMENT_VALUE` (pattern mismatch); or semantic
`NIP_IN_WRONG_FIELD`

**What it is:**

- **Fact:** NIP must be entered as a continuous string of exactly 10 digits — no dashes, no spaces,
  no country code prefix. The alphabetic country code must be in a separate field.
- **Source:** FA(3) Information Sheet, §2.10
- **Verbatim:** "Must be entered as a continuous string of digits or letters, without spaces or other
  separating characters. The alphabetic country code must be entered in a separate field designated
  for this purpose."
- **Confidence:** HIGH

**Additional critical rule:**

- **Fact:** The Polish purchaser's NIP **must** be in the `NIP` field within
  `Podmiot2/DaneIdentyfikacyjne`. It must NOT be in `NrVatUE` or `NrID`. The invoice will only be
  correctly delivered to the buyer in KSeF if their NIP is in the `NIP` field.
- **Source:** FA(3) Information Sheet, §2.10, §6.2
- **Verbatim:** "The Polish taxpayer identification number (NIP) of the purchaser MUST be entered in
  the NIP field within Podmiot2/DaneIdentyfikacyjne. It MUST NOT be provided in the NrVatUE or NrID
  fields. The invoice will be correctly made available to the purchaser in KSeF only if the
  purchaser's NIP is entered in the NIP field — not in NrVatUE or NrID."
- **Validator code:** `NIP_IN_WRONG_FIELD` (semantic.ts, Rule 5, §2.10/§6.2)
- **Confidence:** HIGH

**Common mistake patterns:**

1. Adding dashes: `123-456-78-90` instead of `1234567890`
2. Adding spaces: `123 456 78 90`
3. Prefixing with country code: `PL1234567890` — the `PL` prefix belongs in `PrefiksPodatnika`
   (Podmiot1) or `KodUE` (Podmiot2), not in the NIP field itself
4. Putting a Polish NIP in `NrVatUE` field — this is semantically wrong and the invoice won't be
   available to the buyer in KSeF

**Fix:**

```xml
<!-- ❌ WRONG — dashes in NIP -->
<NIP>123-456-78-90</NIP>

<!-- ❌ WRONG — country prefix in NIP -->
<NIP>PL1234567890</NIP>

<!-- ❌ WRONG — Polish NIP in NrVatUE field -->
<DaneIdentyfikacyjne>
  <NrVatUE>1234567890</NrVatUE>
  <Nazwa>Firma</Nazwa>
</DaneIdentyfikacyjne>

<!-- ✅ CORRECT — 10 digits, no separators -->
<DaneIdentyfikacyjne>
  <NIP>1234567890</NIP>
  <Nazwa>Firma</Nazwa>
</DaneIdentyfikacyjne>
```

---

### Error 5: Invalid date format

**Validator error:** XSD `INVALID_ELEMENT_VALUE` (pattern mismatch)

**What it is:**

- **Fact:** Date fields must use format `YYYY-MM-DD`. The single datetime field
  `DataWytworzeniaFa` uses format `YYYY-MM-DDTHH:MM:SSZ` where `Z` (Zulu) suffix denotes UTC.
- **Source:** FA(3) Information Sheet, §2.8 (dates), §2.9 (datetime)
- **Verbatim (§2.8):** "Dates must be given in the format YYYY-MM-DD (e.g. 2026-02-01)."
- **Verbatim (§2.9):** "Format: YYYY-MM-DDTHH:MM:SS (e.g. 2026-02-01T09:30:47Z, where T denotes
  'Time'). When providing universal time (UTC), the letter Z (Zulu) must be appended at the end."
- **Confidence:** HIGH

**Fields that use date format (`YYYY-MM-DD`):**

- `P_1` (issue date), `P_6` (delivery date), `P_6A` (per-line delivery date)
- `P_6_Od`, `P_6_Do` (OkresFa period)
- `DataWystFaKorygowanej` (corrected invoice issue date)
- `P_22A` (vehicle service date)
- `DataZaplaty` (payment date)

**Fields that use datetime format (`YYYY-MM-DDTHH:MM:SSZ`):**

- `DataWytworzeniaFa` (invoice generation datetime) — **the only mandatory datetime field**
- `DataGodzRozpTransportu`, `DataGodzZakTransportu` (transport datetimes, optional)

**Common mistake patterns:**

1. Using Polish date format: `15.09.2026` or `15-09-2026` instead of `2026-09-15`
2. Missing the `Z` suffix on datetime: `2026-09-15T10:00:00` instead of `2026-09-15T10:00:00Z`
3. Adding timezone offset instead of Z: `2026-09-15T10:00:00+02:00` — use UTC with `Z`
4. Using a datetime format for a date field: `<P_1>2026-09-15T10:00:00Z</P_1>` — `P_1` expects
   date only
5. Single-digit months/days without zero padding: `2026-9-5` instead of `2026-09-05`

**Fix:**

```xml
<!-- ❌ WRONG — Polish format -->
<P_1>15.09.2026</P_1>

<!-- ❌ WRONG — datetime in a date-only field -->
<P_1>2026-09-15T10:00:00Z</P_1>

<!-- ✅ CORRECT — date field -->
<P_1>2026-09-15</P_1>

<!-- ❌ WRONG — missing Z suffix -->
<DataWytworzeniaFa>2026-09-15T10:00:00</DataWytworzeniaFa>

<!-- ❌ WRONG — timezone offset instead of Z -->
<DataWytworzeniaFa>2026-09-15T10:00:00+02:00</DataWytworzeniaFa>

<!-- ✅ CORRECT — datetime with Z suffix -->
<DataWytworzeniaFa>2026-09-15T10:00:00Z</DataWytworzeniaFa>
```

- **Source (Appendix D, rule #15):** "DateTime format: YYYY-MM-DDTHH:MM:SSZ for
  DataWytworzeniaFa, DataGodzRozpTransportu, DataGodzZakTransportu"
- **Confidence:** HIGH

---

### Error 6: Wrong decimal precision

**Validator error:** Semantic `DECIMAL_PRECISION`

**What it is:**

- **Fact:** FA(3) enforces strict decimal precision limits on numeric fields. Exceeding the allowed
  decimal places causes validation failure. Additionally, only a full stop (`.`) may be used as the
  decimal separator, and no thousand separators are allowed.
- **Source:** FA(3) Information Sheet, §2.5 (amount format), §2.6 (precision), Appendix C, Appendix
  D #13
- **Verbatim (§2.5):** "Values must be entered as a sequence of digits, without thousand separators
  (no spaces). Only a full stop (.) may be used as the decimal separator."
- **Confidence:** HIGH

**Precision rules (from §2.6 and Appendix C):**

| Max decimals | Fields | Common use |
|-------------|--------|-----------|
| **2** | P_11, P_11A, P_11Vat, P_13_1–P_13_11, P_14_1–P_14_5, P_14_1W–P_14_5W, **P_15**, WartoscZamowienia | All monetary amounts (net, tax, gross, totals) |
| **6** | **P_8B**, P_8BZ, P_12_XII, P_12Z_XII, KursWaluty, KursWalutyZK, KursWalutyZW, KursWalutyZ, KursUmowny, Udzial | Quantities, exchange rates, shares |
| **8** | **P_9A**, **P_9B**, P_9AZ, P_10 | Unit prices, discounts |

- **Source:** FA(3) Information Sheet, §2.6, Appendix C; `semantic.ts` Rule 28
  (`checkDecimalPrecision`), lines 878–1024
- **Confidence:** HIGH

**Common mistake patterns:**

1. Three decimal places in total: `<P_15>123.123</P_15>` — max is 2
2. Nine decimals in unit price: `<P_9A>123.123456789</P_9A>` — max is 8
3. Seven decimals in quantity: `<P_8B>1.1234567</P_8B>` — max is 6
4. Using comma as decimal separator: `<P_15>123,45</P_15>` — must use dot
5. Using thousand separators: `<P_15>1 234.56</P_15>` or `<P_15>1,234.56</P_15>`

**Fix:**

```xml
<!-- ❌ WRONG — 3 decimals in P_15 (max 2) -->
<P_15>123.123</P_15>

<!-- ✅ CORRECT — 2 decimals -->
<P_15>123.12</P_15>

<!-- ❌ WRONG — 9 decimals in P_9A (max 8) -->
<P_9A>123.123456789</P_9A>

<!-- ✅ CORRECT — 8 decimals -->
<P_9A>123.12345678</P_9A>

<!-- ❌ WRONG — 7 decimals in P_8B (max 6) -->
<P_8B>1.1234567</P_8B>

<!-- ✅ CORRECT — 6 decimals -->
<P_8B>1.123456</P_8B>

<!-- ❌ WRONG — comma separator -->
<P_15>123,45</P_15>

<!-- ❌ WRONG — space as thousand separator -->
<P_15>1 234.56</P_15>

<!-- ✅ CORRECT — dot only, no separators -->
<P_15>1234.56</P_15>
```

- **Validator codes:** `DECIMAL_PRECISION` (precision), `AMOUNT_NO_SEPARATORS` (separators)
- **Source (Appendix D, rule #13):** "Amount fields must be pure digit sequences with '.' decimal"

---

### Error 7: Missing Podmiot2 / Missing JST and GV

**Validator error:** XSD `REQUIRED_ELEMENT_MISSING` (if Podmiot2 absent); semantic
`PODMIOT2_JST_MISSING`, `PODMIOT2_GV_MISSING`

**What it is:**

- **Fact:** `Podmiot2` (purchaser) is a mandatory top-level element. Within it, `JST` and `GV` are
  also mandatory — even for the most basic domestic invoices.
- **Source:** FA(3) Information Sheet, §3.1 (Podmiot2 mandatory), §6.1 (JST and GV mandatory)
- **Verbatim (§6.1 for JST):** "Subordinate Local Government Unit flag: '1' = invoice concerns
  subordinate JST, '2' = does not"
- **Verbatim (§6.1 for GV):** "GV member flag: '1' = invoice concerns GV member, '2' = does not"
- **Confidence:** HIGH

**What JST and GV mean:**

| Field | Value `1` | Value `2` | Default for most invoices |
|-------|-----------|-----------|--------------------------|
| `JST` | Invoice concerns a subordinate local government unit | Does not concern JST | **`2`** |
| `GV` | Invoice concerns a VAT group member | Does not concern a VAT group | **`2`** |

**Cascading rules (from §6.1, Appendix D #3):**

- If `JST` = `1`: A `Podmiot3` element with `Rola` = `8` (JST – recipient) is also required
- If `GV` = `1`: A `Podmiot3` element with `Rola` = `10` (GV member – recipient) is also required
- **Validator codes:** `JST_REQUIRES_PODMIOT3`, `GV_REQUIRES_PODMIOT3`

**Identification choice in `Podmiot2/DaneIdentyfikacyjne` (from §6.2):**

Exactly one of these identification methods must be used:

1. `NIP` — for Polish buyers with NIP
2. `KodUE` + `NrVatUE` — for EU buyers (intra-Community supply, Art. 100 services)
3. `KodKraju` + `NrID` — for non-EU foreign buyers with other tax ID
4. `BrakID` = `1` — for buyers with no tax ID (e.g. consumers, simplified invoices)

Plus `Nazwa` (buyer's name) — always mandatory.

**Common mistake patterns:**

1. Omitting `Podmiot2` entirely — it's mandatory
2. Including `DaneIdentyfikacyjne` and `Adres` but forgetting `JST` and `GV`
3. Setting `JST` to `1` without adding a corresponding `Podmiot3` with `Rola` = `8`
4. Forgetting `Nazwa` in `DaneIdentyfikacyjne`

**Fix:**

```xml
<!-- ❌ WRONG — missing JST and GV -->
<Podmiot2>
  <DaneIdentyfikacyjne>
    <NIP>9876543210</NIP>
    <Nazwa>Firma Nabywcy</Nazwa>
  </DaneIdentyfikacyjne>
  <Adres>
    <KodKraju>PL</KodKraju>
    <AdresL1>ul. Testowa 1</AdresL1>
  </Adres>
</Podmiot2>

<!-- ✅ CORRECT — with JST and GV -->
<Podmiot2>
  <DaneIdentyfikacyjne>
    <NIP>9876543210</NIP>
    <Nazwa>Firma Nabywcy</Nazwa>
  </DaneIdentyfikacyjne>
  <Adres>
    <KodKraju>PL</KodKraju>
    <AdresL1>ul. Testowa 1</AdresL1>
  </Adres>
  <JST>2</JST>
  <GV>2</GV>
</Podmiot2>
```

**Note on element order:** Within Podmiot2, `JST` and `GV` must come AFTER `DaneIdentyfikacyjne`,
`Adres`, and optional elements like `AdresKoresp`, `DaneKontaktowe`, `NrKlienta`, `IDNabywcy`.
See the ordering rules in Error 2.

---

### Error 8: Invalid P_12 value (tax rate code)

**Validator error:** Semantic `P12_ENUMERATION`

**What it is:**

- **Fact:** The `P_12` field (tax rate) in `FaWiersz` must be one of exactly 14 predefined values.
  Any other value — including bare `0` without a variant suffix, percentage signs, or misspellings —
  is rejected.
- **Source:** FA(3) Information Sheet, §10.3
- **Confidence:** HIGH

**Complete enumeration (from §10.3):**

| Value | Meaning |
|-------|---------|
| `23` | 23% VAT rate |
| `22` | 22% VAT rate |
| `8` | 8% VAT rate |
| `7` | 7% VAT rate |
| `5` | 5% VAT rate |
| `4` | 4% VAT rate |
| `3` | 3% VAT rate |
| `0 KR` | 0% — domestic (excluding ICS and export) |
| `0 WDT` | 0% — intra-Community supply |
| `0 EX` | 0% — export |
| `zw` | Tax exempt |
| `oo` | Reverse charge (domestic only) |
| `np I` | Not subject to taxation — outside the country |
| `np II` | Services per Art. 100 sec. 1 item 4 |

- **Source:** FA(3) Information Sheet, §10.3; `semantic.ts` Rule 25, lines 748–793; confirmed in
  `error-codes.ts` `P12_ENUMERATION`
- **Verbatim (from `error-codes.ts`):** "P_12 must be one of: 23, 22, 8, 7, 5, 4, 3, 0 KR,
  0 WDT, 0 EX, zw, oo, np I, np II (§10.3)"

**Critical rules about specific values:**

- **`0` alone is INVALID** — must specify variant: `0 KR`, `0 WDT`, or `0 EX`
- **`oo` is for domestic reverse charge ONLY** — for foreign buyers, use `np I` or `np II`
- **Source (Appendix D, rule #18):** "'oo' is ONLY for domestic reverse charge. For invoices with
  foreign entities where the purchaser settles VAT in their country, use 'np I' or 'np II' — NOT
  'oo'."
- **Validator code:** `OO_RATE_FOREIGN_BUYER` (semantic.ts, Rule 26)
- **Note:** Values are **case-sensitive** — `ZW` instead of `zw` would be invalid, `NP I` instead
  of `np I` would be invalid.

**Common mistake patterns:**

1. Using `0` without variant: `<P_12>0</P_12>` — must be `0 KR`, `0 WDT`, or `0 EX`
2. Using percentage format: `<P_12>23%</P_12>` — just `23`
3. Using `25` or other non-standard rate: only the enumerated values are valid
4. Using `oo` for a foreign buyer — should be `np I` or `np II`
5. Case errors: `ZW` instead of `zw`, `NP I` instead of `np I`
6. Missing the space: `0KR` instead of `0 KR`, `npI` instead of `np I`

**Fix:**

```xml
<!-- ❌ WRONG — bare 0 -->
<P_12>0</P_12>

<!-- ✅ CORRECT — 0% domestic -->
<P_12>0 KR</P_12>

<!-- ❌ WRONG — percentage sign -->
<P_12>23%</P_12>

<!-- ✅ CORRECT -->
<P_12>23</P_12>

<!-- ❌ WRONG — 'oo' with foreign buyer -->
<P_12>oo</P_12>  <!-- ...when Podmiot2 is in Germany -->

<!-- ✅ CORRECT — for foreign buyer -->
<P_12>np I</P_12>

<!-- ❌ WRONG — missing space -->
<P_12>0KR</P_12>

<!-- ✅ CORRECT — with space -->
<P_12>0 KR</P_12>
```

---

### Error 9: KodKraju missing for foreign buyer

**Validator error:** XSD `REQUIRED_ELEMENT_MISSING` or semantic `NIP_IN_WRONG_FIELD`

**What it is:**

- **Fact:** The purchaser identification method in `Podmiot2/DaneIdentyfikacyjne` depends on whether
  the buyer is Polish, EU, or non-EU. Each option has specific required companion fields.
- **Source:** FA(3) Information Sheet, §6.2
- **Confidence:** HIGH

**Identification rules (from §6.2):**

| Buyer type | Identification fields | Required companions |
|-----------|----------------------|---------------------|
| Polish (with NIP) | `NIP` | None — NIP stands alone |
| EU (intra-Community) | `KodUE` + `NrVatUE` | `KodUE` = EU country code prefix (e.g. `DE`), `NrVatUE` = VAT number without prefix |
| Non-EU foreign | `KodKraju` + `NrID` | `KodKraju` = country code, `NrID` = tax identifier |
| No tax ID (consumer) | `BrakID` = `1` | None |

- **Verbatim (§6.2 for KodUE):** "VAT EU purchaser code (prefix). Required for: intra-Community
  supply of goods; provision of services per Art. 100 sec. 1 item 1; simplified triangular
  transaction."
- **Verbatim (§6.2 for NrVatUE):** "Purchaser's VAT identification number (without country code
  from KodUE)."

**Common mistake patterns:**

1. Using `NrVatUE` without `KodUE`: the EU country code prefix is required as a separate element
2. Using `NrID` without `KodKraju` for a non-EU buyer
3. Putting the country prefix inside the VAT number: `<NrVatUE>DE123456789</NrVatUE>` — the `DE`
   belongs in `<KodUE>DE</KodUE>`
4. Using `NIP` for a foreign buyer — `NIP` is only for Polish tax identification numbers
5. Putting a Polish NIP in `NrVatUE` or `NrID` — see Error 4

**Fix:**

```xml
<!-- ❌ WRONG — EU buyer, NrVatUE without KodUE -->
<DaneIdentyfikacyjne>
  <NrVatUE>DE123456789</NrVatUE>
  <Nazwa>Deutsche Firma GmbH</Nazwa>
</DaneIdentyfikacyjne>

<!-- ✅ CORRECT — EU buyer with separate KodUE -->
<DaneIdentyfikacyjne>
  <KodUE>DE</KodUE>
  <NrVatUE>123456789</NrVatUE>
  <Nazwa>Deutsche Firma GmbH</Nazwa>
</DaneIdentyfikacyjne>

<!-- ❌ WRONG — non-EU buyer, NrID without KodKraju -->
<DaneIdentyfikacyjne>
  <NrID>US12-3456789</NrID>
  <Nazwa>American Corp</Nazwa>
</DaneIdentyfikacyjne>

<!-- ✅ CORRECT — non-EU buyer with KodKraju -->
<DaneIdentyfikacyjne>
  <KodKraju>US</KodKraju>
  <NrID>12-3456789</NrID>
  <Nazwa>American Corp</Nazwa>
</DaneIdentyfikacyjne>
```

**Note:** `KodKraju` in `Podmiot2/DaneIdentyfikacyjne` is for tax ID context. `KodKraju` in
`Podmiot2/Adres` is for the address. These are separate fields in different parent elements.

---

### Error 10: P_13_x fields don't match P_15

**Validator error:** Semantic `TAX_CALCULATION_MISMATCH`

**What it is:**

- **Fact:** The tax summary fields (P_13_x for net base amounts, P_14_x for tax amounts) must be
  arithmetically consistent with P_15 (total amount due). Specifically:
  - `P_14_1` should equal `P_13_1 × 0.23` (for 23% rate)
  - `P_14_2` should equal `P_13_2 × 0.08` (for 8% rate)
  - `P_14_3` should equal `P_13_3 × 0.05` (for 5% rate)
  - `P_15` should equal sum of all `P_13_x` + all `P_14_x`
- **Source:** FA(3) Information Sheet, §9.3, §9.4; `semantic.ts` Rule 39
  (`checkTaxCalculations`), lines 1459–1695
- **Verbatim (§9.4 for P_15):** "Total amount due. For advance invoices = payment amount. For Art.
  106f sec. 3 invoices = remaining amount. For corrective invoices = correction amount."
- **Confidence:** HIGH

**Tax summary field mapping (from §9.3):**

| Net base (P_13_x) | Tax rate | Tax amount (P_14_x) | Tax in PLN if foreign (P_14_xW) |
|-------------------|----------|---------------------|-------------------------------|
| `P_13_1` | 23% (or 22%) | `P_14_1` | `P_14_1W` |
| `P_13_2` | 8% (or 7%) | `P_14_2` | `P_14_2W` |
| `P_13_3` | 5% | `P_14_3` | `P_14_3W` |
| `P_13_4` | Lump sum taxis | `P_14_4` | `P_14_4W` |
| `P_13_5` | EU OSS | `P_14_5` | `P_14_5W` |
| `P_13_6_1` through `P_13_11` | Various (0%, exempt, reverse charge, margin) | No separate P_14_x | — |

**P_15 formula:**
```
P_15 = Σ(P_13_1..P_13_11) + Σ(P_14_1..P_14_5)
```

**Tolerance:** The validator allows a tolerance of **0.01** (1 cent/grosz) for rounding differences.

- **Source:** `semantic.ts` line 1674: `Math.abs(actualTotal - expectedTotal) > 0.01`

**Common mistake patterns:**

1. Rounding tax before summing: `P_13_1 = 99.99`, tax at 23% = 22.9977 → must round to `23.00`,
   not `22.99`
2. Forgetting to include P_13_6 through P_13_11 in the P_15 total (these fields don't have matching
   P_14_x fields, but their base amounts still contribute to P_15)
3. Putting gross amount in P_15 but net in P_13_x without matching P_14_x
4. Corrective invoice: values should reflect the **difference**, not the new totals (except when
   corrective invoices are excluded from this calculation check)

**Fix:**

```xml
<!-- ❌ WRONG — P_15 doesn't match sum -->
<P_13_1>1000.00</P_13_1>  <!-- net at 23% -->
<P_14_1>230.00</P_14_1>   <!-- tax at 23% -->
<P_15>1200.00</P_15>       <!-- should be 1230.00! -->

<!-- ✅ CORRECT -->
<P_13_1>1000.00</P_13_1>
<P_14_1>230.00</P_14_1>
<P_15>1230.00</P_15>

<!-- Example with mixed rates: -->
<P_13_1>100.00</P_13_1>   <!-- 23% base -->
<P_14_1>23.00</P_14_1>    <!-- 23% tax -->
<P_13_2>200.00</P_13_2>   <!-- 8% base -->
<P_14_2>16.00</P_14_2>    <!-- 8% tax -->
<P_15>339.00</P_15>        <!-- 100 + 23 + 200 + 16 = 339.00 -->
```

**Note:** For corrective invoices (`RodzajFaktury` = `KOR`, `KOR_ZAL`, `KOR_ROZ`), the validator
skips arithmetic checks because corrective invoices contain **difference** amounts, not absolute
totals. This is by design.

---

### Error 11: Adnotacje missing required fields

**Validator error:** Semantic `ADNOTACJE_P16_MISSING`, `ADNOTACJE_P17_MISSING`,
`ADNOTACJE_P18_MISSING`, `ADNOTACJE_P18A_MISSING`, `ADNOTACJE_ZWOLNIENIE_MISSING`,
`ADNOTACJE_NST_MISSING`, `ADNOTACJE_P23_MISSING`, `ADNOTACJE_PMARZY_MISSING`

**What it is:**

- **Fact:** ALL eight sub-elements within `Adnotacje` are **mandatory** — even when their value is
  "no, this doesn't apply" (value `2` or the negative flag `N`). Many developers omit them thinking
  they're optional because they don't apply to their invoice. They are not optional.
- **Source:** FA(3) Information Sheet, §9.6
- **Confidence:** HIGH

**Complete mandatory Adnotacje structure (from §9.6):**

| Field | Mandatory | Values | "Default negative" value |
|-------|-----------|--------|--------------------------|
| `P_16` | YES | `1` = cash accounting / `2` = no | `2` |
| `P_17` | YES | `1` = self-billing / `2` = no | `2` |
| `P_18` | YES | `1` = reverse charge / `2` = no | `2` |
| `P_18A` | YES | `1` = split payment mechanism / `2` = no | `2` |
| `Zwolnienie` | YES | Contains `P_19`/`P_19N` choice | `<Zwolnienie><P_19N>1</P_19N></Zwolnienie>` |
| `NoweSrodkiTransportu` | YES | Contains `P_22`/`P_22N` choice | `<NoweSrodkiTransportu><P_22N>1</P_22N></NoweSrodkiTransportu>` |
| `P_23` | YES | `1` = triangular transaction / `2` = no | `2` |
| `PMarzy` | YES | Contains `P_PMarzy`/`P_PMarzyN` choice | `<PMarzy><P_PMarzyN>1</P_PMarzyN></PMarzy>` |

**Selection-type logic for complex sub-elements (from §9.6):**

- **Zwolnienie:** Exactly one of `P_19` or `P_19N` must be `1`. If `P_19` = `1`, exactly one of
  `P_19A`, `P_19B`, `P_19C` must also be provided (the legal basis for exemption). If `P_19N` = `1`,
  the other fields must be absent.
- **NoweSrodkiTransportu:** Exactly one of `P_22` or `P_22N` must be `1`.
- **PMarzy:** Exactly one of `P_PMarzy` or `P_PMarzyN` must be `1`. If `P_PMarzy` = `1`, exactly
  one of `P_PMarzy_2`, `P_PMarzy_3_1`, `P_PMarzy_3_2`, `P_PMarzy_3_3` must be `1`.

- **Validator codes:** `ZWOLNIENIE_LOGIC`, `NST_LOGIC`, `PMARZY_LOGIC`

**Common mistake patterns:**

1. Omitting `Adnotacje` entirely — it's mandatory within `Fa`
2. Including only `P_16` and `P_17`, forgetting the rest
3. Missing the complex sub-elements (`Zwolnienie`, `NoweSrodkiTransportu`, `PMarzy`) because they
   "don't apply" — you still need to include them with the negative flag
4. Both `P_19` and `P_19N` set to `1` (exactly one must be `1`)
5. `P_19` = `1` but no legal basis (P_19A/B/C) provided

**Fix — minimal "nothing special" Adnotacje block:**

```xml
<!-- ❌ WRONG — incomplete Adnotacje -->
<Adnotacje>
  <P_16>2</P_16>
  <P_17>2</P_17>
</Adnotacje>

<!-- ✅ CORRECT — complete Adnotacje for a standard invoice with no special conditions -->
<Adnotacje>
  <P_16>2</P_16>
  <P_17>2</P_17>
  <P_18>2</P_18>
  <P_18A>2</P_18A>
  <Zwolnienie><P_19N>1</P_19N></Zwolnienie>
  <NoweSrodkiTransportu><P_22N>1</P_22N></NoweSrodkiTransportu>
  <P_23>2</P_23>
  <PMarzy><P_PMarzyN>1</P_PMarzyN></PMarzy>
</Adnotacje>
```

**Note on element order:** Within `Adnotacje`, the elements must follow the xs:sequence order shown
above: P_16 → P_17 → P_18 → P_18A → Zwolnienie → NoweSrodkiTransportu → P_23 → PMarzy.

---

### Error 12: OkresFa vs P_6 vs P_6A confusion

**Validator error:** Semantic `P6_P6A_MUTUAL_EXCLUSION`

**What it is:**

- **Fact:** Three date-related concepts are commonly confused: `P_6` (common delivery date), `P_6A`
  (per-line delivery date), and `OkresFa` (billing period). `P_6` and `P_6A` are **mutually
  exclusive**. `OkresFa` is an independent concept for periodic invoices.
- **Source:** FA(3) Information Sheet, §9.2 (P_6, OkresFa), §10.2 (P_6A), Appendix D #8 and #9
- **Verbatim (§9.2 for P_6):** "Date of delivery/completion or date of payment receipt (Art. 106b
  sec. 1(4)). Completed when the same for ALL invoice items. If dates differ per item, use P_6A in
  FaWiersz instead."
- **Verbatim (§10.2 for P_6A):** "Date of delivery/payment per item (when dates differ per item).
  When common date for all lines → use P_6 in Fa instead."
- **Verbatim (Appendix D #8):** "P_6 vs P_6A: Mutually exclusive — P_6 for common date, P_6A per
  line item"
- **Verbatim (Appendix D #9):** "OkresFa: Only for Art. 19a sec. 3/4/5(4) — recurring/contractual
  billing cycles"
- **Confidence:** HIGH

**The three concepts explained:**

| Field | Location | Purpose | When to use |
|-------|----------|---------|------------|
| `P_6` | `Fa` (header-level) | Single delivery/completion date for ALL line items | All items share the same delivery date |
| `P_6A` | `FaWiersz` (per-line) | Delivery/completion date for THIS specific line item | Different items have different delivery dates |
| `OkresFa` | `Fa` (header-level) | Billing period (`P_6_Od` start + `P_6_Do` end) | Periodic invoices per Art. 19a sec. 3/4/5(4) — e.g. monthly subscription billing |

- **Source:** FA(3) Information Sheet, §9.2 (OkresFa: "Period to which the invoice relates — for
  cases in Art. 19a sec. 3 (first sentence), sec. 4 and sec. 5 item 4. Contains P_6_Od (start) and
  P_6_Do (end), both YYYY-MM-DD.")

**Mutual exclusion rule:**

- `P_6` (in `Fa`) and `P_6A` (in `FaWiersz`) **cannot both be present** in the same invoice.
- `OkresFa` is independent — it can coexist with either `P_6` or `P_6A` (or neither).
- `P_1` (invoice issue date) is always mandatory and separate from all three.

- **Validator code:** `P6_P6A_MUTUAL_EXCLUSION` (semantic.ts, Rule 10, §9.2/§10.2/Appendix D #8)

**Common mistake patterns:**

1. Setting both `P_6` in `Fa` and `P_6A` in `FaWiersz` — pick one approach
2. Confusing `P_6` with `P_1` — `P_1` is the invoice issue date, `P_6` is the delivery/completion
   date; they are often the same but serve different legal purposes
3. Using `OkresFa` (P_6_Od/P_6_Do) when a single delivery date `P_6` is sufficient — `OkresFa` is
   only for recurring/periodic billing scenarios
4. Putting `P_6A` in `Fa` instead of `FaWiersz` — `P_6A` belongs at the line item level

**Fix:**

```xml
<!-- ❌ WRONG — P_6 AND P_6A both present -->
<Fa>
  ...
  <P_6>2026-09-15</P_6>
  ...
</Fa>
<FaWiersz>
  <NrWierszaFa>1</NrWierszaFa>
  <P_6A>2026-09-14</P_6A>
  ...
</FaWiersz>

<!-- ✅ OPTION A — single common delivery date -->
<Fa>
  ...
  <P_6>2026-09-15</P_6>
  ...
</Fa>
<FaWiersz>
  <NrWierszaFa>1</NrWierszaFa>
  <!-- NO P_6A here -->
  ...
</FaWiersz>

<!-- ✅ OPTION B — per-line delivery dates (no P_6 in Fa) -->
<Fa>
  ...
  <!-- NO P_6 here -->
  ...
</Fa>
<FaWiersz>
  <NrWierszaFa>1</NrWierszaFa>
  <P_6A>2026-09-14</P_6A>
  ...
</FaWiersz>
<FaWiersz>
  <NrWierszaFa>2</NrWierszaFa>
  <P_6A>2026-09-15</P_6A>
  ...
</FaWiersz>

<!-- ✅ OkresFa for periodic billing (independent of P_6/P_6A) -->
<Fa>
  ...
  <OkresFa>
    <P_6_Od>2026-09-01</P_6_Od>
    <P_6_Do>2026-09-30</P_6_Do>
  </OkresFa>
  ...
</Fa>
```

---

## Bonus: Additional Common Errors (not in the top 12 but frequent)

These are additional errors the Copywriter may want to mention briefly or in a "see also" section:

### GTU Format Error

- **Validator code:** `GTU_FORMAT`
- **Source:** FA(3) Information Sheet, §10.4
- **Fact:** GTU must be an element **value**, not an element **name**. Pattern: `GTU_01` through
  `GTU_13` (with underscore and leading zero).
- **Common mistake:** `<GTU_12>1</GTU_12>` (FA(2) style — element name) vs. correct FA(3):
  `<GTU>GTU_12</GTU>` (element value).
- **Confidence:** HIGH

### WalutaUmowna = PLN

- **Validator code:** `WALUTA_UMOWNA_PLN`
- **Source:** FA(3) Information Sheet, §13.1, Appendix D #10
- **Fact:** `WalutaUmowna` (contract currency) must NEVER be `PLN`. If the invoice is in PLN, do
  not use the `WarunkiTransakcji/WalutaUmowna` field at all.
- **Confidence:** HIGH

### Amount field with thousand separators

- **Validator code:** `AMOUNT_NO_SEPARATORS`
- **Source:** FA(3) Information Sheet, §2.5, Appendix D #13
- **Fact:** Amount fields must not contain spaces, commas, or any non-numeric characters except
  minus and decimal point. `1 234.56` and `1,234.56` are both invalid; correct is `1234.56`.
- **Confidence:** HIGH

---

## Unsettled Questions

> These are areas where the MF source corpus is unclear, or where the Copywriter should exercise
> caution.

1. **XSD error message exact wording** — The error messages shown by KSeF itself upon rejection are
   not documented in our corpus. The messages from our validator (ksefuj.to) may differ in wording
   from what the MF system returns. The Copywriter should not claim "KSeF will show you this exact
   message" — say "your validator will report something like..." instead.

2. **P_15 validation tolerance at KSeF** — Our validator uses 0.01 (1 grosz) tolerance for tax
   calculations. Whether KSeF production environment uses the same tolerance is not confirmed in the
   Broszura. The Broszura describes what the values should be, but doesn't specify a tolerance.
   Confidence: MEDIUM.

3. **Whether KSeF rejects on semantic errors or just XSD errors** — The Broszura defines the rules,
   and our validator implements them as semantic checks beyond XSD. Whether KSeF itself enforces all
   38 semantic rules on submission (vs. just XSD) is not confirmed in the corpus. The Copywriter
   should say "these rules are defined by MF" rather than "KSeF will reject your invoice for this."

4. **Exact behavior for missing P_6 and P_6A** — The Broszura says they are "conditional" but
   doesn't explicitly state what happens when both are absent. In practice, an invoice with neither
   P_6 nor P_6A would pass XSD validation (both are optional at XSD level), but might be questioned
   legally if a delivery date is required by Art. 106e.

---

## Suggested Sources Section

For the article's "Źródła" footer:

1. **Broszura informacyjna FA(3)** — Ministerstwo Finansów, marzec 2026 —
   https://ksef.podatki.gov.pl/media/0ivha0ua/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf
2. **FA(3) XSD Schema** — https://crd.gov.pl/wzor/2025/06/25/13775/
3. **Ustawa z dnia 11 marca 2004 r. o podatku od towarów i usług** — Dz. U. z 2025 r., poz. 775
   ze zm. — https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20250000775
4. **ksefuj.to** — Bezpłatny walidator FA(3) XML — https://ksefuj.to

---

## Warning: Common Misconceptions

1. **"Mój XML jest poprawny, bo się otwiera w przeglądarce"** — WRONG. A well-formed XML document
   is not necessarily valid against the FA(3) XSD schema. The browser only checks XML syntax (proper
   tags, encoding), not schema compliance. You need an XSD validator.

2. **"FA(2) i FA(3) to ten sam format"** — WRONG. FA(3) introduced mandatory fields not present in
   FA(2): JST, GV in Podmiot2; restructured Adnotacje; new RodzajFaktury values. An FA(2) document
   will fail FA(3) validation. Source: FA(3) Information Sheet, §1.2: "FA(2) was used until 31
   January 2026."

3. **"Stawka VAT 0 to po prostu `0`"** — WRONG. The value `0` alone is not in the P_12 enumeration.
   You must specify the variant: `0 KR` (domestic), `0 WDT` (intra-Community supply), or `0 EX`
   (export). Source: §10.3.

4. **"Adnotacje to opcjonalne notatki"** — WRONG. Despite the name ("notes"), the Adnotacje section
   and ALL of its sub-elements are **mandatory**. Every invoice must include all 8 fields/sub-elements,
   even if every value is the "negative" default. Source: §9.6.

5. **"GTU wpisuję tak jak w JPK_VAT — jako osobny element `<GTU_12>1</GTU_12>`"** — WRONG for
   FA(3). In FA(3), GTU is a single element with the code as its value: `<GTU>GTU_12</GTU>`. The
   old JPK_VAT style of using GTU codes as element names does not apply to FA(3). Source: §10.4.

6. **"P_6 to data wystawienia faktury"** — WRONG. P_6 is the delivery/completion date. P_1 is the
   invoice issue date. They may be the same date, but they are different fields with different
   legal meanings. Source: §9.2.

---

## Freshness Tracker (date-sensitive claims)

| Claim | Expires / Review trigger | Priority |
|-------|--------------------------|----------|
| FA(3) namespace URI `http://crd.gov.pl/wzor/2025/06/25/13775/` | If MF publishes FA(4) or new schema version | HIGH |
| `wersjaSchemy` = `1-0E` | If MF publishes updated schema edition | HIGH |
| FA(2) namespace as "outdated" example | Already expired (31 Jan 2026) — safe to cite as expired | LOW |
| Broszura edition = March 2026 | Review if MF publishes updated edition | MEDIUM |
| P_12 enumeration values | If new tax rates are introduced or removed | MEDIUM |
| KodFormularza value `FA (3)` with space | If format convention changes in future schema | LOW |

---

## Cross-References for the Copywriter

- **Existing brief** `ksef-dla-jdg.md` covers KSeF basics for JDG freelancers — this new article is
  more technical and targets people who already know they need KSeF, but are struggling with XML
  validation errors.
- **CTA:** Every error section should end with a note that ksefuj.to catches this error and shows
  a clear fix suggestion. Emphasize: "Waliduj przed wysłaniem — ksefuj.to jest bezpłatny."
- **Validator error codes:** The Copywriter can reference our error code names (e.g.,
  `P12_ENUMERATION`) in technical sections — they match what users see in the validator UI.
- **Test file examples:** The `semantic.test.ts` file contains working XML snippets for every error
  — the Copywriter can adapt these as before/after examples.
