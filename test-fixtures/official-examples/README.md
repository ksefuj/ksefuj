# Official Ministry of Finance Examples

These are official example invoices from the Polish Ministry of Finance, demonstrating correct KSeF
FA(3) XML structure.

## Source

Downloaded from the Ministry of Finance website, included in "Przykładowe pliki dla struktury
logicznej e-Faktury FA(3)" package.

## Files

All 27 examples cover various invoice scenarios:

- **FA_3_Przykład_1.xml** - Basic VAT invoice
- **FA_3_Przykład_2.xml** - Corrective invoice (KOR)
- **FA_3_Przykład_3.xml** - Corrective invoice with line items
- **FA_3_Przykład_4.xml** - Invoice with factor (Podmiot3)
- **FA_3_Przykład_5.xml** - Invoice with multiple tax rates
- **FA_3_Przykład_6.xml** - Invoice with GTU codes
- **FA_3_Przykład_7.xml** - Invoice with procedura codes
- **FA_3_Przykład_8.xml** - Invoice with discounts
- **FA_3_Przykład_9.xml** - Invoice with foreign currency
- **FA_3_Przykład_10.xml** - Invoice with transport details
- **FA_3_Przykład_11.xml** - Corrective advance invoice (KOR_ZAL)
- **FA_3_Przykład_12.xml** - Invoice with multiple Podmiot3
- **FA_3_Przykład_13.xml** - Invoice with bank account details
- **Fa_3_Przykład_14.xml** - Invoice with payment terms
- **FA_3_Przykład_15.xml** - Simplified invoice
- **FA_3_Przykład_16.xml** - Invoice for EU buyer
- **Fa_3_Przykład_17.xml** - Invoice with reverse charge
- **Fa_3_Przykład_18.xml** - Export invoice
- **Fa_3_Przykład_19.xml** - Invoice with exemptions
- **Fa_3_Przykład_20.xml** - Invoice with margin scheme
- **FA_3_Przykład_21.xml** - Invoice with advance payment
- **FA_3_Przykład_22.xml** - Invoice for JST entity
- **FA_3_Przykład_23.xml** - Invoice for GV entity
- **FA_3_Przykład_24.xml** - Complex invoice with all features
- **FA_3_Przykład_25.xml** - Invoice with attachments
- **FA_3_Przykład_26.xml** - Invoice with custom fields

## Usage

These files should all pass validation when tested with the ksefuj validator. They serve as:

1. **Reference implementations** - Show correct structure and field usage
2. **Test data** - Validate that the validator accepts correct invoices
3. **Examples** - Help developers understand proper FA(3) structure

## Note

The file naming inconsistency (some use "FA_3", others "Fa_3") is from the original Ministry package
and preserved for authenticity.
