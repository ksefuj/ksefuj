# Official KSeF FA(3) Test Examples

These XML files are official examples from the Polish Ministry of Finance for testing KSeF FA(3)
invoice validation.

## Source

**Downloaded from:** https://ksef.podatki.gov.pl/pliki-do-pobrania-ksef-20/

**Direct ZIP link:**
https://ksef.podatki.gov.pl/media/e5cia0ey/przykladowe-pliki-dla-struktury-logicznej-e-faktury-fa-3.zip

**Date:** November 2024 **Version:** FA(3) schema v1-0E

## Contents

26 example XML files covering various invoice scenarios:

1. **FA_3_Przykład_1.xml** - Standard VAT invoice with payment
2. **FA_3_Przykład_2.xml** - Correction invoice (universal method with StanPrzed)
3. **FA_3_Przykład_3.xml** - Correction invoice (difference method)
4. **FA_3_Przykład_4.xml** - Wholesale invoice with factor and carrier
5. **FA_3_Przykład_5.xml** - Correction of buyer data
6. **FA_3_Przykład_6.xml** - Collective correction invoice with discount
7. **FA_3_Przykład_7.xml** - Collective correction for partial deliveries
8. **FA_3_Przykład_8.xml** - VAT margin invoice for used goods
9. **FA_3_Przykład_9.xml** - Operating lease services invoice
10. **FA_3_Przykład_10.xml** - Advance invoice with additional buyer
11. **FA_3_Przykład_11.xml** - Correction of advance invoice (wrong tax rate)
12. **FA_3_Przykład_12.xml** - Correction of advance invoice (payment amount)
13. **FA_3_Przykład_13.xml** - Correction of advance invoice (order value change)
14. **Fa_3_Przykład_14.xml** - Settlement invoice for advance payment
15. **FA_3_Przykład_15.xml** - Simplified invoice (≤450 PLN)
16. **FA_3_Przykład_16.xml** - Simplified invoice (alternative format)
17. **Fa_3_Przykład_17.xml** - Incorrectly issued settlement invoice
18. **Fa_3_Przykład_18.xml** - Correction of settlement invoice
19. **Fa_3_Przykład_19.xml** - VAT margin for tourism services
20. **Fa_3_Przykład_20.xml** - Domestic invoice in foreign currency (single rate)
21. **FA_3_Przykład_21.xml** - Domestic invoice in foreign currency (multiple rates)
22. **FA_3_Przykład_22.xml** - WDT (intra-community supply) invoice
23. **FA_3_Przykład_23.xml** - Export invoice
24. **FA_3_Przykład_24.xml** - Invoice with attachment (energy details)
25. **FA_3_Przykład_25.xml** - Invoice with attachment (empty elements)
26. **FA_3_Przykład_26.xml** - Invoice with deposit system info

## Purpose

These examples are used in our test suite to ensure the validator correctly handles all official
invoice scenarios as defined by the Ministry of Finance. They serve as the gold standard for KSeF
FA(3) validation compliance.

## Important Note

These files are **NOT** included in the published npm package. They are only used during development
and testing.

## License

These examples are publicly available from the Polish government website for testing purposes.
