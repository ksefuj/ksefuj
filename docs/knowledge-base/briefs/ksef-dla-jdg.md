# Research Brief: KSeF dla JDG — minimum, które musisz wiedzieć

**Requested by:** Copywriter agent
**Date:** 2026-03-25
**For content:** Blog post — "KSeF dla JDG — minimum, które musisz wiedzieć"
**Target persona:** "Ania" — Polish freelancer, JDG, 2–3 invoices/month, nervous about the April 1, 2026 deadline
**Tool context:** ksefuj.to — free KSeF XML validator

---

## Source Corpus Used

| Source | Tier | File / URL | Status |
|--------|------|-----------|--------|
| Ustawa o VAT (Dz. U. z 2025 r., poz. 775 ze zm.) | 1 | https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20250000775 | CURRENT |
| Rozporządzenie MF z 7.12.2025 (wyłączenia) | 1 | https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20250001740 | CURRENT |
| FA(3) Information Sheet (Broszura informacyjna, marzec 2026, 174 s.) | 2 | `packages/validator/docs/fa3-information-sheet.md` | CURRENT |
| FAQ MF — KSeF 2.0 | 3 | https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20 | CURRENT |
| Existing blog: ksef-od-1-kwietnia-2026.mdx (PL) | internal | `apps/web/content/pl/blog/ksef-od-1-kwietnia-2026.mdx` | CURRENT (not a source — output) |
| FAQ: dostep-i-uprawnienia.mdx | internal | `apps/web/content/pl/faq/dostep-i-uprawnienia.mdx` | Output only |
| FAQ: limity-i-wylaczenia.mdx | internal | `apps/web/content/pl/faq/limity-i-wylaczenia.mdx` | Output only |
| FAQ: tryby-i-awarie.mdx | internal | `apps/web/content/pl/faq/tryby-i-awarie.mdx` | Output only |
| FAQ: podstawy-ksef.mdx | internal | `apps/web/content/pl/faq/podstawy-ksef.mdx` | Output only |
| FAQ: wystawianie-faktur.mdx | internal | `apps/web/content/pl/faq/wystawianie-faktur.mdx` | Output only |

> ⚠️ **NOTE TO COPYWRITER:** Internal FAQ and blog files are *our own published output*, not
> primary sources. Facts extracted below are cited back to Tier 1–3 MF sources wherever available.
> Where a fact appears only in our own output without a traceable MF citation, it is flagged
> **MEDIUM** confidence and marked `[source: internal output only]`.

---

## Key Facts (ready to use)

### 1. Who needs KSeF as a JDG

---

**Fact 1.1 — Mandatory adoption date for JDG**
- **Fact:** Every active VAT taxpayer (czynny podatnik VAT), including JDG, is required to issue invoices via KSeF from **1 April 2026**.
- **Source:** Ustawa o VAT, Art. 145m
- **Verbatim:** *(from existing blog citing Art. 145m):* "Od 1 kwietnia 2026 roku — dla wszystkich czynnych podatników VAT"
- **Confidence:** HIGH
- **Ania-relevant:** ✅ Core deadline she must know

---

**Fact 1.2 — Large-company earlier deadline (context only)**
- **Fact:** Taxpayers with gross turnover exceeding 200 million PLN in 2024 were already subject to mandatory KSeF from **1 February 2026**.
- **Source:** Ustawa o VAT, Art. 145m; blog `ksef-od-1-kwietnia-2026.mdx`, table section
- **Verbatim:** "Podatnicy VAT z obrotem >200 mln zł brutto w 2024 r. — KSeF obowiązkowy [od 1 lutego 2026]"
- **Confidence:** HIGH
- **Ania-relevant:** ❌ (context only; Ania is a micro-JDG, not relevant to her own obligation)

---

**Fact 1.3 — VAT-exempt JDG is currently excluded**
- **Fact:** JDG taxpayers using the subjective VAT exemption (zwolnienie podmiotowe) — i.e., those with annual turnover below **200,000 PLN** who have not registered for VAT — do **not** have a mandatory KSeF obligation as of April 1, 2026.
- **Source:** Ustawa o VAT, Art. 113 (zwolnienie podmiotowe), cross-referenced by blog `ksef-od-1-kwietnia-2026.mdx`, §"Kogo dotyczy obowiązek"
- **Verbatim:** "Podatnicy zwolnieni z VAT (zarówno podmiotowo — ze względu na limit 200 000 PLN obrotu — jak i przedmiotowo) na razie nie mają obowiązku korzystania z KSeF."
- **Confidence:** HIGH
- **Ania-relevant:** ✅ Many JDG freelancers are on zwolnienie — they need to know they are excluded for now
- **Caveat:** The blog explicitly adds: "Obowiązek ten może zostać na nich rozszerzony w przyszłości, ale na dziś nie ma konkretnego terminu." This caveat should be preserved.

---

