# Research Brief: Oznaczenia DI, BFK (i OFF) w JPK_V7

**Requested by:** Orchestrator (backlog item `di-bfk-jpk-v7`, `docs/content-backlog.md`) **Date:**
2026-11-25 **Freshness:** 2026-11-25 (repo-only run; no official host reachable) **For content:**
FAQ post „Oznaczenia DI i BFK w JPK_V7" **Target personas:** Pani Krystyna (biuro rachunkowe,
prowadzi JPK klientów), secondary: JDG owners who file their own JPK_V7

**Target query:** „JPK_V7 BFK DI"

**Answer in two sentences:** Od lutego 2026 r. w JPK_V7M(3) i JPK_V7K(3) podaje się numery KSeF
faktur sprzedażowych i zakupowych, a gdy faktura numeru KSeF nie ma, stosuje się „odpowiednie
oznaczenia" (Podręcznik KSeF 2.0 cz. II, 06.08.2026, pkt 4.1.6, s. 76). Według KB faktury offline24
i z niedostępności, które w dniu składania pliku nie mają jeszcze numeru KSeF, oznacza się DI (i
koryguje później na numer), a faktury z awarii całkowitej BFK (`awaria-ksef-offline.md` fakt 7; FAQ
MF „Najczęstsze pytania" pyt. 8/9 omawiają DI i BFK, ale KB nie ma ich brzmienia).

**What changes the answer:**

- **Czy faktura ma numer KSeF w dniu złożenia JPK.** Jest numer: ujmuje się numer (NrKSeF); brak
  numeru: oznaczenie. Source: cz. II pkt 4.1.6 s. 76 (general rule); published guide
  `awaria-ksef-offline.mdx` (DI → numer). HIGH for the general rule, see C1–C3 for the mapping.
- **Tryb wystawienia:** offline24 (art. 106nda), niedostępność (art. 106nh), awaria / tryb awaryjny
  (art. 106nf), awaria całkowita (art. 106ng). The marker depends on the mode, and the mapping for
  106nf and 106ng is disputed (C2, C3).
- **Faktura wystawiona poza KSeF z innego powodu** (limit 10 000 zł z art. 145m i faktury z kasy z
  art. 145n do 31.12.2026, faktura zagraniczna, sprzedawca, który zignorował obowiązek): marker NOT
  IN KB. Leads say BFK (C1). Do not state.
- **Dokument, który nie jest fakturą** (np. paragon, nota, dokument wewnętrzny): marker NOT IN KB.
  Leads say DI covers „dowód inny niż faktura" (C2). Do not state.
- **Data:** the rule applies from February 2026 (JPK_V7M(3)/V7K(3)). The art. 145m/145n exceptions
  end 2026-12-31, so from 2027 fewer invoices should lack a KSeF number; any change to markers from
  2027 is NOT IN KB.

**Provenance legend:** [KB] = taken from an existing KB brief, not re-fetched today (all MF, gov.pl,
Sejm and RCL hosts blocked in this session). [POST] = stated in a published ksefuj.to post, with its
own cited source; the underlying MF document is NOT extracted in the KB. [LEAD] = secondary web
search result supplied by the Orchestrator, not fetched, not a source.

## Key Facts (ready to use)

1. **Od lutego 2026 r. obowiązują nowe wersje JPK_V7M(3) i JPK_V7K(3), wynikające ze znowelizowanego
   rozporządzenia JPK_VAT.** — `podrecznik-ksef-20-czesc-ii.md` §4.1.6 (cz. II pkt 4.1.6, s. 76).
   [KB] Tier 2, MF guidance describing the regulation. Confidence: HIGH. Krystyna: yes. JDG: yes.
2. **W tych plikach podaje się numery KSeF faktur sprzedażowych i zakupowych, a przy braku numeru
   „odpowiednie oznaczenia".** Verbatim (06.08.2026, s. 76, quoted in
   `faktura-poza-ksef-odliczenie-vat.md` and `numer-ksef-gdzie-znalezc.md` fakt 21): „a w przypadku
   braku nr KSeF ma obowiązek stosowania odpowiednich oznaczeń". KB extract wording: „(lub
   odpowiednich oznaczeń przy braku numeru KSeF)". [KB] Tier 2. Confidence: HIGH. Krystyna: yes.
   JDG: yes. Note: cz. II does not name the markers.
