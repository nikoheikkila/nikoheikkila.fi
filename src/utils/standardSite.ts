export interface StandardSiteManifest {
	did: string;
	publication: string;
	documents: Record<string, string>;
}

interface ListedRecord<T> {
	uri: string;
	value: T;
}

interface PublicationRecordValue {
	url: string;
}

interface DocumentRecordValue {
	site: string;
	path: string;
}

interface RGB {
	r: number;
	g: number;
	b: number;
}

interface BasicThemeColor extends RGB {
	$type: "site.standard.theme.color#rgb";
}

interface BuildDocumentRecordParams {
	publicationUri: string;
	path: string;
	title: string;
	description: string;
	date: string;
	textContent: string;
}

interface BuildPublicationRecordParams {
	name: string;
	description: string;
	icon: unknown;
	theme: {
		background: RGB;
		foreground: RGB;
		accent: RGB;
		accentForeground: RGB;
	};
}

// The publication home page — see AGENTS-adjacent plan notes for why this has no trailing slash.
export const PUBLICATION_URL = "https://nikoheikkila.fi";

const canonicalize = (url: string): string => url.replace(/\/+$/, "");
const rkeyFromUri = (uri: string): string => uri.slice(uri.lastIndexOf("/") + 1);

export const recordUri = (did: string, collection: string, rkey: string): string =>
	rkey === "" ? "" : `at://${did}/${collection}/${rkey}`;

export const publicationUriFor = (manifest: StandardSiteManifest): string =>
	recordUri(manifest.did, "site.standard.publication", manifest.publication);

export const documentUriFor = (manifest: StandardSiteManifest, slug: string): string =>
	recordUri(manifest.did, "site.standard.document", manifest.documents[slug] ?? "");

export const manifestFromRecords = (
	did: string,
	publicationRecords: ListedRecord<PublicationRecordValue>[],
	documentRecords: ListedRecord<DocumentRecordValue>[],
): StandardSiteManifest => {
	const target = canonicalize(PUBLICATION_URL);
	const adopted = publicationRecords.find((record) => canonicalize(record.value.url) === target);
	const publication = adopted ? rkeyFromUri(adopted.uri) : "";
	const publicationUri = recordUri(did, "site.standard.publication", publication);

	const documents = publicationUri
		? Object.fromEntries(
				documentRecords
					.filter((record) => record.value.site === publicationUri)
					.map((record) => [record.value.path, rkeyFromUri(record.uri)]),
			)
		: {};

	return { did, publication, documents };
};

export const toSlug = (relativePath: string): string => {
	const withoutExtension = relativePath.replace(/\.md$/, "");
	const withoutIndex = withoutExtension.replace(/\/index$/, "");

	return `/${withoutIndex}/`;
};

export const toPlainText = (markdown: string): string => {
	const withoutFencedCode = markdown.replace(/```[\s\S]*?```/g, "");
	const withoutIndentedCode = withoutFencedCode
		.split("\n")
		.filter((line) => !/^(\t| {4})/.test(line))
		.join("\n");
	const withoutImages = withoutIndentedCode.replace(/!\[[^\]]*]\([^)]*\)/g, "");
	const withoutLinks = withoutImages.replace(/\[([^\]]*)]\([^)]*\)/g, "$1");
	const withoutHeadings = withoutLinks.replace(/^#{1,6}\s+/gm, "");
	const withoutEmphasis = withoutHeadings.replace(/(\*\*\*|\*\*|\*|___|__|_|~~)/g, "");
	const withoutHtml = withoutEmphasis.replace(/<[^>]+>/g, "");

	return withoutHtml.replace(/\s+/g, " ").trim();
};

export const toPublishedAt = (date: string): string => new Date(`${date}T00:00:00.000Z`).toISOString();

const toThemeColor = ({ r, g, b }: RGB): BasicThemeColor => ({
	$type: "site.standard.theme.color#rgb",
	r,
	g,
	b,
});

export const buildDocumentRecord = ({
	publicationUri,
	path,
	title,
	description,
	date,
	textContent,
}: BuildDocumentRecordParams) => ({
	$type: "site.standard.document",
	site: publicationUri,
	path,
	title,
	description,
	publishedAt: toPublishedAt(date),
	textContent,
});

export const buildPublicationRecord = ({ name, description, icon, theme }: BuildPublicationRecordParams) => ({
	$type: "site.standard.publication",
	url: PUBLICATION_URL,
	name,
	description,
	icon,
	basicTheme: {
		$type: "site.standard.theme.basic",
		background: toThemeColor(theme.background),
		foreground: toThemeColor(theme.foreground),
		accent: toThemeColor(theme.accent),
		accentForeground: toThemeColor(theme.accentForeground),
	},
	preferences: {
		showInDiscover: true,
	},
});
