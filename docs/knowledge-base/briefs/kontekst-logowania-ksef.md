# Research Brief: Kontekst logowania w KSeF

**Requested by:** Orchestrator **Date:** 2026-11-16 **For content:** blog post
`kontekst-logowania-ksef` **Personas:** A = Ania (JDG, non-technical); K = księgowa / biuro logging
in for clients **Legal baseline:** `docs/knowledge-base/WATCHLIST.md` (verified 2026-10-07: Dz.U.
2025 poz. 1815 as amended by Dz.U. 2026 poz. 169; Podręcznik KSeF 2.0 cz. I-IV and AP manual,
editions of 2026-08-06; mobile manual 29.10.2026 per `aplikacja-mobilna-ksef.md`).

**Method / provenance.** Built ONLY from existing KB briefs and published PL posts. Official hosts
were not reachable from this run (one check: `ksef.podatki.gov.pl` → curl 000, proxy
`connect_rejected`, 2026-11-16). Nothing was re-read live. Every fact names the KB brief it comes
from; page/section references are those the KB gives. "NOT IN KB" = no statement found in
`docs/knowledge-base/` or `apps/web/content/pl/`; do not fill it.

**Target query:** „kontekst logowania KSeF”

## Answer in two sentences

Kontekst to identyfikator podmiotu, w imieniu którego działasz po zalogowaniu: w Aplikacji Podatnika
po wybraniu metody logowania wybierasz typ identyfikatora (NIP, identyfikator wewnętrzny albo
identyfikator złożony z numerem VAT UE), wpisujesz go i klikasz „Przejdź dalej” (Podręcznik AP,
rozdz. 4.1). JDG wpisuje swój NIP, bo uprawnienia właścicielskie do niego ma automatycznie
(Podręcznik cz. I, s. 57), a księgowa wpisuje NIP klienta, w którego kontekście ma uprawnienia; bez
co najmniej jednego aktywnego uprawnienia w wybranym kontekście KSeF nie wpuści (CIRFMF
`uwierzytelnianie.md`, Wstęp).

## What changes the answer

- **Kim jesteś:** JDG (kontekst = własny NIP, uprawnienia automatyczne; facts 6-7) vs spółka
  (pieczęć kwalifikowana albo osoba z ZAW-FA; fact 9) vs pracownik biura (kontekst klienta, ale
  delegowanie robi biuro we własnym kontekście; facts 10-12).
- **Czym się logujesz:** login.gov.pl / podpis / pieczęć kwalifikowana w AP (fact 4); token działa
  tylko w kontekście, w którym go wygenerowano, certyfikat KSeF w różnych kontekstach, ale żadnego z
  nich nie użyjesz w AP (facts 14-16).
- **Typ kontekstu:** NIP (zwykły przypadek), InternalId (jednostka wewnętrzna), NipVatUe
  (samofakturowanie przez podmiot z UE) (facts 2, 18-21).
- **Środowisko:** w TEST logowanie „uwierzytelnieniem testowym” z ręcznie podanym kontekstem (fact
  25).
- **Tokeny po 31.12.2026:** projekt reguł (100 tokenów na kontekst) nie jest prawem (fact 17).

## Key Facts

Legend: **T** = tier (1 law, 2 MF technical docs incl. CIRFMF API docs, 3 MF guidance). **C** =
confidence. **KB** = brief the fact is taken from. Persona A / K.

### A. Co to jest kontekst

1. **Kontekst = podmiot, w imieniu którego działasz.** The published guide phrases the AP step as
   „aplikacja pyta, w czyim imieniu chcesz działać”. The KB has no verbatim MF definition (see
   Unsettled 1). Source: Podręcznik AP (06.08.2026) rozdz. 4.1,
   https://ksef.podatki.gov.pl/media/qocjn3ai/podrecznik-uzytkownika-aplikacji-podatnika-ksef-20_06082026.pdf
   (via `/guides/logowanie-ksef` § „Jak wygląda logowanie”); FAQ KSeF 2.0 „context question”
   https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20 (text not in KB). KB:
   `logowanie-ksef.md` fact 8. T2/3. C: MEDIUM (paraphrase, no verbatim). A, K.
