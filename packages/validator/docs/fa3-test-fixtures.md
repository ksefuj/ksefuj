# FA(3) Validator Test Fixtures — Claude Code Prompt

## Context

You are enhancing the test suite for `@ksefuj/validator` in the monorepo at `packages/validator/`.
The validator validates KSeF FA(3) XML invoices using:

1. **XSD validation** via libxml2-wasm (already working)
2. **Semantic validation** via `src/semantic.ts` (rules being expanded)

Test runner: **vitest** (`pnpm test` from `packages/validator/`).

The FA(3) XML namespace is `http://crd.gov.pl/wzor/2025/06/25/13775/`. The root element is
`<Faktura>` with `xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/"`.

All test fixtures below come from the **official Ministry of Finance Information Sheet on FA(3)**
(March 2026 edition). This is the canonical source of truth.

## Instructions

1. Read the existing test files in `packages/validator/src/__tests__/` or
   `packages/validator/tests/` to understand the current test patterns.
2. Create or extend test files following the existing patterns.
3. For each fixture below, create both a **valid XML fragment** test and, where indicated, a
   **negative test** (invalid XML that should trigger a specific error).
4. Use a helper function to wrap fragments into a minimal valid FA(3) document. Name it something
   like `wrapInFaktura(partialXml)` or reuse the existing one if present.
5. Group tests by the section headings below.
6. Every test name should reference the example number from the information sheet (e.g.,
   `"Example 1: Podmiot1 — ICS seller with liquidation status"`).

## Minimal Valid FA(3) Skeleton

Use this as a base for wrapping test fragments. Fields marked `{INJECT_*}` are the slots where
fixture data goes:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/">
  <Naglowek>
    <KodFormularza kodSystemowy="FA (3)" wersjaSchemy="1-0E">FA</KodFormularza>
    <WariantFormularza>3</WariantFormularza>
    <DataWytworzeniaFa>2026-09-15T10:00:00Z</DataWytworzeniaFa>
  </Naglowek>
  {INJECT_PODMIOT1}
  {INJECT_PODMIOT2}
  {INJECT_PODMIOT3}
  {INJECT_PODMIOT_UPOWAZNIONY}
  <Fa>
    <KodWaluty>PLN</KodWaluty>
    <P_1>2026-09-15</P_1>
    <P_2>FV/001/09/2026</P_2>
    {INJECT_FA_FIELDS}
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
    {INJECT_FA_WIERSZ}
  </Fa>
</Faktura>
```

---

## PART 1: Podmiot1 (Seller) Tests

### Example 1 — ICS seller with liquidation status and correspondence address

**Scenario:** XXX Sp. z o.o. in liquidation, registered for intra-Community transactions (PL
9999999999), provides intra-Community supply of goods. Includes phone, email, correspondence
address.

**Expected Podmiot1 XML:**

```xml
<Podmiot1>
  <PrefiksPodatnika>PL</PrefiksPodatnika>
  <DaneIdentyfikacyjne>
    <NIP>9999999999</NIP>
    <Nazwa>XXX Sp. z o.o. in liquidation</Nazwa>
  </DaneIdentyfikacyjne>
  <Adres>
    <KodKraju>PL</KodKraju>
    <AdresL1>ul. Błękitna 16/3, 55-555 Kraków</AdresL1>
  </Adres>
  <AdresKoresp>
    <KodKraju>PL</KodKraju>
    <AdresL1>ul. Turkusowa 12, 55-555 Kraków</AdresL1>
  </AdresKoresp>
  <DaneKontaktowe>
    <Email>podatnik@xyz.pl</Email>
    <Telefon>801055055</Telefon>
  </DaneKontaktowe>
  <StatusInfoPodatnika>1</StatusInfoPodatnika>
</Podmiot1>
```

**Validations to assert (positive):**

- PrefiksPodatnika = "PL" is valid for ICS
- StatusInfoPodatnika = "1" (liquidation) is valid
- NIP is 10 digits, no spaces
- AdresKoresp is correctly structured as optional element

**Negative test — Missing NIP in Podmiot1:**

```xml
<Podmiot1>
  <DaneIdentyfikacyjne>
    <Nazwa>XXX Sp. z o.o.</Nazwa>
  </DaneIdentyfikacyjne>
  <Adres>
    <KodKraju>PL</KodKraju>
    <AdresL1>ul. Błękitna 16/3</AdresL1>
  </Adres>
</Podmiot1>
```

**Expected:** XSD error — NIP is mandatory in Podmiot1/DaneIdentyfikacyjne.

---

## PART 2: Podmiot2 (Purchaser) Tests

### Example 2 — Simplified invoice (Art. 106e sec. 5 item 3), NIP-only purchaser

**Scenario:** Invoice ≤ PLN 450 gross. Only NIP required for purchaser. Address not required.
Customer number included.

**Expected Podmiot2 XML:**

```xml
<Podmiot2>
  <DaneIdentyfikacyjne>
    <NIP>1111111111</NIP>
  </DaneIdentyfikacyjne>
  <NrKlienta>KL/128/2026</NrKlienta>
  <JST>2</JST>
  <GV>2</GV>
