import React from "react";
import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, mock } from "bun:test";
import cssModuleMock from "./mocks/css-modules";

// Mock Gatsby components
mock.module("gatsby", () => {
	return {
		Link: (props: { to: string; children: React.ReactNode; [key: string]: unknown }) => {
			const { to, children, ...rest } = props;
			return React.createElement("a", { href: to, ...rest }, children);
		},
		navigate: mock(() => {}),
		StaticQuery: mock(() => null),
		useStaticQuery: mock(() => ({})),
		graphql: mock(() => ({})),
		GatsbyImage: (props: { image: unknown; alt: string; [key: string]: unknown }) => {
			const { alt, ...rest } = props;
			return React.createElement("img", { alt, ...rest });
		},
		StaticImage: (props: { src: string; alt: string; [key: string]: unknown }) => {
			const { src, alt, ...rest } = props;
			return React.createElement("img", { src, alt, ...rest });
		},
	};
});

// Mock FontAwesome components
mock.module("@fortawesome/react-fontawesome", () => {
	return {
		FontAwesomeIcon: (props: { icon: unknown; className?: string }) => {
			const { icon, className } = props;
			const iconText =
				typeof icon === "string"
					? icon
					: Array.isArray(icon)
						? icon[1]
						: (icon as { iconName?: string })?.iconName || "icon";
			return React.createElement("span", { className, "data-testid": "font-awesome-icon" }, iconText);
		},
	};
});

// Register Happy DOM globally for all tests
GlobalRegistrator.register();

// Mock all CSS module imports
mock.module("./content.module.scss", () => cssModuleMock);
mock.module("../post/content.module.scss", () => cssModuleMock);
mock.module("../../components/post/content.module.scss", () => cssModuleMock);

// Cleanup after each test case to avoid DOM accumulation
afterEach(() => {
	cleanup();
	// Clear the document body
	if (typeof document !== "undefined") {
		document.body.innerHTML = "";
	}
});

// Ensure clean state before each test
beforeEach(() => {
	// Clear any lingering DOM elements
	if (typeof document !== "undefined") {
		document.body.innerHTML = "";
	}
});
