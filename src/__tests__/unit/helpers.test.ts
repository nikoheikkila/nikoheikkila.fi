import { describe, expect, test } from "vitest";
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

		test("given more than two minutes, returns a matching plural notation", () => {
			const time = Math.floor(Math.random() * 100) + 3;
			expect(Helpers.formatReadingTime(time)).toMatch(/[0-9]+ minutes read/);
		});
	});
});
