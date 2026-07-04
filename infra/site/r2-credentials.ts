/**
 * Derives S3-compatible credentials for the R2 API from the Cloudflare API token:
 * the access key is the token ID and the secret is the SHA-256 hash of the token value.
 * See https://developers.cloudflare.com/r2/api/tokens/
 *
 * Prints POSIX `export` statements, so shells can adopt the credentials with
 * `eval "$(bun run ./r2-credentials.ts)"` before running Terraform. Both the
 * state backend and the object uploads then authenticate with the same token
 * that powers the Cloudflare provider.
 */
import { createHash } from "node:crypto";

interface TokenVerification {
	result: { id: string } | null;
	success: boolean;
}

const main = async (): Promise<void> => {
	const token = process.env.CLOUDFLARE_API_TOKEN;
	if (!token) {
		throw new Error("CLOUDFLARE_API_TOKEN is not set");
	}

	const response = await fetch("https://api.cloudflare.com/client/v4/user/tokens/verify", {
		headers: { authorization: `Bearer ${token}` },
	});
	if (!response.ok) {
		throw new Error(`Could not verify the Cloudflare API token: HTTP ${response.status}`);
	}

	const verification = (await response.json()) as TokenVerification;
	const accessKeyId = verification.result?.id;
	if (!accessKeyId) {
		throw new Error("Could not resolve the Cloudflare API token ID");
	}

	const secretAccessKey = createHash("sha256").update(token).digest("hex");

	process.stdout.write(`export AWS_ACCESS_KEY_ID=${accessKeyId}\nexport AWS_SECRET_ACCESS_KEY=${secretAccessKey}\n`);
};

main().catch((error: unknown) => {
	console.error(error instanceof Error ? error.message : error);
	process.exit(1);
});
