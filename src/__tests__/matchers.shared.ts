import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { SocialLink } from "../utils/social";

/**
 * Shared logic for toProvideIconsFor matcher.
 * Checks that all icons in the provided list are registered and are from the "fab" (brands) pack.
 */
export function checkIconsProvided(received: IconDefinition[], links: ReadonlyArray<SocialLink>) {
	const provided = new Set(received.map((icon) => `${icon.prefix}:${icon.iconName}`));
	const missingDetails = links.flatMap((link) => {
		const fabKey = `fab:${link.icon}`;
		if (provided.has(fabKey)) {
			return [];
		}
		// Check if icon exists under any other prefix
		const existsUnderOtherPrefix = received.some((i) => i.iconName === link.icon);
		return [{ icon: link.icon, existsUnderOtherPrefix }];
	});

	const pass = missingDetails.length === 0;

	return {
		pass,
		message: pass
			? () => `Expected missing icons but every one of [${[...provided].join(", ")}] was provided`
			: () => {
					const iconDescriptions = missingDetails
						.map((detail) =>
							detail.existsUnderOtherPrefix
								? `${detail.icon} (registered, but not under the "fab" brands pack)`
								: detail.icon,
						)
						.join(", ");
					return (
						`Missing brand icon(s): ${iconDescriptions}.\n` +
						"Add the matching fa* export to src/components/layout/socialIcons.ts — " +
						`otherwise the footer renders a blank icon.\nCurrently provided: ${[...provided].join(", ")}`
					);
				},
	};
}
