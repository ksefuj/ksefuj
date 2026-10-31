# Research Brief: Najem lokalu firmie a KSeF (bez działalności)

**Requested by:** Orchestrator (content backlog item `najem-lokalu-ksef`) **Date:** 2026-10-31 **For
content:** Blog post „Najem lokalu firmie a KSeF (bez działalności)" **Persona:** Ania, osoba
prywatna bez JDG wynajmująca mieszkanie albo lokal użytkowy; wariant: JDG, która wynajmuje.

**Target query:** „najem KSeF"

**Answer in two sentences:** Osoba bez firmy, która wynajmuje mieszkanie lub lokal, jest dla VAT
podatnikiem (zwykle zwolnionym: najem mieszkania na cele mieszkaniowe przedmiotowo, art. 43 ust. 1
pkt 36, a lokal użytkowy podmiotowo do 240 000 zł, art. 113), więc fakturę wystawia tylko wtedy, gdy
najemca-podatnik (firma) jej zażąda, a najemcy prywatnemu nie musi jej wystawiać nawet na żądanie
(Podręcznik KSeF 2.0 cz. II, pkt 1.2.1; art. 106b ust. 2). Jeśli faktura dla firmy powstaje, idzie
przez KSeF od 1 kwietnia 2026 r., a do 31 grudnia 2026 r. może być poza KSeF w ramach limitu 10 000
zł brutto miesięcznie (art. 145m); od 1 stycznia 2027 r. limitu nie ma (Podręcznik cz. II, pkt
1.2.1; Dz.U. 2026 poz. 1263, art. 145m).

**What changes the answer:**

- **Kto jest najemcą:** osoba fizyczna bez działalności → bez faktury nawet na żądanie (fakt 5);
  podatnik (firma) przy najmie użytkowym → faktura na żądanie (fakt 6). Najem mieszkania firmie (np.
  na mieszkanie dla pracownika): NOT IN KB (fakt 7).
- **Rodzaj lokalu:** mieszkalny na cele mieszkaniowe (zwolnienie przedmiotowe art. 43 ust. 1 pkt 36)
  vs użytkowy (zwolnienie podmiotowe art. 113 albo VAT czynny) (fakty 2, 3).
- **Data faktury:** do 31.12.2026 limit 10 000 zł brutto/mies. (art. 145m) pozwala wystawić poza
  KSeF; od 1.01.2027 każda faktura dla podatnika w KSeF (fakty 9, 10).
- **Status VAT wynajmującego:** czynny VAT (przekroczony limit 240 000 zł albo rezygnacja ze
  zwolnienia) lub JDG: faktury dla firm w KSeF jak u każdego podatnika (fakt 13).
- **NIP:** bez NIP nie wystawisz faktury w KSeF; osoba bez JDG ma zwykle tylko PESEL, NIP uzyskuje
  przez VAT-R + NIP-7 (fakty 14, 15).
- **Kary:** art. 106ni od 1.01.2027 wg obowiązującej ustawy; MF zapowiedział odroczenie do końca
  2027 r., projekt UD477 (druk 3245) nieuchwalony (fakt 12).

## Provenance and limits

- Built **only from the repo knowledge base**. Baseline per `docs/knowledge-base/WATCHLIST.md` (last
  checked 2026-10-07): VAT Act consolidated text Dz.U. 2026 poz. 1263; Podręcznik KSeF 2.0 cz. I–IV
  of 2026-08-06. Official hosts (ksef.podatki.gov.pl, api.sejm.gov.pl, isap) were blocked (403) in
  this run; nothing was fetched live.
- **Edition caveat:** the KB extract `podrecznik-ksef-20-czesc-ii.md` is a condensed Polish summary
  of the **2026-02-01** edition of cz. II, not the 2026-08-06 edition (changes judged minor in a
  non-line-by-line check, `mf-faq-podreczniki-2026.md` fact 3). Lines from it are "KB extract text",
  not MF verbatim. Page numbers for pkt 1.2.1 in the 2026-08-06 edition: s. 9–10 per
  `koniec-limitu-10000-zl.md` fact 4 (page 9 per `faktura-z-kasy-fiskalnej-ksef-2027.md` fact 12).
