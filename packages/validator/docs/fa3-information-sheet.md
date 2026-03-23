# FA(3) Information Sheet — Validator Source of Truth

> **Source:** Ministry of Finance, Warsaw, March 2026 **Document:** "Structured invoice —
> Information sheet on the FA(3) logical structure" **Status:** CONSTITUTIONAL — This document is
> the absolute authority for all validator rules. **Changelog:** September 2025 (Art. 106gba
> adaptation), November 2025 (KSeF number 36→35 chars in example 14), March 2026 (LinkDoPlatnosci
> example link removed)

---

## Glossary of Abbreviations

| Abbreviation                           | Meaning                                                                                                                                                                                                                             |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GV                                     | VAT group (Grupa VAT)                                                                                                                                                                                                               |
| JST                                    | Local government authority (Jednostka Samorządu Terytorialnego)                                                                                                                                                                     |
| KSeF                                   | National e-Invoicing System (Krajowy System e-Faktur), as referred to in Article 106nd sec. 2 of the VAT Act                                                                                                                        |
| Regulation on JPK_VAT with declaration | Regulation of the Minister of Finance, Investment and Development of 15 October 2019 on the detailed scope of data included in tax declarations and records in the field of value-added tax (Dz. U. of 2019, item 1988, as amended) |
| Act                                    | Act of 11 March 2004 on Value Added Tax (Dz. U. of 2025, item 775, as amended)                                                                                                                                                      |

---

## 1. Introduction

### 1.1 Definition of a Structured Invoice

A structured invoice (e-invoice) is an invoice issued using KSeF together with an identification
number assigned to that invoice in that system (Article 2 sec. 32a of the Act).

A structured invoice is issued and received using KSeF via interface software, in electronic form
and in accordance with the electronic document template within the meaning of the Act of 17 February
2005 on the computerisation of activities of entities performing public tasks.

### 1.2 Model Structured Invoice

- The logical structure FA(2), effective from 1 September 2023, was used until 31 January 2026.
- **From 1 February 2026, the logical structure FA(3) is the binding structured invoice template.**
- The FA(3) logical structure in its production version is available at:
  `https://crd.gov.pl/wzor/2025/06/25/13775/`

> **CRITICAL RULE:** The FA(3) logical structure applies to ALL structured invoices issued from 1
> February 2026. This includes:
>
> - Corrective invoices where the original invoice was issued before 1 February 2026 using FA(2) or
>   FA(1)
> - Final invoices where the advance invoice was issued before 1 February 2026 using FA(2) or FA(1)

---

## 2. Field (Data) Formats in the Structured Invoice File

### 2.1 File Format

The file format is **XML**.

### 2.2 Element Categories

Fields (elements) in the XML file fall into three categories:

| Category        | Definition                                                                                                                                                             | Validator Implication                                                   |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **Mandatory**   | Entries must be made without exception. The mandatory nature results primarily from applicable legislation and is determined by the logical structure of the template. | Missing = validation error                                              |
| **Conditional** | Entries are required only if the statutory condition is met. Filling in this field is not required for the semantic validity of the file.                              | Must validate the condition; if condition met and field missing = error |
| **Optional**    | Filling in the field is not required either for the semantic validity of the file or under statutory regulations. May be required under other legal acts.              | No validation error if missing                                          |

> **CRITICAL RULE — Nested Element Obligation:** When analysing the mandatory nature of a given
> field, the nature of the element in which the field appears must also be examined.
>
> **Example:** `Fa/Platnosc` and its child `RachunekBankowy` are optional. But:
>
> - If the taxpayer fills in `RachunekBankowy`, then `NrRB` inside it becomes **mandatory**.
> - If the taxpayer does not fill in `RachunekBankowy`, then `NrRB` must remain empty.

### 2.3 Character Fields

- Character fields are **alphanumeric** (upper-case, lower-case letters, and digits).
- **Default max length:** 256 characters.
- **Special max lengths:**

| Max Length | Fields                                                                                                                    |
| ---------- | ------------------------------------------------------------------------------------------------------------------------- |
| 13         | IPKSeF                                                                                                                    |
| 20         | GTIN, GTINZ                                                                                                               |
| 32         | IDNabywcy                                                                                                                 |
| 50         | CN, CNZ, Indeks, IndeksZ, OpisInnegoLadunku, OpisInnegoTransportu, PKOB, PKOBZ, PKWiU, PKWiUZ, UU_ID, UU_IDZ, Jednostka   |
| 512        | Nazwa, AdresL1, AdresL2, P_7, P_7Z, LinkDoPlatnosci, ZNaglowek (in Zalacznik), Akapit (in Zalacznik), Opis (in Zalacznik) |
| 3500       | StopkaFaktury                                                                                                             |

### 2.4 Encoding

Polish diacritical characters must be entered using **UTF-8** encoding. Special characters are
permitted in character fields, such as `/`, `–`, `+`.

### 2.5 Amount (Numeric) Fields

- Values must be entered as a sequence of digits, **without thousand separators** (no spaces).
- Only a **full stop (`.`)** may be used as the decimal separator.

### 2.6 Decimal Precision

| Precision                  | Fields                                                                                                    |
| -------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Up to 2 decimal places** | General amounts (e.g. 12345.56)                                                                           |
| **Up to 6 decimal places** | P_8B, P_12_XII, P_8BZ, P_12Z_XII, KursWaluty, KursWalutyZK, KursWalutyZW, KursWalutyZ, KursUmowny, Udzial |
| **Up to 8 decimal places** | P_9A, P_9B, P_9AZ (unit prices), P_10 (discounts/reductions)                                              |

### 2.7 Negative Values

Negative values must be preceded by a **minus sign (`–`)**.

### 2.8 Date Format

Dates must be given in the format **`YYYY-MM-DD`** (e.g. `2026-02-01`).

### 2.9 DateTime Format

Only one field requires date and time: `DataWytworzeniaFa` (date and time of invoice creation).

Format: **`YYYY-MM-DDTHH:MM:SS`** (e.g. `2026-02-01T09:30:47Z`, where `T` denotes "Time").

When providing universal time (UTC), the letter **`Z`** (Zulu) must be appended at the end.

Additional optional datetime fields with the same format: `DataGodzRozpTransportu`,
`DataGodzZakTransportu`.

### 2.10 Tax Identification Numbers

- Must be entered as a **continuous string of digits or letters**, without spaces or other
  separating characters.
- The alphabetic **country code must be entered in a separate field** designated for this purpose.

> **CRITICAL RULE — NIP Placement:** The Polish taxpayer identification number (NIP) of the
> purchaser **MUST** be entered in the `NIP` field within `Podmiot2/DaneIdentyfikacyjne`. It **MUST
> NOT** be provided in the `NrVatUE` or `NrID` fields. The invoice will be correctly made available
> to the purchaser in KSeF **only if** the purchaser's NIP is entered in the `NIP` field — not in
> `NrVatUE` or `NrID`.

---

## 3. Main Schema Structure for FA(3)

### 3.1 Top-Level Elements

| Element                | Obligation    | Description                                                                   |
| ---------------------- | ------------- | ----------------------------------------------------------------------------- |
| **Naglowek**           | **Mandatory** | Header — date/time of invoice generation, ICT system name                     |
| **Podmiot1**           | **Mandatory** | Seller/taxpayer data                                                          |
| **Podmiot2**           | **Mandatory** | Purchaser data                                                                |
| **Podmiot3**           | Optional      | Third parties (max 100 occurrences)                                           |
| **PodmiotUpowazniony** | Conditional   | Authorised entity (bailiff, enforcement authority, tax representative)        |
| **Fa**                 | **Mandatory** | Transaction details, invoice elements, settlement, payment, transaction terms |
| **Stopka**             | Optional      | Footer — KRS, REGON, additional info                                          |
| **Zalacznik**          | Optional      | Attachment for invoices with complex data                                     |

---

## 4. Naglowek (Header)

### 4.1 Structure

| Field               | Obligation | Description                                                                                                       |
| ------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------- |
| `KodFormularza`     | Mandatory  | Two attributes: `kodSystemowy` = `FA(3)`, `wersjaSchemy` = `1-0E`                                                 |
| `WariantFormularza` | Mandatory  | Schema designation. Current value: **`3`**                                                                        |
| `DataWytworzeniaFa` | Mandatory  | Date and time of invoice generation. Format: `YYYY-MM-DDTHH:MM:SS` (e.g. `2026-02-01T09:30:47Z`). Z = Zulu = UTC. |
| `SystemInfo`        | Optional   | Name of the ICT system used by the taxpayer                                                                       |

