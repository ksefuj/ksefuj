# Test Invoices with Intentional Errors

This directory contains 25 test invoices based on Ministry of Finance samples, each with intentional
validation errors to test the ksefuj validator. These cover various error types across XSD schema
validation, semantic rules, and formatting issues.

## Error Categories

### XSD Schema Validation Errors

These errors violate the XML schema structure and should be caught by `libxml2-wasm`:

1. **02-wrong-element-order.xml** - Elements in wrong order (violates xs:sequence)
2. **03-typo-in-element-name.xml** - Typo in element name (`Nazw` instead of `Nazwa`)
3. **13-malformed-xml.xml** - Missing closing tags
4. **16-invalid-xml-characters.xml** - Unescaped XML characters (`&`, `<`)
5. **18-missing-namespace.xml** - Missing required namespace declaration
6. **19-empty-required-fields.xml** - Empty values in required fields
7. **20-invalid-dates.xml** - Invalid date formats and values
8. **22-invalid-country-codes.xml** - Invalid ISO country codes

### Semantic Validation Errors

These errors violate business logic rules and should be caught by your 38 semantic rules:

#### P15_MISSING Rule

9. **01-missing-p15.xml** - Missing mandatory P_15 (total amount) field

#### JST/GV Rules

10. **05-jst1-without-podmiot3.xml** - JST=1 without required Podmiot3 with Rola=8
11. **17-gv1-without-podmiot3.xml** - GV=1 without required Podmiot3 with Rola=10

#### Adnotacje Rules

12. **04-missing-adnotacje-fields.xml** - Missing mandatory P_16, P_17, P_18, P_18A fields
13. **10-selection-logic-violation.xml** - Multiple selections in Zwolnienie and PMarzy (violates
    "exactly one" rule)

#### Tax Rate Rules

14. **06-foreign-buyer-wrong-tax-rate.xml** - Wrong tax rate for EU buyer (should be 'np', not 'oo')

#### NIP Placement Rules

15. **07-polish-nip-in-nrvatue.xml** - Polish NIP incorrectly in NrVatUE field instead of NIP field

#### Format Rules

16. **08-gtu-wrong-format.xml** - Wrong GTU format (`<GTU_12>1</GTU_12>` instead of
    `<GTU>GTU_12</GTU>`)
17. **09-excessive-decimal-places.xml** - Too many decimal places (violates precision limits)
18. **12-number-formatting-errors.xml** - Thousand separators and comma decimal separators

#### Currency Rules

19. **11-currency-inconsistency.xml** - Foreign currency invoice issues (WalutaUmowna=PLN when
    KodWaluty≠PLN)

#### Corrective Invoice Rules

20. **14-corrective-invoice-errors.xml** - Inconsistent KSeF numbers in corrective invoice

#### Payment Rules

21. **15-payment-date-errors.xml** - Payment dates before invoice date

#### Calculation Errors

22. **21-wrong-tax-calculation.xml** - Incorrect tax calculations (amounts don't match rates)

#### Bank Account Rules

23. **23-missing-bank-account-validation.xml** - Invalid bank account number format

#### Line Item Rules

24. **24-duplicate-line-numbers.xml** - Duplicate FaWiersz line numbers
25. **25-negative-quantities.xml** - Negative quantities in non-corrective invoice

## Expected Validation Results

### XSD Errors (Should fail XML parsing)

- Files 02, 03, 13, 16, 18, 19, 20, 22 should be rejected by libxml2-wasm before semantic validation

### Semantic Errors (Should pass XSD but fail semantic rules)

- Files 01, 04, 05, 06, 07, 08, 09, 10, 11, 12, 14, 15, 17, 21, 23, 24, 25 should pass XSD
  validation but trigger specific semantic error codes

## Testing the Validator

Use these files to test:

1. **XSD validation coverage** - Ensure malformed XML is properly caught
2. **Semantic rule coverage** - Verify all 38 business rules are working
3. **Error reporting** - Check that error messages are clear and helpful
4. **Performance** - Test with multiple files simultaneously
5. **Internationalization** - Verify errors appear in PL/EN/UK languages

## File Naming Convention

Files are numbered sequentially (01-25) and named descriptively:

- `XX-error-description.xml`
- Each file tests a specific validation scenario
- Based on real Ministry of Finance sample structures

## Usage

Drop these files into the ksefuj.to validator to test error detection and reporting. The validator
should identify and clearly explain each intentional error with suggested fixes.