</Podmiot2>
```

**Validations to assert (positive):**

- Simplified invoice (UPR) can omit Podmiot2/Adres and Nazwa
- JST and GV are present with value "2"
- NrKlienta is accepted as optional

### Example 3 — Domestic purchaser with contact details

**Scenario:** Sale to Jan Kowalski (NIP 3333333333), natural person conducting business. Includes
address, phone, email.

**Expected Podmiot2 XML:**

```xml
<Podmiot2>
  <DaneIdentyfikacyjne>
    <NIP>3333333333</NIP>
    <Nazwa>Jan Kowalski</Nazwa>
  </DaneIdentyfikacyjne>
  <Adres>
    <KodKraju>PL</KodKraju>
    <AdresL1>ul. Szara 4b/13, 44-444 Katowice</AdresL1>
  </Adres>
  <DaneKontaktowe>
    <Email>abc@xyz.pl</Email>
    <Telefon>801055055</Telefon>
  </DaneKontaktowe>
  <JST>2</JST>
  <GV>2</GV>
</Podmiot2>
```

### Example 4 — Consumer (no tax ID)

**Scenario:** Sale to Anna Nowak, natural person not in business (consumer). Voluntary KSeF invoice.

**Expected Podmiot2 XML:**

```xml
<Podmiot2>
  <DaneIdentyfikacyjne>
    <BrakID>1</BrakID>
    <Nazwa>Anna Nowak</Nazwa>
  </DaneIdentyfikacyjne>
  <Adres>
    <KodKraju>PL</KodKraju>
    <AdresL1>ul. Biała 52a, 11-111 Poznań</AdresL1>
  </Adres>
  <JST>2</JST>
  <GV>2</GV>
</Podmiot2>
```

**Validations to assert:**

- BrakID = "1" is valid when purchaser has no NIP
- No NIP/NrVatUE/NrID needed

### Example 5 — GV (VAT Group) as purchaser

**Scenario:** Sale to VAT group "XYZ GV" (NIP 9999999999). Purchase is for company X (GV member).
GV="1" requires Podmiot3 with role 10.

**Expected Podmiot2 XML:**

```xml
<Podmiot2>
  <DaneIdentyfikacyjne>
    <NIP>9999999999</NIP>
    <Nazwa>XYZ GV</Nazwa>
  </DaneIdentyfikacyjne>
  <Adres>
    <KodKraju>PL</KodKraju>
    <AdresL1>ul. Fioletowa 5, 77-777 Gdańsk</AdresL1>
  </Adres>
  <JST>2</JST>
  <GV>1</GV>
</Podmiot2>
```

**CRITICAL — Negative test: GV=1 without Podmiot3 role 10:** When `GV` = "1" in Podmiot2, but no
Podmiot3 exists with `Rola` = "10", the semantic validator should emit an error.

```xml
<!-- GV=1 but NO Podmiot3 with Rola=10 — should FAIL semantic validation -->
```

**Expected error code:** Something like `GV_REQUIRES_PODMIOT3_ROLE_10` (create this rule if it
doesn't exist).

**Positive companion — GV=1 WITH correct Podmiot3:** Include a Podmiot3 with the GV member's NIP and
Rola=10 → should pass.

### Negative test — JST=1 without Podmiot3 role 8

Same pattern: `JST` = "1" in Podmiot2, but no Podmiot3 with `Rola` = "8" → semantic error.
**Expected error code:** `JST_REQUIRES_PODMIOT3_ROLE_8`

### Negative test — Polish NIP in NrVatUE field

```xml
<Podmiot2>
  <DaneIdentyfikacyjne>
    <KodUE>PL</KodUE>
    <NrVatUE>3333333333</NrVatUE>
    <Nazwa>Jan Kowalski</Nazwa>
  </DaneIdentyfikacyjne>
  <Adres><KodKraju>PL</KodKraju><AdresL1>ul. Szara 4b/13</AdresL1></Adres>
  <JST>2</JST>
  <GV>2</GV>
</Podmiot2>
```

**Expected:** Semantic warning — Polish NIP should be in the NIP field, not NrVatUE. Invoice won't
be accessible to purchaser in KSeF.

### Negative test — Missing JST and GV fields

```xml
<Podmiot2>
  <DaneIdentyfikacyjne>
    <NIP>3333333333</NIP>
    <Nazwa>Jan Kowalski</Nazwa>
  </DaneIdentyfikacyjne>
  <Adres><KodKraju>PL</KodKraju><AdresL1>ul. Szara 4b/13</AdresL1></Adres>
</Podmiot2>
```

**Expected:** Error — JST and GV are mandatory in Podmiot2 (FA(3) requirement). This is the existing
`PODMIOT2_JST_MISSING` / `PODMIOT2_GV_MISSING` error.

---

## PART 3: Podmiot3 (Third Party) Tests

### Example 6 — Additional purchaser with share (Rola=4, Udzial)

**Scenario:** 60% of vehicle sold to AAA, 40% to BBB. AAA in Podmiot2, BBB in Podmiot3 with role 4,
share 40.

**Expected Podmiot3 XML:**

```xml
<Podmiot3>
  <DaneIdentyfikacyjne>
    <NIP>7777777777</NIP>
    <Nazwa>BBB Sp. z o.o.</Nazwa>
  </DaneIdentyfikacyjne>
  <Adres>
    <KodKraju>PL</KodKraju>
    <AdresL1>ul. Fioletowa 20, 99-999 Katowice</AdresL1>
  </Adres>
  <Rola>4</Rola>
  <Udzial>40</Udzial>
</Podmiot3>
```

**Validation:** Udzial is only allowed when Rola = "4". Test that Udzial with a different Rola
produces an error.

### Example 7 — Payer (Rola=6)

**Scenario:** PPP Sp. z o.o. is the payer of the invoice on behalf of the purchaser.

```xml
<Podmiot3>
  <DaneIdentyfikacyjne>
    <NIP>3333333333</NIP>
    <Nazwa>PPP Sp. z o.o.</Nazwa>
  </DaneIdentyfikacyjne>
  <Adres>
    <KodKraju>PL</KodKraju>
    <AdresL1>ul. Niebieska 13, 11-111 Chorzów</AdresL1>
  </Adres>
  <Rola>6</Rola>
