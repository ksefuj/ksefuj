# Writing Style for Long-Form Content

How blog posts, guides and FAQ entries should read. `README.md` covers the mechanics (frontmatter,
components, directories). This file covers the prose. It applies to every locale; examples are in
Polish because PL is canonical.

The reader is someone with one question about KSeF who found us on Google. They want the answer, the
edge cases that apply to them, and a source they can show their accountant. Everything else is in
the way.

---

## 1. One post answers one question

Before writing, name the query the post answers, in the words a reader would type into Google: „czy
faktura dla osoby prywatnej musi być w KSeF", „ksef awaria co robić". If you can't name it in one
line, the topic is too broad. Split it.

- **The first two sentences answer it.** No scene-setting, no "Wielu przedsiębiorców zastanawia
  się...". Google often shows the opening as the snippet, so it should hold the answer.
- **The rest covers what changes the answer:** exceptions, thresholds, dates, what happens when it
  goes wrong.
- **Length follows the question.** There is no word target. A narrow question gets 600 words; a
  broad one may need 1 800. Stop when the reader's question and its realistic follow-ups are
  answered.

Bad opening:

> Wielu freelancerów oddycha z ulgą: „Mam małe obroty, limit mnie nie dotyczy." Problem w tym, że to
> zdanie jest prawdziwe tylko wtedy, gdy wiesz, co ten limit naprawdę oznacza.

Good opening:

> Limit 10 000 zł liczy się co miesiąc, od kwot brutto, i tylko z faktur dla firm. Jeśli
> przekroczysz go choć raz, faktura, która go przekroczyła, i wszystkie kolejne idą przez KSeF.

## 2. Title and description: earn the click

Search Console shows thousands of impressions per post and a click-through rate under 1%. The title
and description are the cheapest thing to improve.

- **Title** = the reader's question or the answer to it, as a natural Polish sentence: „Jak liczyć
  limit 10 000 zł w KSeF?", „Nie usuniesz faktury z KSeF. Co zrobić z błędną?". Use a number, date,
  or outcome when there is one. Aim for 48 characters or fewer, so the template can append „ —
  ksefuj.to" (12 characters, added only when the result fits in 60). Up to 58 is fine when the
  shorter version would need a verbless fragment: a natural title beats the brand suffix. Google
  truncates at about 60. See section 8 for what „natural" means.
- **Description** (under 160 characters) = the answer in short form, not a table of contents. Bad:
  „Jak liczyć, od kiedy obowiązuje, kto jest zwolniony. Konkretne przykłady." Good: „Limit liczy się
  miesięcznie, od kwot brutto, tylko z faktur B2B. Po przekroczeniu nie ma powrotu do PDF."
- No clickbait. The title must not promise what the post doesn't deliver.

## 3. Say each thing once

This is the main failure of our existing posts. The same fact appears in the body, then in a
`<Warning>`, then in an FAQ entry, then in the summary.

- State a fact once, where the reader needs it. If you link back to it later, link, don't restate.
- **Callouts are for what the body doesn't say.** A `<Warning>` that repeats the paragraph above it
  gets deleted. Two or three callouts per post is plenty.
