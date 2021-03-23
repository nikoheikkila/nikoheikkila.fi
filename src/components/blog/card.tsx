import Article from "../../components/post/content";
import Tag from "../../components/tag";
import { Link } from "gatsby";
import React, { FunctionComponent } from "react";
import { formatReadingTime } from "../../utils/helpers";
import * as styles from "./card.module.scss";

interface CardProps {
  readonly title: string;
  readonly slug: string;
  readonly excerpt: string;
  readonly categories: string[];
  readonly date: string;
  readonly timeToRead: number;
  readonly location: Location;
}

const ArticleCard: FunctionComponent<CardProps> = ({
  title,
  slug,
  excerpt,
  categories,
  date,
  timeToRead,
  location,
}) => (
  <section className={styles.content}>
    <h2 data-testid="post-title">
      <Link to={slug} state={{ previous: location.pathname }}>
        {title}
      </Link>
    </h2>
    <p>
      {categories.map((category) => (
        <Tag key={category} title={category} />
      ))}
    </p>
    <p>
      <span>{date} </span>
      <span>{formatReadingTime(timeToRead)}</span>
    </p>
    <Article content={excerpt} />
  </section>
);

export default ArticleCard;
