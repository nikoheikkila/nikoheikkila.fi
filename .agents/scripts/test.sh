#!/usr/bin/env bash
set -euo pipefail

if [[ -n "${CLAUDE_PROJECT_DIR:-}" ]]; then
	cd "$CLAUDE_PROJECT_DIR"
elif git rev-parse --show-toplevel >/dev/null 2>&1; then
	cd "$(git rev-parse --show-toplevel)"
else
	cd "$(dirname "${BASH_SOURCE[0]}")/../.."
fi

INPUT=$(cat)

# Detect agent environment
IS_CLAUDE=false
if printf '%s' "$INPUT" | jq -e '.stop_hook_active != null or .transcript_path != null' >/dev/null 2>&1; then
	IS_CLAUDE=true
fi

# Avoid infinite loops if a continuation was already triggered by this hook
if [[ "$IS_CLAUDE" == true ]]; then
	if [[ "$(printf '%s' "$INPUT" | jq -r '.stop_hook_active')" == "true" ]]; then
		exit 0
	fi
else
	EXECUTION_NUM=$(printf '%s' "$INPUT" | jq -r '.executionNum // 1')
	if [[ "$EXECUTION_NUM" -gt 1 ]]; then
		echo "{}"
		exit 0
	fi
fi

TRANSCRIPT_PATH=$(printf '%s' "$INPUT" | jq -r '.transcript_path // .transcriptPath // empty')

if [[ -z "$TRANSCRIPT_PATH" ]] || [[ ! -f "$TRANSCRIPT_PATH" ]]; then
	if [[ "$IS_CLAUDE" == false ]]; then
		echo "{}"
	fi
	exit 0
fi

# Extract unique file paths from tool calls in the session transcript
if [[ "$IS_CLAUDE" == true ]]; then
	mapfile -t FILES < <(
		jq -r '
			.message?.content[]?
			| select(.type == "tool_use" and (.name == "Edit" or .name == "Write"))
			| .input.file_path
		' "$TRANSCRIPT_PATH" 2>/dev/null | sort -u
	)
else
	mapfile -t FILES < <(
		jq -r '
			select(.type == "PLANNER_RESPONSE")
			| .tool_calls[]?
			| select(.name == "write_to_file" or .name == "replace_file_content")
			| .args.TargetFile
		' "$TRANSCRIPT_PATH" 2>/dev/null | sort -u
	)
fi

if [[ ${#FILES[@]} -eq 0 ]]; then
	if [[ "$IS_CLAUDE" == false ]]; then
		echo "{}"
	fi
	exit 0
fi

# Filter to files that still exist on disk
EXISTING=()
for f in "${FILES[@]}"; do
	[[ -f "$f" ]] && EXISTING+=("$f")
done

if [[ ${#EXISTING[@]} -eq 0 ]]; then
	if [[ "$IS_CLAUDE" == false ]]; then
		echo "{}"
	fi
	exit 0
fi

output=""
rc=0
output=$(bunx vitest related --run "${EXISTING[@]}" 2>&1) || rc=$?

if [[ $rc -ne 0 ]]; then
	if [[ "$IS_CLAUDE" == true ]]; then
		jq -cn --arg ctx "$output" \
			'{"decision":"block","reason":$ctx}'
	else
		jq -cn --arg ctx "$output" \
			'{"decision":"continue","reason":$ctx}'
	fi
elif [[ "$IS_CLAUDE" == false ]]; then
	echo "{}"
fi

exit "$rc"
