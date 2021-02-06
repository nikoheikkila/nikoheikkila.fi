import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

const Bio: React.FunctionComponent = ({ children }) => (
  <StaticQuery
    query={graphql`
      query {
        placeholderImage: file(relativePath: { eq: "profile.png" }) {
          childImageSharp {
            fluid(quality: 100, maxWidth: 128, maxHeight: 128) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={(data) => (
      <>
        <section className="profile">
          <Img fluid={data.placeholderImage.childImageSharp.fluid} />
        </section>
        <section className="bio">{children}</section>
      </>
    )}
  />
);

export default Bio;
