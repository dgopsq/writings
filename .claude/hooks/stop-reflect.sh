#!/usr/bin/env bash
# Stop hook.
#
# Asks — at most once per session, and only when the session actually did
# something — whether anything is worth recording in docs/lessons.md or whether
# the docs need updating.
#
# Two guards are load-bearing:
#   1. stop_hook_active. Returning decision:"block" without it puts the session
#      in an infinite Stop -> continue -> Stop loop.
#   2. The once-per-session marker. Without it this fires at the end of every
#      turn, which trains the model to write filler to make it stop and fills
#      the log with noise faster than having no log at all.
#
# Most sessions should end completely silently. That is the design, not a bug.

set -uo pipefail

payload="$(cat)"

# Guard 1: never re-block a stop we already blocked.
active="$(printf '%s' "$payload" | jq -r '.stop_hook_active // false' 2>/dev/null)"
[ "$active" = "true" ] && exit 0

project_dir="${CLAUDE_PROJECT_DIR:-.}"
state_dir="$project_dir/.claude/state"
mkdir -p "$state_dir" 2>/dev/null || exit 0

session_id="$(printf '%s' "$payload" | jq -r '.session_id // "unknown"' 2>/dev/null)" || exit 0
marker="$state_dir/${session_id}.reflected"
log="$state_dir/${session_id}.failures"

# Guard 2: once per session.
[ -f "$marker" ] && exit 0

failures=0
[ -f "$log" ] && failures="$(wc -l <"$log" | tr -d ' ')"

src_touched="$(git -C "$project_dir" status --porcelain -- src/ scripts/ 2>/dev/null | wc -l | tr -d ' ')"

# Quiet session: nothing failed and nothing changed. Say nothing.
if [ "$failures" -eq 0 ] && [ "$src_touched" -eq 0 ]; then
  exit 0
fi

touch "$marker" 2>/dev/null

reason="Before stopping: ${failures} command(s) looked like they failed this session and ${src_touched} file(s) under src/ or scripts/ changed.

1. Did you hit a mistake that was specific to THIS repo, cost real time, and would plausibly trip up a future session? If so, use the record-lesson skill. If it was all one-off noise or general knowledge, say 'nothing worth recording' and stop — that is a valid and common answer.

2. Do your changes contradict anything asserted in docs/architecture.md or docs/conventions.md? If so, update the doc now.

Do not invent a lesson to satisfy this prompt."

jq -n --arg reason "$reason" '{decision: "block", reason: $reason}'

exit 0
