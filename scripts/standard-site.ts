#!/usr/bin/env bun

/**
 * Publish content as standard.site records on the AT Protocol.
 *
 * Reconciles `content/**\/*.md` against the live PDS and creates or updates
 * one `site.standard.publication` record and one `site.standard.document`
 * record per post. The live PDS records are the only durable source of
 * truth — nothing is written to the repository.
 */
import { AtpAgent } from "@atproto/api";
import {
	buildDocumentRecord,
	buildPublicationRecord,
	manifestFromRecords,
	publicationUriFor,
	toPlainText,
	toSlug,
	type StandardSiteManifest,
} from "../src/utils/standardSite";

const DID = "did:plc:krt7mrzm5yv5wdcsr6cwpyiy";
const PLC_DIRECTORY = "https://plc.directory";
const FAVICON_PATH = "static/favicon.png";
const RECORD_LIMIT = 100;
const SITE_NAME = "Niko Heikkilä";
const SITE_DESCRIPTION = "Making work and life better for modern software engineers.";
const THEME = {
	background: { r: 30, g: 41, b: 59 },
	foreground: { r: 241, g: 245, b: 249 },
	accent: { r: 102, g: 178, b: 178 },
	accentForeground: { r: 15, g: 23, b: 42 },
};

interface PostFrontmatter {
	type?: string;
	title?: string;
	excerpt?: string;
	date?: string;
}

interface ParsedPost {
	relativePath: string;
	slug: string;
	title: string;
	excerpt: string;
	date: string;
	body: string;
}

interface ListedRecord {
	uri: string;
	cid: string;
	value: Record<string, unknown>;
}

const dryRun = process.argv.includes("--dry-run");

const resolvePds = async (did: string): Promise<string> => {
	const response = await fetch(`${PLC_DIRECTORY}/${did}`);

	if (!response.ok) {
		throw new Error(`Failed to resolve DID document for ${did}: ${response.status}`);
	}

	const document = (await response.json()) as { service: Array<{ id: string; serviceEndpoint: string }> };
	const service = document.service.find((entry) => entry.id === "#atproto_pds");

	if (!service) {
		throw new Error(`No #atproto_pds service found in DID document for ${did}`);
	}

	return service.serviceEndpoint;
};

const splitFrontmatter = (contents: string): { frontmatter: string; body: string } => {
	const match = contents.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

	if (!match) {
		return { frontmatter: "", body: contents };
	}

	const [, frontmatter, body] = match;

	return { frontmatter, body };
};

const readPosts = async (): Promise<ParsedPost[]> => {
	const glob = new Bun.Glob("**/*.md");
	const relativePaths = (await Array.fromAsync(glob.scan({ cwd: "content" }))).sort();
	const posts: ParsedPost[] = [];

	for (const relativePath of relativePaths) {
		const contents = await Bun.file(`content/${relativePath}`).text();
		const { frontmatter, body } = splitFrontmatter(contents);
		const parsed = Bun.YAML.parse(frontmatter) as PostFrontmatter;

		if (parsed.type !== "post") {
			continue;
		}

		if (!parsed.title || !parsed.excerpt || !parsed.date) {
			throw new Error(`content/${relativePath}: missing required frontmatter field (title, excerpt, or date)`);
		}

		posts.push({
			relativePath,
			slug: toSlug(relativePath),
			title: parsed.title,
			excerpt: parsed.excerpt,
			date: parsed.date,
			body,
		});
	}

	return posts;
};

const rkeyFromUri = (uri: string): string => uri.slice(uri.lastIndexOf("/") + 1);

const listAllRecords = async (agent: AtpAgent, collection: string): Promise<ListedRecord[]> => {
	const records: ListedRecord[] = [];
	let cursor: string | undefined;

	do {
		const response = await agent.com.atproto.repo.listRecords({
			repo: DID,
			collection,
			limit: RECORD_LIMIT,
			cursor,
		});

		records.push(...response.data.records);
		cursor = response.data.cursor;
	} while (cursor);

	return records;
};

const asPublicationValue = (value: Record<string, unknown>): { url: string } => ({
	url: typeof value.url === "string" ? value.url : "",
});

const asDocumentValue = (value: Record<string, unknown>): { site: string; path: string } => ({
	site: typeof value.site === "string" ? value.site : "",
	path: typeof value.path === "string" ? value.path : "",
});

