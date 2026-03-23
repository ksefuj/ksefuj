# Integration Tests

This directory contains integration tests for the ksefuj monorepo.

## Structure

```
test/
├── integration/
│   └── fixtures.test.ts    # Tests validator with real-world XML fixtures
└── README.md
```

## Running Tests

### All Tests (Unit + Integration)

```bash
pnpm test              # Run all package unit tests
pnpm test:integration  # Run integration tests
```

### Fixture Tests

```bash
pnpm test:fixtures     # Alias for test:integration
```

## Test Fixtures Location

Test fixtures are stored at the monorepo root in `/test-fixtures/`:

- `official-examples/` - Valid examples from Ministry of Finance
- `error-cases/` - Synthetic test cases with intentional errors

## Requirements

- Tests must be run from the monorepo root
- Validator package must be built first (`pnpm build`)
- Test fixtures must exist in `/test-fixtures/`

## Why Integration Tests?

Integration tests are separated from package unit tests because they:

1. Require access to external test fixtures
2. Test the built package output
3. Validate real-world scenarios
4. Run across package boundaries
