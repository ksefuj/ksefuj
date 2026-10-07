# Research Brief: Pierwsza faktura w Aplikacji Podatnika KSeF 2.0

**Requested by:** Orchestrator **Date:** 2026-10-07 **For content:** Blog post — "Pierwsza faktura w
Aplikacji Podatnika KSeF 2.0" **Target query:** „aplikacja podatnika KSeF jak wystawić fakturę"
**Target persona:** "Ania" — VAT-exempt hairdresser (JDG), a few invoices a month, has never used
invoicing software **Tool context:** ksefuj.to — free KSeF XML validator

---

## Source Corpus Used

| Source                                                                      | Tier | URL / file                                                                                    | Status                                          |
| --------------------------------------------------------------------------- | ---- | --------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| Podręcznik użytkownika Aplikacji Podatnika KSeF 2.0 (edition 06.08.2026)    | 2    | https://ksef.podatki.gov.pl/pliki-do-pobrania-ksef-20/                                        | CURRENT, PDF text read                          |
| Podręcznik Aplikacji Mobilnej KSeF                                          | 2    | https://ksef.podatki.gov.pl/pliki-do-pobrania-ksef-20/                                        | CURRENT, PDF text read                          |
| Podręcznik KSeF 2.0 cz. I — Rozpoczęcie korzystania (06.08.2026)            | 2    | https://ksef.podatki.gov.pl/pliki-do-pobrania-ksef-20/                                        | CURRENT, p. 42 on KSeF certificate login        |
| Podręcznik KSeF 2.0 cz. II — Wystawianie i otrzymywanie faktur (06.08.2026) | 2    | https://ksef.podatki.gov.pl/pliki-do-pobrania-ksef-20/                                        | CURRENT, quotes art. 145m, 106gb, 106b          |
| FAQ MF — KSeF 2.0 (modified 29.04.2026)                                     | 3    | https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20                                      | CURRENT, 200                                    |
| Ulotka MŚP i JDG „3 proste kroki"                                           | 3    | https://ksef.podatki.gov.pl/pliki-do-pobrania-ksef-20/                                        | CURRENT                                         |
| Aplikacja mobilna KSeF (MF page)                                            | 3    | https://ksef.podatki.gov.pl/aplikacja-podatnika-ksef-i-inne-narzedzia/aplikacja-mobilna-ksef/ | CURRENT, 200                                    |
| Komunikaty techniczne MF (notice of 25.09.2026)                             | 3    | https://ksef.podatki.gov.pl/komunikaty-techniczne/                                            | CURRENT, 200                                    |
| Aplikacja Podatnika KSeF (production)                                       | 3    | https://ap.ksef.mf.gov.pl                                                                     | CURRENT, 200                                    |
| Ustawa o VAT (consolidated text Dz.U. 2026 poz. 1263)                       | 1    | https://isap.sejm.gov.pl/                                                                     | NOT FETCHABLE (Incapsula); cited via Podręcznik |
| Internal briefs (ksef-dla-jdg, limit-10000-zl)                              | int. | docs/knowledge-base/briefs/                                                                   | partly stale, see Misconceptions                |

---

## Key Facts (ready to use)

1. **Free web app.** MF's Aplikacja Podatnika KSeF 2.0 is at https://ap.ksef.mf.gov.pl; it issues,
   receives and previews e-invoices and manages permissions, certificates and tokens (AP manual, ch.
   1).
2. **Online only.** "W Aplikacji Podatnika KSeF 2.0 wystawiamy jedynie faktury w trybie online" (FAQ
   Q11).
3. **Login methods in the AP.** Only two buttons: "Zaloguj przez login.gov.pl" (Profil Zaufany,
   mObywatel, bankowość elektroniczna, e-dowód; via Węzeł krajowy) and "Zaloguj certyfikatem"
   (qualified certificate) (AP manual 4.1, p. 14). KSeF token and KSeF certificate are NOT accepted
   for logging in to the AP: Podręcznik cz. I (06.08.2026) p. 42 says authenticating with a KSeF
   certificate in free MF tools such as the AP is not possible. The AP manual glossary (p. 8) lists
   token/KSeF certificate only as general KSeF authentication means. Standalone "podpis zaufany"
   login ended 13.02.2026 (Dz.U. 2026 poz. 169; Podręcznik cz. I fn. 20 in the 06.08.2026 edition).
4. **JDG access.** For a JDG access works immediately via Profil Zaufany or a qualified signature
   (leaflet "MŚP i JDG").
5. **Login context.** After choosing the method you pick the identifier: NIP of the entity, internal
   identifier, or compound identifier (self-billing VAT-UE); enter the number and "Przejdź dalej"
   (AP manual 4.1; FAQ Q22 defines context).
6. **Issuing.** Menu: "Wystaw fakturę VAT" -> choose "Tryb skrócony" (domestic standard invoice) or
   "Tryb rozszerzony" (full FA(3)) (AP manual 5.2.1, p. 23-24).
7. **Short-mode fields** (p. 24-31): seller role auto-filled; invoice number; issue date auto-filled
   (cannot be changed); delivery/service date; payment due date and method (optional: gotówka,
   karta, przelew; account number for transfer); net or gross prices; currency (default PLN); seller
   and buyer data (typed or "Pobierz dane" by tax ID; buyer identifier NIP or "Brak
   identyfikatora"); line items (name, quantity, unit, unit price, VAT rate 23% or 8% in the
   dropdown); annotations incl. exemption (art. 43 ust. 1, art. 113 ust. 1 i 9) with a mandatory
   legal-basis field.
