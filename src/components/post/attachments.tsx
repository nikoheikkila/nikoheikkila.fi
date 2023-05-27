import { faEdit, faHistory, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "gatsby";
import React, { FunctionComponent } from "react";
import { BlogLink } from "../../components/elements";
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

				<BlogLink href={urls.edit}>
					<FontAwesomeIcon icon={faEdit} />
					Edit Page
				</BlogLink>

				<BlogLink href={urls.history}>
					<FontAwesomeIcon icon={faHistory} />
					View History
				</BlogLink>
			</p>
		</section>
	);
};

export default PostAttachments;
