# Research Brief: Opłata za wpis do „rejestru” podobnego do CEIDG

**Requested by:** Copywriter (six-new-posts batch) **Date:** 2026-10-26 **For content:**
`apps/web/content/pl/blog/oplata-za-wpis-ceidg-oszustwo.mdx`

**Target query:** „opłata za wpis do CEIDG pismo”, „wezwanie do zapłaty rejestr działalności
gospodarczej oszustwo”

**Answer in two sentences:** Wniosek o wpis do CEIDG jest wolny od opłat (art. 13 ustawy o CEIDG),
więc żadne pismo z przelewem „za wpis” nie pochodzi z CEIDG. Administracja skarbowa i MF ostrzegają,
że takie pisma wysyłają prywatne podmioty o nazwach łudząco podobnych do CEIDG, a nieuiszczenie
takich opłat nie wywołuje żadnych konsekwencji prawnych (IAS Warszawa).

**What changes the answer:** nothing for CEIDG itself. The open variable is whether a given letter
is a commercial offer or a fraud; IAS says payment demands „mogą nosić znamiona oszustwa”.

**Network:** all sources below fetched live on 2026-10-26 (api.sejm.gov.pl, mazowieckie.kas.gov.pl,
mf-arch2.mf.gov.pl, gov.pl, biznes.gov.pl, ksef.podatki.gov.pl, podatki.gov.pl, cert.pl). The web
search quota ran out mid-research, so some searches (UOKiK, UPRP, fake „KSeF activation”) were not
run.

## Key Facts (ready to use)

### A. Statute (Tier 1)

1. **Wniosek o wpis do CEIDG jest wolny od opłat.** Ustawa z 6 marca 2018 r. o CEIDG i Punkcie
   Informacji dla Przedsiębiorcy, tekst jednolity Dz.U. 2026 poz. 30, art. 13. Verbatim: „Wniosek o
   wpis do CEIDG jest wolny od opłat.” Confidence: HIGH. Ania-relevant: yes.
   - Amendment Dz.U. 2026 poz. 507 (in force 2026-10-14) does not change art. 13; it only references
     it (e.g. new art. 20: art. 13 applies to wniosek o zawieszenie/wznowienie). Checked by grep of
     the amendment text. Amendment 2026 poz. 734 and 2025 poz. 1792 do not touch art. 13.
   - Art. 13 is also applied „odpowiednio” to the wniosek z informacją o niepodjęciu działalności
     (art. 14 ust. 2).
2. **CEIDG prowadzi minister właściwy do spraw gospodarki w systemie teleinformatycznym.** Art. 2
   ust. 1. Zadania: ewidencjonowanie przedsiębiorców będących osobami fizycznymi (art. 2 ust. 2 pkt
   1). Confidence: HIGH.
3. **Dane w CEIDG są jawne; każdy ma do nich dostęp, udostępnia się je na stronie internetowej
   CEIDG.** Art. 45 ust. 1–2. Verbatim: „Dane i informacje udostępniane przez CEIDG są jawne. Każdy
   ma prawo dostępu do tych danych i informacji.” Confidence: HIGH. Use: explains how senders get
   the address of a new JDG (our inference, do not attribute to the act).

URL: https://api.sejm.gov.pl/eli/acts/DU/2026/30/text.pdf

### B. Government warnings (Tier 3)

4. **IAS w Warszawie: „Ostrzeżenie przed ofertami odpłatnego wpisu do rejestrów przedsiębiorców”**
   (published 2016-12-15, updated 2020-07-20; reposted on tax-office pages). Verbatim:
   - „licznych przypadkach kierowania do podmiotów prowadzących działalność gospodarczą,
     zarejestrowanych w (...) CEIDG, pism z ofertami wniesienia fakultatywnej opłaty za dokonywanie
     wpisu do rejestrów przedsiębiorców.”
   - „Podmioty oferujące za opłatą rejestracyjną wpis do komercyjnych rejestrów działalności
     gospodarczej posiadają nazwy łudząco przypominające (...) CEIDG.” (The page lists five names;
     do NOT name them in content.)
   - „Korespondencja ww. podmiotów sporządzona jest w stylu pisma urzędowego, a jej forma oraz
     dołączony druk przelewu z podanym nieprzekraczalnym terminem do dokonania wpłaty sugerują, że
     wpis do rejestru jest obowiązkowy.”
   - „jedynym rejestrem publicznym, ewidencjonującym osoby fizyczne prowadzące działalność
     gospodarczą jest (...) CEIDG” (page says „prowadzona przez Ministerstwo Rozwoju”; stale
     ministry name, statute says „minister właściwy do spraw gospodarki”, use the statute).
   - „Wpis do CEIDG jest całkowicie bezpłatny.” „Wezwania do uiszczenia opłat rejestracyjnych mogą
     nosić znamiona oszustwa.” „Nieuiszczanie takich opłat nie wywołuje żadnych konsekwencji
     prawnych.” Confidence: HIGH (as quoted guidance; old date, flag „ostrzeżenie z 2016 r.”).
   - URL:
     https://www.mazowieckie.kas.gov.pl/drugi-urzad-skarbowy-warszawa-srodmiescie/wiadomosci/komunikaty/-/asset_publisher/1qTc/content/id/6554245
5. **MF: „Uwaga na komercyjne wezwania do rejestrowania działalności gospodarczej”** (2016-12-09,
   archive site). Verbatim fragment: „Korespondencja ta może wprowadzać w błąd poprzez wykorzystanie
   podobieństwa nazwy prywatnej działalności”; wpis do CEIDG „BEZPŁATNY”. Read via a fetch tool
   summary, not raw text: MEDIUM for exact wording. URL:
   https://mf-arch2.mf.gov.pl/ministerstwo-finansow/wiadomosci/komunikaty/-/asset_publisher/6Wwm/content/uwaga-na-komercyjne-wezwania-do-rejestrowania-dzialalnosci-gospodarczej/pop_up?_101_INSTANCE_6Wwm_viewMode=print
   (long archive URL; prefer fact 4 in `sources`).
