import { vi } from "vitest";
import React from "react";
import "../matchers";

// Mock Gatsby's loader to prevent prefetch errors in tests
Reflect.set(globalThis, "___loader", {
	enqueue: () => undefined,
	hovering: () => undefined,
});

// Set document-level attributes required by axe-core in component tests
document.documentElement.setAttribute("lang", "en");
if (!document.title) {
	document.title = "Component Test";
}

// Mock gatsby module to avoid browser runtime errors caused by missing build-time data
// (e.g. redirects.json that gatsby generates during build but doesn't exist in test env)
vi.mock("gatsby", () => ({
	Link: ({ to, children, ...props }: { to: string; children: React.ReactNode; [key: string]: unknown }) =>
		React.createElement("a", { href: to, ...props }, children),
	Slice: ({ alias }: { alias: string }) => React.createElement("div", { "data-slice": alias }),
	Script: ({ src, ...props }: { src?: string; [key: string]: unknown }) =>
		React.createElement("script", { src, ...props }),
	ScriptStrategy: {
		postHydrate: "post-hydrate",
		idle: "idle",
		offMainThread: "off-main-thread",
	},
	navigate: vi.fn(),
}));

const originalWarn = console.warn;
console.warn = (...args: unknown[]) => {
	const [message] = args;
	// Suppress specific warnings that are expected in test environment
	if (
		typeof message === "string" &&
		(message.includes("Image not loaded") || message.includes("Alternative text not specified"))
	) {
		return;
	}
	originalWarn(...args);
};

// Type definitions for gatsby-plugin-image mock props
interface StaticImageProps {
	alt: string;
	src?: string;
	className?: string;
	style?: React.CSSProperties;
	loading?: "lazy" | "eager";
}

interface GatsbyImageProps {
	alt: string;
	className?: string;
	loading?: "lazy" | "eager";
}

// Mock StaticImage component from gatsby-plugin-image
vi.mock("gatsby-plugin-image", () => ({
	StaticImage: ({ alt, src, className, style, loading }: StaticImageProps) =>
		React.createElement("img", { alt, src, className, style, loading }),
	GatsbyImage: ({ alt, className, loading }: GatsbyImageProps) =>
		React.createElement("img", { alt, className, loading }),
}));
