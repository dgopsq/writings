# Lessons

Append-only log of repo-specific mistakes. Loaded into every Claude Code
session via the `@docs/lessons.md` import in CLAUDE.md, so it must stay SHORT.

CAP: 40 entries / 200 lines. Over that, run the `prune-lessons` skill.
Add entries with the `record-lesson` skill rather than by hand — it carries the
gates that keep this file from filling with noise.

An entry earns its place only if it cost real time, is specific to *this* repo
(not general knowledge), will plausibly recur, and compresses to one
imperative sentence. If the problem can instead be fixed in the repo, fix it —
that is what the **Why not fixed** field is for, and it names the condition
under which the entry should be deleted.

---

### devto-id-writeback

**scope**: content · **added**: 2026-07-27 · **hits**: 1

- **Trigger**: filling in or "tidying" the `id:` field in a post's frontmatter.
- **What happened**: `id` is the dev.to article id. The `sinedied/publish-devto`
  Action assigns it and commits it back as `chore: update published articles
  [skip ci]`. A hand-written value points the sync at somebody else's article
  and overwrites it.
- **Rule**: never write or edit `id:` in post frontmatter; leave it absent on
  new posts and let the Action fill it in.
- **Why not fixed**: the field has to exist for the sync to work, and nothing
  in this repo can validate it — the authority is dev.to's database.

### pnpm-allow-builds

**scope**: deps · **added**: 2026-07-27 · **hits**: 1

- **Trigger**: adding a dependency with a native binary or install script, then
  running any `pnpm` script.
- **What happened**: pnpm 11 blocks dependency install scripts by default and
  exits non-zero with `ERR_PNPM_IGNORED_BUILDS`. Because `pnpm <script>`
  pre-checks dependency status, *every* script then fails, not just install.
  The fix is `allowBuilds` in `pnpm-workspace.yaml`; the pnpm 10 spellings
  (`pnpm.onlyBuiltDependencies` in package.json, `only-built-dependencies` in
  .npmrc) are silently ignored.
- **Rule**: on `ERR_PNPM_IGNORED_BUILDS`, add the package to `allowBuilds` in
  `pnpm-workspace.yaml` — `true` if the binary is needed, `false` to decline it
  — and never to package.json or .npmrc.
- **Why not fixed**: the existing entries cover today's dependencies, but pnpm
  requires a decision per package, so the next one to arrive hits this again.
