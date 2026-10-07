# Knowledge Watchlist

Official sources the weekly knowledge routine checks for changes, and when it last checked them. The
routine updates `Last checked` and appends to `CHANGELOG.md` in every PR. Only Tier 1–3 sources (see
`.github/agents/researcher.md`) may change a fact in the knowledge base; everything else is a lead
to verify.

Last checked: 2026-04-01

Verified baseline (2026-10-07): VAT Act consolidated text Dz.U. 2026 poz. 1263; latest amending act
checked Dz.U. 2026 poz. 1270 (no KSeF changes). KSeF regulation Dz.U. 2025 poz. 1815, amended by
Dz.U. 2026 poz. 169. Podręcznik KSeF 2.0 cz. I–IV and the AP manual: editions of 2026-08-06.

## Law: enacted and in progress

| Source                       | URL                                               | What to look for                                                                                                                                                                                                                                                   |
| ---------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Dziennik Ustaw               | https://dziennikustaw.gov.pl                      | New acts and regulations touching VAT / KSeF / e-faktury (ustawa o VAT, rozporządzenia MF on KSeF)                                                                                                                                                                 |
| ISAP (Sejm)                  | https://isap.sejm.gov.pl                          | Consolidated text of the VAT Act (tekst jednolity) and its amendments; regulation changes                                                                                                                                                                          |
| RCL legislation register     | https://legislacja.gov.pl                         | Government drafts (projekty ustaw, rozporządzeń) on KSeF/VAT: stage, new versions, consultation responses                                                                                                                                                          |
| Sejm legislative process     | https://www.sejm.gov.pl (druki, przebieg procesu) | Bills passed to the Sejm, votes, Senate/President stage for KSeF/VAT bills                                                                                                                                                                                         |
| Known open item: UD477       | https://legislacja.rcl.gov.pl/projekt/12414954    | VAT Act amendment (draft of 2026-09-22, stage: uzgodnienia): art. 106ni ust. 1–3, 5–7 from 2028-01-01. MF announcement 2026-09-16: https://www.gov.pl/web/finanse/przedluzenie-odroczenia-kar-za-bledy-w-stosowaniu-ksef-do-konca-2027-r. Track to Dziennik Ustaw. |
| Known open item: KSeF tokens | Rozporządzenie Dz.U. 2025 poz. 1815 §13           | Tokens allowed until 2026-12-31; MF proposed keeping them (consultation summary 2026-06-11). Watch for an amending regulation.                                                                                                                                     |

## Ministry of Finance and KAS

| Source                       | URL                                                                                          | What to look for                                            |
| ---------------------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| KSeF portal: news            | https://ksef.podatki.gov.pl                                                                  | Aktualności, wyjaśnienia, new pages                         |
| KSeF portal: FAQ             | https://ksef.podatki.gov.pl/ksef-news/najczestsze-pytania/                                   | New or changed Q&A                                          |
| KSeF portal: FAQ KSeF 2.0    | https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20                                     | New or changed Q&A                                          |
| KSeF portal: legal basis     | https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/podstawy-prawne-oraz-kluczowe-terminy/ | Changed dates, new legal acts listed                        |
| KSeF portal: tech notices    | https://ksef.podatki.gov.pl/komunikaty-techniczne/                                           | Outages, maintenance, environment changes                   |
| KSeF portal: documentation   | https://ksef.podatki.gov.pl (Podręcznik KSeF 2.0 cz. I–IV, broszury)                         | New editions of manuals and the FA(3) information sheet     |
| MF / KAS on gov.pl           | https://www.gov.pl/web/finanse, https://www.gov.pl/web/kas                                   | Press releases on KSeF and VAT                              |
| Schemas (CRD)                | https://crd.gov.pl (FA(3) and related schemas)                                               | New schema versions; check with `pnpm update-schemas`       |
| Tax interpretations (EUREKA) | https://eureka.mf.gov.pl                                                                     | Interpretacje ogólne and notable individual rulings on KSeF |

## Official GitHub (Centrum Informatyki Resortu Finansów, github.com/CIRFMF)

| Repo                        | What to look for                                                                                   |
| --------------------------- | -------------------------------------------------------------------------------------------------- |
| `CIRFMF/ksef-api`           | API spec and docs changes, changelog, issues answered by MF staff (limits, error codes, behaviour) |
| `CIRFMF/ksef-schematy`      | Schema discussions and interpretations; issues where MF clarifies FA(3) fields                     |
| `CIRFMF/ksef-client-java`   | Releases and changes that reveal API behaviour                                                     |
| `CIRFMF/ksef-client-csharp` | Same as above                                                                                      |
| `CIRFMF/ksef-pdf-generator` | Changes to the official invoice visualisation                                                      |
| `CIRFMF/ksef-latarnia`      | Availability / status mechanism changes                                                            |

Repo issues and discussions are Tier 3 at best, and only when an MF account answers. Treat community
comments as leads.
