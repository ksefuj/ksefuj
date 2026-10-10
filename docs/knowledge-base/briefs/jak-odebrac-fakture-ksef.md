# Research Brief: Jak odebrać fakturę w KSeF

**Requested by:** Orchestrator (content backlog item `jak-odebrac-fakture-ksef`) **Date:**
2026-10-10 **For content:** PL guide (section `guides`, topic `invoicing`) „Jak odebrać fakturę z
KSeF" **Persona:** Ania, JDG freelancer, kupuje usługi i towary od firm i teraz dostaje faktury
zakupowe przez KSeF

**Provenance:** built only from the repo knowledge base (baseline
`docs/knowledge-base/WATCHLIST.md`, last checked 2026-10-07: VAT Act consolidated text Dz.U. 2026
poz. 1263; Podręcznik KSeF 2.0 cz. I–IV and AP manual of 2026-08-06),
`packages/validator/docs/fa3-information-sheet.md`, and published PL posts. No official host was
reachable in this run (one curl to ksef.podatki.gov.pl: `CONNECT tunnel failed, response 403`). The
KB extract of Podręcznik cz. II (`podrecznik-ksef-20-czesc-ii.md`) is a condensed Polish summary of
the **2026-02-01** edition, not a verbatim transcript: its lines are cited as „KB extract text",
section numbers are from that edition, and page numbers appear only where a sibling brief recorded
them from the 06.08.2026 edition. The statute is held in the KB only as paraphrases cited by the
Podręcznik; there is no verbatim of art. 106gb or 106na in the KB.

## 1. Target query

„jak odebrać fakturę w KSeF"

## 2. The answer in two sentences

Nic nie musisz robić, żeby faktura do Ciebie „doszła": faktura z Twoim NIP w polu NIP nabywcy jest
dostępna po Twojej stronie w KSeF automatycznie, w chwili nadania jej numeru KSeF, który jest też
datą jej otrzymania, i nie można jej zaakceptować ani odrzucić (Podręcznik KSeF 2.0 cz. II, pkt 5,
5.1, 6.1, 6.3; ustawa o VAT art. 106na ust. 3, uchylony ust. 2). Żeby ją zobaczyć i pobrać, logujesz
się na swój NIP w darmowej Aplikacji Podatnika KSeF (albo w Aplikacji Mobilnej KSeF lub
e-mikrofirmie), korzystasz z programu połączonego z KSeF przez API albo dajesz dostęp księgowej (cz.
II pkt 3.1, 5.2, 6.2; cz. I s. 20).

## 3. What changes the answer

- **Faktura bez Twojego NIP w polu `Podmiot2/.../NIP`** (kupujesz jako konsument, sprzedawca wpisał
  NIP w złe pole lub w NrVatUE/NrID): nie trafi do Ciebie w KSeF; dostajesz ją w sposób uzgodniony,
  z kodem QR (art. 106gb ust. 4; cz. II pkt 5.2, 5.3; broszura FA(3) §6.2). Fakty 3, 14, 16.
- **Sprzedawca, który do 31.12.2026 może wystawiać poza KSeF** (limit 10 000 zł z art. 145m, faktury
  z kasy z art. 145n) albo sprzedawca zagraniczny bez siedziby / stałego miejsca w Polsce (art.
  106ga ust. 2 pkt 1–2): faktura papierowa / PDF, data otrzymania = faktyczne otrzymanie (cz. II pkt
  1.7). Fakty 17–19.
- **Tryb offline24 / niedostępność / awaria:** przy offline24 data otrzymania to data nadania numeru
  KSeF (art. 106nda ust. 11), przy fakturze otrzymanej poza KSeF przed wysłaniem — data faktycznego
  otrzymania (cz. II pkt 1.8). Dla trybu awaryjnego i awarii całkowitej KB nie podaje daty
  otrzymania. Fakty 20–22.
- **Rola na fakturze:** nabywca (Podmiot2) vs podmiot trzeci (Podmiot3, dostęp tylko do faktur, w
  których jest wskazany). Fakt 13.
- **Data:** numer KSeF w tytule przelewu (art. 108g) od 1.01.2027; limit 10 000 zł i art. 145n do
  31.12.2026. Fakty 10, 17.

## Key Facts (ready to use)

### A. Dostarczenie i data otrzymania

