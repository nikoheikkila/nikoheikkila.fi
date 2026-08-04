import { describe, expect, test } from "vitest";
import * as StandardSite from "../../utils/standardSite";

const did = "did:plc:krt7mrzm5yv5wdcsr6cwpyiy";
const publicationUri = `at://${did}/site.standard.publication/3lxq2ab4cde`;

describe("StandardSite", () => {
	describe(".recordUri()", () => {
		test.each([
			[did, "site.standard.publication", "3lxq2ab4cde", `at://${did}/site.standard.publication/3lxq2ab4cde`],
			[did, "site.standard.document", "", ""],
		])("given did %s, collection %s, rkey %s, returns %s", (givenDid, collection, rkey, expected) => {
			expect(StandardSite.recordUri(givenDid, collection, rkey)).toBe(expected);
		});
	});

	describe(".publicationUriFor()", () => {
		test("returns the publication AT-URI when a publication rkey is adopted", () => {
			const manifest = { did, publication: "3lxq2ab4cde", documents: {} };

			expect(StandardSite.publicationUriFor(manifest)).toBe(publicationUri);
		});

		test("returns an empty string when no publication rkey is adopted", () => {
			const manifest = { did, publication: "", documents: {} };

			expect(StandardSite.publicationUriFor(manifest)).toBe("");
		});
	});

	describe(".documentUriFor()", () => {
		test("returns the document AT-URI when the slug is known", () => {
			const manifest = { did, publication: "", documents: { "/blog/foo/": "3mab1xyz" } };

			expect(StandardSite.documentUriFor(manifest, "/blog/foo/")).toBe(`at://${did}/site.standard.document/3mab1xyz`);
		});

		test("returns an empty string when the slug is unknown", () => {
			const manifest = { did, publication: "", documents: {} };

			expect(StandardSite.documentUriFor(manifest, "/blog/foo/")).toBe("");
		});
	});

	describe(".manifestFromRecords()", () => {
		test("adopts the publication record whose url canonicalises to the site's home page", () => {
			const publicationRecords = [
				{ uri: `at://${did}/site.standard.publication/3lxq2ab4cde`, value: { url: "https://nikoheikkila.fi/" } },
			];

			const manifest = StandardSite.manifestFromRecords(did, publicationRecords, []);

			expect(manifest).toEqual({ did, publication: "3lxq2ab4cde", documents: {} });
		});

		test("does not adopt a publication record belonging to another site", () => {
			const publicationRecords = [
				{ uri: `at://${did}/site.standard.publication/3lxq2ab4cde`, value: { url: "https://example.com" } },
			];

			const manifest = StandardSite.manifestFromRecords(did, publicationRecords, []);

			expect(manifest).toEqual({ did, publication: "", documents: {} });
		});

		test("adopts document records belonging to the adopted publication, keyed by path", () => {
			const publicationRecords = [
				{ uri: `at://${did}/site.standard.publication/3lxq2ab4cde`, value: { url: "https://nikoheikkila.fi" } },
			];
			const documentRecords = [
				{
					uri: `at://${did}/site.standard.document/3mab1xyz`,
					value: { site: publicationUri, path: "/blog/foo/" },
				},
				{
					uri: `at://${did}/site.standard.document/3mab2xyz`,
					value: { site: "at://did:plc:other/site.standard.publication/other", path: "/blog/bar/" },
				},
			];

			const manifest = StandardSite.manifestFromRecords(did, publicationRecords, documentRecords);

			expect(manifest).toEqual({
				did,
				publication: "3lxq2ab4cde",
				documents: { "/blog/foo/": "3mab1xyz" },
			});
		});

		test("adopts no documents when no publication record is adopted", () => {
			const documentRecords = [
				{ uri: `at://${did}/site.standard.document/3mab1xyz`, value: { site: "", path: "/blog/foo/" } },
			];

			const manifest = StandardSite.manifestFromRecords(did, [], documentRecords);

			expect(manifest).toEqual({ did, publication: "", documents: {} });
		});

		test("given empty inputs, returns an empty manifest", () => {
			expect(StandardSite.manifestFromRecords(did, [], [])).toEqual({ did, publication: "", documents: {} });
		});
	});

	describe(".toSlug()", () => {
		test.each([
			["blog/foo.md", "/blog/foo/"],
			["blog/series/part-one/index.md", "/blog/series/part-one/"],
			["about.md", "/about/"],
		])("given relative path %s, returns %s", (relativePath, expected) => {
			expect(StandardSite.toSlug(relativePath)).toBe(expected);
		});
	});

	describe(".toPlainText()", () => {
		test.each([
			["```ts\nconst x = 1;\n```\nHello world.", "Hello world."],
			["Some text\n    indented code\nmore text", "Some text more text"],
			["Some text\n\tindented code\nmore text", "Some text more text"],
			["![alt text](https://example.com/image.png)\nHello world.", "Hello world."],
			["Check [this link](https://example.com) out.", "Check this link out."],
			["# Heading one\n\nBody text.", "Heading one Body text."],
			["###### Heading six\n\nBody text.", "Heading six Body text."],
			["This is ***very*** important.", "This is very important."],
			["This is **bold** text.", "This is bold text."],
			["This is *italic* text.", "This is italic text."],
			["This is ___very___ important.", "This is very important."],
			["This is __bold__ text.", "This is bold text."],
			["This is _italic_ text.", "This is italic text."],
			["This is ~~struck~~ text.", "This is struck text."],
			["Raw <strong>html</strong> tags.", "Raw html tags."],
			["Line one\n\n\nLine   two", "Line one Line two"],
		])("given markdown %s, returns %s", (markdown, expected) => {
			expect(StandardSite.toPlainText(markdown)).toBe(expected);
		});
	});

	describe(".toPublishedAt()", () => {
		test.each([
			["2026-08-04", "2026-08-04T00:00:00.000Z"],
			["2020-01-01", "2020-01-01T00:00:00.000Z"],
		])("given date %s, returns %s", (date, expected) => {
			expect(StandardSite.toPublishedAt(date)).toBe(expected);
		});
	});

	describe(".buildDocumentRecord()", () => {
		test("builds a document record from the given parameters", () => {
			const record = StandardSite.buildDocumentRecord({
				publicationUri,
				path: "/blog/foo/",
				title: "Foo",
				description: "A post about foo.",
				date: "2026-08-04",
				textContent: "Foo is a post about foo.",
			});

			expect(record).toEqual({
				$type: "site.standard.document",
				site: publicationUri,
				path: "/blog/foo/",
				title: "Foo",
				description: "A post about foo.",
				publishedAt: "2026-08-04T00:00:00.000Z",
				textContent: "Foo is a post about foo.",
			});
		});
	});

	describe(".buildPublicationRecord()", () => {
		test("builds a publication record from the given parameters", () => {
			const icon = { $type: "blob", ref: "bafybeih", mimeType: "image/png", size: 16384 };

			const record = StandardSite.buildPublicationRecord({
				name: "Niko Heikkilä",
				description: "Making work and life better for modern software engineers.",
				icon,
				theme: {
					background: { r: 30, g: 41, b: 59 },
					foreground: { r: 241, g: 245, b: 249 },
					accent: { r: 102, g: 178, b: 178 },
					accentForeground: { r: 15, g: 23, b: 42 },
				},
			});

			expect(record).toEqual({
				$type: "site.standard.publication",
				url: "https://nikoheikkila.fi",
				name: "Niko Heikkilä",
				description: "Making work and life better for modern software engineers.",
				icon,
				basicTheme: {
					$type: "site.standard.theme.basic",
					background: { $type: "site.standard.theme.color#rgb", r: 30, g: 41, b: 59 },
					foreground: { $type: "site.standard.theme.color#rgb", r: 241, g: 245, b: 249 },
					accent: { $type: "site.standard.theme.color#rgb", r: 102, g: 178, b: 178 },
					accentForeground: { $type: "site.standard.theme.color#rgb", r: 15, g: 23, b: 42 },
				},
				preferences: { showInDiscover: true },
			});
		});
	});
});