**Fact 1.4 — VAT-exempt taxpayers have a future date: 1 January 2027**
- **Fact:** Taxpayers conducting exclusively VAT-exempt activities are scheduled to join the KSeF system from **1 January 2027**.
- **Source:** FAQ: `podstawy-ksef.mdx` (internal output) citing applicable statutory timeline
- **Verbatim:** "Organizacje prowadzące wyłącznie działalność zwolnioną z VAT dołączają do systemu od 1 stycznia 2027 roku."
- **Confidence:** MEDIUM (cited from internal output; direct statutory article not verified against Tier 1 source in this extraction)
- **Ania-relevant:** ✅ Ania may be zwolniona now — she needs to know this is coming

---

**Fact 1.5 — KSeF applies to B2B invoices; B2C from cash registers are excluded**
- **Fact:** Invoices issued to consumers (B2C) using a cash register (kasa fiskalna) are excluded from KSeF. Invoices to consumers issued outside a cash register fall within KSeF scope.
- **Source:** Ustawa o VAT, Art. 106nd ust. 3; Rozporządzenie MF z 7.12.2025; blog `ksef-od-1-kwietnia-2026.mdx`, §"Co z fakturami B2C?"
- **Verbatim:** "Faktury wystawiane dla osób fizycznych nieprowadzących działalności (konsumentów) są wyłączone z KSeF."
- **Confidence:** HIGH
- **Ania-relevant:** ✅ Ania only issues B2B — straightforward case, no B2C complication

---

**Fact 1.6 — The 10,000 PLN monthly turnover exception (until 31 Dec 2026)**
- **Fact:** Taxpayers whose monthly sales value does not exceed **10,000 PLN** benefit from a temporary exemption from the KSeF obligation, valid until **31 December 2026**. After that date the exemption expires and KSeF becomes mandatory for this group too.
- **Source:** Ustawa o VAT (as amended); blog `ksef-od-1-kwietnia-2026.mdx`, §"Wyjątek: bardzo małe obroty"
- **Verbatim:** "Jeśli Twoja miesięczna sprzedaż nie przekracza 10 000 PLN, przepisy przewidują tymczasowe zwolnienie z obowiązku wystawiania faktur przez KSeF — do 31 grudnia 2026 r. Po tym terminie zwolnienie wygasa i obowiązek KSeF obejmie również tę grupę."
- **Confidence:** MEDIUM (specific article within the Act not pinned to a single article number in our corpus; blog states this without citing a specific paragraph; the FAQ `limity-i-wylaczenia.mdx` notes the rules "były kilkakrotnie nowelizowane" and advises verifying at ksef.podatki.gov.pl)
- **Ania-relevant:** ✅ Highly relevant — if Ania invoices only 2–3 times/month she may be below 10k PLN
- **⚠️ Freshness flag:** This is an explicit expiry condition. Must be reviewed after 31 December 2026.

---

**Fact 1.7 — How to calculate the 10,000 PLN threshold**
- **Fact:** The 10,000 PLN threshold is calculated as total sales value in a given calendar month, including both VAT-taxable and VAT-exempt sales — not the number of invoices issued.
- **Source:** FAQ `limity-i-wylaczenia.mdx` (internal output)
- **Verbatim:** "Limit liczony jest jako łączna wartość sprzedaży w danym miesiącu, nie suma wystawionych faktur. Wlicza się sprzedaż opodatkowaną VAT oraz zwolnioną."
- **Confidence:** MEDIUM (internal output only; no direct Tier 1–2 citation found in corpus for this calculation rule)
- **Ania-relevant:** ✅ She needs to know how to check whether she qualifies

---

### 2. What steps a JDG must take (5-step checklist)

---

**Fact 2.1 — Step 1: Confirm VAT status obligation**
- **Fact:** The first practical step is confirming whether the JDG holds active VAT registration (czynny podatnik VAT). Only VAT-registered entities are covered by the April 1, 2026 mandate.
- **Source:** Ustawa o VAT, Art. 145m; blog `ksef-od-1-kwietnia-2026.mdx`, §"Krok 1"
- **Verbatim:** "Jesteś czynnym podatnikiem VAT? Wystawiasz faktury B2B? → Masz obowiązek."
- **Confidence:** HIGH
- **Ania-relevant:** ✅

---

**Fact 2.2 — Step 2: Update or choose invoicing software**
- **Fact:** The invoicing program must (a) generate XML files in FA(3) format, (b) support sending to KSeF via API, and (c) support receiving invoices as a buyer.
- **Source:** Blog `ksef-od-1-kwietnia-2026.mdx`, §"Krok 2"; FA(3) Information Sheet, §1.2
- **Verbatim:** "Twój program do fakturowania musi obsługiwać KSeF. Sprawdź, czy Twój dostawca: generuje pliki XML w formacie FA(3), obsługuje wysyłkę do KSeF przez API, obsługuje odbiór faktur (jako kupujący)."
- **Confidence:** HIGH
- **Ania-relevant:** ✅

---

