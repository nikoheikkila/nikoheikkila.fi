import { GatsbyImage, type IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";

interface HeroProps {
	readonly data: IGatsbyImageData;
	readonly alt: string;
}

const Hero: React.FunctionComponent<HeroProps> = ({ data, alt }) => (
	<header>
		<GatsbyImage alt={alt} image={data} loading="eager" objectFit="contain" style={{ maxHeight: "90vh" }} />
	</header>
);

export default Hero;