3. **Numer KSeF nie jest elementem faktury (nie ma go w XML FA(3)); system nadaje go po przyjęciu i
   zwraca w UPO.** — `podrecznik-ksef-20-czesc-ii.md` §4.1 („Numer KSeF nie jest elementem faktury.
   FA(3) nie zawiera pola na numer KSeF."). [KB] Tier 2. HIGH. Krystyna: yes (the number comes from
   KSeF / the software, not from the invoice file). JDG: yes.
4. **Numer KSeF jest wykorzystywany także w JPK_KR_PD, a cz. II wspomina mechanizm automatycznego
   zasilania ewidencji danymi faktur (np. w e-mikrofirmie).** — `podrecznik-ksef-20-czesc-ii.md`
   §4.1.6. [KB] Tier 2. HIGH. Krystyna: yes. JDG: e-mikrofirma users only.
5. **Faktury offline24 i z niedostępności bez numeru KSeF oznacza się DI i koryguje do numeru;
   faktury z awarii całkowitej BFK.** — `awaria-ksef-offline.md` fakt 7 (paraphrase, no verbatim, no
   page; the brief does not name the source document for this line). [KB] Confidence: MEDIUM
   (paraphrase without a pinned source; see C1–C3). Krystyna: yes. JDG: yes if they issue offline.
6. **FAQ MF „Najczęstsze pytania" pyt. 8 i 9 dotyczą oznaczeń DI (faktury offline24 / z
   niedostępności bez numeru KSeF) i BFK.** — `mf-faq-podreczniki-2026.md` fakt 1
   (https://ksef.podatki.gov.pl/ksef-news/najczestsze-pytania/, published 2026-04-15, modified
   2026-04-29). [KB] Tier 3. Confidence: HIGH that the questions exist; the KB has NO verbatim
   answer text. Krystyna: yes.
