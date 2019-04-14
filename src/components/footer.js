import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

export default function Footer() {

    const { site: { siteMetadata: {social, rss} } } = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    social {
                        twitter
                        github
                    }
                    rss
                }
            }
        }
    `)

    return (
        <footer>
            <div className="feed">
                <a href={rss} target="_blank" rel="noopener noreferrer">
                    RSS
                </a>
            </div>

            <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                Twitter
            </a>{' '}

            &bull;{' '}

            <a href={social.github} target="_blank" rel="noopener noreferrer">
                GitHub
            </a>
        </footer>
    );
}
