import React, { FunctionComponent } from "react";
import * as styles from "./container.module.scss";

const Container: FunctionComponent = ({ children }) => (
    <main id="container" className={styles.container}>
        {children}
    </main>
);

export default Container;