2. **Typy identyfikatora kontekstu w AP: NIP, identyfikator wewnętrzny, identyfikator złożony
   (samofakturowanie VAT-UE).** Source: Podręcznik AP (06.08.2026) rozdz. 4.1 (URL above). KB:
   `logowanie-ksef.md` fact 8; `aplikacja-podatnika-ksef-pierwsza-faktura.md` fact 5;
   `samofakturowanie-ksef.md` fact 17 (MEDIUM, KB paraphrase). T2. C: HIGH. A, K.
3. **API: typy `ContextIdentifier` przy uwierzytelnianiu to NIP, InternalId i „identyfikator złożony
   VAT UE”; w linku KOD II (offline) typ kontekstu może być „Nip”, „InternalId”, „NipVatUe”,
   „PeppolId”.** Source: https://github.com/CIRFMF/ksef-api/blob/main/uwierzytelnianie.md
   (AuthTokenRequest table); https://github.com/CIRFMF/ksef-api/blob/main/kody-qr.md (KOD II
   „Generowanie linku”). KB: `samofakturowanie-ksef.md` facts 14, 19. T2. C: HIGH. K (PeppolId: not
   for Ania).
   - **PESEL is NOT a context type in the KB.** PESEL appears only as the identifier of the person
     who logs in (e.g. TEST: person logs in „w kontekście NIP … za pomocą numeru PESEL lub NIP-u”,
     fact 26). Do not list PESEL as a context.
   - **JST / grupa VAT as a context type: NOT IN KB** (Podręcznik cz. IV, which covers JST and GV,
     is not extracted; `podrecznik-ksef-20-czesc-ii.md` §2.2.3-2.2.4 only point to it).

### B. Aplikacja Podatnika: kiedy i jak wybierasz kontekst

4. **Logowanie do AP: „Zaloguj przez login.gov.pl” (Profil Zaufany, mObywatel, bankowość
   elektroniczna, e-dowód) albo „Zaloguj certyfikatem” (kwalifikowany podpis lub pieczęć). Token i
   certyfikat KSeF nie są metodą logowania w AP.** Source: Podręcznik AP (06.08.2026) rozdz. 4.1, s.
   13-15; Podręcznik KSeF 2.0 cz. I (06.08.2026) s. 42,
   https://ksef.podatki.gov.pl/media/dmrfdixs/podrecznik-ksef-20-cz-i-rozpoczecie-korzystania-z-ksef-06082026.pdf.
   KB: `logowanie-ksef.md` facts 1, 3. T2. C: HIGH (AP manual glossary p. 8 lists token/certificate
   generally; see Contradictions). A, K.
5. **Kolejność: najpierw metoda logowania, potem typ identyfikatora, numer i „Przejdź dalej”; przy
   login.gov.pl następuje przekierowanie na jego stronę.** Source: Podręcznik AP rozdz. 4.1, s. 14.
   KB: `logowanie-ksef.md` fact 8; published `/guides/aplikacja-podatnika-ksef-pierwsza-faktura` §
   „1. Zaloguj się i wybierz kontekst”. T2. C: HIGH. A.
6. **Ania (JDG) wybiera NIP i wpisuje własny NIP; „kontekstem logowania jest NIP”.** Source:
   Podręcznik cz. I s. 21, 26-27; AP manual s. 14. KB: `koniec-limitu-10000-zl.md` fact 10;
   `jak-odebrac-fakture-ksef.md` fact 8. T2. C: HIGH. A.
