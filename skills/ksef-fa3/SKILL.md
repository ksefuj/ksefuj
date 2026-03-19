---
name: ksef-fa3
description: >
  Generowanie i walidacja faktur elektronicznych w formacie KSeF FA(3) — polskim standardzie
  e-faktur obowiązującym od 2026-02-01 (duże firmy) i 2026-04-01 (wszyscy). Użyj tego skill'a zawsze
  gdy użytkownik pyta o: wystawienie faktury do KSeF, strukturę XML FA(3), mapowanie danych faktury
  na schemat FA(3), walidację e-faktury, błędy walidatora KSeF, pola P_12/P_13/GTU/Adnotacje,
  faktury dla zagranicznych nabywców (UE, spoza UE), faktury walutowe, reverse charge, WDT, eksport,
  zwolnienie z VAT, lub jakiekolwiek pytanie o strukturę logiczną FA(3). Skill zawiera pełną
  specyfikację pól, zasady uzupełniania zależnie od scenariusza transakcji oraz gotchas wynikające z
  weryfikacji XSD.
---

# KSeF FA(3) — Skill generowania e-faktur

## Schema i zasoby

- Namespace: `http://crd.gov.pl/wzor/2025/06/25/13775/`
- XSD: `https://crd.gov.pl/wzor/2025/06/25/13775/schemat.xsd`
- Broszura informacyjna:
  `/mnt/user-data/uploads/Broszura_informacyjna_dotycza_ca_struktury_logicznej_FA_3_.pdf`
  - Przeczytaj ją przez `view` lub `bash_tool` gdy potrzebujesz szczegółów nieujętych poniżej
- Walidacja: w KSeF 2.0 **nie ma osobnego walidatora online** — walidacja odbywa się przy wysyłce
  faktury do systemu
  - Aplikacja Podatnika KSeF 2.0 (produkcja): https://ap.ksef.mf.gov.pl/
  - Środowisko testowe (fikcyjne dane, bez skutków prawnych): https://web2te-ksef.mf.gov.pl/
  - Portal KSeF 2.0 z dokumentacją i plikami do pobrania: https://ksef.podatki.gov.pl/
  - ⚠️ Stary walidator https://ksef.mf.gov.pl/web/login **nie działa** od 01.02.2026 (KSeF 1.0
    wyłączony)

## Kolejność głównych elementów w pliku XML

Schema jest `xs:sequence` — **kolejność elementów jest ściśle wymagana**:

```
Faktura
  └── Naglowek
  └── Podmiot1          (sprzedawca)
  └── Podmiot2          (nabywca)
  └── Podmiot3*         (dodatkowy nabywca, opcjonalny)
  └── PodmiotUpowazniony* (opcjonalny)
  └── Fa
        └── KodWaluty
        └── P_1
        └── P_1M*
        └── P_2
        └── WZ*
        └── P_6*        (tylko gdy jedna data dla wszystkich pozycji, różna od P_1)
        └── OkresFa*    (element okresu wg art. 19a ust. 3/4/5 pkt 4)
        └── P_13_1..P_13_11 (tylko te, które dotyczą transakcji)
        └── P_14_1..P_14_5 (kwoty VAT — tylko gdy P_13_x > 0)
        └── P_15
        └── KursWalutyZ* (TYLKO dla faktur zaliczkowych — art. 106b ust.1 pkt 4)
        └── Adnotacje
        └── RodzajFaktury
        └── ... (korekty, zaliczki — patrz references/korekty.md)
        └── FaWiersz*   (pozycje — opcjonalne dla faktur zaliczkowych)
        └── Platnosc*
        └── WarunkiTransakcji*
```

> ⚠️ `KursWalutyZ` na poziomie `Fa` — **wyłącznie** faktury zaliczkowe (art. 106b ust. 1 pkt 4). Dla
> zwykłych faktur walutowych kurs idzie do `FaWiersz/KursWaluty`.

---

## Naglowek

```xml
<Naglowek>
  <KodFormularza kodSystemowy="FA (3)" wersjaSchemy="1-0E">FA</KodFormularza>
  <WariantFormularza>3</WariantFormularza>
  <DataWytworzeniaFa>2026-MM-DDTHH:MM:SSZ</DataWytworzeniaFa>
</Naglowek>
```

---

## Podmiot1 (sprzedawca — zawsze polska firma z NIP)

```xml
<Podmiot1>
  <DaneIdentyfikacyjne>
    <NIP>XXXXXXXXXX</NIP>
    <Nazwa>Imię Nazwisko lub Nazwa firmy</Nazwa>
  </DaneIdentyfikacyjne>
  <Adres>
    <KodKraju>PL</KodKraju>
    <AdresL1>ulica i numer</AdresL1>
    <AdresL2>kod pocztowy i miasto</AdresL2>  <!-- opcjonalne -->
  </Adres>
</Podmiot1>
```

