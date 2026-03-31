# Research Brief: Jak przygotować się na KSeF — checklist ostatniego dnia

**Requested by:** Copywriter agent **Date:** 2026-03-31 **For content:** Blog post — "Jak
przygotować się na KSeF — checklist ostatniego dnia" **Target persona:** "Ania" — Polish freelancer,
JDG, 2–3 invoices/month, czynny podatnik VAT, nervous about the April 1, 2026 deadline **Tool
context:** ksefuj.to — free KSeF XML validator

---

## Source Corpus Used

| Source                                                               | Tier     | File / URL                                                         | Status                     |
| -------------------------------------------------------------------- | -------- | ------------------------------------------------------------------ | -------------------------- |
| Ustawa o VAT (Dz. U. z 2025 r., poz. 775 ze zm.)                     | 1        | https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20250000775 | CURRENT                    |
| Rozporządzenie MF z 7.12.2025 (wyłączenia)                           | 1        | https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20250001740 | CURRENT                    |
| FA(3) Information Sheet (Broszura informacyjna, marzec 2026, 174 s.) | 2        | `packages/validator/docs/fa3-information-sheet.md`                 | CURRENT                    |
| FAQ MF — KSeF 2.0                                                    | 3        | https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20           | CURRENT                    |
| Blog: ksef-od-1-kwietnia-2026.mdx                                    | internal | `apps/web/content/pl/blog/ksef-od-1-kwietnia-2026.mdx`             | Output only — not a source |
| Blog: ksef-dla-jdg.mdx                                               | internal | `apps/web/content/pl/blog/ksef-dla-jdg.mdx`                        | Output only                |
| Blog: certyfikaty-vs-tokeny-ksef.mdx                                 | internal | `apps/web/content/pl/blog/certyfikaty-vs-tokeny-ksef.mdx`          | Output only                |
| Brief: ksef-dla-jdg.md                                               | internal | `docs/knowledge-base/briefs/ksef-dla-jdg.md`                       | Research brief (prior)     |
| Brief: certyfikaty-tokeny.md                                         | internal | `docs/knowledge-base/briefs/certyfikaty-tokeny.md`                 | Research brief (prior)     |
| FAQ: dostep-i-uprawnienia.mdx                                        | internal | `apps/web/content/pl/faq/dostep-i-uprawnienia.mdx`                 | Output only                |
| FAQ: tryby-i-awarie.mdx                                              | internal | `apps/web/content/pl/faq/tryby-i-awarie.mdx`                       | Output only                |
| FAQ: walidacja-i-bledy.mdx                                           | internal | `apps/web/content/pl/faq/walidacja-i-bledy.mdx`                    | Output only                |
| FAQ: podstawy-ksef.mdx                                               | internal | `apps/web/content/pl/faq/podstawy-ksef.mdx`                        | Output only                |
| FAQ: wystawianie-faktur.mdx                                          | internal | `apps/web/content/pl/faq/wystawianie-faktur.mdx`                   | Output only                |
| FAQ: limity-i-wylaczenia.mdx                                         | internal | `apps/web/content/pl/faq/limity-i-wylaczenia.mdx`                  | Output only                |

> ⚠️ **NOTE TO COPYWRITER:** Internal FAQ and blog files are _our own published output_, not primary
> sources. Facts extracted below are cited back to Tier 1–3 MF sources wherever available. Where a
> fact appears only in our own output without a traceable MF citation, it is flagged **MEDIUM**
> confidence and marked `[source: internal output only]`.
>
> **This brief covers 10 specific checklist items.** Each item maps to a single action Ania should
> verify before April 1, 2026. The brief provides the factual grounding for each item — the
> Copywriter provides the voice and narrative framing.

---

## Key Facts (ready to use)

### Checklist Item 1: Czy mój program księgowy obsługuje KSeF i FA(3)?

---

**Fact 1.1 — FA(3) is the current and only accepted schema from 1 February 2026**

- **Fact:** From 1 February 2026, the logical structure FA(3) is the binding structured invoice
  template. FA(2) was used until 31 January 2026 and is no longer accepted by KSeF 2.0.
- **Source:** FA(3) Information Sheet (Broszura FA(3)), §1.2
- **Verbatim:** "From 1 February 2026, the logical structure FA(3) is the binding structured invoice
  template." / "The logical structure FA(2), effective from 1 September 2023, was used until 31
  January 2026."
- **Confidence:** HIGH
- **Ania-relevant:** ✅ She must ensure her invoicing software generates FA(3), not FA(2)

---

**Fact 1.2 — FA(3) schema URL**

- **Fact:** The FA(3) logical structure in its production version is published at
  `https://crd.gov.pl/wzor/2025/06/25/13775/`.
- **Source:** FA(3) Information Sheet, §1.2
- **Verbatim:** "The FA(3) logical structure in its production version is available at:
  `https://crd.gov.pl/wzor/2025/06/25/13775/`"
- **Confidence:** HIGH
- **Ania-relevant:** ❌ (too technical — but Copywriter may include as a "for nerds" footnote)

---

**Fact 1.3 — Software requirements for KSeF compliance**

- **Fact:** An invoicing program must: (a) generate XML files in FA(3) format, (b) support sending
  to KSeF via API, and (c) support receiving invoices as a buyer.
- **Source:** Blog `ksef-od-1-kwietnia-2026.mdx`, §"Krok 2"; FA(3) Information Sheet, §1.2
- **Verbatim:** "Twój program do fakturowania musi obsługiwać KSeF. Sprawdź, czy Twój dostawca:
  generuje pliki XML w formacie FA(3), obsługuje wysyłkę do KSeF przez API, obsługuje odbiór faktur
  (jako kupujący)."