1. **Faktura z numerem KSeF jest automatycznie dostępna po stronie nabywcy, gdy jego NIP jest w
   `Podmiot2/DaneIdentyfikacyjne/NIP`.** KB extract text: „Faktura z numerem KSeF automatycznie
   dostępna po stronie nabywcy (gdy NIP nabywcy w Podmiot2/DaneIdentyfikacyjne/NIP)."
   - Source: Podręcznik KSeF 2.0 cz. II, pkt 5 (wstęp) i 5.2. Tier 2 (MF guidance). URL:
     https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
   - Confidence: HIGH. Ania-relevant: yes.

2. **Nie ma akceptacji odbiorcy: art. 106na ust. 2 uchylony od 1.02.2026; nabywca nie może odmówić
   otrzymywania faktur w KSeF.** KB extract text: „Od 1 lutego 2026 r. uchylony art. 106na ust. 2 —
   otrzymywanie e-Faktur nie wymaga akceptacji odbiorcy"; „W okresie obligatoryjnym nabywca nie może
   wyrazić braku akceptacji na otrzymanie faktury w KSeF." Otrzymywanie w KSeF jest obowiązkowe
   (art. 106gb ust. 1), z wyjątkiem podmiotów z art. 106gb ust. 4.
   - Source: cz. II, pkt 5 (wstęp), 6.1. Statute paraphrased by the Podręcznik (Tier 1 via Tier 2).
     URL: Podręcznik cz. II (above); ustawa: https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf
   - Confidence: HIGH. Ania-relevant: yes.

3. **Data otrzymania faktury ustrukturyzowanej = dzień przydzielenia numeru KSeF (art. 106na ust.
   3); dla nabywców z art. 106gb ust. 4 = data faktycznego otrzymania poza KSeF (art. 106na ust.
   4).** KB extract text: „Art. 106na ust. 3 — data otrzymania = dzień przydzielenia numeru KSeF."
   - Source: cz. II, pkt 5.1. Also UPO element 9: „Data nadania numeru KSeF = data otrzymania
     e-Faktury przez nabywcę" (cz. II, pkt 4.2). URL: Podręcznik cz. II; ustawa (above).
   - Confidence: HIGH. Ania-relevant: yes.

4. **Znaczenie daty otrzymania dla odliczenia VAT.** KB states the rule only in the outside-KSeF and
   offline contexts: prawo do odliczenia powstaje w okresie powstania obowiązku podatkowego, „nie
   wcześniej niż w okresie otrzymania faktury (art. 86 ust. 10b pkt 1)" (cz. II pkt 1.7, faktury
   poza KSeF); dla faktury offline24 „Datą otrzymania jest data nadania numeru KSeF", a jeśli
   nabywca dostał dokument poza KSeF wcześniej, „nabywa prawo odliczenia w dacie faktycznego
   otrzymania" (cz. II pkt 1.8 pkt 2; s. 31–32 per `awaria-ksef-offline.md` fakt 6).
   - Applying art. 86 ust. 10b pkt 1 together with art. 106na ust. 3 to an ordinary online invoice
     is a combination of two KB facts, not a sentence found in the KB. Confidence: MEDIUM.
     Ania-relevant: yes (VAT-czynna); none if Ania is VAT-exempt (no deduction).
   - **Terminy płatności liczone od otrzymania faktury: NOT IN KB.** No source in the KB links
     contractual or statutory payment terms to the KSeF receipt date. Do not state it.

5. **KSeF nie wysyła powiadomień o nowych fakturach; program musi „odpytywać" KSeF.** KB extract
   text: „KSeF nie wysyła automatycznie powiadomień o nowych fakturach. Program podatnika musi
   „odpytywać" KSeF. Nie wyklucza się takiej funkcjonalności na poziomie poszczególnych programów."
   - Source: cz. II, pkt 6.4. Confidence: HIGH. Ania-relevant: yes (sprawdzaj sama albo program).

6. **Faktura dostępna w czasie rzeczywistym, do pobrania wielokrotnie; sprzedawca nie wie, czy ją
   pobrałaś.**
   - Source: cz. II, pkt 6.5. Confidence: HIGH. Ania-relevant: yes.

### B. Jak się dostać do faktur zakupowych

