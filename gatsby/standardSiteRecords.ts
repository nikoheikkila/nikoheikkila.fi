import type { Reporter } from "gatsby";
import { manifestFromRecords, type StandardSiteManifest } from "../src/utils/standardSite";

const DID = "did:plc:krt7mrzm5yv5wdcsr6cwpyiy";
const PLC_DIRECTORY = "https://plc.directory";
const RECORD_LIMIT = 100;

interface ListedRecord<T> {
	uri: string;
	cid: string;
	value: T;
}

interface DidDocument {
	service: Array<{ id: string; type: string; serviceEndpoint: string }>;
}

interface ListRecordsResponse<T> {
	cursor?: string;
	records: Array<ListedRecord<T>>;
}

const resolvePds = async (did: string): Promise<string> => {
	const response = await fetch(`${PLC_DIRECTORY}/${did}`);

	if (!response.ok) {
		throw new Error(`Failed to resolve DID document for ${did}: ${response.status}`);
	}

	const document = (await response.json()) as DidDocument;
	const service = document.service.find((entry) => entry.id === "#atproto_pds");

	if (!service) {
		throw new Error(`No #atproto_pds service found in DID document for ${did}`);
	}

	return service.serviceEndpoint;
};

const listRecords = async <T>(pds: string, did: string, collection: string): Promise<Array<ListedRecord<T>>> => {
	const records: Array<ListedRecord<T>> = [];
	let cursor: string | undefined;

	do {
		const url = new URL(`${pds}/xrpc/com.atproto.repo.listRecords`);
		url.searchParams.set("repo", did);
		url.searchParams.set("collection", collection);
		url.searchParams.set("limit", String(RECORD_LIMIT));

		if (cursor) {
			url.searchParams.set("cursor", cursor);
		}

		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`Failed to list ${collection} records: ${response.status}`);
		}

		const body = (await response.json()) as ListRecordsResponse<T>;
		records.push(...body.records);
		cursor = body.cursor;
	} while (cursor);

	return records;
};

export const fetchManifest = async (reporter: Reporter): Promise<StandardSiteManifest> => {
	try {
		const pds = await resolvePds(DID);
		const [publicationRecords, documentRecords] = await Promise.all([
			listRecords<{ url: string }>(pds, DID, "site.standard.publication"),
			listRecords<{ site: string; path: string }>(pds, DID, "site.standard.document"),
		]);

		return manifestFromRecords(DID, publicationRecords, documentRecords);
	} catch (error) {
		reporter.warn(`standard.site: failed to reconcile records from the PDS — ${String(error)}`);

		return { did: DID, publication: "", documents: {} };
	}
};