7. **Published guide (PL/EN/UK) states the full mapping, citing „MF: broszura JPK_VAT z deklaracją
   od 1 lutego 2026, s. 18"
   (https://www.podatki.gov.pl/media/wgbkrejs/broszura-jpk_vat-z-deklaracj%C4%85-od-1-lutego-2026-r.pdf):**
   „Faktury z tego okresu [awaria całkowita] nie trafiają do KSeF, a w pliku JPK oznaczasz je BFK.
   Faktura offline24 lub z niedostępności ma w JPK znacznik DI tylko wtedy, gdy w dniu składania
   pliku nie ma jeszcze numeru KSeF. Gdy numer już jest, ujmujesz ją z numerem (NrKSeF), a
   wcześniejsze DI poprawiasz na numer. Faktura z trybu awaryjnego (art. 106nf), która w dniu
   składania pliku nie ma numeru KSeF, dostaje znacznik OFF." —
   `apps/web/content/pl/guides/awaria-ksef-offline.mdx` line 88 (added via merge 4acc980,
   2026-10-17). [POST] Tier of underlying source: 3 (MF brochure). Confidence: MEDIUM. The brochure
   has no KB extract, is not in WATCHLIST.md, and no brief records its verbatim text; the guide is
   our own output, not a source. A post may repeat this only after a human checks s. 18 (see C1–C3).
8. **Awaria całkowita (art. 106ng): faktur nie przesyła się do KSeF, więc nie dostaną numeru KSeF.**
   — `awaria-ksef-offline.md` (ustawa o VAT, Dz.U. 2026 poz. 1263, art. 106ng; Tabela trybów
   24.02.2026). [KB] Tier 1. HIGH. Relevance: explains why total-failure invoices need a permanent
   marker rather than a later correction to a number.
9. **Offline24 / niedostępność / tryb awaryjny: faktura dostaje numer KSeF dopiero po przesłaniu;
   terminy: następny dzień roboczy (offline24; niedostępność od jej końca) albo 7 dni roboczych od
   końca awarii (art. 106nf).** — `awaria-ksef-offline.md` (Answer in two sentences; art. 106nda,
   106nf, 106nh). [KB] Tier 1. HIGH. Relevance: an invoice issued at month end can still be without
   a number when JPK is filed by the 25th; that is the DI/OFF situation.
10. **Rozporządzenie JPK_VAT: the FA(3) information sheet names it „Rozporządzenie Ministra
    Finansów, Inwestycji i Rozwoju z dnia 15 października 2019 r. w sprawie szczegółowego zakresu
    danych zawartych w deklaracjach podatkowych i w ewidencji w zakresie podatku od towarów i usług
    (Dz. U. z 2019 r. poz. 1988, z późn. zm.)".** —
    `packages/validator/docs/fa3-information-sheet.md` Glossary (English rendering). Tier 2. HIGH
    for the name. The amending regulation that introduced JPK_V7M(3)/V7K(3) is listed in
    `.github/agents/researcher.md` as „Rozporządzenie MF z 7.12.2025"; its Dz.U. position and text
    are NOT IN KB. Do not cite a Dz.U. number for the amendment.

## Unsettled Questions

- **Which document is the actual marker list:** the regulation (Tier 1) text, the MF brochure
  JPK_VAT s. 18 and the MF „stosowanie znaczników" PDFs (leads) are all unread in the KB. The post
  must not present a marker table as verified until one of them is extracted.
- **BFK scope** (C1): only total failure, or all invoices issued outside KSeF (145m, 145n, foreign
  sellers, sellers who ignored the obligation, purchase invoices with no KSeF obligation)?
- **DI meaning** (C2): offline invoice without a number at filing, or „dowód inny niż faktura", or
  both?
- **OFF** (C3): art. 106nf emergency-mode invoices (published guide) or total failure / art. 106ng
  (some leads)? If OFF = total failure, the guide's BFK for total failure is also wrong.
- **Purchase side:** does the buyer (Krystyna booking a client's purchase) use the same marker as
  the seller for an offline invoice not yet numbered? Correction mechanics for DI → NrKSeF in a
  later JPK correction (deadline, which period) are NOT IN KB.
- **Corrective invoices and notes** in JPK (marker for a correction to a 145m original, nota
  korygująca): NOT IN KB (`korekta-faktury-spoza-ksef-2027.md` fakt 22, `nota-korygujaca-ksef.md`
  fakt 17 flag the same gap).
- **JPK field / element names** for the KSeF number and markers in the JPK_V7(3) XSD: NOT IN KB. Do
  not quote element names.
- **Sanctions / consequences of a wrong marker:** NOT IN KB.

## Contradictions & Ambiguities

- **C1. BFK scope.** Published guide (`awaria-ksef-offline.mdx` l. 88, citing broszura JPK_VAT
  s. 18) and KB (`awaria-ksef-offline.md` fakt 7): BFK = invoices from total failure. Leads [LEAD]:
  BFK = all invoices (electronic and paper) issued outside KSeF, including purchase invoices where
  there is no KSeF obligation. Not necessarily contradictory (total failure could be one case of a
  wider BFK), but the guide reads as if BFK were total-failure-only, and
  `faktura-poza-ksef-odliczenie-vat.md` fakt 25 explicitly forbids stating BFK for out-of-KSeF
  purchase invoices. Resolution: human must read the MF brochure s. 18 / the „stosowanie znaczników"
  PDF / regulation. Status: UNRESOLVED.
- **C2. DI meaning.** Guide and KB: DI = offline24 / unavailability invoice without a KSeF number on
  the filing day. Lead [LEAD] (reported MF definition, unverified): „oznaczenie dotyczy dowodu
  innego niż faktura, dla której istnieje obowiązek wystawienia za pośrednictwem Krajowego Systemu
  e-Faktur", plus offline invoices without a number at filing. If the lead is right, DI also (or
  primarily) covers non-invoice documents; the guide would be incomplete, not necessarily wrong.
  Status: UNRESOLVED.
- **C3. OFF vs BFK vs DI for failure modes.** Guide: art. 106nf (awaria / tryb awaryjny) without
  number on filing day → OFF; total failure (106ng) → BFK; offline24 / 106nh → DI. KB
  `awaria-ksef-offline.md` fakt 7 does not mention OFF at all and is silent on 106nf invoices. Leads
  disagree among themselves: OFF = 106nf, or OFF = 106ng / total failure. If OFF = total failure,
  the guide's BFK statement for total failure conflicts. This may be an error in the published
  guide, or the leads may be wrong; cannot tell without the MF PDF. Status: UNRESOLVED. Recommend a
  human check of the published guide (PL `awaria-ksef-offline.mdx`, EN
  `ksef-outage-offline-mode.mdx`, UK `zbiy-ksef-offlayn.mdx`, all line 88).
- **C4. Regulation identity.** `fa3-information-sheet.md` and
  `.github/agents/constitutional-judge.md` name the JPK_VAT regulation of 15.10.2019 (Dz.U. 2019
  poz. 1988, as amended); `.github/agents/researcher.md` lists „Rozporządzenie MF z 7.12.2025 re:
  JPK_VAT". Likely the amending act vs the base act, but the KB has neither text. Status: ambiguity,
  not a contradiction of substance.
- **Ambiguity:** cz. II pkt 4.1.6 says „odpowiednich oznaczeń" without listing them.

## Unverified leads (NOT sources; for human verification)

Supplied by the Orchestrator from a web search; none fetched in this session. Do not cite in a post.

- Vendor / advisory pages (Comarch, wFirma, fakturowo.pl; infor.pl article id 7558412 titled „MF
  wyjaśniło zasady stosowania znaczników NrKSeF, OFF, BFK, DI"; no URL recorded in the KB):
  - BFK = invoices (electronic and paper) issued outside KSeF, including purchase invoices where
    there is no KSeF obligation.
  - DI = „dowód inny niż faktura"; reported MF wording: „oznaczenie dotyczy dowodu innego niż
    faktura, dla której istnieje obowiązek wystawienia za pośrednictwem Krajowego Systemu e-Faktur";
    also offline invoices without a KSeF number at filing.
  - OFF = invoices from a KSeF failure; sources disagree whether art. 106nf or art. 106ng (total
    failure).
  - The infor.pl title suggests four values exist: NrKSeF, OFF, BFK, DI.
- MF PDFs surfaced by search, not fetched (would be Tier 3 if confirmed; top priority to extract):
  - https://www.podatki.gov.pl/media/lzafohup/jpk_vat-z-deklaracja-stosowanie-znacznikow.pdf
  - https://podatki.gov.pl/media/o1jppu0e/jpk_vat-z-deklaracja-stosowanie-znacznikow_v11.pdf
- MF brochure already cited by the published guide but not extracted:
  https://www.podatki.gov.pl/media/wgbkrejs/broszura-jpk_vat-z-deklaracj%C4%85-od-1-lutego-2026-r.pdf
  (s. 18).

## Suggested Sources Section

Only URLs already in the KB or a published post:

- Podręcznik KSeF 2.0, cz. II (06.08.2026), pkt 4.1.6, s. 76:
  https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
- MF: KSeF, najczęstsze pytania (pyt. 8, 9):
  https://ksef.podatki.gov.pl/ksef-news/najczestsze-pytania/
- MF: broszura JPK_VAT z deklaracją od 1 lutego 2026, s. 18 (only after human verification, C1–C3):
  https://www.podatki.gov.pl/media/wgbkrejs/broszura-jpk_vat-z-deklaracj%C4%85-od-1-lutego-2026-r.pdf
- Ustawa o VAT, tekst jednolity Dz.U. 2026 poz. 1263 (art. 106nda, 106nf, 106ng, 106nh):
  https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf
- MF: Tabela trybów wystawiania faktur (24.02.2026):
  https://ksef.podatki.gov.pl/media/xp2dhszg/tabela-tryby-wystawiania-faktur-24022026.pdf

## Warning: Common Misconceptions

- **„Numer KSeF jest w pliku XML faktury, więc program weźmie go z XML."** Wrong: the number is not
  an element of FA(3); it is returned by KSeF (UPO). Source: cz. II pkt 4.1.
- **„Napis OFFLINE pod kodem QR to znacznik OFF w JPK."** Do not conflate: „OFFLINE" is the QR label
  on an invoice not yet sent to KSeF (cz. II pkt 5.4.1); the JPK marker OFF is a separate concept
  whose scope is unverified (C3).
- **„DI zostaje na zawsze."** Per KB fakt 5 and the published guide, DI is used only while the
  offline invoice has no number and is later corrected to the number. The correction procedure is
  NOT IN KB.
- **„BFK = każda faktura poza KSeF" or „BFK = tylko awaria całkowita".** Neither is verified in the
  KB (C1). Do not state either as fact.
- **Stale-claim flag:** guidance describing JPK_V7 without a KSeF-number obligation predates
  February 2026 (cz. II pkt 4.1.6 ties the obligation to the new versions (3)). What earlier
  versions contained is NOT IN KB; do not describe them.

## Freshness Markers

- JPK_V7M(3)/V7K(3) from February 2026: review if MF publishes JPK_V7(4) or amends the regulation.
- art. 145m / 145n end 2026-12-31: review the BFK use cases after 2027-01-01.
- FAQ „Najczęstsze pytania" last modified 2026-04-29 (per KB): re-check pyt. 8/9 wording.
- „Stosowanie znaczników" PDF has a `_v11` variant per leads: version churn likely; pin the version
  read.
