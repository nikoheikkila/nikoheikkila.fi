import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout/layout";
import SEO from "../components/seo";
import dayjs from "dayjs";

interface NotFoundProps {
    location: Location;
}

const NotFound: React.FC<NotFoundProps> = ({ location }) => {
    const title = "Page Not Found";
    const datePublished = dayjs().format("YYYY-MM-DD");

    return (
        <Layout title={title}>
            <SEO
                title={title}
                type="page"
                url={location.href}
                datePublished={datePublished}
            />
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

export default NotFound;