</Podmiot3>
```

### Example 8 — JST purchaser with subordinate unit (JST=1, Rola=8)

**Scenario:** Municipality of Abc is purchaser (Podmiot2, JST=1). Primary School No. 5 is the
recipient (Podmiot3, Rola=8).

**Podmiot2:**

```xml
<Podmiot2>
  <DaneIdentyfikacyjne>
    <NIP>9999999999</NIP>
    <Nazwa>Abc municipality</Nazwa>
  </DaneIdentyfikacyjne>
  <Adres>
    <KodKraju>PL</KodKraju>
    <AdresL1>ul. Biała 15, 22-222 Abc</AdresL1>
  </Adres>
  <JST>1</JST>
  <GV>2</GV>
</Podmiot2>
```

**Podmiot3:**

```xml
<Podmiot3>
  <DaneIdentyfikacyjne>
    <NIP>1111111111</NIP>
    <Nazwa>Primary School No. 5</Nazwa>
  </DaneIdentyfikacyjne>
  <Adres>
    <KodKraju>PL</KodKraju>
    <AdresL1>ul. Żółta 33, 22-222 Abc</AdresL1>
  </Adres>
  <Rola>8</Rola>
</Podmiot3>
```

**This is the canonical test for the JST cascading rule.** JST=1 + Podmiot3 with Rola=8 = valid.

### Example 9 — JST seller with budgetary unit issuer (Rola=7)

**Scenario:** Municipality sells through its budgetary unit (Primary School). Municipality in
Podmiot1, primary school in Podmiot3 with Rola=7.

```xml
<Podmiot3>
  <DaneIdentyfikacyjne>
    <NIP>3333333333</NIP>
    <Nazwa>Primary School No. 5</Nazwa>
  </DaneIdentyfikacyjne>
  <Adres>
    <KodKraju>PL</KodKraju>
    <AdresL1>ul. Zielona 72/13, 11-111 Abc</AdresL1>
  </Adres>
  <Rola>7</Rola>
</Podmiot3>
```

### Example 10 — Employee (Rola=11)

**Scenario:** Employee Jan Kowalski made a purchase on behalf of employer XXX Sp. z o.o. during a
business trip.

**Podmiot3:**

```xml
<Podmiot3>
  <DaneIdentyfikacyjne>
    <BrakID>1</BrakID>
    <Nazwa>Jan Kowalski</Nazwa>
  </DaneIdentyfikacyjne>
  <Rola>11</Rola>
</Podmiot3>
```

**Validations:**

- Rola=11 requires BrakID=1 in DaneIdentyfikacyjne
- Nazwa is mandatory (employee full name)
- Address and contact details are optional

---

## PART 4: PodmiotUpowazniony Tests

### Example 11 — Court bailiff (RolaPU=2)

**Scenario:** Court bailiff Jan Kowalski issues invoice on behalf of debtor.

```xml
<PodmiotUpowazniony>
  <DaneIdentyfikacyjne>
    <NIP>5555555555</NIP>
    <Nazwa>Jan Kowalski</Nazwa>
  </DaneIdentyfikacyjne>
  <Adres>
    <KodKraju>PL</KodKraju>
    <AdresL1>ul. Szmaragdowa 25, 88-888 Wrocław</AdresL1>
  </Adres>
  <RolaPU>2</RolaPU>
</PodmiotUpowazniony>
```

**Validation:** RolaPU values are "1" (enforcement authority), "2" (court bailiff), "3" (tax
representative).

---

## PART 5: Adnotacje Tests

### Example 12 — ICS of new means of transport (NoweSrodkiTransportu)

**Scenario:** Two new vehicles sold via ICS. Includes detailed vehicle data.

```xml
<Adnotacje>
  <P_16>2</P_16>
  <P_17>2</P_17>
  <P_18>2</P_18>
  <P_18A>2</P_18A>
  <Zwolnienie><P_19N>1</P_19N></Zwolnienie>
  <NoweSrodkiTransportu>
    <P_22>1</P_22>
    <P_42_5>2</P_42_5>
    <NowySrodekTransportu>
      <P_22A>2026-04-20</P_22A>
      <P_NrWierszaNST>1</P_NrWierszaNST>
      <P_22BMK>XXX</P_22BMK>
      <P_22BMD>abc</P_22BMD>
      <P_22BK>red</P_22BK>
      <P_22BNR>SD11111</P_22BNR>
      <P_22BRP>2026</P_22BRP>
      <P_22B>1000</P_22B>
    </NowySrodekTransportu>
    <NowySrodekTransportu>
      <P_22A>2026-05-10</P_22A>
      <P_NrWierszaNST>2</P_NrWierszaNST>
      <P_22BMK>YYY</P_22BMK>
      <P_22BMD>xyz</P_22BMD>
      <P_22BK>green</P_22BK>
      <P_22BNR>SD33333</P_22BNR>
      <P_22BRP>2026</P_22BRP>
      <P_22B>2300</P_22B>
    </NowySrodekTransportu>
  </NoweSrodkiTransportu>
  <P_23>2</P_23>
  <PMarzy><P_PMarzyN>1</P_PMarzyN></PMarzy>
