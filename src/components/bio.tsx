import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import ExternalLink from './elements'

const Bio = () => (
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
    render={data => (
      <aside>
        <section className="profile">
          <Img fluid={data.placeholderImage.childImageSharp.fluid} />
        </section>
        <section className="bio">
          <p>
            A blog by <ExternalLink to="https://linkedin.com/in/nikoheikkila">Niko Heikkilä</ExternalLink>
            {'. '}
            Powered by coffee, <ExternalLink to="https://code.visualstudio.com">VS Code</ExternalLink>, and{' '}
            <ExternalLink to="https://gatsbyjs.org">Gatsby</ExternalLink>.
          </p>
        </section>
      </aside>
    )}
  />
)

export default Bio