8. **Sending.** Button "Wyślij do KSeF"; system validates, then shows the KSeF number with "Kopiuj"
   (p. 32-33). "Pozostałe akcje": Pobierz XML, Podgląd, Zrezygnuj. "Podgląd faktury" exists before
   sending.
9. **UPO.** "Historia sesji" -> session details -> "Pobierz UPO zbiorcze" (XML or PDF), only for
   closed sessions; UPO for a single invoice from the invoice context menu (p. 125-126). Session
   must be ended ("Zakończ sesję") first.
10. **Invoice list.** Select invoice(s) -> "Pobierz" -> format; file named after the KSeF number;
    1-10 invoices per operation, ZIP when several (p. 116-117). Anonymous preview offers XML or PDF
    (p. 21).
11. **"Wystaw podobną fakturę"** copies an existing invoice into an editable form (p. 117).
12. **Cannot edit/delete.** Errors are fixed only by a corrective invoice (FAQ Q6). Retention in
    KSeF 10 years from end of the issue year (FAQ Q21).
13. **Delivering to buyer.** Art. 106gb ust. 4 (invoice made available in a way agreed with the
    buyer) — MF: statute names no method, agree it with the buyer, no form of agreement prescribed
    (FAQ Q25). It applies to buyers outside KSeF (foreign, no NIP, consumers); a domestic buyer with
    NIP gets the invoice in their own KSeF. Visualisation may be in another language if consistent
    with XML (FAQ Q16).
14. **Mobile app.** Issues basic invoices and their corrections (domestic, PLN); corrections only
    for invoices issued in the mobile app (Mobile manual 1.1).
15. **Timeline.** Art. 145m: 10 000 zł (monthly, gross) rule ends 31.12.2026 -> from 1.01.2027
    everyone (Podręcznik cz. II). VAT-exempt taxpayers: KSeF from 1.04.2026 or from 1.01.2027 when
    sales ≤ 10 000 zł (Podręcznik cz. II, 06.08.2026, p. 10, 12). Penalties (art. 106ni) only for
    violations from 1.01.2027; no sanctions for errors in 2026 (FAQ Q2, Q3).
16. **Exempt taxpayer, invoice on request** within 3 months (Podręcznik cz. II p. 10).
17. **Outages.** MF notice of 25.09.2026 on the technical notices page: difficulties in the
    production Aplikacja Podatnika KSeF 2.0, work on restoring service.
18. **Consumers / receipts.** B2C invoices outside mandatory KSeF (FAQ Q23); receipts not in KSeF
    (Q24).

---

## Unsettled Questions

- Exact text of the exemption legal basis a hairdresser types in: not stated; the post must only say
  "wpisz przepis, z którego korzystasz" and point to the accountant. ISAP not fetchable.
- Whether the AP "Pobierz" list menu offers PDF (manual says "format dostępny"; PDF is named only
  for anonymous preview and UPO). Post states XML plus PDF only where the manual says so.
- Whether VAT-exempt taxpayers above 10 000 zł of monthly sales are already in KSeF on 1.04.2026 is
  stated in Podręcznik cz. II, but statute text not verified.

---

## Suggested Sources Section

- Podręcznik użytkownika Aplikacji Podatnika KSeF 2.0 (MF)
- FAQ MF — KSeF 2.0
- Podręcznik KSeF 2.0 cz. II (MF)
- Aplikacja mobilna KSeF (MF)
- Komunikaty techniczne KSeF (MF)

---

## Warning: Common Misconceptions

- **FAQ numbering in older briefs is off by one.** Real FAQ: Q21 = retention, Q22 = login context.
- **"VAT-exempt taxpayers are excluded from KSeF"** (old internal brief) contradicts Podręcznik cz.
  II (06.08.2026): they issue in KSeF from 1.04.2026 or 1.01.2027 when ≤ 10 000 zł.
- **Art. 106gb ust. 4 does not govern PDFs for domestic B2B** buyers with NIP; they receive the
  invoice in KSeF. It covers buyers who cannot (foreign, no NIP, consumer).
- **"Mobile app = full replacement."** Only basic domestic PLN invoices and own corrections.

---

## Freshness Tracker (date-sensitive claims)

| Claim                                | Verified   | Re-check when                 |
| ------------------------------------ | ---------- | ----------------------------- |
| Online only in AP (Q11)              | 2026-10-07 | FAQ edit after 29.04.2026     |
| Menu names in AP manual (06.08.2026) | 2026-10-07 | New manual edition            |
| 10 000 zł rule ends 31.12.2026       | 2026-10-07 | VAT Act change (WATCHLIST)    |
| Outage notice 25.09.2026             | 2026-10-07 | Notices page update           |
| Mobile app capabilities              | 2026-10-07 | Mobile manual / release notes |

---

## Cross-References for the Copywriter

- /blog/faktura-korygujaca-ksef — corrections
- /guides/pierwsza-faktura-fa3 — test-environment walkthrough (do not duplicate)
- /blog/ksef-limit-10000-zl, /blog/ksef-dla-jdg — context
