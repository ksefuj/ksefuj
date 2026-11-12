# Research Brief: Samofakturowanie w KSeF

**Requested by:** Orchestrator (content backlog item `samofakturowanie-ksef`,
`docs/content-backlog.md` l. 107: „Samofakturowanie w KSeF · „samofakturowanie KSeF" · K · FAQ, P3")
**Date:** 2026-11-12 **For content:** PL post „Samofakturowanie w KSeF" **Personas:** K = Pani
Krystyna (księgowa, obsługuje klientów, którzy wystawiają lub dostają faktury w samofakturowaniu); A
= Ania (JDG, freelancerka, której nabywca sam wystawia faktury: platforma, wydawnictwo, skup)

**Provenance (read before using any fact):**

- **Fetched live 2026-11-12** from `raw.githubusercontent.com/CIRFMF/ksef-api/main/` (the official
  MF integrator docs; cited below in the canonical form
  `https://github.com/CIRFMF/ksef-api/blob/main/<path>`): `README.md` (dated 05.05.2026),
  `uprawnienia.md` (header 10.07.2025; identical to the copy saved earlier in the session
  scratchpad), `uwierzytelnianie.md`, `auth/context-identifier-nip-vat-ue.md`, `kody-qr.md`,
  `tryby-offline.md`, `offline/korekta-techniczna.md`, `faktury/weryfikacja-faktury.md`
  (09.04.2026), `pobieranie-faktur/pobieranie-faktur.md`,
  `pobieranie-faktur/przyrostowe-pobieranie-faktur.md`, `przeglad-kluczowych-zmian-ksef-api-2-0.md`,
  `api-changelog.md`, and `open-api.json` (title „KSeF API TE", „Wersja API: 2.9.0 (build
  2.9.0-te)", i.e. the TEST environment spec). `offline/tryby-offline.md` returned 404 (the file
  sits at the repo root as `tryby-offline.md`).
- **Read from the repo (official files, not fetched live):** FA(3) XSD
  `packages/validator/src/schemas/schemat.xsd` (namespace
  `http://crd.gov.pl/wzor/2025/06/25/13775/`) and the FA(3) information sheet conversion
  `packages/validator/docs/fa3-information-sheet.md`.
- **From the KB (baseline verified per `WATCHLIST.md`, 2026-10-07, or re-read live in the cited
  brief):** Podręcznik KSeF 2.0 cz. II (06.08.2026) via `nota-korygujaca-ksef.md` (live pass
  2026-10-16); AP manual (06.08.2026) via `aplikacja-podatnika-ksef-pierwsza-faktura.md`; mobile app
  manual (29.10.2026, live 2026-11-11) via `aplikacja-mobilna-ksef.md`; art. 145m via
  `pusta-faktura-pdf-xml.md` H7 (live 2026-10-16).
- **Blocked:** ksef.podatki.gov.pl, isap.sejm.gov.pl, api.sejm.gov.pl (probed 2026-11-12:
  `CONNECT tunnel failed, response 403`), api-test.ksef.mf.gov.pl (probed: proxy
  `connect_rejected`), gov.pl, crd.gov.pl, legislacja.rcl.gov.pl. **Nothing in this brief comes from
  Podręcznik KSeF 2.0 cz. III**, which is where MF describes self-billing (see section 5).

**Target query:** „samofakturowanie KSeF"

## Answer in two sentences

