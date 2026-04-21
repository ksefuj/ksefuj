# FA(3) Invoice Base Structure

> Minimal reference for generating complete corrective invoice XML.
> For the full field reference, see `skills/ksef-fa3/SKILL.md` (in-repo).

## Namespace and Header

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/">
  <Naglowek>
    <KodFormularza kodSystemowy="FA (3)" wersjaSchemy="1-0E">FA</KodFormularza>
    <WariantFormularza>3</WariantFormularza>
    <DataWytworzeniaFa>2026-04-01T10:00:00Z</DataWytworzeniaFa>
  </Naglowek>
```

## Podmiot1 (Seller — always Polish NIP)

```xml
<Podmiot1>
  <DaneIdentyfikacyjne>
    <NIP>1234567890</NIP>
    <Nazwa>Company Name</Nazwa>
  </DaneIdentyfikacyjne>
  <Adres>
    <KodKraju>PL</KodKraju>
    <AdresL1>ul. Street 1</AdresL1>
    <AdresL2>00-001 City</AdresL2>
  </Adres>
</Podmiot1>
```

## Podmiot2 (Buyer — Four Patterns)

**Polish company:**

```xml
<Podmiot2>
  <DaneIdentyfikacyjne>
    <NIP>0987654321</NIP>
    <Nazwa>Buyer Name</Nazwa>
  </DaneIdentyfikacyjne>
  <Adres>
    <KodKraju>PL</KodKraju>
    <AdresL1>ul. Buyer St 5</AdresL1>
    <AdresL2>30-002 City</AdresL2>
  </Adres>
  <JST>2</JST>
  <GV>2</GV>
</Podmiot2>
```

**EU buyer (VAT-UE):**

```xml
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
```

**Non-EU buyer:**

```xml
<Podmiot2>
  <DaneIdentyfikacyjne>
    <KodKraju>US</KodKraju>
    <NrID>12-3456789</NrID>
    <Nazwa>US Buyer Inc.</Nazwa>
  </DaneIdentyfikacyjne>
  ...
  <JST>2</JST>
  <GV>2</GV>
</Podmiot2>
```

**Consumer / no tax ID:**

```xml
<Podmiot2>
  <DaneIdentyfikacyjne>
    <BrakID>1</BrakID>
    <Nazwa>Jan Kowalski</Nazwa>
  </DaneIdentyfikacyjne>
  ...
  <JST>2</JST>
  <GV>2</GV>
</Podmiot2>
```

> JST and GV are **always mandatory** in Podmiot2 (validator rules R1, R2).

## Adnotacje — Complete Template

All sub-elements are required. Copy this block and modify only what applies:

```xml
<Adnotacje>
  <P_16>2</P_16>     <!-- 1=cash accounting, 2=no -->
  <P_17>2</P_17>     <!-- 1=self-billing, 2=no -->
  <P_18>2</P_18>     <!-- 1=reverse charge, 2=no -->
  <P_18A>2</P_18A>   <!-- 1=split payment MPP >15k PLN, 2=no -->
  <Zwolnienie><P_19N>1</P_19N></Zwolnienie>
  <NoweSrodkiTransportu><P_22N>1</P_22N></NoweSrodkiTransportu>
  <P_23>2</P_23>     <!-- 1=simplified triangular EU, 2=no -->
  <PMarzy><P_PMarzyN>1</P_PMarzyN></PMarzy>
</Adnotacje>
```

For VAT-exempt corrections, replace Zwolnienie:

```xml
<Zwolnienie>
  <P_19>1</P_19>
  <P_19A>Art. 43 ust. 1 pkt ... ustawy o VAT</P_19A>
</Zwolnienie>
```

## P_12 Tax Rate Codes

```
"23"    — standard 23%
"8"     — reduced 8%
"5"     — reduced 5%
"0 KR"  — 0% domestic
"0 WDT" — 0% intra-EU supply
"0 EX"  — 0% export
"zw"    — VAT exempt
"oo"    — domestic reverse charge
"np I"  — outside PL (not art.100 pt4)
"np II" — intra-EU services art.100 pt4
```

## P_13_x Summary Fields

Only include fields relevant to the transaction. Omit zeros.

| Field | Rate/Type |
|---|---|
| P_13_1 | Net at 23% |
| P_13_2 | Net at 8% |
| P_13_3 | Net at 5% |
| P_13_6_1 | Net 0% domestic |
| P_13_6_2 | Net 0% WDT |
| P_13_6_3 | Net 0% export |
| P_13_7 | Net exempt |
| P_13_8 | Net outside PL (np I) |
| P_13_9 | Net art.100 services (np II) |
| P_13_10 | Net domestic reverse charge |
| P_14_1..5 | VAT amounts (only when taxable) |
| P_15 | **Total — always required** |

## Decimal Precision

| Fields | Max decimals |
|---|---|
| P_11, P_13_x, P_14_x, P_15 | 2 |
| P_9A, P_9B (unit prices) | 8 |
| P_8B (quantities) | 6 |
| KursWaluty (exchange rates) | 6 |

## FaWiersz Field Order (xs:sequence)

```
NrWierszaFa → UU_ID* → P_6A* → P_7* → Indeks* → GTIN* → PKWIU* → CN* → PKOB*
→ P_8A* → P_8B* → P_9A* → P_9B* → P_10* → P_11* → P_11A* → P_11Vat*
→ P_12* → P_12_XII* → P_12_Zal_15* → KwotaAkcyzy* → GTU* → Procedura*
→ KursWaluty* → StanPrzed*
```
