import { Slice } from "gatsby";
import React, { type FunctionComponent } from "react";
import * as styles from "./container.module.scss";

interface WithChildren {
	children: React.ReactNode;
}

const Container: FunctionComponent<WithChildren & { className: string }> = ({ className, children }) => (
	<div className={className}>
		{/* biome-ignore lint/correctness/useUniqueElementIds: skip link requires a stable id */}
		<main id="main-content">{children}</main>
		<Slice alias="footer" />
	</div>
);

export const ListContainer: FunctionComponent<WithChildren> = ({ children }) => (
	<Container className={styles.list}>{children}</Container>
);

export const SinglePostContainer: FunctionComponent<WithChildren> = ({ children }) => (
	<Container className={styles.single}>{children}</Container>
);
