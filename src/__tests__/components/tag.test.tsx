import { describe, expect, test } from "bun:test";
import React from "react";
import { render } from "../test-utils";
import Tag from "../../components/tag";

describe("Tag Component", () => {
	test("renders with default prefix", () => {
		const { container } = render(<Tag title="React" />);

		const tag = container.querySelector("span");
		expect(tag?.textContent).toBe("#react");
	});

	test("slugifies the title correctly", () => {
		const { container } = render(<Tag title="Test Category" />);

		const tag = container.querySelector("span");
		expect(tag?.textContent).toBe("#testcategory");
	});

	test("renders with custom prefix", () => {
		const { container } = render(<Tag title="JavaScript" prefix="@" />);

		const tag = container.querySelector("span");
		expect(tag?.textContent).toBe("@javascript");
	});

	test("applies custom className", () => {
		const { container } = render(<Tag title="Testing" className="custom-tag" />);

		const tag = container.querySelector(".custom-tag");
		expect(tag).toBeDefined();
		expect(tag?.textContent).toBe("#testing");
	});

	test("handles special characters in title", () => {
		const { container } = render(<Tag title="C++ Programming!" />);

		// The slugify library converts "C++" to "c" not "cpp"
		const tag = container.querySelector("span");
		expect(tag?.textContent).toBe("#cprogramming");
	});

	test("applies inline styles for colors", () => {
		const { container } = render(<Tag title="Styled" />);

		const tag = container.querySelector("span");
		const styles = tag?.getAttribute("style");

		expect(styles).toContain("display: inline-block");
		expect(styles).toContain("padding: 0px 10px");
		expect(styles).toContain("margin: 4px");
		expect(styles).toContain("border-radius: 50px");
	});
});
