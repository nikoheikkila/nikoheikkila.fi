import type { CreateWebpackConfigArgs } from "gatsby";
import { describe, expect, test } from "vitest";
import onCreateWebpackConfig from "../../../../gatsby/onCreateWebpackConfig";
import { WebpackActions } from "./fakes";

const run = (stage: CreateWebpackConfigArgs["stage"]) => {
	const actions = new WebpackActions();

	onCreateWebpackConfig({ stage, actions: { setWebpackConfig: actions.setWebpackConfig } });

	return actions;
};

describe("onCreateWebpackConfig", () => {
	test("disables source maps for the production JavaScript bundle", () => {
		expect(run("build-javascript").configs).toStrictEqual([{ devtool: false }]);
	});

	test.each(["develop", "develop-html", "build-html"] as const)("leaves the %s stage untouched", (stage) => {
		expect(run(stage).configs).toHaveLength(0);
	});
});
