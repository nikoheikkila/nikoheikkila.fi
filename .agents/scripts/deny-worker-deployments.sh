#!/usr/bin/env bash
# PreToolUse hook for Bash: Workers are deployed, previewed and deleted only by
# GitHub Actions (AGENTS.md "Worker deployments"), so deny those Wrangler commands
# wherever they appear in a command line, also through runners such as bunx or `op run --`.
set -euo pipefail

COMMAND=$(jq -r '.tool_input.command // empty')

# Command position: line start, after a separator or subshell, an env assignment, or a runner.
PREFIX='(^|[;&|(`]|\$\(|(bunx|npx|bun[[:space:]]+x|pnpm[[:space:]]+(exec|dlx)|yarn([[:space:]]+dlx)?|--|[[:alnum:]_]+=[^[:space:]]*)[[:space:]])'
# The wrangler binary, by name or path, then any global flags (with values) before the subcommand.
WRANGLER='[[:space:]]*([^[:space:];&|]*/)?wrangler([[:space:]]+-[^[:space:]]+([[:space:]]+[^-[:space:]][^[:space:]]*)?)*'
SUBCOMMAND='[[:space:]]+(deploy|preview|versions[[:space:]]+(upload|deploy)|delete)([^[:alnum:]_-]|$)'

if [[ "$COMMAND" =~ ${PREFIX}${WRANGLER}${SUBCOMMAND} ]]; then
	jq -n --arg command "${BASH_REMATCH[0]}" '{
		hookSpecificOutput: {
			hookEventName: "PreToolUse",
			permissionDecision: "deny",
			permissionDecisionReason: "Blocked `\($command | gsub("^[[:space:];&|(`$]+|[[:space:];&|)`]+$"; ""))`: Workers are deployed, previewed and deleted only by GitHub Actions through cloudflare/wrangler-action (AGENTS.md \"Worker deployments\"). Local `wrangler dev` is fine."
		}
	}'
fi
