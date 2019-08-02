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
            A blog by <ExternalLink url="https://linkedin.com/in/nikoheikkila" text="Niko Heikkilä" />
            {'. '}
            Powered by coffee, <ExternalLink url="https://code.visualstudio.com" text="VS Code" />, and{' '}
            <ExternalLink url="https://gatsbyjs.org" text="Gatsby" />.
          </p>
        </section>
      </aside>
    )}
  />
)

export default Bio