7. **Bez aktywnego uprawnienia w wybranym kontekście nie ma dostępu.** API: system checks that the
   authenticating subject has at least one active permission in the chosen context; otherwise no
   access token is issued. Source: https://github.com/CIRFMF/ksef-api/blob/main/uwierzytelnianie.md
   (Wstęp; the KB fetched it as `ksef-docs/uwierzytelnianie.md`, later merged into `ksef-api`). KB:
   `logowanie-ksef.md` fact 9. T2. C: HIGH.
   - **What the AP screen shows in that case: NOT IN KB.** Only the API status is documented (fact
     23).
8. **Przełączanie kontekstu bez wylogowania: NOT IN KB.** No source in the KB says whether the AP
   lets you change context in-session or requires a new login. Do not state either.

### C. Uprawnienia właścicielskie

9. **JDG: uprawnienia właścicielskie przypisane automatycznie do NIP podatnika** (wystawianie,
   dostęp do faktur, zarządzanie uprawnieniami, zarządzanie jednostkami podrzędnymi, historia sesji,
   przeglądanie uprawnień); nie można ich odebrać; JDG nie składa ZAW-FA poza zgłoszeniem własnego
   podpisu bez NIP/PESEL. Source: Podręcznik cz. I s. 57. KB: `uprawnienia-ksef-ksiegowa.md` facts
   1-2; `logowanie-ksef.md` fact 10. T2. C: HIGH. A.
   - Mobile manual pkt 3 (s. 23-24): „W przypadku podatników będących osobami fizycznymi pierwotne
     uprawnienie o charakterze właścicielskim jest przypisane automatycznie. Osoba taka nie musi nic
     zgłaszać.” KB: `aplikacja-mobilna-ksef.md` (local verification 2026-11-11). T2. C: HIGH.
   - **How KSeF links the person (PESEL) to the JDG's NIP (CRP, CEIDG): NOT IN KB.**
10. **Spółka (nie osoba fizyczna): loguje się pieczęcią kwalifikowaną albo przez osobę wskazaną w
    ZAW-FA (dokładnie jedna osoba fizyczna, nie musi być w KRS), która dostaje m.in. zarządzanie
    uprawnieniami, wystawianie i dostęp do faktur; kolejne osoby dodaje elektronicznie.** Source:
    Dz.U. 2025 poz. 1815 § 5 ust. 1 (https://api.sejm.gov.pl/eli/acts/DU/2025/1815); cz. I s. 58-60.
    KB: `logowanie-ksef.md` fact 12; `uprawnienia-ksef-ksiegowa.md` fact 12. T1/2. C: HIGH. K.
    - ZAW-FA(3): paper, e-US or e-Doręczenia; ePUAP not effective since 1.01.2026 (cz. I s. 58-61;
      `uprawnienia-ksef-ksiegowa.md` fact 13). T2/3. HIGH.
    - **Who holds the „Owner” role in a company's NIP context (e.g. the seal holder): NOT IN KB.**
11. **„Dodaj administratora” w AP nadaje zarządzanie uprawnieniami w „podmiocie kontekstu
    bieżącego”** (incl. subordinate units). Source: cz. I s. 53-54, 71; AP s. 127. KB:
    `uprawnienia-ksef-ksiegowa.md` fact 10. T2. C: HIGH. K. (Shows that permissions are granted
    within the context you are logged into.)

### D. Księgowa / biuro: czyj kontekst

12. **Biuro deleguje dostęp pracownikom we własnym kontekście (NIP biura), nie w kontekście klienta;
    przy nadaniu wybiera „do pracy dla klienta” (z identyfikatorem klienta) albo „do pracy dla
    wszystkich klientów”.** Source: cz. I s. 74-76; AP s. 140-143. KB:
    `uprawnienia-ksef-ksiegowa.md` facts 6-7; `biuro-rachunkowe-ksef-kto-co-robi.md` B9. T2. C:
    HIGH. K.
13. **Pracownik biura obsługuje klienta, logując się w kontekście NIP klienta; po odebraniu
    uprawnień przez jednego klienta może się uwierzytelnić tylko w kontekstach, w których nadal ma
    uprawnienia (albo we własnym).** Source: FAQ KSeF 2.0 (certificate question 10)
    https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20; cz. I s. 49 (przykład 20). KB:
    `biuro-rachunkowe-ksef-kto-co-robi.md` C3; published `/guides/uprawnienia-ksef-ksiegowa` § „Co
    robi Pani Krystyna…” („loguje się do KSeF w kontekście jej NIP”). T2/3. C: HIGH (C3) / MEDIUM
    for the exact sentence in the guide (the brief `uprawnienia-ksef-ksiegowa.md` has no verbatim
    for it). K.
14. **Łańcuch uprawnień (klient → biuro → pracownik) jest sprawdzany przy nawiązaniu sesji;
    odebranie uprawnienia biuru zostawia uprawnienia pracowników nadane, ale nieaktywne.** Source:
    cz. I s. 77-78 (przykład 29). KB: `uprawnienia-ksef-ksiegowa.md` fact 8; `biuro-...` C2. T2. C:
    HIGH. K.
15. **Uprawnienia podmiotowe (samofakturowanie, faktury VAT RR, przedstawiciel podatkowy) działają
    „w swoim kontekście w imieniu podmiotu uprawniającego”.** Source:
    https://github.com/CIRFMF/ksef-api/blob/main/uprawnienia.md („Struktura nadanych uprawnień” pkt
    3). KB: `samofakturowanie-ksef.md` fact 9, V4. T2. C: HIGH. K.
    - **Whether a biuro authenticated in its OWN NIP context (with the entity permission „Podmiotowi
      do wystawiania i przeglądania faktur”) sees or issues the client's invoices from that context,
      or must switch to the client's context: NOT IN KB.** The KB states only delegation in own
      context (fact 12) and employee work in the client context (fact 13).

