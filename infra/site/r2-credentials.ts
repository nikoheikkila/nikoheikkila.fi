/**
 * Runs a command with S3-compatible credentials for the R2 API derived from the
 * Cloudflare API token: the access key is the token ID and the secret is the
 * SHA-256 hash of the token value. See https://developers.cloudflare.com/r2/api/tokens/
 *
 * Usage: bun run ./r2-credentials.ts -- <command> [arguments...]
 *
 * Both the Terraform state backend and the object uploads then authenticate
 * with the same token that powers the Cloudflare provider.
 */
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";

interface TokenVerification {
	result: { id: string } | null;
	success: boolean;
}

const resolveAccessKeyId = async (token: string): Promise<string> => {
	const response = await fetch("https://api.cloudflare.com/client/v4/user/tokens/verify", {
		headers: { authorization: `Bearer ${token}` },
	});
	if (!response.ok) {
		throw new Error(`Could not verify the Cloudflare API token: HTTP ${response.status}`);
	}

	const verification = (await response.json()) as TokenVerification;
	if (!verification.result?.id) {
		throw new Error("Could not resolve the Cloudflare API token ID");
	}

	return verification.result.id;
};

const main = async (): Promise<number> => {
	const token = process.env.CLOUDFLARE_API_TOKEN;
	if (!token) {
		throw new Error("CLOUDFLARE_API_TOKEN is not set");
	}

	const command = process.argv.slice(2);
	if (command[0] === "--") {
		command.shift();
	}
	if (command.length === 0) {
		throw new Error("Usage: bun run ./r2-credentials.ts -- <command> [arguments...]");
	}

	// SHA-256 is not a security choice here: the R2 API contract defines the S3 secret
	// access key as the plain SHA-256 digest of the API token, so no other algorithm works.
	const environment = {
		...process.env,
		AWS_ACCESS_KEY_ID: await resolveAccessKeyId(token),
		AWS_SECRET_ACCESS_KEY: createHash("sha256").update(token).digest("hex"),
	};

	const { status } = spawnSync(command[0], command.slice(1), { stdio: "inherit", env: environment });
	return status ?? 1;
};

main()
	.then((status) => process.exit(status))
	.catch((error: unknown) => {
		console.error(error instanceof Error ? error.message : error);
		process.exit(1);
	});
