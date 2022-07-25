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
        fontSize: "0.8em",
        fontWeight: 700,
        backgroundColor,
        color,
        padding: "4px 12px",
        margin: "0 8px 8px 0",
    };

    return (
        <span className={className} style={style}>
            {prefix + innerText}
        </span>
    );
};

export default Tag;
