# Research Brief: Faktura dla osoby prywatnej a KSeF

**Requested by:** Orchestrator (content backlog item `faktura-dla-osoby-prywatnej-ksef`) **Date:**
2026-10-08 **For content:** Blog post "Faktura dla osoby prywatnej a KSeF" **Persona:** Ania, JDG
freelancer (czasem wystawia fakturę klientowi prywatnemu)

**Provenance:** built only from the repo knowledge base (baseline
`docs/knowledge-base/WATCHLIST.md`, last checked 2026-10-07: VAT Act consolidated text Dz.U. 2026
poz. 1263; Podręcznik KSeF 2.0 editions of 2026-08-06). No gov.pl source was fetched in this run
(egress blocked). Quotes marked "KB" are as recorded in the named brief; the KB extract of
Podręcznik cz. II (`podrecznik-ksef-20-czesc-ii.md`) is a condensed Polish summary of the 2026-02-01
edition, not a verbatim transcript, so its lines are cited as "KB extract text", not as MF verbatim.

**Target query:** „faktura dla osoby prywatnej KSeF"

**Answer in two sentences:** Faktura dla osoby fizycznej nieprowadzącej działalności gospodarczej
nie podlega obowiązkowi wystawiania w KSeF (ustawa o VAT, art. 106ga ust. 2 pkt 4; FAQ MF), więc
możesz ją wystawić jak dotąd, na papierze albo elektronicznie (np. PDF). Możesz ją też dobrowolnie
wystawić w KSeF (art. 106ga ust. 4; FAQ MF), ale wtedy klient i tak nie dostaje jej „w KSeF", tylko
w sposób z Tobą uzgodniony, z kodem QR (art. 106gb ust. 4; Podręcznik KSeF 2.0 cz. II, pkt 5.3).

**What changes the answer:**

- **Nabywca podaje NIP / kupuje na firmę:** to już nie jest osoba „nieprowadząca działalności";
  faktura dla podatnika z NIP idzie przez KSeF (art. 106ga ust. 1), a do 31.12.2026 może być poza
  KSeF tylko w ramach limitu 10 000 zł (art. 145m). Kto rozstrzyga status nabywcy: GAP (fakt 9).
- **Data:** wyłączenie z art. 106ga ust. 2 pkt 4 nie ma daty końcowej w KB, w odróżnieniu od art.
  145m i 145n (oba do 31.12.2026) (fakt 6).
- **Sprzedawca zwolniony z VAT (art. 113):** fakturę dla osoby prywatnej wystawia tylko na żądanie
  (art. 106b ust. 2 i ust. 3 pkt 2), żądanie w ciągu 3 miesięcy (fakt 13).
- **Sprzedaż przez kasę fiskalną:** faktura do paragonu dla konsumenta dalej dobrowolnie w KSeF;
  zmiany od 2027 dotyczą faktur dla podatników (fakt 12).
- **Najem prywatny na rzecz osoby fizycznej:** brak obowiązku wystawienia faktury nawet na żądanie
  (fakt 14).

## Key Facts (ready to use)

### A. Wyłączenie konsumenta z obowiązku KSeF

1. **Obowiązek KSeF nie obejmuje faktur dla osoby fizycznej nieprowadzącej działalności
   gospodarczej.** Correction to the request: the consumer exclusion is **art. 106ga ust. 2 pkt 4**,
   not pkt 1 (pkt 1 and 2 = sprzedawca bez siedziby / stałego miejsca działalności w Polsce).
   - KB verbatim (statute fragment): obligation does not cover invoices to a „osoba fizyczna
     nieprowadząca działalności gospodarczej" — `zwolniony-z-vat-ksef.md`, fact 10.
   - KB verbatim (art. 106ga ust. 1): „Podatnicy są obowiązani wystawiać faktury ustrukturyzowane
     przy użyciu Krajowego Systemu e-Faktur." — `koniec-limitu-10000-zl.md`, fact 2.
   - Source: Ustawa o VAT, tekst jednolity Dz.U. 2026 poz. 1263, art. 106ga ust. 1 i ust. 2 pkt 4.
     Tier 1 (law). URL (found in `zwolniony-z-vat-ksef.md` fact 1 and in 11 PL posts):
     https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf ; ISAP:
     https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260001263
   - Note: KB holds only the fragment above, not the full wording of pkt 4. Confidence: HIGH (cited
     identically in 4 briefs: `zwolniony-z-vat-ksef.md`, `koniec-limitu-10000-zl.md`,
     `faktura-z-kasy-fiskalnej-ksef-2027.md`, `kary-ksef-2027-2028.md`). Ania-relevant: yes.

