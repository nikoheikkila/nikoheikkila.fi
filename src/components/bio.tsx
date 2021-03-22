import React from "react";
import { StaticImage } from "gatsby-plugin-image";

const Bio: React.FunctionComponent = ({ children }) => (
  <header className="bio">
    <StaticImage
      className="bio-image"
      src="../assets/profile.png"
      alt="nikoheikkila.fi"
      width={128}
      height={128}
      layout="fixed"
    />
    <section className="bio-text">{children}</section>
  </header>
);

export default Bio;
