# ksefuj

Narzędzia open source do obsługi polskich e-faktur KSeF FA(3).

**100% darmowe, zawsze** — bez limitów, bez rejestracji, bez ukrytych kosztów
**Prywatność** — wszystko działa lokalnie w przeglądarce
**Wielojęzyczne** — polski, angielski, ukraiński

🌐 **[ksefuj.to](https://ksefuj.to)** — darmowy walidator online  
📦 **[@ksefuj/validator](https://www.npmjs.com/package/@ksefuj/validator)** — npm package + CLI

## Co to jest

- **Walidator XML** — sprawdza fakturę KSeF FA(3) pod kątem poprawności schematu XSD i reguł semantycznych
- **100% client-side** — Twoje dane nie opuszczają przeglądarki
- **CLI** — `npx @ksefuj/validator faktura.xml`
- **Claude Skills** — gotowe skille do generowania e-faktur w Claude Projects

## Szybki start

### Web

Wejdź na [ksefuj.to](https://ksefuj.to), wrzuć plik XML, gotowe.

### CLI

```bash
npx @ksefuj/validator faktura.xml
```

### Jako dependency

```bash
pnpm add @ksefuj/validator
# lub npm install @ksefuj/validator
# lub yarn add @ksefuj/validator
```

```typescript
import { validate } from "@ksefuj/validator";

// domyślnie polski
const result = validate(xmlString);

// lub z wyborem języka
const result = validate(xmlString, { locale: 'en' }); // 'pl' | 'en' | 'ua'

if (!result.valid) {
  for (const error of result.errors) {
    console.error(error.message, error.path);
  }
}
```

## Struktura repo

```
ksefuj/
├── packages/
│   └── validator/       ← @ksefuj/validator (npm + CLI)
├── apps/
│   └── web/             ← ksefuj.to (Next.js)
└── skills/
    └── ksef-fa3/        ← Claude skill do generowania faktur
```

## Co sprawdza walidator

### Reguły semantyczne (już zaimplementowane)

- Wymagane pola JST i GV w Podmiot2
- Poprawna enumeracja P_12 (stawki VAT)
- Spójność reverse charge (P_13_8 ↔ P_18 ↔ P_12)
- Kurs waluty we właściwym miejscu (FaWiersz vs Fa)
- Poprawny format GTU (`<GTU>GTU_12</GTU>`, nie `<GTU_12>1</GTU_12>`)
- Kompletność Adnotacji
- Zbędne zera końcowe (warning)

### XSD schema validation (w trakcie)

Pełna walidacja XSD w przeglądarce przez libxml2-wasm.

## Skills

Katalog `skills/` zawiera skille do Claude Projects:

- **ksef-fa3** — generowanie faktur XML FA(3) z danych wejściowych (PDF, tekst, formularz)

Instrukcja instalacji: pobierz plik `.skill` z [Releases](https://github.com/ksefuj/ksefuj/releases) i dodaj do projektu w Claude.

## Rozwój

Wymagany pnpm:

```bash
git clone https://github.com/ksefuj/ksefuj.git
cd ksefuj
pnpm install
pnpm dev              # uruchamia web app na localhost:3000
pnpm build            # buduje wszystkie pakiety
```

## Licencja

Apache 2.0

Permisywna licencja open source. Możesz używać, modyfikować i dystrybuować kod, również komercyjnie. Wymagane jest tylko zachowanie informacji o licencji i autorach.
