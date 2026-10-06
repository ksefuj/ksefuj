# Research Brief: Jak dać księgowej dostęp do KSeF

**Requested by:** Orchestrator (backlog item `uprawnienia-ksef-ksiegowa`) **Date:** 2026-10-07 **For
content:** Blog post "Jak dać księgowej dostęp do KSeF" **Freshness:** 2026-10-07 (legal state and
MF documents of 2026-08-06)

**Target query:** „KSeF uprawnienia biuro rachunkowe" **Personas:** Ania (JDG, grants access), Pani
Krystyna (accountant, receives it and delegates to staff)

## Answer in two sentences

Dostęp nadajesz elektronicznie: logujesz się do Aplikacji Podatnika KSeF 2.0 (albo używasz swojego
programu przez API), wybierasz Uprawnienia, Nadaj uprawnienie i wskazujesz biuro po NIP albo
księgową z imienia i nazwiska. Zawiadomienie ZAW-FA jest potrzebne tylko wtedy, gdy podatnik nie
jest osobą fizyczną i nie ma pieczęci kwalifikowanej albo gdy trzeba zgłosić podpis bez NIP i PESEL.

## What changes the answer

- Kto nadaje: JDG (osoba fizyczna) czy spółka bez kwalifikowanej pieczęci (wtedy pierwsza osoba
  tylko przez ZAW-FA).
- Komu: biuru po NIP (z delegowaniem na pracowników) czy konkretnej osobie po NIP/PESEL/odcisku
  palca podpisu.
- Czy podpis księgowej zawiera NIP lub PESEL.
- Zakres: samo przeglądanie faktur, czy także wystawianie.

## Key Facts

