import React from 'react'
import PropTypes from 'prop-types'

const ExternalLink = ({ url, text }) => (
  <a href={url} target="_blank" rel="noopener noreferrer">
    {text}
  </a>
)

ExternalLink.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string,
}

ExternalLink.defaultProps = {
  text: '',
}

export default ExternalLink
