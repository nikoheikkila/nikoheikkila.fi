import { describe, expect, test } from "bun:test";
import * as Helpers from "../../utils/helpers";

describe("Helpers", () => {
	describe(".formatReadingTime()", () => {
		test("given zero minutes, returns empty string", () => {
			expect(Helpers.formatReadingTime(0)).toBe("");
		});

		test("given one minute, returns '1 minute read'", () => {
			expect(Helpers.formatReadingTime(1)).toMatch("1 minute read");
		});

		test("given two minutes, returns '2 minutes read'", () => {
			expect(Helpers.formatReadingTime(2)).toMatch("2 minutes read");
		});
	});

	describe(".getPreviousPage()", () => {
		test("given route with previous state, returns previous path", () => {
			const route = {
				pathname: "/",
				state: { previous: "/previous" },
			};
			expect(Helpers.getPreviousPage(route)).toBe("/previous");
		});
	});

	describe(".combinePaths()", () => {
		test("given empty paths, returns empty string", () => {
			expect(Helpers.combinePaths()).toBe("");
		});

		test("given single path, returns unchanged path", () => {
			expect(Helpers.combinePaths("/")).toBe("/");
		});

		test("given multiple paths, combines them correctly", () => {
			expect(Helpers.combinePaths("/blog", "/1", "/article")).toBe("/blog/1/article");
		});

		test("given paths with multiple slashes, normalizes them", () => {
			expect(Helpers.combinePaths("/blog//", "//1//", "//article")).toBe("/blog/1/article");
		});
	});

	describe(".isIndex()", () => {
		test("given root path, returns true", () => {
			const route = { pathname: "/" };
			expect(Helpers.isIndex(route)).toBe(true);
		});

		test("given page number path, returns true", () => {
			const route = { pathname: "/1" };
			expect(Helpers.isIndex(route)).toBe(true);
		});

		test("given non-numeric path, returns false", () => {
			const route = { pathname: "/about" };
			expect(Helpers.isIndex(route)).toBe(false);
		});

		test("given path with subpath, returns false", () => {
			const route = { pathname: "/2/article" };
			expect(Helpers.isIndex(route)).toBe(false);
		});
	});
});
