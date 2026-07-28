---
name: prune-lessons
description: Compact docs/lessons.md when it exceeds its 200-line cap — retire entries whose underlying problem was fixed, promote durable rules into AGENTS.md, merge duplicates. Use when the session-start size alarm fires or the user asks to prune, compact, or clean up the lessons log.
---

# Pruning the lessons log

`docs/lessons.md` is loaded into every session, so it has a hard cap of 40
entries / 200 lines. When it goes over, compact it — in this order.

## 1. Retire the fixed

For each entry, read its **Why not fixed** field and check whether that
condition still holds. It names the circumstance under which the entry should
die.

**Verify with a grep or a file read — do not take the entry's word for it.** If
the dead script really was deleted, or the mismatch really was corrected,
delete the entry.

## 2. Promote the durable

An entry with `hits >= 3` whose **Rule** is a single line has earned a
permanent home. Move it into the `## Hard-won rules` block in `AGENTS.md` and
delete it from the log.

That block is capped at **12 bullets**. To promote a 13th, demote or delete the
least useful one — do not let it grow.

## 3. Merge overlaps

Two entries in the same `scope` whose Rules say substantially the same thing
collapse into one. Keep the higher `hits` and the clearer wording.

## 4. Expire the stale

`hits: 1` and `added` more than 12 months ago: delete. It never recurred, so it
was not a lesson.

## 5. Escalate the chronic

`hits >= 5` means this is not a lesson at all — it is a missing doc section or
a missing fix. Write it into the right file under `docs/`, or fix the code, and
delete the entry.

## Rules

- **No archive file.** A `lessons-archive.md` is write-only memory nobody
  reads. `git log -- docs/lessons.md` is the archive, and it is free.
- Keep the file's header intact.
- Report what you removed and why, in a few lines. Do not commit unless asked.
