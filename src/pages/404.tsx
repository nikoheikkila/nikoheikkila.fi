import React from "react";
import { Link, HeadFC } from "gatsby";
import Layout, { LayoutType } from "../components/layout/layout";
import SEO from "../components/seo";
import dayjs from "dayjs";
import { MarkdownRemarkEdge, PageInfo, Query } from "../types";

interface NotFoundProps {
    location: Location;
}

const title = "Page Not Found";

const NotFound: React.FC<NotFoundProps> = () => {
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

export const Head: HeadFC<Query, PageInfo & MarkdownRemarkEdge> = ({
    location,
}) => {
    return <SEO title={title} type="page" url={location.pathname} />;
};

export default NotFound;
