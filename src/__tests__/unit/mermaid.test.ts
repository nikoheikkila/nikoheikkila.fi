import { afterEach, describe, expect, test, vi } from "vitest";
import { renderMermaid } from "../../mermaid";

expect.extend({
	toHaveNamedImageRootSvg(received: string) {
		const rootTag = received.match(/<svg\b[^>]*>/)?.[0] ?? "";
		const problems = [
			rootTag.includes('role="img"') ? "" : 'root <svg> lacks role="img"',
			rootTag.includes("graphics-document") ? "root <svg> still has role graphics-document" : "",
			rootTag.includes("aria-labelledby=") ? "" : "root <svg> lacks aria-labelledby",
			rootTag.includes("aria-describedby=") ? "" : "root <svg> lacks aria-describedby",
		].filter((problem) => problem !== "");

		return {
			pass: problems.length === 0,
			message: () =>
				problems.length === 0
					? `expected root <svg> not to be a named image, got: ${rootTag}`
					: `${problems.join("; ")}; root tag: ${rootTag}`,
		};
	},
});

declare module "vitest" {
	interface Assertion<R extends void | Promise<void> = void, T = unknown> {
		toHaveNamedImageRootSvg(): void;
	}
	interface AsymmetricMatchersContaining {
		toHaveNamedImageRootSvg(): void;
	}
}

const fence = "```";

const post = (...diagram: string[]) =>
	["# A post", "", `${fence}mermaid`, ...diagram, fence, "", "Some closing text."].join("\n");

const loginDiagram = [
	"flowchart TD",
	"  accTitle: Login flow",
	"  accDescr: How a reader signs in",
	"  A[Start] --> B[End]",
];

