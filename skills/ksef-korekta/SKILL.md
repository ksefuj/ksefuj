---
name: ksef-korekta
description: >
  Generate corrective FA(3) invoices (faktury korygujące) for KSeF. Use this skill when the user has
  a faulty invoice and needs to produce a correction (KOR, KOR_ZAL, KOR_ROZ) or a "correction to
  zero" for wrong-buyer scenarios. The skill works as an interactive wizard: it accepts the original
  invoice (XML, pasted data, or description), identifies what needs correcting, asks targeted
  questions to fill any gaps, and produces a complete, validator-passing corrective invoice XML.
---

# KSeF Corrective Invoice — Interactive Wizard

> **Authority:** Podręcznik KSeF 2.0, Cz. II, §2.13 (Faktury korygujące); FA(3) Information Sheet.
>
> **Bundled references (self-contained for standalone use):**
>
> - `references/invoice-base.md` — FA(3) skeleton: Podmiot patterns, Adnotacje, P_12 rates, field order
> - `references/korekty-procedury.md` — MF procedural rules for corrections (from Podręcznik §2.13)
>
> **In-repo canonical sources (not bundled — for maintainers):**
>
> - `packages/validator/docs/fa3-information-sheet.md` — full schema rules
> - `docs/knowledge-base/briefs/podrecznik-ksef-20-czesc-ii.md` — full Podręcznik Part II
>
> **Validator:** Generated XML must pass `@ksefuj/validator` (XSD + semantic rules). See the
> [ksef-fa3 skill](../ksef-fa3/SKILL.md) for the full semantic rules reference.

---

## When to Use This Skill

- User says "I need to correct an invoice" / "faktura korygująca" / "correction"
- User provides a faulty invoice and wants to fix it
- User needs to "zero out" an invoice sent to the wrong buyer
- User asks about KOR, KOR_ZAL, or KOR_ROZ invoice types

---

## Interactive Wizard Flow

This skill works as a **step-by-step wizard**. Never insert TODOs or placeholders into the XML.
Instead, ask the user for every piece of missing data before generating the final output.

### Step 1: Accept the Original Invoice

Ask the user to provide the original (faulty) invoice in one of these forms:

- **XML file** — full FA(3) XML of the original invoice
- **Pasted XML** — XML content pasted into the chat
- **Key data** — at minimum: seller NIP, buyer NIP, invoice number (P_2), issue date (P_1),
  original amounts (P_13_x, P_14_x, P_15), line items, and KSeF number (if submitted to KSeF)

If the user provides a file path, read it. If they describe the invoice verbally, extract all
available data and proceed to Step 2 to fill gaps.

### Step 2: Identify Correction Type

Based on what the user wants to fix, determine the correction scenario:

| Scenario | RodzajFaktury | Key Rule |
|---|---|---|
| Fix amounts, quantities, prices, descriptions | `KOR` | Amounts are **deltas** (differences) |
| Fix advance invoice (ZAL) | `KOR_ZAL` | Delta amounts + Zamowienie before/after |
| Fix settlement invoice (ROZ) | `KOR_ROZ` | Delta amounts + FakturaZaliczkowa reference |
| Wrong buyer NIP | `KOR` (to zero) + new `VAT` | Cannot change NIP — must zero + reissue |
| Wrong seller data (name, address) | `KOR` with `Podmiot1K` | Old data in Podmiot1K, correct in Podmiot1 |
| Wrong buyer data (name, address — NOT NIP) | `KOR` with `Podmiot2K` | Old data in Podmiot2K, correct in Podmiot2 |

**Ask the user:**

> What needs to be corrected? (e.g., wrong price, wrong quantity, wrong buyer name, wrong buyer
> NIP, add missing line, remove a line, change VAT rate)

### Step 3: Gather Missing Data

Based on the correction type, ask ONLY for data you don't already have. Be specific:

**For amount/line corrections:**
- Which line(s) need correcting?
- What are the correct values? (new quantity, new unit price, or new total)
- Reason for correction? (optional but recommended — fills `PrzyczynaKorekty`)