</Adnotacje>
```

**Validations:**

- P_22=1 requires P_42_5 and at least one NowySrodekTransportu
- P_22A (date) and P_NrWierszaNST (row number) are mandatory per vehicle
- P_22B (mileage) is mandatory for land vehicles
- P_22B1/B2/B3/B4 are selection-type — only ONE allowed per vehicle

**Negative test — two vehicle ID fields filled:**

```xml
<NowySrodekTransportu>
  <P_22A>2026-04-20</P_22A>
  <P_NrWierszaNST>1</P_NrWierszaNST>
  <P_22B>1000</P_22B>
  <P_22B1>WBA12345678901234</P_22B1>
  <P_22B2>ABC123456</P_22B2>  <!-- INVALID: can't have both B1 and B2 -->
</NowySrodekTransportu>
```

**Expected:** XSD error (selection type violation).

### Example 13 — Margin scheme: second-hand goods

```xml
<Adnotacje>
  <P_16>2</P_16>
  <P_17>2</P_17>
  <P_18>2</P_18>
  <P_18A>2</P_18A>
  <Zwolnienie><P_19N>1</P_19N></Zwolnienie>
  <NoweSrodkiTransportu><P_22N>1</P_22N></NoweSrodkiTransportu>
  <P_23>2</P_23>
  <PMarzy>
    <P_PMarzy>1</P_PMarzy>
    <P_PMarzy_3_1>1</P_PMarzy_3_1>
  </PMarzy>
</Adnotacje>
```

**Validations:**

- P_PMarzy=1 requires exactly one of P_PMarzy_2, P_PMarzy_3_1, P_PMarzy_3_2, P_PMarzy_3_3
- P*PMarzyN=1 makes all P_PMarzy*\* fields omitted

**Negative test — Both P_PMarzyN and P_PMarzy set:**

```xml
<PMarzy>
  <P_PMarzyN>1</P_PMarzyN>
  <P_PMarzy>1</P_PMarzy>  <!-- INVALID: selection -->
</PMarzy>
```

### Negative test — Zwolnienie: P_19=1 but no legal basis

```xml
<Zwolnienie>
  <P_19>1</P_19>
  <!-- Missing P_19A, P_19B, and P_19C — INVALID -->
</Zwolnienie>
```

**Expected semantic error:** When P_19=1, one of P_19A/P_19B/P_19C must be filled.

### Negative test — Both P_19 and P_19N present

```xml
<Zwolnienie>
  <P_19>1</P_19>
  <P_19A>Article 43 sec. 1</P_19A>
  <P_19N>1</P_19N>  <!-- INVALID: selection type -->
</Zwolnienie>
```

### Negative test — Missing Adnotacje sub-elements

Test that omitting any of these from Adnotacje produces an error: P_16, P_17, P_18, P_18A,
Zwolnienie, NoweSrodkiTransportu, P_23, PMarzy.

---

## PART 6: Self-Billing Rules

### Negative test — Self-billing with purchaser in Podmiot3 role 5

**CRITICAL RULE:** For self-billing (P_17=1), purchaser data must be in Podmiot2. The purchaser
should NOT appear in Podmiot3 with Rola=5.

```xml
<!-- P_17 = 1 in Adnotacje -->
<!-- Podmiot3 with Rola=5 containing purchaser data — INVALID -->
```

**Expected semantic error:** `SELF_BILLING_PURCHASER_IN_PODMIOT3`

---

## PART 7: DaneFaKorygowanej (Corrective Invoice) Tests

### Example 14 — Corrective invoice referencing KSeF-issued original

**Scenario:** Original FV/110/07/2026 issued in KSeF on 14 July 2026. KSeF number:
9999999999-20260714-D5FB0C9ED490-9A. Corrective issued 10 September 2026.

```xml
<DaneFaKorygowanej>
  <DataWystFaKorygowanej>2026-07-14</DataWystFaKorygowanej>
  <NrFaKorygowanej>FV/110/07/2026</NrFaKorygowanej>
  <NrKSeF>1</NrKSeF>
  <NrKSeFFaKorygowanej>9999999999-20260714-D5FB0C9ED490-9A</NrKSeFFaKorygowanej>
</DaneFaKorygowanej>
```

**Fa context:** `RodzajFaktury` = `KOR`

**Validations:**

- KOR invoice requires DaneFaKorygowanej
- NrKSeF=1 requires NrKSeFFaKorygowanej to be filled
- NrKSeFN=1 means NrKSeF and NrKSeFFaKorygowanej are omitted

**Negative test — KOR without DaneFaKorygowanej:** Already implemented as
`KOR_REQUIRES_DANE_FA_KORYGOWANEJ`. Ensure it fires.

**Negative test — NrKSeF=1 but no NrKSeFFaKorygowanej:**

```xml
<DaneFaKorygowanej>
  <DataWystFaKorygowanej>2026-07-14</DataWystFaKorygowanej>
  <NrFaKorygowanej>FV/110/07/2026</NrFaKorygowanej>
  <NrKSeF>1</NrKSeF>
  <!-- Missing NrKSeFFaKorygowanej — INVALID -->
</DaneFaKorygowanej>
```

### Example 15 — IDNabywcy for linking purchaser data on corrective invoices

**Scenario:** Corrective invoice for 3 purchasers. First and third purchasers have data corrections.
IDNabywcy field links corrected data to Podmiot2K.

**Key fields in Podmiot2:**

```xml
<Podmiot2>
  <!-- ...identification data... -->
  <IDNabywcy>NB/01</IDNabywcy>
  <JST>2</JST>
  <GV>2</GV>
