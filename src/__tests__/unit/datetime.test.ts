import { afterEach, describe, expect, test, vi } from "vitest";
import * as DateTime from "../../utils/datetime";

const february = new Date(2022, 1, 1);

describe("DateTime", () => {
	afterEach(() => {
		vi.useRealTimers();
	});

	describe(".toDisplay()", () => {
		test.each([
			["an empty string", "", "Invalid Date"],
			["an unparseable string", "ABC", "Invalid Date"],
			["null", null, "Invalid Date"],
			["a Date", february, "February 1, 2022"],
			["a timestamp", february.getTime(), "February 1, 2022"],
			["an ISO date string", "2022-02-01", "February 1, 2022"],
		])("given %s, returns %s", (_description, input, expected) => {
			expect(DateTime.toDisplay(input)).toBe(expected);
		});

		test("given no input, formats the current date", () => {
			vi.useFakeTimers({ now: february });

			expect(DateTime.toDisplay()).toBe("February 1, 2022");
		});
	});

	describe(".toISOString()", () => {
		test.each([
			["an empty string", "", "Invalid Date"],
			["an unparseable string", "ABC", "Invalid Date"],
			["null", null, "Invalid Date"],
			["a Date", february, "2022-02-01"],
			["a timestamp", february.getTime(), "2022-02-01"],
			["an ISO date string", "2022-02-01", "2022-02-01"],
		])("given %s, returns %s", (_description, input, expected) => {
			expect(DateTime.toISOString(input)).toBe(expected);
		});

		test("given no input, formats the current date", () => {
			vi.useFakeTimers({ now: february });

			expect(DateTime.toISOString()).toBe("2022-02-01");
		});
	});
});
