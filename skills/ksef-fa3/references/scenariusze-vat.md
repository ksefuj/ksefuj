# VAT Scenarios — FA(3)

> All rules reference the official FA(3) information sheet (`packages/validator/docs/fa3-information-sheet.md`).
> Generated XML must pass `@ksefuj/validator` (XSD + 42 semantic rules).

## 1. Domestic Sale (Standard Rates)

- `P_12`: `"23"`, `"8"`, `"5"`, etc.
- `P_13_1` / `P_13_2` / `P_13_3` (corresponding to the rate)
- `P_14_1` / `P_14_2` / `P_14_3` — VAT amounts
- `Adnotacje/P_18 = 2` (no reverse charge)
- Multiple rates: include each pair and set `P_15` = sum of all gross amounts

Example with 23% and 8%:

```xml
<P_13_1>500.00</P_13_1>
<P_14_1>115.00</P_14_1>
<P_13_2>200.00</P_13_2>
<P_14_2>16.00</P_14_2>
<P_15>831.00</P_15>
```

## 2. Intra-EU Supply of Goods (WDT)

- Buyer: `Podmiot2/DaneIdentyfikacyjne/KodUE` + `NrVatUE` (EU VAT prefix + number)
- `P_13_6_2` — WDT net value
- `FaWiersz/P_12 = "0 WDT"`
- `Adnotacje/P_18 = 2` (no reverse charge — 0% rate, not reverse charge)
- GTU according to goods category (e.g. `GTU_07` for vehicles, `GTU_03` for fuel)

## 3. Export of Goods (Non-EU)

- `P_13_6_3`
- `FaWiersz/P_12 = "0 EX"`
- Buyer can use `KodKraju` + `NrID` (as siblings in DaneIdentyfikacyjne, not nested) or `BrakID`
- `Adnotacje/P_18 = 2`

## 4. Cross-Border Reverse Charge (Services Outside PL)

**Buyer outside the EU** (place of supply outside PL, art. 28b of the VAT Act):

- `P_13_8`
- `FaWiersz/P_12 = "np I"`
- `Adnotacje/P_18 = 1` (buyer accounts for VAT in their country)

**EU buyer, art. 100 sec. 1 pt 4 services** (VAT-UE summary declaration):

- `P_13_9`
- `FaWiersz/P_12 = "np II"`
- `Adnotacje/P_18 = 1`

> Validator rule R30: when P_13_8 or P_13_10 is present, P_18 must be 1.
> Validator rule R26: `"oo"` is for domestic reverse charge only — foreign buyers need `"np I"` or `"np II"`.

## 5. VAT Exemption (art. 43, 113, 82)

- `P_13_7`
- `FaWiersz/P_12 = "zw"`
- `Adnotacje/Zwolnienie/P_19 = 1` + exactly one of:
  - `P_19A` — domestic legal basis (e.g. `"Art. 43 ust. 1 pkt 37 ustawy z dnia 11 marca 2004 r. o podatku od towarów i usług"`)
  - `P_19B` — Directive 2006/112/EC (art. + description)
  - `P_19C` — other legal basis
- **Do not include** `P_19N` when `P_19 = 1`

> Validator rule R22 (ZWOLNIENIE_LOGIC): exactly one of P_19/P_19N must be set, and when P_19=1
> exactly one of P_19A/B/C must be filled.

## 6. Domestic Reverse Charge (Art. 145e)

- `P_13_10`
- `FaWiersz/P_12 = "oo"`
- `Adnotacje/P_18 = 1`
- `FaWiersz/P_12_Zal_15 = "1"` if goods from Annex 15 to the VAT Act

## 7. Domestic 0% Rate (Not WDT, Not Export)

- `P_13_6_1`
- `FaWiersz/P_12 = "0 KR"`
- Example: international transport services (art. 83 of the VAT Act)

## 8. OSS Procedure (Special Scheme)

- `P_13_5`
- `FaWiersz/P_12_XII` — VAT rate of the consumption country (numeric, e.g. `20`)
- `FaWiersz/Procedura = "WSTO_EE"` (optional but recommended)

## 9. Margin Procedure (Art. 119/120)

- `P_13_11`
- `Adnotacje/PMarzy/P_PMarzy = 1` + exactly one of:
  - `P_PMarzy_2` — travel agencies
  - `P_PMarzy_3_1` — second-hand goods
  - `P_PMarzy_3_2` — works of art
  - `P_PMarzy_3_3` — antiques/collectibles
- **Do not include** `P_PMarzyN` when `P_PMarzy = 1`

> Validator rule R24 (PMARZY_LOGIC): exactly one of P_PMarzy/P_PMarzyN must be set, and when
> P_PMarzy=1 exactly one margin type must be filled.

## 10. Split Payment (Mechanizm Podzielonej Płatności, MPP)

- Only when invoice total > 15,000 PLN and item from Annex 15 to the VAT Act
- `Adnotacje/P_18A = 1`
- `FaWiersz/P_12_Zal_15 = "1"`

## 11. Foreign Currency Invoices

1. `Fa/KodWaluty` = ISO 4217 currency code (e.g. `USD`, `EUR`, `GBP`)
2. All amounts in `Fa` and `FaWiersz` in the invoice currency
3. `FaWiersz/KursWaluty` = NBP exchange rate (max 6 decimal places)
4. When taxable VAT rates apply (23%, 8%, 5%, flat rate), include `P_14_xW` — VAT converted to PLN
5. **Do not use** `Fa/KursWalutyZ` — that is only for advance invoices (ZAL/KOR_ZAL)

> Validator rule R13 (FOREIGN_CURRENCY_TAX_PLN): when KodWaluty ≠ PLN and P_13_1/2/3/4 present,
> P_14_1W/2W/3W/4W are required.
> Validator rule R12 (KURS_WALUTY_Z_PLACEMENT): KursWalutyZ at Fa level is only valid for ZAL/KOR_ZAL.
