# Research Brief: Kurs waluty — data referencyjna przeliczenia (art. 31a ustawy o VAT)

**Requested by:** human (internal) **Date:** 2026-08-12 **For content:** INTERNAL REFERENCE ONLY —
feeds `packages/validator/src/currency-date.ts`, the `CURRENCY_RATE_MISMATCH` semantic rule in
`packages/validator/src/semantic.ts`, and the `/waluty` rate calculator + explainer. **Target
persona:** none — this is engineering/legal reference material, not user-facing copy. **Tool
context:** ksefuj.to — free KSeF FA(3) validator

> ⚠️ **NOT USER-FACING.** Do not lift sentences from this brief into the blog, FAQ, or `/waluty`
> copy without routing them through the Copywriter. The quotes here are statutory Polish and read
> like statutory Polish.

---

## Source Corpus Used

| Source                                                                        | Tier | File / URL                                                                           | Status                                                                                                                                                                     |
| ----------------------------------------------------------------------------- | ---- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Ustawa o VAT — tekst jednolity Dz. U. z 2025 r. poz. 775**                  | 1    | `https://api.sejm.gov.pl/eli/acts/DU/2025/775/text/T/D20250775L.pdf` (228 s.)        | **RETRIEVED AND READ IN FULL** on 2026-08-12. Printed page numbers below are from this PDF.                                                                                |
| Ustawa z 16.06.2023 (Dz. U. poz. 1598 ze zm.) — "ustawa KSeF"                 | 1    | cited via footnotes 4, 22–34 of the tekst jednolity                                  | IN FORCE since **1.02.2026** — its versions of art. 31a and art. 29a are the current ones                                                                                  |
| Nowelizacje po tekście jednolitym: Dz.U. 2025 poz. 894, 896, 1203, 1541, 1811 | 1    | `https://api.sejm.gov.pl/eli/acts/DU/2025/{894,896,1203,1541,1811}`                  | **CHECKED** — none of them amends art. 19a, art. 31a or art. 31b (see "Currency of the text")                                                                              |
| FA(3) XSD (`schemat.xsd`, ns `.../2025/06/25/13775/`)                         | 2    | `packages/validator/src/schemas/schemat.xsd`                                         | CURRENT — Polish `xsd:documentation` quoted verbatim below                                                                                                                 |
| FA(3) Information Sheet (Broszura informacyjna, marzec 2026)                  | 2    | `packages/validator/docs/fa3-information-sheet.md`                                   | CURRENT — **silent on art. 31a and on the rate reference date** (see "What the Broszura does not say"), but **§9.2 supplies the date-of-issue rule** relied on in Answer 2 |
| Podręcznik KSeF 2.0 cz. II (brief)                                            | 2    | `docs/knowledge-base/briefs/podrecznik-ksef-20-czesc-ii.md` §1.4, §1.6.1, §2.5, §2.6 | CURRENT — no rate-date rule; §1.4 corroborates the date-of-issue rule with worked examples                                                                                 |
| FAQ MF — Pytania i odpowiedzi KSeF 2.0                                        | 3    | `https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20`                           | RETRIEVED 2026-08-12 — q. 18 and 19 quoted; **contains no mention of art. 31a**                                                                                            |
| Objaśnienia podatkowe MF re: SLIM VAT (kursy walut, art. 31a ust. 2a)         | 2    | `https://www.podatki.gov.pl/vat/wyjasnienia/slim-vat-objasnienia-podatkowe/`         | **NOT RETRIEVABLE** — URL returns HTTP 404. See "Unverifiable".                                                                                                            |
| Objaśnienia podatkowe 28.01.2026 (KSeF)                                       | 2    | not in repo, not located online in this session                                      | **NOT RETRIEVED** — no claim in this brief rests on it                                                                                                                     |

### Currency of the text

The tekst jednolity is stated as of 21.05.2025. Five acts amended the VAT Act afterwards. I
downloaded all five and searched them for `31a`, `31b`, `19a`, `29a ust.`:

- Dz.U. 2025 poz. 894, 896, 1541, 1811 — **zero** hits.
- Dz.U. 2025 poz. 1203 (ustawa z 5.08.2025) — hits only on `art. 86 ust. 19a` and cross-references
  to `art. 29a ust. 13–13c` / `ust. 14`; it does not touch art. 31a. It does, however, **add art.
  106nda** and replace **art. 106nh ust. 1, 2 i 4**, and it amends art. 106gb/106ne/106nf. Those
  provisions are outside art. 31a but are decisive for the date of issue — see Answer 2. (An earlier
  version of this line said poz. 1203 "amends art. 106nda"; it **adds** it. `art. 106nda` does not
  exist in the tekst jednolity.)

**Conclusion (HIGH):** art. 19a, art. 31a and art. 31b as printed in Dz. U. 2025 poz. 775 are the
text in force on 2026-08-12, taking the "new" (post-1.02.2026) variants where the tekst jednolity
prints two.

> **Quote hygiene:** the source PDF is justified two-column-ish text; extraction leaves double
> spaces and soft hyphens. Quotes below are **whitespace-normalised and de-hyphenated**. No word,
> inflection, or punctuation mark has been changed. Verify against the printed page number given.

---

## Answer 1 — Art. 31a ust. 1: the general rule

**Status: CONFIRMED.** Source: Ustawa o VAT, art. 31a ust. 1 — Dz. U. 2025 poz. 775, **s. 43**.

> „W przypadku gdy kwoty stosowane do określenia podstawy opodatkowania są określone w walucie
> obcej, przeliczenia na złote dokonuje się według kursu średniego danej waluty obcej ogłoszonego
> przez Narodowy Bank Polski na ostatni dzień roboczy poprzedzający **dzień powstania obowiązku
> podatkowego**. Podatnik może wybrać sposób przeliczania tych kwot na złote według ostatniego kursu
> wymiany opublikowanego przez Europejski Bank Centralny na ostatni dzień poprzedzający dzień
> powstania obowiązku podatkowego; w takim przypadku waluty inne niż euro przelicza się z
> zastosowaniem kursu wymiany każdej z nich względem euro."

**Confirmed exactly as stated in the request:** NBP mid-rate, **last business day preceding the day
the tax obligation arises**. Confidence: HIGH.

Two riders that the request did not mention and that matter for the validator:

- **The ECB option is inside ust. 1 itself, not only in ust. 2a–2d.** Second sentence of ust. 1
  offers the ECB last published rate as a taxpayer election, with cross-rates via EUR. Note the
  asymmetry: the NBP leg says „ostatni **dzień roboczy** poprzedzający", the ECB leg says „ostatni
  **dzień** poprzedzający". Confidence: HIGH (verbatim).
- **The rate converts the tax base, not the invoice.** Art. 31a governs „kwoty stosowane do
  określenia podstawy opodatkowania". On a foreign-currency invoice only the tax amount is restated
  in PLN — art. 106e ust. 11. Corroborated at Tier 3 by FAQ MF q. 19 (quoted in Answer 5).

### Art. 31a ust. 1a — new since 1.02.2026, and the request did not ask about it

**Status: CONFIRMED.** Source: art. 31a ust. 1a — Dz. U. 2025 poz. 775, **s. 43**, added by art. 1
pkt 3 lit. a ustawy z 16.06.2023 (footnote 32 → footnote 4), in force **1.02.2026**.

> „W przypadku dostaw towarów i świadczenia usług, dla których obowiązek podatkowy powstaje z chwilą
> wystawienia faktury, przeliczenia na złote podatnik **może** dokonać według kursu średniego danej
> waluty obcej ogłoszonego przez Narodowy Bank Polski na ostatni dzień roboczy poprzedzający dzień,
> o którym mowa w art. 106e ust. 1 pkt 1, pod warunkiem że faktura ustrukturyzowana została
> wystawiona nie później niż następnego dnia po dniu, o którym mowa w art. 106e ust. 1 pkt 1.
> Przepis ust. 1 zdanie drugie stosuje się odpowiednio."

It is **optional** ("może"). Confidence: HIGH.

