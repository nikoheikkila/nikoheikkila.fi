import type { RunOptions } from "axe-core";
import axe from "axe-core";
import { expect } from "vitest";

const DEFAULT_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

expect.extend({
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
					timeoutId = setTimeout(() => reject(new Error("axe-core accessibility scan timed out after 10s")), 10000);
				}),
			]);

			const { violations } = results;
			const pass = violations.length === 0;

			return {
				pass,
				message: pass
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
			if (timeoutId !== undefined) clearTimeout(timeoutId);
		}
	},
});

// Type augmentation is global (applies to all test projects sharing this tsconfig)
// even though the matcher itself is only registered for the component project via
// this setupFile. Calling toHaveNoA11yViolations from a unit test will type-check
// but fail at runtime with "unknown matcher" error.
declare module "vitest" {
	interface Assertion<R extends void | Promise<void> = void, T = unknown> {
		toHaveNoA11yViolations(options?: RunOptions): Promise<void>;
	}
}
