# Research Brief: Fałszywa faktura w KSeF (UPDATE)

**Requested by:** Copywriter (backlog item 1, `docs/content-backlog.md`) **Date:** 2026-10-11 **For
content:** UPDATE of `apps/web/content/pl/blog/falszywe-faktury-ksef.mdx` (keep slug, set `updated`)

**Target query:** „fałszywa faktura KSeF"

**Answer in two sentences:** Faktura z Twoim NIP-em trafia do Ciebie w KSeF automatycznie i nie da
się jej odrzucić; pomyłkę naprawia sprzedawca korektą do zera i nową fakturą, a podejrzenie
fałszerstwa zgłaszasz w Aplikacji Podatnika przyciskiem „Zgłoszenie nadużycia" (zgłoszenia trafiają
do KAS) (Podręcznik KSeF 2.0 cz. II pkt 5, 6.3; cz. III pkt 7). Prawo do odliczenia VAT powstaje w
okresie powstania obowiązku podatkowego, nie wcześniej niż w okresie otrzymania faktury, czyli dnia
nadania numeru KSeF, i wymaga spełnienia przesłanek z art. 86 oraz braku przesłanek negatywnych z
art. 88 (cz. II pkt 1.7, 5.1; ustawa o VAT art. 86 ust. 10b pkt 1, art. 106na ust. 3).

**What changes the answer:**

- **Pomyłka vs oszustwo:** pomyłka w NIP → korekta do zera + nowa faktura (cz. II pkt 6.3); faktury
  wystawionej przez pomyłkę nie zgłasza się jako fałszywej (cz. III pkt 7).
- **Ukrywanie faktur:** nadal tylko zapowiedziane (cz. III pkt 8); gdy wejdzie, ukryta faktura nie
  znika z KSeF, a sprzedawca nie dostaje informacji. Review on each new cz. III edition.
- **Faktura poza KSeF / offline24:** inna data otrzymania (faktyczne otrzymanie; cz. II pkt 1.7,
  1.8). Not central to this post.
- **Podatnik zwolniony z VAT:** nie odlicza VAT, więc część o odliczeniu go nie dotyczy (KB fact
  `jak-odebrac-fakture-ksef.md` fakt 4, note).

**Network check (2026-10-11):** one fetch of https://ksef.podatki.gov.pl/ → proxy 403 (CONNECT
rejected). Nothing below was fetched live. Every fact is cited from the KB (baseline per
`docs/knowledge-base/WATCHLIST.md`: VAT Act Dz.U. 2026 poz. 1263; Podręcznik cz. I–IV of 2026-08-06)
or from the published guide `apps/web/content/pl/guides/jak-odebrac-fakture-ksef.mdx`.

## Key Facts (ready to use)

URLs used below (all already in the KB or a published post):

- [CZ2] Podręcznik cz. II (06.08.2026):
  https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
- [CZ3] Podręcznik cz. III (06.08.2026):
  https://ksef.podatki.gov.pl/media/3ikdk3qm/podrecznik-ksef-20-cz-iii-dodatkowe-funkcjonalnosci-ksef-06082026.pdf
- [VAT] Ustawa o VAT, Dz.U. 2026 poz. 1263: https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf
- [NP] MF „Najczęstsze pytania": https://ksef.podatki.gov.pl/ksef-news/najczestsze-pytania/
- [FAQ] MF FAQ KSeF 2.0: https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20/

### A. Odliczenie VAT (fix for the post's art. 86 ust. 10 claim)

1. **Prawo do odliczenia powstaje w okresie powstania obowiązku podatkowego, nie wcześniej niż w
   okresie otrzymania faktury (art. 86 ust. 10b pkt 1).** KB text (cz. II pkt 1.7): „Prawo do
   odliczenia VAT naliczonego z faktury wystawionej poza KSeF powstaje w okresie, w którym powstał
   obowiązek podatkowy, nie wcześniej niż w okresie otrzymania faktury (art. 86 ust. 10b pkt 1)."
   - Source: [CZ2] pkt 1.7 (statute paraphrased by MF; Tier 1 via Tier 2). KB:
     `podrecznik-ksef-20-czesc-ii.md` §1.7 (extract of the 01.02.2026 edition). Not fetched live.
   - Confidence: HIGH for the rule as stated. Note: pkt 1.7 states it for invoices **outside KSeF**
     (luty–grudzień 2026).