> **NOTE:** `DataWytworzeniaFa` MAY differ from the date in field `P_1` and MAY differ from the date
> of actual delivery to KSeF.

---

## 5. Podmiot1 (Seller/Taxpayer)

### 5.1 Overview

Podmiot1 is a **mandatory** component. Its key field is the Tax Identification Number (NIP), which
is essential for taxpayer authorisation within KSeF. **If NIP is not provided, issuing the invoice
within KSeF will not be possible.**

### 5.2 Podmiot1 Fields

| Field                 | Obligation  | Description                                                                                                                                                                                                                                                                          |
| --------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `PrefiksPodatnika`    | Conditional | VAT EU code (prefix) — "PL" must be provided when issuing invoices documenting: intra-Community supply of goods; provision of services referred to in Art. 100 sec. 1 item 1; supply under simplified triangular transaction by second taxpayer (Art. 135 sec. 1 item 4(b) and (c)). |
| `NrEORI`              | Optional    | Taxpayer's EORI number                                                                                                                                                                                                                                                               |
| `DaneIdentyfikacyjne` | Mandatory   | Seller identification: NIP + Nazwa                                                                                                                                                                                                                                                   |
| `Adres`               | Mandatory   | Seller address                                                                                                                                                                                                                                                                       |
| `AdresKoresp`         | Optional    | Correspondence address                                                                                                                                                                                                                                                               |
| `DaneKontaktowe`      | Optional    | Contact details (max 3 occurrences)                                                                                                                                                                                                                                                  |
| `StatusInfoPodatnika` | Optional    | Taxpayer status: "1" = liquidation, "2" = restructuring, "3" = bankruptcy, "4" = business in inheritance. Filling is at the taxpayer's discretion.                                                                                                                                   |

### 5.3 Podmiot1/DaneIdentyfikacyjne

| Field   | Obligation | Description                                                                                                      |
| ------- | ---------- | ---------------------------------------------------------------------------------------------------------------- |
| `NIP`   | Mandatory  | Taxpayer's NIP (without country code)                                                                            |
| `Nazwa` | Mandatory  | Full name or business name (max 512 chars). Can also be trade name. Example: "Jan Kowalski, XYZ automotive shop" |

### 5.4 Podmiot1/Adres

| Field      | Obligation | Description                                                               |
| ---------- | ---------- | ------------------------------------------------------------------------- |
| `KodKraju` | Mandatory  | Country code                                                              |
| `AdresL1`  | Mandatory  | Address line 1 (max 512 chars). Example: "ul. Błękitna 14, 11-111 Warsaw" |
| `AdresL2`  | Optional   | Address line 2 (max 512 chars)                                            |
| `GLN`      | Optional   | Global Location Number                                                    |

### 5.5 Podmiot1/AdresKoresp (Optional Element)

| Field      | Obligation                 | Description                                   |
| ---------- | -------------------------- | --------------------------------------------- |
| `KodKraju` | Mandatory (within element) | Country code                                  |
| `AdresL1`  | Mandatory (within element) | Correspondence address line 1 (max 512 chars) |
| `AdresL2`  | Optional                   | Correspondence address line 2 (max 512 chars) |
| `GLN`      | Optional                   | Global Location Number                        |

### 5.6 Podmiot1/DaneKontaktowe (Optional Element, max 3 occurrences)

| Field     | Obligation | Description                       |
| --------- | ---------- | --------------------------------- |
| `Email`   | Optional   | Email address (e.g. abc@xyz.pl)   |
| `Telefon` | Optional   | Telephone number (e.g. 801055055) |

---

## 6. Podmiot2 (Purchaser)

### 6.1 Podmiot2 Fields

| Field                 | Obligation  | Description                                                                                    |
| --------------------- | ----------- | ---------------------------------------------------------------------------------------------- |
| `NrEORI`              | Optional    | Purchaser's EORI number                                                                        |
| `DaneIdentyfikacyjne` | Mandatory   | Purchaser identification                                                                       |
| `Adres`               | Conditional | Purchaser address — conditional for simplified invoices (Art. 106e sec. 5 item 3)              |
| `AdresKoresp`         | Optional    | Correspondence address                                                                         |
| `DaneKontaktowe`      | Optional    | Contact details (max 3 occurrences)                                                            |
| `NrKlienta`           | Optional    | Customer number used in contract or order                                                      |
| `IDNabywcy`           | Optional    | Unique key for linking purchaser data on corrective invoices (max 32 chars)                    |
| `JST`                 | Mandatory   | Subordinate Local Government Unit flag: "1" = invoice concerns subordinate JST, "2" = does not |
| `GV`                  | Mandatory   | GV member flag: "1" = invoice concerns GV member, "2" = does not                               |

> **CRITICAL RULE — JST flag:** If `JST` = "1", then `Podmiot3` MUST be completed with the
> subordinate JST's data (NIP or IDWew) and `Rola` = "8" (JST – recipient).

> **CRITICAL RULE — GV flag:** If `GV` = "1", then `Podmiot3` MUST be completed with the GV member's
> data (NIP or IDWew) and `Rola` = "10" (GV member – recipient).

### 6.2 Podmiot2/DaneIdentyfikacyjne