Przy samofakturowaniu fakturę za sprzedawcę wystawia i wysyła do KSeF nabywca, we własnym kontekście
(pod swoim NIP-em), po tym, jak sprzedawca (właściciel albo osoba z `CredentialsManage`) nada mu w
KSeF uprawnienie podmiotowe `SelfInvoicing` (CIRFMF `uprawnienia.md`, „Nadanie uprawnień
podmiotowych"); w XML sprzedawca zostaje w `Podmiot1`, nabywca w `Podmiot2`, a `Adnotacje/P_17` =
„1" („samofakturowanie", faktury z art. 106d ust. 1), bez `Podmiot3` z rolą 5 (XSD FA(3), opis
`P_17` i `TRolaPodmiotu3`). KSeF oznacza taką fakturę w metadanych flagą `isSelfInvoicing`, a
sprzedawca może odebrać uprawnienie ze skutkiem natychmiastowym (`open-api.json`; `uprawnienia.md`,
„Odebranie uprawnień podmiotowych"); kto koryguje taką fakturę i jak sprzedawca ją akceptuje, żadne
przeczytane źródło nie rozstrzyga.

## What changes the answer

- **Nabywca polski czy unijny.** Polski nabywca dostaje `SelfInvoicing` na swój NIP (fact 7).
  Nabywca z UE działa w kontekście złożonym `NipVatUe` (NIP sprzedawcy + VAT UE nabywcy), który
  powstaje, gdy sprzedawca nada administratora podmiotu unijnego (facts 13–17).
- **Faktura VAT RR (rolnik ryczałtowy).** Osobne uprawnienie `RRInvoicing` i osobna struktura FA_RR,
  poza zakresem tego briefu (fact 22).
- **Tryb offline.** Ogólne zasady offline (KOD I + KOD II) obowiązują; KOD II zawiera kontekst
  nabywcy i NIP sprzedawcy, a KSeF sprawdza, czy kontekst ma prawo wystawiać za ten NIP (fact 19).
  Korekta techniczna nie naprawia odrzucenia z powodu braku uprawnień (fact 20).
- **Art. 145m (10 000 zł, do 31.12.2026).** Brzmienie mówi o sprzedaży „udokumentowanej tymi
  fakturami wystawionymi" u podatnika; nie wiadomo, czy faktury wystawione przez nabywcę liczą się
  do limitu sprzedawcy i czy nabywca może z niego korzystać (open question 3). Przepis wygasa za 7
  tygodni.
- **Warunki ustawowe samofakturowania (art. 106d ust. 1 i art. 106e ust. 1 pkt 17):** NOT FETCHED
  LIVE, no verbatim in the KB. Treść warunków (nabywca-podatnik, wcześniejsze uzgodnienie, procedura
  zatwierdzania przez sprzedawcę) musi sprawdzić człowiek (section 6).

## Key Facts

Legend. **Tier:** 1 law, 2 MF technical documentation, 3 MF guidance. **Live:** yes = fetched from
the network on 2026-11-12; repo = official file bundled in this repo, read locally; KB = taken from
the named KB brief, with the date its source was last read live or the WATCHLIST baseline. Persona:
K / A.

| #   | Fact                                                                                                                                                                                                                                                                                                                                                                                                                                              | Source (page / section)                                                                                                                                                                                                                                                               | Tier  | Confidence                                                                                                                                                          | Live                             |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| 1   | `Adnotacje/P_17` is mandatory, type `TWybor1_2`: „1" marks an invoice „o których mowa w art. 106d ust. 1 ustawy" (the word „samofakturowanie"), otherwise „2". K, A                                                                                                                                                                                                                                                                               | XSD FA(3) `schemat.xsd`, element `Fa/Adnotacje/P_17` (verbatim V1)                                                                                                                                                                                                                    | 2     | HIGH                                                                                                                                                                | repo                             |
| 2   | `Podmiot3` role „5" (Wystawca faktury) is for an entity issuing the invoice on behalf of the taxpayer and explicitly does not apply when the issuer is the buyer. K                                                                                                                                                                                                                                                                               | XSD `TRolaPodmiotu3`, enumeration „5" (verbatim V2)                                                                                                                                                                                                                                   | 2     | HIGH                                                                                                                                                                | repo                             |
| 3   | Self-billing in FA(3): `P_17` = „1", buyer data in `Podmiot2`, buyer NOT in `Podmiot3` with `Rola` = „5". K                                                                                                                                                                                                                                                                                                                                       | FA(3) information sheet (repo conversion) §7.3 „CRITICAL RULE — Self-billing", §9.6 `P_17`, Appendix D rule 7                                                                                                                                                                         | 2     | HIGH                                                                                                                                                                | repo                             |
| 4   | `PodmiotUpowazniony` covers enforcement bodies, bailiffs (art. 106c) and the tax representative (`RolaPU` 1–3); self-billing is not among its roles. The sheet cites art. 106d ust. 2 for invoices „issued by a third party authorised by the taxpayer". K                                                                                                                                                                                        | FA(3) sheet §8.1–8.2; `open-api.json` `InvoiceMetadataAuthorizedSubject.role` (values 1–3)                                                                                                                                                                                            | 2     | HIGH (roles) / MEDIUM (that ust. 2 is the third-party rule: repo conversion, not checked against the statute)                                                       | repo + yes                       |
| 5   | Seller side stays `Podmiot1`: KSeF checks whether the login context „ma prawo do wystawiania faktury dla danego NIP-u sprzedawcy (`Podmiot1` faktury)", listing „samofakturowania (`SelfInvoicing`)". In the example the issuer's context (1111111111) differs from the seller NIP (3333333333), „możliwa, gdy podmiot A posiada nadane uprawnienia wystawiania faktur w imieniu podmiotu B np. przedstawiciel podatkowy, samofakturowanie". K    | CIRFMF `kody-qr.md` (21.08.2025), KOD II verification step 4 and „Przykład 3"                                                                                                                                                                                                         | 2     | HIGH                                                                                                                                                                | yes                              |
| 6   | `SelfInvoicing` is a „podmiotowe" permission (with `RRInvoicing`, `TaxRepresentative`): „Upoważnienie innych podmiotów do działania (wystawiania faktur) we własnym kontekście w imieniu podmiotu uprawniającego". It cannot be granted indirectly. K, A                                                                                                                                                                                          | CIRFMF `uprawnienia.md`, „Klasyfikacja uprawnień według rodzaju" (table row „Podmiotowe", column „Możliwość nadania w sposób pośredni" = ❌)                                                                                                                                          | 2     | HIGH                                                                                                                                                                | yes                              |
| 7   | Grant: POST `/permissions/authorizations/grants`; only the owner or an administrator with `CredentialsManage` can grant it; the grantee is identified only by `Nip`. K                                                                                                                                                                                                                                                                            | `uprawnienia.md`, „Nadanie uprawnień podmiotowych" (verbatim V3); „Role lub uprawnienia wymagane do nadawania uprawnień" row „podmiotowych" = `Owner` lub `CredentialsManage`; `open-api.json` POST `/permissions/authorizations/grants`: „Wymagane uprawnienie: `CredentialsManage`" | 2     | HIGH                                                                                                                                                                | yes                              |
| 8   | KSeF checks these permissions when the issuer sends invoice files: „Weryfikowana jest zależność pomiędzy podmiotem, a danymi na fakturach. Mogą być zmieniane w trakcie sesji." K                                                                                                                                                                                                                                                                 | `uprawnienia.md`, „Nadanie uprawnień podmiotowych", „Charakter uprawnień"                                                                                                                                                                                                             | 2     | HIGH                                                                                                                                                                | yes                              |
| 9   | Who sends: the authorised buyer, in its own context (it is „uprawniony do samofakturowania" and acts „w swoim kontekście w imieniu podmiotu uprawniającego"). K, A                                                                                                                                                                                                                                                                                | `uprawnienia.md`, „Struktura nadanych uprawnień" pkt 3 (verbatim V4)                                                                                                                                                                                                                  | 2     | HIGH                                                                                                                                                                | yes                              |
| 10  | Revocation: separate endpoint DELETE `/permissions/authorizations/grants/{permissionId}`; „Tego typu uprawnienia nie są przekazywalne, więc ich odebranie ma natychmiastowy skutek i kończy możliwość realizacji operacji fakturowych w danym trybie." Requires `CredentialsManage`. K, A                                                                                                                                                         | `uprawnienia.md`, „Odebranie uprawnień podmiotowych"; `open-api.json` DELETE same path                                                                                                                                                                                                | 2     | HIGH                                                                                                                                                                | yes                              |
| 11  | Granted permissions stay active until revoked; any time limit must be implemented on the client side. K                                                                                                                                                                                                                                                                                                                                           | `uprawnienia.md`, „Ograniczenia czasowe"                                                                                                                                                                                                                                              | 2     | HIGH                                                                                                                                                                | yes                              |
| 12  | Both sides can list these permissions: POST `/permissions/query/authorizations/grants` with `queryType` `Granted` / `Received`, filter `permissionTypes` incl. `SelfInvoicing`; OpenAPI: „SelfInvoicing – wystawianie faktur w trybie samofakturowania". K                                                                                                                                                                                        | `uprawnienia.md`, „Pobranie listy uprawnień podmiotowych do obsługi faktur"; `open-api.json` same path                                                                                                                                                                                | 2     | HIGH                                                                                                                                                                | yes                              |
| 13  | EU entities: KSeF 2.0 added a permission type and login in a context „określonym przez podmiot polski (identyfikowany przez NIP) oraz podmiot z kraju UE identyfikowany numerem VAT", in which authenticated representatives of the EU entity issue invoices „w trybie samofakturowania w imieniu wskazanego podmiotu polskiego". K                                                                                                               | CIRFMF `przeglad-kluczowych-zmian-ksef-api-2-0.md` (09.06.2025), section on permissions                                                                                                                                                                                               | 2     | HIGH                                                                                                                                                                | yes                              |
| 14  | `NipVatUe` = compound identifier: Polish NIP + EU VAT number, separated (`{nip}-{vat_ue}`); example `5265877635-ATU12345678`. It is one of the `ContextIdentifier` types for authentication (NIP, InternalId, „identyfikator złożony VAT UE"). K                                                                                                                                                                                                  | `uprawnienia.md`, Słowniczek „NipVatUe"; `auth/context-identifier-nip-vat-ue.md`; `uwierzytelnianie.md`, AuthTokenRequest table                                                                                                                                                       | 2     | HIGH                                                                                                                                                                | yes                              |
| 15  | The Polish entity (owner or `CredentialsManage`) grants „administrator podmiotu unijnego" via POST `/permissions/eu-entities/administration/grants`; this creates the compound context and lets the admin issue invoices and manage EU-entity representatives. OpenAPI: admin rights include `VatEuManage` [sic], `InvoiceWrite`, `InvoiceRead`, `Introspection`, granted automatically; the request includes the EU entity's name and address. K | `uprawnienia.md`, „Nadanie uprawnień administratora podmiotu unijnego" (verbatim V5); „Role lub uprawnienia wymagane…" row „administratorowi podmiotu unijnego" = `Owner` lub `CredentialsManage`; `open-api.json` same path                                                          | 2     | HIGH                                                                                                                                                                | yes                              |
| 16  | EU-entity representatives (`InvoiceWrite` / `InvoiceRead`) are granted only by the EU-entity administrator (`VatUeManage`), identified by qualified-certificate fingerprint. The owner role covers everything „poza `VatUeManage`". K                                                                                                                                                                                                             | `uprawnienia.md`, „Nadanie uprawnień reprezentanta podmiotu unijnego", role table (Właściciel); `open-api.json` POST `/permissions/eu-entities/grants`: „Wymagane uprawnienie: `VatUeManage`"                                                                                         | 2     | HIGH                                                                                                                                                                | yes                              |
| 17  | In the Aplikacja Podatnika the login context can be NIP, internal identifier or „compound identifier (self-billing VAT-UE)". K                                                                                                                                                                                                                                                                                                                    | KB `aplikacja-podatnika-ksef-pierwsza-faktura.md` fact 5, citing AP manual (06.08.2026) pkt 4.1 (paraphrase, no verbatim)                                                                                                                                                             | 2     | MEDIUM (KB paraphrase)                                                                                                                                              | KB (baseline 2026-10-07)         |
| 18  | What the seller sees: invoice metadata always carries `isSelfInvoicing` („Czy faktura została wystawiona w trybie samofakturowania"), and invoice searches can filter on it. Searches require a `subjectType`: `Subject1` „Podmiot 1 - sprzedawca", `Subject2` nabywca, `Subject3`, `SubjectAuthorized`. K                                                                                                                                        | `open-api.json` (TE, 2.9.0) schemas `InvoiceMetadata` (field in `required`), `InvoiceQueryFilters`, `InvoiceQuerySubjectType`                                                                                                                                                         | 2     | HIGH (flag and filter) / MEDIUM (that the seller finds the invoice under `Subject1`: follows from „Podmiot 1 - sprzedawca", no sentence on self-billing visibility) | yes                              |
| 19  | Offline: KOD II link includes the context identifier type („Nip", „InternalId", „NipVatUe", „PeppolId") and value, the seller NIP and the issuer's KSeF certificate serial; verification checks the certificate holder has active rights in the context and that the context may issue for the seller NIP (self-billing listed). K                                                                                                                | `kody-qr.md`, KOD II „Generowanie linku" and verification steps 3–4                                                                                                                                                                                                                   | 2     | HIGH                                                                                                                                                                | yes                              |
| 20  | Korekta techniczna (resend of an offline invoice rejected for technical reasons) „nie dotyczy sytuacji związanych z brakiem uprawnień podmiotów występujących na fakturze (np. samofakturowanie, walidacja relacji dla JST lub grup VAT)". K                                                                                                                                                                                                      | `offline/korekta-techniczna.md` (20.08.2025), „Uwaga" pkt 1                                                                                                                                                                                                                           | 2     | HIGH                                                                                                                                                                | yes                              |
| 21  | Numbering: duplicates are detected by seller NIP (`Podmiot1:NIP`) + `RodzajFaktury` + `P_2` (error 440); where different units or „inne uprawnione podmioty" issue for the same entity, „muszą one uzgodnić zasady numeracji, aby uniknąć duplikatów". K, A                                                                                                                                                                                       | `faktury/weryfikacja-faktury.md` (09.04.2026), „Unikalność faktury"                                                                                                                                                                                                                   | 2     | HIGH (rule) / MEDIUM (applying „inne uprawnione podmioty" to a self-billing buyer: the doc does not name self-billing)                                              | yes                              |
| 22  | Pointer only: `RRInvoicing` = „samofakturowanie RR" / „wystawianie faktur VAT RR", same grant and revoke endpoints as `SelfInvoicing`; invoice types `VatRr`, `KorVatRr` belong to the FA_RR structure. Not researched further. K                                                                                                                                                                                                                 | `uprawnienia.md`, „Nadanie uprawnień podmiotowych", „Odebranie uprawnień podmiotowych"; `open-api.json` `InvoiceType`                                                                                                                                                                 | 2     | HIGH                                                                                                                                                                | yes                              |
| 23  | Podręcznik cz. II does not describe self-billing: pkt 2.12 „Faktura wystawiona w procedurze samofakturowania" says only „Opisane w cz. III Podręcznika KSeF 2.0"; the 06.08.2026 edition refers it to cz. III in pkt 1.6 and 2.12. K                                                                                                                                                                                                              | KB `podrecznik-ksef-20-czesc-ii.md` §2.12; `nota-korygujaca-ksef.md` live pass (cz. II 06.08.2026)                                                                                                                                                                                    | 2     | HIGH                                                                                                                                                                | KB (live 2026-10-16)             |
| 24  | cz. II pkt 1.6 (s. 17): „Fakturę wystawić może zarówno sam podatnik, osoba fizyczna przez niego uprawniona lub podmiot uprawniony przez podatnika do wystawiania faktur." K, A                                                                                                                                                                                                                                                                    | KB `nota-korygujaca-ksef.md`, live verification block                                                                                                                                                                                                                                 | 2     | HIGH                                                                                                                                                                | KB (live 2026-10-16)             |
| 25  | Corrections in general: cz. II pkt 1.6.2 (s. 18): the only way to correct is „faktura korygującą wystawiona przez podatnika – wystawcę faktury pierwotnej"; noty korygujące ended 1.02.2026 (art. 106k repealed). How this applies when the original issuer was the buyer is not stated. K, A                                                                                                                                                     | KB `nota-korygujaca-ksef.md` (live 2026-10-16), facts 1–3                                                                                                                                                                                                                             | 1 + 2 | HIGH (general rule) / NOT SETTLED for self-billing                                                                                                                  | KB (live 2026-10-16)             |
| 26  | cz. II pkt 6.3 (s. 97–98): „KSeF nie posiada opcji zatwierdzania lub odrzucania faktur po otrzymaniu ich przez nabywcę." This concerns the buyer receiving an invoice; no fetched source describes a KSeF step in which the seller approves a self-billed invoice. K                                                                                                                                                                              | KB `nota-korygujaca-ksef.md`, live verification block                                                                                                                                                                                                                                 | 2     | HIGH (quote) / NOT SETTLED (seller approval)                                                                                                                        | KB (live 2026-10-16)             |
| 27  | Art. 145m ust. 1 (1.04–31.12.2026): taxpayers „mogą wystawiać faktury elektroniczne lub faktury w postaci papierowej, jeżeli łączna wartość sprzedaży wraz z kwotą podatku u tych podatników udokumentowana tymi fakturami wystawionymi w danym miesiącu jest mniejsza lub równa 10 000 zł". Self-billing is not mentioned. K, A                                                                                                                  | KB `pusta-faktura-pdf-xml.md` H7 (Dz.U. 2026 poz. 1263, s. 193)                                                                                                                                                                                                                       | 1     | HIGH (wording) / NOT SETTLED (self-billing)                                                                                                                         | KB (live 2026-10-16)             |
| 28  | In the Aplikacja Mobilna KSeF invoice list, the tab „Zakupowe" covers invoices received as buyer „or via self-billing" (KB paraphrase of pkt 6.9.1). K                                                                                                                                                                                                                                                                                            | KB `aplikacja-mobilna-ksef.md` („Receiving", mobile manual pkt 6.9.1)                                                                                                                                                                                                                 | 2     | MEDIUM (KB paraphrase; unclear from which side)                                                                                                                     | KB (manual read live 2026-11-11) |
| 29  | Incremental download should iterate every subject type („Podmiot 1, Podmiot 2, Podmiot 3, Podmiot upoważniony"), since „firma może występować w różnych rolach na fakturach". K (for software/biuro sync)                                                                                                                                                                                                                                         | `pobieranie-faktur/przyrostowe-pobieranie-faktur.md` (21.11.2025), „Synchronizacja w oknach czasowych"                                                                                                                                                                                | 2     | HIGH                                                                                                                                                                | yes                              |

### Verbatim quotes (Polish)

- **V1 (XSD, `P_17`):** „W przypadku faktur, o których mowa w art. 106d ust. 1 ustawy - wyraz
  "samofakturowanie"; należy podać wartość "1", w przeciwnym przypadku - wartość "2""
- **V2 (XSD, `TRolaPodmiotu3` value 5):** „Wystawca faktury - w przypadku gdy na fakturze występują
  dane podmiotu wystawiającego fakturę w imieniu podatnika. Nie dotyczy przypadku, gdy wystawcą
  faktury jest nabywca"
- **V3 (`uprawnienia.md`, „Nadanie uprawnień podmiotowych"):** „Te uprawnienia mogą być nadawane
  wyłącznie przez właściciela lub administratora posiadającego `CredentialsManage`." Table:
  `subjectIdentifier` „Identyfikator podmiotu. `"Nip"`".
- **V4 (`uprawnienia.md`, „Struktura nadanych uprawnień" pkt 3):** „Innym podmiotom do działania w
  swoim kontekście w imieniu podmiotu uprawniającego (uprawnienia podmiotowe): (…) podmiotom
  uprawnionym do samofakturowania, podmiotom uprawnionym do wystawiania faktur VAT RR."
- **V5 (`uprawnienia.md`, „Nadanie uprawnień administratora podmiotu unijnego"):** „Wykonanie tej
  operacji powoduje, że uprawniona w ten sposób osoba uzyskuje możliwość logowania się w kontekście
  złożonym: `NipVatUe`, wiążącym podmiot polski nadający uprawnienie z podmiotem unijnym mającym
  prawo do samofakturowania."

### Notes for the Copywriter

- „Ustawa mówi" vs „MF opisuje": only the XSD reference to art. 106d ust. 1 (fact 1) and art. 145m
  (fact 27) touch the statute. Everything about permissions is MF technical documentation (API
  docs), not law, and describes the API. The AP / mobile screens are covered only by facts 17
  and 28.
- API docs are written for integrators. For Ania, translate: „sprzedawca nadaje nabywcy w KSeF
  uprawnienie do samofakturowania" and „może je w każdej chwili odebrać"; avoid endpoint names above
  the fold.
- The ksefuj validator flags `P_17` = 1 combined with `Podmiot3/Rola` = 5 (rule
  `SELF_BILLING_PODMIOT3_CONFLICT`, based on fact 3). Product note, not a source.

## Contradictions & Ambiguities

1. **EU-entity administrator: which permission.** `uprawnienia.md` Słowniczek: „Administrator
   podmiotu unijnego: Osoba z uprawnieniami do zarządzania uprawnieniami (`CredentialsManage`) w
   kontekście złożonym identyfikowanym za pomocą NipVatUe". Same file, role table: possible
   permissions `InvoiceWrite`, `InvoiceRead`, `VatUeManage`, `Introspection`. `open-api.json` lists
   `VatEuManage` in the description and requires `VatUeManage` for granting representatives. Same
   tier; the role table and OpenAPI agree with each other.
2. **EU-entity administrator: how identified.** `uprawnienia.md` (admin grant table):
   `subjectIdentifier` `"Nip"`, `"Pesel"`, `"Fingerprint"`. `open-api.json` POST
   `/permissions/eu-entities/administration/grants`: „Jedynym sposobem identyfikacji uprawnianego
   jest odcisk palca certyfikatu kwalifikowanego". The OpenAPI (2.9.0) is the newer and more
   specific source; not resolved here.
3. **Grant example vs table.** `uprawnienia.md` „Nadanie uprawnień podmiotowych": the table says
   `subjectIdentifier` „`"Nip"`" and permissions `SelfInvoicing`, `RRInvoicing`,
   `TaxRepresentative`; the C# example below it grants `PefInvoicing` to a `PeppolId`. OpenAPI enum
   `EntityAuthorizationPermissionType` contains all four. The example is not about self-billing.
4. **„wystawca faktury pierwotnej" (cz. II pkt 1.6.2)** in a self-billing setting: the seller is the
   taxpayer, the buyer is the issuer. The phrase „podatnika – wystawcę faktury pierwotnej" does not
   say which one corrects. Documented ambiguity; see open question 1.
5. **Document dates.** `uprawnienia.md` and `uwierzytelnianie.md` carry the header date 10.07.2025
   while the repo README is dated 05.05.2026 and the OpenAPI is 2.9.0; the files may have been
   edited without a header change. Facts above match between `uprawnienia.md` and the OpenAPI except
   items 1–2.

## Open Questions (do not answer definitively)

1. **Who issues the corrective invoice for a self-billed invoice** (buyer under `SelfInvoicing`, or
   seller)? Not in any fetched source; cz. III not read. Stays NOT SETTLED, consistent with
   `nota-korygujaca-ksef.md` and `usuniecie-faktury-ksef.md`.
2. **Seller's approval procedure (art. 106d ust. 1):** whether granting `SelfInvoicing` in KSeF
   counts as, replaces or is separate from the statutory „procedura zatwierdzania"; whether KSeF has
   any approve/reject step for the seller. Not stated (fact 26 covers only buyers).
3. **Art. 145m and self-billing:** do buyer-issued invoices count toward the seller's 10 000 zł
   monthly total, and may the buyer issue them outside KSeF under the seller's limit? Statute
   wording (fact 27) does not address it; no MF answer in the KB. Moot after 31.12.2026.
4. **Offline24 by a self-billing buyer:** the API docs give no self-billing exception to offline
   modes (facts 19–20), but no source says explicitly that the buyer may use offline24 for invoices
   issued on behalf of the seller.
5. **EU buyer: is `SelfInvoicing` also needed**, or is the EU-entity administrator grant (compound
   context) the whole mechanism? `uprawnienia.md` describes only the latter for EU entities; the
   `SelfInvoicing` grant accepts only `Nip`.
6. **What the seller sees in the AP / e-mikrofirma** (tab, label): the API flag is documented (fact
   18); the AP manual pages on received/issued lists for self-billing are not extracted.
7. **FAQ MF „Wystawianie i otrzymywanie faktur" pyt. 25** is recorded in the KB only as „is about
   self-billing" (`pusta-faktura-pdf-xml.md` l. 306). Its text is not in the KB and the FAQ host is
   blocked; do not cite its content.
8. **Rejection codes:** which error KSeF returns when the buyer lacks `SelfInvoicing` (fact 8 says
   it is checked) is not found in the fetched docs.
9. **Existing FAQ wording** (`apps/web/content/pl/faq/wystawianie-faktur.mdx`, „Co to jest
   samofakturowanie w KSeF?"): „sprzedawca musi upoważnić nabywcę do wystawiania faktur w swoim
   imieniu" is consistent with facts 6–9; „na podstawie wcześniejszego porozumienia" rests on art.
   106d, not verified here (section 6). `certyfikaty-tokeny.md` open question 5 (which permission)
   is answered by facts 6–7: `SelfInvoicing`, granted electronically; no ZAW-FA variant for it
   appears in the fetched sources.

## Not fetched live (URLs and legal provisions)

- **Ustawa o VAT art. 106d ust. 1** (self-billing conditions) and **art. 106e ust. 1 pkt 17** (the
  word „samofakturowanie" on the invoice): no verbatim anywhere in `docs/knowledge-base/` or
  `apps/web/content/`. Only indirect reference: XSD `P_17` (V1) cites „art. 106d ust. 1" and the
  word „samofakturowanie"; it does not cite pkt 17. Consolidated text as recorded in the KB: Dz.U.
  2026 poz. 1263, https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260001263 and
  https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf (both blocked 2026-11-12). **Wording to be
  checked by a human** before the post states the conditions (buyer who is a taxpayer, prior
  agreement, approval procedure) or the pkt 17 link.
- **Art. 106d ust. 2** (third-party issuing): only the repo FA(3) sheet §8.1 mentions it (fact 4).
- **Art. 145m:** KB verbatim from the 2026-10-16 live read (fact 27), not re-fetched.
- **Podręcznik KSeF 2.0 cz. III** (06.08.2026),
  https://ksef.podatki.gov.pl/media/3ikdk3qm/podrecznik-ksef-20-cz-iii-dodatkowe-funkcjonalnosci-ksef-06082026.pdf:
  never extracted, blocked. Nothing here is attributed to it.
- **Podręcznik KSeF 2.0 cz. II** (06.08.2026), **AP manual** (06.08.2026), **mobile app manual**
  (29.10.2026): used via KB briefs only (facts 17, 23–26, 28).
- **FAQ MF** https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20 (incl. „Wystawianie i
  otrzymywanie faktur" pyt. 25): blocked.
- **FA(3) information sheet** (PL:
  https://ksef.podatki.gov.pl/media/nuclnu0w/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf)
  and **XSD** https://crd.gov.pl/wzor/2025/06/25/13775/schemat.xsd: read from the repo copies only.
- **OpenAPI on the MF host** https://api-test.ksef.mf.gov.pl/docs/v2: blocked; the GitHub copy
  `open-api.json` (TE 2.9.0) was used. PROD may differ.
- `https://raw.githubusercontent.com/CIRFMF/ksef-api/main/offline/tryby-offline.md`: 404 (not a
  source; the root `tryby-offline.md` was fetched).

## Suggested Sources Section

- Ustawa o VAT, t.j. Dz.U. 2026 poz. 1263, art. 106d (to be verified by a human):
  https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260001263
- Schemat FA(3), element `Adnotacje/P_17` i `Podmiot3/Rola`:
  https://crd.gov.pl/wzor/2025/06/25/13775/schemat.xsd
- Broszura informacyjna dotycząca struktury logicznej FA(3) (Podmiot3, Adnotacje):
  https://ksef.podatki.gov.pl/media/nuclnu0w/broszura-informacyjna-dotyczaca-struktury-logicznej-fa-3.pdf
- KSeF 2.0 – dokumentacja API, Uprawnienia (MF):
  https://github.com/CIRFMF/ksef-api/blob/main/uprawnienia.md
- KSeF 2.0 – Przegląd kluczowych zmian (samofakturowanie przez podmioty unijne):
  https://github.com/CIRFMF/ksef-api/blob/main/przeglad-kluczowych-zmian-ksef-api-2-0.md
- Kody QR (KOD II, samofakturowanie): https://github.com/CIRFMF/ksef-api/blob/main/kody-qr.md
- Korekta techniczna faktury offline:
  https://github.com/CIRFMF/ksef-api/blob/main/offline/korekta-techniczna.md
- Weryfikacja faktury (numeracja, duplikaty):
  https://github.com/CIRFMF/ksef-api/blob/main/faktury/weryfikacja-faktury.md
- Specyfikacja OpenAPI (pole `isSelfInvoicing`):
  https://github.com/CIRFMF/ksef-api/blob/main/open-api.json
- Podręcznik KSeF 2.0 cz. II (pkt 1.6, 1.6.2, 2.12, 6.3):
  https://ksef.podatki.gov.pl/pliki-do-pobrania-ksef-20/
- Podręcznik KSeF 2.0 cz. III (samofakturowanie; not yet extracted, cite only after reading):
  https://ksef.podatki.gov.pl/media/3ikdk3qm/podrecznik-ksef-20-cz-iii-dodatkowe-funkcjonalnosci-ksef-06082026.pdf

## Warning: Common Misconceptions

- „Przy samofakturowaniu nabywca wpisuje się w `Podmiot3` z rolą 5 (wystawca)." Wrong: the XSD says
  role 5 „Nie dotyczy przypadku, gdy wystawcą faktury jest nabywca"; the buyer stays in `Podmiot2`
  and `P_17` = „1" (facts 1–3).
- „Samofakturowanie to `PodmiotUpowazniony`." Wrong: that element is for organ egzekucyjny, komornik
  and przedstawiciel podatkowy only (fact 4).
- „Nabywca loguje się na konto sprzedawcy." No: it acts in its own context under the `SelfInvoicing`
  permission (facts 5, 9); the EU case uses the compound context `NipVatUe` (facts 13–15).
- „Uprawnienie do samofakturowania nada biuro rachunkowe z prawem delegowania." No: `SelfInvoicing`
  cannot be granted indirectly; only the owner or a `CredentialsManage` holder grants it (facts
  6–7).
- „Nabywca wystawi notę korygującą do samofaktury." Noty korygujące do not exist since 1.02.2026
  (fact 25); who issues the faktura korygująca for a self-billed invoice is NOT SETTLED.
- Stale-content flag: older posts describing KSeF 1.0 permissions or screens for self-billing are
  not a source. The KSeF 2.0 model (`SelfInvoicing` as a podmiotowe permission, the `NipVatUe`
  compound context for EU entities) is described as introduced in KSeF 2.0 (fact 13). How FA(2)
  marked self-billing was not checked in this pass.

## Freshness

Review when: Podręcznik cz. III is extracted (corrections, approval, AP screens); a new
`uprawnienia.md` / OpenAPI version changes podmiotowe or EU-entity permissions; a new FA schema
replaces 2025/06/25/13775; after 31.12.2026 (art. 145m expires, open question 3 moot).
