#!/usr/bin/env bash
# SessionStart hook.
#
# Its ONLY job is the size alarm. The content of docs/lessons.md reaches the
# session through the `@docs/lessons.md` import in CLAUDE.md, which is
# deterministic and cannot be skipped by a hook timeout — so this deliberately
# does not cat the file.
#
# Project hooks merge with any user-level SessionStart hook; both run.

set -uo pipefail

lessons="${CLAUDE_PROJECT_DIR:-.}/docs/lessons.md"
[ -f "$lessons" ] || exit 0

lines="$(wc -l <"$lessons" | tr -d ' ')"

if [ "$lines" -gt 200 ]; then
  echo "docs/lessons.md is ${lines} lines (cap 200). Run the prune-lessons skill before other work."
fi

exit 0
