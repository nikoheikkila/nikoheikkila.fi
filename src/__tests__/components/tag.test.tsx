import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import React from "react";
import Tag from "../../components/tag";

describe("Tag Component", () => {
	test("renders with default prefix", async () => {
		await render(<Tag title="React" />);

		const tag = page.getByText("#react");
		await expect.element(tag).toBeInTheDocument();
	});

	test("slugifies the title correctly", async () => {
		await render(<Tag title="Test Category" />);

		const tag = page.getByText("#testcategory");
		await expect.element(tag).toBeInTheDocument();
	});

	test("renders with custom prefix", async () => {
		await render(<Tag prefix="@" title="JavaScript" />);

		const tag = page.getByText("@javascript");
		await expect.element(tag).toBeInTheDocument();
	});

	test("applies custom className", async () => {
		const className = "custom-tag";
		await render(<Tag className={className} title="Testing" />);

		const tag = page.getByText("#testing");
		await expect.element(tag).toHaveClass(className);
	});

	test("handles special characters in title", async () => {
		await render(<Tag title="C++ Programming!" />);

		const tag = page.getByText("#cprogramming");
		await expect.element(tag).toBeInTheDocument();
	});
});
