import React, { ReactNode } from 'react'
import PropTypes from 'prop-types'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

interface Props {
  children: ReactNode
  to: string
}

const ExternalLink = ({ children, to }: Props) => (
  <OutboundLink href={to} target="_blank" rel="noopener noreferrer">
    {children}
  </OutboundLink>
)

ExternalLink.propTypes = {
  to: PropTypes.string.isRequired,
}

export default ExternalLink
