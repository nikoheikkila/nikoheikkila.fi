import React, { type FunctionComponent, useId } from "react";
import * as styles from "./container.module.scss";

interface WithChildren {
	children: React.ReactNode[];
}

export const ListContainer: FunctionComponent<WithChildren> = ({ children }) => {
	const id = useId();

	return (
		<main id={id} className={styles.list}>
			{children}
		</main>
	);
};

export const SinglePostContainer: FunctionComponent<WithChildren> = ({ children }) => {
	const id = useId();

	return (
		<main id={id} className={styles.single}>
			{children}
		</main>
	);
};
