import Link from "next/link";
import type { ReactNode } from "react";

const content: Record<string, { title: string; paragraphs: ReactNode[] }> = {
  pl: {
    title: "KSeF przepuści. My nie.",
    paragraphs: [
      <>
        Liczy się dzień, w którym powstał obowiązek podatkowy — zwykle dzień wykonania usługi albo
        wydania towaru. Stosujesz kurs średni NBP z ostatniego dnia roboczego przed tym dniem (
        <strong>art. 31a ust. 1 ustawy o VAT</strong>). Wyjątek: jeśli wystawiasz fakturę, zanim
        obowiązek podatkowy powstanie — na przykład z góry, przed wykonaniem usługi — właściwy jest
        kurs z ostatniego dnia roboczego przed datą wystawienia faktury (pole <code>P_1</code>,{" "}
        <strong>art. 31a ust. 2</strong>). Na fakturze kurs przelicza tylko podatek na złote, nie
        zmienia umówionej kwoty netto.
      </>,
      <>
        Najczęstszy przypadek to usługa rozliczana miesięcznie. Usługę za lipiec uznaje się za
        wykonaną 31 lipca (<strong>art. 19a ust. 3</strong>), więc faktura wystawiona 5 sierpnia
        bierze kurs z ostatniego dnia roboczego przed 31 lipca (w 2026 r. — z 30 lipca), a nie kurs
        sprzed 5 sierpnia. NBP publikuje tabele tylko w dni robocze, więc gdy dzień odniesienia
        wypada w sobotę, niedzielę lub święto, cofamy się do wcześniejszego dnia roboczego, zwykle
        do piątku. Kalkulator liczy to za Ciebie i podaje właściwą <strong>tabelę A</strong> z
        numerem i datą, gotową do wpisania w <code>KursWaluty</code>.
      </>,
      <>
        Są jednak branże, w których obowiązek podatkowy powstaje dopiero w dniu wystawienia faktury
        — o ile wystawisz ją w terminie. Dotyczy to m.in. usług budowlanych i budowlano-montażowych
        (<strong>art. 19a ust. 5 pkt 3</strong>) oraz najmu, dzierżawy, leasingu, stałej obsługi
        prawnej i biurowej, ochrony osób i mienia, a także dostawy i dystrybucji mediów — prądu,
        gazu przewodowego, ciepła, wody (<strong>art. 19a ust. 5 pkt 4</strong>). Jeśli spóźnisz się
        z fakturą, obowiązek podatkowy powstaje z upływem ustawowego terminu na jej wystawienie (
        <strong>art. 19a ust. 7</strong>): przy usługach budowlanych to 30 dni od wykonania, przy
        najmie i mediach — upływ terminu płatności (<strong>art. 106i ust. 3 i 4</strong>). W tych
        przypadkach w kalkulatorze wpisz jako datę sprzedaży dzień powstania obowiązku podatkowego —
        zwykle datę wystawienia faktury, a nie koniec miesiąca.
      </>,
      <>
        Warto wiedzieć, że KSeF pilnuje pola <code>KursWaluty</code> tylko od strony zapisu: część
        dziesiętną oddziela kropka, nie przecinek, i może mieć najwyżej sześć cyfr.{" "}
        <code>4,2856</code> z przecinkiem albo <code>4.1234567</code> system odrzuci. Ale czy sam
        kurs jest właściwy — tego nikt już nie sprawdza: poprawnie zapisana, a zupełnie błędna
        liczba przejdzie bez słowa. Zły kurs nie blokuje przyjęcia faktury do systemu, za to może
        skutkować <strong>nieprawidłowym rozliczeniem VAT</strong>. Walidator{" "}
        <Link href="/">ksefuj.to</Link> sprawdza tę wartość jako dodatkową warstwę kontroli —
        porównuje ją z kursem NBP z dnia właściwego dla Twojej faktury, zanim faktura trafi do
        urzędu.
      </>,
    ],
  },
  en: {
    title: "KSeF will accept it. We won't.",
    paragraphs: [
      <>
        What counts is the day the tax obligation arises — usually the day the service is performed
        or the goods are handed over. You apply the NBP mid-rate from the last business day before
        that day (<strong>Art. 31a(1) of the Polish VAT Act</strong>). The exception: if you issue
        the invoice before the tax obligation arises — upfront, say, before the service is performed
        — the applicable rate is the one from the last business day before the invoice issue date
        (field <code>P_1</code>, <strong>Art. 31a(2)</strong>). On the invoice, the rate only
        converts the tax into złoty; it does not change the net amount you agreed.
      </>,
      <>
        The most common case is a service settled monthly. A service covering July is treated as
        performed on 31 July (<strong>Art. 19a(3)</strong>), so an invoice issued on 5 August takes
        the rate from the last business day before 31 July (in 2026 — 30 July), not the rate from
        before 5 August. NBP publishes its tables only on business days, so when the reference day
        falls on a Saturday, Sunday or public holiday, we step back to the previous business day,
        usually Friday. The calculator works this out for you and gives you the right{" "}
        <strong>Table A</strong> entry with its number and date, ready to drop into{" "}
        <code>KursWaluty</code>.
      </>,
      <>
        There are industries, though, where the tax obligation arises only on the day the invoice is
        issued — provided you issue it on time. This covers, among others, construction and
        construction-assembly services (<strong>Art. 19a(5)(3)</strong>) and rental, lease, leasing,
        permanent legal and office services, security of persons and property, and the supply and
        distribution of utilities — electricity, piped gas, heat, water (
        <strong>Art. 19a(5)(4)</strong>). If you invoice late, the tax obligation arises when the
        statutory deadline for issuing the invoice expires (<strong>Art. 19a(7)</strong>): 30 days
        from performance for construction services, the expiry of the payment deadline for rental
        and utilities (<strong>Art. 106i(3) and (4)</strong>). In these cases, enter into the
        calculator as the sale date the day the tax obligation arose — usually the invoice date, not
        the month end.
      </>,
      <>
        Worth knowing: KSeF polices the <code>KursWaluty</code> field on formatting alone: the
        fractional part is separated by a dot, not a comma, and can run to at most six digits.{" "}
        <code>4,2856</code> with a comma, or <code>4.1234567</code>, gets rejected. Whether the rate
        itself is the right one, though, nobody checks: a correctly formatted but completely wrong
        number sails through without a word. A wrong rate will not stop the invoice from being
        accepted, but it can lead to an <strong>incorrect VAT settlement</strong>. The{" "}
        <Link href="/">ksefuj.to</Link> validator checks this value as an extra layer of control —
        it compares it against the NBP rate from the day that actually applies to your invoice,
        before the invoice reaches the tax office.
      </>,
    ],
  },
  uk: {
    title: "KSeF прийме. Ми — ні.",
    paragraphs: [
      <>
        Значення має день, у якому виник податковий обов&apos;язок — зазвичай день виконання послуги
        або передачі товару. Застосовуєш середній курс NBP з останнього робочого дня перед цим днем
        (<strong>ст. 31a ust. 1 Закону про ПДВ</strong>). Виняток: якщо виставляєш рахунок-фактуру
        ще до того, як виник податковий обов&apos;язок — наприклад наперед, перед виконанням послуги
        — застосовується курс з останнього робочого дня перед датою виставлення рахунку (поле{" "}
        <code>P_1</code>, <strong>ст. 31a ust. 2</strong>). На рахунку курс перераховує лише податок
        на злоті, він не змінює узгодженої суми нетто.
      </>,
      <>
        Найчастіший випадок — послуга, що розраховується щомісяця. Послуга за липень вважається
        виконаною 31 липня (<strong>ст. 19a ust. 3</strong>), тож рахунок, виставлений 5 серпня,
        бере курс з останнього робочого дня перед 31 липня (у 2026 р. — з 30 липня), а не курс перед
        5 серпня. NBP публікує таблиці лише в робочі дні, тому коли день відліку припадає на суботу,
        неділю або свято, повертаємося до попереднього робочого дня — зазвичай до п&apos;ятниці.
        Калькулятор рахує це за тебе і подає відповідну <strong>таблицю A</strong> з номером і
        датою, готову до введення в <code>KursWaluty</code>.
      </>,
      <>
        Але є галузі, де податковий обов&apos;язок виникає аж у день виставлення рахунку — за умови,
        що виставиш його вчасно. Це стосується, зокрема, будівельних і будівельно-монтажних послуг (
        <strong>ст. 19a ust. 5 pkt 3</strong>), а також оренди, найму, лізингу, постійного
        юридичного та офісного обслуговування, охорони осіб і майна, постачання та розподілу
        комунальних послуг — електроенергії, газу з мережі, тепла, води (
        <strong>ст. 19a ust. 5 pkt 4</strong>). Якщо виставиш рахунок із запізненням, податковий
        обов&apos;язок виникає тоді, коли спливає встановлений законом термін на його виставлення (
        <strong>ст. 19a ust. 7</strong>). Для будівельних послуг це 30 днів від виконання, для
        оренди та комунальних послуг — сплив терміну оплати (<strong>ст. 106i ust. 3 i 4</strong>).
        У таких випадках впиши в калькуляторі як дату продажу день виникнення податкового
        обов&apos;язку — зазвичай дату виставлення рахунку, а не кінець місяця.
      </>,
      <>
        Варто знати, що KSeF контролює поле <code>KursWaluty</code> лише з боку запису: дробову
        частину відділяє крапка, а не кома, і вона може мати щонайбільше шість цифр.{" "}
        <code>4,2856</code> з комою або <code>4.1234567</code> система відхилить. А от чи правильний
        сам курс — цього вже ніхто не перевіряє: правильно записане, але геть хибне число пройде без
        жодного слова. Помилковий курс не блокує прийняття рахунку-фактури до системи, але може
        призвести до <strong>неправильного розрахунку ПДВ</strong>. Валідатор{" "}
        <Link href="/">ksefuj.to</Link> перевіряє це значення як додатковий рівень контролю —
        порівнює його з курсом NBP за день, який справді стосується твого рахунку, ще до того, як
        рахунок потрапить до податкової.
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
