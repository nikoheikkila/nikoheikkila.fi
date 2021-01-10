import React from "react";

interface Props {
  content: string;
  className: string;
}

const Article = ({ content, className }: Props) => (
  <article
    className={className}
    dangerouslySetInnerHTML={{
      __html: content,
    }}
  />
);

export default Article;
