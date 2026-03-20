// Content translations for the landing page
export const getPageContent = (locale: string) => {
  const getText = <T>(pl: T, uk: T, en: T): T => {
    if (locale === "pl") {
      return pl;
    }
    if (locale === "uk") {
      return uk;
    }
    return en;
  };

  return {
    hero: {
      title: getText(
        "Sprawdź swoją e-fakturę",
        "Перевірте свою е-фактуру",
        "Validate your e-invoice",
      ),
      description: getText(
        "Wrzuć XML, zobacz błędy. Dane nie opuszczają Twojego komputera.",
        "Завантажте XML, побачте помилки. Дані не залишають ваш комп'ютер.",
        "Drop XML, see errors. Data stays in your browser.",
      ),
      trustLine: getText(
        "100% darmowy • Open Source • Apache 2.0",
        "100% безкоштовний • Open Source • Apache 2.0",
        "100% Free • Open Source • Apache 2.0",
      ),
    },
    features: {
      title: getText("Dlaczego ksefuj?", "Чому ksefuj?", "Why ksefuj?"),
      subtitle: getText(
        "Narzędzie stworzone z myślą o polskich przedsiębiorcach",
        "Інструмент, створений для польських підприємців",
        "Built for Polish entrepreneurs",
      ),
      items: [
        {
          title: getText("Oficjalna walidacja", "Офіційна валідація", "Official validation"),
          description: getText(
            "Używamy oficjalnego schematu XSD z Ministerstwa Finansów oraz sprawdzamy reguły biznesowe",
            "Використовуємо офіційну схему XSD з Міністерства фінансів та перевіряємо бізнес-правила",
            "Using official XSD schema from Ministry of Finance plus business rules",
          ),
          accent: "violet" as const,
        },
        {
          title: getText("100% prywatności", "100% приватності", "100% privacy"),
          description: getText(
            "Twój plik nie opuszcza przeglądarki. Żadne dane nie są wysyłane na serwer",
            "Ваш файл не залишає браузер. Жодні дані не надсилаються на сервер",
            "Your file never leaves the browser. No data sent to any server",
          ),
          accent: "emerald" as const,
        },
        {
          title: getText("Zawsze darmowy", "Завжди безкоштовний", "Forever free"),
          description: getText(
            "Bez limitów, bez rejestracji, bez ukrytych opłat. Licencja Apache 2.0",
            "Без лімітів, без реєстрації, без прихованих платежів. Ліцензія Apache 2.0",
            "No limits, no signup, no hidden fees. Apache 2.0 license",
          ),
          accent: "amber" as const,
        },
      ],
    },
    validation: {
      title: getText("Co sprawdzamy?", "Що перевіряємо?", "What we check"),
      subtitle: getText(
        "Dwupoziomowa walidacja zapewnia zgodność z wymogami KSeF",
        "Дворівнева валідація забезпечує відповідність вимогам KSeF",
        "Two-layer validation ensures KSeF compliance",
      ),
      layers: [
        {
          badge: getText("Poziom 1", "Рівень 1", "Layer 1"),
          title: getText("Struktura XML (XSD)", "Структура XML (XSD)", "XML Structure (XSD)"),
          description: getText(
            "Oficjalny schemat z Ministerstwa Finansów",
            "Офіційна схема з Міністерства фінансів",
            "Official schema from Ministry of Finance",
          ),
          checks: getText(
            [
              "Poprawność struktury dokumentu",
              "Wymagane pola i elementy",
              "Typy danych i formaty",
              "Kolejność elementów",
            ],
            [
              "Правильність структури документа",
              "Обов'язкові поля та елементи",
              "Типи даних і формати",
              "Порядок елементів",
            ],
            [
              "Document structure validity",
              "Required fields and elements",
              "Data types and formats",
              "Element order",
            ],
          ),
        },
        {
          badge: getText("Poziom 2", "Рівень 2", "Layer 2"),
          title: getText("Reguły biznesowe", "Бізнес-правила", "Business Rules"),
          description: getText(
            "Logika biznesowa niemożliwa do wyrażenia w XSD",
            "Бізнес-логіка, яку неможливо виразити в XSD",
            "Business logic not expressible in XSD",
          ),
          checks: getText(
            [
              "Podmiot2 wymaga JST i GV",
              "Stawki VAT zgodne z przepisami",
              "Spójność odwrotnego obciążenia",
              "Poprawny format GTU i SW",
            ],
            [
              "Podmiot2 вимагає JST та GV",
              "Ставки ПДВ відповідно до правил",
              "Узгодженість зворотного навантаження",
              "Правильний формат GTU та SW",
            ],
            [
              "Podmiot2 requires JST and GV",
              "VAT rates according to rules",
              "Reverse charge consistency",
              "Correct GTU and SW format",
            ],
          ),
        },
      ],
    },
    gettingStarted: {
      title: getText("Nie masz pliku XML?", "Немає файлу XML?", "Don't have an XML file?"),
      subtitle: getText(
        "Zacznij od jednego z tych kroków",
        "Почніть з одного з цих кроків",
        "Start with one of these steps",
      ),
      steps: [
        {
          number: "1",
          title: getText("Eksport z programu", "Експорт з програми", "Export from software"),
          description: getText(
            "Większość programów księgowych ma opcję eksportu faktury do XML w formacie FA(3)",
            "Більшість бухгалтерських програм має можливість експорту рахунку в XML у форматі FA(3)",
            "Most accounting software has an option to export invoices to FA(3) XML format",
          ),
          code: getText(
            "Plik → Eksport → KSeF FA(3)",
            "Файл → Експорт → KSeF FA(3)",
            "File → Export → KSeF FA(3)",
          ),
        },
        {
          number: "2",
          title: getText("Pobierz z KSeF", "Завантажте з KSeF", "Download from KSeF"),
          description: getText(
            "Zaloguj się do portalu KSeF i pobierz XML dowolnej faktury",
            "Увійдіть на портал KSeF та завантажте XML будь-якого рахунку",
            "Login to KSeF portal and download XML of any invoice",
          ),
          code: "ap.ksef.mf.gov.pl",
        },
        {
          number: "3",
          title: getText("Użyj CLI", "Використовуйте CLI", "Use CLI"),
          description: getText(
            "Programiści mogą użyć naszego narzędzia CLI do walidacji plików lokalnie",
            "Розробники можуть використовувати наш інструмент CLI для валідації файлів локально",
            "Developers can use our CLI tool to validate files locally",
          ),
          code: "npx @ksefuj/validator file.xml",
        },
      ],
    },
    openSource: {
      title: "100% Open Source",
      description: getText(
        "Cały kod jest publiczny na GitHub. Sprawdź, jak działa, zgłoś błąd lub pomóż w rozwoju",
        "Весь код є публічним на GitHub. Перевірте, як це працює, повідомте про помилку або допоможіть у розробці",
        "All code is public on GitHub. Check how it works, report bugs, or help with development",
      ),
      features: [
        {
          title: getText("Przejrzysty kod", "Прозорий код", "Transparent code"),
          description: getText(
            "Każda linia kodu dostępna do wglądu",
            "Кожен рядок коду доступний для перегляду",
            "Every line of code available for review",
          ),
        },
        {
          title: getText("Społeczność", "Спільнота", "Community"),
          description: getText(
            "Rozwijane przez społeczność dla społeczności",
            "Розроблено спільнотою для спільноти",
            "Developed by community for community",
          ),
        },
        {
          title: "Apache 2.0",
          description: getText(
            "Używaj komercyjnie bez ograniczeń",
            "Використовуйте комерційно без обмежень",
            "Use commercially without restrictions",
          ),
        },
      ],
      ctaText: getText("Zobacz na GitHub", "Дивіться на GitHub", "View on GitHub"),
    },
    developer: {
      title: getText("Dla programistów", "Для розробників", "For developers"),
      subtitle: getText(
        "CLI, npm package, API — integruj z Twoimi narzędziami",
        "CLI, npm пакет, API — інтегруйте з вашими інструментами",
        "CLI, npm package, API — integrate with your tools",
      ),
      expandText: getText("Pokaż opcje", "Показати опції", "Show options"),
      collapseText: getText("Ukryj opcje", "Приховати опції", "Hide options"),
      content: {
        cli: {
          title: "CLI",
          description: getText(
            "Waliduj pliki z terminala",
            "Валідуйте файли з терміналу",
            "Validate files from terminal",
          ),
          commands: [
            {
              label: getText("Szybka walidacja", "Швидка валідація", "Quick validation"),
              command: "npx @ksefuj/validator invoice.xml",
            },
            {
              label: getText("Zainstaluj globalnie", "Встановіть глобально", "Install globally"),
              command: "npm i -g @ksefuj/validator",
            },
          ],
        },
        npm: {
          title: "npm Package",
          description: getText(
            "Integruj walidator z Twoją aplikacją",
            "Інтегруйте валідатор з вашим додатком",
            "Integrate validator with your app",
          ),
          install: "npm install @ksefuj/validator",
          usage: `import { validate } from '@ksefuj/validator';

const result = await validate(xmlContent);
if (result.valid) {
  console.log('✓ Valid');
}`,
        },
        api: {
          title: "API",
          description: getText(
            "REST API dla integracji",
            "REST API для інтеграції",
            "REST API for integrations",
          ),
          example: `POST /api/validate
Content-Type: application/xml

<?xml version="1.0"?>
<Faktura>...</Faktura>`,
        },
      },
    },
  };
};
