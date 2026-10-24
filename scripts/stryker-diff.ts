#!/usr/bin/env bun

/**
 * Runs Stryker only on the production files changed between a base branch and HEAD.
 *
 * Usage: `task test:mutation:diff [-- <base>]`. The base defaults to the remote's default branch.
 * Only committed changes are compared (`<base>...HEAD`), so a dirty working tree is refused rather
 * than silently leaving staged, unstaged or untracked work out of the run.
 */
import config from "../stryker.config.mjs";
import { parseNulSeparated, selectMutationTargets, toMutateArgument } from "./stryker-diff/logic";

const git = (...args: string[]): { ok: boolean; stdout: string } => {
	const result = Bun.spawnSync(["git", ...args], { stderr: "inherit" });
	return { ok: result.success, stdout: result.stdout.toString() };
};

const detectDefaultBranch = (): string => {
	const head = git("symbolic-ref", "--short", "refs/remotes/origin/HEAD");
	return head.ok ? head.stdout.trim() : "main";
};

const base = process.argv[2] ?? detectDefaultBranch();

if (git("status", "--porcelain").stdout !== "") {
	console.error(
		`Refusing to run: the working tree is dirty. ${base}...HEAD only covers committed changes, so commit or stash first.`,
	);
	process.exit(1);
}

const diff = git("diff", "--name-only", "-z", "--diff-filter=ACMRTUXB", `${base}...HEAD`);

if (!diff.ok) {
	process.exit(1);
}

const targets = selectMutationTargets(parseNulSeparated(diff.stdout), config.mutate ?? []);

if (targets.length === 0) {
	console.log(`No production files changed against ${base}; nothing to mutate.`);
	process.exit(0);
}

console.log(`Mutating ${targets.length} file(s) changed against ${base}:\n${targets.join("\n")}`);

const stryker = Bun.spawnSync(["node_modules/.bin/stryker", "run", "--mutate", toMutateArgument(targets)], {
	stdio: ["inherit", "inherit", "inherit"],
});

process.exit(stryker.exitCode ?? 1);
