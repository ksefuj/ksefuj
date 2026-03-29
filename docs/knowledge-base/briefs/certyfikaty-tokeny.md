# Research Brief: Certyfikaty vs tokeny w KSeF — co wybrać w 2026

**Requested by:** Copywriter agent **Date:** 2026-03-25 **For content:** Blog post — "Certyfikaty vs
tokeny w KSeF — co wybrać w 2026" **Target personas:**

- **"Ania"** — JDG freelancer, 2–3 invoices/month, uses Aplikacja Podatnika or Fakturownia/inFakt
- **"Pani Krystyna"** — Accountant at a biuro rachunkowe managing 20–50 clients
- **"Marek"** — Developer/integrator building a system-to-system KSeF connection

**Tool context:** ksefuj.to — free KSeF XML validator

---

## Source Corpus Used

| Source                                                               | Tier     | File / URL                                                         | Status                                      |
| -------------------------------------------------------------------- | -------- | ------------------------------------------------------------------ | ------------------------------------------- |
| Ustawa o VAT (Dz. U. z 2025 r., poz. 775 ze zm.)                     | 1        | https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20250000775 | CURRENT                                     |
| FA(3) Information Sheet (Broszura informacyjna, marzec 2026, 174 s.) | 2        | `packages/validator/docs/fa3-information-sheet.md`                 | CURRENT — **does NOT cover auth**           |
| Podręcznik KSeF 2.0 (4 parts)                                        | 2        | Not in corpus                                                      | **NOT PROCESSED**                           |
| Podręcznik Aplikacji Podatnika KSeF 2.0                              | 2        | Not in corpus                                                      | **NOT PROCESSED**                           |
| Objaśnienia podatkowe 28.01.2026                                     | 2        | Not in corpus                                                      | **NOT PROCESSED**                           |
| FAQ MF — KSeF 2.0                                                    | 3        | https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20           | Not directly processed                      |
| FAQ: dostep-i-uprawnienia.mdx (PL)                                   | internal | `apps/web/content/pl/faq/dostep-i-uprawnienia.mdx`                 | Output only — primary source for this brief |
| FAQ: access-and-authorizations.mdx (EN)                              | internal | `apps/web/content/en/faq/access-and-authorizations.mdx`            | Output only — mirrors PL FAQ                |
| FAQ: wystawianie-faktur.mdx                                          | internal | `apps/web/content/pl/faq/wystawianie-faktur.mdx`                   | Output only                                 |
| Blog: ksef-od-1-kwietnia-2026.mdx                                    | internal | `apps/web/content/pl/blog/ksef-od-1-kwietnia-2026.mdx`             | Output only                                 |
| Blog: ksef-dla-jdg.mdx                                               | internal | `apps/web/content/pl/blog/ksef-dla-jdg.mdx`                        | Output only                                 |

> ⚠️ **CRITICAL WARNING TO COPYWRITER:** The FA(3) Information Sheet (Tier 2) covers invoice XML
> structure only — it does NOT discuss authentication methods, certificates, or tokens at all.
> Authentication is governed primarily by the **Podręcznik KSeF 2.0** and **Podręcznik Aplikacji
> Podatnika KSeF 2.0** (both Tier 2), which have **not been processed** for this corpus.
>
> All authentication facts in this brief are sourced exclusively from our own internal output (FAQ
> and blog files), which are themselves unverified against primary Tier 1–2 sources in this
> extraction. All such facts are marked **MEDIUM** unless cross-confirmed by a direct statutory
> citation. The Copywriter **must not** present any of these claims as derived from binding law
> without independent verification. Where possible, link readers to
> https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20 as the authoritative FAQ.

---

## Key Facts (ready to use)

### 1. Overview of authentication methods

---

**Fact 1.1 — Six available authentication methods**

- **Fact:** KSeF supports the following authentication methods for the Aplikacja Podatnika and the
  API: (1) **Profil Zaufany**, (2) **e-dowód** (electronic ID card), (3) **kwalifikowany podpis
  elektroniczny** (qualified electronic signature), (4) **certyfikat KSeF typ 1** (for the
  taxpayer), (5) **certyfikat KSeF typ 2** (for an authorized entity), (6) **token
  uwierzytelniający** (authentication token).
- **Source:** FAQ `dostep-i-uprawnienia.mdx`; Blog `ksef-od-1-kwietnia-2026.mdx`, §"Krok 3"; Blog
  `ksef-dla-jdg.mdx`, §"Jak wejść do KSeF"
