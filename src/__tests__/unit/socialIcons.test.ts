import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { describe, expect, test } from "vitest";
import { socialIcons } from "../../components/layout/socialIcons";
import { socialLinks } from "../../utils/social";

describe("socialIcons", () => {
	test("covers every social link published in site metadata", () => {
		expect(socialIcons).toProvideIconsFor(socialLinks);
	});

	test("guards against an empty link list silently passing", () => {
		expect(socialLinks.length).toBeGreaterThan(0);
	});

	test("reports the icons a link is missing", () => {
		const missingIconLink = [{ name: "Mastodon", icon: "mastodon", url: "https://example.invalid" }];

		expect(() => {
			expect(socialIcons).toProvideIconsFor(missingIconLink);
		}).toThrow(/Missing brand icon\(s\): mastodon\./);
	});

	test("reports icons registered under wrong prefix as effectively missing", () => {
		// Create a valid IconDefinition with the wrong prefix (fas instead of fab)
		const wrongPrefixIcon: IconDefinition = {
			prefix: "fas",
			iconName: "mastodon",
			icon: [512, 512, [], "", "M0 0L512 512"],
		};

		const link = [{ name: "Mastodon", icon: "mastodon", url: "https://example.invalid" }];

		expect(() => {
			expect([wrongPrefixIcon]).toProvideIconsFor(link);
		}).toThrow(/mastodon \(registered, but not under the "fab" brands pack\)/);
	});
});
