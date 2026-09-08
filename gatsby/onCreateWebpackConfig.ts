import type { CreateWebpackConfigArgs } from "gatsby";

interface WebpackArgs {
	stage: CreateWebpackConfigArgs["stage"];
	actions: Pick<CreateWebpackConfigArgs["actions"], "setWebpackConfig">;
}

/**
 * Skip source map generation for the production bundle.
 *
 */
const onCreateWebpackConfig = ({ stage, actions }: WebpackArgs) => {
	if (stage === "build-javascript") {
		actions.setWebpackConfig({ devtool: false });
	}
};

export default onCreateWebpackConfig;
