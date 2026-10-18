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

const FENCE = /^ {0,3}(`{3,}|~{3,})(.*)$/;
const CLOSING_FENCE = /^ {0,3}(`{3,}|~{3,})[ \t]*$/;
const BODY_FONT_FAMILY =
	'"Synonym", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

// A final line without "\n" keeps any trailing "\r" in its text, so fence matching strips it explicitly.
const stripCarriageReturn = (text: string): string => text.replace(/\r$/, "");

const splitLines = (body: string): Line[] =>
	Array.from(body.matchAll(/(?:[^\n]*\n)|(?:[^\n]+$)/g), ([part]) => {
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
	const marker = CLOSING_FENCE.exec(stripCarriageReturn(text))?.[1] ?? "";
	return marker.startsWith(fence.char) && marker.length >= fence.length;
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

const locatedError = (location: RenderMermaidOptions, bodyLine: number, message: string): Error =>
	new Error(`${location.filePath}:${location.lineOffset + bodyLine}: ${message}`);

const renderDiagram = (source: Line[], location: RenderMermaidOptions, openerLine: number): string => {
	const diagram = source.map(({ text }) => stripCarriageReturn(text)).join("\n");
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

function* segments(lines: Line[], location: RenderMermaidOptions): Generator<string> {
	let i = 0;
	while (i < lines.length) {
		const fence = parseOpeningFence(lines[i].text);
		if (!fence) {
			yield copy([lines[i]]);
			i++;
			continue;
		}
		const isDiagram = fence.info === "mermaid";
		const close = findClosingFence(lines, fence, i + 1);
		if (close === -1 && isDiagram) {
			throw locatedError(location, i + 1, "mermaid fence is not closed");
		}
		if (close === -1) {
			yield copy(lines.slice(i));
			return;
		}
		yield isDiagram
			? renderDiagram(lines.slice(i + 1, close), location, i + 1) + lines[close].end
			: copy(lines.slice(i, close + 1));
		i = close + 1;
	}
}

export const renderMermaid = (body: string, options: RenderMermaidOptions): string =>
	Array.from(segments(splitLines(body), options)).join("");
