import React, { type FunctionComponent, useId } from "react";
import * as styles from "./container.module.scss";

interface WithChildren {
	children: React.ReactNode[];
}

export const ListContainer: FunctionComponent<WithChildren> = ({ children }) => {
	const id = useId();

	return (
		<main className={styles.list} id={id}>
			{children}
		</main>
	);
};

export const SinglePostContainer: FunctionComponent<WithChildren> = ({ children }) => {
	const id = useId();

	return (
		<main className={styles.single} id={id}>
			{children}
		</main>
	);
};
