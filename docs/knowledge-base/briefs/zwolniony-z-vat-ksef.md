# Research Brief: Zwolniony z VAT a KSeF

**Requested by:** human (content backlog item `zwolniony-z-vat-ksef`) **Date:** 2026-10-07 **For
content:** Blog post "Zwolniony z VAT a KSeF: od kiedy faktury"

**Target query:** „zwolniony z VAT KSeF"

**Persona:** sole trader using the art. 113 exemption (e.g. a VAT-exempt hairdresser), no
accountant, no paid invoicing software.

**Answer in two sentences:** VAT exemption does not exempt a taxpayer from KSeF: an exempt taxpayer
who issues an invoice to another business issues it in KSeF on the same timeline as everyone else
(MF FAQ KSeF 2.0, general Q10 and Q22; VAT Act art. 106ga ust. 1). Until 31 Dec 2026 the 10 000 zł
monthly rule (art. 145m) still lets such a taxpayer issue paper or electronic invoices outside KSeF;
from 1 Jan 2027 there is no limit.

**What changes the answer:**

- Buyer is a private person (not running a business): no KSeF obligation, voluntary only (art. 106ga
  ust. 2 pkt 4, ust. 4; MF FAQ).
- Seller uses the art. 113a exemption (business seated in another EU member state): excluded from
  KSeF permanently (art. 106ga ust. 2 pkt 6). A Polish sole trader on art. 113 is not in this group.
- Invoice issued by 31 Dec 2026 and monthly invoiced sales (gross) <= 10 000 zł: may be issued
  outside KSeF (art. 145m). Right lost from the invoice that exceeds the limit.
- Nobody asked for an invoice: an exempt seller has no obligation to issue one (art. 106b ust. 2),
  so nothing goes to KSeF.

## Key Facts (ready to use)

1. **Consolidated text of the VAT Act is Dz.U. 2026 poz. 1263** (obwieszczenie Marszałka Sejmu of 1
   Sep 2026). All article quotes below are from it. Source:
   https://api.sejm.gov.pl/eli/acts/DU/2026/1263/text.pdf (ISAP:
   https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260001263; blocks curl with 403, opens
   in a browser). Confidence: HIGH Persona-relevant: yes
2. **Art. 113 ust. 1 threshold is 240 000 zł** of sales (excl. VAT) in neither the previous nor the
   current tax year; the amount applies from 1 Jan 2026 (footnote 29: ustawa z 24 czerwca 2025,
   Dz.U. poz. 896). Verbatim: „kwoty 240 000 zł". Art. 113 ust. 5: exemption lapses from the
   transaction that crosses the amount. Confidence: HIGH Persona-relevant: yes
3. **An exempt seller is not obliged to issue an invoice.** Art. 106b ust. 2: „Podatnik nie jest
   obowiązany do wystawienia faktury w odniesieniu do sprzedaży zwolnionej od podatku na podstawie
   art. 43 ust. 1, art. 113 ust. 1 i 9, art. 113a ust. 1 lub przepisów wydanych na podstawie art. 82
   ust. 3." Confidence: HIGH Persona-relevant: yes
