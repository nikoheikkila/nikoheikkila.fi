import { test, expect } from "vitest";
import * as Helpers from "../../utils/helpers";

test("should humanize reading time", () => {
    expect(Helpers.formatReadingTime(1)).toMatch(/^(.+) 1 minute read$/);
    expect(Helpers.formatReadingTime(2)).toMatch(/^(.+) 2 minutes read$/);
});
