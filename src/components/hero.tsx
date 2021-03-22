import React from "react";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";

interface HeroProps {
  readonly data: IGatsbyImageData;
  readonly alt: string;
}

const Hero: React.FunctionComponent<HeroProps> = ({ data, alt }) => (
  <header className="hero-image">
    <GatsbyImage image={data} alt={alt} loading="eager" />
  </header>
);

export default Hero;
