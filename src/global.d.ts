declare module "*.css";
declare module "*.scss";
declare module "*.png";

declare module "react-use-flexsearch" {
	export function useFlexSearch<T = Record<string, unknown>>(
		query: string,
		index: string,
		store: Record<string, T>,
		searchOptions?: Record<string, unknown>,
	): T[];
}