- **Confidence:** HIGH
- **Ania-relevant:** ✅ Core question she must ask her software provider

---

**Fact 1.4 — Popular programs already support or are implementing KSeF**

- **Fact:** Most popular commercial invoicing programs — including Fakturownia, inFakt, wFirma,
  Comarch, Symfonia — already support or are implementing KSeF integration.
- **Source:** Blog `ksef-od-1-kwietnia-2026.mdx`, §"Krok 2"
- **Verbatim:** "Większość popularnych programów (Fakturownia, inFakt, wFirma, Comarch, Symfonia i
  inne) już to obsługuje lub właśnie wdraża."
- **Confidence:** MEDIUM (general claim from internal blog; individual vendor status should be
  verified by the user)
- **Ania-relevant:** ✅ Reassuring — she likely uses one of these

---

**Fact 1.5 — Free alternatives: Aplikacja Podatnika KSeF and e-mikrofirma**

- **Fact:** MF provides free tools: (a) **Aplikacja Podatnika KSeF** at `https://ap.ksef.mf.gov.pl/`
  — web-based, no installation, full manual invoice creation, receiving, and permissions management;
  (b) **e-mikrofirma** — basic invoicing and tax settlement with limited KSeF support.
- **Source:** FAQ `wystawianie-faktur.mdx`; Blog `ksef-dla-jdg.mdx`, §"A co jeśli nie mam programu"
- **Verbatim:** "Aplikacja Podatnika KSeF — oficjalna aplikacja MF dostępna pod adresem
  ap.ksef.mf.gov.pl. Działa w przeglądarce, nie wymaga instalacji."
- **Confidence:** HIGH (Aplikacja Podatnika); MEDIUM (e-mikrofirma scope — "ograniczony zakres"
  unspecified)
- **Ania-relevant:** ✅ Fallback if her current program doesn't support KSeF

---

### Checklist Item 2: Czy mam dostęp do KSeF (Profil Zaufany / certyfikat)?

---

**Fact 2.1 — Profil Zaufany is the simplest authentication for JDG**

- **Fact:** Profil Zaufany is a free government digital identity. It can be set up via internet
  banking, mObywatel app, ePUAP, or at a government office. It provides full access to the Aplikacja
  Podatnika KSeF web interface for manual invoice operations.
- **Source:** FAQ `dostep-i-uprawnienia.mdx`; Blog `ksef-dla-jdg.mdx`, §"Jak wejść do KSeF"; Blog
  `certyfikaty-vs-tokeny-ksef.mdx`, §"Profil Zaufany"
- **Verbatim:** "Profil Zaufany jest najwygodniejszy dla większości przedsiębiorców — można go
  założyć bezpłatnie przez bankowość elektroniczną lub w urzędzie." / "Dla większości JDG Profil
  Zaufany to najprostsze rozwiązanie — jeśli jeszcze go nie masz, załóż teraz."
- **Confidence:** MEDIUM (internal output only; aligns with general public knowledge about Profil
  Zaufany)
- **Ania-relevant:** ✅ Recommended primary path

---

**Fact 2.2 — Profil Zaufany does NOT work for API access**

- **Fact:** Profil Zaufany is for manual login via the browser (Aplikacja Podatnika). It is NOT
  usable for automated API calls. Invoicing software that connects to KSeF via API requires a token
  or certificate.
- **Source:** FAQ `dostep-i-uprawnienia.mdx`; Blog `certyfikaty-vs-tokeny-ksef.mdx`, §"Profil
  Zaufany"
- **Verbatim:** "Dostęp przez API (dla programów) wymaga certyfikatu lub tokenu."
- **Confidence:** MEDIUM (internal output only)
- **Ania-relevant:** ✅ (explains why her invoicing program may ask for separate configuration)

---

**Fact 2.3 — Alternative authentication: e-dowód, podpis kwalifikowany**

- **Fact:** Authentication to the Aplikacja Podatnika KSeF is also possible via e-dowód (electronic
  ID card, requires activation) or kwalifikowany podpis elektroniczny (qualified electronic
  signature, paid commercial product).
- **Source:** FAQ `dostep-i-uprawnienia.mdx`; Blog `certyfikaty-vs-tokeny-ksef.mdx`
- **Verbatim:** "Do KSeF logujesz się przez Aplikację Podatnika (ap.ksef.mf.gov.pl) za pomocą jednej
  z metod: Profil Zaufany, e-dowód, podpis kwalifikowany lub certyfikat KSeF."
- **Confidence:** MEDIUM (internal output only)
- **Ania-relevant:** ❌ (mention briefly; Profil Zaufany is the practical choice for Ania)

---

**Fact 2.4 — Aplikacja Podatnika URL (production)**

- **Fact:** The production Aplikacja Podatnika KSeF is accessible at `https://ap.ksef.mf.gov.pl/`.
- **Source:** Blog `ksef-dla-jdg.mdx`, §"A co jeśli nie mam programu"; FAQ `wystawianie-faktur.mdx`
- **Verbatim:** "Aplikacja Podatnika KSeF — oficjalna aplikacja MF dostępna pod adresem
  ap.ksef.mf.gov.pl."
- **Confidence:** HIGH
- **Ania-relevant:** ✅ She should bookmark this URL
- **⚠️ Freshness flag:** URL — verify before publication as MF infrastructure can change

---

### Checklist Item 3: Czy wygenerowałem testową fakturę i ją zwalidowałem?

