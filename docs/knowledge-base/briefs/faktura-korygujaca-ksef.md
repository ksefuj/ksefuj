# Research Brief: Faktura korygująca w KSeF (aktualizacja posta)

**Requested by:** Orchestrator (update of `apps/web/content/pl/blog/faktura-korygujaca-ksef.mdx`,
`updated: 2026-10-07`) **Date:** 2026-10-17 **For content:** PL blog post „Faktura korygująca w
KSeF: jak ją wystawić"

**Verified live 2026-10-17** (constitutional judge, PR #135): [CZ2] 06.08.2026 PDF and [BRO] August
2026 PDF re-downloaded (byte-identical to the 2026-10-16 copies), FAQ KSeF 2.0 page, FA(3)
`schemat.xsd` (identical to `packages/validator/src/schemas/schemat.xsd`), ELI metadata for Dz.U.
2026 poz. 1263 (Obwieszczenie Marszałka Sejmu z 1 września 2026, t.j. ustawy o VAT) and its text
(art. 106j s. 129–130). isap.sejm.gov.pl sits behind a bot challenge for curl; the ELI record
confirms the act. Page numbers below are the printed page labels. The MF brochure has no numbered
sections: [BRO] references name the field or passage.

**Target query:** „faktura korygująca KSeF"

**Answer in two sentences:** Faktury wysłanej do KSeF nie można edytować; jedyną formą poprawienia
jest faktura korygująca w FA(3) (`RodzajFaktury` = `KOR`) z kwotami wpisanymi jako różnica ([CZ2]
pkt 1.6.2, 2.13.2; art. 106j ust. 1 i ust. 2 pkt 5 ustawy o VAT). W `DaneFaKorygowanej` wskazujesz
numer KSeF oryginału (`NrKSeF` = 1 + `NrKSeFFaKorygowanej`), chyba że oryginałowi nie nadano numeru
KSeF; wtedy `NrKSeFN` = 1 ([CZ2] pkt 4.1.3, 2.13.6; [BRO] opis pól `NrKSeF`/`NrKSeFN`, s. 69–70).

**What changes the answer:**

- Oryginał bez numeru KSeF (poza KSeF) → `NrKSeFN` = 1 ([CZ2] 2.13.6). Kryterium: numer KSeF, nie
  data.
- Błędny NIP nabywcy lub sprzedawcy → korekta „do zera" + nowa faktura ([CZ2] 1.6.3–1.6.4, 2.13.8;
  [BRO] opis `Podmiot1K`/`Podmiot2K`, s. 68; [XSD] dokumentacja `Podmiot1K`/`Podmiot2K`).
- Korekta faktury zaliczkowej / rozliczającej → `KOR_ZAL` / `KOR_ROZ` ([CZ2] 2.13.1, 2.13.5).
- Kolejna korekta tej samej faktury → `DaneFaKorygowanej` wskazuje fakturę pierwotną, kwoty od stanu
  po wcześniejszych korektach ([CZ2] 2.13.3).

## Key Facts (ready to use)

### 1. `NrKSeF` + `NrKSeFFaKorygowanej` vs `NrKSeFN`

1. **Kryterium to istnienie numeru KSeF oryginału.** [CZ2] pkt 4.1.3 (s. 72–73): „Faktura korygująca
   powinna zawierać więc między innymi numer KSeF faktury, której dotyczy faktura korygująca. Wymóg
   ten nie dotyczy jednak przypadków, gdy fakturze korygowanej nie został nadany ten numer." Art.
   106j ust. 2 pkt 2a (t.j. Dz.U. 2026 poz. 1263, s. 130): numer KSeF faktury korygowanej „z
   wyjątkiem faktur korygujących wystawianych do faktur, dla których nie został nadany numer". [BRO]
   opis pola `NrKSeF` (s. 69): „W przypadku, gdy faktura korygowana była wystawiona w KSeF, należy
   wskazać „1"."; `NrKSeFN` (s. 70): „W przypadku, gdy faktura korygowana była wystawiona poza KSeF
   należy wskazać „1"." [XSD] `NrKSeFN`: „Znacznik faktury korygowanej wystawionej poza KSeF"
   (quoted in `nota-korygujaca-ksef.md` fact 15). Tier 2. HIGH. Ania: yes.