---

## Podmiot2 (nabywca) — scenariusze

**Schemat zależy od tego, czy nabywca ma NIP, numer VAT-UE, czy inny identyfikator.**

### Scenariusz A: Nabywca krajowy z NIP

```xml
<Podmiot2>
  <DaneIdentyfikacyjne>
    <NIP>XXXXXXXXXX</NIP>
    <Nazwa>Nazwa nabywcy</Nazwa>
  </DaneIdentyfikacyjne>
  <Adres>
    <KodKraju>PL</KodKraju>
    <AdresL1>ulica i numer</AdresL1>
    <AdresL2>kod pocztowy i miasto</AdresL2>
  </Adres>
  <JST>2</JST>   <!-- 1=jednostka samorządu terytorialnego, 2=brak -->
  <GV>2</GV>     <!-- 1=podmiot publiczny (Grupa VAT), 2=brak -->
</Podmiot2>
```

### Scenariusz B: Nabywca z UE z numerem VAT-UE

```xml
<Podmiot2>
  <DaneIdentyfikacyjne>
    <KodUE>DE</KodUE>          <!-- prefiks VAT UE, np. DE, FR, CZ -->
    <NrVatUE>123456789</NrVatUE>
    <Nazwa>Nazwa nabywcy</Nazwa>
  </DaneIdentyfikacyjne>
  <Adres>
    <KodKraju>DE</KodKraju>
    <AdresL1>adres</AdresL1>
  </Adres>
  <JST>2</JST>
  <GV>2</GV>
</Podmiot2>
```

### Scenariusz C: Nabywca spoza UE (bez NIP i bez VAT-UE)

Używa `KodKraju` + `NrID` jako **rodzeństwa** w `DaneIdentyfikacyjne` (nie zagnieżdżone):

```xml
<Podmiot2>
  <DaneIdentyfikacyjne>
    <KodKraju>US</KodKraju>    <!-- kod ISO 3166-1 alpha-2 kraju nabywcy -->
    <NrID>XXXXXXXXX</NrID>     <!-- identyfikator podatkowy kraju nabywcy, bez myślników -->
    <Nazwa>Nazwa nabywcy</Nazwa>
  </DaneIdentyfikacyjne>
  <Adres>
    <KodKraju>US</KodKraju>
    <AdresL1>adres linia 1</AdresL1>
    <AdresL2>miasto, stan, kod</AdresL2>
  </Adres>
  <JST>2</JST>
  <GV>2</GV>
</Podmiot2>
```

### Scenariusz D: Nabywca bez identyfikatora podatkowego (np. osoba prywatna)

```xml
<DaneIdentyfikacyjne>
  <BrakID>1</BrakID>
  <Nazwa>Jan Kowalski</Nazwa>
</DaneIdentyfikacyjne>
```

> ⚠️ **JST i GV są obowiązkowe** w FA(3) dla Podmiot2. Brak tych pól powoduje błąd „Wskazany plik
> nie jest prawidłowym plikiem XML e-Faktury" w walidatorze KSeF.

---

## Element Fa — pola wartości (P_13_x, P_15)

Wypełniaj **tylko** te pola P_13, które dotyczą faktury. Nie podawaj pól z wartością 0.

| Pole       | Opis                                                                   | Kiedy używać                                                    |
| ---------- | ---------------------------------------------------------------------- | --------------------------------------------------------------- |
| `P_13_1`   | Netto przy stawce 23% (lub 22%)                                        | Sprzedaż krajowa 23%                                            |
| `P_13_2`   | Netto przy stawce 8% (lub 7%)                                          | Sprzedaż krajowa 8%                                             |
| `P_13_3`   | Netto przy stawce 5%                                                   | Sprzedaż krajowa 5%                                             |
| `P_13_4`   | Netto — ryczałt taksówki                                               | Taksówki                                                        |
| `P_13_5`   | Netto — procedura OSS                                                  | Sprzedaż w procedurze OSS                                       |
| `P_13_6_1` | Netto 0% krajowa (nie WDT, nie eksport)                                | Stawka 0% np. art. 83                                           |
| `P_13_6_2` | Netto 0% WDT                                                           | Wewnątrzwspólnotowa dostawa towarów                             |
| `P_13_6_3` | Netto 0% eksport                                                       | Eksport towarów                                                 |
| `P_13_7`   | Netto — sprzedaż zwolniona                                             | Zwolnienie z VAT                                                |
| `P_13_8`   | Netto — dostawa/usługi poza PL (nie P_13_5, nie P_13_9)                | Reverse charge do krajów spoza UE i usługi art. 28b/28e poza PL |
| `P_13_9`   | Netto — usługi art. 100 ust. 1 pkt 4 (świadczenia do innych krajów UE) | Intrastat usługowy UE                                           |
| `P_13_10`  | Netto — odwrotne obciążenie krajowe                                    | Krajowe reverse charge art. 145e                                |
| `P_13_11`  | Netto — procedura marży                                                | Marża art. 119/120                                              |
| `P_15`     | **Kwota należności ogółem**                                            | **Zawsze obowiązkowe**                                          |