### E. Tokeny i certyfikaty KSeF a kontekst

16. **Token KSeF działa tylko w kontekście, w którym go wygenerowano**, carries the permissions
    declared at generation, no validity period (until revoked), cannot be handed to other natural
    persons. Source: cz. I pkt 2.4.2-2.4.5 (s. 36-38), tabela 3 (s. 51-52). KB:
    `tokeny-ksef-po-2026.md` fact 8; published `/blog/tokeny-ksef-po-2026` table row „Kontekst:
    jeden, w którym wydano”. T2. C: HIGH. A (marginal), K.
    - A token generated by a natural person (e.g. JDG owner) may be used only by that person; the
      office cannot use the client's token (cz. I s. 38; `/blog/tokeny-ksef-po-2026` § „Co zrobić
      już teraz”). T2. HIGH. K.
17. **Certyfikat KSeF nie niesie uprawnień (korzysta z uprawnień identyfikatora w certyfikacie) i
    działa w różnych kontekstach**; types: 1 uwierzytelnianie, 2 offline; max 2 lata. Source: cz. I
    pkt 2.5.1-2.5.6 (s. 42-46), tabela 3. KB: `tokeny-ksef-po-2026.md` fact 9. T2. C: HIGH. K.
    - Still not usable to log in to the AP (fact 4).
    - JDG cannot share her KSeF certificate with the accountant (FAQ KSeF 2.0;
      `biuro-rachunkowe-ksef-kto-co-robi.md` B10). T3. HIGH.
18. **Draft token rules (not law):** limit 100 tokens per context; `Owner`/`CredentialsManage` may
    revoke any token in the context; from 2027-01-01. Source:
    https://github.com/CIRFMF/ksef-api/issues/885 (2026-11-06, discussion to 2026-11-20). KB:
    `tokeny-ksef-po-2026.md` fact 15. T3. C: HIGH that it was published; draft. K. Freshness: yes.

