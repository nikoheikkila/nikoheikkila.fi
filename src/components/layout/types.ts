export const LayoutType = {
	LIST: "list",
	SINGLE: "single",
} as const;

export type LayoutType = (typeof LayoutType)[keyof typeof LayoutType];
