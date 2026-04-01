import { vi } from "vitest";
import React from "react";

// Declare types for Gatsby globals
declare global {
	var ___loader: {
		enqueue: () => void;
		hovering: () => void;
	};
}

// Mock Gatsby's loader to prevent prefetch errors in tests
globalThis.___loader = {
	enqueue: () => {},
	hovering: () => {},
};

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
	const message = args[0];
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
	style?: React.CSSProperties;
	objectFit?: React.CSSProperties["objectFit"];
	objectPosition?: React.CSSProperties["objectPosition"];
	imgStyle?: React.CSSProperties;
	loading?: "lazy" | "eager";
}

// Mock StaticImage component from gatsby-plugin-image
vi.mock("gatsby-plugin-image", () => ({
	StaticImage: ({ alt, src, className, style, loading }: StaticImageProps) =>
		React.createElement("img", { alt, src, className, style, loading }),
	GatsbyImage: ({ alt, className, style, objectFit, objectPosition, imgStyle, loading }: GatsbyImageProps) => {
		// GatsbyImage receives styling props that shouldn't be passed to img element
		const mergedStyle = {
			...style,
			...imgStyle,
			objectFit,
			objectPosition,
		};
		return React.createElement("img", {
			alt,
			className,
			style: mergedStyle,
			loading,
		});
	},
}));
