import { describe, expect, test } from "vitest";
import { renderMermaid } from "../../mermaid";

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

	test("copies an unclosed mermaid fence through unchanged", () => {
		const body = ["Intro", "", `${fence}mermaid`, ...loginDiagram].join("\n");

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
});
