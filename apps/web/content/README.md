# Content Guide

This directory holds all written content for ksefuj.to — blog posts, guides, technical docs, and
FAQ. Content is written in **MDX** (Markdown with optional React components).

---

## Directory structure

```
content/
├── pl/               ← Polish (default language)
│   ├── blog/
│   ├── guides/
│   ├── docs/
│   └── faq/
├── en/               ← English
│   ├── blog/
│   ├── guides/
│   ├── docs/
│   └── faq/
└── uk/               ← Ukrainian
    ├── blog/
    ├── guides/
    ├── docs/
    └── faq/
```

Each file is named `{slug}.mdx`. The slug becomes part of the URL.

**URL mapping:**

| File path                          | URL                             |
| ---------------------------------- | ------------------------------- |
| `pl/blog/wprowadzenie-do-ksef.mdx` | `/blog/wprowadzenie-do-ksef`    |
| `en/blog/introduction-to-ksef.mdx` | `/en/blog/introduction-to-ksef` |
| `uk/guides/perevirka-xml-ksef.mdx` | `/uk/guides/perevirka-xml-ksef` |

Polish is the default locale — its URLs have no locale prefix. English and Ukrainian URLs are
prefixed with `/en/` and `/uk/`.

---

## Sections

| Section  | Purpose                                        | Typical length |
| -------- | ---------------------------------------------- | -------------- |
| `blog`   | Articles, news, opinion — broader KSeF context | 500–1500 words |
| `guides` | Step-by-step how-tos for specific tasks        | 800–2000 words |
| `docs`   | Technical reference documentation              | Any length     |
| `faq`    | Q&A format, one file per locale                | Any length     |

---

## Frontmatter

Every MDX file starts with a frontmatter block between `---` markers. Here is a full example:

```yaml
---
title: "Czym jest KSeF i dlaczego dotyczy Ciebie"
description:
  "KSeF to Krajowy System e-Faktur — obowiązkowa platforma do wystawiania faktur elektronicznych w
  Polsce od 2026 roku."
date: 2026-03-24
updated: 2026-04-01
section: blog
locale: pl
slug: "wprowadzenie-do-ksef"
tags: [ksef, e-faktura, jdg]
translations:
  en: "introduction-to-ksef"
seo:
  canonical: "/blog/wprowadzenie-do-ksef"
  ogImage: "/og/wprowadzenie-do-ksef.png"
---
```

### Field reference

| Field           | Required | Description                                                                                                                                                                                         |
| --------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`         | Yes      | Page title. Shown as the `<h1>` and in browser tab. Keep under 70 characters.                                                                                                                       |
| `description`   | Yes      | One-sentence summary. Used in search results and social previews. 120–160 characters ideal.                                                                                                         |
| `date`          | Yes      | Publication date in `YYYY-MM-DD` format. Used for sorting and display.                                                                                                                              |
| `updated`       | No       | Last significant update date. Shown in docs as "Last verified". Falls back to `date` if omitted.                                                                                                    |
| `section`       | Yes      | Must be exactly one of: `blog`, `guides`, `docs`, `faq`. Must match the directory.                                                                                                                  |
| `locale`        | Yes      | Must be exactly one of: `pl`, `en`, `uk`. Must match the directory.                                                                                                                                 |
| `slug`          | Yes      | URL-safe identifier. Must match the filename (without `.mdx`). Use hyphens, no spaces, no Polish characters.                                                                                        |
| `tags`          | No       | List of keyword tags. Displayed as badges on the post.                                                                                                                                              |
| `translations`  | No       | Maps locale codes to the slug of the same content in that language. Enables the language switcher to link between translations.                                                                     |
| `seo.canonical` | No       | Canonical URL path (without domain). Defaults to the natural URL if omitted.                                                                                                                        |
| `seo.ogImage`   | No       | Path to the Open Graph image for social sharing previews. Images are **not generated automatically** — you would need to place the file manually under `apps/web/public/og/`. Safe to omit for now. |

### Notes on specific fields

**`slug`** — must be URL-safe. Use only lowercase letters, numbers, and hyphens. No Polish/Ukrainian
diacritics (ą, ę, ó, etc.). Wrong: `pierwsza-faktura-kséf`. Right: `pierwsza-faktura-ksef`.

**`translations`** — only list locales where a translation actually exists. If a user visits a URL
that has no content in their locale, the site will show the content in whichever locale is
available, with a banner explaining it's a translation. Example:

```yaml
translations:
  en: "introduction-to-ksef"
  # uk not listed — no Ukrainian translation exists yet