- **Verbatim:** "Do KSeF logujesz się przez Aplikację Podatnika (ap.ksef.mf.gov.pl) za pomocą jednej
  z metod: Profil Zaufany, e-dowód, podpis kwalifikowany lub certyfikat KSeF. […] Dostęp przez API
  (dla programów) wymaga certyfikatu lub tokenu."
- **Confidence:** MEDIUM (internal output only; Tier 2 primary source — Podręcznik KSeF 2.0 — not in
  corpus)
- **Ania-relevant:** ✅ Core orientation fact for the article
- **Pani Krystyna-relevant:** ✅
- **Marek-relevant:** ✅

---

**Fact 1.2 — Manual UI access uses Profil Zaufany / e-dowód / podpis kwalifikowany**

- **Fact:** Interactive (human) login to the Aplikacja Podatnika KSeF web interface is done via
  Profil Zaufany, e-dowód, or kwalifikowany podpis elektroniczny. These methods are for person-to-
  system interaction, not for automated software integrations.
- **Source:** FAQ `wystawianie-faktur.mdx`; FAQ `dostep-i-uprawnienia.mdx`; Blog `ksef-dla-jdg.mdx`
- **Verbatim:** "Dostęp przez Profil Zaufany, e-dowód lub certyfikat kwalifikowany. Jest bezpłatna i
  nie wymaga instalacji."
- **Confidence:** MEDIUM (internal output only)
- **Ania-relevant:** ✅
- **Pani Krystyna-relevant:** ✅
- **Marek-relevant:** ❌ (Marek works via API, not the UI)

---

**Fact 1.3 — API / system-to-system access uses certificate or token**

- **Fact:** Access to the KSeF API — used by invoicing software, ERP systems, and integrations —
  requires either a **certyfikat KSeF** or a **token uwierzytelniający**. Profil Zaufany and e-dowód
  are NOT available for API access.
- **Source:** FAQ `dostep-i-uprawnienia.mdx`
- **Verbatim:** "Dostęp przez API (dla programów) wymaga certyfikatu lub tokenu."
- **Confidence:** MEDIUM (internal output only; the distinction "API requires cert or token, NOT PZ"
  is stated clearly but no Tier 1–2 citation is available in corpus)
- **Ania-relevant:** ❌ (unless Ania uses software with API integration — her software handles this)
- **Pani Krystyna-relevant:** ✅ (if her biuro integrates via API)
- **Marek-relevant:** ✅ Core technical constraint

---

### 2. Profil Zaufany

---

**Fact 2.1 — Profil Zaufany is free and sufficient for manual KSeF use**

- **Fact:** Profil Zaufany is a free government digital identity that can be set up via internet
  banking, the mObywatel mobile app, ePUAP, or at a government office (urząd). It is the simplest
  and most accessible authentication method for KSeF's Aplikacja Podatnika.
- **Source:** FAQ `dostep-i-uprawnienia.mdx`; Blog `ksef-dla-jdg.mdx`, §"Jak wejść do KSeF"
- **Verbatim:** "Profil Zaufany jest najwygodniejszy dla większości przedsiębiorców — można go
  założyć bezpłatnie przez bankowość elektroniczną lub w urzędzie." / "Profil Zaufany (bezpłatny,
  zakładasz go przez bankowość elektroniczną, mObywatel lub w urzędzie)"
- **Confidence:** MEDIUM (internal output only; the free-of-charge and channel claims are consistent
  across multiple internal sources and align with publicly known facts about Profil Zaufany, but not
  directly confirmed against Tier 1–2 KSeF documentation in this extraction)
- **Ania-relevant:** ✅ Recommended primary path for Ania
- **Pani Krystyna-relevant:** ✅ She logs in to manage delegated access
- **Marek-relevant:** ❌

---

**Fact 2.2 — Profil Zaufany cannot be used for API calls**

- **Fact:** Profil Zaufany enables manual login to the Aplikacja Podatnika web interface. It is not
  usable for automated API calls; those require a token or certificate.
- **Source:** FAQ `dostep-i-uprawnienia.mdx`
- **Verbatim:** "Dostęp przez API (dla programów) wymaga certyfikatu lub tokenu."
- **Confidence:** MEDIUM (internal output only)
- **Ania-relevant:** ✅ (She needs to understand why her invoicing program needs something extra)
- **Pani Krystyna-relevant:** ✅
- **Marek-relevant:** ✅

