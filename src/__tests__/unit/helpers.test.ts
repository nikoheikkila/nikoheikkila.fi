import { describe, expect, test } from "bun:test";
import * as Helpers from "../../utils/helpers";

describe("Helpers", () => {
	describe(".formatReadingTime()", () => {
		test.each([
			[0, ""],
			[-1, ""],
			[0.5, ""],
		])("given %i minutes, returns empty string", (minutes, expected) => {
			expect(Helpers.formatReadingTime(minutes)).toBe(expected);
		});

		test.each([
			[1, "☕️ 1 minute read"],
			[2, "☕️ 2 minutes read"],
			[3, "☕️ 3 minutes read"],
			[4, "☕️ 4 minutes read"],
			[5, "☕️ 5 minutes read"],
			[6, "☕️ 6 minutes read"],
			[10, "☕️☕️ 10 minutes read"],
			[15, "☕️☕️☕️ 15 minutes read"],
			[20, "☕️☕️☕️☕️ 20 minutes read"],
			[25, "☕️☕️☕️☕️☕️ 25 minutes read"],
			[30, "☕️☕️☕️☕️☕️ 30 minutes read"],
		])("given %i minutes, returns correct format with coffee cups", (minutes, expected) => {
			expect(Helpers.formatReadingTime(minutes)).toBe(expected);
		});
	});

	describe(".getPreviousPage()", () => {
		test.each([
			[{ pathname: "/", state: { previous: "/previous" } }, "/previous"],
			[{ pathname: "/about" }, "/"],
			[{ pathname: "/about", state: {} }, "/"],
			[{ pathname: "/about", state: { other: "value" } }, "/"],
		])("given route %o, returns %s", (route, expected) => {
			expect(Helpers.getPreviousPage(route)).toBe(expected);
		});
	});

	describe(".combinePaths()", () => {
		test.each([
			[[], ""],
			[["/"], "/"],
			[["/blog", "/1", "/article"], "/blog/1/article"],
			[["/blog//", "//1//", "//article"], "/blog/1/article"],
			[["http://example.com/", "/path"], "http://example.com/path"],
			[["https://example.com/", "/api/", "/users"], "https://example.com/api/users"],
		])("given paths %o, returns %s", (paths, expected) => {
			expect(Helpers.combinePaths(...paths)).toBe(expected);
		});
	});

	describe(".isIndex()", () => {
		test.each([
			[{ pathname: "/" }, true],
			[{ pathname: "/1" }, true],
			[{ pathname: "/2" }, true],
			[{ pathname: "/99" }, true],
			[{ pathname: "/123" }, true],
			[{ pathname: "/about" }, false],
			[{ pathname: "/2/article" }, false],
			[{ pathname: "/blog/1" }, false],
			[{ pathname: "" }, false],
		])("given route %o, returns %s", (route, expected) => {
			expect(Helpers.isIndex(route)).toBe(expected);
		});
	});
});
