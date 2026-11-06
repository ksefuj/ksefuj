# Research Brief: Kody błędów KSeF (450, 440, 430, 21405…) — co oznaczają

**Requested by:** human (content backlog, topic `errors`) **Date:** 2026-11-06 **For content:** blog
post „Błąd 450 w KSeF i inne kody błędów: co znaczą" (PL) **Personas:** M (developer, integrator
API), K (księgowa, której program pokazuje sam kod)

**Freshness / what was read (2026-11-06).** Fetched live via raw.githubusercontent.com (github.com
web pages return 403 from this environment; cited below in the KB form
`github.com/CIRFMF/ksef-api/blob/main/<path>`): `open-api.json` (byte-identical to the copy
downloaded earlier today), `api-changelog.md` (latest entry **2.9.0**: TEST 13.10.2026, DEMO
13.10.2026, PROD 15.10.2026; no newer version), `faktury/weryfikacja-faktury.md` (09.04.2026),
`faktury/sesje/sesja-sprawdzenie-stanu-i-pobranie-upo.md` (20.04.2026), `limity/limity.md`
(26.08.2026), `limity/limity-api.md` (14.09.2026), `offline/korekta-techniczna.md` (20.08.2025),
`tryby-offline.md`, `sesja-interaktywna.md`, `sesja-wsadowa.md`, `uwierzytelnianie.md`,
`auth/sesje.md`, `README.md` (05.05.2026). NOT reachable: github.com issues (#718, #807),
api.github.com (commit dates), ksef.podatki.gov.pl (Podręcznik PDFs, FAQ), api-test.ksef.mf.gov.pl.
Podręcznik quotes below are taken from the KB, not re-read.

**Target query:** „błąd 450 KSeF", „kody błędów KSeF" (also „KSeF status 440", „KSeF 21405")

**Answer in two sentences:** Kod KSeF nie ma jednego znaczenia, bo specyfikacja API
(`open-api.json`) ma osobną tabelę statusów dla każdej operacji: przy fakturze 450 to „Błąd
weryfikacji semantyki dokumentu faktury", przy logowaniu (uwierzytelnianiu) 450 to „Uwierzytelnianie
zakończone niepowodzeniem z powodu błędnego tokenu", a 440 to przy fakturze „Duplikat faktury", przy
sesji „Sesja anulowana". Faktura odrzucona (status 4xx) nie dostaje numeru KSeF i nie jest
wystawiona; konkretną przyczynę podają pola `description`/`details` statusu, więc poprawia się plik
i wysyła ponownie (Podręcznik KSeF 2.0 cz. II, pkt 1.6.1).

**What changes the answer:**

- **Która operacja zwróciła kod** (faktura w sesji / sesja / uwierzytelnianie / uprawnienia /
  eksport / certyfikat): ten sam numer 4xx znaczy co innego w każdej tabeli (Fakty 1-5).
- **Typ kodu:** 3-cyfrowy kod to `status.code` operacji asynchronicznej (odpowiedź HTTP 200 na
  zapytanie o status); 4-5-cyfrowy (`21405`, `9105`…) to `exceptionCode` / `errors[].code` w
  odpowiedzi HTTP 400 na samo żądanie (Fakty 6-8); 401/403/429/410 to kody HTTP (Fakty 9-11).
- **Faktura offline** odrzucona z przyczyn technicznych: korekta techniczna zamiast zwykłej ponownej
  wysyłki (Fakt 16).
- **Środowisko:** suma kontrolna NIP sprawdzana „tylko [na] środowisku produkcyjnym"; limity TE 10×
  wyższe niż PROD według `limity-api.md`, ale changelog 2.5.0 mówi o zrównaniu (Fakty 13, 11).

## Key Facts (ready to use)

### A. Tabele statusów (3-cyfrowe) w `open-api.json`

Source for facts 1-5: https://github.com/CIRFMF/ksef-api/blob/main/open-api.json (fetched via
raw.githubusercontent.com, 2026-11-06). Tier 2 (MF/CIRF technical documentation). Columns quoted
verbatim (Polish); „-" = empty in the source.