---

**Fact 3.1 — KSeF 2.0 has no built-in pre-submission validator**

- **Fact:** KSeF 2.0 does not provide a standalone pre-submission XML validator. Errors are
  discovered only when the invoice is submitted and rejected by the system.
- **Source:** Blog `ksef-od-1-kwietnia-2026.mdx`, §"Jak sprawdzić, czy faktura jest poprawna"; FAQ
  `walidacja-i-bledy.mdx`
- **Verbatim:** "KSeF 2.0 nie ma wbudowanego walidatora — dowiesz się o błędach dopiero wtedy, gdy
  wyślesz fakturę i system ją odrzuci."
- **Confidence:** HIGH
- **Ania-relevant:** ✅ Core motivation for pre-validation

---

**Fact 3.2 — A rejected invoice is legally non-existent**

- **Fact:** An invoice rejected by KSeF is treated as if it was never issued — it has no legal
  force. This means delayed payment, the need to reissue, and potential problems with statutory
  deadlines for invoice issuance.
- **Source:** Blog `ksef-od-1-kwietnia-2026.mdx`, §"Jak sprawdzić, czy faktura jest poprawna"
- **Verbatim:** "Odrzucona faktura to faktura, której nie ma. Oznacza to opóźnienie w płatności,
  konieczność korekty i potencjalne problemy z terminem wystawienia."
- **Confidence:** HIGH
- **Ania-relevant:** ✅ Core practical risk — makes "validate before sending" urgent

---

**Fact 3.3 — ksefuj.to validates against FA(3) XSD and MF semantic rules, client-side**

- **Fact:** ksefuj.to is a free KSeF XML validator that runs entirely in the browser. It validates
  both FA(3) XSD schema compliance and MF semantic rules. Invoice data never leaves the user's
  browser. No registration required.
- **Source:** Blog `ksef-od-1-kwietnia-2026.mdx`; FAQ `walidacja-i-bledy.mdx`
- **Verbatim:** "ksefuj.to to bezpłatny walidator KSeF działający w całości w przeglądarce. Wrzuć
  plik XML — sprawdzi zarówno zgodność ze schematem FA(3), jak i reguły semantyczne zgodne z
  oficjalnymi wymaganiami MF. Twoje dane nie opuszczają przeglądarki."
- **Confidence:** HIGH (our own product — accurate)
- **Ania-relevant:** ✅ Core CTA of the article

---

**Fact 3.4 — Most common validation errors**

- **Fact:** The most common errors in KSeF invoices include: missing mandatory annotation fields
  (P_16, P_17, P_18, P_18A, P_23 etc.), incorrect GTU format, missing PLN currency conversion for
  foreign-currency invoices, NIP entered in the wrong XML field, and excessive decimal precision.
- **Source:** FAQ `walidacja-i-bledy.mdx`
- **Verbatim:** "Najczęstsze błędy to: brakujące obowiązkowe pola adnotacji (P_16, P_17, P_18,
  P_18A, P_23 i inne pola sekcji Adnotacje), zły format GTU (powinno być GTU_01, nie osobny
  element), brak przeliczenia walut na PLN, błędny NIP w polu dla numeru VAT UE zamiast w polu NIP,
  oraz zbyt duża precyzja dziesiętna kwot."
- **Confidence:** HIGH
- **Ania-relevant:** ✅ (awareness-level — she doesn't need to debug these herself, but should know
  validation catches real problems)

---

### Checklist Item 4: Czy wysłałem testową fakturę na środowisko testowe?

---

**Fact 4.1 — MF test environment URL**

- **Fact:** MF provides a KSeF 2.0 test environment at `https://ap-test.ksef.mf.gov.pl/web/`.
  Invoices with fictitious data can be sent there without any legal consequences.
- **Source:** Blog `ksef-od-1-kwietnia-2026.mdx`, §"Krok 4"; Blog `ksef-dla-jdg.mdx`, §"Krok 4"
- **Verbatim:** "Ministerstwo Finansów udostępnia środowisko testowe KSeF 2.0 pod adresem
  https://ap-test.ksef.mf.gov.pl/web/. Możesz tam wysyłać faktury z fikcyjnymi danymi i sprawdzać,
  jak system reaguje — bez żadnych konsekwencji prawnych."
- **Confidence:** HIGH (URL cited consistently in internal sources; should be verified before
  publication as test environments can change)
- **Ania-relevant:** ✅ Core preparation step
- **⚠️ Freshness flag:** URL `https://ap-test.ksef.mf.gov.pl/web/` — verify before publish

---

**Fact 4.2 — Testing has no legal consequences**

- **Fact:** Sending invoices to the MF test environment has no legal consequences. It is designed
  specifically for testing integrations and workflows before production use.
- **Source:** Blog `ksef-od-1-kwietnia-2026.mdx`, §"Krok 4"
- **Verbatim:** "Możesz tam wysyłać faktury z fikcyjnymi danymi i sprawdzać, jak system reaguje —
  bez żadnych konsekwencji prawnych."
- **Confidence:** HIGH
- **Ania-relevant:** ✅ Reassuring — she can test without fear

---

**Fact 4.3 — Don't postpone testing**

- **Fact:** The blog explicitly advises against delaying tests: discovering integration issues on
  the first day of the obligation is significantly worse than discovering them beforehand.
- **Source:** Blog `ksef-od-1-kwietnia-2026.mdx`, §"Krok 4"
- **Verbatim:** "Nie odkładaj testów na ostatni moment. Jeśli coś nie działa, lepiej odkryć to teraz
  niż pierwszego dnia obowiązku."