| #   | Fact                                                                                                                                                                                                                                                                                                           | Source (tier)                                                                          | Confidence |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ---------- |
| 1   | Uprawnienia właścicielskie są przypisane automatycznie do NIP podatnika (wystawianie faktur, dostęp do faktur, zarządzanie uprawnieniami, zarządzanie jednostkami podrzędnymi, przeglądanie historii sesji, przeglądanie uprawnień). Nie można ich odebrać.                                                    | Podręcznik KSeF 2.0 cz. I (06.08.2026), s. 57 (T2)                                     | High       |
| 2   | Osoba fizyczna prowadząca działalność nie składa ZAW-FA, żeby wyznaczyć osobę, która będzie działać w jej imieniu. Jedyny wyjątek: zgłoszenie danych unikalnych własnego podpisu. Uprawnienia nadaje elektronicznie po uwierzytelnieniu.                                                                       | cz. I s. 57 (T2)                                                                       | High       |
| 3   | Logowanie do Aplikacji Podatnika: login.gov.pl (Profil Zaufany, mObywatel, bankowość elektroniczna, e-Dowód) albo certyfikat kwalifikowany podpisu lub pieczęci. Brak obsługi eID z innych państw UE. Token i certyfikat KSeF nie są w AP metodą logowania.                                                    | Podręcznik AP (06.08.2026), s. 13-15 (T2); cz. I s. 41-42 (T2)                         | High       |
| 4   | Ścieżka w AP: Uprawnienia, Nadaj uprawnienie, pole „Rodzaj uprawnienia". Dla biura: „Podmiotowi do wystawiania i przeglądania faktur", NIP i pełna nazwa, zakres: „wystawianie faktur" i/lub „przeglądanie faktur", każdy opcjonalnie „z prawem do dalszego przekazywania uprawnienia".                        | FAQ MF „Najczęstsze pytania" pyt. 17 (T3); AP s. 145 (T2)                              | High       |
| 5   | Delegowanie dalej dotyczy tylko wystawiania i dostępu do faktur i tylko, gdy uprawnionym jest podmiot z NIP. Osoba wskazana przez biuro dostaje wyłącznie te dwa uprawnienia i nie może ich przekazać dalej.                                                                                                   | cz. I s. 74-75 (T2)                                                                    | High       |
| 6   | Biuro nie loguje się w kontekście klienta, żeby delegować, lecz we własnym kontekście (NIP biura). Wskazuje, czy pracownik działa dla jednego klienta, czy dla wszystkich klientów.                                                                                                                            | cz. I s. 74-76 (T2)                                                                    | High       |
| 7   | Delegowanie w AP: „Nadaj uprawnienie – osobie fizycznej do pracy dla klienta" (z identyfikatorem klienta) albo „... do pracy dla wszystkich klientów" (tylko klienci, którzy nadali biuru uprawnienia z prawem do przekazywania).                                                                              | AP s. 140-143 (T2)                                                                     | High       |
| 8   | Cały łańcuch musi istnieć i jest sprawdzany przy nawiązaniu sesji. Kolejność nadawania nie ma znaczenia (uprawnienie pracownika bywa nieaktywne do czasu uprawnienia od klienta). Odebranie uprawnień biuru powoduje, że uprawnienia pracowników zostają nadane, ale są nieaktywne.                            | cz. I s. 77-78 (T2)                                                                    | High       |
| 9   | Nadanie osobie fizycznej wprost (po NIP/PESEL): „Osobie fizycznej do pracy w KSeF"; zakres do wyboru: wystawianie faktur, przeglądanie faktur, przeglądanie uprawnień, przeglądanie historii sesji (generowania UPO), zarządzanie podmiotami podrzędnymi.                                                      | AP s. 137-138 (T2)                                                                     | High       |
| 10  | „Zarządzanie uprawnieniami" to jedno uprawnienie (nadawanie i odbieranie razem, obejmuje przeglądanie uprawnień). W AP nadaje się je przez „Dodaj administratora" (podmiot kontekstu bieżącego), co daje też zarządzanie jednostkami podrzędnymi. Osoba z tym uprawnieniem może delegować dalej na inne osoby. | cz. I s. 53-54, 71 (T2); AP s. 127 (T2)                                                | High       |
| 11  | Odebranie: Zarządzaj uprawnieniami, zaznaczyć uprawnienie na liście, „Odbierz uprawnienie", potwierdzić, „Odśwież". Odebrać może tylko osoba z uprawnieniem do zarządzania uprawnieniami. Nie można odebrać sobie prawa do zarządzania uprawnieniami ani uprawnień właścicielskich.                            | AP s. 160-161 (T2); FAQ „Najczęstsze pytania" pyt. 18 (T3); cz. I s. 57 (T2)           | High       |
| 12  | ZAW-FA: dla podatnika lub podmiotu niebędącego osobą fizyczną, który nie może uwierzytelnić się pieczęcią kwalifikowaną. Wskazuje dokładnie jedną osobę fizyczną (nie musi być z KRS), która dostaje m.in. zarządzanie uprawnieniami, wystawianie i dostęp do faktur. Kolejne osoby dodaje już elektronicznie. | Rozporządzenie Dz.U. 2025 poz. 1815 § 5 ust. 1 (T1); cz. I s. 58-60 (T2)               | High       |
| 13  | ZAW-FA(3) składa się papierowo, przez interaktywny formularz w e-US (Dokumenty, Złóż dokument) albo przez e-Doręczenia. ePUAP od 1.01.2026 nie jest skuteczny. Uprawnienia działają po wprowadzeniu danych przez urząd; e-mail z potwierdzeniem na adresy z formularza.                                        | cz. I s. 58-61 (T2); gov.pl komunikat o formularzu w e-US (T3); FAQ KSeF 2.0 pyt. 16   | High       |
| 14  | Zmiana osoby z ZAW-FA: najpierw ZAW-FA z celem „odebranie uprawnień" dla A, potem „nadanie" dla B. Odebranie A nie odbiera uprawnień osobom, które A uprawnił.                                                                                                                                                 | cz. I s. 60 (T2)                                                                       | High       |
| 15  | Odcisk palca podpisu: SHA-256, 64 znaki 0-9 i a-f. Potrzebny tylko, gdy certyfikat kwalifikowany nie zawiera NIP ani PESEL. Po przedłużeniu lub wymianie podpisu trzeba zgłosić uprawnienia ponownie. Jeśli nowy podpis nadal ma NIP/PESEL, nic nie trzeba robić.                                              | cz. I s. 33, 66 (T2); FAQ „Najczęstsze pytania" pyt. 19 (T3); FAQ KSeF 2.0 pyt. 14, 28 | High       |
| 16  | AP ma funkcję „Pobierz odcisk palca" (plik do podpisu, podpis certyfikatem, „Przekaż plik"); odcisk wpisuje się w formularzu nadania uprawnień osobie z certyfikatem bez NIP/PESEL (identyfikator „Brak", data urodzenia, dokument tożsamości).                                                                | AP s. 16-17, 139 (T2)                                                                  | High       |
| 17  | Biuro nie musi obsługiwać faktur w KSeF: wystarczy „dostęp do faktur" dla biura, jeśli podatnik wystawia sam przez program z API. Jeśli podatnik nie ma programu, można nadać wystawianie i dostęp.                                                                                                            | cz. I s. 20 (T2)                                                                       | High       |
| 18  | Uprawnienia można nadawać i w programie zintegrowanym z API KSeF 2.0; nie ma „zakładania konta", wystarcza uwierzytelnienie.                                                                                                                                                                                   | FAQ KSeF 2.0 pyt. 6, 8 (T3)                                                            | High       |

## Unsettled Questions

- Token po 31.12.2026: rozporządzenie § 13 dopuszcza tokeny do końca 2026 r., MF zapowiada ich
  utrzymanie. Nie znaleziono rozporządzenia zmieniającego (Dz.U. 2026 poz. 169 zmienia tylko § 13
  ust. 1 pkt 2 i § 15 pkt 2, daty lutowe). Post nie opiera się na tokenach.
- AP nie pokazuje „zarządzania uprawnieniami" na liście zakresu dla osoby fizycznej; nadaje się je
  przez „Dodaj administratora". Dokładne nazwy menu mogą się zmienić z kolejną edycją podręcznika.
- Czy konkretny program księgowy nadaje uprawnienia przez własny interfejs: zależy od dostawcy (poza
  zakresem).

## Suggested Sources Section

- Podręcznik KSeF 2.0 cz. I (06.08.2026):
  https://ksef.podatki.gov.pl/media/dmrfdixs/podrecznik-ksef-20-cz-i-rozpoczecie-korzystania-z-ksef-06082026.pdf
- Podręcznik użytkownika Aplikacji Podatnika KSeF 2.0 (06.08.2026):
  https://ksef.podatki.gov.pl/media/qocjn3ai/podrecznik-uzytkownika-aplikacji-podatnika-ksef-20_06082026.pdf
- FAQ MF: https://ksef.podatki.gov.pl/ksef-news/najczestsze-pytania/ i
  https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20
- Rozporządzenie Dz.U. 2025 poz. 1815: https://api.sejm.gov.pl/eli/acts/DU/2025/1815/text.pdf
- Ulotka MF „Pracownicy i księgowi":
  https://ksef.podatki.gov.pl/media/oxaev3up/ksef_dostep_pracownicy-i-ksiegowi.pdf
- ZAW-FA(3) w e-US: https://www.gov.pl/web/finanse/formularz-zaw-fa3-dostepny-w-e-us

## Warning: Common Misconceptions

- „Księgowa potrzebuje ZAW-FA." Nie, jeśli nadajesz jako osoba fizyczna prowadząca działalność.
  ZAW-FA dotyczy firm bez pieczęci kwalifikowanej i podpisów bez NIP/PESEL.
- Starsze posty i FAQ w repo mają błędy o certyfikatach i ZAW-FA. Nie kopiować.
- Numeracja pytań w FAQ: uprawnienia dla biura to pyt. 17-19 w „Najczęstszych pytaniach" (nie 17-19
  w FAQ KSeF 2.0, gdzie to pyt. 10, 13, 14).
- Aplikacja Podatnika nie przyjmuje tokena ani certyfikatu KSeF jako logowania, choć ulotka MF
  wymienia je jako „sposoby dostępu do KSeF" ogólnie.
- Jeden pośrednik nadaje dalej tylko wystawianie i dostęp do faktur, nigdy zarządzania
  uprawnieniami.
