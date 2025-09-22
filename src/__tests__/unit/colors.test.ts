import { describe, expect, test } from "bun:test";
import * as Colors from "../../utils/colors";

describe("Colors", () => {
	const validHexPattern = /^#[A-Fa-f0-9]{6}$/;

	describe(".hex2dec()", () => {
		test("converts hex to decimal", () => {
			expect(Colors.hex2dec("FF")).toBe(255);
			expect(Colors.hex2dec("00")).toBe(0);
			expect(Colors.hex2dec("7F")).toBe(127);
		});
	});

	describe(".randomColor()", () => {
		test("returns a valid random color", () => {
			expect(Colors.randomColor()).toMatch(validHexPattern);
		});
	});

	describe(".foregroundColor()", () => {
		test.each([["#070092"], ["#295330"], ["#820009"], ["#763507"], ["#02070a"], ["#000600"]])(
			"given background color %s, foreground color is white",
			(backgroundColor: string) => {
				expect(Colors.foregroundColor(backgroundColor)).toBe("#FFFFFF");
			},
		);

		test.each([["#f5a7ba"], ["#b8bfe0"], ["#a1f98b"], ["#f4ff93"], ["#f7f7f7"]])(
			"given background color %s, foreground color is black",
			(backgroundColor: string) => {
				expect(Colors.foregroundColor(backgroundColor)).toBe("#000000");
			},
		);

		test("handles hex without # prefix", () => {
			expect(Colors.foregroundColor("000000")).toBe("#FFFFFF");
			expect(Colors.foregroundColor("FFFFFF")).toBe("#000000");
		});

		test("given invalid background color, throws error", () => {
			expect(() => Colors.foregroundColor("123")).toThrowError(TypeError);
		});
	});
});