- **Confidence:** HIGH (editorial advice from internal blog, factually grounded)
- **Ania-relevant:** ✅

---

### Checklist Item 5: Czy wiem co robić gdy KSeF jest niedostępny (tryb offline)?

---

**Fact 5.1 — Three operating modes exist**

- **Fact:** KSeF provides three invoice issuing modes: (1) **online** (standard — real-time
  submission), (2) **offline24h** (local issuance, must submit by end of next business day), (3)
  **tryb awaryjny** (emergency mode — declared by MF during outages, up to 7 business days to submit
  after outage ends).
- **Source:** Blog `ksef-od-1-kwietnia-2026.mdx`, §"Tryby pracy w KSeF"; FA(3) Information Sheet,
  §9.2 (P_1 date rules citing Art. 106na, 106nda, 106nh, 106nf)
- **Verbatim:** "KSeF przewiduje trzy tryby wystawiania faktur."
- **Legal basis:** Art. 106na sec. 1 (online); Art. 106nda sec. 10 (offline24); Art. 106nf sec. 9
  (emergency)
- **Confidence:** HIGH
- **Ania-relevant:** ✅ She must know all three modes exist

---

**Fact 5.2 — Offline24h mode: submit by end of next business day**

- **Fact:** If there is no internet access or KSeF is temporarily unavailable, an invoice may be
  issued locally. It must be sent to KSeF **no later than the end of the next business day**. The
  invoice is legally valid from the moment of issuance, but the KSeF number is received only after
  submission.
- **Source:** Blog `ksef-od-1-kwietnia-2026.mdx`, §"Tryb offline 24h"; FA(3) Information Sheet, §9.2
- **Verbatim:** "Musisz ją przesłać do KSeF niezwłocznie — nie później niż do końca następnego dnia
  roboczego. Faktura jest ważna od momentu wystawienia, ale numer KSeF dostaniesz dopiero po
  wysyłce."
- **Legal basis:** Art. 106nda sec. 10, Ustawa o VAT
- **Confidence:** HIGH
- **Ania-relevant:** ✅ Critical deadline she must know

---

**Fact 5.3 — Emergency mode: 7 business days after outage ends**

- **Fact:** When MF officially declares emergency mode (tryb awaryjny) due to a prolonged KSeF
  outage, invoices can be issued outside KSeF. They must be submitted to the system **no later than
  7 business days after the end of the outage**.
- **Source:** Blog `ksef-od-1-kwietnia-2026.mdx`, §"Tryb awaryjny"; FA(3) Information Sheet, §9.2
  (Art. 106nf sec. 9)
- **Verbatim:** "W przypadku długotrwałej awarii KSeF Ministerstwo Finansów może ogłosić tryb
  awaryjny. W tym trybie faktury można wystawiać poza KSeF, ale muszą spełniać ściśle określone
  wymagania formalne i zostać przesłane do systemu nie później niż w ciągu 7 dni roboczych od
  zakończenia awarii."
- **Legal basis:** Art. 106nf, Ustawa o VAT
- **Confidence:** HIGH
- **Ania-relevant:** ✅

---

**Fact 5.4 — Software should handle offline modes automatically**

- **Fact:** Invoicing software should automatically handle both offline24h and emergency modes. Ania
  should verify this capability with her software vendor before a crisis occurs.
- **Source:** Blog `ksef-dla-jdg.mdx`, §"Co jeśli coś pójdzie nie tak?"
- **Verbatim:** "Twój program do fakturowania powinien automatycznie obsługiwać oba tryby awaryjne —
  pytaj dostawcę, zanim dojdzie do sytuacji kryzysowej."
- **Confidence:** MEDIUM (editorial advice from internal blog; the expectation is reasonable but no
  MF mandate requires software to support offline modes)
- **Ania-relevant:** ✅ Practical — check this with your provider now, not on April 2

---

**Fact 5.5 — KSeF status is published on ksef.podatki.gov.pl**

- **Fact:** The official status of the KSeF system is published at `ksef.podatki.gov.pl`. Planned
  outages are announced in advance; unplanned outages are announced promptly.
- **Source:** FAQ `tryby-i-awarie.mdx`
- **Verbatim:** "Oficjalny status systemu KSeF jest publikowany na stronie ksef.podatki.gov.pl.
  [...] Awarie planowane są zazwyczaj ogłaszane z wyprzedzeniem, nieplanowane — bezzwłocznie."
- **Confidence:** MEDIUM (internal output only)
- **Ania-relevant:** ✅ She should bookmark this page

---

### Checklist Item 6: Czy mój księgowy ma uprawnienia w KSeF (ZAW-FA)?

---

**Fact 6.1 — ZAW-FA is the form for granting KSeF access to a third party**

- **Fact:** ZAW-FA is a formal authorization form that allows a taxpayer to grant another person or
  entity (e.g., an accountant or biuro rachunkowe) access to KSeF on their behalf. It can be
  submitted: (a) at the tax office (urząd skarbowy) in person, (b) electronically via e-Urząd
  Skarbowy (podatki.gov.pl), or (c) directly within the Aplikacja Podatnika KSeF through the
  permissions panel.
