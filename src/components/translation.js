import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

class Translation extends Component {
  constructor(props) {
    super(props)

    this.languages = {
      de: 'German',
      dk: 'Danish',
      fi: 'Finnish',
      fr: 'French',
      no: 'Norwegian',
      sv: 'Swedish',
      ru: 'Russian'
    }

    this.getLanguage = this.getLanguage.bind(this)
  }

  getLanguage(key) {
    return this.languages[key] || 'language other than English'
  }

  render() {
    const { lang, url } = this.props

    return (
      <section className="language-info">
        <p>
          This post was written in {this.getLanguage(lang)}. You can access the machine translated version{' '}
          <OutboundLink href={url} target="_blank" rel="noopener noreferrer">
            here
          </OutboundLink>
          .
        </p>
      </section>
    )
  }
}

Translation.propTypes = {
  lang: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default Translation
