import React from 'react'
import PropTypes from 'prop-types'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

const ExternalLink = ({ children, to }) => (
  <OutboundLink href={to} target="_blank" rel="noopener noreferrer">
    {children}
  </OutboundLink>
)

ExternalLink.propTypes = {
  to: PropTypes.string.isRequired,
}

export default ExternalLink