- **Source:** FAQ `dostep-i-uprawnienia.mdx`; Blog `certyfikaty-vs-tokeny-ksef.mdx`, §"ZAW-FA"
- **Verbatim:** "ZAW-FA to formularz upoważnienia do korzystania z KSeF w imieniu podatnika. Składa
  się go w urzędzie skarbowym lub elektronicznie przez e-Urząd Skarbowy i pozwala upoważnić inną
  osobę — np. księgowego lub biuro rachunkowe — do wystawiania i odbierania faktur w KSeF.
  Upoważnienie może być ograniczone zakresowo: tylko odczyt, tylko wystawianie lub pełny dostęp."
- **Confidence:** MEDIUM (internal output only; the existence of ZAW-FA as a form is well-known but
  no Tier 1 statutory citation is confirmed in corpus)
- **Ania-relevant:** ✅ Critical if she uses a biuro rachunkowe

---

**Fact 6.2 — Three scope levels: read-only, issuing-only, full access**

- **Fact:** ZAW-FA authorization can be scoped to one of three permission levels: (1) read-only
  (only viewing invoices), (2) issuing-only (only sending invoices), (3) full access (both).
- **Source:** FAQ `dostep-i-uprawnienia.mdx`
- **Verbatim:** "Upoważnienie może być ograniczone zakresowo: tylko odczyt, tylko wystawianie lub
  pełny dostęp."
- **Confidence:** MEDIUM (internal output only)
- **Ania-relevant:** ✅ She should discuss scope with her accountant

---

**Fact 6.3 — Biuro rachunkowe typically requests ZAW-FA from clients**

- **Fact:** In practice, accounting offices typically request the ZAW-FA authorization from their
  clients and coordinate the process. The JDG client does not need to navigate the form alone.
- **Source:** FAQ `dostep-i-uprawnienia.mdx`; Blog `certyfikaty-vs-tokeny-ksef.mdx`, §"ZAW-FA"
- **Verbatim:** "Biuro rachunkowe zazwyczaj samo prosi klientów o stosowne upoważnienie i
  przeprowadzi przez cały proces. Nie musisz znać szczegółów — dopytaj swojego księgowego."
- **Confidence:** MEDIUM (describes common practice, not a legal requirement; from internal output)
- **Ania-relevant:** ✅ Reassuring — she should ask her accountant, not figure it out herself

---

**Fact 6.4 — Without ZAW-FA (or equivalent), accountant's API access fails**

- **Fact:** Certyfikat KSeF typ 2 (used by biura rachunkowe for API access) requires a pre-existing
  authorization from the taxpayer (ZAW-FA or equivalent panel-granted permission). Without it, the
  certificate simply does not work.
- **Source:** FAQ `dostep-i-uprawnienia.mdx`; Blog `certyfikaty-vs-tokeny-ksef.mdx`, §"Certyfikat
  KSeF"
- **Verbatim:** "Typ 2 zawsze działa w kontekście konkretnego upoważnienia, które musi istnieć w
  KSeF." / "ZAW-FA od każdego klienta jest warunkiem koniecznym przed uruchomieniem jakiejkolwiek
  integracji API."
- **Confidence:** MEDIUM (internal output only)
- **Ania-relevant:** ✅ If Ania doesn't grant the authorization, her accountant is locked out of
  KSeF

---

### Checklist Item 7: Czy wiem jak wygląda kod QR na fakturze?

---

**Fact 7.1 — Offline invoices carry special pre-downloaded QR codes**

- **Fact:** An offline invoice carries a special QR code downloaded in advance from KSeF. Each
  taxpayer can download a pool of QR codes for use during connectivity loss. The code identifies the
  invoice and enables its later association with KSeF after upload. Without a valid QR code, an
  offline invoice may be challenged.
- **Source:** FAQ `tryby-i-awarie.mdx`
- **Verbatim:** "Kod QR na fakturze offline to specjalny token pobrany wcześniej z systemu KSeF —
  każdy przedsiębiorca może pobrać pulę kodów na wypadek braku łączności. Kod identyfikuje fakturę i
  umożliwia jej późniejsze powiązanie z KSeF po wgraniu dokumentu. Bez prawidłowego kodu QR faktura
  offline może być zakwestionowana."
- **Confidence:** MEDIUM (from internal output; FA(3) Information Sheet does not detail QR code
  content or download process)
- **Ania-relevant:** ✅ She should understand QR exists and why, even if her software handles it

---

**Fact 7.2 — QR code on online invoices: contains verification URL**

- **Fact:** Invoices issued via KSeF (online mode) include a QR code that contains a URL allowing
  verification of the invoice against the KSeF system. The QR code enables the recipient to verify
  the invoice's authenticity.
- **Source:** Kody QR online/offline specifications (Tier 2 — **NOT PROCESSED** in this corpus)
- **Verbatim:** _Not available from processed sources_
- **Confidence:** LOW (the claim that QR on online invoices contains a verification URL is
  referenced in user task requirements but NOT confirmed in any processed source document; the QR
  specifications document is listed in the Tier 2 corpus but has not been processed)
- **Ania-relevant:** ✅ Awareness-level: she should know that invoices contain QR codes and what
  they're for
- **⚠️ CORPUS GAP:** The specific content and structure of online vs offline QR codes is NOT covered
  in any processed document. The Copywriter should NOT describe QR code content in detail. State
  that QR codes exist and that the software generates them. Link to MF FAQ for details.

---

**Fact 7.3 — Invoicing software should handle QR code generation automatically**

- **Fact:** The QR code on KSeF invoices is generated by the invoicing software (or by the Aplikacja
  Podatnika). The taxpayer does not manually create QR codes.
- **Source:** _Implied from general KSeF architecture — not explicitly stated in any processed
  source_