</Podmiot2>
```

**Podmiot3 entries with IDNabywcy:**

```xml
<Podmiot3>
  <IDNabywcy>NB/02</IDNabywcy>
  <!-- ...identification data for purchaser 2... -->
  <Rola>4</Rola>
</Podmiot3>
<Podmiot3>
  <IDNabywcy>NB/03</IDNabywcy>
  <!-- ...identification data for purchaser 3... -->
  <Rola>4</Rola>
</Podmiot3>
```

**Podmiot2K entries with matching IDNabywcy:**

```xml
<Podmiot2K>
  <!-- Erroneous data from original invoice for purchaser 1 -->
  <DaneIdentyfikacyjne>
    <NIP>3333333333</NIP>
    <Nazwa>Jan Kowalski</Nazwa>
  </DaneIdentyfikacyjne>
  <Adres><KodKraju>PL</KodKraju><AdresL1>ul. Biała 5, 22-222 Katowice</AdresL1></Adres>
  <IDNabywcy>NB/01</IDNabywcy>
</Podmiot2K>
<Podmiot2K>
  <!-- Erroneous data for purchaser 3 -->
  <DaneIdentyfikacyjne>
    <NIP>7777777777</NIP>
    <Nazwa>Adam Kowalczyk</Nazwa>
  </DaneIdentyfikacyjne>
  <Adres><KodKraju>PL</KodKraju><AdresL1>ul. Niebieska 9, 44-444 Olkusz</AdresL1></Adres>
  <IDNabywcy>NB/03</IDNabywcy>
</Podmiot2K>
```

**Validation:** IDNabywcy max 32 chars.

---

## PART 8: ZaliczkaCzesciowa (Partial Advance Payments) Tests

### Example 16 — Three advance payments in EUR with exchange rates

```xml
<ZaliczkaCzesciowa>
  <P_6Z>2026-09-10</P_6Z>
  <P_15Z>500</P_15Z>
  <KursWalutyZW>4.4512</KursWalutyZW>
</ZaliczkaCzesciowa>
<ZaliczkaCzesciowa>
  <P_6Z>2026-09-15</P_6Z>
  <P_15Z>2500</P_15Z>
  <KursWalutyZW>4.4724</KursWalutyZW>
</ZaliczkaCzesciowa>
<ZaliczkaCzesciowa>
  <P_6Z>2026-09-20</P_6Z>
  <P_15Z>1000</P_15Z>
  <KursWalutyZW>4.5148</KursWalutyZW>
</ZaliczkaCzesciowa>
```

**Fa context:** `KodWaluty` = `EUR`, `RodzajFaktury` = `ZAL`

**Validation:** Max 31 occurrences. KursWalutyZW up to 6 decimal places.

---

## PART 9: DodatkowyOpis Tests

### Example 17 — Electricity meter data

```xml
<DodatkowyOpis>
  <Klucz>Meter number</Klucz>
  <Wartosc>11/2023/KTW</Wartosc>
</DodatkowyOpis>
<DodatkowyOpis>
  <Klucz>Supply point address</Klucz>
  <Wartosc>77-777 Katowice, ul. Biała 7</Wartosc>
</DodatkowyOpis>
```

### Example 20 — DodatkowyOpis with NrWiersza linking to FaWiersz

```xml
<DodatkowyOpis>
  <NrWiersza>1</NrWiersza>
  <Klucz>Brand</Klucz>
  <Wartosc>Abc</Wartosc>
</DodatkowyOpis>
<DodatkowyOpis>
  <NrWiersza>2</NrWiersza>
  <Klucz>Noise level</Klucz>
  <Wartosc>78dB</Wartosc>
</DodatkowyOpis>
```

**Validation:** Klucz max 256, Wartosc max 256, max 10,000 occurrences.

---

## PART 10: FakturaZaliczkowa Tests

### Example 21 — Two advance invoices issued outside KSeF

```xml
<FakturaZaliczkowa>
  <NrKSeFZN>1</NrKSeFZN>
  <NrFaZaliczkowej>FZ/123/07/2025</NrFaZaliczkowej>
</FakturaZaliczkowa>
<FakturaZaliczkowa>
  <NrKSeFZN>1</NrKSeFZN>
  <NrFaZaliczkowej>FZ/133/08/2025</NrFaZaliczkowej>
</FakturaZaliczkowa>
```

**Fa context:** `RodzajFaktury` = `ROZ`

**Negative test — NrKSeFZN=1 but no NrFaZaliczkowej:**

```xml
<FakturaZaliczkowa>
  <NrKSeFZN>1</NrKSeFZN>
  <!-- Missing NrFaZaliczkowej — INVALID -->
</FakturaZaliczkowa>
```

---

## PART 11: FaWiersz (Invoice Line) Tests

### Example 22 — Two line items, different sale dates (P_6A used)

```xml
<FaWiersz>
  <NrWierszaFa>1</NrWierszaFa>
  <P_6A>2026-09-12</P_6A>
  <P_7>Fleece blanket</P_7>
  <P_8A>pcs.</P_8A>
  <P_8B>3</P_8B>
  <P_9A>90</P_9A>
  <P_11>270</P_11>
  <P_12>23</P_12>
</FaWiersz>
<FaWiersz>
  <NrWierszaFa>2</NrWierszaFa>
  <P_6A>2026-09-14</P_6A>
  <P_7>Cotton linen</P_7>
  <P_8A>pcs.</P_8A>
  <P_8B>5</P_8B>
  <P_9A>120</P_9A>
  <P_11>600</P_11>
  <P_12>23</P_12>
