# Contributing to ksefuj

Thank you for your interest in contributing to ksefuj! This document provides guidelines and
standards for contributing to the project.

## 🤖 For AI Coding Assistants

If you're an AI assistant (Claude, ChatGPT, Cursor, etc.), please follow these standards:

1. **Read CLAUDE.md first** - It contains critical project context
2. **Use conventional commits** (see below)
3. **Run tests before committing**: `pnpm test`
4. **Format code**: `pnpm format`
5. **Check types**: `pnpm typecheck`
6. **Lint code**: `pnpm lint`

## 📋 Prerequisites

- **pnpm** 9.x or higher (required, not npm/yarn)
- **Node.js** 20.x or higher
- **Git** with conventional commits

```bash
# Install pnpm if you don't have it
npm install -g pnpm
```

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/ksefuj/ksefuj.git
cd ksefuj

# Install dependencies
pnpm install

# Run development server
pnpm dev

# Run tests
pnpm test

# Build all packages
pnpm build
```

## 💬 Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification. This is
**enforced** by commitlint.

### Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Code style changes (formatting, missing semicolons, etc)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **build**: Changes to build system or dependencies
- **ci**: Changes to CI configuration files
- **chore**: Other changes that don't modify src or test files

### Scopes

- **validator**: Changes to @ksefuj/validator package
- **web**: Changes to the web app
- **i18n**: Internationalization changes
- **semantic**: Semantic validation rules
- **xsd**: XSD validation related

### Examples

```bash
# Feature
feat(validator): add support for KSeF 2.0 schema
feat(i18n): add German language support

# Bug fix
fix(semantic): correct P_12 validation for reverse charge
fix(web): prevent file upload race condition

# Documentation
docs: update README with pnpm commands
docs(validator): add API examples

# Refactor
refactor(semantic): extract message keys to constants
refactor: rename internal validation functions

# Chores
chore: update dependencies
chore(deps): bump next.js to 15.0.1
```

## 🔄 Pull Request Process

### PR Title

Must follow the same convention as commits:

```
feat(validator): add currency validation rules
```

### PR Description Template

PRs will automatically use our template. Please fill it out completely:

- **What**: Brief description of changes
- **Why**: Context and motivation
- **How**: Technical approach
- **Testing**: How you tested the changes
- **Checklist**: Ensure all items are checked

### PR Requirements

1. **All tests must pass**
2. **Code must be formatted** (`pnpm format`)
3. **No TypeScript errors** (`pnpm typecheck`)
4. **No lint errors** (`pnpm lint`)
5. **Update documentation** if adding features
6. **Add tests** for new functionality
7. **Keep PRs focused** - one feature/fix per PR

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run specific package tests
pnpm --filter @ksefuj/validator test
```

### Test Requirements

- New features must include tests
- Bug fixes should include regression tests
- Maintain >80% code coverage
- Tests must be deterministic (no flaky tests)

## 💅 Code Style

### General Rules

1. **TypeScript strict mode** - no `any` types
2. **Functional over imperative** where practical
3. **Explicit over implicit**
4. **Composition over inheritance**
5. **Pure functions** where possible

### Naming Conventions

```typescript
// Files: kebab-case
semantic - rules.ts;
validate - xml.ts;

// Interfaces/Types: PascalCase
interface ValidationResult {}
type Locale = "pl" | "en" | "ua";

// Functions/Variables: camelCase
function validateInvoice() {}
const errorMessage = "";

// Constants: SCREAMING_SNAKE_CASE
const MAX_FILE_SIZE = 10_000_000;

// React Components: PascalCase
function InvoiceValidator() {}

// Hooks: camelCase with 'use' prefix
function useValidation() {}
```

### File Structure

```typescript
// 1. Imports (sorted)
import { type Foo } from "external";
import { bar } from "@/internal";
import { baz } from "./local";

// 2. Type definitions
interface Props {}

// 3. Constants
const DEFAULT_LOCALE = "pl";

// 4. Main export
export function validate() {}

// 5. Helper functions
function helper() {}
```

### React/Next.js Conventions

```tsx
// Prefer function components
function Component({ prop }: Props) {
  return <div>{prop}</div>;
}

// Use explicit return types for components
function Page(): JSX.Element {
  return <main>Content</main>;
}

// Colocate styles with components (CSS modules or Tailwind)
```

### Error Handling

```typescript
// Be explicit about errors
function validate(xml: string): Result<ValidationOutput, ValidationError> {
  try {
    // ...
    return { ok: true, data };
  } catch (error) {
    return { ok: false, error: parseError(error) };
  }
}

// Never swallow errors silently
// Always log or handle appropriately
```

## 🌍 Internationalization

All user-facing strings must support i18n:

```typescript
// ❌ Bad
const error = "Brak elementu JST";

// ✅ Good
const error = getMessage(locale, "PODMIOT2_JST_MISSING");
```

### Adding Translations

1. Add message key to `packages/validator/src/messages.ts`
2. Provide translations for all locales (pl, en, ua)
3. Use consistent key naming: `CONTEXT_SPECIFIC_MESSAGE`

## 📁 Project Structure

```
ksefuj/
├── apps/
│   └── web/                 # Next.js web app
├── packages/
│   └── validator/           # Core validation library
├── skills/                  # Claude AI skills
├── .github/
│   ├── workflows/          # CI/CD
│   └── PULL_REQUEST_TEMPLATE.md
├── CONTRIBUTING.md         # You are here
├── CLAUDE.md              # Project context for AI
└── README.md              # User-facing docs
```

## 🔍 Code Review Checklist

For reviewers:

- [ ] Code follows style guide
- [ ] Tests are included and pass
- [ ] Documentation is updated
- [ ] Commit messages follow convention
- [ ] No commented-out code
- [ ] No console.logs in production code
- [ ] Error handling is appropriate
- [ ] i18n is properly implemented
- [ ] Performance implications considered
- [ ] Security implications reviewed

## 🐛 Reporting Issues

Use GitHub Issues with these templates:

- **Bug Report**: For reporting bugs
- **Feature Request**: For suggesting features
- **Question**: For asking questions

Include:

- Clear title
- Reproduction steps (for bugs)
- Expected vs actual behavior
- Environment details
- Screenshots if relevant

## 📜 License

By contributing, you agree that your contributions will be licensed under the Apache 2.0 license.

## 🤝 Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## 💡 Tips for AI Assistants

When using AI coding assistants:

1. **Always provide CLAUDE.md** as context
2. **Specify conventional commits**: "Use conventional commit format"
3. **Request tests**: "Include tests for this feature"
4. **Check formatting**: "Run pnpm format after changes"
5. **Verify builds**: "Ensure pnpm build passes"

Example prompt:

```
Read CLAUDE.md for context.
Add feature X using conventional commits.
Include tests and update documentation.
Run pnpm format, lint, and test before committing.
```

## 📞 Getting Help

- **Discussions**: [GitHub Discussions](https://github.com/ksefuj/ksefuj/discussions) for questions
  and community
- **Issues**: Report bugs via GitHub Issues

---

Thank you for contributing to make KSeF tools accessible to everyone! 🚀
