interface Route {
	pathname: string;
	state?: {
		previous: string;
	};
}

/**
 * Pretty prints reading time with coffee cups
 * @param minutes number of minutes to format
 */
export const formatReadingTime = (minutes: number): string => {
	if (minutes < 1) {
		return "";
	}

	return formatCups(minutes);
};

/**
 * Index page is either the home page or any page with path `/n`
 * where `n` is a natural number > 0.
 */
export const isIndex = ({ pathname }: Route): boolean => /^\/\d*$/.test(pathname);
export const getPreviousPage = ({ state }: Route): string => state?.previous ?? "/";
export const combinePaths = (...paths: string[]): string => paths.join("").replace(/([^:]\/)\/+/g, "$1");

const formatCups = (minutes: number, icon = "☕️"): string => {
	const maxCups = 5;
	const estimatedCups = Math.round(minutes / maxCups) || 1;
	const time = `minute${minutes >= 2 ? "s" : ""}`;
	const result = estimatedCups > maxCups ? new Array<string>(maxCups) : new Array<string>(estimatedCups);

	return `${result.fill(icon).join("")} ${minutes} ${time} read`;
};