1. **Status faktury w sesji** (`SessionInvoiceStatusResponse.status`, typ `InvoiceStatusInfo`; GET
   `/sessions/{referenceNumber}/invoices/{invoiceReferenceNumber}`, także lista faktur sesji i
   `/invoices/failed`). Verbatim „Status faktury.":

   | Code | Description                                      | Details / Extensions                                                              |
   | ---- | ------------------------------------------------ | --------------------------------------------------------------------------------- |
   | 100  | Faktura przyjęta do dalszego przetwarzania       | -                                                                                 |
   | 150  | Trwa przetwarzanie                               | -                                                                                 |
   | 200  | Sukces                                           | -                                                                                 |
   | 405  | Przetwarzanie anulowane z powodu błędu sesji     | -                                                                                 |
   | 410  | Nieprawidłowy zakres uprawnień                   | -                                                                                 |
   | 415  | Brak możliwości wysyłania faktury z załącznikiem | -                                                                                 |
   | 430  | Błąd weryfikacji pliku faktury                   | -                                                                                 |
   | 435  | Błąd odszyfrowania pliku                         | -                                                                                 |
   | 440  | Duplikat faktury                                 | Extensions: 'originalSessionReferenceNumber', 'originalKsefNumber'                |
   | 450  | Błąd weryfikacji semantyki dokumentu faktury     | -                                                                                 |
   | 500  | Nieznany błąd ({statusCode})                     | -                                                                                 |
   | 550  | Operacja została anulowana przez system          | Przetwarzanie zostało przerwane z przyczyn wewnętrznych systemu. Spróbuj ponownie |

   Confidence: HIGH. M: yes. K: yes (450/440/430 rows).

2. **Status uwierzytelniania** (`AuthenticationOperationStatusResponse.status` i
   `AuthenticationListItem.status`; GET `/auth/{referenceNumber}`, GET `/auth/sessions`). Verbatim:

   | Code | Description                                                           | Details (warianty)                                                                                                                                                                                                                                             |
   | ---- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | 100  | Uwierzytelnianie w toku                                               | -                                                                                                                                                                                                                                                              |
   | 200  | Uwierzytelnianie zakończone sukcesem                                  | -                                                                                                                                                                                                                                                              |
   | 415  | Uwierzytelnianie zakończone niepowodzeniem                            | Brak przypisanych uprawnień                                                                                                                                                                                                                                    |
   | 425  | Uwierzytelnienie unieważnione                                         | Uwierzytelnienie i powiązane refresh tokeny zostały unieważnione przez użytkownika                                                                                                                                                                             |
   | 450  | Uwierzytelnianie zakończone niepowodzeniem z powodu błędnego tokenu   | Nieprawidłowe wyzwanie autoryzacyjne / Nieprawidłowy token / Nieprawidłowy czas tokena / Token unieważniony / Token nieaktywny / Nieprawidłowe szyfrowanie tokena / Nieprawidłowe kodowanie tokena / Token nie może być użyty w kontekście {contextIdentifier} |
   | 460  | Uwierzytelnianie zakończone niepowodzeniem z powodu błędu certyfikatu | Nieważny certyfikat / Błąd weryfikacji łańcucha certyfikatów / Niezaufany łańcuch certyfikatów / Certyfikat odwołany / Certyfikat zawieszony / Niepoprawny certyfikat                                                                                          |
   | 470  | Uwierzytelnianie zakończone niepowodzeniem                            | Próba wykorzystania metod autoryzacyjnych osoby zmarłej                                                                                                                                                                                                        |
   | 480  | Uwierzytelnienie zablokowane                                          | Podejrzenie incydentu bezpieczeństwa. Skontaktuj się z Ministerstwem Finansów przez formularz zgłoszeniowy.                                                                                                                                                    |
   | 500  | Nieznany błąd                                                         | -                                                                                                                                                                                                                                                              |
   | 550  | Operacja została anulowana przez system                               | Przetwarzanie zostało przerwane z przyczyn wewnętrznych systemu. Spróbuj ponownie                                                                                                                                                                              |

   Changelog 2.6.1 (PROD 16.06.2026): „Ujednolicono komunikaty w polu details dla statusu `450`
   („Uwierzytelnianie zakończone niepowodzeniem z powodu błędnego tokenu") - treści są teraz
   zwracane w języku polskim, zgodnie z dokumentacją." Confidence: HIGH. M: yes. K: marginal (450
   przy logowaniu tokenem KSeF).