- **Confidence:** MEDIUM (reasonable inference from the overall system design; not directly quoted)
- **Ania-relevant:** ✅ Reassuring — she doesn't need to handle QR codes manually

---

### Checklist Item 8: Czy mam numer telefonu do helpdesku MF?

---

**Fact 8.1 — KSeF helpdesk exists at MF**

- **Fact:** The Ministry of Finance operates a helpdesk for KSeF-related inquiries.
- **Source:** _Referenced in user task requirements; consistent with MF operational practice_
- **Verbatim:** _Not available from processed sources_
- **Confidence:** LOW (the existence of an MF KSeF helpdesk is asserted in the task requirements and
  aligns with MF's general practice of operating helplines, but NO specific phone number, email
  address, or operating hours are stated in any processed source document)
- **Ania-relevant:** ✅ She should have contact info ready
- **⚠️ CRITICAL CORPUS GAP:** No processed source contains an MF helpdesk phone number, email, or
  URL for KSeF support. The Copywriter MUST NOT invent a phone number. Options:
  - Direct the reader to `https://ksef.podatki.gov.pl` for current contact information
  - Direct the reader to `https://www.podatki.gov.pl/e-urzad-skarbowy/` for e-Urząd Skarbowy contact
  - Recommend the general KIS (Krajowa Informacja Skarbowa) helpline as a fallback — but verify the
    current number before publishing (historically: 22 330 0330 or 801 055 055, but these must be
    confirmed)
  - **Action required before writing:** Verify the current MF/KSeF helpdesk contact details from
    ksef.podatki.gov.pl directly

---

### Checklist Item 9: Czy powiadomiłem klientów o zmianie?

---

**Fact 9.1 — Invoices are available to buyers in KSeF automatically**

- **Fact:** When an invoice is accepted by KSeF, the buyer (nabywca) can access it directly in KSeF
  using their NIP. The issuer does not need to separately email the invoice — it is in the system.
- **Source:** Blog `ksef-od-1-kwietnia-2026.mdx`, §"Co się zmienia w praktyce"; FAQ
  `podstawy-ksef.mdx`; Brief `ksef-dla-jdg.md`, Fact 5.4
- **Verbatim:** "Kontrahent nie musi już czekać na maila. Faktura jest w systemie — i obie strony
  mają do niej dostęp."
- **Confidence:** HIGH
- **Ania-relevant:** ✅ She should tell clients invoices will come via KSeF, not email

---

**Fact 9.2 — Buyer's NIP must be in the correct XML field**

- **Fact:** The invoice will be correctly made available to the buyer in KSeF only if the buyer's
  NIP is entered in the `NIP` field of `Podmiot2/DaneIdentyfikacyjne` — not in `NrVatUE` or `NrID`.
- **Source:** FA(3) Information Sheet, §2.10
- **Verbatim:** "The invoice will be correctly made available to the purchaser in KSeF only if the
  purchaser's NIP is entered in the NIP field — not in NrVatUE or NrID."
- **Confidence:** HIGH
- **Ania-relevant:** ❌ (too technical for the checklist; her software handles this; but worth
  noting as a gotcha if validating manually)

---

**Fact 9.3 — PDF can still be sent alongside for convenience**

- **Fact:** A PDF visualization of the invoice can still be sent to the client for convenience, but
  the legally binding document is the XML registered in KSeF. PDF is supplementary, not the primary
  invoice.
- **Source:** FAQ `podstawy-ksef.mdx`; Blog `ksef-od-1-kwietnia-2026.mdx`
- **Verbatim:** "PDF nie jest akceptowany przez KSeF jako dokument podatkowy. System wymaga
  strukturalnego pliku XML zgodnego z FA(3). Możesz co prawda wysyłać nabywcy wizualizację faktury
  jako PDF dla wygody, ale prawną wersją dokumentu jest plik XML zarejestrowany w KSeF."
- **Confidence:** HIGH
- **Ania-relevant:** ✅ She can keep sending PDFs to clients who want them, but must clarify the
  legal status

---

**Fact 9.4 — No explicit MF guidance on client notification**

- **Fact:** No processed MF source addresses the question of whether or how a taxpayer should notify
  their clients about the switch to KSeF. This is a practical recommendation, not a legal
  requirement.
- **Source:** _Not found in corpus_
- **Confidence:** N/A — this is a practical checklist item, not a legal obligation
- **Ania-relevant:** ✅ Good practice — reduces confusion and delayed payments

---

### Checklist Item 10: Czy mam plan B?

---

**Fact 10.1 — KSeF obligation starts April 1, 2026 — penalties deferred to January 1, 2027**

- **Fact:** The obligation to issue invoices via KSeF applies from **1 April 2026** for all active
  VAT taxpayers. However, financial penalties (dodatkowe zobowiązanie podatkowe per Art. 106gc) for
  violations will not be enforced until **1 January 2027**.
- **Source:** Ustawa o VAT, Art. 145m (obligation); Art. 106gc (penalties); Blog
  `ksef-od-1-kwietnia-2026.mdx`, §"Co grozi za fakturę wystawioną poza KSeF"
- **Verbatim:** "Kary za błędy w KSeF zostały odroczone do 1 stycznia 2027 r. Oznacza to, że od 1
  kwietnia 2026 roku obowiązek wystawiania faktur przez KSeF obowiązuje, ale sankcje za jego
  naruszenie zaczną być egzekwowane dopiero od 2027 roku."
- **Confidence:** HIGH (obligation date); MEDIUM (penalty deferral — cited from internal blog
  referencing Art. 106gc; not independently verified against Tier 1 text in this extraction)
