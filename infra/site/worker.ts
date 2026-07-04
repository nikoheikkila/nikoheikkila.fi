/**
 * Serves the static site from an R2 bucket.
 *
 * Terraform uploads the Gatsby build output to R2 (see storage.tf) and binds the
 * bucket as SITE. Trailing-slash canonicalisation mirrors Gatsby's
 * `trailingSlash: "always"` setting, and path redirects arrive as JSON through
 * the REDIRECTS plain-text binding.
 *
 * The Worker is compiled to worker.js with `task build` before Terraform runs.
 */

interface Env {
	SITE: R2Bucket;
	REDIRECTS?: string;
}

interface Redirect {
	to: string;
	status: number;
}

type Redirects = Record<string, Redirect>;

const asKey = (pathname: string): string => pathname.slice(1);

const parseRedirects = (raw: string | undefined): Redirects => {
	try {
		return JSON.parse(raw ?? "{}") as Redirects;
	} catch {
		return {};
	}
};

const redirectResponse = (url: URL, location: string, status: number): Response => {
	const target = new URL(location, url.origin);
	target.search = url.search;
	return Response.redirect(target.toString(), status);
};

const headersFor = (object: R2Object): Headers => {
	const headers = new Headers();
	object.writeHttpMetadata(headers);
	headers.set("etag", object.httpEtag);
	return headers;
};

const contentRange = (range: R2Range, size: number): string => {
	if ("suffix" in range) {
		return `bytes ${size - range.suffix}-${size - 1}/${size}`;
	}
	const start = range.offset ?? 0;
	const end = range.length === undefined ? size - 1 : start + range.length - 1;
	return `bytes ${start}-${end}/${size}`;
};

const respondWith = (request: Request, object: R2Object | R2ObjectBody): Response => {
	const headers = headersFor(object);
	const body = "body" in object ? object.body : undefined;
	if (body === undefined) {
		return new Response(null, { status: 304, headers });
	}
	let status = 200;
	// R2 populates object.range even for full reads, so only answer 206 to actual range requests
	if (request.headers.has("range") && object.range) {
		headers.set("content-range", contentRange(object.range, object.size));
		status = 206;
	}
	return new Response(request.method === "HEAD" ? null : body, { status, headers });
};

const serveObject = async (request: Request, env: Env, key: string): Promise<Response | null> => {
	const object = await env.SITE.get(key, {
		onlyIf: request.headers,
		range: request.headers.has("range") ? request.headers : undefined,
	});
	return object === null ? null : respondWith(request, object);
};

const notFound = async (request: Request, env: Env): Promise<Response> => {
	const object = await env.SITE.get("404.html");
	if (object === null) {
		return new Response("Not Found", { status: 404 });
	}
	return new Response(request.method === "HEAD" ? null : object.body, {
		status: 404,
		headers: headersFor(object),
	});
};

export default {
	async fetch(request, env): Promise<Response> {
		if (request.method !== "GET" && request.method !== "HEAD") {
			return new Response("Method Not Allowed", { status: 405, headers: { allow: "GET, HEAD" } });
		}

		const url = new URL(request.url);
		let pathname: string;
		try {
			pathname = decodeURIComponent(url.pathname);
		} catch {
			return new Response("Bad Request", { status: 400 });
		}

		const redirects = parseRedirects(env.REDIRECTS);
		if (Object.hasOwn(redirects, pathname)) {
			const { to, status } = redirects[pathname];
			return redirectResponse(url, to, status);
		}

		if (pathname.endsWith("/")) {
			const page = await serveObject(request, env, `${asKey(pathname)}index.html`);
			return page ?? notFound(request, env);
		}

		const file = await serveObject(request, env, asKey(pathname));
		if (file) {
			return file;
		}

		// Gatsby builds with trailingSlash: "always", so directory requests are canonicalised
		if (await env.SITE.head(`${asKey(pathname)}/index.html`)) {
			return redirectResponse(url, `${pathname}/`, 308);
		}

		return notFound(request, env);
	},
} satisfies ExportedHandler<Env>;