3. **Status sesji** (`SessionStatusResponse.status`; GET `/sessions/{referenceNumber}`). Verbatim:

   Sesja wsadowa: 100 „Sesja wsadowa rozpoczęta"; 150 „Trwa przetwarzanie"; 200 „Sesja wsadowa
   przetworzona pomyślnie"; 405 „Błąd weryfikacji poprawności dostarczonych elementów paczki"; 415
   „Błąd odszyfrowania dostarczonego klucza"; 420 „Przekroczony limit faktur w sesji"; 430 „Błąd
   dekompresji pierwotnego archiwum"; 435 „Błąd odszyfrowania zaszyfrowanych części archiwum"; 440
   „Sesja anulowana" (details: „Przekroczono czas wysyłki" / „Nie przesłano faktur"); 445 „Błąd
   weryfikacji, brak poprawnych faktur"; 500 „Nieznany błąd ({statusCode})".

   Sesja interaktywna: 100 „Sesja interaktywna otwarta"; 170 „Sesja interaktywna zamknięta"; 200
   „Sesja interaktywna przetworzona pomyślnie"; 415 „Błąd odszyfrowania dostarczonego klucza"; 440
   „Sesja anulowana" (details: „Nie przesłano faktur"); 445 „Błąd weryfikacji, brak poprawnych
   faktur"; ostatni wiersz w źródle: „| \* | description missing | - |".

   Confidence: HIGH. M: yes. K: no.

4. **Status operacji na uprawnieniach** (`PermissionsOperationStatusResponse.status`; GET
   `/permissions/operations/{referenceNumber}`): 100 „Operacja przyjęta do realizacji"; 200
   „Operacja zakończona sukcesem"; 400 „Operacja zakończona niepowodzeniem"; 410 „Podane
   identyfikatory są niezgodne lub pozostają w niewłaściwej relacji"; 420 „Użyte poświadczenia nie
   mają uprawnień do wykonania tej operacji"; 430 „Kontekst identyfikatora nie odpowiada wymaganej
   roli lub uprawnieniom"; 440 „Operacja niedozwolona dla wskazanych powiązań identyfikatorów"; 450
   „Operacja niedozwolona dla wskazanego identyfikatora lub jego typu"; 500 „Nieznany błąd"; 550
   „Operacja została anulowana przez system" (details: „…Spróbuj ponownie później."). Confidence:
   HIGH. M: yes. K: marginal (nadawanie uprawnień biuru).