```

**`updated`** — only used in `docs`. Shown as the "Last verified" badge. Update it whenever you make
a significant factual change to a doc.

**Reading time** is calculated automatically from word count. You don't set it.

---

## Writing in MDX

MDX is standard Markdown with support for custom components. All standard Markdown syntax works:
headings, bold, italic, lists, links, tables, code blocks.

### Available components

#### `<Info>` — informational note (violet)

```mdx
<Info>KSeF stał się obowiązkowy od 1 lutego 2026 roku dla dużych firm.</Info>
```

#### `<Warning>` — warning or important caveat (red)

```mdx
<Warning>
  Nie wysyłaj faktur do KSeF bez wcześniejszej walidacji — odrzucone faktury mogą wymagać korekty.
</Warning>
```

#### `<Tip>` — helpful tip or shortcut (green)

```mdx
<Tip>Możesz użyć walidatora ksefuj.to przed wysyłką, żeby sprawdzić plik XML bez rejestracji.</Tip>
```

#### `<Source>` — external citation link

Use inline, inside a sentence, to cite an official or external source.

```mdx
Schemat FA(3) jest publikowany przez Ministerstwo Finansów.

<Source href="https://ksef.podatki.gov.pl" label="ksef.podatki.gov.pl" />
```

#### `<XmlExample>` — XML code block with optional copy button

Wrap a fenced code block for consistent XML display styling. Add `copyable` to show a
copy-to-clipboard button.

````mdx
<XmlExample copyable>
  ```xml
  <Faktura xmlns="http://crd.gov.pl/wzor/2025/06/25/13775/">...</Faktura>
  ```
</XmlExample>
````

#### `<FieldTable>` and `<Field>` — structured field reference table

For docs pages that explain XML fields or API parameters.

```mdx
<FieldTable>
  <Field name="P_1" type="date" required>
    Data wystawienia faktury w formacie YYYY-MM-DD.
  </Field>
  <Field name="P_2A" type="string">
    Numer kolejny faktury.
  </Field>
</FieldTable>
```

### Headings

Use `##` (h2) and `###` (h3) only — these are picked up automatically for the Table of Contents
sidebar. Do not use `#` (h1) in the body; the title from frontmatter is the h1.

---

## Adding a new piece of content

1. Create the file: `content/{locale}/{section}/{slug}.mdx`
2. Fill in the frontmatter (all required fields)
3. Write the body in Markdown/MDX
4. If you're adding translations of the same piece, add a `translations` map pointing each locale's
   file to the other locale's slug

**Minimum viable frontmatter (blog post):**

```yaml
---
title: "Your title here"
description: "One sentence summary."
date: 2026-04-01
section: blog
locale: pl
slug: "your-slug-here"
---
```

---

## Translation workflow

Polish is the primary language and should always be written first. English and Ukrainian are
translated separately.

When a translation exists, link the files together via `translations`:

**`pl/blog/wprowadzenie-do-ksef.mdx`:**

```yaml
translations:
  en: "introduction-to-ksef"
```

**`en/blog/introduction-to-ksef.mdx`:**

```yaml
translations:
  pl: "wprowadzenie-do-ksef"
```

When a user visits the site in a language that has no translation for the requested content, the
site will display the content in whatever language is available and show a banner notifying the
user.
