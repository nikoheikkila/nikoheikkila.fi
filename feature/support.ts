import type { ViewportSize } from "@playwright/test";

export const viewports = {
	desktop: { width: 1280, height: 800 },
	phone: { width: 375, height: 667 },
} satisfies Record<string, ViewportSize>;

export class Remembered<T> {
	private remembered: { value: T } | undefined;

	public constructor(private readonly description: string) {}

	public remember(value: T): void {
		this.remembered = { value };
	}

	public get value(): T {
		if (this.remembered === undefined) {
			throw new Error(`No ${this.description} has been remembered`);
		}

		return this.remembered.value;
	}
}
