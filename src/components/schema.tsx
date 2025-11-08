import { Script, ScriptStrategy } from "gatsby";
import React, { useId } from "react";

interface SchemaProps {
	author?: string;
	canonicalUrl?: string;
	datePublished?: string;
	dateModified?: string;
	defaultTitle?: string;
	description?: string;
	image?: string;
	isBlogPost?: boolean;
	title?: string;
	url?: string;
	organization?: string;
}

const Schema: React.FC<SchemaProps> = ({
	author = "",
	canonicalUrl = "",
	dateModified = "",
	datePublished = "",
	defaultTitle = "",
	description = "",
	image = "",
	isBlogPost = true,
	title = "",
	url = "",
}) => {
	const id = useId();
	const baseSchema = [
		{
			"@context": "http://schema.org",
			"@type": "WebSite",
			url,
			name: title,
			alternateName: defaultTitle,
		},
	];

	const schema = isBlogPost
		? [
				...baseSchema,
				{
					"@context": "http://schema.org",
					"@type": "BreadcrumbList",
					itemListElement: [
						{
							"@type": "ListItem",
							position: 1,
							item: {
								"@id": url,
								image,
								name: title,
							},
						},
					],
				},
				{
					"@context": "http://schema.org",
					"@type": "BlogPosting",
					url,
					name: title,
					alternateName: defaultTitle,
					headline: title,
					image: {
						"@type": "ImageObject",
						url: image,
					},
					description,
					author: {
						"@type": "Person",
						name: author,
					},
					publisher: {
						"@type": "Organization",
						url: canonicalUrl,
						logo: {
							"@type": "ImageObject",
							url: `${canonicalUrl}/favicon.png`,
							width: 512,
							height: 512,
						},
						name: title,
					},
					mainEntityOfPage: {
						"@type": "WebSite",
						"@id": canonicalUrl,
					},
					datePublished,
					dateModified,
				},
			]
		: baseSchema;

	return (
		<Script id={id} strategy={ScriptStrategy.idle} type="application/ld+json">
			{JSON.stringify(schema)}
		</Script>
	);
};

export default React.memo(Schema);
