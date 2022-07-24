import { faEdit, faHistory, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "gatsby-link";
import React, { FunctionComponent } from "react";
import ExternalLink from "../../components/elements";
import { Route } from "../../gatsby";
import * as styles from "./attachments.module.scss";

interface AttachmentProps {
    readonly previous?: string;
    readonly urls: {
        edit: string;
        history: string;
    };
}

const PostAttachments: FunctionComponent<AttachmentProps> = ({
    previous,
    urls,
}) => {
    return (
        <section className={styles.attachments}>
            <p>
                <Link rel="back" to={previous ?? "/"}>
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