5. **Pozostałe tabele statusów** (for completeness):
   - Eksport faktur (`InvoiceExportStatusResponse`): 100 „Eksport faktur w toku"; 200 „Eksport
     faktur zakończony sukcesem"; 210 „Eksport faktur wygasł i nie jest już dostępny do pobrania";
     415 „Błąd odszyfrowania dostarczonego klucza"; 420 „Zakres filtrowania wykracza poza dostępny
     zakres danych"; 500 „Nieznany błąd ({statusCode})"; 550 „Operacja została anulowana przez
     system".
   - Wniosek o certyfikat KSeF (`CertificateEnrollmentStatusResponse`): 100 „Wniosek przyjęty do
     realizacji"; 200 „Wniosek obsłużony (certyfikat wygenerowany)"; 400 „Wniosek odrzucony"
     (details: „Klucz publiczny został już certyfikowany przez inny podmiot." / „Osiągnięto
     dopuszczalny limit posiadanych certyfikatów."); 500 „Nieznany błąd"; 550 „Operacja została
     anulowana przez system".
   - **UPO:** no status table for UPO in `open-api.json`. UPO per invoice is available only for a
     „poprawnie przyjętej faktury" (`sesja-sprawdzenie-stanu-i-pobranie-upo.md`, pkt 5); errors on
     UPO download are exception `21178` „Nie znaleziono UPO dla podanych kryteriów." (Fakt 7).
     Confidence: HIGH.

**Key finding confirmed:** 450 = „Błąd weryfikacji semantyki dokumentu faktury" (faktura) vs
„Uwierzytelnianie zakończone niepowodzeniem z powodu błędnego tokenu" (uwierzytelnianie) vs
„Operacja niedozwolona dla wskazanego identyfikatora lub jego typu" (uprawnienia). 440 = „Duplikat
faktury" (faktura) vs „Sesja anulowana" (sesja) vs „Operacja niedozwolona dla wskazanych powiązań
identyfikatorów" (uprawnienia). 430 = „Błąd weryfikacji pliku faktury" (faktura) vs „Błąd
dekompresji pierwotnego archiwum" (sesja wsadowa) vs „Kontekst identyfikatora nie odpowiada
wymaganej roli lub uprawnieniom" (uprawnienia). The KB already noted the 440 split
(`usuniecie-faktury-ksef.md` fakt 18 note).

### B. Kody wyjątków (4-5-cyfrowe) w odpowiedzi HTTP 400

6. **Where they come from / format.** No standalone official list exists: each endpoint's `400`
   response in `open-api.json` carries its own table „| ExceptionCode | ExceptionDescription |
   Details |". Two response formats: `ExceptionResponse` (`exception.exceptionDetailList[]` with
   `exceptionCode`, `exceptionDescription`, `details`; schema marked `"deprecated": true` in the
   spec) and Problem Details `BadRequestProblemDetails` (`errors[]` with `code`, `description`,
   `details`). Changelog 2.4.0: „Udostępniono opcjonalny format błędów Problem Details
   (`application/problem+json`) dla odpowiedzi `400 Bad Request` i `429 Too Many Requests` […].
   Format można włączyć przez nagłówek `X-Error-Format: problem-details`; dotychczasowe odpowiedzi
   `application/json` pozostają wspierane." and „W odpowiedziach `400` w formacie Problem Details
   zwracana jest lista `errors` (bez agregowania wielu błędów do jednej pozycji)." Tier 2.
   Confidence: HIGH. M: yes. K: no.