6. **Ministerstwo Sprawiedliwości, the same pattern for KRS** (gov.pl page „Krajowy Rejestr Sądowy”,
   section „Ostrzeżenia”, undated): „Ministerstwo Sprawiedliwości ostrzega przed firmami
   komercyjnymi podszywającymi się pod Krajowy Rejestr Sądowy.” „Wezwania do zapłaty nadsyłane przez
   różne podmioty należy traktować więc jako ofertę komercyjną” „Nieuiszczenie opłaty nie wywołuje
   żadnych skutków prawnych w Krajowym Rejestrze Sądowym.” Read via a fetch tool, MEDIUM for exact
   wording. URL: https://www.gov.pl/web/sprawiedliwosc/krajowy-rejestr-sadowy
7. **biznes.gov.pl, „Zarejestruj działalność gospodarczą w CEIDG”:** „Złożenie wniosku o wpis do
   CEIDG jest BEZPŁATNE!” No warning about fake registers on that page. URL:
   https://www.biznes.gov.pl/pl/portal/ou736 Confidence: HIGH.
8. **podatki.gov.pl, „Uwaga na fałszywe wezwania do zapłaty” (14.04.2026)** is about fake KAS
   leaflets with QR codes for traffic fines; NOT about registers. Do not use for the CEIDG claim.

### C. KSeF is free (Tier 3)

9. **MF zapewnia bezpłatne narzędzia KSeF** (FAQ KSeF 2.0): „Ministerstwo Finansów zapewnia
   bezpłatne narzędzia – Aplikację Podatnika KSeF…”; „W celu korzystania z KSeF dostępne są
   bezpłatne narzędzia Ministerstwa Finansów: Aplikacja Podatnika KSeF 2.0…”. URL:
   https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20/ Confidence: HIGH. No sentence found
   saying „KSeF nie pobiera żadnych opłat” verbatim; write „MF udostępnia bezpłatne narzędzia”, not
   „KSeF nigdy nic nie kosztuje” (integrated commercial software may be paid).

### D. CERT Polska (Tier 3, general fraud guidance)

10. **Zgłaszanie incydentów: incydent.cert.pl** (footer of cert.pl). URL: https://incydent.cert.pl/
11. **Presja czasu to sygnał oszustwa** (cert.pl, „(Nie)bezpieczne płatności”): „Atmosfera nacisku
    na szybkie działanie pod groźbą poważnej kary (np. nasłanie komornika (...)) (...) to zazwyczaj
    poważny sygnał ostrzegawczy, że masz do czynienia z oszustwem finansowym.” Also: „Zawsze uważnie
    sprawdzaj, komu płacisz”. URL: https://cert.pl/baza-wiedzy/niebezpieczne-platnosci
12. **Sprawdź pełny adres nadawcy e-maila** (cert.pl, „Fałszywe załączniki”): „W polu z nazwą
    nadawcy oszuści mogą umieścić dowolną treść (...) sprawdź więc pełny adres e-mail.” URL:
    https://cert.pl/falszywe-zalaczniki

## Unsettled Questions / not verified

- **Whether paying makes a binding contract** („drobny druk”): no official source read states it. Do
  not claim that paying concludes a contract or that the sender can then demand more. Safe: the
  letters are offers (IAS: „pism z ofertami”; MS: „ofertę komercyjną”).
- **What to do after paying (bank, chargeback, police):** no official source fetched. Write as our
  advice, not as an MF/CERT instruction. Do not promise a refund.
- **UOKiK:** no UOKiK warning about register-fee letters found (site search of uokik.gov.pl,
  2026-10-26, Constitutional Judge); UOKiK primarily protects consumers, so do not send Ania there.
- **Fact 6 wording (MS/KRS):** verified verbatim live on 2026-10-26; upgrade to HIGH. Note KRS
  entries themselves carry court fees, so do not write that KRS works „identically” to CEIDG.
- **Fact 3 inference:** that letters target newly registered firms is not in any source; IAS says
  only „zarejestrowanych w CEIDG”. Phrase as a possibility.
- **Fake „KSeF activation” fees / UPRP trademark-register lookalikes:** no official warning found in
  this session. Do not claim a wave exists; at most a general „taka sama zasada”.
- Recency: the CEIDG-lookalike warnings date from 2016–2020. Nothing confirms the scheme in 2026; do
  not claim „obecnie trwa fala”.

## Suggested Sources Section

- Ustawa o CEIDG i PIP, Dz.U. 2026 poz. 30, art. 2, 13, 45:
  https://api.sejm.gov.pl/eli/acts/DU/2026/30/text.pdf
- IAS w Warszawie, ostrzeżenie (2016/2020): URL in fact 4
- biznes.gov.pl, wpis do CEIDG: https://www.biznes.gov.pl/pl/portal/ou736
- Ministerstwo Sprawiedliwości, KRS, ostrzeżenia:
  https://www.gov.pl/web/sprawiedliwosc/krajowy-rejestr-sadowy
- MF, FAQ KSeF 2.0: https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20/
- CERT Polska: https://incydent.cert.pl/, https://cert.pl/baza-wiedzy/niebezpieczne-platnosci

## Warning: Common Misconceptions

- „Po rejestracji trzeba opłacić wpis w centralnym rejestrze”: false for CEIDG (art. 13).
- „Nieopłacenie grozi wykreśleniem / karą”: IAS says no legal consequences.