**Scope — broader than the art. 19a ust. 5 pkt 3/4 categories.** An earlier version of this brief
described ust. 1a as "the KSeF-era accommodation for the art. 19a ust. 5 pkt 3/4 categories". That
is **too narrow**. The provision defines its own scope by a _criterion_, not by a list of
cross-references: „dostaw towarów i świadczenia usług, **dla których obowiązek podatkowy powstaje z
chwilą wystawienia faktury**". Every regime meeting that criterion is inside it. Confirmed members:

- **art. 19a ust. 5 pkt 3** — construction, book supply, book printing (s. 29).
- **art. 19a ust. 5 pkt 4** — media, telecom, rental/lease/leasing, security, permanent legal and
  office services, energy distribution (s. 29).
- **art. 20 ust. 1 — WDT** (Dz. U. 2025 poz. 775, **s. 30**): „W wewnątrzwspólnotowej dostawie
  towarów obowiązek podatkowy powstaje **z chwilą wystawienia faktury** przez podatnika, nie później
  jednak niż 15. dnia miesiąca następującego po miesiącu, w którym dokonano tej dostawy, z
  zastrzeżeniem ust. 4." This is a _dostawa towarów_ whose tax point is invoice issue, so it meets
  the ust. 1a criterion on the face of the text. Confidence: HIGH (verbatim).

**Do not treat that list as exhaustive** — it is the set I verified, not a closed enumeration. The
statute states a criterion; any provision satisfying it qualifies.

