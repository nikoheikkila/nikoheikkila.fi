import React from 'react'
import PropTypes from 'prop-types'

import ExternalLink from './elements'

const languages = {
  de: 'German',
  dk: 'Danish',
  fi: 'Finnish',
  fr: 'French',
  no: 'Norwegian',
  sv: 'Swedish',
  ru: 'Russian',
}

const Translation = ({ lang, url }) => {
  const language = languages[lang] || 'language other than English'

  return (
    <section className="language-info">
      <p>
        This post was written in {language}. You can access the machine translated version{' '}
        <ExternalLink url={url} text="here" />.
      </p>
    </section>
  )
}

Translation.propTypes = {
  lang: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

export default Translation