</FaWiersz>
```

**Validation:** When P_6A is used per line, P_6 in Fa should NOT be present (they're mutually
exclusive).

### Example 23 — Corrective invoice: difference method vs before/after method

**Method 1 — Differences (return of 1 blanket and 2 linen sets):**

```xml
<FaWiersz>
  <NrWierszaFa>1</NrWierszaFa>
  <P_6A>2026-09-12</P_6A>
  <P_7>Fleece blanket</P_7>
  <P_8A>pcs.</P_8A>
  <P_8B>-1</P_8B>
  <P_9A>90</P_9A>
  <P_11>-90</P_11>
  <P_12>23</P_12>
</FaWiersz>
<FaWiersz>
  <NrWierszaFa>2</NrWierszaFa>
  <P_6A>2026-09-14</P_6A>
  <P_7>Cotton linen</P_7>
  <P_8A>pcs.</P_8A>
  <P_8B>-2</P_8B>
  <P_9A>120</P_9A>
  <P_11>-240</P_11>
  <P_12>23</P_12>
</FaWiersz>
```

**Method 2 — Before/After with StanPrzed flag:**

```xml
<!-- "Before" row (StanPrzed=1) -->
<FaWiersz>
  <NrWierszaFa>1</NrWierszaFa>
  <P_6A>2026-09-12</P_6A>
  <P_7>Fleece blanket</P_7>
  <P_8A>pcs.</P_8A>
  <P_8B>3</P_8B>
  <P_9A>90</P_9A>
  <P_11>270</P_11>
  <P_12>23</P_12>
  <StanPrzed>1</StanPrzed>
</FaWiersz>
<!-- "After" row -->
<FaWiersz>
  <NrWierszaFa>1</NrWierszaFa>
  <P_6A>2026-09-12</P_6A>
  <P_7>Fleece blanket</P_7>
  <P_8A>pcs.</P_8A>
  <P_8B>2</P_8B>
  <P_9A>90</P_9A>
  <P_11>180</P_11>
  <P_12>23</P_12>
</FaWiersz>
```

**Validations:**

- Negative P_8B and P_11 are valid for corrective invoices
- StanPrzed = "1" is valid for the "before" row
- Both correction methods are acceptable

### Negative test — P_12 with invalid rate value

```xml
<FaWiersz>
  <NrWierszaFa>1</NrWierszaFa>
  <P_7>Service</P_7>
  <P_8A>szt.</P_8A>
  <P_8B>1</P_8B>
  <P_9A>100</P_9A>
  <P_11>100</P_11>
  <P_12>21</P_12>  <!-- INVALID: 21 is not a valid rate -->
</FaWiersz>
```

**Expected:** Error — P_12 must be one of: 23, 22, 8, 7, 5, 4, 3, "0 KR", "0 WDT", "0 EX", "zw",
"oo", "np I", "np II".

### Negative test — "oo" rate used for foreign buyer

When Podmiot2 has a foreign country code and P_12 = "oo", semantic validator should warn that "np I"
or "np II" should be used instead.

```xml
<!-- Podmiot2 with KodKraju=DE, and FaWiersz with P_12=oo -->
```

**Expected semantic warning:** `OO_RATE_WITH_FOREIGN_BUYER`

---

## PART 12: Rozliczenie (Settlement) Tests

### Example 24 — Charges, deductions, and settlement

**Scenario:** Invoice P_15=246 PLN. Stamp duty reimbursement (17 PLN charge). Client overpayment
balance (300 PLN deduction). Result: 37 PLN to be settled/refunded.

```xml
<Rozliczenie>
  <Obciazenia>
    <Kwota>17</Kwota>
    <Powod>Reimbursement - stamp duty</Powod>
  </Obciazenia>
  <SumaObciazen>17</SumaObciazen>
  <Odliczenia>
    <Kwota>300</Kwota>
    <Powod>Settlement of a client's balance</Powod>
  </Odliczenia>
  <SumaOdliczen>300</SumaOdliczen>
  <DoRozliczenia>37</DoRozliczenia>
</Rozliczenie>
```

**Validation:**

- DoZaplaty vs DoRozliczenia are a choice — only one can appear
- SumaObciazen should equal sum of Obciazenia/Kwota values
- DoRozliczenia = P_15 + SumaObciazen - SumaOdliczen = 246 + 17 - 300 = -37 (absolute = 37)

**Negative test — Both DoZaplaty AND DoRozliczenia:**

```xml
<Rozliczenie>
  <DoZaplaty>100</DoZaplaty>
  <DoRozliczenia>50</DoRozliczenia>  <!-- INVALID: selection -->
</Rozliczenie>
```

---

## PART 13: Platnosc (Payment) Tests

### Example 25 — Fully paid invoice

```xml
<Platnosc>
  <Zaplacono>1</Zaplacono>
  <DataZaplaty>2026-05-20</DataZaplaty>
  <FormaPlatnosci>6</FormaPlatnosci>
