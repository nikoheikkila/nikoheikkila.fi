import { describe, expect, test } from "vitest";
import redirectsJson from "./redirects.json";
import worker from "./worker.ts";

interface Env {
	SITE: R2Bucket;
}

interface FakeObjectInit {
	body?: string;
	size?: number;
	httpEtag?: string;
	contentType?: string;
	range?: R2Range;
}

const streamFrom = (text: string): ReadableStream =>
	new ReadableStream({
		start(controller) {
			controller.enqueue(new TextEncoder().encode(text));
			controller.close();
		},
	});

const notImplemented = (member: string) => () => {
	throw new Error(`fake R2Bucket does not implement ${member}`);
};

function createGet(store: Map<string, FakeObjectInit>): R2Bucket["get"] {
	function get(
		key: string,
		options: R2GetOptions & { onlyIf: R2Conditional | Headers },
	): Promise<R2ObjectBody | R2Object | null>;
	function get(key: string, options?: R2GetOptions): Promise<R2ObjectBody | null>;
	async function get(key: string): Promise<R2ObjectBody | R2Object | null> {
		const init = store.get(key);
		if (init === undefined) {
			return null;
		}

		const object = {
			key,
			version: "1",
			size: init.size ?? init.body?.length ?? 0,
			etag: init.httpEtag ?? `"${key}"`,
			httpEtag: init.httpEtag ?? `"${key}"`,
			checksums: {} as R2Checksums,
			uploaded: new Date(0),
			storageClass: "Standard",
			range: init.range,
			writeHttpMetadata(headers: Headers) {
				if (init.contentType !== undefined) {
					headers.set("content-type", init.contentType);
				}
			},
		};

		if (init.body === undefined) {
			return object as R2Object;
		}

		return { ...object, body: streamFrom(init.body) } as R2ObjectBody;
	}

	return get;
}

const createBucket = (objects: Record<string, FakeObjectInit>): R2Bucket => {
	const store = new Map(Object.entries(objects));

	return {
		get: createGet(store),
		async head(key: string) {
			return store.has(key) ? ({ key } as R2Object) : null;
		},
		put: notImplemented("put"),
		createMultipartUpload: notImplemented("createMultipartUpload"),
		resumeMultipartUpload: notImplemented("resumeMultipartUpload"),
		delete: notImplemented("delete"),
		list: notImplemented("list"),
	};
};

const env = (objects: Record<string, FakeObjectInit>): Env => ({ SITE: createBucket(objects) });

const request = (
	path: string,
	init?: RequestInit<IncomingRequestCfProperties<unknown>>,
): Request<unknown, IncomingRequestCfProperties<unknown>> =>
	new Request<unknown, IncomingRequestCfProperties<unknown>>(`https://example.com${path}`, init);