const deepEqual = (a: unknown, b: unknown): boolean => {
	if (a === b) {
		return true;
	}

	if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) {
		return false;
	}

	const aRecord = a as Record<string, unknown>;
	const bRecord = b as Record<string, unknown>;
	const aKeys = Object.keys(aRecord);
	const bKeys = Object.keys(bRecord);

	return aKeys.length === bKeys.length && aKeys.every((key) => deepEqual(aRecord[key], bRecord[key]));
};

const syncPublication = async (agent: AtpAgent, manifest: StandardSiteManifest): Promise<string> => {
	if (dryRun) {
		console.log(
			manifest.publication ? `[dry-run] update publication ${manifest.publication}` : "[dry-run] create publication",
		);

		return publicationUriFor(manifest) || "at://dry-run/site.standard.publication/dry-run";
	}

	const iconBytes = await Bun.file(FAVICON_PATH).arrayBuffer();
	const uploaded = await agent.com.atproto.repo.uploadBlob(new Uint8Array(iconBytes), { encoding: "image/png" });

	const record = buildPublicationRecord({
		name: SITE_NAME,
		description: SITE_DESCRIPTION,
		icon: uploaded.data.blob,
		theme: THEME,
	});

	if (manifest.publication) {
		const { data } = await agent.com.atproto.repo.putRecord({
			repo: DID,
			collection: "site.standard.publication",
			rkey: manifest.publication,
			record,
		});
		console.log(`update publication ${manifest.publication}`);

		return data.uri;
	}

	const { data } = await agent.com.atproto.repo.createRecord({
		repo: DID,
		collection: "site.standard.publication",
		record,
	});
	console.log(`create publication ${rkeyFromUri(data.uri)}`);

	return data.uri;
};

const syncDocuments = async (
	agent: AtpAgent,
	publicationUri: string,
	manifest: StandardSiteManifest,
	posts: ParsedPost[],
	documentRecords: ListedRecord[],
): Promise<void> => {
	const documentsByRkey = new Map(documentRecords.map((record) => [rkeyFromUri(record.uri), record]));

	for (const post of posts) {
		const record = buildDocumentRecord({
			publicationUri,
			path: post.slug,
			title: post.title,
			description: post.excerpt,
			date: post.date,
			textContent: toPlainText(post.body),
		});

		const existingRkey = manifest.documents[post.slug] ?? "";
		const existing = existingRkey ? documentsByRkey.get(existingRkey) : undefined;

		if (existing && deepEqual(existing.value, record)) {
			console.log(`skip ${post.slug} (unchanged)`);
			continue;
		}

		if (dryRun) {
			console.log(existing ? `[dry-run] update ${post.slug}` : `[dry-run] create ${post.slug}`);
			continue;
		}

		if (existing) {
			await agent.com.atproto.repo.putRecord({
				repo: DID,
				collection: "site.standard.document",
				rkey: existingRkey,
				record,
				swapRecord: existing.cid,
			});
			console.log(`update ${post.slug}`);
		} else {
			await agent.com.atproto.repo.createRecord({
				repo: DID,
				collection: "site.standard.document",
				record,
			});
			console.log(`create ${post.slug}`);
		}
	}

	const slugs = new Set(posts.map((post) => post.slug));

	for (const slug of Object.keys(manifest.documents)) {
		if (!slugs.has(slug)) {
			console.warn(`stale document record for missing post: ${slug}`);
		}
	}
};

const main = async () => {
	const posts = await readPosts();

	const identifier = process.env.BLUESKY_IDENTIFIER;
	const appPassword = process.env.BLUESKY_APP_PASSWORD;

	if (!identifier || !appPassword) {
		throw new Error("BLUESKY_IDENTIFIER and BLUESKY_APP_PASSWORD must be set");
	}

	const pds = await resolvePds(DID);
	const agent = new AtpAgent({ service: pds });

	await agent.login({ identifier, password: appPassword });

	if (agent.session?.did !== DID) {
		throw new Error(`Authenticated as unexpected DID: ${agent.session?.did ?? "unknown"}`);
	}

	const [publicationRecords, documentRecords] = await Promise.all([
		listAllRecords(agent, "site.standard.publication"),
		listAllRecords(agent, "site.standard.document"),
	]);

	const manifest = manifestFromRecords(
		DID,
		publicationRecords.map((record) => ({ uri: record.uri, value: asPublicationValue(record.value) })),
		documentRecords.map((record) => ({ uri: record.uri, value: asDocumentValue(record.value) })),
	);

	const publicationUri = await syncPublication(agent, manifest);

	await syncDocuments(agent, publicationUri, manifest, posts, documentRecords);
};

await main();
