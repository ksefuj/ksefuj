# Advance Invoices — FA(3)

> All rules reference the official FA(3) information sheet (`packages/validator/docs/fa3-information-sheet.md`).
> Generated XML must pass `@ksefuj/validator` (XSD + 42 semantic rules).

## ZAL — Advance Invoice

`RodzajFaktury = "ZAL"`

Required by validator rule R11 (RODZAJ_FAKTURY_SECTIONS): advance invoices must include `Zamowienie`.

Additional elements after `RodzajFaktury`:

```xml
<RodzajFaktury>ZAL</RodzajFaktury>
<!-- KursWalutyZ: ONLY for foreign currency advance invoices (not regular foreign-currency invoices) -->
<KursWalutyZ>4.2500</KursWalutyZ>  <!-- NBP exchange rate at the time of advance payment -->
```

> Validator rule R12 (KURS_WALUTY_Z_PLACEMENT): `KursWalutyZ` at `Fa` level is valid **only** for
> ZAL and KOR_ZAL invoice types. For regular foreign-currency invoices, use `FaWiersz/KursWaluty`.

The `FaWiersz` element is **optional** for advance invoices. If included, it follows the same rules
as in standard invoices.

The `Zamowienie` element contains order lines (what the advance payment covers):

```xml
<Zamowienie>
  <ZamowienieWiersz>
    <NrWierszaZam>1</NrWierszaZam>
    <P_7Z>Goods from the order</P_7Z>
    <P_8AZ>pcs</P_8AZ>
    <P_8BZ>10</P_8BZ>
    <P_9AZ>100.00</P_9AZ>
    <P_11NettoZ>1000.00</P_11NettoZ>
    <P_11VatZ>230.00</P_11VatZ>
    <P_12Z>23</P_12Z>
    <!-- <GTUZ>GTU_06</GTUZ> optional -->
  </ZamowienieWiersz>
</Zamowienie>
```

## Multiple Advances in One Invoice (ZaliczkaCzesciowa)

When one advance invoice documents multiple separate advance payments:

```xml
<ZaliczkaCzesciowa>
  <P_6Z>2026-09-10</P_6Z>       <!-- date the advance was received -->
  <P_15Z>500.00</P_15Z>          <!-- advance amount -->
  <KursWalutyZW>4.4512</KursWalutyZW>  <!-- exchange rate for this advance (optional, for foreign currency) -->
</ZaliczkaCzesciowa>
<ZaliczkaCzesciowa>
  <P_6Z>2026-09-15</P_6Z>
  <P_15Z>2500.00</P_15Z>
  <KursWalutyZW>4.4724</KursWalutyZW>
</ZaliczkaCzesciowa>
```

## Minimal ZAL Example

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/">
  <Naglowek>
    <KodFormularza kodSystemowy="FA (3)" wersjaSchemy="1-0E">FA</KodFormularza>
    <WariantFormularza>3</WariantFormularza>
    <DataWytworzeniaFa>2026-03-10T10:00:00Z</DataWytworzeniaFa>
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
    <P_1>2026-03-10</P_1>
    <P_2>ZAL/001/03/2026</P_2>
    <P_13_1>813.01</P_13_1>
    <P_14_1>186.99</P_14_1>
    <P_15>1000.00</P_15>
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
    <RodzajFaktury>ZAL</RodzajFaktury>
    <Zamowienie>
      <ZamowienieWiersz>
        <NrWierszaZam>1</NrWierszaZam>
        <P_7Z>Custom machinery order</P_7Z>
        <P_8AZ>pcs</P_8AZ>
        <P_8BZ>1</P_8BZ>
        <P_9AZ>5000.00</P_9AZ>
        <P_11NettoZ>5000.00</P_11NettoZ>
        <P_11VatZ>1150.00</P_11VatZ>
        <P_12Z>23</P_12Z>
      </ZamowienieWiersz>
    </Zamowienie>
  </Fa>
</Faktura>
```

## ROZ — Settlement Invoice (Final Invoice After Advances)

`RodzajFaktury = "ROZ"`

Required by validator rule R11: settlement invoices must include `FakturaZaliczkowa` referencing
the advance invoice(s):

```xml
<FakturaZaliczkowa>
  <!-- Advance invoice submitted to KSeF: -->
  <NrKSeFFaZaliczkowej>9999999999-20260310-XXXXXX-YYYYYY-ZZ</NrKSeFFaZaliczkowej>
  <!-- OR advance invoice NOT submitted to KSeF (pre-KSeF invoice): -->
  <!-- <NrKSeFZN>1</NrKSeFZN> -->
  <!-- <NrFaZaliczkowej>ZAL/001/03/2026</NrFaZaliczkowej> -->
</FakturaZaliczkowa>
```

In `FaWiersz`, show the **full order values**. `P_15` = amount still to pay (total minus all
advance payments already invoiced).

Example: total order = 6,150.00 PLN, advance paid = 1,000.00 PLN, remaining = 5,150.00 PLN:

```xml
<P_13_1>5000.00</P_13_1>
<P_14_1>1150.00</P_14_1>
<P_15>5150.00</P_15>
```
