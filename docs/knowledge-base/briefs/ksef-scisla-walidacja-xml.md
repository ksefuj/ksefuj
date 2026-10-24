# Research Brief: Ścisła walidacja XML w KSeF od 19.10.2026

**Requested by:** human (content backlog item `ksef-scisla-walidacja-xml-19-10`) **Date:**
2026-10-07 (updated 2026-10-24) **Freshness:** 2026-10-24 (stan repo CIRFMF/ksef-api: HEAD
`ce3670e`, 2026-10-14; issues i strony MF nieodczytane na żywo, zob. „Update 2026-10-24") **For
content:** „KSeF od 19.10.2026 odrzuci XML z instrukcjami" (PL), „Strict XML validation in KSeF from
19 Oct 2026" (EN); aktualizacja opublikowanego posta
`apps/web/content/pl/blog/ksef-scisla-walidacja-xml.mdx`

## Update 2026-10-24

Cel aktualizacji: backlog „rejection was announced for PROD from 2026-10-19; once CIRFMF confirms it
is live, switch the post from future to present tense". Stan na 2026-10-24:

- **Zapowiedziana data minęła.** Jedynym źródłem daty 19.10.2026 pozostaje komentarz konta kw-cirf
  (COLLABORATOR) z 2026-06-24 w issue #718 (Tier 3; Key Fact 3). Dziś jest 5 dni po tej dacie.
- **Brak potwierdzenia w dokumentacji (Tier 2).** Sprawdzone w płytkim klonie CIRFMF/ksef-api (HEAD
  `ce3670e`, commit 2026-10-14 „update version"):
  - `api-changelog.md`: najnowsza wersja 2.9.0 (TEST 13.10.2026, DEMO 13.10.2026, PROD 15.10.2026);
    jej wpis dotyczy uprawnień (`OwnerPermissionScope`) i dokumentacji kodu błędu `21001`, nie
    walidacji XML. Wpis 2.4.0 nadal brzmi: „Zaostrzenie walidacji XML zacznie obowiązywać od
    **16.07.2026**." Żaden wpis (2.8.0, 2.8.1, 2.9.0) nie ogłasza włączenia odrzucania na PROD ani
    nowej daty.
  - `faktury/weryfikacja-faktury.md`: ostatnia zmiana 2026-04-21 (`f1f68ba`, „docs: minor wording
    and formatting updates"); bez daty wejścia w życie na PROD.
  - Ciąg „19.10.2026" / „2026-10-19" nie występuje nigdzie w repozytorium (jedyne trafienie „19:10"
    to znacznik czasu generowania w `faktury/schemy/PEF/bazowe/UBL-xmldsig-core-schema-2.1.xsd`, bez
    związku).
- **Czego nie udało się odczytać na żywo (2026-10-24, z tego środowiska: HTTP 403 / proxy CONNECT
  403):** https://github.com/CIRFMF/ksef-api/issues/718,
  https://github.com/CIRFMF/ksef-api/issues/807 (oraz api.github.com), komunikaty techniczne na
  https://ksef.podatki.gov.pl/, gov.pl, Sejm, RCL. Nie wiemy więc, czy w issues lub komunikatach MF
  pojawiło się potwierdzenie, odwołanie albo nowa data.
- **Wniosek dla copywritera:** żadne dostępne nam źródło oficjalne nie potwierdza ani nie zaprzecza,
  że PROD odrzuca takie pliki od 19.10.2026. Warunek z backlogu („once CIRFMF confirms it is live")
  **nie jest spełniony**. Nie przechodzić na czas teraźniejszy w zdaniu „PROD odrzuca"; można
  przejść na czas przeszły dla zapowiedzi („miał zacząć odrzucać od 19.10.2026") i podać stan
  dokumentacji z datą sprawdzenia.
- TEST i DEMO: odrzucanie od wdrożenia 2.4.0 (TEST 10.04.2026, DEMO 13.04.2026) wg changelogu i
  issue #807 (Key Facts 2 i 4). Nie testowaliśmy TEST na żywo 2026-10-24.

**Target query:** „KSeF odrzucona faktura XML 19 października", „KSeF X-System-Warning", „KSeF
odrzuca xml-stylesheet"

**Answer in two sentences (stan 2026-10-24):** Według zespołu API KSeF (komentarz w issue #718 z
24.06.2026) produkcyjny KSeF miał od 19.10.2026 odrzucać faktury, których XML zawiera instrukcje
przetwarzania (np. `<?xml-stylesheet ...?>`) albo niezalecane znaki Unicode ze specyfikacji W3C, a
dokumentacja CIRFMF/ksef-api (changelog do wersji 2.9.0, `faktury/weryfikacja-faktury.md`) do
24.10.2026 tego nie potwierdziła ani nie podała nowej daty. Traktuj takie pliki jako odrzucane:
producent oprogramowania powinien usunąć instrukcje z XML, wyczyścić pola tekstowe ze znaków z listy
i zapisywać plik w UTF-8 bez BOM, a sprawdzić to można na środowisku TEST, które takie pliki odrzuca
od 10.04.2026.

**What changes the answer:**

- **Potwierdzenie lub zmiana daty przez CIRF/MF** (wpis w `api-changelog.md`, zmiana
  `faktury/weryfikacja-faktury.md`, komentarz w issue #718/#807 albo komunikat techniczny na
  ksef.podatki.gov.pl): dopiero wtedy przejść na „PROD odrzuca" (czas teraźniejszy) albo podać nową
  datę. Stan 2026-10-24: brak takiego wpisu w klonie repo; issues i komunikaty nieodczytane.
- Data 19.10.2026 dotyczy zaostrzenia z wersji 2.4.0 (instrukcje przetwarzania, niezalecane znaki).
  Regułę o kodowaniu w prologu changelog przypisuje wersji 2.3.0, bez osobnej daty. Dla BOM nie
  znaleziono osobnej daty. Nie rozstrzygamy, od kiedy dokładnie PROD egzekwuje te dwa punkty.
- Kod ostrzeżenia na PROD jest wolnym tekstem; MF nie publikuje listy kodów (zob. Unsettled).

## Key Facts (ready to use)

1. **Wymagania weryfikacji XML (lista „łącznie")**: poprawny XML 1.0; UTF-8 bez BOM (0xEF 0xBB
   0xBF); zgodność z zadeklarowanym schematem; prolog dozwolony, ale bez kodowania innego niż UTF-8;
   brak instrukcji przetwarzania XML; brak niezalecanych znaków Unicode z zakresów `[#x7F-#x84]`,
   `[#x86-#x9F]`, `[#xFDD0-#xFDEF]`, `[#x1FFFE-#x1FFFF]`, `[#x2FFFE-#x2FFFF]` … `[#xFFFFE-#xFFFFF]`,
   `[#x10FFFE-#x10FFFF]` (czyli każda płaszczyzna 1-16: `#xNFFFE-#xNFFFF`). U+0085 jest poza
   zakresami. — CIRFMF/ksef-api, `faktury/weryfikacja-faktury.md` (09.04.2026), sekcja „Weryfikacja
   XML". Tier 2 (dokumentacja techniczna CIRF MF). Verbatim: „Faktura musi spełniać łącznie
   następujące wymagania:" … „Niespełnienie któregokolwiek z powyższych wymagań spowoduje odrzucenie
   faktury." Confidence: HIGH Persona: Marek (tak), Pani Krystyna (tak) URL:
   https://github.com/CIRFMF/ksef-api/blob/main/faktury/weryfikacja-faktury.md
2. **Wersja 2.4.0 zaostrzyła weryfikację**: „dokument nie może zawierać niezalecanych znaków Unicode
   wskazanych w specyfikacji XML W3C", „dokument nie może zawierać instrukcji przetwarzania XML
   (processing instructions)". Wdrożenie: TEST 10.04.2026, DEMO 13.04.2026, PROD 16.04.2026, z uwagą
   „Zaostrzenie walidacji XML zacznie obowiązywać od 16.07.2026." — `api-changelog.md`, „Wersja
   2.4.0"; release 2.4.0 (2026-04-10). Confidence: HIGH URLs:
   https://github.com/CIRFMF/ksef-api/releases/tag/2.4.0,
   https://github.com/CIRFMF/ksef-api/blob/main/api-changelog.md
3. **Termin przesunięty na 19.10.2026**: „Termin włączenia zaostrzonej walidacji XML został
   przesunięty na okres po sezonie urlopowym, tj. na 19.10.2026." — komentarz opiekuna repo (konto
   kw-cirf, rola COLLABORATOR) z 2026-06-24 w issue #718; wcześniej (2026-04-16) ten sam użytkownik:
   „Zaostrzenie walidacji XML na środowisku PRD zacznie obowiązywać od 16.07.2026." Tier 3
   (odpowiedź konta MF/CIRF w issue). W changelogu i w `weryfikacja-faktury.md` data 19.10 nie
   występuje (changelog nadal pokazuje 16.07.2026). Confidence: MEDIUM (jedyne źródło to komentarz w
   issue; changelog niezaktualizowany) URL: https://github.com/CIRFMF/ksef-api/issues/718
4. **TEST i DEMO odrzucają od razu**: „Zmiany te zostały wdrożone na środowisko TEST i DEMO od razu,
   natomiast na środowisku PRD zaczną obowiązywać od 16.07.2026. Do tego czasu środowisko
   produkcyjne nie będzie odrzucać takich dokumentów, ale może zwracać ostrzeżenie techniczne w
   odpowiedzi HTTP" — treść issue #807 napisana przez konto kw-cirf (data 16.07 sprzed
   przesunięcia). Confidence: MEDIUM (Tier 3) URL: https://github.com/CIRFMF/ksef-api/issues/807
5. **`X-System-Warning`**: opcjonalny nagłówek odpowiedzi, „Ostrzeżenie techniczne dla systemu
   integratora. Ostrzeżenie nie wpływa na bieżący wynik operacji." Format
   `[code]: message | [code]: message`, regex pojedynczego ostrzeżenia
   `\[(?<code>[^\]]+)\]: (?<message>[^|]+)`, wartość normalizowana z użyciem ASCII folding (stąd
   brak polskich znaków). Zadeklarowany m.in. dla POST `/sessions/online/{ref}/invoices` (202), GET
   `/sessions/{ref}/invoices/{invoiceRef}` (200) i GET `/sessions/{ref}/invoices/failed` (200)
   (łącznie 83 odpowiedzi w `open-api.json` z 2026-09-22). Dodany w 2.6.0 (TEST 19.05.2026, DEMO
   21.05.2026, PROD 26.05.2026 wg harmonogramu). Tier 2 (OpenAPI + changelog). Confidence: HIGH
   URLs: https://github.com/CIRFMF/ksef-api/blob/main/open-api.json,
   https://github.com/CIRFMF/ksef-api/blob/main/api-changelog.md,
   https://github.com/CIRFMF/ksef-api/releases/tag/2.6.0
6. **`X-Test-System-Warning` (TEST)**: „Na środowisku TEST ostrzeżenie można wymusić nagłówkiem
   `X-Test-System-Warning`" (changelog 2.6.0); opis w OpenAPI: „Jego treść zostanie zwrócona w
   odpowiedzi jako `X-System-Warning`." Służy do testu obsługi nagłówka po stronie klienta, nie
   sprawdza pliku. Confidence: HIGH
7. **Przykład komunikatu (MF, issue #807)**: „Faktura o numerze KSeF
   2026041400-20260514-5A9845400000-55 zawiera niedozwolone znaki Unicode, ktore po 16.07.2026 beda
   odrzucane." (data w przykładzie sprzed przesunięcia). Confidence: MEDIUM
8. **Brak predefiniowanych kodów**: „Bez schemy, bez predefiniowania kodów (!), ale z opisem (regex)
   w dokumentacji" (kw-cirf, issue #807, 2026-05-18); kod widoczny w przykładzie z dyskusji:
   `xml-001`. Backlog wspominał „xml-002": nie znaleziono w żadnym źródle. Confidence: HIGH (że kody
   nie są udokumentowane)
9. **Przypadek z praktyki**:
   `<?xml-stylesheet version="1.0" type='text/xsl' href='WspolneSzablonyWizualizacji_v12-0E.xsl'?>`
   dodawany przez integratora do faktur; przeglądarka nie wyświetla takiego XML (błąd ładowania
   arkusza), choć plik przechodzi walidację XSD (xmllint). — issue #718, zgłoszenie użytkownika (nie
   MF). Confidence: MEDIUM (Tier 3, komentarz społeczności)
10. **`SystemInfo`**: kw-cirf (2026-06-24): „na przyszłość warto uzupełnić pole `SystemInfo` w XML
    faktury"; jeśli problem nadal będzie widoczny przed terminem, „istnieje duża szansa, że inżynier
    mf odezwie się bezpośrednio do producentów oprogramowania". XSD FA(3): `Naglowek/SystemInfo`,
    opcjonalny, typ `TZnakowy`; broszura: „Name of the ICT system used by the taxpayer" (local
    copy). Confidence: HIGH (pole) / MEDIUM (komentarz)
11. **Skutek odrzucenia (reguła ogólna Podręcznika)**: „W przypadku negatywnej weryfikacji system
    nie przydziela numeru KSeF faktury. Oznacza to, że faktura nie została wystawiona. Należy więc
    zweryfikować poprawność wprowadzonych danych i ponowić wysyłkę." — Podręcznik KSeF 2.0 cz. II
    (sierpień 2026, stan prawny 1.02.2026), pkt 1.6.1, s. 18. Podręcznik mówi tam o niezgodności ze
    strukturą XSD; nie wymienia reguł XML z tej notatki. Przenosimy regułę ogólną. Tier 2.
    Confidence: MEDIUM (reguła ogólna, nie dotyczy wprost tych reguł) URL:
    https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
12. **Wysyłka wsadowa**: paczka nie jest odrzucana w całości; „KSeF w takiej sytuacji odrzuca tylko
    błędne semantycznie pliki XML i informuje o powodzie odrzucenia poszczególnych plików […], po
    odpytaniu o odrzucone dokumenty XML w danej sesji" — Podręcznik cz. II, pkt 3.3, s. 69
    („Odrzucenie paczki przez KSeF"). Odrzucone faktury: GET `/sessions/{ref}/invoices/failed`
    („Zwraca łączną liczbę odrzuconych faktur w sesji oraz szczegółowe informacje (status i
    szczegóły błędów)") — `faktury/sesje/sesja-sprawdzenie-stanu-i-pobranie-upo.md`. Confidence:
    HIGH
13. **Niezalecane znaki = zakresy z W3C XML 1.0, sekcja „Characters"**:
    https://www.w3.org/TR/xml/#charsets (MF odsyła do tej sekcji).

## Unsettled Questions

- Który dokładnie status/kod błędu zwraca KSeF dla faktury odrzuconej z tych powodów: nie znaleziono
  w dokumentacji. Nie podajemy.
- Które endpointy faktycznie niosą ostrzeżenie dotyczące PI/znaków na PROD: nagłówek jest
  zadeklarowany dla wielu odpowiedzi; przykład MF zawiera numer KSeF, więc dotyczy faktury już
  przyjętej, ale to wniosek, nie cytat. Nie rozstrzygamy.
- Czy odwołanie do znaku przez odwołanie liczbowe (`&#x84;`) liczy się jak sam znak: dokumentacja
  nie mówi.
- Czy 19.10.2026 obejmuje także BOM i kodowanie w prologu: patrz „What changes the answer".
- Czy data 19.10.2026 zostanie jeszcze zmieniona: changelog nadal podaje 16.07.2026; jedyne źródło
  daty to komentarz w issue #718. Stan 2026-10-24: data minęła, changelog (do 2.9.0) i
  `weryfikacja-faktury.md` nadal bez potwierdzenia; issue #718 nieodczytane ponownie (403).
- Nie znaleziono wzmianki o tych regułach w: Podręcznik KSeF 2.0 cz. I-IV (wydania 06.08.2026),
  broszura FA(3), FAQ KSeF 2.0, komunikaty techniczne na ksef.podatki.gov.pl (strona 1, stan
  2026-10-07). Podręcznik cz. II (pkt 1.6.1) wymienia przesłanki odrzucenia bez tych reguł.

## Suggested Sources Section

- MF / CIRF, „Weryfikacja faktury" (09.04.2026), sekcja „Weryfikacja XML":
  https://github.com/CIRFMF/ksef-api/blob/main/faktury/weryfikacja-faktury.md
- CIRFMF/ksef-api, changelog API (wersje 2.3.0, 2.4.0, 2.6.0):
  https://github.com/CIRFMF/ksef-api/blob/main/api-changelog.md
- CIRFMF/ksef-api, release 2.4.0: https://github.com/CIRFMF/ksef-api/releases/tag/2.4.0
- CIRFMF/ksef-api, issue #718 (komentarz z 24.06.2026 o terminie 19.10.2026):
  https://github.com/CIRFMF/ksef-api/issues/718
- CIRFMF/ksef-api, issue #807 (kanał ostrzeżeń `X-System-Warning`):
  https://github.com/CIRFMF/ksef-api/issues/807
- CIRFMF/ksef-api, specyfikacja OpenAPI (schemat `SystemWarning`):
  https://github.com/CIRFMF/ksef-api/blob/main/open-api.json
- W3C, Extensible Markup Language (XML) 1.0, „Characters": https://www.w3.org/TR/xml/#charsets
- Podręcznik KSeF 2.0 cz. II (wydanie 06.08.2026), pkt 1.6.1:
  https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf

## Warning: Common Misconceptions

- „Backlog: KSeF zwraca ostrzeżenia xml-00x": kody nie są predefiniowane ani udokumentowane; znamy
  tylko `xml-001` z przykładu dyskusji. Nie opisujemy znaczeń kodów.
- „Wystarczy walidacja XSD": plik z `<?xml-stylesheet?>` przechodzi walidację XSD (issue #718), a
  mimo to podlega odrzuceniu po 19.10.
- „Dotyczy tylko XML pisanego ręcznie": dotyczy też plików generowanych przez programy, które same
  dodają instrukcję wizualizacji lub przenoszą znaki z pól tekstowych.
- Ten materiał to dokumentacja techniczna CIRF MF (Tier 2) i odpowiedzi kont MF w issues (Tier 3),
  nie ustawa i nie rozporządzenie. Obowiązek wystawiania faktur w KSeF to osobna kwestia: nie
  omawiamy go w poście.
