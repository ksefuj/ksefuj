# Podręcznik KSeF 2.0 — Cz. II: Wystawianie i otrzymywanie faktur w KSeF

> **Źródło:** Ministerstwo Finansów, stan prawny na dzień 1 lutego 2026 r., Warszawa, luty 2026 r.

---

## 1. Faktura ustrukturyzowana

### 1.1. Definicje faktury

Faktura (art. 2 pkt 31 ustawy) — dokument w postaci papierowej lub elektronicznej zawierający dane
wymagane ustawą i przepisami wydanymi na jej podstawie. Zakres obowiązkowych elementów określa art.
106e ustawy oraz rozporządzenie w sprawie wystawiania faktur (Dz. U. z 2021 r. poz. 1979 ze zm.).

Trzy rodzaje faktur:

- **Faktura papierowa**
- **Faktura elektroniczna** (art. 2 pkt 32 ustawy) — faktura w postaci elektronicznej wystawiona i
  otrzymana w dowolnym formacie elektronicznym (np. plik PDF)
- **Faktura ustrukturyzowana (e-Faktura)** — faktura wystawiona przy użyciu KSeF wraz z
  przydzielonym numerem identyfikującym ją w systemie

Cechy faktury ustrukturyzowanej:

- Od 1 lutego 2026 r. wystawiana przy użyciu struktury logicznej FA(3)
- Wystawiana i otrzymywana przy użyciu KSeF
- Format pliku XML
- Posiada przydzielony numer KSeF

Faktura elektroniczna ≠ faktura ustrukturyzowana. Faktura elektroniczna nie musi być wystawiana przy
użyciu struktury FA, nie jest przesyłana do KSeF, może być dowolnym plikiem (np. PDF) przesyłanym
e-mailem.

> **WAŻNE:** Do KSeF nie są przesyłane: faktury pro forma, noty obciążeniowe, noty uznaniowe,
> faktury wewnętrzne, dowody wewnętrzne i załączniki w formie nieustrukturyzowanej.

### 1.2. Kto jest obowiązany wystawiać faktury w KSeF?

Obowiązek dotyczy zasadniczo **wszystkich podatników** zobowiązanych do wystawiania faktur na
podstawie polskich przepisów, z uwzględnieniem wyłączeń z art. 106gb ust. 4 i przepisów wykonawczych
(art. 106s ustawy; rozporządzenie Dz.U. z 2025 r. poz. 1740).

Podatnikami w rozumieniu ustawy (art. 15 ust. 1) są m.in.:

- Osoby fizyczne prowadzące JDG (czynny VAT lub zwolniony)
- Spółki cywilne
- Spółki osobowe prawa handlowego (jawna, partnerska, komandytowa)
- Spółki kapitałowe (sp. z o.o., spółka akcyjna)
- Grupy VAT
- Inne podmioty niebędące osobą fizyczną (fundacje, wspólnoty mieszkaniowe, stowarzyszenia)

Trzy kluczowe przesłanki: **samodzielność**, **ciągłość**, **charakter zarobkowy**.

#### 1.2.1. Obowiązek wystawiania faktur w KSeF a brak działalności w CEIDG

Status podatnika VAT nie wymaga rejestracji w CEIDG. Definicja działalności gospodarczej na gruncie
VAT jest szersza niż w Prawie przedsiębiorców (art. 3). Podatnikiem VAT jest m.in.:

- **Osoba fizyczna wykonująca działalność nierejestrowaną** (rękodzieło, usługi kosmetyczne,
  krawieckie itp.)
- **Osoba fizyczna prowadząca najem prywatny** (art. 659 § 1 KC)

Osoby te nie mają obowiązku rejestracji jako VAT czynny, jeśli wartość sprzedaży nie przekroczyła
240 000 zł (zwolnienie podmiotowe, art. 113 ust. 1 i 9).

Zwolnienie przedmiotowe (art. 43 ust. 1 pkt 36) — najem nieruchomości mieszkalnych na cele
mieszkaniowe.

Identyfikatory podatkowe:

- Podatnik VAT czynny → NIP
- Osoby fizyczne niebędące zarejestrowanymi podatnikami VAT → PESEL
- Wyjątek: osoba prowadząca działalność nierejestrowaną zarejestrowana jako podatnik VAT lub
  prowadząca ewidencję na kasie → NIP

Osoby prowadzące działalność nierejestrowaną mogą uzyskać NIP składając VAT-R + NIP-7 do naczelnika
US.

**Terminy obowiązku wystawiania w KSeF:**

- Od 1 lutego 2026 r. — podatnicy o sprzedaży brutto > 200 mln zł (za 2024 r.)
- Od 1 kwietnia 2026 r. — pozostali podatnicy
- Do 31 grudnia 2026 r. — podatnicy mogą wystawiać faktury poza KSeF, jeżeli łączna wartość
  sprzedaży udokumentowana fakturami w danym miesiącu ≤ 10 000 zł (brutto) — nie wlicza się faktur
  na rzecz konsumentów, faktur z kas rejestrujących, paragonów fiskalnych uznawanych za faktury
- Od 1 stycznia 2027 r. — podatnicy zwolnieni, u których limit 10 000 zł nie jest przekroczony

**Najem prywatny — szczegóły:**

- Na cele mieszkaniowe (art. 43 ust. 1 pkt 36) lub użytkowe (zwolnienie art. 113 ust. 1 i 9)
  dokonywany na rzecz osoby fizycznej → brak obowiązku wystawienia faktury nawet na żądanie (art.
  106b ust. 3 pkt 1 lit. a). Podatnik może wystawić fakturę dobrowolnie (w KSeF lub poza KSeF).
- Na cele użytkowe, dokonywany na rzecz podatnika → obowiązek wystawienia faktury na żądanie
  nabywcy. Podatnik zwolniony podmiotowo wystawia w KSeF od 1 kwietnia 2026 r. (lub od 1 stycznia
  2027 r. przy limicie ≤ 10 000 zł).

Podatnicy zwolnieni mogą wystawiać **faktury uproszczone** (§ 3 pkt 1 rozporządzenia Dz.U. z 2025 r.
poz. 1742). Jeśli faktura uproszczona podlega wystawieniu w KSeF, wymagany jest NIP sprzedawcy.

> **WAŻNE:** Wdrożenie obowiązkowego KSeF nie oznacza, że wszystkie transakcje muszą być
> dokumentowane fakturami. Najpierw ustala się obowiązek wystawienia faktury, potem — obowiązek
> wystawienia w KSeF.

> **WAŻNE:** Zgłoszenia NIP-7 i VAT-R można złożyć przez e-Urząd Skarbowy (24/7). US nada NIP
> maksymalnie w ciągu 3 dni od otrzymania poprawnego zgłoszenia.

### 1.3. Brak możliwości wystawienia rachunku przez podatnika korzystającego ze zwolnienia

Faktura i rachunek to różne dokumenty. Faktura — art. 106b ustawy (Dział XI, Rozdział 1). Rachunek —
art. 87 Ordynacji Podatkowej.

Do wystawienia faktury zobowiązani są wszyscy podatnicy VAT (czynni i zwolnieni) wykonujący
działalność gospodarczą. Pierwszeństwo ma zawsze obowiązek wystawienia faktury.

Podatnik zwolniony nie musi wystawić faktury, chyba że nabywca tego zażąda (termin: 3 miesiące od
końca miesiąca dostawy/usługi). Jeśli podatnik zdecyduje się dokumentować czynność — tym dokumentem
zawsze musi być faktura, nie rachunek.

Rachunek można wystawić jedynie dla:

- Czynności niepodlegających opodatkowaniu VAT (art. 6 ustawy)
- Czynności wykonywanych przez podmioty niedziałające jako podatnicy
- Przez rolników ryczałtowych zwolnionych z obowiązku fakturowania (art. 117 ustawy)

Z obowiązku wystawienia faktury na żądanie nabywcy wyłączone są m.in.: czynności z art. 19a ust. 5
pkt 4 (najem, energia elektryczna) i art. 106a pkt 3 i 4 (procedury szczególne), a także zaliczki na
WDT.

