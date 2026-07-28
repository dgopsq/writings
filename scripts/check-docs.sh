#!/usr/bin/env bash
# The one enforceable doc-freshness check: every route file must appear in the
# route table in docs/architecture.md.
#
# Everything else about keeping docs current is encouragement. This is not —
# add a route without documenting it and CI fails.

set -uo pipefail

cd "$(dirname "$0")/.." || exit 1

doc='docs/architecture.md'
missing=0

if [ ! -f "$doc" ]; then
  echo "check-docs: $doc is missing"
  exit 1
fi

while IFS= read -r route; do
  if ! grep -qF "$route" "$doc"; then
    echo "check-docs: $route is not documented in $doc"
    missing=$((missing + 1))
  fi
done < <(find src/app \( -name 'page.tsx' -o -name 'sitemap.ts' -o -name 'route.ts' \) | sort)

if [ "$missing" -gt 0 ]; then
  echo "check-docs: $missing route(s) undocumented — add them to the route table."
  exit 1
fi

echo "check-docs: all routes documented"
exit 0
