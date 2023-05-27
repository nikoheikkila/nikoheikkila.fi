import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";

interface HeroProps {
	readonly data: IGatsbyImageData;
	readonly alt: string;
}

const Hero: React.FunctionComponent<HeroProps> = ({ data, alt }) => (
	<header>
		<GatsbyImage
			style={{ maxHeight: "90vh" }}
			image={data}
			alt={alt}
			loading="eager"
			objectFit="contain"
		/>
	</header>
);

export default Hero;