- **Not fetched live in this run (verify before quoting as statute):** VAT Act art. 15 ust. 1–2,
  art. 19a ust. 5 pkt 4 and ust. 7, art. 43 ust. 1 pkt 36, art. 106b ust. 1–3, art. 106ga ust. 1,
  ust. 2 pkt 4 and ust. 4, art. 106gb ust. 4, art. 106i ust. 3, art. 106ni, art. 113 ust. 1, 5, 9,
  art. 145m (all Dz.U. 2026 poz. 1263); MF FAQ „Najczęstsze pytania"; MF page „Podstawy prawne oraz
  kluczowe terminy"; FAQ KSeF 2.0; Podręcznik cz. II (06.08.2026).
- The task note "dates for private landlords UNVERIFIED": the dates in fact 8 are stated in the KB
  extract of the Podręcznik specifically for private rental and match art. 145m in the KB; they were
  not re-checked against the 2026-08-06 edition.

## Key Facts (ready to use)

### A. Czy prywatny wynajmujący jest podatnikiem VAT (pytanie 1)

1. **Najem prywatny = podatnik VAT, bez rejestracji w CEIDG.** KB extract text: „Status podatnika
   VAT nie wymaga rejestracji w CEIDG. Definicja działalności gospodarczej na gruncie VAT jest
   szersza niż w Prawie przedsiębiorców (art. 3). Podatnikiem VAT jest m.in.: […] Osoba fizyczna
   prowadząca najem prywatny (art. 659 § 1 KC)."
   - Source: Podręcznik KSeF 2.0 cz. II, pkt 1.2.1 (KB extract, edition 2026-02-01);
     https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
     (2026-08-06 edition). Tier 2 (MF guidance). Confidence: HIGH. Ania: yes.
   - Art. 15 ustawy o VAT (definicja podatnika): verbatim NOT IN KB.

2. **Zwolnienie podmiotowe do 240 000 zł (art. 113).** KB extract text: „Osoby te nie mają obowiązku
   rejestracji jako VAT czynny, jeśli wartość sprzedaży nie przekroczyła 240 000 zł (zwolnienie
   podmiotowe, art. 113 ust. 1 i 9)." Statute (KB verbatim fragment): „kwoty 240 000 zł", applies
   from 1.01.2026 (footnote: ustawa z 24.06.2025, Dz.U. poz. 896); art. 113 ust. 5: exemption lapses
   from the transaction that crosses the amount.
   - Source: Podręcznik cz. II, pkt 1.2.1 (KB extract); Dz.U. 2026 poz. 1263, art. 113
     (`zwolniony-z-vat-ksef.md` fact 2), https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf.
     Tier 1 (law) / Tier 2. Confidence: HIGH. Ania: yes.
   - **Note:** the Podręcznik extract header says it "predates the 240 000 zł threshold", yet its
     pkt 1.2.1 text reads 240 000 zł. The amount is confirmed by the statute (above).
   - **NOT IN KB:** whether rent exempt under art. 43 ust. 1 pkt 36 counts towards the 240 000 zł
     limit (art. 113 ust. 2 not extracted). Do not state.

3. **Zwolnienie przedmiotowe: najem mieszkalny na cele mieszkaniowe.** KB extract text: „Zwolnienie
   przedmiotowe (art. 43 ust. 1 pkt 36) — najem nieruchomości mieszkalnych na cele mieszkaniowe."
   - Source: Podręcznik cz. II, pkt 1.2.1 (KB extract). Tier 2. Confidence: HIGH (as MF summary).
     Verbatim of art. 43 ust. 1 pkt 36: NOT IN KB. Ania: yes.

### B. Kiedy faktura (pytanie 2)

4. **Sprzedaż zwolniona: faktura nieobowiązkowa, chyba że na żądanie.** Art. 106b ust. 2 (KB
   verbatim): „Podatnik nie jest obowiązany do wystawienia faktury w odniesieniu do sprzedaży
   zwolnionej od podatku na podstawie art. 43 ust. 1, art. 113 ust. 1 i 9, art. 113a ust. 1 lub
   przepisów wydanych na podstawie art. 82 ust. 3." Art. 106b ust. 3 pkt 2 (KB verbatim fragment):
   „sprzedaż zwolnioną, o której mowa w ust. 2 … jeżeli żądanie jej wystawienia zostało zgłoszone w
   terminie 3 miesięcy, licząc od końca miesiąca, w którym dostarczono towar lub wykonano usługę
   bądź otrzymano całość lub część zapłaty".
   - Source: Dz.U. 2026 poz. 1263, art. 106b ust. 2, ust. 3 pkt 2 (`zwolniony-z-vat-ksef.md` facts
     3, 4). Tier 1 (law). Confidence: HIGH. Ania: yes.

