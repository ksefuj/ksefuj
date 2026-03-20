# ksefuj.to — Design System

> Source of truth for all visual and UX decisions. Every agent, contributor, or PR that touches UI
> must follow this document. When in doubt, consult this first.

---

## Principles

1. **Ania first** — the primary user is a non-technical freelancer who issues 2 invoices/month.
   Every UI decision must pass the test: "Would Ania understand this in 3 seconds?"
2. **Light and airy** — white space is a feature. When torn between adding and removing, remove.
3. **Warm, not clinical** — soft colors, rounded corners, friendly copy. Not a government form.
4. **Consistent across pages** — the validator, docs, blog, guides, and future tools all share the
   same visual language.

---

## Colors

### Backgrounds

| Token            | Value                               | Usage                                           |
| ---------------- | ----------------------------------- | ----------------------------------------------- |
| Page background  | `#FAFAF8` or `slate-50`             | Default page bg — warm white, never pure `#FFF` |
| Surface          | `white` + `border-slate-200`        | Cards, containers                               |
| Elevated surface | `white` + `shadow-sm`               | Dropzone, modals, popovers                      |
| Section tints    | `violet-50`, `amber-50`, `slate-50` | Alternate section backgrounds for visual rhythm |
| Footer           | `slate-900` or `slate-950`          | Dark footer for contrast/visual closure         |

### Accent Colors

| Role    | Color   | Tailwind                    | Hex                   | Usage                                   |
| ------- | ------- | --------------------------- | --------------------- | --------------------------------------- |
| Primary | Violet  | `violet-500` / `violet-600` | `#7C3AED` / `#6D28D9` | Links, buttons, logo dot, active states |
| Success | Emerald | `emerald-500`               | `#10B981`             | Validation passed, positive badges      |
| Warning | Amber   | `amber-500`                 | `#F59E0B`             | Warnings, attention states              |
| Error   | Rose    | `rose-500`                  | `#F43F5E`             | Validation errors, destructive actions  |

### Text

| Role             | Tailwind                  | Usage                                            |
| ---------------- | ------------------------- | ------------------------------------------------ |
| Primary          | `slate-900`               | Headings, important body text — never pure black |
| Body             | `slate-700`               | Default body text                                |
| Secondary        | `slate-500`               | Descriptions, helper text                        |
| Muted            | `slate-400`               | Captions, timestamps, placeholder text           |
| On dark (footer) | `slate-400` / `slate-300` | Text on dark backgrounds                         |

### Borders & Dividers

| Element        | Tailwind             |
| -------------- | -------------------- |
| Card border    | `border-slate-200`   |
| Subtle divider | `border-slate-100`   |
| Input border   | `border-slate-300`   |
| Focus ring     | `ring-violet-500/30` |

---

## Typography

### Fonts

| Role               | Font                                      | Weight  | CSS Variable     |
| ------------------ | ----------------------------------------- | ------- | ---------------- |
| Display (headings) | Plus Jakarta Sans (or chosen alternative) | 700–800 | `--font-display` |
| Body               | Inter or Geist Sans                       | 400–600 | `--font-body`    |
| Mono (logo, code)  | JetBrains Mono                            | 400–700 | `--font-mono`    |

Load via `next/font` with `display: 'swap'`. Pass as CSS variables in layout.tsx.

### Scale

| Element         | Classes                                                          | Font    |
| --------------- | ---------------------------------------------------------------- | ------- |
| Hero title      | `text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight` | Display |
| Section heading | `text-3xl md:text-4xl font-bold tracking-tight`                  | Display |
| Card heading    | `text-xl md:text-2xl font-bold`                                  | Display |
| Body large      | `text-lg text-slate-600`                                         | Body    |
| Body            | `text-base text-slate-700`                                       | Body    |
| Small / caption | `text-sm text-slate-500`                                         | Body    |
| Badge           | `text-xs font-semibold uppercase tracking-wide`                  | Body    |
| Code            | `text-sm`                                                        | Mono    |

### Rules

- Headings always use the display font. Never monospace on headings.
- Body text always uses the body font. Never monospace on body text.
- Monospace is ONLY for: the logo mark, code snippets, XML element names, CLI commands.
- Tracking on headings: `tracking-tight` (−0.02em to −0.04em). Headings should feel chunky and
  confident.

---

## Logo: ksefuj●to

The logo is a wordmark composed of three parts:

