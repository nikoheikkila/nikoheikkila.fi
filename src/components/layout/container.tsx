import React, { type FunctionComponent } from "react";
import * as styles from "./container.module.scss";

interface WithChildren {
	children: React.ReactNode[];
}

export const ListContainer: FunctionComponent<WithChildren> = ({ children }) => {
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: skip link requires a stable id
		<main className={styles.list} id="main-content">
			{children}
		</main>
	);
};

export const SinglePostContainer: FunctionComponent<WithChildren> = ({ children }) => {
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: skip link requires a stable id
		<main className={styles.single} id="main-content">
			{children}
		</main>
	);
};
