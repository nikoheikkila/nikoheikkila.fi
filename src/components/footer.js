import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faRss } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(fab, faRss)
export default function Footer() {

    const { site: { siteMetadata: { social, rss } } } = useStaticQuery(graphql`
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
                <a href={rss} target="_blank" rel="noopener noreferrer">
                    RSS
                </a>
            </div>

            {social.map(({name, url}) => (
                <div key={name}>
                    <FontAwesomeIcon icon={['fab', name]} />
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer me"
                    >{name}
                    </a>
                </div>
                ))}
        </footer>
    );
}