2. **Faktury wystawione w KSeF od 1.02.2026 mają numer → `NrKSeF` = 1 + numer.** Obowiązek od
   1.02.2026 dla sprzedaży > 200 mln zł (za 2024), od 1.04.2026 dla pozostałych ([CZ2] „Terminy
   obowiązku", KB extract line ~89). Wniosek: faktura z lutego/marca 2026 wystawiona w KSeF ma numer
   mimo daty „sprzed 1 kwietnia". HIGH (dates); the criterion is fact 1.
3. **Dobrowolne wystawianie w KSeF:** KB confirms voluntary KSeF issuance in excluded cases (art.
   106ga ust. 4; FAQ: B2C „w KSeF jest dobrowolne", `faktura-dla-osoby-prywatnej-ksef.md` fact 2)
   and a KSeF 1.0 „okres fakultatywny (do 31.01.2026)" ([CZ2] 6.1). KB has **no** explicit statement
   on voluntary KSeF 2.0 use by not-yet-obligated taxpayers in Feb–Mar 2026. MEDIUM.
4. **KSeF 1.0 / FA(2) invoices with a KSeF 1.0 number: no explicit MF statement, but the sources
   point to `NrKSeF` = 1 + the KSeF 1.0 number.** (a) [BRO] wstęp „Wzór faktury ustrukturyzowanej"
   (s. 3–4): FA(2) „była stosowana do 31 stycznia 2026 r."; FA(3) is used from 1.02.2026 also for
   „faktur korygujących, w sytuacji gdy faktura pierwotna (…) została wystawiona przed 1 lutego 2026
   r. przy użyciu struktury FA(2) lub FA(1)". (b) [BRO] `NrKSeF` (s. 69): „1" when the corrected
   invoice „była wystawiona w KSeF"; an FA(2) invoice is by definition a structured invoice issued
   in KSeF with a number (art. 2 pkt 32a). (c) Art. 106j ust. 2 pkt 2a requires the number whenever
   one was assigned. (d) [XSD] `TNumerKSeF` pattern `…-([0-9A-F]{6})-?([0-9A-F]{6})-…` allows the
   optional hyphen, i.e. both the 35-char KSeF 2.0 and the 36-char KSeF 1.0 format; CIRFMF/ksef-api
   `api-changelog.md` (UPO v4-3) describes KSeF 1.0 numbers as 36 characters. [CZ2] 4.1.3 and [BRO]
   do not mention KSeF 1.0. MEDIUM. **Conflict:** `fa2-vs-fa3-ksef` post (all locales) and
   `fa2-vs-fa3.md` Step 5 say `NrKSeFN` for every FA(2) invoice; no source supports that.
5. **Faktury poza KSeF po 1.04.2026 → `NrKSeFN` = 1:** limit 10 000 zł z art. 145m (do 31.12.2026),
   faktura z kasy (art. 145n), faktura B2C poza KSeF (art. 106ga ust. 2 pkt 4) — none gets a KSeF
   number (`nota-korygujaca-ksef.md` „What changes the answer"; [CZ2] 2.13.6, 4.1.3). HIGH. Ania:
   yes. If such an invoice was voluntarily issued in KSeF, it has a number → `NrKSeF` (fact 1).
   MEDIUM.
6. **Offline24, niedostępność, tryb awaryjny → oryginał dostaje numer KSeF → `NrKSeF` + numer.**
   [CZ2] 4.1.3: „Dotyczy też faktur z trybów offline24, offline-niedostępność, awaryjnego." [BRO]
   opis pola `NrKSeF` (s. 70): „Obowiązek podawania numeru KSeF faktury korygowanej dotyczy także
   faktur wystawionych zgodnie z art. 106nda ust. 1 lub ust. 16 ustawy, 106nh ust. 1 ustawy, art.
   106nf ust. 1 ustawy." HIGH. **Awaria całkowita (art. 106ng):** faktur nie przesyła się do KSeF
   (art. 106ng: „faktury w postaci papierowej lub faktury elektroniczne"; `awaria-ksef-offline.md`,
   Tabela trybów v1.3), so no number; neither [CZ2] 4.1.3 nor [BRO] `NrKSeF` lists 106ng. `NrKSeFN`
   follows from fact 1 only by inference. LOW. Correcting an offline invoice _before_ it has a
   number: not in KB.
7. **`DataWystFaKorygowanej` zależy od trybu wystawienia oryginału** („Rules depend on how original
   was issued (outside KSeF, offline, online)", [BRO] opis `DataWystFaKorygowanej`, s. 69). HIGH.
   Ania: no.
8. **Korekta zbiorcza może łączyć oba warianty.** [CZ2] 2.13.6 (s. 57–58): `DaneFaKorygowanej` (max
   50 000) „umożliwia korektę zbiorczą odnoszącą się jednocześnie do faktur z KSeF i poza KSeF"; per
   original: `NrKSeF` = 1 + numer or `NrKSeFN` = 1. [BRO] opis `DaneFaKorygowanej` (s. 67): one per
   corrected invoice. HIGH.

### 2. Podstawa prawna i URL

9. **Art. 106j ust. 1** (t.j. Dz.U. 2026 poz. 1263, s. 129): „W przypadku gdy po wystawieniu
   faktury: (…) 5) stwierdzono pomyłkę w jakiejkolwiek pozycji faktury – podatnik wystawia fakturę
   korygującą." (`nota-korygujaca-ksef.md`, `pusta-faktura-pdf-xml.md` H8). Różnice: art. 106j ust.
   2 pkt 5 ([CZ2] 2.13.2); zbiorcza: ust. 3 ([CZ2] 2.13.7). Tier 1. HIGH.
10. **Replace** `https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20250000775` (frontmatter
    `sources` and the `<Source>` in the intro) **with**
    `https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260001263` (URL as recorded in
    `pusta-faktura-pdf-xml.md`; ELI PDF: `https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf`).
    Both resolve (ELI record checked live 2026-10-17).

## Other findings (post vs KB)

1. **Section „Korekta faktury sprzed KSeF": WRONG criterion.** Post: „Jeśli korygujesz fakturę
   sprzed 1 kwietnia 2026 … `NrKSeFN` = `1`, bo oryginał nie ma numeru KSeF." KB: criterion is the
   KSeF number (facts 1–2); invoices issued in KSeF from 1.02.2026 have numbers. Already logged:
   `nota-korygujaca-ksef.md` contradiction 2. Also the table row „Oryginał wystawiony przed KSeF" is
   too narrow: it should be „oryginał bez numeru KSeF" (incl. art. 145m, 145n, B2C; fact 5).
2. **FA(2) end date 31.01.2026: CONSISTENT.** [BRO] wstęp „Wzór faktury ustrukturyzowanej" (s. 3):
   FA(2) „była stosowana do 31 stycznia 2026 r."; corrections of FA(2)/FA(1) originals are issued in
   FA(3). Post's „KSeF nie przyjmie go w żadnej formie" matches `fa2-vs-fa3.md` 1.1 (rejected
   outright). HIGH.
3. **TypKorekty 1/2/3: CONSISTENT** with [XSD] `TTypKorekty` and [CZ2] 2.13.1; field optional
   ([CZ2]: „nieobowiązkowe"). The post's „Przy prostej korekcie kwoty zwykle wybiera się `2`" has no
   KB source (practice claim). MEDIUM.
4. **NIP rule: CONSISTENT but incomplete.** Post covers buyer NIP only. [BRO] opis `Podmiot1K` /
   `Podmiot2K` (s. 68), [CZ2] 2.13.8 (s. 60): „Podmiot1K nie dotyczy przypadku korekty błędnego NIP
   (…) - wówczas wymagana jest korekta faktury do wartości zerowych"; wrong NIP of seller (Podmiot1)
   or buyer (Podmiot2/Podmiot3 rola 4) „is NOT subject to correction" → korekta do zera. [CZ2]
   1.6.4: „nie należy wystawiać faktury korygującej błędny numer NIP na inny prawidłowy". Post
   section „Co możesz skorygować" also omits that buyer/seller name/address corrections use
   `Podmiot2K` / `Podmiot1K` ([CZ2] 2.13.8). HIGH.
5. **„przy literówce system nie powiąże korekty z oryginałem": UNSOURCED.** KB does not record
   whether KSeF validates `NrKSeFFaKorygowanej` against existing invoices (`nota-korygujaca-ksef.md`
   open question 10). „Podanie obu pól naraz kończy się odrzuceniem" is supported (XSD choice).
   MEDIUM.
6. **Difference method, `P_7` after correction, `StanPrzed`: CONSISTENT** ([CZ2] 2.13.2, 2.13.4;
   [BRO] opis `FaWiersz` (s. 85–86): „należy wykazać różnice wynikające z korekty poszczególnych
   pozycji lub dane pozycji korygowanych wg stanu przed korektą i po korekcie jako osobne wiersze").
   `P_7` „po korekcie": no explicit [BRO] rule found 2026-10-17; art. 106j ust. 2 pkt 3 lit. b
   (nazwa towaru objętego korektą) and pkt 6 (prawidłowa treść korygowanych pozycji) support it in
   substance. MEDIUM. [CZ2] 2.13.4 also lists a third method (storno) and recommends `StanPrzed`
   when changing the VAT rate or exchange rate.
7. **KSeF number format / example `5214567890-20260401-000001000001-49`: CONSISTENT** (35 chars,
   `ksef-dla-jdg.md`, `jak-odebrac-fakture-ksef.md` fact 10).
8. **„Korekta zerująca nie anuluje faktury … zostają w KSeF na zawsze":** KB says 10 years from end
   of issue year, no deletion ([CZ2] 1.6.3). „Na zawsze" overstates. HIGH.

## Unsettled Questions

- Flag for corrections of FA(2) invoices with a KSeF 1.0 number: no explicit MF statement; sources
  point to `NrKSeF` (fact 4). Not found in [CZ2], [BRO] or FAQ KSeF 2.0 (checked 2026-10-17).
- Correction of an awaria całkowita (106ng) invoice, or of an offline invoice not yet numbered: not
  addressed in [CZ2], [BRO] or FAQ KSeF 2.0 (checked 2026-10-17).
- Whether a correction of an art. 145m invoice must itself go through KSeF: not in KB.

## Suggested Sources Section

- Podręcznik KSeF 2.0 cz. II (06.08.2026), pkt 1.6.2–1.6.4, 2.13.1–2.13.8, 4.1.3:
  https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
- Broszura FA(3) (sierpień 2026), wstęp „Wzór faktury ustrukturyzowanej", opis pól faktury
  korygującej (`TypKorekty`, `DaneFaKorygowanej`, `NrKSeF`, `NrKSeFN`, `Podmiot1K`, `Podmiot2K`):
  https://ksef.podatki.gov.pl/media/nuclnu0w/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf
- Schemat FA(3): https://crd.gov.pl/wzor/2025/06/25/13775/
- Ustawa o VAT, t.j. Dz.U. 2026 poz. 1263, art. 106j:
  https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260001263
- FAQ KSeF 2.0: https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20

## Warning: Common Misconceptions

- „Faktura sprzed 1 kwietnia 2026 = `NrKSeFN`": no; criterion is the KSeF number (facts 1–2).
- „Faktura offline nie ma numeru KSeF": after sending it does; correction uses `NrKSeF` (fact 6).
- „Każda faktura FA(2) → `NrKSeFN`": no source supports it; field descriptions point to `NrKSeF`
  (fact 4).
