#!/usr/bin/env bun

/**
 * Generate GraphQL TypeScript types for Gatsby
 *
 * This script runs the Gatsby bootstrap process which generates
 * the GraphQL schema and TypeScript type definitions without
 * doing a full build.
 */
import Bun from "bun";

console.log("🔧 Generating GraphQL types...");

/**
 * Port 8000 belongs to `task serve` and Playwright's web server. Colliding
 * there makes gatsby-cli prompt for another port, which deadlocks on piped
 * stdio. CI=1 additionally suppresses interactive prompts and progress bars.
 */
const gatsby = Bun.spawn({
	cmd: ["bunx", "gatsby", "develop", "--port", "8999"],
	env: { ...process.env, CI: "1" },
	stdout: "pipe",
	stderr: "pipe",
});

let typesGenerated = false;
const decoder = new TextDecoder();
const typesFile = Bun.file("src/gatsby-types.d.ts");

/**
 * The codegen log line announces the *start* of codegen; the file lands at
 * the end. Allow 10s so a cold filesystem doesn't fail spuriously.
 */
const waitForTypesFile = async (attemptsLeft = 100): Promise<boolean> => {
	if (attemptsLeft === 0) {
		return false;
	}

	if (await typesFile.exists()) {
		return true;
	}

	await Bun.sleep(100);
	return waitForTypesFile(attemptsLeft - 1);
};

const waitForCodegen = async (): Promise<boolean> => {
	for await (const chunk of gatsby.stdout) {
		if (decoder.decode(chunk).includes("Generating GraphQL and TypeScript types")) {
			return true;
		}
	}

	return false;
};

const readStdout = async () => {
	if (!(await waitForCodegen())) {
		return;
	}

	typesGenerated = await waitForTypesFile();

	if (typesGenerated) {
		console.log("✅ Types generated successfully!");
	} else {
		console.warn("⚠️  Types file not found after polling, killing process anyway");
	}

	gatsby.kill("SIGTERM");
};

const readStderr = async () => {
	for await (const chunk of gatsby.stderr) {
		const output = decoder.decode(chunk);
		if (output.includes("error") || output.includes("Error")) {
			process.stderr.write(output);
		}
	}
};

const reportStreamFailure = (error: unknown) => {
	console.error(error);
};

readStdout().catch(reportStreamFailure);
readStderr().catch(reportStreamFailure);

const resolveExitCode = (gatsbyExitCode: number): number => {
	if (typesGenerated) {
		return 0;
	}

	if (gatsbyExitCode === 0) {
		console.error("❌ Types were not generated");
		return 1;
	}

	console.error(`❌ Gatsby exited with code ${gatsbyExitCode}`);
	return gatsbyExitCode;
};

const exitCode = resolveExitCode(await gatsby.exited);

// biome-ignore lint/nursery/noProcessExit: Gatsby's worker processes can keep the piped streams open after it exits
process.exit(exitCode);
