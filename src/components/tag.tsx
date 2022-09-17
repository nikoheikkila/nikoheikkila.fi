import React, { CSSProperties } from "react";
import slugify from "@sindresorhus/slugify";

import { randomColor, foregroundColor } from "../utils/colors";

interface Props {
    title: string;
    className?: string;
    prefix?: string;
}

const Tag: React.FunctionComponent<Props> = ({
    title,
    className,
    prefix = "#",
}) => {
    const innerText = slugify(title, { decamelize: false, separator: " " });
    const backgroundColor = randomColor();
    const color = foregroundColor(backgroundColor);

    const style: CSSProperties = {
        display: "inline-block",
        fontSize: "0.6em",
        fontWeight: 400,
        backgroundColor,
        color,
        padding: "0px 4px",
        margin: "0 6px 0 0",
    };

    return (
        <span className={className} style={style}>
            {prefix + innerText}
        </span>
    );
};

export default Tag;
