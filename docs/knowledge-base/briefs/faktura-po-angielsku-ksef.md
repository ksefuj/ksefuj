# Research Brief: Faktura KSeF po angielsku

**Requested by:** Orchestrator (backlog item `faktura-po-angielsku-ksef`, `docs/content-backlog.md`)
**Date:** 2026-11-14 **For content:** blog post „Faktura KSeF po angielsku" (PL), link to
`/blog/faktura-zagraniczna-ksef` **Persona:** A (Ania, JDG, often invoices foreign clients)

**Provenance:** built only from the repo knowledge base. Baseline per
`docs/knowledge-base/WATCHLIST.md` (last checked 2026-10-07): VAT Act t.j. Dz.U. 2026 poz. 1263;
Podręcznik KSeF 2.0 cz. I–IV, editions of 2026-08-06. Live fetch attempted 2026-11-14:
`curl -m 15 https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20` → proxy
`CONNECT tunnel failed, response 403`. No official host was read in this run; every fact is **Live:
no**. The last live reading of the key sources was by the constitutional judge on 2026-10-16
(`pusta-faktura-pdf-xml.md`, section H and „Verified live on 2026-10-16"). The KB extract of
Podręcznik cz. II (`podrecznik-ksef-20-czesc-ii.md`) is a condensed Polish summary of the 2026-02-01
edition; its lines are marked „KB extract text" (near-verbatim, not a transcript).

**URLs used (all already in the KB):**

- [CZ2] Podręcznik KSeF 2.0 cz. II (06.08.2026):
  https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
- [FAQ] MF FAQ KSeF 2.0: https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20/
- [VAT] Ustawa o VAT, t.j. Dz.U. 2026 poz. 1263:
  https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf (ISAP:
  https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260001263)
- [XSD] Schemat FA(3): https://crd.gov.pl/wzor/2025/06/25/13775/schemat.xsd (bundled copy:
  `packages/validator/src/schemas/schemat.xsd`, read locally)
- [FA3] Broszura FA(3):
  https://ksef.podatki.gov.pl/media/nuclnu0w/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf
  (local English conversion `packages/validator/docs/fa3-information-sheet.md`)

---

**Target query:** „faktura KSeF po angielsku"

**Answer in two sentences:** Fakturą w KSeF jest plik XML FA(3) z numerem KSeF; MF pisze, że ten
plik może być po polsku, a faktura przekazana nabywcy poza KSeF (np. PDF dla klienta zagranicznego)
może być w języku obcym albo dwujęzyczna, i że sam XML też może zawierać dane w języku obcym ([CZ2]
pkt 1.6.5; [FAQ] „Wystawianie i otrzymywanie faktur" pyt. 32). Warunek MF: wersja obcojęzyczna musi
być merytorycznie zgodna z danymi w XML („po przetłumaczeniu"), a nazwy pól (znaczniki FA(3))
zostają polskie, bo wyznacza je schemat ([FAQ] pyt. 32; [XSD]).

**What changes the answer:**

- **Buyer has a Polish NIP (domestic B2B):** they receive the XML in KSeF; any English PDF is an
  extra copy that must carry the QR code ([CZ2] pkt 1.6.5, 1.6.6, 6.2; facts 6–7).
- **Buyer is foreign / without NIP / consumer (art. 106gb ust. 4):** invoice still issued in KSeF
  (unless an art. 106ga ust. 2 exclusion applies), then handed over in an agreed way with QR code;
  this is where the English or bilingual PDF lives (facts 8–10).
- **Seller outside KSeF in 2026 (art. 145m, ≤ 10 000 zł gross per month, until 31.12.2026):** no XML
  at all; the KB holds no MF statement on the language of such paper/PDF invoices (fact 13).
- **Mismatch between English PDF and XML:** MF requires consistency but names no consequence (NOT
  SETTLED, fact 5).

## Key Facts (ready to use)

### A. Language of the XML and of the visualisation

1. **Visualisation may be in a foreign language or bilingual; XML may be Polish; XML may also hold
   foreign-language data.** KB extract text: „Plik XML może być w języku polskim, a faktura
   udostępniona nabywcy poza KSeF — w języku obcym lub dwujęzycznie. Kluczowa jest merytoryczna
   zgodność. Nie ma przeszkód, aby sam plik XML zawierał dane w języku obcym."
   - Source: [CZ2] pkt 1.6.5 „Faktura wydana w sposób uzgodniony lub użyta poza KSeF" (s. 20–22 in
     the 06.08.2026 edition per the 2026-10-16 live check; the language sentence itself was not
     re-quoted in that check). KB: `podrecznik-ksef-20-czesc-ii.md` l. 253–255. Tier 2 (MF
     guidance). Confidence: HIGH that MF says this. Live: no. Ania-relevant: yes.
2. **FAQ: other language allowed, but content must match the XML after translation.** Partial
   verbatim: visualisation may be in another language „ale musi być zgodna pod względem
   merytorycznym (po przetłumaczeniu) z danymi w pliku XML".
   - Source: [FAQ] section „Wystawianie i otrzymywanie faktur", pyt. 32 (read live 2026-10-16,
     `pusta-faktura-pdf-xml.md` H11). Only this fragment is in the KB; full question/answer text not
     in KB. Tier 3. Confidence: HIGH. Live: no. Ania-relevant: yes.
   - Numbering note: `aplikacja-podatnika-ksef-pierwsza-faktura.md` fact 13 cites the same content
     as „FAQ Q16"; the KB records FAQ numbers as per-section and unreliable. Cite the section name
     plus question text, not the number alone.