```
ksefuj  ●  to
  ↑      ↑   ↑
  |      |   └─ mono, light (300), slate-400
  |      └─ violet-500 CSS circle, ~0.4em diameter, vertically centered
  └─ mono, bold (700), slate-900
```

### Implementation

Use the `logo.tsx` component. It accepts a `size` prop (`sm` | `md` | `lg`).

The violet dot is a `<span>` styled as a circle with CSS — NOT a font character. This ensures
consistent rendering across all platforms.

```tsx
// The dot — always rendered as CSS, never as "●" text
<span className="inline-block w-[0.4em] h-[0.4em] rounded-full bg-violet-500" />
```

### Rules

- **Never** split "ksefuj" with color. The word stays unified, one color.
- **Never** recreate the logo from scratch — always use the `logo.tsx` component.
- **Never** make the logo oversized. It's moderate: `text-2xl` in header, larger on homepage hero
  only if needed.
- The violet dot IS the brand mark. It's the favicon, the social avatar, and the only splash of
  color in the logo.

### Favicon

SVG favicon (violet dot on white background):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="45" fill="#7C3AED"/>
</svg>
```

---

## Components

### Cards

```
bg-white rounded-2xl border border-slate-200 p-6 md:p-8
```

Variants:

- **Default**: as above
- **Hover**: add `hover:shadow-md transition-shadow duration-200`
- **Feature card**: add `border-t-4 border-t-{accent}` (e.g., `border-t-violet-400`)
- **On dark bg (footer)**: `bg-slate-800/50 border-slate-700`

### Badges / Pills

```
rounded-full px-3 py-1 text-xs font-semibold
```

| Variant | Classes                                                    |
| ------- | ---------------------------------------------------------- |
| Success | `bg-emerald-50 text-emerald-700 border border-emerald-200` |
| Warning | `bg-amber-50 text-amber-700 border border-amber-200`       |
| Error   | `bg-rose-50 text-rose-700 border border-rose-200`          |
| Info    | `bg-violet-50 text-violet-700 border border-violet-200`    |
| Neutral | `bg-slate-100 text-slate-600 border border-slate-200`      |

### Buttons

| Variant   | Classes                                                                                                                        |
| --------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Primary   | `bg-violet-600 hover:bg-violet-700 text-white rounded-xl px-6 py-3 font-semibold transition-colors`                            |
| Secondary | `bg-white border border-slate-200 hover:border-violet-300 text-slate-700 rounded-xl px-6 py-3 font-semibold transition-colors` |
| Ghost     | `text-violet-600 hover:bg-violet-50 rounded-xl px-4 py-2 font-medium transition-colors`                                        |

### Glassmorphism (use sparingly)

```
backdrop-blur-xl bg-white/80 border border-white/20
```

Only on elements that overlap scrolling content: sticky header, modals, popovers.

### Code Blocks

```
bg-slate-900 text-slate-100 rounded-xl p-4 font-mono text-sm overflow-x-auto
```

Inline code: `bg-slate-100 text-slate-700 rounded px-1.5 py-0.5 font-mono text-sm`

---

## Layout

| Token                      | Value                                   |
| -------------------------- | --------------------------------------- |
| Content max width          | `max-w-4xl`                             |
| Section padding (desktop)  | `py-16 md:py-24`                        |
| Section padding (mobile)   | `py-12`                                 |
| Content horizontal padding | `px-4 md:px-6`                          |
| Card grid                  | `grid grid-cols-1 md:grid-cols-3 gap-6` |
| Two-column grid            | `grid grid-cols-1 md:grid-cols-2 gap-6` |
| Stack gap (sections)       | `space-y-16 md:space-y-24`              |

### Section Wrapper

Use `section-container.tsx` for consistent section layout:

```tsx
<section className="py-16 md:py-24 {optional bg tint}">
  <div className="max-w-4xl mx-auto px-4 md:px-6">{children}</div>
