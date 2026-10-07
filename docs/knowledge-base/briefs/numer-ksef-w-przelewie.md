# Research Brief: Numer KSeF w przelewie i split payment

**Requested by:** human (backlog item `numer-ksef-w-przelewie`) **Date:** 2026-10-07 **For
content:** „Numer KSeF w przelewie od 2027: kiedy i jak" (`pl/blog/numer-ksef-w-przelewie`)

**Target query:** „numer KSeF w przelewie"

**Answer in two sentences:** Od płatności dokonanych od 1 stycznia 2027 r. nabywca będący czynnym
podatnikiem VAT, płacąc przelewem za fakturę ustrukturyzowaną innemu czynnemu podatnikowi VAT, musi
podać w tytule numer KSeF faktury, a przy płatności za kilka faktur identyfikator zbiorczy nadany
przez KSeF (art. 108g ustawy o VAT; art. 17 ustawy nowelizującej z 16.06.2023, cytowany w
obwieszczeniu Dz.U. 2026 poz. 1263, s. 2). W podzielonej płatności (MPP) numer KSeF trafia do
komunikatu przelewu na tej samej zasadzie (art. 108a ust. 3 pkt 3), a do tego czasu obowiązek jest
odroczony.

**What changes the answer:**

- Moment płatności, nie data faktury: przepisy stosuje się „do płatności dokonanych od dnia 1
  stycznia 2027 r." (art. 17 ustawy z 16.06.2023, w obwieszczeniu Dz.U. 2026 poz. 1263, s. 2).
- Status stron: obowiązek ma nabywca zarejestrowany jako podatnik VAT czynny, płacący na rzecz
  innego podatnika VAT czynnego; status odbiorcy ustala się wg wykazu z art. 96b na dzień płatności
  (art. 108g ust. 1 i 3).
- Rodzaj faktury: faktury ustrukturyzowane oraz faktury offline24 (art. 106nda ust. 1) i offline
  przy niedostępności (art. 106nh ust. 1). Faktury z awarii (art. 106nf) nie są wymienione w ust. 1;
  MF potwierdza, że obowiązek ich nie dotyczy (Podręcznik cz. II, s. 75).
- Wyłączenie z ust. 4: faktury offline24 / offline-niedostępność niewprowadzone do KSeF w związku z
  komunikatem o awarii (art. 106ne ust. 1 i 3).
- Instrument płatniczy: polecenie przelewu lub inny instrument umożliwiający podanie tytułu; przy
  poleceniu zapłaty obowiązek ma wystawca faktury (ust. 2). Płatność przez podmiot trzeci też objęta
  (ust. 1 zd. 2).

## Key Facts (ready to use)

1. **Art. 108g ust. 1 (rozdział 1b „Oznaczanie płatności za faktury"):** „Nabywca towaru lub usługi
   zarejestrowany jako podatnik VAT czynny, dokonujący płatności za faktury ustrukturyzowane oraz
   faktury, o których mowa w art. 106nda ust. 1 i art. 106nh ust. 1, na rzecz innego podatnika
   zarejestrowanego jako podatnik VAT czynny, za pośrednictwem polecenia przelewu [...] lub innego
   instrumentu płatniczego [...] umożliwiającego podanie tytułu transferu środków pieniężnych, jest
   obowiązany do podania numeru identyfikującego te faktury w Krajowym Systemie e-Faktur lub
   identyfikatora zbiorczego nadanego przez Krajowy System e-Faktur." Obowiązek dotyczy też
   podatnika innego niż nabywca, płacącego za faktury wystawione na rzecz nabywcy. — Dz.U. 2026 poz.
   1263, art. 108g ust. 1 (PDF s. 141) Confidence: HIGH (Tier 1) Ania-relevant: yes
2. **Termin:** „Przepisy: 1) art. 108a ustawy zmienianej w art. 1, w brzmieniu nadanym niniejszą
   ustawą, 2) art. 108g ustawy zmienianej w art. 1 – stosuje się do płatności dokonanych od dnia 1
   stycznia 2027 r." — art. 17 ustawy z 16.06.2023 (Dz.U. poz. 1598 ze zm.), cytowany w
   obwieszczeniu Dz.U. 2026 poz. 1263, PDF s. 2 Confidence: HIGH (Tier 1)
3. **MPP:** art. 108a ust. 3 pkt 3: komunikat przelewu MPP zawiera „numer faktury, w związku z którą
   dokonywana jest płatność, a w przypadku faktury ustrukturyzowanej – numer identyfikujący tę
   fakturę w Krajowym Systemie e-Faktur". Pozostałe elementy: kwota VAT (pkt 1), kwota brutto (pkt
   2), numer identyfikujący dostawcę na potrzeby podatku (pkt 4). — Dz.U. 2026 poz. 1263, PDF s. 137
   Confidence: HIGH (Tier 1)
