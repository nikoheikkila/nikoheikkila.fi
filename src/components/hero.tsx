import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

const NormalizedImage = props => {
  const {
    style,
    fluid: { presentationHeight, presentationWidth },
  } = props

  const normalizedProps = {
    ...props,
    style: {
      ...style,
      maxWidth: presentationWidth,
      maxHeight: presentationHeight,
      margin: '0 auto',
    },
  }

  return <Img {...normalizedProps} />
}

NormalizedImage.defaultProps = {
  style: {},
}

NormalizedImage.propTypes = {
  style: PropTypes.shape({
    maxWidth: PropTypes.string,
    maxHeight: PropTypes.string,
    margin: PropTypes.string,
  }),
  fluid: PropTypes.shape({
    presentationHeight: PropTypes.number.isRequired,
    presentationWidth: PropTypes.number.isRequired,
  }),
}

const Hero = ({ data, alt }) => <NormalizedImage fluid={data} alt={alt} />

Hero.defaultProps = {
  alt: 'Cover Image',
}

Hero.propTypes = {
  data: PropTypes.shape({
    cover: PropTypes.instanceOf(Img),
  }),
  alt: PropTypes.string,
}

export default Hero