| Field      | Obligation                                                | Description                                                                                                                                                                   |
| ---------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NIP`      | Choice (one of NIP, KodUE+NrVatUE, KodKraju+NrID, BrakID) | Purchaser's NIP (without country code)                                                                                                                                        |
| `KodUE`    | Conditional                                               | VAT EU purchaser code (prefix). Required for: intra-Community supply of goods; provision of services per Art. 100 sec. 1 item 1; simplified triangular transaction.           |
| `NrVatUE`  | Conditional                                               | Purchaser's VAT identification number (without country code from KodUE). For intra-Community supply, Art. 100 sec. 1 item 1 services, and simplified triangular transactions. |
| `KodKraju` | Optional                                                  | Country code for other tax identifier                                                                                                                                         |
| `NrID`     | Choice                                                    | Tax identifier other than NIP and NrVatUE                                                                                                                                     |
| `BrakID`   | Choice                                                    | "1" = purchaser has no tax ID or it doesn't appear on invoice (e.g. consumer). Also for simplified invoices per Art. 106e sec. 5 item 2.                                      |
| `Nazwa`    | Mandatory                                                 | Full name or business name (max 512 chars). Can be trade name.                                                                                                                |

> **CRITICAL RULE — NIP vs NrVatUE vs NrID:** The purchaser's Polish NIP **MUST NOT** be entered in
> `NrVatUE` or `NrID` fields. These fields are not intended for that purpose. The invoice will only
> be correctly made available to the purchaser if their NIP is in the `NIP` field.

### 6.3 Podmiot2/Adres

| Field      | Obligation                 | Description                    |
| ---------- | -------------------------- | ------------------------------ |
| `KodKraju` | Mandatory (within element) | Country code                   |
| `AdresL1`  | Mandatory (within element) | Address line 1 (max 512 chars) |
| `AdresL2`  | Optional                   | Address line 2 (max 512 chars) |
| `GLN`      | Optional                   | Global Location Number         |

### 6.4 Podmiot2/AdresKoresp (Optional Element)

Same structure as Podmiot1/AdresKoresp.

### 6.5 Podmiot2/DaneKontaktowe (Optional Element, max 3 occurrences)

| Field     | Obligation | Description      |
| --------- | ---------- | ---------------- |
| `Email`   | Optional   | Email address    |
| `Telefon` | Optional   | Telephone number |

---

## 7. Podmiot3 (Third Party)

### 7.1 Overview

Optional element containing data of any third parties other than Podmiot1 and Podmiot2 that are
related to the invoice. **Max 100 occurrences.**

Purposes include:

- Payer or recipient of goods
- Factor
- Original entity (e.g., company being acquired in a merger)
- VAT group member (as issuer or recipient)
- Subordinate JST unit
- Branch/division of a legal person (with IDWew field)
- **Role 11 – Employee** (new in FA(3)) — for employee expenses where an employee purchases on
  behalf of employer

### 7.2 Podmiot3 Fields

| Field                 | Obligation                 | Description                                                                                                                      |
| --------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `IDNabywcy`           | Optional                   | Unique key for linking purchaser data on corrective invoices (max 32 chars)                                                      |
| `NrEORI`              | Optional                   | Third party's EORI number                                                                                                        |
| `DaneIdentyfikacyjne` | Mandatory (within element) | Third party identification                                                                                                       |
| `Adres`               | Optional                   | Address                                                                                                                          |
| `AdresKoresp`         | Optional                   | Correspondence address                                                                                                           |
| `DaneKontaktowe`      | Optional                   | Contact details (max 3 occurrences)                                                                                              |
| `Rola`                | Conditional                | Role — see values below                                                                                                          |
| `RolaInna`            | Conditional                | "1" if the third party has a role not listed in Rola                                                                             |
| `OpisRoli`            | Conditional                | Description of the other role (when `RolaInna` = "1")                                                                            |
| `Udzial`              | Optional                   | Share of additional purchaser (percentage). Only when `Rola` = "4". If not filled, equal shares assumed. Up to 6 decimal places. |
| `NrKlienta`           | Optional                   | Customer number                                                                                                                  |

### 7.3 Rola Values

| Value | Meaning                                                                                                           |
| ----- | ----------------------------------------------------------------------------------------------------------------- |
| "1"   | Factor                                                                                                            |
| "2"   | Recipient (internal units/branches/divisions of purchaser)                                                        |
| "3"   | Original entity (taken over/transformed entity)                                                                   |
| "4"   | Additional purchaser                                                                                              |
| "5"   | Invoice issuer (on behalf of taxpayer) — **NOT for self-billing, NOT for bailiff/enforcement/tax representative** |
| "6"   | Payer (paying on behalf of purchaser)                                                                             |
| "7"   | Local government unit (JST) – issuer                                                                              |
| "8"   | Local government unit (JST) – recipient                                                                           |
| "9"   | GV member – issuer                                                                                                |
| "10"  | GV member – recipient                                                                                             |
| "11"  | Employee                                                                                                          |

> **CRITICAL RULE — Self-billing:** Role "5" does NOT apply to self-billing. For self-billing, the
> purchaser's data must be in Podmiot2, and `Fa/Adnotacje/P_17` = "1". The purchaser should NOT
> appear in Podmiot3 with role "5".

> **CRITICAL RULE — Employee (Role 11):** When `Rola` = "11": `DaneIdentyfikacyjne/BrakID` = "1",
> `DaneIdentyfikacyjne/Nazwa` = employee's full name. Address and contact details are optional.

> **CRITICAL RULE — Dual roles:** If the same Podmiot3 has two simultaneous roles, the taxpayer may
> either:
>
> - Fill in Podmiot3 twice (separately for each role), OR
> - Fill in Podmiot3 once using `RolaInna` and `OpisRoli` to describe both roles.

### 7.4 Podmiot3/DaneIdentyfikacyjne

| Field      | Obligation                 | Description                                                                                                     |
| ---------- | -------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `NIP`      | Choice                     | Third party's NIP                                                                                               |
| `IDWew`    | Choice                     | Internal identifier with NIP — unique identifier of a branch/division, generated in KSeF (NIP + numeric string) |
| `KodUE`    | Choice                     | VAT EU code                                                                                                     |
| `NrVatUE`  | Choice                     | VAT identification number (without country code)                                                                |
| `KodKraju` | Optional                   | Country code for other tax ID                                                                                   |
| `NrID`     | Choice                     | Other tax identifier                                                                                            |
| `BrakID`   | Choice                     | "1" if no tax ID or ID not on invoice                                                                           |
| `Nazwa`    | Mandatory (within element) | Full name or business name (max 512 chars)                                                                      |

---

## 8. PodmiotUpowazniony (Authorised Entity)

### 8.1 Overview

**Conditional element.** Required when conditions specified in Articles 106c and 106d of the VAT Act
are met:

1. **Enforcement proceedings (Art. 106c):** Invoices documenting supply of goods under enforcement
   proceedings — issued by enforcement bodies or court bailiffs on behalf of the debtor.
   - Podmiot1 = debtor (taxpayer)
   - Podmiot2 = purchaser
   - PodmiotUpowazniony = bailiff or enforcement authority

2. **Tax representative (Art. 106d sec. 2):** Invoices issued by a third party authorised by the
   taxpayer (e.g. tax representative per Art. 18a).
   - Podmiot1 = taxpayer
   - Podmiot2 = purchaser
   - PodmiotUpowazniony = tax representative

**Minimum required data:** `DaneIdentyfikacyjne`, `Adres`, and `RolaPU` (including NIP).

### 8.2 PodmiotUpowazniony Fields

| Field                 | Obligation                 | Description                                                                                                                     |
| --------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `NrEORI`              | Optional                   | EORI number                                                                                                                     |
| `DaneIdentyfikacyjne` | Mandatory (within element) | NIP + Nazwa (max 512 chars)                                                                                                     |
| `Adres`               | Mandatory (within element) | KodKraju + AdresL1 (max 512) + AdresL2 (optional, max 512) + GLN (optional)                                                     |
| `AdresKoresp`         | Optional                   | Correspondence address                                                                                                          |
| `DaneKontaktowe`      | Optional                   | Contact details (max 3 occurrences): EmailPU, TelefonPU                                                                         |
| `RolaPU`              | Mandatory (within element) | "1" = Enforcement authority (Art. 106c item 1), "2" = Court bailiff (Art. 106c item 2), "3" = Tax representative (Art. 18a-18d) |

---

## 9. Fa (Invoice Details)

### 9.1 General Rules

- Fields relating to value of sales and tax shall be completed in the **currency in which the
  invoice was issued**, except for tax fields calculated per Section VI in conjunction with Art.
  106e sec. 11 of the Act.
- **Corrective invoices:** All fields filled in according to status AFTER correction. Fields for tax
  base, tax and total receivables filled in based on the DIFFERENCE.

### 9.2 Core Fa Fields (KodWaluty through OkresFa)

| Field       | Obligation  | Description                                                                                                                                                                            |
| ----------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `KodWaluty` | Mandatory   | Currency code (ISO 4217). For PLN invoices: "PLN".                                                                                                                                     |
| `P_1`       | Mandatory   | Date of issue. See detailed rules below.                                                                                                                                               |
| `P_1M`      | Optional    | Place of invoice issuance                                                                                                                                                              |
| `P_2`       | Mandatory   | Subsequent invoice number, assigned within one or more series. **NOT the KSeF identification number.**                                                                                 |
| `WZ`        | Optional    | WZ (release) warehouse document number (max 1,000 occurrences)                                                                                                                         |
| `P_6`       | Conditional | Date of delivery/completion or date of payment receipt (Art. 106b sec. 1(4)). Completed when the same for ALL invoice items. If dates differ per item, use `P_6A` in FaWiersz instead. |
| `OkresFa`   | Conditional | Period to which the invoice relates — for cases in Art. 19a sec. 3 (first sentence), sec. 4 and sec. 5 item 4. Contains `P_6_Od` (start) and `P_6_Do` (end), both YYYY-MM-DD.          |

#### P_1 — Date of Issue Rules

**Online mode (Art. 106na sec. 1):** Invoice deemed issued on the date it was **sent to KSeF**,
provided the date in P_1 matches the sending date.

**Cases where P_1 is the formal date of issue (may differ from KSeF sending date):**

- Invoices in "offline24" mode (Art. 106nda sec. 10)
- Invoices in "online" mode where sending date > P_1 date (Art. 106nda sec. 16)
- Invoices in "offline" mode due to KSeF unavailability (Art. 106nda sec. 10 + Art. 106nh sec. 4)
- Invoices in "emergency" mode due to KSeF failure (Art. 106nf sec. 9)

> **API NOTE:** From the API perspective, the "offline" mode can be declared. Without declaration,
> "online" mode is assumed by default. The "offline24" mode is recognized as "offline" if sending
> date = P_1 + 1 day.

### 9.3 Tax Summary Fields (P_13_1 through P_14_5)

These are completed in the currency the invoice was issued in. Each group is a sequence of net
base + tax + tax-in-PLN-if-foreign-currency.

| Field     | Description                                                          | Applies When                                                     |
| --------- | -------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `P_13_1`  | Net sales at basic rate (23% or 22%)                                 | Invoice has basic rate sales. **Not for margin scheme.**         |
| `P_14_1`  | Tax at basic rate                                                    | Same                                                             |
| `P_14_1W` | Tax at basic rate converted to PLN (conditional)                     | Foreign currency invoice with basic rate                         |
| `P_13_2`  | Net sales at first reduced rate (8% or 7%)                           | Invoice has first reduced rate sales. **Not for margin scheme.** |
| `P_14_2`  | Tax at first reduced rate                                            | Same                                                             |
| `P_14_2W` | Tax at first reduced rate in PLN (conditional)                       | Foreign currency invoice with first reduced rate                 |
| `P_13_3`  | Net sales at second reduced rate (5%)                                | Invoice has 5% rate sales. **Not for margin scheme.**            |
| `P_14_3`  | Tax at second reduced rate                                           | Same                                                             |
| `P_14_3W` | Tax at second reduced rate in PLN (conditional)                      | Foreign currency invoice with 5% rate                            |
| `P_13_4`  | Net sales for lump sum passenger taxis                               | Invoice has passenger taxi rate                                  |
| `P_14_4`  | Tax for lump sum passenger taxis                                     | Same                                                             |
| `P_14_4W` | Tax for taxis in PLN (conditional)                                   | Foreign currency                                                 |
| `P_13_5`  | Net sales under special procedure (Section XII, Chapter 6a — EU OSS) | Invoice has EU OSS sales                                         |
| `P_14_5`  | Tax under EU OSS (conditional)                                       | Same                                                             |

### 9.4 Additional Tax Summary Fields (P_13_6_1 through P_15)

| Field      | Obligation  | Description                                                                                                                                             |
| ---------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `P_13_6_1` | Conditional | 0% rate sales excluding ICS and export (e.g. Art. 83 sec. 1)                                                                                            |
| `P_13_6_2` | Conditional | 0% rate — intra-Community supply of goods                                                                                                               |
| `P_13_6_3` | Conditional | 0% rate — export                                                                                                                                        |
| `P_13_7`   | Conditional | Tax-exempt sales                                                                                                                                        |
| `P_13_8`   | Conditional | Sales outside the country (excluding P_13_5 and P_13_9 amounts). E.g. services where place of taxation per Art. 28e, not settled under EU OSS.          |
| `P_13_9`   | Conditional | Services per Art. 100 sec. 1 item 4                                                                                                                     |
| `P_13_10`  | Conditional | Reverse charge (repealed Art. 17 sec. 1 item 7/8 and other domestic reverse charge, e.g. Art. 145e sec. 1)                                              |
| `P_13_11`  | Conditional | Margin scheme (Art. 119 and Art. 120)                                                                                                                   |
| `P_15`     | Mandatory   | Total amount due. For advance invoices = payment amount. For Art. 106f sec. 3 invoices = remaining amount. For corrective invoices = correction amount. |

### 9.5 KursWalutyZ, Adnotacje, RodzajFaktury

| Field           | Obligation | Description                                                                                    |
| --------------- | ---------- | ---------------------------------------------------------------------------------------------- |
| `KursWalutyZ`   | Optional   | Exchange rate for tax calculation on advance invoices (Art. 106b sec. 1 item 4) per Section VI |
| `Adnotacje`     | Mandatory  | Notes on the invoice (see section 9.6)                                                         |
| `RodzajFaktury` | Mandatory  | Invoice type — see values below                                                                |

#### RodzajFaktury Values

| Value     | Meaning                                                                          |
| --------- | -------------------------------------------------------------------------------- |
| `VAT`     | Basic invoice                                                                    |
| `KOR`     | Corrective invoice                                                               |
| `ZAL`     | Advance invoice (receipt of payment before activity, including Art. 106f sec. 4) |
| `ROZ`     | Settlement invoice (Art. 106f sec. 3)                                            |
| `UPR`     | Simplified invoice (Art. 106e sec. 5 item 3)                                     |
| `KOR_ZAL` | Corrective invoice for advance invoice                                           |
| `KOR_ROZ` | Corrective invoice for settlement invoice                                        |

> **RULE:** Corrective invoice to a simplified invoice (Art. 106e sec. 5(3)) → use `KOR`, not a
> separate type.

> **RULE — ROZ for Art. 106b sec. 1a:** When a taxpayer does not issue an advance invoice per Art.
> 106b sec. 1a (payment received in same month as activity), the invoice issued after goods
> delivered/services performed, containing elements per Art. 106e sec. 1a, shall be marked `ROZ`.

### 9.6 Adnotacje (Notes)

| Field                  | Obligation | Values                                                                                                                       |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `P_16`                 | Mandatory  | "1" = cash accounting note; "2" = no cash accounting                                                                         |
| `P_17`                 | Mandatory  | "1" = self-billing; "2" = not self-billing                                                                                   |
| `P_18`                 | Mandatory  | "1" = reverse charge; "2" = no reverse charge. Also applies to domestic reverse charge (Art. 145e, Art. 17 sec. 1 item 7/8). |
| `P_18A`                | Mandatory  | "1" = split payment mechanism (total > PLN 15,000, Annex 15 goods/services); "2" = no split payment                          |
| `Zwolnienie`           | Mandatory  | Tax exemption element (see below)                                                                                            |
| `NoweSrodkiTransportu` | Mandatory  | New means of transport element (see below)                                                                                   |
| `P_23`                 | Mandatory  | "1" = simplified triangular transaction note; "2" = no such note                                                             |
| `PMarzy`               | Mandatory  | Margin scheme element (see below)                                                                                            |

#### Zwolnienie (Exemption)

Exactly one of these patterns must apply:

- **P_19 = "1":** Exempt sale exists. Then ONE of `P_19A`, `P_19B`, `P_19C` must also be filled
  (legal basis).
- **P_19N = "1":** No exempt sale. Then P_19, P_19A, P_19B, P_19C are omitted.

| Field   | Description                                                      |
| ------- | ---------------------------------------------------------------- |
| `P_19A` | Provision of the Act or instrument under which exemption applies |
| `P_19B` | Provision of Directive 2006/112/EC granting exemption            |
| `P_19C` | Other legal basis for exemption                                  |

#### NoweSrodkiTransportu (New Means of Transport)

Exactly one of these patterns must apply:

- **P_22 = "1":** Intra-Community supply of new means of transport. Then `P_42_5` and
  `NowySrodekTransportu` elements must be completed (max 10,000 occurrences).
- **P_22N = "1":** No such supply. Then P_22, P_42_5, NowySrodekTransportu are omitted.

NowySrodekTransportu fields per vehicle/watercraft/aircraft:

- `P_22A` (date put into service, YYYY-MM-DD) — mandatory
- `P_NrWierszaNST` (invoice row number for this item) — mandatory
- `P_22BMK` (make), `P_22BMD` (model), `P_22BK` (colour), `P_22BNR` (registration no.), `P_22BRP`
  (year of manufacture) — all optional
- For land vehicles (Art. 2 item 10(a)): `P_22B` (mileage) — mandatory; `P_22B1` (VIN), `P_22B2`
  (body no.), `P_22B3` (chassis no.), `P_22B4` (frame no.) — **selection type: only ONE** can be
  filled; `P_22BT` (type) — optional
- For watercraft (Art. 2 item 10(b)): `P_22C` (working hours) — mandatory; `P_22C1` (hull no.) —
  optional
- For aircraft (Art. 2 item 10(c)): `P_22D` (working hours) — mandatory; `P_22D1` (factory no.) —
  optional

#### PMarzy (Margin Scheme)

Exactly one of these patterns must apply:

- **P_PMarzy = "1":** Margin scheme applies. Then exactly ONE of: `P_PMarzy_2`, `P_PMarzy_3_1`,
  `P_PMarzy_3_2`, `P_PMarzy_3_3` must be "1" (selection type).
- **P_PMarzyN = "1":** No margin scheme. All P_PMarzy fields omitted.

| Value                | Meaning                                                   |
| -------------------- | --------------------------------------------------------- |
| `P_PMarzy_2` = "1"   | Tour operator margin scheme (Art. 119)                    |
| `P_PMarzy_3_1` = "1" | Margin scheme — second-hand goods (Art. 120)              |
| `P_PMarzy_3_2` = "1" | Margin scheme — works of art (Art. 120)                   |
| `P_PMarzy_3_3` = "1" | Margin scheme — collectors' items and antiques (Art. 120) |

### 9.7 Corrective Invoice Fields

| Field                | Obligation  | Description                                                                                                                                                        |
| -------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `PrzyczynaKorekty`   | Optional    | Reason for correction (per Art. 106j sec. 2a(2))                                                                                                                   |
| `TypKorekty`         | Optional    | Type of correction effect in VAT records: "1" = effect on date of original invoice, "2" = effect on date of corrective invoice, "3" = effect on different date     |
| `DaneFaKorygowanej`  | Conditional | Details of corrected invoice (max 50,000 occurrences). Must be provided separately for each original invoice being corrected.                                      |
| `OkresFaKorygowanej` | Conditional | Period for collective corrective invoices (Art. 106j sec. 3) — when discount/reduction granted for a given period                                                  |
| `NrFaKorygowany`     | Conditional | Correct invoice number when reason for correction is incorrect number                                                                                              |
| `Podmiot1K`          | Conditional | Seller's data from the corrected invoice (for correcting seller details). Does NOT apply to incorrect NIP — requires zeroing correction instead.                   |
| `Podmiot2K`          | Conditional | Purchaser data from the corrected invoice (for correcting purchaser details). Incorrect NIP is NOT correctable — requires zeroing correction. Max 101 occurrences. |
| `P_15ZK`             | Conditional | Amount paid/remaining before correction (for corrective advance/settlement invoices)                                                                               |
| `KursWalutyZK`       | Optional    | Exchange rate before correction (for corrective advance invoices)                                                                                                  |

#### DaneFaKorygowanej Structure

| Field                   | Obligation                 | Description                                                                                                                                                                                                    |
| ----------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DataWystFaKorygowanej` | Mandatory (within element) | Date of issue of corrected invoice. Rules depend on how original was issued (outside KSeF, offline, online). For online mode: date it was sent to KSeF per Art. 106na sec. 1 (if P_1 matches sending date).    |
| `NrFaKorygowanej`       | Mandatory (within element) | Number of the corrected invoice (Art. 106e sec. 1 item 2). Filled regardless of whether corrected invoice was issued in KSeF or outside.                                                                       |
| `NrKSeF`                | Choice                     | "1" if corrected invoice was issued in KSeF. Then `NrKSeFFaKorygowanej` must also be filled. This obligation applies even for invoices issued per Art. 106nda sec. 1/16, Art. 106nh sec. 1, Art. 106nf sec. 1. |
| `NrKSeFFaKorygowanej`   | Conditional                | KSeF number of corrected invoice (when `NrKSeF` = "1")                                                                                                                                                         |
| `NrKSeFN`               | Choice                     | "1" if corrected invoice was issued outside KSeF. Then NrKSeF and NrKSeFFaKorygowanej are omitted.                                                                                                             |

