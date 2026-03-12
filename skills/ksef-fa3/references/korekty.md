# Faktury korygujące — FA(3)

## Struktura Fa dla KOR

Po `RodzajFaktury` dodaj elementy korygujące (w tej kolejności w xs:sequence):

```xml
<RodzajFaktury>KOR</RodzajFaktury>
<PrzyczynaKorekty>Błędna cena jednostkowa</PrzyczynaKorekty>  <!-- opcjonalne -->
<TypKorekty>2</TypKorekty>  <!-- 1=data pierwotna, 2=data korekty, 3=inna -->
<DaneFaKorygowanej>
  <DataWystFaKorygowanej>2026-01-15</DataWystFaKorygowanej>
  <NrFaKorygowanej>FV/001/01/2026</NrFaKorygowanej>
  <!-- Jeśli oryginał był w KSeF: -->
  <NrKSeF>1</NrKSeF>
  <NrKSeFFaKorygowanej>9999999999-20260115-XXXXXX-YYYYYY-ZZ</NrKSeFFaKorygowanej>
  <!-- Jeśli oryginał był poza KSeF: -->
  <!-- <NrKSeFN>1</NrKSeFN> -->
</DaneFaKorygowanej>
```

## Wartości w fakturze korygującej

Pola P_13_x, P_14_x, P_15 wypełnia się jako **różnicę** (delta), nie wartości po korekcie.

Przykład — korekta in minus 100 PLN netto (23%):

```xml
<P_13_1>-100.00</P_13_1>
<P_14_1>-23.00</P_14_1>
<P_15>-123.00</P_15>
```

## Korekta pozycji FaWiersz — dwie metody

### Metoda 1: Różnica (delta)

```xml
<FaWiersz>
  <NrWierszaFa>1</NrWierszaFa>
  <P_7>Towar A</P_7>
  <P_8B>-1</P_8B>
  <P_9A>90.00</P_9A>
  <P_11>-90.00</P_11>
  <P_12>23</P_12>
</FaWiersz>
```

### Metoda 2: Stan przed + stan po (z użyciem StanPrzed)

```xml
<!-- Wiersz stanu PRZED korektą -->
<FaWiersz>
  <NrWierszaFa>1</NrWierszaFa>
  <P_7>Towar A</P_7>
  <P_8B>3</P_8B>
  <P_9A>90.00</P_9A>
  <P_11>270.00</P_11>
  <P_12>23</P_12>
  <StanPrzed>1</StanPrzed>
</FaWiersz>
<!-- Wiersz stanu PO korekcie (bez StanPrzed) -->
<FaWiersz>
  <NrWierszaFa>1</NrWierszaFa>
  <P_7>Towar A</P_7>
  <P_8B>2</P_8B>
  <P_9A>90.00</P_9A>
  <P_11>180.00</P_11>
  <P_12>23</P_12>
</FaWiersz>
```

## Korekta danych nabywcy (Podmiot2K)

Gdy korekta dotyczy danych nabywcy, dodaj element `Podmiot2K` z **błędnymi** danymi (z faktury
korygowanej), aby zachować ślad:

```xml
<Podmiot2K>
  <DaneIdentyfikacyjne>
    <NIP>błędny_NIP</NIP>
    <Nazwa>Błędna nazwa</Nazwa>
  </DaneIdentyfikacyjne>
  <Adres>
    <KodKraju>PL</KodKraju>
    <AdresL1>stary adres</AdresL1>
  </Adres>
</Podmiot2K>
```

> ⚠️ NIP nabywcy **nie podlega korekcie** — błędny NIP wymaga wystawienia faktury korygującej do
> zera i nowej faktury.

## KOR_ZAL i KOR_ROZ

Analogiczna struktura jak KOR, ale:

- `RodzajFaktury = "KOR_ZAL"` — korekta faktury zaliczkowej
- `RodzajFaktury = "KOR_ROZ"` — korekta faktury rozliczeniowej
