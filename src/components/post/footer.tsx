import Tag from "../tag";
import React, { FunctionComponent } from "react";

interface FooterProps {
    categories?: readonly string[];
}

const PostFooter: FunctionComponent<FooterProps> = ({ categories }) => (
    <p>
        {(categories || []).map((c: string) => (
            <Tag key={c} title={c} />
        ))}
    </p>
);

export default PostFooter;
