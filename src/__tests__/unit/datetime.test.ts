import { describe, expect, test } from "vitest";
import * as DateTime from "../../utils/datetime";

describe("DateTime", () => {
    describe(".toDisplay()", () => {
        test("given empty input, returns an invalid date", () => {
            expect(DateTime.toDisplay("")).toBe("Invalid Date");
        });

        test("given valid input, returns a human-friendly string", () => {
            const input = new Date(2022, 1, 1);
            expect(DateTime.toDisplay(input)).toBe("February 1, 2022");
        });

        test("given invalid input, returns an invalid date", () => {
            expect(DateTime.toDisplay("ABC")).toBe("Invalid Date");
        });
    });

    describe(".toISOString()", () => {
        test("given empty input, returns an invalid date", () => {
            expect(DateTime.toDisplay("")).toBe("Invalid Date");
        });

        test("given valid input, returns a machine-friendly string", () => {
            const input = new Date(2022, 1, 1);
            expect(DateTime.toISOString(input)).toBe("2022-02-01");
        });

        test("given invalid input, returns an invalid date", () => {
            expect(DateTime.toDisplay("ABC")).toBe("Invalid Date");
        });
    });
});
