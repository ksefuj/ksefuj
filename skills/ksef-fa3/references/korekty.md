# Corrective Invoices — FA(3)

> All rules reference the official FA(3) information sheet (`packages/validator/docs/fa3-information-sheet.md`).
> Generated XML must pass `@ksefuj/validator` (XSD + 42 semantic rules).

## KOR — Standard Corrective Invoice

`RodzajFaktury = "KOR"`

Required by validator rule R11 (RODZAJ_FAKTURY_SECTIONS): corrective invoices must include
`DaneFaKorygowanej`. Add the corrective elements after `RodzajFaktury` in this xs:sequence order:

```xml
<RodzajFaktury>KOR</RodzajFaktury>
<PrzyczynaKorekty>Incorrect unit price</PrzyczynaKorekty>  <!-- optional -->
<TypKorekty>2</TypKorekty>  <!-- 1=original date, 2=correction date, 3=other -->
<DaneFaKorygowanej>
  <DataWystFaKorygowanej>2026-01-15</DataWystFaKorygowanej>
  <NrFaKorygowanej>FV/001/01/2026</NrFaKorygowanej>
  <!-- If the original was submitted to KSeF: -->
  <NrKSeF>1</NrKSeF>
  <NrKSeFFaKorygowanej>9999999999-20260115-XXXXXX-YYYYYY-ZZ</NrKSeFFaKorygowanej>
  <!-- If the original was NOT submitted to KSeF (pre-KSeF invoice): -->
  <!-- <NrKSeFN>1</NrKSeFN> -->
</DaneFaKorygowanej>
```

> Validator rule R29 (KOR_NRKSEF_CONSISTENCY): exactly one of `NrKSeF` or `NrKSeFN` must be set to
> `1`. When `NrKSeF=1`, `NrKSeFFaKorygowanej` is required. When `NrKSeFN=1`, `NrKSeFFaKorygowanej`
> must be absent.

## Amounts in Corrective Invoices

Fields P_13_x, P_14_x, P_15 contain the **difference (delta)**, not the corrected total.

Example — correction in minus: 100 PLN net at 23%:

```xml
<P_13_1>-100.00</P_13_1>
<P_14_1>-23.00</P_14_1>
<P_15>-123.00</P_15>
```

> Validator rule R39 (TAX_CALCULATION_MISMATCH) is **skipped** for corrective invoice types
> (KOR, KOR_ZAL, KOR_ROZ) because correction deltas do not follow normal tax arithmetic.
> Validator rule R42 (NEGATIVE_QUANTITY_NOT_ALLOWED) is also skipped for corrective invoices.

## Correcting FaWiersz Lines — Two Methods

### Method 1: Delta (difference only)

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

### Method 2: Before and After States (using StanPrzed)

```xml
<!-- Before-correction state row -->
<FaWiersz>
  <NrWierszaFa>1</NrWierszaFa>
  <P_7>Product A</P_7>
  <P_8B>3</P_8B>
  <P_9A>90.00</P_9A>
  <P_11>270.00</P_11>
  <P_12>23</P_12>
  <StanPrzed>1</StanPrzed>
</FaWiersz>
<!-- After-correction state row (no StanPrzed) -->
<FaWiersz>
  <NrWierszaFa>1</NrWierszaFa>
  <P_7>Product A</P_7>
  <P_8B>2</P_8B>
  <P_9A>90.00</P_9A>
  <P_11>180.00</P_11>
  <P_12>23</P_12>
</FaWiersz>
```

> Note: When using StanPrzed, duplicate NrWierszaFa values are expected. Validator rule R41
> (DUPLICATE_LINE_NUMBERS) is skipped for corrective invoice types.

## Correcting Buyer Data (Podmiot2K)

When the correction affects buyer identification data, include `Podmiot2K` with the **incorrect**
data from the original invoice (to preserve the audit trail):

```xml
<Podmiot2K>
  <DaneIdentyfikacyjne>
    <NIP>wrong_NIP</NIP>
    <Nazwa>Incorrect name</Nazwa>
  </DaneIdentyfikacyjne>
  <Adres>
    <KodKraju>PL</KodKraju>
    <AdresL1>old address</AdresL1>
  </Adres>
</Podmiot2K>
```

> ⚠️ Buyer NIP **cannot be corrected** via a corrective invoice. A wrong NIP requires issuing a
> correction to zero and then a new invoice with the correct NIP.

## KOR_ZAL and KOR_ROZ

Same structure as KOR, but:

- `RodzajFaktury = "KOR_ZAL"` — corrective advance invoice
- `RodzajFaktury = "KOR_ROZ"` — corrective settlement invoice

For `KOR_ZAL`: `KursWalutyZ` at `Fa` level is valid (as for ZAL). Validator rule R12 applies.

## Minimal KOR Example

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/">
  <Naglowek>
    <KodFormularza kodSystemowy="FA (3)" wersjaSchemy="1-0E">FA</KodFormularza>
    <WariantFormularza>3</WariantFormularza>
    <DataWytworzeniaFa>2026-03-15T10:00:00Z</DataWytworzeniaFa>
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
    <P_1>2026-03-15</P_1>
    <P_2>FV/001K/03/2026</P_2>
    <P_13_1>-100.00</P_13_1>
    <P_14_1>-23.00</P_14_1>
    <P_15>-123.00</P_15>
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
    <RodzajFaktury>KOR</RodzajFaktury>
    <PrzyczynaKorekty>Incorrect unit price</PrzyczynaKorekty>
    <TypKorekty>2</TypKorekty>
    <DaneFaKorygowanej>
      <DataWystFaKorygowanej>2026-03-01</DataWystFaKorygowanej>
      <NrFaKorygowanej>FV/001/03/2026</NrFaKorygowanej>
      <NrKSeF>1</NrKSeF>
      <NrKSeFFaKorygowanej>9999999999-20260301-XXXXXX-YYYYYY-ZZ</NrKSeFFaKorygowanej>
    </DaneFaKorygowanej>
    <FaWiersz>
      <NrWierszaFa>1</NrWierszaFa>
      <P_7>Consulting services (correction)</P_7>
      <P_11>-100.00</P_11>
      <P_12>23</P_12>
    </FaWiersz>
  </Fa>
</Faktura>
```
