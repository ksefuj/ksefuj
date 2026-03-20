# Test Fixtures

Comprehensive test suite for KSeF FA(3) invoice validation, containing official Ministry of Finance examples and synthetic error cases.

## Structure

```
test-fixtures/
├── official-examples/     # 26 official MF examples
│   ├── FA_3_Przykład_1.xml
│   ├── FA_3_Przykład_2.xml
│   └── ...
└── error-cases/          # Synthetic validation test cases
    ├── 21-wrong-tax-calculation.xml
    ├── 23-missing-bank-account-validation.xml
    ├── 24-duplicate-line-numbers.xml
    └── 25-negative-quantities.xml
```

## Official Examples

The `official-examples/` directory contains the complete set of 26 official FA(3) invoice examples from the Polish Ministry of Finance, demonstrating various invoice types and scenarios.

### Invoice Types Covered

- **Standard invoices** - Basic sales transactions (Examples 1, 4)
- **Corrective invoices** - Universal method (Example 2), difference method (Example 3), bulk corrections (Examples 6-7)
- **Advance invoices** - Down payments and settlements (Examples 10-14)
- **Simplified invoices** - Transactions ≤450 PLN (Examples 15-16)
- **VAT margin procedures** - Used goods, tourism services (Examples 8, 19)
- **Special transactions** - WDT, exports, foreign currency (Examples 20-23)
- **Attachments** - Detailed breakdowns (Examples 24-25)

### Notable Validation Cases

- **Example 2** - Corrective invoice with duplicate line numbers (valid pattern for before/after states)
- **Example 8** - VAT margin invoice using P_13_11 field without corresponding tax amounts
- **Example 16** - Simplified invoice with only P_15, no P_13_x/P_14_x breakdown
- **Example 18** - Complex corrective invoice with proportional adjustments

## Error Cases

The `error-cases/` directory contains synthetic test fixtures designed to trigger specific validation rules.

### Validation Rules Tested

- `21-wrong-tax-calculation.xml` - Tax arithmetic validation (P_14_x ≠ P_13_x × rate)
- `23-missing-bank-account-validation.xml` - Invalid Polish bank account format
- `24-duplicate-line-numbers.xml` - Duplicate line numbers in standard invoices
- `25-negative-quantities.xml` - Negative quantities in non-corrective invoices

## Usage

### Running Tests

```bash
# Run all fixture tests
pnpm test:fixtures

# Run specific test category
pnpm test:integration
```

### Validator Testing

These fixtures are used by the integration test suite to verify that the @ksefuj/validator package correctly:

- **Validates official examples** - All 26 MF examples should pass validation (with warnings allowed)
- **Detects errors** - Synthetic error cases should be rejected with specific error codes
- **Covers edge cases** - Special invoice types and validation scenarios

### Adding New Fixtures

1. **Official examples** - Place new MF examples in `official-examples/`
2. **Error cases** - Create targeted test cases in `error-cases/`
3. **Naming** - Use descriptive filenames indicating the validation rule tested

## Validator Coverage

These fixtures test all 42 semantic validation rules across 8 categories:

1. **Podmiot Rules** (8 rules) - Entity validation, JST/GV requirements
2. **Fa Core Rules** (5 rules) - Required fields, mutual exclusions, currency handling
3. **Adnotacje Rules** (11 rules) - Mandatory annotations, selection logic
4. **FaWiersz Rules** (4 rules) - Tax rates, GTU format, decimal precision
5. **Corrective Invoice Rules** (2 rules) - KSeF number consistency
6. **Payment & Transaction Rules** (6 rules) - Payment validation, bank accounts
7. **Format Rules** (2 rules) - Number formatting, separators
8. **Additional Business Logic Rules** (4 rules) - Tax calculations, line numbering, quantities

## License

- **Official examples** - Public domain (Polish government publications)
- **Error cases** - Apache 2.0 (part of ksefuj project)
- **Test suite** - Apache 2.0

The official Ministry of Finance examples are used in accordance with Polish law regarding public sector information reuse.