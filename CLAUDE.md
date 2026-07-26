# CLAUDE.md

@AGENTS.md
@docs/lessons.md

## Claude Code specifics

Everything about the project itself is in AGENTS.md and `docs/` — this file
holds only harness wiring, so the two cannot drift.

- Writing a new post → use the `new-post` skill.
- Recording a repo-specific mistake → use the `record-lesson` skill.
- `docs/lessons.md` over 200 lines → use the `prune-lessons` skill.

A `Stop` hook may interrupt the end of a turn to ask whether anything this
session was worth recording, and whether your changes invalidate the docs.
Answer honestly — "nothing worth recording, it was all one-off noise" is a
valid and common answer. Do not manufacture a lesson to satisfy the hook.