2. **Data otrzymania faktury w KSeF = dzień przydzielenia numeru KSeF (art. 106na ust. 3).**
   - Source: [CZ2] pkt 5.1; [VAT] art. 106na ust. 3. KB: `podrecznik-ksef-20-czesc-ii.md` §5.1;
     `jak-odebrac-fakture-ksef.md` fakt 3. Not fetched live. Confidence: HIGH.
3. **Applying fact 1 to an ordinary KSeF (online) invoice combines facts 1 and 2; no KB sentence
   says it directly.** Confidence: MEDIUM. The copywriter may write it without attributing the
   combined sentence to MF (e.g. „z art. 86 ust. 10b pkt 1 i art. 106na ust. 3 wynika…" is
   acceptable only if hedged; safer: state both rules separately). Source:
   `jak-odebrac-fakture-ksef.md` fakt 4.
4. **The post's claim „prawo do odliczenia powstaje w okresie, w którym fakturę ujęto w ewidencji
   (art. 86 ust. 10)" is not supported by the KB and contradicts fact 1.** Recommendation: cut.
5. **Odliczenie wymaga spełnienia przesłanek materialnych z art. 86 i niezaistnienia przesłanek
   negatywnych z art. 88.** KB text (`kary-ksef-2027-2028.md` fakt 12, quoting [NP] pyt. 1): prawo
   „będzie nadal zapewnione, pod warunkiem spełnienia przesłanek materialnych odliczenia, o których
   mowa w art. 86 ustawy, oraz niezaistnienia przesłanek negatywnych zgodnie z art. 88 ustawy".
   - Source: [NP] pyt. 1; [CZ2] pkt 1.7. Tier 3 / Tier 2. Not fetched live. Confidence: HIGH, but
     context is invoices issued outside KSeF; the reference to art. 86/88 as conditions is general.
6. **Art. 88 ust. 3a pkt 4 (lit. a) — NOT IN KB.** No KB file contains the text of art. 88 ust. 3a
   or of pkt 4. `faktury-scamowe.md` fakty 2.1, 2.2, 6.1, 6.2 cite art. 88 ust. 3a only as „TEXT NOT
   READ DIRECTLY", MEDIUM, against the superseded Dz.U. 2025 poz. 775. Recommendation: do not cite
   art. 88 ust. 3a pkt 4 or any lit.; refer generally to „przesłanki negatywne z art. 88" via
   fact 5. Art. 86 ust. 1 text is also not in the KB.
