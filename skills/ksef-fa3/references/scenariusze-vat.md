# Scenariusze VAT — FA(3)

## 1. Sprzedaż krajowa (standard)

- `P_12`: `"23"`, `"8"`, `"5"`, itp.
- `P_13_1` / `P_13_2` / `P_13_3` odpowiednio
- `P_14_1` / `P_14_2` / `P_14_3` — kwoty VAT
- `Adnotacje/P_18 = 2`

## 2. Wewnątrzwspólnotowa dostawa towarów (WDT)

- Nabywca: `Podmiot2/DaneIdentyfikacyjne/KodUE` + `NrVatUE`
- `P_13_6_2` — wartość WDT
- `FaWiersz/P_12 = "0 WDT"`
- `Adnotacje/P_18 = 2` (brak odwrotnego obciążenia — stawka 0%)
- GTU według towaru (np. `GTU_07` dla pojazdów)

## 3. Eksport towarów

- `P_13_6_3`
- `FaWiersz/P_12 = "0 EX"`
- Nabywca może mieć `KodKraju` + `NrID` lub `BrakID`

## 4. Usługi poza terytorium PL — reverse charge zagraniczny

**Nabywca spoza UE** (miejsce opodatkowania poza PL, art. 28b):
- `P_13_8`
- `FaWiersz/P_12 = "np I"`
- `Adnotacje/P_18 = 1` (nabywca rozlicza VAT w swoim kraju)

**Nabywca z UE, usługi art. 100 ust. 1 pkt 4** (intrastat usługowy):
- `P_13_9`
- `FaWiersz/P_12 = "np II"`
- `Adnotacje/P_18 = 1`

## 5. Zwolnienie z VAT (art. 43, 113, 82)

- `P_13_7`
- `FaWiersz/P_12 = "zw"`
- `Adnotacje/Zwolnienie/P_19 = 1` + jedna z:
  - `P_19A` — przepis krajowy (np. `"Art. 43 ust. 1 pkt 37 ustawy o VAT"`)
  - `P_19B` — dyrektywa 2006/112/WE
  - `P_19C` — inna podstawa prawna
- `Adnotacje/Zwolnienie/P_19N` — **pomiń** (nie równocześnie z P_19)

## 6. Odwrotne obciążenie krajowe

- `P_13_10`
- `FaWiersz/P_12 = "oo"`
- `Adnotacje/P_18 = 1`
- `FaWiersz/P_12_Zal_15 = "1"` jeśli towar z zał. 15

## 7. Stawka 0% krajowa (nie WDT, nie eksport)

- `P_13_6_1`
- `FaWiersz/P_12 = "0 KR"`
- Przykład: usługi transportu międzynarodowego (art. 83)

## 8. Procedura OSS (szczególna)

- `P_13_5`
- `FaWiersz/P_12_XII` — stawka VAT kraju konsumpcji
- `FaWiersz/Procedura = "WSTO_EE"` (opcjonalnie)

## 9. Procedura marży (art. 119/120)

- `P_13_11`
- `Adnotacje/PMarzy/P_PMarzy = 1` + rodzaj:
  - `P_PMarzy_2` — biura podróży
  - `P_PMarzy_3_1` — towary używane
  - `P_PMarzy_3_2` — dzieła sztuki
  - `P_PMarzy_3_3` — antyki/kolekcjonerskie
- `Adnotacje/PMarzy/P_PMarzyN` — **pomiń**

## 10. Faktura z kilkoma stawkami

Wypełnij odpowiednie pary P_13_x + P_14_x dla każdej stawki.
P_15 = suma wszystkich wartości brutto.

Przykład: faktura z 23% i 8%:
```xml
<P_13_1>500.00</P_13_1>
<P_14_1>115.00</P_14_1>
<P_13_2>200.00</P_13_2>
<P_14_2>16.00</P_14_2>
<P_15>831.00</P_15>
```

## 11. Mechanizm podzielonej płatności (MPP)

- Tylko gdy kwota należności > 15 000 PLN i towar/usługa z zał. 15 do ustawy
- `Adnotacje/P_18A = 1`
- `FaWiersz/P_12_Zal_15 = "1"`