7. **Documented exception codes** (every 4-5-digit code found in `open-api.json`, 2026-11-06;
   descriptions verbatim, main endpoints in brackets). Tier 2. Confidence: HIGH (that these are the
   documented ones; the API may return others, see Unsettled).
   - Uniwersalne: `21405` „Błąd walidacji danych wejściowych." details „{treść błędu z walidatora}"
     (in 72 of 83 endpoint 400 tables, not all; changelog RC5: „Dodano uniwersalny kod błędu
     walidacji danych wejściowych `21405` do wszystkich endpointów."); `21001` „Nieczytelna treść."
     details „{szczegółowy opis błędu}" (changelog 2.9.0: „Zmiana ma charakter dokumentacyjny; kod
     był zwracany przez API również wcześniej.").
   - Wysyłka faktury, POST `/sessions/online/{referenceNumber}/invoices`: `21155` „Przekroczono
     dozwoloną liczbę faktur w sesji."; `21166` „Korekta techniczna niedostępna." („Faktura posiada
     już przetworzoną prawidłowo korektę techniczną."); `21167` „Status faktury nie pozwala na
     korektę techniczną." („Nie można wysłać korekty technicznej do prawidłowo przetworzonej
     faktury."); `21173` „Brak sesji o wskazanym numerze referencyjnym."; `21180` „Status sesji nie
     pozwala na wykonanie operacji." („Status sesji {code} uniemożliwia wysyłkę faktur."); `21184`
     „Sesja tymczasowo niedostępna." („Trwają prace serwisowe i sesja {referenceNumber} jest
     tymczasowo niedostępna. Spróbuj ponownie później lub otwórz nową sesję, aby wysłać kolejne
     faktury."); `21402` „Nieprawidłowy rozmiar pliku." („Długość treści nie zgadza się z rozmiarem
     pliku."); `21403` „Nieprawidłowy skrót pliku." („Skrót treści nie zgadza się ze skrótem
     pliku."); plus `21001`, `21405`.
   - Sesja wsadowa: `21157` „Nieprawidłowy rozmiar części pakietu."; `21161` „Przekroczono dozwoloną
     liczbę części pakietu."; `21205` „Pakiet nie może być pusty."; `21208` „Czas oczekiwania na
     requesty upload lub finish został przekroczony." („Sesja anulowana, przekroczony czas
     wysyłki."); `21173`, `21180` („…uniemożliwia jej zamknięcie.").
   - Otwarcie sesji / klucze: `21470` „Przesłany identyfikator klucza jest nieznany lub wskazuje na
     wycofany klucz."
   - Uwierzytelnianie (POST `/auth/xades-signature`): `21111` „Nieprawidłowe wyzwanie
     autoryzacyjne."; `21115` „Nieprawidłowy certyfikat."; `21117` „Nieprawidłowy identyfikator
     podmiotu dla wskazanego typu kontekstu."; `21217` „Nieprawidłowe kodowanie znaków."; `21401`
     „Dokument nie jest zgodny ze schemą (xsd)." („{treść błędu walidacji}"); `21406` „Konflikt
     podpisu i typu uwierzytelnienia."; `9101` „Nieprawidłowy dokument."; `9102` „Brak podpisu.";
     `9103` „Przekroczona liczba dozwolonych podpisów."; `9105` „Nieprawidłowy podpis." (no `9104`
     in the spec). POST `/auth/ksef-token`: `21111`, `21470`.
   - Tokeny dostępowe (POST `/auth/token/redeem`, `/auth/token/refresh`): `21301` „Brak
     autoryzacji." (details e.g. „Token KSeF został unieważniony.", „Tokeny dla operacji
     uwierzytelniania {referenceNumber} zostały już pobrane."); `21304` „Brak uwierzytelnienia.";
     `21308` „Próba wykorzystania metod autoryzacyjnych osoby zmarłej."
   - Pobieranie faktur / eksport: `21164` „Faktura o podanym identyfikatorze nie istnieje."; `21165`
     „Faktura o podanym numerze KSeF nie jest jeszcze dostępna." („…Spróbuj ponownie później.");
     `21175` „Wynik zapytania o podanym identyfikatorze nie istnieje."; `21181` „Nieprawidłowe
     żądanie eksportu faktur."; `21182` „Osiągnięto limit trwających eksportów."; `21183` „Zakres
     filtrowania wykracza poza dostępny zakres danych."; `21418` „Przekazany token kontynuacji ma
     nieprawidłowy format." / „Przesłany token kontynuacji jest nieprawidłowy."
   - UPO: `21178` „Nie znaleziono UPO dla podanych kryteriów."
   - Certyfikaty KSeF: `25001`-`25011` (np. `25007` „Osiągnięto limit dopuszczalnej liczby
     posiadanych certyfikatów.", `25009` „Nie można odwołać wskazanego certyfikatu, ponieważ jest
     już odwołany, zablokowany lub nieważny."). Tokeny KSeF: `26001` „Nie można nadać tokenowi
     uprawnień których nie posiadasz.", `26002` „Nie można wygenerować tokena dla obecnego typu
     kontekstu." Identyfikatory zbiorcze: `71001`, `71002`, `71004`, `71005`. Dane testowe: `30001`
     „Podmiot lub uprawnienie już istnieje."

8. **`21184` is a session-availability error, not a validation error.** Changelog 2.8.0 (PROD
   23.09.2026): „Dodano kod błędu `21184` ("Sesja tymczasowo niedostępna"), zwracany z HTTP 400 w
   przypadku czasowego wstrzymania możliwości wysyłki faktur w ramach istniejącej sesji.
   Rekomendowane jest otwarcie nowej sesji i kontynuowanie wysyłki." Tier 2. HIGH. M: yes. (Same
   correction in `bledy-walidacji-fa3.md`.)

### C. Kody HTTP

9. **401 / 403.** Problem Details (`application/problem+json`). 401 example `detail`: „Wymagane jest
   uwierzytelnienie." (`UnauthorizedProblemDetails`). 403 `reasonCode` values verbatim:
   `missing-permissions` „Brak wymaganych uprawnień do wykonania operacji w bieżącym kontekście.";
   `ip-not-allowed` „Żądanie pochodzi z adresu IP innego niż wskazany podczas uwierzytelnienia.";
   `insufficient-resource-access` „Brak dostępu do wskazanego zasobu."; `auth-method-not-allowed`
   „Ta operacja nie jest dostępna dla użytej metody uwierzytelnienia."; `security-service-blocked`
   „Żądanie zostało zablokowane przez mechanizmy bezpieczeństwa."; `context-type-not-allowed`
   „Operacja nie jest dostępna dla uwierzytelnionego typu kontekstu." For `missing-permissions` the
   `security` object lists `requiredAnyOfPermissions` and `presentPermissions`
   (`ForbiddenProblemDetails`, `open-api.json`). Access token: „ma ograniczony czas ważności (np.
   kilkanaście minut, określony w polu exp)"; refresh token „do 7 dni" (`uwierzytelnianie.md`, pkt
   4). Batch part upload: „`401` - nieprawidłowe uwierzytelnienie, `403` - brak uprawnień do zapisu
   (np. upłynął czas na zapis)" (`sesja-wsadowa.md`). Tier 2. HIGH. M: yes. K: 403
   missing-permissions = brak uprawnień w KSeF (brief `uprawnienia-ksef-ksiegowa.md`).