- **No „Podsumowanie" section.** If a post needs a summary, the opening didn't do its job. A short
  reference table is fine when it adds something (comparison, dates), but call it what it is
  („Terminy w skrócie"), not „Podsumowanie".
- **„Najczęstsze pytania" only for questions the body hasn't answered.** If each answer repeats a
  section, cut the FAQ.
- **End with the next step, in one or two sentences:** a related post or, when relevant, the
  validator. Not a recap.

## 4. Specific beats general

- Article numbers, dates, amounts, field names. „art. 106gb ust. 4 ustawy o VAT", not „przepisy".
- Worked examples with real numbers. Vary the cast: Ania (freelance designer), Pani Krystyna
  (accountant), Marek (developer), and others when they fit (a shop with a cash register, a
  Ukrainian JDG, a VAT-exempt hairdresser). Not Ania in every post.
- Say what isn't settled. „MF nie odpowiedziało jeszcze, czy..." is useful. A blanket „skonsultuj
  się z doradcą podatkowym" at the end of every section isn't; use it once, and only where the
  answer really depends on the reader's facts.
- Date the legal state when it's likely to change: „Stan prawny na 7 października 2026". Set
  `updated` in frontmatter when you revise.

## 5. Sentences

**Em-dashes (—):** at most one per ~150 words of prose. That's roughly 10 in a 1 500-word post; our
current posts average 50. Replace them with a full stop, comma, colon, or parentheses. Dashes are
fine as the separator in a title and in table cells.

Never write these. They are the patterns that make text read as generated:

| Pattern                         | Examples                                                                                |
| ------------------------------- | --------------------------------------------------------------------------------------- |
| Throat-clearing openers         | „W dzisiejszych czasach", „Wielu przedsiębiorców zastanawia się", „Nie od dziś wiadomo" |
| Announcing instead of saying    | „W tym artykule omówię", „O tym piszę w następnej sekcji", „Przyjrzyjmy się"            |
| Fake suspense                   | „Dobra wiadomość: ... Zła wiadomość: ...", „Problem w tym, że...", „Haczyk?"            |
| Meta-commentary on own text     | „To brzmi jak dużo słów, ale...", „Brzmi skomplikowanie? Spokojnie."                    |
| Dramatic fragments              | „Nie następna. Nie od przyszłego miesiąca. Ta konkretna."                               |
| Emphasis words that add nothing | „kluczowy", „istotny", „warto pamiętać", „pamiętaj", „co ważne", „należy podkreślić"    |
| Restating connectors            | „Innymi słowy", „Mówiąc prościej", „Podsumowując", „Krótko mówiąc"                      |
| Inflated vocabulary             | „kompleksowy", „holistyczny", „rewolucja", „kluczowa zmiana", „nowa era"                |
| Reflexive triplets              | three adjectives or three parallel clauses where one would do                           |
| „Nie tylko X, ale także Y"      | when Y isn't surprising                                                                 |
| Motivational closers            | „Masz czas — nie marnuj go", „Lepiej wcześniej niż później"                             |

Also:

- **Voice:** we („piszemy", „sprawdziliśmy") for the site, Ty for the reader. Never first person
  singular („omówię"). In Ukrainian the reader is informal ти (твій, singular imperatives), matching
  the UI; ви only inside quoted third-party speech.
- **Headings** state what the section says or the question it answers, in the reader's words. Not
  „Co to jest ten limit" for a section that explains how it's calculated.
- **Bold** marks the one phrase per section a skimming reader must not miss. If half a paragraph is
  bold, nothing is.
- Lists for parallel items a reader will scan. Prose for reasoning. A list of one-sentence bullets
  with bold lead-ins is usually a paragraph pretending to be structured.
- Polish quotes „...", not "...".

## 6. Links

- 2–4 links to our other posts where they genuinely continue the reader's question, inline in the
  sentence, not as „Więcej przeczytasz w artykule...".
- Official sources (isap.sejm.gov.pl, ksef.podatki.gov.pl, gov.pl) in `sources` and as `<Source>`
  next to the claim they support. Never invent a URL.
- The validator: only when the reader might have an XML file they want checked. Not in every post.
  See the editorial philosophy in `README.md`.

## 7. Self-check before handoff

1. Does the opening answer the query in two sentences?
2. Search the draft for each banned pattern above. Count the em-dashes.
3. For each callout and FAQ entry: is this already said in the body? Delete if yes.
4. Is every number, date, and article reference in the research brief, with a source?
5. Read the last section. Does it recap? Replace it with the next step.
6. Title 48 characters or fewer (58 at most, see section 2), description under 160, both specific.
7. Blog posts and guides: `topic` set to one key from the list in `README.md` (the build fails
   without it).
8. Polish posts: run the section 8 checklist, then hand the post to the `redaktor` agent.

## 8. Polszczyzna: pisz jak polski redaktor, nie jak tłumacz

Ta sekcja jest po polsku, bo dotyczy polskiego. Nasze teksty są poprawne, ale często brzmią jak
przekład z angielskiego: ta sama formuła w każdym tytule, zdania bez czasowników, kalki. Czytelnik
tego nie nazwie, ale poczuje, że pisał to ktoś „nie stąd”.

### Tytuły

- **Pełne zdanie albo pełne pytanie.** Formuła „X w KSeF: Y" to angielski szablon SEO („X: how to
  Y"). Wolno jej użyć, ale nie w co drugim tytule. Pytanie kończy się znakiem zapytania.
- **Tytuł ma czasownik.** Równoważniki typu „od kiedy faktury", „co zamiast" to skróty myślowe, nie
  nagłówki.
- **Słowa z wyszukiwarki na początku, ale w odmianie, jaką wymaga zdanie.** „Czy odliczysz VAT z
  faktury spoza KSeF?" zawiera frazę „faktura poza KSeF" i brzmi po polsku.
- **Bez wielkich liter w środku tytułu** (to zwyczaj angielski). Wielka litera tylko na początku i w
  nazwach własnych.

| Brzmi jak przekład                              | Brzmi po polsku                                       |
| ----------------------------------------------- | ----------------------------------------------------- |
| Zwolniony z VAT a KSeF: od kiedy faktury        | Od kiedy zwolniony z VAT wystawia faktury w KSeF?     |
| Faktura poza KSeF: czy odliczysz z niej VAT     | Czy odliczysz VAT z faktury wystawionej poza KSeF?    |
| Jak odebrać fakturę w KSeF: nic nie akceptujesz | Jak odebrać fakturę w KSeF? Nie musisz nic akceptować |
| Czy można usunąć fakturę z KSeF? Co zamiast     | Nie usuniesz faktury z KSeF. Co zrobić z błędną?      |
| KSeF: checklista na 1 stycznia 2027             | Co sprawdzić przed 1 stycznia 2027 r.?                |

### Kalki i anglicyzmy

| Zamiast                                      | Pisz                                                     |
| -------------------------------------------- | -------------------------------------------------------- |
| faktury idą przez KSeF                       | faktury wystawia się w KSeF / trafiają do KSeF           |
| checklista                                   | lista kontrolna, co sprawdzić                            |
| sprawdź to / zrób to (z „to" jak „it")       | sprawdź / zrób; zaimek, gdy jest konieczny               |
| bazując na                                   | na podstawie                                             |
| w oparciu o                                  | na podstawie                                             |
| adresować problem                            | rozwiązać problem, zająć się                             |
| dedykowany (program, opcja)                  | przeznaczony do, specjalny, osobny                       |
| wspierać format                              | obsługiwać format                                        |
| aplikować (przepis)                          | stosować                                                 |
| na ten moment                                | na razie, obecnie                                        |
| w przypadku gdy                              | gdy, jeśli                                               |
| posiadać (np. NIP)                           | mieć                                                     |
| dokonać zapłaty / dokonać korekty            | zapłacić / skorygować (styl nominalny brzmi urzędowo)    |
| XML z instrukcjami (processing instructions) | XML z instrukcjami przetwarzania (`<?...?>`), objaśnione |

### Zdanie

- **Czasownik zamiast rzeczownika.** „Wystawiasz korektę", nie „wystawienie korekty następuje". Styl
  nominalny zostaw ustawie.
- **Nowa informacja na końcu zdania.** Polski szyk stawia na końcu to, co ważne: „Fakturę w KSeF
  wystawia także **zwolniony z VAT**", nie „Zwolniony z VAT też wystawia fakturę w KSeF" (jeśli
  nowością jest zwolniony).
- **Przecinek przed „że", „który", „gdy", „jeśli", „bo", „ale" i imiesłowem na -ąc.** Brak przecinka
  przed „który" to najczęstszy błąd w tekstach pisanych po angielsku.
- **Bez przecinka przed „i", „oraz", „lub" w wyliczeniu** (polski nie ma „Oxford comma").
- **Strona bierna z umiarem.** „KSeF nadaje numer", nie „numer jest nadawany przez KSeF".
- **Zaimki „ty", „twój" małą literą w artykułach** („sprawdź swoją fakturę", „twój NIP"). Wielka
  litera to zwyczaj listowy; w tekście publicystycznym brzmi jak reklama. Teksty UI zostają bez
  zmian.
- **Rejestr: rzeczowy kolega z branży.** Nie urzędnik („należy dokonać"), nie influencer („ogarnij
  KSeF"). „Co do zasady" najwyżej raz na tekst, gdy naprawdę chodzi o zasadę z wyjątkami.

### Liczby, daty, skróty

- Daty w tekście: „1 stycznia 2027 r.", z „r." po roku, gdy stoi data dzienna. W tytule „r." można
  pominąć, ale konsekwentnie w całym tytule. Zapis „19.10" tylko w tabelach.
- Kwoty: „10 000 zł" (spacja nierozdzielająca, „zł", nie „PLN", chyba że chodzi o kod waluty w XML).
- Przedziały: „2027–2028" z półpauzą.
- „Art. 106ga ust. 2 pkt 4 ustawy o VAT", nie „art. 106ga(2)(4)".

### Test na koniec

Przeczytaj tytuł i pierwszy akapit na głos. Czy tak napisałby dziennikarz Rzeczpospolitej albo
Bankier.pl, tłumacząc to znajomemu przedsiębiorcy? Jeśli zdanie trzeba „rozpakować" w głowie, napisz
je od nowa.
