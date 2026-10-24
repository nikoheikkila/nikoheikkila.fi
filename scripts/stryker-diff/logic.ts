import { matchesGlob } from "node:path";

/** Splits `git ... -z` output, whose records may themselves contain whitespace or newlines. */
export const parseNulSeparated = (output: string): string[] => output.split("\0").filter((record) => record !== "");

/**
 * Keeps the changed files that Stryker's `mutate` globs would mutate in a full run.
 * Patterns apply in order: a glob selects matching files and a `!` glob drops them again.
 */
export const selectMutationTargets = (changedFiles: string[], patterns: string[]): string[] =>
	changedFiles.filter((file) =>
		patterns.reduce(
			(selected, pattern) =>
				pattern.startsWith("!")
					? selected && !matchesGlob(file, pattern.slice(1))
					: selected || matchesGlob(file, pattern),
			false,
		),
	);

/** Joins files into Stryker's comma-separated `--mutate` value, refusing names it would split apart. */
export const toMutateArgument = (files: string[]): string => {
	const ambiguous = files.filter((file) => file.includes(","));

	if (ambiguous.length > 0) {
		throw new Error(`Cannot pass file names containing a comma to --mutate: ${ambiguous.join(", ")}`);
	}

	return files.join(",");
};
