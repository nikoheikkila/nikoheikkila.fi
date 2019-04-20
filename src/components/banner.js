import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

const Banner = () => (
  <StaticQuery
    query={graphql`
      query {
        placeholderImage: file(relativePath: { eq: "banner.jpg" }) {
          childImageSharp {
            fluid(maxHeight: 250, quality: 100) {
              ...GatsbyImageSharpFluid
              presentationHeight
            }
          }
        }
      }
    `}
    render={data => <Img fluid={data.placeholderImage.childImageSharp.fluid} />}
  />
)

export default Banner