> **CRITICAL RULE — Correcting NIP:** Incorrect NIP of seller (Podmiot1) or purchaser
> (Podmiot2/Podmiot3 role "4") is **NOT subject to correction**. A correction of the invoice **to
> zero values** is required instead.

### 9.8 ZaliczkaCzesciowa (Partial Advance Payment)

Conditional element for invoices documenting receipt of multiple payments (Art. 106b sec. 1 item 4)
or invoices per Art. 106e sec. 1a (in conjunction with Art. 106b sec. 1a). **Max 31 occurrences.**

| Field          | Obligation                 | Description                                                                         |
| -------------- | -------------------------- | ----------------------------------------------------------------------------------- |
| `P_6Z`         | Mandatory (within element) | Date of payment receipt                                                             |
| `P_15Z`        | Mandatory (within element) | Payment amount (making up P_15 total). For corrective invoices = correction amount. |
| `KursWalutyZW` | Optional                   | Exchange rate for this payment (up to 6 decimal places)                             |

> **NOTE:** When an invoice issued after delivery also documents advance payments received before
> the activity, the difference between P_15 and the sum of P_15Z values = remaining amount above
> pre-activity payments.

### 9.9 Additional Fa Fields

| Field               | Obligation  | Description                                                                                                                                                               |
| ------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `FP`                | Optional    | "1" = invoice per Art. 109 sec. 3d                                                                                                                                        |
| `TP`                | Optional    | "1" = related party transaction (Art. 10 sec. 4 item 3, subject to sec. 4b of JPK_VAT Regulation). NOT used when relationship arises exclusively from State Treasury/JST. |
| `DodatkowyOpis`     | Optional    | Additional descriptions (key-value pairs, max 10,000). Fields: `NrWiersza` (optional, links to FaWiersz line), `Klucz` (key, max 256), `Wartosc` (value, max 256).        |
| `FakturaZaliczkowa` | Conditional | Advance invoice references (max 100). See below.                                                                                                                          |
| `ZwrotAkcyzy`       | Optional    | "1" = additional info for excise duty refund (farmers, diesel fuel)                                                                                                       |
| `FaWiersz`          | Conditional | Invoice line items (max 10,000). See section 10.                                                                                                                          |
| `Rozliczenie`       | Optional    | Additional settlement details. See section 11.                                                                                                                            |
| `Platnosc`          | Optional    | Payment terms. See section 12.                                                                                                                                            |
| `WarunkiTransakcji` | Optional    | Transaction terms. See section 13.                                                                                                                                        |
| `Zamowienie`        | Conditional | Order/agreement data for advance invoices (Art. 106f sec. 1 item 4). See section 14.                                                                                      |