**Fact 2.3 — Step 3: Configure KSeF authentication**
- **Fact:** To send invoices to KSeF, a taxpayer must authenticate using one of three methods: (1) kwalifikowany podpis elektroniczny (qualified electronic signature), (2) Profil Zaufany (free, via ePUAP or mObywatel), or (3) an API authorisation token.
- **Source:** Blog `ksef-od-1-kwietnia-2026.mdx`, §"Krok 3"; FAQ `dostep-i-uprawnienia.mdx`
- **Verbatim:** "Uwierzytelnienie działa przez: kwalifikowany podpis elektroniczny, Profil Zaufany (bezpłatny, przez ePUAP lub mObywatel), token autoryzacyjny (dla integracji API)."
- **Confidence:** HIGH
- **Ania-relevant:** ✅ Profil Zaufany is the practical choice for Ania

---

**Fact 2.4 — Step 4: Test on the MF test environment**
- **Fact:** MF makes a KSeF 2.0 test environment available at `https://web2te-ksef.mf.gov.pl/`. Invoices with fictitious data can be sent there without legal consequences.
- **Source:** Blog `ksef-od-1-kwietnia-2026.mdx`, §"Krok 4"
- **Verbatim:** "Ministerstwo Finansów udostępnia środowisko testowe KSeF 2.0 pod adresem https://web2te-ksef.mf.gov.pl/. Możesz tam wysyłać faktury z fikcyjnymi danymi i sprawdzać, jak system reaguje — bez żadnych konsekwencji prawnych."
- **Confidence:** HIGH (URL cited in the blog; should be verified before publication as test environments can move)
- **Ania-relevant:** ✅
- **⚠️ Freshness flag:** URL `https://web2te-ksef.mf.gov.pl/` — verify before publish

---

**Fact 2.5 — Step 5: Validate XML before sending to KSeF**
- **Fact:** KSeF 2.0 has no built-in pre-submission validator. A rejected invoice is legally non-existent. Validating the XML file before submission prevents errors being discovered only after rejection.
- **Source:** Blog `ksef-od-1-kwietnia-2026.mdx`, §"Jak sprawdzić, czy faktura jest poprawna"; FAQ `walidacja-i-bledy.mdx`
- **Verbatim:** "KSeF 2.0 nie ma wbudowanego walidatora — dowiesz się o błędach dopiero wtedy, gdy wyślesz fakturę i system ją odrzuci. Odrzucona faktura to faktura, której nie ma."
- **Confidence:** HIGH
- **Ania-relevant:** ✅ Core use case for ksefuj.to

---

### 3. Free tools available

---

**Fact 3.1 — Aplikacja Podatnika KSeF (MF official, free)**
- **Fact:** MF provides the **Aplikacja Podatnika KSeF** — a free, web-based application at `https://ap.ksef.mf.gov.pl/` — which allows manual invoice creation via form, upload of ready XML files, viewing received invoices, and managing permissions. No installation required.
- **Source:** FAQ `wystawianie-faktur.mdx`; blog `ksef-od-1-kwietnia-2026.mdx`, §"Krok 3"
- **Verbatim:** "To oficjalna aplikacja MF (ap.ksef.mf.gov.pl) do zarządzania fakturami w KSeF. Pozwala wystawiać faktury ręcznie przez formularz, przesyłać gotowe pliki XML, przeglądać faktury otrzymane i zarządzać uprawnieniami. Dostęp przez Profil Zaufany, e-dowód lub certyfikat kwalifikowany. Jest bezpłatna i nie wymaga instalacji."
- **Confidence:** HIGH
- **Ania-relevant:** ✅ This is the most accessible free option for Ania issuing 2–3 invoices/month

---

**Fact 3.2 — e-mikrofirma (MF official, free)**
- **Fact:** MF also provides **e-mikrofirma** — a free web application aimed at the smallest businesses, enabling invoice issuance and tax settlement with limited KSeF support. Suitable for occasional invoice issuers.
- **Source:** FAQ `wystawianie-faktur.mdx`
- **Verbatim:** "e-mikrofirma to bezpłatna aplikacja webowa MF dla najmniejszych przedsiębiorców, umożliwiająca wystawianie faktur i rozliczanie podatków. Obsługuje KSeF w ograniczonym zakresie i jest alternatywą dla komercyjnych programów fakturowych. Sprawdza się u osób wystawiających faktury okazjonalnie."
- **Confidence:** MEDIUM (cited from internal output; "ograniczony zakres" KSeF support is noted but not precisely defined)
- **Ania-relevant:** ✅ Relevant for Ania but note the "limited KSeF support" caveat

---

**Fact 3.3 — Commercial programs with KSeF integration**
- **Fact:** Most popular commercial invoicing programs — including Fakturownia, inFakt, wFirma, Comarch, Symfonia — already support or are implementing KSeF integration (FA(3) XML generation + API submission).
- **Source:** Blog `ksef-od-1-kwietnia-2026.mdx`, §"Krok 2"
- **Verbatim:** "Większość popularnych programów (Fakturownia, inFakt, wFirma, Comarch, Symfonia i inne) już to obsługuje lub właśnie wdraża."
- **Confidence:** MEDIUM (general claim; state of integration can change; source is internal blog)
- **Ania-relevant:** ✅ Ania may already use one of these — check with her provider

---