2. **Wystawienie faktury konsumenckiej w KSeF jest dobrowolne, także faktury do paragonu.**
   - KB verbatim (FAQ MF): „Wystawianie w KSeF faktur na rzecz konsumentów nie jest obowiązkowe.
     Jeżeli jednak podatnik wyraża taką chęć to może taką fakturę wystawić w KSeF (w tym fakturę do
     paragonu)." — `faktura-z-kasy-fiskalnej-ksef-2027.md`, fact 5.
   - Statute: art. 106ga ust. 4 allows structured invoices in the excluded cases voluntarily —
     `zwolniony-z-vat-ksef.md`, fact 10 (paraphrase only, no verbatim of ust. 4 in KB).
   - FAQ also: „wystawianie faktur B2C … w KSeF jest dobrowolne" (Wystawianie faktur Q5); invoices
     for individuals are issued on the consumer's request, need not be in KSeF, seller may send them
     voluntarily (Q54) — `zwolniony-z-vat-ksef.md`, fact 10. Q numbers unreliable, the FAQ page
     numbers each section from 1 (`mf-faq-podreczniki-2026.md`, fact 2).
   - Source: FAQ KSeF 2.0 (Tier 3, MF guidance) + art. 106ga ust. 4 (Tier 1). URL (in
     `faktura-z-kasy-fiskalnej-ksef-2027.md` and published post
     `faktura-z-kasy-fiskalnej-ksef-2027`):
     https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20/ Confidence: HIGH. Ania-relevant: yes.