#### FakturaZaliczkowa Structure

| Field                 | Obligation  | Description                                                                                                  |
| --------------------- | ----------- | ------------------------------------------------------------------------------------------------------------ |
| `NrKSeFZN`            | Choice      | "1" = advance invoice issued outside KSeF. Then `NrFaZaliczkowej` must be filled.                            |
| `NrFaZaliczkowej`     | Conditional | Number of advance invoice issued outside KSeF                                                                |
| `NrKSeFFaZaliczkowej` | Choice      | KSeF number of advance invoice (when issued in KSeF). When filled, NrKSeFZN and NrFaZaliczkowej are omitted. |

---

## 10. FaWiersz (Invoice Line Items)

### 10.1 Overview

Contains detailed invoice items in the invoice's currency. **Max 10,000 occurrences.**

Optional for: advance invoices, corrective advance invoices, and collective corrective invoices
(Art. 106j sec. 3) where discount data is provided broken down by rate in the Fa section.

For collective corrective invoices (Art. 106j sec. 3) where discount applies to part of supplies,
FaWiersz should include names of goods/services covered by the correction.

For settlement invoices (Art. 106f sec. 3): full value of the order must be shown.

For corrective invoices correcting line items: show differences OR show "before" and "after" as
separate rows.

### 10.2 FaWiersz Fields

| Field         | Obligation  | Description                                                                                                                    |
| ------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `NrWierszaFa` | Mandatory   | Consecutive invoice row number (1, 2, 3...)                                                                                    |
| `UU_ID`       | Optional    | Universal unique invoice line number (max 50 chars)                                                                            |
| `P_6A`        | Conditional | Date of delivery/payment per item (when dates differ per item). When common date for all lines → use P_6 in Fa instead.        |
| `P_7`         | Conditional | Name (type) of goods or service (max 512 chars). Not required only for Art. 106j sec. 3 item 2 collective corrective invoices. |
| `Indeks`      | Optional    | Internal product code or additional description (max 50 chars)                                                                 |
| `GTIN`        | Optional    | Global Trade Item Number (max 20 chars)                                                                                        |
| `PKWiU`       | Optional    | Polish Classification of Goods and Services symbol (2015 classification, max 50 chars)                                         |
| `CN`          | Optional    | Combined Nomenclature symbol (max 50 chars)                                                                                    |
| `PKOB`        | Optional    | Polish Classification of Types of Constructions symbol (max 50 chars)                                                          |
| `P_8A`        | Conditional | Measure/unit. Not required for simplified invoices (Art. 106e sec. 5 item 3).                                                  |
| `P_8B`        | Conditional | Quantity. Not required for simplified invoices. Up to 6 decimal places.                                                        |
| `P_9A`        | Conditional | Net unit price. Not required for margin scheme or simplified invoices. Up to 8 decimal places.                                 |
| `P_9B`        | Conditional | Gross unit price — only when Art. 106e sec. 7/8 formula is applied. Up to 8 decimal places.                                    |
| `P_10`        | Conditional | Discounts/price reductions. Not required for margin scheme or Art. 106e sec. 5 item 1 cases. Up to 8 decimal places.           |
| `P_11`        | Conditional | Net sales value. Not required for margin scheme or simplified invoices.                                                        |
| `P_11A`       | Conditional | Gross sales value (Art. 106e sec. 7/8 formula)                                                                                 |
| `P_11Vat`     | Conditional | Tax amount per line item (Art. 106e sec. 10 — optional per-item tax)                                                           |
| `P_12`        | Conditional | Tax rate. Not required for margin scheme, exempt sales (Art. 106b sec. 3 item 2), simplified invoices. See rate values below.  |
| `P_12_XII`    | Conditional | VAT rate for EU OSS procedure (Section XII, Chapter 6a). Up to 6 decimal places.                                               |
| `P_12_Zal_15` | Optional    | "1" = goods/services from Annex 15                                                                                             |
| `KwotaAkcyzy` | Optional    | Excise duty amount in price                                                                                                    |
| `GTU`         | Optional    | GTU designation (GTU_01 through GTU_13) — see section 10.3                                                                     |
| `Procedura`   | Optional    | Procedure designation — see section 10.4                                                                                       |
| `KursWaluty`  | Optional    | Exchange rate for this line (up to 6 decimal places)                                                                           |
| `StanPrzed`   | Optional    | "1" = this line is "status before correction"                                                                                  |

