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
	const pageURL = url === "/" ? siteURL : url;
	const siteTitle = String(meta?.title);
	const author = String(meta?.author?.name);
	const metaDescription = String(description || meta?.description).replace("\n", " ");
	const locale = lang === "en" ? "en_GB" : "fi_FI";
	const imageUrl = String(image ? siteURL + image?.original?.src : meta?.cover);
	const isPost = type === "post";

	return (
		<>
			<BasicMeta description={metaDescription} title={title} />
			<MastodonVerification url="https://fosstodon.org/@nikoheikkila" />

			<OpenGraph
				author={author}
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
	imageUrl?: string;
}

const OpenGraph: React.FC<OpenGraphProps> = ({
	siteTitle,
	type,
	locale,
	title,
	description,
	pageURL,
	author,
	date = "",
	imageUrl = "",
}) => {
	const isPage = type === "page";
	const isPost = type === "post";

	return (
		<>
			<meta content={title} name="og:title" />
			<meta content={description} name="og:description" />
			<meta content={imageUrl} name="og:image" />
			<meta content={title} name="og:image:alt" />
			<meta content={pageURL} name="og:url" />
			{isPage && <meta content="website" name="og:type" />}
			{isPost && (
				<>
					<meta content="article" name="og:type" />
					<meta content={date} name="article:published_time" />
					<meta content={author} name="article:author" />
					<meta content="Technology" name="article:section" />
				</>
			)}

			<meta content={locale} name="og:locale" />
			<meta content={siteTitle} name="og:site_name" />
		</>
	);
};

export default SEO;