</Platnosc>
```

### Example 26 — Three partial payments, bank account

```xml
<Platnosc>
  <ZnacznikZaplatyCzesciowej>2</ZnacznikZaplatyCzesciowej>
  <ZaplataCzesciowa>
    <KwotaZaplatyCzesciowej>300</KwotaZaplatyCzesciowej>
    <DataZaplatyCzesciowej>2026-06-21</DataZaplatyCzesciowej>
    <FormaPlatnosci>1</FormaPlatnosci>
  </ZaplataCzesciowa>
  <ZaplataCzesciowa>
    <KwotaZaplatyCzesciowej>400</KwotaZaplatyCzesciowej>
    <DataZaplatyCzesciowej>2026-06-24</DataZaplatyCzesciowej>
    <FormaPlatnosci>2</FormaPlatnosci>
  </ZaplataCzesciowa>
  <ZaplataCzesciowa>
    <KwotaZaplatyCzesciowej>500</KwotaZaplatyCzesciowej>
    <DataZaplatyCzesciowej>2026-06-28</DataZaplatyCzesciowej>
    <FormaPlatnosci>6</FormaPlatnosci>
  </ZaplataCzesciowa>
  <RachunekBankowy>
    <NrRB>11111111111111111111111111</NrRB>
    <NazwaBanku>XYZ</NazwaBanku>
    <OpisRachunku>Domestic currency account (PLN)</OpisRachunku>
  </RachunekBankowy>
</Platnosc>
```

**Validation:**

- ZnacznikZaplatyCzesciowej may appear only ONCE in the entire invoice
- NrRB min 10, max 34 chars
- FormaPlatnosci values: "1"-"7"

### Example 27 — Payment deadline with descriptive terms

```xml
<Platnosc>
  <TerminPlatnosci>
    <TerminOpis>
      <Ilosc>14</Ilosc>
      <Jednostka>days</Jednostka>
      <ZdarzeniePoczatkowe>from issue of the invoice</ZdarzeniePoczatkowe>
    </TerminOpis>
  </TerminPlatnosci>
  <FormaPlatnosci>6</FormaPlatnosci>
  <RachunekBankowy>
    <NrRB>11111111111111111111111111</NrRB>
    <NazwaBanku>XYZ</NazwaBanku>
  </RachunekBankowy>
</Platnosc>
```

### Negative test — NrRB too short

```xml
<RachunekBankowy>
  <NrRB>123456789</NrRB>  <!-- INVALID: min 10 chars -->
</RachunekBankowy>
```

---

## PART 14: WarunkiTransakcji (Transaction Terms) Tests

### Example 28 — Full transport details

```xml
<WarunkiTransakcji>
  <Zamowienia>
    <DataZamowienia>2026-09-15</DataZamowienia>
    <DodatkowyOpis>ZAM/182/2026</DodatkowyOpis>
  </Zamowienia>
  <Transport>
    <RodzajTransportu>3</RodzajTransportu>
    <Przewoznik>
      <DaneIdentyfikacyjne>
        <NIP>9999999999</NIP>
        <Nazwa>Jan Nowak</Nazwa>
      </DaneIdentyfikacyjne>
      <AdresPrzewoznika>
        <KodKraju>PL</KodKraju>
        <AdresL1>ul. Pomarańczowa 12, 33-333 Gliwice</AdresL1>
      </AdresPrzewoznika>
    </Przewoznik>
    <NrZleceniaTransportu>TR/09/26</NrZleceniaTransportu>
    <OpisLadunku>4</OpisLadunku>
    <JednostkaOpakowania>1 cardboard box/40 pieces</JednostkaOpakowania>
    <DataGodzRozpTransportu>2026-09-25T07:34:00Z</DataGodzRozpTransportu>
    <DataGodzZakTransportu>2026-09-25T21:40:00Z</DataGodzZakTransportu>
    <WysylkaZ>
      <KodKraju>PL</KodKraju>
      <AdresL1>ul. Zielona 5, 11-111 Katowice</AdresL1>
    </WysylkaZ>
    <WysylkaPrzez>
      <KodKraju>PL</KodKraju>
      <AdresL1>ul. Niebieska 27, 55-555 Łódź</AdresL1>
      <AdresL2>Warehouse "B"</AdresL2>
    </WysylkaPrzez>
    <WysylkaDo>
      <KodKraju>PL</KodKraju>
      <AdresL1>ul. Szara 25, 22-222 Gdynia</AdresL1>
    </WysylkaDo>
  </Transport>
</WarunkiTransakcji>
```

**Validation:**

- Transport minimum: (RodzajTransportu OR TransportInny+OpisInnegoTransportu) AND (OpisLadunku OR
  LadunekInny+OpisInnegoLadunku)
- RodzajTransportu values: "1"-"5", "7", "8" (no "6" — intentionally skipped)
- DateTime format: YYYY-MM-DDTHH:MM:SSZ

### Negative test — WalutaUmowna = PLN

```xml
<WarunkiTransakcji>
  <KursUmowny>1.0000</KursUmowny>
  <WalutaUmowna>PLN</WalutaUmowna>  <!-- INVALID: PLN must never appear here -->
</WarunkiTransakcji>
```

**Expected semantic error:** `WALUTA_UMOWNA_PLN_FORBIDDEN`

### Negative test — KursUmowny without WalutaUmowna

```xml
<WarunkiTransakcji>
  <KursUmowny>4.5000</KursUmowny>
  <!-- Missing WalutaUmowna — INVALID: both must be filled or both omitted -->
