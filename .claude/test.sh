#!/usr/bin/env bash
set -euo pipefail

INPUT=$(cat)

# Avoid infinite loops if a continuation was already triggered by this hook
if [[ "$(printf '%s' "$INPUT" | jq -r '.stop_hook_active')" == "true" ]]; then
	exit 0
fi

TRANSCRIPT_PATH=$(printf '%s' "$INPUT" | jq -r '.transcript_path // empty')

if [[ -z "$TRANSCRIPT_PATH" ]] || [[ ! -f "$TRANSCRIPT_PATH" ]]; then
	exit 0
fi

# Extract unique file paths from Edit and Write tool calls in the session transcript
mapfile -t FILES < <(
	jq -r '
		.message?.content[]?
		| select(.type == "tool_use" and (.name == "Edit" or .name == "Write"))
		| .input.file_path
	' "$TRANSCRIPT_PATH" 2>/dev/null | sort -u
)

if [[ ${#FILES[@]} -eq 0 ]]; then
	exit 0
fi

# Filter to files that still exist on disk
EXISTING=()
for f in "${FILES[@]}"; do
	[[ -f "$f" ]] && EXISTING+=("$f")
done

if [[ ${#EXISTING[@]} -eq 0 ]]; then
	exit 0
fi

output=""
rc=0
output=$(bunx vitest related --run "${EXISTING[@]}" 2>&1) || rc=$?

if [[ $rc -ne 0 ]]; then
	jq -cn --arg ctx "$output" \
		'{"hookSpecificOutput":{"hookEventName":"Stop","additionalContext":$ctx}}'
fi

exit "$rc"
