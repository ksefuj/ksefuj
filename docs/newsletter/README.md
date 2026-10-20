# Newsletter emails

Source of truth for the transactional emails sent by Buttondown (list `ksefuj`).

- `emails.pl.md`, `emails.en.md`, `emails.uk.md`: one `## <name>` section per email (`confirmation`,
  `welcome`), a `Subject: ...` line, a blank line, then the Markdown body. A missing locale file
  falls back to PL.
- `issues/`: newsletter issues, one Markdown file each (`Subject: ...`, a blank line, the body).
- `scripts/buttondown-sync.ts`: pushes the newsletter settings, the subscriber tags and these emails
  to Buttondown, and creates drafts from issue files.

## Language tags

The signup form tags each subscriber with `lang-pl`, `lang-en` or `lang-uk`, and with the source
(`from-homepage`, `from-article`, `from-calendar`). The script composes one body per email that
picks the language by tag:

```
{% if 'lang-en' in subscriber.tags %}EN{% elif 'lang-uk' in subscriber.tags %}UK{% else %}PL{% endif %}
```

Subjects use the PL text only. Pass `--localized-subjects` to use the same conditional for subjects.

## Usage

```bash
# Dry run (default): prints payloads and planned tag creations, no network calls, no key needed
pnpm newsletter:sync

# Apply: needs BUTTONDOWN_API_KEY
BUTTONDOWN_API_KEY=... pnpm newsletter:sync --apply
# Options: --localized-subjects, --username <newsletter username, default ksefuj>
```

The sync runs in this order: settings, tags, transactional emails. Tags and transactional emails are
skipped with a warning on a 403 (plan limits).

## Settings

The `SETTINGS` object in the script is sent as its own `PATCH /newsletters/{id}`: `name`,
`description`, `locale` (`pl-PL`; the API enum has no bare `pl`), `reply_to_address`, `timezone` and
`subscription_confirmation_redirect_url`. Buttondown may gate individual fields by plan. On a 403
the script prints the response and carries on; remove the offending field from `SETTINGS` and
re-run.

## Drafts

```bash
# Dry run: prints the payload
pnpm newsletter:sync -- --draft docs/newsletter/issues/<file>.md

# Create the draft in Buttondown
BUTTONDOWN_API_KEY=... pnpm newsletter:sync -- --draft docs/newsletter/issues/<file>.md --apply
```

The file starts with `Subject: ...`, a blank line, then the Markdown body. With `--draft` the script
only creates the draft; it skips settings, tags and transactional emails. It always sends
`status: "draft"`, so the script never schedules or sends an issue. Review and send it from the
Buttondown dashboard (Emails > Drafts).

The script refuses to run if any confirmation body lacks `{{ confirmation_url }}`.

## Caveats

- Double opt-in is on and cannot be toggled via the API.
- The welcome email toggle lives in Settings > Subscribing.
- `{% if ... in subscriber.tags %}` in transactional emails is unverified. Test by subscribing a
  test address in each language (and check subjects if using `--localized-subjects`).
- Subscribers who signed up before this change have no `lang-*` tag and get PL.

## Plan requirements (checked 2026-10-20)

The `ksefuj` newsletter is on Buttondown's free plan. Tags need Basic or higher and custom
transactional emails need Standard, so the sync script skips both with a warning. The signup form
does not send tags for now, and the privacy page mentions only the email address. After upgrading,
re-add the `tag` fields in `apps/web/src/components/newsletter-form.tsx` (`lang-<locale>`,
`from-<placement>`), update `privacy.thirdParty` in all three locales, and run
`pnpm newsletter:sync -- --apply`.