### 10.3 P_12 Tax Rate Values

| Value   | Meaning                                                                                 |
| ------- | --------------------------------------------------------------------------------------- |
| `23`    | 23% rate                                                                                |
| `22`    | 22% rate                                                                                |
| `8`     | 8% rate                                                                                 |
| `7`     | 7% rate                                                                                 |
| `5`     | 5% rate                                                                                 |
| `4`     | 4% rate                                                                                 |
| `3`     | 3% rate                                                                                 |
| `0 KR`  | 0% — domestic (excluding ICS and export)                                                |
| `0 WDT` | 0% — intra-Community supply (ICS)                                                       |
| `0 EX`  | 0% — export                                                                             |
| `zw`    | Tax exempt                                                                              |
| `oo`    | Reverse charge in domestic trade                                                        |
| `np I`  | Outside the country, not subject to taxation (excluding Art. 100 sec. 1 item 4 and OSS) |
| `np II` | Services per Art. 100 sec. 1 item 4                                                     |

> **CRITICAL RULE — "oo" vs "np I"/"np II":** "oo" is ONLY for domestic reverse charge. For invoices
> with foreign entities where the purchaser settles VAT in their country, use "np I" or "np II" —
> NOT "oo".

### 10.4 GTU Designations (Optional, Line-Level)

| Code   | Category                                                                                                                                                                        |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GTU_01 | Alcoholic beverages (>1.2% alcohol, beer, beer mixes >0.5%) — CN 2203-2208                                                                                                      |
| GTU_02 | Goods per Art. 103 sec. 5aa                                                                                                                                                     |
| GTU_03 | Fuel/lubricating oils (specific CN codes)                                                                                                                                       |
| GTU_04 | Tobacco products, dried tobacco, e-cigarette liquid, novelty products                                                                                                           |
| GTU_05 | Waste (items 79-91 of Annex 15)                                                                                                                                                 |
| GTU_06 | Electronic devices (items 7, 8, 59-63, 65, 66, 69, 94-96 of Annex 15) + stretch film (item 9)                                                                                   |
| GTU_07 | Vehicles and parts (CN 8701-8708)                                                                                                                                               |
| GTU_08 | Precious and base metals (Annex 12 items 1, 1a; Annex 15 items 12-25, 33-40, 45, 46, 56, 78)                                                                                    |
| GTU_09 | Medicinal products, foods for particular nutritional uses, medical devices (notification per Art. 37av sec. 1 Pharmaceutical Law)                                               |
| GTU_10 | Buildings, structures, land, parts and interests                                                                                                                                |
| GTU_11 | Greenhouse gas emission allowance transfer services                                                                                                                             |
| GTU_12 | Intangible services: consulting, legal, tax, management, accounting, auditing, marketing, advertising, market research, R&D, non-school education (specific PKWiU codes listed) |
| GTU_13 | Transport and warehouse management services (PKWiU 49.4, 52.1)                                                                                                                  |

> **NOTE:** GTU markings are optional and at the taxpayer's discretion. On structured invoices, GTU
> is at FaWiersz level (per line). In JPK_VAT with declaration, GTU applies to the entire invoice.
> GTU may be used regardless of transaction type (domestic, ICS, export) if the activity meets GTU
> conditions. GTU can appear on VAT, KOR, ROZ, KOR_ROZ, UPR invoices. For ZAL/KOR_ZAL, analogous
> GTUZ is used in the Zamowienie element.

### 10.5 Procedura Designations (Optional, Line-Level)

| Code           | Meaning                                                                                                                   |
| -------------- | ------------------------------------------------------------------------------------------------------------------------- |
| WSTO_EE        | Intra-Community distance sales of goods + telecom/broadcasting/electronic services to non-taxpayers in other EU countries |
| IED            | Supply of goods per Art. 7a sec. 1/2 by facilitating taxpayer not using Section XII Chapter 6a/9 special procedure        |
| TT_D           | Supply outside the country by second taxpayer in triangular transaction (Section XII, Chapter 8)                          |
| I_42           | Intra-Community supply following import under customs procedure 42                                                        |
| I_63           | Intra-Community supply following import under customs procedure 63                                                        |
| B_SPV          | Transfer of single-purpose voucher (Art. 8a sec. 1)                                                                       |
| B_SPV_DOSTAWA  | Supply of goods/services related to single-purpose voucher (Art. 8a sec. 4)                                               |
| B_MPV_PROWIZJA | Intermediation services for multi-purpose voucher transfer (Art. 8b sec. 2)                                               |

> **NOTE:** Procedure designations are optional. On structured invoices, they are at FaWiersz level.
> In JPK_VAT, they apply to the entire document. For ZAL/KOR_ZAL, analogous ProceduraZ is used in
> Zamowienie.

---

## 11. Rozliczenie (Settlement)

Optional element for additional charges/deductions affecting the final payable amount. Only for
invoices documenting activities subject to the Act that additionally contain charges/deductions
data.

Examples: reimbursement of documented expenses (Art. 29a sec. 7 item 3), client balance settlement,
amounts from previous corrective invoices.

> **NOTE:** Invoices documenting only non-Act activities (e.g. compensation receipt) should NOT be
> issued.

### 11.1 Rozliczenie Fields

| Field           | Obligation                  | Description                                                                                                                  |
| --------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `Obciazenia`    | Optional                    | Charges (max 100). Each has: `Kwota` (amount added to P_15) + `Powod` (reason). Both mandatory if element is filled.         |
| `SumaObciazen`  | Optional                    | Sum of all Obciazenia.Kwota values                                                                                           |
| `Odliczenia`    | Optional                    | Deductions (max 100). Each has: `Kwota` (amount deducted from P_15) + `Powod` (reason). Both mandatory if element is filled. |
| `SumaOdliczen`  | Optional                    | Sum of all Odliczenia.Kwota values                                                                                           |
| `DoZaplaty`     | Choice (with DoRozliczenia) | Amount to be paid = P_15 + charges – deductions. Optional sequence but if decided to fill, must choose one.                  |
| `DoRozliczenia` | Choice (with DoZaplaty)     | Overpaid amount to be settled/reimbursed = P_15 + charges – deductions (when negative/overpaid).                             |

---

## 12. Platnosc (Payment)

Optional element containing payment terms.

### 12.1 Platnosc Fields

