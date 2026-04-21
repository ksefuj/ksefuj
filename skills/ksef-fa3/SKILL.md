---
name: ksef-fa3
description: >
  Generate and validate KSeF FA(3) e-invoices — Poland's mandatory structured invoice format
  (effective from 2026-02-01 for large companies, 2026-04-01 for all). Use this skill whenever the
  user asks about: issuing invoices to KSeF, FA(3) XML structure, mapping invoice data to the FA(3)
  schema, e-invoice validation, KSeF validator errors, P_12/P_13/GTU/Adnotacje fields, invoices for
  foreign buyers (EU, non-EU), foreign currency invoices, reverse charge, WDT, export, VAT exemption,
  advance invoices, corrective invoices, or any FA(3) logical structure question.
---

# KSeF FA(3) — Invoice Generation Skill

> **Authority:** All rules in this skill are based on the official FA(3) information sheet from the
> Polish Ministry of Finance (March 2026 edition), available at
> `packages/validator/docs/fa3-information-sheet.md`. Operational rules (corrective invoices,
> invoice types, identification) are from Podręcznik KSeF 2.0 Part II at
> `docs/knowledge-base/briefs/podrecznik-ksef-20-czesc-ii.md`.
>
> **Validator:** Generated XML should pass `@ksefuj/validator` (XSD + 42 semantic rules). See the
> [Semantic Rules Reference](#semantic-rules-reference) section and always use
> `packages/validator/src/semantic.ts` as the source of truth for rule logic.

---

## Schema and Resources

- **Namespace:** `http://crd.gov.pl/wzor/2025/06/25/13775/`
- **XSD:** `https://crd.gov.pl/wzor/2025/06/25/13775/schemat.xsd`
- **FA(3) Information Sheet:** `packages/validator/docs/fa3-information-sheet.md`
- **Validator semantic rules:** `packages/validator/src/semantic.ts`
- **KSeF 2.0 (production):** https://ap.ksef.mf.gov.pl/
- **KSeF 2.0 test environment** (fake data, no legal effect): https://ap-test.ksef.mf.gov.pl/web/
- **KSeF documentation portal:** https://ksef.podatki.gov.pl/
- ⚠️ Old validator at https://ksef.mf.gov.pl/web/login is **dead** since 2026-02-01 (KSeF 1.0 shut down)

---

## Validate Your Output

After generating XML, always validate it:

```bash
# Install and run the validator
npx @ksefuj/validator invoice.xml

# Or in Node.js
import { validate } from "@ksefuj/validator";
const result = await validate(xmlString);
if (!result.valid) console.log(result.issues);
```

The validator runs three layers:
1. **XSD validation** — structural compliance against the official FA(3) schema
2. **MF semantic rules** — business logic checks per the official FA(3) information sheet
3. **Extra checks** — tax calculation math, NBP currency rates, IBAN format (beyond what KSeF validates)

---

## Top-Level XML Element Order

The schema uses `xs:sequence` — **element order is strictly enforced**:

```
Faktura
  └── Naglowek
  └── Podmiot1           (seller — always a Polish company with NIP)
  └── Podmiot2           (buyer)
  └── Podmiot3*          (additional entity — optional)
  └── PodmiotUpowazniony* (optional)
  └── Fa
        └── KodWaluty
        └── P_1
        └── P_1M*
        └── P_2
        └── WZ*
        └── P_6*         (single delivery/service date for all lines, only when different from P_1)
        └── OkresFa*     (billing period per art. 19a sec. 3/4/5 pt 4)
        └── P_13_1..P_13_11  (only include fields relevant to this transaction — omit zeros)
        └── P_14_1..P_14_5  (VAT amounts — only when P_13_x > 0)
        └── P_15
        └── KursWalutyZ* (ONLY for advance invoices ZAL/KOR_ZAL per art. 106b sec. 1 pt 4)
        └── Adnotacje
        └── RodzajFaktury
        └── ... (corrective/advance-specific elements — see references/)
        └── FaWiersz*    (line items — optional for advance invoices)
        └── Platnosc*
        └── WarunkiTransakcji*
```

> ⚠️ `KursWalutyZ` at `Fa` level is **exclusively** for advance invoices (ZAL/KOR_ZAL). For
> regular foreign-currency invoices, the exchange rate goes in `FaWiersz/KursWaluty`.

---

## Invoice Scenarios

### Scenario 1: Domestic Sale — Standard 23% VAT

Most common case. Buyer is a Polish company (has NIP).

**Key fields:**
- `P_13_1` = net amount at 23% | `P_14_1` = VAT amount | `P_15` = gross total
- `FaWiersz/P_12 = "23"` | `Adnotacje/P_18 = 2` (no reverse charge)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/">
  <Naglowek>
    <KodFormularza kodSystemowy="FA (3)" wersjaSchemy="1-0E">FA</KodFormularza>
    <WariantFormularza>3</WariantFormularza>
    <DataWytworzeniaFa>2026-03-01T10:00:00Z</DataWytworzeniaFa>
  </Naglowek>
  <Podmiot1>
    <DaneIdentyfikacyjne>
      <NIP>1234567890</NIP>
      <Nazwa>Seller Sp. z o.o.</Nazwa>
    </DaneIdentyfikacyjne>
    <Adres>
      <KodKraju>PL</KodKraju>
      <AdresL1>ul. Przykładowa 1</AdresL1>
      <AdresL2>00-001 Warszawa</AdresL2>
    </Adres>
  </Podmiot1>
  <Podmiot2>
    <DaneIdentyfikacyjne>
      <NIP>0987654321</NIP>
      <Nazwa>Buyer Sp. z o.o.</Nazwa>
    </DaneIdentyfikacyjne>
    <Adres>
      <KodKraju>PL</KodKraju>
      <AdresL1>ul. Kupiecka 5</AdresL1>
      <AdresL2>30-002 Kraków</AdresL2>
    </Adres>
    <JST>2</JST>
    <GV>2</GV>
  </Podmiot2>
  <Fa>
    <KodWaluty>PLN</KodWaluty>
    <P_1>2026-03-01</P_1>
    <P_2>FV/001/03/2026</P_2>
    <P_13_1>1000.00</P_13_1>
    <P_14_1>230.00</P_14_1>
    <P_15>1230.00</P_15>
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
    <FaWiersz>
      <NrWierszaFa>1</NrWierszaFa>
      <P_7>Consulting services</P_7>
      <P_8A>h</P_8A>
      <P_8B>10</P_8B>
      <P_9A>100.00</P_9A>
      <P_11>1000.00</P_11>
      <P_12>23</P_12>
    </FaWiersz>
    <Platnosc>
      <TerminPlatnosci><Termin>2026-03-15</Termin></TerminPlatnosci>
      <FormaPlatnosci>6</FormaPlatnosci>
    </Platnosc>
  </Fa>
</Faktura>
```

---

### Scenario 2: Domestic Reverse Charge (Odwrotne obciążenie)

Used when the buyer is the VAT payer (art. 145e of the VAT Act — domestic reverse charge).

**Key fields:**
- `P_13_10` = net amount | no `P_14_x` (no VAT charged) | `P_15` = equals `P_13_10`
- `FaWiersz/P_12 = "oo"` | `Adnotacje/P_18 = 1`
- Optionally `FaWiersz/P_12_Zal_15 = "1"` if goods from Annex 15

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/">
  <Naglowek>
    <KodFormularza kodSystemowy="FA (3)" wersjaSchemy="1-0E">FA</KodFormularza>
    <WariantFormularza>3</WariantFormularza>
    <DataWytworzeniaFa>2026-03-01T10:00:00Z</DataWytworzeniaFa>
  </Naglowek>
  <Podmiot1>
    <DaneIdentyfikacyjne>
      <NIP>1234567890</NIP>
      <Nazwa>Seller Sp. z o.o.</Nazwa>
    </DaneIdentyfikacyjne>
    <Adres>
      <KodKraju>PL</KodKraju>
      <AdresL1>ul. Stalowa 10</AdresL1>
      <AdresL2>00-001 Warszawa</AdresL2>
    </Adres>
  </Podmiot1>
  <Podmiot2>
    <DaneIdentyfikacyjne>
      <NIP>0987654321</NIP>
      <Nazwa>Buyer Sp. z o.o.</Nazwa>
    </DaneIdentyfikacyjne>
    <Adres>
      <KodKraju>PL</KodKraju>
      <AdresL1>ul. Fabryczna 3</AdresL1>
      <AdresL2>50-001 Wrocław</AdresL2>
    </Adres>
    <JST>2</JST>
    <GV>2</GV>
  </Podmiot2>
  <Fa>
    <KodWaluty>PLN</KodWaluty>
    <P_1>2026-03-01</P_1>
    <P_2>FV/002/03/2026</P_2>
    <P_13_10>5000.00</P_13_10>
    <P_15>5000.00</P_15>
    <Adnotacje>
      <P_16>2</P_16>
      <P_17>2</P_17>
      <P_18>1</P_18>
      <P_18A>2</P_18A>
      <Zwolnienie><P_19N>1</P_19N></Zwolnienie>
      <NoweSrodkiTransportu><P_22N>1</P_22N></NoweSrodkiTransportu>
      <P_23>2</P_23>
      <PMarzy><P_PMarzyN>1</P_PMarzyN></PMarzy>
    </Adnotacje>
    <RodzajFaktury>VAT</RodzajFaktury>
    <FaWiersz>
      <NrWierszaFa>1</NrWierszaFa>
      <P_7>Steel scrap (Annex 15)</P_7>
      <P_8A>kg</P_8A>
      <P_8B>1000</P_8B>
      <P_9A>5.00</P_9A>
      <P_11>5000.00</P_11>
      <P_12>oo</P_12>
      <P_12_Zal_15>1</P_12_Zal_15>
    </FaWiersz>
  </Fa>
</Faktura>
```

> ⚠️ `"oo"` is strictly for **domestic** reverse charge. For foreign buyers, use `"np I"` or
> `"np II"`. Validator rule R26 (OO_RATE_FOREIGN_BUYER) catches this error.

---

### Scenario 3: WDT — Intra-EU Supply (0% VAT)

Supply of goods to an EU-registered business (Wewnątrzwspólnotowa Dostawa Towarów).

**Key fields:**
- `Podmiot2` uses `KodUE` + `NrVatUE` (not NIP)
- `P_13_6_2` = net value | no VAT | `P_15` = equals `P_13_6_2`
- `FaWiersz/P_12 = "0 WDT"` | `Adnotacje/P_18 = 2`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/">
  <Naglowek>
    <KodFormularza kodSystemowy="FA (3)" wersjaSchemy="1-0E">FA</KodFormularza>
    <WariantFormularza>3</WariantFormularza>
    <DataWytworzeniaFa>2026-03-01T10:00:00Z</DataWytworzeniaFa>
  </Naglowek>
  <Podmiot1>
    <DaneIdentyfikacyjne>
      <NIP>1234567890</NIP>
      <Nazwa>Seller Sp. z o.o.</Nazwa>
    </DaneIdentyfikacyjne>
    <Adres>
      <KodKraju>PL</KodKraju>
      <AdresL1>ul. Eksportowa 5</AdresL1>
      <AdresL2>00-001 Warszawa</AdresL2>
    </Adres>
  </Podmiot1>
  <Podmiot2>
    <DaneIdentyfikacyjne>
      <KodUE>DE</KodUE>
      <NrVatUE>123456789</NrVatUE>
      <Nazwa>German Buyer GmbH</Nazwa>
    </DaneIdentyfikacyjne>
    <Adres>
      <KodKraju>DE</KodKraju>
      <AdresL1>Musterstraße 1</AdresL1>
      <AdresL2>10115 Berlin</AdresL2>
    </Adres>
    <JST>2</JST>
    <GV>2</GV>
  </Podmiot2>
  <Fa>
    <KodWaluty>PLN</KodWaluty>
    <P_1>2026-03-01</P_1>
    <P_2>FV/003/03/2026</P_2>
    <P_13_6_2>8000.00</P_13_6_2>
    <P_15>8000.00</P_15>
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
    <FaWiersz>
      <NrWierszaFa>1</NrWierszaFa>
      <P_7>Industrial machinery parts</P_7>
      <P_8A>pcs</P_8A>
      <P_8B>4</P_8B>
      <P_9A>2000.00</P_9A>
      <P_11>8000.00</P_11>
      <P_12>0 WDT</P_12>
      <GTU>GTU_07</GTU>
    </FaWiersz>
  </Fa>
</Faktura>
```

---

### Scenario 4: Export (Non-EU, 0% VAT)

Export of goods to a country outside the EU.

**Key fields:**
- `Podmiot2` uses `KodKraju` + `NrID` as siblings in `DaneIdentyfikacyjne`
- `P_13_6_3` = net value | `P_15` = equals `P_13_6_3`
- `FaWiersz/P_12 = "0 EX"` | `Adnotacje/P_18 = 2`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/">
  <Naglowek>
    <KodFormularza kodSystemowy="FA (3)" wersjaSchemy="1-0E">FA</KodFormularza>
    <WariantFormularza>3</WariantFormularza>
    <DataWytworzeniaFa>2026-03-01T10:00:00Z</DataWytworzeniaFa>
  </Naglowek>
  <Podmiot1>
    <DaneIdentyfikacyjne>
      <NIP>1234567890</NIP>
      <Nazwa>Seller Sp. z o.o.</Nazwa>
    </DaneIdentyfikacyjne>
    <Adres>
      <KodKraju>PL</KodKraju>
      <AdresL1>ul. Portowa 8</AdresL1>
      <AdresL2>80-001 Gdańsk</AdresL2>
    </Adres>
  </Podmiot1>
  <Podmiot2>
    <DaneIdentyfikacyjne>
      <KodKraju>US</KodKraju>
      <NrID>12-3456789</NrID>
      <Nazwa>US Buyer Inc.</Nazwa>
    </DaneIdentyfikacyjne>
    <Adres>
      <KodKraju>US</KodKraju>
      <AdresL1>123 Main Street</AdresL1>
      <AdresL2>New York, NY 10001</AdresL2>
    </Adres>
    <JST>2</JST>
    <GV>2</GV>
  </Podmiot2>
  <Fa>
    <KodWaluty>USD</KodWaluty>
    <P_1>2026-03-01</P_1>
    <P_2>FV/004/03/2026</P_2>
    <P_13_6_3>3000.00</P_13_6_3>
    <P_15>3000.00</P_15>
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
    <FaWiersz>
      <NrWierszaFa>1</NrWierszaFa>
      <P_7>Software license</P_7>
      <P_8A>pcs</P_8A>
      <P_8B>1</P_8B>
      <P_9A>3000.00</P_9A>
      <P_11>3000.00</P_11>
      <P_12>0 EX</P_12>
      <KursWaluty>3.9500</KursWaluty>
    </FaWiersz>
  </Fa>
</Faktura>
```

> ⚠️ For foreign currency invoices: use `FaWiersz/KursWaluty` (not `Fa/KursWalutyZ`).
> All amounts in Fa and FaWiersz are in the invoice currency. When taxable VAT amounts exist at
> non-zero rates, provide `P_14_xW` (PLN-converted VAT). See semantic rule R13.

---

### Scenario 5: VAT Exemption (Zwolnienie)

Invoice for VAT-exempt services/goods (art. 43, 113, 82 of the VAT Act).

**Key fields:**
- `P_13_7` = net value | no `P_14_x` | `P_15` = equals `P_13_7`
- `FaWiersz/P_12 = "zw"`
- `Adnotacje/Zwolnienie`: set `P_19 = 1` + exactly one of `P_19A`/`P_19B`/`P_19C` (omit `P_19N`)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/">
  <Naglowek>
    <KodFormularza kodSystemowy="FA (3)" wersjaSchemy="1-0E">FA</KodFormularza>
    <WariantFormularza>3</WariantFormularza>
    <DataWytworzeniaFa>2026-03-01T10:00:00Z</DataWytworzeniaFa>
  </Naglowek>
  <Podmiot1>
    <DaneIdentyfikacyjne>
      <NIP>1234567890</NIP>
      <Nazwa>Medical Clinic Sp. z o.o.</Nazwa>
    </DaneIdentyfikacyjne>
    <Adres>
      <KodKraju>PL</KodKraju>
      <AdresL1>ul. Zdrowotna 3</AdresL1>
      <AdresL2>00-001 Warszawa</AdresL2>
    </Adres>
  </Podmiot1>
  <Podmiot2>
    <DaneIdentyfikacyjne>
      <NIP>0987654321</NIP>
      <Nazwa>Patient Company Sp. z o.o.</Nazwa>
    </DaneIdentyfikacyjne>
    <Adres>
      <KodKraju>PL</KodKraju>
      <AdresL1>ul. Biurowa 7</AdresL1>
      <AdresL2>00-002 Warszawa</AdresL2>
    </Adres>
    <JST>2</JST>
    <GV>2</GV>
  </Podmiot2>
  <Fa>
    <KodWaluty>PLN</KodWaluty>
    <P_1>2026-03-01</P_1>
    <P_2>FV/005/03/2026</P_2>
    <P_13_7>500.00</P_13_7>
    <P_15>500.00</P_15>
    <Adnotacje>
      <P_16>2</P_16>
      <P_17>2</P_17>
      <P_18>2</P_18>
      <P_18A>2</P_18A>
      <Zwolnienie>
        <P_19>1</P_19>
        <P_19A>Art. 43 ust. 1 pkt 19 ustawy z dnia 11 marca 2004 r. o podatku od towarów i usług</P_19A>
      </Zwolnienie>
      <NoweSrodkiTransportu><P_22N>1</P_22N></NoweSrodkiTransportu>
      <P_23>2</P_23>
      <PMarzy><P_PMarzyN>1</P_PMarzyN></PMarzy>
    </Adnotacje>
    <RodzajFaktury>VAT</RodzajFaktury>
    <FaWiersz>
      <NrWierszaFa>1</NrWierszaFa>
      <P_7>Medical consultation</P_7>
      <P_8A>visit</P_8A>
      <P_8B>1</P_8B>
      <P_9A>500.00</P_9A>
      <P_11>500.00</P_11>
      <P_12>zw</P_12>
    </FaWiersz>
  </Fa>
</Faktura>
```

> ⚠️ When `P_19 = 1`, do **not** include `P_19N`. Exactly one of `P_19A`/`P_19B`/`P_19C` must
> be present. Validator rule R22 (ZWOLNIENIE_LOGIC) enforces this.

---

### Scenario 6: Advance Invoice (ZAL) and Settlement Invoice (ROZ)

See `references/zaliczki.md` for full details. Summary:

**ZAL (advance invoice):**
- `RodzajFaktury = "ZAL"` | requires `Zamowienie` element; `FaWiersz` is allowed but optional
- For foreign currency: include `KursWalutyZ` at `Fa` level (only valid for ZAL/KOR_ZAL)
- Validator rule R11 (RODZAJ_FAKTURY_SECTIONS): ZAL without Zamowienie is an error

**ROZ (settlement / final invoice):**
- `RodzajFaktury = "ROZ"` | requires `FakturaZaliczkowa` element referencing the advance invoice(s)
- `P_15` = amount still to pay (total minus advance payments already paid)
- Validator rule R11: ROZ without FakturaZaliczkowa is an error

---

### Scenario 7: Corrective Invoice (KOR)

See `references/korekty.md` for full details. Summary:

**KOR (corrective invoice):**
- `RodzajFaktury = "KOR"` | requires `DaneFaKorygowanej` element
- P_13_x, P_14_x, P_15 contain the **difference** (delta), not the corrected total
- Validator rule R11: KOR without DaneFaKorygowanej is an error
- Validator rule R29: NrKSeF/NrKSeFN mutual exclusion is enforced

---

## Field Reference

### Naglowek

```xml
<Naglowek>
  <KodFormularza kodSystemowy="FA (3)" wersjaSchemy="1-0E">FA</KodFormularza>
  <WariantFormularza>3</WariantFormularza>
  <DataWytworzeniaFa>2026-MM-DDTHH:MM:SSZ</DataWytworzeniaFa>
</Naglowek>
```

### Podmiot1 (Seller — always a Polish company with NIP)

```xml
<Podmiot1>
  <DaneIdentyfikacyjne>
    <NIP>XXXXXXXXXX</NIP>
    <Nazwa>Company name or First Last</Nazwa>
  </DaneIdentyfikacyjne>
  <Adres>
    <KodKraju>PL</KodKraju>
    <AdresL1>Street and number</AdresL1>
    <AdresL2>Postcode and city</AdresL2>  <!-- optional -->
  </Adres>
</Podmiot1>
```

### Podmiot2 (Buyer) — Four Patterns

| Buyer type | Identifier fields | Notes |
|---|---|---|
| Polish company (NIP) | `<NIP>` | Most common |
| EU buyer with VAT-UE | `<KodUE>` + `<NrVatUE>` | KodUE is country prefix e.g. `DE` |
| Non-EU buyer | `<KodKraju>` + `<NrID>` | Siblings in DaneIdentyfikacyjne, not nested |
| No tax ID | `<BrakID>1</BrakID>` | Private individuals |

> ⚠️ `JST` and `GV` are **mandatory** in Podmiot2 (validator rules R1, R2). Always include them.
> Polish NIP must go in `<NIP>`, not in `<NrVatUE>` (validator rule R5).

### Fa — Summary Amount Fields (P_13_x, P_14_x, P_15)

Only include fields relevant to this transaction. **Omit zeros entirely.**

| Field | Description | Use when |
|---|---|---|
| `P_13_1` | Net at 23% (or 22%) | Domestic 23% sales |
| `P_13_2` | Net at 8% (or 7%) | Domestic 8% sales |
| `P_13_3` | Net at 5% | Domestic 5% sales |
| `P_13_4` | Net — taxi flat rate | Taxis |
| `P_13_5` | Net — OSS procedure | Cross-border digital sales (OSS) |
| `P_13_6_1` | Net 0% domestic (not WDT, not export) | 0% e.g. art. 83 |
| `P_13_6_2` | Net 0% WDT | Intra-EU goods supply |
| `P_13_6_3` | Net 0% export | Goods export to non-EU |
| `P_13_7` | Net — VAT-exempt | VAT exemption |
| `P_13_8` | Net — outside PL (not OSS, not art.100 pt4) | Reverse charge non-EU / art.28b/28e |
| `P_13_9` | Net — art. 100 sec. 1 pt 4 services (EU) | Intra-EU service intrastat |
| `P_13_10` | Net — domestic reverse charge | Domestic reverse charge art. 145e |
| `P_13_11` | Net — margin procedure | Margin art. 119/120 |
| `P_14_1..5` | VAT amounts for corresponding P_13 | Only when P_13_x > 0 with a positive rate |
| `P_15` | **Total amount due** | **Always mandatory** |

> `P_13_8` vs `P_13_9`: services to non-EU entities → `P_13_8`. Services to EU entities covered by
> art. 100 sec. 1 pt 4 (VAT-UE summary declaration) → `P_13_9`.

### Adnotacje — Mandatory Complete Structure

All sub-elements of `Adnotacje` are required. Use selection logic carefully:

```xml
<Adnotacje>
  <P_16>2</P_16>     <!-- 1=cash accounting method, 2=no -->
  <P_17>2</P_17>     <!-- 1=self-billing, 2=no -->
  <P_18>2</P_18>     <!-- 1=reverse charge (domestic OR foreign), 2=no -->
  <P_18A>2</P_18A>   <!-- 1=split payment (MPP) >15k PLN, 2=no -->

  <!-- Zwolnienie: EITHER P_19N=1 (not exempt) OR P_19=1 + exactly one of P_19A/B/C -->
  <Zwolnienie>
    <P_19N>1</P_19N>
  </Zwolnienie>

  <!-- NoweSrodkiTransportu: EITHER P_22N=1 OR P_22=1 + vehicle details -->
  <NoweSrodkiTransportu>
    <P_22N>1</P_22N>
  </NoweSrodkiTransportu>

  <P_23>2</P_23>     <!-- 1=simplified triangular EU invoice, 2=no -->

  <!-- PMarzy: EITHER P_PMarzyN=1 OR P_PMarzy=1 + exactly one margin type -->
  <PMarzy>
    <P_PMarzyN>1</P_PMarzyN>
  </PMarzy>
</Adnotacje>
```

> ⚠️ `P_18=1` applies to both domestic reverse charge (art. 145e) and cross-border reverse charge
> (services outside PL where the buyer accounts for VAT in their country).

### RodzajFaktury Values

| Value | Description |
|---|---|
| `VAT` | Standard invoice |
| `KOR` | Corrective invoice |
| `ZAL` | Advance invoice |
| `ROZ` | Settlement invoice (after advances) |
| `UPR` | Simplified invoice (up to 450 PLN / 100 EUR) |
| `KOR_ZAL` | Corrective advance invoice |
| `KOR_ROZ` | Corrective settlement invoice |

### FaWiersz — Strict Field Order (xs:sequence)

```
NrWierszaFa → UU_ID* → P_6A* → P_7* → Indeks* → GTIN* → PKWIU* → CN* → PKOB*
→ P_8A* → P_8B* → P_9A* → P_9B* → P_10* → P_11* → P_11A* → P_11Vat*
→ P_12* → P_12_XII* → P_12_Zal_15* → KwotaAkcyzy* → GTU* → Procedura*
→ KursWaluty* → StanPrzed*
```

Key FaWiersz fields:

| Field | Description | Notes |
|---|---|---|
| `NrWierszaFa` | Line number (1, 2, 3…) | Mandatory |
| `P_7` | Item/service description (max 512 chars) | Almost always |
| `P_8A` | Unit of measure (e.g. `h`, `pcs`, `kg`) | Optional |
| `P_8B` | Quantity (max 6 decimal places) | Optional |
| `P_9A` | Unit price net (max 8 decimal places) | Optional |
| `P_11` | Net line value (max 2 decimal places) | Optional |
| `P_12` | Tax rate code — see enumeration below | Optional |
| `GTU` | `GTU_01`…`GTU_13` as element value | Optional; max 1 per line |
| `KursWaluty` | NBP exchange rate for this line | Foreign currency invoices only |
| `StanPrzed` | `1` = before-correction state row | Corrective invoices only |

### P_12 Tax Rate Enumeration

Exact values only — validator rule R25 rejects anything not in this list:

```
"23"    23% (standard rate)
"22"    22%
"8"     8%
"7"     7%
"5"     5%
"4"     4%
"3"     3%
"0 KR"  0% — domestic (not WDT, not export)
"0 WDT" 0% — intra-EU supply (WDT)
"0 EX"  0% — export
"zw"    VAT exempt
"oo"    domestic reverse charge (art. 145e)
"np I"  outside PL territory (not art.100 pt4, not OSS) — foreign/cross-border reverse charge
"np II" services under art. 100 sec. 1 pt 4 — intra-EU service intrastat
```

> ⚠️ `"NP"`, `"np"`, `"np1"` are **invalid**. The space matters: `"np I"` not `"npI"`.

### GTU Codes

GTU is a **text value** in one element: `<GTU>GTU_12</GTU>`

- **Not** the old format: `<GTU_12>1</GTU_12>` — this is an XSD error (validator rule R27)
- Maximum 1 GTU per line item
- GTU_01–GTU_10: goods; GTU_11–GTU_13: intangible services
- Optional but recommended for JPK_VAT consistency

### Date Fields

| Field | Scope | When to use |
|---|---|---|
| `Fa/P_6` | All lines | Single delivery/service date for all lines, only when different from P_1 |
| `Fa/OkresFa` (`P_6_Od`+`P_6_Do`) | All lines | Billing period (e.g. monthly subscription) per art. 19a |
| `FaWiersz/P_6A` | Per line | Different dates on different lines |

> When the service/delivery date equals the invoice date (P_1), do **not** fill in P_6.
> P_6 and P_6A are mutually exclusive (validator rule R10).

### Decimal Precision (§2.6)

| Fields | Max decimal places | Example |
|---|---|---|
| P_11, P_13_x, P_14_x, P_15 (general amounts) | 2 | `1230.50` |
| P_9A, P_9B (unit prices) | 8 | `75.12345678` |
| P_8B (quantities) | 6 | `80.123456` |
| KursWaluty, KursWalutyZ (exchange rates) | 6 | `3.707500` |

> Use `.` (full stop) as decimal separator. No thousand separators. Validator rules R28, R38.

### Payment (Platnosc — Optional)

```xml
<Platnosc>
  <TerminPlatnosci>
    <Termin>YYYY-MM-DD</Termin>
  </TerminPlatnosci>
  <FormaPlatnosci>6</FormaPlatnosci>  <!-- 6=bank transfer -->
  <RachunekBankowy>
    <NrRB>PL49...</NrRB>              <!-- IBAN without spaces; Polish IBAN = 28 chars (PL + 26 digits, rule R40) -->
    <SWIFT>BREXPLPWMBK</SWIFT>        <!-- optional -->
    <NazwaBanku>mBank S.A.</NazwaBanku>  <!-- NazwaBanku not NazwaBank -->
  </RachunekBankowy>
</Platnosc>
```

FormaPlatnosci values: 1=cash, 2=card, 3=voucher, 4=cheque, 5=credit, 6=bank transfer, 7=mobile

---

## Semantic Rules Reference

The `@ksefuj/validator` enforces 42 semantic rules. Generated XML **must pass all of them**. Below is
a compact reference — always consult `packages/validator/src/semantic.ts` for the definitive logic.

### Group 1: Podmiot Rules (§5–§8)

| # | Rule ID | Description |
|---|---|---|
| R1 | PODMIOT2_JST_MISSING | JST is mandatory in Podmiot2 |
| R2 | PODMIOT2_GV_MISSING | GV is mandatory in Podmiot2 |
| R3 | JST_REQUIRES_PODMIOT3 | JST=1 requires Podmiot3 with Rola=8 |
| R4 | GV_REQUIRES_PODMIOT3 | GV=1 requires Podmiot3 with Rola=10 |
| R5 | NIP_IN_WRONG_FIELD | Polish NIP (10 digits) must be in NIP field, not NrVatUE |
| R6 | PODMIOT3_UDZIAL_REQUIRES_ROLE_4 | Udzial field only valid with Rola=4 |
| R7 | PODMIOT3_ROLE_MISSING | Podmiot3 requires Rola or (RolaInna + OpisRoli) |
| R8 | SELF_BILLING_PODMIOT3_CONFLICT | Self-billing (P_17=1) must not have Podmiot3 with Rola=5 |

### Group 2: Fa Core Rules (§9)

| # | Rule ID | Description |
|---|---|---|
| R9 | P15_MISSING | P_15 is always mandatory |
| R10 | P6_P6A_MUTUAL_EXCLUSION | Fa/P_6 and FaWiersz/P_6A cannot both be present |
| R11 | RODZAJ_FAKTURY_SECTIONS | KOR requires DaneFaKorygowanej; ZAL requires Zamowienie; ROZ requires FakturaZaliczkowa |
| R12 | KURS_WALUTY_Z_PLACEMENT | KursWalutyZ at Fa level is only for ZAL/KOR_ZAL invoice types |
| R13 | FOREIGN_CURRENCY_TAX_PLN | Foreign currency with taxable VAT requires P_14_xW (PLN conversion) |

### Group 3: Adnotacje Rules (§9.6)

| # | Rule ID | Description |
|---|---|---|
| R14 | ADNOTACJE_P16_MISSING | P_16 is mandatory |
| R15 | ADNOTACJE_P17_MISSING | P_17 is mandatory |
| R16 | ADNOTACJE_P18_MISSING | P_18 is mandatory |
| R17 | ADNOTACJE_P18A_MISSING | P_18A is mandatory |
| R18 | ADNOTACJE_ZWOLNIENIE_MISSING | Zwolnienie element is mandatory |
| R19 | ADNOTACJE_NST_MISSING | NoweSrodkiTransportu element is mandatory |
| R20 | ADNOTACJE_P23_MISSING | P_23 is mandatory |
| R21 | ADNOTACJE_PMARZY_MISSING | PMarzy element is mandatory |
| R22 | ZWOLNIENIE_LOGIC | Exactly one of P_19/P_19N must be 1; when P_19=1, exactly one of P_19A/B/C required |
| R23 | NST_LOGIC | Exactly one of P_22/P_22N; when P_22=1, P_42_5 and NowySrodekTransportu required |
| R24 | PMARZY_LOGIC | Exactly one of P_PMarzy/P_PMarzyN; when P_PMarzy=1, exactly one margin type required |

### Group 4: FaWiersz Rules (§10)

| # | Rule ID | Description |
|---|---|---|
| R25 | P12_ENUMERATION | P_12 must be one of 14 valid tax rate codes |
| R26 | OO_RATE_FOREIGN_BUYER | "oo" is domestic-only; foreign buyers need "np I" or "np II" |
| R27 | GTU_FORMAT | GTU must match pattern GTU_01..GTU_13 as element value (not element name) |
| R28 | DECIMAL_PRECISION | All fields must respect their decimal precision limits per §2.6 |

### Group 5: Corrective Invoice Rules (§9.7)

| # | Rule ID | Description |
|---|---|---|
| R29 | KOR_NRKSEF_CONSISTENCY | Exactly one of NrKSeF/NrKSeFN must be 1; when NrKSeF=1, NrKSeFFaKorygowanej required |
| R30 | REVERSE_CHARGE_CONSISTENCY | P_13_8/P_13_10 present → P_18 must be 1; P_18=1 → must have np I/np II/oo lines |

### Group 6: Payment & Transaction Rules (§12–§13)

| # | Rule ID | Description |
|---|---|---|
| R31 | PAYMENT_ZAPLACONO_DATE | Zaplacono=1 requires DataZaplaty |
| R32 | RACHUNEKBANKOWY_NRRB | If RachunekBankowy has content, NrRB is mandatory |
| R33 | NRRB_LENGTH | NrRB must be 10–34 characters |
| R34 | IPKSEF_FORMAT | IPKSeF must be exactly 13 alphanumeric characters |
| R35 | WALUTA_UMOWNA_PLN | WalutaUmowna must never be PLN |
| R36 | KURS_WALUTA_PAIR | KursUmowny and WalutaUmowna must both be present or both absent |
| R37 | TRANSPORT_MINIMUM_DATA | Transport requires transport type and cargo description |

### Group 7: Format Rules (§2)

| # | Rule ID | Description |
|---|---|---|
| R38 | AMOUNT_NO_SEPARATORS | No thousand separators; only `.` as decimal separator |
| R39 | TAX_CALCULATION_MISMATCH | P_14_x should match P_13_x × tax rate; P_15 must equal sum of all P_13_x + P_14_x |

### Group 8: Additional Business Logic

| # | Rule ID | Description |
|---|---|---|
| R40 | INVALID_BANK_ACCOUNT_FORMAT | Polish IBAN must be 28 chars (PL + 26 digits); bare NRB must be 26 digits |
| R41 | DUPLICATE_LINE_NUMBERS | NrWierszaFa must be unique (except in corrective invoices) |
| R42 | NEGATIVE_QUANTITY_NOT_ALLOWED | Negative P_8B only valid in corrective invoice types |

---

## Common Errors and Fixes

| Error | Cause | Fix |
|---|---|---|
| JST/GV missing in Podmiot2 | R1/R2: both mandatory | Always add `<JST>2</JST><GV>2</GV>` to Podmiot2 |
| "KursWalutyZ not expected" | R12: KursWalutyZ only for ZAL/KOR_ZAL | Remove from Fa; use `FaWiersz/KursWaluty` instead |
| "NP not in enumeration" | R25: "NP" is not a valid P_12 value | Use `"np I"` or `"np II"` (with space) |
| `<GTU_12>1</GTU_12>` XSD error | R27: wrong GTU format | Use `<GTU>GTU_12</GTU>` |
| "not expected, expected X" in FaWiersz | XSD sequence error | GTU must come before KursWaluty and StanPrzed |
| "NazwaBank not expected" | Typo in element name | Correct spelling: `NazwaBanku` |
| Reverse charge with wrong P_18 | R30: consistency check | Set `P_18=1` when using "oo", "np I", or "np II" |
| P_13_x = 0 causing issues | Schema expects no zero-value P_13_x | Omit any P_13_x field with zero value |
| "minOccurs" error on Adnotacje | R18–R21: incomplete Adnotacje | Include all sub-elements: Zwolnienie, NoweSrodkiTransportu, PMarzy |
| Zwolnienie P_19 + P_19N both set | R22: mutual exclusion | Use exactly one: `P_19N=1` OR `P_19=1` + one of P_19A/B/C |
| Polish NIP in NrVatUE | R5: wrong field | Move 10-digit NIP to `<NIP>` element |

---

## Re-reviewing After FA(3) Schema Updates

The FA(3) schema may be updated by the Ministry of Finance. When this happens:

1. **Run `pnpm update-schemas`** — downloads the latest XSD from crd.gov.pl and updates the
   bundled `schemas-data.ts`. Review the diff carefully.

2. **Update `packages/validator/docs/fa3-information-sheet.md`** — this is the constitutional
   reference for all rules. Any changes to the official MF information sheet should be reflected here.

3. **Review `packages/validator/src/semantic.ts`** — check if any semantic rules need updating
   based on the schema changes. Add new rules for any newly documented logic.

4. **Review this skill file** — update scenarios, examples, and the semantic rules reference table
   to match any changes in `semantic.ts`.

5. **Run the test suite** — `pnpm test` — to catch any regressions.

6. **Test all 7 scenario examples** against the new validator:
   ```bash
   npx @ksefuj/validator invoice-scenario-1.xml
   # repeat for each scenario
   ```

---

## Detailed Scenario References

For complex scenarios, see the reference files:

- `references/scenariusze-vat.md` — WDT, export, VAT exemption, OSS, reverse charge, margin
- `references/korekty.md` — corrective invoices (KOR, KOR_ZAL, KOR_ROZ)
- `references/zaliczki.md` — advance invoices (ZAL, ROZ)
- **`skills/ksef-korekta/SKILL.md`** — interactive wizard for generating corrective invoices from a
  faulty original (use when the user has a concrete invoice to correct)