10. **429 + Retry-After.** „W przypadku przekroczenia limitów żądań API zwracany jest kod HTTP **429
    Too Many Requests**, a kolejne żądania są tymczasowo blokowane. Okres trwania blokady jest
    **dynamiczny** […]. Dokładny czas blokady jest zwracany w nagłówku odpowiedzi `Retry-After` (w
    sekundach). Wielokrotne przekroczenia mogą skutkować znacznym wydłużeniem blokady." Limits are
    counted per pair „kontekst i adres IP"; all thresholds (req/s, req/min, req/h) apply in
    parallel. Example limit for sending an invoice (POST `/sessions/online/{ref}/invoices`): 10 / 30
    / 180 (req/s / min / h); invoice status GET: 30 / 120 / 1200. — `limity/limity-api.md`
    (14.09.2026). Spec: `RetryAfter` „Liczba sekund po których można ponowić żądanie."
    (`open-api.json`). Tier 2. HIGH. M: yes. K: no.

11. **410 Gone.** Changelog 2.4.0: „Po upływie okresu retencji odpytywanie statusu zwraca
    `410 Gone`." Retention: uwierzytelnianie 7 dni, eksport 7 dni, wydanie certyfikatu 30 dni,
    uprawnienia 30 dni; „Dla statusów sesji oraz wysyłki faktur retencja nie jest obecnie
    planowana." TE limits: „dziesięciokrotnie wyższe niż na produkcji"; DEMO = PROD
    (`limity-api.md`). Conflict: changelog 2.5.0 „Zrównano domyślne limity API na środowisku TEST z
    wartościami obowiązującymi na PROD”; TE figure is unsettled. Tier 2. HIGH (PROD), LOW (TE). M:
    yes.

### D. Jak zdiagnozować odrzuconą fakturę (430/450/440) i co zrobić

