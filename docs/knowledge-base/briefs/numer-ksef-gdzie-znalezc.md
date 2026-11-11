# Research Brief: Numer KSeF faktury: co to jest i gdzie go znaleźć

**Requested by:** human / Copywriter **Date:** 2026-11-07 **For content:** new post „Numer KSeF
faktury: gdzie go znaleźć" (personas: Ania, JDG wystawiająca i odbierająca faktury; Marek,
programista pobierający numer z API)

**Target query:** „numer KSeF faktury" / „gdzie znaleźć numer KSeF"

**Answer in two sentences:** Numer KSeF to 35-znakowy identyfikator, który system nadaje fakturze po
przyjęciu (`NIP sprzedawcy-RRRRMMDD-12 znaków hex-2 znaki CRC-8`); nie ma go w pliku XML faktury, bo
powstaje dopiero w KSeF i jest zwracany w UPO (Podręcznik KSeF 2.0 cz. II pkt 4.1; CIRFMF/ksef-api
`faktury/numer-ksef.md`). Wystawca widzi go po wysłaniu (Aplikacja Podatnika: komunikat z
przyciskiem „Kopiuj", lista faktur, UPO; program: status faktury z API), a nabywca na liście faktur
w KSeF, w nazwie pobranego pliku i pod kodem QR na wizualizacji faktury (AP manual s. 32–33,
116–117; cz. II pkt 5.4.1).

**What changes the answer:**

- **Faktura poza KSeF** (limit 10 000 zł z art. 145m i faktury z kasy z art. 145n do 31.12.2026;
  faktura dla konsumenta, art. 106ga ust. 2 pkt 4): numeru nie ma i nie będzie. Fakty 13–14.
- **Offline24 / niedostępność / tryb awaryjny przed wysłaniem:** numeru jeszcze nie ma; pod kodem QR
  napis „OFFLINE". Po wysłaniu faktura dostaje numer. Fakty 10, 15.
- **Faktura odrzucona przez KSeF:** numeru nie ma, faktura nie jest wystawiona. Fakt 16.
- **Kto pyta:** wystawca ma numer od razu w odpowiedzi systemu; nabywca z NIP w polu
  `Podmiot2/DaneIdentyfikacyjne/NIP` widzi fakturę w KSeF automatycznie; konsument / nabywca z art.
  106gb ust. 4 dostaje fakturę „w sposób uzgodniony" z kodem QR. Fakty 7–11.
- **Data:** numer w tytule przelewu obowiązuje dla płatności od 1.01.2027 (art. 108g). Fakt 17.

**Provenance legend:** [API] = read today (2026-11-07) in the local clone of CIRFMF/ksef-api (commit
`ce3670e`, 2026-10-14). [KB] = taken from the KB only, not fetched live today (MF and gov.pl hosts
return 403 from this environment); the KB brief named in the fact holds the original citation.

## Key Facts (ready to use)

### A. Czym jest numer KSeF

1. **35 znaków, globalnie unikalny, nadawany przez system.** „Numer KSeF to unikalny identyfikator
   faktury nadawany przez system. Zawsze ma długość **35 znaków** i jest globalnie unikalny" —
   https://github.com/CIRFMF/ksef-api/blob/main/faktury/numer-ksef.md [API] Confidence: HIGH
   Ania-relevant: yes
2. **Struktura `9999999999-RRRRMMDD-FFFFFFFFFFFF-FF`:** „`9999999999` – NIP sprzedawcy (10 cyfr)",
   „`RRRRMMDD` – data przyjęcia faktury (rok, miesiąc, dzień) do dalszego przetwarzania", 12 znaków
   „część techniczna" [0–9 A–F], „`FF` – suma kontrolna CRC-8". Przykład MF:
   `5265877635-20250826-0100001AF629-AF`. CRC-8: polinom `0x07`, wartość początkowa `0x00`, liczona
   z pierwszych 32 znaków. — same file [API] Confidence: HIGH Ania-relevant: yes (NIP + data);
   Marek: yes (walidacja)
3. **Data w numerze to data przyjęcia do przetwarzania, nie P_1.** open-api.json rozróżnia trzy daty
   w metadanych faktury (`InvoiceMetadata`): `issueDate` „Data wystawienia faktury", `invoicingDate`
   „Data przyjęcia faktury w systemie KSeF (do dalszego przetwarzania)", `acquisitionDate` „Data
   nadania numeru KSeF". Numer zawiera tę drugą (fakt 2). Przykład z UPO: `DataWystawieniaFaktury`
   2025-09-16, numer `5265877635-20250916-0200A0D6723E-C2`. —
   https://github.com/CIRFMF/ksef-api/blob/main/open-api.json ;
   https://github.com/CIRFMF/ksef-api/blob/main/faktury/upo/przyklady/v4-3/kontekst-nip/upo-faktura-kontekst-id-nip.xml
   [API] Confidence: HIGH (definicja); dla offline24 (P_1 wcześniejsza niż wysyłka, art. 106nda
   ust. 16) data w numerze będzie późniejsza niż P_1 — wniosek z definicji, MEDIUM.
4. **Numer KSeF nie jest elementem faktury ani pliku XML; P_2 to numer własny wystawcy.** KB
   (Podręcznik cz. II pkt 4.1, s. 70): „Numer KSeF nie jest elementem faktury. FA(3) nie zawiera
   pola na numer KSeF. Pole P_2 zawiera numer faktury nadany przez podatnika." FAQ „Najczęstsze
   pytania" Q7: numer nie jest w XML, zwracany w UPO. — `podrecznik-ksef-20-czesc-ii.md` §4.1;
   `mf-faq-podreczniki-2026.md` fakt 1. URLs:
   https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
   ; https://ksef.podatki.gov.pl/ksef-news/najczestsze-pytania/ [KB] Confidence: HIGH
5. **Numer KSeF ≠ numer referencyjny sesji / faktury.** API zwraca też `referenceNumber` faktury i
   sesji (format np. `20250901-EU-47FDBE3000-5961A5D232-BF`); Podręcznik: numer referencyjny sesji
   „≠ numer KSeF" (UPO element 1). — `podrecznik-ksef-20-czesc-ii.md` §4.2 [KB];
   https://github.com/CIRFMF/ksef-api/blob/main/faktury/sesje/sesja-sprawdzenie-stanu-i-pobranie-upo.md
   [API] Confidence: HIGH Marek: yes (częsty błąd)

### B. Gdzie numer ma wystawca

6. **Aplikacja Podatnika:** po „Wyślij do KSeF" system waliduje i pokazuje numer KSeF z przyciskiem
   „Kopiuj"; lista faktur → zaznacz → „Pobierz" → plik nazwany numerem KSeF (1–10 faktur, kilka =
   ZIP); UPO pojedynczej faktury z menu kontekstowego w „Szczegóły wysyłki” w „Historia sesji” (nie
   z listy faktur), UPO zbiorcze w „Historia sesji" po „Zakończ sesję". — Podręcznik AP (06.08.2026)
   s. 32–33, 116–117, 125–126 per `aplikacja-podatnika-ksef-pierwsza-faktura.md` fakty 8–10. URL:
   https://ksef.podatki.gov.pl/media/qocjn3ai/podrecznik-uzytkownika-aplikacji-podatnika-ksef-20_06082026.pdf
   [KB] Confidence: HIGH Ania-relevant: yes
7. **UPO zawiera numer KSeF.** Elementy UPO wg MF: numer referencyjny sesji, kontekst, numer KSeF,
   P_2, NIP sprzedawcy, P_1, data przesłania, „Data nadania numeru KSeF = data otrzymania e-Faktury
   przez nabywcę", SHA-256, tryb wysyłki. W XML UPO (schemat v4-3) to `Dokument/NumerKSeFDokumentu`,
   obok `NumerFaktury`, `NipSprzedawcy`, `DataNadaniaNumeruKSeF`, `TrybWysylki`. —
   `podrecznik-ksef-20-czesc-ii.md` §4.2 [KB];
   https://github.com/CIRFMF/ksef-api/blob/main/faktury/upo/przyklady/v4-3/kontekst-nip/upo-faktura-kontekst-id-nip.xml
   ; https://github.com/CIRFMF/ksef-api/blob/main/faktury/upo/schemy/upo-v4-3.xsd [API] Confidence:
   HIGH
8. **API (Marek):** `GET /sessions/{referenceNumber}/invoices/{invoiceReferenceNumber}` zwraca
   `SessionInvoiceStatusResponse` z polem `ksefNumber` („Numer KSeF.", `nullable`) oraz
   `acquisitionDate` („Data nadania numeru KSeF."); `GET /sessions/{referenceNumber}/invoices`
   zwraca listę faktur sesji; UPO faktury: `.../invoices/{invoiceReferenceNumber}/upo` lub
   `.../invoices/ksef/{ksefNumber}/upo`; UPO sesji (max 10 000 pozycji) przez `upo.pages[]` po
   zamknięciu sesji. Wyszukiwanie i pobieranie: `POST /invoices/query/metadata`
   (`InvoiceMetadata. ksefNumber`), `GET /invoices/ksef/{ksefNumber}` (zwraca fakturę); w paczce
   eksportu `_metadata.json` z tablicą `InvoiceMetadata`. —
   https://github.com/CIRFMF/ksef-api/blob/main/faktury/sesje/sesja-sprawdzenie-stanu-i-pobranie-upo.md
   ; https://github.com/CIRFMF/ksef-api/blob/main/pobieranie-faktur/pobieranie-faktur.md ;
   https://github.com/CIRFMF/ksef-api/blob/main/open-api.json [API] Confidence: HIGH Ania: no
9. **Opóźnienie numeru:** „Proces przyjęcia faktury przez KSeF zazwyczaj przebiega natychmiastowo —
   numer KSeF generowany jest niezwłocznie po przesłaniu dokumentu. W wyjątkowych przypadkach (np.
   wysokie obciążenie systemu) numer może być nadany z niewielkim opóźnieniem." —
   https://github.com/CIRFMF/ksef-api/blob/main/kody-qr.md („Oznaczenie pod kodem QR") [API]
   Confidence: HIGH

### C. Gdzie numer ma nabywca

10. **Faktura sama trafia do nabywcy; sprzedawca nie musi wysyłać numeru.** Nabywca z NIP w polu NIP
    (`Podmiot2`) ma fakturę w KSeF automatycznie w chwili nadania numeru. FAQ KSeF 2.0: „Czy trzeba
    wysyłać kontrahentowi numer KSeF faktury? Nie ma takiego obowiązku, ponieważ faktura pojawia się
    w systemie odbiorcy automatycznie." W AP: lista faktur, plik nazwany numerem KSeF (fakt 6). —
    `numer-ksef-w-przelewie.md` fakt 9; `jak-odebrac-fakture-ksef.md` fakty 9–10, 14;
    https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20/ [KB] Confidence: HIGH Ania: yes
11. **Kod QR na wizualizacji / PDF:** „w trybie **online** — jeden kod QR (KOD I)"; „**Jeżeli numer
    KSeF jest znany:** pod kodem QR umieszczany jest numer KSeF faktury (dotyczy faktur online oraz
    faktur offline już przesłanych do systemu)"; „**Jeżeli numer KSeF nie jest jeszcze nadany:** pod
    kodem QR umieszczany jest napis **OFFLINE** (dotyczy faktur offline przed przesłaniem lub online
    oczekujących na numer)". Faktura offline ma też KOD II („CERTYFIKAT", cz. II pkt 5.4.1). —
    https://github.com/CIRFMF/ksef-api/blob/main/kody-qr.md [API]; `podrecznik-ksef-20-czesc-ii.md`
    §5.4.1 [KB] Confidence: HIGH Ania: yes
12. **Sam link w kodzie QR nie zawiera numeru KSeF:** KOD I = adres + data P_1 (DD-MM-RRRR) + NIP
    sprzedawcy + SHA-256 pliku (Base64URL), np.
    `https://qr-test.ksef.mf.gov.pl/invoice/1111111111/01-02-2026/UtQp9Gpc...`. Po zeskanowaniu krok
    1 pokazuje m.in. numer KSeF, NIP sprzedawcy, datę wystawienia, datę nadania numeru, tryb. —
    https://github.com/CIRFMF/ksef-api/blob/main/kody-qr.md [API]; cz. II pkt 5.5 per
    `podrecznik-ksef-20-czesc-ii.md` [KB] Confidence: HIGH
13. **Dostęp anonimowy w AP (bez logowania, bez QR) wymaga już znajomości numeru KSeF:** numer KSeF,
    numer faktury (P_2), NIP/identyfikator nabywcy lub informacja o braku, imię i nazwisko / nazwa
    nabywcy lub informacja o braku, kwota należności ogółem (P_15) („§ 8 rozporządzenia"). Dostęp
    przez QR „nie wymaga ręcznego wpisywania numeru KSeF". Pobranie XML lub PDF. —
    `podrecznik-ksef-20-czesc-ii.md` §5.5, §5.7; `jak-odebrac-fakture-ksef.md` fakt 18 [KB]
    Confidence: HIGH Ania: yes (gdy nie ma dostępu do konta). Do odnalezienia numeru służy więc QR
    lub konto w KSeF, nie dostęp anonimowy.

### D. Kiedy numeru nie ma

14. **Faktury wystawione poza KSeF nie mają numeru:** limit 10 000 zł (art. 145m) i kasa (art. 145n)
    do 31.12.2026, faktura dla konsumenta poza KSeF (art. 106ga ust. 2 pkt 4); KB: „none gets a KSeF
    number". Konsument przy fakturze dobrowolnie wystawionej w KSeF dostaje ją „w sposób uzgodniony"
    z kodem QR (art. 106gb ust. 4). — `faktura-korygujaca-ksef.md` fakt 5;
    `faktura-dla-osoby-prywatnej-ksef.md` (Answer) [KB] Confidence: HIGH
15. **Offline:** offline24 i niedostępność dostają numer po wysłaniu (data otrzymania = data nadania
    numeru, art. 106nda ust. 11); przed nadaniem numeru sprzedawca może wydać „potwierdzenie
    transakcji" z dwoma kodami QR, które nie jest fakturą; tryb awaryjny (art. 106nf): faktura poza
    KSeF z dwoma kodami, potem wysłana do KSeF; awaria całkowita (art. 106ng): faktury nie trafiają
    do KSeF, numeru brak (LOW, wniosek KB). — `awaria-ksef-offline.md` fakty 4, 6;
    `faktura-korygujaca-ksef.md` fakt 6; `podrecznik-ksef-20-czesc-ii.md` §1.6.6 [KB] Confidence:
    HIGH (poza 106ng)
16. **Faktura odrzucona nie ma numeru i nie jest wystawiona:** „Faktura odrzucona (status 4xx) nie
    dostaje numeru KSeF i nie jest wystawiona"; poprawia się plik i wysyła ponownie (cz. II pkt
    1.6.1). Offline odrzucona technicznie → korekta techniczna (`hashOfCorrectedInvoice`), po której
    „Dokument otrzymuje numer KSeF" i stary KOD I prowadzi do poprawionej faktury. Lista
    odrzuconych: `GET /sessions/{referenceNumber}/invoices/failed`. — `kody-bledow-ksef.md` (Answer)
    [KB]; https://github.com/CIRFMF/ksef-api/blob/main/offline/korekta-techniczna.md ;
    https://github.com/CIRFMF/ksef-api/blob/main/faktury/sesje/sesja-sprawdzenie-stanu-i-pobranie-upo.md
    [API] Confidence: HIGH

### E. Do czego numer jest potrzebny

17. **Tytuł przelewu od 1.01.2027 (art. 108g):** czynny podatnik VAT płacący innemu czynnemu za
    fakturę ustrukturyzowaną (oraz offline24 / niedostępność) podaje numer KSeF albo identyfikator
    zbiorczy; stosuje się do płatności od 1.01.2027 (art. 17 ustawy z 16.06.2023); wyłączenie:
    faktury offline niewprowadzone do KSeF z powodu ogłoszonej awarii (ust. 4); faktur z art. 106nf
    przepis nie wymienia. MPP: numer KSeF w komunikacie przelewu (art. 108a ust. 3 pkt 3). Faktur
    spoza KSeF art. 108g nie wymienia. — `numer-ksef-w-przelewie.md` fakty 1–3, 11, 13; Dz.U. 2026
    poz. 1263: https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf [KB] Confidence: HIGH (Tier 1)
    Ania: yes. Full topic: link `/blog/numer-ksef-w-przelewie`, don't restate.
18. **Identyfikator zbiorczy (IZ):** 35 znaków (NIP, „IZ", rok i miesiąc, 12 znaków, 2 znaki
    kontrolne), np. `9999999999-IZ202602-FFFFFFFFFFFF-FF`, dla co najmniej dwóch faktur tego samego
    sprzedawcy, generuje wystawca lub odbiorca przez API / program (w AP tylko zapowiedź MF: „będzie
    także dostępna”; Podręcznik AP 06.08.2026 tej funkcji nie opisuje, sprawdzone 2026-11-11)
    (`numer-ksef-w-przelewie.md` fakt 6;
    https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/numer-ksef-i-zbiorczy-identyfikator/
    [KB]). API: „Jedna faktura może zostać przypisana do maksymalnie 132 identyfikatorów zbiorczych
    w ramach jednego kontekstu" (`CollectiveIdentifierInvoice.ksefNumber`);
    `GET /collective-identifiers/ksef/{ksefNumber}` „Zwraca listę identyfikatorów zbiorczych
    związanych z podanym numerem KSeF"; błąd `71004` dla faktur różnych sprzedawców, `71005` dla
    powtórzonego numeru; limit faktur w jednym IZ: `collectiveIdentifier.maxInvoices` z
    `GET /limits/context` (wartości nie podano). —
    https://github.com/CIRFMF/ksef-api/blob/main/open-api.json ;
    https://github.com/CIRFMF/ksef-api/blob/main/api-changelog.md [API] Confidence: HIGH
19. **Faktura korygująca:** oryginał z numerem KSeF → `NrKSeF` = 1 + `NrKSeFFaKorygowanej`; oryginał
    bez numeru (wystawiony poza KSeF) → `NrKSeFN` = 1 (wybór: jedno albo drugie, XSD choice).
    Dotyczy też oryginałów z offline24, niedostępności i trybu awaryjnego (broszura FA(3) opis pola
    `NrKSeF`, s. 70: „Obowiązek podawania numeru KSeF faktury korygowanej dotyczy także faktur
    wystawionych zgodnie z art. 106nda ust. 1 lub ust. 16 ustawy, 106nh ust. 1 ustawy, art. 106nf
    ust. 1 ustawy."). Kryterium to numer KSeF, nie data faktury. — `faktura-korygujaca-ksef.md`
    fakty 1, 5, 6; `packages/validator/docs/fa3-information-sheet.md` (tabela `DaneFaKorygowanej`);
    broszura:
    https://ksef.podatki.gov.pl/media/nuclnu0w/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf
    [KB] Confidence: HIGH Ania: yes. Full topic: `/blog/faktura-korygujaca-ksef`.
20. **Faktura rozliczająca / ostatnia zaliczkowa:** numery KSeF faktur zaliczkowych
    (`NrKSeFFaZaliczkowej`; spoza KSeF: `NrKSeFZN` = 1 + `NrFaZaliczkowej`), art. 106f ust. 3–4. —
    `podrecznik-ksef-20-czesc-ii.md` §4.1.1–4.1.2 [KB] Confidence: HIGH Ania: rarely
21. **JPK_V7M(3)/V7K(3) od lutego 2026:** obowiązek podawania numerów KSeF faktur sprzedażowych i
    zakupowych, „a w przypadku braku nr KSeF ma obowiązek stosowania odpowiednich oznaczeń" (cz. II
    pkt 4.1.6, s. 76); offline24 / niedostępność bez numeru → oznaczenie DI, później korekta do
    numeru; awaria całkowita → BFK. — `faktura-poza-ksef-odliczenie-vat.md` (źródła [CZ2] s. 76);
    `awaria-ksef-offline.md` fakt 7; `mf-faq-podreczniki-2026.md` fakt 1 (FAQ Q8/Q9) [KB]
    Confidence: HIGH (that it applies), oznaczenie dla faktur zakupowych spoza KSeF NOT IN KB. Ania:
    low (robi to program / księgowa).

### F. Stary format 36 znaków

22. **API akceptuje numer 36-znakowy wyłącznie dla zgodności z KSeF 1.0:** schemat `KsefNumber`
    (`minLength` 35, `maxLength` 36, wzorzec z opcjonalnym łącznikiem
    `-([0-9A-F]{6})-?([0-9A-F]{6})-`): „Numer KSeF o długości 36 znaków jest akceptowany, by
    zachować kompatybilność wsteczną z KSeF 1.0. W KSeF 2.0 numery są generowane wyłącznie w
    formacie 35-znakowym." — https://github.com/CIRFMF/ksef-api/blob/main/open-api.json [API]
    Confidence: HIGH. Rejestr zmian broszury FA(3): „Listopad 2025 r. | 70-71 | Zmiana numeru KSeF z
    36-znakowego na 35-znakowy w przykładzie nr 14." (`broszura-fa3-wydania.md` fakt 3) [KB]. Ania:
    only to explain an old example; Marek: yes (walidacja: przyjmij oba, generuje się 35).

## Unsettled Questions

- **Data w numerze vs data nadania numeru:** API ma osobno `invoicingDate` (data w numerze) i
  `acquisitionDate` (data nadania numeru = data otrzymania, art. 106na ust. 3). Czy mogą wypaść w
  różnych dniach (np. przyjęcie przed północą, numer po) — źródła milczą. Nie pisać, że data w
  numerze to data otrzymania faktury.
- **36-znakowe numery z KSeF 1.0:** API je akceptuje (fakt 22), ale KB nie potwierdza, że wszystkie
  numery KSeF 1.0 miały 36 znaków, ani jak je podawać w `NrKSeFFaKorygowanej` / w przelewie.
- **Co wpisać w tytule przelewu (od 2027), gdy faktura offline jeszcze nie ma numeru, a awarii nie
  ogłoszono:** ust. 4 art. 108g wyłącza tylko przypadek awarii (`numer-ksef-w-przelewie.md`).
- **Korekta faktury offline przed nadaniem numeru:** SETTLED 2026-11-11 (Dz.U. 2026 poz. 1263):
  korektę wystawia się dopiero po przydzieleniu numeru KSeF (art. 106nda ust. 12; art. 106nh ust. 4
  w zw. z art. 106nda ust. 12; art. 106nf ust. 11).
- **Awaria całkowita (art. 106ng) → `NrKSeFN`:** tylko wniosek (LOW).
- **Nazwy menu AP dla faktur otrzymanych** (filtr „nabywca", pola wyszukiwania, czy „Pobierz" daje
  PDF): NOT IN KB / NOT SETTLED (`jak-odebrac-fakture-ksef.md` fakt 9). Nie podawać nazw menu poza
  „Kopiuj", „Pobierz", „Historia sesji", „Pobierz UPO zbiorcze".
- **Czy wizualizacja PDF z AP lub z programu zawsze pokazuje numer KSeF poza kodem QR:** źródła
  opisują tylko numer pod kodem QR (fakt 11). Nie twierdzić, że numer jest w nagłówku PDF.
- **Aplikacja mobilna KSeF i e-mikrofirma:** gdzie pokazują numer — NOT IN KB.
- **Rozporządzenie z „§ 8" (dostęp anonimowy):** KB nie identyfikuje aktu
  (`jak-odebrac-fakture-ksef.md` fakt 18).
- **Maksymalna liczba faktur w jednym IZ:** zwracana przez `GET /limits/context`, wartość PROD nie w
  KB.

## Suggested Sources Section

- Podręcznik KSeF 2.0 cz. II (06.08.2026), pkt 1.6.6, 4.1–4.2, 5.4–5.7:
  https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
- Podręcznik użytkownika Aplikacji Podatnika KSeF 2.0 (06.08.2026), s. 32–33, 116–117, 125–126:
  https://ksef.podatki.gov.pl/media/qocjn3ai/podrecznik-uzytkownika-aplikacji-podatnika-ksef-20_06082026.pdf
- MF, „Numer KSeF i zbiorczy identyfikator":
  https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/numer-ksef-i-zbiorczy-identyfikator/
- FAQ KSeF 2.0 (pytanie o wysyłanie numeru kontrahentowi; cytować po treści, numeracja się zmienia):
  https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20/
- FAQ „Najczęstsze pytania" (Q7, Q8/Q9): https://ksef.podatki.gov.pl/ksef-news/najczestsze-pytania/
- Broszura FA(3), opis pól `NrKSeF`/`NrKSeFN`, s. 69–70:
  https://ksef.podatki.gov.pl/media/nuclnu0w/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf
- Ustawa o VAT, t.j. Dz.U. 2026 poz. 1263 (art. 106na, 106nda, 108a, 108g, 145m, 145n):
  https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf
- CIRFMF, numer KSeF: https://github.com/CIRFMF/ksef-api/blob/main/faktury/numer-ksef.md
- CIRFMF, kody QR: https://github.com/CIRFMF/ksef-api/blob/main/kody-qr.md
- CIRFMF, status sesji i UPO:
  https://github.com/CIRFMF/ksef-api/blob/main/faktury/sesje/sesja-sprawdzenie-stanu-i-pobranie-upo.md
- CIRFMF, pobieranie faktur:
  https://github.com/CIRFMF/ksef-api/blob/main/pobieranie-faktur/pobieranie-faktur.md
- CIRFMF, specyfikacja API: https://github.com/CIRFMF/ksef-api/blob/main/open-api.json

Note: `numer-ksef-w-przelewie.md` cites `github.com/CIRFMF/ksef-docs/.../faktury/numer-ksef.md`;
ksef-docs is a legacy redirect (WATCHLIST.md), use the ksef-api URL above.

## Not fetched live (2026-11-07)

All [KB] items: Podręcznik cz. II and AP manual PDFs, broszura FA(3), MF pages and both FAQs, Dz.U.
2026 poz. 1263. The local KB extract of cz. II is the 01.02.2026 edition (section numbers checked
against 06.08.2026 only non-line-by-line). [API] items were read in the local clone (commit
2026-10-14), not on github.com today.

## Warning: Common Misconceptions

- „Numer KSeF to numer faktury (P_2)" / „wpisz numer KSeF do XML": nie; nadaje go system po
  przyjęciu, w FA(3) nie ma na niego pola (fakt 4).
- „Data w numerze KSeF to data wystawienia": nie; to data przyjęcia do przetwarzania (fakt 3).
- „NIP w numerze to NIP nabywcy": nie; sprzedawcy (fakt 2).
- „Sprzedawca musi przysłać mi numer KSeF": nie ma takiego obowiązku (fakt 10).
- „Numer referencyjny z odpowiedzi API / UPO zbiorczego to numer KSeF": nie (fakt 5).
- „Faktura offline nie ma numeru KSeF": ma, po wysłaniu (fakt 15); nie ma go faktura spoza KSeF
  (fakt 14) i odrzucona (fakt 16).
- „Numer KSeF ma 36 znaków": stary przykład z broszury (wrzesień 2025) i KSeF 1.0; KSeF 2.0 generuje
  35 (fakt 22). Uwaga: posty o korekcie (PL/EN/UK) wciąż używają przykładu
  `5214567890-20260401-000001-000001-01` (36 znaków) — `broszura-fa3-wydania.md` fakt 10.

**Freshness:** 2026-11-07. Re-check: 2026-12-31 (koniec art. 145m/145n), 2027-01-01 (art. 108g w
mocy), nowe wydanie Podręcznika cz. II / AP, zmiany `KsefNumber` w open-api.json (np. wycofanie
36-znakowego wariantu).