**For wrong-buyer-NIP scenario:**
- Confirm you'll generate TWO invoices: correction-to-zero + new invoice with correct NIP
- What is the correct buyer NIP?
- What is the correct buyer name and address?

**For seller/buyer data corrections (not NIP):**
- What are the correct data values?

**For all corrections, confirm:**
- Was the original invoice submitted to KSeF? (determines `NrKSeF` vs `NrKSeFN`)
- If yes: what is the KSeF number? (`NrKSeFFaKorygowanej`)
- What date should the correction have? (P_1 — defaults to today)
- What correction invoice number should it have? (P_2)
- When should the correction take effect? (TypKorekty: 1=original date, 2=correction date, 3=other)

### Step 4: Calculate Deltas

For amount corrections, calculate the differences:

```
Delta P_13_x = new_P_13_x - original_P_13_x
Delta P_14_x = new_P_14_x - original_P_14_x
Delta P_15   = new_P_15   - original_P_15
```

For "correction to zero":
```
Delta P_13_x = -original_P_13_x
Delta P_14_x = -original_P_14_x
Delta P_15   = -original_P_15
```

### Step 5: Generate XML

Produce the complete corrective invoice XML. Follow these rules strictly:

---

## XML Structure Rules

### Required Elements (all corrective types)

```xml
<RodzajFaktury>KOR</RodzajFaktury>
<PrzyczynaKorekty>...</PrzyczynaKorekty>  <!-- optional but recommended -->
<TypKorekty>2</TypKorekty>  <!-- 1=original date, 2=correction date, 3=other -->
<DaneFaKorygowanej>
  <DataWystFaKorygowanej>2026-03-01</DataWystFaKorygowanej>
  <NrFaKorygowanej>FV/001/03/2026</NrFaKorygowanej>
  <!-- Original was in KSeF: -->
  <NrKSeF>1</NrKSeF>
  <NrKSeFFaKorygowanej>9999999999-20260301-XXXXXX-YYYYYY-ZZ</NrKSeFFaKorygowanej>
  <!-- OR original was NOT in KSeF: -->
  <!-- <NrKSeFN>1</NrKSeFN> -->
</DaneFaKorygowanej>
```

> **Rule R29:** Exactly one of `NrKSeF` or `NrKSeFN` must be set to `1`. When `NrKSeF=1`,
> `NrKSeFFaKorygowanej` is required. When `NrKSeFN=1`, `NrKSeFFaKorygowanej` must be absent.

### Delta Amounts

P_13_x, P_14_x, P_15 contain the **difference**, not the corrected total.

```xml
<!-- Correction in minus: reducing net by 100 PLN at 23% -->
<P_13_1>-100.00</P_13_1>
<P_14_1>-23.00</P_14_1>
<P_15>-123.00</P_15>

<!-- Correction in plus: increasing net by 50 PLN at 23% -->
<P_13_1>50.00</P_13_1>
<P_14_1>11.50</P_14_1>
<P_15>61.50</P_15>
```

### FaWiersz Correction Methods

**Method 1: Delta (difference only)** — simplest, for simple amount changes:

```xml
<FaWiersz>
  <NrWierszaFa>1</NrWierszaFa>
  <P_7>Product A</P_7>
  <P_8B>-1</P_8B>
  <P_9A>90.00</P_9A>
  <P_11>-90.00</P_11>
  <P_12>23</P_12>
</FaWiersz>
```

**Method 2: Before/After with StanPrzed** — recommended when changing VAT rate or currency:

```xml
<!-- Before state -->
<FaWiersz>
  <NrWierszaFa>1</NrWierszaFa>
  <P_7>Product A</P_7>
  <P_8B>3</P_8B>
  <P_9A>90.00</P_9A>
  <P_11>270.00</P_11>
  <P_12>23</P_12>
  <StanPrzed>1</StanPrzed>
</FaWiersz>
<!-- After state (no StanPrzed) -->
<FaWiersz>
  <NrWierszaFa>1</NrWierszaFa>
  <P_7>Product A</P_7>
  <P_8B>2</P_8B>
  <P_9A>90.00</P_9A>
  <P_11>180.00</P_11>
  <P_12>23</P_12>
</FaWiersz>
```

