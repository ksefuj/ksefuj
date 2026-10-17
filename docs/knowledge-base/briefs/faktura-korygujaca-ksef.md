# Research Brief: Faktura korygująca w KSeF (aktualizacja posta)

**Requested by:** Orchestrator (update of `apps/web/content/pl/blog/faktura-korygujaca-ksef.mdx`,
`updated: 2026-10-07`) **Date:** 2026-10-17 **For content:** PL blog post „Faktura korygująca w
KSeF: jak ją wystawić"

**Not fetched live:** ksef.podatki.gov.pl, isap.sejm.gov.pl and api.sejm.gov.pl return proxy 403
from this environment. Every fact below comes from the KB (verified baseline per `WATCHLIST.md`: VAT
Act t.j. Dz.U. 2026 poz. 1263; Podręcznik KSeF 2.0 editions of 2026-08-06). The [CZ2] page numbers
and quotes for 1.6.2, 1.6.4, 2.13.6 and 4.1.3 were verified live on 2026-10-16 in
`nota-korygujaca-ksef.md` (header block); the [CZ2] KB extract itself is the 2026-02-01 edition.

**Target query:** „faktura korygująca KSeF"

**Answer in two sentences:** Faktury wysłanej do KSeF nie można edytować; jedyną formą poprawienia
jest faktura korygująca w FA(3) (`RodzajFaktury` = `KOR`) z kwotami wpisanymi jako różnica ([CZ2]
pkt 1.6.2, 2.13.2; art. 106j ust. 1 i ust. 2 pkt 5 ustawy o VAT). W `DaneFaKorygowanej` wskazujesz
numer KSeF oryginału (`NrKSeF` = 1 + `NrKSeFFaKorygowanej`), chyba że oryginałowi nie nadano numeru
KSeF; wtedy `NrKSeFN` = 1 ([CZ2] pkt 4.1.3, 2.13.6; [BRO] §9.7).

**What changes the answer:**

- Oryginał bez numeru KSeF (poza KSeF) → `NrKSeFN` = 1 ([CZ2] 2.13.6). Kryterium: numer KSeF, nie
  data.
- Błędny NIP nabywcy lub sprzedawcy → korekta „do zera" + nowa faktura ([CZ2] 1.6.4; [BRO] §9.7).
- Korekta faktury zaliczkowej / rozliczającej → `KOR_ZAL` / `KOR_ROZ` ([CZ2] 2.13.1, 2.13.5).
- Kolejna korekta tej samej faktury → `DaneFaKorygowanej` wskazuje fakturę pierwotną, kwoty od stanu
  po wcześniejszych korektach ([CZ2] 2.13.3).

## Key Facts (ready to use)

### 1. `NrKSeF` + `NrKSeFFaKorygowanej` vs `NrKSeFN`

1. **Kryterium to istnienie numeru KSeF oryginału.** [CZ2] pkt 4.1.3 (06.08.2026: s. 72), KB text:
   „Faktura korygująca zawiera numer KSeF faktury korygowanej (chyba że nie nadano nr KSeF)." [BRO]
   §9.7: `NrKSeF` = "1" „if corrected invoice was issued in KSeF"; `NrKSeFN` = "1" „if corrected
   invoice was issued outside KSeF". [XSD] `NrKSeFN`: „Znacznik faktury korygowanej wystawionej poza
   KSeF" (quoted in `nota-korygujaca-ksef.md` fact 15). Tier 2. HIGH. Ania: yes.
