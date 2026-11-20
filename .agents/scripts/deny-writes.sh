#!/usr/bin/env bash
# PreToolUse hook for read-only review subagents: blocks every shell and file-writing tool call.
set -euo pipefail

TOOL=$(jq -r '.tool_name // "unknown"' 2>/dev/null || echo unknown)

echo "Blocked ${TOOL}: review agents are read-only. Report findings as JSON; the orchestrator applies edits." >&2
exit 2