7. **Bezpłatne narzędzia MF obsługują odbieranie:** Aplikacja Podatnika KSeF („wystawianie i
   odbieranie e-Faktur, podgląd, weryfikacja statusu, UPO"), Aplikacja Mobilna KSeF („wystawianie,
   odbieranie w czasie rzeczywistym"), e-mikrofirma w e-Urzędzie Skarbowym („wystawianie,
   odbieranie, przenoszenie do ewidencji VAT"); programy komercyjne przez API KSeF 2.0.
   - Source: cz. II, pkt 3.1 (KB extract text). Odbieranie bez programu zintegrowanego: cz. II pkt
     6.2 (s. 96 per `koniec-limitu-10000-zl.md` fakt 8). AP address https://ap.ksef.mf.gov.pl (AP
     manual s. 13). Mobile app page:
     https://ksef.podatki.gov.pl/aplikacja-podatnika-ksef-i-inne-narzedzia/aplikacja-mobilna-ksef/
   - Confidence: HIGH. Ania-relevant: yes.
   - **Mobile app scope caveat:** the mobile manual (per
     `aplikacja-podatnika-ksef-pierwsza-faktura.md` fakt 14) was read only for issuing; how
     receiving works in the mobile app and how one logs in to it are NOT IN KB (`logowanie-ksef.md`
     fakt 21).

8. **Logowanie w AP: login.gov.pl (Profil Zaufany, mObywatel, bankowość, e-dowód) albo kwalifikowany
   certyfikat; następnie wybór kontekstu (NIP) i „Przejdź dalej". JDG ma uprawnienia właścicielskie
   automatycznie, w tym dostęp do faktur.**
   - Source: Podręcznik AP (06.08.2026), rozdz. 4.1, s. 13–15; Podręcznik cz. I (06.08.2026), s. 57
     (per `logowanie-ksef.md` fakty 1, 8, 10). URLs:
     https://ksef.podatki.gov.pl/media/qocjn3ai/podrecznik-uzytkownika-aplikacji-podatnika-ksef-20_06082026.pdf
     ;
     https://ksef.podatki.gov.pl/media/dmrfdixs/podrecznik-ksef-20-cz-i-rozpoczecie-korzystania-z-ksef-06082026.pdf
   - Confidence: HIGH. Ania-relevant: yes. Full topic: link `/guides/logowanie-ksef`.

9. **Lista faktur w AP: zaznacz faktury → „Pobierz" → format; plik nazwany numerem KSeF; 1–10 faktur
   na operację, przy kilku ZIP.** Dostęp anonimowy oferuje XML lub PDF (AP s. 21).
   - Source: Podręcznik AP (06.08.2026), s. 116–117, 21 (per
     `aplikacja-podatnika-ksef-pierwsza-faktura.md` fakt 10). Confidence: HIGH.
   - **NOT SETTLED:** whether the logged-in list „Pobierz" offers PDF (manual says „format"; that
     brief's Unsettled). **NOT IN KB:** the AP menu/filter names for received invoices (e.g.
     „faktury otrzymane", filtering by role Podmiot2/nabywca, search fields). The published guide
     `/guides/pierwsza-faktura-fa3` says „skrzynka odbiorcza" (test env.); that is our output, not
     an MF source. Do not name menu items until the AP manual is re-read.

10. **Numer KSeF: 35 znaków (`NIP-RRRRMMDD-12 znaków hex-2 znaki`), nie ma go w pliku XML, zwraca go
    KSeF (UPO); sprzedawca nie musi Ci go wysyłać, bo „faktura pojawia się w systemie odbiorcy
    automatycznie".** Od 1.01.2027 płacąc przelewem czynnemu podatnikowi VAT za e-Fakturę podajesz
    numer KSeF lub identyfikator zbiorczy (art. 108g), o ile sama jesteś czynna (cz. II pkt 4.1.5).
    - Source: cz. II pkt 4.1 (s. 70), 4.1.5; FAQ „Najczęstsze pytania" Q7; FAQ KSeF 2.0 („Czy trzeba
      wysyłać kontrahentowi numer KSeF faktury?") — per `numer-ksef-w-przelewie.md` fakty 8–10,
      `mf-faq-podreczniki-2026.md` fakt 1. URLs:
      https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/numer-ksef-i-zbiorczy-identyfikator/ ;
      https://ksef.podatki.gov.pl/ksef-news/najczestsze-pytania/ ;
      https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20/
    - Confidence: HIGH. Ania-relevant: yes. Full topic: link `/blog/numer-ksef-w-przelewie`.