> When using StanPrzed, duplicate NrWierszaFa values are expected. Validator rules R41
> (DUPLICATE_LINE_NUMBERS) and R42 (NEGATIVE_QUANTITY_NOT_ALLOWED) are skipped for corrective types.

**Method 3: Storno** — like StanPrzed but without the flag, using negative values:

```xml
<!-- Reversal of original (negative quantity) -->
<FaWiersz>
  <NrWierszaFa>1</NrWierszaFa>
  <P_7>Product A</P_7>
  <P_8B>-3</P_8B>
  <P_9A>90.00</P_9A>
  <P_11>-270.00</P_11>
  <P_12>23</P_12>
</FaWiersz>
<!-- Corrected state (positive) -->
<FaWiersz>
  <NrWierszaFa>2</NrWierszaFa>
  <P_7>Product A</P_7>
  <P_8B>2</P_8B>
  <P_9A>90.00</P_9A>
  <P_11>180.00</P_11>
  <P_12>23</P_12>
</FaWiersz>
```

### Wrong Buyer NIP — Two-Document Flow

A wrong NIP **cannot** be corrected via a standard correction. Generate TWO documents:

**Document 1: Correction to Zero**

```xml
<!-- Podmiot2 = the WRONG buyer (same as original) -->
<Podmiot2>
  <DaneIdentyfikacyjne>
    <NIP>WRONG_NIP</NIP>
    <Nazwa>Wrong Buyer Name</Nazwa>
  </DaneIdentyfikacyjne>
  ...
</Podmiot2>
<!-- All amounts negated -->
<P_13_1>-1000.00</P_13_1>
<P_14_1>-230.00</P_14_1>
<P_15>-1230.00</P_15>
<RodzajFaktury>KOR</RodzajFaktury>
<PrzyczynaKorekty>Błędny NIP nabywcy</PrzyczynaKorekty>
```

**Document 2: New Invoice with Correct NIP**

```xml
<!-- Podmiot2 = the CORRECT buyer -->
<Podmiot2>
  <DaneIdentyfikacyjne>
    <NIP>CORRECT_NIP</NIP>
    <Nazwa>Correct Buyer Name</Nazwa>
  </DaneIdentyfikacyjne>
  ...
</Podmiot2>
<RodzajFaktury>VAT</RodzajFaktury>
<!-- Full original amounts (positive) -->
```

### Podmiot1K and Podmiot2K — Data Corrections

When correcting seller or buyer data (not NIP), use the K-variant elements:

**Podmiot1K** — old seller data from the original invoice:

```xml
<Podmiot1K>
  <DaneIdentyfikacyjne>
    <NIP>1234567890</NIP>
    <Nazwa>Old Company Name</Nazwa>
  </DaneIdentyfikacyjne>
  <Adres>
    <KodKraju>PL</KodKraju>
    <AdresL1>Old Address</AdresL1>
  </Adres>
</Podmiot1K>
```

**Podmiot2K** — old buyer data from the original invoice:

```xml
<Podmiot2K>
  <DaneIdentyfikacyjne>
    <NIP>0987654321</NIP>
    <Nazwa>Old Buyer Name</Nazwa>
  </DaneIdentyfikacyjne>
  <Adres>
    <KodKraju>PL</KodKraju>
    <AdresL1>Old Buyer Address</AdresL1>
  </Adres>
  <IDNabywcy>buyer-001</IDNabywcy>  <!-- links to Podmiot2, max 32 chars -->
</Podmiot2K>
```

When `Podmiot2K` is present, `Podmiot2` must also include `IDNabywcy` with the same value.

