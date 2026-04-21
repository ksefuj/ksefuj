# Skills

Claude Project skills for KSeF invoice generation. Each skill is self-contained for standalone
distribution (`.skill` packaging) but references shared canonical sources when used in-repo.

## Reference Architecture

```
Canonical sources (single copy, large):
├── packages/validator/docs/fa3-information-sheet.md   ← schema/validation rules (1,049 lines)
└── docs/knowledge-base/briefs/podrecznik-ksef-20-czesc-ii.md  ← MF operational rules (1,189 lines)

Skills bundle focused extracts (small, topic-specific):
├── skills/ksef-fa3/references/          ← ~150 lines each, covers generation scenarios
└── skills/ksef-korekta/references/      ← ~150 lines each, covers correction procedures
```

### Why not symlink or copy?

- **Symlinks** break when the skill is packaged as a standalone `.skill` file
- **Full copies** create drift — the canonical source updates but the copy doesn't
- **Focused extracts** are purpose-built summaries (~10-15% of the source) containing only what
  the skill needs at runtime. They're small enough to maintain manually and don't duplicate the
  full source

### Updating references

When the canonical source changes (schema update, new MF publication):

1. Update the canonical file first
2. Check if the change affects any skill's `references/` — grep for the relevant section number
3. Update the focused extract if needed
4. Run the validator test suite to catch regressions

### Skill authority block pattern

Each SKILL.md uses this structure:

```markdown
> **Bundled references (self-contained for standalone use):**
> - `references/foo.md` — what it covers
>
> **In-repo canonical sources (not bundled — for maintainers):**
> - `path/to/canonical.md` — full document (N lines)
```

This makes it clear which files ship with the skill and which are repo-only context.