11. **Księgowa / biuro: nadajesz uprawnienie „przeglądanie faktur" (w systemie „dostęp do
    faktur").** Ścieżka AP: Uprawnienia → Nadaj uprawnienie → „Podmiotowi do wystawiania i
    przeglądania faktur" (biuro po NIP) albo „Osobie fizycznej do pracy w KSeF". Biuro nie musi
    obsługiwać wystawiania: wystarczy „dostęp do faktur".
    - Source: FAQ „Najczęstsze pytania" pyt. 17; Podręcznik AP s. 137–138, 145; cz. I s. 20 (per
      `uprawnienia-ksef-ksiegowa.md` fakty 4, 9, 17). Confidence: HIGH. Ania-relevant: yes. Full
      topic: link `/guides/uprawnienia-ksef-ksiegowa`.

12. **Program księgowy: dostęp przez API (podpis XAdES lub token KSeF / certyfikat KSeF); token i
    certyfikat KSeF nie służą do logowania w AP.** Tokeny: rozporządzenie pozwala do 31.12.2026 (§
    13 Dz.U. 2025 poz. 1815), MF zapowiedziało ich utrzymanie (cz. I s. 26), akt zmieniający
    nieopublikowany.
    - Source: `logowanie-ksef.md` fakty 3, 4, 16–18; `rozporzadzenie-ksef-i-tokeny.md`. Confidence:
      HIGH (mechanism), freshness-sensitive (tokens). Ania-relevant: low (program does it).

### C. Role i konteksty

13. **Dostęp według roli:** nabywca (Podmiot2) — na podstawie NIP w polu NIP, po uwierzytelnieniu i
    przez uprawnionych; Podmiot3 — gdy wskazany jest jego NIP lub IDWew, „Dostęp tylko do faktur, w
    których występuje jako Podmiot3"; PodmiotUpowazniony (komornik, organ egzekucyjny,
    przedstawiciel podatkowy) — faktury wystawione w imieniu sprzedawcy.
    - Source: cz. II, pkt 5.2. Podmiot3 roles 1–11 (np. 4 dodatkowy nabywca, 6 dokonujący płatności,
      11 pracownik): cz. II pkt 2.2; broszura FA(3) §7.3. Confidence: HIGH.
    - **NOT IN KB:** how a JDG that appears in several roles (np. nabywca na jednych, Podmiot3 na
      innych) sees them in AP (one list or separate views). Login context is the NIP chosen at login
      (fakt 8); for a JDG that is its own NIP. Ania-relevant: low.