> `P_13_8` vs `P_13_9`: usługi do podmiotów spoza UE → `P_13_8`. Usługi do podmiotów UE objęte art.
> 100 ust. 1 pkt 4 (informacja podsumowująca VAT-UE) → `P_13_9`.

---

## Adnotacje — struktura obowiązkowa

Wszystkie pola w `Adnotacje` są **obowiązkowe** (schemat wymaga kompletnej struktury):

```xml
<Adnotacje>
  <P_16>2</P_16>     <!-- 1=metoda kasowa, 2=brak -->
  <P_17>2</P_17>     <!-- 1=samofakturowanie, 2=brak -->
  <P_18>2</P_18>     <!-- 1=odwrotne obciążenie (krajowe LUB zagraniczne), 2=brak -->
  <P_18A>2</P_18A>   <!-- 1=mechanizm podzielonej płatności >15k PLN, 2=brak -->

  <!-- Zwolnienie — ALBO P_19N=1 (brak zwolnienia), ALBO P_19=1 + jedna z P_19A/B/C -->
  <Zwolnienie>
    <P_19N>1</P_19N>
    <!-- LUB gdy sprzedaż zwolniona:
    <P_19>1</P_19>
    <P_19A>Art. 43 ust. 1 pkt 37 ustawy o podatku od towarów i usług</P_19A>
    -->
  </Zwolnienie>

  <!-- NoweSrodkiTransportu — ALBO P_22N=1, ALBO P_22=1 + szczegóły -->
  <NoweSrodkiTransportu>
    <P_22N>1</P_22N>
  </NoweSrodkiTransportu>

  <P_23>2</P_23>     <!-- 1=faktura WE uproszczona trójstronna, 2=brak -->

  <!-- PMarzy — ALBO P_PMarzyN=1, ALBO P_PMarzy=1 + rodzaj marży -->
  <PMarzy>
    <P_PMarzyN>1</P_PMarzyN>
  </PMarzy>
</Adnotacje>
```

> ⚠️ `P_18=1` stosuje się zarówno dla odwrotnego obciążenia krajowego (art. 145e), jak i dla
> usług/towarów poza PL gdzie VAT rozlicza nabywca (reverse charge zagraniczne/UE).

---

## RodzajFaktury

| Wartość   | Opis                                      |
| --------- | ----------------------------------------- |
| `VAT`     | Faktura podstawowa                        |
| `KOR`     | Faktura korygująca                        |
| `ZAL`     | Faktura zaliczkowa                        |
| `ROZ`     | Faktura rozliczeniowa (po zaliczkach)     |
| `UPR`     | Faktura uproszczona (do 450 zł / 100 EUR) |
| `KOR_ZAL` | Korekta faktury zaliczkowej               |
| `KOR_ROZ` | Korekta faktury rozliczeniowej            |

---

## FaWiersz — kolejność pól (xs:sequence — kolejność ŚCISŁA)

```
NrWierszaFa → UU_ID* → P_6A* → P_7* → Indeks* → GTIN* → PKWIU* → CN* → PKOB*
→ P_8A* → P_8B* → P_9A* → P_9B* → P_10* → P_11* → P_11A* → P_11Vat*
→ P_12* → P_12_XII* → P_12_Zal_15* → KwotaAkcyzy* → GTU* → Procedura*
→ KursWaluty* → StanPrzed*
```

**Kluczowe pola FaWiersz:**

