import React, { FunctionComponent } from "react";
import { getSEOData } from "../graphql/seo";
import SchemaOrg from "./schema";

interface SEOProps {
	title: string;
	type: string;
	url: string;
	datePublished?: string;
	description?: string;
	image?: Queries.ImageSharp;
	lang?: string;
	categories?: string[];
}

const SEO: FunctionComponent<SEOProps> = ({
	title,
	type,
	url,
	image,
	datePublished,
	description = "",
	lang = "en",
	categories = [],
}) => {
	const data = getSEOData();
	const meta = data.site?.siteMetadata;
	const siteURL = String(meta?.siteUrl);
	const pageURL = url === "/" ? siteURL : url;
	const siteTitle = String(meta?.title);
	const author = String(meta?.author?.name);
	const metaDescription = String(description || meta?.description).replace(
		"\n",
		" ",
	);
	const locale = lang === "en" ? "en_GB" : "fi_FI";
	const imageURL = siteURL + image?.original?.src;
	const isPost = type === "post";

	return (
		<>
			<BasicMeta title={title} description={description} />
			<MastodonVerification url="https://fosstodon.org/@nikoheikkila" />

			<OpenGraph
				author={author}
				categories={categories}
				date={datePublished}
				description={metaDescription}
				image={image}
				locale={locale}
				pageURL={pageURL}
				siteTitle={siteTitle}
				siteURL={siteURL}
				title={title}
				type={type}
			/>

			<TwitterCard
				author={author}
				description={metaDescription}
				image={image}
				pageURL={pageURL}
				siteURL={siteURL}
				title={title}
			/>

			<SchemaOrg
				isBlogPost={isPost}
				url={pageURL}
				title={title}
				image={imageURL}
				description={metaDescription}
				datePublished={datePublished}
				defaultTitle={title}
				author={author}
				canonicalUrl={pageURL}
				organization={siteTitle}
			/>
		</>
	);
};

interface BasicMetaProps {
	title: string;
	description: string;
}

const BasicMeta: React.FC<BasicMetaProps> = ({ title, description }) => {
	return (
		<>
			<title>{title}</title>
			<meta name="description" content={description} />
		</>
	);
};

interface MastodonVerificationProps {
	url: string;
}

const MastodonVerification: React.FC<MastodonVerificationProps> = ({ url }) => {
	return <link rel="me" href={url} />;
};

interface OpenGraphProps {
	siteURL: string;
	siteTitle: string;
	type: string;
	locale: string;
	title: string;
	description: string;
	pageURL: string;
	author: string;
	date?: string;
	categories?: string[];
	image?: Queries.ImageSharp;
}

const OpenGraph: React.FC<OpenGraphProps> = ({
	siteURL,
	siteTitle,
	type,
	locale,
	title,
	description,
	pageURL,
	author,
	date = "",
	categories = [],
	image = undefined,
}) => {
	const imageURL = image?.original?.src ? siteURL + image?.original?.src : "";
	const imageWidth = String(image?.original?.width);
	const imageHeight = String(image?.original?.height);
	const imageType = `image/${image?.original?.src?.split(".").pop()}`;

	const isPage = type === "page";
	const isPost = type === "post";

	return (
		<>
			<meta name="og:title" content={title} />
			<meta name="og:description" content={description} />
			{image && (
				<>
					<meta name="og:image" content={imageURL} />
					<meta name="og:image:alt" content={title} />
					<meta name="og:image:width" content={imageWidth} />
					<meta name="og:image:height" content={imageHeight} />
					<meta name="og:image:type" content={imageType} />
				</>
			)}

			<meta name="og:url" content={pageURL} />

			{isPage && <meta name="og:type" content="website" />}
			{isPost && (
				<>
					<meta name="og:type" content="article" />
					<meta name="article:published_time" content={date} />
					<meta name="article:author" content={author} />
					<meta name="article:section" content="Technology" />
					{categories.map((category) => (
						<meta
							key={category}
							name="article:tag"
							content={category}
						/>
					))}
				</>
			)}

			<meta name="og:locale" content={locale} />
			<meta name="og:site_name" content={siteTitle} />
		</>
	);
};

interface TwitterCardProps {
	author: string;
	title: string;
	description: string;
	siteURL: string;
	pageURL: string;
	image?: Queries.ImageSharp;
}

const TwitterCard: React.FC<TwitterCardProps> = ({
	author,
	title,
	description,
	siteURL,
	pageURL,
	image,
}) => {
	const imageURL = siteURL + image?.original?.src;

	return (
		<>
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:creator" content={author} />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:site" content={author} />
			<meta name="twitter:domain" content={siteURL} />
			<meta name="twitter:url" content={pageURL} />
			{image && (
				<>
					<meta name="twitter:image" content={imageURL} />
					<meta name="twitter:image:alt" content={title} />
				</>
			)}
		</>
	);
};

export default SEO;
