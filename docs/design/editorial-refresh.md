# Editorial refresh: from SaaS landing page to KSeF reference

Status: proposal + first implementation (branch `design/editorial-refresh`), 2026-10-19. Implements
phase 3 of the agreed web roadmap (visual refresh of templates, topic hubs, EN parity).

## Why

The data says ksefuj.to is a publication with a tool attached, but the design says the opposite.

- Content is ~50% of views, search ~40% of traffic, EN ~43% of views.
- GSC (2026-09-19 → 10-16): 103 clicks, avg position 6.6, CTR 1.19%. 20 recent articles are
  "Discovered/unknown — not indexed". That is a crawl-priority problem: new articles get 1–3
  internal links (latest-posts strip, read-next) and fall off the homepage within days.
- The homepage is ~6,600px of product pitch: trust pill, centered slogan headings ("Bo KSeF to nie
  żarty."), icon-card feature grids, a pricing-style comparison table against anonymous
  "Freemium/Enterprise", a "coming soon" card for the preview that already shipped, three separate
  developer/open-source sections. 60+ articles per locale are represented by three cards.
- Newsletter capture exists only at the bottom of the homepage, which article readers (the majority)
  never see.

## Principles

1. **Content is the product.** The homepage is a front page of a reference: what changed, what is
   coming, where to read about each topic. The validator stays in the masthead (it is what the
   homepage title/H1 rank for), but it is one tool among three.
2. **Every page is a hub.** Each article links into its topic cluster, each topic lists its
   articles. More internal links per new URL → faster discovery and indexing.
3. **Trust through specifics, not adjectives.** Dates, legal bases, sources, "updated on" — instead
   of "Ministerialnie precyzyjne", "100% Open Source", check-mark tables.
4. **Typography and rules, not boxes.** Left-aligned headings, list rows separated by hairlines, one
   accent colour used sparingly. No icon tiles, no floating badges, no gradients, no hover-lift, no
   glass header.
5. **SEO-safe.** No URL, slug, locale-prefix, title or article H1 changes. Homepage `<title>`, meta
   description and H1 text stay. Everything else is additive or presentational.

## What changes

### Global

- Fix: `font-display` utility is not generated (font vars live in `:root`, not `@theme`), so
  headings render in the body font. Register font families in `@theme`.
- Header: solid bar with hairline border instead of a floating blurred pill. Content first: Blog,
  Poradniki, FAQ, then tools (Walidator, Podgląd, Kursy walut). All existing pages stay linked.

### Homepage (`/[locale]`)

| Order | Section                                                                                                                                                                    | Purpose                                                        |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| 1     | Masthead: H1 (unchanged text) + one plain sentence, left-aligned; compact drop zone beside it                                                                              | Keeps validator ranking, loses the slop                        |
| 2     | **Kalendarz KSeF**: dated milestones (1 Feb 2026, 1 Apr 2026, 31 Dec 2026, 1 Jan 2027 / 2028 penalties), each with status and link to the article explaining it            | Time-sensitive, most-searched questions; trust; internal links |
| 3     | **Tematy**: one column per content topic (deadlines, access, invoicing, errors) listing its articles and guides as text links, "all in topic" link to the filtered listing | Topic hubs; every article ≥1 homepage link                     |
| 4     | **Ostatnio opublikowane i zaktualizowane**: dense list of 6 items (date, topic, title)                                                                                     | Freshness signal, new-URL discovery                            |
| 5     | **Narzędzia**: validator, preview, NBP rates in one compact row, with what the validator checks in one line each                                                           | Tools without the sales pitch                                  |
| 6     | Newsletter, plain inline form                                                                                                                                              | Retention                                                      |
| 7     | **Jak pracujemy**: sources (MF documents), no data leaves the browser, open source, free; links to GitHub/npm for developers                                               | Editorial trust in one short block                             |

Removed: features grid, validation-layers panel (condensed into tools), comparison table,
coming-soon, getting-started, open-source and developer sections (condensed into 5 and 7).

### Articles (blog, guides, validator pages)

- Visible breadcrumbs (Home / Blog / Topic) matching the existing BreadcrumbList JSON-LD.
- **Więcej w temacie** after read-next: all other items in the same topic as a text list (up to 8).
- Inline newsletter form at the end of every blog post and guide, tracked with a `placement`
  property.

### Listings (blog, guides)

- Cards → list rows (topic · date, title, description) separated by hairlines. More articles per
  screen, scannable, reads like an index rather than a product grid.

## Measuring

Baseline is `gsc/2026-10-19.json` on the `gsc-data` branch. After 4 weeks compare: indexed share of
sitemap URLs, impressions/clicks for articles published after launch, homepage → article
click-through (`homepage_post_clicked`, new `homepage_topic_link_clicked`,
`homepage_calendar_link_clicked`), and `newsletter_subscribed` by `placement`.

## Later (not in this branch)

- "Start here" paths by situation (JDG, zwolniony z VAT, księgowa, faktury zagraniczne).
- Editorial standards page and visible "verified against" line per article.
- Title/meta rewrites for the CTR opportunities in the GSC digest (separate SEO PR).