| Pole          | Opis                                                  | Uwagi                                  |
| ------------- | ----------------------------------------------------- | -------------------------------------- |
| `NrWierszaFa` | Numer wiersza (1, 2, 3…)                              | Obowiązkowe                            |
| `P_7`         | Nazwa towaru/usługi (max 512 znaków)                  | Prawie zawsze                          |
| `P_8A`        | Jednostka miary (np. `szt.`, `h`, `kg`)               | Opcjonalne                             |
| `P_8B`        | Ilość (max 8 miejsc po przecinku)                     | Opcjonalne                             |
| `P_9A`        | Cena jednostkowa netto (max 8 miejsc po przecinku)    | Opcjonalne                             |
| `P_11`        | Wartość netto pozycji                                 | Opcjonalne                             |
| `P_12`        | Stawka podatku — patrz enumeracja poniżej             | Opcjonalne                             |
| `GTU`         | `GTU_01`…`GTU_13` — jako wartość pola, nie nazwa tagu | Opcjonalne                             |
| `KursWaluty`  | Kurs NBP dla wiersza (waluta obca)                    | Tylko faktury walutowe, nie zaliczkowe |
| `StanPrzed`   | `1` — wiersz stanu przed korektą                      | Tylko faktury korygujące               |

### P_12 — enumeracja stawek podatku

```
"23"     23% (stawka podstawowa)
"22"     22%
"8"      8%
"7"      7%
"5"      5%
"4"      4%
"3"      3%
"0 KR"   0% — sprzedaż krajowa (nie WDT, nie eksport)
"0 WDT"  0% — wewnątrzwspólnotowa dostawa towarów
"0 EX"   0% — eksport towarów
"zw"     zwolnienie z podatku
"oo"     odwrotne obciążenie krajowe
"np I"   poza terytorium kraju (nie art.100 ust.1 pkt 4, nie OSS) — reverse charge zagraniczne
"np II"  usługi art. 100 ust. 1 pkt 4 — intrastat usługowy UE
```

> ⚠️ Enumeracja jest ściśle walidowana. `"NP"`, `"np"`, `"np1"` itp. są **błędne**. Dla odwrotnego
> obciążenia zagranicznego (spoza UE i usługi art. 28b): `"np I"`.

### GTU — zasady

- GTU to **wartość tekstowa** jednego elementu: `<GTU>GTU_12</GTU>`
- **Nie** stosuje się starszego formatu: `<GTU_12>1</GTU_12>` — to **błąd XSD**
- Maksimum 1 GTU na wiersz
- GTU_01…GTU_10: towary; GTU_11…GTU_13: usługi niematerialne
- Stosowanie GTU jest **dobrowolne** — pomaga w JPK_VAT

---

## P_6 vs OkresFa vs P_6A

| Element   | Kiedy                                                                                 | Gdzie                                     |
| --------- | ------------------------------------------------------------------------------------- | ----------------------------------------- |
| `P_6`     | Jedna data wykonania usługi/dostawy, wspólna dla wszystkich pozycji, **różna od P_1** | `Fa/P_6`                                  |
| `OkresFa` | Faktura za okres (np. abonament miesięczny) — art. 19a ust. 3/4/5 pkt 4               | `Fa/OkresFa/P_6_Od` + `Fa/OkresFa/P_6_Do` |
| `P_6A`    | Różne daty dla różnych pozycji faktury                                                | `FaWiersz/P_6A`                           |

> Gdy data sprzedaży = data wystawienia (P_1), **nie wypełniaj P_6**.

---

## Faktury walutowe

1. `Fa/KodWaluty` = kod ISO 4217 (np. `USD`, `EUR`, `GBP`)
2. Wszystkie kwoty w `Fa` i `FaWiersz` — **w walucie faktury**
3. `FaWiersz/KursWaluty` = kurs NBP (do 6 miejsc po przecinku)
4. `P_14_xW` (opcjonalne) — kwota VAT przeliczona na PLN
5. **Nie używaj** `Fa/KursWalutyZ` — to tylko dla faktur zaliczkowych

---

## Formatowanie liczb dziesiętnych

**Używaj odpowiedniej precyzji miejsc dziesiętnych** zgodnie z §2.6 specyfikacji FA(3):

- **Kwoty ogólne** (P_11, P_13_x, P_15 itd.): maksymalnie 2 miejsca po przecinku, np. `6000.00`, `1230.50`
- **Ceny jednostkowe** (P_9A, P_9B): maksymalnie 8 miejsc po przecinku, np. `75.12345678`
- **Ilości** (P_8B): maksymalnie 6 miejsc po przecinku, np. `80.123456`
- **Kursy walut** (KursWaluty): maksymalnie 6 miejsc po przecinku, zgodnie z danymi NBP, np. `3.7075`

---

## Płatność (element opcjonalny)

```xml
<Platnosc>
  <TerminPlatnosci>
    <Termin>RRRR-MM-DD</Termin>
  </TerminPlatnosci>
  <FormaPlatnosci>6</FormaPlatnosci>  <!-- 6=przelew -->
  <RachunekBankowy>
    <NrRB>PL49...</NrRB>              <!-- IBAN bez spacji -->
    <SWIFT>BREXPLPWMBK</SWIFT>        <!-- opcjonalne -->
    <NazwaBanku>mBank S.A.</NazwaBanku>  <!-- ⚠️ NazwaBanku, nie NazwaBank -->
  </RachunekBankowy>
</Platnosc>
```

