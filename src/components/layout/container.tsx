import React, { FunctionComponent } from "react";
import * as styles from "./container.module.scss";

interface WithChildren {
    children: React.ReactNode[];
}

export const ListContainer: FunctionComponent<WithChildren> = ({
    children,
}) => (
    <main id="container" className={styles.list}>
        {children}
    </main>
);

export const SinglePostContainer: FunctionComponent<WithChildren> = ({
    children,
}) => (
    <main id="container" className={styles.single}>
        {children}
    </main>
);