---

### 3. Pieczęć kwalifikowana (qualified seal for companies)

---

**⚠️ NOT FOUND IN CORPUS — CRITICAL GAP**

- The term **pieczęć kwalifikowana** does not appear in any processed source in this corpus. Our
  internal FAQ and blog files use the term **podpis kwalifikowany** (qualified electronic
  signature), which applies to natural persons. The term pieczęć kwalifikowana refers to the
  qualified electronic seal used by legal entities (spółki, organizations) — a distinct product
  issued by trust service providers.
- **The distinction between "podpis kwalifikowany" (for natural persons) and "pieczęć kwalifikowana"
  (for legal entities/companies) is NOT documented anywhere in our current corpus.**
- **Action required before writing:** The Copywriter must source this distinction from either (a)
  the FAQ MF at https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20, (b) the Podręcznik KSeF
  2.0 (Tier 2, not in corpus), or (c) official trust service provider documentation.
- **Do NOT write about pieczęć kwalifikowana as if it is confirmed — it is a corpus gap.**

---

**Fact 3.1 — "Podpis kwalifikowany" is a paid service for human users (partial coverage)**

- **Fact:** Kwalifikowany podpis elektroniczny (qualified electronic signature) is a paid,
  commercial electronic authentication credential. It can be used to log into KSeF. Cost and
  procurement process are NOT specified in any processed source.
- **Source:** Blog `ksef-od-1-kwietnia-2026.mdx`, §"Krok 3"; FAQ `dostep-i-uprawnienia.mdx`; Blog
  `ksef-dla-jdg.mdx`, §"Jak wejść do KSeF"
- **Verbatim:** "kwalifikowany podpis elektroniczny" (listed without further description); "Możesz
  też użyć e-dowodu lub kwalifikowanego podpisu elektronicznego."
- **Confidence:** MEDIUM (internal output only; no cost or procurement details in corpus)
- **Ania-relevant:** ❌ (expensive overkill for JDG with 2–3 invoices/month; mention briefly)
- **Pani Krystyna-relevant:** ✅ (may already have one; relevant for company clients)
- **Marek-relevant:** ❌

---

### 4. Certyfikat KSeF typ 1 vs typ 2

---

**Fact 4.1 — Certyfikat KSeF is downloaded from the MF system**

- **Fact:** A certyfikat KSeF is an electronic identity credential issued and downloadable from the
  Ministry of Finance system. It allows software and integrators to authenticate to the KSeF API
  without using Profil Zaufany. There are two types: Typ 1 and Typ 2.
- **Source:** FAQ `dostep-i-uprawnienia.mdx`
- **Verbatim:** "Certyfikat KSeF to elektroniczne poświadczenie tożsamości używane do
  uwierzytelniania w API KSeF. Jest pobierany z systemu MF i pozwala programom i integratorom
  logować się do KSeF bez Profilu Zaufanego. Wyróżniamy dwa typy certyfikatów: dla podatnika (typ 1)
  i dla podmiotu upoważnionego (typ 2)."
- **Confidence:** MEDIUM (internal output only)
- **Ania-relevant:** ❌ (unless she builds or manages an API integration)
- **Pani Krystyna-relevant:** ✅
- **Marek-relevant:** ✅

---

**Fact 4.2 — Certyfikat typ 1: for the taxpayer (NIP holder), broadest permissions**

- **Fact:** Certyfikat KSeF typ 1 is issued directly to the taxpayer (the NIP holder). It carries
  the broadest permissions within KSeF. It is the appropriate credential for a company's own
  invoicing system connecting to KSeF under its own identity.
- **Source:** FAQ `dostep-i-uprawnienia.mdx`
- **Verbatim:** "Certyfikat typ 1 jest wydawany bezpośrednio dla podatnika (właściciela NIP) i ma
  najszersze uprawnienia w KSeF."
- **Confidence:** MEDIUM (internal output only)
- **Ania-relevant:** ❌ (overkill for JDG)
- **Pani Krystyna-relevant:** ✅ (relevant for her firm's own setup, not for acting on behalf of
  clients)