5. **Najem (mieszkalny lub użytkowy ze zwolnieniem z art. 113) na rzecz osoby fizycznej: bez faktury
   nawet na żądanie.** KB extract text: „Na cele mieszkaniowe (art. 43 ust. 1 pkt 36) lub użytkowe
   (zwolnienie art. 113 ust. 1 i 9) dokonywany na rzecz osoby fizycznej → brak obowiązku wystawienia
   faktury nawet na żądanie (art. 106b ust. 3 pkt 1 lit. a). Podatnik może wystawić fakturę
   dobrowolnie (w KSeF lub poza KSeF)."
   - Source: Podręcznik cz. II, pkt 1.2.1 (KB extract). Tier 2 (MF reading of art. 106b ust. 3 pkt 1
     lit. a; statute verbatim NOT IN KB). Confidence: HIGH (MF statement), see Ambiguities. Ania:
     yes.
   - Related: §1.3 (KB extract text): „Z obowiązku wystawienia faktury na żądanie nabywcy wyłączone
     są m.in.: czynności z art. 19a ust. 5 pkt 4 (najem, energia elektryczna) i art. 106a pkt 3 i 4
     (procedury szczególne), a także zaliczki na WDT."
   - Voluntary invoice to a private person is outside the KSeF obligation (art. 106ga ust. 2 pkt 4:
     „osoba fizyczna nieprowadząca działalności gospodarczej"; ust. 4 voluntary use) —
     `faktura-dla-osoby-prywatnej-ksef.md` facts 1, 2. Tier 1. HIGH.

6. **Najem użytkowy na rzecz podatnika: faktura na żądanie najemcy.** KB extract text: „Na cele
   użytkowe, dokonywany na rzecz podatnika → obowiązek wystawienia faktury na żądanie nabywcy.
   Podatnik zwolniony podmiotowo wystawia w KSeF od 1 kwietnia 2026 r. (lub od 1 stycznia 2027 r.
   przy limicie ≤ 10 000 zł)."
   - Source: Podręcznik cz. II, pkt 1.2.1 (KB extract). Tier 2. Confidence: HIGH. Ania: yes (core
     case: lokal wynajęty firmie).
   - Deadline for the request: 3 months from the end of the month (fact 4, art. 106b ust. 3 pkt 2;
     Podręcznik pkt 1.3: „termin: 3 miesiące od końca miesiąca dostawy/usługi"). HIGH.
   - **GAP:** how the 3-month window is counted for continuous monthly rent (per billing month vs
     per contract) is NOT IN KB.

7. **Najem mieszkania firmie (np. dla pracownika): NOT IN KB.** The KB does not say whether renting
   a flat to a company that houses an employee is „na cele mieszkaniowe" under art. 43 ust. 1 pkt
   36, nor whether an invoice is then required on request. Do not answer; „zapytaj księgową /
   interpretacja".

8. **Rachunek zamiast faktury: nie.** KB extract text (pkt 1.3): „Jeśli podatnik zdecyduje się
   dokumentować czynność — tym dokumentem zawsze musi być faktura, nie rachunek." Rachunek only for
   activities outside VAT, non-taxpayers, rolnicy ryczałtowi (art. 117). MF FAQ (Q12, KB verbatim):
   „Czynności zwolnione z VAT są dokumentowane fakturą wystawianą na żądanie nabywcy, a nie
   rachunkiem. […] Taka faktura będzie wystawiana w KSeF."
   - Source: Podręcznik cz. II, pkt 1.3 (KB extract), Tier 2, HIGH; FAQ KSeF 2.0
     https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20 (`zwolniony-z-vat-ksef.md` fact 11),
     Tier 3, MEDIUM (answer given to a budget unit). Ania: yes.

### C. Od kiedy w KSeF, limit, kary (pytanie 3)

9. **Daty.** KB extract text (pkt 1.2.1): „Od 1 kwietnia 2026 r. — pozostali podatnicy"; „Do 31
   grudnia 2026 r. — podatnicy mogą wystawiać faktury poza KSeF, jeżeli łączna wartość sprzedaży
   udokumentowana fakturami w danym miesiącu ≤ 10 000 zł (brutto) — nie wlicza się faktur na rzecz
   konsumentów, faktur z kas rejestrujących, paragonów fiskalnych uznawanych za faktury"; „Od 1
   stycznia 2027 r. — podatnicy zwolnieni, u których limit 10 000 zł nie jest przekroczony"
   („zwolnieni" = from KSeF by the limit, not VAT-exempt: `zwolniony-z-vat-ksef.md` fact 8).
   - Source: Podręcznik cz. II, pkt 1.2.1 (KB extract). Tier 2. Confidence: HIGH. Ania: yes.
   - FAQ KSeF 2.0 Q10 (KB verbatim): „każdy podatnik (czynny i zwolniony), który ma obowiązek
     wystawienia faktury, będzie wystawiał ją w KSeF". Tier 3. HIGH.

10. **Art. 145m (limit 10 000 zł).** KB verbatim: in the period „od dnia 1 kwietnia 2026 r. do dnia
    31 grudnia 2026 r." taxpayers „mogą wystawiać faktury elektroniczne lub faktury w postaci
    papierowej, jeżeli łączna wartość sprzedaży wraz z kwotą podatku … udokumentowana tymi fakturami
    wystawionymi w danym miesiącu jest mniejsza lub równa 10 000 zł"; ust. 2: right lost „począwszy
    od faktury, którą przekroczono". Gross (wraz z podatkiem), by month of issue. MF FAQ: counts
    only invoices that must be issued in KSeF (excludes invoices to private persons, cash-register
    invoices, receipts with NIP ≤ 450 zł); once exceeded, KSeF applies from that invoice on, even if
    later months are below.
    - Source: Dz.U. 2026 poz. 1263, art. 145m (`koniec-limitu-10000-zl.md` fact 1;
      `zwolniony-z-vat-ksef.md` fact 7), Tier 1, HIGH; FAQ „Najczęstsze pytania" Q12–Q14
      https://ksef.podatki.gov.pl/ksef-news/najczestsze-pytania/ and FAQ KSeF 2.0 Q22
      (`mf-faq-podreczniki-2026.md` fact 1), Tier 3, HIGH. Ania: yes.
    - MF legal-basis page (modified 2026-05-29) lists the exemptions until end of 2026 incl. the 10
      000 zł invoices:
      https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/podstawy-prawne-oraz-kluczowe-terminy/
      (`mf-faq-podreczniki-2026.md` fact 6). Tier 3. HIGH.
    - **GAP:** invoice for a 2026 rent requested and issued in January 2027: by wording art. 145m
      covers only invoices issued by 31.12.2026; MF has not addressed it (`zwolniony-z-vat-ksef.md`,
      Unsettled). Do not answer definitively.

11. **Od 1.01.2027 bez limitu; wyłączenie konsumenckie zostaje.** KB: art. 145m ends 31.12.2026;
    invoices to „osoba fizyczna nieprowadząca działalności gospodarczej" stay outside the obligation
    with no end date recorded (art. 106ga ust. 2 pkt 4). Source: `koniec-limitu-10000-zl.md` answer
    and facts 1–3; MF stages page https://ksef.podatki.gov.pl/etapy-wdrozenia-ksef/. Tier 1/3. HIGH.
    Ania: yes.

12. **Kary (art. 106ni).** Law in force: penalty from 1.01.2027, „do 100 % kwoty podatku wykazanego
    na tej fakturze wystawionej poza Krajowym Systemem e-Faktur", for invoices without tax (the
    exempt landlord's case) „do 18,7 % kwoty należności ogółem". MF announced 2026-09-16 deferral to
    end of 2027; bill UD477 (Sejm druk 3245, first reading 2026-10-21) moves art. 106ni ust. 1–3,
    5–7 to 1.01.2028, **not passed, not published** (status checked 2026-10-23). FAQ „Najczęstsze
    pytania" Q2: „za 2026 rok nie będą nakładane sankcje".
    - Source: Dz.U. 2026 poz. 1263 art. 106ni, https://api.sejm.gov.pl/eli/acts/DU/2026/1263 (Tier
      1, HIGH);
      https://www.gov.pl/web/finanse/przedluzenie-odroczenia-kar-za-bledy-w-stosowaniu-ksef-do-konca-2027-r
      (Tier 3, HIGH as announcement); https://legislacja.rcl.gov.pl/projekt/12414954 (bill);
      `sankcje-ksef-ud477.md` facts 1, 4, 5, 8. Ania: yes, one sentence + link
      `/blog/kary-ksef-2027-2028`.
    - UD477 status after 2026-10-23: NOT RE-VERIFIED in this run.

### D. Wynajmujący czynny VAT i JDG (pytanie 5)

13. **Czynny VAT / JDG: zasady jak u każdego podatnika.** KB extract text (pkt 1.3): „Do wystawienia
    faktury zobowiązani są wszyscy podatnicy VAT (czynni i zwolnieni) wykonujący działalność
    gospodarczą." Art. 106ga ust. 1 (KB verbatim): „Podatnicy są obowiązani wystawiać faktury
    ustrukturyzowane przy użyciu Krajowego Systemu e-Faktur."
    - Source: Podręcznik cz. II pkt 1.3 (KB extract), Tier 2; Dz.U. 2026 poz. 1263 art. 106ga ust.
      1, Tier 1. Confidence: HIGH (KSeF obligation); MEDIUM for „always invoice to a business": the
      general invoice obligation (art. 106b ust. 1 pkt 1) is NOT IN KB verbatim.
    - Even a VAT-czynny landlord renting a flat for housing remains under the art. 43 ust. 1 pkt 36
      exemption, and art. 106b ust. 2 (fact 4) covers art. 43 ust. 1 sales. The KB does not say this
      in one sentence; it combines facts 3 and 4. Confidence: MEDIUM (COMBINATION).
    - Rent tax point (KB verbatim, art. 19a ust. 5 pkt 4 lit. b): obligation arises on „wystawienia
      faktury z tytułu […] świadczenia usług […] najmu, dzierżawy, leasingu lub usług o podobnym
      charakterze"; art. 19a ust. 7: if not issued or issued late, „obowiązek podatkowy powstaje z
      chwilą upływu terminów wystawienia faktury określonych w art. 106i ust. 3 i 4, a w przypadku
      gdy nie określono takiego terminu – z chwilą upływu terminu płatności"; art. 106i ust. 3 for
      pkt 4 (KB paraphrase): „z upływem terminu płatności".
      - Source: `kurs-waluty-art-31a.md` (quoted from Dz.U. **2025 poz. 775**, s. 29–30, not from
        the 2026 consolidated text) and `terminy-ksef-data-wystawienia.md` fact 11. Tier 1.
        Confidence: HIGH (text), MEDIUM (currency of the 2025 text). Ania: only if VAT czynny.
    - Published post `/blog/ksef-od-1-kwietnia-2026` already lists „wynajmujący nieruchomości
      komercyjne" among those obliged.

### E. NIP, PESEL, logowanie (pytanie 4)

14. **Identyfikator: PESEL vs NIP.** KB extract text (pkt 1.2.1): „Podatnik VAT czynny → NIP";
    „Osoby fizyczne niebędące zarejestrowanymi podatnikami VAT → PESEL"; „Osoby prowadzące
    działalność nierejestrowaną mogą uzyskać NIP składając VAT-R + NIP-7 do naczelnika US." WAŻNE:
    „Zgłoszenia NIP-7 i VAT-R można złożyć przez e-Urząd Skarbowy (24/7). US nada NIP maksymalnie w
    ciągu 3 dni od otrzymania poprawnego zgłoszenia."
    - Source: Podręcznik cz. II, pkt 1.2.1 (KB extract). Tier 2. Confidence: HIGH for działalność
      nierejestrowana; MEDIUM for najem prywatny (the NIP-7/VAT-R sentence names only działalność
      nierejestrowana). Ania: yes.

15. **Bez NIP sprzedawcy nie ma faktury w KSeF.** MF FAQ Q14 (KB paraphrase): KSeF cannot issue an
    invoice without the seller's NIP (VAT-R and NIP-7 first). KB extract text (pkt 1.2.1): „Jeśli
    faktura uproszczona podlega wystawieniu w KSeF, wymagany jest NIP sprzedawcy."
    - Source: FAQ KSeF 2.0 (`zwolniony-z-vat-ksef.md` fact 14), Tier 3, HIGH (paraphrase only);
      Podręcznik cz. II pkt 1.2.1, Tier 2, HIGH. Ania: yes.

16. **Logowanie do Aplikacji Podatnika.** Login screen: „Zaloguj przez login.gov.pl" (Profil
    Zaufany, mObywatel, bankowość elektroniczna, e-dowód, via Węzeł krajowy) or „Zaloguj
    certyfikatem" (qualified signature/seal); then choose context identifier (NIP, internal
    identifier, VAT-UE). Owner permissions are assigned automatically to the taxpayer's NIP for a
    natural person with business (JDG), no ZAW-FA needed.
    - Source: Podręcznik AP (06.08.2026) ch. 4.1, pp. 13–15; Podręcznik cz. I (06.08.2026) p. 57
      (`logowanie-ksef.md` facts 1, 8, 10);
      https://ksef.podatki.gov.pl/media/qocjn3ai/podrecznik-uzytkownika-aplikacji-podatnika-ksef-20_06082026.pdf,
      https://ksef.podatki.gov.pl/media/dmrfdixs/podrecznik-ksef-20-cz-i-rozpoczecie-korzystania-z-ksef-06082026.pdf.
      Tier 2. HIGH. Production: https://ap.ksef.mf.gov.pl.
    - **GAP / NOT IN KB:** whether a natural person **without JDG** but with NIP (najem prywatny)
      gets owner permissions automatically in the same way. The KB states it only for JDG / „sole
      trader who is a VAT taxpayer and has a NIP" (FAQ Uprawnienia Q2–Q4, `zwolniony-z-vat-ksef.md`
      fact 14). Likely the same, but do not state it as MF's position.
    - Free tools: Aplikacja Podatnika, Aplikacja Mobilna KSeF, e-mikrofirma (Podręcznik cz. I s. 21;
      cz. II s. 96; `koniec-limitu-10000-zl.md` fact 9). e-mikrofirma KSeF scope: „w ograniczonym
      zakresie" (our FAQ wording, MEDIUM, `ksef-dla-jdg.md` fact 3.2). Whether e-mikrofirma serves
      persons without JDG: NOT IN KB.
    - Mobile app login: NOT IN KB (`logowanie-ksef.md` fact 21).

