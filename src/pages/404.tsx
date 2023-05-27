import { HeadFC, Link, PageProps } from "gatsby";
import React from "react";
import Layout, { LayoutType } from "../components/layout/layout";
import SEO from "../components/seo";

const title = "Page Not Found";

const NotFound: React.FC<PageProps> = () => {
	return (
		<Layout type={LayoutType.SINGLE} title={title}>
			<h1>🤖 You have erred, but it is human</h1>

			<p>
				<code className="language-js">
					REASON: ERR_CONTENT_NOT_FOUND
				</code>
			</p>

			<p>
				Alas, the content you so humbly requested is nowhere to be
				found.
			</p>
			<p>
				Go back to <Link to="/">home</Link> instead?
			</p>
		</Layout>
	);
};

export const Head: HeadFC = ({ location }) => {
	return <SEO title={title} type="page" url={location.pathname} />;
};

export default NotFound;