### 1.4. Data wystawienia faktury ustrukturyzowanej (tryb ONLINE)

Zgodnie z art. 106na ust. 1 ustawy — datą wystawienia jest **data przesłania do KSeF**, pod
warunkiem że data w polu P_1 jest tożsama z datą przesłania.

Jeśli data przesłania jest **późniejsza** niż P_1 → faktura uznana za wystawioną w **trybie
offline24**, a datą wystawienia jest data z P_1.

Jeśli data P_1 jest **z przyszłości** (późniejsza niż data przesłania) → **odrzucenie pliku XML**.

> **Przykład 1 (ONLINE):** P_1 = 1.02.2026, przesłanie 1.02.2026 (23:50), rejestracja na bramce
> 1.02.2026, nr KSeF nadany 2.02.2026 (00:01). Data wystawienia = 1.02.2026.

> **Przykład 2 (offline24):** P_1 = 2.02.2026, przesłanie 3.02.2026. Data wystawienia = 2.02.2026
> (tryb offline24).

> **Przykład 3 (odrzucenie):** Przesłanie 2.02.2026, P_1 = 3.02.2026 (przyszłość). Plik XML
> odrzucony.

### 1.5. Kroki prowadzące do wystawienia faktury w KSeF

1. **KROK 1 — Weryfikacja uprawnień.** JDG → komplet uprawnień automatycznie. Podmiot niebędący
   osobą fizyczną → pieczęć kwalifikowana lub zawiadomienie ZAW-FA.
2. **KROK 2 — Uwierzytelnienie.** Metody: Węzeł krajowy, podpis kwalifikowany, pieczęć
   kwalifikowana, certyfikat KSeF, token.
3. **KROK 3 — Wypełnienie danych faktury.** Obowiązkowe elementy + elementy warunkowe (np. dane
   faktury pierwotnej przy korekcie, dane zamówienia przy zaliczce). Możliwe dane dodatkowe
   (termin/forma płatności, dane kontaktowe).
4. **KROK 4 — Wysłanie do KSeF.** Weryfikacja uprawnień i zgodności z wzorem FA(3).
5. **KROK 5 — Uzyskanie numeru KSeF i UPO.** Numer nadawany automatycznie, możliwość pobrania UPO.

### 1.6. Praktyczne kwestie związane z wystawianiem faktur

#### 1.6.1. Weryfikacja pliku XML oraz przesłanki odrzucenia pliku

KSeF weryfikuje:

- Zgodność pliku XML ze strukturą XSD (FA(3), FA_RR(1), PEF)
- Uprawnienia osoby/podmiotu przesyłającego

Przesłanki odrzucenia:

- Niezgodność struktury pliku ze wzorem
- Brak uprawnień
- Data P_1 z przyszłości (późniejsza niż data przesłania)
- Faktura z załącznikiem bez wcześniejszego zgłoszenia w e-US

**Nie jest** przesłanką odrzucenia: data P_1 wcześniejsza niż data przesłania (faktura uznawana za
offline24).

> **WAŻNE:** KSeF nie dokonuje weryfikacji obliczeń matematycznych. Nie odrzuci faktury z błędami
> rachunkowymi (np. nieprawidłowa kwota VAT). Tego typu weryfikacje mogą odbywać się na poziomie
> aplikacji.

MF zachęca do implementacji mechanizmów sprawdzających zgodność pliku XML ze wzorem przed wysyłką.

#### 1.6.2. Brak możliwości edytowania wystawionej faktury

Po przesłaniu do KSeF — brak edycji. Jedyna forma poprawienia: **faktura korygująca**. Od 1 lutego
2026 r. nie funkcjonują już noty korygujące.

#### 1.6.3. Brak możliwości anulowania lub usunięcia wystawionej faktury

Po nadaniu numeru KSeF — faktura weszła do obrotu prawnego. Brak anulowania nawet przy błędnym
nabywcy → należy wystawić korektę „do zera" + nową fakturę pierwotną.

Faktury przechowywane w KSeF przez **10 lat** od końca roku wystawienia. Podatnicy nie mogą
samodzielnie usuwać faktur.

#### 1.6.4. Wystawienie faktury na błędnego nabywcę

Błędny NIP w Podmiot2/DaneIdentyfikacyjne/NIP → faktura trafiła do niewłaściwego podmiotu.

Postępowanie:

1. Wystawić fakturę korygującą „do zera" z błędnym NIP
2. Wystawić nową fakturę pierwotną z prawidłowym NIP nabywcy

**Nie należy** korygować NIP na inny prawidłowy (faktura z błędnym NIP jest przypisana do podmiotu o
tym NIP).

#### 1.6.5. Faktura wydana w sposób uzgodniony lub użyta poza KSeF

Zasada: nabywca krajowy z NIP (B2B) otrzymuje fakturę w KSeF.

Wyjątki wymagające przekazania w sposób uzgodniony (art. 106gb ust. 4):

- Miejsce świadczenia poza Polską
- Podmiot bez siedziby/stałego miejsca prowadzenia działalności w PL
- Podmiot ze stałym miejscem w PL, ale nieuczestniczącym w transakcji
- Podatnik z innego kraju UE w procedurze SME (art. 113a ust. 1)
- Podmiot bez NIP
- Konsument (osoba fizyczna nieprowadząca działalności)

**Zawartość faktury poza KSeF:**

- Spójność z plikiem XML w KSeF
- Czytelność dokumentu
- Brak sprzeczności z zawartością pliku XML

> **WAŻNE:** Nie jest zalecane przesyłanie do KSeF pliku XML z tylko podstawowymi danymi, a
> dodatkowych informacji (termin płatności, nr rachunku) tylko na wizualizacji. Utrudnia to
> automatyzację. MF zachęca do pełnego wykorzystywania struktury FA(3): DodatkowyOpis, Platnosc,
> Rozliczenie, WarunkiTransakcji.

Wizualizacja może zawierać dodatkowe dane (logo, kontakt BOK), które nie mają znaczenia systemowego.

**Kody QR na fakturze poza KSeF:**

- Tryb ONLINE → jeden kod QR z numerem KSeF
- Tryb OFFLINE (nieprzesłana do KSeF) → dwa kody QR: „OFFLINE" + „CERTYFIKAT"

