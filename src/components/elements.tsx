import React, { ReactNode } from "react";

interface Props {
    children: ReactNode;
    to: string;
}

const ExternalLink: React.FunctionComponent<Props> = ({ to, children }) => (
    <a href={to} target="_blank" rel="noopener noreferrer">
        {children}
    </a>
);

export default ExternalLink;
