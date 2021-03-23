import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "gatsby";
import React, { FunctionComponent } from "react";
import * as styles from "./navigation.module.scss";

interface NavigationLink {
  readonly slug: string;
  readonly title: string;
}

interface NavigationProps {
  readonly previous: NavigationLink;
  readonly next: NavigationLink;
}

const PostNavigation: FunctionComponent<NavigationProps> = ({
  previous,
  next,
}) => (
  <section className={styles.navigation}>
    <ul>
      <li>
        {previous.slug && (
          <Link to={previous.slug} rel="prev">
            <FontAwesomeIcon
              icon={faArrowLeft}
              style={{ paddingRight: "5px" }}
            />
            {previous.title}
          </Link>
        )}
      </li>
      <li>
        {next.slug && (
          <Link to={next.slug} rel="next">
            {next.title}
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