</WarunkiTransakcji>
```

---

## PART 15: Zamowienie (Order for Advance Invoices) Tests

### Example 29 — Three-item order (house + furniture)

**Fa context:** `RodzajFaktury` = `ZAL`

```xml
<Zamowienie>
  <WartoscZamowienia>655380</WartoscZamowienia>
  <ZamowienieWiersz>
    <NrWierszaZam>1</NrWierszaZam>
    <P_7Z>Single-family house</P_7Z>
    <PKOBZ>1110</PKOBZ>
    <P_8AZ>Pcs.</P_8AZ>
    <P_8BZ>1</P_8BZ>
    <P_9AZ>600000</P_9AZ>
    <P_11NettoZ>600000</P_11NettoZ>
    <P_11VatZ>48000</P_11VatZ>
    <P_12Z>8</P_12Z>
    <GTUZ>GTU_10</GTUZ>
  </ZamowienieWiersz>
  <ZamowienieWiersz>
    <NrWierszaZam>2</NrWierszaZam>
    <P_7Z>Chest of drawers</P_7Z>
    <P_8AZ>Pcs.</P_8AZ>
    <P_8BZ>2</P_8BZ>
    <P_9AZ>1000</P_9AZ>
    <P_11NettoZ>2000</P_11NettoZ>
    <P_11VatZ>460</P_11VatZ>
    <P_12Z>23</P_12Z>
  </ZamowienieWiersz>
  <ZamowienieWiersz>
    <NrWierszaZam>3</NrWierszaZam>
    <P_7Z>Sofa</P_7Z>
    <P_8AZ>Pcs.</P_8AZ>
    <P_8BZ>2</P_8BZ>
    <P_9AZ>2000</P_9AZ>
    <P_11NettoZ>4000</P_11NettoZ>
    <P_11VatZ>920</P_11VatZ>
    <P_12Z>23</P_12Z>
  </ZamowienieWiersz>
</Zamowienie>
```

**Validation:**

- WartoscZamowienia should equal sum of (P_11NettoZ + P_11VatZ) across rows = (600000+48000) +
  (2000+460) + (4000+920) = 655380 ✓
- Zamowienie is required for ZAL invoices
- P_12Z values match P_12 dictionary

---

## PART 16: Stopka (Footer) Tests

### Example 30/31 — Footer with marketing text and registry data

```xml
<Stopka>
  <Informacje>
    <StopkaFaktury>Share capital: PLN 50,000,000</StopkaFaktury>
  </Informacje>
  <Rejestry>
    <PelnaNazwa>XYZ Sp. z o. o.</PelnaNazwa>
    <KRS>0000111111</KRS>
    <REGON>011111111</REGON>
  </Rejestry>
</Stopka>
```

**Validation:** StopkaFaktury max 3500 chars. Informacje max 3 occurrences. Rejestry max 100.

---

## PART 17: Cross-Cutting Semantic Rules (Negative Tests)

These are not tied to specific examples but derive from the CRITICAL RULES in the information sheet.

### P_6 vs P_6A mutual exclusion

When `P_6` is set in Fa element, no `P_6A` should appear in any FaWiersz. When `P_6A` is used in any
FaWiersz, `P_6` should not be set in Fa.

### RodzajFaktury determines required sections

| RodzajFaktury         | Required Fields                                    |
| --------------------- | -------------------------------------------------- |
| KOR, KOR_ZAL, KOR_ROZ | DaneFaKorygowanej                                  |
| ZAL                   | Zamowienie (with order items)                      |
| ROZ                   | FakturaZaliczkowa (references to advance invoices) |

### Trailing decimal zeros

**From known KSeF gotcha (not in the info sheet but in project knowledge):** Values like `80.000000`
should trigger a warning — KSeF rejects trailing decimal zeros. Test: `<P_11>80.000000</P_11>` →
warning Test: `<P_11>80</P_11>` → clean Test: `<P_9A>3.7075</P_9A>` → clean Test:
`<P_9A>3.707500</P_9A>` → warning

### Amount field: no thousand separators

Test: `<P_11>1 000.00</P_11>` → error (space in amount) Test: `<P_11>1,000.00</P_11>` → error (comma
in amount)

### IPKSeF format validation

- Exactly 13 alphanumeric characters (0-9, a-z, A-Z)
- First 3 = settlement agent ID, remaining 10 = unique string

Test: `<IPKSeF>001ABC123DEF4</IPKSeF>` → valid Test: `<IPKSeF>001ABC123DEF</IPKSeF>` → invalid (12
chars) Test: `<IPKSeF>001ABC123DEF45</IPKSeF>` → invalid (14 chars) Test:
`<IPKSeF>001ABC-23DEF4</IPKSeF>` → invalid (hyphen not allowed)

### KodWaluty consistency

When `KodWaluty` = `PLN`, the `P_14_*W` fields (tax in PLN for foreign currency) should NOT be
present. When `KodWaluty` ≠ `PLN` and taxable amounts exist, the corresponding `P_14_*W` fields
should be present.

---

## PART 18: Priority — Implement These Rules First

If time is limited, implement tests in this order:

1. **JST/GV cascading** (Examples 5, 8) — PODMIOT2_JST_MISSING, PODMIOT2_GV_MISSING already exist;
   add JST_REQUIRES_PODMIOT3_ROLE_8, GV_REQUIRES_PODMIOT3_ROLE_10
2. **KOR requires DaneFaKorygowanej** (Example 14) — already exists, add NrKSeF/NrKSeFN tests
3. **P_12 rate validation** — existing rule, extend with "oo" vs "np I"/"np II" check
4. **Adnotacje completeness** — existing rules, extend Zwolnienie/PMarzy selection logic
5. **P_6 vs P_6A mutual exclusion** — new semantic rule
6. **Trailing zeros warning** — existing rule, ensure test coverage
7. **Self-billing rule** (P_17 + Podmiot3 role 5 conflict)
8. **WalutaUmowna ≠ PLN** and KursUmowny/WalutaUmowna paired requirement
9. **RodzajFaktury-driven required sections** (ZAL→Zamowienie, ROZ→FakturaZaliczkowa)
10. **Polish NIP in NrVatUE warning**