2. **Faktury wystawione w KSeF od 1.02.2026 mają numer → `NrKSeF` = 1 + numer.** Obowiązek od
   1.02.2026 dla sprzedaży > 200 mln zł (za 2024), od 1.04.2026 dla pozostałych ([CZ2] „Terminy
   obowiązku", KB extract line ~89). Wniosek: faktura z lutego/marca 2026 wystawiona w KSeF ma numer
   mimo daty „sprzed 1 kwietnia". HIGH (dates); the criterion is fact 1.
3. **Dobrowolne wystawianie w KSeF:** KB confirms voluntary KSeF issuance in excluded cases (art.
   106ga ust. 4; FAQ: B2C „w KSeF jest dobrowolne", `faktura-dla-osoby-prywatnej-ksef.md` fact 2)
   and a KSeF 1.0 „okres fakultatywny (do 31.01.2026)" ([CZ2] 6.1). KB has **no** explicit statement
   on voluntary KSeF 2.0 use by not-yet-obligated taxpayers in Feb–Mar 2026. MEDIUM.
4. **KSeF 1.0 / FA(2) invoices with a KSeF 1.0 number: NOT SETTLED.** [CZ2] 4.1.3 and [BRO] §9.7 do
   not distinguish KSeF 1.0 from 2.0. `fa2-vs-fa3.md` Step 5 advises `NrKSeFN` but marks it MEDIUM
   inference; `nota-korygujaca-ksef.md` open question 6 / contradiction 1: „Do not state a rule".
   Only settled point: the correction itself must be FA(3) ([BRO] §1.2 CRITICAL RULE). LOW.
5. **Faktury poza KSeF po 1.04.2026 → `NrKSeFN` = 1:** limit 10 000 zł z art. 145m (do 31.12.2026),
   faktura z kasy (art. 145n), faktura B2C poza KSeF (art. 106ga ust. 2 pkt 4) — none gets a KSeF
   number (`nota-korygujaca-ksef.md` „What changes the answer"; [CZ2] 2.13.6, 4.1.3). HIGH. Ania:
   yes. If such an invoice was voluntarily issued in KSeF, it has a number → `NrKSeF` (fact 1).
   MEDIUM.
6. **Offline24, niedostępność, tryb awaryjny → oryginał dostaje numer KSeF → `NrKSeF` + numer.**
   [CZ2] 4.1.3: „Dotyczy też faktur z trybów offline24, offline-niedostępność, awaryjnego." [BRO]
   §9.7: obligation „applies even for invoices issued per Art. 106nda sec. 1/16, Art. 106nh sec. 1,
   Art. 106nf sec. 1". HIGH. **Awaria całkowita (art. 106ng):** faktur nie przesyła się do KSeF
   (`awaria-ksef-offline.md`, Tabela trybów v1.3), so no number; neither [CZ2] 4.1.3 nor [BRO] §9.7
   lists 106ng. `NrKSeFN` follows from fact 1 only by inference. LOW. Correcting an offline invoice
   _before_ it has a number: not in KB.
7. **`DataWystFaKorygowanej` zależy od trybu wystawienia oryginału** („Rules depend on how original
   was issued (outside KSeF, offline, online)", [BRO] §9.7). HIGH. Ania: no.
8. **Korekta zbiorcza może łączyć oba warianty.** [CZ2] 2.13.6 (s. 57–58): `DaneFaKorygowanej` (max
   50 000) „umożliwia korektę zbiorczą odnoszącą się jednocześnie do faktur z KSeF i poza KSeF"; per
   original: `NrKSeF` = 1 + numer or `NrKSeFN` = 1. [BRO] §9.7: one `DaneFaKorygowanej` per
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
    Neither fetched live in this session.

## Other findings (post vs KB)

1. **Section „Korekta faktury sprzed KSeF": WRONG criterion.** Post: „Jeśli korygujesz fakturę
   sprzed 1 kwietnia 2026 … `NrKSeFN` = `1`, bo oryginał nie ma numeru KSeF." KB: criterion is the
   KSeF number (facts 1–2); invoices issued in KSeF from 1.02.2026 have numbers. Already logged:
   `nota-korygujaca-ksef.md` contradiction 2. Also the table row „Oryginał wystawiony przed KSeF" is
   too narrow: it should be „oryginał bez numeru KSeF" (incl. art. 145m, 145n, B2C; fact 5).
2. **FA(2) end date 31.01.2026: CONSISTENT.** [BRO] §1.2: FA(2) „was used until 31 January 2026";
   corrections of FA(2)/FA(1) originals are issued in FA(3). Post's „KSeF nie przyjmie go w żadnej
   formie" matches `fa2-vs-fa3.md` 1.1 (rejected outright). HIGH.
3. **TypKorekty 1/2/3: CONSISTENT** with [XSD] `TTypKorekty` and [CZ2] 2.13.1; field optional
   ([CZ2]: „nieobowiązkowe"). The post's „Przy prostej korekcie kwoty zwykle wybiera się `2`" has no
   KB source (practice claim). MEDIUM.
4. **NIP rule: CONSISTENT but incomplete.** Post covers buyer NIP only. [BRO] §9.7 CRITICAL RULE:
   wrong NIP of seller (Podmiot1) or buyer (Podmiot2/Podmiot3 rola 4) „is NOT subject to correction"
   → korekta do zera. [CZ2] 1.6.4: „nie należy wystawiać faktury korygującej błędny numer NIP na
   inny prawidłowy". Post section „Co możesz skorygować" also omits that buyer/seller name/address
   corrections use `Podmiot2K` / `Podmiot1K` ([CZ2] 2.13.8). HIGH.
5. **„przy literówce system nie powiąże korekty z oryginałem": UNSOURCED.** KB does not record
   whether KSeF validates `NrKSeFFaKorygowanej` against existing invoices (`nota-korygujaca-ksef.md`
   open question 10). „Podanie obu pól naraz kończy się odrzuceniem" is supported (XSD choice).
   MEDIUM.
6. **Difference method, `P_7` after correction, `StanPrzed`: CONSISTENT** ([CZ2] 2.13.2, 2.13.4;
   [BRO] §9.1: „All fields filled in according to status AFTER correction"). [CZ2] 2.13.4 also lists
   a third method (storno) and recommends `StanPrzed` when changing the VAT rate or exchange rate.
7. **KSeF number format / example `5214567890-20260401-000001000001-49`: CONSISTENT** (35 chars,
   `ksef-dla-jdg.md`, `jak-odebrac-fakture-ksef.md` fact 10).
8. **„Korekta zerująca nie anuluje faktury … zostają w KSeF na zawsze":** KB says 10 years from end
   of issue year, no deletion ([CZ2] 1.6.3). „Na zawsze" overstates. HIGH.

## Unsettled Questions

- Flag for corrections of FA(2) invoices with a KSeF 1.0 number (fact 4). Do not state a rule.
- Correction of an awaria całkowita (106ng) invoice, or of an offline invoice not yet numbered.
- Whether a correction of an art. 145m invoice must itself go through KSeF: not in KB.

## Suggested Sources Section

- Podręcznik KSeF 2.0 cz. II (06.08.2026), pkt 1.6.2–1.6.4, 2.13.1–2.13.8, 4.1.3:
  https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
- Broszura FA(3), §1.2, §9.1, §9.7:
  https://ksef.podatki.gov.pl/media/nuclnu0w/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf
- Schemat FA(3): https://crd.gov.pl/wzor/2025/06/25/13775/
- Ustawa o VAT, t.j. Dz.U. 2026 poz. 1263, art. 106j:
  https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260001263
- FAQ KSeF 2.0: https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20

## Warning: Common Misconceptions

- „Faktura sprzed 1 kwietnia 2026 = `NrKSeFN`": no; criterion is the KSeF number (facts 1–2).
- „Faktura offline nie ma numeru KSeF": after sending it does; correction uses `NrKSeF` (fact 6).
- „Każda faktura FA(2) → `NrKSeFN`": not settled in MF sources (fact 4).