### F. Identyfikator wewnętrzny, jednostki, NIP-VAT UE

19. **IDWew = unikalny identyfikator zakładu/oddziału/jednostki wewnętrznej: NIP podatnika + ciąg
    cyfr; każdorazowe wskazanie IDWew (w `Podmiot3`) „jest warunkiem poprawnego działania modelu
    uprawnień dedykowanego zakładom”.** Source: Podręcznik cz. II pkt 2.2.5 (KB extract of the
    2026-02-01 edition; newer 06.08.2026 edition exists,
    https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf).
    KB: `podrecznik-ksef-20-czesc-ii.md` §2.2.5. T2. C: HIGH. K.
    - XSD pattern `TNIPIdWew`: `[1-9]((\d[1-9])|([1-9]\d))\d{7}-\d{5}` (NIP, hyphen, 5 digits). KB:
      `schemat-xsd-fa3.md` (XSD l. 1299-1306). T2. HIGH.
    - **That the AP „identyfikator wewnętrzny” context value equals this IDWew: MEDIUM** (same term;
      the KB never states the equivalence verbatim). **How an internal identifier is created in KSeF
      and who logs in with it: NOT IN KB** (owner permissions include „zarządzanie jednostkami
      podrzędnymi”, fact 9, no procedure extracted).
20. **Podmiot3 widzi tylko faktury, w których występuje jako Podmiot3 (gdy wskazano jego NIP lub
    IDWew).** Source: cz. II pkt 5.2. KB: `jak-odebrac-fakture-ksef.md` fact 13. T2. C: HIGH. K.
21. **JST: przy `JST` = 1 faktura trafia do jednostki podrzędnej, gdy w `Podmiot3` podano jej NIP
    lub ID-Wew z rolą 8.** Source: FA(3) XSD documentation (schema doc for `Podmiot2/JST`). KB:
    `schemat-xsd-fa3.md`. T2. C: HIGH. K. **Login context of a JST unit or VAT-group member: NOT IN
    KB.**
22. **NipVatUe: kontekst złożony NIP polskiego podmiotu + numer VAT UE (`{nip}-{vat_ue}`, np.
    `5265877635-ATU12345678`); powstaje, gdy polski podmiot (właściciel lub `CredentialsManage`)
    nada uprawnienie „administratora podmiotu unijnego”; reprezentanci podmiotu z UE wystawiają w
    nim faktury w trybie samofakturowania.** Source:
    https://github.com/CIRFMF/ksef-api/blob/main/auth/context-identifier-nip-vat-ue.md;
    https://github.com/CIRFMF/ksef-api/blob/main/uprawnienia.md (V5: „…uzyskuje możliwość logowania
    się w kontekście złożonym: `NipVatUe`…”);
    https://github.com/CIRFMF/ksef-api/blob/main/przeglad-kluczowych-zmian-ksef-api-2-0.md. KB:
    `samofakturowanie-ksef.md` facts 13-15. T2. C: HIGH. K (not Ania).

### G. Kody błędów związane z kontekstem (API; Ania sees none of these in AP)

23. **Status uwierzytelniania 415 „Uwierzytelnianie zakończone niepowodzeniem” (details „Brak
    przypisanych uprawnień”); 450 with detail „Token nie może być użyty w kontekście
    {contextIdentifier}”.** Source: https://github.com/CIRFMF/ksef-api/blob/main/open-api.json
    (AuthenticationOperationStatusResponse). KB: `kody-bledow-ksef.md` fact 2. T2. C: HIGH. K.
