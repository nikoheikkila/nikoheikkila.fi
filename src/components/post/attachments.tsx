import { faEdit, faHistory, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "gatsby";
import React, { FunctionComponent } from "react";
import ExternalLink from "../../components/elements";
import { Route } from "../../gatsby";
import * as styles from "./attachments.module.scss";

interface DisqusConfig {
    readonly url: string;
    readonly identifier: string;
    readonly title: string;
}

interface AttachmentProps {
    readonly location: Route;
    readonly urls: {
        edit: string;
        history: string;
    };
    readonly disqusId: string;
    readonly disqusConfiguration: DisqusConfig;
}

const PostAttachments: FunctionComponent<AttachmentProps> = ({
    location,
    urls,
}) => {
    const previousPage = location.state?.previous;

    return (
        <section className={styles.attachments}>
            <p>
                <Link rel="back" to={previousPage ?? "/"}>
                    <FontAwesomeIcon icon={faUndo} /> Back to posts
                </Link>
                <ExternalLink to={urls.edit}>
                    <FontAwesomeIcon icon={faEdit} />
                    Edit Page
                </ExternalLink>
                <ExternalLink to={urls.history}>
                    <FontAwesomeIcon icon={faHistory} />
                    View History
                </ExternalLink>
            </p>
        </section>
    );
};

export default PostAttachments;
