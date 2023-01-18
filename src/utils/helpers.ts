import { Route } from "../gatsby";

const maxCups = 5;

export const formatReadingTime = (minutes: number): string => {
    if (minutes < 1) {
        return "";
    }

    return formatCups(minutes);
};

const formatCups = (minutes: number, icon = "☕️"): string => {
    const cups = Math.round(minutes / maxCups);
    const time = `minute${minutes >= 2 ? "s" : ""}`;

    const result: string[] =
        cups > maxCups
            ? new Array(Math.round(cups / Math.E))
            : new Array(cups || 1);

    return `${result.fill(icon).join("")} ${minutes} ${time} read`;
};

/**
 * Index page is either the home page or any page with path `/n`
 * where `n` is a natural number > 0.
 */
export const isIndex = ({ pathname }: Route) => /^\/[0-9]*$/.test(pathname);

export const getPreviousPage = ({ state }: Route): string => {
    return state?.previous ?? "/";
};

export const combinePaths = (...paths: string[]): string => {
    const pattern = /([^:]\/)\/+/g;
    const substitute = "/";

    return paths.join("").replace(pattern, substitute);
};