7. **„Odliczenie to prawo, nie obowiązek":** MF consistently uses „prawo do odliczenia" ([CZ2] pkt
   1.7; [NP] pyt. 1), but no KB sentence says a taxpayer may forgo it or that not deducting has no
   consequence. Confidence: LOW as a sourced claim. Recommendation: may appear as our plain-language
   framing („to Ty decydujesz, czy fakturę ująć i odliczyć VAT") without a citation; do not
   attribute to MF or the Act.
8. **„Faktura w KSeF nie tworzy obowiązku zapłaty" — NOT IN KB as an MF statement.** Backed parts:
   KSeF has no accept/reject option, „Spory rozstrzygane poza systemem" ([CZ2] pkt 6.3). The
   no-payment-obligation claim is `faktury-scamowe.md` fakt 6.1, MEDIUM, derived. Recommendation:
   keep as our advice („nie płać, dopóki nie sprawdzisz") without a legal citation; do not attribute
   to MF.
9. **„Skutki powstają dopiero, gdy ją zaksięgujesz" (post lead + description) — unbacked** (same
   origin as fakt 2.1/2.2 in `faktury-scamowe.md`, MEDIUM, art. 88 not read). Recommendation:
   rephrase; e.g. lead with no-reject + correction + reporting and „nie księguj i nie odliczaj VAT z
   faktury, której nie rozpoznajesz" as advice.

### B. Odrzucenie, korekta, zgłoszenie, ukrycie (fix for the reporting section)

10. **KSeF nie ma opcji zatwierdzania/odrzucania faktur; spory poza systemem; błędny nabywca →
    korekta „do zera" + nowa faktura.** KB text: „KSeF nie posiada opcji zatwierdzania/odrzucania
    faktur. Spory rozstrzygane poza systemem."
    - Source: [CZ2] pkt 6.3 (also 1.6.2–1.6.4: no edit/cancel/delete; noty korygujące nie
      funkcjonują od 1.02.2026). KB: `podrecznik-ksef-20-czesc-ii.md` §6.3;
      `jak-odebrac-fakture-ksef.md` fakt 25. Not fetched live. Confidence: HIGH.
11. **Faktura trafia do nabywcy automatycznie na podstawie NIP w `Podmiot2/DaneIdentyfikacyjne/NIP`;
    art. 106na ust. 2 (akceptacja odbiorcy) uchylony od 1.02.2026.**
    - Source: [CZ2] pkt 5 (wstęp), 5.2, 6.1. KB: `jak-odebrac-fakture-ksef.md` fakty 1–2.
      Confidence: HIGH.
12. **cz. II pkt 6.3 announces hiding and reporting scam invoices, „wdrażane kilka miesięcy po
    uruchomieniu KSeF 2.0 w wersji produkcyjnej", described in cz. III.**
    - Source: [CZ2] pkt 6.3 (KB extract of 01.02.2026 edition; 06.08.2026 edition changed §6.3,
      content of change not recorded, `mf-faq-podreczniki-2026.md` fakt 3). Confidence: HIGH that it
      was announced; no start date in KB.
13. **Zgłoszenie podejrzenia fałszerstwa: przycisk „Zgłoszenie nadużycia" w Aplikacji Podatnika;
    zgłoszenia trafiają do KAS; faktury wystawionej przez pomyłkę nie zgłasza się jako fałszywej.**
    - Source: [CZ3] pkt 7, as stated in the published guide
      `apps/web/content/pl/guides/jak-odebrac-fakture-ksef.mdx`, section „Błędna lub podejrzana
      faktura". **cz. III is NOT extracted in the KB**; this is a secondary record via our own guide
      (which cites [CZ3] pkt 7). Not fetched live. Confidence: MEDIUM (until cz. III is extracted).
14. **Ukrywanie faktur: nadal tylko zapowiedziane; ukryta faktura nie znika z KSeF; sprzedawca nie
    dostaje informacji.**
    - Source: [CZ3] pkt 8 (and [CZ2] pkt 6.3), via the same guide section. Not in KB. Not fetched
      live. Confidence: MEDIUM.
15. **MF nie opisuje skutków podatkowych zgłoszenia ani ukrycia faktury.**
    - Source: guide section above (cites [CZ2] pkt 6.3 and [CZ3] pkt 8). Confidence: MEDIUM.
16. **Unbacked reporting details in the post (no KB or guide source):** „Od 1 kwietnia 2026";
    „uproszczone zgłaszanie… bez pism do urzędu"; steps 2–4 (skrzynka odbiorcza, opcja przy
    dokumencie, uzasadnienie); „jedno zgłoszenie dotyczy jednej faktury"; „zgłosić może tylko
    nabywca"; „KAS analizuje zgłoszenia, ale nie informuje o wyniku"; „ustawa o VAT nie reguluje go
    jako odrębnej procedury"; „zgłoszenie możesz wycofać". Also the attribution „Według Podręcznika
    KSeF 2.0 i FAQ Ministerstwa Finansów". Recommendation: cut all; replace with facts 13–15. Step 1
    (log in at https://ap.ksef.mf.gov.pl/) is fine (URL in KB).

### C. Other claims in the post

| Post claim                                                                                                                                         | KB status                                                                                                                                                                     | Recommendation                                                                                                                                 |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| KSeF przypisuje fakturę po NIP-ie, brak „akceptacji"                                                                                               | Backed: [CZ2] pkt 5, 5.2, 6.1, 6.3 (facts 10–11)                                                                                                                              | Keep; add [CZ2] source                                                                                                                         |
| NIP jest publiczny (CEIDG, KRS)                                                                                                                    | `faktury-scamowe.md` fakt 1.2: general knowledge, not an MF source                                                                                                            | Keep as our statement, no MF attribution                                                                                                       |
| Sygnały ostrzegawcze (lista)                                                                                                                       | `faktury-scamowe.md` fakt 4.3: heuristics, not MF; post already labels them as ours                                                                                           | Keep as is                                                                                                                                     |
| Biała Lista URL https://www.podatki.gov.pl/wykaz-podatnikow-vat-wyszukiwarka                                                                       | In KB (`faktury-scamowe.md` fakty 4.4, 6.4; art. 96b per that brief, not read). URL not verified live; freshness row LOW                                                      | Keep; checking the NIP is our advice                                                                                                           |
| „Aktywny wpis = prawdopodobnie pomyłka; brak/nieaktywny = mocny sygnał oszustwa; nie kontaktuj się"                                                | Interpretation; `faktury-scamowe.md` fakt 6.4 recommends checking before contact; nothing says not to contact. Guide (from [CZ3] pkt 7 context) says contact the seller first | Rephrase: soften „nie kontaktuj się"; present as our advice                                                                                    |
| Powiedz księgowemu / auto-import                                                                                                                   | `faktury-scamowe.md` fakty 6.3, 6.5: best practice, no MF source                                                                                                              | Keep as our advice, no software names                                                                                                          |
| „Zaglądaj do KSeF co kilka dni"                                                                                                                    | Advice; supported in substance by [CZ2] pkt 6.4: KSeF sends no notifications, program must „odpytywać" KSeF                                                                   | Keep as our advice; optionally add the 6.4 fact with source                                                                                    |
| Phishing paragraph (e-maile podszywające się pod MF/KSeF)                                                                                          | `faktury-scamowe.md` fakt 5.1: MF warning document not identified, MEDIUM. „oficjalne powiadomienia nie wymagają klikania linków" — no source                                 | Keep only as general advice without implying an MF warning; cut the „oficjalne powiadomienia…" sentence or rephrase as advice                  |
| Link ksef.podatki.gov.pl / ap.ksef.mf.gov.pl                                                                                                       | Both URLs in KB (WATCHLIST; CLAUDE.md; `jak-odebrac-fakture-ksef.md`)                                                                                                         | Keep                                                                                                                                           |
| Source „FAQ MF — KSeF 2.0" (https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20)                                                              | URL in KB, but no KB fact links this FAQ to scam reporting                                                                                                                    | Drop from the reporting section; keep in sources only if a backed fact cites it, else replace with [NP] (pyt. 1) for the art. 86/88 conditions |
| Tip: zgłoszenie nie zastępuje zawiadomienia organów ścigania                                                                                       | Not in KB; general advice                                                                                                                                                     | Keep as our advice                                                                                                                             |
| Internal links `/blog/ksef-od-1-kwietnia-2026`, `/blog/ksef-ruszyl`, `/blog/faktura-korygujaca-ksef#korekta-do-zera-gdy-nip-nabywcy-jest-pomylony` | Files exist; anchor heading „Korekta do zera, gdy NIP nabywcy jest pomylony" exists                                                                                           | Keep; consider linking `/guides/jak-odebrac-fakture-ksef`                                                                                      |

### D. Sources section fixes

- „Podręcznik KSeF 2.0 cz. III" → [CZ3] PDF URL (from the guide), not the homepage.
- „Art. 86 ust. 10 i art. 88 ust. 3a pkt 4 ustawy o VAT" (Dz.U. 2025 poz. 775, ISAP) → „Ustawa o VAT
  (Dz.U. 2026 poz. 1263), art. 86 ust. 10b pkt 1, art. 106na ust. 3" with [VAT] URL.
- Add [CZ2] (pkt 1.7, 5.1, 6.3) and, for the art. 86/88 conditions, [NP] pyt. 1.

## Unsettled Questions

- Exact mechanics of „Zgłoszenie nadużycia" (who may report, per-invoice or batch, withdrawal,
  feedback from KAS, start date): cz. III not extracted in KB. Do not state.