describe("Worker", () => {
	describe("method handling", () => {
		test.each(["POST", "PUT", "DELETE"])("rejects %s requests with 405", async (method) => {
			const response = await worker.fetch(request("/", { method }), env({}));

			expect(response.status).toBe(405);
			expect(response.headers.get("allow")).toBe("GET, HEAD");
		});
	});

	describe("malformed requests", () => {
		test("returns 400 for invalid percent-encoding in the pathname", async () => {
			const response = await worker.fetch(request("/%"), env({}));

			expect(response.status).toBe(400);
		});
	});

	describe("configured redirects", () => {
		test.each(Object.entries(redirectsJson))("redirects %s", async (from, { to, status }) => {
			const response = await worker.fetch(request(from), env({}));

			expect(response.status).toBe(status);
			expect(response.headers.get("location")).toBe(`https://example.com${to}`);
		});

		test("preserves the query string", async () => {
			const response = await worker.fetch(request("/feed?ref=rss"), env({}));

			expect(response.headers.get("location")).toBe("https://example.com/rss.xml?ref=rss");
		});
	});

	describe("static file serving", () => {
		test("serves an existing file with headers and body", async () => {
			const response = await worker.fetch(
				request("/style.css"),
				env({ "style.css": { body: "body {}", contentType: "text/css" } }),
			);

			expect(response.status).toBe(200);
			expect(response.headers.get("content-type")).toBe("text/css");
			expect(response.headers.get("etag")).toBe('"style.css"');
			await expect(response.text()).resolves.toBe("body {}");
		});

		test("responds to HEAD requests with no body", async () => {
			const response = await worker.fetch(
				request("/style.css", { method: "HEAD" }),
				env({ "style.css": { body: "body {}" } }),
			);

			expect(response.status).toBe(200);
			expect(response.body).toBeNull();
		});
	});

	describe("404 handling", () => {
		test("serves the custom 404 page when the object is missing", async () => {
			const response = await worker.fetch(request("/missing.html"), env({ "404.html": { body: "not found here" } }));

			expect(response.status).toBe(404);
			await expect(response.text()).resolves.toBe("not found here");
		});

		test("responds to HEAD requests for the custom 404 page with no body", async () => {
			const response = await worker.fetch(
				request("/missing.html", { method: "HEAD" }),
				env({ "404.html": { body: "not found here" } }),
			);

			expect(response.status).toBe(404);
			expect(response.body).toBeNull();
		});

		test("falls back to a plain 404 when no custom page exists either", async () => {
			const response = await worker.fetch(request("/nonexistent"), env({}));

			expect(response.status).toBe(404);
			await expect(response.text()).resolves.toBe("Not Found");
		});
	});

	describe("trailing-slash directory index", () => {
		test("serves the directory's index.html", async () => {
			const response = await worker.fetch(request("/blog/"), env({ "blog/index.html": { body: "index" } }));

			expect(response.status).toBe(200);
			await expect(response.text()).resolves.toBe("index");
		});

		test("falls through to 404 when the index is missing", async () => {
			const response = await worker.fetch(request("/missing/"), env({}));

			expect(response.status).toBe(404);
		});
	});

	describe("directory canonicalization", () => {
		test("redirects to the trailing-slash form when a directory index exists", async () => {
			const response = await worker.fetch(request("/blog"), env({ "blog/index.html": { body: "index" } }));

			expect(response.status).toBe(308);
			expect(response.headers.get("location")).toBe("https://example.com/blog/");
		});

		test("preserves the query string when canonicalizing", async () => {
			const response = await worker.fetch(request("/blog?page=2"), env({ "blog/index.html": { body: "index" } }));

			expect(response.headers.get("location")).toBe("https://example.com/blog/?page=2");
		});
	});

	describe("conditional requests", () => {
		test("returns 304 when R2 reports no body", async () => {
			const response = await worker.fetch(request("/style.css"), env({ "style.css": { httpEtag: '"abc"' } }));

			expect(response.status).toBe(304);
			expect(response.body).toBeNull();
			expect(response.headers.get("etag")).toBe('"abc"');
		});
	});

	describe("range requests", () => {
		test.each([
			["offset and length", { offset: 0, length: 100 } as R2Range, "bytes 0-99/500"],
			["offset only", { offset: 100 } as R2Range, "bytes 100-499/500"],
			["length only", { length: 100 } as R2Range, "bytes 0-99/500"],
			["suffix", { suffix: 100 } as R2Range, "bytes 400-499/500"],
		])("returns 206 with Content-Range for a %s range", async (_description, range, expected) => {
			const response = await worker.fetch(
				request("/video.mp4", { headers: { range: "bytes=0-99" } }),
				env({ "video.mp4": { body: "x".repeat(500), size: 500, range } }),
			);

			expect(response.status).toBe(206);
			expect(response.headers.get("content-range")).toBe(expected);
		});

		test("falls back to 200 when the object has no range", async () => {
			const response = await worker.fetch(
				request("/video.mp4", { headers: { range: "bytes=0-99" } }),
				env({ "video.mp4": { body: "full body" } }),
			);

			expect(response.status).toBe(200);
			expect(response.headers.has("content-range")).toBe(false);
		});
	});
});
