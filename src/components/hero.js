import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

class Hero extends Component {
  render() {
    const { data, alt = 'Cover Image' } = this.props

    const NormalizedImage = props => {
      let normalizedProps = props
      if (props.fluid && props.fluid.presentationWidth && props.fluid.presentationHeight) {
        normalizedProps = {
          ...props,
          style: {
            ...(props.style || {}),
            maxWidth: props.fluid.presentationWidth,
            maxHeight: props.fluid.presentationHeight,
            margin: '0 auto',
          },
        }
      }

      return <Img {...normalizedProps} />
    }

    return <NormalizedImage fluid={data} alt={alt} />
  }
}

Hero.propTypes = {
  data: PropTypes.object.isRequired,
  alt: PropTypes.string.isRequired,
}

export default Hero
