import { describe, expect, test, vi } from "vitest";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faRss } from "@fortawesome/free-solid-svg-icons";
import { purgeIcons, useIcons } from "../../components/hooks/useIcons";

describe("useIcons Hook", () => {
	test("adds icons to library", () => {
		const librarySpy = vi.spyOn(library, "add");
		const icons = [faRss];

		useIcons(icons);

		expect(librarySpy).toHaveBeenCalledWith(...icons);
	});

	test("purgeIcons resets the library", () => {
		const libraryResetSpy = vi.spyOn(library, "reset");

		purgeIcons();

		expect(libraryResetSpy).toHaveBeenCalled();
	});
});