**Qualifier that applies to both art. 19a ust. 5 pkt 3/4 and art. 20 ust. 1:** each carries a
backstop that displaces the issue date when the invoice is late or absent — art. 19a ust. 7 (the
art. 106i ust. 3/4 deadline) and art. 20 ust. 1 itself („nie później jednak niż 15. dnia miesiąca
następującego…"). Where a backstop bites, the tax point is no longer „z chwilą wystawienia faktury",
and the ust. 1a precondition is not met for that instance. **This is also where ust. 1a does its
real work:** when the backstop moves the tax point away from `P_1`, the ust. 1 default and the ust.
1a option point at genuinely different NBP tables. Confidence: HIGH (arithmetic consequence of the
quoted texts).

> **Not verified:** whether **WNT** (art. 20 ust. 5, also „z chwilą wystawienia faktury") falls
> within ust. 1a. Textually ust. 1a covers „dostaw towarów i świadczenia usług", and WNT is a
> _nabycie_, not a _dostawa_ — but I found no MF statement either way. Out of scope for issuer-side
> FA(3) validation regardless. Confidence: LOW — do not rely on this either way.

`art. 106e ust. 1 pkt 1` = „datę wystawienia" (Dz. U. 2025 poz. 775, **s. 124**) — i.e. the date
written on the invoice, which in FA(3) is `Fa/P_1`. Confidence: HIGH (verbatim).

---

## Answer 2 — Art. 31a ust. 2: invoice issued before the tax point

**Status: CONFIRMED, with a versioning caveat the request did not anticipate.** The tekst jednolity
prints **two** versions of ust. 2 side by side (footnotes 33 and 34), because it was consolidated
before 1.02.2026.

### Version in force from 1.02.2026 (the one to use) — art. 31a ust. 2, s. 43

> „W przypadku gdy podatnik **wystawił** fakturę **przed powstaniem obowiązku podatkowego**, a kwoty
> stosowane do określenia podstawy opodatkowania są określone na tej fakturze w walucie obcej,
> przeliczenia na złote podatnik dokonuje według kursu średniego danej waluty obcej ogłoszonego
> przez Narodowy Bank Polski na ostatni dzień roboczy poprzedzający **dzień wystawienia faktury**.
> Podatnik może dokonać tego przeliczenia również według kursu średniego danej waluty obcej
> ogłoszonego przez Narodowy Bank Polski na ostatni dzień roboczy poprzedzający dzień, o którym mowa
> w art. 106e ust. 1 pkt 1, pod warunkiem że faktura ustrukturyzowana została wystawiona nie później
> niż następnego dnia po dniu, o którym mowa w art. 106e ust. 1 pkt 1. Przepis ust. 1 zdanie drugie
> stosuje się odpowiednio."

Footnote 34: „W brzmieniu ustalonym przez art. 1 pkt 3 lit. b ustawy, o której mowa w odnośniku 4."
Footnote 4 (s. 8): „…ustawy z dnia 16 czerwca 2023 r. … (Dz. U. poz. 1598 oraz z 2024 r. poz. 852 i
1721), która wejdzie w życie z dniem **1 lutego 2026 r.**" Confidence: HIGH.

### Superseded version (until 31.01.2026) — kept here for stale-content detection

> „W przypadku gdy podatnik **wystawia** fakturę przed powstaniem obowiązku podatkowego, a kwoty
> stosowane do określenia podstawy opodatkowania są określone na tej fakturze w walucie obcej,
> przeliczenia na złote **dokonuje się** według kursu średniego danej waluty obcej ogłoszonego przez
> Narodowy Bank Polski na ostatni dzień roboczy poprzedzający dzień wystawienia faktury. Przepis
> ust. 1 zdanie drugie stosuje się odpowiednio."

Difference that matters: the current version adds the **second sentence** — the optional `P_1`-based
rate for structured invoices sent to KSeF within one day. The old version had no such option.
Confidence: HIGH.

### "Strictly before" or "on or before"?

**CONFIRMED: strictly before.** The trigger is „wystawił fakturę **przed powstaniem obowiązku
podatkowego**" — a temporal _precedence_, not "not later than". Where the two coincide, ust. 2 does
not engage and ust. 1 governs. Confidence: HIGH (verbatim reading).

**But at day granularity the distinction is immaterial**, because if the issue day equals the tax
point day, ust. 1 and ust. 2 both point at the last business day preceding that same day. The
statutory test is about _moments_ („z chwilą" throughout art. 19a); an invoice issued at 09:00 for a
payment received at 15:00 the same day is issued "przed powstaniem obowiązku podatkowego", yet the
reference date is unchanged. Confidence: HIGH (arithmetic consequence of the two quotes).

**Implication for `currency-date.ts`:** the current strict `issueDate < taxPointDate` comparison is
correct and needs no change. The `min(issue, taxPoint)` collapse it implements is a faithful
restatement of ust. 1 + ust. 2 **at day granularity**.

### „dzień wystawienia faktury" resolves to `P_1` in every transmission mode

**Status: CONFIRMED. Confidence: HIGH** (Tier 1 verbatim, four provisions; Tier 2 corroboration).

> **CORRECTION — 2026-08-12.** An earlier version of this section inferred that in offline /
> offline24 / awaria modes „dzień wystawienia faktury" in art. 31a ust. 2 zd. 1 meant the **KSeF
> transmission day**, so the reference date would be unknowable at validation time. It was
> self-rated MEDIUM on the stated ground that no MF source could be found either way. **That was
> wrong on both counts.** MF sources address the point directly and say the opposite, and the
> statute settles it. The refuted inference is removed; only the narrow observation that `P_1` may
> precede the _transmission_ day survives, and that is a fact about transmission timing, not about
> the date of issue.

The date of issue of a KSeF invoice is fixed by a separate provision for each transmission mode. In
**every** one it resolves to the date the taxpayer entered under art. 106e ust. 1 pkt 1 — that is,
`Fa/P_1`.

| Mode                                  | Provision                                   | Date of issue            |
| ------------------------------------- | ------------------------------------------- | ------------------------ |
| **online** (`P_1` = transmission day) | art. 106na ust. 1                           | transmission day = `P_1` |
| **online, transmitted after `P_1`**   | art. 106nda ust. 16 → ust. 10 _odpowiednio_ | `P_1`                    |
| **offline24**                         | art. 106nda ust. 10                         | `P_1`                    |
| **offline** (niedostępność KSeF)      | art. 106nh ust. 4 → art. 106nda ust. 10     | `P_1`                    |
| **awaria** (tryb awaryjny)            | art. 106nf ust. 9                           | `P_1`                    |

**art. 106na ust. 1** (Dz. U. 2025 poz. 775, **s. 133**):

> „Fakturę ustrukturyzowaną uznaje się za wystawioną **w dniu jej przesłania do Krajowego Systemu
> e-Faktur**."

**art. 106nda ust. 10** (Dz. U. 2025 poz. 1203, **s. 5**) — this is the operative sentence:

> „Za datę wystawienia faktury, o której mowa w ust. 1, uznaje się **datę, o której mowa w art. 106e
> ust. 1 pkt 1, wskazaną przez podatnika na tej fakturze**."

**art. 106nda ust. 16** (Dz. U. 2025 poz. 1203, **s. 5**) — pulls the late-transmitted _structured_
invoice into the same regime, expressly applying ust. 10:

> „Za fakturę, o której mowa w ust. 1, uznaje się także fakturę ustrukturyzowaną, jeżeli data jej
> przesłania do Krajowego Systemu e-Faktur jest późniejsza niż data, o której mowa w art. 106e ust.
> 1 pkt 1, wskazana na tej fakturze. Przepisy ust. 4, ust. 6 pkt 1, **ust. 8–10**, 12 i 13 stosuje
> się odpowiednio."

**art. 106nh ust. 4** (Dz. U. 2025 poz. 1203, **s. 6**, replacing the tekst jednolity version) —
carries ust. 10 into the KSeF-unavailability mode:

> „Do faktur, o których mowa w ust. 1, przepisy **art. 106nda ust. 4–15** stosuje się odpowiednio."

**art. 106nf ust. 9** (Dz. U. 2025 poz. 775, **s. 136**) — the awaria mode, worded identically to
art. 106nda ust. 10:

> „Za datę wystawienia faktury, o której mowa w ust. 1, uznaje się datę, o której mowa w art. 106e
> ust. 1 pkt 1, wskazaną przez podatnika na tej fakturze."

**Tier 2 corroboration (both consistent with the statute):**

- Broszura FA(3) §9.2, "P_1 — Date of Issue Rules": lists the four cases „where P_1 is the formal
  date of issue (may differ from KSeF sending date)" — offline24 (Art. 106nda sec. 10), online sent
  late (Art. 106nda sec. 16), offline/unavailability (Art. 106nda sec. 10 + Art. 106nh sec. 4),
  emergency (Art. 106nf sec. 9).
- Podręcznik KSeF 2.0 cz. II §1.4, worked example: „**Przykład 2 (offline24):** P_1 = 2.02.2026,
  przesłanie 3.02.2026. Data wystawienia = 2.02.2026 (tryb offline24)."

**The remaining case is closed too.** `P_1` later than the transmission day cannot occur: KSeF
rejects the file (Podręcznik cz. II §1.6.1 — „Data P_1 z przyszłości (późniejsza niż data
przesłania)" is a listed ground for rejection). So `P_1` ≤ transmission day always: either the two
are equal (plain online, where art. 106na ust. 1 makes the date of issue the transmission day — the
same day) or `P_1` is earlier (all other modes, where the special provisions make `P_1` itself the
date of issue). The case enumeration is therefore exhaustive, and `P_1` is the date of issue in
every branch of it.

**Consequence for the validator — the opposite of what the earlier version said:**

- `Fa/P_1` **is** the art. 31a ust. 2 zd. 1 input, directly and in all modes. It is recoverable from
  the document, at validation time, before transmission.
- The `min(P_1, taxPoint)` selection in `currency-date.ts` therefore rests on solid ground, and Gap
  Analysis finding #1 is withdrawn (see that table).
- The one thing that does **not** follow from `P_1` is the _transmission_ day. Nothing in art. 31a
  ust. 1, ust. 1a or ust. 2 keys on the transmission day, so this is immaterial to the rate check.

**Severity:** nothing in this section bears on `CURRENCY_RATE_MISMATCH` severity either way. The
case for WARNING-never-ERROR rests entirely on the ECB option (art. 31a ust. 1 zd. 2) and the
income-tax-rules election (art. 31a ust. 2a–2b) — see **Answer 3**, which is unaffected by this
correction.

> **Source-corpus note.** `art. 106nda` does **not** appear in the tekst jednolity Dz. U. 2025 poz.
> 775 at all. It is inserted into the VAT Act by art. 2 of the ustawa z 5.08.2025 (Dz. U. 2025 poz.
> 1203), which amends the ustawa z 16.06.2023 by adding pkt 22a; it enters into force with that act
> on **1.02.2026** and is in force today. The same act replaced art. 106nh ust. 1, 2 and 4. The
> "Currency of the text" finding above remains correct **as to art. 19a / 31a / 31b**, which poz.
> 1203 does not touch — but the art. 106n\* block must be read with poz. 1203 overlaid on the tekst
> jednolity.

---

## Answer 3 — Art. 31a ust. 2a–2d: the income-tax-rules election

**Status: CONFIRMED.** Source: art. 31a ust. 2a–2d — Dz. U. 2025 poz. 775, **s. 43–44**. Note that
ust. 2c and 2d, like ust. 2, are printed in two versions; the current ones (footnotes 36, 38) differ
from the old ones only in citing „ust. 1–2" instead of „ust. 1 lub 2".

**ust. 2a — the election itself:**

> „Kwoty stosowane do określenia podstawy opodatkowania określone w walucie obcej **mogą być
> przeliczane przez podatnika** na złote zgodnie z zasadami przeliczania przychodu określonego w
> walucie obcej wynikającymi z przepisów o podatku dochodowym, obowiązującymi tego podatnika na
> potrzeby rozliczania danej transakcji."

**ust. 2b — 12-month lock-in:**

> „Podatnik, który wybrał zasady przeliczania, o których mowa w ust. 2a, jest obowiązany do ich
> stosowania przez co najmniej 12 kolejnych miesięcy, licząc od miesiąca, w którym je wybrał."

**ust. 2c (current version, footnote 36) — 12-month lock-out after resignation:**

> „W przypadku rezygnacji z zasad przeliczania, o których mowa w ust. 2a, podatnik jest obowiązany
> do stosowania zasad przeliczania, o których mowa w ust. 1–2, przez co najmniej 12 kolejnych
> miesięcy, licząc od miesiąca następującego po miesiącu, w którym zrezygnował z zasad przeliczania,
> o których mowa w ust. 2a."

**ust. 2d (current version, footnote 38) — fallback for transactions the PIT/CIT rules don't
cover:**

> „W przypadku gdy w okresie stosowania zasad przeliczania, o których mowa w ust. 2a, podatnik
> dokona transakcji niepodlegającej przeliczeniu zgodnie z tymi zasadami, jest on obowiązany do
> zastosowania dla tej transakcji zasad przeliczania, o których mowa w ust. 1–2."

**Answer to the question asked: YES, these are optional elections the taxpayer makes.** „mogą być
przeliczane przez podatnika" is permissive; ust. 2b/2c only regulate the consequences of having
elected. Confidence: HIGH.

### What this means for validator severity

There are, on a single lawful foreign-currency invoice, **at least four** rate values any of which
may be correct, and the XML records none of the facts needed to tell them apart. Rows 2 and 4 are
the load-bearing ones for severity — they remain lawful alternatives no matter how precisely the
reference _date_ is pinned down, so no improvement in date resolution can ever make a Table-A
mismatch conclusive:

| #   | Basis                                      | Rate source                                          | Detectable from FA(3)?       |
| --- | ------------------------------------------ | ---------------------------------------------------- | ---------------------------- |
| 1   | art. 31a ust. 1 / ust. 2, sentence 1       | NBP Table A, day before tax point / day before `P_1` | partially (Answer 5)         |
| 2   | art. 31a ust. 1 zd. 2 (ECB option)         | ECB reference rate, day before                       | **no**                       |
| 3   | art. 31a ust. 1a / ust. 2 zd. 2 (election) | NBP Table A, day before `P_1`                        | **no** (election unrecorded) |
| 4   | art. 31a ust. 2a (PIT/CIT rules election)  | whatever the taxpayer's income-tax rules give        | **no**                       |

**Recommended severity: WARNING, never ERROR — and the message must be phrased as "does not match
the NBP Table A mid-rate for <date>", never as "wrong rate".** A taxpayer on the ust. 2a election or
the ECB option will fail a Table-A comparison on every single invoice while being fully compliant.
Confidence: HIGH (this follows directly from the quoted text).

> The current implementation already emits `CURRENCY_RATE_MISMATCH` as a soft finding with an
> `expectedValues` list rather than a hard failure. That posture is correct and should be preserved;
> what is missing is the ECB/2a caveat in the user-facing message.

---

## Answer 4 — Art. 19a: when the tax obligation arises

All quotes: Ustawa o VAT, art. 19a — Dz. U. 2025 poz. 775, **s. 28–30**. Status: CONFIRMED
throughout. Confidence: HIGH.

### ust. 1 — general rule (s. 28)

> „Obowiązek podatkowy powstaje z chwilą dokonania dostawy towarów lub wykonania usługi, z
> zastrzeżeniem ust. 1a, 1b, 5 i 7–11, art. 14 ust. 6, art. 20, art. 21 ust. 1 i art. 138f."

Note the reservation list: **eleven** carve-outs, of which the XML reveals at most one.

### ust. 2 — partially accepted services (s. 29)

> „W odniesieniu do przyjmowanych częściowo usług, usługę uznaje się również za wykonaną, w
> przypadku wykonania części usługi, dla której to części określono zapłatę."

### ust. 3 — settlement periods and the 12-month rule (s. 29)

> „Usługę, dla której w związku z jej świadczeniem ustalane są następujące po sobie terminy
> płatności lub rozliczeń, uznaje się za wykonaną **z upływem każdego okresu**, do którego odnoszą
> się te płatności lub rozliczenia, do momentu zakończenia świadczenia tej usługi. Usługę świadczoną
> w sposób ciągły przez okres dłuższy niż rok, dla której w związku z jej świadczeniem w danym roku
> nie upływają terminy płatności lub rozliczeń, uznaje się za wykonaną **z upływem każdego roku
> podatkowego**, do momentu zakończenia świadczenia tej usługi."

Both limbs confirmed as the request described them.

### ust. 4 — ust. 3 applied to goods (s. 29)

> „Przepis ust. 3 stosuje się odpowiednio do dostawy towarów, z wyjątkiem dostaw towarów, o których
> mowa w: 1) art. 7 ust. 1 pkt 2; 2) art. 7a ust. 1 i 2, dokonywanych na rzecz podatnika
> ułatwiającego dostawy towarów oraz przez tego podatnika."

### ust. 5 — special tax points (s. 29)

Full enumeration, verbatim structure:

**pkt 1 — obligation arises on RECEIPT OF PAYMENT („otrzymania całości lub części zapłaty z
tytułu"):**

- lit. a — „wydania towarów przez komitenta komisantowi na podstawie umowy komisu"
- lit. b — „przeniesienia z nakazu organu władzy publicznej lub podmiotu działającego w imieniu
  takiego organu lub przeniesienia z mocy prawa prawa własności towarów w zamian za odszkodowanie"
- lit. c — „dokonywanej w trybie egzekucji dostawy towarów, o której mowa w art. 18"
- lit. d — „świadczenia, na podstawie odrębnych przepisów, na zlecenie sądów powszechnych,
  administracyjnych, wojskowych lub prokuratury usług związanych z postępowaniem sądowym lub
  przygotowawczym, z wyjątkiem usług, do których stosuje się art. 28b, stanowiących import usług"
- lit. e — „świadczenia usług zwolnionych od podatku zgodnie z art. 43 ust. 1 pkt 37–41" (financial
  and insurance services)

**pkt 2 — receipt of subsidies:** „otrzymania całości lub części dotacji, subwencji i innych dopłat
o podobnym charakterze, o których mowa w art. 29a ust. 1"

**pkt 3 — obligation arises on ISSUING THE INVOICE („wystawienia faktury w przypadkach, o których
mowa w art. 106b ust. 1, z tytułu"):**

- lit. a — „świadczenia usług **budowlanych lub budowlano-montażowych**"
- lit. b — „dostawy **książek drukowanych** (CN ex 4901 10 00, 4901 91 00, ex 4901 99 00 i 4903
  00 00) – z wyłączeniem map i ulotek – oraz gazet, czasopism i magazynów, drukowanych (CN 4902) …"
- lit. c — „czynności polegających na **drukowaniu książek** … oraz gazet, czasopism i magazynów (CN
  4902), z wyjątkiem usług, do których stosuje się art. 28b, stanowiących import usług"

**pkt 4 — obligation arises on ISSUING THE INVOICE („wystawienia faktury z tytułu"):**

- lit. a — „dostaw **energii elektrycznej, cieplnej lub chłodniczej oraz gazu przewodowego**"
- lit. b — „świadczenia usług: **telekomunikacyjnych**; wymienionych w **poz. 24–37, 50 i 51
  załącznika nr 3** do ustawy [water supply, sewage, waste — RESEARCHER NOTE: annex content not
  re-verified in this session]; **najmu, dzierżawy, leasingu** lub usług o podobnym charakterze;
  **ochrony osób oraz usług ochrony, dozoru i przechowywania mienia**; **stałej obsługi prawnej i
  biurowej**; **dystrybucji energii elektrycznej, cieplnej lub chłodniczej oraz gazu przewodowego**
  – z wyjątkiem usług, do których stosuje się art. 28b, stanowiących import usług."

**Confirmed: the request's list (construction, printing of books, media/telecoms/rental/lease/
leasing/permanent legal & office services) is accurate and complete for pkt 3 + pkt 4.** The request
omitted only "ochrona osób / dozór mienia" and "dystrybucja energii".

### ust. 6 and ust. 7 — the qualifiers on ust. 5 (s. 30)

> „6. W przypadkach, o których mowa w ust. 5 pkt 1 i 2, obowiązek podatkowy powstaje w odniesieniu
> do otrzymanej kwoty."

> „7. W przypadkach, o których mowa w ust. 5 pkt 3 i 4, gdy podatnik **nie wystawił faktury lub
> wystawił ją z opóźnieniem**, obowiązek podatkowy powstaje z chwilą upływu terminów wystawienia
> faktury określonych w art. 106i ust. 3 i 4, a w przypadku gdy nie określono takiego terminu – z
> chwilą upływu terminu płatności."

ust. 7 is a genuine landmine: for a late-issued construction invoice the tax point is a **statutory
deadline in the past**, not the issue date. Art. 106i ust. 3 (s. 130) sets those deadlines: 30 days
from performance (19a ust. 5 pkt 3 lit. a), 60 days from release of goods (lit. b), 90 days from
performance (lit. c), and „z upływem terminu płatności" for 19a ust. 5 pkt 4. Confidence: HIGH.

### ust. 8 — advances (s. 30)

> „Jeżeli przed dokonaniem dostawy towaru lub wykonaniem usługi otrzymano całość lub część zapłaty,
> w szczególności przedpłatę, zaliczkę, zadatek, ratę, wkład budowlany lub mieszkaniowy przed
> ustanowieniem spółdzielczego prawa do lokalu mieszkalnego lub lokalu o innym przeznaczeniu,
> obowiązek podatkowy powstaje **z chwilą jej otrzymania** w odniesieniu do otrzymanej kwoty, z
> wyjątkiem: 1) dostaw towarów, w stosunku do których obowiązek podatkowy powstaje w sposób, o
> którym mowa w ust. 1b; 2) dostaw towarów i świadczenia usług, w stosunku do których obowiązek
> podatkowy powstaje w sposób, o którym mowa w ust. 5 pkt 4."

### Two more tax-point regimes outside art. 19a that the validator must respect

- **Metoda kasowa — art. 21 ust. 1 (s. 31):** for a mały podatnik on the cash method, „obowiązek
  podatkowy … powstaje: 1) z dniem otrzymania całości lub części zapłaty – w przypadku dokonania
  dostawy towarów lub świadczenia usług na rzecz podatnika … zarejestrowanego jako podatnik VAT
  czynny, 2) z dniem otrzymania całości lub części zapłaty, **nie później niż 180. dnia**, licząc od
  dnia wydania towaru lub wykonania usługi – w przypadku … podmiotu innego". This regime **is**
  flagged in FA(3): `Adnotacje/P_16 = "1"` (Broszura §9.6, "cash accounting note"). The payment date
  itself is not in the XML.