| Field                       | Obligation  | Description                                                                                                                                                                                           |
| --------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Zaplacono`                 | Optional    | "1" = invoice amount paid by time of issuance. For advance invoices: advance amount was paid.                                                                                                         |
| `DataZaplaty`               | Conditional | Date of payment (YYYY-MM-DD), if Zaplacono = "1"                                                                                                                                                      |
| `ZnacznikZaplatyCzesciowej` | Optional    | "1" = paid in part, "2" = paid in full in two or more parts (last payment is final). May appear only ONCE.                                                                                            |
| `ZaplataCzesciowa`          | Optional    | Partial payment details (max 100). Contains: `KwotaZaplatyCzesciowej`, `DataZaplatyCzesciowej`, + payment method fields.                                                                              |
| `TerminPlatnosci`           | Optional    | Payment due date details (max 100). Contains: `Termin` (YYYY-MM-DD, optional) and/or `TerminOpis` (descriptive: `Ilosc` + `Jednostka` + `ZdarzeniePoczatkowe`).                                       |
| `FormaPlatnosci`            | Optional    | Payment method: "1"=cash, "2"=card, "3"=voucher, "4"=cheque, "5"=credit, "6"=bank transfer, "7"=mobile phone                                                                                          |
| `PlatnoscInna`              | Optional    | "1" = other payment method                                                                                                                                                                            |
| `OpisPlatnosci`             | Conditional | Description of other method (when PlatnoscInna = "1")                                                                                                                                                 |
| `RachunekBankowy`           | Optional    | Bank account details (max 100). Fields: `NrRB` (mandatory within, 10-34 chars), `SWIFT` (optional), `RachunekWlasnyBanku` (optional: "1"/"2"/"3"), `NazwaBanku` (optional), `OpisRachunku` (optional) |
| `RachunekBankowyFaktora`    | Optional    | Factor's bank account (max 20). Same structure as RachunekBankowy.                                                                                                                                    |
| `Skonto`                    | Optional    | Discount terms: `WarunkiSkonta` (conditions) + `WysokoscSkonta` (amount)                                                                                                                              |
| `LinkDoPlatnosci`           | Optional    | Link to non-cash payment (max 512 chars)                                                                                                                                                              |
| `IPKSeF`                    | Optional    | KSeF payment identifier (max 13 chars). Format: 3-char settlement agent ID + 10-char unique string. Characters: 0-9, a-z, A-Z. Must be unique per payment.                                            |

### 12.2 RachunekWlasnyBanku Values

| Value | Meaning                                                                                  |
| ----- | ---------------------------------------------------------------------------------------- |
| "1"   | Bank/credit union account used for settlement of receivables acquired by that bank/union |
| "2"   | Bank/credit union account used to collect purchaser receivables and transfer to supplier |
| "3"   | Bank/credit union account for own business (not a settlement account)                    |

---

## 13. WarunkiTransakcji (Transaction Terms)

Optional element containing transaction terms.

### 13.1 WarunkiTransakcji Fields

| Field                  | Obligation | Description                                                                                                                                                                                                                                    |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Umowy`                | Optional   | Contract/agreement details (max 100). `DataUmowy` (date, optional, earliest: 1990-01-01) + `NrUmowy` (number, optional).                                                                                                                       |
| `Zamowienia`           | Optional   | Order details (max 100). `DataZamowienia` (date, optional, earliest: 1990-01-01) + `DodatkowyOpis` (order number, optional).                                                                                                                   |
| `NrPartiiTowaru`       | Optional   | Batch number (max 1,000 occurrences)                                                                                                                                                                                                           |
| `WarunkiDostawy`       | Optional   | Delivery terms/Incoterms (e.g. "DDP")                                                                                                                                                                                                          |
| `KursUmowny`           | Optional   | Contractual exchange rate. Does NOT apply to Section VI Act cases. For situations where parties agree a price in foreign currency but pay in PLN at a contractual rate. If filled, `WalutaUmowna` must also be filled. Up to 6 decimal places. |
| `WalutaUmowna`         | Optional   | Contractual currency (ISO 4217). If filled, `KursUmowny` must also be filled. **PLN must NEVER appear in this field.**                                                                                                                         |
| `Transport`            | Optional   | Transport details (max 20 occurrences). See section 13.2.                                                                                                                                                                                      |
| `PodmiotPosredniczacy` | Optional   | "1" = supply by intermediary entity per Art. 22 sec. 2d (chain transaction, not simplified triangular procedure)                                                                                                                               |

### 13.2 Transport Element

If filled, minimum required data: (`RodzajTransportu` OR `TransportInny`+`OpisInnegoTransportu`) AND
(`OpisLadunku` OR `LadunekInny`+`OpisInnegoLadunku`).

| Field                    | Obligation  | Description                                                                                                                                                                                                                                                      |
| ------------------------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `RodzajTransportu`       | Choice      | "1"=sea, "2"=rail, "3"=road, "4"=air, "5"=post, "7"=long-term delivery, "8"=inland waterway (code "6" intentionally omitted per EU regulation)                                                                                                                   |
| `TransportInny`          | Choice      | "1" = other mode of transport                                                                                                                                                                                                                                    |
| `OpisInnegoTransportu`   | Conditional | Description of other transport (when TransportInny = "1", max 50 chars)                                                                                                                                                                                          |
| `Przewoznik`             | Optional    | Carrier details (DaneIdentyfikacyjne + AdresPrzewoznika)                                                                                                                                                                                                         |
| `NrZleceniaTransportu`   | Optional    | Transport order number                                                                                                                                                                                                                                           |
| `OpisLadunku`            | Choice      | Cargo type: "1"-"20" (Jar, Barrel, Cylinder, Cardboard box, Canister, Cage, Shipping container, Basket, Wood splint basket, Collective packaging, Parcel, Package, Pallet, Container, Container for solid bulk, Container for liquid bulk, Box, Can, Chest, Bag) |
| `LadunekInny`            | Choice      | "1" = other/mixed cargo                                                                                                                                                                                                                                          |
| `OpisInnegoLadunku`      | Conditional | Description of other cargo (max 50 chars)                                                                                                                                                                                                                        |
| `JednostkaOpakowania`    | Optional    | Packing unit description (e.g. "1 carton/ 30 pieces")                                                                                                                                                                                                            |
| `DataGodzRozpTransportu` | Optional    | Transport start datetime (YYYY-MM-DDTHH:MM:SSZ)                                                                                                                                                                                                                  |
| `DataGodzZakTransportu`  | Optional    | Transport end datetime (YYYY-MM-DDTHH:MM:SSZ)                                                                                                                                                                                                                    |
| `WysylkaZ`               | Optional    | Shipment origin address                                                                                                                                                                                                                                          |
| `WysylkaPrzez`           | Optional    | Intermediate address (max 20 occurrences)                                                                                                                                                                                                                        |
| `WysylkaDo`              | Optional    | Destination address                                                                                                                                                                                                                                              |

---

## 14. Zamowienie (Order for Advance Invoices)

Conditional element for advance invoices — contains order/contract data per Art. 106f sec. 1 item 4.
Filled in the advance invoice's currency.

For corrective advance invoices: show differences or before/after as separate rows (same rules as
FaWiersz corrections).

### 14.1 Zamowienie Fields

| Field               | Obligation                 | Description                                                                      |
| ------------------- | -------------------------- | -------------------------------------------------------------------------------- |
| `WartoscZamowienia` | Mandatory (within element) | Total order value including tax = sum of (P_11NettoZ + P_11VatZ) across all rows |
| `ZamowienieWiersz`  | Mandatory (within element) | Order line items (max 10,000). See below.                                        |

### 14.2 ZamowienieWiersz Fields

| Field          | Obligation  | Description                                                          |
| -------------- | ----------- | -------------------------------------------------------------------- |
| `NrWierszaZam` | Mandatory   | Consecutive order row number                                         |
| `UU_IDZ`       | Optional    | Universal unique order line ID (max 50 chars)                        |
| `P_7Z`         | Conditional | Name of ordered goods/service (max 512 chars)                        |
| `IndeksZ`      | Optional    | Internal product code (max 50 chars)                                 |
| `GTINZ`        | Optional    | GTIN code (max 20 chars)                                             |
| `PKWiUZ`       | Optional    | PKWiU symbol (max 50 chars)                                          |
| `CNZ`          | Optional    | CN symbol (max 50 chars)                                             |
| `PKOBZ`        | Optional    | PKOB symbol (max 50 chars)                                           |
| `P_8AZ`        | Conditional | Measure of ordered goods                                             |
| `P_8BZ`        | Conditional | Quantity. Up to 6 decimal places.                                    |
| `P_9AZ`        | Optional    | Net unit price. Up to 8 decimal places.                              |
| `P_11NettoZ`   | Conditional | Net value                                                            |
| `P_11VatZ`     | Conditional | Tax amount                                                           |
| `P_12Z`        | Conditional | Tax rate (same values as P_12)                                       |
| `P_12Z_XII`    | Conditional | VAT rate for EU OSS. Up to 6 decimal places.                         |
| `P_12Z_Zal_15` | Optional    | "1" = Annex 15 goods/services                                        |
| `GTUZ`         | Optional    | GTU designation (same codes as GTU)                                  |
| `ProceduraZ`   | Optional    | Procedure designation (same codes as Procedura, minus I_42 and I_63) |
| `KwotaAkcyzyZ` | Optional    | Excise duty amount                                                   |
| `StanPrzedZ`   | Optional    | "1" = status before correction                                       |

> **NOTE on P_12Z:** "0 WDT" rate will not be used for advance invoices in practice, because ICS
> advance payments are not documented by invoice and do not give rise to tax liability.

---

## 15. Stopka (Footer)

Optional element.

### 15.1 Stopka Fields