- When hiding goes live: only announced.
- Tax effect for the buyer of a fake invoice that sits unbooked in KSeF, and the content of art. 88
  ust. 3a: not read in KB. Do not state as law.
- Whether the outside-KSeF deduction rule (cz. II pkt 1.7) is worded the same in the 06.08.2026
  edition: the KB extract is of the 01.02.2026 edition.

## Claims for the post

1. „KSeF nie ma opcji zatwierdzania ani odrzucania faktur; spory rozstrzyga się poza systemem." —
   [CZ2] pkt 6.3.
2. „Faktura z Twoim NIP-em w polu NIP nabywcy trafia do Ciebie automatycznie; od 1.02.2026 nie
   wymaga akceptacji." — [CZ2] pkt 5, 5.2, 6.1; [VAT] art. 106na ust. 2 (uchylony).
3. „Pomyłkę w nabywcy sprzedawca naprawia korektą do zera i nową fakturą; faktury nie da się
   edytować, anulować ani usunąć." — [CZ2] pkt 6.3, 1.6.2–1.6.4.
4. „Podejrzenie fałszerstwa zgłaszasz w Aplikacji Podatnika przyciskiem »Zgłoszenie nadużycia«;
   zgłoszenia trafiają do KAS. Faktury wystawionej przez pomyłkę nie zgłaszasz jako fałszywej." —
   [CZ3] pkt 7.
