import fs from "node:fs/promises";
import path from "node:path";
import type { GatsbyNode } from "gatsby";
import { publicationUriFor, type StandardSiteManifest } from "../src/utils/standardSite";

const onPostBuild: GatsbyNode["onPostBuild"] = async ({ cache, reporter }) => {
	const manifest = (await cache.get("standardSite")) as StandardSiteManifest | undefined;
	const publicationUri = manifest ? publicationUriFor(manifest) : "";

	if (!publicationUri) {
		reporter.warn("standard.site: no publication record adopted, skipping .well-known/site.standard.publication");
		return;
	}

	const wellKnownDir = path.join("public", ".well-known");

	await fs.mkdir(wellKnownDir, { recursive: true });
	await fs.writeFile(path.join(wellKnownDir, "site.standard.publication"), `${publicationUri}\n`, "utf8");
};

export default onPostBuild;
