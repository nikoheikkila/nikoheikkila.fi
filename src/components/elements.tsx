import React, { ReactNode } from "react";
import { OutboundLink } from "gatsby-plugin-google-analytics";

interface Props {
  children: ReactNode;
  to: string;
}

const ExternalLink: React.FunctionComponent<Props> = ({ to, children }) => (
  <OutboundLink href={to} target="_blank" rel="noopener noreferrer">
    {children}
  </OutboundLink>
);

export default ExternalLink;