### F. Strona najemcy (pytanie 6)

17. **Najemca-firma dostaje fakturę w KSeF po NIP; od wynajmującego nie wymaga to nic poza poprawnym
    NIP nabywcy.** KB: buyer with Polish NIP → NIP in `Podmiot2/DaneIdentyfikacyjne/NIP`; on that
    basis the invoice is available to the buyer in KSeF; a wrong NIP assigns it to the holder of
    that NIP. Receiving in KSeF applies from 1.02.2026; free MF tools suffice.
    - Source: Podręcznik cz. II pkt 1.6.4, 2.1.4, 5.2 (`faktura-dla-osoby-prywatnej-ksef.md` fact
      10); cz. II s. 96 (`koniec-limitu-10000-zl.md` fact 8). Tier 2. HIGH. Ania: yes (ask the
      tenant for the NIP).

18. **Najemca prywatny (dobrowolna faktura w KSeF):** delivered outside KSeF in an agreed way, with
    QR code; consumer downloads it via QR or anonymous access without logging in (art. 106gb ust. 4;
    Podręcznik cz. II pkt 5.3, 5.5, 5.7). Source: `faktura-dla-osoby-prywatnej-ksef.md` facts
    5–8, 19. Tier 1/2. HIGH. Ania: low.
    - **GAP:** whether a private landlord with only PESEL, as a **buyer** (e.g. utilities for the
      flat), counts as „osoba fizyczna nieprowadząca działalności gospodarczej" or as a taxpayer
      without NIP: NOT SETTLED in KB (`faktura-dla-osoby-prywatnej-ksef.md` fact 9). Skip in post.

