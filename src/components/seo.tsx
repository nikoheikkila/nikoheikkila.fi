import React from "react";
import type { FunctionComponent } from "react";
import { getSEOData } from "../graphql/seo";
import { combinePaths } from "../utils/helpers";
import SchemaOrg from "./schema";

interface SEOProps {
	title: string;
	type: string;
	url: string;
	datePublished?: string;
	description?: string;
	image?: Queries.ImageSharp;
	lang?: string;
}

const SEO: FunctionComponent<SEOProps> = ({
	title,
	type,
	url,
	image,
	datePublished,
	description = "",
	lang = "en",
}) => {
	const data = getSEOData();
	const meta = data.site?.siteMetadata;
	const siteURL = String(meta?.siteUrl);
	const pageURL = combinePaths(siteURL, url);
	const authorURL = combinePaths(siteURL, "/about/");
	const siteTitle = String(meta?.title);
	const author = String(meta?.author?.name);
	const metaDescription = String(description || meta?.description).replaceAll("\n", " ");
	const locale = lang === "en" ? "en_GB" : "fi_FI";
	const imageSrc = image?.original?.src;
	const imageUrl = imageSrc ? siteURL + imageSrc : (meta?.cover ?? undefined);
	const isPost = type === "post";

	return (
		<>
			<BasicMeta description={metaDescription} title={title} />

			<OpenGraph
				authorURL={authorURL}
				date={datePublished}
				description={metaDescription}
				imageUrl={imageUrl}
				locale={locale}
				pageURL={pageURL}
				siteTitle={siteTitle}
				siteURL={siteURL}
				title={title}
				type={type}
			/>

			<SchemaOrg
				author={author}
				canonicalUrl={pageURL}
				datePublished={datePublished}
				defaultTitle={title}
				description={metaDescription}
				imageUrl={imageUrl}
				isBlogPost={isPost}
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

const BasicMeta: React.FC<BasicMetaProps> = ({ title, description }) => (
	<>
		<title>{title}</title>
		<meta content={description} name="description" />
	</>
);

interface OpenGraphProps {
	siteURL: string;
	siteTitle: string;
	type: string;
	locale: string;
	title: string;
	description: string;
	pageURL: string;
	authorURL: string;
	date?: string;
	imageUrl?: string;
}

const OpenGraph: React.FC<OpenGraphProps> = ({
	siteTitle,
	type,
	locale,
	title,
	description,
	pageURL,
	authorURL,
	date = "",
	imageUrl,
}) => {
	const isPage = type === "page";
	const isPost = type === "post";

	return (
		<>
			<meta content={title} property="og:title" />
			<meta content={description} property="og:description" />
			{imageUrl ? <meta content={imageUrl} property="og:image" /> : null}
			<meta content={pageURL} property="og:url" />
			{isPage && <meta content="website" property="og:type" />}
			{isPost && (
				<>
					<meta content="article" property="og:type" />
					{date ? <meta content={date} property="article:published_time" /> : null}
					<meta content={authorURL} property="article:author" />
					<meta content="Technology" property="article:section" />
				</>
			)}

			<meta content={locale} property="og:locale" />
			<meta content={siteTitle} property="og:site_name" />
		</>
	);
};

export default SEO;
