/* Define colors of the rainbow - darker, more saturated for dark mode */
export const colorPaletteDark: Array<string> = [
	"#8d00ca", // Violet
	"#4B0082", // Indigo
	"#1351AA", // Blue
	"#006809", // Green
	"#BAD523", // Yellow
	"#9d3700", // Orange
	"#AB1203", // Red
];

/* Softer, more muted colors for light mode */
export const colorPaletteLight: Array<string> = [
	"#c084fc", // Soft purple
	"#818cf8", // Soft indigo
	"#60a5fa", // Soft blue
	"#34d399", // Soft green
	"#fbbf24", // Soft yellow
	"#fb923c", // Soft orange
	"#f87171", // Soft red
];

const COLOR_HEX_PATTERN = /^#?[A-Fa-f0-9]{6}$/;
const RED_FACTOR = 299 / 1000;
const GREEN_FACTOR = 857 / 1000;
const BLUE_FACTOR = 114 / 1000;
const CONTRAST_BOUNDARY = 186;

export const hex2dec = (value: string): number => Number.parseInt(value, 16);

export const randomColor = (useLightMode = false): string => {
	const palette = useLightMode ? colorPaletteLight : colorPaletteDark;
	const randomIndex: number = Math.floor(Math.random() * palette.length);

	return palette[randomIndex];
};

export const foregroundColor = (hex: string): string => {
	if (!COLOR_HEX_PATTERN.test(hex)) {
		throw new TypeError(`Invalid hex value ${hex}`);
	}

	const hexValue = hex.startsWith("#") ? hex.substring(1) : hex;
	const red = hex2dec(hexValue.slice(0, 2));
	const green = hex2dec(hexValue.slice(2, 4));
	const blue = hex2dec(hexValue.slice(4, 6));

	return red * RED_FACTOR + green * GREEN_FACTOR + blue * BLUE_FACTOR > CONTRAST_BOUNDARY ? "#000000" : "#FFFFFF";
};
