import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { library, IconName } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faRss } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ExternalLink from './elements'

interface SocialLink {
  name: IconName
  url: string
}

library.add(fab, faRss)
export default function Footer() {
  const {
    site: {
      siteMetadata: { social, rss },
    },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          social {
            name
            url
          }
          rss
        }
      }
    }
  `)

  return (
    <footer>
      <div className="feed">
        <FontAwesomeIcon icon={faRss} />
        <ExternalLink to={rss}>RSS</ExternalLink>
      </div>

      {social.map(({ name, url }: SocialLink) => (
        <div key={name}>
          <FontAwesomeIcon icon={['fab', name]} />
          <ExternalLink to={url}>{name}</ExternalLink>
        </div>
      ))}
    </footer>
  )
}
