/**
 * Exchange-rate reference date selection — Art. 31a ustawy o VAT.
 *
 * Art. 31a ust. 1 (general rule): amounts in a foreign currency are converted
 * using the NBP mid-rate announced on the last business day preceding the day
 * the **tax obligation** arises (`dzień powstania obowiązku podatkowego`).
 *
 * Art. 31a ust. 2 (exception): when the invoice is issued **before** the tax
 * obligation arises, the rate is taken from the last business day preceding the
 * **issue date**, which `P_1` records in every transmission mode: an online invoice
 * is deemed issued when it reaches KSeF (Art. 106na ust. 1) and §9.2 requires `P_1`
 * to carry that day, while offline24, offline and awaria invoices are issued on
 * `P_1` itself even though they reach KSeF later (Art. 106nda ust. 10, reached for
 * a late-transmitted online invoice by ust. 16 and for KSeF unavailability by
 * Art. 106nh ust. 4; Art. 106nf ust. 9 for awaria).
 *
 * The two rules collapse into one selection: the reference date is the earlier
 * of the issue date and the tax-obligation date, and the applicable rate is the
 * last NBP publication strictly before it.
 *
 * This resolves the *default* basis only. A taxpayer may instead elect ECB rates
 * (ust. 1 zd. 2) or income-tax conversion rules (ust. 2a, locked in for 12 months
 * by ust. 2b). Since 1 Feb 2026 they may also take the issue-date rate for supplies
 * and services "dla których obowiązek podatkowy powstaje z chwilą wystawienia
 * faktury" — which reaches beyond Art. 19a ust. 5 pkt 3/4 to Art. 20 ust. 1 WDT —
 * provided the structured invoice was issued "nie później niż następnego dnia po
 * dniu, o którym mowa w art. 106e ust. 1 pkt 1" (ust. 1a, and the same condition as
 * sentence 2 of ust. 2). FA(3) records none of these elections, so a rate that
 * disagrees with this selection is grounds for a warning, never for an error.
 *
 * This module is intentionally free of XML and network concerns so both the
 * semantic validator and the web calculator can share the same selection logic.
 */

/**
 * Which paragraph of Art. 31a supplied the reference date.
 *
 * `issue_date_assumed` is not a third rule but an admission: with no tax-obligation
 * date to compare against, the issue date is used as a fallback and which paragraph
 * governs is undetermined. Callers must not cite ust. 2 in that case — an invoice
 * issued on the day of sale is governed by ust. 1 and yields the same date.
 */
export type RateReferenceRule = "tax_point" | "issue_date" | "issue_date_assumed";

export interface RateReference {
  /** YYYY-MM-DD — the rate is the last NBP publication strictly before this date. */
  readonly date: string;
  /** `tax_point` = Art. 31a ust. 1, `issue_date` = Art. 31a ust. 2, `issue_date_assumed` = undetermined. */
  readonly rule: RateReferenceRule;
}

/**
 * Resolve the date whose preceding business day supplies the NBP rate.
 *
 * @param issueDate - invoice issue date (`P_1`), YYYY-MM-DD
 * @param taxPointDate - date the tax obligation arises, YYYY-MM-DD, or null when unknown
 * @returns the reference date and the rule that produced it, or null when neither date is known
 */
export function resolveRateReference(
  issueDate: string | null | undefined,
  taxPointDate: string | null | undefined,
): RateReference | null {
  if (!taxPointDate) {
    // No tax point to go on — the issue date is the only anchor the document offers.
    // Art. 106e ust. 1 pkt 6 only requires a delivery date when it differs from the
    // issue date, so its absence usually means the two coincide and ust. 1 applies.
    return issueDate ? { date: issueDate, rule: "issue_date_assumed" } : null;
  }
  if (!issueDate) {
    return { date: taxPointDate, rule: "tax_point" };
  }
  // ust. 2 applies only when the invoice is issued strictly before the tax obligation arises.
  return issueDate < taxPointDate
    ? { date: issueDate, rule: "issue_date" }
    : { date: taxPointDate, rule: "tax_point" };
}

/**
 * Reference dates that may legitimately govern the rate on a given invoice.
 *
 * The tax-obligation date can rarely be read off the XML with certainty. Art. 19a
 * ust. 5 puts the tax point on invoice issuance for two groups: pkt 3 (construction
 * and construction-assembly services, supply and printing of books and periodicals)
 * and pkt 4 (among others: electricity, heat, cooling and piped gas, telecoms, the
 * zał. nr 3 poz. 24–37, 50–51 group covering water supply, sewage and waste, rental,
 * lease, leasing, security and property custody, permanent legal and office services,
 * energy distribution). The second group matters most here, because `OkresFa` is
 * annotated in the XSD as covering
 * Art. 19a ust. 3 zd. 1, ust. 4 *and* ust. 5 pkt 4 — a monthly consulting retainer
 * and a monthly office rental produce identical XML with opposite tax points.
 * Art. 31a ust. 1a additionally lets the ust. 5 taxpayers elect the issue-date rate
 * outright, provided the structured invoice reached KSeF within a day.
 *
 * So when the inferred tax point precedes the issue date, both readings are
 * defensible and both rates must be accepted. Art. 19a ust. 7 can move the tax point
 * again for a late-issued ust. 5 invoice, to a statutory deadline no field records —
 * a case neither candidate covers.
 *
 * The first entry is the primary reading (the general rule) and is the one to
 * suggest as a fix.
 *
 * @returns reference dates, most-authoritative first; empty when no date is known
 */
export function rateReferenceCandidates(
  issueDate: string | null | undefined,
  taxPointDate: string | null | undefined,
): RateReference[] {
  const primary = resolveRateReference(issueDate, taxPointDate);
  if (!primary) {
    return [];
  }
  if (primary.rule === "issue_date" || !issueDate || primary.date === issueDate) {
    return [primary];
  }
  // Tax point precedes the issue date — Art. 19a ust. 5 could still put the tax
  // point on the issue date, so keep that reading as an accepted alternative.
  return [primary, { date: issueDate, rule: "issue_date" }];
}
