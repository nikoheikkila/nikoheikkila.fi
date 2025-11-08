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

const gatsby = Bun.spawn({
	cmd: ["bunx", "gatsby", "develop"],
	stdout: "pipe",
	stderr: "pipe",
});

let typesGenerated = false;
const decoder = new TextDecoder();

const readStdout = async () => {
	for await (const chunk of gatsby.stdout) {
		const output = decoder.decode(chunk);

		if (output.includes("Generating GraphQL and TypeScript types")) {
			const typesFile = Bun.file("src/gatsby-types.d.ts");
			const maxAttempts = 10;
			let attempts = 0;

			while (attempts < maxAttempts) {
				if (await typesFile.exists()) {
					typesGenerated = true;
					console.log("✅ Types generated successfully!");
					gatsby.kill("SIGTERM");
					break;
				}
				await Bun.sleep(100);
				attempts++;
			}

			if (attempts >= maxAttempts) {
				console.warn(
					"⚠️  Types file not found after polling, killing process anyway"
				);
				gatsby.kill("SIGTERM");
			}

			break;
		}
	}
};

const readStderr = async () => {
	for await (const chunk of gatsby.stderr) {
		const output = decoder.decode(chunk);
		if (output.includes("error") || output.includes("Error")) {
			process.stderr.write(output);
		}
	}
};

readStdout();
readStderr();

const exitCode = await gatsby.exited;

if (typesGenerated) {
	process.exit(0);
}

if (exitCode === 0) {
	console.error("❌ Types were not generated");
	process.exit(1);
} else {
	console.error(`❌ Gatsby exited with code ${exitCode}`);
	process.exit(exitCode);
}
