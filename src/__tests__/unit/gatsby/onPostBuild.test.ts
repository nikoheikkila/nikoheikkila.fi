import { mkdir, mkdtemp, readFile, rm } from "node:fs/promises";
import { EOL, tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import onPostBuild from "../../../../gatsby/onPostBuild";
import { disallowedCrawlers } from "../../../utils/robots";

describe("onPostBuild", () => {
	let siteDir: string;

	beforeEach(async () => {
		siteDir = await mkdtemp(join(tmpdir(), "robots-"));
		await mkdir(join(siteDir, "public"));
		vi.spyOn(process, "cwd").mockReturnValue(siteDir);
	});

	afterEach(async () => {
		vi.restoreAllMocks();
		await rm(siteDir, { recursive: true, force: true });
	});

	test("writes a disallow group for every crawler followed by the sitemap and host", async () => {
		await onPostBuild();

		const written = await readFile(join(siteDir, "public", "robots.txt"), "utf-8");

		const groups = [...disallowedCrawlers].map((agent) => `User-agent: ${agent}${EOL}Disallow: /`);
		expect(written).toBe(
			`${groups.join(`${EOL}${EOL}`)}${EOL}Sitemap: https://nikoheikkila.fi/sitemap-index.xml${EOL}Host: https://nikoheikkila.fi${EOL}`,
		);
	});
});
