import { Route } from "../gatsby";

export const formatReadingTime = (minutes: number): string => {
    const maxCups = 5;
    const cups = Math.round(minutes / maxCups);
    const time = `minute${minutes >= 2 ? "s" : ""}`;

    if (cups > 5) {
        return `${new Array(Math.round(cups / Math.E))
            .fill("🍱")
            .join("")} ${minutes} ${time} read`;
    }

    return `${new Array(cups || 1)
        .fill("☕️")
        .join("")} ${minutes} ${time} read`;
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
