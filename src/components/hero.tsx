import React from 'react'
import Img from 'gatsby-image'
import { ImageProps, FluidImage } from '../types'

const NormalizedImage = (props: ImageProps) => {
  const {
    style = {},
    fluid: { presentationHeight, presentationWidth },
  } = props

  const normalizedProps = {
    ...props,
    style: {
      ...style,
      margin: '0 auto',
      maxHeight: presentationHeight,
      maxWidth: presentationWidth,
    },
  }

  return <Img {...normalizedProps} />
}

interface HeroProps {
  data: FluidImage
  alt: string
}

const Hero = ({ data, alt }: HeroProps) => <NormalizedImage fluid={data} alt={alt} />

export default Hero
