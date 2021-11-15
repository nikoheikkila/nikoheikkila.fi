import test from "ava";
import { formatReadingTime } from "../../utils/helpers";

test("should humanize reading time", async (t) => {
    t.regex(formatReadingTime(1), /^(.+) 1 minute read$/);
    t.regex(formatReadingTime(2), /^(.+) 2 minutes read$/);
});
