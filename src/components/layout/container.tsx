import React, { FunctionComponent } from "react";
import * as styles from "./container.module.scss";

export const ListContainer: FunctionComponent = ({ children }) => (
    <main id="container" className={styles.list}>
        {children}
    </main>
);

export const SinglePostContainer: FunctionComponent = ({ children }) => (
    <main id="container" className={styles.single}>
        {children}
    </main>
);
