# Research Brief: Wydania broszury informacyjnej FA(3) i linki w repo

**Requested by:** human (fact-check: link `0ivha0ua` vs konwersja „March 2026") **Date:** 2026-10-08
**Freshness:** 2026-10-08 **For content:** wewnętrzny (linki „Źródła" w postach i stronach
walidatora, nagłówek `packages/validator/docs/fa3-information-sheet.md`)

**Target query:** n/d (brief wewnętrzny); dla czytelnika: „broszura FA(3) PDF aktualna wersja"

**Answer in two sentences:** Aktualne wydanie na stronie MF „Pliki do pobrania KSeF 2.0" to
„sierpień 2026" (PL, 173 s., `media/nuclnu0w/...`) i „August 2026" (EN, 174 s.,
`media/f2hnwjk2/...`); pod linkiem `media/0ivha0ua/...`, którego używa 56 plików w repo, leży
wydanie z września 2025 (173 s.), nadal dostępne (HTTP 200), ale niepodlinkowane już przez MF. Nasza
konwersja `fa3-information-sheet.md` odpowiada angielskiemu wydaniu z marca 2026 (174 s.), którego
tekst jest identyczny z wydaniem z sierpnia 2026; konwersja nie wymaga zmian, a do linkowania należy
użyć `nuclnu0w` (PL).

**What changes the answer:**

- MF publikuje każde wydanie pod nowym identyfikatorem `media/<id>/`, a stare pliki zostają na
  serwerze. Link `0ivha0ua` będzie dalej działał, ale zawsze pokaże wydanie z września 2025. Wydanie
  z sierpnia 2026 też zostanie kiedyś zastąpione nowym ID (sprawdzać stronę „Pliki do pobrania").
- Wydanie z sierpnia 2026 nie ma wpisu w „Rejestrze zmian" (ostatni wpis: marzec 2026). Diff tekstu
  (patrz Key Facts 6) nie wykazał zmian treści, ale nie mamy oświadczenia MF, co zmieniono.
- Numeracja stron: wszystkie trzy polskie wydania 2025-09 / 2026-03 / 2026-08 mają 173 strony i te
  same treści na tych samych stronach (sprawdzone dla s. 9, 27, 52, 70-71, 92, 94, 111, 138, 173).
  Wydania angielskie mają 174 strony i inne numery stron (np. „np I"/„np II": PL s. 92, EN s. 94).

## Key Facts (ready to use)

1. **Wydania broszury FA(3) na serwerze MF (stan 2026-10-08, wszystkie zwracają HTTP 200,
   `application/pdf`).** Data z okładki, liczba stron z PDF, `Last-Modified` z nagłówka HTTP. Tier 2
   Confidence: HIGH

   | Wydanie (okładka)  | Język | Strony | URL (`https://ksef.podatki.gov.pl/media/...`)                                    | Last-Modified | Podlinkowane przez MF dziś |
   | ------------------ | ----- | ------ | -------------------------------------------------------------------------------- | ------------- | -------------------------- |
   | maj 2025 (robocza) | PL    | 172    | `5iybz0ed/broszura-informacyjna-wersji-roboczej-struktury-logicznej-fa-3.pdf`    | 2025-05-07    | nie                        |
   | lipiec 2025        | PL    | 172    | `kmriagdg/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf`          | 2025-07-07    | nie                        |
   | July 2025          | EN    | 173    | `ks5d4smp/information-sheet-on-the-fa-3-logical-structure-version-1.pdf`         | 2025-07-04    | nie                        |
   | wrzesień 2025      | PL    | 173    | `0ivha0ua/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf`          | 2025-10-02    | nie                        |
   | September 2025     | EN    | 174    | `4u1bmhx4/information-sheet-on-the-fa-3-logical-structure.pdf`                   | 2025-10-02    | nie                        |
   | marzec 2026        | PL    | 173    | `jknpcymf/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3-04032026.pdf` | 2026-03-04    | nie                        |
   | March 2026         | EN    | 174    | `gtjhkeek/information-sheet-on-the-fa-3-logical-structure-04032026.pdf`          | 2026-03-04    | nie                        |
   | sierpień 2026      | PL    | 173    | `nuclnu0w/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf`          | 2026-08-26    | **tak**                    |
   | August 2026        | EN    | 174    | `f2hnwjk2/information-sheet-on-the-fa-3-logical-structure.pdf`                   | 2026-08-26    | **tak**                    |

   Lista ID z Wayback Machine CDX (`ksef.podatki.gov.pl/media/*`), każdy plik pobrany na żywo z
   serwera MF. Nie znaleziono osobnego pliku „listopad 2025": zmiana z listopada 2025 pojawia się
   dopiero w rejestrze zmian wydania z marca 2026.

2. **Strona MF podlinkowuje tylko wydanie z sierpnia 2026.** „Pliki do pobrania KSeF 2.0", sekcja
   „Broszura informacyjna": pozycja „Broszura informacyjna struktury logicznej e-Faktury FA(3)"
   (PDF, 3,43 MB) prowadzi do `nuclnu0w`, a „Information sheet on the FA(3) logical structure
   version 1" (PDF, 3,2 MB) do `f2hnwjk2`. Strona „Struktura FA(3)"
   (`/informacje-ogolne-ksef-20/struktura-logiczna-fa-3/`) nie zawiera linku do PDF broszury
   (linkuje schemat na crd.gov.pl). Ścieżki `/dokumentacja/` i `/dokumentacja-ksef-20/`
   zwracają 404. URL: https://ksef.podatki.gov.pl/pliki-do-pobrania-ksef-20 Tier 2 Confidence: HIGH

3. **Rejestr zmian (ostatnia strona) w wydaniu z sierpnia 2026, PL s. 173.** Verbatim: „Wrzesień
   2025 r. | 9, 82, 149 | Dostosowanie zapisów broszury do finalnego brzmienia art. 106gba ust. 1
   ustawy." / „43, 69, 82, 149 | Usunięcie przypisów informujących o trwającym procesie
   legislacyjnym w zakresie ustawy KSeF2" / „Listopad 2025 r. | 70-71 | Zmiana numeru KSeF z
   36-znakowego na 35-znakowy w przykładzie nr 14." / „Marzec 2026 r. | 111 | Usunięcie
   przykładowego linku w opisie pola LinkDoPlatnosci." Brak wpisu „Sierpień 2026". Wydanie z
   września 2025 ma tylko dwa pierwsze wpisy. Tier 2 Confidence: HIGH

4. **Różnice wrzesień 2025 → marzec 2026 (PL), diff tekstu po słowach (pdf → txt, Ghostscript).**
   Strony z różnicą: 1, 3, 70, 71, 94, 111, 112, 173. Merytorycznie:
   - s. 3 (Wzór faktury ustrukturyzowanej): czas gramatyczny. Wrzesień 2025: „Struktura logiczna w
     wersji FA(2) obowiązująca od 1 września 2023 r. będzie stosowana do 31 stycznia 2026 r . Od 1
     lutego 2026 r. obowiązującym wzorem faktury ustrukturyzowanej będzie struktura logiczna FA(3)."
     Marzec 2026: „była stosowana" / „jest struktura logiczna FA(3)".
   - s. 70-71 (przykład 14, faktura korygująca do faktury z KSeF): numer KSeF
     `9999999999-20260714-D5FB0C-9ED490-9A` (36 znaków) zmieniony na
     `9999999999-20260714-D5FB0C9ED490-9A` (35 znaków), także w polu `NrKSeFFaKorygowanej`.
   - s. 111 (pole `LinkDoPlatnosci`): usunięte zdanie „Przykład linku:
     https://nazwaagenta.xyz/bramka?IPKSeF=001ABC123DEF4". Opis `IPKSeF` (13 znaków, 3 znaki
     identyfikatora agenta + 10 znaków losowych) bez zmian.
   - s. 173: dwa nowe wpisy w rejestrze zmian (Key Fact 3).
   - Pozostałe różnice to przełamania wierszy i przypis (s. 94, patrz Key Fact 6). Tier 2
     Confidence: HIGH (diff tekstu; ilustracje porównane tylko renderingiem, patrz pkt 6)

5. **Różnice lipiec 2025 → wrzesień 2025 (PL), dla porządku.** Opis elementu `Zalacznik` dostosowany
   do art. 106gba ust. 1 (s. 9, 82, 149): „faktur dokumentujących" → „faktur dotyczących", „cen
   jednostkowych towarów lub usług bez kwot podatku (cen jednostkowych netto)" → „cen jednostkowych
   netto", „art. 106nda ust. 18" → „art. 106nda ust. 1", „z załącznikami będącymi ich integralną
   częścią" → „z załącznikiem będącym integralną częścią faktury"; usunięte przypisy o procesie
   legislacyjnym (druk sejmowy nr 1407). Oba wydania są starsze niż nasza konwersja. Tier 2
   Confidence: HIGH

6. **Różnice marzec 2026 → sierpień 2026: brak zmian treści.** PL: diff tekstu po słowach pokazuje
   tylko datę na okładce („marzec" → „sierpień") i zniknięcie znaku „4" po „akcyzowym" w opisie
   `KwotaAkcyzy` (s. 94). Render s. 94 obu wydań wygląda identycznie (przypis 4 „Dz. U. z 2025 r.
   poz. 126 ze zm." jest w obu), więc to artefakt ekstrakcji tekstu. EN: analogicznie, tylko data
   („March" → „August") i przesunięcia znaczników przypisów w ekstrakcji (s. 98, 110, 143, 150,
   174). Porównanie renderów wszystkich stron (40 dpi): poza okładką różnice pojedynczych pikseli na
   krawędziach glifów (inny eksport PDF, inny rozmiar pliku: 3 466 586 → 3 597 883 B), bez zmian
   układu. Numeracja stron bez zmian. Tier 2 Confidence: HIGH dla tekstu, MEDIUM dla grafik
   (schematy porównane wyłącznie automatycznie, bez przeglądu każdego diagramu)

7. **`fa3-information-sheet.md` odpowiada angielskiemu wydaniu z marca 2026 (`gtjhkeek`, 174 s.),
   tekstowo równemu wydaniu z sierpnia 2026 (`f2hnwjk2`).** Dowody:
   - nagłówek pliku: „Ministry of Finance, Warsaw, March 2026", tytuł angielski „Structured invoice
     — Information sheet on the FA(3) logical structure", changelog do „March 2026 (LinkDoPlatnosci
     example link removed)"; `packages/validator/CLAUDE.md`: „March 2026 edition, 174 pages" (174
     strony ma tylko wersja EN; PL ma 173);
   - plik dodany commitem `5ba9cde` z 2026-03-19, po publikacji wydania z 04.03.2026;
   - §1.2 pliku: „was used until 31 January 2026" i „binding structured invoice template" = tekst EN
     marzec 2026 („was used until 31 January 2026 … is the binding structured invoice template"). EN
     wrzesień 2025 ma „shall be used until … shall be the binding";
   - §12.1 (`LinkDoPlatnosci`): brak przykładowego linku `nazwaagenta.xyz` (usunięty w marcu 2026);
   - §1.1 „together with an identification number assigned to that invoice in that system" i „Act of
     17 February 2005 on the computerisation of activities of entities performing public tasks":
     dosłownie w EN (wszystkie wydania);
   - §2.5 „without thousand separators … Only a full stop": EN „without using any thousand
     separators (e.g. spaces). Only a full stop („.") may be used";
   - §2.7 „preceded by a minus sign (`–`)": EN „Negative values must be preceded by a minus sign
     („–")";
   - §5.1 „If NIP is not provided, issuing the invoice within KSeF will not be possible": EN „… is
     not provided in the corresponding field, issuing the invoice within the KSeF will not be
     possible";
   - §9.1 „in the currency in which the invoice was issued": dosłownie w EN. Konwersja jest
     streszczeniem strukturalnym (numeracja §1-16 i dodatki A-D są nasze, broszura nie numeruje
     rozdziałów) i nie podaje numerów stron. Confidence: HIGH

8. **Zgodność konwersji z treścią, która się zmieniała.** Wszystkie trzy zmiany wrzesień 2025 →
   marzec 2026 są w konwersji w wersji marcowej (czas przeszły w §1.2, brak przykładowego linku w
   §12.1, changelog). Przykład 14 nie jest przepisany do konwersji. Nie znaleziono w konwersji
   treści, która różni się między marcem a sierpniem 2026. Drobna uwaga niezależna od wydań: §16
   pisze „Available from 1 February 2026" dla `Zalacznik` (zgodne z broszurą: „od 1 lutego 2026 r.
   podatnik może wystawiać i przesyłać do KSeF faktury … z załącznikiem", PL s. 149), ale pomija
   zdanie broszury o zgłoszeniu w e-Urzędzie: „Funkcjonalność będzie dostępna od 1 stycznia 2026 r."
   (PL s. 149; EN s. 151: „The functionality will be available from 1 January 2026"). Confidence:
   HIGH

9. **Linki do broszury w repo (grep `apps/web/content`, `docs`, `packages/validator/docs`,
   `packages/validator/src`, `apps/web/src`; bez `.next` i `node_modules`).** Confidence: HIGH

   | URL                                                                             | Status | Wydanie          | Wystąpienia / pliki | Gdzie                                                                                                                                                                                                                                                                                                                             |
   | ------------------------------------------------------------------------------- | ------ | ---------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | `…/media/0ivha0ua/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf` | 200    | wrzesień 2025 PL | 88 / 56             | PL/EN/UK `validator/*` (13 + 13 + 13 plików), PL/EN blog 5 + 5, UK blog 3; briefy `bledy-walidacji-fa3.md`, `checklist-przygotowanie.md`, `ksef-dla-jdg.md`, `faktura-dla-osoby-prywatnej-ksef.md` (wzmianka)                                                                                                                     |
   | `…/media/nuclnu0w/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf` | 200    | sierpień 2026 PL | 13 / 9              | blog `faktura-zagraniczna-ksef` / `foreign-invoice-ksef` / `rakhunok-inozemnomu-kontrahenty-ksef`, `faktura-dla-osoby-prywatnej-ksef` / `invoice-for-private-person-ksef` / `rakhunok-dlya-pryvatnoyi-osoby-ksef`; `docs/knowledge-base/CHANGELOG.md`, briefy `mf-faq-podreczniki-2026.md`, `faktura-dla-osoby-prywatnej-ksef.md` |
   - Brak linków do wersji EN (`f2hnwjk2`, `gtjhkeek`, `4u1bmhx4`) i do innych ID.
   - `packages/validator/src` i `apps/web/src` nie zawierają URL broszury (reguły cytują §
     konwersji, np. `§12.1`).
   - `docs/knowledge-base/CHANGELOG.md` l. 51 ma URL `nuclnu0w` zakończony kropką zdania („….pdf.")
     — w Markdown autolink może objąć kropkę; sam URL bez kropki działa.
   - Etykieta a wydanie: posty `faktura-zagraniczna-ksef`, `faktura-korygujaca-ksef` (PL),
     `foreign-invoice-ksef`, `corrective-invoice-ksef` (EN), `koryguvalna-faktura-ksef`,
     `rakhunok-inozemnomu-kontrahenty-ksef` (UK) mają etykietę „marzec 2026" / „March 2026" /
     „березень 2026", a linkują `0ivha0ua` (wrzesień 2025). Briefy `bledy-walidacji-fa3.md` (l.
     1102), `checklist-przygotowanie.md` (l. 686), `ksef-dla-jdg.md` (l. 675) też opisują link
     `0ivha0ua` jako „marzec 2026".
   - Posty o fakturze zagranicznej (PL/EN/UK) linkują oba ID: `0ivha0ua` z etykietą „marzec 2026" i
     `nuclnu0w` z etykietą „s. 92". Cytat „s. 92" (stawki `np I`/`np II`) jest poprawny dla każdego
     polskiego wydania od września 2025; w wersji EN to s. 94.

10. **Treść, która zależy od tekstu zmienionego między wydaniami.**
    - Przykładowe numery KSeF w postach o korekcie: `5214567890-20260401-000001-000001-01` (36
      znaków, z łącznikiem między dwiema grupami po 6 znaków) w
      `apps/web/content/pl/blog/faktura-korygujaca-ksef.mdx` l. 165,
      `apps/web/content/en/blog/corrective-invoice-ksef.mdx` l. 166,
      `apps/web/content/uk/blog/koryguvalna-faktura-ksef.mdx` l. 166. To ten sam układ co numer w
      przykładzie 14 wydania z września 2025, który MF zmienił w listopadzie 2025 na 35-znakowy
      (`…-D5FB0C9ED490-9A`). Te same posty linkują `0ivha0ua`, gdzie czytelnik zobaczy jeszcze
      stary, 36-znakowy przykład. Schemat XSD (`TNumerKSeF`, `schemat.xsd` l. 1220) dopuszcza oba
      warianty (`-([0-9A-F]{6})-?([0-9A-F]{6})-`), więc przykład przechodzi walidację XSD. Inne
      treści w repo (`numer-ksef-w-przelewie`, `pierwsza-faktura-fa3`, `first-fa3-invoice`) podają
      35 znaków. Confidence: HIGH (fakt), rozstrzygnięcie, czy przykład zmienić, należy do
      Copywritera/człowieka
    - Brief `ksef-dla-jdg.md` l. 438-443 opisuje zmianę jako „an earlier version of the FA(3) spec
      showed 36 characters"; rejestr zmian MF mówi tylko o „przykładzie nr 14", a jako „Verbatim"
      brief cytuje naszą konwersję („November 2025 (KSeF number 36→35 chars in example 14)"), nie
      tekst MF. Verbatim MF: „Zmiana numeru KSeF z 36-znakowego na 35-znakowy w przykładzie nr 14."
    - `LinkDoPlatnosci`: żaden post ani reguła nie używa usuniętego przykładowego linku. Reguła
      `IPKSEF_FORMAT` (`semantic.ts` l. 1232, `error-codes.ts` l. 857: 13 znaków `[0-9a-zA-Z]`)
      opiera się na opisie `IPKSeF`, który się nie zmienił.
    - Czas gramatyczny FA(2)/FA(3) (s. 3): nie znaleziono treści, która cytuje sformułowanie z
      września 2025.
    - Marzec → sierpień 2026: brak zmian treści, więc żadna reguła walidatora ani treść nie zależy
      od różnic między tymi wydaniami.

## Recommendation (for the human)

- **Link wszędzie:**
  `https://ksef.podatki.gov.pl/media/nuclnu0w/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf`
  (wydanie PL, sierpień 2026, jedyne podlinkowane dziś przez MF). Do zamiany: 88 wystąpień
  `0ivha0ua` w 56 plikach. Etykiety „marzec 2026" zmienić na „sierpień 2026" (albo bez daty). Dla
  treści EN można rozważyć wersję angielską
  `https://ksef.podatki.gov.pl/media/f2hnwjk2/information-sheet-on-the-fa-3-logical-structure.pdf`,
  ale wtedy cytaty stron trzeba przeliczyć (EN ma +1/+2 strony, np. s. 92 → 94).
- **`fa3-information-sheet.md`: treść bez zmian.** Opcjonalnie zaktualizować metadane nagłówka:
  źródło to wydanie EN z marca 2026 (`gtjhkeek`), tekstowo równe wydaniu z sierpnia 2026
  (`f2hnwjk2`, 174 s.; PL `nuclnu0w`, 173 s.); MF nie dodał wpisu do rejestru zmian dla
  sierpnia 2026. To samo w `packages/validator/CLAUDE.md` l. 12 („March 2026 edition, 174 pages").
  Opcjonalnie w §16 dopisać zdanie o dostępności zgłoszenia od 1 stycznia 2026 (Key Fact 8).
- **Do decyzji Copywritera:** przykładowy numer KSeF w trzech postach o korekcie (Key Fact 10).
- `mf-faq-podreczniki-2026.md` fakt 4 („a human should diff the PDF") i wpis w
  `docs/knowledge-base/CHANGELOG.md` („Impact: validator (needs human diff)") mają teraz odpowiedź:
  diff wykonany, brak zmian treści. „173 vs 174 strony" wynika z porównania wydania PL z konwersją
  zrobioną z wydania EN, nie ze zmiany treści.

## Unsettled Questions

- Dlaczego MF opublikował wydanie z sierpnia 2026 bez wpisu w rejestrze zmian: nie znaleziono
  komunikatu MF. Diff tekstu nie wykazał zmian; nie wykluczamy drobnych zmian w grafikach (schematy
  porównane tylko automatycznie, Key Fact 6).
- Czy istniał osobny plik „listopad 2025": nie znaleziono go w Wayback Machine; nie twierdzimy, że
  go nie było.
- Czy MF usunie z serwera stare pliki (`0ivha0ua` i in.): brak informacji; dziś wszystkie działają.

## Suggested Sources Section

- MF, „Broszura informacyjna dotycząca struktury logicznej FA(3)", Warszawa, sierpień 2026 r., 173
  s.:
  https://ksef.podatki.gov.pl/media/nuclnu0w/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf
- MF, „Information sheet on the FA(3) logical structure", Warsaw, August 2026, 174 pp.:
  https://ksef.podatki.gov.pl/media/f2hnwjk2/information-sheet-on-the-fa-3-logical-structure.pdf
- MF, „Pliki do pobrania KSeF 2.0", sekcja „Broszura informacyjna":
  https://ksef.podatki.gov.pl/pliki-do-pobrania-ksef-20
- Wydania archiwalne (tylko do porównań, nie do linkowania w „Źródłach"): marzec 2026 PL
  https://ksef.podatki.gov.pl/media/jknpcymf/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3-04032026.pdf,
  wrzesień 2025 PL
  https://ksef.podatki.gov.pl/media/0ivha0ua/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf

## Warning: Common Misconceptions

- „Link `0ivha0ua` to wydanie z marca 2026": to wydanie z września 2025 (okładka „Warszawa, wrzesień
  2025 r.", Last-Modified 2025-10-02). Ma stary, 36-znakowy numer KSeF w przykładzie 14 i
  przykładowy link w `LinkDoPlatnosci`.
- „Wydanie z sierpnia 2026 zmienia reguły FA(3)": tekst jest identyczny z wydaniem z marca 2026;
  rejestr zmian nie ma wpisu za sierpień 2026.
- „Konwersja ma 174 strony, a PDF 173, więc konwersja jest z innego wydania treściowo": różnica
  stron wynika z języka (EN 174, PL 173), nie z treści.
- „Nowa broszura = nowy schemat": schemat FA(3) się nie zmienił (namespace
  `http://crd.gov.pl/wzor/2025/06/25/13775/`, ten sam we wszystkich wydaniach broszury od lipca
  2025). Broszura to wyjaśnienia MF (Tier 2), nie przepis prawa.
