import React from 'react'
import { library, IconName } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faRss } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ExternalLink from './elements'
import { getFooterLinks } from '../graphql/footer'

interface SocialLink {
  name: IconName
  url: string
}

library.add(fab, faRss)

const Footer: React.FunctionComponent = () => {
  const {
    site: {
      siteMetadata: { social, rss },
    },
  } = getFooterLinks()

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

export default Footer