3. **FA(3) element names are fixed Polish identifiers; the schema is declared `xml:lang="pl"`.**
   Root of [XSD]: `xml:lang="pl"`; same on the three `DefinicjeTypy` schemas (local check of
   `packages/validator/src/schemas/*.xsd`). Element names (`Podmiot2`, `FaWiersz`, `P_7`…) are
   defined by the schema and cannot be translated.
   - Source: [XSD] l. 1; `schemat-xsd-fa3.md` fact 1. Tier 2. Confidence: HIGH. Live: no (local
     bundled copy read). Ania-relevant: low (her program handles it).
   - Note: `xml:lang="pl"` on the schema documents the language of the schema's annotations; the KB
     has no MF statement linking it to the language of invoice data.
4. **The language of invoice data cannot be tagged in the XML.** FA(3) declares attributes only in
   `KodFormularza` (`kodSystemowy`, `wersjaSchemy`) and `Typ` in `Zalacznik` table columns; any
   other attribute, including `xml:lang="pl"` on a goods description, fails XSD validation.
   - Source: [XSD] (attribute declarations); our published validator page
     `apps/web/content/pl/validator/niedozwolony-atrybut-fa3.mdx` („Język tekstu: `xml:lang="pl"`
     przy opisie towaru" listed as a cause of the error). The page is our output, used here only as
     a pointer to the schema check; the schema is the source. Tier 2. Confidence: HIGH. Live: no.
     Ania-relevant: no (developer detail).
   - Implication (not MF text): a bilingual description goes into the text value itself (e.g. one
     `P_7` string), not into a language-tagged pair. Whether MF has a view on bilingual strings in
     one field: not found in corpus.

### B. Which document is „the invoice", mismatch risk

5. **XML in KSeF is the document; the PDF must not contradict it.** [FAQ] „KSeF w JST" pyt. 40: „Z
   formalnego punktu widzenia dokumentem jest format xml faktury." [CZ2] pkt 1.6.5 (06.08.2026):
   „należy zadbać o: jej spójność z zawartością pliku XML faktury w KSeF, czytelność dokumentu (…),
   brak sprzeczności pomiędzy zawartością pliku XML przesłanego do KSeF, przyjętego przez system a
   treścią udostępnianej faktury" and „faktura udostępniania poza KSeF lub używana poza KSeF musi
   zawierać elementy zgodne z tymi zawartymi w pliku XML."
   - Source: `pusta-faktura-pdf-xml.md` H9, H11 (read live 2026-10-16). Art. 2 pkt 32a [VAT]:
     „fakturze ustrukturyzowanej – rozumie się przez to fakturę wystawioną przy użyciu Krajowego
     Systemu e-Faktur wraz z przydzielonym numerem identyfikującym tę fakturę w tym systemie" (H8).
     Tier 1 (definition) / Tier 2–3 (consistency rule). Confidence: HIGH. Live: no.
   - **NOT SETTLED:** no MF source in the KB says what happens when an English PDF diverges from the
     XML or which one prevails (`pusta-faktura-pdf-xml.md`, NOT SETTLED item 1). A translation error
     is a mismatch risk; the fix for an error in the XML is a corrective invoice (art. 106j ust. 1;
     [CZ2] pkt 1.6.2). Do not state a consequence.
6. **MF: put payment data in the XML, not only on the (e.g. English) PDF.** KB extract text: „Nie
   jest zalecane przesyłanie do KSeF pliku XML z tylko podstawowymi danymi, a dodatkowych informacji
   (termin płatności, nr rachunku) tylko na wizualizacji." Visualisation may add data without system
   meaning (logo, BOK contact).
   - Source: [CZ2] pkt 1.6.5 („WAŻNE"). Tier 2 recommendation, not a prohibition. Confidence: HIGH.
     Live: no. Ania-relevant: yes.
7. **Polish buyer with NIP gets the XML in KSeF regardless of language; an extra PDF copy needs the
   QR code.** [CZ2] pkt 6.2 (06.08.2026): sellers „poza przesłaniem faktury do KSeF, nie wydają
   faktury poza systemem nabywcom krajowym posiadającym identyfikator podatkowy NIP" (transition
   context); pkt 1.6.6: „sprzedawca może dodatkowo wydać nabywcy fakturę poza KSeF np. wydruk tej
   faktury lub plik pdf, pamiętając o opatrzeniu tego dokumentu kodem QR". [FAQ] „Wystawianie i
   otrzymywanie faktur" pyt. 50: other channels „mają jedynie charakter pomocniczy i
   techniczno-organizacyjny."
   - Source: `pusta-faktura-pdf-xml.md` fact 11 (verified 2026-10-16, with caveat). Tier 2/3.
     Confidence: HIGH. Live: no. Ania-relevant: yes (e.g. English-speaking client registered in PL).

### C. Foreign buyer: when KSeF applies and how the English PDF reaches them

8. **Invoices to foreign business buyers go through KSeF; buyer identified without NIP.** Podmiot2
   choice: `NIP`, `KodUE` + `NrVatUE`, `KodKraju` + `NrID`, or `BrakID`.
   - Source: [FA3] §6.2 (English conversion); `faktura-zagraniczna-ksef.md` answer + fact 1 (art.
     106ga ust. 1: „Podatnicy są obowiązani wystawiać faktury ustrukturyzowane przy użyciu Krajowego
     Systemu e-Faktur."). Tier 1/2. Confidence: HIGH. Live: no. Ania-relevant: yes. Details belong
     in `/blog/faktura-zagraniczna-ksef`.
9. **Exclusions (art. 106ga ust. 2) — no KSeF obligation:** no seat/fixed establishment in PL (pkt
   1, 2), special procedures (pkt 3), buyer a private person (pkt 4), art. 106s regulation (pkt 5),
   art. 113a (pkt 6); ust. 4 allows consumer invoices in KSeF voluntarily.
   - Source: [VAT] art. 106ga (KB: `limity-i-wylaczenia.md` fact 7; `zwolniony-z-vat-ksef.md` fact
     12; `faktura-zagraniczna-ksef.md` fact 5). KB holds a list/paraphrase, not full verbatim of
     ust. 2. Tier 1. Confidence: HIGH for the list. Live: no. Ania-relevant: yes (foreign private
     client → not mandatory).
10. **Foreign buyer receives the invoice outside KSeF, in an agreed way, with QR code.** KB extract
    text [CZ2] pkt 5.3.1: „Art. 106gb ust. 4 — obowiązek przekazania w sposób uzgodniony gdy nabywca
    to: Podmiot zagraniczny (brak siedziby/stałego miejsca w PL lub stałe miejsce nieuczestniczące),
    Podatnik UE w procedurze SME, Podmiot bez NIP, Konsument. Faktura poza KSeF → obowiązkowy
    kod/kody QR." ONLINE: one QR code with the KSeF number below it; OFFLINE: two codes „OFFLINE" +
    „CERTYFIKAT" (pkt 5.4.1).
    - Source: [CZ2] pkt 1.6.5, 5.3.1, 5.4.1; [VAT] art. 106gb ust. 4–5 (read live 2026-10-16 per
      `pusta-faktura-pdf-xml.md`, s. 127). Method of agreement: statute names none, no form
      prescribed ([FAQ] per `aplikacja-podatnika-ksef-pierwsza-faktura.md` fact 13). Tier 1/2.
      Confidence: HIGH. Live: no. Ania-relevant: yes.
11. **Buyer without KSeF access can download the XML/PDF by QR code without logging in.** KB extract
    text [CZ2] pkt 5.3.2: „sprzedawca wydaje kod QR + dane dostępowe. (…) pobiera fakturę bez
    uwierzytelnienia." Aplikacja Podatnika anonymous search: „umożliwia pobranie faktury w wybranym
    formacie XML lub PDF" (AP manual s. 21, `pusta-faktura-pdf-xml.md` H12).
    - Tier 2. Confidence: HIGH. Live: no. Ania-relevant: medium.
    - Not found in corpus: the language of the PDF produced by the Aplikacja Podatnika or by
      `CIRFMF/ksef-pdf-generator` (KB records the generator only as a watched repo; content not
      reviewed).

### D. Item names and free text

12. **English item names in `P_7` are allowed by the schema.** `P_7` (FaWiersz) is `TZnakowy512`
    (`xsd:token`, 1–512 characters), documentation „Nazwa (rodzaj) towaru lub usługi"; no language
    restriction in the type. Combined with fact 1 („Nie ma przeszkód, aby sam plik XML zawierał dane
    w języku obcym").
    - Source: [XSD] l. 3099–3103 (local); `schemat-xsd-fa3.md` type table; [CZ2] per
      `podrecznik-ksef-20-czesc-ii.md` l. 464 („max 512 znaków"). Tier 2. Confidence: HIGH. Live:
      no. Ania-relevant: yes.

### E. Questions the KB does not cover

13. **Does the VAT Act require Polish on invoices?** Not covered: no KB source quotes a statutory
    language requirement for invoices (searched for „język polski", „w języku polskim"). Do not
    state either way.
14. **English UI of KSeF / Aplikacja Podatnika, or English official visualisation:** not covered in
    the KB. Only related fact: API error details for status 450 „są teraz zwracane w języku polskim"
    (API changelog 2.6.1, `kody-bledow-ksef.md`) — technical, not UI. Do not claim an English UI
    exists or not.
15. **Currency (one line):** foreign-currency invoices and the NBP rate are a separate topic, see
    `kurs-waluty-art-31a.md`; language does not change the currency rules.

## Unsettled Questions

- Consequence of a mismatch between the English/bilingual PDF and the XML (fact 5): MF states the
  requirement only.
- Whether one field may hold bilingual text („Usługa programistyczna / Software development") —
  allowed by schema type, no MF statement either way.
- Language of the statutory annotations (e.g. „odwrotne obciążenie", „metoda kasowa") on an English
  visualisation: KB says only that annotations must appear when present ([CZ2] pkt 1.6.5); no MF
  text on translating them. Do not tell Ania she may translate or must keep them in Polish.
- Language of invoices issued outside KSeF under art. 145m in 2026: not found in corpus.

## Suggested Sources Section

- Podręcznik KSeF 2.0, cz. II (06.08.2026), pkt 1.6.5, 1.6.6, 5.3, 5.4.1:
  https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
- MF, Pytania i odpowiedzi KSeF 2.0, „Wystawianie i otrzymywanie faktur" (pyt. o języku
  wizualizacji): https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20/
- Ustawa o VAT, t.j. Dz.U. 2026 poz. 1263, art. 2 pkt 32a, 106ga, 106gb ust. 4–5:
  https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260001263
- Schemat FA(3): https://crd.gov.pl/wzor/2025/06/25/13775/schemat.xsd

## Warning: Common Misconceptions

- „Faktury w KSeF muszą być po polsku" — contradicted by MF guidance (facts 1, 2); the only fixed
  Polish part is the schema's element names (fact 3).
- „Wystarczy przetłumaczyć PDF, XML może mieć mniej danych" — MF requires substantive consistency
  and recommends full data in XML (facts 5, 6).
- „Klient zagraniczny = faktura poza KSeF" — a foreign business buyer's invoice is issued in KSeF
  and only delivered outside it (facts 8, 10); only art. 106ga ust. 2 cases are excluded (fact 9).
- „Można oznaczyć język atrybutem `xml:lang`" — fails FA(3) XSD (fact 4).

## Not fetched live in this run

All of: [CZ2] PDF (pkt 1.6.5, 1.6.6, 5.3.1, 5.3.2, 5.4.1, 6.2), [FAQ] page („Wystawianie i
otrzymywanie faktur" pyt. 32, 50; „KSeF w JST" pyt. 40), [VAT] PDF and ISAP page (art. 2 pkt 32a,
106ga ust. 1–2, 4, 106gb ust. 4–5, 106j ust. 1, 145m), [FA3] PDF (§6.2), AP manual
(https://ksef.podatki.gov.pl/media/qocjn3ai/podrecznik-uzytkownika-aplikacji-podatnika-ksef-20_06082026.pdf,
s. 21), [XSD] at crd.gov.pl (bundled local copy read instead). Reason: proxy 403 on
ksef.podatki.gov.pl (attempted 2026-11-14); other official hosts not attempted per environment note.
