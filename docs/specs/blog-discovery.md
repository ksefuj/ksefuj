# Spec: content discovery (topics, read next, blog page, homepage)

Status: approved 2026-10-07. Owner: Witek.

## Problem

A reader who lands on a post from Google has nowhere to go when it ends. Posts close with sources
and the GitHub "edit" card; the only onward links are inside the prose. The blog page is a flat grid
of 18 cards with no way to browse by subject, guides live on a separate page few readers find, and
the homepage shows no content at all. Every post we publish is an island.

Tags can't fix this. Every post's first tag is "KSeF" and the rest are free-form and mixed-language
(Faktura, Walidacja/Validation, JDG…), so similarity by tags recommends everything.

## Goals

- Every post and guide offers three relevant next reads.
- A reader can browse the blog by subject.
- Blog readers discover guides, and the reverse.
- The homepage surfaces current content, so returning visitors see what's new.

Non-goals: pagination (not needed under ~40 items), search, comments, analytics or click tracking
(privacy-first: no tracking, see CLAUDE.md), newsletter changes.

## 1. Topics

Add a required `topic` field to the frontmatter of every blog post and guide. One topic per item,
from a closed list. Keys are English and stable; labels are i18n strings.

| Key         | PL label                        | EN label                             | UK label                         |
| ----------- | ------------------------------- | ------------------------------------ | -------------------------------- |
| `deadlines` | Obowiązek, terminy i kary       | Obligations, deadlines and penalties | Обов'язок, терміни і штрафи      |
| `access`    | Logowanie i uprawnienia         | Login and permissions                | Вхід і повноваження              |
| `invoicing` | Wystawianie i odbieranie faktur | Issuing and receiving invoices       | Виставлення й отримання рахунків |
| `errors`    | Błędy i walidacja               | Errors and validation                | Помилки і валідація              |

Aligned with MF FAQ categories (Zasady obowiązywania, Uprawnienia i autoryzacja, Wystawianie i
otrzymywanie faktur); add `korekty` or `offline` once either has 3+ posts.

EN/UK labels may be refined by the localizer; keys may not change.

Assignment (PL slug; translations take the same topic as their PL source):

- `deadlines`: blog/ksef-od-1-kwietnia-2026, blog/ksef-ruszyl, blog/ksef-checklist-przygotowanie,
  blog/ksef-limit-10000-zl, blog/koniec-limitu-10000-zl, blog/kary-ksef-2027-2028,
  blog/zwolniony-z-vat-ksef, blog/ksef-dla-jdg
- `access`: blog/certyfikaty-vs-tokeny-ksef, blog/tokeny-ksef-po-2026, guides/logowanie-ksef,
  guides/uprawnienia-ksef-ksiegowa
- `invoicing`: blog/faktura-korygujaca-ksef, blog/faktura-zagraniczna-ksef,
  blog/faktura-z-kasy-fiskalnej-ksef-2027, blog/numer-ksef-w-przelewie,
  guides/aplikacja-podatnika-ksef-pierwsza-faktura, guides/pierwsza-faktura-fa3,
  blog/falszywe-faktury-ksef, guides/awaria-ksef-offline
- `errors`: blog/najczestsze-bledy-walidacji-fa3, blog/ksef-scisla-walidacja-xml,
  blog/fa2-vs-fa3-ksef

Rules:

- The build (or `pnpm validate:seo`) fails when a blog post or guide has no `topic` or one outside
  the list. New content cannot ship untagged; the daily content routine picks this up from
  `apps/web/content/README.md`, which must document the field and the list.
- `tags` stay in the files but are no longer rendered. The topic replaces them on cards and in the
  post header. Do not delete tags in this work.
- Optional `related: ["blog/<pl-slug>", "guides/<pl-slug>"]` (max 3 section-qualified PL refs, same
  or other section) overrides the automatic picks in §2. Qualified because slugs are only unique
  within a section; `pnpm validate:seo` checks that each ref exists and is not the item.
- Optional `featured: true` pins an item on the homepage (§4).
- Add `topic`, `related` and `featured` to the `Frontmatter` type in `apps/web/src/lib/content.ts`.

