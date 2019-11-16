import React, { CSSProperties } from 'react'
import Img, { GatsbyImageProps, FluidObject } from 'gatsby-image'

interface FluidImage extends FluidObject {
  presentationHeight: number
  presentationWidth: number
}

interface ImageProps extends GatsbyImageProps {
  fluid: FluidImage
  style?: CSSProperties
}

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
