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
    const innerText = slugify(title, { decamelize: false, separator: " " });

    const [style, setStyle] = useState<CSSProperties>({
        display: "inline-block",
        fontSize: "0.6em",
        fontWeight: 400,
        backgroundColor: 'transparent',
        color: 'inherit',
        padding: "0px 4px",
        margin: "0 6px 0 0",
    });

    useEffect(() => {
        const backgroundColor = randomColor();
        const color = foregroundColor(backgroundColor);

        setStyle((style) => ({
            ...style,
            backgroundColor,
            color,
        }))
    }, [])

    return (
        <span className={className} style={style}>
            {prefix + innerText}
        </span>
    );
};

export default Tag;