## 2. Read next

A "Read next" block on every blog post and guide page.

- **Placement:** after the sources list, before `ContributeFooter`.
- **Heading:** i18n, e.g. „Czytaj dalej" / "Read next" / "Читай далі".
- **Content:** exactly 3 cards (fewer only if the site has fewer other items).
- **Selection**, in order, deduplicated, never the current item:
  1. Items in the current item's `related`, in the listed order.
  2. Items with the same `topic`, blog and guides together, newest first.
  3. Newest items overall.
- **Locales:** use the unified, PL-driven listing. In EN/UK, prefer items with a translation in the
  current locale before falling back to PL items, which show the existing "PL" badge.
- **Implementation:** server-rendered at build time from the content index. No client JS, no network
  calls, no tracking.
- Put the selection logic in one pure function in `apps/web/src/lib/` with unit tests: related
  first, same-topic fill, newest fill, self excluded, locale preference, fewer than 3 available.

## 3. Shared content card

One `ContentCard` component in `apps/web/src/components/` used by the blog page, guides page, read
next block and homepage section. Replaces the two inline card implementations.

- Shows: topic badge, section marker for guides (e.g. „Poradnik"), title, description (2 lines),
  date (blog only) and reading time; "PL" badge for fallback content.
- Follows DESIGN_SYSTEM.md: card spec, hover lift (translateY(-2px) plus larger shadow, 200ms),
  badge spec (`rounded-full`). If `badge.tsx` deviates from the spec, fix it there.
- Variants: `default` (grid card) and `featured` (large, full-width, for §4 and the blog page lead).

## 4. Blog page

- **Lead:** the newest post as a `featured` card above the grid.
- **Topic filter:** chips „Wszystkie · Obowiązek, terminy i kary · …" driven by `?topic=<key>`;
  combines with the existing `?filter=translated` on EN/UK. Chips are real links that update the
  query string.
- **Static rendering:** `/[locale]/blog` and `/[locale]/guides` stay statically generated, so the
  pages must not read `searchParams` on the server (that would make every request dynamic). The
  server renders the full list (all topics, all items, PL fallbacks included); a small client
  component reads the query with `useSearchParams` inside `<Suspense>` and shows the matching
  subset. The Suspense fallback is the unfiltered list, so crawlers and no-JS clients see
  everything. The lead card is the newest item of the current filtered view.
- **SEO of filtered URLs:** they share the bare listing's static HTML, so the canonical points at
  the unfiltered `/blog` (or `/guides`), which handles the duplicates. No per-filter `noindex`: it
  cannot be computed for a static page.
- **Guides strip:** one row under the lead, „Poradniki krok po kroku →", with the guides as compact
  cards and a link to `/guides`.
- The guides page gets the same card and topic chips (without the guides strip).
- Keep the RSS link.

## 5. Homepage section

- „Najnowsze z bloga" / "Latest from the blog" / UK equivalent: 3 `ContentCard`s plus links
  „Wszystkie wpisy →" (`/blog`) and „Poradniki →" (`/guides`).
- **Which 3:** items with `featured: true` first (newest first), then the newest blog posts.
- **Placement:** decided together with the validator-subpage work (the homepage is being
  restructured). Default: after the features/validation sections, before the newsletter, keeping
  DESIGN_SYSTEM.md's alternating backgrounds.
- Built in the same build-time way as §2.

## 6. Measuring

No click tracking. Use the daily Search Console digest: compare impressions and clicks of older
posts for 4 weeks before and after release, and watch whether "crawled, not indexed" pages get
indexed once more pages link to them.

## Delivery

1. **PR 1, topics:** frontmatter on all blog posts and guides (all locales), type, build-time
   validation, README and STYLE.md docs, i18n labels. No UI change.
2. **PR 2, discovery UI:** `ContentCard`, read next on posts and guides, blog and guides page
   changes. Stacked on PR 1.
3. **PR 3, homepage section:** after the validator-subpage work lands.

Each PR: build, lint, typecheck, tests, `format:check`, `check:style`, `validate:seo` pass; UI
strings in all three locales (UK informal ти); verified on a production build.
