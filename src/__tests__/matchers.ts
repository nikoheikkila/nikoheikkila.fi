import type { RunOptions } from "axe-core";
import axe from "axe-core";
import { expect } from "vitest";
import type { Locator } from "vitest/browser";

const DEFAULT_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

expect.extend({
	toHaveSiblingIcon(received: Locator, iconName: string, prefix?: string) {
		const hasPrefix = prefix !== undefined;
		const selector = hasPrefix
			? `svg[aria-hidden="true"][data-icon="${iconName}"][data-prefix="${prefix}"]`
			: `svg[aria-hidden="true"][data-icon="${iconName}"]`;
		const pack = hasPrefix ? ` from the "${prefix}" pack` : "";
		const isPassing = Boolean(received.element().parentElement?.querySelector(selector));

		return {
			pass: isPassing,
			message: () =>
				isPassing
					? `Expected the link not to have a sibling icon "${iconName}" but one was found`
					: `Expected the link to have a sibling icon "${iconName}"${pack} but none was found`,
		};
	},
	toHaveMetaProperty(received: Document, property: string, content?: string) {
		const tag = received.head.querySelector(`meta[property="${property}"]`);
		const actual = tag?.getAttribute("content");
		const isPassing = content === undefined ? tag !== null : actual === content;
		const found = tag ? `"${actual}"` : "none";

		return {
			pass: isPassing,
			message: () =>
				isPassing
					? `Expected no meta "${property}" matching ${content ?? "any content"} but found "${actual}"`
					: `Expected meta "${property}" with ${content ?? "any content"} but found ${found}`,
		};
	},
	async toHaveNoA11yViolations(received: HTMLElement, options: RunOptions = {}) {
		const { runOnly, ...restOptions } = options;

		let timeoutId: ReturnType<typeof setTimeout> | undefined;
		try {
			const results = await Promise.race([
				axe.run(received, {
					runOnly: runOnly ?? { type: "tag", values: DEFAULT_TAGS },
					...restOptions,
				}),
				new Promise<never>((_, reject) => {
					timeoutId = setTimeout(() => reject(new Error("axe-core accessibility scan timed out after 10s")), 10_000);
				}),
			]);

			const { violations } = results;
			const isPassing = violations.length === 0;

			return {
				pass: isPassing,
				message: isPassing
					? () => "Expected accessibility violations but found none"
					: () => {
							const details = violations
								.map(
									(v) =>
										`• [${v.impact ?? "unknown"}] ${v.id}: ${v.description}\n  Nodes: ${v.nodes.map((n) => n.target.join(", ")).join(" | ")}\n  Help: ${v.helpUrl}`,
								)
								.join("\n\n");
							return `Found ${violations.length} accessibility violation(s):\n\n${details}`;
						},
			};
		} finally {
			// axe-core has no cancellation API, so we can't fully stop a scan that times out.
			// Clearing the timer at minimum prevents resource leaks after normal resolution.
			if (timeoutId !== undefined) {
				clearTimeout(timeoutId);
			}
		}
	},
});

// Type augmentation is global (applies to all test projects sharing this tsconfig)
// even though the matcher itself is only registered for the component project via
// this setupFile. Calling toHaveNoA11yViolations from a unit test will type-check
// but fail at runtime with "unknown matcher" error.
declare module "vitest" {
	interface Assertion<R extends void | Promise<void> = void, T = unknown> {
		toHaveNoA11yViolations: (options?: RunOptions) => Promise<void>;
		toHaveMetaProperty: (property: string, content?: string) => void;
		toHaveSiblingIcon: (iconName: string, prefix?: string) => void;
	}
}