12. **Where the reason is.** `InvoiceStatusInfo` has `code`, `description` („Opis statusu"),
    `details` („Dodatkowe szczegóły statusu", array of strings) and `extensions` („Zbiór dodatkowych
    informacji związanych ze statusem faktury, zapisanych jako pary klucz–wartość.")
    (`open-api.json`). Rejected invoices of a session: GET
    `/sessions/{referenceNumber}/invoices/failed` „Zwraca łączną liczbę odrzuconych faktur w sesji
    oraz szczegółowe informacje (status i szczegóły błędów) dla każdej niepoprawnie przetworzonej
    faktury."
    (https://github.com/CIRFMF/ksef-api/blob/main/faktury/sesje/sesja-sprawdzenie-stanu-i-pobranie-upo.md,
    pkt 6). Batch: „KSeF w takiej sytuacji odrzuca tylko błędne semantycznie pliki XML i informuje o
    powodzie odrzucenia poszczególnych plików […], po odpytaniu o odrzucone dokumenty XML w danej
    sesji" (Podręcznik cz. II, pkt 3.3, s. 69; quoted in `ksef-scisla-walidacja-xml.md` fakt 12). No
    UPO for a rejected invoice: per-invoice UPO is „dla pojedynczej, poprawnie przyjętej faktury"
    (same doc, pkt 5). Tier 2. HIGH. M: yes. K: yes („szczegóły błędu" in the program).
    - **NOT FOUND:** the content of `details` for 430 and 450 (table shows „-"), and which checks
      map to 430 vs 450 (e.g. XSD failure, strict-XML failure, P_1 in the future, NIP checksum). Do
      not map them.

13. **What KSeF checks (grounds for rejection).** `faktury/weryfikacja-faktury.md` (09.04.2026): XML
    rules (XML 1.0, UTF-8 bez BOM, „zgodna z zadeklarowanym schematem podanym przy otwarciu sesji",
    no processing instructions, no discouraged Unicode) — „Niespełnienie któregokolwiek z powyższych
    wymagań spowoduje odrzucenie faktury."; duplikat; „Data wystawienia faktury (`P_1`) nie może być
    późniejsza niż data przyjęcia dokumentu do systemu KSeF."; NIP checksum for
    Podmiot1/2/3/PodmiotUpowazniony and `InternalId` — „Dotyczy tylko środowiska produkcyjnego.";
    size 1 MB / 3 MB; encryption; hash/size metadata; attachments only in batch (exception: korekta
    techniczna) and after e-US notification; permissions. Podręcznik cz. II 1.6.1 (KB extract):
    „KSeF nie dokonuje weryfikacji obliczeń matematycznych." Tier 2. HIGH. M/K: yes.

14. **What to do: fix and resend.** „W przypadku negatywnej weryfikacji system nie przydziela numeru
    KSeF faktury. Oznacza to, że faktura nie została wystawiona. Należy więc zweryfikować poprawność
    wprowadzonych danych i ponowić wysyłkę." — Podręcznik KSeF 2.0 cz. II (06.08.2026), pkt 1.6.1,
    s. 18 (quoted in `ksef-scisla-walidacja-xml.md` fakt 11; PDF not re-read). A changed numbering
    order from resending is allowed (cz. II 1.6.7, `usuniecie-faktury-ksef.md` fakt 9). Tier 2.
    HIGH. K: yes.

15. **440 Duplikat faktury.** Criterion: NIP sprzedawcy (`Podmiot1:NIP`) + `RodzajFaktury` + `P_2`;
    „W przypadku duplikatu zwracany jest kod błędu 440 („Duplikat faktury”)."; uniqueness kept
    „przez okres 10 pełnych lat, liczonych od końca roku kalendarzowego, w którym faktura została
    wystawiona." (`weryfikacja-faktury.md`). The status carries the original: changelog RC6.0
    example `details` „Duplikat faktury. Faktura o numerze KSeF: … została już prawidłowo przesłana
    do systemu w sesji: …" and `extensions` `originalSessionReferenceNumber`, `originalKsefNumber`;
    changelog RC5.3: „W przypadku przetworzenia z błędem, gdy możliwe było odczytanie numeru faktury
    (np. kod błędu `440` - duplikat faktury), odpowiedź zawiera właściwość `invoiceNumber` z
    odczytanym numerem." Practical consequence per KB: the first copy is already issued, the second
    gets no number (`usuniecie-faktury-ksef.md` fakt 18). Tier 2. HIGH. K: yes.

16. **Faktura offline odrzucona → korekta techniczna.** „Korekta techniczna umożliwia ponowne
    przesłanie faktury wystawionej w trybie offline, która po przesłaniu do systemu KSeF została
    **odrzucona** z powodu błędów technicznych, np.: niezgodność ze schematem, przekroczenie
    dopuszczalnego rozmiaru pliku, duplikat faktury, inne **błędy walidacji technicznej**
    uniemożliwiające nadanie numeru KSeF." Limits: „nie dotyczy sytuacji związanych z brakiem
    uprawnień"; „nie jest dozwolona korygowanie treści faktury"; only in an interactive session; not
    if „została już przyjęta inna prawidłowa korekta". Related exceptions `21166`, `21167` (Fakt 7).
    — https://github.com/CIRFMF/ksef-api/blob/main/offline/korekta-techniczna.md (20.08.2025).
    Tier 2. HIGH. M: yes. K: yes (her program does it).

### E. Aplikacja Podatnika i ścisła walidacja XML

17. **Does Aplikacja Podatnika show these codes? NOT FOUND.** No KB brief or fetched official doc
    states how AP presents rejection reasons or whether it shows numeric codes (Podręcznik AP not
    re-read; ksef.podatki.gov.pl unreachable). Do not claim either way.

18. **Strict XML: no dedicated code. NOT FOUND (re-checked 2026-11-06).** Changelog latest is
    **2.9.0** (PROD 15.10.2026); no entry after it; 2.4.0 still says „Zaostrzenie walidacji XML
    zacznie obowiązywać od **16.07.2026**." The strings 19.10.2026 / 2026-10-19 do not occur in the
    changelog. Neither the changelog nor `weryfikacja-faktury.md` names an invoice status code for
    strict-XML rejections. On PROD the documented channel is the warning header `X-System-Warning`
    („Ostrzeżenie techniczne dla systemu integratora. Ostrzeżenie nie wpływa na bieżący wynik
    operacji."; format `[code]: message | [code]: message`), whose codes are not predefined (MF in
    issue #807, Tier 3, per `ksef-scisla-walidacja-xml.md` fakt 8). The 19.10.2026 date rests only
    on the kw-cirf comment in issue #718 (2026-06-24, Tier 3, MEDIUM); issues not re-read (403).
    Status: announced, not confirmed.

## Unsettled Questions

- TEST environment limits: `limity-api.md` (14.09.2026) says 10× PROD, changelog 2.5.0 says TEST was
  aligned with PROD. Post states the contradiction.

- Which checks return 430 vs 450 for an invoice, and what `details` text they carry: not documented.
  „Semantyka" in 450 is not defined in the spec. Do not explain 450 as „błąd FA(3) według broszury"
  or as „błąd XSD".
- Whether the API returns exception codes not listed in the per-endpoint tables: not stated.
- Whether Aplikacja Podatnika displays the numeric code: NOT FOUND.
- Whether PROD rejects strict-XML violations since 19.10.2026 and under which code: NOT FOUND.
- Session status row „| \* | description missing | - |": meaning not explained in the source.

## Suggested Sources Section

- CIRFMF/ksef-api, specyfikacja OpenAPI (tabele statusów, kody błędów 400):
  https://github.com/CIRFMF/ksef-api/blob/main/open-api.json
- CIRFMF/ksef-api, changelog API (2.0.0 RC5-2.9.0):
  https://github.com/CIRFMF/ksef-api/blob/main/api-changelog.md
- „Weryfikacja faktury" (09.04.2026):
  https://github.com/CIRFMF/ksef-api/blob/main/faktury/weryfikacja-faktury.md
- „Sesja – sprawdzenie stanu i pobranie UPO" (20.04.2026):
  https://github.com/CIRFMF/ksef-api/blob/main/faktury/sesje/sesja-sprawdzenie-stanu-i-pobranie-upo.md
- „Limity żądań API" (14.09.2026): https://github.com/CIRFMF/ksef-api/blob/main/limity/limity-api.md
- „Korekta techniczna faktury offline" (20.08.2025):
  https://github.com/CIRFMF/ksef-api/blob/main/offline/korekta-techniczna.md
- „Uwierzytelnianie": https://github.com/CIRFMF/ksef-api/blob/main/uwierzytelnianie.md
- Podręcznik KSeF 2.0 cz. II (06.08.2026), pkt 1.6.1, 3.3:
  https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf

## Warning: Common Misconceptions

- „Błąd 450 = zły token": only for authentication. For an invoice 450 is „Błąd weryfikacji semantyki
  dokumentu faktury"; for permissions it is something else again (Fakty 1, 2, 4).
- „440 = sesja anulowana": that is the session status; for an invoice 440 is „Duplikat faktury".
- „21401 = faktura niezgodna z XSD": `21401` „Dokument nie jest zgodny ze schemą (xsd)." is
  documented only for POST `/auth/xades-signature` (the signed auth request), not for invoices.
- „21184 = błąd walidacji XML": it is „Sesja tymczasowo niedostępna" (open a new session).
- „Odrzucona faktura ma UPO / numer KSeF": no; UPO only for a correctly accepted invoice, and no
  number means the invoice was not issued (Fakty 12, 14).
- „KSeF sprawdza rachunki": it does not (cz. II 1.6.1); arithmetic errors pass and need a korekta.
- „Jest oficjalna lista wszystkich kodów błędów KSeF": there is no single list; codes are spread
  over per-operation tables and per-endpoint 400 tables in `open-api.json`.
- KSeF 1.0 codes (ksef.mf.gov.pl, dead since 1.02.2026) do not apply to the KSeF 2.0 API; do not
  reuse old code lists.
