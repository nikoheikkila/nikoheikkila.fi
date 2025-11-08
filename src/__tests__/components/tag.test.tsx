import { describe, expect, test } from "bun:test";
import { render, screen } from "@testing-library/react";
import React from "react";
import Tag from "../../components/tag";

describe("Tag Component", () => {
	test("renders with default prefix", () => {
		render(<Tag title="React" />);

		const tag = screen.getByText("#react");

		expect(tag).toBeDefined();
	});

	test("slugifies the title correctly", () => {
		render(<Tag title="Test Category" />);

		const tag = screen.getByText("#testcategory");

		expect(tag).toBeDefined();
	});

	test("renders with custom prefix", () => {
		render(<Tag prefix="@" title="JavaScript" />);

		const tag = screen.getByText("@javascript");

		expect(tag).toBeDefined();
	});

	test("applies custom className", () => {
		const className = "custom-tag";
		render(<Tag className={className} title="Testing" />);

		const tag = screen.getByText("#testing");

		expect(tag.className).toBe(className);
	});

	test("handles special characters in title", () => {
		render(<Tag title="C++ Programming!" />);

		const tag = screen.getByText("#cprogramming");

		expect(tag).toBeDefined();
	});
});