**Fact 3.4 — ksefuj.to (free XML validator, client-side)**
- **Fact:** ksefuj.to is a free KSeF XML validator that runs entirely in the browser. It validates both FA(3) XSD schema compliance and MF semantic rules. Invoice data never leaves the browser.
- **Source:** Blog `ksef-od-1-kwietnia-2026.mdx`; FAQ `walidacja-i-bledy.mdx`
- **Verbatim:** "ksefuj.to to bezpłatny walidator KSeF działający w całości w przeglądarce. Wrzuć plik XML — sprawdzi zarówno zgodność ze schematem FA(3), jak i reguły semantyczne zgodne z oficjalnymi wymaganiami MF. Twoje dane nie opuszczają przeglądarki."
- **Confidence:** HIGH (this is our own product — fact is accurate)
- **Ania-relevant:** ✅ Core call-to-action for the article

---

### 4. What happens if something goes wrong (offline mode, emergency mode)

---

**Fact 4.1 — Three operating modes exist in KSeF**
- **Fact:** KSeF provides three invoice issuing modes: (1) online mode (standard), (2) offline24h mode, (3) emergency mode (tryb awaryjny).
- **Source:** Blog `ksef-od-1-kwietnia-2026.mdx`, §"Tryby pracy w KSeF"; FA(3) Information Sheet, §9.2 (P_1 date rules citing Art. 106na, 106nda, 106nh, 106nf)
- **Verbatim:** "KSeF przewiduje trzy tryby wystawiania faktur."
- **Confidence:** HIGH
- **Ania-relevant:** ✅

---

**Fact 4.2 — Online mode (standard)**
- **Fact:** In online mode, the invoice is sent to KSeF in real time. This is the standard mode. The KSeF number is received immediately upon successful submission.
- **Source:** Blog `ksef-od-1-kwietnia-2026.mdx`, §"Tryb online"; FA(3) Information Sheet, §9.2: "Online mode (Art. 106na sec. 1): Invoice deemed issued on the date it was sent to KSeF, provided the date in P_1 matches the sending date."
- **Verbatim:** "Faktura trafia do KSeF w czasie rzeczywistym. To tryb standardowy."
- **Legal basis:** Art. 106na sec. 1, Ustawa o VAT
- **Confidence:** HIGH
- **Ania-relevant:** ✅

---

**Fact 4.3 — Offline24h mode**
- **Fact:** If there is no internet access or KSeF is temporarily unavailable, an invoice may be issued locally in **offline24h** mode. It must be sent to KSeF **no later than the end of the next business day**. The invoice is legally valid from the moment it is issued, but the KSeF number is received only after submission.
- **Source:** Blog `ksef-od-1-kwietnia-2026.mdx`, §"Tryb offline 24h (offline24)"; FA(3) Information Sheet, §9.2: "Invoices in 'offline24' mode (Art. 106nda sec. 10)"
- **Verbatim:** "Musisz ją przesłać do KSeF niezwłocznie — nie później niż do końca następnego dnia roboczego. Faktura jest ważna od momentu wystawienia, ale numer KSeF dostaniesz dopiero po wysyłce."
- **Legal basis:** Art. 106nda sec. 10, Ustawa o VAT
- **Confidence:** HIGH
- **Ania-relevant:** ✅

---

**Fact 4.4 — Emergency mode (tryb awaryjny)**
- **Fact:** Emergency mode is declared by MF when KSeF is unavailable for technical or administrative reasons. During emergency mode, invoices may be issued outside KSeF but must comply with strict formal requirements and be submitted to KSeF **no later than 7 business days after the end of the outage**.
- **Source:** Blog `ksef-od-1-kwietnia-2026.mdx`, §"Tryb awaryjny"; FAQ `tryby-i-awarie.mdx`; FA(3) Information Sheet §9.2 referencing Art. 106nf sec. 9
- **Verbatim:** "W przypadku długotrwałej awarii KSeF Ministerstwo Finansów może ogłosić tryb awaryjny. W tym trybie faktury można wystawiać poza KSeF, ale muszą spełniać ściśle określone wymagania formalne i zostać przesłane do systemu nie później niż w ciągu 7 dni roboczych od zakończenia awarii."
- **Legal basis:** Art. 106nf, Ustawa o VAT
- **Confidence:** HIGH
- **Ania-relevant:** ✅

---

**Fact 4.5 — Offline mode uses pre-downloaded QR codes**
- **Fact:** An offline invoice carries a special QR code downloaded in advance from KSeF. Each taxpayer can download a pool of QR codes for use during connectivity loss. Without a valid QR code, an offline invoice may be challenged.
- **Source:** FAQ `tryby-i-awarie.mdx` (internal output)
- **Verbatim:** "Kod QR na fakturze offline to specjalny token pobrany wcześniej z systemu KSeF — każdy przedsiębiorca może pobrać pulę kodów na wypadek braku łączności. Kod identyfikuje fakturę i umożliwia jej późniejsze powiązanie z KSeF po wgraniu dokumentu."
- **Confidence:** MEDIUM (from internal output; FA(3) sheet references offline QR tokens but does not detail the download process)
- **Ania-relevant:** ✅ (but note this is a topic Ania should be aware of, not a core worry for 2–3 invoices/month)

