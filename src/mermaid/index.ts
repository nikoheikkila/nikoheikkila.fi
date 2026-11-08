import { PeleError, render } from "pele";

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

const FENCE = /^ {0,3}(?<marker>`{3,}|~{3,})(?<info>.*)/u;
const CLOSING_FENCE = /^ {0,3}(?<marker>`{3,}|~{3,})[ \t]*$/u;
const BODY_FONT_FAMILY =
	'"Synonym", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

// A final line without "\n" can still end in "\r", which belongs to its ending rather than its text.
const splitLines = (body: string): Line[] =>
	body.split(/(?<=\n)/u).map((part) => {
		const text = part.replace(/\r?\n?$/u, "");
		return { text, end: part.slice(text.length) };
	});

const parseOpeningFence = (text: string): Fence | undefined => {
	const groups = FENCE.exec(text)?.groups;
	if (groups === undefined) {
		return undefined;
	}
	const { marker, info } = groups;
	const [char] = marker;
	if (char === "`" && info.includes("`")) {
		return undefined;
	}
	return { char, length: marker.length, info: info.trim() };
};

const closes = (fence: Fence, text: string): boolean => {
	const groups = CLOSING_FENCE.exec(text)?.groups;
	if (groups === undefined) {
		return false;
	}
	const { marker } = groups;
	const [char] = marker;
	return char === fence.char && marker.length >= fence.length;
};

const findClosingFence = (lines: Line[], fence: Fence, start: number): number => {
	for (let j = start; j < lines.length; j += 1) {
		if (closes(fence, lines[j].text)) {
			return j;
		}
	}
	return -1;
};

const copy = (lines: Line[]): string => lines.map(({ text, end }) => text + end).join("");

const requireAttribute = (diagram: string, attribute: "accTitle" | "accDescr", filePath: string): void => {
	if (!diagram.includes(`${attribute}:`)) {
		throw new Error(`${filePath}: mermaid diagram is missing ${attribute}`);
	}
};

const locatedError = (location: RenderMermaidOptions, bodyLine: number, message: string): Error =>
	new Error(`${location.filePath}:${location.lineOffset + bodyLine}: ${message}`);

const renderDiagram = (source: Line[], location: RenderMermaidOptions, openerLine: number): string => {
	const diagram = source.map(({ text }) => text).join("\n");
	if (diagram.trim() === "") {
		throw locatedError(location, openerLine, "mermaid diagram is empty");
	}
	requireAttribute(diagram, "accTitle", location.filePath);
	requireAttribute(diagram, "accDescr", location.filePath);
	const renderOptions = { idPrefix: `mermaid-${location.lineOffset + openerLine}`, fontFamily: BODY_FONT_FAMILY };
	try {
		return render(diagram, renderOptions).svg.replace('role="graphics-document document"', 'role="img"');
	} catch (error) {
		if (error instanceof PeleError) {
			throw locatedError(location, openerLine + error.line, error.message);
		}
		throw error;
	}
};

const segments = (lines: Line[], location: RenderMermaidOptions): string[] => {
	const output: string[] = [];
	let i = 0;
	while (i < lines.length) {
		const fence = parseOpeningFence(lines[i].text);
		if (fence === undefined) {
			output.push(copy([lines[i]]));
			i += 1;
		} else {
			const isDiagram = fence.info === "mermaid";
			const close = findClosingFence(lines, fence, i + 1);
			if (close === -1 && isDiagram) {
				throw locatedError(location, i + 1, "mermaid fence is not closed");
			}
			if (close === -1) {
				output.push(copy(lines.slice(i)));
				return output;
			}
			output.push(
				isDiagram
					? renderDiagram(lines.slice(i + 1, close), location, i + 1) + lines[close].end
					: copy(lines.slice(i, close + 1)),
			);
			i = close + 1;
		}
	}
	return output;
};

export const renderMermaid = (body: string, options: RenderMermaidOptions): string =>
	segments(splitLines(body), options).join("");
