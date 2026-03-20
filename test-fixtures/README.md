# Test Fixtures

Test XML invoice files for validating KSeF FA(3) compliance.

## Structure

```
test-fixtures/
├── official-examples/     # Ministry of Finance official examples (valid)
├── error-cases/          # Intentional errors for testing validation
└── README.md
```

## Collections

### `/official-examples`

Official valid examples from the Polish Ministry of Finance. These should all pass validation and
serve as reference implementations.

### `/error-cases`

Synthetic test cases with intentional validation errors to ensure the validator properly catches and
reports issues. Each file tests specific error scenarios.

## Usage

### Testing the Validator

```bash
# Test with valid examples (should all pass)
pnpm test:fixtures:valid

# Test with error cases (should all fail with specific errors)
pnpm test:fixtures:errors
```

### Web Testing

Drop files from either directory into ksefuj.to to test the drag-and-drop validator.

## License Note

Official examples are provided by the Polish Ministry of Finance for public use. Error cases are
created specifically for this project under Apache 2.0.