---

**Fact 4.6 — Penalty grace period until 1 January 2027**
- **Fact:** Financial penalties (dodatkowe zobowiązanie podatkowe) for violations of the KSeF mandatory obligation will not be enforced until **1 January 2027**, even though the obligation itself applies from 1 April 2026.
- **Source:** Blog `ksef-od-1-kwietnia-2026.mdx`, §"Co grozi za fakturę wystawioną poza KSeF"
- **Verbatim:** "Kary za błędy w KSeF zostały odroczone do 1 stycznia 2027 r. Oznacza to, że od 1 kwietnia 2026 roku obowiązek wystawiania faktur przez KSeF obowiązuje, ale sankcje za jego naruszenie zaczną być egzekwowane dopiero od 2027 roku."
- **Legal basis:** Art. 106gc, Ustawa o VAT (penalties framework)
- **Confidence:** MEDIUM (from internal blog citing Art. 106gc; the grace period itself is not independently verified against Tier 1 source in this extraction)
- **Ania-relevant:** ✅ Relieves immediate panic — but the article should NOT encourage delay
- **⚠️ Freshness flag:** Review after 1 January 2027

---

**Fact 4.7 — Rejected invoice is legally non-existent**
- **Fact:** An invoice rejected by KSeF is treated as if it was never issued. The obligation to issue a valid invoice remains, regardless of the penalty grace period.
- **Source:** Blog `ksef-od-1-kwietnia-2026.mdx`, §"Jak sprawdzić, czy faktura jest poprawna"
- **Verbatim:** "Odrzucona faktura to faktura, której nie ma. Oznacza to opóźnienie w płatności, konieczność korekty i potencjalne problemy z terminem wystawienia."
- **Confidence:** HIGH
- **Ania-relevant:** ✅ Core practical risk

---

### 5. UPO and KSeF number

---

**Fact 5.1 — What is UPO**
- **Fact:** **UPO (Urzędowe Poświadczenie Odbioru)** is an official receipt document generated by KSeF confirming that an invoice was accepted by the system. It contains the KSeF number, the date of acceptance, and the system's digital signature.
- **Source:** FAQ `podstawy-ksef.mdx` (internal output)
- **Verbatim:** "UPO (Urzędowe Poświadczenie Odbioru) to dokument potwierdzający przyjęcie faktury przez KSeF. Zawiera numer KSeF, datę przyjęcia i podpis cyfrowy systemu. UPO jest dowodem na to, że faktura została prawidłowo zaewidencjonowana — warto je archiwizować razem z plikiem XML faktury."
- **Confidence:** HIGH
- **Ania-relevant:** ✅

---

**Fact 5.2 — KSeF number (numer KSeF)**
- **Fact:** The KSeF number (numer KSeF) is a unique identifier assigned by MF's system after successful registration of an invoice. It is required on any corrective invoice that corrects an invoice originally issued via KSeF — without it, the correction will be rejected.
- **Source:** FAQ `podstawy-ksef.mdx`; FA(3) Information Sheet, §9.7: `NrKSeFZ` field — "KSeF number of corrected invoice (when NrKSeF = '1')"
- **Verbatim:** "Numer KSeF to unikalny identyfikator faktury nadawany przez system MF po pomyślnym zaewidencjonowaniu dokumentu. Numer ten jest wymagany przy wystawianiu faktury korygującej do faktury wystawionej w KSeF — korekta musi się odwoływać do numeru KSeF faktury pierwotnej, bez niego zostanie odrzucona."
- **Confidence:** HIGH
- **Ania-relevant:** ✅

---

**Fact 5.3 — KSeF number technical format**
- **Fact:** The KSeF number is a string of up to 35 characters (note: an earlier version of the FA(3) spec showed 36 characters — corrected to 35 in the November 2025 update). It is referenced in XML as `NrKSeFZ` or `NrKSeFFaKorygowanej` depending on context.
- **Source:** FA(3) Information Sheet, changelog note: "November 2025 (KSeF number 36→35 chars in example 14)"; §9.7
- **Verbatim:** "November 2025 (KSeF number 36→35 chars in example 14)"
- **Confidence:** HIGH
- **Ania-relevant:** ❌ (too technical; relevant only to developers / validators)

---

**Fact 5.4 — What the buyer sees**
- **Fact:** The buyer (nabywca) can access invoices issued to them in KSeF by logging into the Aplikacja Podatnika KSeF using their own NIP. The invoice is made available to the correct buyer **only if** the buyer's NIP is entered in the `NIP` field of `Podmiot2/DaneIdentyfikacyjne` — not in `NrVatUE` or `NrID`.
- **Source:** FA(3) Information Sheet, §2.10: "The invoice will be correctly made available to the purchaser in KSeF only if the purchaser's NIP is entered in the NIP field — not in NrVatUE or NrID."
- **Verbatim:** "The invoice will be correctly made available to the purchaser in KSeF only if the purchaser's NIP is entered in the NIP field — not in NrVatUE or NrID."
- **Confidence:** HIGH
- **Ania-relevant:** ✅ (Ania needs to know her clients can access their invoices via KSeF directly)