- **Ania-relevant:** ✅ Relieves immediate panic — but the article MUST NOT encourage delay
- **⚠️ Freshness flag:** Review after 1 January 2027

---

**Fact 10.2 — Penalty deferral does NOT mean non-compliance is safe**

- **Fact:** Even during the penalty grace period, an invoice issued outside KSeF (in violation of
  the obligation) is considered issued in breach of regulations. The invoice may be legally invalid,
  and the buyer's right to deduct VAT may be affected. A rejected invoice is legally non-existent.
- **Source:** Blog `ksef-od-1-kwietnia-2026.mdx`, §"Co grozi za fakturę wystawioną poza KSeF"
- **Verbatim:** "To nie jest wymówka, żeby zwlekać — ale warto wiedzieć, że masz czas na naukę bez
  natychmiastowego ryzyka kary." / "Odrzucona faktura to faktura, której nie ma."
- **Confidence:** HIGH
- **Ania-relevant:** ✅ Critical framing — grace period = learning buffer, not a free pass

---

**Fact 10.3 — Aplikacja Podatnika KSeF as ultimate fallback**

- **Fact:** If Ania's commercial invoicing software fails, the free Aplikacja Podatnika KSeF
  (`https://ap.ksef.mf.gov.pl/`) provides a manual fallback for issuing invoices via a web form. It
  works with Profil Zaufany, requires no installation, and is available immediately.
- **Source:** FAQ `wystawianie-faktur.mdx`; Blog `ksef-dla-jdg.mdx`, §"A co jeśli nie mam programu"
- **Verbatim:** "To oficjalna aplikacja MF (ap.ksef.mf.gov.pl) do zarządzania fakturami w KSeF.
  Pozwala wystawiać faktury ręcznie przez formularz, przesyłać gotowe pliki XML, przeglądać faktury
  otrzymane i zarządzać uprawnieniami. Dostęp przez Profil Zaufany, e-dowód lub certyfikat
  kwalifikowany. Jest bezpłatna i nie wymaga instalacji."
- **Confidence:** HIGH
- **Ania-relevant:** ✅ The ultimate Plan B — always available, always free

---

**Fact 10.4 — Offline24h as emergency fallback when all else fails**

- **Fact:** As a last resort, if KSeF is unreachable AND the invoicing software is down, Ania can
  issue an invoice locally (offline24h mode) and submit it to KSeF by the end of the next business
  day. This is a legitimate legal mechanism, not a workaround.
- **Source:** Blog `ksef-od-1-kwietnia-2026.mdx`, §"Tryb offline 24h"; Art. 106nda sec. 10
- **Verbatim:** "Jeśli nie masz dostępu do internetu lub KSeF jest chwilowo niedostępny, możesz
  wystawić fakturę lokalnie i wysłać ją do KSeF najpóźniej do końca następnego dnia roboczego."
- **Legal basis:** Art. 106nda sec. 10, Ustawa o VAT
- **Confidence:** HIGH
- **Ania-relevant:** ✅ Knowing this exists reduces last-resort panic

---

## Unsettled Questions

> These are areas where the MF source corpus is unclear, recently amended, or where the Copywriter
> should NOT make definitive claims without a "verify with your accountant" hedge.

1. **MF helpdesk contact details** — No processed source contains a phone number, email, or
   operating hours for KSeF support. The Copywriter MUST verify current contact info at
   `https://ksef.podatki.gov.pl` before publishing. Do NOT guess a phone number.

2. **QR code content and structure (online vs offline)** — The specific content of QR codes on KSeF
   invoices is NOT described in any processed source. The QR code specifications document (Tier 2)
   is listed in the corpus but has NOT been processed. Do not describe QR code internals. State that
   QR codes exist, that software generates them, and link to the MF FAQ.

3. **How to download offline QR codes** — The FAQ mentions pre-downloading a "pool of codes" but
   does not describe the mechanism (API call? Aplikacja Podatnika download?). Do NOT write
   step-by-step offline QR instructions without verifying against Podręcznik KSeF 2.0 or the Kody QR
   offline specification.

4. **Exact penalty amounts and types** — Art. 106gc is cited as the penalty framework, but specific
   penalty amounts/percentages are not quoted in any processed source. Do NOT state specific penalty
   amounts. Direct readers to Art. 106gc and a doradca podatkowy.

5. **Client notification best practices** — No MF source addresses how to notify clients about the
   KSeF transition. The checklist item is practical advice, not a legal obligation. Frame it as
   "good practice" only.

6. **Token validity duration** — The specific duration of a KSeF authentication token's validity
   period is not stated in any processed source. The FAQ says "określony czas ważności" without
   specifying.

---

## Internal Link Recommendations

The Copywriter should cross-link to these existing pages where contextually appropriate:

| Topic in checklist                     | Link to                                             |
| -------------------------------------- | --------------------------------------------------- |
| FA(3) schema / what changed from FA(2) | `/blog/ksef-od-1-kwietnia-2026` §"Co to jest FA(3)" |
| Software readiness / 5 steps           | `/blog/ksef-dla-jdg` §"Co muszę zrobić TERAZ"       |
| Certificates vs tokens                 | `/blog/certyfikaty-vs-tokeny-ksef`                  |
| ZAW-FA details                         | `/blog/certyfikaty-vs-tokeny-ksef` §"ZAW-FA"        |
| Offline / emergency modes              | `/faq/tryby-i-awarie`                               |
| Validation and errors                  | `/faq/walidacja-i-bledy`                            |
| Access and authorization               | `/faq/dostep-i-uprawnienia`                         |
| 10,000 PLN threshold                   | `/blog/ksef-limit-10000-zl`                         |
| Common validation errors               | `/blog/najczestsze-bledy-walidacji-fa3`             |
| All FAQ                                | `/faq`                                              |
| ksefuj.to validator                    | `/` (homepage)                                      |