14. **NIP nabywcy musi być w polu NIP, inaczej nabywca nie dostanie faktury w KSeF; faktura z
    błędnym NIP jest przypisana do podmiotu o tym NIP.** KB extract text: „NIP nabywcy musi być w
    polu NIP (nie NrVatUE ani NrID), inaczej nabywca nie otrzyma faktury w KSeF."
    - Source: cz. II pkt 5.2, 1.6.4; broszura FA(3) §6.2 („The invoice will only be correctly made
      available to the purchaser if their NIP is in the `NIP` field."). Broszura URL:
      https://ksef.podatki.gov.pl/media/nuclnu0w/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf
    - Confidence: HIGH. Ania-relevant: yes (sprawdź, że podajesz sprzedawcy NIP).

### D. Faktura poza KSeF, kod QR, weryfikacja

15. **Nabywcy z art. 106gb ust. 4 dostają fakturę w sposób uzgodniony, z kodem/kodami QR:** miejsce
    świadczenia poza Polską; podmiot bez siedziby/stałego miejsca w PL; stałe miejsce w PL
    nieuczestniczące w transakcji; podatnik UE w procedurze SME (art. 113a ust. 1); podmiot bez NIP;
    konsument. Ustawa nie wskazuje sposobu uzgodnienia ani formy (FAQ Q25).
    - Source: cz. II pkt 1.6.5, 5.3.1; FAQ KSeF 2.0 Q25 (per
      `aplikacja-podatnika-ksef-pierwsza-faktura.md` fakt 13; FAQ numbering unreliable). Confidence:
      HIGH. Ania-relevant: only when she buys privately (fakt 16).

16. **Ania kupująca prywatnie (bez NIP) = konsument:** sprzedawca nie musi wystawiać w KSeF (art.
    106ga ust. 2 pkt 4); jeśli wystawi, przekazuje fakturę w uzgodniony sposób z kodem QR, a ona
    może ją pobrać bez logowania (QR + dane albo dostęp anonimowy). Data otrzymania = faktyczne
    otrzymanie.
    - Source: `faktura-dla-osoby-prywatnej-ksef.md` fakty 1, 5, 7, 8, 17; cz. II pkt 5.3.2, 5.5,
      5.7.
    - **NOT SETTLED:** who decides whether a JDG owner buys privately or for the business, and
      whether giving / not giving NIP changes it (`faktura-dla-osoby-prywatnej-ksef.md` fakt 10).
      Also NOT IN KB: whether a person can see in AP invoices addressed to them without NIP.

17. **Kod QR (KOD I) na fakturze używanej poza KSeF:** online → jeden kod z numerem KSeF pod nim;
    offline bez numeru → dwa kody („OFFLINE" = KOD I, „CERTYFIKAT" = KOD II). KOD I zawiera: adres
    zasobu, datę wystawienia (P_1), NIP sprzedawcy, wyróżnik (skrót SHA-256 pliku XML).
    - Source: cz. II pkt 1.6.5, 5.4.1, 5.4.3. Confidence: HIGH. Ania-relevant: yes (PDF/papier od
      sprzedawcy).

18. **Weryfikacja kopii PDF/papierowej przez QR (dostęp dwuetapowy):** krok 1 skan → podstawowe dane
    (nr KSeF, NIP sprzedawcy, data wystawienia, skrót, data nadania numeru, tryb, „informacja o
    zgodności") „lub informacja o braku faktury w KSeF"; krok 2 → P_2, identyfikator nabywcy lub
    informacja o braku, P_15 → pobranie XML lub PDF bez uwierzytelnienia; kilka błędnych prób →
    czasowa blokada. KOD II (offline) sprawdza, czy certyfikat wystawcy jest aktywny i czy ma
    uprawnienia. Bez QR: dostęp anonimowy w AP (nr KSeF, P_2, NIP nabywcy, nazwa nabywcy, P_15; „§ 8
    rozporządzenia").
    - Source: cz. II pkt 5.5, 5.6, 5.7, 6.2 (ostatni akapit). Confidence: HIGH. The KB does not
      identify which regulation „§ 8" refers to (presumably Dz.U. 2025 poz. 1815, NOT VERIFIED).
      Ania-relevant: yes.

19. **Faktury poza KSeF w 2026 r. (luty–grudzień):** odliczenie „nie wcześniej niż w okresie
    otrzymania faktury", moment otrzymania = faktyczne otrzymanie; prawo do odliczenia zachowane,
    nawet gdy dostawca pominął obowiązek KSeF, jeśli spełnione art. 86 i brak art. 88; nabywca nie
    musi weryfikować, czy faktura mogła być poza KSeF, ale powinien zachować należytą staranność.
    FAQ: brak faktury w KSeF to „uchybienie formalne" (Q4); brak automatycznych negatywnych skutków
    dla nabywcy (Q1/Q2).
    - Source: cz. II pkt 1.7; FAQ „Najczęstsze pytania" Q1, Q2, Q4 (per `mf-faq-podreczniki-2026.md`
      fakt 1). Confidence: HIGH. Ania-relevant: yes (dostawcy w limicie 10 000 zł do 31.12.2026).
    - Legal basis for those sellers: art. 145m (limit 10 000 zł brutto miesięcznie) i 145n (kasy) do
      31.12.2026 (CLAUDE.md; `koniec-limitu-10000-zl.md`); sprzedawcy zagraniczni bez siedziby /
      stałego miejsca w PL poza obowiązkiem (art. 106ga ust. 2 pkt 1–2;
      `faktura-dla-osoby-prywatnej-ksef.md` fakt 1).

### E. Tryby offline

20. **Offline24:** data otrzymania = data nadania numeru KSeF (art. 106nda ust. 11), chyba że
    nabywca z art. 106gb ust. 4 (faktyczne otrzymanie). Nabywca z krajowym NIP otrzymuje fakturę
    wyłącznie w KSeF (art. 106nda ust. 3); sprzedawca wysyła ją najpóźniej następnego dnia roboczego
    (ust. 2).
    - Source: `awaria-ksef-offline.md` fakty 3, 4, 6; published guide `/guides/awaria-ksef-offline`.
      Confidence: HIGH.

21. **Przed nadaniem numeru sprzedawca może dać Ci „potwierdzenie transakcji" z dwoma kodami QR; to
    „propozycja biznesowa, nie dokument podatkowy".** Faktura offline24 otrzymana poza KSeF przed
    wysłaniem: odliczenie z dniem faktycznego otrzymania, ale to „działanie nieprawidłowe"
    sprzedawcy.
    - Source: cz. II pkt 1.6.6, 1.8 (s. 22–26, 31–32 per `awaria-ksef-offline.md` fakt 6).
      Confidence: HIGH.

22. **Tryb awaryjny (art. 106nf):** faktura „wydawana nabywcy poza KSeF z dwoma kodami QR"; do KSeF
    w 7 dni roboczych od końca awarii. **Awaria całkowita (art. 106ng):** faktur nie przesyła się do
    KSeF.
    - Source: cz. II pkt 1.6.6; `awaria-ksef-offline.md` fakt 3. Confidence: HIGH.
    - **NOT IN KB:** the date of receipt for a domestic NIP buyer of an awaria (106nf) or awaria
      całkowita (106ng) invoice, and for niedostępność (106nh; UD477 adds a cross-reference to
      106nda ust. 3, `awaria-ksef-offline.md` fakt 6). Do not state.

### F. Przechowywanie i moc prawna kopii

23. **KSeF przechowuje faktury 10 lat od końca roku wystawienia; w tym okresie nie stosuje się art.
    112 i 112a (brak obowiązku przechowywania we własnym zakresie); jeśli zobowiązanie przedawnia
    się później, trzeba pobrać faktury z wyprzedzeniem i przechowywać poza KSeF.** Przykład MF:
    wysyłka 5.02.2026 → w KSeF do 31.12.2036. Administracja ma dostęp → nie dostarczasz faktur do
    US. Faktur nie można usuwać.
    - Source: cz. II pkt 7, 1.6.3; FAQ „Najczęstsze pytania" Q21. Confidence: HIGH. Ania-relevant:
      yes.
    - Note: pkt 7 speaks of „podatnik" generally; KB has no separate sentence for the buyer side.
      Confidence for buyer: HIGH by wording, no counter-source.

24. **Moc prawna PDF/papieru:** e-Faktura = faktura wystawiona przy użyciu KSeF z przydzielonym
    numerem (cz. II pkt 1.1). Sprzedawcy objęci obowiązkiem nie wydają faktur poza systemem nabywcom
    krajowym z NIP, mogą wydać potwierdzenie transakcji (cz. II pkt 6.2). Wizualizacja poza KSeF
    musi być spójna z XML i nie może mu przeczyć; może zawierać dodatkowe dane (logo) i być w innym
    języku (pkt 1.6.5).
    - Confidence: HIGH for these statements. **NOT SETTLED:** the KB has no MF sentence saying
      „wizualizacja/PDF z KSeF nie jest fakturą" or ranking PDF vs XML for a KSeF buyer. Published
      post `/blog/ksef-checklist-przygotowanie` says „dokumentem prawnym jest plik XML
      zarejestrowany w KSeF" (our output, not a source). Do not upgrade beyond fact 24's statements.

### G. Błędna lub fałszywa faktura

25. **Nie da się odrzucić faktury: „KSeF nie posiada opcji zatwierdzania/odrzucania faktur. Spory
    rozstrzygane poza systemem."** Poprawia ją tylko sprzedawca fakturą korygującą (bez edycji,
    anulowania, usuwania); od 1.02.2026 „nie funkcjonują już noty korygujące". Błędny nabywca →
    korekta „do zera" + nowa faktura.
    - Source: cz. II pkt 6.3, 1.6.2, 1.6.3, 1.6.4. Confidence: HIGH. Ania-relevant: yes.
      Corrections: link `/blog/faktura-korygujaca-ksef`.

26. **Ukrycie faktury i zgłoszenie faktury scamowej:** cz. II (01.02.2026) mówi, że nabywca „może
    skorzystać z opcji ukrycia faktury lub zgłoszenia faktury scamowej", wdrażanych „kilka miesięcy
    po uruchomieniu KSeF 2.0", opisanych w cz. III.
    - Source: cz. II pkt 6.3 (KB extract text). Confidence: HIGH that MF announced them.
    - **NOT SETTLED:** availability date and mechanics. Podręcznik cz. III is NOT extracted in the
      KB; `faktury-scamowe.md` marks all cz. III claims MEDIUM / not read. The published post
      `/blog/falszywe-faktury-ksef` states „Od 1 kwietnia 2026" reporting in AP, one report per
      invoice, only the buyer, withdrawable — none of this is backed by a KB extract of an MF
      document. `mf-faq-podreczniki-2026.md` notes §6.3 changed in the 06.08.2026 edition (content
      of the change not recorded). Link the post; do not restate its details as MF facts.
    - Whether a scam invoice in Ania's KSeF has tax effect for her: `faktury-scamowe.md` fakty
      2.1–2.2, MEDIUM, art. 88 not read. NOT SETTLED.

### H. Kto musi odbierać

27. **Odbieranie w KSeF obowiązuje od 1.02.2026, niezależnie od odroczenia wystawiania (1.04.2026 /
    1.01.2027).** KB extract text: „Odroczenie terminów dotyczy wyłącznie wystawiania faktur, nie
    ich otrzymywania. Otrzymywanie w KSeF jest obowiązkowe od 1.02.2026 r." Program zintegrowany nie
    jest wymagany.
    - Source: cz. II pkt 6.2 (s. 96); FAQ „Poniżej 10 000 zł" pyt. 4 (per
      `koniec-limitu-10000-zl.md` fakt 8; URL https://ksef.podatki.gov.pl/ponizej-10-000-zl/).
      Confidence: HIGH. Ania-relevant: yes.
    - Taxpayer below 10 000 zł (art. 145m): the 6.2 statement covers buyers who issue only from
      1.04.2026 / 1.01.2027, i.e. this group. HIGH.
    - VAT-exempt (art. 113) buyer: KB has no exempt-specific sentence on receiving; the mechanism
      (fact
      1. depends only on the NIP in Podmiot2, and pkt 6.1/6.2 state the obligation generally.
         MEDIUM.

## Unsettled Questions

- AP menu names / filters for received invoices; PDF in the logged-in „Pobierz" list (fact 9).
- How receiving works in the mobile app and how one logs in to it (fact 7).
- Payment terms vs KSeF receipt date (fact 4): not in KB.
- Receipt date of awaria (106nf), awaria całkowita (106ng) and niedostępność (106nh) invoices for a
  domestic NIP buyer (fact 22).
- Legal weight of a PDF/visualisation vs XML for a KSeF buyer (fact 24).
- Ukrycie / zgłoszenie scamu: availability and mechanics (cz. III not extracted) (fact 26).
- JDG buying privately vs for the business, and its effect on KSeF delivery (fact 16).
- JDG in several roles: how invoices appear in AP (fact 13).
- Which regulation's „§ 8" governs anonymous access (fact 18).
- Verbatim of art. 106na ust. 3–4, 106gb ust. 1 and 4: only paraphrases via the Podręcznik.

## Already covered in published PL posts (link, don't restate)

- `/guides/logowanie-ksef` (login, context), `/guides/uprawnienia-ksef-ksiegowa` (access for the
  accountant), `/guides/awaria-ksef-offline` (offline24 dates, QR codes, potwierdzenie transakcji),
  `/guides/aplikacja-podatnika-ksef-pierwsza-faktura` (AP basics, art. 106gb ust. 4 from the seller
  side), `/blog/numer-ksef-w-przelewie`, `/blog/faktura-korygujaca-ksef`,
  `/blog/falszywe-faktury-ksef`, `/blog/faktura-dla-osoby-prywatnej-ksef`,
  `/blog/koniec-limitu-10000-zl`.

## Suggested Sources Section

All URLs below already appear in `docs/knowledge-base/` or a published post.

- Podręcznik KSeF 2.0 cz. II (06.08.2026), pkt 1.1, 1.6.2–1.6.6, 1.7, 1.8, 3.1, 4.1, 4.2, 5–7:
  https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
  (section numbers from the 01.02.2026 edition; check they did not shift)
- Podręcznik KSeF 2.0 cz. I (06.08.2026), s. 20, 26, 57:
  https://ksef.podatki.gov.pl/media/dmrfdixs/podrecznik-ksef-20-cz-i-rozpoczecie-korzystania-z-ksef-06082026.pdf
- Podręcznik użytkownika Aplikacji Podatnika KSeF 2.0 (06.08.2026), rozdz. 4.1, s. 13–15, 21,
  116–117, 137–138, 145:
  https://ksef.podatki.gov.pl/media/qocjn3ai/podrecznik-uzytkownika-aplikacji-podatnika-ksef-20_06082026.pdf
- Ustawa o VAT, tekst jednolity Dz.U. 2026 poz. 1263 (art. 86 ust. 10b, 106ga, 106gb, 106na, 106nda,
  106nf, 106ng, 108g, 112, 112a, 145m, 145n): https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf
- FAQ KSeF 2.0: https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20/
- FAQ „Najczęstsze pytania" (Q1, Q2, Q4, Q7, Q17, Q21):
  https://ksef.podatki.gov.pl/ksef-news/najczestsze-pytania/
- FAQ „Poniżej 10 000 zł" (pyt. 4): https://ksef.podatki.gov.pl/ponizej-10-000-zl/
- Numer KSeF i zbiorczy identyfikator:
  https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/numer-ksef-i-zbiorczy-identyfikator/
- Aplikacja mobilna KSeF:
  https://ksef.podatki.gov.pl/aplikacja-podatnika-ksef-i-inne-narzedzia/aplikacja-mobilna-ksef/
- Aplikacja Podatnika KSeF 2.0: https://ap.ksef.mf.gov.pl
- Broszura FA(3), §6.2 (Podmiot2/NIP):
  https://ksef.podatki.gov.pl/media/nuclnu0w/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf

## Not fetched live

Nothing was fetched in this run (egress to ksef.podatki.gov.pl blocked, HTTP 403 from proxy; other
official hosts not retried). Every item below is cited from the KB or a published post only:

- Podręcznik KSeF 2.0 cz. II PDF (06.08.2026) — all pkt cited; KB extract is of the 01.02.2026
  edition
- Podręcznik KSeF 2.0 cz. I PDF (06.08.2026) — s. 20, 26, 57
- Podręcznik Aplikacji Podatnika PDF (06.08.2026) — s. 13–15, 21, 116–117, 137–138, 145
- Podręcznik KSeF 2.0 cz. III — not in KB at all (no URL cited)
- Mobile app manual (31.08.2026) — via https://ksef.podatki.gov.pl/pliki-do-pobrania-ksef-20/
- https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf — art. 86 ust. 10b pkt 1, 106ga ust. 2 pkt
  1–2 and 4, 106gb ust. 1 and 4, 106na ust. 2 (uchylony), 3, 4, 106nda ust. 2, 3, 11, 106nf, 106ng,
  106nh, 108g, 112, 112a, 145m, 145n
- Rozporządzenie Dz.U. 2025 poz. 1815 (§ 8 anonymous access — attribution unverified; § 13 tokens)
- https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20/ (Q25, numer KSeF question)
- https://ksef.podatki.gov.pl/ksef-news/najczestsze-pytania/ (Q1, Q2, Q4, Q7, Q17, Q21)
- https://ksef.podatki.gov.pl/ponizej-10-000-zl/ (pyt. 4)
- https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/numer-ksef-i-zbiorczy-identyfikator/
- https://ksef.podatki.gov.pl/aplikacja-podatnika-ksef-i-inne-narzedzia/aplikacja-mobilna-ksef/
- https://ap.ksef.mf.gov.pl
- https://ksef.podatki.gov.pl/media/nuclnu0w/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf
  (local conversion `packages/validator/docs/fa3-information-sheet.md` §6.2 read)

## Warning: Common Misconceptions

- „Musisz zaakceptować fakturę w KSeF" / „możesz ją odrzucić" — art. 106na ust. 2 (acceptance) is a
  KSeF 1.0 / fakultatywny-period rule, repealed from 1.02.2026; no reject option (cz. II pkt 6.1,
  6.3). Stale-claims candidate.
- „Sprzedawca musi przysłać Ci numer KSeF / PDF mailem, żeby faktura była doręczona" — no; the
  invoice appears automatically (FAQ; cz. II pkt 5). A PDF is optional and must match the XML.
- „Dostaniesz powiadomienie o nowej fakturze" — KSeF sends none (cz. II pkt 6.4).
- „Datą otrzymania jest dzień, w którym otworzysz fakturę" — no: day the KSeF number is assigned
  (art. 106na ust. 3), regardless of when you download it.
- „Skoro wystawiam w KSeF dopiero od 2027 (limit 10 000 zł), nie muszę odbierać" — receiving applies
  from 1.02.2026 (cz. II pkt 6.2).
- „Musisz pobierać i archiwizować faktury z KSeF" — not during the 10-year KSeF storage (cz. II pkt
  7); only if the limitation period runs longer.
- „Faktura z błędnym NIP wróci do sprzedawcy" — it is assigned to the holder of that NIP (cz. II pkt
  1.6.4).

## Freshness

2026-10-10. Review when: a new Podręcznik cz. II / AP / mobile manual edition appears; cz. III is
extracted (ukrycie / scam reporting); gov.pl becomes reachable (verbatim art. 106gb, 106na; AP menu
names); after 2026-12-31 (art. 145m/145n expiry, tokens); 2027-01-01 (art. 108g in force); UD477
publication (106nh cross-reference).