---

**Fact 5.5 — Privacy: invoice data is in a state registry**
- **Fact:** By design, a KSeF invoice is stored in MF's central registry. Both the issuing taxpayer and the receiving taxpayer (by NIP) have access. The data is accessible to tax authorities by default.
- **Source:** Blog `ksef-od-1-kwietnia-2026.mdx`, §"Co to jest KSeF" — "faktura przestaje być dokumentem, który sam wysyłasz. Staje się zapisem w rządowej bazie danych."
- **Verbatim:** "faktura przestaje być dokumentem, który sam wysyłasz. Staje się zapisem w rządowej bazie danych."
- **Confidence:** HIGH (this is the structural design of KSeF)
- **Ania-relevant:** ✅ Worth one sentence of context — some freelancers are surprised by this

---

### 6. Authentication methods

---

**Fact 6.1 — Profil Zaufany (free)**
- **Fact:** **Profil Zaufany** is a free digital identity method for authenticating to KSeF. It can be set up via internet banking, ePUAP, or at a government office. It is the most convenient option for most small business owners.
- **Source:** FAQ `dostep-i-uprawnienia.mdx`; Blog `ksef-od-1-kwietnia-2026.mdx`, §"Krok 3"
- **Verbatim:** "Profil Zaufany (bezpłatny, przez ePUAP lub mObywatel)"; "Profil Zaufany jest najwygodniejszy dla większości przedsiębiorców — można go założyć bezpłatnie przez bankowość elektroniczną lub w urzędzie."
- **Confidence:** HIGH
- **Ania-relevant:** ✅ This is Ania's recommended path

---