4. **MPP jest dobrowolny co do zasady** (art. 108a ust. 1 „mogą zastosować"); obowiązkowy m.in. dla
   towarów i usług z załącznika nr 15 przy fakturze powyżej 15 000 zł (ust. 1a). — PDF s. 136
   Confidence: HIGH Ania-relevant: partly
5. **Płatność za kilka faktur w MPP:** jeden dostawca, faktury z okresu od 1 dnia do 1 miesiąca
   (ust. 3a). Dla faktur ustrukturyzowanych komunikat „obejmuje dowolne faktury" z tego okresu (ust.
   3b pkt 1a), a zamiast numeru faktury wpisuje się identyfikator zbiorczy nadany przez KSeF (ust.
   3c pkt 2). Dla faktur spoza KSeF: wszystkie faktury z okresu i wpisanie okresu (ust. 3b pkt 1,
   ust. 3c pkt 1). — PDF s. 137 Confidence: HIGH
6. **MF o zbiorczym identyfikatorze:** „numerem agregującym, nadawanym dla co najmniej dwóch faktur
   ustrukturyzowanych wystawianych przez danego sprzedawcę"; do wygenerowania trzeba zadeklarować
   listę numerów KSeF; może go wygenerować wystawca albo odbiorca; możliwe w Aplikacji Podatnika i w
   systemach połączonych z API; KSeF pozwala go rozkodować i sprawdzić, w jakich identyfikatorach
   zawarto dany numer; 35 znaków (NIP, „IZ", rok i miesiąc, 12 znaków, 2 cyfry kontrolne). Przykład
   MF: `9999999999-IZ202602-FFFFFFFFFFFF-FF`. — ksef.podatki.gov.pl, „Numer KSeF i zbiorczy
   identyfikator" (zmodyfikowano 06.02.2026) Confidence: HIGH (Tier 3 / guidance)
7. **MF o płatności za jedną i za kilka faktur:** „płatności za pojedynczą fakturę - podawany będzie
   numer KSeF faktury; płatności za więcej niż jedną fakturę - podawany będzie zbiorczy
   identyfikator dla zbioru faktur". W MPP nabywca „będzie mógł dokonać płatności za kilka wybranych
   faktur, a nie jak dotychczas za wszystkie faktury wystawione dla niego przez jednego dostawcę w
   danym okresie". — ta sama strona MF Confidence: HIGH (guidance)
8. **Numer KSeF:** 35 znaków, format `NIP-RRRRMMDD-12 znaków hex-2 znaki CRC-8`; przykład z
   dokumentacji MF: `5265877635-20250826-0100001AF629-AF`. Nie jest elementem pliku XML; zwracany w
   UPO; FA(3) ma tylko numer własny w P_2. — Podręcznik cz. II, pkt 4.1 (s. 70); CIRFMF/ksef-docs,
   `faktury/numer-ksef.md`; MF „Numer KSeF i zbiorczy identyfikator" Confidence: HIGH
9. **Skąd kupujący bierze numer:** FAQ MF („Czy trzeba wysyłać kontrahentowi numer KSeF faktury?"):
   „Czy trzeba wysyłać kontrahentowi numer KSeF faktury? Nie ma takiego obowiązku, ponieważ faktura
   pojawia się w systemie odbiorcy automatycznie." Numer pod kodem QR dla faktury używanej poza KSeF
   (Podręcznik cz. II, s. 71). Confidence: HIGH (guidance)
10. **Odroczenie wg MF:** strona „Podstawy prawne oraz kluczowe terminy": „Do końca 2026 r.
    odroczony jest obowiązek podawania numeru KSeF faktury podczas płatności pomiędzy podatnikami
    czynnymi (art. 108g ustawy o podatku od towarów i usług) oraz w ramach MPP." FAQ MF („Od kiedy
    będę musiał zamieszczać numer KSeF w przelewie (w tytule płatności)?"): art. 108g stosuje się do
    płatności od 1.01.2027, w tym samym terminie art. 108a ust. 3 pkt 3. Confidence: HIGH (guidance
    zgodne z Tier 1)
11. **Awaria:** Podręcznik cz. II, s. 75: obowiązek „nie dotyczy m.in. faktur wystawianych podczas
    awarii KSeF (w trybie określonym w art. 106nf ustawy)"; ust. 4 wyłącza faktury offline24 i
    offline-niedostępność niewprowadzone do KSeF z powodu ogłoszonej awarii. Confidence: HIGH
12. **Brak sankcji w tekście jednolitym:** fraza „108g" występuje w tekście jednolitym tylko w
    nagłówku artykułu i w cytowanym art. 17; art. 106ni (kary do 100% VAT / 18,7% należności)
    dotyczy niewystawienia faktury w KSeF, wystawienia niezgodnie ze wzorem i niewysłania w
    terminie, nie płatności; art. 108a ust. 7 (30% VAT) dotyczy naruszenia ust. 1a, nie numeru KSeF.
    Confidence: HIGH jako negatywne ustalenie z tekstu; to nie jest interpretacja o skutkach.
13. **Limit 10 000 zł (art. 145m):** do 31.12.2026 faktury w ramach limitu mogą być poza KSeF (MF:
    „elektroniczne lub w postaci papierowej"); art. 108g ust. 1 nie wymienia faktur papierowych ani
    elektronicznych spoza KSeF, więc dla nich numeru KSeF nie ma i przepis ich nie obejmuje. Od 2027
    bez limitu. Confidence: HIGH dla tekstu; wniosek o braku obowiązku wynika z brzmienia ust. 1.
14. **Kary w KSeF odroczone** (komunikat MF 16.09.2026, projekt UD477): dotyczy art. 106ni ust. 1-3,
    5-7; nie znaleźliśmy w komunikacie ani w materiałach MF żadnej zmiany terminu dla art. 108g /
    art. 108a ust. 3. Tekst projektu UD477 z 22.09.2026 (RCL, dokument798515.docm) zmienia tylko
    art. 106nd ust. 2 pkt 8, art. 106nh ust. 4 i art. 145e ust. 1 ustawy o VAT oraz art. 106ni ust.
    1 pkt 2 i art. 23 ustawy z 16.06.2023; art. 108a, art. 108g i art. 17 tej ustawy pozostają bez
    zmian (sprawdzono 2026-10-07). Confidence: HIGH (wersja projektu z 22.09.2026)

## Unsettled Questions

- Faktura offline, której sprzedawca jeszcze nie wysłał do KSeF, bez ogłoszonej awarii: numeru
  jeszcze nie ma, a ust. 4 wyłącza tylko przypadek awarii. Źródła nie mówią, co wpisać.
- Jeden przelew obejmujący faktury ustrukturyzowane i faktury spoza KSeF (np. papierowa z 2026 r.):
  ust. 3b rozróżnia oba przypadki dla MPP, ale nie opisuje mieszanego zestawu. Dla przelewu zwykłego
  art. 108g nic o tym nie mówi.
- Limit liczby faktur w jednym identyfikatorze zbiorczym i pozostałe szczegóły techniczne: odsyłają
  do Podręcznika KSeF 2.0 cz. III, którego nie czytaliśmy.
- Jak banki zaprezentują pole numeru KSeF w formularzu przelewu i czy zmieszczą 35 znaków: nie
  sprawdzaliśmy; poza źródłami MF.
- Konsekwencje naruszenia art. 108g: tekst jednolity nie przypisuje mu sankcji; nie sprawdzaliśmy
  interpretacji ani praktyki organów (eureka.mf.gov.pl).
- Czy projekt UD477 lub inna zmiana przesunie termin 2027-01-01 dla art. 108g: brak takiej
  informacji w sprawdzonych źródłach.

## Suggested Sources Section

- Ustawa o VAT, tekst jednolity Dz.U. 2026 poz. 1263 (art. 108a ust. 3-3c, art. 108g, art. 17 ustawy
  z 16.06.2023 w obwieszczeniu): https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf
- MF, „Numer KSeF i zbiorczy identyfikator":
  https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/numer-ksef-i-zbiorczy-identyfikator/
- MF, „Podstawy prawne oraz kluczowe terminy":
  https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/podstawy-prawne-oraz-kluczowe-terminy/
- MF, FAQ KSeF 2.0 (pytania o numer KSeF w przelewie; numeracja pytań się zmienia, cytujemy po
  treści): https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20/
- Podręcznik KSeF 2.0 cz. II, pkt 4.1.4-4.1.5 (s. 73-75):
  https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
- CIRFMF/ksef-docs, struktura numeru KSeF:
  https://github.com/CIRFMF/ksef-docs/blob/main/faktury/numer-ksef.md
- MF, odroczenie kar (16.09.2026):
  https://www.gov.pl/web/finanse/przedluzenie-odroczenia-kar-za-bledy-w-stosowaniu-ksef-do-konca-2027-r

## Warning: Common Misconceptions

- „Obowiązek już działa": nie, stosuje się do płatności od 2027-01-01 (art. 17 ustawy z 16.06.2023).
- „Wszystkie przelewy": nie. Tylko za faktury ustrukturyzowane (i offline24 /
  offline-niedostępność), między czynnymi podatnikami VAT, przelewem lub instrumentem z polem
  tytułu.
- „Trzeba wysłać kontrahentowi numer": nie ma takiego obowiązku (FAQ MF, pytanie o wysyłanie numeru
  kontrahentowi).
- „Odroczenie kar z 16.09.2026 przesuwa też numer w przelewie": komunikat dotyczy kar za błędy w
  stosowaniu KSeF (art. 106ni); nie znaleźliśmy w nim zmiany dla art. 108g.
- „Numer KSeF to numer z pola P_2": nie; to dwa różne numery (MF, „Numer KSeF i zbiorczy
  identyfikator").

**Freshness:** 2026-10-07. Re-check: Dz.U. (zmiany art. 17 ustawy z 16.06.2023 lub art. 108g),
projekt UD477, strona MF „Podstawy prawne oraz kluczowe terminy", FAQ MF, pytanie o termin numeru w
przelewie.