24. **Other context-related codes (verbatim):** permission operations 430 „Kontekst identyfikatora
    nie odpowiada wymaganej roli lub uprawnieniom”; exception `21117` „Nieprawidłowy identyfikator
    podmiotu dla wskazanego typu kontekstu.” (POST `/auth/xades-signature`); `26002` „Nie można
    wygenerować tokena dla obecnego typu kontekstu.”; HTTP 403 `missing-permissions` „Brak
    wymaganych uprawnień do wykonania operacji w bieżącym kontekście.” and
    `context-type-not-allowed` „Operacja nie jest dostępna dla uwierzytelnionego typu kontekstu.”;
    rate limits counted per pair „kontekst i adres IP”. Source: open-api.json;
    https://github.com/CIRFMF/ksef-api/blob/main/limity/limity-api.md (14.09.2026). KB:
    `kody-bledow-ksef.md` facts 4, 7, 9, 10. T2. C: HIGH. K/dev.
    - **Do not conflate:** 430 for an invoice = „Błąd weryfikacji pliku faktury”; for a batch
      session = „Błąd dekompresji pierwotnego archiwum” (same brief).

### H. Aplikacja mobilna, środowisko testowe, UPO

25. **Aplikacja mobilna: dodajesz profil firmy (jej NIP) i potwierdzasz tożsamość przez Węzeł
    Krajowy (login.gov.pl); na co dzień PIN lub biometria.** Source: Podręcznik Aplikacji Mobilnej
    KSeF (wersja 2.4.0, 10.2026) pkt 1.1, 3, 4,
    https://ksef.podatki.gov.pl/media/cf0pmve4/podrecznik-uzytkownika-aplikacji-mobilnej-ksef-29102026.pdf.
    KB: `aplikacja-mobilna-ksef.md` (local verification 2026-11-11: „Autoryzacja w aplikacji jest
    wykonywana poprzez Węzeł Krajowy”); published `/blog/aplikacja-mobilna-ksef` § „Jak zalogować
    się do aplikacji mobilnej?”. T2. C: HIGH (Węzeł Krajowy) / MEDIUM („profil = NIP” is the post's
    wording; the brief says only „po zalogowaniu do profilu”). A.
    - **Whether the mobile app uses the word „kontekst”, lets you choose internal/compound
      identifiers, or hold several profiles: NOT IN KB.**
26. **TEST: „Zaloguj uwierzytelnieniem testowym” – podajesz kontekst (np. NIP firmy) i NIP albo
    PESEL; serwer podpisuje żądanie certyfikatem testowym; niedostępne w DEMO/PROD; Profil Zaufany
    tylko w DEMO i PROD.** Source: „Instrukcja uwierzytelnienia w Aplikacji Podatnika KSeF 2.0
    wersja testowa” (v1.0, 03.11.2025),
    https://ksef.podatki.gov.pl/media/jxgjepcn/instrukcja-uwierzytelnienia-w-aplikacji-podatnika-ksef-20-wersja-testowa.pdf.
    KB: `srodowisko-testowe-ksef.md` (verification section); published
    `/guides/srodowisko-testowe-ksef` § „Jak zalogować się do środowiska testowego?”. T2. C: HIGH.
    A.
    - API test data: `/v2/testdata/person` (`isBailiff: false`) → the person logging in the NIP
      context „za pomocą numeru PESEL lub NIP-u, otrzyma uprawnienie właścicielskie (Owner)”;
      `/testdata/context/block` → „Uwierzytelnianie zakończy się błędem 480.” Source:
      https://github.com/CIRFMF/ksef-api/blob/main/dane-testowe-scenariusze.md (05.08.2025);
      open-api.json. KB: `srodowisko-testowe-ksef.md` facts 26-27. T2. HIGH. Dev.
27. **UPO zawiera typ i wartość identyfikatora kontekstu uwierzytelnienia.** Source: Podręcznik cz.
    II §5.4.1 (KB extract, „Elementy UPO” items 2-3); example file
    https://github.com/CIRFMF/ksef-api/blob/main/faktury/upo/przyklady/v4-3/kontekst-nip/upo-faktura-kontekst-id-nip.xml.
    KB: `podrecznik-ksef-20-czesc-ii.md`; `numer-ksef-gdzie-znalezc.md` fact 7. T2. C: HIGH. K.