4. **On the buyer's request the exempt seller must issue one**, if the request comes within 3 months
   counted from the end of the month in which the goods were delivered / service performed / payment
   (even partial) received. Art. 106b ust. 3 pkt 2 („sprzedaż zwolnioną, o której mowa w ust. 2 …
   jeżeli żądanie jej wystawienia zostało zgłoszone w terminie 3 miesięcy, licząc od końca miesiąca,
   w którym dostarczono towar lub wykonano usługę bądź otrzymano całość lub część zapłaty"). Applies
   to business and consumer buyers alike. Confidence: HIGH Persona-relevant: yes
5. **Invoice for exempt sales must state the legal basis of the exemption** (art. 106e ust. 1 pkt
   19; in FA(3): Adnotacje/Zwolnienie P_19 = 1 plus one of P_19A/P_19B/P_19C, see
   `packages/validator/docs/fa3-information-sheet.md`, Zwolnienie section). Confidence: HIGH
   Persona-relevant: only as a line for accountants; invoicing software fills it.
6. **KSeF is mandatory for every taxpayer, exempt included.** Art. 106ga ust. 1: „Podatnicy są
   obowiązani wystawiać faktury ustrukturyzowane przy użyciu Krajowego Systemu e-Faktur." MF FAQ
   KSeF 2.0, general Q10: „każdy podatnik (czynny i zwolniony), który ma obowiązek wystawienia
   faktury, będzie wystawiał ją w KSeF" (stages 1 Feb 2026 large, 1 Apr 2026 others). MF FAQ, Q22
   (art. 145m): „Faktury wystawiane przez podatników zwolnionych z VAT lub wykonujących czynności
   wyłącznie zwolnione z VAT na rzecz innych podatników, jeśli wobec tych faktur nie istnieją żadne
   wyłączenia lub przepisy epizodyczne pozwalające na ich wystawienie poza KSeF, należy wystawić
   przy użyciu KSeF." Source: https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20/ Confidence:
   HIGH Persona-relevant: yes
7. **Art. 145m:** from 1 Apr to 31 Dec 2026 taxpayers obliged to issue structured invoices „mogą
   wystawiać faktury elektroniczne lub faktury w postaci papierowej, jeżeli łączna wartość sprzedaży
   wraz z kwotą podatku … udokumentowana tymi fakturami wystawionymi w danym miesiącu jest mniejsza
   lub równa 10 000 zł"; ust. 2: right lost „począwszy od faktury, którą przekroczono" the value. MF
   FAQ Q22: sum gross amounts of invoices the taxpayer would have to issue in KSeF; excluded from
   the sum: invoices to private persons, cash-register invoices recorded in the daily report,
   receipts with NIP up to 450 zł (100 euro), and invoices excluded under art. 106s regulation. The
   text ties the limit to invoices „wystawionymi w danym miesiącu" (month of issue). Confidence:
   HIGH Persona-relevant: yes
8. **MF stages page** (https://ksef.podatki.gov.pl/etapy-wdrozenia-ksef/): „1 stycznia 2027 r. KSeF
   obowiązkowy dla wszystkich … KSeF 2.0 obowiązkowy dla wcześniej zwolnionych przedsiębiorców (do
   10 tys. zł miesięcznie)." „Zwolnieni" here means exempted from KSeF by the 10k rule, not
   VAT-exempt. Also https://ksef.podatki.gov.pl/od-kiedy-trzeba-wystawiac-faktury-w-ksef/.
   Confidence: HIGH Persona-relevant: yes (disambiguation)
9. **Art. 145n:** until 31 Dec 2026, invoices via cash register and receipts treated as invoices
   (art. 106e ust. 5 pkt 3) may be issued outside KSeF. MF FAQ: from 2027 an invoice to a taxpayer
   for a sale recorded on a cash register must go through KSeF. Confidence: HIGH Persona-relevant:
   partly (salon with a till)
10. **B2C:** art. 106ga ust. 2 pkt 4 (obligation does not cover invoices to a „osoba fizyczna
    nieprowadząca działalności gospodarczej"); ust. 4 allows structured invoices there voluntarily;
    art. 106gb ust. 4 pkt 6: buyer gets the invoice in an agreed way. MF FAQ (Wystawianie faktur
    Q5): „wystawianie faktur B2C … w KSeF jest dobrowolne". FAQ (uprawnienia/JST section, Q54):
    invoices for individuals are issued on the consumer's request, need not be in KSeF, but the
    seller may send them to KSeF voluntarily. Confidence: HIGH Persona-relevant: yes
11. **Rachunek vs faktura:** MF FAQ (Wystawianie i otrzymywanie faktur, Q12): „Czynności zwolnione z
    VAT są dokumentowane fakturą wystawianą na żądanie nabywcy, a nie rachunkiem. Wystawca może
    zdecydować o udokumentowaniu czynności zwolnionej z VAT w przypadku braku żądania wystawienia
    faktury. W takim jednak przypadku należy także wystawić fakturę, nie rachunek. Taka faktura
    będzie wystawiana w KSeF." Q13: an exempt contractor „będzie wystawiał fakturę (ewentualnie
    fakturę uproszczoną …) na żądanie nabywcy"; such documents go through KSeF (stage dates: 1 Feb
    2026, 1 Apr 2026 or 1 Jan 2027). Q55: noty księgowe are not issued in KSeF. The answer was given
    to a budget unit; the Ordynacja podatkowa provisions on rachunek were not checked. Confidence:
    MEDIUM Persona-relevant: yes
12. **Permanent exclusion, art. 106ga ust. 2 pkt 6:** „przez podatnika korzystającego ze zwolnienia,
    o którym mowa w art. 113a ust. 1". Art. 113a ust. 1: exemption for a taxpayer with its business
    seat in an EU member state other than Poland, annual EU turnover up to 100 000 euro, sales in
    Poland within the art. 113 ust. 1 amount, EX identification number (ust. 2). Other exclusions in
    ust. 2: no seat or fixed establishment in Poland (pkt 1, 2), special procedures (pkt 3), buyer a
    private person (pkt 4), art. 106s regulation (pkt 5). Art. 106gb ust. 4 pkt 4: invoice to a
    buyer using 113a is shared in an agreed way. Confidence: HIGH Persona-relevant: only to say
    „this is not you"
13. **Sanctions, art. 106ni** (ust. 1–3, 5–7 in force from 1 Jan 2027, footnote 23): penalty up to
    100% of tax shown on the invoice issued outside KSeF, „a w przypadku faktury bez wykazanego
    podatku – … do 18,7 % kwoty należności ogółem" (the case of an exempt seller, whose invoice
    shows no VAT). MF announcement (16 Sep 2026): deferral of penalties to 31 Dec 2027; „Odroczenie
    kar nie oznacza braku obowiązku stosowania KSeF"; KAS will react to invoices issued outside
    KSeF. Source:
    https://www.gov.pl/web/finanse/przedluzenie-odroczenia-kar-za-bledy-w-stosowaniu-ksef-do-konca-2027-r
    Draft UD477: https://legislacja.rcl.gov.pl/projekt/12414954 (stage: uzgodnienia; not law).
    Confidence: HIGH (text and announcement), draft status may change Persona-relevant: yes
