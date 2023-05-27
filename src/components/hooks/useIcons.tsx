import {
	library,
	IconDefinition,
	IconPack,
} from "@fortawesome/fontawesome-svg-core";

type Icons = Array<IconDefinition | IconPack>;

export const useIcons = (icons: Icons): void => library.add(...icons);
export const purgeIcons = (): void => library.reset();
