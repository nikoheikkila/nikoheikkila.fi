import { test, expect } from "vitest";
import * as Colors from "../../utils/colors";

test("should print a random color", () => {
    expect(Colors.colorPalette.includes(Colors.randomColor())).toBeTruthy();
});

test("should throw error on invalid hex value", () => {
    expect(() => Colors.foregroundColor("123")).toThrowError(TypeError);
});

test.each([
    ["#070092"],
    ["#295330"],
    ["#820009"],
    ["#763507"],
    ["#02070a"],
    ["#000600"],
])(
    "when background color is %s, foreground color should be #FFFFFF",
    (backgroundColor: string) => {
        expect(Colors.foregroundColor(backgroundColor)).toBe("#FFFFFF");
    }
);

test.each([["#f5a7ba"], ["#b8bfe0"], ["#a1f98b"], ["#f4ff93"], ["#f7f7f7"]])(
    "when background color is %s, foreground color should be #000000",
    (backgroundColor: string) => {
        expect(Colors.foregroundColor(backgroundColor)).toBe("#000000");
    }
);