- **Marek-relevant:** ✅ (relevant when building an integration for a single taxpayer's own system)

---

**Fact 4.3 — Certyfikat typ 2: for authorized third parties, requires existing ZAW-FA**

- **Fact:** Certyfikat KSeF typ 2 is intended for entities acting on behalf of a taxpayer — such as
  accounting firms (biura rachunkowe) or ERP systems serving multiple clients. Typ 2 always operates
  within the scope of a specific, pre-existing authorization in KSeF. Without a valid authorization
  (e.g., ZAW-FA), typ 2 cannot be used.
- **Source:** FAQ `dostep-i-uprawnienia.mdx`
- **Verbatim:** "Certyfikat typ 2 jest przeznaczony dla podmiotów działających w imieniu podatnika —
  np. biur rachunkowych czy systemów ERP obsługujących wielu klientów. Typ 2 zawsze działa w
  kontekście konkretnego upoważnienia, które musi istnieć w KSeF."
- **Confidence:** MEDIUM (internal output only)
- **Ania-relevant:** ❌
- **Pani Krystyna-relevant:** ✅ Core fact for biuro rachunkowe operators
- **Marek-relevant:** ✅ (when building multi-tenant integrations)

---

**Fact 4.4 — How to obtain a certyfikat KSeF: NOT in corpus**

- The mechanism for obtaining/downloading a KSeF certificate from the MF system is **not described
  in any processed source**. The internal FAQ states it "jest pobierany z systemu MF" but gives no
  steps, no URL, and no prerequisites. The Copywriter must not invent a process description.
- **Action required:** Source from Podręcznik Aplikacji Podatnika KSeF 2.0 (Tier 2, not in corpus)
  or from https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20 before writing this section.

---

### 5. Token uwierzytelniający

---

**Fact 5.1 — Token is a character string generated in Aplikacja Podatnika**

- **Fact:** An authentication token (token uwierzytelniający) is a character string generated
  directly within the Aplikacja Podatnika KSeF. It is used in place of a KSeF certificate for API
  authentication. Tokens do not require managing PKI infrastructure, making them simpler for
  integrators and smaller systems.
- **Source:** FAQ `dostep-i-uprawnienia.mdx`
- **Verbatim:** "Token uwierzytelniający to ciąg znaków generowany w Aplikacji Podatnika KSeF,
  używany zamiast certyfikatu do uwierzytelniania w API. Tokeny są wygodniejsze dla integratorów i
  mniejszych systemów — nie wymagają zarządzania certyfikatami PKI."
- **Confidence:** MEDIUM (internal output only)
- **Ania-relevant:** ❌ (her software handles this; she doesn't generate it herself)
- **Pani Krystyna-relevant:** ✅ (if her biuro uses API integration)
- **Marek-relevant:** ✅ Primary credential type for API integrators

---

**Fact 5.2 — Token has defined validity period and permission scope**

- **Fact:** A KSeF authentication token carries a defined validity period and a defined scope of
  permissions. A token can be revoked at any time from within the Aplikacja Podatnika KSeF.
- **Source:** FAQ `dostep-i-uprawnienia.mdx`
- **Verbatim:** "Token ma określony czas ważności i zakres uprawnień. Można go w każdej chwili
  unieważnić z poziomu Aplikacji Podatnika."
- **Confidence:** MEDIUM (internal output only)
- **Ania-relevant:** ❌
- **Pani Krystyna-relevant:** ✅ (she can issue and revoke tokens for integrations she manages)
- **Marek-relevant:** ✅

---

**Fact 5.3 — Token validity duration: NOT in corpus**

- The specific duration of a token's validity period (e.g., 30 days, 90 days, or indefinite until
  revoked) is **not stated in any processed source**. The internal FAQ only says "określony czas
  ważności" without specifying a number.
- **Action required:** Verify from Podręcznik Aplikacji Podatnika KSeF 2.0 or the MF FAQ before
  writing.
- **⚠️ Freshness flag:** Token lifetimes may be configurable and could change with MF system
  updates.

---

**Fact 5.4 — Token generation process: partially described**

- **Fact:** Tokens are generated from within the Aplikacja Podatnika KSeF. The exact UI path (menu
  name, button label) is **not specified in any processed source**. The internal FAQ confirms the
  location ("z poziomu Aplikacji Podatnika") but not the steps.
- **Source:** FAQ `dostep-i-uprawnienia.mdx`
- **Confidence:** MEDIUM (internal output only; no step-by-step confirmed)
- **Marek-relevant:** ✅ The article should guide Marek here — but must source precise steps before
  writing.

---

### 6. ZAW-FA — authorization form

---

**Fact 6.1 — ZAW-FA is the form for delegating KSeF access to a third party**

- **Fact:** ZAW-FA is a formal authorization form that allows a taxpayer to grant another person or
  entity (e.g., an accountant or biuro rachunkowe) access to KSeF on their behalf. It is submitted
  either at the tax office (urząd skarbowy) or electronically via e-Urząd Skarbowy.
- **Source:** FAQ `dostep-i-uprawnienia.mdx`
- **Verbatim:** "ZAW-FA to formularz upoważnienia do korzystania z KSeF w imieniu podatnika. Składa
  się go w urzędzie skarbowym lub elektronicznie przez e-Urząd Skarbowy i pozwala upoważnić inną
  osobę — np. księgowego lub biuro rachunkowe — do wystawiania i odbierania faktur w KSeF."
- **Confidence:** MEDIUM (internal output only; the existence of ZAW-FA as a form is corroborated by
  general KSeF public knowledge, but formal statutory citation is not confirmed in corpus)
- **Ania-relevant:** ✅ (if she uses a biuro rachunkowe for bookkeeping)
- **Pani Krystyna-relevant:** ✅ Core workflow fact — she requests ZAW-FA from every client
- **Marek-relevant:** ❌

---

**Fact 6.2 — ZAW-FA scope: three levels of access**

- **Fact:** A ZAW-FA authorization can be scoped to one of three permission levels: (1) read-only
  (only viewing received invoices), (2) issuing-only (only sending invoices), or (3) full access
  (issuing and receiving). The scope is specified when filing the form.
- **Source:** FAQ `dostep-i-uprawnienia.mdx`
- **Verbatim:** "Upoważnienie może być ograniczone zakresowo: tylko odczyt, tylko wystawianie lub
  pełny dostęp."
- **Confidence:** MEDIUM (internal output only)
- **Ania-relevant:** ✅ (if authorizing her accountant)
- **Pani Krystyna-relevant:** ✅ She must ensure each client grants her the right scope
- **Marek-relevant:** ❌

---

**Fact 6.3 — ZAW-FA can alternatively be granted inside Aplikacja Podatnika**

- **Fact:** In addition to the paper/e-form route, authorization can be granted directly within the
  Aplikacja Podatnika KSeF through the permissions panel (panel uprawnień), without separately
  submitting the ZAW-FA form to the tax office.
- **Source:** FAQ `dostep-i-uprawnienia.mdx`
- **Verbatim:** "Możesz upoważnić księgowego przez złożenie formularza ZAW-FA w urzędzie skarbowym
  lub bezpośrednio w Aplikacji Podatnika KSeF przez panel uprawnień."
- **Confidence:** MEDIUM (internal output only)
- **Ania-relevant:** ✅ (simpler path for non-tech users)
- **Pani Krystyna-relevant:** ✅

---

**Fact 6.4 — ZAW-FA required before certyfikat typ 2 can be used**

- **Fact:** Certyfikat KSeF typ 2 can only be used if a corresponding authorization (ZAW-FA or
  equivalent panel-granted permission) already exists in KSeF for the subject acting on behalf of
  the taxpayer. Without an existing authorization, typ 2 certificate authentication will fail.
- **Source:** FAQ `dostep-i-uprawnienia.mdx`
- **Verbatim:** "Typ 2 zawsze działa w kontekście konkretnego upoważnienia, które musi istnieć w
  KSeF."
- **Confidence:** MEDIUM (internal output only)
- **Pani Krystyna-relevant:** ✅ She must secure ZAW-FA before deploying API integration for a
  client
- **Marek-relevant:** ✅

---

**Fact 6.5 — Biuro rachunkowe asks clients for ZAW-FA itself**

- **Fact:** Accounting offices typically request the ZAW-FA authorization themselves from their
  clients and coordinate the submission. A JDG client does not need to know the technical details —
  the accountant handles the process.
- **Source:** FAQ `dostep-i-uprawnienia.mdx`
- **Verbatim:** "Biuro rachunkowe zazwyczaj samo prosi klientów o stosowne upoważnienie — dopytaj
  swojego księgowego."
- **Confidence:** MEDIUM (internal output only; describes common practice, not a legal requirement)
- **Ania-relevant:** ✅ (reassuring fact — she doesn't need to figure ZAW-FA out herself)

---

### 7. e-mikrofirma — simplest path

---

**Fact 7.1 — e-mikrofirma is a free MF application for the smallest businesses**

- **Fact:** e-mikrofirma is a free, web-based application provided by the Ministry of Finance for
  the smallest businesses (najmniejsze przedsiębiorstwa). It supports invoice issuance and basic tax
  settlement. It supports KSeF in a limited scope.
- **Source:** FAQ `wystawianie-faktur.mdx`; Blog `ksef-dla-jdg.mdx`
- **Verbatim:** "e-mikrofirma to bezpłatna aplikacja webowa MF dla najmniejszych przedsiębiorców,
  umożliwiająca wystawianie faktur i rozliczanie podatków. Obsługuje KSeF w ograniczonym zakresie i
  jest alternatywą dla komercyjnych programów fakturowych. Sprawdza się u osób wystawiających
  faktury okazjonalnie."
- **Confidence:** MEDIUM (internal output only; "ograniczony zakres" is unspecified)
- **Ania-relevant:** ✅ Potential option for very low-volume JDG

---

**Fact 7.2 — e-mikrofirma handles authentication on behalf of the user: NOT CONFIRMED**

- The article brief requests coverage of e-mikrofirma "handling auth for the user." This claim is
  **not stated in any processed source.** The internal FAQ says the app is suitable for occasional
  invoice issuers and "is an alternative to commercial programs" — it does not specify whether it
  abstracts away authentication or whether the user still needs Profil Zaufany.
- The `wystawianie-faktur.mdx` describes Aplikacja Podatnika as requiring "Profil Zaufany, e-dowód
  lub certyfikat kwalifikowany" for login — but does not make the same explicit statement for
  e-mikrofirma.
- **Action required:** Verify e-mikrofirma's login method from MF official documentation before
  writing. Do NOT assert it "handles auth for you" without a source.

---

### 8. Decision tree — who should use what

---

> ⚠️ **NOTE TO COPYWRITER:** The decision tree below is derived from combining multiple MEDIUM-
> confidence facts. Each node is grounded in our internal corpus, but the "prescriptive" framing
> (telling users what they SHOULD do) is an editorial synthesis, not a direct quote from any MF
> source. Frame the tree as guidance, not as a legal requirement. Add a caveat directing readers to
> the official MF FAQ.

---

**Fact 8.1 — JDG, 2–3 invoices/month, using Aplikacja Podatnika manually → Profil Zaufany**

- **Fact:** For a JDG issuing a small number of invoices manually through the Aplikacja Podatnika
  KSeF web interface, **Profil Zaufany** is the appropriate and simplest authentication method. It
  is free, widely available, and requires no technical setup beyond creating a Profil Zaufany
  account.
- **Source:** FAQ `dostep-i-uprawnienia.mdx`; Blog `ksef-dla-jdg.mdx`, §"Jak wejść do KSeF"
- **Verbatim:** "Profil Zaufany jest najwygodniejszy dla większości przedsiębiorców." / "Dla
  większości JDG Profil Zaufany to najprostsze rozwiązanie."
- **Confidence:** MEDIUM (internal output only; the "simplest" claim is editorial)
- **Ania-relevant:** ✅

---

**Fact 8.2 — JDG using commercial software (Fakturownia, inFakt) → Token managed by software**

- **Fact:** When a JDG uses a commercial invoicing program with a KSeF API integration (e.g.,
  Fakturownia, inFakt), the software handles API authentication — typically via a token generated in
  the Aplikacja Podatnika. The JDG user does not configure the token directly; the software guides
  them through a one-time setup to generate and register the token.
- **Source:** FAQ `dostep-i-uprawnienia.mdx` (token for API integrations); Blog
  `ksef-od-1-kwietnia-2026.mdx`, §"Krok 3" (API requires token)
- **Verbatim:** "Dostęp przez API (dla programów) wymaga certyfikatu lub tokenu."
- **Confidence:** MEDIUM (the "software guides through setup" part is editorial inference — not
  directly stated in any source; the underlying technical fact that API requires token is stated)
- **Ania-relevant:** ✅
- **⚠️ Copywriter caveat:** Do NOT describe a specific software's setup flow. Only the general
  principle (API → token) is confirmed.

---

**Fact 8.3 — Firma (sp. z o.o.) with own invoicing system → Certyfikat KSeF typ 1**

- **Fact:** A company (e.g., sp. z o.o.) integrating its own invoicing system directly with the KSeF
  API under its own NIP identity would use a **certyfikat KSeF typ 1**, which is issued to the
  taxpayer (NIP holder) and carries the broadest permissions. Alternatively, a token generated in
  Aplikacja Podatnika can serve the same purpose for API authentication.
- **Source:** FAQ `dostep-i-uprawnienia.mdx`
- **Verbatim:** "Certyfikat typ 1 jest wydawany bezpośrednio dla podatnika (właściciela NIP) i ma
  najszersze uprawnienia w KSeF."
- **Confidence:** MEDIUM (internal output only; the specific pairing "firma own system → typ 1" is
  editorial synthesis)
- **Pani Krystyna-relevant:** ✅ (relevant for her company clients)
- **Marek-relevant:** ✅

---

**Fact 8.4 — Biuro rachunkowe acting for multiple clients → ZAW-FA per client + Certyfikat typ 2 (or
token)**

- **Fact:** An accounting office acting on behalf of multiple taxpayer clients needs: (1) A valid
  ZAW-FA authorization from each client (or equivalent permission in Aplikacja Podatnika) before
  accessing their KSeF space, and (2) A **certyfikat KSeF typ 2** (or token) for API access, which
  operates within the scope of each client's authorization.
- **Source:** FAQ `dostep-i-uprawnienia.mdx` (cert typ 2 for entities acting on behalf; ZAW-FA
  required for typ 2)
- **Verbatim:** "Certyfikat typ 2 jest przeznaczony dla podmiotów działających w imieniu podatnika —
  np. biur rachunkowych czy systemów ERP obsługujących wielu klientów. Typ 2 zawsze działa w
  kontekście konkretnego upoważnienia, które musi istnieć w KSeF."
- **Confidence:** MEDIUM (internal output only; editorial synthesis of typ 2 + ZAW-FA combination)
- **Pani Krystyna-relevant:** ✅ Core practical workflow

---

**Fact 8.5 — Developer / integrator building system-to-system connection → Token (primary) or
Certyfikat typ 1/2 (advanced)**

- **Fact:** A developer building a KSeF API integration for a client company will typically use a
  **token uwierzytelniający** (generated in Aplikacja Podatnika for the specific taxpayer) as the
  primary credential for testing and for simpler deployments. For production deployments serving
  multiple taxpayers or requiring long-lived credentials, a **certyfikat KSeF** (typ 1 for single-
  taxpayer or typ 2 for multi-client) is the appropriate credential.
- **Source:** FAQ `dostep-i-uprawnienia.mdx` (token: simpler, no PKI; certyfikat: for integrators)
- **Verbatim:** "Tokeny są wygodniejsze dla integratorów i mniejszych systemów — nie wymagają
  zarządzania certyfikatami PKI."
- **Confidence:** MEDIUM (internal output only; the "token for simple, cert for complex" framing is
  editorial synthesis from a single source statement)
- **Marek-relevant:** ✅

---

### 9. Aplikacja Podatnika as the central management tool

---

**Fact 9.1 — Aplikacja Podatnika is the central hub for auth management**

- **Fact:** The **Aplikacja Podatnika KSeF** (ap.ksef.mf.gov.pl) serves as the central interface for
  managing authentication credentials: generating tokens, managing permissions (uprawnienia),
  granting/revoking ZAW-FA-equivalent access, and — by implication — obtaining/downloading
  certificates. It is free and requires no installation.
- **Source:** FAQ `dostep-i-uprawnienia.mdx`; FAQ `wystawianie-faktur.mdx`; Blog `ksef-dla-jdg.mdx`
- **Verbatim:** "To oficjalna aplikacja MF (ap.ksef.mf.gov.pl) do zarządzania fakturami w KSeF.
  Pozwala wystawiać faktury ręcznie przez formularz, przesyłać gotowe pliki XML, przeglądać faktury
  otrzymane i zarządzać uprawnieniami. Dostęp przez Profil Zaufany, e-dowód lub certyfikat
  kwalifikowany."
- **Confidence:** MEDIUM (internal output only; certificate download from Aplikacja Podatnika is
  implied but not explicitly confirmed in corpus)
- **Ania-relevant:** ✅
- **Pani Krystyna-relevant:** ✅
- **Marek-relevant:** ✅

---

## Unsettled Questions

The Copywriter **must not** answer these definitively — sources are unclear or absent:

1. **Pieczęć kwalifikowana vs podpis kwalifikowany:** Our corpus uses only "podpis kwalifikowany"
   throughout. The article topic names "pieczęć kwalifikowana" as a method for companies. This
   distinction (natural person signature vs. legal entity seal) is standard in Polish e-signature
   law (eIDAS Regulation, Art. 3(26/27)), but is NOT confirmed as a KSeF-specific authentication
   method in any processed source. Must verify from Tier 2 sources before publishing.

2. **Token validity duration:** How long does a KSeF authentication token remain valid by default?
   Is it configurable? Not stated anywhere in corpus. Copywriter should not invent a number.

3. **Certificate download process:** What are the exact steps to obtain/download a certyfikat KSeF
   from the MF system? Not described in any processed source.

4. **e-mikrofirma authentication method:** Does e-mikrofirma require the user to authenticate with
   Profil Zaufany, or does it use a separate mechanism? Not specified in corpus.

5. **Samofakturowanie and authorization:** The `wystawianie-faktur.mdx` FAQ mentions that
   samofakturowanie requires the seller to authorize the buyer in KSeF with "specjalne uprawnienia"
   — but the specific permission type or ZAW-FA variant is not described.

6. **Can a JDG generate a typ 1 certificate? Or is it only for companies?** Our corpus does not
   specify whether natural persons (JDG) can hold a certyfikat typ 1 or whether it is exclusively
   for legal entities (spółki). The FAQ says it is for "the taxpayer (NIP holder)" — which would
   include JDG — but the article should not assert this without confirmation.

---

## Suggested Sources Section

For the article's "Źródła" footer (link to these, do not quote as if processed):

- FAQ MF — KSeF 2.0: https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20 _(Authoritative for
  auth methods, certificates, tokens — must cross-check against this_)
- Aplikacja Podatnika KSeF (official tool for all auth management): https://ap.ksef.mf.gov.pl/
- Ustawa o VAT — art. 106nd, 145e, 145m (Dz. U. z 2025 r., poz. 775 ze zm.):
  https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20250000775
- e-Urząd Skarbowy (for electronic ZAW-FA submission): https://www.podatki.gov.pl/e-urzad-skarbowy/

---

## Warning: Common Misconceptions to Avoid

1. **"Profil Zaufany can be used for API/software access"** — WRONG. The corpus explicitly states
   that API access requires a certificate or token, not PZ. A user may confuse logging into
   Aplikacja Podatnika with their invoicing software's API access. These are different.

2. **"You need to buy a qualified signature to use KSeF"** — WRONG for most users. Profil Zaufany is
   free and sufficient for manual use via Aplikacja Podatnika. Only API-integrated software needs a
   token/certificate. Do not imply a cost barrier where none exists for basic usage.

3. **"Token and certificate are the same thing"** — WRONG. Token: simpler, generated in Aplikacja
   Podatnika, no PKI management. Certificate: downloaded from MF system, involves PKI. Different use
   cases and complexity levels.

4. **"Certyfikat typ 2 gives you access to any client's KSeF"** — WRONG. Typ 2 requires an existing
   authorization (ZAW-FA) for each specific client. Without client-specific ZAW-FA, typ 2 grants no
   access. This is a critical practical point for biuro rachunkowe operators.

5. **"ZAW-FA is only submitted on paper at a tax office"** — WRONG. It can also be submitted
   electronically via e-Urząd Skarbowy and granted directly within Aplikacja Podatnika.

6. **"pieczęć kwalifikowana" as a confirmed KSeF authentication method** — NOT CONFIRMED in our
   corpus. Do not assert this without verifying from Tier 2 sources.

---

## Freshness Markers

- All authentication method details are tied to KSeF 2.0 as deployed from **1 February 2026**. Any
  significant API or auth infrastructure changes by MF would require re-verification.
- Token validity periods, if stated in the article after external verification, should be flagged as
  subject to change by MF.
- ZAW-FA form availability and submission channels (paper vs. e-Urząd Skarbowy vs. in-app) may
  evolve as the system matures. Review if MF announces changes to the permissions panel.
- **⚠️ Review trigger:** Any MF announcement about KSeF API version changes, new authentication
  methods, or modifications to the Aplikacja Podatnika feature set.
