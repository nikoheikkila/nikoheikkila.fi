import axe, { type RunOptions } from "axe-core";
import { expect } from "vitest";

const DEFAULT_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

expect.extend({
	async toHaveNoA11yViolations(received: HTMLElement, options: RunOptions = {}) {
		const { runOnly, ...restOptions } = options;
		const results = await axe.run(received, {
			runOnly: runOnly ?? { type: "tag", values: DEFAULT_TAGS },
			...restOptions,
		});

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
	},
});

declare module "vitest" {
	// biome-ignore lint/suspicious/noExplicitAny: matches Vitest's own Assertion<T> signature
	interface Assertion<T = any> {
		toHaveNoA11yViolations(options?: RunOptions): Promise<void>;
	}
	interface AsymmetricMatchersContaining {
		toHaveNoA11yViolations(options?: RunOptions): Promise<void>;
	}
}
