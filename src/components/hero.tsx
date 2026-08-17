import { GatsbyImage, type IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";

interface HeroProps {
	readonly data: IGatsbyImageData;
}

const Hero: React.FunctionComponent<HeroProps> = ({ data }) => (
	<GatsbyImage
		alt=""
		fetchPriority="high"
		image={data}
		loading="eager"
		objectFit="contain"
		style={{ maxHeight: "80vh" }}
	/>
);

export default Hero;
