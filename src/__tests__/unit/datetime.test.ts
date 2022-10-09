import { describe, expect, test } from "vitest";
import * as DateTime from "../../utils/datetime";

describe("DateTime", () => {
    describe(".toDisplay()", () => {
        test("should return a human-friendly string", () => {
            const input = new Date(2022, 1, 1);
            expect(DateTime.toDisplay(input)).toBe("February 1, 2022");
        });
    });

    describe(".toISOString()", () => {
        test("should return a machine-friendly string", () => {
            const input = new Date(2022, 1, 1);
            expect(DateTime.toISOString(input)).toBe("2022-02-01");
        });
    });
});
