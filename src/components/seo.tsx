import React from "react";
import type { FunctionComponent } from "react";
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
	const metaDescription = String(description || meta?.description).replace("\n", " ");
	const locale = lang === "en" ? "en_GB" : "fi_FI";
	const imageURL = siteURL + image?.original?.src;
	const isPost = type === "post";

	return (
		<>
			<BasicMeta description={description} title={title} />
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
				author={author}
				canonicalUrl={pageURL}
				datePublished={datePublished}
				defaultTitle={title}
				description={metaDescription}
				image={imageURL}
				isBlogPost={isPost}
				organization={siteTitle}
				title={title}
				url={pageURL}
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
			<meta content={description} name="description" />
		</>
	);
};

interface MastodonVerificationProps {
	url: string;
}

const MastodonVerification: React.FC<MastodonVerificationProps> = ({ url }) => {
	const { href, host, pathname } = new URL(url);
	const creator = `${pathname.slice(1)}@${host}`;

	return (
		<>
			<meta content={creator} name="fediverse:creator" />
			<link href={href} rel="me" />
		</>
	);
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
			<meta content={title} name="og:title" />
			<meta content={description} name="og:description" />
			{image && (
				<>
					<meta content={imageURL} name="og:image" />
					<meta content={title} name="og:image:alt" />
					<meta content={imageWidth} name="og:image:width" />
					<meta content={imageHeight} name="og:image:height" />
					<meta content={imageType} name="og:image:type" />
				</>
			)}

			<meta content={pageURL} name="og:url" />

			{isPage && <meta content="website" name="og:type" />}
			{isPost && (
				<>
					<meta content="article" name="og:type" />
					<meta content={date} name="article:published_time" />
					<meta content={author} name="article:author" />
					<meta content="Technology" name="article:section" />
					{categories.map((category) => (
						<meta content={category} key={category} name="article:tag" />
					))}
				</>
			)}

			<meta content={locale} name="og:locale" />
			<meta content={siteTitle} name="og:site_name" />
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

const TwitterCard: React.FC<TwitterCardProps> = ({ author, title, description, siteURL, pageURL, image }) => {
	const imageURL = siteURL + image?.original?.src;

	return (
		<>
			<meta content="summary_large_image" name="twitter:card" />
			<meta content={author} name="twitter:creator" />
			<meta content={title} name="twitter:title" />
			<meta content={description} name="twitter:description" />
			<meta content={author} name="twitter:site" />
			<meta content={siteURL} name="twitter:domain" />
			<meta content={pageURL} name="twitter:url" />
			{image && (
				<>
					<meta content={imageURL} name="twitter:image" />
					<meta content={title} name="twitter:image:alt" />
				</>
			)}
		</>
	);
};

export default SEO;
