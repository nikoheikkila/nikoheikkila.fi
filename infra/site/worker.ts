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
import redirectsJson from "./redirects.json";

interface Env {
	SITE: R2Bucket;
}

interface Redirect {
	to: string;
	status: number;
}

const redirects: Record<string, Redirect> = redirectsJson;

class Worker {
	public async fetch(request: Request, env: Env): Promise<Response> {
		if (!this.isMethodAllowed(request)) {
			return this.handleInvalidMethod();
		}

		const path = this.extractPath(request);

		if (path === null) {
			return this.handleBadRequest();
		}

		if (Object.hasOwn(redirects, path)) {
			return this.handleRedirection(request, path);
		}

		if (path.endsWith("/")) {
			return this.handleTrailingSlash(request, env, path);
		}

		const file = await this.serveObject(request, env, this.asKey(path));
		if (file !== null) {
			return file;
		}

		if (await this.isDirectoryRequest(env, path)) {
			return this.redirectTo(request, `${path}/`, 308);
		}

		return this.notFound(request, env);
	}

	private handleBadRequest() {
		return new Response("Bad Request", { status: 400 });
	}

	private handleInvalidMethod() {
		return new Response("Method Not Allowed", { status: 405, headers: { allow: "GET, HEAD" } });
	}

	/**
	 * Gatsby builds with trailingSlash: "always", so directory requests are canonicalised
	 */
	private async isDirectoryRequest(env: Env, pathname: string) {
		return await env.SITE.head(`${this.asKey(pathname)}/index.html`);
	}

	private handleRedirection(request: Request, pathname: string) {
		const { to, status } = redirects[pathname];

		return this.redirectTo(request, to, status);
	}

	private async handleTrailingSlash(request: Request, env: Env, pathname: string) {
		const page = await this.serveObject(request, env, `${this.asKey(pathname)}index.html`);

		if (!page) {
			return this.notFound(request, env);
		}

		return page;
	}

	private isMethodAllowed(request: Request): boolean {
		return request.method === "GET" || request.method === "HEAD";
	}

	private redirectTo(request: Request, location: string, status: number): Response {
		const url = new URL(request.url);
		const target = new URL(location, url.origin);
		target.search = url.search;

		return Response.redirect(target.href, status);
	}

	private async notFound(request: Request, env: Env): Promise<Response> {
		const object = await env.SITE.get("404.html");

		if (object === null) {
			return new Response("Not Found", { status: 404 });
		}

		return new Response(request.method === "HEAD" ? null : object.body, {
			status: 404,
			headers: this.headersFor(object),
		});
	}

	private extractPath(request: Request): string | null {
		try {
			const { pathname } = new URL(request.url);
			return decodeURIComponent(pathname);
		} catch {
			return null;
		}
	}

	private asKey(pathname: string): string {
		return pathname.slice(1);
	}

	private headersFor(object: R2Object): Headers {
		const headers = new Headers();
		object.writeHttpMetadata(headers);
		headers.set("etag", object.httpEtag);

		return headers;
	}

	private contentRange(range: R2Range, size: number): string {
		if ("suffix" in range) {
			return `bytes ${size - range.suffix}-${size - 1}/${size}`;
		}

		const start = range.offset ?? 0;
		const end = range.length === undefined ? size - 1 : start + range.length - 1;

		return `bytes ${start}-${end}/${size}`;
	}

	private respondWith(request: Request, object: R2Object | R2ObjectBody): Response {
		const headers = this.headersFor(object);
		const body = "body" in object ? object.body : undefined;

		if (!body) {
			return new Response(null, { status: 304, headers });
		}

		let status = 200;

		// R2 populates object.range even for full reads, so only answer 206 to actual range requests
		if (request.headers.has("range") && object.range) {
			headers.set("content-range", this.contentRange(object.range, object.size));
			status = 206;
		}

		return new Response(request.method === "HEAD" ? null : body, { status, headers });
	}

	private async serveObject(request: Request, env: Env, key: string): Promise<Response | null> {
		const object = await env.SITE.get(key, {
			onlyIf: request.headers,
			range: request.headers.has("range") ? request.headers : undefined,
		});

		return object === null ? null : this.respondWith(request, object);
	}
}

export default new Worker();