3. **If not issued in KSeF, the consumer gets the invoice „w dotychczasowy sposób" (papier /
   elektronicznie, np. PDF).** Faktura elektroniczna (art. 2 pkt 32) = dowolny format, np. PDF
   e-mailem, i nie jest przesyłana do KSeF.
   - KB: `faktura-z-kasy-fiskalnej-ksef-2027.md` fact 5 (phrase „w dotychczasowy sposób");
     `podrecznik-ksef-20-czesc-ii.md` §1.1 (KB extract text: „Faktura elektroniczna nie musi być
     wystawiana przy użyciu struktury FA, nie jest przesyłana do KSeF, może być dowolnym plikiem
     (np. PDF) przesyłanym e-mailem.").
   - Source: FAQ KSeF 2.0; Podręcznik KSeF 2.0 cz. II, §1.1. Tier 3 / Tier 2. Confidence: HIGH.
     Ania-relevant: yes.

### B. Jeśli wystawiasz w KSeF: jak konsument dostaje fakturę

4. **XML: nabywca-konsument → `Podmiot2/DaneIdentyfikacyjne/BrakID` = `1`; `Nazwa` obowiązkowa.**
   - KB extract text: „Konsument → `BrakID = 1`." — Podręcznik KSeF 2.0 cz. II, §2.1.6
     (`podrecznik-ksef-20-czesc-ii.md`).
   - FA(3) sheet §6.2: `BrakID` „"1" = purchaser has no tax ID or it doesn't appear on invoice (e.g.
     consumer)"; it is one choice among NIP / KodUE+NrVatUE / KodKraju+NrID / BrakID; `Nazwa`
     Mandatory (max 512) — `packages/validator/docs/fa3-information-sheet.md`, §6.2. FA(3) sheet URL
     (in `mf-faq-podreczniki-2026.md` fact 4):
     https://ksef.podatki.gov.pl/media/nuclnu0w/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf
   - Also: `JST` and `GV` in Podmiot2 are Mandatory (value „2" when not applicable) — FA(3) sheet,
     §6.1. Confidence: HIGH. Ania-relevant: low (program fills it); useful for a code snippet.

5. **Consumer is an art. 106gb ust. 4 buyer: invoice handed over in an agreed way, with QR code;
   consumer can download it from KSeF without logging in.**
   - KB extract text (§5.3.1): „Art. 106gb ust. 4 — obowiązek przekazania w sposób uzgodniony gdy
     nabywca to: … Konsument. Faktura poza KSeF → obowiązkowy kod/kody QR."
   - KB extract text (§5.3.2): „Gdy konsument chce odebrać fakturę w KSeF → sprzedawca wydaje kod
     QR + dane dostępowe. Konsument po zeskanowaniu QR i wpisaniu danych pobiera fakturę bez
     uwierzytelnienia."
   - Statute pointer: art. 106gb ust. 4 pkt 6 (consumer) — `zwolniony-z-vat-ksef.md`, fact 10.
   - How to agree: statute names no method; no form of agreement prescribed (FAQ Q25) —
     `aplikacja-podatnika-ksef-pierwsza-faktura.md`, fact 13.
   - Source: Podręcznik KSeF 2.0 cz. II, §1.6.5, §5.3.1, §5.3.2; ustawa art. 106gb ust. 4. URL of
     current edition (06.08.2026; KB extract is of the 01.02.2026 edition, changes judged minor; in
     `podrecznik-ksef-20-czesc-ii.md` header and 11 PL posts):
     https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
     Confidence: HIGH. Ania-relevant: yes.

6. **QR on the copy for the consumer: online invoice → one QR code with the KSeF number under it;
   offline invoice without a KSeF number yet → two QR codes („OFFLINE" + „CERTYFIKAT").** Kod I
   holds: adres zasobu, data wystawienia (P_1), NIP sprzedawcy, wyróżnik (skrót SHA-256 pliku XML).
   - Source: Podręcznik KSeF 2.0 cz. II, §1.6.5 („Kody QR na fakturze poza KSeF"), §1.6.6, §5.4.1,
     §5.4.3; `awaria-ksef-offline.md` fact 6 (consumer gets two codes before the number, one after).
     Confidence: HIGH. Ania-relevant: partly (Aplikacja Podatnika issues online only, FAQ
     „Najczęstsze pytania" Q11, `mf-faq-podreczniki-2026.md` fact 1).

7. **Dostęp dwuetapowy (QR):** krok 1 skan → podstawowe dane (nr KSeF, NIP sprzedawcy, data
   wystawienia itd.) albo informacja o braku faktury w KSeF; krok 2 → numer faktury (P_2),
   „identyfikator podatkowy nabywcy lub informacja o braku", kwota należności ogółem (P_15) →
   pobranie XML lub PDF bez uwierzytelnienia. Kilka błędnych prób → czasowa blokada. Korekta: dane z
   faktury korygującej.
   - Source: Podręcznik KSeF 2.0 cz. II, §5.5 (KB extract text). Confidence: HIGH. Ania-relevant:
     yes (what to tell the client).

8. **Dostęp anonimowy (bez QR), w Aplikacji Podatnika bez logowania:** numer KSeF, numer faktury
   (P_2), NIP/identyfikator nabywcy lub informacja o braku, imię i nazwisko / nazwa nabywcy lub
   informacja o braku, P_15 (§ 8 rozporządzenia). Dostęp z QR „nie wymaga ręcznego wpisywania numeru
   KSeF ani podawania imienia/nazwiska nabywcy".
   - Source: Podręcznik KSeF 2.0 cz. II, §5.7 (KB extract text); anonymous preview offers XML or PDF
     (Podręcznik Aplikacji Podatnika, p. 21 — `aplikacja-podatnika-ksef-pierwsza-faktura.md`, fact
     10). Confidence: HIGH. Ania-relevant: yes.

### C. Przypadki mieszane

9. **Kto jest „konsumentem", a kto podatnikiem bez NIP.** Podręcznik: osoba wykonująca działalność
   nierejestrowaną (rękodzieło, usługi kosmetyczne, krawieckie) i osoba prowadząca najem prywatny są
   podatnikami VAT, choć nie są w CEIDG; identyfikator: podatnik VAT czynny → NIP; osoby fizyczne
   niebędące zarejestrowanymi podatnikami VAT → PESEL; wyjątek: działalność nierejestrowana
   zarejestrowana dla VAT lub z kasą → NIP.
   - Source: Podręcznik KSeF 2.0 cz. II, §1.2.1 (KB extract text). Confidence: HIGH (as SELLER-side
     rules).
   - Art. 106gb ust. 4 lists „Podmiot bez NIP" and „Konsument" as separate categories (§1.6.5,
     §5.3.1), so both receive the invoice outside KSeF in the agreed way.
   - **GAP:** KB does not say whether a person running działalność nierejestrowaną / najem prywatny,
     when BUYING, counts as „osoba fizyczna nieprowadząca działalności gospodarczej" under art.
     106ga ust. 2 pkt 4, or whether an invoice to such a buyer is in mandatory KSeF (with BrakID or
     PESEL in NrID). Do not answer definitively.

10. **Klient prywatny podaje NIP / JDG kupuje prywatnie albo na firmę.**
    - KB: buyer with Polish NIP → NIP must be in `Podmiot2/DaneIdentyfikacyjne/NIP`; on that basis
      the invoice is made available to the buyer in KSeF (Podręcznik cz. II, §2.1.4, §5.2; FA(3)
      sheet §6.2 „CRITICAL RULE — NIP vs NrVatUE vs NrID"). A wrong NIP assigns the invoice to the
      holder of that NIP (§1.6.4, `podrecznik-ksef-20-czesc-ii.md`: „faktura z błędnym NIP jest
      przypisana do podmiotu o tym NIP").
    - **GAP:** no MF source in KB addresses who decides whether a JDG owner buys privately or for
      the business, whether the seller may rely on the buyer's declaration, or whether a NIP given
      by the buyer turns the sale into a mandatory-KSeF invoice. Treat as „zapytaj księgową" in the
      post.

11. **Rolnik ryczałtowy.** KB covers only: rolnik ryczałtowy zwolniony z obowiązku fakturowania
    (art. 117) may issue a rachunek (Podręcznik cz. II, §1.3); faktury VAT RR exist in KSeF (FA_RR
    schema; Podręcznik cz. II, §7 storage list) and are optional in KSeF from 2026-04-01 (MF
    legal-basis page, `mf-faq-podreczniki-2026.md` fact 6, URL there:
    https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/podstawy-prawne-oraz-kluczowe-terminy/).
    - **GAP:** rolnik ryczałtowy as a BUYER of Ania's service (consumer or not) is not covered.
    - **UNVERIFIED, do not use:** `limit-10000-zl.md` facts 5.1/misconception 3 say rolnik
      ryczałtowy is „excluded from KSeF" under „Art. 43 ust. 1 pkt 3"; that claim is sourced from
      our own FAQ content (`limity-i-wylaczenia.mdx`), not from an MF document.

### D. Daty, limit 10 000 zł, kasa

12. **Wyłączenie konsumenckie nie wygasa 31.12.2026.** KB describes art. 106ga ust. 2 exclusions as
    permanent: „Faktury dla osób fizycznych nieprowadzących działalności są poza obowiązkiem na
    stałe (art. 106ga ust. 2 pkt 4)" (`koniec-limitu-10000-zl.md`, What changes the answer);
    „Wyłączenia z obowiązku stałe (art. 106ga ust. 2)" (`kary-ksef-2027-2028.md`, fact 11). By
    contrast art. 145m (10 000 zł) and art. 145n (kasy, paragon z NIP) apply only until 31.12.2026.
    MF FAQ: from 2027 an invoice for a cash-register sale must be in KSeF „jeśli dotyczy sprzedaży
    na rzecz podatnika"; consumer invoices need not be (`koniec-limitu-10000-zl.md`, fact 6).
    Source: Dz.U. 2026 poz. 1263 art. 106ga, 145m, 145n; FAQ KSeF 2.0. Confidence: HIGH (the word
    „stałe" is the KB's characterisation; no sunset clause is recorded for ust. 2 pkt 4).
    Ania-relevant: yes.

13. **Konsumenckie faktury nie wliczają się do limitu 10 000 zł (art. 145m).** KB extract text: „nie
    wlicza się faktur na rzecz konsumentów, faktur z kas rejestrujących, paragonów fiskalnych
    uznawanych za faktury" (Podręcznik cz. II, §1.2.1; page 9 of the 06.08.2026 edition per
    `faktura-z-kasy-fiskalnej-ksef-2027.md` fact 12). FAQ „Najczęstsze pytania" Q12–Q14: limit
    counts only invoices that must be issued in KSeF (`mf-faq-podreczniki-2026.md` fact 1; URL
    there: https://ksef.podatki.gov.pl/ksef-news/najczestsze-pytania/). FAQ Q22 also excludes
    invoices „to private persons" (`zwolniony-z-vat-ksef.md`, fact 7). Confidence: HIGH. Relevance
    after 31.12.2026: none (limit expires).

14. **Sprzedawca zwolniony z VAT:** „Podatnik nie jest obowiązany do wystawienia faktury w
    odniesieniu do sprzedaży zwolnionej od podatku na podstawie art. 43 ust. 1, art. 113 ust. 1 i 9,
    …" (art. 106b ust. 2); on request within 3 months from the end of the month of delivery /
    payment (art. 106b ust. 3 pkt 2), „Applies to business and consumer buyers alike". If he
    documents the sale, it must be a faktura, not a rachunek (FAQ Q12, MEDIUM). Source:
    `zwolniony-z-vat-ksef.md` facts 3, 4, 11; Dz.U. 2026 poz. 1263. Confidence: HIGH (ust. 2-3),
    MEDIUM (rachunek).

15. **Najem prywatny na rzecz osoby fizycznej** (cele mieszkaniowe, art. 43 ust. 1 pkt 36, lub
    użytkowe ze zwolnieniem art. 113): „brak obowiązku wystawienia faktury nawet na żądanie (art.
    106b ust. 3 pkt 1 lit. a). Podatnik może wystawić fakturę dobrowolnie (w KSeF lub poza KSeF)."
    Source: Podręcznik cz. II, §1.2.1 (KB extract text). Confidence: HIGH. Ania-relevant: niche.

16. **Faktura do paragonu dla konsumenta:** dobrowolnie w KSeF (fact 2). Art. 106b ust. 5 (NIP on
    the receipt as a condition) concerns invoices „na rzecz podatnika"; art. 106h ust. 1 (keep
    receipt number + cash register number, or the paper receipt, in documentation) applies to
    invoices for cash-register sales. Source: `faktura-z-kasy-fiskalnej-ksef-2027.md` facts 7, 8.
    Full topic covered by the published post `/blog/faktura-z-kasy-fiskalnej-ksef-2027`; link, do
    not restate. Confidence: HIGH (text), MEDIUM (106h for KSeF invoices).

17. **Data otrzymania:** for art. 106gb ust. 4 buyers (incl. consumers) = date of actual receipt
    outside KSeF (art. 106na ust. 4), not the date the KSeF number is assigned. Source: Podręcznik
    cz. II, §5.1 (KB extract text). Confidence: HIGH. Ania-relevant: low.

### E. Kary (only for context)

18. **Art. 106ni penalties concern failing the KSeF obligation; consumer invoices are outside the
    obligation, so the sanction does not apply to issuing them outside KSeF.** The second half is a
    logical inference: KB does not contain an MF statement on it. Timeline for the post if needed:
    art. 106ni in force from 2027-01-01 per the law; MF announced 2026-09-16 a deferral to end of
    2027; draft UD477 (not law) moves it to 2028-01-01. Source: CLAUDE.md; `sankcje-ksef-ud477.md`;
    `kary-ksef-2027-2028.md`. Confidence: HIGH (timeline), LOW (inference). Suggest omitting from
    the post or one sentence linking `/blog/kary-ksef-2027-2028`.

### F. Konsument a logowanie do KSeF

19. **Consumer receives invoices in KSeF only through QR/anonymous access, not by logging in.** KB:
    a buyer gets an invoice in KSeF „na podstawie NIP w polu NIP" (Podręcznik cz. II, §5.2);
    consumer → BrakID, so the invoice is not assigned to any consumer account; access is QR two-step
    or anonymous (§5.2: „Dostęp bez uwierzytelnienia: dwuetapowy (kod QR) lub anonimowy").
    - **GAP:** KB has no MF statement on whether a private person without NIP can authenticate in
      Aplikacja Podatnika and see invoices addressed to them (login briefs cover persons acting for
      taxpayers, e.g. by PESEL with granted permissions: `logowanie-ksef.md`). Do not tell readers
      „konsument ma konto w KSeF" or „nie może się zalogować"; say he downloads it via QR / numer
      KSeF without logging in.
    - Consumer can also verify the invoice: kod QR shows whether the invoice exists in KSeF (§5.5
      step 1). Confidence: HIGH (QR part).

## Unsettled Questions (do not answer definitively)

- Status kupującego z działalnością nierejestrowaną / najmem prywatnym / rolnika ryczałtowego jako
  „osoby fizycznej nieprowadzącej działalności" w art. 106ga ust. 2 pkt 4 (facts 9, 11).
- Klient prywatny z JDG podaje NIP do zakupu prywatnego, albo nie podaje NIP przy zakupie firmowym:
  kto decyduje i jakie skutki dla obowiązku KSeF (fact 10).
- Czy osoba bez NIP może zalogować się do KSeF jako nabywca (fact 19).
- Czy przy dobrowolnej fakturze konsumenckiej w KSeF można wpisać PESEL nabywcy (NrID) zamiast
  BrakID: Podręcznik §2.1.6 says „Konsument → BrakID = 1"; whether PESEL is permitted is not
  covered.
- Full verbatim of art. 106ga ust. 2 pkt 4 and ust. 4: only fragments/paraphrases in KB; verify
  against Dz.U. 2026 poz. 1263 when gov.pl is reachable.

## Already covered in published PL posts (link, don't restate)

- `/blog/faktura-z-kasy-fiskalnej-ksef-2027` §„Klient prywatny prosi o fakturę": 106ga ust. 2 pkt 4,
  dobrowolnie w KSeF, także do paragonu, 3 miesiące, numeracja.
- `/blog/zwolniony-z-vat-ksef` §„Faktura dla osoby prywatnej": exempt seller, on request, voluntary
  KSeF + agreed delivery (PDF).
- `/blog/koniec-limitu-10000-zl` (line „Konsumenci", 106ga ust. 2 pkt 4) and its login section.
- `/blog/ksef-limit-10000-zl` (B2C not counted), `/blog/kary-ksef-2027-2028` (stałe wyjątki).
- `/blog/faktura-zagraniczna-ksef`: `BrakID` = `1` XML snippet for buyers without an ID (foreign
  context).
- `/blog/ksef-od-1-kwietnia-2026` line 79: „są wyłączone z KSeF. Nadal możesz je wystawiać na
  papierze lub jako PDF" (omits the voluntary option; imprecise, see Misconceptions).
- **Inconsistency found:** `/blog/ksef-dla-jdg` FAQ „Co z fakturami dla konsumentów (B2C)?" cites
  „art. 106nd ust. 3 ustawy o VAT i rozporządzenie MF z 7.12.2025" as the basis of the consumer
  exclusion. Every KB brief cites art. 106ga ust. 2 pkt 4; no KB source supports 106nd ust. 3 for
  this. Flag for the Judge / content fix (not changed here).

## Suggested Sources Section

All URLs below already appear in the KB or a published post (location noted).

- Ustawa o VAT, tekst jednolity Dz.U. 2026 poz. 1263, art. 106b, 106ga, 106gb, 106na, 145m:
  https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf (`zwolniony-z-vat-ksef.md` fact 1; posts)
- Podręcznik KSeF 2.0 cz. II (06.08.2026), pkt 1.2.1, 1.6.5, 2.1.6, 5.3–5.7:
  https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
  (`podrecznik-ksef-20-czesc-ii.md` header; posts). Section numbers are from the 01.02.2026 edition;
  check they did not shift.
- FAQ KSeF 2.0: https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20/
  (`faktura-z-kasy-fiskalnej-ksef-2027.md`; post `faktura-z-kasy-fiskalnej-ksef-2027`)
- FAQ „Najczęstsze pytania" (Q12–Q14, limit):
  https://ksef.podatki.gov.pl/ksef-news/najczestsze-pytania/ (`mf-faq-podreczniki-2026.md`; posts)
- Broszura FA(3), Podmiot2/DaneIdentyfikacyjne (BrakID):
  https://ksef.podatki.gov.pl/media/nuclnu0w/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf
  (`mf-faq-podreczniki-2026.md` fact 4; posts). Posts now use the same current link
  (`broszura-fa3-wydania.md`).

## Warning: Common Misconceptions

- „Faktury dla osób prywatnych nie mogą trafić do KSeF" / „są wyłączone z KSeF": they are excluded
  from the obligation only; voluntary issuance is allowed (FAQ MF; art. 106ga ust. 4).
- „Jak wystawię w KSeF, klient sam ją tam znajdzie": the consumer has no NIP in the invoice, so the
  seller must hand it over in the agreed way with a QR code (art. 106gb ust. 4; Podręcznik §5.3).
- „Od 2027 wszystkie faktury idą przez KSeF": the 2027 change ends art. 145m/145n; the consumer
  exclusion of art. 106ga ust. 2 pkt 4 stays.
- „Faktury konsumenckie zjadają limit 10 000 zł": not counted (Podręcznik §1.2.1; FAQ).
- Legal basis „art. 106nd ust. 3" for B2C (seen in `/blog/ksef-dla-jdg`): not supported by the KB;
  use art. 106ga ust. 2 pkt 4.
- Stale pattern (KSeF 1.0 / fakultatywny okres): „nabywca musi zaakceptować KSeF" (art. 106na
  ust. 2) — repealed from 1.02.2026 (Podręcznik §6.1); irrelevant for consumers, who are handled via
  art. 106gb ust. 4.

## Freshness

2026-10-08. Review when: UD477 or any act amending art. 106ga / 106gb is published; a new Podręcznik
cz. II edition appears (section numbers); gov.pl becomes reachable (verify verbatim of art. 106ga
ust. 2 pkt 4 and ust. 4).
