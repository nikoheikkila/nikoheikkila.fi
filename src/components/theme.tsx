import React, { CSSProperties } from "react";
import useDarkMode, { DarkModeConfig } from "use-dark-mode";

// @ts-ignore
import sun from "../assets/sun.png";

// @ts-ignore
import moon from "../assets/moon.png";

interface Props extends DarkModeConfig {
  dark?: boolean;
}

const ThemeToggle: React.FunctionComponent<Props> = ({ dark = true }) => {
  const { toggle, value: enabled } = useDarkMode(dark, {
    classNameLight: "light",
    classNameDark: "dark",
    storageKey: "darkMode",
  });

  const iconStyle: CSSProperties = {
    position: "fixed",
    top: 10,
    right: 10,
  };

  const SunButton = () => (
    <img
      onClick={toggle}
      style={iconStyle}
      src={sun}
      alt="Sun Icon"
      aria-label="Switch to light mode"
      data-testid="theme-toggle"
    />
  );

  const MoonButton = () => (
    <img
      onClick={toggle}
      style={iconStyle}
      src={moon}
      alt="Moon Icon"
      aria-label="Switch to dark mode"
      data-testid="theme-toggle"
    />
  );

  return <>{enabled ? <SunButton /> : <MoonButton />}</>;
};

export default ThemeToggle;