### G. Refakturowanie mediów (pytanie 7)

19. **NOT IN KB.** No MF source in the KB covers re-invoicing utilities (media) by a landlord, their
    separate vs composite treatment with rent, or their VAT rate/exemption. The only KB link is that
    art. 19a ust. 5 pkt 4 lists energy, water/sewage (annex 3 poz. 24–37, 50, 51, not re-verified)
    and rental among services taxed on invoice issue (fact 13). Do not write about it.

## Contradictions & Ambiguities

- **Which provision governs „na żądanie" for najem.** KB extract cites art. 106b ust. 3 **pkt 1 lit.
  a** for „no invoice even on request" to a natural person (fact 5), while the statute fragment for
  exempt sales on request is art. 106b ust. 3 **pkt 2**, which `zwolniony-z-vat-ksef.md` fact 4
  labels „Applies to business and consumer buyers alike". Pkt 1 lit. a is NOT IN KB verbatim, so the
  interplay (exception for 19a ust. 5 pkt 4 vs general on-request rule for exempt sales) cannot be
  quoted. Use the Podręcznik formulation, attributed to MF.
- **Pkt 1.3 exclusion „czynności z art. 19a ust. 5 pkt 4 (najem…)"** does not say for which buyers
  it applies; read with pkt 1.2.1 (invoice on request for użytkowy to podatnik) it covers
  natural-person buyers, but the KB extract does not state the scope.