describe("renderMermaid", () => {
	test("renders a flowchart block as an inline SVG titled by its accTitle", () => {
		const body = post(
			"flowchart TD",
			"  accTitle: Login flow",
			"  accDescr: How a reader signs in",
			"  A[Start] --> B[End]",
		);

		const output = renderMermaid(body, { filePath: "content/blog/x.md", lineOffset: 0 });

		expect(output).toMatch(/<svg[^>]*class="pele/);
		expect(output).toMatch(/<title[^>]*>Login flow<\/title>/);
		expect(output).not.toContain(`${fence}mermaid`);
	});

	test.each([
		["flowchart", loginDiagram, "Login flow", "How a reader signs in"],
		[
			"sequenceDiagram",
			[
				"sequenceDiagram",
				"  accTitle: Login sequence",
				"  accDescr: The messages exchanged when a reader signs in",
				"  Reader->>Site: Sign in",
				"  Site-->>Reader: Welcome back",
			],
			"Login sequence",
			"The messages exchanged when a reader signs in",
		],
	])(
		"renders a %s block as a root svg with role img, named by its accTitle and described by its accDescr",
		(_type, diagram, accTitle, accDescr) => {
			const body = post(...diagram);

			const output = renderMermaid(body, { filePath: "content/blog/x.md", lineOffset: 0 });

			expect(output).toHaveNamedImageRootSvg();
			expect(output).toMatch(new RegExp(`<title[^>]*>${accTitle}</title>`));
			expect(output).toMatch(new RegExp(`<desc[^>]*>${accDescr}</desc>`));
		},
	);

	test("fails the build naming the post file and accTitle when a diagram has no accTitle", () => {
		const body = post("flowchart TD", "  accDescr: How a reader signs in", "  A[Start] --> B[End]");

		const render = () => renderMermaid(body, { filePath: "content/blog/x.md", lineOffset: 0 });

		expect(render).toThrow(/content\/blog\/x\.md.*accTitle|accTitle.*content\/blog\/x\.md/s);
	});

	test("fails the build naming the post file and accDescr when a diagram has no accDescr", () => {
		const body = post("flowchart TD", "  accTitle: Login flow", "  A[Start] --> B[End]");

		const render = () => renderMermaid(body, { filePath: "content/blog/x.md", lineOffset: 0 });

		expect(render).toThrow(/content\/blog\/x\.md.*accDescr|accDescr.*content\/blog\/x\.md/s);
	});

	test("leaves a mermaid fence that sits inside a longer code block as code", () => {
		const body = ["````markdown", `${fence}mermaid`, ...loginDiagram, fence, "````"].join("\n");

		const output = renderMermaid(body, { filePath: "content/blog/x.md", lineOffset: 0 });

		expect(output).toBe(body);
	});

	test("converts a mermaid block in a CRLF post and keeps the surrounding lines unchanged", () => {
		const body = ["Intro", "", `${fence}mermaid`, ...loginDiagram, fence, "", "Outro", ""].join("\r\n");

		const output = renderMermaid(body, { filePath: "content/blog/x.md", lineOffset: 0 });

		expect(output).toContain("<svg");
		expect(output).not.toContain(`${fence}mermaid`);
		expect(output.startsWith("Intro\r\n")).toBe(true);
	});

	test("converts a mermaid block fenced with tildes", () => {
		const body = ["~~~mermaid", ...loginDiagram, "~~~"].join("\n");

		const output = renderMermaid(body, { filePath: "content/blog/x.md", lineOffset: 0 });

		expect(output).toContain("<svg");
	});

	test("converts a mermaid block whose fence is indented by up to three spaces", () => {
		const body = [`   ${fence}mermaid`, ...loginDiagram, `   ${fence}`].join("\n");

		const output = renderMermaid(body, { filePath: "content/blog/x.md", lineOffset: 0 });

		expect(output).toContain("<svg");
	});

	test("converts a mermaid block whose fence lines have trailing whitespace", () => {
		const body = [`${fence}mermaid   `, ...loginDiagram, `${fence}  `].join("\n");

		const output = renderMermaid(body, { filePath: "content/blog/x.md", lineOffset: 0 });

		expect(output).toContain("<svg");
	});

	test("converts a mermaid block fenced with four backticks", () => {
		const body = [`${fence}\`mermaid`, ...loginDiagram, `${fence}\``].join("\n");

		const output = renderMermaid(body, { filePath: "content/blog/x.md", lineOffset: 0 });

		expect(output).toContain("<svg");
	});

	test("fails the build naming the post file and line when a mermaid fence is never closed", () => {
		const body = ["Intro", "", `${fence}mermaid`, ...loginDiagram].join("\n");

		const render = () => renderMermaid(body, { filePath: "content/blog/x.md", lineOffset: 10 });

		// An Error instance, unlike a regex, also fails when a non-Error value such as `undefined` is thrown.
		expect(render).toThrow(new Error("content/blog/x.md:13: mermaid fence is not closed"));
	});

	test.each([
		["indented by four spaces", `    ${fence}`],
		["followed by an info string", `${fence} text`],
		["made of tildes for a backtick fence", "~~~"],
	])("does not close a mermaid fence with a fence-like line %s", (_description, closer) => {
		const body = [`${fence}mermaid`, ...loginDiagram, closer].join("\n");

		const render = () => renderMermaid(body, { filePath: "content/blog/x.md", lineOffset: 0 });

		expect(render).toThrow(/mermaid fence is not closed$/);
	});

	test("leaves a mermaid fence indented by four spaces as code", () => {
		const body = [`    ${fence}mermaid`, ...loginDiagram, `    ${fence}`].join("\n");

		const output = renderMermaid(body, { filePath: "content/blog/x.md", lineOffset: 0 });

		expect(output).toBe(body);
	});

	test("leaves a mermaid fence inside a longer code block as code even after a shorter fence line", () => {
		const body = ["````markdown", fence, `${fence}mermaid`, ...loginDiagram, fence, "````"].join("\n");

		const output = renderMermaid(body, { filePath: "content/blog/x.md", lineOffset: 0 });

		expect(output).toBe(body);
	});

	test("leaves a mermaid fence inside a tilde code block whose info string has a backtick as code", () => {
		const body = ["~~~markdown `inline`", `${fence}mermaid`, ...loginDiagram, fence, "~~~"].join("\n");

		const output = renderMermaid(body, { filePath: "content/blog/x.md", lineOffset: 0 });

		expect(output).toBe(body);
	});

	test("converts a mermaid block that follows a backtick line whose info string has a backtick", () => {
		const body = [`${fence}markdown \`inline\``, `${fence}mermaid`, ...loginDiagram, fence].join("\n");

		const output = renderMermaid(body, { filePath: "content/blog/x.md", lineOffset: 0 });

		expect(output).toContain("<svg");
	});

	test("converts a mermaid block whose closing fence ends the post with a bare carriage return", () => {
		const body = [`${fence}mermaid`, ...loginDiagram, `${fence}\r`].join("\n");

		const output = renderMermaid(body, { filePath: "content/blog/x.md", lineOffset: 0 });

		expect(output).toMatch(/<\/svg>\r$/);
	});

	test("fails the build as empty when a mermaid block has only whitespace", () => {
		const body = [`${fence}mermaid`, "   ", fence].join("\n");

		const render = () => renderMermaid(body, { filePath: "content/blog/x.md", lineOffset: 10 });

		expect(render).toThrow(/^content\/blog\/x\.md:11: mermaid diagram is empty$/);
	});

	test("prefixes every diagram id with the file line of its opening fence", () => {
		const body = post(...loginDiagram);

		const output = renderMermaid(body, { filePath: "content/blog/x.md", lineOffset: 10 });

		const ids = Array.from(output.matchAll(/\sid="([^"]+)"/g), (match) => match[1]);
		expect(ids.length).toBeGreaterThan(0);
		expect(ids.filter((id) => !id.startsWith("mermaid-13"))).toStrictEqual([]);
	});

	test("copies an unclosed code fence that is not mermaid through unchanged", () => {
		const body = ["Intro", "", `${fence}typescript`, "const a = 1;"].join("\n");

		const output = renderMermaid(body, { filePath: "content/blog/x.md", lineOffset: 0 });

		expect(output).toBe(body);
	});

	test("does not treat a line with a backtick in its info string as a fence", () => {
		const body = [`${fence}mermaid\``, ...loginDiagram, fence].join("\n");

		const output = renderMermaid(body, { filePath: "content/blog/x.md", lineOffset: 0 });

		expect(output).toBe(body);
	});

	test("returns an empty body unchanged", () => {
		const output = renderMermaid("", { filePath: "content/blog/x.md", lineOffset: 0 });

		expect(output).toBe("");
	});

	test("names the post file and file line when Pele rejects a diagram", () => {
		const body = post("flowchart TD", "  accTitle: Login flow", "  accDescr: How a reader signs in", "  A -->");

		const render = () => renderMermaid(body, { filePath: "content/blog/x.md", lineOffset: 10 });

		expect(render).toThrow(/^content\/blog\/x\.md:18:/);
	});

	test("fails the build naming the post file, line and emptiness when a mermaid block has no source", () => {
		const body = ["Intro", "", `${fence}mermaid`, fence].join("\n");

		const render = () => renderMermaid(body, { filePath: "content/blog/x.md", lineOffset: 10 });

		expect(render).toThrow(/^content\/blog\/x\.md:13: mermaid diagram is empty$/);
	});

	describe("when Pele throws a non-PeleError", () => {
		afterEach(() => {
			vi.doUnmock("pele");
			vi.resetModules();
		});

		test("rethrows an error from Pele that is not a PeleError unchanged", async () => {
			vi.doMock("pele", () => ({
				render: () => {
					throw new Error("boom");
				},
				PeleError: class extends Error {},
			}));

			vi.resetModules();
			const mocked = await import("../../mermaid/index.js");
			const body = post(...loginDiagram);

			const render = () => mocked.renderMermaid(body, { filePath: "content/blog/x.md", lineOffset: 0 });

			expect(render).toThrow(/^boom$/);
		});
	});

	test("gives every id across two diagrams in one post a unique value", () => {
		const body = [
			"# A post",
			"",
			`${fence}mermaid`,
			"flowchart TD",
			"  accTitle: Login flow",
			"  accDescr: How a reader signs in",
			"  A[Start] --> B[End]",
			fence,
			"",
			`${fence}mermaid`,
			"flowchart TD",
			"  accTitle: Logout flow",
			"  accDescr: How a reader signs out",
			"  C[Begin] --> D[Finish]",
			fence,
		].join("\n");

		const output = renderMermaid(body, { filePath: "content/blog/x.md", lineOffset: 0 });

		const ids = Array.from(output.matchAll(/\sid="([^"]+)"/g), (match) => match[1]);
		expect(ids.length).toBeGreaterThan(0);
		expect(new Set(ids).size).toBe(ids.length);
	});

	test("labels use the site body font family", () => {
		const bodyFontFamily = [
			"&quot;Synonym&quot;",
			"-apple-system",
			"BlinkMacSystemFont",
			"&quot;Segoe UI&quot;",
			"Roboto",
			"Helvetica",
			"Arial",
			"sans-serif",
			"&quot;Apple Color Emoji&quot;",
			"&quot;Segoe UI Emoji&quot;",
			"&quot;Segoe UI Symbol&quot;",
		].join(", ");
		const body = post(...loginDiagram);

		const output = renderMermaid(body, { filePath: "content/blog/x.md", lineOffset: 0 });

		expect(output).toContain(bodyFontFamily);
	});

	test("leaves a typescript code block unchanged", () => {
		const body = ["# A post", "", `${fence}typescript`, "const a: number = 1;", fence, ""].join("\n");

		const output = renderMermaid(body, { filePath: "content/blog/x.md", lineOffset: 0 });

		expect(output).toBe(body);
	});

	test("leaves a body without code blocks unchanged", () => {
		const body = "# A post\n\nJust some prose.\n";

		const output = renderMermaid(body, { filePath: "content/blog/x.md", lineOffset: 0 });

		expect(output).toBe(body);
	});

	test("leaves a block tagged Mermaid, with a capital M, unchanged", () => {
		const body = [`${fence}Mermaid`, ...loginDiagram, fence].join("\n");

		const output = renderMermaid(body, { filePath: "content/blog/x.md", lineOffset: 0 });

		expect(output).toBe(body);
	});
});
