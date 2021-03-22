import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

interface BioProps {
  readonly alt: string;
}

const Bio: React.FunctionComponent<BioProps> = ({ alt, children }) => (
  <StaticQuery
    query={graphql`
      query {
        placeholderImage: file(relativePath: { eq: "profile.png" }) {
          childImageSharp {
            gatsbyImageData(layout: FIXED, width: 128, height: 128)
          }
        }
      }
    `}
    render={(data) => (
      <>
        <section className="profile">
          <GatsbyImage
            image={data.placeholderImage.childImageSharp.gatsbyImageData}
            alt={alt}
          />
        </section>
        <section className="bio">{children}</section>
      </>
    )}
  />
);

export default Bio;