- **Edition:** cz. II KB extract = 2026-02-01 edition; the 2026-08-06 edition was not re-extracted.
- **Art. 19a text** quoted from Dz.U. 2025 poz. 775, not Dz.U. 2026 poz. 1263.

## Unsettled Questions (do not answer definitively)

- Flat rented to a company for its employee: art. 43 ust. 1 pkt 36 or not; invoice on request?
  (fact 7)
- Does art. 43 ust. 1 pkt 36 rent count towards the 240 000 zł limit? (fact 2)
- Does a person with najem prywatny and NIP get automatic owner permissions in KSeF like a JDG?
  (fact 16)
- How the 3-month request window works for monthly rent; invoice for 2026 rent issued in 2027 (facts
  6, 10).
- Private landlord as a buyer: consumer or taxpayer without NIP? (fact 18)
- Refakturowanie mediów (fact 19).
- UD477 status after 2026-10-23 (fact 12).

## Suggested Sources Section

- Podręcznik KSeF 2.0 cz. II, Wystawianie i otrzymywanie faktur w KSeF (06.08.2026), pkt 1.2.1, 1.3:
  https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
- Podręcznik KSeF 2.0 cz. I (06.08.2026), s. 57:
  https://ksef.podatki.gov.pl/media/dmrfdixs/podrecznik-ksef-20-cz-i-rozpoczecie-korzystania-z-ksef-06082026.pdf