| Field        | Obligation | Description                                                                                                                                                                                                                                       |
| ------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Informacje` | Optional   | Other invoice data (max 3 occurrences). Contains `StopkaFaktury` (max 3500 chars) for: thank-you notes, discount codes, opening hours, hotline info, return form links, complaint form links, marketing info, GDPR statement, share capital, etc. |
| `Rejestry`   | Optional   | Register numbers (max 100 occurrences). Contains: `PelnaNazwa` (optional), `KRS` (optional), `REGON` (optional), `BDO` (optional — Waste Database number).                                                                                        |

---

## 16. Zalacznik (Attachment)

Optional element. Available from 1 February 2026. For invoices with complex data concerning units of
measurement, quantity, or net unit prices.

**PREREQUISITE:** Notification of intention to issue invoices with attachment must be submitted via
e-Tax Office (e-Urząd Skarbowy).

### 16.1 Content Restrictions

The attachment serves to present **tax-related data only**. It should only contain data per Art.
106e of the Act, or data closely related to this data.

**MUST NOT include:**

- Price lists, warranty conditions, user manuals
- Orders, contracts, agreements, annexes, acceptance reports
- Promotions, advertising material, individual offers, newsletters

> **CRITICAL RULE:** If the attachment is used in violation, the right to issue invoices with
> attachment will be revoked.

### 16.2 Zalacznik Structure

| Field        | Obligation                 | Description                         |
| ------------ | -------------------------- | ----------------------------------- |
| `BlokDanych` | Mandatory (within element) | Data blocks (max 1,000 occurrences) |

#### BlokDanych Structure

| Field       | Obligation                 | Description                                                                             |
| ----------- | -------------------------- | --------------------------------------------------------------------------------------- |
| `ZNaglowek` | Optional                   | Header of data block (max 512 chars)                                                    |
| `MetaDane`  | Mandatory (within element) | Metadata: `ZKlucz` (key, max 256) + `ZWartosc` (value, max 256). Max 1,000 occurrences. |
| `Tekst`     | Optional                   | Text part. Contains `Akapit` (paragraph, max 512 chars, max 10 occurrences).            |
| `Tabela`    | Optional                   | Data table (max 1,000 tables per block)                                                 |

#### Tabela Structure

| Field       | Obligation                 | Description                                                                                                                      |
| ----------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `TMetaDane` | Optional                   | Table metadata: `TKlucz` + `TWartosc` (max 256 chars each, max 1,000 occurrences)                                                |
| `Opis`      | Optional                   | Table description (max 512 chars)                                                                                                |
| `TNaglowek` | Mandatory (within element) | Table header. Contains `Kol` elements (max 20 columns). Each `Kol` has: `Typ` (data type) + `NKom` (header cell, max 256 chars). |
| `Wiersz`    | Mandatory (within element) | Table rows (max 1,000 rows). Each contains `WKom` cells (max 20 cells per row).                                                  |
| `Suma`      | Optional                   | Table summary. Contains `SKom` cells (max 20).                                                                                   |

#### Kol/Typ Data Types

| Value      | Meaning                    |
| ---------- | -------------------------- |
| `date`     | Date                       |
| `datetime` | Date and time              |
| `dec`      | Number with decimal places |
| `int`      | Integer number             |
| `time`     | Time                       |
| `txt`      | Text                       |

---

## Appendix A: Complete Field Max-Length Reference

| Max Length | Fields                                                                                                                  |
| ---------- | ----------------------------------------------------------------------------------------------------------------------- |
| 13         | IPKSeF                                                                                                                  |
| 20         | GTIN, GTINZ, Kol/NKom (per TNaglowek max 20 columns), Wiersz/WKom (max 20 cells), Suma/SKom (max 20 cells)              |
| 32         | IDNabywcy                                                                                                               |
| 34         | NrRB (min 10)                                                                                                           |
| 50         | CN, CNZ, Indeks, IndeksZ, OpisInnegoLadunku, OpisInnegoTransportu, PKOB, PKOBZ, PKWiU, PKWiUZ, UU_ID, UU_IDZ, Jednostka |
| 256        | Default character fields, Klucz, Wartosc, ZKlucz, ZWartosc, TKlucz, TWartosc, NKom                                      |
| 512        | Nazwa, AdresL1, AdresL2, P_7, P_7Z, LinkDoPlatnosci, ZNaglowek, Akapit, Opis                                            |
| 3500       | StopkaFaktury                                                                                                           |

## Appendix B: Max Occurrences Reference

| Element                                             | Max Occurrences |
| --------------------------------------------------- | --------------- |
| Podmiot3                                            | 100             |
| DaneKontaktowe (in Podmiot1/2/3/PodmiotUpowazniony) | 3               |
| NowySrodekTransportu                                | 10,000          |
| DaneFaKorygowanej                                   | 50,000          |
| Podmiot2K                                           | 101             |
| ZaliczkaCzesciowa                                   | 31              |
| DodatkowyOpis                                       | 10,000          |
| FakturaZaliczkowa                                   | 100             |
| FaWiersz                                            | 10,000          |
| ZamowienieWiersz                                    | 10,000          |
| WZ                                                  | 1,000           |
| Obciazenia                                          | 100             |
| Odliczenia                                          | 100             |
| ZaplataCzesciowa                                    | 100             |
| TerminPlatnosci                                     | 100             |
| RachunekBankowy                                     | 100             |
| RachunekBankowyFaktora                              | 20              |
| Umowy                                               | 100             |
| Zamowienia (WarunkiTransakcji)                      | 100             |
| NrPartiiTowaru                                      | 1,000           |
| Transport                                           | 20              |
| WysylkaPrzez                                        | 20              |
| BlokDanych                                          | 1,000           |
| MetaDane                                            | 1,000           |
| TMetaDane                                           | 1,000           |
| Akapit                                              | 10              |
| Tabela (per BlokDanych)                             | 1,000           |
| Kol (columns per table)                             | 20              |
| Wiersz (rows per table)                             | 1,000           |
| WKom (cells per row)                                | 20              |
| SKom (cells in summary)                             | 20              |
| Informacje (Stopka)                                 | 3               |
| Rejestry (Stopka)                                   | 100             |

## Appendix C: Decimal Precision Reference

| Precision | Fields                                                                                                    |
| --------- | --------------------------------------------------------------------------------------------------------- |
| Up to 2   | All amount fields (default)                                                                               |
| Up to 6   | P_8B, P_12_XII, P_8BZ, P_12Z_XII, KursWaluty, KursWalutyZK, KursWalutyZW, KursWalutyZ, KursUmowny, Udzial |
| Up to 8   | P_9A, P_9B, P_9AZ, P_10                                                                                   |

## Appendix D: Validator-Critical Rules Summary

1. **Mandatory top-level elements:** Naglowek, Podmiot1, Podmiot2, Fa
2. **NIP placement:** Polish purchaser NIP MUST be in Podmiot2/DaneIdentyfikacyjne/NIP, NEVER in
   NrVatUE or NrID
3. **JST/GV cascading:** JST="1" → Podmiot3 with Rola="8" required; GV="1" → Podmiot3 with Rola="10"
   required
4. **Nested obligation:** If optional parent element is filled, its mandatory children must be
   filled
5. **Selection-type sequences:** P_22B1/B2/B3/B4 — only one; PMarzy choices — only one;
   NrKSeF/NrKSeFN — exactly one; FormaPlatnosci vs PlatnoscInna+OpisPlatnosci — one path
6. **Corrective NIP:** Incorrect NIP cannot be corrected — must zero out the invoice
7. **Self-billing:** P_17="1", purchaser in Podmiot2, NOT in Podmiot3 with role "5"
8. **P_6 vs P_6A:** Mutually exclusive — P_6 for common date, P_6A per line item
9. **OkresFa:** Only for Art. 19a sec. 3/4/5(4) — recurring/contractual billing cycles
10. **WalutaUmowna:** PLN must NEVER appear in this field
11. **KursUmowny + WalutaUmowna:** Must both be filled or both omitted
12. **Attachment abuse:** Non-tax data in Zalacznik → revocation of attachment rights
13. **No thousand separators:** Amount fields must be pure digit sequences with "." decimal
14. **UTF-8 required** for Polish diacritical characters
15. **DateTime format:** YYYY-MM-DDTHH:MM:SSZ for DataWytworzeniaFa, DataGodzRozpTransportu,
    DataGodzZakTransportu
16. **ZnacznikZaplatyCzesciowej:** May appear only ONCE in the entire invoice
17. **Transport minimum data:** (RodzajTransportu OR TransportInny+OpisInnegoTransportu) AND
    (OpisLadunku OR LadunekInny+OpisInnegoLadunku)
18. **Tax rate "oo" vs "np I"/"np II":** "oo" is domestic-only reverse charge; for foreign entities,
    use "np I"/"np II"
19. **"0 WDT" on advance invoices:** Will not occur in practice (ICS advances don't create tax
    liability)
20. **DoZaplaty vs DoRozliczenia:** Optional sequence, but if filled, exactly one must be chosen