- **WDT/WNT — art. 20 (s. 30):** tax point on invoice issue, at the latest the 15th of the following
  month. Not derivable from FA(3) dates either.

---

## Answer 5 — Mapping to FA(3) XML fields

### The rate fields, and which article each one serves

The XSD ties every rate field to „dział VI ustawy" — and **Dział VI is „Podstawa opodatkowania",
art. 29a–32, which is precisely where art. 31a and art. 31b live** (verified: the heading „DZIAŁ VI
/ Podstawa opodatkowania" immediately precedes art. 29a at s. 39 of Dz. U. 2025 poz. 775).
Confidence: HIGH.

| Field                         | XSD path                                      | XSD documentation (verbatim PL)                                                                                                                                       | Governing article      |
| ----------------------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `KursWaluty`                  | `Fa/FaWiersz/KursWaluty` (l. 3199)            | „Kurs waluty stosowany do wyliczenia kwoty podatku w przypadkach, o których mowa w dziale VI ustawy"                                                                  | art. 31a               |
| `KursWalutyZ`                 | `Fa/KursWalutyZ` (l. 2636)                    | „Kurs waluty stosowany do wyliczenia kwoty podatku w przypadkach, o których mowa w dziale VI ustawy **na fakturach, o których mowa w art. 106b ust. 1 pkt 4 ustawy**" | art. 31a + 19a ust. 8  |
| `KursWalutyZW`                | `Fa/ZaliczkaCzesciowa/KursWalutyZW` (l. 3024) | „Kurs waluty stosowany do wyliczenia kwoty podatku w przypadkach, o których mowa w dziale VI ustawy"                                                                  | art. 31a, per payment  |
| `KursWalutyZK`                | `Fa/KursWalutyZK` (l. 3001)                   | „Kurs waluty stosowany do wyliczenia kwoty podatku w przypadkach, o których mowa w dziale VI ustawy **przed korektą**"                                                | art. 31b ust. 1        |
| `KursUmowny` + `WalutaUmowna` | `Fa/Rozliczenie`-adjacent                     | Broszura: „Does NOT apply to Section VI Act cases"                                                                                                                    | **none — contractual** |

> **CRITICAL for the validator: there is no `Fa/KursWaluty`.** `KursWaluty` exists **only inside
> `FaWiersz`** (`schemat.xsd` l. 3199, inside the FaWiersz sequence). Confirmed against the XSD by
> exhaustive grep: the only four `KursWaluty*` elements in the schema are the four listed above.

**FAQ MF q. 18** (Tier 3, `ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20`), on the boundary
between contractual and statutory rates:

> „Pola KursUmowny i WalutaUmowna dotyczą przypadków, gdy faktura wystawiona jest w złotówkach … a
> strony transakcji chcą w fakturze zawrzeć informację o kursie waluty w oparciu, o który dokonano
> takiego umownego przeliczenia. Jest to sytuacja odmienna od przypadku, gdy kwoty w fakturze
> określone są wyłącznie w walucie obcej i jedynie kwota podatku przeliczona jest na złotówki
> zgodnie z art. 106e ust. 11 ustawy o VAT. Wówczas wypełniane są pola KodWaluty i KursWaluty."

**FAQ MF q. 19:**

> „W takiej fakturze kwoty określone są wyłącznie w walucie obcej i jedynie kwota podatku w polu
> P_14_xW przeliczona jest na złotówki zgodnie z art. 106e ust. 11 ustawy o VAT. Wówczas oprócz pola
> KodWaluty wypełniane jest pole KursWaluty, względnie pole **KursWalutyZ**."

Confidence: HIGH (verbatim from the live MF page). **Implication: `KursUmowny` must never be fed
into an art. 31a check.**

### The date fields, and what they actually mean

| Field                              | XSD documentation (verbatim PL)                                                                                                                                                                                                                                                                                   | Maps to                                    |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `Fa/P_1` (l. 2450)                 | „Data wystawienia, z zastrzeżeniem art. 106na ust. 1 ustawy"                                                                                                                                                                                                                                                      | art. 106e ust. 1 pkt 1 (see Answer 2 trap) |
| `Fa/P_6` (l. 2471)                 | „Data dokonania lub zakończenia dostawy towarów lub wykonania usługi lub data otrzymania zapłaty, o której mowa w art. 106b ust. 1 pkt 4 ustawy, **o ile taka data jest określona i różni się od daty wystawienia faktury**. Pole wypełnia się w przypadku, gdy dla wszystkich pozycji faktury data jest wspólna" | art. 19a ust. 1 / ust. 8                   |
| `FaWiersz/P_6A` (l. 3094)          | same text, „…w przypadku gdy dla poszczególnych pozycji faktury występują różne daty"                                                                                                                                                                                                                             | art. 19a ust. 1 / ust. 8, per line         |
| `Fa/OkresFa` (l. 2476)             | „Okres, którego dotyczy faktura – **w przypadkach, o których mowa w art. 19a ust. 3 zdanie pierwsze i ust. 4 oraz ust. 5 pkt 4 ustawy**"                                                                                                                                                                          | art. 19a ust. 3 / 4 / **5 pkt 4**          |
| `Fa/OkresFa/P_6_Od` (2482)         | „Data początkowa okresu, którego dotyczy faktura"                                                                                                                                                                                                                                                                 | —                                          |
| `Fa/OkresFa/P_6_Do` (2487)         | „Data końcowa okresu, którego dotyczy faktura – **data dokonania lub zakończenia dostawy towarów lub wykonania usługi**"                                                                                                                                                                                          | art. 19a ust. 3/4 tax point                |
| `Fa/ZaliczkaCzesciowa/P_6Z` (3014) | „Data otrzymania płatności, o której mowa w art. 106b ust. 1 pkt 4 ustawy"                                                                                                                                                                                                                                        | art. 19a ust. 8, per payment               |

**Semantics of `P_6`, confirmed:** it is the delivery/completion **or** payment-receipt date, and —
critically — it is populated **only if that date differs from the issue date** (both the XSD and
art. 106e ust. 1 pkt 6, s. 124: „…o ile taka data jest określona i różni się od daty wystawienia
faktury"). Confidence: HIGH.

> **Inference the validator relies on (MEDIUM):** absence of `P_6`/`P_6A`/`OkresFa` on a `VAT`-type
> invoice implies the delivery date equals `P_1`, hence the tax point equals `P_1`, hence both art.
> 31a ust. 1 and ust. 2 give the same reference date. This is a sound inference from art. 106e ust.
> 1 pkt 6, but it is an inference: it fails whenever art. 19a ust. 5 or art. 21 moves the tax point,
> and it fails for a taxpayer who simply populated `P_6` inconsistently.

**Semantics of `OkresFa`, confirmed — and it is genuinely ambiguous:** the XSD maps it to _three_
statutory situations at once, two of which have opposite tax points:

- art. 19a ust. 3 zd. 1 and ust. 4 → tax point = **end of the period** = `P_6_Do`
- art. 19a ust. 5 pkt 4 → tax point = **invoice issue** = `P_1` (or, if late, the payment deadline
  per art. 19a ust. 7 + art. 106i ust. 3 pkt 4)

Nothing in FA(3) distinguishes them. A monthly rental invoice (`ust. 5 pkt 4`) and a monthly
consulting-retainer invoice (`ust. 3`) are structurally identical XML. Confidence: HIGH that the
ambiguity exists (it is visible in the XSD annotation itself).

### Scenarios where the tax point is NOT derivable from the XML at all

Stated plainly, as requested:

1. **Art. 19a ust. 5 pkt 3 (construction, book supply, book printing).** Tax point = issue of the
   invoice, or the art. 106i ust. 3 deadline if late. No FA(3) field marks the category. `P_6`, if
   present, is the performance date and is **not** the tax point.
2. **Art. 19a ust. 5 pkt 4 (media, telecom, rental/lease/leasing, security, permanent legal & office
   services, energy distribution).** Same problem; `OkresFa` is present but ambiguous with ust. 3/4.
3. **Art. 19a ust. 5 pkt 1 (commission, expropriation, bailiff sale, court-commissioned services,
   art. 43 ust. 1 pkt 37–41 financial/insurance).** Tax point = payment receipt, a date the invoice
   need not carry.
4. **Art. 19a ust. 7 late invoices.** Tax point is a statutory deadline computed from a performance
   date the XML may not carry.
5. **Metoda kasowa (art. 21).** Detectable (`P_16 = "1"`) but the payment date is absent.
6. ~~**Offline / offline24 / awaria modes.**~~ **REMOVED 2026-08-12 — this was not a gap.** `P_1`
   may differ from the KSeF transmission day in these modes, but the transmission day is **not** the
   reference for anything in art. 31a; the date of issue is `P_1` in all modes (art. 106nda ust. 10
   i 16, art. 106nh ust. 4, art. 106nf ust. 9). Transmission mode is irrelevant to the rate check.
7. **WDT/WNT (art. 20).** Tax point tied to invoice issue with a 15th-of-next-month backstop.
8. **Any invoice from a taxpayer on the art. 31a ust. 2a election.** The tax point is irrelevant —
   income-tax rules govern. Undetectable.

**What the Broszura does not say:** `packages/validator/docs/fa3-information-sheet.md` contains **no
occurrence of "31a"** and no statement about which date supplies the exchange rate. Exhaustive grep
for `31a|obowiązku podatkowego|19a` returns only the `OkresFa` row (§9.2) and the decimal-precision
tables. **Every rate-date rule in our validator rests on Tier 1 statute, not on Tier 2 MF technical
guidance.** Confidence: HIGH (negative finding, verified by grep).

**Scope of that negative finding, narrowed 2026-08-12.** It covers the _rate_ rule only. The
Broszura is **not** silent on the _date of issue_: §9.2 "P_1 — Date of Issue Rules" states it
explicitly for all five transmission modes, and Podręcznik cz. II §1.4 gives worked examples. Both
were overlooked when this section was first written, which is what produced the now-withdrawn
offline-mode inference in Answer 2. Do not read "the Broszura is silent" more broadly than the
rate-date question.

---

## Answer 6 — Advance invoices (ZAL / KOR_ZAL) and `KursWalutyZ`

**Status: CONFIRMED as to the rule; the request's framing needs one correction.**

**There is no separate rate rule for zaliczki.** Art. 31a contains no advance-payment provision.
What changes for an advance is not the _rate rule_ but the _tax point_, via art. 19a ust. 8: the
obligation arises „z chwilą jej otrzymania w odniesieniu do otrzymanej kwoty". So:

- **The ordinary art. 31a ust. 1 path applies to ZAL**, with the tax point = **date the payment was
  received**. Confidence: HIGH.
- That date is in the XML: `Fa/P_6` (XSD: „…lub data otrzymania zapłaty, o której mowa w art. 106b
  ust. 1 pkt 4 ustawy") or, when several payments are documented on one invoice,
  `Fa/ZaliczkaCzesciowa/P_6Z` („Data otrzymania płatności…") — **one date per payment**.
- **Art. 31a ust. 2 can still apply to a ZAL.** Art. 106i ust. 7 pkt 2 (s. 130) permits issuing an
  invoice up to 60 days before „otrzymaniem, przed dokonaniem dostawy towaru lub wykonaniem usługi,
  całości lub części zapłaty". An invoice issued in anticipation of a zaliczka precedes its own tax
  point, so ust. 2 governs and the reference is the issue day.

**Answer to "should ZAL be excluded from the general path?" — NO, do not exclude them; extend the
check to reach them.** The general art. 31a ust. 1 / ust. 2 selection is exactly right for advances.
What is wrong today is the plumbing:

- **`ZAL` invoices have no `FaWiersz`.** Podręcznik KSeF 2.0 cz. II §2.6 lists for a faktura
  zaliczkowa: „Element `Zamowienie` — wypełniony; Element `FaWiersz` — **pominięty**."
- `checkCurrencyRateMismatch` in `packages/validator/src/semantic.ts` reads rates **only** from
  `//ns:Fa/ns:FaWiersz/ns:KursWaluty`.
- **Therefore `KursWalutyZ` and `KursWalutyZW` are currently never rate-checked at all.** On a
  foreign-currency ZAL the function finds `linesWithRate.length === 0` and, if a rate table is
  available, returns silently.

**Recommended handling (engineering, derived from the statute — not itself a source claim):**

- `Fa/KursWalutyZ` → single rate for the whole advance invoice → reference date = `min(P_1, P_6)`
  under the ust. 1 / ust. 2 selection.
- `Fa/ZaliczkaCzesciowa[i]/KursWalutyZW` → **per-payment**, each with its own reference date
  `min(P_1, P_6Z[i])`. Multi-payment advance invoices legitimately carry several different rates on
  one document; a single-rate assumption would produce false positives.
- `KOR_ZAL` → see Answer 7; do not rate-check.

---

## Answer 7 — Corrective invoices (KOR, KOR_ZAL, KOR_ROZ)

> **The request contains a mis-citation.** There is **no** „kurs jak dla faktury pierwotnej" rule in
> art. 31a ust. 1. That rule exists, but it lives in **art. 31b ust. 1**, a separate article added
> alongside SLIM VAT 3. I could not find any sentence in art. 31a on corrections. Correcting this
> before it propagates into code comments or copy.

**Status: CONFIRMED.** Source: art. 31b — Dz. U. 2025 poz. 775, **s. 44**.

**ust. 1 — the default: the original rate carries over.**

> „W przypadku gdy kwoty stosowane do określenia podstawy opodatkowania wyrażone w walucie obcej
> uległy zmianie, przeliczenia na złote dokonuje się **według kursu danej waluty obcej przyjętego do
> przeliczenia kwot stosowanych do określenia podstawy opodatkowania przed jej zmianą**."

Note the wording: „kursu … **przyjętego**" — the rate _actually adopted_ on the original invoice,
not "the rate that would be correct for the original invoice date". If the original used the ECB
option or the ust. 2a election, the correction inherits that. Confidence: HIGH.

**ust. 2 — the exception: collective discount corrections (art. 106j ust. 3) get a fresh rate.**

> „W przypadku gdy podatnik wystawił fakturę korygującą, o której mowa w art. 106j ust. 3, a kwoty
> stosowane do określenia podstawy opodatkowania są wyrażone na tej fakturze korygującej w walucie
> obcej, przeliczenia na złote podatnik **może** dokonać według: 1) kursu średniego danej waluty
> obcej ogłoszonego przez Narodowy Bank Polski na ostatni dzień roboczy poprzedzający dzień
> wystawienia tej faktury korygującej albo 2) ostatniego kursu wymiany opublikowanego przez
> Europejski Bank Centralny na ostatni dzień poprzedzający dzień wystawienia tej faktury
> korygującej…"

Art. 106j ust. 3 (s. 131) = the collective corrective invoice for a discount/price reduction granted
to one recipient over a period. In FA(3) this is the invoice carrying `OkresFaKorygowanej` (Broszura
§9.7: "Period for collective corrective invoices (Art. 106j sec. 3)"). Confidence: HIGH.

**ust. 3** extends a similar rule to period discounts on the WNT / art. 17 ust. 1 pkt 4–5 side
(reverse-charge purchases). Out of scope for issuer-side FA(3) validation; noted for completeness.

### Does the in-plus / in-minus distinction change the rate?

**No — CONFIRMED.** Art. 29a ust. 13, 13a, 13b, 14, 15, 15a, 17 (s. 41–42) govern **the settlement
period in which the correction is recognised**, not the exchange rate. They contain no rate
provision; the rate is exclusively art. 31b. The two axes are independent. Confidence: HIGH.

For completeness, the current (post-1.02.2026) in-minus timing rule, art. 29a ust. 13 (s. 41):

> „W przypadkach, o których mowa w ust. 10 pkt 1–3, obniżenia podstawy opodatkowania, w stosunku do
> podstawy określonej na wystawionej fakturze z wykazanym podatkiem, dokonuje się **za okres
> rozliczeniowy, w którym podatnik wystawił fakturę korygującą w postaci faktury
> ustrukturyzowanej**, z zastrzeżeniem ust. 13a i 13b."

(ust. 13a — non-structured corrective invoice → period of buyer's acknowledgement; ust. 13b —
offline/awaria corrective invoice sent to KSeF → period of transmission.)

And in-plus, art. 29a ust. 17 (s. 42), unchanged:

> „W przypadku gdy podstawa opodatkowania uległa zwiększeniu, korekty tej podstawy dokonuje się w
> rozliczeniu za okres rozliczeniowy, w którym zaistniała przyczyna zwiększenia podstawy
> opodatkowania."

**Note the FA(3) hook:** `Fa/TypKorekty` ("1" = effect on the original invoice's date, "2" = effect
on the corrective invoice's date, "3" = another date — Broszura §9.7) encodes exactly this ust. 13 /
ust. 17 choice. It is a **settlement-period** marker. It must **not** be read as a rate-date
selector.

### Consequence for the validator

**`RodzajFaktury ∈ {KOR, KOR_ZAL, KOR_ROZ}` must be excluded from the NBP Table A comparison**,
except possibly for `OkresFaKorygowanej` collective discount corrections. Reason: art. 31b ust. 1
requires the rate _adopted on the original invoice_, which is not in the corrective XML — FA(3)
records `DaneFaKorygowanej/DataWystFaKorygowanej` and `NrKSeFFaKorygowanej`, but **not the original
`KursWaluty` value**. `KursWalutyZK` is the closest thing, and per its XSD annotation it is the
pre-correction rate — but it is `minOccurs="0"` and exists only on the advance/settlement branch.

A validator that computes "NBP rate for the day before the corrective invoice's `P_6`" and compares
it to a `KOR`'s `KursWaluty` is testing the wrong rule and will fire on correct invoices. **Current
state: `checkCurrencyRateMismatch` does not branch on `RodzajFaktury` at all.**

---

## The Decision Procedure (engineering summary)

Derived from the quotes above. Every step is annotated with its authority.

```
INPUT: P_1, KodWaluty, RodzajFaktury, P_6, P_6A[], OkresFa/P_6_Do,
       ZaliczkaCzesciowa[]/{P_6Z, KursWalutyZW}, KursWalutyZ, Adnotacje/P_16,
       OkresFaKorygowanej, NBP Table A history

0. if KodWaluty == "PLN"                          -> no check           (art. 106e ust. 11)
1. if RodzajFaktury in {KOR, KOR_ZAL, KOR_ROZ}:
     if OkresFaKorygowanej present -> reference = P_1 (fresh rate allowed)
                                                                        (art. 31b ust. 2)
     else                          -> NO CHECK POSSIBLE                 (art. 31b ust. 1)
2. if Adnotacje/P_16 == "1"        -> NO CHECK POSSIBLE (cash method)   (art. 21 ust. 1)
3. taxPoint :=
     P_6A of this line             if present                           (art. 19a ust. 1/8)
     else P_6                      if present                           (art. 19a ust. 1/8)
     else P_6Z of this payment     if ZAL/partial advance               (art. 19a ust. 8)
     else OkresFa/P_6_Do           if present  [AMBIGUOUS - see 5b]     (art. 19a ust. 3/4)
     else P_1                      [inferred: art. 106e ust. 1 pkt 6]
4. reference := (P_1 < taxPoint) ? P_1 : taxPoint                       (art. 31a ust. 2 / ust. 1)
5. accepted := { lastNbpTableA(strictly before reference) }
   5a. if taxPoint < P_1: also accept lastNbpTableA(before P_1)         (art. 31a ust. 1a: art. 19a
                                                                        ust. 5 pkt 3/4, art. 20 ust. 1
                                                                        WDT, + any other regime whose
                                                                        tax point is invoice issue)
   5b. if OkresFa present: also accept lastNbpTableA(before P_1)        (art. 19a ust. 5 pkt 4)
   5c. always tolerate ECB and PIT/CIT-rule values -> soft severity only (art. 31a ust. 1 zd. 2, ust. 2a)
6. rate field to compare:
     FaWiersz/KursWaluty          per line, using P_6A/P_6
     Fa/KursWalutyZ               whole advance invoice, using P_6
     ZaliczkaCzesciowa/KursWalutyZW  per payment, using that payment's P_6Z
     KursUmowny                   NEVER                                 (FAQ MF q. 18)
7. severity: WARNING. Never ERROR.
```

---

## Gap Analysis vs. Current Implementation

Findings only — no code was changed. Each is traceable to a quote above.

| #   | Finding                                                                                                                                                                                                                                                                           | File                                                                               | Authority                                                                         |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| 1   | ~~`currency-date.ts` docstring says ust. 2 uses "the issue date (`P_1`)" — wrong in offline/offline24.~~ **WITHDRAWN 2026-08-12 — NOT A FINDING.** The docstring is **correct**: „dzień wystawienia faktury" resolves to `P_1` in every transmission mode. No change needed here. | `packages/validator/src/currency-date.ts` l. 8–10                                  | art. 106na ust. 1; art. 106nda ust. 10 i 16; art. 106nh ust. 4; art. 106nf ust. 9 |
| 2   | `currency-date.ts` does not mention art. 31a **ust. 1a** (added 1.02.2026) at all.                                                                                                                                                                                                | same                                                                               | art. 31a ust. 1a                                                                  |
| 3   | Corrective invoices are not excluded from the NBP comparison; art. 31b ust. 1 makes the check unanswerable for them.                                                                                                                                                              | `semantic.ts` `checkCurrencyRateMismatch`                                          | art. 31b ust. 1                                                                   |
| 4   | `KursWalutyZ` and `KursWalutyZW` are never compared — the check only reads `FaWiersz/KursWaluty`, and `ZAL` has no `FaWiersz`.                                                                                                                                                    | `semantic.ts` l. ~1463                                                             | Podręcznik cz. II §2.6                                                            |
| 5   | Cash-method invoices (`P_16 = "1"`) are checked as if the tax point were the delivery date.                                                                                                                                                                                       | `semantic.ts`                                                                      | art. 21 ust. 1                                                                    |
| 6   | The mismatch message asserts a single correct value; the ECB option (ust. 1 zd. 2) and the PIT/CIT election (ust. 2a) mean it is one of several lawful values.                                                                                                                    | `semantic.ts` message + `fixSuggestions` (confidence 0.95)                         | art. 31a ust. 1 zd. 2, ust. 2a                                                    |
| 7   | `rateReferenceCandidates` already widens the accepted set when `taxPoint < P_1` (correct, art. 19a ust. 5), but not when `OkresFa` is present with `P_6_Do > P_1`-style period billing.                                                                                           | `currency-date.ts` l. 69–83                                                        | XSD `OkresFa` annotation                                                          |
| 8   | **`/waluty` explainer states the wrong rule.** It says art. 31a "§1" gives the rate from the day before **the invoice date (`P_1`)**. That is art. 31a **ust. 2**, not ust. 1. ust. 1 keys on the tax point. Also: Polish statutes use „ust.", not „§".                           | `apps/web/src/app/[locale]/waluty/explainer.tsx` l. 9–13 (PL), 35–38 (EN), 61 (UK) | art. 31a ust. 1 vs ust. 2                                                         |

---

## Unsettled Questions

- ~~**Does „dzień wystawienia faktury" in art. 31a ust. 2 sentence 1 mean the KSeF submission
  day?**~~ **RESOLVED 2026-08-12 — NO.** It resolves to `P_1` in every transmission mode: art. 106na
  ust. 1 (online), art. 106nda ust. 10 (offline24), ust. 16 (online sent late), art. 106nh ust. 4
  (niedostępność), art. 106nf ust. 9 (awaria). Confirmed at Tier 1 and corroborated at Tier 2 by
  Broszura §9.2 and Podręcznik cz. II §1.4. See Answer 2.
- **What independent work does art. 31a ust. 2 zd. 2 (and ust. 1a) do?** Now that the date of issue
  is `P_1` in all modes, zd. 1 and zd. 2 point at the same NBP table: the last business day before
  `P_1`. The zd. 2 proviso — „pod warunkiem że faktura ustrukturyzowana została wystawiona nie
  później niż następnego dnia po dniu, o którym mowa w art. 106e ust. 1 pkt 1" — is either trivially
  satisfied (if „wystawiona" carries its statutory sense, i.e. the `P_1` date itself) or a
  transmission-timing condition (if it means „przesłana" in the art. 106na ust. 1 sense). MF has not
  addressed which. **No operational consequence:** under either reading both limbs yield the rate
  from the day before `P_1`, so the validator's accepted set is unchanged. Do not present zd. 2 to
  users as a distinct election that produces a different rate.
- **`OkresFa` + art. 19a ust. 5 pkt 4:** does the taxpayer use `P_6_Do` or `P_1` as the tax point?
  The XSD maps `OkresFa` to both regimes without a discriminator. Unresolved; accept both.
- **What did MF's SLIM VAT objaśnienia actually say about art. 31a ust. 2a?** Not retrievable (404).
- **Objaśnienia podatkowe 28.01.2026:** not located; may address the ust. 1a / ust. 2 zd. 2 election
  and the scope of ust. 1a. **This is the highest-value document still missing from the corpus for
  this topic.** (It is no longer needed for the offline-mode reference date — that is settled by the
  statute, see Answer 2.)
- **Rounding tolerance.** Nothing in art. 31a prescribes a precision for the rate as recorded on the
  invoice; FA(3) permits 6 decimals (`TIlosci`), NBP publishes 4 for most currencies. The validator
  compares at 4 decimals. No statutory basis for any particular tolerance was found.

---

## Unverifiable from the corpus available

Stated explicitly, per the rules of engagement:

- MF **objaśnienia podatkowe** on art. 31a (SLIM VAT package) — **not found in corpus**; the
  podatki.gov.pl URL surfaced by the site's own search index returns HTTP 404.
- Objaśnienia podatkowe z 28.01.2026 — **not found in corpus**.
- Any MF statement on which FA(3) field the art. 31a reference date should be read from — **not
  found in corpus**. The Broszura FA(3) is silent (verified by grep), the FAQ is silent (verified by
  grep), and the XSD says only „dział VI ustawy".
- Content of załącznik nr 3 poz. 24–37, 50–51 (referenced by art. 19a ust. 5 pkt 4 lit. b) — not
  re-read in this session; the parenthetical gloss in Answer 4 is marked as a researcher note.

---

## Warning: Common Misconceptions

1. **"Kurs z dnia poprzedzającego datę wystawienia faktury."** This is the widely repeated
   formulation and it is **art. 31a ust. 2 — the exception**, presented as if it were the rule. The
   rule is the tax point (ust. 1). The two coincide only when delivery and issue fall on the same
   day, which is common enough that the wrong rule usually produces the right answer — until it
   doesn't. **Our own `/waluty` page currently repeats this misconception (finding #8).**
2. **"Faktura korygująca → nowy kurs z dnia korekty."** No — art. 31b ust. 1: the rate adopted on
   the original. The fresh-rate option exists only for art. 106j ust. 3 collective discount
   corrections.
3. **"NBP Tabela A is the only lawful source."** No — art. 31a ust. 1 zd. 2 (ECB) and ust. 2a
   (PIT/CIT rules) are equally lawful elections.
4. **"`KursUmowny` is a KSeF exchange rate."** No — FAQ MF q. 18: it is a contractual rate on a PLN
   or dual-currency invoice and is expressly outside dział VI.
5. **"`TypKorekty` tells you which rate to use."** No — it selects the _settlement period_ (art. 29a
   ust. 13 vs ust. 17), not the rate.
6. **Citing "art. 31a §1".** Polish statutes are divided into `ust.` (ustęp), not `§`. `§` belongs
   to rozporządzenia and to the Kodeks cywilny/karny style. Cite as **art. 31a ust. 1**.
7. **"In offline/offline24/awaria mode the invoice is issued on the day it reaches KSeF, so `P_1`
   isn't the real date of issue."** No — exactly backwards. Art. 106nda ust. 10 and art. 106nf ust.
   9 make **`P_1` itself** the date of issue in those modes, and art. 106nda ust. 16 extends the
   same treatment to a structured invoice transmitted after `P_1`. What the transmission drives is
   the date of _receipt_ by the buyer — art. 106nda ust. 11: „Za datę otrzymania faktury… uznaje się
   datę przydzielenia numeru identyfikującego tę fakturę w Krajowym Systemie e-Faktur" — not the
   date of issue. **This brief itself asserted the misconception before 2026-08-12** — treat any of
   our derived content dated earlier as suspect.

---

## Suggested Sources Section (for any future article's „Źródła" footer)

- Ustawa z dnia 11 marca 2004 r. o podatku od towarów i usług (t.j. Dz. U. z 2025 r. poz. 775 ze
  zm.), **art. 31a** (s. 43–44), **art. 31b** (s. 44), **art. 19a** (s. 28–30), **art. 29a ust.
  13–17** (s. 41–42), **art. 20** (s. 30), **art. 106e ust. 1 pkt 1 i 6** (s. 124), **art. 106i**
  (s. 130), **art. 106j** (s. 131), **art. 106na ust. 1** (s. 133), **art. 106nf ust. 9** (s. 136) —
  https://api.sejm.gov.pl/eli/acts/DU/2025/775/text/T/D20250775L.pdf
- Ustawa z dnia 5 sierpnia 2025 r. o zmianie ustawy o podatku od towarów i usług oraz niektórych
  innych ustaw (Dz. U. z 2025 r. poz. 1203), **art. 2** — źródło **art. 106nda** (w szczególności
  ust. 10 i ust. 16, s. 5) oraz nowego brzmienia **art. 106nh ust. 1, 2 i 4** (s. 6); wejście w
  życie 1.02.2026. Te przepisy **nie występują** w tekście jednolitym Dz. U. 2025 poz. 775 —
  https://api.sejm.gov.pl/eli/acts/DU/2025/1203
- Broszura informacyjna FA(3) (MF, marzec 2026), **§9.2 „P_1 — Date of Issue Rules"** —
  `packages/validator/docs/fa3-information-sheet.md`
- Podręcznik KSeF 2.0 cz. II, **§1.4** (data wystawienia, przykłady 1–3) i **§1.6.1** (przesłanki
  odrzucenia pliku) — `docs/knowledge-base/briefs/podrecznik-ksef-20-czesc-ii.md`
- Ustawa z dnia 16 czerwca 2023 r. o zmianie ustawy o podatku od towarów i usług oraz niektórych
  innych ustaw (Dz. U. poz. 1598 ze zm.) — źródło obecnego brzmienia art. 31a ust. 1a i ust. 2
  (wejście w życie 1.02.2026)
- Struktura logiczna FA(3), `schemat.xsd`, przestrzeń nazw
  `http://crd.gov.pl/wzor/2025/06/25/13775/` — dokumentacja pól `KursWaluty`, `KursWalutyZ`,
  `KursWalutyZW`, `KursWalutyZK`, `P_1`, `P_6`, `P_6A`, `OkresFa`, `P_6Z`
- Pytania i odpowiedzi KSeF 2.0, MF — pytania 18 i 19 (pola `KursUmowny`/`WalutaUmowna` vs
  `KursWaluty`/`KursWalutyZ`) — https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20
- Narodowy Bank Polski, Tabela A kursów średnich — https://api.nbp.pl/

---

## Freshness Markers

| Claim                                                                                         | Review trigger                                                                                    |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| art. 31a ust. 1a and the current ust. 2 are in force                                          | In force since 1.02.2026 — stable, but re-check if a new tekst jednolity of the VAT Act is issued |
| No post-consolidation act amends art. 19a / 31a / 31b                                         | Re-run the ELI amendment scan whenever `Nowelizacje po tekście jednolitym` for DU/2025/775 grows  |
| Art. 31b ust. 1 „kurs przyjęty przed zmianą"                                                  | Watch for SLIM VAT-style packages; this article is young (SLIM VAT 3 era)                         |
| Objaśnienia podatkowe 28.01.2026 not yet in corpus                                            | **Action item** — locate and extract; may settle the art. 31a ust. 2 zd. 2 proviso question       |
| art. 106nda i art. 106nh ust. 4 come from Dz. U. 2025 poz. 1203, not from the tekst jednolity | Re-check when the next tekst jednolity of the VAT Act consolidates the art. 106n\* block          |
| MF SLIM VAT objaśnienia URL returns 404                                                       | Retry; MF rotates URLs on podatki.gov.pl                                                          |
| `/waluty` explainer states the ust. 2 rule as if it were ust. 1                               | **Action item** — route a correction through the Copywriter                                       |