</section>
```

### Visual Rhythm

Alternate section backgrounds to create depth:

1. White
2. `bg-violet-50/50` or `bg-slate-50`
3. White
4. `bg-amber-50/50` or `bg-slate-50`
5. White
6. `bg-slate-900` (footer)

Never use the same tinted background for two adjacent sections.

---

## Animations

All animations are subtle and purposeful. Less is more.

| Element                  | Animation                          | Duration            |
| ------------------------ | ---------------------------------- | ------------------- |
| Page load (hero text)    | Fade in + translateY(10px → 0)     | 400ms ease-out      |
| Scroll reveal (sections) | Fade in via IntersectionObserver   | 300ms, trigger once |
| Dropzone hover           | Border color + shadow transition   | 200ms               |
| Badges appearing         | Scale 0.95 → 1 + opacity           | 200ms               |
| Card hover               | TranslateY(−2px) + shadow increase | 200ms               |
| Collapsible sections     | Smooth height transition           | 200ms               |

### Rules

- Use CSS transitions. No Framer Motion unless it's already installed.
- NO staggered load animations. NO parallax. NO complex orchestrations.
- NO animation on scroll for body text — only for section entrances and interactive elements.
- Animations should be invisible to the user — they feel smooth, not showy.

---

## Copy / Voice

### The rule

If Ania the freelance graphic designer doesn't understand the sentence in 3 seconds, rewrite it. If
Pani Krystyna the accountant thinks the sentence is condescending, rewrite it.

### Translation table

| Don't write             | Write instead                               |
| ----------------------- | ------------------------------------------- |
| Client-side processing  | Dane zostają u Ciebie                       |
| Zero network requests   | Twój plik nie opuszcza przeglądarki         |
| XSD Schema Validation   | Zgodność ze schematem                       |
| Semantic Business Rules | Reguły biznesowe                            |
| Apache 2.0 license      | Darmowy na zawsze. Cały kod jest publiczny. |
| WebAssembly-powered     | _(don't say this on any user-facing page)_  |
| Open source             | Cały kod jest publiczny na GitHub           |
| Validate your XML       | Sprawdź swoją fakturę                       |
| 3 errors found          | 3 rzeczy do poprawienia                     |
| Invalid element         | Brakujące pole / Błędna wartość             |
| Upload XML              | Wrzuć plik                                  |

### Where jargon is OK

- Developer section (collapsed at bottom of landing page)
- npm package README
- CLI docs
- API reference
- GitHub issues / PRs
- Code comments

### Where jargon is NEVER OK

- Hero, above the fold
- Feature cards
- Error messages (first line — technical details go in expandable section)
- Blog post titles and introductions
- Any user-facing heading

---

## Responsive Breakpoints

| Breakpoint | Width        | Notes                               |
| ---------- | ------------ | ----------------------------------- |
| Mobile     | < 768px      | Single column, py-12, text-3xl hero |
| Tablet     | 768px–1023px | Two columns where applicable        |
| Desktop    | ≥ 1024px     | Full layout, py-24, text-5xl+ hero  |

Mobile-specific rules:

- Cards stack vertically, full width
- Header simplifies: logo + language picker, hamburger for nav
- Dropzone: `min-h-[160px]` (smaller than desktop `min-h-[200px]`)
- Section padding reduces: `py-12` instead of `py-24`
- Hero heading: `text-3xl` instead of `text-5xl`

---

## Shared Components

These live in `apps/web/src/components/` and are used across ALL pages:

| Component         | File                    | Usage                                           |
| ----------------- | ----------------------- | ----------------------------------------------- |
| Logo              | `logo.tsx`              | ksefuj●to wordmark, accepts `size` prop         |
| Site header       | `site-header.tsx`       | Sticky, glassmorphism, logo + nav + lang picker |
| Site footer       | `site-footer.tsx`       | Dark bg, links, copyright                       |
| Section container | `section-container.tsx` | Consistent padding + max-width wrapper          |
| Badge             | `badge.tsx`             | Pill-shaped status indicators                   |

When building a new page or feature, ALWAYS use these shared components. Never re-implement the
header, footer, or logo.

---

## Anti-Patterns (never do these)

- ❌ Dark backgrounds anywhere except footer and code blocks
- ❌ Monospace font on headings or body text
- ❌ Pure black (`#000`) text — use `slate-900`
- ❌ Pure white (`#FFF`) page background — use warm white
- ❌ SaaS gradient heroes
- ❌ Stock illustrations, decorative blobs, abstract shapes
- ❌ Heavy drop shadows — keep everything light
- ❌ Splitting "ksefuj" with color in the logo
- ❌ Technical jargon in user-facing headings
- ❌ "Start free trial" or pricing CTAs (there is nothing to buy)
- ❌ Fabricated social proof ("Trusted by X companies")
- ❌ Cookie popups, newsletter modals, chat widgets
- ❌ New npm dependencies for styling (use Tailwind for everything)
