# Corrective Invoice Procedures — Official MF Rules

> Source: Podręcznik KSeF 2.0, Cz. II, §2.13 (February 2026 edition).
> In-repo canonical: `docs/knowledge-base/briefs/podrecznik-ksef-20-czesc-ii.md`

## Key Principles

1. **No editing after submission.** Once a KSeF number is assigned, the invoice cannot be modified.
   The only correction mechanism is a corrective invoice (§1.6.2).

2. **No cancellation.** A KSeF-registered invoice has entered legal circulation. No anulowanie,
   even for wrong-buyer scenarios (§1.6.3).

3. **Noty korygujące abolished.** Since 1 Feb 2026, buyer-issued correction notes no longer exist.
   All corrections go through corrective invoices issued by the seller (§1.6.2).

4. **Invoices stored 10 years.** Taxpayers cannot delete them (§7).

## Wrong Buyer NIP — Two-Document Procedure (§1.6.4)

When the wrong NIP was entered in Podmiot2/DaneIdentyfikacyjne/NIP, the invoice was delivered to
the wrong entity. The procedure is:

1. Issue a corrective invoice "to zero" addressed to the **wrong** NIP (negate all amounts)
2. Issue a new original invoice (RodzajFaktury=VAT) with the **correct** NIP

**Never** correct a NIP to a different value. The wrong-NIP invoice belongs to the entity
identified by that NIP — it must be zeroed out, not re-pointed.

## Corrective Invoice Types (§2.13.1)

| RodzajFaktury | Corrects |
|---|---|
| KOR | Standard invoice (VAT) or simplified (UPR) |
| KOR_ZAL | Advance invoice (ZAL) |
| KOR_ROZ | Settlement invoice (ROZ) |

## Key Fields

- **PrzyczynaKorekty** — reason (optional but recommended)
- **TypKorekty** — when correction takes effect:
  - `1` = effective at original invoice date
  - `2` = effective at correction date
  - `3` = effective at another date
- **NrFaKorygowany** — corrected invoice number (only when the number itself was wrong)
- **DaneFaKorygowanej** — references to corrected invoices (max 50,000)
- **P_15ZK** — amount before correction (for KOR_ZAL/KOR_ROZ)
- **KursWalutyZK** — exchange rate before correction (for foreign-currency KOR_ZAL)

## Presenting Differences (§2.13.2)

P_13_x, P_14_x, P_14_xW, P_15 are filled **by difference** relative to the original.

> Example: Original net 2000, VAT 460, gross 2460. Correction to net 1800.
> → P_13_1 = -200, P_14_1 = -46, P_15 = -246.

## Multiple Corrections to One Invoice (§2.13.3)

- Each correction refers to the **original** invoice in DaneFaKorygowanej (not to previous corrections)
- Deltas are relative to the **current state** (original + all previous corrections)

> Example: Original 1000 → Correction 1 (-100, to 900) → Correction 2 (-200, to 700).
> Correction 2 references the original and has P_13_1 = -200.

## Three FaWiersz Correction Methods (§2.13.4)

1. **Delta method** — one row per corrected line, showing the difference
2. **StanPrzed method** — two rows: first with `StanPrzed=1` (before), second without (after).
   Recommended when changing VAT rate or currency.
3. **Storno method** — like StanPrzed but without the flag; first row uses negative values.

**UU_ID** — optional universal unique line identifier. Links correction rows to original rows.
Must be assigned in the original invoice. Unique across all invoices of a taxpayer.

## Correcting Advance and Settlement Invoices (§2.13.5)

- Even when the correction doesn't change order values, include Zamowienie before/after state
  (for KOR_ZAL) or FaWiersz (for KOR_ROZ)
- `WartoscZamowienia` in correction = correct order value after correction
- `P_15` = difference in advance/settlement amount vs original

## DaneFaKorygowanej — KSeF vs Non-KSeF Originals (§2.13.6)

**Original in KSeF:**

```
DataWystFaKorygowanej + NrFaKorygowanej + NrKSeF=1 + NrKSeFFaKorygowanej
```

**Original outside KSeF:**

```
DataWystFaKorygowanej + NrFaKorygowanej + NrKSeFN=1
```

Can mix both in one batch correction (max 50,000 entries).

## Batch Corrections — Korekta Zbiorcza (§2.13.7)

For period-based rebates/discounts (art. 106j ust. 3):

- Multiple DaneFaKorygowanej entries (one per original invoice)
- `OkresFaKorygowanej` — free-text period description (e.g., "January–March 2026")
- When correction covers **all** deliveries → FaWiersz can be omitted
- When correction covers **some** items → FaWiersz with P_7 naming affected goods/services
- Works for both "in minus" and "in plus" corrections

## Podmiot1K and Podmiot2K (§2.13.8)

**Podmiot1K** — seller data from the original (before correction). Used when seller's name,
address, or other non-NIP data changed. Correct data goes in Podmiot1.

**Podmiot2K** — buyer data from the original (before correction). Used when buyer's name,
address, or other non-NIP data changed. Correct data goes in Podmiot2.

**IDNabywcy** — links Podmiot2K to the corresponding Podmiot2 (max 32 chars). Required when
Podmiot2K is present.

> Buyer NIP **cannot** be corrected via Podmiot2K. Wrong NIP = zero + new invoice.

## Test Invoices Sent to Production (§3.2.3)

If a test invoice was accidentally submitted to production KSeF, it is a legally valid invoice
(art. 108 — obligation to pay the tax). Immediately correct to zero.