- Ustawa o VAT, tekst jednolity Dz.U. 2026 poz. 1263 (art. 43 ust. 1 pkt 36, 106b, 106ga, 106ni,
  113, 145m): https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf
- MF, Najczęstsze pytania (Q2, Q12–Q14): https://ksef.podatki.gov.pl/ksef-news/najczestsze-pytania/
- MF, Podstawy prawne oraz kluczowe terminy:
  https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/podstawy-prawne-oraz-kluczowe-terminy/
- MF, Pytania i odpowiedzi KSeF 2.0: https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20
- MF, przedłużenie odroczenia kar (16.09.2026):
  https://www.gov.pl/web/finanse/przedluzenie-odroczenia-kar-za-bledy-w-stosowaniu-ksef-do-konca-2027-r
- Aplikacja Podatnika KSeF 2.0: https://ap.ksef.mf.gov.pl

Internal links (published, link instead of restating): `/blog/zwolniony-z-vat-ksef`,
`/blog/faktura-dla-osoby-prywatnej-ksef`, `/blog/ksef-limit-10000-zl`,
`/blog/koniec-limitu-10000-zl`, `/blog/kary-ksef-2027-2028`, `/blog/ksef-dla-jdg`.

## Warning: Common Misconceptions

- **„Bez firmy nie dotyczy mnie VAT ani KSeF."** Najem prywatny = podatnik VAT (fact 1); zwolnienie
  z VAT nie zwalnia z KSeF, gdy faktura dla firmy powstaje (facts 6, 9).
- **„Każdy najemca może żądać faktury."** Najemca prywatny nie może skutecznie zażądać (fact 5, per
  MF).
- **„Wystawię rachunek."** Zwolniony podatnik dokumentuje fakturą, nie rachunkiem (fact 8).
- **„Limit 10 000 zł działa dalej w 2027."** Art. 145m kończy się 31.12.2026 (facts 10, 11).
- **„Kary od 2028 to już prawo."** UD477 nieuchwalony; ustawa mówi 1.01.2027 (fact 12).
- **„Faktura w KSeF na PESEL."** KSeF wymaga NIP sprzedawcy (fact 15).
- **Art. 106gc as penalty article:** stale; the penalty is art. 106ni (`sankcje-ksef-ud477.md` fact
  2).