28. **Offline (KOD II): link zawiera typ i wartość kontekstu; weryfikacja sprawdza, czy właściciel
    certyfikatu ma aktywne uprawnienia w kontekście i czy kontekst może wystawiać za NIP
    sprzedawcy.** Source: cz. II §5.4.2; https://github.com/CIRFMF/ksef-api/blob/main/kody-qr.md.
    KB: `samofakturowanie-ksef.md` fact 19; `podrecznik-ksef-20-czesc-ii.md` §5.4.2. T2. C: HIGH. K.

## Contradictions & Ambiguities

- **FAQ numbering.** `aplikacja-podatnika-ksef-pierwsza-faktura.md` says „FAQ Q22 defines context”;
  `zwolniony-z-vat-ksef.md`, `ryczalt-ksef.md` and others cite FAQ Q22 for the 10 000 zł sum /
  VAT-exempt taxpayers; `biuro-rachunkowe-ksef-kto-co-robi.md` notes FAQ 2.0 numbering restarts per
  section. Cite the FAQ page URL without a question number.
- **KSeF certificate in AP.** cz. I s. 42: not usable in AP; AP manual glossary p. 8 lists
  token/KSeF certificate as general KSeF authentication means (`logowanie-ksef.md` Contradictions).
  Login screen (rozdz. 4.1) supports cz. I.
- **`koniec-limitu-10000-zl.md` fact 10** lists token and KSeF certificate among a natural person's
  authentication means (KSeF in general) next to „kontekstem logowania jest NIP”; not an AP
  statement. Do not merge into „w AP zalogujesz się tokenem”.

## Unsettled Questions (Copywriter must not answer definitively)

1. Verbatim MF definition of „kontekst” (FAQ KSeF 2.0 question): not in KB.
2. Switching context in AP without logging out (fact 8).
3. AP message when you have no permission in the entered context (fact 7).
4. NIP-PESEL link for JDG owner rights (CRP/CEIDG) (fact 9).
5. Owner of a company context (fact 10).
6. Whether a biuro works on client invoices from its own NIP context or the client's (fact 15).
7. How an internal identifier is created and used to log in; JST/VAT-group contexts (facts 19, 21).
8. Mobile app: multiple profiles, choice of identifier type (fact 25).

## Warning: Common Misconceptions

- „Do AP zalogujesz się tokenem albo certyfikatem KSeF” — no (fact 4). Old `certyfikaty-tokeny.md`
  Facts 1.1/1.2 say otherwise; do not copy.
- „Księgowa loguje się danymi klienta / tokenem klienta” — no: own login method, client's NIP as
  context, with permissions granted to her; client's token is usable only by the client (facts 13,
  16, 17).
- „PESEL to kontekst” — not supported; PESEL identifies the person logging in (fact 3).
- „Biuro musi logować się w kontekście klienta, żeby dać dostęp pracownikom” — no, own context (fact
  12).
- „Kod 430 = brak uprawnień” — only for permission operations; for invoices 430 is a file
  verification error (fact 24).
- „Logowanie na ksef.mf.gov.pl” — KSeF 1.0 address, dead since 1.02.2026 (project CLAUDE.md).

## Suggested Sources Section (Źródła)

- Podręcznik użytkownika Aplikacji Podatnika KSeF 2.0 (06.08.2026), rozdz. 4.1, s. 13-15; s. 127,
  140-143
- Podręcznik KSeF 2.0 cz. I (06.08.2026), s. 36-38, 42-46, 49, 53-60, 74-78
- FAQ MF KSeF 2.0
- CIRFMF: `uwierzytelnianie.md`, `uprawnienia.md`, `auth/context-identifier-nip-vat-ue.md`
- Instrukcja uwierzytelnienia w AP KSeF 2.0 wersja testowa (v1.0)
- Podręcznik Aplikacji Mobilnej KSeF (10.2026)

