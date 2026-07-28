#!/usr/bin/env bash
# PostToolUse hook (matcher: Bash).
#
# Records commands that looked like they failed, so the Stop hook can decide
# whether the session is worth reflecting on. It never blocks, never prints,
# and always exits 0 — a broken hook here must not disrupt a session.
#
# The exact PostToolUse payload shape is not contractually guaranteed, so this
# probes several plausible fields and degrades to "log nothing" rather than
# guessing wrong. If the failure log stays empty across a session where
# commands clearly failed, dump stdin here and adjust the jq paths.

set -uo pipefail

payload="$(cat)"

state_dir="${CLAUDE_PROJECT_DIR:-.}/.claude/state"
mkdir -p "$state_dir" 2>/dev/null || exit 0

session_id="$(printf '%s' "$payload" | jq -r '.session_id // "unknown"' 2>/dev/null)" || exit 0
log="$state_dir/${session_id}.failures"

# Prefer a real exit code; fall back to stderr being non-empty; fall back to an
# explicit error flag. Anything unrecognised counts as success.
code="$(printf '%s' "$payload" | jq -r '
  .tool_response.exit_code
  // .tool_response.exitCode
  // .tool_response.returncode
  // empty
' 2>/dev/null)"

stderr="$(printf '%s' "$payload" | jq -r '.tool_response.stderr // ""' 2>/dev/null)"
is_error="$(printf '%s' "$payload" | jq -r '.tool_response.is_error // false' 2>/dev/null)"

failed=false
if [ -n "$code" ] && [ "$code" != "0" ]; then
  failed=true
elif [ "$is_error" = "true" ]; then
  failed=true
elif [ -z "$code" ] && [ -n "$stderr" ]; then
  # No exit code available. stderr alone is a weak signal (plenty of tools
  # write to stderr on success), but the Stop hook only uses this as a hint and
  # the model filters it, so a false positive is cheap.
  failed=true
fi

[ "$failed" = true ] || exit 0

cmd="$(printf '%s' "$payload" | jq -r '.tool_input.command // ""' 2>/dev/null | tr '\n' ' ' | cut -c1-120)"
err="$(printf '%s' "$stderr" | tr '\n' ' ' | cut -c1-200)"

printf '%s\t%s\t%s\n' "$(date -u +%FT%TZ)" "$cmd" "$err" >>"$log" 2>/dev/null

exit 0
