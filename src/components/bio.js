import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import ExternalLink from './elements'

const Bio = () => (
  <StaticQuery
    query={graphql`
      query {
        placeholderImage: file(relativePath: { eq: "profile.jpg" }) {
          childImageSharp {
            fixed(width: 56, height: 56) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={data => (
      <aside>
        <section className="bio">
          <Img fixed={data.placeholderImage.childImageSharp.fixed} />
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