## Not fetched live (all URLs cited; taken from KB/published posts, none re-read on 2026-11-16)

- https://ksef.podatki.gov.pl/media/qocjn3ai/podrecznik-uzytkownika-aplikacji-podatnika-ksef-20_06082026.pdf
- https://ksef.podatki.gov.pl/media/dmrfdixs/podrecznik-ksef-20-cz-i-rozpoczecie-korzystania-z-ksef-06082026.pdf
- https://ksef.podatki.gov.pl/media/rronoxyt/podrecznik-ksef-20-cz-ii-wystawianie-i-otrzymywanie-faktur-w-ksef-06082026.pdf
- https://ksef.podatki.gov.pl/media/cf0pmve4/podrecznik-uzytkownika-aplikacji-mobilnej-ksef-29102026.pdf
- https://ksef.podatki.gov.pl/media/jxgjepcn/instrukcja-uwierzytelnienia-w-aplikacji-podatnika-ksef-20-wersja-testowa.pdf
- https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20
- https://api.sejm.gov.pl/eli/acts/DU/2025/1815
- https://github.com/CIRFMF/ksef-api/blob/main/uwierzytelnianie.md
- https://github.com/CIRFMF/ksef-api/blob/main/uprawnienia.md
- https://github.com/CIRFMF/ksef-api/blob/main/auth/context-identifier-nip-vat-ue.md
- https://github.com/CIRFMF/ksef-api/blob/main/przeglad-kluczowych-zmian-ksef-api-2-0.md
- https://github.com/CIRFMF/ksef-api/blob/main/kody-qr.md
- https://github.com/CIRFMF/ksef-api/blob/main/open-api.json
- https://github.com/CIRFMF/ksef-api/blob/main/limity/limity-api.md
- https://github.com/CIRFMF/ksef-api/blob/main/dane-testowe-scenariusze.md
- https://github.com/CIRFMF/ksef-api/blob/main/faktury/upo/przyklady/v4-3/kontekst-nip/upo-faktura-kontekst-id-nip.xml
- https://github.com/CIRFMF/ksef-api/issues/885

## Suggested internal links (published PL)

- `/guides/logowanie-ksef` § „Jak wygląda logowanie”, § „JDG: wchodzisz od razu, bez ZAW-FA”, §
  „Spółka loguje się pieczęcią albo przez osobę wskazaną w ZAW-FA”, § „Token i certyfikat KSeF są
  dla programów, nie dla ciebie”
- `/guides/aplikacja-podatnika-ksef-pierwsza-faktura` § „1. Zaloguj się i wybierz kontekst”
- `/guides/uprawnienia-ksef-ksiegowa` § „Jak dać dostęp biuru rachunkowemu, krok po kroku”, § „Co
  robi Pani Krystyna, żeby dostęp trafił do pracowników”
- `/blog/biuro-rachunkowe-ksef-kto-co-robi` § „Jakie uprawnienia dać biuru?”, § „Jak zmienić biuro i
  nie zostawić mu dostępu?”
- `/blog/certyfikaty-vs-tokeny-ksef` § „Metody logowania w skrócie”
- `/blog/tokeny-ksef-po-2026` § „Co zrobić już teraz” (table row „Kontekst”)
- `/blog/samofakturowanie-ksef` § „Co robi nabywca?”, § „Co się zmienia, gdy nabywca jest z innego
  kraju UE?”
- `/blog/kody-bledow-ksef` § „Co oznacza 450 i inne kody przy logowaniu?”
- `/blog/aplikacja-mobilna-ksef` § „Jak zalogować się do aplikacji mobilnej?”
- `/guides/srodowisko-testowe-ksef` § „Jak zalogować się do środowiska testowego?”
- `/guides/jak-odebrac-fakture-ksef` § „Gdzie zobaczyć i pobrać fakturę zakupową”