### Batch Corrections (Korekta Zbiorcza)

For corrections covering multiple original invoices (e.g., quarterly rebate):

```xml
<RodzajFaktury>KOR</RodzajFaktury>
<PrzyczynaKorekty>Opust za I kwartał 2026</PrzyczynaKorekty>
<DaneFaKorygowanej>
  <DataWystFaKorygowanej>2026-01-15</DataWystFaKorygowanej>
  <NrFaKorygowanej>FV/001/01/2026</NrFaKorygowanej>
  <NrKSeF>1</NrKSeF>
  <NrKSeFFaKorygowanej>...</NrKSeFFaKorygowanej>
</DaneFaKorygowanej>
<DaneFaKorygowanej>
  <DataWystFaKorygowanej>2026-02-10</DataWystFaKorygowanej>
  <NrFaKorygowanej>FV/005/02/2026</NrFaKorygowanej>
  <NrKSeF>1</NrKSeF>
  <NrKSeFFaKorygowanej>...</NrKSeFFaKorygowanej>
</DaneFaKorygowanej>
<OkresFaKorygowanej>styczeń–marzec 2026</OkresFaKorygowanej>
```

`DaneFaKorygowanej` can appear up to 50,000 times. `OkresFaKorygowanej` is a free-text period
description.

When the correction covers **all** deliveries in the period, `FaWiersz` can be omitted.
When it covers only **some** items, include `FaWiersz` with `P_7` naming the corrected goods/services.

### KOR_ZAL — Corrective Advance Invoice

Same as KOR, plus:
- `KursWalutyZ` at `Fa` level is valid (for foreign currency advances)
- `P_15ZK` — advance amount before correction
- If correcting order details: include `Zamowienie` with before/after state
- `WartoscZamowienia` in correction = correct order value after correction

### KOR_ROZ — Corrective Settlement Invoice

Same as KOR, plus:
- `P_15ZK` — settlement amount before correction
- `FakturaZaliczkowa` — references to the advance invoice(s) remain as in the original ROZ

---

## Chaining Multiple Corrections

When correcting an already-corrected invoice:

1. `DaneFaKorygowanej` always references the **original** invoice (not the previous correction)
2. Deltas are relative to the **current state** (original + all previous corrections)
3. Each correction is independent — the system doesn't track correction chains

> Example: Original = 1000 net → Correction 1 = -100 (to 900) → Correction 2 = -200 (to 700)
> Correction 2's `DaneFaKorygowanej` references the **original**, and its `P_13_1 = -200`.

---

## Validation

After generating XML, validate it:

```bash
npx @ksefuj/validator correction.xml
```

Key rules that apply to corrective invoices:
- **R11** (RODZAJ_FAKTURY_SECTIONS): KOR requires `DaneFaKorygowanej`
- **R29** (KOR_NRKSEF_CONSISTENCY): NrKSeF/NrKSeFN mutual exclusion
- **R30** (REVERSE_CHARGE_CONSISTENCY): P_18 must match line-level rate codes
- **R39** (TAX_CALCULATION_MISMATCH): **skipped** for corrective types (deltas don't follow normal math)
- **R41** (DUPLICATE_LINE_NUMBERS): **skipped** for corrective types (StanPrzed duplicates expected)
- **R42** (NEGATIVE_QUANTITY_NOT_ALLOWED): **skipped** for corrective types

---

## Important Rules

1. **Never change buyer NIP via correction.** Always zero + reissue.
2. **Amounts are always deltas.** Not the corrected totals.
3. **Noty korygujące no longer exist** since Feb 1, 2026. All corrections go through corrective invoices.
4. **Once in KSeF, invoices cannot be edited or deleted.** They stay for 10 years.
5. **Test invoices sent to production are real invoices.** If sent by mistake, immediately correct to zero.
6. **`DaneFaKorygowanej` always points to the original**, not to previous corrections.
7. **Ask, don't guess.** If data is ambiguous or missing, ask the user. Never insert placeholder values.
