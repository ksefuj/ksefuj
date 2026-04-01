import Link from "next/link";
import type { ReactNode } from "react";

const content: Record<string, { title: string; paragraphs: ReactNode[] }> = {
  pl: {
    title: "KSeF przepuści. My nie.",
    paragraphs: [
      <>
        Podstawa prawna to <strong>art. 31a §1 ustawy o VAT</strong>: do przeliczenia kwot
        wyrażonych w walucie obcej na fakturze stosuje się kurs średni NBP z ostatniego dnia
        roboczego poprzedzającego dzień wystawienia faktury (pole <code>P_1</code>). Kurs ten służy
        wyłącznie do obliczenia wartości podatku w złotych — nie przelicza samej kwoty netto
        wynagrodzenia umownego.
      </>,
      <>
        NBP publikuje tabele kursów tylko w dni robocze. Jeśli data faktury przypada w sobotę,
        niedzielę lub święto, właściwy jest kurs z ostatniego dnia roboczego przed tym dniem —
        zazwyczaj piątek. Kalkulator uwzględnia to automatycznie i zwraca odpowiednią{" "}
        <strong>tabelę A</strong> wraz z jej numerem i datą, gotowe do wpisania w{" "}
        <code>KursWaluty</code>.
      </>,
      <>
        Warto wiedzieć, że KSeF nie weryfikuje wartości pola <code>KursWaluty</code> — przyjmie
        każdą liczbę bez skargi. Błędny kurs nie blokuje przyjęcia faktury do systemu, ale może
        skutkować <strong>nieprawidłowym rozliczeniem VAT</strong>. Walidator{" "}
        <Link href="/">ksefuj.to</Link> sprawdza tę wartość jako dodatkową warstwę kontroli,
        wykrywając rozbieżności z oficjalnym kursem NBP zanim faktura trafi do urzędu.
      </>,
    ],
  },
  en: {
    title: "KSeF will accept it. We won't.",
    paragraphs: [
      <>
        The legal basis is <strong>Art. 31a §1 of the Polish VAT Act</strong>: foreign-currency
        amounts on an invoice are converted using the NBP mid-rate from the last business day before
        the invoice date (field <code>P_1</code>). This rate applies solely to calculating the tax
        amount in PLN — it does not convert the net contractual amount.
      </>,
      <>
        NBP publishes exchange rate tables only on business days. If the invoice date falls on a
        Saturday, Sunday, or public holiday, the applicable rate is from the last business day
        before that date — typically Friday. The calculator accounts for this automatically and
        returns the correct <strong>Table A</strong> entry with its number and date, ready to enter
        in <code>KursWaluty</code>.
      </>,
      <>
        It is worth knowing that KSeF does not validate the <code>KursWaluty</code> field — it will
        accept any number without complaint. A wrong rate does not block the invoice from being
        accepted, but it can result in an <strong>incorrect VAT settlement</strong>. The{" "}
        <Link href="/">ksefuj.to</Link> validator checks this value as an extra layer of control,
        catching discrepancies against the official NBP rate before the invoice reaches the tax
        authority.
      </>,
    ],
  },
  uk: {
    title: "KSeF прийме. Ми — ні.",
    paragraphs: [
      <>
        Правова основа — <strong>ст. 31a §1 Закону про ПДВ</strong>: суми в іноземній валюті на
        рахунку-фактурі перераховуються за середнім курсом NBP з останнього робочого дня, що передує
        даті виставлення рахунку-фактури (поле <code>P_1</code>). Цей курс використовується виключно
        для розрахунку суми податку в злотих — він не перераховує договірну суму нетто.
      </>,
      <>
        NBP публікує таблиці курсів лише в робочі дні. Якщо дата рахунку-фактури припадає на суботу,
        неділю або свято, застосовується курс з останнього робочого дня перед цією датою — зазвичай
        п&apos;ятниця. Калькулятор враховує це автоматично і повертає відповідну{" "}
        <strong>таблицю A</strong> з номером і датою, готову для введення в <code>KursWaluty</code>.
      </>,
      <>
        Варто знати, що KSeF не перевіряє значення поля <code>KursWaluty</code> — він прийме
        будь-яке число без зауважень. Неправильний курс не блокує прийняття рахунку-фактури до
        системи, але може призвести до <strong>неправильного розрахунку ПДВ</strong>. Валідатор{" "}
        <Link href="/">ksefuj.to</Link> перевіряє це значення як додатковий рівень контролю,
        виявляючи розбіжності з офіційним курсом NBP до того, як рахунок-фактура потрапить до органу
        влади.
      </>,
    ],
  },
};

interface Props {
  locale: string;
}

export function WalutyExplainer({ locale }: Props) {
  const { title, paragraphs } = content[locale] ?? content.pl;

  return (
    <div className="space-y-4 max-w-2xl border-t border-slate-100 pt-8">
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      <div className="prose prose-slate max-w-none mdx-content">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  );
}
