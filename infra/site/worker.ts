/**
 * Serves the static site from an R2 bucket.
 *
 * Terraform uploads the Gatsby build output to R2 (see storage.tf) and binds the
 * bucket as SITE. Trailing-slash canonicalisation mirrors Gatsby's
 * `trailingSlash: "always"` setting, and path redirects (formerly
 * static/_redirects) are bundled in from redirects.json.
 *
 * The Worker is compiled to worker.js with `task build` before Terraform runs.
 */
import redirectsJson from "./redirects.json" with { type: "json" };

interface Env {
	SITE: R2Bucket;
}

interface Redirect {
	to: string;
	status: number;
}

const redirects: Record<string, Redirect> = redirectsJson;

const handleRequest = async (request: Request, env: Env): Promise<Response> => {
	if (!isMethodAllowed(request)) {
		return handleInvalidMethod();
	}

	const path = extractPath(request);

	if (path === null) {
		return handleBadRequest();
	}

	if (Object.hasOwn(redirects, path)) {
		return handleRedirection(request, path);
	}

	if (path.endsWith("/")) {
		return handleTrailingSlash(request, env, path);
	}

	const file = await serveObject(request, env, asKey(path));
	if (file !== null) {
		return file;
	}

	if (await isDirectoryRequest(env, path)) {
		return redirectTo(request, `${path}/`, 308);
	}

	return notFound(request, env);
};

const handleBadRequest = () => new Response("Bad Request", { status: 400 });

const handleInvalidMethod = () => new Response("Method Not Allowed", { status: 405, headers: { allow: "GET, HEAD" } });

/**
 * Gatsby builds with trailingSlash: "always", so directory requests are canonicalised
 */
const isDirectoryRequest = async (env: Env, pathname: string) => await env.SITE.head(`${asKey(pathname)}/index.html`);

const handleRedirection = (request: Request, pathname: string) => {
	const { to, status } = redirects[pathname];

	return redirectTo(request, to, status);
};

const handleTrailingSlash = async (request: Request, env: Env, pathname: string) => {
	const page = await serveObject(request, env, `${asKey(pathname)}index.html`);

	if (!page) {
		return notFound(request, env);
	}

	return page;
};

const isMethodAllowed = (request: Request): boolean => request.method === "GET" || request.method === "HEAD";

const redirectTo = (request: Request, location: string, status: number): Response => {
	const url = new URL(request.url);
	const target = new URL(location, url.origin);
	target.search = url.search;

	return Response.redirect(target.href, status);
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

const extractPath = (request: Request): string | null => {
	try {
		const { pathname } = new URL(request.url);
		return decodeURIComponent(pathname);
	} catch {
		return null;
	}
};

const asKey = (pathname: string): string => pathname.slice(1);

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

	if (!body) {
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

export default { fetch: handleRequest };
