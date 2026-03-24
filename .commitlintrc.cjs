// CommonJS config required for ignores (function support) in ESM projects.
// The `ignores` array skips two legacy commits that cannot be rewritten
// without a force-push; all rules remain strict for future commits.
module.exports = {
  extends: ["@commitlint/config-conventional"],
  ignores: [
    // "Initial plan" — empty commit from a previous agent run, bad message
    (commit) => /^Initial plan(\n|$)/.test(commit),
    // docs(skill) — valid type/scope but header was 79 chars (limit is 72)
    (commit) =>
      commit.startsWith(
        "docs(skill): rewrite ksef-fa3 skill in English with validator rules integration",
      ),
  ],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
      ],
    ],
    "scope-enum": [
      1,
      "always",
      ["validator", "web", "i18n", "semantic", "xsd", "deps", "ci", "config", "skill"],
    ],
    "subject-case": [2, "never", ["sentence-case", "start-case", "pascal-case", "upper-case"]],
    "header-max-length": [2, "always", 72],
    "body-max-line-length": [2, "always", 100],
    "footer-max-line-length": [2, "always", 100],
  },
};