---

## Suggested Sources Section

For the article's "Źródła" footer:

1. **FAQ MF — KSeF 2.0** — https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20
2. **Ustawa z dnia 11 marca 2004 r. o podatku od towarów i usług** — Art. 106na, 106nda, 106nf,
   106gc, 145m — Dz. U. z 2025 r., poz. 775 ze zm. —
   https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20250000775
3. **Rozporządzenie Ministra Finansów z dnia 7 grudnia 2025 r.** w sprawie wyłączeń z obowiązku
   wystawiania faktur ustrukturyzowanych —
   https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20250001740
4. **Broszura informacyjna FA(3)** — Ministerstwo Finansów, marzec 2026 —
   https://ksef.podatki.gov.pl/media/0ivha0ua/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf
5. **Aplikacja Podatnika KSeF 2.0** — https://ap.ksef.mf.gov.pl/
6. **Środowisko testowe KSeF 2.0** — https://ap-test.ksef.mf.gov.pl/web/

---

## Warning: Common Misconceptions

1. **"Kary zaczynają się od 1 kwietnia"** — WRONG. The obligation starts April 1, 2026, but
   **penalties are deferred to 1 January 2027** (Art. 106gc framework). However, a rejected or
   non-KSeF invoice is still legally invalid from day one — deferred penalties ≠ deferred
   obligation.

2. **"Wyślę PDF jak zawsze i będzie dobrze"** — WRONG after April 1, 2026 for B2B. PDF is not a
   legally valid invoice once KSeF is mandatory. The XML in KSeF is the binding record. PDF can
   still be sent in addition for the client's convenience.

3. **"Mój program używa jeszcze FA(2) — to wystarczy"** — WRONG. FA(2) has not been accepted since 1
   February 2026. **KSeF 2.0 requires FA(3).** Any software still generating FA(2) will result in
   rejected invoices.

4. **"Nie potrzebuję Profilu Zaufanego — mój program robi wszystko"** — PARTIALLY WRONG. The
   invoicing program handles API submission (via token), but Ania still needs Profil Zaufany (or
   equivalent) to: (a) log into the Aplikacja Podatnika to generate the token in the first place,
   (b) manage permissions / ZAW-FA, (c) use as a manual fallback if the software fails.

5. **"Tryb offline znaczy, że mogę wystawiać faktury na papierze ile chcę"** — WRONG. Offline24h
   mode requires submission to KSeF by end of next business day. Emergency mode requires submission
   within 7 business days of outage end. These are temporary mechanisms, not permanent alternatives.

6. **"Mój księgowy automatycznie ma dostęp do mojego KSeF"** — WRONG. The accountant must be
   explicitly authorized via ZAW-FA (or panel permission in Aplikacja Podatnika). Without
   authorization, the accountant has zero access — even if they've been doing your books for years.

---

## Gotchas for the Copywriter

1. **This is a checklist article, not a tutorial.** Each item should be answerable with "yes" or
   "no." If the answer is "no," the article should tell Ania what to do — but keep it to 2–3
   sentences per action item, not a deep dive.

2. **Don't duplicate the JDG article.** The existing `ksef-dla-jdg.mdx` covers much of the same
   ground in tutorial format. This checklist should link to it (and other existing content) rather
   than repeating everything.

3. **Tone: calm urgency.** It's the last day before the deadline. The tone should be "you still have
   time to check these 10 things" — not "PANIC! You're too late." The penalty grace period is real;
   the obligation is real; both are true simultaneously.

4. **CTA placement:** ksefuj.to validation should be the natural CTA for checklist items 3 (validate
   XML) and 10 (Plan B — validate before sending to catch errors). Don't force the CTA into every
   checklist item.

5. **The helpdesk number is a CORPUS GAP.** Do not invent a phone number. Direct the reader to
   ksef.podatki.gov.pl for current contact info.

6. **QR codes: keep it high-level.** The QR code topic is interesting but the detailed
   specifications are NOT in the processed corpus. Say "invoices contain QR codes for verification"
   and leave it at that. Don't describe code content or structure.

---

## Freshness Tracker (date-sensitive claims)

| Claim                                                       | Expires / Review trigger                                         | Priority |
| ----------------------------------------------------------- | ---------------------------------------------------------------- | -------- |
| KSeF mandatory from 1 April 2026 (all active VAT)           | Stable — based on Art. 145m                                      | LOW      |
| Penalty grace period until 1 January 2027                   | Review on 1 January 2027                                         | HIGH     |
| Test environment URL: `https://ap-test.ksef.mf.gov.pl/web/` | Verify before publication; may change with MF infra updates      | MEDIUM   |
| Production AP URL: `https://ap.ksef.mf.gov.pl/`             | Verify before publication                                        | MEDIUM   |
| FA(3) schema URL: `https://crd.gov.pl/wzor/...`             | Verify before publication; stable since June 2025                | LOW      |
| MF helpdesk contact details                                 | Must be sourced fresh before publication — NOT in corpus         | HIGH     |
| Commercial software KSeF support status                     | Changes frequently; avoid naming specific vendors without caveat | MEDIUM   |
| e-mikrofirma "limited KSeF support"                         | Review after any MF update to the tool                           | MEDIUM   |
