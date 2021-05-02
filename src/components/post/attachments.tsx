import {
  faComment,
  faCommentSlash,
  faEdit,
  faHistory,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DiscussionEmbed } from "disqus-react";
import { Link } from "gatsby";
import React, { FunctionComponent } from "react";
import ExternalLink from "../../components/elements";
import useToggle from "../../components/hooks/useToggle";
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

const ShowComments = () => (
  <span>
    <FontAwesomeIcon icon={faComment} />
    Show Comments
  </span>
);

const HideComments = () => (
  <span>
    <FontAwesomeIcon icon={faCommentSlash} />
    Hide Comments
  </span>
);

const PostAttachments: FunctionComponent<AttachmentProps> = ({
  location,
  urls,
  disqusId,
  disqusConfiguration,
}) => {
  const [comments, toggleComments] = useToggle(false);

  const handleComments = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    toggleComments();
  };

  const previousPage = location.state?.previous;

  return (
    <section className={styles.attachments}>
      <p>
        {previousPage && (
          <Link rel="back" to={previousPage}>
            <FontAwesomeIcon icon={faUndo} /> Back to posts
          </Link>
        )}
        <ExternalLink to={urls.edit}>
          <FontAwesomeIcon icon={faEdit} />
          Edit Page
        </ExternalLink>
        <ExternalLink to={urls.history}>
          <FontAwesomeIcon icon={faHistory} />
          View History
        </ExternalLink>
        <a href="#" onClick={handleComments}>
          {comments ? <HideComments /> : <ShowComments />}
        </a>
      </p>

      {comments && (
        <DiscussionEmbed shortname={disqusId} config={disqusConfiguration} />
      )}
    </section>
  );
};

export default PostAttachments;