**Wartości FormaPlatnosci:** 1=gotówka, 2=karta, 3=bon, 4=czek, 5=kredyt, 6=przelew, 7=mobilna

---

## Gotchas — błędy najczęściej spotykane w walidatorze KSeF

1. **JST i GV brakuje w Podmiot2** → błąd „nie jest prawidłowym plikiem XML e-Faktury"
   - Zawsze dodaj `<JST>2</JST><GV>2</GV>` do Podmiot2 (chyba że JST/GV = 1)

2. **`KursWalutyZ` na poziomie `Fa`** → błąd „nie oczekiwano KursWalutyZ"
   - To pole tylko dla faktur zaliczkowych; dla zwykłych usuń z `Fa`, kurs daj do
     `FaWiersz/KursWaluty`

3. **`P_12` = `"NP"` zamiast `"np I"` lub `"np II"`** → błąd „NP not in enumeration"
   - Używaj dokładnie `"np I"` lub `"np II"` (ze spacją)

4. **`<GTU_12>1</GTU_12>` zamiast `<GTU>GTU_12</GTU>`** → błąd „not expected, expected GTU"
   - GTU to element z wartością tekstową, nie boolean-like element z numerem

5. **Zła kolejność pól w FaWiersz** → błąd „not expected, expected X"
   - Schema jest xs:sequence — trzymaj się kolejności z sekcji powyżej
   - GTU musi być **przed** KursWaluty i StanPrzed

6. **`NazwaBank` zamiast `NazwaBanku`** → błąd „NazwaBank not expected"
   - Poprawna nazwa elementu: `NazwaBanku`

7. **`NrID` zagnieżdżone zamiast jako rodzeństwo** → błąd parsowania Podmiot2
   - Dla nabywców non-EU: `KodKraju` i `NrID` to bezpośrednie dzieci `DaneIdentyfikacyjne`

8. **Puste pola P_13_x z wartością `0`** → błąd walidacji
   - Nie umieszczaj pól P_13_x z wartością zero — pomijaj całkowicie

9. **Brak kompletnej struktury Adnotacje** → błąd minOccurs
   - Wszystkie sub-elementy Adnotacje (Zwolnienie, NoweSrodkiTransportu, PMarzy) są wymagane

10. **`DodatkowyOpis` z kursem waluty** → błąd „not expected"
    - Kurs należy do `FaWiersz/KursWaluty`, nie do `DodatkowyOpis`

---

## Przykład minimalnej faktury VAT (sprzedaż krajowa)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <Naglowek>
    <KodFormularza kodSystemowy="FA (3)" wersjaSchemy="1-0E">FA</KodFormularza>
    <WariantFormularza>3</WariantFormularza>
    <DataWytworzeniaFa>2026-01-15T10:00:00Z</DataWytworzeniaFa>
  </Naglowek>
  <Podmiot1>
    <DaneIdentyfikacyjne>
      <NIP>1234567890</NIP>
      <Nazwa>Sprzedawca Sp. z o.o.</Nazwa>
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
      <Nazwa>Nabywca Sp. z o.o.</Nazwa>
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
    <P_1>2026-01-15</P_1>
    <P_2>FV/001/01/2026</P_2>
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
      <P_7>Usługa konsultingowa</P_7>
      <P_8A>godz.</P_8A>
      <P_8B>10</P_8B>
      <P_9A>100.00</P_9A>
      <P_11>1000.00</P_11>
      <P_12>23</P_12>
    </FaWiersz>
    <Platnosc>
      <TerminPlatnosci><Termin>2026-02-14</Termin></TerminPlatnosci>
      <FormaPlatnosci>6</FormaPlatnosci>
    </Platnosc>
  </Fa>
</Faktura>
```

---

## Szczegółowe scenariusze

Więcej szczegółów w plikach referencyjnych:

- `references/scenariusze-vat.md` — WDT, eksport, zwolnienia, OSS, reverse charge
- `references/korekty.md` — faktury korygujące (KOR, KOR_ZAL, KOR_ROZ)
- `references/zaliczki.md` — faktury zaliczkowe (ZAL, ROZ)

Jeśli potrzebujesz obsłużyć scenariusz nieopisany powyżej, przeczytaj broszurę informacyjną przez
`bash_tool` z pdfplumber lub `view` konkretnych stron.
