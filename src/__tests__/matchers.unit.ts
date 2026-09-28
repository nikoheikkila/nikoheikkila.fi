import { expect } from "vitest";
import { checkIconsProvided } from "./matchers.shared";
import type { SocialLink } from "../utils/social";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

expect.extend({
	toProvideIconsFor(received: IconDefinition[], links: ReadonlyArray<SocialLink>) {
		return checkIconsProvided(received, links);
	},
});

declare module "vitest" {
	interface Assertion<R extends void | Promise<void> = void, T = unknown> {
		toProvideIconsFor(links: ReadonlyArray<SocialLink>): void;
	}
	interface AsymmetricMatchersContaining {
		toProvideIconsFor(links: ReadonlyArray<SocialLink>): void;
	}
}
