import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import React from "react";
import BlogHeader from "../../components/blog/header";

describe("blog header component", () => {
	test("renders profile image with correct alt text", async () => {
		const { container } = await render(<BlogHeader />);

		expect(container).matchSnapshot();
	});
});
