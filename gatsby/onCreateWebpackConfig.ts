import type { CreateWebpackConfigArgs } from "gatsby";

/**
 * Skip source map generation for the production bundle.
 *
 */
const onCreateWebpackConfig = ({ stage, actions }: CreateWebpackConfigArgs) => {
	if (stage === "build-javascript") {
		actions.setWebpackConfig({ devtool: false });
	}
};

export default onCreateWebpackConfig;
