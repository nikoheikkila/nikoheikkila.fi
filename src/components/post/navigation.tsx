import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "gatsby";
import React, { FunctionComponent } from "react";
import { MarkdownRemark } from "../../types";
import * as styles from "./navigation.module.scss";

interface NavigationProps {
  readonly previous: MarkdownRemark;
  readonly next: MarkdownRemark;
}

const PostNavigation: FunctionComponent<NavigationProps> = ({
  previous,
  next,
}) => (
  <section className={styles.navigation}>
    <ul>
      <li>
        {previous && (
          <Link to={previous.fields.slug} rel="prev">
            <FontAwesomeIcon
              icon={faArrowLeft}
              style={{ paddingRight: "5px" }}
            />
            {previous.frontmatter.title}
          </Link>
        )}
      </li>
      <li>
        {next && (
          <Link to={next.fields.slug} rel="next">
            {next.frontmatter.title}
            <FontAwesomeIcon
              icon={faArrowRight}
              style={{ paddingLeft: "5px" }}
            />
          </Link>
        )}
      </li>
    </ul>
  </section>
);

export default PostNavigation;
