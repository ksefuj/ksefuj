# Faktury zaliczkowe — FA(3)

## ZAL — faktura zaliczkowa

`RodzajFaktury = "ZAL"`

Dodatkowe elementy po `RodzajFaktury`:

```xml
<RodzajFaktury>ZAL</RodzajFaktury>
<!-- KursWalutyZ: TYLKO dla zaliczek w walucie obcej -->
<KursWalutyZ>4.2500</KursWalutyZ>  <!-- kurs NBP dla daty zaliczki -->
```

Element `FaWiersz` jest **opcjonalny** dla faktur zaliczkowych.
Jeśli jest, traktowany jak w VAT.

Element `Zamowienie` zamiast lub obok `FaWiersz` — zawiera pozycje zamówienia:
```xml
<Zamowienie>
  <ZamowienieWiersz>
    <NrWierszaZam>1</NrWierszaZam>
    <P_7Z>Nazwa towaru z zamówienia</P_7Z>
    <P_8AZ>szt.</P_8AZ>
    <P_8BZ>10</P_8BZ>
    <P_9AZ>100.00</P_9AZ>
    <P_11NettoZ>1000.00</P_11NettoZ>
    <P_11VatZ>230.00</P_11VatZ>
    <P_12Z>23</P_12Z>
    <!-- <GTUZ>GTU_06</GTUZ> opcjonalne -->
  </ZamowienieWiersz>
</Zamowienie>
```

## Kilka zaliczek w jednej fakturze (ZaliczkaCzesciowa)

```xml
<ZaliczkaCzesciowa>
  <P_6Z>2026-09-10</P_6Z>       <!-- data otrzymania zaliczki -->
  <P_15Z>500.00</P_15Z>          <!-- kwota zaliczki -->
  <KursWalutyZW>4.4512</KursWalutyZW>  <!-- kurs dla tej zaliczki (opcjonalne) -->
</ZaliczkaCzesciowa>
<ZaliczkaCzesciowa>
  <P_6Z>2026-09-15</P_6Z>
  <P_15Z>2500.00</P_15Z>
  <KursWalutyZW>4.4724</KursWalutyZW>
</ZaliczkaCzesciowa>
```

## ROZ — faktura rozliczeniowa

`RodzajFaktury = "ROZ"`

Wymagane: wskazanie faktur zaliczkowych przez `FakturaZaliczkowa`:

```xml
<FakturaZaliczkowa>
  <!-- Zaliczka wystawiona w KSeF: -->
  <NrKSeFFaZaliczkowej>9999999999-20260910-XXXXXX-YYYYYY-ZZ</NrKSeFFaZaliczkowej>
  <!-- LUB zaliczka wystawiona poza KSeF: -->
  <!-- <NrKSeFZN>1</NrKSeFZN> -->
  <!-- <NrFaZaliczkowej>FZ/123/09/2026</NrFaZaliczkowej> -->
</FakturaZaliczkowa>
```

W `FaWiersz` wykazuje się **pełne wartości** zamówienia.
`P_15` = kwota pozostała do zapłaty (całość minus suma zaliczek).
