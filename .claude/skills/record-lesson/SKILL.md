---
name: record-lesson
description: Append or bump an entry in docs/lessons.md after hitting a repo-specific mistake a future session would repeat. Use when a command or approach failed for a reason specific to this repo, when the Stop hook asks whether anything is worth recording, or when the user says "remember this" or "don't do that again".
---

# Recording a lesson

`docs/lessons.md` is loaded into every session. Every entry costs context
forever, so the bar is high. Work the gates in order and stop as soon as one
sends you elsewhere.

## Gate 1 — fix it instead

Can this be encoded in the repo so nobody can hit it again? Delete the dead
script, correct the constant, add the comment, fix the config.

If yes: **do that and stop.** Do not write a lesson. Most "agent memory"
systems rot because they accumulate notes describing problems that should have
been fixed.

## Gate 2 — is it actually a lesson

Record only if **all four** hold:

1. It cost real time or produced a wrong result.
2. It is specific to **this repo** — a trap this codebase lays. General
   knowledge ("Next 16 made Turbopack the default") is not a lesson; "*this
   repo's* package.json still advertises a dead script" is.
3. It will plausibly recur — a future session doing similar work would make the
   same move.
4. It compresses to one imperative sentence. If the rule needs a paragraph, it
   belongs in `docs/`.

Not lessons: a TypeScript error you fixed in the same breath; an API you had to
look up; anything already stated in `AGENTS.md` or `docs/`; a one-off
preference the user expressed (that goes in the relevant doc); anything you
could fix in the repo in five minutes.

## Gate 3 — dedup

```
grep -n '^### ' docs/lessons.md
```

If an entry already covers it: **increment `hits` and change nothing else.**
Do not append a near-duplicate. If a genuinely different lesson wants the same
id, the id was too vague — rename both.

## Write it

Append using exactly this shape:

```markdown
### <kebab-id>

**scope**: build | content | deploy | style | deps · **added**: YYYY-MM-DD · **hits**: 1

- **Trigger**: the action a future agent would naturally take.
- **What happened**: the actual failure, one sentence.
- **Rule**: one imperative sentence. This is the payload.
- **Why not fixed**: why this cannot be encoded in the repo instead.
```

If you cannot fill in **Why not fixed**, go back to Gate 1 — the answer is a
code change, not a note.

## Afterwards

```
wc -l docs/lessons.md
```

Over 200 lines, tell the user to run the `prune-lessons` skill. Do not prune
inline — pruning needs its own pass.

Report the entry id in one line. Do not commit unless asked.