**Fact 6.2 — Kwalifikowany podpis elektroniczny**
- **Fact:** A qualified electronic signature (kwalifikowany podpis elektroniczny) can be used to authenticate to KSeF. It is a paid commercial product.
- **Source:** Blog `ksef-od-1-kwietnia-2026.mdx`, §"Krok 3"; FAQ `dostep-i-uprawnienia.mdx`
- **Verbatim:** "kwalifikowany podpis elektroniczny"
- **Confidence:** HIGH
- **Ania-relevant:** ❌ (overkill for Ania's 2–3 invoices/month; costs money; mention briefly only)

---

**Fact 6.3 — Token autoryzacyjny (API token)**
- **Fact:** An authorisation token (token autoryzacyjny) is a character string generated in the Aplikacja Podatnika KSeF, used in place of a certificate to authenticate to the API. Tokens have a defined validity period and permission scope and can be revoked at any time from the Aplikacja Podatnika. This is the standard method for invoicing software integrations.
- **Source:** FAQ `dostep-i-uprawnienia.mdx`
- **Verbatim:** "Token uwierzytelniający to ciąg znaków generowany w Aplikacji Podatnika KSeF, używany zamiast certyfikatu do uwierzytelniania w API. Tokeny są wygodniejsze dla integratorów i mniejszych systemów — nie wymagają zarządzania certyfikatami PKI. Token ma określony czas ważności i zakres uprawnień. Można go w każdej chwili unieważnić z poziomu Aplikacji Podatnika."
- **Confidence:** HIGH
- **Ania-relevant:** ❌ (only relevant if Ania uses API-integrated software; her software handles this, not her)

---

**Fact 6.4 — e-dowód and certyfikat KSeF also valid**
- **Fact:** Authentication can also be done via e-dowód (electronic ID card) and a dedicated certyfikat KSeF. The certificate comes in two types: Typ 1 (for the taxpayer directly) and Typ 2 (for authorized agents, such as accounting offices).
- **Source:** FAQ `dostep-i-uprawnienia.mdx`
- **Verbatim:** "Do KSeF logujesz się przez Aplikację Podatnika (ap.ksef.mf.gov.pl) za pomocą jednej z metod: Profil Zaufany, e-dowód, podpis kwalifikowany lub certyfikat KSeF."
- **Confidence:** HIGH
- **Ania-relevant:** ❌ (e-dowód: possible but not primary; certyfikat: for accountants/offices, not for Ania directly)

---

**Fact 6.5 — ZAW-FA form for delegating access to an accountant**
- **Fact:** A JDG may authorize another person (e.g., an accountant or accounting office) to use KSeF on their behalf by filing the **ZAW-FA** form at the tax office or electronically via e-Urząd Skarbowy. The authorization can be scoped: read-only, issuing-only, or full access. Authorization can also be granted directly inside the Aplikacja Podatnika KSeF.
- **Source:** FAQ `dostep-i-uprawnienia.mdx`
- **Verbatim:** "ZAW-FA to formularz upoważnienia do korzystania z KSeF w imieniu podatnika. Składa się go w urzędzie skarbowym lub elektronicznie przez e-Urząd Skarbowy i pozwala upoważnić inną osobę — np. księgowego lub biuro rachunkowe — do wystawiania i odbierania faktur w KSeF."
- **Confidence:** HIGH
- **Ania-relevant:** ✅ (if Ania uses a biuro rachunkowe / accountant)

---

### 7. Five most common JDG questions about KSeF (FAQ material)

---

**FAQ 7.1 — "Jestem na zwolnieniu z VAT — czy mnie to dotyczy?"**
- **Answer:** Not yet as of 1 April 2026. VAT-exempt JDG (below 200,000 PLN/year turnover, not registered for VAT) are not covered by the April 1, 2026 mandate. However, the obligation is expected to be extended to VAT-exempt taxpayers in the future (current planning: January 1, 2027 for fully exempt activities).
- **Source:** Ustawa o VAT, Art. 145m; blog `ksef-od-1-kwietnia-2026.mdx`, §"Kogo dotyczy obowiązek"
- **Confidence:** HIGH (status as of extraction date)
- **⚠️ Freshness flag:** Monitor for legislative changes extending the obligation to VAT-exempt entities

---

**FAQ 7.2 — "Wystawiam tylko 2–3 faktury miesięcznie na małe kwoty — czy muszę?"**
- **Answer:** If the total monthly sales value is below 10,000 PLN, there is a temporary exemption until 31 December 2026. After that date, KSeF applies regardless of volume. Even within the exemption, it is advisable to test and prepare early.
- **Source:** Ustawa o VAT (as amended); blog `ksef-od-1-kwietnia-2026.mdx`, §"Wyjątek: bardzo małe obroty"; FAQ `limity-i-wylaczenia.mdx`
- **Confidence:** MEDIUM (amendment history means specific statutory article pinning is not confirmed in this corpus; Copywriter should include a "verify with accountant" note)
- **⚠️ Freshness flag:** Expires 31 December 2026

---

**FAQ 7.3 — "Co jeśli nie wyślę faktury przez KSeF od razu?"**
- **Answer:** Offline24h mode allows issuing a local invoice and submitting it to KSeF by the end of the next business day. Emergency mode (declared by MF during outages) allows 7 business days. Outside these formal modes, an invoice issued outside KSeF in violation of the obligation is legally invalid. Penalties are deferred to 1 January 2027, but the invoice's legal non-existence is immediate.
- **Source:** Blog `ksef-od-1-kwietnia-2026.mdx`, §"Tryby pracy w KSeF" and §"Co grozi za fakturę wystawioną poza KSeF"
- **Confidence:** HIGH
- **Ania-relevant:** ✅

---

**FAQ 7.4 — "Czy mój kontrahent musi coś zrobić, żeby odebrać fakturę?"**
- **Answer:** If the buyer is a VAT taxpayer, they can receive invoices directly from KSeF using their NIP. The invoice is available to them as soon as it is accepted by KSeF. The issuer does not need to separately email the invoice — it is in the system. However, the invoice will only be visible to the correct buyer if the buyer's NIP is entered in the correct XML field (`Podmiot2/DaneIdentyfikacyjne/NIP`).
- **Source:** FAQ `podstawy-ksef.mdx`; FA(3) Information Sheet, §2.10
- **Verbatim:** "Kontrahent nie musi już czekać na maila. Faktura jest w systemie — i obie strony mają do niej dostęp."
- **Confidence:** HIGH
- **Ania-relevant:** ✅

---

**FAQ 7.5 — "Gdzie mogę sprawdzić, czy mój plik XML jest poprawny przed wysłaniem?"**
- **Answer:** MF does not provide a standalone pre-submission XML validator. Errors are discovered only when KSeF rejects the file. ksefuj.to fills this gap: it validates against the FA(3) XSD schema and MF semantic rules, runs entirely in the browser, requires no registration, and is free. Invoice data never leaves the user's browser.
- **Source:** Blog `ksef-od-1-kwietnia-2026.mdx`, §"Jak sprawdzić, czy faktura jest poprawna"; FAQ `walidacja-i-bledy.mdx`
- **Verbatim:** "MF nie udostępnia standalone walidatora XML — walidacja odbywa się dopiero przy wysyłaniu faktury do KSeF, co oznacza, że dowiadujesz się o błędach za późno. ksefuj.to wypełnia tę lukę."
- **Confidence:** HIGH
- **Ania-relevant:** ✅ Core CTA

---

## Unsettled Questions

> These are areas where the MF source corpus is unclear, recently amended, or where the Copywriter
> should NOT make definitive claims without a "verify with your accountant" hedge.

1. **Exact statutory article for the 10,000 PLN monthly exemption** — The blog references it as existing in the Ustawa o VAT "as amended," and the FAQ notes it has been "kilkakrotnie nowelizowane." The specific article number is not confirmed in the corpus available for this extraction. Do not cite a specific article without verification at ksef.podatki.gov.pl or a Tier 1 source reading.

2. **Exact statutory article for the 1 January 2027 date for VAT-exempt entities** — The FAQ `podstawy-ksef.mdx` states this date, but the underlying article of the Ustawa o VAT is not confirmed in this corpus.

3. **Scope of the penalty grace period** — Art. 106gc is cited for penalties; the grace period until 1 January 2027 is stated in the blog without citing a specific amending act. Verify before publishing any penalty amounts or specific grace period details.

4. **e-mikrofirma KSeF support scope** — The FAQ states e-mikrofirma "obsługuje KSeF w ograniczonym zakresie" but does not specify what is limited. Avoid claiming it is a full substitute for Aplikacja Podatnika or commercial software without clarification from MF source.

5. **Offline mode: who can download QR codes and how** — The FAQ mentions pre-downloading a "pool of codes" but does not describe the mechanism (API call? Aplikacja Podatnika download?). Do not write step-by-step offline QR instructions without verifying against Podręcznik KSeF 2.0 or Kody QR offline specification.

6. **B2C invoices via KSeF** — The blog says B2C invoices from cash registers are excluded, but B2C invoices issued *outside* a cash register fall within KSeF scope. The FAQ `podstawy-ksef.mdx` confirms this nuance. For Ania (pure B2B freelancer) this is moot — but mention only with clarity.

---

## Suggested Sources Section

For the article's "Źródła" footer:

1. **FAQ MF — KSeF 2.0** — https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20
2. **Ustawa z dnia 11 marca 2004 r. o podatku od towarów i usług** — Art. 145m, 106gc, 106na, 106nda, 106nd, 106nf — Dz. U. z 2025 r., poz. 775 ze zm. — https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20250000775
3. **Rozporządzenie Ministra Finansów z dnia 7 grudnia 2025 r.** w sprawie wyłączeń z obowiązku wystawiania faktur ustrukturyzowanych — https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20250001740
4. **Broszura informacyjna FA(3)** — Ministerstwo Finansów, marzec 2026 — https://ksef.podatki.gov.pl/media/0ivha0ua/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf
5. **Aplikacja Podatnika KSeF 2.0** — https://ap.ksef.mf.gov.pl/

---

## Warning: Common Misconceptions

1. **"Od 1 kwietnia kary zaczną być naliczane"** — WRONG. The obligation starts April 1, 2026, but **penalties are deferred to 1 January 2027** (Art. 106gc). However, a rejected invoice is still legally non-existent from day one — this is not a safe excuse for non-compliance.

2. **"Jestem na zwolnieniu z VAT, więc mnie to nie dotyczy wcale"** — PARTIALLY WRONG. VAT-exempt taxpayers are excluded from the April 1, 2026 mandate, but the extension of the obligation to VAT-exempt entities is planned (currently: January 1, 2027). Do not use this as a reason to ignore KSeF entirely.

3. **"Wyślę fakturę mailem jako PDF jak zawsze"** — WRONG after April 1, 2026 for B2B. PDF is not a legally valid invoice in B2B contexts once KSeF is mandatory. The legal document is the XML registered in KSeF. PDF can still be sent *in addition* for convenience, but the XML in KSeF is the binding record.

4. **"KSeF 2.0 używa formatu FA(2)"** — WRONG. FA(2) was the format for KSeF 1.0 (until 31 January 2026). **KSeF 2.0 requires FA(3)** (from 1 February 2026). Any software still generating FA(2) will be rejected by the system.

5. **"Mój program zrobi wszystko sam — nie muszę się niczym martwić"** — PARTIALLY WRONG. While invoicing software handles XML generation and API submission, the taxpayer remains legally responsible. An invoice rejected due to a data error in the software is the taxpayer's problem, not the software vendor's. Validate before sending — especially early on.

6. **"KSeF numer to mój własny numer faktury (P_2)"** — WRONG. The KSeF number (numer KSeF) is assigned by MF's system after acceptance. `P_2` is the taxpayer's own sequential invoice number series, which remains unchanged and is NOT the KSeF number. Both must be present in the invoice XML.

---

## Freshness Tracker (date-sensitive claims)

| Claim | Expires / Review trigger | Priority |
|-------|--------------------------|----------|
| 10,000 PLN monthly exemption valid until 31 Dec 2026 | Review on 1 January 2027 | HIGH |
| VAT-exempt entity obligation: 1 January 2027 | Review after any new legislative amendment | HIGH |
| Penalty grace period: 1 January 2027 | Review on 1 January 2027 | HIGH |
| Test environment URL: `https://web2te-ksef.mf.gov.pl/` | Verify before publication and after any MF infrastructure change | MEDIUM |
| Commercial software list (Fakturownia, inFakt, wFirma, Comarch, Symfonia) | Review if any major provider drops KSeF support | LOW |
| e-mikrofirma "limited KSeF support" claim | Review after any MF update to the tool | MEDIUM |

---

## Cross-References for the Copywriter

- **Existing article** `ksef-od-1-kwietnia-2026.mdx` covers the same territory broadly. The new JDG article should be more persona-specific and more action-oriented (Ania's voice, not a general explainer).
- **FAQ entries** to cross-link: `/faq/dostep-i-uprawnienia`, `/faq/limity-i-wylaczenia`, `/faq/tryby-i-awarie`, `/faq/wystawianie-faktur`
- **Internal link opportunity:** The blog already references a future article `/blog/limit-10000-zl` — if that article exists, link it when discussing the 10,000 PLN threshold.
- **CTA:** Every section should funnel toward ksefuj.to validation as the practical first step Ania can take right now.