5. „Ukrywanie faktur MF zapowiedziało, ale tej funkcji jeszcze nie ma; ukryta faktura nie zniknie z
   KSeF, a sprzedawca nie dostanie informacji." — [CZ3] pkt 8; [CZ2] pkt 6.3.
6. „MF nie opisuje skutków podatkowych zgłoszenia ani ukrycia faktury." — [CZ2] pkt 6.3; [CZ3]
   pkt 8.
7. „Datą otrzymania faktury w KSeF jest dzień nadania jej numeru KSeF." — [VAT] art. 106na ust. 3;
   [CZ2] pkt 5.1.
8. „Prawo do odliczenia VAT powstaje w okresie powstania obowiązku podatkowego, nie wcześniej niż w
   okresie otrzymania faktury." — [VAT] art. 86 ust. 10b pkt 1; [CZ2] pkt 1.7. (Applying it to a
   KSeF invoice = combination with claim 7; do not present as an MF sentence.)
9. „Odliczenie wymaga spełnienia przesłanek z art. 86 i braku przesłanek negatywnych z art. 88." —
   [NP] pyt. 1; [CZ2] pkt 1.7.
10. „KSeF nie wysyła powiadomień o nowych fakturach." — [CZ2] pkt 6.4.

## Do not state

- Prawo do odliczenia powstaje w okresie ujęcia faktury w ewidencji (art. 86 ust. 10).
- Any citation of art. 88 ust. 3a pkt 4 (or lit. a) or quotation of art. 86 ust. 1 / 88 ust. 3a.
- „Skutki powstają dopiero, gdy ją zaksięgujesz" / „faktura nie obliguje do żadnych rozliczeń" as a
  legal fact (in body or `description`).
- „Od 1 kwietnia 2026" for reporting or hiding; „uproszczone zgłaszanie, bez pism do urzędu".
- One report per invoice; only the buyer may report; KAS does not inform about the result; the
  report can be withdrawn; „ustawa nie reguluje go jako odrębnej procedury".
- That reporting or hiding removes the invoice or has any tax effect.
- That MF issued a specific phishing warning, or what „oficjalne powiadomienia" look like.
- Dz.U. 2025 poz. 775 / the ISAP WDU20250000775 link as the VAT Act source; the KSeF homepage as the
  cz. III source.