14. **Access without an accountant:** MF FAQ (Uprawnienia, Q2, Q3, Q4): a sole trader who is a VAT
    taxpayer and has a NIP gets owner permission automatically, nothing to file; logs in with Profil
    Zaufany or a qualified electronic signature; ZAW-FA only when the signature contains neither NIP
    nor PESEL. FAQ Q8: no „account" needs to be created. FAQ Q14: KSeF cannot issue an invoice
    without the seller's NIP (VAT-R and NIP-7 first). Confidence: HIGH Persona-relevant: yes
15. **Free tool:**
    https://ksef.podatki.gov.pl/czy-trzeba-miec-platny-program-zeby-wystawiac-faktury-w-ksef/ „Nie.
    Ministerstwo Finansów zapewnia bezpłatne narzędzia – Aplikację Podatnika KSeF … i Aplikację
    Mobilną KSeF." Aplikacja Podatnika KSeF 2.0 page
    (https://ksef.podatki.gov.pl/aplikacja-podatnika-ksef-20/): free, „wystawianie, odbieranie i
    przeglądanie faktur", UPO download, can be „pełnoprawną alternatywą" to commercial software;
    production https://ap.ksef.mf.gov.pl/; test version (no legal effect)
    https://ap-test.ksef.mf.gov.pl/web/; video tutorial list there includes „6 Wystawianie faktury
    VAT". Confidence: HIGH Persona-relevant: yes

## Unsettled Questions

- Whether an invoice for a 2026 sale, requested and issued in January 2027 (within the 3-month
  window of art. 106b ust. 3 pkt 2), is covered by art. 145m. By its wording the rule covers
  invoices issued by 31 Dec 2026, so such an invoice would go through KSeF. MF has not addressed
  this case (not found in the FAQ).
- Whether the MF Q12 answer on rachunek (given for a budget unit) is the MF position for sole
  traders in general; Ordynacja podatkowa text not checked.
- Whether login via mObywatel (Węzeł Krajowy) is live; FAQ only says it was planned from 1 Apr 2026.
  Not stated in the post.
- Whether the draft UD477 will be enacted unchanged (penalties from 2028).
- Art. 113 ust. 13 excludes some service types (legal, consulting, jewellery, debt collection) from
  the exemption; not covered in the post.

## Suggested Sources Section

- VAT Act, consolidated text (Dz.U. 2026 poz. 1263): art. 106b, 106e, 106ga, 113, 113a, 145m, 106ni
- FAQ MF KSeF 2.0
- MF: Etapy wdrożenia KSeF
- MF: Aplikacja Podatnika KSeF 2.0
- MF: Czy trzeba mieć płatny program, żeby wystawiać faktury w KSeF?
- MF: Przedłużenie odroczenia kar za błędy w stosowaniu KSeF do końca 2027 r.

**Freshness:** 2026-10-07. Recheck after: enactment of UD477, any amendment of art. 145m or 113, new
FAQ entries on rachunek or exempt taxpayers, 1 Jan 2027.