**Adnotacje na wizualizacji:** Jeśli adnotacja nie występuje (np. P_16 = „2"), nie trzeba umieszczać
na wizualizacji informacji o jej braku. Obowiązek zamieszczenia adnotacji istnieje tylko gdy
adnotacja występuje (np. P_16 = „1" → „metoda kasowa").

**Język obcy:** Plik XML może być w języku polskim, a faktura udostępniona nabywcy poza KSeF — w
języku obcym lub dwujęzycznie. Kluczowa jest merytoryczna zgodność. Nie ma przeszkód, aby sam plik
XML zawierał dane w języku obcym.

#### 1.6.6. Możliwość wydania nabywcy „potwierdzenia transakcji"

Potwierdzenie transakcji — propozycja biznesowa, nie dokument podatkowy. Korzystanie dobrowolne.
Przydatne w sprzedaży stacjonarnej (sklepy, stacje benzynowe), gdy faktura nie posiada jeszcze
numeru KSeF.

**Tryb ONLINE:**

- Numer KSeF nadany → przekazanie faktury z kodem QR (nr KSeF)
- Numer KSeF nie nadany → potwierdzenie transakcji z dwoma kodami QR

**Tryb OFFLINE (offline24, niedostępność KSeF):**

- Numer KSeF nadany → faktura z kodem QR (nr KSeF)
- Numer KSeF nie nadany + nabywca z art. 106gb ust. 4 → faktura z dwoma kodami QR
- Numer KSeF nie nadany + nabywca krajowy z NIP → potwierdzenie transakcji z dwoma kodami QR
  (nabywca otrzyma fakturę wyłącznie w KSeF)

**Tryb awaryjny (art. 106nf):** Faktura wydawana nabywcy poza KSeF z dwoma kodami QR.

#### 1.6.7. Kolejny numer faktury a odrzucenie pliku XML przez KSeF

Numeracja faktur musi zapewnić ciągłość i jednoznaczną identyfikację (art. 106e ust. 1 pkt 2). KSeF
nie weryfikuje ciągłości numeracji ani prawidłowości numerowania. Dopuszcza się sytuację, gdy
faktura o numerze wcześniejszym została przesłana do KSeF później niż faktury o numerach
późniejszych (np. z powodu odrzucenia i ponownej wysyłki).

### 1.7. Odliczenie podatku VAT z faktur wystawionych poza KSeF (luty–grudzień 2026)

Prawo do odliczenia VAT naliczonego z faktury wystawionej poza KSeF powstaje w okresie, w którym
powstał obowiązek podatkowy, nie wcześniej niż w okresie otrzymania faktury (art. 86 ust. 10b pkt
1). Moment otrzymania = data faktycznego otrzymania poza KSeF.

Prawo do odliczenia jest zapewnione nawet gdy dostawca wystawił fakturę z pominięciem obowiązku
KSeF, pod warunkiem spełnienia przesłanek materialnych (art. 86) i niezaistnienia przesłanek
negatywnych (art. 88).

Nabywca nie ma obowiązku weryfikacji, czy faktura została prawidłowo wystawiona poza KSeF, ale
powinien zachować należytą staranność.

> **WAŻNE:** Do 31 grudnia 2026 r. podatnicy nie będą karani za błędy związane ze stosowaniem KSeF.

### 1.8. Skutki podwójnie wystawionej faktury

Dwa przypadki:

1. **Faktura elektroniczna poza KSeF** — nigdy nie zostanie przesłana do KSeF (nie spełnia wymogów
   technicznych). Prawo do odliczenia od daty faktycznego otrzymania.

2. **Faktura offline24** — musi być przesłana do KSeF (najpóźniej następnego dnia roboczego).
   Nabywca otrzymuje ją w KSeF. Datą otrzymania jest data nadania numeru KSeF. Jeśli nabywca
   otrzymał dokument poza KSeF przed przesłaniem do KSeF (działanie nieprawidłowe sprzedawcy),
   nabywa prawo odliczenia w dacie faktycznego otrzymania.

---

## 2. Zalecenia dotyczące prawidłowego wypełniania struktury logicznej FA(3)

Od 1 lutego 2026 r. obowiązuje struktura FA(3), opublikowana na ePUAP: nr wzoru 13775.

Programy fakturujące tworzą plik XML na podstawie danych wprowadzonych przez wystawcę. Plik XML musi
być zgodny ze wzorem → jeśli nie → odrzucenie.

> **WAŻNE:** Struktura logiczna nie jest graficznym wzorem faktury. Określa, co powinien/może
> zawierać plik XML i w jakim formacie.

**Osiem głównych elementów struktury FA(3):**

1. **Naglowek** — dane techniczne (kod formularza, nazwa programu, data wytworzenia XML)
2. **Podmiot1** — dane sprzedawcy (NIP, nazwa, adres, kontakt)
3. **Podmiot2** — dane nabywcy (NIP, nazwa, adres, kontakt)
4. **Podmiot3** — dane podmiotu trzeciego (faktor, płatnik itp., max 100 podmiotów)
5. **PodmiotUpowazniony** — dane podmiotu upoważnionego (komornik sądowy itp.)
6. **Fa** — szczegółowe dane transakcji (nr faktury, daty, kwoty, pozycje, stawki, adnotacje,
   płatności, rozliczenia, warunki transakcji)
7. **Stopka** — stopka faktury (KRS, kapitał zakładowy)
8. **Zalacznik** — ustrukturyzowany załącznik (wymaga zgłoszenia w e-US)

Broszura informacyjna FA(3): https://ksef.podatki.gov.pl

### 2.1. Prawidłowy zapis identyfikatorów podatkowych

#### 2.1.1. Brak znaków rozdzielających w numerze NIP

NIP zapisywany jako ciąg cyfr bez spacji i znaków rozdzielających.

| Pole | Prawidłowo   | Nieprawidłowo   |
| ---- | ------------ | --------------- |
| NIP  | `9999999999` | `999-999-99-99` |

#### 2.1.2. Wydzielenie prefiksu sprzedawcy „PL" w osobnym polu

W transakcjach wymagających prefiksu „PL" (WDT, usługi art. 28b) → oddzielne pole
`Podmiot1/PrefiksPodatnika`.

| Pole             | Prawidłowo   | Nieprawidłowo  |
| ---------------- | ------------ | -------------- |
| PrefiksPodatnika | `PL`         | _(puste)_      |
| NIP              | `9999999999` | `PL9999999999` |

#### 2.1.3. Wydzielenie prefiksu nabywcy w osobnym polu

Nabywca VAT UE → kod kraju w polu `KodUE`, numer w polu `NrVatUE` (element
Podmiot2/DaneIdentyfikacyjne).

| Pole     | Prawidłowo   | Nieprawidłowo |
| -------- | ------------ | ------------- |
| KodUE    | `DE`         | _(puste)_     |
| NrVatUE  | `9999999999` | _(puste)_     |
| KodKraju | _(puste)_    | `DE`          |
| NrID     | _(puste)_    | `9999999999`  |

#### 2.1.4. Identyfikator podatkowy nabywcy ujęty w polu NIP

Nabywca z polskim NIP → NIP **musi** być w polu `Podmiot2/DaneIdentyfikacyjne/NIP` (na tej podstawie
faktura udostępniana nabywcy w KSeF). Nie wpisywać w polu NrID.

#### 2.1.5. Identyfikator kontrahenta z kraju trzeciego

Nabywca z kraju trzeciego — nie jest obowiązkowe wskazywanie identyfikatora. Wystarczy `BrakID = 1`.
Jeśli identyfikator jest podawany → pola `NrID` + `KodKraju`. Nie łączyć kodu kraju z
identyfikatorem w polu NrID.

| Pole     | Prawidłowo   | Nieprawidłowo  |
| -------- | ------------ | -------------- |
| KodKraju | `CH`         | _(puste)_      |
| NrID     | `9999999999` | `CH9999999999` |

#### 2.1.6. Nabywca jest konsumentem

Konsument → `BrakID = 1`.

### 2.2. Faktura zawierająca dane podmiotów trzecich

Część Podmiot3 — do 100 podmiotów. Zawiera: dane identyfikacyjne, adres, adres korespondencyjny,
dane kontaktowe, rolę.

**Role podmiotu trzeciego (pole Rola):**

| Wartość | Rola                                                        |
| ------- | ----------------------------------------------------------- |
| 1       | Faktor                                                      |
| 2       | Odbiorca (jednostka wewnętrzna, oddział nabywcy)            |
| 3       | Podmiot pierwotny (przejęty/przekształcony)                 |
| 4       | Dodatkowy nabywca                                           |
| 5       | Wystawca faktury (w imieniu podatnika, nie dotyczy nabywcy) |
| 6       | Dokonujący płatności (w miejsce nabywcy)                    |
| 7       | JST — wystawca                                              |
| 8       | JST — odbiorca                                              |
| 9       | Członek grupy VAT — wystawca                                |
| 10      | Członek grupy VAT — odbiorca                                |
| 11      | Pracownik                                                   |

Inna rola → `RolaInna = 1` + pole `OpisRoli`.

Jeden podmiot w dwóch rolach → dwa wypełnienia Podmiot3 (dla każdej roli osobno) lub jedno z
`RolaInna` opisującą obie role.

#### 2.2.1. Faktura obejmująca dane faktora

Element Podmiot3 (dane identyfikacyjne, adres, kontakt, Rola = „1"). Dodatkowo w
Fa/Platnosc/RachunekBankowyFaktora: numer rachunku, SWIFT, znacznik rachunku własnego banku, nazwa
banku (max 256 znaków), opis rachunku (max 256 znaków).

Termin i forma płatności: Fa/Platnosc → TerminPlatnosci, FormaPlatnosci (lub PlatnoscInna,
OpisPlatnosci).

Przykładowy plik: gov.pl/web/kas/krajowy-system-e-faktur, przykład nr 4.

#### 2.2.2. Faktura zawierająca dane kilku nabywców

- Pierwszy nabywca → Podmiot2
- Drugi (i kolejni) → Podmiot3 z Rola = „4"

Pole `Udzial` — procentowy udział dodatkowego nabywcy. Różnica 100% − suma udziałów dodatkowych =
udział nabywcy z Podmiot2. KSeF nie waliduje sumy udziałów.

Przykładowy plik: przykład nr 10.

#### 2.2.3. Faktura z danymi jednostki podrzędnej JST

Opisane w cz. IV Podręcznika KSeF 2.0.

#### 2.2.4. Faktura z danymi członka GV

Opisane w cz. IV Podręcznika KSeF 2.0.

#### 2.2.5. Faktura z danymi zakładu lub wyodrębnionej jednostki wewnętrznej podatnika

Pole `IDWew` (Podmiot3/DaneIdentyfikacyjne) — unikalny identyfikator zakładu/oddziału/jednostki
wewnętrznej. Zawiera NIP podatnika + ciąg znaków numerycznych.

Faktura zakupowa dotycząca zakładu:

- Podmiot2 → dane nabywcy (podatnika) z NIP
- Podmiot3 → dane zakładu z IDWew

Faktura sprzedażowa zakładu:

- Podmiot1 → NIP podatnika (sprzedawcy)
- Podmiot3 → dane zakładu z IDWew

> **WAŻNE:** Każdorazowe wskazanie IDWew jest warunkiem poprawnego działania modelu uprawnień
> dedykowanego zakładom.

### 2.3. Dodatkowe informacje o przedmiocie sprzedaży

Pole `P_7` (FaWiersz) — nazwa towaru lub usługi, max 512 znaków.

Dodatkowe pola fakultatywne na poziomie wiersza:

- **Indeks** — kod wewnętrzny towaru/usługi lub dodatkowy opis (max 50 znaków)
- **GTIN** — Globalny numer jednostki handlowej (max 20 znaków)
- **PKWiU** — symbol Polskiej Klasyfikacji Wyrobów i Usług (max 50 znaków)
- **CN** — symbol Nomenklatury Scalonej (max 50 znaków)
- **PKOB** — symbol Polskiej Klasyfikacji Obiektów Budowlanych (max 50 znaków)

**Element DodatkowyOpis** (część Fa) — max 10 000 wystąpień. Typ złożony:

- `NrWiersza` — numer wiersza (opcjonalny; brak = dotyczy całej faktury)
- `Klucz` — nazwa pola
- `Wartosc` — zawartość pola

Zastosowanie: dane specyficzne branżowo (media, telekomunikacja — zużycie, numer licznika, adres
punktu poboru).

### 2.4. Faktura dokumentująca sprzedaż zwolnioną od podatku

Zgodnie z art. 106e ust. 4 pkt 3 ustawy, faktura dokumentująca sprzedaż zwolnioną (art. 43 ust. 1,
art. 113 ust. 1 i 9, art. 82 ust. 3) nie zawiera: stawki podatku, sumy wartości sprzedaży netto,
kwoty podatku.

W FA(3) przewidziano:

- `P_13_7` — suma wartości sprzedaży zwolnionej (nieobowiązkowe, ale zalecane)
- `P_12` w FaWiersz → oznaczenie „zw" (nieobowiązkowe, ale zalecane)

Podstawa prawna zwolnienia w Fa/Adnotacje:

- `P_19A` — przepis ustawy/aktu wykonawczego (max 256 znaków)
- `P_19B` — przepis dyrektywy 2006/112/WE (max 256 znaków)
- `P_19C` — inna podstawa prawna (max 256 znaków)

> **WAŻNE:** Struktura umożliwia wypełnienie **tylko jednego** z pól P_19A/P_19B/P_19C. Przy dwóch
> podstawach zwolnienia → opisać łącznie w jednym polu.

### 2.5. Faktura walutowa

Zgodnie z art. 106e ust. 11 — kwoty podatku wykazuje się w złotych.

Wypełnienie:

- `KodWaluty` → kod ISO 4217 (np. „EUR")
- Pola P_13_x, P_14_x → kwoty w walucie obcej
- Pola P_14_xW → kwota podatku przeliczona na PLN
- `FaWiersz/KursWaluty` — kurs waluty na poziomie wiersza (max 6 miejsc po kropce)
- `Fa/KursWalutyZ` lub `Fa/ZaliczkaCzesciowa/KursWalutyZW` — kurs dla faktur zaliczkowych

Przykładowe pliki: przykład nr 20 i 21.

### 2.6. Faktura zaliczkowa

Art. 106b ust. 1 pkt 4 ustawy. Elementy charakterystyczne:

- `P_6` — data otrzymania zapłaty (jeśli różna od daty wystawienia)
- `ZaliczkaCzesciowa` (max 31 wystąpień) — gdy jedna faktura dokumentuje kilka zaliczek. Pola:
  `P_6Z` (data), `P_15Z` (kwota), `KursWalutyZW` (opcjonalnie)
- `RodzajFaktury = „ZAL"`
- Podsumowanie podstaw opodatkowania i podatku w podziale na stawki (P_13_x, P_14_x, P_14_xW)
- `P_15` — kwota należności ogółem (wartość zaliczki; suma P_15Z przy kilku zaliczkach)
- Element `FakturaZaliczkowa` — dane wcześniejszych faktur zaliczkowych (gdy łącznie obejmują całą
  zapłatę)
- Element `Zamowienie` — wypełniony
- Element `FaWiersz` — pominięty

Wzór wyliczenia kwoty podatku: `KP = (ZB × SP) / (100 + SP)`

Przykładowy plik: przykład nr 10.

### 2.7. Faktura rozliczająca

Art. 106f ust. 3 ustawy. Elementy charakterystyczne:

- `RodzajFaktury = „ROZ"`
- P_13_x, P_14_x, P_14_xW → odnoszą się wyłącznie do kwoty pozostałej do zapłaty (kwota końcowa)
- `P_15` — kwota pozostała do zapłaty
- `ZaliczkaCzesciowa` — gdy art. 106e ust. 1a (zaliczka i dostawa w tym samym miesiącu, bez odrębnej
  faktury zaliczkowej)
- Element `FakturaZaliczkowa` — numery KSeF faktur zaliczkowych (lub numery faktur poza KSeF)
- Element `Zamowienie` — pominięty
- Element `FaWiersz` — pełne wartości przedmiotu transakcji

Przykładowy plik: przykład nr 14 i 17.

### 2.8. Faktura końcowa „zerowa"

Gdy podatnik otrzymał 100% zapłaty i wystawił fakturę zaliczkową → brak obowiązku wystawienia
faktury rozliczającej. Jeśli jednak ją wystawi:

- `RodzajFaktury = „ROZ"`
- `P_15 = 0`
- `FakturaZaliczkowa` — numer faktury zaliczkowej (+ znacznik KSeF/poza KSeF)
- `FaWiersz` — pełne wartości
- `Zamowienie` — pominięty

### 2.9. Faktura VAT marża

Dotyczy: usługi turystyki, dostawa towarów używanych, dzieła sztuki, przedmioty kolekcjonerskie i
antyki.

Art. 106e ust. 2–3 — faktura VAT marża zawiera ograniczony zakres danych (pkt 1–8 i 15–17) +
odpowiednią adnotację.

Wypełnienie w FA(3):

- `P_13_11` — suma wartości sprzedaży w procedurze marży (zalecane)
- `P_15` — kwota należności ogółem
- `Adnotacje/P_PMarzy = „1"` + odpowiedni podznacznik:
  - `P_PMarzy_2 = „1"` → „procedura marży dla biur podróży"
  - `P_PMarzy_3_1 = „1"` → „procedura marży - towary używane"
  - `P_PMarzy_3_2 = „1"` → „procedura marży - dzieła sztuki"
  - `P_PMarzy_3_3 = „1"` → „procedura marży - przedmioty kolekcjonerskie i antyki"
- `FaWiersz` — cena jednostkowa i wartość sprzedaży (opcjonalnie)

Przykładowy plik: przykład nr 8.

### 2.10. Faktura uproszczona do 450 zł

Art. 106e ust. 5 pkt 3 ustawy. Kwota należności ogółem ≤ 450 zł (lub 100 EUR). Może nie zawierać
danych nabywcy (poza NIP) oraz danych z pkt 8, 9, 11–14, pod warunkiem że pozwala określić kwotę
podatku dla poszczególnych stawek.

- Podmiot2 → tylko NIP nabywcy
- `RodzajFaktury = „UPR"`
- **Sposób I:** Wypełnione P_13_x/P_14_x/P_14_xW + P_15. FaWiersz: P_7 (nazwa), bez P_12.
- **Sposób II:** Brak P_13_x/P_14_x, ale P_15. FaWiersz: P_7 + P_12 (stawka).

Przy różnych stawkach i braku P_13_x/P_14_x → wymagane pola P_11 lub P_11A.

> Uwaga: Aplikacja Podatnika KSeF nie ma funkcjonalności wystawiania faktur uproszczonych do 450 zł.

Przykładowe pliki: przykład nr 15 i 16.

### 2.11. Faktura dokumentująca WDT i eksport towarów

**Eksport towarów:**

- Podmiot1 → NIP sprzedawcy
- Podmiot2 → KodKraju + NrID nabywcy (fakultatywnie)
- `P_13_6_3` — suma wartości sprzedaży objętej stawką 0% (eksport)
- `P_12 = „0 EX"` (na poziomie wiersza)

**WDT:**

- Podmiot1 → NIP + PrefiksPodatnika = „PL"
- Podmiot2 → KodUE + NrVatUE
- `P_13_6_2` — suma wartości sprzedaży objętej stawką 0% (WDT)
- `P_12 = „0 WDT"` (na poziomie wiersza)

Przykładowe pliki: przykład nr 22, 23.

### 2.12. Faktura wystawiona w procedurze samofakturowania

Opisane w cz. III Podręcznika KSeF 2.0.

### 2.13. Faktury korygujące

#### 2.13.1. Cechy charakterystyczne faktury korygującej

Kluczowe pola:

- **RodzajFaktury:**
  - `KOR` — korekta faktury podstawowej lub uproszczonej
  - `KOR_ZAL` — korekta faktury zaliczkowej
  - `KOR_ROZ` — korekta faktury rozliczającej
- **PrzyczynaKorekty** — opis przyczyny (nieobowiązkowe)
- **TypKorekty** (nieobowiązkowe):
  - `1` — korekta skutkująca w dacie ujęcia faktury pierwotnej
  - `2` — korekta skutkująca w dacie wystawienia faktury korygującej
  - `3` — korekta skutkująca w dacie innej
- **NrFaKorygowany** — poprawny numer, gdy przyczyną korekty jest błędny numer faktury
- **DaneFaKorygowanej** — dane faktur korygowanych (max 50 000 wystąpień). Zawiera:
  DataWystFaKorygowanej, NrFaKorygowanej, NrKSeF/NrKSeFFaKorygowanej lub NrKSeFN
- **P_15ZK** — kwota zapłaty przed korektą (korekta zaliczkowej) lub kwota pozostała do zapłaty
  przed korektą (korekta rozliczającej)
- **KursWalutyZK** — kurs waluty przed korektą (korekta zaliczkowej w walucie obcej)

#### 2.13.2. Prezentowanie „różnic" w fakturach korygujących

Art. 106j ust. 2 pkt 5 — kwota korekty podstawy opodatkowania / kwota korekty podatku z podziałem na
stawki.

Pola P_13_x, P_14_x, P_14_xW, P_15 wypełniane **przez różnicę** w stosunku do faktury pierwotnej.

> **Przykład:** Faktura pierwotna: netto 2000, VAT 460, brutto 2460. Korekta do 1800 netto → P_13_1
> = -200, P_14_1 = -46, P_15 = -246.

#### 2.13.3. Wystawienie kilku faktur korygujących do jednej faktury pierwotnej

Kolejne korekty odnoszą się do wartości **uwzględniających wcześniejsze korekty**. W
DaneFaKorygowanej podaje się dane **faktury pierwotnej** (nie wcześniejszych korekt).

> **Przykład:** Faktura 1000 netto → korekta 1 (-100 netto) → stan 900 netto → korekta 2 (-200
> netto, do 700 netto) → P_13_1 = -200, P_14_1 = -46, P_15 = -246.

#### 2.13.4. Zasady korygowania wierszy (pozycji) faktury

Trzy metody:

1. **Korygowanie przez różnicę** — jeden wiersz korygującej odpowiada jednemu wierszowi korygowanemu
   (kwota różnicy)
2. **Korygowanie z znacznikiem StanPrzed** — dwa wiersze: pierwszy ze `StanPrzed = „1"` (dane przed
   korektą), drugi z danymi po korekcie. Wartość StanPrzed przyjmuje znak przeciwny. Zalecane przy
   zmianie stawki VAT lub kursów walut.
3. **Korygowanie poprzez storna** — jak StanPrzed, ale bez znacznika — wiersz „stanu przed" ze
   znakiem ujemnym (ujemna ilość lub ujemna cena jednostkowa).

Pole **UU_ID** — uniwersalny unikalny numer wiersza. Umożliwia powiązanie wiersza korygującej z
wierszem korygowanej. Wymaga nadania już w fakturze pierwotnej. Unikalność w ramach wszystkich
faktur podatnika. Dobrowolne.

Przykładowe pliki: przykład nr 2, 3.

#### 2.13.5. Faktura korygująca fakturę zaliczkową i rozliczającą

Nawet gdy korekta nie dotyczy wartości zamówienia, ale zmienia podstawę opodatkowania/podatek →
zalecenie wprowadzenia zapisu stanu przed i po korekcie w częściach Zamowienie (korekta zaliczkowej)
lub FaWiersz (korekta rozliczającej).

Pole `WartoscZamowienia` w korekcie → prawidłowa wartość zamówienia po korekcie (suma brutto wierszy
po korekcie).

`P_15` → różnica wartości zaliczki w stosunku do faktury pierwotnej.

Przykładowe pliki: przykład nr 12, 18.

#### 2.13.6. Faktury korygowane wystawione w KSeF i poza KSeF

Element `DaneFaKorygowanej` (max 50 000 wystąpień) umożliwia korektę zbiorczą odnoszącą się
jednocześnie do faktur z KSeF i poza KSeF.

Dla faktury poza KSeF: DataWystFaKorygowanej + NrFaKorygowanej + `NrKSeFN = „1"`.

Dla faktury z KSeF: DataWystFaKorygowanej + NrFaKorygowanej + `NrKSeF = „1"` + NrKSeFFaKorygowanej.

#### 2.13.7. Faktura korygująca zbiorcza

Art. 106j ust. 3 — opust/obniżka ceny za dostawy na rzecz jednego odbiorcy w danym okresie.

- P_13_x/P_14_x/P_14_xW → kwoty korekty (ze znakiem „-")
- P_15 → korekta kwoty należności ogółem
- `RodzajFaktury = „KOR"`
- PrzyczynaKorekty (fakultatywnie)
- TypKorekty (fakultatywnie)
- DaneFaKorygowanej (max 50 000 razy)
- `OkresFaKorygowanej` — okres, do którego odnosi się opust/obniżka (pole tekstowe)
- Gdy korekta dotyczy **wszystkich** dostaw → brak FaWiersz
- Gdy korekta dotyczy **części** dostaw → FaWiersz z P_7 (nazwa towaru/usługi objętych korektą)

> **WAŻNE:** Fakturę korygującą zbiorczą można wystawić zarówno „in minus" jak i „in plus".
> Uproszczenia z art. 106j ust. 3 dotyczą wyłącznie korekt „in minus".

Przykładowe pliki: przykład nr 6 i 7.

#### 2.13.8. Podmiot1K i Podmiot2K w fakturze korygującej

**Podmiot1K** — dane sprzedawcy ze stanu przed korektą (gdy uległy zmianie). Pełne dane z faktury
pierwotnej. Poprawne dane → Podmiot1. Nie dotyczy korekty błędnego NIP (→ korekta do zera).

**Podmiot2K** — dane nabywcy/dodatkowego nabywcy ze stanu przed korektą. Pełne dane z faktury
pierwotnej. Korekcie nie podlegają błędne numery identyfikujące nabywcę.

Pole **IDNabywcy** — unikalny klucz powiązania danych nabywcy (max 32 znaki). Występuje wyłącznie w
fakturach korygujących z Podmiot2K. Łączy dane po korekcie (Podmiot2/Podmiot3) z danymi przed
korektą (Podmiot2K).

Podmiot2K może wystąpić wielokrotnie (wielu nabywców na fakturze pierwotnej).

Przykładowy plik: przykład nr 5.

### 2.14. Kwota należności ogółem na fakturze

Pole P_15 — znaczenie zależy od typu faktury:

| Typ faktury                            | Znaczenie P_15                               |
| -------------------------------------- | -------------------------------------------- |
| Podstawowa                             | Kwota należności ogółem                      |
| Zaliczkowa                             | Kwota otrzymanej zapłaty (wartość zaliczki)  |
| Rozliczająca (art. 106f ust. 3)        | Kwota pozostała do zapłaty                   |
| Korygująca                             | Korekta (różnica) kwoty                      |
| Korygująca zbiorcza (art. 106j ust. 3) | Korekta (różnica) kwot z faktur korygowanych |

W P_15 **nie uwzględnia się** kwot niestanowiących wynagrodzenia (np. wydatki w imieniu i na rzecz
usługobiorcy, odszkodowania).

**Element Rozliczenie** (fakultatywny) — prezentacja dodatkowych obciążeń/pomniejszeń:

- Do 100 kwot i powodów obciążeń + suma obciążeń
- Do 100 kwot i powodów odliczeń + suma odliczeń
- Kwota do zapłaty/rozliczenia

### 2.15. Struktura FA(3) a wydatki pracownicze

Nabywcą jest podatnik (pracodawca) → NIP pracodawcy w Podmiot2.

Sposoby identyfikacji wydatków pracowniczych:

1. **Pole IDWew w Podmiot3** — pracodawca generuje identyfikatory wewnętrzne dla pracowników.
   Sprzedawca umieszcza dane pracownika w Podmiot3 z IDWew. Rola = „11" (Pracownik). Pracodawca może
   nadać pracownikowi (lub osobie z księgowości/kadr) uprawnienia dostępu do faktur w KSeF.

2. **Podmiot3 bez IDWew** — dane pracownika z `BrakID = „1"`, Rola = „11".

3. **Element DodatkowyOpis** — Klucz: „Rodzaj wydatku", Wartosc: „Wydatek pracowniczy - Jan
   Kowalski".

> **WAŻNE:** Wskazane rozwiązania to wyłącznie przykłady. Organizacja procesu zależy od potrzeb
> podatnika.

Dodatkowa możliwość: wydanie **potwierdzenia transakcji** (zob. 1.6.6).

---

## 3. Aspekty techniczne związane z wysyłką faktur do KSeF

### 3.1. Jak wystawić e-Fakturę?

Fakturę ustrukturyzowaną można wystawić przy użyciu komercyjnych programów finansowo-księgowych (API
KSeF 2.0 od 1 lutego 2026 r.) lub bezpłatnych narzędzi MF:

- **Aplikacja Podatnika KSeF** — zarządzanie uprawnieniami, tokenami, certyfikatami, wystawianie i
  odbieranie e-Faktur, podgląd, weryfikacja statusu, UPO. Wersje: testowa (od 3.11.2025),
  przedprodukcyjna (od 15.11.2025), produkcyjna (od 1.02.2026).
- **Aplikacja Mobilna KSeF** — wystawianie, odbieranie w czasie rzeczywistym, zarządzanie z
  dowolnego miejsca.
- **e-mikrofirma** — powiązanie konta z KSeF, wystawianie, odbieranie, przenoszenie do ewidencji
  VAT. Dostępna w e-Urzędzie Skarbowym.

### 3.2. Rodzaje udostępnionych środowisk KSeF

#### 3.2.1. Środowisko testowe

Dostępne od 30 września 2025 r. (nadal dostępne po 1.02.2026). Cel: testowanie nowych
funkcjonalności API KSeF 2.0. Dokumenty nie są fakturami i nie wywołują skutków prawnych.

Wymagania: zanonimizowane dane, brak rzeczywistych NIP + danych osobowych łącznie. Dopuszczalne
samodzielnie wygenerowane certyfikaty (odpowiedniki kwalifikowanych).

#### 3.2.2. Środowisko przedprodukcyjne (demo)

Oparte o faktyczne dane uwierzytelniające. Wymaga faktycznych uprawnień (jak produkcja). Niedostępne
publicznie. Dokumenty bez skutków prawnych. Nadal dostępne po 1.02.2026.

#### 3.2.3. Środowisko produkcyjne

Udostępnione 1 lutego 2026 r. Faktyczne dane uwierzytelniające. Dokumenty = pełnoprawne faktury.

> **WAŻNE:** Niedopuszczalne jest przesyłanie faktur testowych do środowiska produkcyjnego. Faktura
> przyjęta z numerem KSeF = pełnoprawna faktura → obowiązek zapłaty podatku (art. 108). W razie
> błędu → niezwłocznie korekta „do zera".

### 3.3. Sesja interaktywna i wsadowa

#### 3.3.1. Sesja interaktywna

Przesyłanie pojedynczych plików XML. Wymagania: format XML, zgodność z FA(3).

Limity:

- Max rozmiar pliku: **1 MB**
- Brak faktur z załącznikiem (wyjątek: korekta techniczna)
- Max faktur w sesji: **10 000**

#### 3.3.2. Sesja wsadowa

Przesyłanie wielu faktur w paczce ZIP.

Limity:

- Max rozmiar pliku: **1 MB** (bez załącznika), **3 MB** (z załącznikiem)
- Faktury z załącznikiem → wyłącznie sesja wsadowa
- Max faktur w sesji: **10 000**
- Max paczek ZIP: **50**, każda max **100 MB**

Brak atomowości: błędne pliki XML w paczce są odrzucane indywidualnie (kod błędu dla każdego),
pozostałe prawidłowe pliki otrzymują numery KSeF.

### 3.4. Weryfikacja duplikatów faktur

Mechanizm blokowania duplikatów na podstawie trzech parametrów:

1. NIP sprzedawcy (Podmiot1/DaneIdentyfikacyjne/NIP)
2. Numer faktury (P_2)
3. Rodzaj faktury (RodzajFaktury)

Identyczne wartości we wszystkich trzech → odrzucenie (kod błędu 440 „Duplikat faktury"). Unikalność
weryfikowana w okresie 10 lat wstecz.

---

## 4. Potwierdzenie skutecznego wystawienia faktury w KSeF

### 4.1. Numer KSeF faktury

Unikalny numer identyfikujący fakturę w systemie. Generowany automatycznie, zwracany w UPO.

> **WAŻNE:** Numer KSeF nie jest elementem faktury. FA(3) nie zawiera pola na numer KSeF. Pole P_2
> zawiera numer faktury nadany przez podatnika.

Numer KSeF wykorzystywany w:

- Fakturach korygujących (DaneFaKorygowanej)
- Fakturach rozliczających (FakturaZaliczkowa)
- Płatnościach MPP (od 1.01.2027)
- Płatnościach między podatnikami VAT czynnymi (od 1.01.2027)
- Plikach JPK (JPK_V7M/V7K, JPK_KR_PD)
- Na kodzie QR faktury poza KSeF

#### 4.1.1. Numer KSeF faktury zaliczkowej w fakturze rozliczającej

Art. 106f ust. 3 — faktura rozliczająca zawiera numery KSeF faktur zaliczkowych. Dla faktur poza
KSeF → numery nadane przez podatnika.

#### 4.1.2. Numer KSeF w fakturze zaliczkowej

Art. 106f ust. 4 — ostatnia faktura zaliczkowa (obejmująca łącznie całą zapłatę) zawiera numery KSeF
poprzednich faktur zaliczkowych.

Element `FakturaZaliczkowa` (max 100 wystąpień), typ „choice":

- `NrKSeFZN = „1"` + `NrFaZaliczkowej` → faktura zaliczkowa poza KSeF
- `NrKSeFFaZaliczkowej` → faktura zaliczkowa w KSeF

#### 4.1.3. Numer KSeF faktury pierwotnej w fakturze korygującej

Faktura korygująca zawiera numer KSeF faktury korygowanej (chyba że nie nadano nr KSeF). Dotyczy też
faktur z trybów offline24, offline-niedostępność, awaryjnego.

Numery KSeF → DaneFaKorygowanej.

#### 4.1.4. Numer KSeF wskazywany w komunikacie przelewu MPP

Art. 108a — od **1 stycznia 2027 r.** obowiązek podawania numeru KSeF w komunikacie przelewu MPP
(gdy wystawca obowiązany do e-fakturowania).

Komunikat przelewu MPP zawiera: kwotę VAT, kwotę brutto, numer KSeF faktury, NIP
dostawcy/usługodawcy.

#### 4.1.5. Numer KSeF w płatnościach pomiędzy podatnikami VAT czynnymi

Art. 108g — od **1 stycznia 2027 r.** nabywca (VAT czynny) płacąc za e-Fakturę na rzecz innego
podatnika VAT czynnego (poleceniem przelewu lub innym instrumentem płatniczym umożliwiającym podanie
tytułu) obowiązany jest podać numer KSeF lub identyfikator zbiorczy.

Obowiązek dotyczy też wystawcy przy poleceniu zapłaty. Status podatnika ustalany na podstawie Wykazu
podatników na dzień płatności.

Wyłączenie: faktury offline24 / offline-niedostępność KSeF niewprowadzone do KSeF w związku z
komunikatami o awarii.

#### 4.1.6. Numer KSeF w plikach JPK

Znowelizowane rozporządzenie JPK_VAT → nowe wersje JPK_V7M(3) i JPK_V7K(3). Od lutego 2026 r.
obowiązek podawania numerów KSeF faktur sprzedażowych i zakupowych (lub odpowiednich oznaczeń przy
braku numeru KSeF).

Mechanizm automatycznego zasilania ewidencji danymi faktur (np. w e-mikrofirmie).

Numer KSeF wykorzystywany również w JPK_KR_PD.

### 4.2. Urzędowe Poświadczenie Odbioru (UPO)

UPO — formalne potwierdzenie odbioru dokumentu elektronicznego przez KSeF. Odrębny od e-Faktury
dokument XML, do pobrania przez API.

Pobranie UPO bez uwierzytelnienia:

- Dla pojedynczych faktur w sesji (po nadaniu numeru KSeF)
- Dla wszystkich faktur w sesji (po przetworzeniu + zamknięciu sesji, min. jedna faktura z numerem
  KSeF)

**Elementy UPO:**

1. Numer referencyjny sesji (interaktywna) / paczki (wsadowa) — ≠ numer KSeF
2. Typ identyfikatora kontekstu uwierzytelnienia
3. Wartość identyfikatora kontekstu
4. Numer KSeF faktury
5. Numer faktury (P_2)
6. NIP sprzedawcy
7. Data wystawienia (P_1) — data wystawienia w trybach offline
8. Data przesłania do KSeF — data wystawienia w trybie online (gdy zgodna z P_1)
9. Data nadania numeru KSeF = data otrzymania e-Faktury przez nabywcę
10. Skrót kryptograficzny SHA-256
11. Tryb wysyłki (online/offline)

---

## 5. Otrzymywanie faktur w KSeF oraz dostęp do faktur. Kody QR.

Faktura z numerem KSeF automatycznie dostępna po stronie nabywcy (gdy NIP nabywcy w
Podmiot2/DaneIdentyfikacyjne/NIP).

> **WAŻNE:** Od 1 lutego 2026 r. uchylony art. 106na ust. 2 — otrzymywanie e-Faktur nie wymaga
> akceptacji odbiorcy.

### 5.1. Data otrzymania faktury ustrukturyzowanej (tryb ONLINE)

Art. 106na ust. 3 — data otrzymania = **dzień przydzielenia numeru KSeF**.

Art. 106na ust. 4 — dla nabywców z art. 106gb ust. 4 (zagraniczni, konsumenci, bez NIP itp.) = data
**faktycznego otrzymania** poza KSeF.

### 5.2. Otrzymanie faktury w KSeF. Dostęp do faktury.

**Sprzedawca (Podmiot1)** — dostęp jako strona transakcji + osoby/podmioty przez niego uprawnione.

**Nabywca (Podmiot2)** — otrzymuje fakturę w KSeF na podstawie NIP w polu NIP. Dostęp po
uwierzytelnieniu + przez uprawnionych.

> **WAŻNE:** NIP nabywcy musi być w polu NIP (nie NrVatUE ani NrID), inaczej nabywca nie otrzyma
> faktury w KSeF.

**Podmiot trzeci (Podmiot3)** — otrzymuje fakturę w KSeF, gdy wskazany jest jego NIP lub IDWew.
Dostęp tylko do faktur, w których występuje jako Podmiot3.

**Podmiot upoważniony (PodmiotUpowazniony)** — komornik sądowy, organ egzekucyjny, przedstawiciel
podatkowy. Dostęp do faktur wystawionych w imieniu sprzedawcy.

Dostęp bez uwierzytelnienia: dwuetapowy (kod QR) lub anonimowy.

### 5.3. Przekazanie faktury w postaci uzgodnionej

#### 5.3.1. Udostępnienie faktury w sposób uzgodniony

Art. 106gb ust. 4 — obowiązek przekazania w sposób uzgodniony gdy nabywca to:

- Podmiot zagraniczny (brak siedziby/stałego miejsca w PL lub stałe miejsce nieuczestniczące)
- Podatnik UE w procedurze SME
- Podmiot bez NIP
- Konsument

Faktura poza KSeF → obowiązkowy kod/kody QR.

#### 5.3.2. Zapewnienie dostępu do faktury nabywcom bez NIP i konsumentom

Gdy konsument chce odebrać fakturę w KSeF → sprzedawca wydaje kod QR + dane dostępowe. Konsument po
zeskanowaniu QR i wpisaniu danych pobiera fakturę bez uwierzytelnienia.

### 5.4. Kody weryfikujące

Kod QR — graficzna postać linku prowadzącego do faktury w KSeF. Generowany lokalnie na poziomie
aplikacji fakturującej.

Zgodny z normą **ISO/IEC 18004:2024**.

#### 5.4.1. Kod QR do weryfikacji faktury ONLINE lub OFFLINE (KOD I)

- Faktura ONLINE → 1 kod QR + numer KSeF pod kodem
- Faktura OFFLINE (bez numeru KSeF) → 2 kody QR: KOD I z napisem „OFFLINE" + KOD II z napisem
  „CERTYFIKAT"

KOD I zapewnia dostęp do faktury w KSeF i umożliwia weryfikację danych. Niezależnie od trybu,
zawiera te same elementy:

- Adres zasobu oprogramowania interfejsowego
- Data wystawienia (P_1)
- NIP sprzedawcy
- Wyróżnik faktury

#### 5.4.2. Kod QR do weryfikacji tożsamości wystawcy faktury OFFLINE (KOD II)

Wyłącznie dla faktur OFFLINE. Wymaga **certyfikatu KSeF (typu 2)**. Umożliwia sprawdzenie:

- Czy certyfikat jest aktywny
- Czy właściciel certyfikatu ma uprawnienia do wystawiania faktur

Elementy: adres zasobu, typ i wartość identyfikatora kontekstu, NIP sprzedawcy, identyfikator
certyfikatu KSeF, wyróżnik faktury, składniki opatrzone certyfikatem KSeF.

Nie zwraca danych osobowych powiązanych z certyfikatem.

#### 5.4.3. Co to jest wyróżnik faktury?

„Skrót faktury" — unikalny ciąg znaków obliczony na podstawie skrótu kryptograficznego SHA-256 pliku
XML. Składnik kodów QR.

#### 5.4.4. Brak możliwości zamieszczenia kodu na wizualizacji faktury

Gdy format uniemożliwia naniesienie kodu bezpośrednio na fakturę (np. EDI) → można przesłać odrębny
link/kod QR wraz z odpowiednimi oznaczeniami.

### 5.5. Dostęp dwuetapowy do faktury z wykorzystaniem kodu QR

**Krok 1:** Zeskanowanie kodu QR → wyświetlenie podstawowych danych (nr KSeF, NIP sprzedawcy, data
wystawienia, skrót dokumentu, data nadania KSeF, typ schemy, tryb wystawienia, informacja o
zgodności) lub informacja o braku faktury w KSeF.

**Krok 2:** Podanie danych dostępowych:

- Nr faktury (P_2)
- Identyfikator podatkowy nabywcy lub informacja o braku
- Kwota należności ogółem (P_15)

→ Pobranie faktury (XML lub PDF) bez uwierzytelnienia.

Kilka błędnych prób → **czasowa blokada** pobrania (na poziomie SHA-256).

Dla faktury korygującej: P_2 korygującej, identyfikator nabywcy, P_15 korygującej.

### 5.6. Weryfikacja tożsamości wystawcy faktury w trybie OFFLINE z użyciem kodu QR

KOD II (z napisem „CERTYFIKAT") → weryfikacja certyfikatu KSeF wystawcy. System zwraca: informację
czy certyfikat istnieje i jest aktywny, czy właściciel ma uprawnienia. Nie zwraca danych osobowych.

### 5.7. Anonimowy dostęp do faktury w KSeF (bez kodu QR)

Usługa w Aplikacji Podatnika KSeF 2.0 (bez uwierzytelnienia). Wymaga podania (§ 8 rozporządzenia):

Dla faktury zwykłej:

- Numer KSeF
- Numer faktury (P_2)
- NIP/identyfikator nabywcy lub informacja o braku
- Imię i nazwisko / nazwa nabywcy lub informacja o braku
- Kwota należności ogółem (P_15)

Dla faktury korygującej:

- Numer KSeF korygującej
- Numer korygującej (P_2)
- NIP/identyfikator nabywcy
- Imię/nazwisko/nazwa nabywcy
- P_15 z korygującej

Dostęp dwuetapowy (z QR) jest udoskonalonym narzędziem — nie wymaga ręcznego wpisywania numeru KSeF
ani podawania imienia/nazwiska nabywcy.

---

## 6. Praktyczne kwestie związane z otrzymywaniem faktur w KSeF

### 6.1. Brak zgody nabywcy na otrzymywanie faktur w KSeF

W okresie fakultatywnym (do 31.01.2026) — wymagana akceptacja odbiorcy (art. 106na ust. 2).

W okresie obligatoryjnym (od 1.02.2026) — przepis uchylony. Otrzymywanie w KSeF jest obowiązkowe
(art. 106gb ust. 1). Wyjątek: podmioty z art. 106gb ust. 4 → faktura w sposób uzgodniony.

> **WAŻNE:** W okresie obligatoryjnym nabywca nie może wyrazić braku akceptacji na otrzymanie
> faktury w KSeF.

### 6.2. Otrzymywanie faktur przez nabywcę, który odbiera faktury od 1.02.2026, ale wystawia dopiero od 1.04.2026 / 1.01.2027

> **WAŻNE:** Odroczenie terminów dotyczy **wyłącznie wystawiania** faktur, nie ich **otrzymywania**.
> Otrzymywanie w KSeF jest obowiązkowe od 1.02.2026 r.

W okresie przejściowym (brak zintegrowanego narzędzia) → bezpłatne narzędzia MF (Aplikacja Podatnika
KSeF, Aplikacja Mobilna KSeF, e-mikrofirma).

Sprzedawcy objęci obowiązkiem KSeF od 1.02.2026 nie wydają faktur poza systemem nabywcom krajowym z
NIP (ale mogą wydawać potwierdzenia transakcji).

Nabywcy mogą uzyskać dostęp bez uwierzytelnienia → dwuetapowy dostęp (kod QR → dane dostępowe →
pobranie).

### 6.3. Brak możliwości odrzucenia faktury przez podmiot wskazany jako nabywca

KSeF nie posiada opcji zatwierdzania/odrzucania faktur. Spory rozstrzygane poza systemem.

Przy błędnym nabywcy → korekta „do zera" + nowa faktura. Nabywca może skorzystać z opcji **ukrycia
faktury** lub **zgłoszenia faktury scamowej** (funkcjonalności wdrażane kilka miesięcy po
uruchomieniu KSeF 2.0 w wersji produkcyjnej; opisane w cz. III Podręcznika KSeF 2.0).

### 6.4. Brak powiadomień systemowych o otrzymaniu faktury w KSeF

KSeF nie wysyła automatycznie powiadomień o nowych fakturach. Program podatnika musi „odpytywać"
KSeF. Nie wyklucza się takiej funkcjonalności na poziomie poszczególnych programów.

### 6.5. Brak możliwości sprawdzenia, że nabywca pobrał fakturę z KSeF

Faktury dostępne w czasie rzeczywistym (od nadania numeru KSeF). Nabywca może pobierać wielokrotnie.
Sprzedawca nie uzyska informacji, czy i ile razy faktura została pobrana.

---

## 7. Przechowywanie faktur w KSeF

W KSeF przechowywane są:

- Faktury ustrukturyzowane
- Faktury wystawione w trybach OFFLINE (offline24, awaria, niedostępność KSeF) po przesłaniu do KSeF
- Faktury VAT RR i VAT RR KOREKTA (tryb ONLINE i offline24 po dosłaniu)

**Okres przechowywania: 10 lat** od końca roku wystawienia. W tym okresie nie stosuje się art. 112 i
112a ustawy (brak obowiązku przechowywania we własnym zakresie).

10-letni okres zapewnia, że większość zobowiązań podatkowych się przedawni. Związany z okresem
korekt podatku naliczonego (nieruchomości).

Administracja skarbowa ma dostęp do faktur w KSeF → brak konieczności dostarczania faktur do US.

Jeśli 10-letni okres upłynie przed przedawnieniem zobowiązania podatkowego → podatnik przechowuje
faktury poza KSeF do przedawnienia (art. 112, 112a). Należy pobrać faktury z wyprzedzeniem.

> **Przykład:** Wysyłka 5.02.2026 → przechowywanie w KSeF do 31.12.2036. Podatnik pobiera fakturę
> najpóźniej do 31.12.2036 → przechowuje poza KSeF do przedawnienia.

---

## Rejestr zmian

### Listopad 2025 r.

- 3.1 — aktualizacja informacji o Aplikacji Podatnika KSeF
- 3.2.2 — uszczegółowienie zasad środowiska demo
- 3.3.1, 3.3.2 — aktualizacja limitów sesji
- 4.1 — aktualizacja elementów numeru KSeF
- 4.2 — aktualizacja wizualizacji UPO
- 5.4 — zmiana normy ISO/IEC 18004:2015 → 18004:2024

### Luty 2026 r. cz. I

- 1.2 — nowy rozdział „Kto jest obowiązany wystawiać faktury w KSeF?"
- 1.3 — nowy rozdział o rachunkach vs fakturach
- 1.6.5 — aktualizacja dot. faktur poza KSeF
- 1.6.6 — aktualizacja dot. potwierdzenia transakcji
- 1.7 — nowy rozdział o odliczeniu VAT z faktur poza KSeF
- 1.8 — nowy rozdział o podwójnie wystawionej fakturze
- 2.11 — poprawienie odesłania do przykładów WDT/eksport
- 2.15 — uzupełnienie dot. potwierdzenia transakcji
- 3.2.1–3.2.3 — aktualizacja informacji o środowiskach
- 4.1.6 — uzupełnienie dot. JPK_VAT
- 4.2 — aktualizacja UPO
- 5.4 — dostosowanie dot. kodów QR do rozporządzenia
- 5.5 — aktualizacja zakresu danych po zeskanowaniu QR
- 5.7 — aktualizacja anonimowego dostępu
- Cały dokument — korekty stylistyczne, redakcyjne, interpunkcyjne

### Luty 2026 r. cz. II

- 1.5 — aktualizacja informacji o uwierzytelnieniu (Węzeł krajowy)
