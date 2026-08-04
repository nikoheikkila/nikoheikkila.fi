import type { GatsbyNode } from "gatsby";
import { fetchManifest } from "./standardSiteRecords";

const onPreBootstrap: GatsbyNode["onPreBootstrap"] = async ({ cache, reporter }) => {
	const manifest = await fetchManifest(reporter);

	await cache.set("standardSite", manifest);
};

export default onPreBootstrap;
