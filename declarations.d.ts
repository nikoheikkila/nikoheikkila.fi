declare module "*.scss" {
	const content: { [className: string]: string };
	export = content;
}

declare module "*.png" {
	const _: string;
	export default _;
}
