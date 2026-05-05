#!/usr/bin/env bash
set -euo pipefail

INPUT=$(cat)
FILE_PATH=$(printf '%s' "$INPUT" | jq -r '.tool_input.file_path // empty')

if [[ -z "$FILE_PATH" ]] || [[ ! -f "$FILE_PATH" ]]; then
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
		jq -cn --arg ctx "$output" \
			'{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":$ctx}}'
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

exit 0
