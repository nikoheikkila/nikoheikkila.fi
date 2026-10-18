import { render } from "pele";

export interface RenderMermaidOptions {
	filePath: string;
	lineOffset: number;
}

interface Line {
	text: string;
	end: string;
}

interface Fence {
	char: string;
	length: number;
	info: string;
}

const FENCE = /^ {0,3}(`{3,}|~{3,})(.*)$/;
const CLOSING_FENCE = /^ {0,3}(`{3,}|~{3,})[ \t]*$/;

// A final line without "\n" keeps any trailing "\r" in its text, so fence matching strips it explicitly.
const stripCarriageReturn = (text: string): string => text.replace(/\r$/, "");

const splitLines = (body: string): Line[] =>
	Array.from(body.matchAll(/[^\n]*\n|[^\n]+$/g), ([part]) => {
		const end = /\r?\n$/.exec(part)?.[0] ?? "";
		return { text: part.slice(0, part.length - end.length), end };
	});

const parseOpeningFence = (text: string): Fence | undefined => {
	const match = FENCE.exec(text);
	if (!match) return undefined;
	const [, marker, info] = match;
	const char = marker[0];
	if (char === "`" && info.includes("`")) return undefined;
	return { char, length: marker.length, info: info.trim() };
};

const closes = (fence: Fence, text: string): boolean => {
	const match = CLOSING_FENCE.exec(stripCarriageReturn(text));
	return match !== null && match[1][0] === fence.char && match[1].length >= fence.length;
};

const findClosingFence = (lines: Line[], fence: Fence, start: number): number => {
	for (let j = start; j < lines.length; j++) {
		if (closes(fence, lines[j].text)) return j;
	}
	return -1;
};

const copy = (lines: Line[]): string => lines.map(({ text, end }) => text + end).join("");

const requireAttribute = (diagram: string, attribute: "accTitle" | "accDescr", filePath: string): void => {
	if (!diagram.includes(`${attribute}:`)) {
		throw new Error(`${filePath}: mermaid diagram is missing ${attribute}`);
	}
};

const renderDiagram = (source: Line[], filePath: string): string => {
	const diagram = source.map(({ text }) => stripCarriageReturn(text)).join("\n");
	requireAttribute(diagram, "accTitle", filePath);
	requireAttribute(diagram, "accDescr", filePath);
	return render(diagram).svg;
};

export const renderMermaid = (body: string, options: RenderMermaidOptions): string => {
	const lines = splitLines(body);
	let out = "";
	let i = 0;
	while (i < lines.length) {
		const fence = parseOpeningFence(lines[i].text);
		if (!fence) {
			out += copy([lines[i]]);
			i++;
			continue;
		}
		const close = findClosingFence(lines, fence, i + 1);
		if (close === -1) return out + copy(lines.slice(i));
		if (fence.info === "mermaid") {
			out += renderDiagram(lines.slice(i + 1, close), options.filePath) + lines[close].end;
		} else {
			out += copy(lines.slice(i, close + 1));
		}
		i = close + 1;
	}
	return out;
};
