import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { describe, expect, test } from "vitest";
import { socialIcons } from "../../components/layout/socialIcons";
import { type SocialLink, socialLinks } from "../../utils/social";

expect.extend({
	toProvideIconsFor(received: IconDefinition[], links: ReadonlyArray<SocialLink>) {
		const provided = new Set<string>(received.map((icon) => icon.iconName));
		const missing = links.map((link) => link.icon).filter((icon) => !provided.has(icon));
		const pass = missing.length === 0;

		return {
			pass,
			message: pass
				? () => `Expected missing icons but every one of [${[...provided].join(", ")}] was provided`
				: () =>
						`Missing brand icon(s): ${missing.join(", ")}.\n` +
						"Add the matching fa* export to src/components/layout/socialIcons.ts — " +
						`otherwise the footer renders a blank icon.\nCurrently provided: ${[...provided].join(", ")}`,
		};
	},
});

declare module "vitest" {
	// biome-ignore lint/suspicious/noExplicitAny: matches Vitest's own Assertion<T> signature
	interface Assertion<T = any> {
		toProvideIconsFor(links: ReadonlyArray<SocialLink>): void;
	}
	interface AsymmetricMatchersContaining {
		toProvideIconsFor(links: ReadonlyArray<SocialLink>): void;
	}
}

describe("socialIcons", () => {
	test("covers every social link published in site metadata", () => {
		expect(socialIcons).toProvideIconsFor(socialLinks);
	});

	test("guards against an empty link list silently passing", () => {
		expect(socialLinks.length).toBeGreaterThan(0);
	});

	test("reports the icons a link is missing", () => {
		expect(socialIcons).not.toProvideIconsFor([{ name: "Mastodon", icon: "mastodon", url: "https://example.invalid" }]);
	});
});
