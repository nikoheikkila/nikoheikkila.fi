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

interface GetCall {
	key: string;
	options?: R2GetOptions;
}

interface Site {
	env: Env;
	gets: GetCall[];
	heads: string[];
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

const checksumsOf = (): R2Checksums => ({
	toJSON: (): R2StringChecksums => ({}),
});

const metadataOf = (key: string, init: FakeObjectInit): R2Object => {
	const etag = init.httpEtag ?? `"${key}"`;

	return {
		key,
		version: "1",
		size: init.size ?? init.body?.length ?? 0,
		etag,
		httpEtag: etag,
		checksums: checksumsOf(),
		uploaded: new Date(0),
		storageClass: "Standard",
		range: init.range,
		httpMetadata: init.contentType === undefined ? undefined : { contentType: init.contentType },
		customMetadata: {},
		writeHttpMetadata(headers: Headers) {
			if (init.contentType !== undefined) {
				headers.set("content-type", init.contentType);
			}
		},
	};
};

const bodyOf = (metadata: R2Object, text: string): R2ObjectBody => {
	const stream = streamFrom(text);

	return {
		...metadata,
		body: stream,
		bodyUsed: stream.locked,
		writeHttpMetadata: (headers: Headers) => metadata.writeHttpMetadata(headers),
		arrayBuffer: () => new Blob([text]).arrayBuffer(),
		bytes: async () => new Uint8Array(await new Blob([text]).arrayBuffer()),
		text: async () => text,
		json: async () => JSON.parse(text),
		blob: async () => new Blob([text]),
	};
};

const createSite = (objects: Record<string, FakeObjectInit> = {}, failure?: Error): Site => {
	const store = new Map(Object.entries(objects));
	const gets: GetCall[] = [];
	const heads: string[] = [];

	function get(
		key: string,
		options: R2GetOptions & { onlyIf: R2Conditional | Headers },
	): Promise<R2ObjectBody | R2Object | null>;
	function get(key: string, options?: R2GetOptions): Promise<R2ObjectBody | null>;
	async function get(key: string, options?: R2GetOptions): Promise<R2ObjectBody | R2Object | null> {
		gets.push({ key, options });

		if (failure !== undefined) {
			throw failure;
		}

		const init = store.get(key);
		if (init === undefined) {
			return null;
		}

		const metadata = metadataOf(key, init);

		return init.body === undefined ? metadata : bodyOf(metadata, init.body);
	}

	const bucket: R2Bucket = {
		get,
		async head(key: string) {
			heads.push(key);

			if (failure !== undefined) {
				throw failure;
			}

			const init = store.get(key);

			return init === undefined ? null : metadataOf(key, init);
		},
		put: notImplemented("put"),
		createMultipartUpload: notImplemented("createMultipartUpload"),
		resumeMultipartUpload: notImplemented("resumeMultipartUpload"),
		delete: notImplemented("delete"),
		list: notImplemented("list"),
	};

	return { env: { SITE: bucket }, gets, heads };
};

const env = (objects: Record<string, FakeObjectInit> = {}): Env => createSite(objects).env;

const request = (
	path: string,
	init?: RequestInit<IncomingRequestCfProperties<unknown>>,
): Request<unknown, IncomingRequestCfProperties<unknown>> =>
	new Request<unknown, IncomingRequestCfProperties<unknown>>(`https://example.com${path}`, init);

const headersOf = (value: R2Conditional | R2Range | Headers | undefined): Headers => {
	if (!(value instanceof Headers)) {
		throw new Error("expected the Worker to forward the request headers");
	}

	return value;
};

describe("Worker", () => {
	describe("method handling", () => {
		test.each(["POST", "PUT", "DELETE", "PATCH", "OPTIONS"])("rejects %s requests with 405", async (method) => {
			const site = createSite();

			const response = await worker.fetch(request("/", { method }), site.env);

			expect(response.status).toBe(405);
			expect(response.headers.get("allow")).toBe("GET, HEAD");
			expect(site.gets).toStrictEqual([]);
			expect(site.heads).toStrictEqual([]);
		});
	});

	describe("malformed requests", () => {
		test("returns 400 for invalid percent-encoding in the pathname", async () => {
			const site = createSite();

			const response = await worker.fetch(request("/%"), site.env);

			expect(response.status).toBe(400);
			expect(site.gets).toStrictEqual([]);
		});
	});

	describe("configured redirects", () => {
		test.each(Object.entries(redirectsJson))("redirects %s", async (from, { to, status }) => {
			const response = await worker.fetch(request(from), env());

			expect(response.status).toBe(status);
			expect(response.headers.get("location")).toBe(`https://example.com${to}`);
		});

		test("preserves the query string", async () => {
			const response = await worker.fetch(request("/feed?ref=rss"), env());

			expect(response.headers.get("location")).toBe("https://example.com/rss.xml?ref=rss");
		});

		test("takes precedence over a stored object with the same path", async () => {
			const site = createSite({ feed: { body: "stored feed" } });

			const response = await worker.fetch(request("/feed"), site.env);

			expect(response.status).toBe(redirectsJson["/feed"].status);
			expect(site.gets).toStrictEqual([]);
		});
	});

	describe("object key resolution", () => {
		test.each([
			["/style.css", "style.css"],
			["/assets/app.js", "assets/app.js"],
			["/blog/caf%C3%A9.html", "blog/café.html"],
			["/", "index.html"],
			["/blog/", "blog/index.html"],
		])("requests %s as the key %s", async (path, key) => {
			const site = createSite({ [key]: { body: "content" } });

			const response = await worker.fetch(request(path), site.env);

			expect(response.status).toBe(200);
			expect(site.gets.map((call) => call.key)).toStrictEqual([key]);
		});
	});

	describe("R2 request options", () => {
		test("forwards the request headers as the conditional and omits the range", async () => {
			const site = createSite({ "style.css": { body: "body {}" } });

			await worker.fetch(request("/style.css", { headers: { "if-none-match": '"abc"' } }), site.env);

			const [call] = site.gets;

			expect(headersOf(call.options?.onlyIf).get("if-none-match")).toBe('"abc"');
			expect(call.options?.range).toBeUndefined();
		});

		test("forwards the request headers as the range when one is requested", async () => {
			const site = createSite({ "video.mp4": { body: "x".repeat(500), size: 500, range: { offset: 0, length: 100 } } });

			await worker.fetch(request("/video.mp4", { headers: { range: "bytes=0-99" } }), site.env);

			const [call] = site.gets;

			expect(headersOf(call.options?.range).get("range")).toBe("bytes=0-99");
			expect(call.options?.range).toBe(call.options?.onlyIf);
		});

		test("probes the directory index with head", async () => {
			const site = createSite({ "blog/index.html": { body: "index" } });

			await worker.fetch(request("/blog"), site.env);

			expect(site.heads).toStrictEqual(["blog/index.html"]);
		});

		test("propagates R2 failures instead of reporting them as missing objects", async () => {
			const site = createSite({}, new Error("R2 is unavailable"));

			await expect(worker.fetch(request("/style.css"), site.env)).rejects.toThrow("R2 is unavailable");
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

		test("serves an empty file with a 200 and an empty body", async () => {
			const response = await worker.fetch(request("/empty.txt"), env({ "empty.txt": { body: "", size: 0 } }));

			expect(response.status).toBe(200);
			await expect(response.text()).resolves.toBe("");
		});

		test("responds to HEAD requests with no body", async () => {
			const response = await worker.fetch(
				request("/style.css", { method: "HEAD" }),
				env({ "style.css": { body: "body {}", contentType: "text/css" } }),
			);

			expect(response.status).toBe(200);
			expect(response.body).toBeNull();
			expect(response.headers.get("content-type")).toBe("text/css");
		});

		test("prefers an existing file over the directory index of the same name", async () => {
			const site = createSite({ blog: { body: "file" }, "blog/index.html": { body: "index" } });

			const response = await worker.fetch(request("/blog"), site.env);

			expect(response.status).toBe(200);
			await expect(response.text()).resolves.toBe("file");
			expect(site.heads).toStrictEqual([]);
		});
	});

	describe("404 handling", () => {
		test("serves the custom 404 page when the object is missing", async () => {
			const response = await worker.fetch(request("/missing.html"), env({ "404.html": { body: "not found here" } }));

			expect(response.status).toBe(404);
			await expect(response.text()).resolves.toBe("not found here");
		});

		test("preserves the metadata of the custom 404 page", async () => {
			const response = await worker.fetch(
				request("/missing.html"),
				env({ "404.html": { body: "not found here", contentType: "text/html", httpEtag: '"404"' } }),
			);

			expect(response.headers.get("content-type")).toBe("text/html");
			expect(response.headers.get("etag")).toBe('"404"');
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
			const response = await worker.fetch(request("/nonexistent"), env());

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
			const site = createSite();

			const response = await worker.fetch(request("/missing/"), site.env);

			expect(response.status).toBe(404);
			expect(site.gets.map((call) => call.key)).toStrictEqual(["missing/index.html", "404.html"]);
		});
	});

	describe("directory canonicalization", () => {
		test("redirects to the trailing-slash form when a directory index exists", async () => {
			const response = await worker.fetch(request("/blog"), env({ "blog/index.html": { body: "index" } }));

			expect(response.status).toBe(308);
			expect(response.headers.get("location")).toBe("https://example.com/blog/");
		});

		test("canonicalizes HEAD requests as well", async () => {
			const response = await worker.fetch(
				request("/blog", { method: "HEAD" }),
				env({ "blog/index.html": { body: "index" } }),
			);

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
			const response = await worker.fetch(
				request("/style.css", { headers: { "if-none-match": '"abc"' } }),
				env({ "style.css": { httpEtag: '"abc"', contentType: "text/css" } }),
			);

			expect(response.status).toBe(304);
			expect(response.body).toBeNull();
			expect(response.headers.get("etag")).toBe('"abc"');
			expect(response.headers.get("content-type")).toBe("text/css");
		});
	});

	describe("range requests", () => {
		const ranges: [string, string, R2Range, string][] = [
			["bounded", "bytes=0-99", { offset: 0, length: 100 }, "bytes 0-99/500"],
			["open-ended", "bytes=100-", { offset: 100 }, "bytes 100-499/500"],
			["prefix", "bytes=0-99", { length: 100 }, "bytes 0-99/500"],
			["suffix", "bytes=-100", { suffix: 100 }, "bytes 400-499/500"],
		];

		test.each(ranges)(
			"returns 206 with Content-Range for a %s range",
			async (_description, header, range, expected) => {
				const response = await worker.fetch(
					request("/video.mp4", { headers: { range: header } }),
					env({ "video.mp4": { body: "x".repeat(500), size: 500, range } }),
				);

				expect(response.status).toBe(206);
				expect(response.headers.get("content-range")).toBe(expected);
			},
		);

		test("falls back to 200 when the object has no range", async () => {
			const response = await worker.fetch(
				request("/video.mp4", { headers: { range: "bytes=0-99" } }),
				env({ "video.mp4": { body: "full body" } }),
			);

			expect(response.status).toBe(200);
			expect(response.headers.has("content-range")).toBe(false);
		});

		test("returns 200 for a full read even though R2 reports a range", async () => {
			const response = await worker.fetch(
				request("/video.mp4"),
				env({ "video.mp4": { body: "x".repeat(500), size: 500, range: { offset: 0, length: 500 } } }),
			);

			expect(response.status).toBe(200);
			expect(response.headers.has("content-range")).toBe(false);
		});
	});
});
