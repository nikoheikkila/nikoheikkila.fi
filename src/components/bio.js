import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

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
    render={
      data => (
        <section className="bio">
          <Img fixed={data.placeholderImage.childImageSharp.fixed} />
          <p>
            A blog by{' '}
            <a href="https://twitter.com/nikoheikkila" target="_blank" rel="noopener noreferrer me">Niko Heikkilä</a>{'. '}
            Powered by coffee, {' '}
            <a href="https://code.visualstudio.com" target="_blank" rel="noopener noreferrer me">VS Code</a>, {' '}
            and {' '}
            <a href="https://gatsbyjs.org" target="_blank" rel="noopener noreferrer me">Gatsby</a>.
          </p>
        </section>
      )
    }
  />
)

export default Bio
