import slugify from "@sindresorhus/slugify";
import React, { CSSProperties, useEffect, useState } from "react";

import { foregroundColor, randomColor } from "../utils/colors";

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
    const text = slugify(title, { decamelize: false, separator: "" });

    const [style, setStyle] = useState<CSSProperties>({
        display: "inline-block",
        padding: "0 10px",
        margin: 4,
        borderRadius: 50,
        backgroundColor: "transparent",
        color: "inherit",
    });

    useEffect(() => {
        const backgroundColor = randomColor();
        const color = foregroundColor(backgroundColor);

        setStyle((style) => ({
            ...style,
            backgroundColor,
            color,
        }));
    }, []);

    return (
        <span className={className} style={style}>
            {prefix + text}
        </span>
    );
};

export default Tag;
