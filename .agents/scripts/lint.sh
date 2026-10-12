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
if printf '%s' "$INPUT" | jq -e '.tool_input != null' >/dev/null 2>&1; then
	IS_CLAUDE=true
fi

# Extract file path: Claude passes .tool_input.file_path, Antigravity passes .toolCall.args.TargetFile
FILE_PATH=$(printf '%s' "$INPUT" | jq -r '.tool_input.file_path // .toolCall.args.TargetFile // .tool_call.args.TargetFile // empty')

# If FILE_PATH was not directly provided, try reading the latest edited file from transcriptPath
if [[ -z "$FILE_PATH" ]]; then
	TRANSCRIPT_PATH=$(printf '%s' "$INPUT" | jq -r '.transcriptPath // .transcript_path // empty')
	if [[ -n "$TRANSCRIPT_PATH" ]] && [[ -f "$TRANSCRIPT_PATH" ]]; then
		FILE_PATH=$(jq -r 'select(.type == "PLANNER_RESPONSE") | .tool_calls[]? | select(.name == "write_to_file" or .name == "replace_file_content") | .args.TargetFile' "$TRANSCRIPT_PATH" 2>/dev/null | tail -n 1)
	fi
fi

if [[ -z "$FILE_PATH" ]] || [[ ! -f "$FILE_PATH" ]]; then
	if [[ "$IS_CLAUDE" == false ]]; then
		echo "{}"
	fi
	exit 0
fi

BASENAME=$(basename "$FILE_PATH")
DIR=$(dirname "$FILE_PATH")

if [[ "$BASENAME" == *.* ]]; then
	EXT="${BASENAME##*.}"
else
	EXT=""
fi

run_check() {
	local output rc=0
	output=$("$@" 2>&1) || rc=$?

	if [[ $rc -ne 0 ]]; then
		if [[ "$IS_CLAUDE" == true ]]; then
			jq -cn --arg ctx "$output" \
				'{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":$ctx}}'
		else
			printf '%s\n' "$output" >&2
			echo "{}"
		fi
	elif [[ "$IS_CLAUDE" == false ]]; then
		echo "{}"
	fi

	exit "$rc"
}

case "$EXT" in
js | jsx | ts | tsx | mjs | cjs | json | jsonc | css | graphql | gql | svelte | vue | astro)
	run_check bunx biome check "$FILE_PATH"
	;;
tf | tfvars)
	run_check terraform fmt -check "$FILE_PATH"
	;;
sh | bash)
	run_check shellcheck "$FILE_PATH"
	;;
esac

if [[ "$EXT" == "yml" || "$EXT" == "yaml" ]] && [[ "$DIR" == *".github/workflows"* ]]; then
	run_check actionlint "$FILE_PATH"
fi

# Detect shell scripts without an extension via shebang
if [[ -z "$EXT" ]]; then
	FIRST_LINE=$(head -1 "$FILE_PATH" 2>/dev/null || true)
	if [[ "$FIRST_LINE" =~ ^#!(/usr/bin/env )?(bash|sh|zsh|ksh|dash) ]]; then
		run_check shellcheck "$FILE_PATH"
	fi
fi

if [[ "$IS_CLAUDE" == false ]]; then
	echo "{}"
fi
exit 0
